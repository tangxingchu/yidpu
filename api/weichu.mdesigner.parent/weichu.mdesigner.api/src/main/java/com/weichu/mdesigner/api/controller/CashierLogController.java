package com.weichu.mdesigner.api.controller;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weichu.mdesigner.api.service.IMerchantCashierLogService;
import com.weichu.mdesigner.api.vo.MerchantCashierLogVo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 收银日志流水
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/cashierLog")
public class CashierLogController {
	
	@Autowired
	private IMerchantCashierLogService cashierLogService;
	
	/**
	 * 查询收退款流水
	 * 
	 * @param request
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public PageBean<MerchantCashierLogVo> list(HttpServletRequest request, @RequestBody Map<String, String> searchParams)
			throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		int grade = JavaWebToken.getGrade(request);// 商家等级
		String cashierTimeStartStr = searchParams.get("cashierTimeStart");
		String cashierTimeEndStr = searchParams.get("cashierTimeEnd");
		if (StringUtils.isEmpty(cashierTimeStartStr) || StringUtils.isEmpty(cashierTimeEndStr)) {
			throw new YdpException("收(退)款时间查询条件不能为空");
		}
		// 免费商家用户(只能查询一个月内的数据)
		Date startTimeStart = DateUtil.parse(cashierTimeStartStr, DatePattern.NORM_DATETIME_MINUTE_PATTERN);
		Date endTimeStart = DateUtil.parse(cashierTimeEndStr, DatePattern.NORM_DATETIME_MINUTE_PATTERN);
		Date beforeMonthDate = DateUtil.offset(new Date(), DateField.MONTH, -1);
		if (grade == 1 && startTimeStart.before(beforeMonthDate)) {
			throw new YdpException("免费商家只能查询一个月内的流水数据");
		}
		long betweenDays = (long) ((endTimeStart.getTime() - startTimeStart.getTime()) / (1000 * 60 * 60 * 24) + 0.5);
		if (betweenDays > 31) {
			throw new YdpException("收(退)款时间查询跨度最多1个月");
		}
		String pageSizeStr = searchParams.get("pageSize");
		String pageNumStr = searchParams.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		return cashierLogService.list(pageSize, pageNum, searchParams, mid);
	}
	
	/**
	 * 收银界面打印收银小票
	 * @param request
	 * @param orderNo
	 * @return
	 */
	@RequestMapping(value = "/selectPrintCashier", method = RequestMethod.POST)
	public Map<String, Object> selectPrintCashier(HttpServletRequest request, @RequestParam String orderNo) throws YdpException {
		if(StringUtils.isEmpty(orderNo)) {
			throw new YdpException("用餐订单不能为空");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		return cashierLogService.selectByOrderNo(orderNo, mid);
	}
}
