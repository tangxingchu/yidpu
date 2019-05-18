package com.weichu.mdesigner.common.mapper;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantOrderHis;
import com.weichu.mdesigner.common.entity.MerchantOrderHisExample;
import com.weichu.mdesigner.common.vo.OrderHisVo;

public interface MerchantOrderHisMapper {
    long countByExample(MerchantOrderHisExample example);

    int deleteByExample(MerchantOrderHisExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantOrderHis record);

    int insertSelective(MerchantOrderHis record);

    List<MerchantOrderHis> selectByExample(MerchantOrderHisExample example);

    MerchantOrderHis selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantOrderHis record);

    int updateByPrimaryKey(MerchantOrderHis record);
    
    /**
     * 支付成功后订单入历史表
     * @param orderNo
     * @return
     */
    int insertFromOrder(@Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId);
    
    /**
     * 根据条件查询
     * @param paramsMap
     * @return
     */
    List<OrderHisVo> listBySearchParams(Map<String, Object> paramsMap);
    
    /**
     * 根据订单号获取历史订单
     * @param orderNo
     * @param merchantId
     * @return
     */
    OrderHisVo selectByOrderNo(@Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId);

	/**
	 * 点开界面+号 展开合并支付订单
	 * @param outTradeNo
	 * @param merchantId
	 * @return
	 */
	List<OrderHisVo> listByOutTradeNo(@Param("orderNo")String orderNo, @Param("outTradeNo")String outTradeNo,
			@Param("merchantId")Integer merchantId);

	/**
	 * 全额退款
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	int refundAllByOrderNo(@Param("orderNo")String orderNo, @Param("refundAmount")BigDecimal refundAmount, @Param("merchantId")Integer merchantId);

	/**
	 * 部分退款
	 * @param orderNo
	 * @param refundAmount
	 * @param merchantId
	 * @return
	 */
	int refundPartByOrderNo(@Param("orderNo")String orderNo, @Param("refundAmount")BigDecimal refundAmount, @Param("merchantId")Integer merchantId);

	/**
	 * 修改备注
	 * @param orderNo
	 * @param remark
	 * @param merchantId
	 * @return
	 */
	int modifyRemark(@Param("orderNo")String orderNo, @Param("remark")String remark, @Param("merchantId")Integer merchantId);

	/**
	 * 查看合并订单
	 * @param outTradeNo
	 * @param mid
	 * @return
	 */
	List<OrderHisVo> listOrderHisByOutTradeNo(@Param("outTradeNo")String outTradeNo, @Param("merchantId")Integer merchantId);
	
	/**
	 * 根据合并单号 全额退款
	 * @param OutTradeNo
	 * @param merchantId
	 * @return
	 */
	int refundALlByOutTradeNo(@Param("outTradeNo")String outTradeNo, @Param("refundAmount")BigDecimal refundAmount, @Param("merchantId")Integer merchantId);
	
	/**
	 * 合并支付单，根据合并单号关闭订单
	 * @param outTradeNo
	 * @param mid
	 * @return
	 */
	int closeOrderByOutTradeNo(@Param("outTradeNo")String outTradeNo, @Param("merchantId")Integer merchantId);

	/**
	 * 非合并支付订单，根据订单号关闭订单
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int closeOrderByOrderNo(@Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId);
	
	/**
	 * 退款订单详情(订单报表界面查询)
	 * @param merchantId
	 * @param beginOrderDate
	 * @param endOrderDate
	 * @return
	 */
	List<MerchantOrderHis> listReundOrderHis(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime,
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 退款订单详情-全额退款(订单报表界面查询)
	 * @param merchantId
	 * @param beginOrderDate
	 * @param endOrderDate
	 * @return
	 */
	List<MerchantOrderHis> listAllReundOrderHis(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime,
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 退款订单详情-部分退款(订单报表界面查询)
	 * @param merchantId
	 * @param beginOrderDate
	 * @param endOrderDate
	 * @return
	 */
	List<MerchantOrderHis> listPartReundOrderHis(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime,
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 异常订单详情-(订单报表界面查询)
	 * @param merchantId
	 * @param beginOrderDate
	 * @param endOrderDate
	 * @return
	 */
	List<MerchantOrderHis> listExceptionOrderHis(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime,
			@Param("endOrderTime")Date endOrderTime);
	
}