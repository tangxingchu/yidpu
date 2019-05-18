package com.weichu.mdesigner.api.controller;

import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.common.entity.AdminMessageBook;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.service.IAdminMessageBookService;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.ip.IPUtils;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.weichu.mdesigner.utils.log.ILogSender;
import com.weichu.mdesigner.utils.log.LogType;
import com.weichu.mdesigner.utils.log.entity.SysLogger;
import com.weichu.mdesigner.utils.sms.AliSMSUtil;

/**
 * 门户网站的api接口
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/web")
public class WebController {
	
	private Logger logger = LoggerFactory.getLogger(WebController.class);
	
	@Autowired
	private CacheManager cacheManager;
	
	@Autowired
	private IMerchantService merchantService;
	
	@Autowired
	private AliSMSUtil aliSMSUtil;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	// 是否启用阿里云短信服务
	@Value("${aliyun.sms.enabled}")
	private Integer enabledSms;
	
	@Autowired
	private ILogSender logSender;

	@Value("${business.log.enabled}")
	private boolean enabledLog;
	
	@Autowired
	private IAdminMessageBookService messageBookService;
	
	/**
	 * 注册
	 * @param request
	 * @param pwd
	 * @param phone
	 * @param vCode
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public JSONObject register(HttpServletRequest request, @RequestParam("pwd") String pwd, @RequestParam("confirmpwd") String confirmpwd,
			@RequestParam("phone") String phone, @RequestParam("code") String code) throws Exception {
		if(StringUtils.isEmpty(pwd)) {
			throw new Exception("密码不能为空");
		}
		if(StringUtils.isEmpty(confirmpwd)) {
			throw new Exception("确认密码不能为空");
		}
		if(StringUtils.isEmpty(phone)) {
			throw new Exception("手机号码不能为空");
		}
		if(StringUtils.isEmpty(code)) {
			throw new Exception("手机验证码不能为空");
		}
		Pattern pattern = Pattern.compile("^1[34578]\\d{9}$");
		Matcher matcher = pattern.matcher(phone);
		if(!matcher.matches()) {
			throw new Exception("请输入有效的手机号码");
		}
		if(!pwd.equals(confirmpwd)) {
			throw new Exception("两次密码输入不一致");
		}
		//5分钟内有效
		String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(phone, String.class);
		cacheManager.getCache(Constants.CODE_CACHE_NAME).evict(phone);
		if(cacheCode == null || !cacheCode.toUpperCase().equals(code.toUpperCase())) {
			throw new Exception("短信验证码输入错误");
		}
		MerchantUser merchantUser = new MerchantUser();
		merchantUser.setPhone(phone);
		merchantUser.setPassword(bCryptPasswordEncoder.encode(confirmpwd));
		int result = merchantService.registerMerchantUser(merchantUser);
		return JSONResult.fillResultJsonObject(result);
	}
	
	@RequestMapping(value = "/checkCode", method = RequestMethod.POST)
	public JSONObject checkCode(HttpServletRequest request, @RequestParam("time")String time,
			@RequestParam("code")String code ) {
		JSONObject result = new JSONObject();
		//5分钟内有效
		String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(time, String.class);
		if(StringUtils.isEmpty(cacheCode)) {
			result.put("valid", false);
		} else {
			if(code != null && cacheCode.toUpperCase().equals(code.toUpperCase())) {
				result.put("valid", true);
			} else {
				result.put("valid", false);
			}
		}
		return result;
	}
		
	@RequestMapping(value = "/checkPhoneCode", method = RequestMethod.POST)
	public JSONObject checkPhoneCode(HttpServletRequest request, @RequestParam("phone")String phone,
			@RequestParam("code")String code ) {
		JSONObject result = new JSONObject();
		//5分钟内有效
		String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(phone, String.class);
		if(StringUtils.isEmpty(cacheCode)) {
			result.put("valid", false);
		} else {
			if(code != null && cacheCode.toUpperCase().equals(code.toUpperCase())) {
				result.put("valid", true);
			} else {
				result.put("valid", false);
			}
		}
		return result;
	}
	
	@RequestMapping(value = "/checkPhone", method = RequestMethod.POST)
	public JSONObject checkPhoneCode(HttpServletRequest request, @RequestParam("phone")String phone) {
		JSONObject result = new JSONObject();
		MerchantUser user = merchantService.findMerchantByPhone(phone);
		if(user == null) {
			result.put("valid", true);
		} else {
			result.put("valid", false);
		}
		return result;
	}
	
	@RequestMapping(value = "/generatePhoneCode", method = RequestMethod.POST)
	public JSONObject generatePhoneCode(HttpServletRequest request, @RequestParam("phone")String phone, 
			@RequestParam("time")String time, @RequestParam("code")String code) throws YdpException {
		String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(time, String.class);
		if(StringUtils.isEmpty(cacheCode)) {
			return JSONResult.fillResultJsonObject(500, "验证码已超过5分钟有效时间", "");
		} else {
			if(code == null || !cacheCode.toUpperCase().equals(code.toUpperCase())) {
				return JSONResult.fillResultJsonObject(500, "验证码验证失败", "");
			}
		}
		//5分钟内有效
		String random = String.valueOf((int)(Math.random() * 9000 + 1000));
		logger.debug("短信验证码:" + random);
		cacheManager.getCache(Constants.CODE_CACHE_NAME).put(phone, random);
		//发送手机验证码
		if(enabledSms == 1) {
			MerchantUser user = merchantService.findMerchantByPhone(phone);
			String ip = IPUtils.getRealIP(request);
			SysLogger sysLogger = new SysLogger();
			sysLogger.setIp(ip);
			sysLogger.setClassName(this.getClass().getName());
			sysLogger.setLogContent(phone);
			sysLogger.setLogTime(new Date());
			sysLogger.setLogType(LogType.SMS.getCode());
			sysLogger.setMethodName("generatePhoneCode");
			sysLogger.setUsername(phone);
			logSender.sendLog(sysLogger);
			if(user == null) {
				String templateCode = "SMS_154593585";
				String templateParam = "{\"code\":\"" + random + "\"}";
				aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, phone, templateCode, templateParam);
			}
		}
		return JSONResult.fillResultJsonObject(200, "", "");
	}
	
	@RequestMapping(value = "/saveMessageBook", method = RequestMethod.POST)
	public JSONObject saveMessageBook(HttpServletRequest request, @RequestBody AdminMessageBook messageBook) throws YdpException {
		if(messageBook == null) {
			throw new YdpException("请输入留言信息");
		}
		if(StringUtils.isEmpty(messageBook.getName())) {
			throw new YdpException("请输入姓名");
		}
		if(StringUtils.isEmpty(messageBook.getPhone())) {
			throw new YdpException("请输入手机号码");
		}
//		if(StringUtils.isEmpty(messageBook.getMessage())) {
//			throw new YdpException("请输入留言信箱");
//		}
		String ip = IPUtils.getRealIP(request);
		if(cacheManager.getCache(Constants.CODE_CACHE_NAME).get(ip, String.class) != null) {
			throw new YdpException("请不要重复留言。。。");
		}
		cacheManager.getCache(Constants.CODE_CACHE_NAME).put(ip, ip);
		messageBook.setIpAddress(ip);
		messageBookService.save(messageBook);
		return JSONResult.success();
	}
	
}
