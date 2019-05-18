package com.weichu.mdesigner.api.service;

import com.weichu.mdesigner.common.entity.MerchantWxpayInfo;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 微信支付 需要提交的资料
 * @author Administrator
 *
 */
public interface IMerchantWxpayInfoService {
	
	/**
	 * 保存
	 * @param wxpayInfo
	 * @param mid
	 * @return
	 */
	MerchantWxpayInfo save(MerchantWxpayInfo wxpayInfo, Integer mid) throws YdpException;
	
	/**
	 * 根据商家id查询
	 * @param mid
	 * @return
	 */
	MerchantWxpayInfo selectByMid(Integer mid);
	
	/**
	 * 修改商家微信支付审核信息
	 * @param wxpayInfo
	 * @param mid
	 * @return
	 */
	MerchantWxpayInfo update(MerchantWxpayInfo wxpayInfo, Integer mid) throws YdpException;
	
}
