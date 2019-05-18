package com.weichu.mdesigner.api.service;

import com.weichu.mdesigner.common.entity.MerchantSMSSign;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 商家短信签名
 * @author Administrator
 *
 */
public interface IMerchantSMSSignService {
	
	/**
	 * 新增
	 * @param smsSign
	 * @param mid
	 * @return
	 */
	int saveSMSSign(MerchantSMSSign smsSign, Integer mid) throws YdpException;
	
	/**
	 * 查询
	 * @param mid
	 * @return
	 */
	MerchantSMSSign selectByMId(Integer mid);
	
	/**
	 * 查询已生效的短信签名
	 * @param mid
	 * @return
	 */
	MerchantSMSSign selectStatus0ByMid(Integer mid);
	
}
