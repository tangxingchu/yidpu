package com.weichu.mdesigner.common.mapper;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.AdminOrder;
import com.weichu.mdesigner.common.entity.AdminOrderExample;


public interface AdminOrderMapper {
    long countByExample(AdminOrderExample example);

    int deleteByExample(AdminOrderExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(AdminOrder record);

    int insertSelective(AdminOrder record);

    List<AdminOrder> selectByExample(AdminOrderExample example);

    AdminOrder selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminOrder record);

    int updateByPrimaryKey(AdminOrder record);
    
    /**
     * 取消订单
     * @param id
     * @param merchantId
     * @return
     */
    int cancelOrder(@Param("id")Integer id, @Param("merchantId")Integer merchantId);
    
    /**
     * 完成订单(支付宝支付)
     * @param id
     * @param merchantId
     * @return
     */
    int finishOrderByAlipay(@Param("orderNo")String orderNo, @Param("tradeNo")String tradeNo,
    		@Param("totalAmount")BigDecimal totalAmount, @Param("buyerId")String buyerId,
    		@Param("paymentTime")Date gmtPayment);
    
    /**
     * 完成订单(微信支付)
     * @param id
     * @param merchantId
     * @return
     */
    int finishOrderByWechat(@Param("orderNo")String orderNo, @Param("tradeNo")String tradeNo,
    		@Param("totalAmount")BigDecimal totalAmount, @Param("buyId")String buyId,
    		@Param("paymentTime")Date gmtPayment);
    
    /**
     * 修改实际支付金额
     * @param orderNo
     * @param totalAmount
     * @return
     */
	int updateTotalAmount(@Param("orderNo")String orderNo, @Param("totalAmount")BigDecimal totalAmount);
	
	/**
	 * 交易结束不能在退款(关闭订单)
	 * @param orderNo
	 * @return
	 */
	int closeOrder(@Param("orderNo")String orderNo);
}