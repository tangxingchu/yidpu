package com.weichu.mdesigner.common.mapper;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantPayOrderHis;
import com.weichu.mdesigner.common.entity.MerchantPayOrderHisExample;

public interface MerchantPayOrderHisMapper {
    long countByExample(MerchantPayOrderHisExample example);

    int deleteByExample(MerchantPayOrderHisExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantPayOrderHis record);

    int insertSelective(MerchantPayOrderHis record);

    List<MerchantPayOrderHis> selectByExample(MerchantPayOrderHisExample example);

    MerchantPayOrderHis selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantPayOrderHis record);

    int updateByPrimaryKey(MerchantPayOrderHis record);
    
    /**
     * 单个订单收款完成之后入库历史表
     * @param parentOrderNo
     * @param merchantId
     * @return
     */
    int insertFromPayOrderByOrderNo(@Param("orderNo")String parentOrderNo, @Param("merchantId")Integer merchantId);
    
    /**
     * 
     * @return
     */
    int insertFromPayOrder(@Param("ids")List<Integer> ids, @Param("merchantId")Integer merchantId);
    
    /**
     * 合并订单收款完成之后入库历史表
     * @param parentOutTradeNo
     * @param merchantId
     * @return
     */
    int insertFromPayOrderByoutTradeNo(@Param("outTradeNo")String parentOutTradeNo, @Param("merchantId")Integer merchantId);
    
    /**
     * 根据支付单号查询
     * @param orderNo
     * @param merchantId
     * @return
     */
	MerchantPayOrderHis getByOrderNo(@Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId);
	
	/**
     * 根据订单号查询
     * @param parentOrderNo
     * @param merchantId
     * @return
     */
	List<MerchantPayOrderHis> getByParentOrderNo(@Param("parentOrderNo")String parentOrderNo, @Param("merchantId")Integer merchantId);
	
	/**
     * 根据合并订单号查询
     * @param orderNo
     * @param merchantId
     * @return
     */
	List<MerchantPayOrderHis> getByParentOutTradeNo(@Param("parentOutTradeNo")String parentOutTradeNo, @Param("merchantId")Integer merchantId);
	
	/**
	 * 支付单全额退款
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	int refundAllByOrderNo(@Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId);

	/**
	 * 支付单部分退款
	 * @param orderNo
	 * @param refundAmount
	 * @param merchantId
	 * @return
	 */
	int refundPartByOrderNo(@Param("orderNo")String orderNo, @Param("refundAmount")BigDecimal refundAmount, @Param("merchantId")Integer merchantId);
	
	/**
	 * 关闭订单
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	int closeByOrderNo(@Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId);
}