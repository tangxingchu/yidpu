package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
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
import com.weichu.mdesigner.api.service.IMerchantOrderService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderService;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.service.IMerchantWxpayInfoService;
import com.weichu.mdesigner.api.service.IWxpayService;
import com.weichu.mdesigner.api.wxpay.WXPay;
import com.weichu.mdesigner.api.wxpay.WXPayConfig;
import com.weichu.mdesigner.api.wxpay.WXPayConfigImpl;
import com.weichu.mdesigner.api.wxpay.WXPayConstants.SignType;
import com.weichu.mdesigner.api.wxpay.WXPayUtil;
import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantWxpayInfo;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.PaymentException;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DatePattern;

/**
 * 微信支付
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class WxpayServiceImpl implements IWxpayService {

	Logger logger = LoggerFactory.getLogger(WxpayServiceImpl.class);

	@Autowired
	private IMerchantOrderService orderService;

	@Autowired
	private IMerchantPayOrderService payOrderService;

	@Autowired
	private IMerchantService merchantService;
	
	@Autowired
	private IMerchantWxpayInfoService wxpayInfoService;
	
	private WXPayConfig wxPayConfig = new WXPayConfigImpl();

	// 通知处理
	@Override
	public Map<String, String> payBack(String notifyData) throws Exception {
		Map<String, String> results = new LinkedHashMap<>();
		WXPay wxpay = null;
		try {
			wxpay = new WXPay(wxPayConfig);
			Map<String, String> notifyMap = WXPayUtil.xmlToMap(notifyData);
			// 签名校验
			if (wxpay.isPayResultNotifySignatureValid(notifyMap)) {
				// 签名正确
				// 进行处理。
				// 注意特殊情况：订单已经退款，但收到了支付结果成功的通知，不应把商户侧订单状态从退款改成支付成功
				String return_code = notifyMap.get("return_code");// 状态
				String result_code = notifyMap.get("result_code");//业务结果
				if (Constants.WXPAY_SUCCESS_CODE.equals(return_code) && Constants.WXPAY_SUCCESS_CODE.equals(result_code)) {
					String out_trade_no = notifyMap.get("out_trade_no");// 订单号
					String attach = notifyMap.get("attach");// 自定义数据包
					attach = URLDecoder.decode(attach, "UTF-8");
					JSONObject attachJson = JSONObject.parseObject(attach);
					Integer merchantId = attachJson.getInteger("merchantId");
					String tableCode = attachJson.getString("tableCode");
					// 处理订单逻辑
					/**
					 * 更新数据库中支付状态。
					 * 特殊情况：订单已经退款，但收到了支付结果成功的通知，不应把商户侧订单状态从退款改成支付成功。
					 * 此处需要判断一下。后面写入库操作的时候再写
					 *
					 */
					logger.debug("attach：" + attach);
					String transaction_id = notifyMap.get("transaction_id");// 微信支付订单号
					String total_fee = notifyMap.get("total_fee");// 订单总金额，单位为分
					String openid = notifyMap.get("openid");//用户在商户appid下的唯一标识
					// 转换为元
					BigDecimal total_amount = new BigDecimal(total_fee).divide(BigDecimal.valueOf(100L));
					String time_end = notifyMap.get("time_end");// 支付完成时间，格式20141030133525
					Date payDate = DateUtil.parse(time_end, DatePattern.PURE_DATETIME_PATTERN);
					logger.debug("total_amount: " + total_amount.toString());
					// 前台扫码支付单
					if (attachJson.get("mergedOrder") == null) {
						payOrderService.paySuccess(transaction_id, out_trade_no, merchantId, total_amount, payDate,
								Constants.WECHAT_QRCODE_FRONT, true, openid);//微信扫码支付(前台)
					} else {
						Integer mergedOrder = attachJson.getInteger("mergedOrder");
						boolean isMergedOrder = mergedOrder == 1 ? true : false;
//						payOrderService.paySuccess(transaction_id, out_trade_no, merchantId, total_amount, payDate,
//								Constants.WECHAT_QRCODE_FRONT);//微信桌台扫码支付
						try {
							orderService.paySuccess(transaction_id, out_trade_no, total_amount, payDate, merchantId,
									isMergedOrder, Constants.PAY_METHOD_WECHAT, openid);
						} catch(PaymentException e) {
							e.printStackTrace();
							orderService.lockedOrder(out_trade_no, Constants.PAY_METHOD_WECHAT, transaction_id, total_amount, payDate, merchantId, openid);
							logger.error("微信支付异步通知PaymentException:" + e.getMessage());
							results.put("return_code", Constants.WXPAY_SUCCESS_CODE);
							results.put("return_msg", Constants.WXPAY_OK_CODE);
							return results;
						}
					}
					logger.info("微信支付回调成功订单号:{}", out_trade_no);
					results.put("return_code", Constants.WXPAY_SUCCESS_CODE);
					results.put("return_msg", Constants.WXPAY_OK_CODE);
					return results;
				} else {
					results.put("return_code", Constants.WXPAY_FAIL_CODE);
					results.put("return_msg", "");
					return results;
				}
			} else {
				results.put("return_code", Constants.WXPAY_FAIL_CODE);
				results.put("return_msg", "");
				return results;
			} 
		} catch(YdpException e) {
			e.printStackTrace();
			logger.error("微信支付异步通知YdpException:" + e.getMessage());
			results.put("return_code", Constants.WXPAY_SUCCESS_CODE);
			results.put("return_msg", Constants.WXPAY_OK_CODE);
			return results;
		}
	}

	/**
	 * 统一下单
	 * 
	 * @param merchantId
	 * @param orderNo
	 * @return
	 * @throws Exception
	 */
	@Override
	public Map<String, String> unifiedOrder(Integer merchantId, String orderNo, String ip, String openid)
			throws Exception {
		MerchantWxpayInfo wxpayInfo = wxpayInfoService.selectByMid(merchantId);
		if(wxpayInfo == null || StringUtils.isEmpty(wxpayInfo.getSubMchId())) {
			throw new YdpException("商家还未开通微信支付功能,请到前台支付");
		}
		MerchantUser merchantUser = merchantService.selectBasicInfo(merchantId);
		// 调用统一下单,返回prepay_id，在调用h5支付
		WXPay wxpay = null;
		try {
			wxpay = new WXPay(wxPayConfig);
		} catch (Exception e1) {
			e1.printStackTrace();
			throw new YdpException("服务器内部异常");
		}
		Map<String, Object> results = orderService.callPaymentByOrderNo(orderNo, merchantId);
		String outTradeNo = (String) results.get("outTradeNo");
		String totalAmount = (String) results.get("totalAmount");
		Integer total_fee = new BigDecimal(totalAmount).multiply(BigDecimal.valueOf(100L)).intValue();

//		String attach = URLEncoder.encode("{\"merchantId\":" + merchantId + ", \"mergedOrder\":"
//				+ results.get("mergedOrder") + ", \"tableCode\":\"" + tableCode + "\"}", "utf-8");
		String attach = URLEncoder.encode("{\"merchantId\":" + merchantId + ", \"mergedOrder\":"
				+ results.get("mergedOrder") + "}", "utf-8");
		HashMap<String, String> data = new LinkedHashMap<String, String>();
//		data.put("appid", wxPayConfig.getAppID());
//		data.put("mch_id", wxPayConfig.getMchID());
		data.put("sub_mch_id", wxpayInfo.getSubMchId());
		data.put("body", merchantUser.getMerchantName() + "-消费");
		data.put("out_trade_no", outTradeNo);
		data.put("device_info", "WEB");
		data.put("fee_type", "CNY");
		data.put("total_fee", total_fee.toString());// 单位 分
		data.put("spbill_create_ip", ip);
		data.put("notify_url", Constants.WXPAY_NOTIFY_URL);
		data.put("trade_type", "JSAPI");// JSAPI支付必须传openid
		data.put("attach", attach);
		// data.put("trade_type", "NATIVE");
		// 公众号授权本人微信openid:ot2Bi1o4qfOGkFy2qZZzRR-zCqbM
		// 因为这个openid 是通过微信公众号的appid获取的，这里统一下单就不能用小程序的appid
		// 必须用公众号的appid，
		data.put("openid", openid);
//		String nonce_str = WXPayUtil.generateNonceStr();
//		data.put("nonce_str", nonce_str);
		data.put("time_expire", DateUtil.format(DateUtil.offset(new Date(), DateField.MINUTE, 2), DatePattern.PURE_DATETIME_PATTERN));
		System.out.println(data);
//		String sign = WXPayUtil.generateSignature(data, wxPayConfig.getKey());
//		data.put("sign", sign);
		//会已 HMACSHA256 签名数据发送至微信支付服务端 (错误)
		//要以MD5 签名发送数据
		Map<String, String> r = wxpay.unifiedOrder(data);
		//校验签名
		if(WXPayUtil.isSignatureValid(r, wxPayConfig.getKey(), SignType.MD5)) {
			String return_code = r.get("return_code");
			if (Constants.WXPAY_SUCCESS_CODE.equals(return_code)) {
				String result_code = r.get("result_code");
				if(Constants.WXPAY_SUCCESS_CODE.equals(result_code)) {
					Map<String, String> h5PayParams = new LinkedHashMap<>();
					Long timeStamp = WXPayUtil.getCurrentTimestampMs();
					h5PayParams.put("appId", wxPayConfig.getAppID());
					h5PayParams.put("timeStamp", String.valueOf(timeStamp));
					h5PayParams.put("nonceStr", WXPayUtil.generateNonceStr());
					h5PayParams.put("package", "prepay_id=" + r.get("prepay_id"));
					h5PayParams.put("signType", "MD5");
					System.out.println(h5PayParams);
					String paySign = WXPayUtil.generateSignature(h5PayParams, wxPayConfig.getKey());
					h5PayParams.put("paySign", paySign);
					return h5PayParams;
				} else {
					String err_code_des = r.get("err_code_des");//错误代码
					throw new YdpException("微信支付订单创建失败:" + err_code_des);
				}
			} else {
				String return_msg = r.get("return_msg");
				throw new YdpException("微信支付订单创建失败:" + return_msg);
			}
		} else {
			throw new YdpException("微信支付订单创建失败: 返回数据签名校验失败");
		}
		
	}
	
	/**
	 * 退款处理
	 * @param params (这里带上sub_mch_id、transaction_id、out_trade_no、out_refund_no、total_fee、refund_fee )
	 * 子商户号、微信交易号、订单号、退款单号、订单金额、退款金额、申请退款金额
	 * @return
	 * @throws YdpException
	 */
	@Override
	public Map<String, String> refundOrder(Map<String, String> params) throws Exception {
		WXPay wxpay = null;
		try {
			wxpay = new WXPay(wxPayConfig);
		} catch (Exception e1) {
			e1.printStackTrace();
			throw new YdpException("服务器内部异常");
		}
		HashMap<String, String> reqData = new LinkedHashMap<String, String>();
//		reqData.put("appid", wxPayConfig.getAppID());
//		reqData.put("mch_id", wxPayConfig.getMchID());
		reqData.putAll(params);
//		reqData.put("nonce_str", WXPayUtil.generateNonceStr());
//		reqData.put("refund_desc", "退款原因");//退款原因
		return wxpay.refund(reqData);
	}
	
	/**
	 * 关闭订单
	 * @param params (这里带上sub_mch_id、out_trade_no)
	 * 子商户号、订单号、
	 * @return
	 * @throws YdpException
	 */
	@Override
	public Map<String, String> closeOrder(Map<String, String> params) throws Exception {
		WXPay wxpay = null;
		try {
			wxpay = new WXPay(wxPayConfig);
		} catch (Exception e1) {
			e1.printStackTrace();
			throw new YdpException("服务器内部异常");
		}
		HashMap<String, String> reqData = new LinkedHashMap<String, String>();
//		reqData.put("appid", wxPayConfig.getAppID());
//		reqData.put("mch_id", wxPayConfig.getMchID());
		reqData.putAll(params);
//		reqData.put("nonce_str", WXPayUtil.generateNonceStr());
//		String sign = WXPayUtil.generateSignature(reqData, wxPayConfig.getKey());
//		reqData.put("sign", sign);
		return wxpay.closeOrder(reqData);
	}
	
	/**
	 * 订单查询
	 * @param params (这里带上sub_mch_id、out_trade_no)
	 * 子商户号、订单号、
	 * @return
	 * @throws Exception 
	 */
	@Override
	public Map<String, String> orderquery(Map<String, String> params) throws Exception {
		WXPay wxpay = null;
		try {
			wxpay = new WXPay(wxPayConfig);
		} catch (Exception e1) {
			e1.printStackTrace();
			throw new YdpException("服务器内部异常");
		}
		HashMap<String, String> reqData = new LinkedHashMap<String, String>();
//		reqData.put("appid", wxPayConfig.getAppID());
//		reqData.put("mch_id", wxPayConfig.getMchID());
		reqData.putAll(params);
//		reqData.put("nonce_str", WXPayUtil.generateNonceStr());
//		String sign = WXPayUtil.generateSignature(reqData, wxPayConfig.getKey());
//		reqData.put("sign", sign);
		return wxpay.orderQuery(reqData);
	}
	
	/**
	 * 前台扫码支付
	 * @param merchantId
	 * @param ip
	 * @param openid
	 * @return
	 */
	@Override
	public Map<String, String> unifiedFrontOrder(Integer merchantId, String ip, String openid, String payAmount) throws Exception {
		WXPay wxpay = null;
		try {
			wxpay = new WXPay(wxPayConfig);
		} catch (Exception e1) {
			e1.printStackTrace();
			throw new YdpException("服务器内部异常");
		}
		MerchantWxpayInfo wxpayInfo = wxpayInfoService.selectByMid(merchantId);
		if(wxpayInfo == null || StringUtils.isEmpty(wxpayInfo.getSubMchId())) {
			throw new YdpException("商家还未开通微信支付");
		}
		MerchantUser merchantUser = merchantService.selectBasicInfo(merchantId);
		String orderNo = DateUtil.format(new Date(), DatePattern.PURE_DATETIME_MS_PATTERN) + YdpUtils.convertMechantId2Str(merchantId)
			+ openid.substring(openid.length() - 5);
		String attach = URLEncoder.encode("{\"merchantId\":" + merchantId + "}", "utf-8");
		MerchantPayOrder payOrder = new MerchantPayOrder();
		payOrder.setOrderNo(orderNo);		
		BigDecimal payAmountBD = new BigDecimal(payAmount);
		payOrder.setOrderPrice(payAmountBD);
		payOrder.setOrderStatus(Constants.ORDER_STATUS_NO_PAYMENT);
		payOrder.setPayMethod(Constants.WECHAT_QRCODE_FRONT);
		payOrderService.save(payOrder, merchantId);
		Map<String, String> params = new HashMap<>();
		params.put("sub_mch_id", wxpayInfo.getSubMchId());
		params.put("body", merchantUser.getMerchantName() + "-消费");
		params.put("out_trade_no", orderNo);
		params.put("device_info", "WEB");
		params.put("fee_type", "CNY");
		params.put("total_fee", String.valueOf(payAmountBD.multiply(new BigDecimal(100L)).intValue()));// 单位 分
		params.put("spbill_create_ip", ip);
		params.put("notify_url", Constants.WXPAY_NOTIFY_URL);
		params.put("trade_type", "JSAPI");// JSAPI支付必须传openid
		params.put("attach", attach);
		params.put("openid", openid);
		Date timeExpire = DateUtil.offset(new Date(), DateField.MINUTE, 5);
		params.put("time_expire", DateUtil.format(timeExpire, DatePattern.PURE_DATETIME_PATTERN));//交易失效时间(5m)
		System.out.println(params);
		Map<String, String> r = wxpay.unifiedOrder(params);
		System.out.println(r);
		//校验签名
		if(WXPayUtil.isSignatureValid(r, wxPayConfig.getKey(), SignType.MD5)) {
			String return_code = r.get("return_code");
			if (Constants.WXPAY_SUCCESS_CODE.equals(return_code)) {
				String result_code = r.get("result_code");
				if(Constants.WXPAY_SUCCESS_CODE.equals(result_code)) {
					Map<String, String> h5PayParams = new LinkedHashMap<>();
					Long timeStamp = WXPayUtil.getCurrentTimestampMs();
					h5PayParams.put("appId", wxPayConfig.getAppID());
					h5PayParams.put("timeStamp", String.valueOf(timeStamp));
					h5PayParams.put("nonceStr", WXPayUtil.generateNonceStr());
					h5PayParams.put("package", "prepay_id=" + r.get("prepay_id"));
					h5PayParams.put("signType", "MD5");
					System.out.println(h5PayParams);
					String paySign = WXPayUtil.generateSignature(h5PayParams, wxPayConfig.getKey());
					h5PayParams.put("paySign", paySign);
					return h5PayParams;
				} else {
					String err_code_des = r.get("err_code_des");//错误代码
					throw new YdpException("微信支付订单创建失败:" + err_code_des);
				}
			} else {
				String return_msg = r.get("return_msg");
				throw new YdpException("微信支付订单创建失败:" + return_msg);
			}
		} else {
			throw new YdpException("微信支付订单创建失败: 返回数据签名校验失败");
		}
	}
	
}
