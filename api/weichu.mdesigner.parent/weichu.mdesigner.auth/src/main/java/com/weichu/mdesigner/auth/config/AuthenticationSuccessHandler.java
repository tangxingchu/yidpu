package com.weichu.mdesigner.auth.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;

/**
 * 没有用到,先不删
 * @author Administrator
 *
 */
public class AuthenticationSuccessHandler
		implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

	private Logger logger = LoggerFactory.getLogger(AuthenticationSuccessHandler.class);
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		logger.debug("登录成功");
	}

}
