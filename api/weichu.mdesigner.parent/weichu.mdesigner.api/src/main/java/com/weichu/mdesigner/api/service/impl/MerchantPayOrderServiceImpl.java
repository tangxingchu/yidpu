package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
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
import com.alipay.api.response.AlipayTradeCreateResponse;
import com.weichu.mdesigner.api.controller.CashierLogController;
import com.weichu.mdesigner.api.service.IAlipayService;
import com.weichu.mdesigner.api.service.IMerchantCashierLogService;
import com.weichu.mdesigner.api.service.IMerchantPayLogService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderService;
import com.weichu.mdesigner.api.service.IMerchantWxpayInfoService;
import com.weichu.mdesigner.api.service.IWxpayService;
import com.weichu.mdesigner.api.socketio.SocketioClient;
import com.weichu.mdesigner.common.entity.MerchantCashierLog;
import com.weichu.mdesigner.common.entity.MerchantPayLog;
import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.common.entity.MerchantPayOrderExample;
import com.weichu.mdesigner.common.entity.MerchantWxpayInfo;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantPayOrderHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantPayOrderMapper;
import com.weichu.mdesigner.utils.constants.Constants;

/**
 * 前台扫码支付订单
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantPayOrderServiceImpl implements IMerchantPayOrderService {
	
	Logger logger = LoggerFactory.getLogger(MerchantPayOrderServiceImpl.class);

	@Autowired
	private MerchantPayOrderMapper mapper;
	
	@Autowired
	private MerchantPayOrderHisMapper payOrderHisMapper;
	
	@Autowired
	private IMerchantPayLogService payLogService;
	
	@Autowired
	private SocketioClient socketClient;
	
	@Autowired
	private IAlipayService alipayService;
	
	@Autowired
	private IWxpayService wxpayService;
	
	@Autowired
	private IMerchantWxpayInfoService wxpayInfoService;
	
	@Autowired
	private IMerchantCashierLogService cashierLogService;
	
	/**
	 * 当前所有前台扫码支付订单
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantPayOrder> list(int mid) {
		MerchantPayOrderExample example = new MerchantPayOrderExample();
		List<Integer> payMethods = new ArrayList<Integer>();
		payMethods.add(Constants.ALIPAY_QRCODE_FRONT);
		payMethods.add(Constants.WECHAT_QRCODE_FRONT);
		example.createCriteria().andPayMethodIn(payMethods).andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}

	/**
	 * 新增前台扫码支付订单
	 * @param payOrder
	 * @param mid
	 * @return
	 */
	@Override
	public String saveByAlipay(MerchantPayOrder payOrder, int mid, String aplipayToken, JSONObject bizContent) throws YdpException {
		payOrder.setOrderTime(new Date());
		payOrder.setMerchantId(mid);
		try {
			AlipayTradeCreateResponse response = alipayService.tradeCreate(bizContent, aplipayToken);
			if(response.isSuccess()) {
				mapper.insertSelective(payOrder);
				return response.getTradeNo();
			} else {
				logger.error("/alipayFrontOrder 调用失败" + response.getSubMsg());
				throw new YdpException("订单创建失败," + response.getSubMsg());
			}
		} catch (AlipayApiException e) {
			e.printStackTrace();
			throw new YdpException("订单创建失败," + e.getErrMsg());
		}		
	}
	
	/**
	 * 
	 * @param payOrder
	 * @param mid
	 * @param params
	 * @return
	 * @throws YdpException
	 */
	@Override
	public int save(MerchantPayOrder payOrder, int mid) throws YdpException {
		payOrder.setOrderTime(new Date());
		payOrder.setMerchantId(mid);
		return mapper.insertSelective(payOrder);
	}

	/**
	 * 取消支付的，订单直接删除
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public int deleteByOrderNo(String orderNo, int mid) throws YdpException {
		MerchantPayOrderExample example = new MerchantPayOrderExample();
		example.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		return mapper.deleteByExample(example);
	}
	
	/**
	 * 根据id删除
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public int deleteById(Integer id, int mid) throws YdpException {
		MerchantPayOrderExample example = new MerchantPayOrderExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		List<MerchantPayOrder> payOrders = mapper.selectByExample(example);
		if(payOrders.isEmpty()) {
			throw new YdpException("订单已删除");
		} else {
			MerchantPayOrder payOrder = payOrders.get(0);
			//桌台扫码支付单
			if(payOrder.getPayMethod() == null) {
				int result = mapper.deleteById(id, mid);
				if(result == 0) {
					throw new YdpException("已支付的订单无法删除");
				}
				return result;
			} else {
				//支付宝前台扫码支付( 设置了5分钟自动关闭订单，无需手动关闭)
				if(Constants.ALIPAY_QRCODE_FRONT == payOrder.getPayMethod()) {
//					MerchantAlipayInfo alipayInfo = alipayInfoService.getAlipayInfoByMerchantId(mid);
//					try {
//						AlipayTradeCloseResponse closeResponse = alipayService.closeOrder(payOrder.getOrderNo(), alipayInfo.getAlipayToken());
//						if(closeResponse.isSuccess()) {
							int result = mapper.deleteById(id, mid);
							if(result == 0) {
								throw new YdpException("已支付的订单无法删除");
							}
							return result;
//						} else {
//							logger.error("支付宝前端扫码订单关闭失败," + closeResponse.getSubMsg());
//							throw new YdpException("支付宝消息," + closeResponse.getSubMsg());
//						}
//					} catch (AlipayApiException e) {
//						logger.error("支付宝前端扫码订单关闭失败," + e.getErrMsg());
//						throw new YdpException("支付宝消息," + e.getErrMsg());
//					}
				} else {
					MerchantWxpayInfo wxpayInfo = wxpayInfoService.selectByMid(mid);
					//关闭微信支付单 sub_mch_id、out_trade_no
					Map<String, String> params = new HashMap<>();
					params.put("sub_mch_id", wxpayInfo.getSubMchId());
					params.put("out_trade_no", payOrder.getOrderNo());
					Map<String, String> results = null;
					try {
						results = wxpayService.closeOrder(params);
					} catch (Exception e) {
						e.printStackTrace();
						logger.error("微信支付关闭失败,0000系统异常");
						throw new YdpException("微信支付关闭失败,0000系统异常");
					}
					String return_code = results.get("return_code");//返回状态码 
					if (Constants.WXPAY_SUCCESS_CODE.equals(return_code)) {
						int result = mapper.deleteById(id, mid);
						if(result == 0) {
							throw new YdpException("已支付的订单无法删除");
						}
						return result;
					} else {
						String return_msg = results.get("return_msg");
						throw new YdpException("微信支付关闭失败:" + return_msg);
					}
				}
			}
		}
	}
	
//	/**
//	 * 关闭订单
//	 * @param orderNo
//	 * @param merchantId
//	 * @return
//	 */
//	@Override
//	public int closeByOrderNo(String orderNo, Integer merchantId) throws YdpException {
////		mapper.closeByOrderNo(orderNo, merchantId);
//		MerchantAlipayInfo alipayInfo = alipayInfoService.getAlipayInfoByMerchantId(merchantId);
//		try {
//			AlipayTradeCloseResponse response = alipayService.closeOrder(orderNo, alipayInfo.getAlipayToken());
//			if(response.isSuccess()) {
//				//删除前台扫码支付单
//				return this.deleteByOrderNo(orderNo, merchantId);
//			} else {
//				logger.error("/closeFrontOrder 调用失败");
//				throw new YdpException("closeFrontOrder 调用失败" + response.getSubMsg());
//			}
//		} catch (AlipayApiException e) {
//			e.printStackTrace();
//			throw new YdpException("closeFrontOrder 调用失败" + e.getErrMsg());
//		}
//	}
	
	/**
	 * 前台扫码支付成功回调
	 * @param payNo
	 * @param orderNo
	 * @param merchantId
	 * @param totalAmount
	 * @param sendPayDate
	 * @param payMethodAlipay
	 * @return
	 */
	@Override
	public int paySuccess(String payNo, String orderNo, Integer merchantId, BigDecimal totalAmount, Date sendPayDate,
			int payMethod, boolean sendMSG, String code) throws YdpException {
		//支付流水
		MerchantPayLog payLog = new MerchantPayLog();
		payLog.setLogType(1);//收款
		payLog.setLogSource(1);//正常
		payLog.setOrderNo(orderNo);
		payLog.setPayNo(payNo);
		payLog.setPayMethod(payMethod);
		payLog.setPayAmount(totalAmount);
		payLog.setPayTime(sendPayDate);
		payLog.setRemark("前台扫码输入金额支付");
		payLogService.save(payLog, merchantId);
		int result = mapper.paySuccess(payNo, orderNo, merchantId, totalAmount, sendPayDate, payMethod, code);
		if(result == 0) {
			throw new YdpException("订单状态异常:不是待支付状态");
		} else {
			if(sendMSG) {
				socketClient.callFrontPaymentFinished(merchantId, totalAmount.toString());//发送支付成功通知
			}
		}
		return result;
	}
	
	/**
	 * 桌台扫码支付成功回调
	 * @param payNo
	 * @param orderNo
	 * @param merchantId
	 * @param totalAmount
	 * @param sendPayDate
	 * @param payMethod
	 * @return
	 */
	@Override
	public int paySuccess(String payNo, String orderNo, Integer merchantId, BigDecimal totalAmount, Date sendPayDate,
			int payMethod, String code) throws YdpException {
		//根据支付单号查询出订单号或者合并订单号
		MerchantPayOrder payOrder = this.getByOrderNo(orderNo, merchantId);
		//表示已成功处理了支付通知
		if(payOrder == null) {
			return 0;
		} else {
			//支付单支付成功
			int result = mapper.paySuccess(payNo, orderNo, merchantId, totalAmount, sendPayDate, payMethod, code);
			if(!StringUtils.isEmpty(payOrder.getParentOrderNo())) {
				payOrderHisMapper.insertFromPayOrderByOrderNo(payOrder.getParentOrderNo(), merchantId);
				mapper.deleteByParentOrderNo(payOrder.getParentOrderNo(), merchantId);
			} else {
				payOrderHisMapper.insertFromPayOrderByoutTradeNo(payOrder.getParentOutTradeNo(), merchantId);
				mapper.deleteByParentOutTradeNo(payOrder.getParentOutTradeNo(), merchantId);
			}
			return result;
		}
		
	}
	
	
	/**
	 * 根据订单号查找
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public MerchantPayOrder getByOrderNo(String orderNo, int mid) throws YdpException {
		MerchantPayOrderExample example = new MerchantPayOrderExample();
		example.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		List<MerchantPayOrder> payOrders = mapper.selectByExample(example);
		if(payOrders.isEmpty()) {
			return null;
		}
		return payOrders.get(0);
	}
	
	
	/**
	 * 当前所有前台扫码支付订单
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantPayOrder> listSuccessOrder(int mid) {
		MerchantPayOrderExample example = new MerchantPayOrderExample();
		example.createCriteria().andOrderStatusEqualTo(Constants.ORDER_STATUS_PAYMENT).andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}
	
	
	@Override
	public int archiving(List<MerchantCashierLog> cashierLogs, int mid) throws YdpException {
		Date now = new Date();
		for (MerchantCashierLog carshierLog : cashierLogs) {
			carshierLog.setCashierTime(now);
			carshierLog.setMerchantId(mid);
			cashierLogService.save(carshierLog, mid);
		}
		mapper.insertToHis(now, mid);
		return mapper.deleteByTime(now, mid);
	}
	
}
