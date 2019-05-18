package com.weichu.mdesigner.common.mapper;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.common.entity.MerchantPayOrderExample;

public interface MerchantPayOrderMapper {
    long countByExample(MerchantPayOrderExample example);

    int deleteByExample(MerchantPayOrderExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantPayOrder record);

    int insertSelective(MerchantPayOrder record);

    List<MerchantPayOrder> selectByExample(MerchantPayOrderExample example);

    MerchantPayOrder selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantPayOrder record);

    int updateByPrimaryKey(MerchantPayOrder record);
    
    /**
     * 扫码支付成功回调
     * @param payNo
     * @param orderNo
     * @param merchantId
     * @param valueOf
     * @param sendPayDate
     * @param payMethodAlipay
     * @return
     */
	int paySuccess(@Param("payNo")String payNo, @Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId,
			@Param("payPrice")BigDecimal totalAmount, @Param("payTime")Date sendPayDate, @Param("payMethod")int payMethod, @Param("code")String code);
	
	/**
	 * 删除订单
	 * @param id
	 * @param mid
	 * @return
	 */
	int deleteById(@Param("id")Integer id, @Param("merchantId")int mid);
	
	/**
	 * 支付单关联订单
	 * @param payOrderIds
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	int relateFrontOrder(@Param("ids")List<Integer> payOrderIds, @Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId);

	/**
	 * 合并单关联支付单
	 * @param payOrderIds
	 * @param outTradeNo
	 * @param merchantId
	 * @return
	 */
	int relateFrontOrderByOutTradeNo(@Param("ids")List<Integer> payOrderIds, @Param("outTradeNo")String outTradeNo, @Param("merchantId")Integer merchantId);

	/**
	 * 入库历史之后删除
	 * @param parentOutTradeNo
	 * @param mid
	 * @return
	 */
	int deleteByParentOutTradeNo(@Param("parentOutTradeNo")String parentOutTradeNo, @Param("merchantId")int mid);
	
	/**
	 * 入库历史之后删除
	 * @param parentOrderNo
	 * @param mid
	 * @return
	 */
	int deleteByParentOrderNo(@Param("parentOrderNo")String parentOrderNo, @Param("merchantId")int mid);
	
	/**
	 * 入库历史之后删除
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int deleteByIds(@Param("ids")List<Integer> ids, @Param("merchantId")int mid);
	
	/**
	 * 归档数据
	 * @param now
	 * @param mid
	 * @return
	 */
	int insertToHis(@Param("now")Date now, @Param("merchantId")int mid);
	
	int deleteByTime(@Param("now")Date now, @Param("merchantId")int mid);
	
}