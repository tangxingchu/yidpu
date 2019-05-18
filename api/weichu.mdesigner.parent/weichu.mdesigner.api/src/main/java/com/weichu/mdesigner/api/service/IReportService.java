package com.weichu.mdesigner.api.service;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.MerchantOrderHis;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 报表service
 * @author Administrator
 *
 */
public interface IReportService {
	
	/**
	 * 今日概览
	 * @param mid
	 * @return
	 */
	public Map<String, Object> todayOverview(int mid);
	
	/**
	 * 营业额报表
	 * @param mid
	 * @param reportType 报表类型(日报、周报、月报、季报、年报)
	 * @return
	 */
	public List<Map<String, Object>> reportTurnover(int mid, int reportType, Date beginDate, 
			Date endDate) throws YdpException;
	
	/**
	 * 客流量报表
	 * @param mid
	 * @param reportType 报表类型(日报、周报、月报、季报、年报)
	 * @return
	 */
	public List<Map<String, Object>> reportCustomFlow(int mid, int reportType, Date beginDate, 
			Date endDate) throws YdpException;
	
	/**
	 * 订单报表
	 * @param mid
	 * @param reportType 报表类型(日报、周报、月报、季报、年报)
	 * @return
	 */
	public List<Map<String, Object>> reportOrder(int mid, int reportType, Date beginDate, 
			Date endDate) throws YdpException;
	
	/**
	 * 获取异常订单详情与退款订单详情
	 * @param mid
	 * @param type
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	public List<MerchantOrderHis> reportOrderDetail(int mid, int type, int reportType, Date beginDate, 
			Date endDate) throws YdpException;
	
	/**
	 * 导出订单excel
	 * @param os
	 * @param mid
	 * @return
	 * @throws IOException
	 */
	public void exportOrderExcel(OutputStream os, int reportType, Date beginDate, 
			Date endDate, int mid) throws IOException, YdpException;
	
	/**
	 * 导出客流量excel
	 * @param os
	 * @param mid
	 * @return
	 * @throws IOException
	 */
	public void exportCustomerFlowExcel(OutputStream os, int reportType, Date beginDate, 
			Date endDate, int mid) throws IOException, YdpException;
	
	/**
	 * 导出营业额excel
	 * @param os
	 * @param mid
	 * @return
	 * @throws IOException
	 */
	public void exportTurnoverExcel(OutputStream os, int reportType, Date beginDate, 
			Date endDate, int mid) throws IOException, YdpException;
	
	/**
	 * 销量排行榜
	 * @param mid
	 * @param type 份数排行、销售额排行
	 * @return
	 */
	public List<Map<String, Object>> goodsRank(Integer mid, int type);
	
	/**
	 * 历史翻台率
	 * @param mid
	 * @return
	 */
	public List<Map<String, Object>> reportTableRate(Date beginDate, Date endDate, int mid) throws YdpException;
	
	/**
	 * 首页
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	public Map<String, Object> reportAnalysis(int mid) throws YdpException;
	
	/**
	 * 会员消费分析
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	public Map<String, Object> reportMemberAnalysis(int mid, Date beginDate, Date endDate) throws YdpException;

	public Map<String, Object> reportMemberRecharge(int mid, Date beginDate, Date endDate) throws YdpException;

	public List<Map<String, Object>> reportMemberNew(int mid, Date beginDate, Date endDate) throws YdpException;
	
	/**
	 * 对账单查询明细
	 * @param mid
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws YdpException
	 */
	public PageBean<Map<String, Object>> reportReconciliation(int mid, Integer pageSize, Integer pageNum, Map<String, String> searchParams) throws YdpException;
	
	/**
	 * 对账单查询（汇总）
	 * @param mid
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws YdpException
	 */
	public List<Map<String, Object>> reportReconciliationTotal(int mid, Map<String, String> searchParams) throws YdpException;
	
	/**
	 * 会员消费排行榜
	 * @param mid
	 * @param params
	 * @return
	 * @throws YdpException
	 */
	public PageBean<Map<String, Object>> selectMemberRank(int mid, int pageNum, int pageSize, Map<String, String> params) throws YdpException;
	
}
