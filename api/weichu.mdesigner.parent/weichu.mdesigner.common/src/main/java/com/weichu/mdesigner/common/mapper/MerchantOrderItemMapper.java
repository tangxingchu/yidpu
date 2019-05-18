package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantOrderItem;
import com.weichu.mdesigner.common.entity.MerchantOrderItemExample;

public interface MerchantOrderItemMapper {
    long countByExample(MerchantOrderItemExample example);

    int deleteByExample(MerchantOrderItemExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantOrderItem record);

    int insertSelective(MerchantOrderItem record);

    List<MerchantOrderItem> selectByExample(MerchantOrderItemExample example);

    MerchantOrderItem selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantOrderItem record);

    int updateByPrimaryKey(MerchantOrderItem record);
    
    /**
     * 批量插入
     * @param records
     * @return
     */
    int insertBatch(List<MerchantOrderItem> records);

    /**
     * 商家确认订单项(扫码下单与预定)
     * @param orderNo
     * @param orderItemId
     * @param mid
     * @return
     */
	int confirmOrderItem(@Param("orderNo")String orderNo, @Param("id")int orderItemId, @Param("merchantId")int mid);
	
	/**
     * 商家确认订单项(扫码下单与预定)
     * @param orderNo
     * @param orderItemId
     * @param mid
     * @return
     */
	int confirmOrderItemByOrderNo(@Param("orderNo")String orderNo, @Param("merchantId")int mid);
	
	/**
	 * 退单操作(取消订单项)
	 * @param orderNo
	 * @param orderItemId
	 * @param mid
	 * @return
	 */
	int cancelOrderItem(@Param("orderNo")String orderNo, @Param("id")int orderItemId, @Param("merchantId")int mid);
	
	/**
	 * 支付成功 
	 * @param orderNo
	 * @param mid
	 * @return
	 */
//	int paySuccess(@Param("orderNo")String orderNo, @Param("merchantId")int mid);

	/**
	 * 删除订单项
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	int deleteOrderItem(@Param("orderNo")String orderNo, @Param("id")Integer id, @Param("merchantId")int mid);

	/**
	 * 标记订单项为已出菜
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	int shippedOrderItem(@Param("orderNo")String orderNo, @Param("id")Integer id, @Param("merchantId")int mid);
	
	/**
	 * 标记为已上菜
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	int receiveOrderItem(@Param("orderNo")String orderNo, @Param("id")Integer id, @Param("merchantId")int mid);

	/**
	 * 完成订单
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int finishOrder(@Param("orderNo")String orderNo, @Param("merchantId")int mid);
	
	/**
	 * 关闭订单项
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	int closeOrderItem(@Param("orderNo")String orderNo,  @Param("id")Integer id, @Param("merchantId")int mid);

	/**
	 * 删除订单的时候删除订单项
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int deleteOrderItemByOrderNo(@Param("orderNo")String orderNo, @Param("merchantId")int mid);

	/**
	 * 加菜重新生成新的订单号
	 * @param oldOrderNo
	 * @param newOrderNo
	 * @return
	 */
	int updateOrderNo(@Param("oldOrderNo")String oldOrderNo, @Param("newOrderNo")String newOrderNo, @Param("merchantId")int mid);

	/**
	 * 修改后厨订单项的打印状态
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	int updateOrderItemPrintStatus(@Param("tableCode")String tableCode, @Param("merchantId")Integer mid);

	/**
	 * 修改后厨订单项的打印状态
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	int updatePrintStatusByOrderItemIds(@Param("orderItemIds")List<Integer> orderItemIds, @Param("merchantId")int mid);
	
	/**
	 * 修改后厨订单项的打印状态
	 * @param orderItemIds
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	int updatePrintStatusBygoodsIds(@Param("goodsIds")List<Integer> goodsIds, @Param("tableCode")String tableCode, @Param("merchantId")Integer mid);
}