package com.weichu.mdesigner.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.weichu.mdesigner.auth.entity.SecurityUser;

/**
 * spring security的自定义 身份验证(authentication)
 * @author tangxingchu
 *
 */
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
	
	private Logger logger = LoggerFactory.getLogger(CustomAuthenticationProvider.class);

	private UserDetailsService customUserDetailsService;
	
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public CustomAuthenticationProvider(UserDetailsService customUserDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.customUserDetailsService = customUserDetailsService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder; 
	}
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		logger.debug("自定义的CustomAuthenticationProvider");
		String username = authentication.getName();
		String password = (String) authentication.getCredentials();
		
		SecurityUser securityUser = (SecurityUser) customUserDetailsService.loadUserByUsername(username);
		if(!bCryptPasswordEncoder.matches(password, securityUser.getPassword())) {
			throw new UsernameNotFoundException("用户名或密码错误.");
		}
		if(!securityUser.isAccountNonExpired()) {
			throw new UsernameNotFoundException("账号已过期.");
		}
		if(!securityUser.isEnabled()) {
			throw new UsernameNotFoundException("账号已被禁用.");
		}
		return new UsernamePasswordAuthenticationToken(securityUser, securityUser.getPassword(), securityUser.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}
	
}
