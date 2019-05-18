package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.entity.AdminEmployee;
import com.weichu.mdesigner.api.entity.AdminEmployeeExample;
import com.weichu.mdesigner.api.mapper.AdminEmployeeMapper;
import com.weichu.mdesigner.api.service.IAuthorization;
import com.weichu.mdesigner.auth.config.IPermissionHandler;
import com.weichu.mdesigner.auth.entity.SecurityUser;
import com.weichu.mdesigner.auth.jwt.ILoginTokenHandler;
import com.weichu.mdesigner.auth.service.CustomUserDetailsService;

@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class AuthorizationImpl implements IAuthorization, CustomUserDetailsService.ILogin, IPermissionHandler, ILoginTokenHandler {
	
	public static final Logger logger = LoggerFactory.getLogger(AuthorizationImpl.class);
	
	@Autowired
	private AdminEmployeeMapper employeeMapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) {
		AdminEmployeeExample example = new AdminEmployeeExample();
		example.createCriteria().andAccountEqualTo(username);
		List<AdminEmployee> exployees = employeeMapper.selectByExample(example);
		if(exployees.isEmpty()) {
			throw new UsernameNotFoundException("用户名或密码错误.");	
		} else {
			AdminEmployee employee = exployees.get(0);
			SecurityUser securityUser = new SecurityUser();
			securityUser.setUsername(username);
			securityUser.setPassword(employee.getPassword());
			securityUser.setEnabled(employee.getEnabled());
			securityUser.setLocked(employee.getLocked());
			if(employee.getExpirationTime() != null && employee.getExpirationTime().before(new Date())) {
				securityUser.setExpired(1);
			}
			//TODO
			securityUser.setAuthorities(new ArrayList<GrantedAuthority>());
			return securityUser;
		}		
	}

	/**
	 * 待实现
	 */
	@Override
	public boolean checkPermission(SecurityUser securityUser, String functionCode) {
		return true;
	}
	
	/**ILoginTokenHandler**/
	@Override
	public void responseBefore(Integer merchantId, String username, String loginIp, String token, boolean isChildUser) {
		
	}

	/**ILoginTokenHandler**/
	@Override
	public boolean validateLastToken(Integer merchantId, String username, String lastToken) {
		return true;
	}
	
}
