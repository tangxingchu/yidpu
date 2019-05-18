package com.weichu.mdesigner.common.service;

import com.weichu.mdesigner.common.vo.MerchantUserVo;

public interface IMerchantCommonService {
	/**
	 * 根据id查找商家用户(用于查详情，是否第一次登录等)
	 * @param id
	 * @return
	 */
	public MerchantUserVo selectById(Integer id);
}
