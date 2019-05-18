package com.weichu.mdesigner.api.service;

import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 前台顾客扫码支付单历史表
 * @author Administrator
 *
 */
public interface IMerchantPayOrderHisService {

	/**
	 * 支付单退款操作
	 * @param orderNo
	 * @param merchantId
	 * @param refundLimit
	 * @param refundMethod
	 * @param refundAmount
	 * @param refundReason
	 * @param username
	 * @param tableCode 桌台编号
	 * @return
	 * @throws YdpException
	 */
	int refundPayOrderHis(String orderNo, String payOrderNo, Integer merchantId, Integer refundLimit, Integer refundMethod, 
			String refundAmount, String refundReason, String username, String tableCode)  throws YdpException;
	
	/**
	 * 关闭订单
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	int closeByOrderNo(String orderNo, Integer merchantId) throws YdpException;
	
}
