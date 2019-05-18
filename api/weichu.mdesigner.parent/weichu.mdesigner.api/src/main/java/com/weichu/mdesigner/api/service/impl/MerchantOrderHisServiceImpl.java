package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.response.AlipayTradeRefundResponse;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.weichu.mdesigner.api.service.IAlipayService;
import com.weichu.mdesigner.api.service.IMemberUserService;
import com.weichu.mdesigner.api.service.IMerchantAlipayInfoService;
import com.weichu.mdesigner.api.service.IMerchantCashierLogService;
import com.weichu.mdesigner.api.service.IMerchantOrderHisService;
import com.weichu.mdesigner.api.service.IMerchantPayLogService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderHisService;
import com.weichu.mdesigner.api.service.IMerchantWxpayInfoService;
import com.weichu.mdesigner.api.service.IWxpayService;
import com.weichu.mdesigner.common.entity.MerchantAlipayInfo;
import com.weichu.mdesigner.common.entity.MerchantCashierLog;
import com.weichu.mdesigner.common.entity.MerchantOrderExample;
import com.weichu.mdesigner.common.entity.MerchantOrderHis;
import com.weichu.mdesigner.common.entity.MerchantOrderHisExample;
import com.weichu.mdesigner.common.entity.MerchantOrderItemExample;
import com.weichu.mdesigner.common.entity.MerchantOrderItemHis;
import com.weichu.mdesigner.common.entity.MerchantOrderItemHisExample;
import com.weichu.mdesigner.common.entity.MerchantPayLog;
import com.weichu.mdesigner.common.entity.MerchantPayOrderHis;
import com.weichu.mdesigner.common.entity.MerchantPayOrderHisExample;
import com.weichu.mdesigner.common.entity.MerchantWxpayInfo;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantOrderHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantOrderItemHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantOrderItemMapper;
import com.weichu.mdesigner.common.mapper.MerchantOrderMapper;
import com.weichu.mdesigner.common.mapper.MerchantPayOrderHisMapper;
import com.weichu.mdesigner.common.vo.OrderHisVo;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.OrderStatus;
import com.weichu.mdesigner.utils.constants.PayMethod;
import com.weichu.mdesigner.utils.constants.RefundMethod;
import com.weichu.mdesigner.utils.page.PageBean;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 历史订单 操作
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantOrderHisServiceImpl implements IMerchantOrderHisService {

	private static Logger logger = LoggerFactory.getLogger(MerchantOrderHisServiceImpl.class);
	
	@Autowired
	private MerchantOrderMapper orderMapper;
	
	@Autowired
	private MerchantOrderHisMapper orderHisMapper;
	
	@Autowired
	private MerchantOrderItemMapper orderItemMapper;
	
	@Autowired
	private MerchantOrderItemHisMapper orderItemHisMapper;
	
	@Autowired
	private MerchantPayOrderHisMapper payOrderHisMapper;
	
	@Autowired
	private IMerchantPayOrderHisService payOrderHisService;
	
	@Autowired
	private IMerchantPayLogService payLogService;
	
	@Autowired
	private IMerchantCashierLogService cashierLogService;
	
	@Autowired
	private IMerchantAlipayInfoService alipayInfoService;
	
	@Autowired
	private IMerchantWxpayInfoService wxpayInfoService;
	
	@Autowired
	private IMemberUserService memberUserService;
	
	@Autowired
	private IAlipayService alipayService;
	
	@Autowired
	private IWxpayService wxpayService;
	
	/**
	 * 支付成功后，订单表入历史表
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public int insertFromOrder(String orderNo, Integer mid) {
		orderItemHisMapper.insertFromOrder(orderNo, mid);
		orderHisMapper.insertFromOrder(orderNo, mid);
		MerchantOrderExample orderExample = new MerchantOrderExample();
		orderExample.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		orderMapper.deleteByExample(orderExample);
		MerchantOrderItemExample orderItemExample = new MerchantOrderItemExample();
		orderItemExample.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		return orderItemMapper.deleteByExample(orderItemExample);
	}
	
	/**
	 * 根据订单号获取历史订单
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	@Override
	public OrderHisVo getByOrderNo(String orderNo, Integer merchantId) {
		return orderHisMapper.selectByOrderNo(orderNo, merchantId);
	}
	
	/**
	 * 分页查询历史订单
	 * @param pageSize
	 * @param pageNum
	 * @param searchParams
	 * @param mid
	 * @return
	 */
	@Override
	public PageBean<OrderHisVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, Integer mid) {
		PageBean<OrderHisVo> pageBean = new PageBean<OrderHisVo>();
		MerchantOrderHisExample example = new MerchantOrderHisExample();
		example.setOrderByClause(" order_time desc ");
		MerchantOrderHisExample.Criteria criteria = example.createCriteria();
		Map<String, Object> params = new HashMap<>();
		params.put("merchantId", mid);
		if(!StringUtils.isEmpty(searchParams.get("tableCodes"))) {
			List<String> tableCodes = Arrays.asList(searchParams.get("tableCodes").split(","));
			if(tableCodes.size() > 1) {
				criteria.andTableCodeIn(tableCodes);
			} else {
				criteria.andTableCodeEqualTo(tableCodes.get(0));
			}
			params.put("tableCodes", tableCodes);
		}
		String orderNo = searchParams.get("orderNo"); 
		if(!StringUtils.isEmpty(orderNo)) {
			criteria.andOrderNoEqualTo(orderNo);
			params.put("orderNo", orderNo);
		}
		String orderStatus = searchParams.get("orderStatus");
		if(!StringUtils.isEmpty(orderStatus)) {
			criteria.andOrderStatusEqualTo(orderStatus);
			params.put("orderStatus", orderStatus);
		}
		String orderTimeStart = searchParams.get("orderTimeStart");
		String orderTimeEnd = searchParams.get("orderTimeEnd");
		criteria.andOrderTimeBetween(DateUtil.parse(orderTimeStart, DatePattern.NORM_DATETIME_MINUTE_PATTERN), 
				DateUtil.parse(orderTimeEnd, DatePattern.NORM_DATETIME_MINUTE_PATTERN));
		criteria.andMerchantIdEqualTo(mid);
		//如果是根据订单号查询 就不需要日期约束条件
		if(StringUtils.isEmpty(orderNo)) {
			params.put("orderTimeStart", DateUtil.parse(orderTimeStart, DatePattern.NORM_DATETIME_MINUTE_PATTERN));
			params.put("orderTimeEnd", DateUtil.parse(orderTimeEnd, DatePattern.NORM_DATETIME_MINUTE_PATTERN));
		}
		Page<OrderHisVo> page = PageHelper.startPage(pageNum, pageSize);
		List<OrderHisVo> orderHisVos = orderHisMapper.listBySearchParams(params);
		for (OrderHisVo orderHis : orderHisVos) {
			OrderStatus orderStatusEnum = OrderStatus.lookup(orderHis.getOrderStatus());
			if(orderStatusEnum != null) {
				orderHis.setOrderStatusName(orderStatusEnum.getName());
			} else {
				orderHis.setOrderStatusName("未知状态");
			}
			PayMethod payMethod = PayMethod.lookup(orderHis.getPayMethod());
			if(payMethod != null) {
				orderHis.setPayMethodName(payMethod.getName());
			} else {
				StringBuilder payMethodNameSB = new StringBuilder();
				//可能是关联了前台扫码支付多笔支付单
				String[] payMethods = YdpUtils.converString2Array(String.valueOf(orderHis.getPayMethod()));
				for (String s : payMethods) {
					payMethod = PayMethod.lookup(Integer.parseInt(s));
					payMethodNameSB.append(payMethod.getName()).append(",");
				}
				orderHis.setPayMethodName(payMethodNameSB.toString());
			}
		}
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(orderHisVos);
		return pageBean;
	}
	
	/**
	 * 退款操作
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	@Override
	public int refundOrderHis(String orderNo, Integer merchantId, Integer refundLimit, Integer refundMethod, 
			String refundAmount, String refundReason, String username) throws YdpException {
		OrderHisVo orderHisVo = this.getByOrderNo(orderNo, merchantId);
		if(orderHisVo == null) {
			throw new YdpException("订单不存在");
		}
		BigDecimal refundAmountBD = new BigDecimal(refundAmount);
		if(refundAmountBD.compareTo(orderHisVo.getPayPrice()) == 1) {
			throw new YdpException("退款金额不能超过收款金额");
		}
		if(orderHisVo.getPayMethod() == Constants.PAY_METHOD_CASH ||
				orderHisVo.getPayMethod() == Constants.PAY_METHOD_ALIPAY_TRANSFER ||
				orderHisVo.getPayMethod() == Constants.PAY_METHOD_WECHAT_TRANSFER ||
				orderHisVo.getPayMethod() == Constants.PAY_METHOD_OTHER ||
				orderHisVo.getPayMethod() == Constants.VIP) {
			if(Constants.PAY_METHOD_ALIPAY == Math.abs(refundMethod) 
					|| Constants.PAY_METHOD_WECHAT == Math.abs(refundMethod)
					|| Constants.ALIPAY_QRCODE_FRONT == Math.abs(refundMethod)
					|| Constants.WECHAT_QRCODE_FRONT == Math.abs(refundMethod)) {
				RefundMethod refundMethodEnum = RefundMethod.lookup(refundMethod);
				throw new YdpException("现在支付、微信转账、支付宝转账、其它支付、会员消费不能使用" + refundMethodEnum.getName());
			}
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
		cashierLog.setTableCode(orderHisVo.getTableCode());
		cashierLogService.save(cashierLog, merchantId);
		
		Date now = new Date();
		//校验退款规则(所有收款方式都可以现金退款)
		if(Math.abs(refundMethod) == Constants.PAY_METHOD_CASH //现金退款
				|| Math.abs(refundMethod) == Constants.REFUND_METHOD_ALIPAY_TRANSFER //支付宝转账
				|| Math.abs(refundMethod) == Constants.REFUND_METHOD_WECHAT_TRANSFER //微信转账
				|| Math.abs(refundMethod) == Constants.REFUND_METHOD_OTHER) {//其他
			if(refundLimit == 1) {//全额退款
				int result = orderHisMapper.refundAllByOrderNo(orderNo, refundAmountBD, merchantId);
				if(result == 0) {
					throw new YdpException("退款金额不能大于已收款金额");
				}
			} else {
				int result = orderHisMapper.refundPartByOrderNo(orderNo, refundAmountBD, merchantId);
				if(result == 0) {
					throw new YdpException("退款金额不能大于已收款金额");
				}
			}
		} else if(Math.abs(refundMethod) == Constants.VIP) {
			memberUserService.rechargeRefund(refundAmountBD, orderHisVo.getMemberId(), merchantId, username);
			if(refundLimit == 1) {//全额退款
				int result = orderHisMapper.refundAllByOrderNo(orderNo, refundAmountBD, merchantId);
				if(result == 0) {
					throw new YdpException("退款金额不能大于消费金额");
				}
			} else {
				int result = orderHisMapper.refundPartByOrderNo(orderNo, refundAmountBD, merchantId);
				if(result == 0) {
					throw new YdpException("退款金额不能大于消费金额");
				}
			}
		} else {
			throw new YdpException("不支持的退款方式,请选择具体的支付单退款");
//		} else {
//			//支付宝\微信扫码支付(桌台扫码支付)
//			if(Constants.PAY_METHOD_ALIPAY == orderHisVo.getPayMethod() 
//					|| Constants.PAY_METHOD_WECHAT == orderHisVo.getPayMethod()) {
//				//如果已经退款
//				if(orderHisVo.getOrderStatus().equals(Constants.ORDER_STATUS_REFUNDDONE)
//						|| orderHisVo.getOrderStatus().equals(Constants.ORDER_STATUS_CANCEL)
//						|| orderHisVo.getOrderStatus().equals(Constants.ORDER_STATUS_CLOSED)) {
//					throw new YdpException("订单已退款或已取消或已关闭");
//				}
//				//桌台扫码付款(支)
//				if(Constants.PAY_METHOD_ALIPAY == orderHisVo.getPayMethod()) {
//					MerchantAlipayInfo alipayInfo = alipayInfoService.getAlipayInfoByMerchantId(merchantId);
//					if(alipayInfo == null) {
//						throw new YdpException("您还未开通支付宝收银,无法退款");
//					}
//					JSONObject bizContent = new JSONObject();
//					
//					String out_trade_no = null;//支付宝商家订单号
//					if(StringUtils.isEmpty(orderHisVo.getOutTradeNo())) {//不是合并付款
//						out_trade_no = orderNo;
////						MerchantPayOrderHis payOrderHis = payOrderHisService.getByParentOrderNo(orderNo, merchantId);
////						out_trade_no = payOrderHis.getOrderNo();
//						//订单状态是部分退款,就不管界面选择什么条件了
//						if(orderHisVo.getOrderStatus().equals(Constants.ORDER_STATUS_PARTREFUND) || refundLimit == 2) {
//							String merchantIdStr = YdpUtils.convertMechantId2Str(merchantId);
//							String outRequestNo = DateUtil.format(now, DatePattern.PURE_DATETIME_MS_PATTERN) + merchantIdStr;
//							bizContent.put("out_trade_no", out_trade_no);
//							bizContent.put("refund_amount", refundAmount);
//							bizContent.put("out_request_no", outRequestNo);
//							bizContent.put("refund_reason", refundReason);
//							int result = orderHisMapper.refundPartByOrderNo(orderNo, refundAmountBD, merchantId);
//							if(result == 0) {
//								throw new YdpException("退款金额不能大于已收款金额");
//							}
//						} else if(refundLimit == 1) {//全额退款
//							bizContent.put("out_trade_no", out_trade_no);
//							bizContent.put("refund_amount", refundAmountBD);
//							bizContent.put("refund_reason", refundReason);
//							int result = orderHisMapper.refundAllByOrderNo(orderNo, refundAmountBD, merchantId);
//							if(result == 0) {
//								throw new YdpException("退款金额不能大于消费金额");
//							}
//						}
//							
//					} else {//合并付款 只能是部分退款了
//						out_trade_no = orderHisVo.getOutTradeNo();
////						MerchantPayOrderHis payOrderHis = payOrderHisService.getByParentOutTradeNo(orderHisVo.getOutTradeNo(), merchantId);
////						out_trade_no = payOrderHis.getOrderNo();
//						String merchantIdStr = YdpUtils.convertMechantId2Str(merchantId);
//						String outRequestNo = DateUtil.format(now, DatePattern.PURE_DATETIME_MS_PATTERN) + merchantIdStr;
//						bizContent.put("out_trade_no", out_trade_no);
//						bizContent.put("refund_amount", refundAmount);
//						bizContent.put("out_request_no", outRequestNo);
//						bizContent.put("refund_reason", refundReason);
//						if(refundLimit == 1) {//全额退款
//							orderHisMapper.refundAllByOrderNo(orderNo, merchantId);
//						} else {//部分退款
//							int result = orderHisMapper.refundPartByOrderNo(orderNo, refundAmountBD, merchantId);
//							if(result == 0) {
//								throw new YdpException("退款金额不能大于已收款金额");
//							}
//						}
//					}
//					try {
//						AlipayTradeRefundResponse response = alipayService.refundOrder(bizContent, alipayInfo.getAlipayToken());
//						if(response.isSuccess() && "Y".equals(response.getFundChange())) {
//							logger.debug("支付宝支付退款成功,trade_no:" + response.getTradeNo());
//							MerchantPayLog payLog = new MerchantPayLog();
//							payLog.setOutId(response.getBuyerUserId());//买家在支付宝的用户id
//							payLog.setPayMethod(-orderHisVo.getPayMethod());//退款方式
//							payLog.setLogSource(1);//正常
//							payLog.setLogType(2);//退款
//							payLog.setRemark("界面操作退款");//备注
//							payLog.setPayNo(response.getTradeNo());//支付宝交易号
//							payLog.setOrderNo(response.getOutTradeNo());//商户订单号
//							payLog.setPayAmount(new BigDecimal(refundAmount).negate());//本次退款金额
//							payLog.setPayTime(response.getGmtRefundPay());//退款支付时间
//							payLogService.save(payLog, merchantId);
//						} else {
//							throw new YdpException("支付宝支付退款失败," + response.getSubMsg());
//						}
//					} catch (AlipayApiException e) {
//						e.printStackTrace();
//						throw new YdpException("支付宝支付退款失败," + e.getErrMsg());
//					}
//				} else {
//					//微信支付退款(桌台扫码支付)
////					sub_mch_id、transaction_id、out_trade_no、out_refund_no、total_fee、refund_fee
//					MerchantWxpayInfo wxpayInfo = wxpayInfoService.selectByMid(merchantId);
//					if(wxpayInfo == null || StringUtils.isEmpty(wxpayInfo.getSubMchId())) {
//						throw new YdpException("您还未开通微信支付,无法退款");
//					}
//					Map<String, String> params = new HashMap<>();
//					params.put("sub_mch_id", wxpayInfo.getSubMchId());
//					String out_trade_no = null;//商家订单号
//					String merchantIdStr = YdpUtils.convertMechantId2Str(merchantId);
//					String outRefundNo = DateUtil.format(now, DatePattern.PURE_DATETIME_MS_PATTERN) + merchantIdStr;
//					params.put("transaction_id", orderHisVo.getPayNo());//微信支付交易号
//					params.put("out_refund_no", outRefundNo);//退款单号
//					params.put("total_fee", String.valueOf(orderHisVo.getTotalPrice().subtract(orderHisVo.getSubtractAmount()).multiply(new BigDecimal(100L)).intValue()));//订单金额
//					params.put("refund_desc", refundReason);//退款原因
//					if(StringUtils.isEmpty(orderHisVo.getOutTradeNo())) {//不是合并付款
//						out_trade_no = orderNo;
////						MerchantPayOrderHis payOrderHis = payOrderHisService.getByParentOrderNo(orderNo, merchantId);
////						out_trade_no = payOrderHis.getOrderNo();
//						params.put("out_trade_no", out_trade_no);//商家订单号
//						//订单状态是部分退款,就不管界面选择什么条件了
//						if(orderHisVo.getOrderStatus().equals(Constants.ORDER_STATUS_PARTREFUND) || refundLimit == 2) {
//							params.put("refund_fee", String.valueOf(refundAmountBD.multiply(new BigDecimal(100L)).intValue()));//退款金额
//							int result = orderHisMapper.refundPartByOrderNo(orderNo, refundAmountBD, merchantId);
//							if(result == 0) {
//								throw new YdpException("退款金额不能大于已收款金额");
//							}
//						} else if(refundLimit == 1) {//全额退款
//							params.put("refund_fee", String.valueOf(orderHisVo.getPayPrice().multiply(new BigDecimal(100L)).intValue()));//退款金额
//							orderHisMapper.refundAllByOrderNo(orderNo, merchantId);
//						}
//					} else {//合并付款 只能是部分退款了
//						out_trade_no = orderHisVo.getOutTradeNo();
////						MerchantPayOrderHis payOrderHis = payOrderHisService.getByParentOutTradeNo(orderHisVo.getOutTradeNo(), merchantId);
////						out_trade_no = payOrderHis.getOrderNo();
//						//微信合并退款 需要计算出订单总金额
//						MerchantOrderHisExample orderHisExample = new MerchantOrderHisExample();
//						orderHisExample.createCriteria().andOutTradeNoEqualTo(orderHisVo.getOutTradeNo()).andMerchantIdEqualTo(merchantId);
//						List<MerchantOrderHis> hisOrders = orderHisMapper.selectByExample(orderHisExample);
//						BigDecimal totalFee = new BigDecimal("0.00");
//						for (MerchantOrderHis merchantOrderHis : hisOrders) {
//							totalFee = totalFee.add(merchantOrderHis.getTotalPrice()).subtract(merchantOrderHis.getSubtractAmount());
//						}
//						params.put("total_fee", String.valueOf(totalFee.multiply(new BigDecimal(100L)).intValue()));//订单金额
//						params.put("out_trade_no", out_trade_no);//商家订单号
//						params.put("refund_fee", String.valueOf(refundAmountBD.multiply(new BigDecimal(100L)).intValue()));
//						if(refundLimit == 1) {//全额退款
//							orderHisMapper.refundAllByOrderNo(orderNo, merchantId);
//						} else {//部分退款
//							int result = orderHisMapper.refundPartByOrderNo(orderNo, refundAmountBD, merchantId);
//							if(result == 0) {
//								throw new YdpException("退款金额不能大于已收款金额");
//							}
//						}
//					}
//					Map<String, String> refundResults = null;
//					try {
//						refundResults = wxpayService.refundOrder(params);
//					} catch (Exception e) {
//						e.printStackTrace();
//						logger.error("微信支付退款失败:0000系统异常");
//						throw new YdpException("微信支付退款失败:0000系统异常");
//					}
//					String return_code = refundResults.get("return_code");// 状态
//					if(Constants.WXPAY_SUCCESS_CODE.equals(return_code)) {//返回成功
//						String result_code = refundResults.get("result_code");//退款结果
//						if(Constants.WXPAY_SUCCESS_CODE.equals(result_code)) {//退款成功
//							logger.info("微信支付退款成功,transaction_id:" + refundResults.get("transaction_id"));
//							//payLogService 退款流水
//							MerchantPayLog payLog = new MerchantPayLog();
//							payLog.setOrderNo(refundResults.get("out_trade_no"));
//							payLog.setPayMethod(-orderHisVo.getPayMethod());//退款方式
//							payLog.setPayTime(now);//退款时间
//							payLog.setLogSource(1);//正常
//							payLog.setLogType(2);//退款
//							payLog.setRemark("界面操作退款");
//							//退款总金额,单位为分,可以做部分退款 
//							BigDecimal payAmount = new BigDecimal(refundResults.get("refund_fee")).divide(new BigDecimal(100L));
//							payLog.setPayAmount(payAmount.negate());
//							payLog.setPayNo(refundResults.get("transaction_id"));//微信订单号 
//							payLogService.save(payLog, merchantId);
//						} else {
//							String err_code_des = refundResults.get("err_code_des");//错误代码描述
//							logger.error("微信支付退款失败:" + err_code_des);
//							throw new YdpException("微信支付退款失败:" + err_code_des);
//						}
//					} else {
//						logger.error("微信支付退款失败:" + refundResults.get("return_msg"));
//						throw new YdpException("微信支付退款失败:" + refundResults.get("return_msg"));
//					}
//				}
//			}
		}
		return 1;
	}
	
	/**
	 * 
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	@Override
	public Map<String, List<?>> listByOrderNo(String orderNo, Integer merchantId, Integer payMethod) {
		Map<String, List<?>> resultMap = new HashMap<>();
//		OrderHisVo orderHisVo = getByOrderNo(orderNo, merchantId);
//		List<MerchantPayLog> payLogs = null;
//		if(!StringUtils.isEmpty(orderHisVo.getOutTradeNo())) {//合并收款
////			List<OrderHisVo> orderHisVos = orderHisMapper.listByOutTradeNo(orderNo, orderHisVo.getOutTradeNo(), merchantId);
////			resultMap.put("orderHisVos", orderHisVos);
//			payLogs = payLogService.listByOutTradeNo(orderHisVo.getOutTradeNo(), merchantId);
//		} else {
//			payLogs = payLogService.listByOrderNo(orderNo, merchantId);
//		}
//		List<MerchantPayLogVo> payLogVos = new ArrayList<>();
//		for (MerchantPayLog merchantPayLog : payLogs) {
//			MerchantPayLogVo payLogVo = new MerchantPayLogVo();
//			BeanUtils.copyProperties(merchantPayLog, payLogVo);
//			if(merchantPayLog.getLogType() == 2) {//退款
//				payLogVo.setLogTypeName("退款");
//				RefundMethod refundMethod = RefundMethod.lookup(merchantPayLog.getPayMethod());
//				if(refundMethod != null) {
//					payLogVo.setPayMethodName(refundMethod.getName());
//				} else {
//					payLogVo.setPayMethodName(Constants.UNKNOWN);
//				}
//			} else {
//				payLogVo.setLogTypeName("收款");
//				PayMethod payMethodEnum = PayMethod.lookup(merchantPayLog.getPayMethod());
//				if(payMethodEnum != null) {
//					payLogVo.setPayMethodName(payMethodEnum.getName());
//				} else {
//					StringBuilder payMethodNameSB = new StringBuilder();
//					//可能是关联了前台扫码支付多笔支付单
//					String[] payMethods = YdpUtils.converString2Array(String.valueOf(merchantPayLog.getPayMethod()));
//					for (String s : payMethods) {
//						payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
//						payMethodNameSB.append(payMethodEnum.getName()).append(",");
//					}
//					payLogVo.setPayMethodName(payMethodNameSB.toString());
//				}
//			}
//			payLogVos.add(payLogVo);
//		}
//		payLogs = null;
//		resultMap.put("payLogs", payLogVos);
		//关联支付单明细
//		if(Constants.ALIPAY_QRCODE_FRONT == payMethod || Constants.WECHAT_QRCODE_FRONT == payMethod
//				|| String.valueOf(payMethod).indexOf("3") > -1 
//				|| String.valueOf(payMethod).indexOf("4") > -1) {
			MerchantPayOrderHisExample payOrderHisExample = new MerchantPayOrderHisExample();
			OrderHisVo orderHis = orderHisMapper.selectByOrderNo(orderNo, merchantId);
			if(StringUtils.isEmpty(orderHis.getOutTradeNo())) {//非合并单收款
				payOrderHisExample.createCriteria().andParentOrderNoEqualTo(orderNo)
					.andPayNoIsNotNull().andMerchantIdEqualTo(merchantId);
			} else {//合并单收款
				payOrderHisExample.createCriteria().andParentOutTradeNoEqualTo(orderHis.getOutTradeNo())
					.andPayNoIsNotNull().andMerchantIdEqualTo(merchantId);
			}
			List<MerchantPayOrderHis> payOrders = payOrderHisMapper.selectByExample(payOrderHisExample);
			resultMap.put("payOrders", payOrders);
//		}
		//订单明细
		MerchantOrderItemHisExample example = new MerchantOrderItemHisExample();
		example.createCriteria().andOrderItemStatusNotEqualTo(Constants.ORDER_STATUS_CLOSED)
			.andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(merchantId);
		List<MerchantOrderItemHis> orderItems = orderItemHisMapper.selectByExample(example);
		resultMap.put("orderItems", orderItems);
		return resultMap;
	}
	
	/**
	 * 修改订单备注
	 * @param orderNo
	 * @param remark
	 * @param merchantId
	 * @return
	 */
	@Override
	public int modifyRemark(String orderNo, String remark, Integer merchantId) {
		return orderHisMapper.modifyRemark(orderNo, remark, merchantId);
	}
	
	/**
	 * 查看合并订单
	 * @param outTradeNo
	 * @param mid
	 * @return
	 */
	@Override
	public List<OrderHisVo> listOrderHisByOutTradeNo(String outTradeNo, int mid) {
		List<OrderHisVo> orderHisVos = orderHisMapper.listOrderHisByOutTradeNo(outTradeNo, mid);
		for (OrderHisVo orderHisVo : orderHisVos) {
			OrderStatus orderStatusEnum = OrderStatus.lookup(orderHisVo.getOrderStatus());
			if(orderStatusEnum != null) {
				orderHisVo.setOrderStatusName(orderStatusEnum.getName());
			} else {
				orderHisVo.setOrderStatusName("未知状态");
			}
			PayMethod payMethodEnum = PayMethod.lookup(orderHisVo.getPayMethod());
			if(payMethodEnum != null) {
				orderHisVo.setPayMethodName(payMethodEnum.getName());
			} else {
				StringBuilder payMethodNameSB = new StringBuilder();
				//可能是关联了前台扫码支付多笔支付单
				String[] payMethods = YdpUtils.converString2Array(String.valueOf(orderHisVo.getPayMethod()));
				for (String s : payMethods) {
					payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
					payMethodNameSB.append(payMethodEnum.getName()).append(",");
				}
				orderHisVo.setPayMethodName(payMethodNameSB.toString());
			}
			
		}
		return orderHisVos;
	}
	
	/**
	 * 三个月支付，支付宝会发送异步通知结束交易(不可退款) 我们要关闭订单
	 * @param outTradeNo
	 * @param isMergedOrder
	 * @param mid
	 * @return
	 */
	@Override
	public int closeHisOrder(String outTradeNo, boolean isMergedOrder, int mid) {
		if(isMergedOrder) {
			//合并支付订单，根据合并单号关闭订单
			return orderHisMapper.closeOrderByOutTradeNo(outTradeNo, mid);
		} else {
			//非合并单，根据订单号关闭订单
			return orderHisMapper.closeOrderByOrderNo(outTradeNo, mid);
		}
	}
	
	/**
	 * 打印收银小票
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public OrderHisVo selectOrderByOrderNo(String orderNo, int mid) throws YdpException {
		MerchantOrderHisExample example = new MerchantOrderHisExample();
		example.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		List<MerchantOrderHis> ordersHis = orderHisMapper.selectByExample(example);
		if(ordersHis.isEmpty()) {
			throw new YdpException("用餐订单不存在");
		}
		OrderHisVo orderHisVo = new OrderHisVo();
		BeanUtils.copyProperties(ordersHis.get(0), orderHisVo);
		OrderStatus orderStatusEnum = OrderStatus.lookup(orderHisVo.getOrderStatus());
		if(orderStatusEnum != null) {
			orderHisVo.setOrderStatusName(orderStatusEnum.getName());
		} else {
			orderHisVo.setOrderStatusName("未知状态");
		}
		PayMethod payMethodEnum = PayMethod.lookup(orderHisVo.getPayMethod());
		if(payMethodEnum != null) {
			orderHisVo.setPayMethodName(payMethodEnum.getName());
		} else {
			StringBuilder payMethodNameSB = new StringBuilder();
			//可能是关联了前台扫码支付多笔支付单
			String[] payMethods = YdpUtils.converString2Array(String.valueOf(orderHisVo.getPayMethod()));
			for (String s : payMethods) {
				payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
				payMethodNameSB.append(payMethodEnum.getName()).append(",");
			}
			orderHisVo.setPayMethodName(payMethodNameSB.toString());
		}
		return orderHisVo;
	}
	
}
