package com.weichu.mdesigner.auth.config;

import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;

import com.weichu.mdesigner.auth.entity.SecurityUser;

@Configuration
public class CustomPermissionEvaluator implements PermissionEvaluator {
	
	private Logger logger = LoggerFactory.getLogger(CustomPermissionEvaluator.class);
	
	@Autowired
	private IPermissionHandler permissionHandler;

	/**
	 * 
	 * 1、首先看用户 是否达到functionCode对应的等级
	 * 2、是否已单独购买了function权限
	 * 3、在进一步校验子账号是否拥有改权限
	 * 
	 * 只需要检查商家等级是否有该权限, 子账号无无需检查??
	 * 子账户需要校验的（因为有3个功能权限需要校验）
	 */
	@Override
	public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
		logger.debug("targetDomainObject:" + targetDomainObject + ", permission:" + permission);
		SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
		Integer grade = securityUser.getGrade();//商家等级
//		Integer mid = securityUser.getId();//商家ID
//		authentication.getAuthorities();
		return permissionHandler.checkPermission(securityUser, (String) permission);
	}

	@Override
	public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
			Object permission) {
		logger.debug("targetId:" + targetId + ", targetType:" + targetType + ", permission:" + permission);
		return false;
	}

}
