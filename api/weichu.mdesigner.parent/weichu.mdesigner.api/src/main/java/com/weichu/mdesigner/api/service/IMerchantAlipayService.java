package com.weichu.mdesigner.api.service;

import com.weichu.mdesigner.common.entity.MerchantAlipay;
import com.weichu.mdesigner.common.entity.MerchantOrder;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 支付宝支付service
 * @author Administrator
 *
 */
public interface IMerchantAlipayService {

	/**
	 * 商家自己配置 支付宝支付配置
	 * @param alipay
	 * @param mid
	 * @return
	 */
	public int addAlipayConfig(MerchantAlipay alipay, int mid) throws YdpException;
	
	/**
	 * 商家修改 支付宝支付配置
	 * @param alipay
	 * @param mid
	 * @return
	 */
	public int updateAlipayConfig(MerchantAlipay alipay, int mid) throws YdpException;
	
	/**
	 * 根据id 查询商家支付宝配置
	 * @param mid
	 * @return
	 */
	public MerchantAlipay selectByMId(int mid);
	
	/**
	 * 支付订单
	 * @param order
	 * @param mid
	 * @return
	 */
	public int pay(MerchantOrder order, int mid) throws Exception;
	
}
