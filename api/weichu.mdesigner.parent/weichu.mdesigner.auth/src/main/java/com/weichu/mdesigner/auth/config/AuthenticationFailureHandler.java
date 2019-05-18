package com.weichu.mdesigner.auth.config;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 没有用到,先不删
 * @author Administrator
 *
 */
public class AuthenticationFailureHandler
		implements org.springframework.security.web.authentication.AuthenticationFailureHandler {

	private Logger logger = LoggerFactory.getLogger(AuthenticationFailureHandler.class);

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		logger.debug("登录失败" + exception.getMessage());
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
//		StringBuffer sb = new StringBuffer();
		
//		sb.append("{\"status\":\"error\",\"msg\":\"");
//		if (exception instanceof UsernameNotFoundException || exception instanceof BadCredentialsException) {
//			sb.append("用户名或密码输入错误，登录失败!");
//		} else if (exception instanceof DisabledException) {
//			sb.append("账户被禁用，登录失败，请联系管理员!");
//		} else {
//			sb.append("登录失败!");
//		}
//		sb.append("\"}");
		out.write(JSONResult.fillResultString(401, exception.getMessage(), null));
		out.flush();
		out.close();
	}

}
