package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.api.entity.MerchantRole;

/**
 * 角色
 * @author Administrator
 *
 */
public interface IMerchantRoleService {
	
	/**
	 * 查询角色（merchant_id=0为公共角色）
	 * @param mid
	 * @return
	 */
	List<MerchantRole> list(int mid);
	
}
