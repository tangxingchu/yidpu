package com.weichu.mdesigner.api.service;

import java.util.Map;

import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 微信支付
 * @author Administrator
 *
 */
public interface IWxpayService {
	
	/**
	 * 支撑成功处理
	 * @param notifyData
	 * @return
	 */
	Map<String, String> payBack(String notifyData) throws Exception;
	
	/**
	 * 统一下单
	 * @param merchantId
	 * @param orderNo
	 * @return
	 */
	Map<String, String> unifiedOrder(Integer merchantId, String orderNo, String ip, String openid) throws Exception;
	
	/**
	 * 退款处理
	 * @param params (这里带上sub_mch_id、transaction_id、out_trade_no、out_refund_no、total_fee、refund_fee )
	 * 子商户号、微信交易号、订单号、退款单号、订单金额、退款金额、申请退款金额
	 * @return
	 * @throws YdpException
	 */
	Map<String, String> refundOrder(Map<String, String> params) throws Exception;
	
	/**
	 * 关闭订单
	 * @param params (这里带上sub_mch_id、out_trade_no)
	 * 子商户号、订单号、
	 * @return
	 * @throws YdpException
	 */
	Map<String, String> closeOrder(Map<String, String> params) throws Exception;
	
	/**
	 * 订单查询
	 * @param params (这里带上sub_mch_id、out_trade_no)
	 * 子商户号、订单号、
	 * @return
	 * @throws Exception 
	 */
	Map<String, String> orderquery(Map<String, String> params) throws Exception;
	
	/**
	 * 前台扫码支付
	 * @param merchantId
	 * @param ip
	 * @param openid
	 * @return
	 */
	Map<String, String> unifiedFrontOrder(Integer merchantId, String ip, String openid, String payAmount) throws Exception;
}
