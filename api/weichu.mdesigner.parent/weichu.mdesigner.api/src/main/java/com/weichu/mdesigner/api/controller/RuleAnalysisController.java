package com.weichu.mdesigner.api.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weichu.mdesigner.api.service.IMerchantRuleAnalysisService;
import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHisDetail;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.xiaoleilu.hutool.date.DatePattern;

@RestController
@RequestMapping("/api/ruleAnalysis")
public class RuleAnalysisController {

	@Autowired
	private IMerchantRuleAnalysisService service;
	
	private Date[] vilidate(String ruleBeginDate, String ruleEndDate) throws YdpException {
		SimpleDateFormat sdf = new SimpleDateFormat(DatePattern.NORM_DATE_PATTERN);
		Date beginDate = null, endDate = null;
		Date[] dates = new Date[2];
		try {
			beginDate = sdf.parse(ruleBeginDate);
			endDate = sdf.parse(ruleEndDate);
		} catch (ParseException e) {
			e.printStackTrace();
			throw new YdpException("日期格式错误,正确格式:1985-07-09");
		}
		if(beginDate.after(endDate)) {
			throw new YdpException("开始日期必须小于结束日期");
		}
		if(DateUtil.betweenMonth(beginDate, endDate, true) >= 3) {
			throw new YdpException("时间周期跨度不能超过3个月");
		}
		dates[0] = beginDate;
		dates[1] = endDate;
		return dates;
	}
	
	/**
	 * 查询启用运营规则历史
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/init", method = RequestMethod.POST)
	public Map<String, Object> init(HttpServletRequest request, @RequestParam String ruleBeginDate,
			@RequestParam String ruleEndDate) throws YdpException {
		Date[] dates = vilidate(ruleBeginDate, ruleEndDate);
		int mid = JavaWebToken.getUid(request);
		//默认都是查询上一周环比数据
		return service.init(mid, dates[0], dates[1]);
	}
	
	/**
	 * 查询运营规则历史时间轴数据
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/selectByTimeline", method = RequestMethod.POST)
	public List<Map<String, Object>> selectByTimeline(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return service.selectByTimeline(mid);
	}
	
	
	/**
	 * 查询历史规则明细
	 * @param request
	 * @param ruleHisId
	 * @return
	 */
	@RequestMapping(value = "/selectRuleHisDetail", method = RequestMethod.POST)
	public List<MerchantBusinessRuleHisDetail> selectRuleHisDetail(HttpServletRequest request, @RequestParam Integer ruleHisId) {
		int mid = JavaWebToken.getUid(request);
		return service.selectRuleHisDetail(ruleHisId, mid);
	}
	
	/**
	 * 
	 * @param request
	 * @param type 1=环比，2=同比
	 * @return
	 */
	@RequestMapping(value = "/selectTurnoverData", method = RequestMethod.POST)
	public Map<String, Object> selectTurnoverData(HttpServletRequest request, @RequestParam String ruleBeginDate,
			@RequestParam String ruleEndDate, @RequestParam Integer type) throws YdpException {
		Date[] dates = vilidate(ruleBeginDate, ruleEndDate);
		int mid = JavaWebToken.getUid(request);		
		return service.turnoverTotal(mid, dates[0], dates[1], type);
	}
	
	/**
	 * 
	 * @param request
	 * @param type 1=环比，2=同比
	 * @return
	 */
	@RequestMapping(value = "/selectCustomerFlowData", method = RequestMethod.POST)
	public Map<String, Object> selectCustomerFlowData(HttpServletRequest request, @RequestParam String ruleBeginDate,
			@RequestParam String ruleEndDate, @RequestParam Integer type) throws YdpException {
		Date[] dates = vilidate(ruleBeginDate, ruleEndDate);
		int mid = JavaWebToken.getUid(request);		
		return service.customerFlowTotal(mid, dates[0], dates[1], type);
	}
	
	/**
	 * 
	 * @param request
	 * @param type 1=环比，2=同比
	 * @return
	 */
	@RequestMapping(value = "/selectTableRateData", method = RequestMethod.POST)
	public Map<String, Object> selectTableRateData(HttpServletRequest request, @RequestParam String ruleBeginDate,
			@RequestParam String ruleEndDate, @RequestParam Integer type) throws YdpException {
		Date[] dates = vilidate(ruleBeginDate, ruleEndDate);
		int mid = JavaWebToken.getUid(request);
		return service.tabelRateTotal(mid, dates[0], dates[1], type);
	}
	
}
