package com.weichu.mdesigner.api.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.AdminOrder;

/**
 * 商家购买功能订单
 * @author Administrator
 *
 */
public interface IAdminOrderService {
	
	/**
	 * 保存订单（订购菜单功能）
	 * @param order
	 * @param mid
	 * @return
	 */
	int save(AdminOrder order, int mid);
	
	/**
	 * 取消订单 
	 * @param orderId
	 * @param mid
	 * @return
	 */
	int cancelOrder(int orderId, int mid);
	
	/**
	 * 删除订单 
	 * @param orderId
	 * @param mid
	 * @return
	 */
	int deleteOrder(int orderId, int mid);
	
	/**
	 * 完成订单(交易完成)
	 * @param params orderNo, tradeNo 平台交易号, platform 1=支付宝,2=微信, passbackParams 回传参数
	 * @return
	 */
	int finishOrder(Map<String, Object> params);
	
	/**
	 * 完成结束(交易结束，不能在退款)
	 * @param orderNo
	 * @return
	 */
	int closeOrder(String orderNo);
	
	/**
	 * 查询所有订单
	 * @param mid
	 * @return
	 */
	List<AdminOrder> list(int mid);
	
	/**
	 * 根据订单号查询订单
	 * @param orderNo
	 * @return
	 */
	AdminOrder selectByOrderNo(String orderNo, int mid);
	
	/**
	 * 校验订单号与 支付金额
	 * @param orderNo
	 * @param totalAmount
	 * @return
	 */
	boolean vilidateOrderAmount(String orderNo, BigDecimal totalAmount);
	
	
	
	/**
	 * 修改实际支付金额与支付宝账号
	 * @param orderNo
	 * @param totalAmount
	 * @return
	 */
//	int updateTotalAmount(String orderNo, Float totalAmount);
}
