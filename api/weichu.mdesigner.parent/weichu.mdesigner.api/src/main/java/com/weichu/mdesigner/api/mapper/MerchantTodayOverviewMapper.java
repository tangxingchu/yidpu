package com.weichu.mdesigner.api.mapper;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface MerchantTodayOverviewMapper {
	
	Map<String, BigDecimal> sumPayAmountAll(@Param("merchantId")Integer merchantId, @Param("beginPayTime")Date beginPayTime, 
			@Param("endPayTime")Date endPayTime);
	
	/**
	 * 统计今日概览营业额
	 * @param merchantId
	 * @return
	 */
	BigDecimal sumPayAmount(@Param("merchantId")Integer merchantId, @Param("beginPayTime")Date beginPayTime, 
			@Param("endPayTime")Date endPayTime);
	
	/**
	 * 统计今日概览收款金额
	 * @param merchantId
	 * @param beginPayTime
	 * @param endPayTime
	 * @return
	 */
	BigDecimal sumIncome(@Param("merchantId")Integer merchantId, @Param("beginPayTime")Date beginPayTime, 
			@Param("endPayTime")Date endPayTime);
	
	/**
	 * 统计今日概览退款金额
	 * @param merchantId
	 * @param beginPayTime
	 * @param endPayTime
	 * @return
	 */
	BigDecimal sumRefund(@Param("merchantId")Integer merchantId, @Param("beginPayTime")Date beginPayTime, 
			@Param("endPayTime")Date endPayTime);
	
	/**
	 * 统计今日概览支付方式
	 * @param merchantId
	 * @param beginPayTime
	 * @param endPayTime
	 * @return
	 */
	List<Map<String, Object>> groupPayMethod(@Param("merchantId")Integer merchantId, @Param("beginPayTime")Date beginPayTime, 
			@Param("endPayTime")Date endPayTime);
	
	/**
	 * 统计今日概览订单笔数
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	Map<String, Long> countAllOrder(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	/**
	 * 统计今日概览订单笔数
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	int countOrder(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 统计今日概览退单笔数
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	int countOrderByRefund(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 统计今日概览退单笔数(全额退款)
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	int countOrderByRefund_All(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 统计今日概览退单笔数(部分退款)
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	int countOrderByRefund_Part(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 异常单(订单金额<>收款金额+优惠金额)
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	int countOrderByException(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 统计今日概览客流量
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	int countDiners(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 统计今日人均消费
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	String averageOrderPrice(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 今日消费最高金额
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	BigDecimal maxTotalPrice(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 今日消费最低金额
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	BigDecimal minTotalPrice(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 统计今日翻台率
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	Map<String, BigDecimal> ftl(@Param("merchantId")Integer merchantId, @Param("beginOrderTime1")Date beginOrderTime1, 
			@Param("endOrderTime1")Date endOrderTime1, @Param("endOrderTime2")Date endOrderTime2);
	/**
	 * 今日销售排行榜
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	List<Map<String, Object>> salesRank(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 销售额分类统计
	 * @param merchantId
	 * @param beginOrderTime
	 * @param endOrderTime
	 * @return
	 */
	List<Map<String, Object>> salesByCategory(@Param("merchantId")Integer merchantId, @Param("beginOrderTime")Date beginOrderTime, 
			@Param("endOrderTime")Date endOrderTime);
	
	/**
	 * 查询30天之前的日报营业额数据(界面默认30天周期)
	 * @param merchantId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectTurnoverDay(@Param("merchantId")Integer merchantId, @Param("beginDate")Date beginDate, 
			@Param("endDate")Date endDate);
	
	/**
	 * 查询营业额周报
	 * @param merchantId
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectTurnoverWeek(@Param("merchantId")Integer merchantId, @Param("beginDate")Date beginDate, 
			@Param("endDate")Date endDate);
	
	/**
	 * 查询营业额月报
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectTurnoverMonth(@Param("merchantId")Integer merchantId);
	
	/**
	 * 查询营业额季报
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectTurnoverQuarter(@Param("merchantId")Integer merchantId);
	
	/**
	 * 营业额年报
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectTurnoverYear(@Param("merchantId")Integer merchantId);
	
	/**
	 * 查询30天之前的日报客流量数据(界面默认30天周期)
	 * @param merchantId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectCustomerFlowDay(@Param("merchantId")Integer merchantId, @Param("beginDate")Date beginDate, 
			@Param("endDate")Date endDate);
	
	/**
	 * 客流量周报
	 * @param merchantId
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectCustomerFlowWeek(@Param("merchantId")Integer merchantId, @Param("beginDate")Date beginDate, 
			@Param("endDate")Date endDate);
	
	/**
	 * 客流量月报
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectCustomerFlowMonth(@Param("merchantId")Integer merchantId);
	
	/**
	 * 客流量季报
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectCustomerFlowQuarter(@Param("merchantId")Integer merchantId);
	
	/**
	 * 客流量年报
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectCustomerFlowYear(@Param("merchantId")Integer merchantId);
	
	/**
	 * 查询30天之前的日报用餐订单数据(界面默认30天周期)
	 * @param merchantId
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectOrderDay(@Param("merchantId")Integer merchantId, @Param("beginDate")Date beginDate, 
			@Param("endDate")Date endDate);
	
	/**
	 * 用餐订单数据周报
	 * @param merchantId
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectOrderWeek(@Param("merchantId")Integer merchantId, @Param("beginDate")Date beginDate, 
			@Param("endDate")Date endDate);
	
	/**
	 * 用餐订单数据月报
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectOrderMonth(@Param("merchantId")Integer merchantId);
	
	/**
	 * 用餐订单数据季报
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectOrderQuarter(@Param("merchantId")Integer merchantId);
	
	/**
	 * 用餐订单数据年报
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectOrderYear(@Param("merchantId")Integer merchantId);
	/**
	 * 销量排行榜(根据销售数量排行)
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectGoodsRankBySaleNum(@Param("merchantId")Integer merchantId);
	
	/**
	 * 销量排行榜(根据销售额排行)
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectGoodsRankBySalePrice(@Param("merchantId")Integer merchantId);
	
	/**
	 * 历史翻台率
	 * @param merchantId
	 * @return
	 */
	List<Map<String, Object>> selectTableRate(@Param("beginDate")Date beginDate, @Param("endDate")Date endDate,
			@Param("merchantId")Integer merchantId);
	
	/**
	 * 查询最近15天的营业额
	 * @param beginDate
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> selectTurnover15Day(@Param("beginDate")Date beginDate, @Param("merchantId")int mid);
	
	/**
	 * 总营业额、平均营业额、日环比
	 * @param merchantId
	 * @return
	 */
	List<BigDecimal> totalTurnover(@Param("merchantId")Integer merchantId);
	
	/**
	 * 查询最近15天的订单量
	 * @param beginDate
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> selectOrderNum15Day(@Param("beginDate")Date beginDate, @Param("merchantId")int mid);
	
	/**
	 * 订单日平均量
	 * @param mid
	 * @return
	 */
	BigDecimal avgOrderNum(@Param("merchantId")int mid);
	
	/**
	 * 查询合计订单数据量
	 * @param mid
	 * @return
	 */
	Integer totalOrder(@Param("merchantId")int mid);
	
	/**
	 * 查询最近15天平均消费数据
	 * @param date
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> selectAVG15Day(@Param("beginDate")Date beginDate, @Param("merchantId")int mid);
	
	/**
	 * 平均 平均消费数据
	 * @param mid
	 * @return
	 */
	BigDecimal avgAvg(@Param("merchantId")int mid);
	
	/**
	 * 查询最后2天平均消费数据做环比
	 * @param mid
	 * @return
	 */
	List<BigDecimal> selectAVGLast2Day(@Param("merchantId")int mid);
	
	/**
	 * 查询最近15天的翻台率
	 * @param date
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> selectTableRate15Day(@Param("beginDate")Date beginDate, @Param("merchantId")int mid);
	
	/**
	 * 平均翻台率
	 * @param mid
	 * @return
	 */
	BigDecimal avgTableRate(@Param("merchantId")int mid);
	
	/**
	 * 查询最后2天翻台率，做日环比
	 * @param mid
	 * @return
	 */
	List<BigDecimal> selectTableRateLast2Day(@Param("merchantId")int mid);
	
	/**
	 * 查询最近15天的客流量
	 * @param beginDate
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> selectCustomerFlow15Day(@Param("beginDate")Date beginDate, @Param("merchantId")int mid);
	
	/**
	 * 查询累计分类销售数据
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> selectSaleCategory(@Param("merchantId")int mid);
	
	/**
	 * 查询支付分类 总金额
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> selectPayMethodTotal(@Param("merchantId")int mid);
	
	/**
	 * 统计今日会员充值
	 * @param merchantId
	 * @param beginRecordTime
	 * @param endRecordTime
	 * @return
	 */
	List<Map<String, Object>> selectMemberRechargeTotal(@Param("merchantId")Integer merchantId, @Param("beginRecordTime")Date beginRecordTime, 
			@Param("endRecordTime")Date endRecordTime);
	
	/**
	 * 查询会员余额汇总
	 * @param mid
	 * @return
	 */
	BigDecimal selectMemberAccountBalance(@Param("merchantId")int mid);
	
	/**
	 * 查询会员累计充值
	 * @param mid
	 * @return
	 */
	Map<String, BigDecimal> selectMemberRecordTotal(@Param("merchantId")int mid);
	
	/**
	 * 会员分析 查询总营业额
	 * @param mid
	 * @return
	 */
	BigDecimal selectTurnoverByMember(@Param("merchantId")int mid);
	
	/**
	 * 会员分析 查询消费额
	 * @param mid
	 * @return
	 */
	BigDecimal selectMemberTurnover(@Param("merchantId")int mid);
	
	/**
	 * 每日会员新增趋势图
	 * @param merchantId
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectReportMemberNew(@Param("merchantId")Integer merchantId, @Param("beginDate")Date beginDate, 
			@Param("endDate")Date endDate);
	
	/**
	 * 每日会员充值分析
	 * @param merchantId
	 * @param beginDate
	 * @param endDate
	 * @returne
	 */
	List<Map<String, Object>> selectReportMemberRecharge(@Param("merchantId")Integer merchantId, @Param("beginDate")Date beginDate, 
			@Param("endDate")Date endDate);
	
	/**
	 * 每日会员消费分析
	 * @param merchantId
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectReportMemberConsume(@Param("merchantId")Integer merchantId, @Param("beginDate")Date beginDate, 
			@Param("endDate")Date endDate);
	
	/**
	 * 对账单查询每日明细
	 * @param merchantId
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectReportReconciliation(Map<String, Object> params);
	
	/**
	 * 对账单查询合计
	 * @param merchantId
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	List<Map<String, Object>> selectReportReconciliationTotal(Map<String, Object> params);
	
	/**
	 * 会员消费排行榜
	 * @param params
	 * @return
	 */
	List<Map<String, Object>> selectMemberRank(Map<String, String> params);
}
