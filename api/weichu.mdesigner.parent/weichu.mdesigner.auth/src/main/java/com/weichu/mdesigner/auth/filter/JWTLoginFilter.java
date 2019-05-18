package com.weichu.mdesigner.auth.filter;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.BeanUtils;
import org.springframework.cache.CacheManager;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.weichu.mdesigner.auth.entity.SecurityUser;
import com.weichu.mdesigner.auth.exception.ValidateCodeException;
import com.weichu.mdesigner.auth.jwt.TokenAuthenticationService;
import com.weichu.mdesigner.auth.vo.UserVo;
import com.weichu.mdesigner.utils.SpringBeanUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.log.ILogSender;
import com.weichu.mdesigner.utils.log.LogType;
import com.weichu.mdesigner.utils.log.entity.SysLogger;


/**
 * 登录认证
 * 
 * 验证用户名密码正确后，生成一个token，并将token返回给客户端 
 * 该类继承自UsernamePasswordAuthenticationFilter，重写了其中的2个方法 
 * attemptAuthentication ：接收并解析用户凭证。 
 * successfulAuthentication ：用户成功登录后，这个方法会被调用，我们在这个方法里生成token。 
 * @author tangxingchu
 *
 */
public class JWTLoginFilter extends UsernamePasswordAuthenticationFilter {

//	public static final String JWTSECRET = "weichu.mdesiger.JwtSecret";

	private AuthenticationManager authenticationManager;
	
	public JWTLoginFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();

	/**
	 * 接收用户凭证
	 */
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		CacheManager cacheManager = SpringBeanUtils.getBean(CacheManager.class);//可以通过构造函数注入
		ILogSender logSender = SpringBeanUtils.getBean(ILogSender.class);//可以通过构造函数注入
		UserVo userVo = null;
		try {
			//json反序列化生成SecurityUser
			userVo = new ObjectMapper().readValue(request.getInputStream(), UserVo.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		if(userVo == null || StringUtils.isEmpty(userVo.getUsername()) 
				|| StringUtils.isEmpty(userVo.getPassword())) {
			throw new UsernameNotFoundException(messages.getMessage("BindAuthenticator.badCredentials"));
		}
		//可能日志未开启
		if(logSender != null) {
			SysLogger sysLogger = new SysLogger();
			sysLogger.setIp(request.getRemoteAddr());
			sysLogger.setLogTime(new Date());
			sysLogger.setUsername(userVo.getUsername());
			sysLogger.setLogType(LogType.LOGIN.getCode());
			sysLogger.setClassName(JWTLoginFilter.class.getName());
			sysLogger.setMethodName("attemptAuthentication");
			sysLogger.setLogContent("");
			logSender.sendLog(sysLogger);
		}
		if(userVo.getPlatform() == null || Constants.PLATFORM_DESKTOP == userVo.getPlatform()
				|| Constants.PLATFORM_WEB == userVo.getPlatform()) {
			if(StringUtils.isEmpty(userVo.getCode())) {
				throw new ValidateCodeException("请输入验证码!");
			}
			String code = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(userVo.getTime(), String.class);
			if(StringUtils.isEmpty(code)) {
				throw new ValidateCodeException("验证码超出了其有效时间5分钟!");
			}
			if(!code.toUpperCase().equals(userVo.getCode().toUpperCase())) {
				cacheManager.getCache(Constants.CODE_CACHE_NAME).evict(userVo.getTime());
				throw new ValidateCodeException("验证码错误!");
			}
		} else {
			//移动端登录什么都不做
			//后面需要加上密码错误5次 就锁定账户功能
		}
		
		SecurityUser securityUser = new SecurityUser();
		BeanUtils.copyProperties(userVo, securityUser);
		//会调用loadUserByUsername方法 验证用户名、密码是否正确  验证成功会调用下面successfulAuthentication方法
//		return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
//				securityUser.getUsername(), securityUser.getPassword(), securityUser.getAuthorities()));
		return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				securityUser, securityUser.getPassword(), securityUser.getAuthorities()));
	}

	/**
	 * 登录成功生成jwts token
	 * 用户成功登录后，这个方法会被调用，我们在这个方法里生成token
	 */
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		/*String token = Jwts.builder().setSubject(((UserDetails) authResult.getPrincipal()).getUsername())
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
				.signWith(SignatureAlgorithm.HS512, JWTSECRET).compact();
		response.addHeader("Authorization", token);*/
		//一般放的都是UserDetail
		SecurityUser securityUser = (SecurityUser) authResult.getPrincipal();
//		String username = ((UserDetails) authResult.getPrincipal()).getUsername();
		TokenAuthenticationService.addAuthentication(request, response, securityUser);
	}

}
