package com.weichu.mdesigner.auth.jwt;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import com.weichu.mdesigner.auth.entity.SecurityUser;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.SpringBeanUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

/**
 * 解决token延期的办法： 每次检查配有token是否24小时内过期的注解，如果快过期，生成新的token并返回客户端
 * 客户端重新保存token，统一返回{result: "", token: ""}，客户端判断是否有token属性，有的话就替换原先的token
 * @author tangxingchu
 *
 */
public class TokenAuthenticationService {
	
//	static final long EXPIRATIONTIME = 5 * 24 * 60 * 60 * 1000; // 5天
//	static final String SECRET = "P@ssw02d"; // JWT密码
//	static final String TOKEN_PREFIX = "Bearer"; // Token前缀
//	static final String HEADER_STRING = "Authorization";// 存放Token的Header Key
	
	public static final Logger logger = LoggerFactory.getLogger(TokenAuthenticationService.class);
	
	// JWT生成方法
	@SuppressWarnings("unchecked")
	public static void addAuthentication(HttpServletRequest request, HttpServletResponse response, SecurityUser securityUser) {
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
		try {
			ILoginTokenHandler loginTokenHandler = SpringBeanUtils.getBean(ILoginTokenHandler.class);
			loginTokenHandler.responseBefore(securityUser.getId(), securityUser.getUsername(), 
					request.getRemoteAddr(), JWT_Token, securityUser.isChildUser());
		} catch(Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		// 将 JWT 写入 body
		try {
			String token = JavaWebToken.TOKEN_PREFIX + " " + JWT_Token;
//			Cookie cookie = new Cookie(HEADER_STRING, token);
//			cookie.setHttpOnly(true);//防止被Javascript读取
			response.setContentType("application/json");
			response.setStatus(HttpServletResponse.SC_OK);
//			response.addCookie(cookie);
			response.getOutputStream().println("{\"token\": \"" + token + "\"}");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/*
	 * // JWT验证方法 public static Authentication getAuthentication(HttpServletRequest
	 * request) { // 从Header中拿到token String token =
	 * request.getHeader(HEADER_STRING);
	 * 
	 * if (token != null) { // 解析 Token Claims claims = Jwts.parser() // 验签
	 * .setSigningKey(SECRET) // 去掉 Bearer
	 * .parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody();
	 * 
	 * // 拿用户名 String user = claims.getSubject();
	 * 
	 * // 得到 权限（角色） // List<GrantedAuthority> authorities = //
	 * AuthorityUtils.commaSeparatedStringToAuthorityList((String) //
	 * claims.get("authorities")); List authorities = new ArrayList<>(); // 返回验证令牌
	 * return user != null ? new UsernamePasswordAuthenticationToken(user, null,
	 * authorities) : null; } return null; }
	 */
	//请求白名单 （不要校验是否在其他地方登陆）
	//获取营业执照资质等照片 、修改营业状态
	private static List<String> whiteListUrl = Arrays.asList("/merchant/getyyzz", 
			"/merchant/updateOperatingStatus");
	
	/**
	 * 验证token的合法性 ()
	 * 
	 * @param request
	 * @return
	 */
	public static UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(JavaWebToken.HEADER_STRING);
		if (token != null) {
			// parse the token.
			try {
				// user 是上面设置的subject
				// String user = Jwts.parser()
				// .setSigningKey(SECRET)
				// .parseClaimsJws(token)
				// .getBody()
				// .getSubject();
				//
				// if (user != null) {
				// return new UsernamePasswordAuthenticationToken(user, null, new
				// ArrayList<>());
				// } else {
				// return null;
				// }
				// 解析 Token
				Claims claims = Jwts.parser()
						// 验签
						.setSigningKey(JavaWebToken.SECRET)
						// 去掉 Bearer
						.parseClaimsJws(token.replace(JavaWebToken.TOKEN_PREFIX, "").trim())
						.getBody();

				// 拿用户名
				String username = claims.getSubject();
				// 商家等级
				Integer grade = (Integer) claims.get("grade");
				
				//openid
				Object openid = claims.get("openid");
				if(openid != null && openid instanceof String) {
					// 返回验证令牌
					return username != null ? new UsernamePasswordAuthenticationToken(null, null, null) : null;
				} else {
					// 商家ID
					Integer uid = (Integer) claims.get("uid");
					
					boolean isWhiteUrl = false;
					for(int i = 0; i < whiteListUrl.size(); i++) {
						if(request.getRequestURI().indexOf(whiteListUrl.get(i)) > -1) {
							isWhiteUrl = true;
						}
					}
//					try {
						ILoginTokenHandler loginTokenHandler = SpringBeanUtils.getBean(ILoginTokenHandler.class);
						if(!isWhiteUrl && loginTokenHandler != null && 
								!loginTokenHandler.validateLastToken(uid, username, token.replace(JavaWebToken.TOKEN_PREFIX, "").trim())) {
							throw new JwtException("账号已在其他设备登录");
						}
//					} catch(Exception e) {
//						logger.error(e.getMessage());
//					}
						
					// 得到 权限（角色）
					List<GrantedAuthority> authorities = AuthorityUtils
							.commaSeparatedStringToAuthorityList((String) claims.get("authorities"));
					
					//这里主要是让CustomPermissionEvaluator的hasPermission方法中能取到
					SecurityUser securityUser = new SecurityUser();
					securityUser.setId(uid);
					securityUser.setGrade(grade);
					securityUser.setAuthorities(authorities);
					securityUser.setUsername(username);
					
					// 返回验证令牌
					return username != null ? new UsernamePasswordAuthenticationToken(securityUser, null, authorities) : null;
				}
				
				
			} catch (SignatureException | MalformedJwtException e) {
				e.printStackTrace();
				return null;
			} catch (ExpiredJwtException e) {
				throw new ExpiredJwtException(null, null, "登录状态已失效,请重新登录");
			} catch (JwtException ex) {
				throw new ExpiredJwtException(null, null, ex.getMessage());
			}
		}
		return null;
	}
}
