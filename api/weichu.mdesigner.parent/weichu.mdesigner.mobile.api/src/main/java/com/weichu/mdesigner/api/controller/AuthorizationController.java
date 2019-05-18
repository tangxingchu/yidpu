package com.weichu.mdesigner.api.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.utils.JavaWebToken;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * 与系统认证相关接口
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class AuthorizationController {
	
	private static final String SECRET = "47f19620821d0f8d1e9a972c2e4db227";
	
	private static final String APPID = "wxc05e1b8602afb5e7";
	
	@Autowired RestTemplate restTemplate;
	
	/**
	 * 微信登录
	 * @param request
	 * @param code (wx.login() 返回的code)
	 * @return
	 */
	@RequestMapping(value = "/wechat/login", method = RequestMethod.GET)
//	@PreAuthorize("hasPermission(#request, '0203')")
	public String wechatLogin(HttpServletRequest request, @RequestParam String code) throws Exception {
		String wechatLoginURL = "https://api.weixin.qq.com/sns/jscode2session";
		wechatLoginURL += "?appid=" + APPID + "&secret=" + SECRET + "&js_code=" + code + "&grant_type=authorization_code";
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(wechatLoginURL, String.class);
		String body = responseEntity.getBody();
		System.out.println(body);
		JSONObject result = JSONObject.parseObject(body);
		if(result.getString("openid") == null) {
			throw new Exception("授权失败");
		}
		
		String JWT_Token = Jwts.builder()
			// 保存用户（角色）
				.claim("authorities", "admin")
			// 保存用户等级
				.claim("grade", 0)
			// 保存用户ID
			.claim("openid", result.get("openid").toString())
			// 用户名写入标题
			.setSubject(result.get("openid").toString())
			// 有效期设置
			.setExpiration(new Date(System.currentTimeMillis() + JavaWebToken.EXPIRATIONTIME))
			// 签名设置
			.signWith(SignatureAlgorithm.HS512, JavaWebToken.SECRET_M).compact();
		return JWT_Token;
	}
	
}
