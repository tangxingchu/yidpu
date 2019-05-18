package com.weichu.mdesigner.api.service;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.api.entity.MerchantUserRole;

/**
 * 用户授权
 * @author Administrator
 *
 */
public interface IMerchantUserRoleService {
	
	int save(int childUserId, List<Integer> roles, int mid);
	
	int delete(int childUserId, int mid);
	
	List<MerchantUserRole> list(int childUserId, int mid);

	int save(Map<Integer, List<Integer>> userRoles, int mid);
	
}
