package com.weichu.mdesigner.common.mapper;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantOrder;
import com.weichu.mdesigner.common.entity.MerchantOrderExample;

public interface MerchantOrderMapper {
    long countByExample(MerchantOrderExample example);

    int deleteByExample(MerchantOrderExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantOrder record);

    int insertSelective(MerchantOrder record);

    List<MerchantOrder> selectByExample(MerchantOrderExample example);

    MerchantOrder selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantOrder record);

    int updateByPrimaryKey(MerchantOrder record);
    
    /**
     * 根据订单号查询订单
     * @param orderNo
     * @param merchantId
     * @return
     */
    MerchantOrder selectByOrderNo(@Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId);
    
    /**
     * 查询具体的附属属性项的价格波动值
     * @param extraCode
     * @param itemValue
     * @param goodsId
     * @param merchantId
     * @return
     */
    Map<String, Object> selectExtraItem(@Param("extraCode")String extraCode, @Param("itemValue")String itemValue,
    		@Param("goodsId")Integer goodsId, @Param("merchantId")Integer merchantId);
    
    /**
     * 商家确认订单(扫码下单或者预定)
     * @param orderNo
     * @param mid
     * @return
     */
	int confirmOrder(@Param("orderNo")String orderNo, @Param("merchantId")int mid, @Param("createUser")String createUser);
	
	/**
	 * 修改订单金额(订单项退单操作)
	 * @param orderNo
	 * @param orderItemId
	 * @param mid
	 * @return
	 */
//	int updateOrderPrice(@Param("orderNo")String orderNo, @Param("orderItemId")int orderItemId,
//			@Param("merchantId")int mid);
	int updateOrderPrice(@Param("orderNo")String orderNo, @Param("merchantId")int mid);
	
	/**
	 * 更新支付订单号
	 * @param outTradeNo
	 * @param orderNo
	 * @return
	 */
	int updateOutTradeNo(@Param("outTradeNo")String outTradeNo, @Param("orderNo")String orderNo, @Param("merchantId")int mid);
	
	/**
	 * 订单支付成功
	 * @param orderNo
	 * @return
	 * @Param("orderNo")String orderNo, @Param("endTime")Date endTime, @Param("payPrice")Float payPrice,
			@Param("payMethod")Integer payMethod, @Param("subtractType")Integer subtractType, @Param("subtractAmount")Float subtractAmount, 
			@Param("subtractRemark")String subtractRemark, @Param("merchantId")int mid
	 */
	int paySuccess(MerchantOrder record);

	/**
	 * 合并订单
	 * @param orderNos
	 * @param mid
	 * @return
	 */
	int mergeOrder(@Param("orderNos")List<String> orderNos, @Param("outTradeNo")String outTradeNo, @Param("merchantId")Integer mid);
	
	/**
	 * 讲已合并的订单拆开(取消合并)
	 * @param orderNos
	 * @param mid
	 * @return
	 */
	int forkOrder(@Param("orderNos")List<String> orderNos, @Param("merchantId")int mid);
	
	/**
	 * 查询当前订单所属分组 除了当前订单 还有几个订单
	 * @param currOrderNo
	 * @return
	 */
	long countGroupSizeByOrderNo(@Param("orderNo")String currOrderNo, @Param("merchantId")int mid);
	
	/**
	 * 修改备注信息
	 * @param orderId
	 * @param remark
	 * @param mid
	 * @return
	 */
	int modifyRemark(@Param("id")Integer orderId, @Param("remark")String remark, @Param("merchantId")int mid);

	/**
	 * 完成订单
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int finishOrder(@Param("orderNo")String orderNo, @Param("merchantId")int mid);
	
	/**
	 * 取消订单(用餐订单界面)
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int cancelOrder(@Param("orderNo")String orderNo, @Param("merchantId")int mid);

	/**
	 * 删除订单(用餐订单界面)
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int deleteOrder(@Param("orderNo")String orderNo, @Param("merchantId")int mid);

	/**
	 * 查询当前桌台是否有未完成的订单,提示用户
	 * 界面将桌台状态设置为空闲时需要校验一下
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	long countByTableCode(@Param("tableCode")String tableCode, @Param("merchantId")Integer merchantId);

	/**
	 * 支付金额≠订单金额时锁定订单，将状态改为-1，并更改支付方式
	 * @param orderNo
	 * @param payMethod
	 * @param mid
	 * @return
	 */
	int lockedOrderByPayOrderNo(@Param("payOrderNo")String payOrderNo, @Param("payMethod")Integer payMethod, 
			@Param("payNo")String payNo, @Param("exceptionPrice") BigDecimal exceptionPrice, @Param("merchantId")Integer mid);
	
	/**
	 * 修改支付单号(手机每扫码支付一次就修改一次)
	 * @param id
	 * @param payOrderNo
	 * @return
	 */
	int updatePayOrderNo(@Param("id")Integer id, @Param("payOrderNo")String payOrderNo);

	/**
	 * 换台
	 * @param tableCode
	 * @param newTableCode
	 * @param mid
	 * @return
	 */
	int changeTableCode(@Param("tableCode")String tableCode, @Param("newTableCode")String newTableCode, 
			@Param("merchantId")Integer mid);

	int deleteOrderByOpenid(@Param("orderNo")String orderNo, @Param("openid")String openid, @Param("merchantId")Integer merchantId);

	int deleteOrderByBuyerid(@Param("orderNo")String orderNo, @Param("buyerid")String buyerid, @Param("merchantId")Integer merchantId);

}