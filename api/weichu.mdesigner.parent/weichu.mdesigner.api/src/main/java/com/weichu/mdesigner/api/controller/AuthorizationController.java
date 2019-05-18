package com.weichu.mdesigner.api.controller;

import java.awt.image.RenderedImage;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.http.MediaType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.config.ExperienceAccount;
import com.weichu.mdesigner.api.service.IMerchantAuthorization;
import com.weichu.mdesigner.api.service.IMerchantChildUserService;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.vo.MerchantFunctionVo;
import com.weichu.mdesigner.auth.config.BCryptPasswordEncoder;
import com.weichu.mdesigner.auth.entity.SecurityUser;
import com.weichu.mdesigner.auth.jwt.ILoginTokenHandler;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.service.IMerchantUserFunctionService;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.ip.IPUtils;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.weichu.mdesigner.utils.log.ILogSender;
import com.weichu.mdesigner.utils.log.LogType;
import com.weichu.mdesigner.utils.log.entity.SysLogger;
import com.weichu.mdesigner.utils.sms.AliSMSUtil;
import com.weichu.mdesigner.utils.validatecode.RandomValidateCodeUtil;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

/**
 * 与系统认证相关接口
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class AuthorizationController {

	private Logger logger = LoggerFactory.getLogger(AuthorizationController.class);
	
	@Autowired
	private CacheManager cacheManager;
	
	@Autowired
	private IMerchantAuthorization authorization;
	
	@Autowired
	private UserDetailsService userDetailService;
	
	@Autowired
	private IMerchantUserFunctionService userFunctionService;
	
	@Autowired
	private ILoginTokenHandler loginTokenHandler;
	
	@Autowired
	private IMerchantService merchantService;
	
	@Autowired
	private AliSMSUtil aliSMSUtil;
	
	@Autowired
	private ILogSender logSender;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private IMerchantChildUserService childUserService;
	
	@Autowired
	private ExperienceAccount account;
	
	// 是否启用阿里云短信服务
	@Value("${aliyun.sms.enabled}")
	private Integer enabledSms;
	/**
	 * 验证码
	 * @param response
	 * @param time
	 * @throws Exception
	 */
	@RequestMapping(value = "/validateCode", method = RequestMethod.GET)
	public void validatecode(HttpServletResponse response, @RequestParam(value = "time", required = true) String time) throws Exception {
		Object[] objs = RandomValidateCodeUtil.creatValidateCode();
		response.setContentType(MediaType.IMAGE_PNG_VALUE);// 设置相应类型,告诉浏览器输出的内容为图片
		response.setHeader("Pragma", "No-cache");// 设置响应头信息，告诉浏览器不要缓存此内容
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expire", 0);
		logger.debug("验证码:" + objs[1].toString());
		//5分钟内有效
		cacheManager.getCache(Constants.CODE_CACHE_NAME).put(time, objs[1].toString());
		ImageIO.write((RenderedImage) objs[0], "png", response.getOutputStream());
	}

	/**
	 * 登录之后，根据登录账户（商家账户\子账号）类型来获取对应的function
	 * @return
	 */
	@RequestMapping(value = "/menu", method = RequestMethod.GET)
	public List<MerchantFunctionVo> listMenu(HttpServletRequest request) throws Exception {
		String username = JavaWebToken.getUsername(request);
		return authorization.getFunction(username).getChildren();
	}
	
	/**
	 * 刷新token
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/refreshToken", method = RequestMethod.POST)
	public String refreshToken(HttpServletRequest request) {
		String username = JavaWebToken.getUsername(request);
		SecurityUser securityUser = (SecurityUser) userDetailService.loadUserByUsername(username);
		//账号已过期 或者 账号已被禁用
		if(!securityUser.isAccountNonExpired() || !securityUser.isEnabled()) {
			//throw new Exception("账号已过期或账号已被禁用");
			return "";
		} else {
			// 生成JWT
			StringBuilder sb = new StringBuilder();
			List<GrantedAuthority> authorities = (List<GrantedAuthority>) securityUser.getAuthorities();
			if(authorities != null) {
				for (int i = 0; i < authorities.size(); i++) {
					GrantedAuthority grantedAuthority = authorities.get(i);
					if(i == authorities.size() - 1) {
						sb.append(grantedAuthority.getAuthority());
					} else {
						sb.append(grantedAuthority.getAuthority()).append(",");
					}
				}
			}
			String JWT_Token = Jwts.builder()
					// 保存权限（角色）
					.claim("authorities", sb.toString())
					// 保存商家等级
					.claim("grade", securityUser.getGrade())
					// 保存商家ID
					.claim("uid", securityUser.getId())
					// 用户名写入标题
					.setSubject(securityUser.getUsername())
					// 有效期设置
					.setExpiration(new Date(System.currentTimeMillis() + JavaWebToken.EXPIRATIONTIME))
					// 签名设置
					.signWith(SignatureAlgorithm.HS512, JavaWebToken.SECRET).compact();
			//更新最后登录状态
			loginTokenHandler.responseBefore(securityUser.getId(), securityUser.getUsername(), 
					request.getRemoteAddr(), JWT_Token, securityUser.isChildUser());
			return JWT_Token;
		}
	}
	
	/**
	 * 刷新权限
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/refreshPrivilege", method = RequestMethod.POST)
	public Integer refreshPrivilege(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return userFunctionService.refreshPrivilege(mid);
	}	
	
	/**
	 * 修改密码
	 * @param request
	 * @param newPWD
	 * @param oldPWD
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/modifyPWD", method = RequestMethod.POST)
	public JSONObject modifyPWD(HttpServletRequest request, @RequestParam("newPWD") String newPWD,
			@RequestParam("oldPWD") String oldPWD) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		if(account.getAccounts().contains(username)) {
			throw new YdpException("体验账号不允许该操作");
		}
		Integer result = authorization.modifyPWD(username, oldPWD, newPWD, mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 
	 * @param request
	 * @param token
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/validateToken", method = RequestMethod.POST)
	public JSONObject validateToken(HttpServletRequest request, @RequestParam("token") String token) {
		try {
			Jwts.parser()
					// 验签
					.setSigningKey(JavaWebToken.SECRET)
					// 去掉 Bearer
					.parseClaimsJws(token.replace(JavaWebToken.TOKEN_PREFIX, "").trim()).getBody();
			return JSONResult.fillResultJsonObject(true);
		} catch (SignatureException | MalformedJwtException e) {
			e.printStackTrace();
			logger.error(e.getMessage() + this.getClass().getName());
			return JSONResult.fillResultJsonObject(false);
		}
	}
	
	/**
	 * 
	 * 生成手机短信验证码
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/generatePhoneCode", method = RequestMethod.POST)
	public JSONObject generatePhoneCode(HttpServletRequest request, @RequestParam("codeType") String codeType) throws YdpException {
		if(StringUtils.isEmpty(codeType)) {
			throw new YdpException("请输入短信验证码类型");
		}
		//5分钟内有效
		int mid = JavaWebToken.getUid(request);
		int grade = JavaWebToken.getGrade(request);
		String username = JavaWebToken.getUsername(request);
		String random = String.valueOf((int)(Math.random() * 9000 + 1000));
		logger.debug(codeType + "短信验证码:" + random);
		cacheManager.getCache(Constants.CODE_CACHE_NAME).put(codeType + "_" + mid, random);
		//发送手机验证码 (只发给主账号)
		if(enabledSms == 1 && grade > 1) {
			String phone = merchantService.selectPhoneByUsername(username, mid);
			if(account.getAccounts().contains(phone)) {
				throw new YdpException("体验账号不允许该操作");
			}
//			if(StringUtils.isEmpty(phone)) {
//				throw new YdpException("您是子账号,您没有设置手机号码,无法获取手机验证码");
//			}
			String ip = IPUtils.getRealIP(request);
			SysLogger sysLogger = new SysLogger();
			sysLogger.setIp(ip);
			sysLogger.setClassName(this.getClass().getName());
			sysLogger.setLogContent(phone);
			sysLogger.setLogTime(new Date());
			sysLogger.setLogType(LogType.SMS.getCode());
			sysLogger.setMethodName("退款generatePhoneCode");
			sysLogger.setUsername(username);
			logSender.sendLog(sysLogger);
			
			String templateCode = "SMS_152506962";
			String templateParam = "{\"code\":\"" + random + "\"}";
			aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, phone, templateCode, templateParam);
		}
		return JSONResult.success();
	}
	
	/**
	 * 切换账号
	 * @param request
	 * @param username
	 * @param password
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/changeAccount", method = RequestMethod.POST)
	public String changeAccount(HttpServletRequest request, @RequestParam String username, @RequestParam String password) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		SecurityUser securityUser = (SecurityUser) childUserService.childUserLogin(username, password, mid);
		if(!bCryptPasswordEncoder.matches(password, securityUser.getPassword())) {
			throw new UsernameNotFoundException("用户名或密码错误.");
		}
		if(!securityUser.isAccountNonExpired()) {
			throw new YdpException("账号已过期.");
		}
		if(!securityUser.isEnabled()) {
			throw new YdpException("账号已被禁用.");
		}
		// 生成JWT
		StringBuilder sb = new StringBuilder();
		List<GrantedAuthority> authorities = (List<GrantedAuthority>) securityUser.getAuthorities();
		if(authorities != null) {
			for (int i = 0; i < authorities.size(); i++) {
				GrantedAuthority grantedAuthority = authorities.get(i);
				if(i == authorities.size() - 1) {
					sb.append(grantedAuthority.getAuthority());
				} else {
					sb.append(grantedAuthority.getAuthority()).append(",");
				}
			}
		}
		String JWT_Token = Jwts.builder()
				// 保存权限（角色）
				.claim("authorities", sb.toString())
				// 保存商家等级
				.claim("grade", securityUser.getGrade())
				// 保存商家ID
				.claim("uid", securityUser.getId())
				// 用户名写入标题
				.setSubject(securityUser.getUsername())
				// 有效期设置
				.setExpiration(new Date(System.currentTimeMillis() + JavaWebToken.EXPIRATIONTIME))
				// 签名设置
				.signWith(SignatureAlgorithm.HS512, JavaWebToken.SECRET).compact();
		//更新最后登录状态
		loginTokenHandler.responseBefore(securityUser.getId(), securityUser.getUsername(), 
				request.getRemoteAddr(), JWT_Token, true);
		return JWT_Token;
	}
	
	/**
	 * 重置密码
	 * @param request
	 * @param code
	 * @param smsCode
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/resetPassword", method = RequestMethod.POST)
	public JSONObject resetPassword(HttpServletRequest request, @RequestParam String phone, @RequestParam String smsCode) throws YdpException {
		if(StringUtils.isEmpty(smsCode)) {
			throw new YdpException("请输入短信验证码");
		}
		if(StringUtils.isEmpty(phone)) {
			throw new YdpException("请输入手机号码");
		}
		String cacheSmsCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(phone, String.class);
		if(cacheSmsCode == null) {
			throw new YdpException("短信验证码已失效,请重新获取");
		}
		if(!cacheSmsCode.equals(smsCode)) {
			cacheManager.getCache(Constants.CODE_CACHE_NAME).evict(phone);
			throw new YdpException("短信验证码错误");
		}
		String password = String.valueOf((int)(Math.random() * 900000 + 100000));
		logger.debug("新密码:" + password);
		merchantService.resetPassword(phone, bCryptPasswordEncoder.encode(password));
		cacheManager.getCache(Constants.CODE_CACHE_NAME).evict(phone);
		try {
			String templateCode = "SMS_158491948";
			String templateParam = "{\"password\":\"" + password + "\"}";
			aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, phone, templateCode, templateParam);
		} catch(Exception e) {
			logger.error(e.getMessage());
		}
		return JSONResult.success();
	}
	
	/**
	 * 重置密码验证码
	 * @param response
	 * @param time
	 * @throws IOException 
	 * @throws Exception
	 */
	@RequestMapping(value = "/resetPasswordValidateCode", method = RequestMethod.GET)
	public void resetPasswordValidateCode(HttpServletResponse response, @RequestParam(value = "time", required = true) String time) throws YdpException, IOException {
		Object[] objs = RandomValidateCodeUtil.creatValidateCode();
		response.setContentType(MediaType.IMAGE_PNG_VALUE);// 设置相应类型,告诉浏览器输出的内容为图片
		response.setHeader("Pragma", "No-cache");// 设置响应头信息，告诉浏览器不要缓存此内容
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expire", 0);
		logger.debug("验证码:" + objs[1].toString());
		//5分钟内有效
		cacheManager.getCache(Constants.CODE_CACHE_NAME).put(time, objs[1].toString());
		ImageIO.write((RenderedImage) objs[0], "png", response.getOutputStream());
	}
	
	/**
	 * 重置密码 获取手机短信验证码
	 * @param request
	 * @param phone
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/resetPasswordPhoneCode", method = RequestMethod.POST)
	public JSONObject resetPasswordPhoneCode(HttpServletRequest request, @RequestParam(value = "phone", required = true) String phone,
			@RequestParam(value = "time", required = true) String time, @RequestParam String code) throws YdpException {
		if(account.getAccounts().contains(phone)) {
			throw new YdpException("体验账号不允许该操作");
		}
		if(StringUtils.isEmpty(code)) {
			throw new YdpException("请输入验证码");
		}
		if(StringUtils.isEmpty(phone)) {
			throw new YdpException("请输入手机号码");
		}
		
		String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(time, String.class);
		if(cacheCode == null || !cacheCode.toUpperCase().equals(code.toUpperCase())) {
			cacheManager.getCache(Constants.CODE_CACHE_NAME).evict(time);
			throw new YdpException("验证码错误");
		}
		
		cacheManager.getCache(Constants.CODE_CACHE_NAME).evict(time);
		//5分钟内有效
		String random = String.valueOf((int)(Math.random() * 9000 + 1000));
		logger.debug("短信验证码:" + random);
		cacheManager.getCache(Constants.CODE_CACHE_NAME).put(phone, random);
		//发送手机验证码 (只发给主账号)
		if(enabledSms == 1) {
			MerchantUser merchantUser = merchantService.findMerchantByPhone(phone);
			if(merchantUser == null) {
				throw new YdpException("无此手机号码信息，请您核对");
			}
			String ip = IPUtils.getRealIP(request);
			SysLogger sysLogger = new SysLogger();
			sysLogger.setIp(ip);
			sysLogger.setClassName(this.getClass().getName());
			sysLogger.setLogContent(phone);
			sysLogger.setLogTime(new Date());
			sysLogger.setLogType(LogType.SMS.getCode());
			sysLogger.setMethodName("resetPasswordPhoneCode");
			sysLogger.setUsername(phone);
			logSender.sendLog(sysLogger);
			
			String templateCode = "SMS_158546631";
			String templateParam = "{\"code\":\"" + random + "\"}";
			aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, phone, templateCode, templateParam);
		}
		return JSONResult.success();
	}
	
}
