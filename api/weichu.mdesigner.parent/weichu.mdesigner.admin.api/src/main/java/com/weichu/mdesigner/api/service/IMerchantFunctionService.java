package com.weichu.mdesigner.api.service;

import com.weichu.mdesigner.api.vo.MerchantFunctionVo;
import com.weichu.mdesigner.common.entity.MerchantFunction;

/**
 * 商家功能树维护
 * @author Administrator
 *
 */
public interface IMerchantFunctionService {
	
	
	/**
	 * 树形function
	 * @return
	 */
	public MerchantFunctionVo listFunction(int category);
	
	public int save(MerchantFunction function);
	
	public int update(MerchantFunction function);
	
	public int delete(int id);
	
	public MerchantFunction selectById(int id);
	
}
