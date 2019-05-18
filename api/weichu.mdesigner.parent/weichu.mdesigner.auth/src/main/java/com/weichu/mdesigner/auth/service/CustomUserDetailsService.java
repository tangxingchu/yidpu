package com.weichu.mdesigner.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.weichu.mdesigner.auth.entity.SecurityUser;
import com.weichu.mdesigner.auth.entity.User;
import com.weichu.mdesigner.utils.log.BusinessLog;
import com.weichu.mdesigner.utils.log.LogType;

/**
 * 自定义实现根据用户名查询用户信息
 * 
 * @author Administrator
 *
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	//需要实现的登录接口
	public interface ILogin {
		UserDetails loadUserByUsername(String username);
	}
	
	@Autowired
	private ILogin loginImpl;
	
	@Override
	@BusinessLog(type = LogType.LOGIN)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// 需要查询数据库 用户登录
		SecurityUser securityUser = null;
		if(loginImpl != null) {
			securityUser = (SecurityUser) loginImpl.loadUserByUsername(username);
		}
		
//		User user = new User();
//		user.setUsername("user-admin");
//		
//		user.setEnabled("1");
//		user.setExpired("0");
//		user.setLocked("0");
//		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		String hashedPassword = passwordEncoder.encode("1234561");
//		user.setPassword(hashedPassword);
//		SecurityUser securityUser = new SecurityUser(user);
		return securityUser;
	}

}
