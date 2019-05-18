package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantAudit;

/**
 * 审核商家信息
 * @author Administrator
 *
 */
public interface IMerchantAuditService {
	
	/**
	 * 查询商家审核结果
	 * @param mid
	 * @return
	 */
	public List<MerchantAudit> list(int mid);
	
}
