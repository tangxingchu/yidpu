package com.weichu.mdesigner.utils;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

public class JavaWebToken {

	public static final long EXPIRATIONTIME = 3 * 24 * 60 * 60 * 1000; // 365天
	public static final long EXPIRATIONTIME_4HOURE = 4 * 60 * 60 * 1000; // 2个小时
//	public static final long EXPIRATIONTIME = 2 * 60 * 1000; // 2分钟
	public static final String SECRET = "P@ssw02d"; // JWT密码
	
	public static final String SECRET_M = "P@ssw02d_M"; // JWT密码
	public static final String TOKEN_PREFIX = "Bearer"; // Token前缀
	public static final String HEADER_STRING = "Authorization";// 存放Token的Header Key	

	public static Map<String, Object> parseToken(String token) {
		try {
			Claims claims = Jwts.parser()
					// 验签
					.setSigningKey(SECRET)
					// 去掉 Bearer
					.parseClaimsJws(token.replace(TOKEN_PREFIX, "").trim()).getBody();
			return claims;
		} catch (SignatureException | MalformedJwtException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static String getUsername(HttpServletRequest request) {
		String token = request.getHeader(HEADER_STRING);
		Map<String, Object> map = parseToken(token);
		return (String) map.get(Claims.SUBJECT);
	}
	
	public static Integer getUid(HttpServletRequest request) {
		String token = request.getHeader(HEADER_STRING);
		Map<String, Object> map = parseToken(token);
		return (Integer) map.get("uid");
	}
	
	public static Integer getGrade(HttpServletRequest request) {
		String token = request.getHeader(HEADER_STRING);
		Map<String, Object> map = parseToken(token);
		return (Integer) map.get("grade");
	}
	
	public static void main(String[] args) {
//		String JWT_Token = Jwts.builder()
//				// 保存用户（角色）
//					.claim("authorities", "admin")
//				// 保存用户等级
//					.claim("grade", 5)
//				// 保存用户ID
//				.claim("uid", 1)
//				// 用户名写入标题
//				.setSubject("18975230231")
//				// 有效期设置
//				.setExpiration(new Date(System.currentTimeMillis() + JavaWebToken.EXPIRATIONTIME))
//				// 签名设置
//				.signWith(SignatureAlgorithm.HS512, JavaWebToken.SECRET_M).compact();
		
		String JWT_Token = Jwts.builder()
				// 保存权限（角色）
				.claim("authorities", "admin")
				// 保存商家等级
				.claim("grade", 1)
				// 保存商家ID
				.claim("uid", 1)
				// 用户名写入标题
				.setSubject("admin")
				// 有效期设置
				.setExpiration(new Date(System.currentTimeMillis() + JavaWebToken.EXPIRATIONTIME))
				// 签名设置
				.signWith(SignatureAlgorithm.HS512, JavaWebToken.SECRET).compact();
		
		System.out.println(JWT_Token);
		String token = "eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjQiLCJncmFkZSI6NCwidWlkIjoxLCJzdWIiOiIxODk3NTEzMDIzMCIsImV4cCI6MTU0ODg0MjI2Mn0.hej7lJk9oxbKp4-3ZdQ7odAHk4k_aKy8NpOpwCqlR8ZRu9pd_7AxwaknbTH2XkLzRcDLHaiobzTZkJB6hhWzWw";
		System.out.println(token);
		JavaWebToken.parseToken(token);
		JavaWebToken.parseToken(JWT_Token);
	}
	
}
