package com.weichu.mdesigner.api.service.impl;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.weichu.mdesigner.api.mapper.MerchantTodayOverviewMapper;
import com.weichu.mdesigner.api.service.IReportService;
import com.weichu.mdesigner.common.entity.MerchantOrderHis;
import com.weichu.mdesigner.common.mapper.MerchantOrderHisMapper;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.PayMethod;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;
import com.weichu.mdesigner.utils.poi.PoiExcelHelper;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DatePattern;

/**
 * 报表service
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class ReportServiceImpl implements IReportService {

	@Autowired
	private MerchantTodayOverviewMapper mapper; 
	
	@Autowired
	private MerchantOrderHisMapper orderHisMapper;
	
	@Autowired
	private PoiExcelHelper excelHelper;
	/**
	 * 今日概览
	 */
	@Override
	public Map<String, Object> todayOverview(int mid) {
		Map<String, Object> results = new HashMap<>();
		//当前时间
		Date now = new Date();
		results.put("todayDate",  DateUtil.format(now, DatePattern.NORM_DATE_PATTERN));
		String dateTime = DateUtil.format(now, DatePattern.NORM_TIME_PATTERN);
		results.put("endDateTime", dateTime);
		
		//今日营业额(截止目前)
		Date todayBeginTime = DateUtil.beginOfDay(now);
		results.put("beginDateTime", DateUtil.format(todayBeginTime, DatePattern.NORM_TIME_PATTERN));
		Map<String, BigDecimal> sumPayAmountAll = mapper.sumPayAmountAll(mid, todayBeginTime, now);
//		BigDecimal sumAmount = mapper.sumPayAmount(mid, todayBeginTime, now);
		BigDecimal sumAmount = sumPayAmountAll.get("sumAmount");
		sumAmount = sumAmount == null ? BigDecimal.ZERO : sumAmount;
		results.put("sumAmount", YdpUtils.dfNumberScale2(sumAmount));
		//统计今日概览收款金额
//		BigDecimal sumIncome = mapper.sumIncome(mid, todayBeginTime, now);
		BigDecimal sumIncome = sumPayAmountAll.get("sumIncome");
		sumIncome = sumIncome == null ? BigDecimal.ZERO : sumIncome;
		results.put("sumIncome", YdpUtils.dfNumberScale2(sumIncome));
		//统计今日概览退款金额
//		BigDecimal sumRefund = mapper.sumRefund(mid, todayBeginTime, now);
		BigDecimal sumRefund = sumPayAmountAll.get("sumRefund");
		sumRefund = sumRefund == null ? BigDecimal.ZERO : sumRefund;
		results.put("sumRefund", YdpUtils.dfNumberScale2(sumRefund));
		//统计今日概览支付方式
		List<Map<String, Object>> groupPayMethod = mapper.groupPayMethod(mid, todayBeginTime, now);
		if(groupPayMethod != null && groupPayMethod.size() > 0) {
			JSONArray jsonArr = new JSONArray();
			for (Map<String, Object> map : groupPayMethod) {
				Long cashierMethod = (Long) map.get("cashier_method");
//				Long count = (Long) map.get("pay_method_num");
				BigDecimal cashierAmount = (BigDecimal) map.get("cashier_amount"); 
				JSONObject jsonObj = new JSONObject();
//				jsonObj.put("count", count);
				jsonObj.put("payAmount", cashierAmount);
				PayMethod payMethodEnum = PayMethod.lookup(cashierMethod.intValue());
				if(payMethodEnum != null) {
					jsonObj.put("item", payMethodEnum.getName());	
				} else {
					jsonObj.put("item", "前台多次扫码支付");
				}
				jsonArr.add(jsonObj);
			}
			results.put("payMethods", jsonArr);
		}
		JSONArray orderArr = new JSONArray();
		Map<String, Long> allOrderCount = mapper.countAllOrder(mid, todayBeginTime, now);
		//统计今日概览订单笔数
		long countOrder = allOrderCount.get("order_num");
		results.put("countOrder", countOrder);
		//统计今日概览退单笔数
		long countOrderByRefund = allOrderCount.get("refund_num");
		results.put("countOrderByRefund", countOrderByRefund);
		//统计今日概览退单笔数(全额退款)
		long countOrderByRefund_All = allOrderCount.get("all_refund_num");
		results.put("countOrderByRefund_All", countOrderByRefund_All);
		//统计今日概览退单笔数(部分退款)
		long countOrderByRefund_Part = allOrderCount.get("part_refund_num");
		results.put("countOrderByRefund_Part", countOrderByRefund_Part);
		//异常单(订单金额<>收款金额+优惠金额)
		long countOrderByException = allOrderCount.get("exception_num");
		results.put("countOrderByException", countOrderByException);
		//正常订单
		JSONObject jsonOrder = new JSONObject();
		JSONObject jsonOrder_refund = new JSONObject();
		JSONObject jsonOrder_exception = new JSONObject();
		jsonOrder.put("name", "正常订单");
		jsonOrder.put("num", countOrder - (countOrderByRefund + countOrderByException));
		orderArr.add(jsonOrder);
		jsonOrder_refund.put("name", "退款订单");
		jsonOrder_refund.put("num", countOrderByRefund);
		orderArr.add(jsonOrder_refund);
		jsonOrder_exception.put("name", "异常订单");
		jsonOrder_exception.put("num", countOrderByException);
		orderArr.add(jsonOrder_exception);
		results.put("orders", orderArr);
		//统计今日概览客流量
		int countDiners = mapper.countDiners(mid, todayBeginTime, now);
		results.put("countDiners", countDiners);
		//统计今日人均消费
		String averageOrderPrice = mapper.averageOrderPrice(mid, todayBeginTime, now);
		results.put("averageOrderPrice", averageOrderPrice);
//		//今日消费最高金额
//		BigDecimal maxTotalPrice = mapper.maxTotalPrice(mid, todayBeginTime, now);
//		if(maxTotalPrice != null) {
//			results.put("maxTotalPrice", YdpUtils.dfRMB(maxTotalPrice));
//		}
//		//今日消费最低金额
//		BigDecimal minTotalPrice = mapper.minTotalPrice(mid, todayBeginTime, now);
//		if(minTotalPrice != null) {
//			results.put("minTotalPrice", YdpUtils.dfRMB(minTotalPrice));
//		}
		//今日翻台率
		Calendar noonCal = DateUtil.calendar(now);
		noonCal.set(Calendar.HOUR_OF_DAY, 8);
		noonCal.set(Calendar.MINUTE, 0);
		noonCal.set(Calendar.SECOND, 0);
		Date noonBeginOrderTime = noonCal.getTime();
		noonCal.set(Calendar.HOUR_OF_DAY, 15);
		Date noonEndOrderTime = noonCal.getTime();
		noonCal.set(Calendar.HOUR_OF_DAY, 24);
		Date noonEndOrderTime2 = noonCal.getTime();
		Map<String, BigDecimal> ftls = mapper.ftl(mid, noonBeginOrderTime, noonEndOrderTime, noonEndOrderTime2);
		//中餐翻台率
		BigDecimal noonFTL = ftls.get("ftl1");
		results.put("noonFTL", YdpUtils.percent(noonFTL));
		//晚餐翻台率
		
		BigDecimal nightFTL = ftls.get("ftl2");
		results.put("nightFTL", YdpUtils.percent(nightFTL));
		//今日翻台率
		BigDecimal todayFTL = ftls.get("ftl3");
		results.put("todayFTL", YdpUtils.percent(todayFTL));
		//今日销售排行榜
		List<Map<String, Object>> salesRank = mapper.salesRank(mid, todayBeginTime, now);
		results.put("salesRank", salesRank);
		//销售额分类统计
		List<Map<String, Object>> salesByCategory = mapper.salesByCategory(mid, todayBeginTime, now);
		results.put("salesByCategory", salesByCategory);
		BigDecimal salesTotal = new BigDecimal("0.00");
		for (Map<String, Object> map : salesByCategory) {
			BigDecimal category_total = (BigDecimal) map.get("y");
//			map.put("category_name", map.get("category_name") + "(￥" + YdpUtils.dfNumberScale2(category_total) + ")");
			salesTotal = salesTotal.add(category_total);
		}
		results.put("salesTotal", salesTotal);
		//会员充值统计
		List<Map<String, Object>> memberRecharges = mapper.selectMemberRechargeTotal(mid, todayBeginTime, now);
		List<Map<String, Object>> memberRechargeResults = new ArrayList<>();
		BigDecimal rechargeTotal = new BigDecimal("0.00");
		for (Map<String, Object> map : memberRecharges) {
			Map<String, Object> omap = new HashMap<>();
			BigDecimal total_amount = (BigDecimal) map.get("total_amount");
			Integer pay_method = (Integer) map.get("pay_method");
			PayMethod payMethodEnum = PayMethod.lookup(pay_method);
			if(payMethodEnum == null) {
				omap.put("x", "未知");
			} else {
				omap.put("x", payMethodEnum.getName());
			}
			rechargeTotal = rechargeTotal.add(total_amount);
			omap.put("y", total_amount);
			memberRechargeResults.add(omap);
		}
		results.put("memberRechargeResults", memberRechargeResults);
		results.put("rechargeTotal", rechargeTotal);
		return results;
	}
	
	/**
	 * 营业额报表
	 * @param mid
	 * @param reportType 报表类型(日报、周报、月报、季报、年报)
	 * @return
	 */
	public List<Map<String, Object>> reportTurnover(int mid, int reportType, Date beginDate, 
			Date endDate) throws YdpException {
		List<Map<String, Object>> results = null;
		switch(reportType) {
			case Constants.REPORT_TYPE_DAY:
				if(DateUtil.betweenMonth(beginDate, endDate, true) >= 1) {
					throw new YdpException("日报查询周期不能超过1个月");
				}
				results = mapper.selectTurnoverDay(mid, beginDate, endDate);
				break;
			case Constants.REPORT_TYPE_WEEK:
				if(DateUtil.betweenMonth(beginDate, endDate, true) >= 3) {
					throw new YdpException("周报查询周期不能超过3个月");
				}
				results = mapper.selectTurnoverWeek(mid, beginDate, endDate);
				break;
			case Constants.REPORT_TYPE_MONTH:
				results = mapper.selectTurnoverMonth(mid);
				break;
			case Constants.REPORT_TYPE_QUARTER:
				results = mapper.selectTurnoverQuarter(mid);
				break;
			case Constants.REPORT_TYPE_YEAR:
				results = mapper.selectTurnoverYear(mid);
				break;
			default:
				results = new ArrayList<>();
				break;
		}
		return results;
	}
	
	/**
	 * 客流量报表
	 * @param mid
	 * @param reportType 报表类型(日报、周报、月报、季报、年报)
	 * @return
	 */
	@Override
	public List<Map<String, Object>> reportCustomFlow(int mid, int reportType, Date beginDate, 
			Date endDate) throws YdpException {
		List<Map<String, Object>> results = null;
		switch(reportType) {
			case Constants.REPORT_TYPE_DAY:
				if(DateUtil.betweenMonth(beginDate, endDate, true) >= 1) {
					throw new YdpException("日报查询周期不能超过1个月");
				}
				results = mapper.selectCustomerFlowDay(mid, beginDate, endDate);
				break;
			case Constants.REPORT_TYPE_WEEK:
				if(DateUtil.betweenMonth(beginDate, endDate, true) >= 3) {
					throw new YdpException("周报查询周期不能超过3个月");
				}
				results = mapper.selectCustomerFlowWeek(mid, beginDate, endDate);
				break;
			case Constants.REPORT_TYPE_MONTH:
				results = mapper.selectCustomerFlowMonth(mid);
				break;
			case Constants.REPORT_TYPE_QUARTER:
				results = mapper.selectCustomerFlowQuarter(mid);
				break;
			case Constants.REPORT_TYPE_YEAR:
				results = mapper.selectCustomerFlowYear(mid);
				break;
			default:
				results = new ArrayList<>();
				break;
		}
		return results;
	}
	
	/**
	 * 订单报表
	 * @param mid
	 * @param reportType 报表类型(日报、周报、月报、季报、年报)
	 * @return
	 */
	@Override
	public List<Map<String, Object>> reportOrder(int mid, int reportType, Date beginDate, 
			Date endDate) throws YdpException {
		List<Map<String, Object>> results = null;
		switch(reportType) {
			case Constants.REPORT_TYPE_DAY:
				if(DateUtil.betweenMonth(beginDate, endDate, true) >= 1) {
					throw new YdpException("日报查询周期不能超过1个月");
				}
				results = mapper.selectOrderDay(mid, beginDate, endDate);
				break;
			case Constants.REPORT_TYPE_WEEK:
				if(DateUtil.betweenMonth(beginDate, endDate, true) >= 3) {
					throw new YdpException("周报查询周期不能超过3个月");
				}
				results = mapper.selectOrderWeek(mid, beginDate, endDate);
				break;
			case Constants.REPORT_TYPE_MONTH:
				results = mapper.selectOrderMonth(mid);
				break;
			case Constants.REPORT_TYPE_QUARTER:
				results = mapper.selectOrderQuarter(mid);
				break;
			case Constants.REPORT_TYPE_YEAR:
				results = mapper.selectOrderYear(mid);
				break;
			default:
				results = new ArrayList<>();
				break;
		}
		return results;
	}
	
	/**
	 * 获取异常订单详情与退款订单详情
	 * @param mid
	 * @param type
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	@Override
	public List<MerchantOrderHis> reportOrderDetail(int mid, int type, int reportType, Date beginDate, 
			Date endDate) throws YdpException {
		if(Constants.REPORT_TYPE_DAY == reportType) {
			if(DateUtil.betweenMonth(beginDate, endDate, true) >= 1) {
				throw new YdpException("查询周期不能超过1个月");
			}
		}
		if(Constants.REPORT_TYPE_WEEK == reportType) {
			if(DateUtil.betweenMonth(beginDate, endDate, true) >= 3) {
				throw new YdpException("周报查询周期不能超过3个月");
			}
		}
		List<MerchantOrderHis> results = null;
		switch(type) {
			case 1:
				results = orderHisMapper.listReundOrderHis(mid, beginDate, endDate);
				break;
			case 2:
				results = orderHisMapper.listAllReundOrderHis(mid, beginDate, endDate);
				break;
			case 3:
				results = orderHisMapper.listPartReundOrderHis(mid, beginDate, endDate);
				break;
			case 4:
				results = orderHisMapper.listExceptionOrderHis(mid, beginDate, endDate);
				break;
		}
		return results;
	}
	
	/**
	 * 导出excel
	 * @param os
	 * @param mid
	 * @return
	 * @throws IOException
	 */
	@Override
	public void exportOrderExcel(OutputStream os, int reportType, Date beginDate, 
			Date endDate, int mid) throws IOException, YdpException {
		String[] titles = new String[] { "日期", "订单总笔数", "退款订单笔数", "全额退款订单笔数", "部分退款订单笔数", "异常订单笔数" };
		List<Map<String, Object>> reportOrders = this.reportOrder(mid, reportType, beginDate, endDate);
		String[][] rowValue = new String[reportOrders.size()][titles.length];
		StringBuilder footer = new StringBuilder();
		Integer order_num_total = 0, refund_num_total = 0, exception_num_total = 0;
		for (int i = 0; i < reportOrders.size(); i++) {
			Map<String, Object> reportO = reportOrders.get(i);
			String data_date = (String) reportO.get("data_date");
			Integer order_num = (Integer) reportO.get("order_num");
			Integer refund_num = (Integer) reportO.get("refund_num");
			Integer all_refund_num = (Integer) reportO.get("all_refund_num");
			Integer part_refund_num = (Integer) reportO.get("part_refund_num");
			Integer exception_num = (Integer) reportO.get("exception_num");
			String[] cellValue = new String[] { data_date, String.valueOf(order_num), String.valueOf(refund_num),
					String.valueOf(all_refund_num), String.valueOf(part_refund_num), String.valueOf(exception_num)};
			rowValue[i] = cellValue;
			order_num_total += order_num;
			refund_num_total += refund_num;
			exception_num_total += exception_num;
		}
		footer.append("总计：").append(order_num_total).append("笔，").append("退款：").append(refund_num_total)
			.append("笔，").append("异常：").append(exception_num_total).append("笔");
		excelHelper.writeExcel("订单报表", titles, rowValue, os, footer.toString());
	}
	
	/**
	 * 导出客流量excel
	 * @param os
	 * @param mid
	 * @return
	 * @throws IOException
	 */
	@Override
	public void exportCustomerFlowExcel(OutputStream os, int reportType, Date beginDate, 
			Date endDate, int mid) throws IOException, YdpException {
		String[] titles = new String[] { "日期", "客流量"};
		List<Map<String, Object>> reportCustomFlows = this.reportCustomFlow(mid, reportType, beginDate, endDate);
		String[][] rowValue = new String[reportCustomFlows.size()][titles.length];
		StringBuilder footer = new StringBuilder();
		Long customer_flow_total = 0L;
		for (int i = 0; i < reportCustomFlows.size(); i++) {
			Map<String, Object> reportO = reportCustomFlows.get(i);
			String data_date = (String) reportO.get("date");
			Long customer_flow = (Long) reportO.get("customer_flow");
			String[] cellValue = new String[] { data_date, String.valueOf(customer_flow) + "人"};
			rowValue[i] = cellValue;
			customer_flow_total += customer_flow;
		}
		footer.append("总计：").append(customer_flow_total).append("人");
		excelHelper.writeExcel("客流量报表", titles, rowValue, os, footer.toString());
	}
	
	/**
	 * 导出营业额excel
	 * @param os
	 * @param mid
	 * @return
	 * @throws IOException
	 */
	@Override
	public void exportTurnoverExcel(OutputStream os, int reportType, Date beginDate, 
			Date endDate, int mid) throws IOException, YdpException {
		String[] titles = new String[] { "日期", "营业额"};
		List<Map<String, Object>> reportTurnovers = this.reportTurnover(mid, reportType, beginDate, endDate);
		String[][] rowValue = new String[reportTurnovers.size()][titles.length];
		StringBuilder footer = new StringBuilder();
		BigDecimal total_price_totle = new BigDecimal("0.00");
		for (int i = 0; i < reportTurnovers.size(); i++) {
			Map<String, Object> reportO = reportTurnovers.get(i);
			String data_date = (String) reportO.get("date");
			BigDecimal total_price = (BigDecimal) reportO.get("total_price");
			String[] cellValue = new String[] { data_date, String.valueOf(total_price)};
			rowValue[i] = cellValue;
			total_price_totle = total_price_totle.add(total_price);
		}
		footer.append("总计：").append(YdpUtils.dfNumberScale2(total_price_totle)).append("元");
		excelHelper.writeExcel("营业额报表", titles, rowValue, os, footer.toString());
	}
	
	/**
	 * 销量排行榜
	 * @param mid
	 * @param type 份数排行、销售额排行
	 * @return
	 */
	@Override
	public List<Map<String, Object>> goodsRank(Integer mid, int type) {
		//按销售份数排行
		if(type == 1) {
			return mapper.selectGoodsRankBySaleNum(mid);
		} else {
			return mapper.selectGoodsRankBySalePrice(mid);
		}
	}
	
	/**
	 * 历史翻台率
	 * @param mid
	 * @return
	 */
	@Override
	public List<Map<String, Object>> reportTableRate(Date beginDate, Date endDate, int mid) throws YdpException {
		if(DateUtil.betweenMonth(beginDate, endDate, true) >= 1) {
			throw new YdpException("查询周期不能超过1个月");
		}
		return mapper.selectTableRate(beginDate, endDate, mid);
	}
	
	/**
	 * 首页
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	@Cacheable(value = Constants.ANALYSIS_CACHE_NAME, key = "#root.targetClass + '_' + #mid")
	@Override
	public Map<String, Object> reportAnalysis(int mid) throws YdpException {
		//只汇总最近15天内的
		Date now = new Date();
		Date beginDate = DateUtil.offset(now, DateField.DAY_OF_YEAR, -16);
		Map<String, Object> results = new HashMap<>();
		//0总营业额、1日均营业额、日环比=3/4
		List<BigDecimal> turnovers = mapper.totalTurnover(mid);
		List<Map<String, Object>> turnoverDatas = mapper.selectTurnover15Day(beginDate, mid);
		Map<String, Object> turnoversMap = new HashMap<>();
		turnoversMap.put("turnoverDatas", turnoverDatas);
		turnoversMap.put("turnoverTotal", turnovers.get(0));
		turnoversMap.put("turnoverAvg", turnovers.get(1));
		if(turnovers.size() == 2 || turnovers.size() == 3) {
			turnoversMap.put("turnoverPercent", BigDecimal.ZERO);
		} else if(turnovers.size() == 4) {
			//被除数为0
			if(turnovers.get(3).compareTo(BigDecimal.ZERO) == 0) {
				turnoversMap.put("turnoverPercent", turnovers.get(2));
			} else {
				turnoversMap.put("turnoverPercent", turnovers.get(2).subtract(turnovers.get(3))
						.divide(turnovers.get(3), 4, BigDecimal.ROUND_FLOOR));
			}
		}
		
		results.put("turnovers", turnoversMap);
		
		//订单量 各天数据、平均、总计订单量
		List<Map<String, Object>> orderDatas = mapper.selectOrderNum15Day(beginDate, mid);
		BigDecimal orderAvg = mapper.avgOrderNum(mid);
		Integer orderTotal = mapper.totalOrder(mid);
		Map<String, Object> ordersMap = new HashMap<>();
		ordersMap.put("orderDatas", orderDatas);
		ordersMap.put("orderAvg", orderAvg);
		ordersMap.put("orderTotal", orderTotal);
		results.put("orders", ordersMap);
		
		//平均消费 各天数据、平均、日环比
		List<Map<String, Object>> averageDatas = mapper.selectAVG15Day(beginDate, mid);
		BigDecimal averageAvg = mapper.avgAvg(mid);
		List<BigDecimal> avgList = mapper.selectAVGLast2Day(mid);
		Map<String, Object> averagesMap = new HashMap<>();
		if(avgList.size() == 0 || avgList.size() == 1) {
			averagesMap.put("averagePercent", BigDecimal.ZERO);
		} else if(avgList.size() == 2) {
			//被除数是0
			if(avgList.get(1).compareTo(BigDecimal.ZERO) == 0) {
				averagesMap.put("averagePercent", avgList.get(0));
			} else {
				averagesMap.put("averagePercent", avgList.get(0).subtract(avgList.get(1))
						.divide(avgList.get(1), 4, BigDecimal.ROUND_FLOOR));
			}
		}
		averagesMap.put("averageDatas", averageDatas);
		averagesMap.put("averageAvg", averageAvg);
		results.put("averages", averagesMap);
		
		//翻台率 平均翻台率、各天数据、日环比
		List<Map<String, Object>> tableRateDatas = mapper.selectTableRate15Day(beginDate, mid);
		BigDecimal tableRateAvg = mapper.avgTableRate(mid);
		List<BigDecimal> tableRateList = mapper.selectTableRateLast2Day(mid);
		Map<String, Object> tableRatesMap = new HashMap<>();
		tableRatesMap.put("tableRateDatas", tableRateDatas);
		tableRatesMap.put("tableRateAvg", tableRateAvg);
		if(tableRateList.size() == 0 || tableRateList.size() == 1) {
			tableRatesMap.put("tableRatePercent", BigDecimal.ZERO);
		} else if(tableRateList.size() == 2) {
			//被除数是0
			if(tableRateList.get(1).compareTo(BigDecimal.ZERO) == 0) {
				tableRatesMap.put("tableRatePercent", tableRateList.get(0));
			} else {
				tableRatesMap.put("tableRatePercent", tableRateList.get(0).subtract(tableRateList.get(1)));
			}
		}
		results.put("tableRates", tableRatesMap);
		
		//客流量数据
		List<Map<String, Object>> customerFlowDatas = mapper.selectCustomerFlow15Day(beginDate, mid);
		results.put("customerFlowDatas", customerFlowDatas);
		
		//查询分类累计销售额数据
		List<Map<String, Object>> saleCategorys = mapper.selectSaleCategory(mid);
		results.put("saleCategorys", saleCategorys);
		
		List<Map<String, Object>> payMethods = mapper.selectPayMethodTotal(mid);
		for (Map<String, Object> map : payMethods) {
			Integer payM = (Integer) map.get("pay_method");
			PayMethod payMethod = PayMethod.lookup(payM);
			if(payMethod != null) {
				map.put("pay_method", payMethod.getName());
			} else {
				map.put("pay_method", "前台多次扫码支付");
			}
		}
		results.put("payMethods", payMethods);
		
		return results;
	}
	
	/**
	 * 会员消费分析
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	@Override
	public Map<String, Object> reportMemberAnalysis(int mid, Date beginDate, Date endDate) throws YdpException {
		Map<String, Object> results = new HashMap<>();
		//金额汇总
		BigDecimal accountBalance = mapper.selectMemberAccountBalance(mid);
		results.put("accountBalance", accountBalance);
		Map<String, BigDecimal> recordTotal = mapper.selectMemberRecordTotal(mid);
		BigDecimal accountTotal = new BigDecimal("0");
		if(recordTotal != null) {
			accountTotal = accountTotal.add(recordTotal.get("price_amount") == null ? BigDecimal.ZERO : recordTotal.get("price_amount"));
			accountTotal = accountTotal.add(recordTotal.get("point_price") == null ? BigDecimal.ZERO : recordTotal.get("point_price"));
			accountTotal = accountTotal.add(recordTotal.get("give_price") == null ? BigDecimal.ZERO : recordTotal.get("give_price"));
		}
		results.put("accountTotal", accountTotal);
		results.put("recordTotal", recordTotal);
		//会员消费占比
		List<Map<String, Object>> memberPercentResults = new ArrayList<>();
		Map<String, Object> memberPercent = new HashMap<>();
		BigDecimal turnoverTotal = mapper.selectTurnoverByMember(mid);
		BigDecimal memberPrice = mapper.selectMemberTurnover(mid);
		memberPercent.put("x", "非会员消费");
		memberPercent.put("y", turnoverTotal.subtract(memberPrice));
		memberPercentResults.add(memberPercent);
		memberPercent = new HashMap<>();
		memberPercent.put("x", "会员消费");
		memberPercent.put("y", memberPrice);
		memberPercentResults.add(memberPercent);
		results.put("memberPercentResults", memberPercentResults);
		results.put("turnoverTotal", turnoverTotal);
		//新加入会员数据
		List<Map<String, Object>> memberNewDatas = mapper.selectReportMemberNew(mid, beginDate, endDate);
		results.put("memberNewDatas", memberNewDatas);
		//会员充值消费数据
		List<Map<String, Object>> memberRechargeDatas = mapper.selectReportMemberRecharge(mid, beginDate, endDate);
		results.put("memberRechargeDatas", memberRechargeDatas);
		List<Map<String, Object>> memberConsumeDatas = mapper.selectReportMemberConsume(mid, beginDate, endDate);
		results.put("memberConsumeDatas", memberConsumeDatas);
		return results;
	}
	
	@Override
	public Map<String, Object> reportMemberRecharge(int mid, Date beginDate, Date endDate) throws YdpException {
		Map<String, Object> results = new HashMap<>();
		//会员充值消费数据
		List<Map<String, Object>> memberRechargeDatas = mapper.selectReportMemberRecharge(mid, beginDate, endDate);
		results.put("memberRechargeDatas", memberRechargeDatas);
		List<Map<String, Object>> memberConsumeDatas = mapper.selectReportMemberConsume(mid, beginDate, endDate);
		results.put("memberConsumeDatas", memberConsumeDatas);
		return results;
	}

	@Override
	public List<Map<String, Object>> reportMemberNew(int mid, Date beginDate, Date endDate) throws YdpException {
		//新加入会员数据
		List<Map<String, Object>> memberNewDatas = mapper.selectReportMemberNew(mid, beginDate, endDate);
		return memberNewDatas;
	}
	
	/**
	 * 对账单查询明细
	 * @param mid
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws YdpException
	 */
	@Override
	public PageBean<Map<String, Object>> reportReconciliation(int mid, Integer pageSize, Integer pageNum, Map<String, String> searchParams) throws YdpException {
		PageBean<Map<String, Object>> pageBean = new PageBean<Map<String, Object>>();
		Map<String, Object> params = new HashMap<>();
		params.put("merchantId", mid);
		String payMethod = searchParams.get("payMethod");
		if(!StringUtils.isEmpty(payMethod)) {
			params.put("payMethod", Integer.parseInt(payMethod));
		}
		String beginDateStr = searchParams.get("beginDate");
		Date beginDate = DateUtil.parse(beginDateStr, DatePattern.NORM_DATE_PATTERN);
		params.put("beginDate", beginDate);
		String endDateStr = searchParams.get("endDate");
		Date endDate = DateUtil.parse(endDateStr, DatePattern.NORM_DATE_PATTERN);
		params.put("endDate", endDate);
		Page<Object> page = PageHelper.startPage(pageNum, pageSize);
		List<Map<String, Object>> reconciliations = mapper.selectReportReconciliation(params);
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(reconciliations);
		return pageBean;
	}
	
	/**
	 * 对账单查询（汇总）
	 * @param mid
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws YdpException
	 */
	@Override
	public List<Map<String, Object>> reportReconciliationTotal(int mid, Map<String, String> searchParams) throws YdpException {
		Map<String, Object> params = new HashMap<>();
		params.put("merchantId", mid);
		String payMethod = searchParams.get("payMethod");
		if(!StringUtils.isEmpty(payMethod)) {
			params.put("payMethod", Integer.parseInt(payMethod));
		}
		String beginDateStr = searchParams.get("beginDate");
		Date beginDate = DateUtil.parse(beginDateStr, DatePattern.NORM_DATE_PATTERN);
		params.put("beginDate", beginDate);
		String endDateStr = searchParams.get("endDate");
		Date endDate = DateUtil.parse(endDateStr, DatePattern.NORM_DATE_PATTERN);
		params.put("endDate", endDate);
		return mapper.selectReportReconciliationTotal(params);
	}
	
	/**
	 * 会员消费排行榜
	 * @param mid
	 * @param params
	 * @return
	 * @throws YdpException
	 */
	@Override
	public PageBean<Map<String, Object>> selectMemberRank(int mid, int pageNum, int pageSize, Map<String, String> params) throws YdpException {
		PageBean<Map<String, Object>> pageBean = new PageBean<Map<String, Object>>();
		params.put("merchantId", String.valueOf(mid));
		Page<Object> page = PageHelper.startPage(pageNum, pageSize);
		List<Map<String, Object>> memberRanks = mapper.selectMemberRank(params);
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(memberRanks);
		return pageBean;
	}
	
}
