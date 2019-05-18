package com.weichu.mdesigner.auth.config;

import com.weichu.mdesigner.auth.entity.SecurityUser;

/**
 * 鉴权接口
 * @author Administrator
 *
 */
public interface IPermissionHandler {
	
	/**
	 * 检查是否拥有权限
	 * @param securityUser 当前登录用户
	 * @param functionCode 功能代码
	 * @return
	 */
	public boolean checkPermission(SecurityUser securityUser, String functionCode);
	
}
