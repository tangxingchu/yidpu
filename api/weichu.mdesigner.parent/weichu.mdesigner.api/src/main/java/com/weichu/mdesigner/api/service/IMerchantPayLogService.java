package com.weichu.mdesigner.api.service;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.api.vo.MerchantPayLogVo;
import com.weichu.mdesigner.common.entity.MerchantPayLog;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 支付日志
 * @author Administrator
 *
 */
public interface IMerchantPayLogService {
	
	/**
	 * 保存支付日志
	 * @param MerchantPayLog
	 * @return
	 */
	int save(MerchantPayLog merchantPayLog, Integer mid);
	
	/**
	 * 查询支付日志(查询界面使用 根据条件查询)
	 * @param MerchantPayLog
	 * @param mid
	 * @return
	 */
	List<MerchantPayLog> list(MerchantPayLog merchantPayLog,  int mid);	
	
	/**
	 * 历史订单界面 点开+号使用,查询订单对应的收(退)款流水
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	List<MerchantPayLog> listByOrderNo(String orderNo, int mid);

	/**
	 * 分页查询
	 * @param pageSize
	 * @param pageNum
	 * @param searchParams
	 * @param mid
	 * @return
	 */
	PageBean<MerchantPayLogVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, int mid);
	
	/**
	 * 历史订单界面 点开+号使用,查询订单对应的收(退)款流水（根据合并单号查询关联的收付款流水）
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	List<MerchantPayLog> listByOutTradeNo(String outTradeNo, Integer merchantId);
	
}
