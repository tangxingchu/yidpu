package com.weichu.mdesigner.auth.config;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.weichu.mdesigner.auth.CustomAuthenticationProvider;
import com.weichu.mdesigner.auth.config.CustomAccessDeniedHandler;
import com.weichu.mdesigner.auth.config.UnauthorizedEntryPoint;
import com.weichu.mdesigner.auth.filter.JWTAuthenticationFilter;
import com.weichu.mdesigner.auth.filter.JWTLoginFilter;
import com.weichu.mdesigner.auth.jwt.ILoginTokenHandler;

/**
 * spring security 的配置
 * 通过SpringSecurity的配置，将JWTLoginFilter，JWTAuthenticationFilter组合在一起
 * @author Administrator
 *
 */
//@Configuration
//@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {
	
	private UserDetailsService customUserDetailsService;
	
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public WebSecurityConfigurer(UserDetailsService customUserDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.customUserDetailsService = customUserDetailsService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
	@Override
    public void configure(WebSecurity web) throws Exception {
        //忽略css.jq.img等文件
        web.ignoring().antMatchers("/**.ico", "/druid/**/**.css", "/druid/**/**.js");
    }
	
	/**
	 * http请求配置
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.exceptionHandling().authenticationEntryPoint(new UnauthorizedEntryPoint())//未登录返回401错误代码
			.accessDeniedHandler(new CustomAccessDeniedHandler())//返回403错误代码
			.and()
			.cors().and().csrf().disable().authorizeRequests()
			.antMatchers(HttpMethod.GET, "/api/validateCode").permitAll()  //登录验证码接口
			.antMatchers(HttpMethod.GET, "/api/resetPasswordValidateCode").permitAll()  //重置密码验证码接口
			.antMatchers(HttpMethod.POST, "/api/resetPasswordPhoneCode").permitAll()  //重置密码获取手机短信验证码接口
			.antMatchers(HttpMethod.POST, "/api/resetPassword").permitAll()	//重置密码
			.antMatchers(HttpMethod.POST, "/api/validateToken").permitAll()  //验证token是否合法-socket服务器的token认证
//			.antMatchers(HttpMethod.POST, "/register").permitAll() //商家注册接口
//			.antMatchers(HttpMethod.POST, "/generatePhoneCode").permitAll() //商家注册接口-生成手机验证码
//			.antMatchers(HttpMethod.POST, "/checkPhone").permitAll() //商家注册接口-校验手机号码是否已注册
//			.antMatchers(HttpMethod.POST, "/checkCode").permitAll() //商家注册接口-获取手机验证码时校验验证码
//			.antMatchers(HttpMethod.POST, "/checkPhoneCode").permitAll() //商家注册接口-校验手机验证码
			.antMatchers(HttpMethod.POST, "/api/web/**").permitAll() //web端商家注册接口-校验手机验证码
			.antMatchers(HttpMethod.GET, "/api/merchant/goAlipay").permitAll() //商家支付接口
			.antMatchers(HttpMethod.GET, "/api/merchant/goAlipay/return").permitAll() //商家支付结果同步通知界面
			.antMatchers(HttpMethod.POST, "/api/merchant/goAlipay/notify").permitAll() //商家支付结果异步通知界面
			//支付宝第三方应用接口
			.antMatchers(HttpMethod.GET, "/api/alipay/**").permitAll() //支付宝商家授权回调接口
			.antMatchers(HttpMethod.POST, "/api/alipay/**").permitAll() //支付宝商家授权回调接口
			//微信支付(服务商)
			.antMatchers(HttpMethod.GET, "/api/wxpay/**").permitAll()
			.antMatchers(HttpMethod.POST, "/api/wxpay/**").permitAll()
			//上面是桌面端应用api的配置
			//druid的sql监控
			.antMatchers(HttpMethod.GET, "/druid/**").permitAll()
			.antMatchers(HttpMethod.POST, "/druid/**").permitAll()
			.antMatchers(HttpMethod.POST, "/submitLogin").permitAll()
			//以下是h5端的api
			.antMatchers(HttpMethod.POST, "/api/mobile/getMInfo").permitAll() //获取商户基本信息(前台扫码支付时需要)
//			.antMatchers(HttpMethod.POST, "/api/mobile/listNoPaymentOrderByTableCode").permitAll() //查询待支付订单
//			.antMatchers(HttpMethod.POST, "/api/mobile/listNoPaymentOrderByTableCode").permitAll() //查询待支付订单
			.anyRequest().authenticated()
			.and()
			.addFilter(new JWTLoginFilter(authenticationManager()))
			.addFilter(new JWTAuthenticationFilter(authenticationManager()));
		
//		http.formLogin().loginProcessingUrl("/api/login").failureHandler(new AuthenticationFailureHandler())
//		.successHandler(new AuthenticationSuccessHandler())
//		.and()
//		.csrf().disable().authorizeRequests()
//		.antMatchers(HttpMethod.GET, "/api/validatecode").permitAll()
//		.antMatchers(HttpMethod.POST, "/member/register").permitAll()
//		.anyRequest().authenticated()
//		.and()
//		.addFilter(new JWTLoginFilter(authenticationManager()))
//		.addFilter(new JWTAuthenticationFilter(authenticationManager()));
		
	}
	
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		//稍微简单的认证方式
//		auth.userDetailsService(this.customUserDetailsService).passwordEncoder(this.bCryptPasswordEncoder);
		//自定义认证方式(密码错误次数等等功能)
		auth.authenticationProvider(new CustomAuthenticationProvider(this.customUserDetailsService, this.bCryptPasswordEncoder));
	}
	
}
