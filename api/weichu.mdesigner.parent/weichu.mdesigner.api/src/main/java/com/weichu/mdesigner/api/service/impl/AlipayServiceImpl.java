package com.weichu.mdesigner.api.service.impl;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradeCloseRequest;
import com.alipay.api.request.AlipayTradeCreateRequest;
import com.alipay.api.request.AlipayTradeQueryRequest;
import com.alipay.api.request.AlipayTradeRefundRequest;
import com.alipay.api.response.AlipayTradeCloseResponse;
import com.alipay.api.response.AlipayTradeCreateResponse;
import com.alipay.api.response.AlipayTradeQueryResponse;
import com.alipay.api.response.AlipayTradeRefundResponse;
import com.weichu.mdesigner.api.service.IAlipayService;
import com.weichu.mdesigner.utils.constants.Constants;

/**
 * 支付宝支付service
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class AlipayServiceImpl implements IAlipayService {

	private static final String FORMAT = "json";
	// 签名方式
	private static final String SIGN_TYPE = "RSA2";
	// 字符编码格式
	private static final String CHARSET = "utf-8";

	// 服务商家应用start
	@Value("${sf.alipay.gatewayUrl}")
	private String sf_gatewayUrl;
	// partner_id(合作伙伴id)
	@Value("${sf.alipay.pId}")
	private String pId;
	// 支付宝的第三方应用appid
	@Value("${sf.alipay.appId}")
	private String sf_appId;
	// 支付宝的第三方应用私钥
	@Value("${sf.alipay.merchantPrivateKey}")
	private String sf_merchantPrivateKey;
	// 支付宝公钥
	@Value("${sf.alipay.alipayPublicKey}")
	private String sf_alipayPublicKey;

	private AlipayClient alipayClient;

	@PostConstruct //// 加上该注解表明该方法会在bean初始化后调用
	public void initAlipayClient() {
		alipayClient = new DefaultAlipayClient(sf_gatewayUrl, sf_appId, sf_merchantPrivateKey, FORMAT, CHARSET,
				sf_alipayPublicKey, SIGN_TYPE);
	}

	Logger logger = LoggerFactory.getLogger(AlipayServiceImpl.class);

	/**
	 * 关闭支付宝订单
	 * 
	 * @param outTradeNo
	 * @param alipayToken
	 * @throws AlipayApiException
	 */
	@Override
	public AlipayTradeCloseResponse closeOrder(String outTradeNo, String alipayToken) throws AlipayApiException {
		AlipayTradeCloseRequest closeRequest = new AlipayTradeCloseRequest();
		closeRequest.putOtherTextParam("app_auth_token", alipayToken);// 沙箱第三方应用
																		// //
																		// 对应商家的token
		closeRequest.setBizContent("{" + "\"out_trade_no\":\"" + outTradeNo + "\"" + "  }");
		AlipayTradeCloseResponse response = alipayClient.execute(closeRequest);
		return response;
	}

	/**
	 * 退款
	 * 
	 * @param orderNo
	 * @param aplipayToken
	 * @return
	 * @throws AlipayApiException
	 */
	@Override
	public AlipayTradeRefundResponse refundOrder(JSONObject bizContent, String aplipayToken) throws AlipayApiException {
		AlipayTradeRefundRequest refundRequest = new AlipayTradeRefundRequest();
		refundRequest.putOtherTextParam("app_auth_token", aplipayToken);// 沙箱第三方应用
																		// 对应商家的token
		refundRequest.setBizContent(bizContent.toJSONString());
		AlipayTradeRefundResponse response = alipayClient.execute(refundRequest);
		return response;
	}

	/**
	 * 交易查询
	 * 
	 * @param outTradeNo
	 * @param aplipayToken
	 * @return
	 * @throws AlipayApiException
	 */
	@Override
	public AlipayTradeQueryResponse tradeQuery(String outTradeNo, String aplipayToken) throws AlipayApiException {
		AlipayTradeQueryRequest alipayRequest = new AlipayTradeQueryRequest();
		alipayRequest.putOtherTextParam("app_auth_token", aplipayToken);// 沙箱第三方应用
																		// 对应商家的token
		alipayRequest.setBizContent("{" + "\"out_trade_no\":\"" + outTradeNo + "\"" + "  }");
		AlipayTradeQueryResponse alipayResponse = alipayClient.execute(alipayRequest);
		return alipayResponse;
	}

	/**
	 * 创建交易
	 * @param bizContent
	 * @param aplipayToken
	 * @return
	 * @throws AlipayApiException
	 */
	@Override
	public AlipayTradeCreateResponse tradeCreate(JSONObject bizContent, String aplipayToken) throws AlipayApiException {
		AlipayTradeCreateRequest tradeCreateRequest = new AlipayTradeCreateRequest();
		tradeCreateRequest.putOtherTextParam("app_auth_token", aplipayToken);// 沙箱第三方应用 对应商家的token
		tradeCreateRequest.setNotifyUrl(Constants.ALIPAY_NOTIFY_URL);
		tradeCreateRequest.setBizContent(bizContent.toJSONString());
		AlipayTradeCreateResponse tradeCreateResponse = alipayClient.execute(tradeCreateRequest);
		return tradeCreateResponse;
	}
	
}
