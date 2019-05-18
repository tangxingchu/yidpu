package com.weichu.mdesigner.api.service;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.response.AlipayTradeCloseResponse;
import com.alipay.api.response.AlipayTradeCreateResponse;
import com.alipay.api.response.AlipayTradeQueryResponse;
import com.alipay.api.response.AlipayTradeRefundResponse;

/**
 * 阿里支付接口
 * @author Administrator
 *
 */
public interface IAlipayService {
	
	/**
	 * 关闭订单
	 * @param outTradeNo
	 * @param alipayToken
	 * @return
	 * @throws AlipayApiException
	 */
	AlipayTradeCloseResponse closeOrder(String outTradeNo, String alipayToken) throws AlipayApiException;
	
	/**
	 * 退款
	 * @param bizContent
	 * @param aplipayToken
	 * @return
	 * @throws AlipayApiException
	 */
	AlipayTradeRefundResponse refundOrder(JSONObject bizContent, String aplipayToken) throws AlipayApiException;
	
	/**
	 * 交易查询
	 * @param bizContent
	 * @param aplipayToken
	 * @return
	 * @throws AlipayApiException
	 */
	AlipayTradeQueryResponse tradeQuery(String outTradeNo, String aplipayToken) throws AlipayApiException;
	
	/**
	 * 创建交易
	 * @param bizContent
	 * @param aplipayToken
	 * @return
	 * @throws AlipayApiException
	 */
	AlipayTradeCreateResponse tradeCreate(JSONObject bizContent, String aplipayToken) throws AlipayApiException;
}
