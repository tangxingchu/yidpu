package com.weichu.mdesigner.api.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.common.entity.MerchantCashierLog;
import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 前台扫码订单
 * @author Administrator
 *
 */
public interface IMerchantPayOrderService {

	/**
	 * 当前所有前台扫码支付订单
	 * @param mid
	 * @return
	 */
	List<MerchantPayOrder> list(int mid);
	
	/**
	 * 新增前台扫码支付订单
	 * @param payOrder
	 * @param mid
	 * @return
	 */
	String saveByAlipay(MerchantPayOrder payOrder, int mid, String aplipayToken, JSONObject bizContent) throws YdpException;
	
	/**
	 * 
	 * @param payOrder
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	int save(MerchantPayOrder payOrder, int mid) throws YdpException;
	
	/**
	 * 取消支付的，订单直接删除
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int deleteByOrderNo(String orderNo, int mid) throws YdpException;

	/**
	 * 前台扫码支付成功回调
	 * @param payNo
	 * @param orderNo
	 * @param merchantId
	 * @param totalAmount
	 * @param sendPayDate
	 * @param payMethod
	 * @param sendMSG
	 * @return
	 */
	int paySuccess(String payNo, String orderNo, Integer merchantId, BigDecimal totalAmount, Date sendPayDate,
			int payMethod, boolean sendMSG, String code) throws YdpException;
	
	/**
	 * 桌台扫码支付成功回调
	 * @param payNo
	 * @param orderNo
	 * @param merchantId
	 * @param totalAmount
	 * @param sendPayDate
	 * @param payMethod
	 * @return
	 */
	int paySuccess(String payNo, String orderNo, Integer merchantId, BigDecimal totalAmount, Date sendPayDate,
			int payMethod, String code) throws YdpException;

//	/**
//	 * 关闭订单
//	 * @param orderNo
//	 * @param merchantId
//	 * @return
//	 */
//	int closeByOrderNo(String orderNo, Integer merchantId) throws YdpException;
	
	/**
	 * 根据id删除
	 * @param id
	 * @param mid
	 * @return
	 */
	int deleteById(Integer id, int mid) throws YdpException;
	
	/**
	 * 根据支付单号查找
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	MerchantPayOrder getByOrderNo(String orderNo, int mid) throws YdpException;
	
	
	/**
	 * 当前所有前台扫码支付订单
	 * @param mid
	 * @return
	 */
	List<MerchantPayOrder> listSuccessOrder(int mid);

	int archiving(List<MerchantCashierLog> cashierLogs, int mid) throws YdpException;
	
}
