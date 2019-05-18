package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.response.AlipayTradeRefundResponse;
import com.weichu.mdesigner.api.service.IAlipayService;
import com.weichu.mdesigner.api.service.IMerchantAlipayInfoService;
import com.weichu.mdesigner.api.service.IMerchantCashierLogService;
import com.weichu.mdesigner.api.service.IMerchantPayLogService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderHisService;
import com.weichu.mdesigner.api.service.IMerchantWxpayInfoService;
import com.weichu.mdesigner.api.service.IWxpayService;
import com.weichu.mdesigner.common.entity.MerchantAlipayInfo;
import com.weichu.mdesigner.common.entity.MerchantCashierLog;
import com.weichu.mdesigner.common.entity.MerchantPayLog;
import com.weichu.mdesigner.common.entity.MerchantPayOrderHis;
import com.weichu.mdesigner.common.entity.MerchantWxpayInfo;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantOrderHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantPayOrderHisMapper;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.RefundMethod;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 前台扫码支付历史单
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantPayOrderHisServiceImpl implements IMerchantPayOrderHisService {
	
	private Logger logger = LoggerFactory.getLogger(MerchantPayOrderHisServiceImpl.class);
	
	@Autowired
	private IMerchantAlipayInfoService alipayInfoService;
	
	@Autowired
	private MerchantPayOrderHisMapper mapper;
	
	@Autowired
	private IMerchantPayLogService payLogService;
	
	@Autowired
	private IMerchantCashierLogService cashierLogService;
	
	@Autowired
	private IAlipayService alipayService;
	
	@Autowired
	private IWxpayService wxpayService;
	
	@Autowired
	private IMerchantWxpayInfoService wxpayInfoService;
	
	@Autowired
	private MerchantOrderHisMapper orderHisMapper;
	
	/**
	 * 退款
	 */
	@Override
	public int refundPayOrderHis(String orderNo, String payOrderNo, Integer merchantId, Integer refundLimit, Integer refundMethod,
			String refundAmount, String refundReason, String username, String tableCode) throws YdpException {
		
		MerchantPayOrderHis payOrderHis = mapper.getByOrderNo(payOrderNo, merchantId);
		if(payOrderHis == null) {
			throw new YdpException("支付单不存在");
		}
		//收银退款流水
		MerchantCashierLog cashierLog = new MerchantCashierLog();
		cashierLog.setCashierAmount(new BigDecimal(refundAmount).negate());
		cashierLog.setCashierMethod(refundMethod);
		cashierLog.setCashierSource(1);//正常退款
		cashierLog.setOrderNo(orderNo);
		cashierLog.setCashierType(2);//退款
		cashierLog.setRemark(refundReason);//退款原因
		cashierLog.setOperationStaff(username);//操作员
		cashierLog.setCashierTime(new Date());
		cashierLog.setTableCode(tableCode);
		cashierLogService.save(cashierLog, merchantId);
		
//		OrderHisVo orderHisVo = orderHisService.getByOrderNo(orderNo, merchantId);
		BigDecimal refundAmountBD = new BigDecimal(refundAmount);
//		if(refundAmountBD.compareTo(orderHisVo.getPayPrice()) > 0) {
//			throw new YdpException("退款金额不能超过用餐订单收款金额,如需要继续退款支付单的已支付金额请选择与该笔用餐订单合并的其它用餐订单退款");
//		}
		if(payOrderHis.getPayMethod() == Constants.PAY_METHOD_CASH ||
				payOrderHis.getPayMethod() == Constants.PAY_METHOD_ALIPAY_TRANSFER ||
				payOrderHis.getPayMethod() == Constants.PAY_METHOD_WECHAT_TRANSFER ||
				payOrderHis.getPayMethod() == Constants.PAY_METHOD_OTHER) {
			if(Constants.PAY_METHOD_ALIPAY == Math.abs(refundMethod)
					|| Constants.PAY_METHOD_WECHAT == Math.abs(refundMethod)
					|| Constants.ALIPAY_QRCODE_FRONT == Math.abs(refundMethod)
					|| Constants.WECHAT_QRCODE_FRONT == Math.abs(refundMethod)) {
				RefundMethod refundMethodEnum = RefundMethod.lookup(refundMethod);
				throw new YdpException("现在支付、微信转账、支付宝转账、其它支付不能使用" + refundMethodEnum.getName());
			}
		}
		Date now = new Date();
		//支付宝\微信扫码前台扫码支付(输入金额)
		if(Constants.ALIPAY_QRCODE_FRONT == payOrderHis.getPayMethod()
				|| Constants.WECHAT_QRCODE_FRONT == payOrderHis.getPayMethod()
				|| Constants.PAY_METHOD_ALIPAY == payOrderHis.getPayMethod()
				|| Constants.PAY_METHOD_WECHAT == payOrderHis.getPayMethod()) {
			//如果已经退款
			if(payOrderHis.getOrderStatus().equals(Constants.ORDER_STATUS_REFUNDDONE)
					|| payOrderHis.getOrderStatus().equals(Constants.ORDER_STATUS_CANCEL)
					|| payOrderHis.getOrderStatus().equals(Constants.ORDER_STATUS_CLOSED)) {
				throw new YdpException("订单已关闭或已退款");
			}
			//前台扫码付款(支)(输入金额)
			if(Constants.ALIPAY_QRCODE_FRONT == payOrderHis.getPayMethod() 
					|| Constants.PAY_METHOD_ALIPAY == payOrderHis.getPayMethod()) {
				MerchantAlipayInfo alipayInfo = alipayInfoService.getAlipayInfoByMerchantId(merchantId);
				if(alipayInfo == null) {
					throw new YdpException("您还未开通支付宝收银,无法退款");
				}
				JSONObject bizContent = new JSONObject();
				//payLogService 退款流水
				String out_trade_no = payOrderNo;
				//订单状态是部分退款,就不管界面选择什么条件了
				if(payOrderHis.getOrderStatus().equals(Constants.ORDER_STATUS_PARTREFUND) || refundLimit == 2
						|| refundLimit == 3) {
					String merchantIdStr = YdpUtils.convertMechantId2Str(merchantId);
					String outRequestNo = DateUtil.format(now, DatePattern.PURE_DATETIME_MS_PATTERN) + merchantIdStr;
					bizContent.put("out_trade_no", out_trade_no);
					bizContent.put("refund_amount", refundAmount);
					bizContent.put("out_request_no", outRequestNo);
					bizContent.put("refund_reason", refundReason);
					int result = mapper.refundPartByOrderNo(payOrderNo, refundAmountBD, merchantId);
					if(result == 0) {
						throw new YdpException("退款失败,退款金额不能大于支付单已支付金额");
					}
					int result2 = orderHisMapper.refundPartByOrderNo(orderNo, refundAmountBD, merchantId);
					if(result2 == 0) {
						throw new YdpException("退款失败,退款金额不能超过用餐订单收款金额,如需要继续退款支付单的已支付金额请选择与该笔用餐订单合并的其它用餐订单退款");
					}
				} else if(refundLimit == 1) {//全额退款
					bizContent.put("out_trade_no", out_trade_no);
					bizContent.put("refund_amount", refundAmount);
					bizContent.put("refund_reason", refundReason);
//					mapper.refundAllByOrderNo(payOrderNo, merchantId);
					int result = mapper.refundPartByOrderNo(payOrderNo, refundAmountBD, merchantId);
					if(result == 0) {
						throw new YdpException("退款失败,退款金额不能大于支付单已支付金额");
					}
					if(!StringUtils.isEmpty(payOrderHis.getParentOutTradeNo())) {					
						orderHisMapper.refundALlByOutTradeNo(payOrderHis.getParentOutTradeNo(), refundAmountBD, merchantId);
					} else {						
						orderHisMapper.refundAllByOrderNo(payOrderHis.getParentOrderNo(), refundAmountBD, merchantId);
					}
				}
				//所关联用餐订单收款金额(outTradeNo)
				try {
					AlipayTradeRefundResponse response = alipayService.refundOrder(bizContent, alipayInfo.getAlipayToken());
					if(response.isSuccess() && "Y".equals(response.getFundChange())) {
						logger.debug("退款成功,trade_no:" + response.getTradeNo());
						MerchantPayLog payLog = new MerchantPayLog();
						payLog.setOutId(response.getBuyerUserId());//买家在支付宝的用户id
						payLog.setPayMethod(-payOrderHis.getPayMethod());//退款方式
						payLog.setLogSource(1);//正常
						payLog.setLogType(2);//退款
						payLog.setRemark("界面操作退款");//备注
						payLog.setPayNo(response.getTradeNo());//支付宝交易号
						payLog.setOrderNo(response.getOutTradeNo());//商户订单号
						payLog.setPayAmount(new BigDecimal(refundAmount).negate());//退款总金额
						payLog.setPayTime(response.getGmtRefundPay());//退款支付时间
						payLogService.save(payLog, merchantId);
					} else {
						throw new YdpException("支付宝支付退款失败," + response.getSubMsg());
					}
				} catch (AlipayApiException e) {
					e.printStackTrace();
					throw new YdpException("支付宝支付退款失败," + e.getErrMsg());
				}
			} else {
				//微信支付退款(前台扫码输入金额支付)
				MerchantWxpayInfo wxpayInfo = wxpayInfoService.selectByMid(merchantId);
				if(wxpayInfo == null || StringUtils.isEmpty(wxpayInfo.getSubMchId())) {
					throw new YdpException("您还未开通微信支付,无法退款");
				}
				Map<String, String> params = new HashMap<>();
				params.put("sub_mch_id", wxpayInfo.getSubMchId());
				
				String out_trade_no = payOrderNo;
				
				String merchantIdStr = YdpUtils.convertMechantId2Str(merchantId);
				String outRefundNo = DateUtil.format(now, DatePattern.PURE_DATETIME_MS_PATTERN) + merchantIdStr;
				params.put("transaction_id", payOrderHis.getPayNo());//微信支付交易号
				params.put("out_trade_no", out_trade_no);//商家订单号
				params.put("out_refund_no", outRefundNo);//退款单号
				params.put("total_fee", String.valueOf(payOrderHis.getOrderPrice().multiply(new BigDecimal(100L)).intValue()));//订单金额
				params.put("refund_desc", refundReason);
				//订单状态是部分退款,就不管界面选择什么条件了
				if(payOrderHis.getOrderStatus().equals(Constants.ORDER_STATUS_PARTREFUND) || refundLimit == 2
						|| refundLimit == 3) {
					params.put("refund_fee", String.valueOf(refundAmountBD.multiply(new BigDecimal(100L)).intValue()));
					int result = mapper.refundPartByOrderNo(payOrderNo, refundAmountBD, merchantId);
					if(result == 0) {
						throw new YdpException("退款失败,退款金额不能大于支付单已支付金额");
					}
					int result2 = orderHisMapper.refundPartByOrderNo(orderNo, refundAmountBD, merchantId);
					if(result2 == 0) {
						throw new YdpException("退款失败,退款金额不能超过用餐订单收款金额,如需要继续退款支付单的已支付金额请选择与该笔用餐订单合并的其它用餐订单退款");
					}
				} else if(refundLimit == 1) {//全额退款
					params.put("refund_fee", String.valueOf(payOrderHis.getPayPrice().multiply(new BigDecimal(100L)).intValue()));//订单金额
//					mapper.refundAllByOrderNo(payOrderNo, merchantId);
					int result = mapper.refundPartByOrderNo(payOrderNo, refundAmountBD, merchantId);
					if(result == 0) {
						throw new YdpException("退款失败,退款金额不能大于支付单已支付金额");
					}
					if(!StringUtils.isEmpty(payOrderHis.getParentOutTradeNo())) {						
						orderHisMapper.refundALlByOutTradeNo(payOrderHis.getParentOutTradeNo(), refundAmountBD, merchantId);
					} else {						
						orderHisMapper.refundAllByOrderNo(payOrderHis.getParentOrderNo(), refundAmountBD, merchantId);
					}
				}
				
				//所关联用餐订单收款金额(outTradeNo)
				Map<String, String> refundResults = null;
				try {
					refundResults = wxpayService.refundOrder(params);
				} catch (Exception e) {
					e.printStackTrace();
					logger.error("微信支付退款失败:0000系统异常");
					throw new YdpException("微信支付退款失败:0000系统异常");
				}
				String return_code = refundResults.get("return_code");// 状态
				if(Constants.WXPAY_SUCCESS_CODE.equals(return_code)) {//返回成功
					String result_code = refundResults.get("result_code");//退款结果
					if(Constants.WXPAY_SUCCESS_CODE.equals(result_code)) {//退款成功
						logger.info("微信支付退款成功,transaction_id:" + refundResults.get("transaction_id"));
						//payLogService 退款流水
						MerchantPayLog payLog = new MerchantPayLog();
						payLog.setOrderNo(refundResults.get("out_trade_no"));
						payLog.setPayMethod(-payOrderHis.getPayMethod());//退款方式
						payLog.setPayTime(now);//退款时间
						payLog.setLogSource(1);//正常
						payLog.setLogType(2);//退款
						payLog.setRemark("界面操作退款");
						//退款总金额,单位为分,可以做部分退款 
						BigDecimal payAmount = new BigDecimal(refundResults.get("refund_fee")).divide(new BigDecimal(100L));
						payLog.setPayAmount(payAmount.negate());
						payLog.setPayNo(refundResults.get("transaction_id"));//微信订单号 
						payLogService.save(payLog, merchantId);
					} else {
						String err_code_des = refundResults.get("err_code_des");//错误代码描述
						logger.error("微信支付退款失败:" + err_code_des);
						throw new YdpException("微信支付退款失败:" + err_code_des);
					}
				} else {
					logger.error("微信支付退款失败:" + refundResults.get("return_msg"));
					throw new YdpException("微信支付退款失败:" + refundResults.get("return_msg"));
				}
			}
		}
		return 1;
	}
	
	/**
	 * 关闭订单
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	@Override
	public int closeByOrderNo(String orderNo, Integer merchantId) throws YdpException {
		return mapper.closeByOrderNo(orderNo, merchantId);
	}
	
//	/**
//	 * 根据订单号查找
//	 * @param parentOrderNo
//	 * @param mid
//	 * @return
//	 * @throws YdpException
//	 */
//	@Override
//	public MerchantPayOrderHis getByParentOrderNo(String parentOrderNo, int mid) throws YdpException {
//		List<MerchantPayOrderHis> payOrderHises = mapper.getByParentOrderNo(parentOrderNo, mid);
//		if(payOrderHises.isEmpty()) {
//			throw new YdpException("未找到支付单");
//		}
//		if(payOrderHises.size() > 1) {
//			throw new YdpException("存在多个支付单");
//		}
//		return payOrderHises.get(0);
//	}
//	
//	/**
//	 * 根据合并单号查找
//	 * @param parentOutTradeNo
//	 * @param mid
//	 * @return
//	 * @throws YdpException
//	 */
//	@Override
//	public MerchantPayOrderHis getByParentOutTradeNo(String parentOutTradeNo, int mid) throws YdpException {
//		List<MerchantPayOrderHis> payOrderHises = mapper.getByParentOutTradeNo(parentOutTradeNo, mid);
//		if(payOrderHises.isEmpty()) {
//			throw new YdpException("未找到支付单");
//		}
//		if(payOrderHises.size() > 1) {
//			throw new YdpException("存在多个支付单");
//		}
//		return payOrderHises.get(0);
//	}
	
}
