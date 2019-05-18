package com.weichu.mdesigner.api.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weichu.mdesigner.api.service.IReportService;
import com.weichu.mdesigner.common.entity.MerchantOrderHis;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DatePattern;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;

/**
 * 报表(营业报表\今日概览\......)
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/report")
public class ReportController {
	
	@Autowired
	private IReportService reportService;
	
	/**
	 * 今日概览
	 * @param request
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/todayOverview", method = RequestMethod.POST)
	public Map<String, Object> todayOverview(HttpServletRequest request) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		return reportService.todayOverview(mid);
	}
	
	/**
	 * 营业额报表
	 * @param request
	 * @param reportType
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/reportTurnover", method = RequestMethod.POST)
	public List<Map<String, Object>> reportTurnover(HttpServletRequest request, @RequestParam Integer reportType,
			@RequestParam String beginDate, @RequestParam String endDate) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		if(StringUtils.isEmpty(beginDate) || StringUtils.isEmpty(endDate)) {
			throw new YdpException("查询报表开始时间与结束时间不能为空");
		}
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		return reportService.reportTurnover(mid, reportType, beginDate_d, endDate_d);
	}
	
	/**
	 * 客流量报表
	 * @param request
	 * @param reportType
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/reportCustomerFlow", method = RequestMethod.POST)
	public List<Map<String, Object>> reportCustomerFlow(HttpServletRequest request, @RequestParam Integer reportType,
			@RequestParam String beginDate, @RequestParam String endDate) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		if(StringUtils.isEmpty(beginDate) || StringUtils.isEmpty(endDate)) {
			throw new YdpException("查询报表开始时间与结束时间不能为空");
		}
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		return reportService.reportCustomFlow(mid, reportType, beginDate_d, endDate_d);
	}
	
	/**
	 * 用餐订单报表
	 * @param request
	 * @param reportType
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/reportOrder", method = RequestMethod.POST)
	public List<Map<String, Object>> reportOrder(HttpServletRequest request, @RequestParam Integer reportType,
			@RequestParam String beginDate, @RequestParam String endDate) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		if(StringUtils.isEmpty(beginDate) || StringUtils.isEmpty(endDate)) {
			throw new YdpException("查询报表开始时间与结束时间不能为空");
		}
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		return reportService.reportOrder(mid, reportType, beginDate_d, endDate_d);
	}
	
	/**
	 * 异常单与退款单详情
	 * @param request
	 * @param orderType
	 * @param beginDate
	 * @param endDate
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/reportOrderDetail", method = RequestMethod.POST)
	public List<MerchantOrderHis> reportOrderDetail(HttpServletRequest request, @RequestParam Integer orderType,
			@RequestParam Integer reportType, @RequestParam String beginDate, @RequestParam String endDate) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		Date beginDate_d = null, endDate_d = null, now = new Date();
		if(StringUtils.isEmpty(beginDate)) {
			beginDate_d = DateUtil.beginOfDay(now);
		}
		if(StringUtils.isEmpty(endDate)) {
			endDate_d = now;
		}
		if(!StringUtils.isEmpty(beginDate) && !StringUtils.isEmpty(endDate)) {
			switch(reportType) {
				case Constants.REPORT_TYPE_DAY:
					beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
					endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
					endDate_d = DateUtil.endOfDayMysql(endDate_d);
				break;
				case Constants.REPORT_TYPE_WEEK:
					endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
					beginDate_d = DateUtil.offset(endDate_d, DateField.DAY_OF_YEAR, -7);
					endDate_d = DateUtil.endOfDayMysql(endDate_d);
				break;
				case Constants.REPORT_TYPE_MONTH:
					endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
					beginDate_d = DateUtil.beginOfMonth(endDate_d);
					endDate_d = DateUtil.endOfDayMysql(endDate_d);
				break;
				case Constants.REPORT_TYPE_QUARTER:
					endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
					beginDate_d = DateUtil.offset(endDate_d, DateField.MONTH, -3);
					beginDate_d = DateUtil.offset(beginDate_d, DateField.DAY_OF_YEAR, 1);
					//结束时间必须小于当前月份
					if(endDate_d.after(now)) {
						endDate_d = DateUtil.beginOfMonth(now);
						endDate_d = DateUtil.offset(endDate_d, DateField.DAY_OF_YEAR, -1);
					}
					endDate_d = DateUtil.endOfDayMysql(endDate_d);
				break;
				case Constants.REPORT_TYPE_YEAR:
					endDate_d = DateUtil.parse(endDate + "-12-31", DatePattern.NORM_DATE_PATTERN);
					//结束时间必须小于当前月份
					if(endDate_d.after(now)) {
						endDate_d = DateUtil.beginOfMonth(now);
						endDate_d = DateUtil.offset(endDate_d, DateField.DAY_OF_YEAR, -1);
					}
					beginDate_d = DateUtil.beginOfYear(endDate_d);
					endDate_d = DateUtil.endOfDayMysql(endDate_d);
				break;
			}
		}
		return reportService.reportOrderDetail(mid, orderType, reportType, beginDate_d, endDate_d);
	}
	
	/**
	 * 导出订单excel
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(value = "/exportOrder", method = RequestMethod.POST)
	public void exportOrderExcel(HttpServletRequest request, HttpServletResponse response, @RequestParam Integer reportType,
			@RequestParam String beginDate, @RequestParam String endDate) throws IOException, YdpException {
		if(StringUtils.isEmpty(beginDate) || StringUtils.isEmpty(endDate)) {
			throw new YdpException("查询报表开始时间与结束时间不能为空");
		}
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		int mid = JavaWebToken.getUid(request);
	    response.setHeader("content-Type", "application/vnd.ms-excel");
	    // 下载文件的默认名称
	    String fileName = "订单报表(" + DateUtil.now() + ").xlsx";
	    response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "utf-8"));
	    OutputStream os = response.getOutputStream();
	    reportService.exportOrderExcel(os, reportType, beginDate_d, endDate_d, mid);
	    os.flush();
	    os.close();
	}
	
	/**
	 * 导出客流量excel
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(value = "/exportCustomerFlow", method = RequestMethod.POST)
	public void exportCustomerFlow(HttpServletRequest request, HttpServletResponse response, @RequestParam Integer reportType,
			@RequestParam String beginDate, @RequestParam String endDate) throws IOException, YdpException {
		if(StringUtils.isEmpty(beginDate) || StringUtils.isEmpty(endDate)) {
			throw new YdpException("查询报表开始时间与结束时间不能为空");
		}
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		int mid = JavaWebToken.getUid(request);
	    response.setHeader("content-Type", "application/vnd.ms-excel");
	    // 下载文件的默认名称
	    String fileName = "客流量报表(" + DateUtil.now() + ").xlsx";
	    response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "utf-8"));
	    OutputStream os = response.getOutputStream();
	    reportService.exportCustomerFlowExcel(os, reportType, beginDate_d, endDate_d, mid);
	    os.flush();
	    os.close();
	}
	
	/**
	 * 导出营业额excel
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(value = "/exportTurnover", method = RequestMethod.POST)
	public void exportTurnover(HttpServletRequest request, HttpServletResponse response, @RequestParam Integer reportType,
			@RequestParam String beginDate, @RequestParam String endDate) throws IOException, YdpException {
		if(StringUtils.isEmpty(beginDate) || StringUtils.isEmpty(endDate)) {
			throw new YdpException("查询报表开始时间与结束时间不能为空");
		}
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		int mid = JavaWebToken.getUid(request);
	    response.setHeader("content-Type", "application/vnd.ms-excel");
	    // 下载文件的默认名称
	    String fileName = "营业额报表(" + DateUtil.now() + ").xlsx";
	    response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "utf-8"));
	    OutputStream os = response.getOutputStream();
	    reportService.exportTurnoverExcel(os, reportType, beginDate_d, endDate_d, mid);
	    os.flush();
	    os.close();
	}
	
	/**
	 * 商品销售排行榜
	 * @param request
	 * @param type
	 * @return
	 */
	@RequestMapping(value = "/selectGoodsRank", method = RequestMethod.POST)
	public List<Map<String, Object>> selectGoodsRank(HttpServletRequest request, @RequestParam Integer type) {
		int mid = JavaWebToken.getUid(request);
		return reportService.goodsRank(mid, type);
	}
	
	/**
	 * 历史翻台率
	 * @param request
	 * @param type
	 * @return
	 */
	@RequestMapping(value = "/reportTableRate", method = RequestMethod.POST)
	public List<Map<String, Object>> reportTableRate(HttpServletRequest request, @RequestParam String beginDate, 
			@RequestParam String endDate) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		if(StringUtils.isEmpty(beginDate) || StringUtils.isEmpty(endDate)) {
			throw new YdpException("查询报表开始时间与结束时间不能为空");
		}
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		return reportService.reportTableRate(beginDate_d, endDate_d, mid);
	}
	
	/**
	 * 首页分析页
	 * @param request
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/reportAnalysis", method = RequestMethod.POST)
	public Map<String, Object> reportAnalysis(HttpServletRequest request) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		return reportService.reportAnalysis(mid);
	}
	
	/**
	 * 会员消费分析
	 * @param request
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/reportMemberAnalysis", method = RequestMethod.POST)
	public Map<String, Object> reportMemberAnalysis(HttpServletRequest request, @RequestParam String beginDate, 
			@RequestParam String endDate) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		return reportService.reportMemberAnalysis(mid, beginDate_d, endDate_d);
	}
	
	@RequestMapping(value = "/reportMemberRecharge", method = RequestMethod.POST)
	public Map<String, Object> reportMemberRecharge(HttpServletRequest request, @RequestParam String beginDate, 
			@RequestParam String endDate) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		return reportService.reportMemberRecharge(mid, beginDate_d, endDate_d);
	}
	
	@RequestMapping(value = "/reportMemberNew", method = RequestMethod.POST)
	public List<Map<String, Object>> reportMemberNew(HttpServletRequest request, @RequestParam String beginDate, 
			@RequestParam String endDate) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		Date beginDate_d = DateUtil.parse(beginDate, DatePattern.NORM_DATE_PATTERN);
		Date endDate_d = DateUtil.parse(endDate, DatePattern.NORM_DATE_PATTERN);
		return reportService.reportMemberNew(mid, beginDate_d, endDate_d);
	}
	
	/**
	 * 对账单查询
	 * @param request
	 * @param searchParams
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/reportReconciliation", method = RequestMethod.POST)
	public PageBean<Map<String, Object>> reportReconciliation(HttpServletRequest request, @RequestBody Map<String, String> searchParams) 
		throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		String beginDate = searchParams.get("beginDate");
		String endDate = searchParams.get("endDate");
		if(StringUtils.isEmpty(beginDate)) {
			throw new YdpException("开始时间不能为空");
		}
		if(StringUtils.isEmpty(endDate)) {
			throw new YdpException("结束时间不能为空");
		}
		String pageSizeStr = searchParams.get("pageSize");
		String pageNumStr = searchParams.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		return reportService.reportReconciliation(mid, pageSize, pageNum, searchParams);
	}
	
	/**
	 * 对账单查询
	 * @param request
	 * @param searchParams
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/reportReconciliationTotal", method = RequestMethod.POST)
	public List<Map<String, Object>> reportReconciliationTotal(HttpServletRequest request, @RequestBody Map<String, String> searchParams) 
		throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		String beginDate = searchParams.get("beginDate");
		String endDate = searchParams.get("endDate");
		if(StringUtils.isEmpty(beginDate)) {
			throw new YdpException("开始时间不能为空");
		}
		if(StringUtils.isEmpty(endDate)) {
			throw new YdpException("结束时间不能为空");
		}
		return reportService.reportReconciliationTotal(mid,searchParams);
	}
	
	/**
	 * 会员消费排行榜
	 * @param request
	 * @param params
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/selectMemberRank", method = RequestMethod.POST)
	public PageBean<Map<String, Object>> selectMemberRank(HttpServletRequest request, @RequestBody Map<String, String> params) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		String totalRechargeStr = params.get("totalRecharge");
		if(totalRechargeStr != null && !StringUtils.isEmpty(totalRechargeStr)) {
			try {
				Integer.parseInt(totalRechargeStr.toString());
			} catch (Exception e) {
				throw new YdpException("充值金额必须是数字");
			}
		}
		String totalConsumeStr = params.get("totalConsume");
		if(totalConsumeStr != null && !StringUtils.isEmpty(totalConsumeStr)) {
			try {
				Integer.parseInt(totalConsumeStr.toString());
			} catch (Exception e) {
				throw new YdpException("消费金额必须是数字");
			}
		}
		String pageSizeStr = params.get("pageSize");
		String pageNumStr = params.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		return reportService.selectMemberRank(mid, pageNum, pageSize, params);
	}
	
}
