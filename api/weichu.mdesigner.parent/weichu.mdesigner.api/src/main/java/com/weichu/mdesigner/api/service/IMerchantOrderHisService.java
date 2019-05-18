package com.weichu.mdesigner.api.service;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.api.vo.OrderVo;
import com.weichu.mdesigner.common.vo.OrderHisVo;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 历史订单
 * @author Administrator
 *
 */
public interface IMerchantOrderHisService {
	
	/**
	 * 支付成功后，订单表入历史表
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int insertFromOrder(String orderNo, Integer mid);
	
	/**
	 * 根据订单号获取历史订单
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	OrderHisVo getByOrderNo(String orderNo, Integer merchantId);
	/**
	 * 分页查询历史订单
	 * @param pageSize
	 * @param pageNum
	 * @param searchParams
	 * @param mid
	 * @return
	 */
	PageBean<OrderHisVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, Integer mid);
	
	/**
	 * 退款操作
	 * @param orderNo 订单号
	 * @param merchantId 商家id
	 * @param refundPrice 退款金额
	 * @return
	 */
	int refundOrderHis(String orderNo, Integer merchantId, Integer refundLimit, Integer refundMethod, 
			String refundAmount, String refundReason, String username)  throws YdpException;
	
	/**
	 * 
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	Map<String, List<?>> listByOrderNo(String orderNo, Integer merchantId, Integer payMethod);
	
	/**
	 * 修改订单备注
	 * @param orderNo
	 * @param remark
	 * @param merchantId
	 * @return
	 */
	int modifyRemark(String orderNo, String remark, Integer merchantId);
	
	/**
	 * 查看合并订单
	 * @param outTradeNo
	 * @param mid
	 * @return
	 */
	List<OrderHisVo> listOrderHisByOutTradeNo(String outTradeNo, int mid);
	
	/**
	 * 三个月支付，支付宝会发送异步通知结束交易(不可退款) 我们要关闭订单
	 * @param outTradeNo
	 * @param isMergedOrder
	 * @param mid
	 * @return
	 */
	int closeHisOrder(String outTradeNo, boolean isMergedOrder, int mid);
	
	/**
	 * 打印收银小票
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	OrderHisVo selectOrderByOrderNo(String orderNo, int mid) throws YdpException;
}
