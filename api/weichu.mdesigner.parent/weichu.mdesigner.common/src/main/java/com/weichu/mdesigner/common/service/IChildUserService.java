package com.weichu.mdesigner.common.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantUserChildren;

/**
 * 子账户
 * @author Administrator
 *
 */
public interface IChildUserService {
	
	/**
	 * 添加子账户
	 * @param userChildren
	 * @return
	 */
	int save(MerchantUserChildren user);
	
	/**
	 * 修改子账户
	 * @param user
	 * @return
	 */
	int update(MerchantUserChildren user);
	
	/**
	 * 删除子账户
	 * @param id
	 * @return
	 */
	int delete(int id);
	
	/**
	 * 根据ID查询子账户
	 * @param id
	 * @return
	 */
	MerchantUserChildren selectById(int id);
	
	/**
	 * 条件查询子账户
	 * @param user
	 * @return
	 */
	List<MerchantUserChildren> list(MerchantUserChildren user);
	
}
