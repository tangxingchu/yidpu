package com.weichu.mdesigner.api.service;

import com.weichu.mdesigner.common.entity.MerchantBusinessInfo;

/**
 * 商家营业相关基本信息
 * @author Administrator
 *
 */
public interface IMerchantBusinessInfoService {
	
	/**
	 * 查询积分返现1元需要多少积分
	 * @param mid
	 * @return
	 */
	Integer selectPointCash(Integer mid);
	
	/**
	 * 更新或者新增
	 * @param businessInfo
	 * @param mid
	 * @return
	 */
	Integer saveOrUpdate(MerchantBusinessInfo businessInfo, Integer mid);
	
	/**
	 * 查询
	 * @param mid
	 * @return
	 */
	MerchantBusinessInfo selectByMid(Integer mid);
	
}
