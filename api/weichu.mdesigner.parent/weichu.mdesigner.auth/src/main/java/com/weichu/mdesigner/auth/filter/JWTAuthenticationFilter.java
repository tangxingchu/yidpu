package com.weichu.mdesigner.auth.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.weichu.mdesigner.auth.jwt.ILoginTokenHandler;
import com.weichu.mdesigner.auth.jwt.TokenAuthenticationService;

/**
 * token的校验 
 * 
 * 该类继承自BasicAuthenticationFilter，在doFilterInternal方法中， 
 * 从http头的Authorization 项读取token数据，然后用Jwts包提供的方法校验token的合法性。 
 * 如果校验通过，就认为这是一个取得授权的合法请求
 * @author tangxingchu
 *
 */
public class JWTAuthenticationFilter extends BasicAuthenticationFilter {

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
//		String header = request.getHeader("Authorization");

//		if (header == null ) {
//			chain.doFilter(request, response);
//			return;
//		}
//		System.out.println(tokenHandler.toString());
		UsernamePasswordAuthenticationToken authentication = TokenAuthenticationService.getAuthentication(request);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(request, response);
	}

	

}
