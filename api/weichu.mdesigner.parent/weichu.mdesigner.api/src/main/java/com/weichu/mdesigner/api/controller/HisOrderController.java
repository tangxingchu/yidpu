package com.weichu.mdesigner.api.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantAuthorization;
import com.weichu.mdesigner.api.service.IMerchantConfigService;
import com.weichu.mdesigner.api.service.IMerchantOrderHisService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderHisService;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.common.entity.MerchantConfig;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.vo.OrderHisVo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.RefundMethod;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.weichu.mdesigner.utils.page.PageBean;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 历史订单处理
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/hisOrder")
public class HisOrderController {

	@Autowired
	private IMerchantOrderHisService orderHisService;
	
	@Autowired
	private IMerchantPayOrderHisService payOrderHisService;
		
	@Autowired
	private IMerchantAuthorization authService;
		
	@Autowired
	private CacheManager cacheManager;
	
	/**
	 * 查询历史订单
	 * 
	 * @param request
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public PageBean<OrderHisVo> list(HttpServletRequest request, @RequestBody Map<String, String> searchParams)
			throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		int grade = JavaWebToken.getGrade(request);// 商家等级
		String orderTimeStartStr = searchParams.get("orderTimeStart");
		String orderTimeEndStr = searchParams.get("orderTimeEnd");
		if (StringUtils.isEmpty(orderTimeStartStr) || StringUtils.isEmpty(orderTimeEndStr)) {
			throw new YdpException("下单时间查询条件不能为空");
		}
		// 免费商家用户(只能查询一个月内的数据)
		Date orderTimeStart = DateUtil.parse(orderTimeStartStr, DatePattern.NORM_DATETIME_MINUTE_PATTERN);
		Date endTimeStart = DateUtil.parse(orderTimeEndStr, DatePattern.NORM_DATETIME_MINUTE_PATTERN);
		Date beforeMonthDate = DateUtil.offset(new Date(), DateField.MONTH, -1);
		if (grade == 1 && orderTimeStart.before(beforeMonthDate)) {
			throw new YdpException("免费商家只能查询一个月内的订单数据");
		}
		long betweenDays = (long) ((endTimeStart.getTime() - orderTimeStart.getTime()) / (1000 * 60 * 60 * 24) + 0.5);
		if (betweenDays > 31) {
			throw new YdpException("下单时间查询跨度最多1个月");
		}
		String pageSizeStr = searchParams.get("pageSize");
		String pageNumStr = searchParams.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		return orderHisService.list(pageSize, pageNum, searchParams, mid);
	}
	
	/**
	 * 退款申请
	 * @param request
	 * @param orderNo
	 * @return
	 */
	@RequestMapping(value = "/refund", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0013')")//function_code 退款
	public JSONObject refund(HttpServletRequest request, @RequestParam String orderNo, @RequestParam Integer refundLimit, 
			@RequestParam Integer refundMethod, @RequestParam String refundAmount,
			@RequestParam(required = false) String refundReason, @RequestParam(required = false) String validationPWD) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		int grade = JavaWebToken.getGrade(request);
		String username = JavaWebToken.getUsername(request);
//		String configValue = configService.getByCode(Constants.ENABLED_REFUND_PASSWORD, mid);
		String configValue = "1";
		if(configValue != null && "1".equals(configValue)) {
			if(grade > 1 && (refundMethod == RefundMethod.ALIPAY_QRCODE_TABLE.getValue()
					|| refundMethod == RefundMethod.WECHAT_QRCODE_TABLE.getValue()
					|| refundMethod == RefundMethod.ALIPAY_QRCODE_FRONT.getValue()
					|| refundMethod == RefundMethod.WECHAT_QRCODE_FRONT.getValue())) {//高等级会员商家 短信验证码校验
				//5分钟内有效
				String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(Constants.PHONE_CODE_TYPE_REFUND + "_" + mid, String.class);
				if(StringUtils.isEmpty(cacheCode)) {
					throw new YdpException("短信验证码已失效");
				} else {
					if(!cacheCode.toUpperCase().equals(validationPWD.toUpperCase())) {
						throw new YdpException("短信验证码错误");
					}
				}
			} else {
				if(StringUtils.isEmpty(validationPWD)) {
					throw new YdpException("请输入登录密码完成退款操作");
				}
				if(!authService.validatePWD(validationPWD, username)) {
					throw new YdpException("登录密码错误,无法完成退款");
				}
			}
		}
		int result = orderHisService.refundOrderHis(orderNo, mid, refundLimit, refundMethod, refundAmount, refundReason, username);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 前台扫码支付单退款申请
	 * @param request
	 * @param orderNo
	 * @return
	 */
	@RequestMapping(value = "/refundFront", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0013')")//function_code 退款
	public JSONObject refundFront(HttpServletRequest request, @RequestParam String orderNo, @RequestParam String payOrderNo, 
			@RequestParam Integer refundLimit, @RequestParam Integer refundMethod, @RequestParam String refundAmount,
			@RequestParam(required = false) String refundReason, @RequestParam(required = false) String validationPWD,
			@RequestParam String tableCode) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		int grade = JavaWebToken.getGrade(request);
		String username = JavaWebToken.getUsername(request);
//		String configValue = configService.getByCode(Constants.ENABLED_REFUND_PASSWORD, mid);
		String configValue = "1";
		if(configValue != null && "1".equals(configValue)) {
			if(grade > 1) {//高等级会员商家 短信验证码校验
				//5分钟内有效
				String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(Constants.PHONE_CODE_TYPE_REFUND + "_" + mid, String.class);
				if(StringUtils.isEmpty(cacheCode)) {
					throw new YdpException("短信验证码已失效");
				} else {
//					cacheManager.getCache(Constants.CODE_CACHE_NAME).evict(Constants.PHONE_CODE_TYPE_REFUND + "_" + mid);
					if(!cacheCode.toUpperCase().equals(validationPWD.toUpperCase())) {
						throw new YdpException("短信验证码错误");
					}
				}				
			} else {
				if(StringUtils.isEmpty(validationPWD)) {
					throw new YdpException("请输入登录密码完成退款操作");
				}
				if(!authService.validatePWD(validationPWD, username)) {
					throw new YdpException("登录密码错误,无法完成退款");
				}
			}			
		}
		int result = payOrderHisService.refundPayOrderHis(orderNo, payOrderNo, mid, refundLimit, refundMethod, refundAmount, 
				refundReason, username, tableCode);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 历史订单界面,点开+号查询支付流水以及订单明细,详细订单项
	 * @param request
	 * @param orderNo
	 * @return
	 */
	@RequestMapping(value = "/listOrderItem", method = RequestMethod.POST)
	public Map<String, List<?>> listOrderItemByOrderNo(HttpServletRequest request, @RequestParam String orderNo,
			@RequestParam Integer payMethod) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return orderHisService.listByOrderNo(orderNo, mid, payMethod);
	}
	
	/**
	 * 修改备注信息
	 * @param request
	 * @param remark
	 * @return
	 */
	@RequestMapping(value = "/modifyRemark", method = RequestMethod.POST)
	public JSONObject modifyRemark(HttpServletRequest request, @RequestParam String orderNo, @RequestParam String remark) {
		int mid = JavaWebToken.getUid(request);
		orderHisService.modifyRemark(orderNo, remark, mid);
		return JSONResult.success();
	}
	
	/**
	 * 只查看与我合并付款的订单
	 * @param request
	 * @param remark
	 * @return
	 */
	@RequestMapping(value = "/listOrderHisByOutTradeNo", method = RequestMethod.POST)
	public List<OrderHisVo> listOrderHisByOutTradeNo(HttpServletRequest request, @RequestParam String outTradeNo) {
		int mid = JavaWebToken.getUid(request);
		return orderHisService.listOrderHisByOutTradeNo(outTradeNo, mid);
	}

}
