package com.weichu.mdesigner.api.service;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.MerchantRoleFunction;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 角色授权service
 * @author Administrator
 *
 */
public interface IMerchantRoleFunctionService {
	
	int save(int roleId, List<Integer> functionIds, int mid) throws YdpException;
	
	int save(Map<Integer, List<Integer>> roleFunctions, int mid, String username) throws YdpException;
	
	int deleteByRoleId(int roleId, int mid);
	
	List<MerchantRoleFunction> list(int roleId, int mid);
	
}
