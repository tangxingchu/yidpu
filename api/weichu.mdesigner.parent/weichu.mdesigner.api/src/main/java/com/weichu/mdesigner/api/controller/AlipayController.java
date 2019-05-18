package com.weichu.mdesigner.api.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayOpenAuthTokenAppRequest;
import com.alipay.api.request.AlipaySystemOauthTokenRequest;
import com.alipay.api.request.AlipayTradeCreateRequest;
import com.alipay.api.response.AlipayOpenAuthTokenAppResponse;
import com.alipay.api.response.AlipaySystemOauthTokenResponse;
import com.alipay.api.response.AlipayTradeCreateResponse;
import com.weichu.mdesigner.api.service.IMerchantAlipayInfoService;
import com.weichu.mdesigner.api.service.IMerchantOrderHisService;
import com.weichu.mdesigner.api.service.IMerchantOrderService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderHisService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderService;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.socketio.SocketioClient;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.MerchantAlipayInfo;
import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.utils.exception.PaymentException;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.xiaoleilu.hutool.date.DatePattern;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * 作为蚂蚁金服第三方应用 需要的一些接口(第三方应用)
 * 阿里支付api 接口
 * 
 * merchantController 里面的支付宝接口 是自己或自己公司使用的(自用型)
 * @author Administrator
 *
 *	https://openclub.alipay.com/read.php?tid=5458&fid=56
 */
@RestController
@RequestMapping("/api/alipay")
public class AlipayController extends BaseController {
	
	private Logger logger = LoggerFactory.getLogger(AlipayController.class);
	
	@Autowired
	private IMerchantAlipayInfoService alipayInfoService;
	
	@Autowired
//	private MerchantUserMapper userMapper;
	private IMerchantService merchantService;
	
	@Autowired
	private IMerchantOrderService orderService;
	
	@Autowired
	private IMerchantOrderHisService orderHisService;
	
	@Autowired
	private IMerchantPayOrderService payOrderService;
	
	@Autowired
	private IMerchantPayOrderHisService payOrderHisService;
	
	private static final String FORMAT = "json";
	// 签名方式
	private static final String SIGN_TYPE = "RSA2";
	// 字符编码格式
	private static final String CHARSET = "utf-8";
	
	//服务商家应用start
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
	//服务商家应用end
	
	@Value("${yidpu.payment.server}")
	private String paymentServer;
	
	@Value("${yidpu.bind.server}")
	private String bindServer;
	
	@Autowired
	private SocketioClient socketioClient;

	/**
	 * #沙箱环境
	 * https://openauth.alipaydev.com/oauth2/appToAppAuth.htm?app_id=2016092000557569&redirect_uri=http://127.0.0.1:8090/api/alipay/merchantAuthRedirect
	 * #正式环境
	 * https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2018102961920282&redirect_uri=https://api.yidpu.com/api/alipay/merchantAuthRedirect
	 * 支付宝商家授权回调接口
	 * @param request
	 * @param app_id 支付宝返回的一点谱商服的id
	 * @param app_auth_code 支付宝返回的授权码，需要通过这个授权码换取token
	 * @throws AlipayApiException 
	 * @throws IOException 
	 */
	@RequestMapping(value = "/merchantAuthRedirect", method = RequestMethod.GET)
	public void merchantAuthRedirect(HttpServletRequest request, HttpServletResponse response, 
			@RequestParam String app_id, @RequestParam String app_auth_code, @RequestParam String token) {
		Map<String, Object> map = JavaWebToken.parseToken(token);
		if(map == null) {
			try {
				response.sendRedirect(paymentServer + "/alipay/authRedirectFailure.html");
			} catch (IOException e) {
				e.printStackTrace();
			}
			return;
		}
		Integer merchantId = (Integer) map.get("uid");
		//查询是否有正在使用的商户支付宝授权我的第三方应用的token
		MerchantAlipayInfo merchantAlipayInfo = alipayInfoService.getAlipayInfoChange0ByMerchantId(merchantId);
		if(merchantAlipayInfo != null) {
			try {
				response.sendRedirect(paymentServer + "/alipay/authRedirectFailure.html");
			} catch (IOException e) {
				e.printStackTrace();
			}
			return;
		}
		logger.debug("app_id:" + app_id);
		logger.debug("app_auth_code:" + app_auth_code +", 通过这个code换取token");
		AlipayClient alipayClient = new DefaultAlipayClient(sf_gatewayUrl, sf_appId, sf_merchantPrivateKey, FORMAT, CHARSET, sf_alipayPublicKey, SIGN_TYPE);
		AlipayOpenAuthTokenAppRequest alipayRequest = new AlipayOpenAuthTokenAppRequest();
		alipayRequest.setBizContent("{" +
		"    \"grant_type\":\"authorization_code\"," +
		"    \"code\":\"" + app_auth_code + "\"" +
		"  }");
		AlipayOpenAuthTokenAppResponse alipayResponse;
		try {
			alipayResponse = alipayClient.execute(alipayRequest);
			//保存商家授权信息
			String authToken = alipayResponse.getAppAuthToken();
			String refreshToken = alipayResponse.getAppRefreshToken();
			String userId = alipayResponse.getUserId();
			String appId = alipayResponse.getAuthAppId();
			MerchantAlipayInfo alipayInfo = new MerchantAlipayInfo();
			alipayInfo.setAlipayAppId(appId);
			alipayInfo.setAlipayToken(authToken);
			alipayInfo.setAlipayRefreshToken(refreshToken);
			alipayInfo.setAlipayUserId(userId);
			alipayInfoService.saveMerchantAlipayInfo(alipayInfo, merchantId);
			logger.debug("token: " + alipayResponse.getAppAuthToken());//token
			logger.debug("seller_id: " + alipayResponse.getUserId());//seller_id;//这里应该可以看做是商家id
			response.sendRedirect(paymentServer + "/alipay/authRedirect.html");
		} catch (AlipayApiException | IOException e) {
			e.printStackTrace();
			try {
				response.sendRedirect(paymentServer + "/alipay/authRedirectFailure.html");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		} catch (YdpException e) {
			e.printStackTrace();
			try {
				response.sendRedirect(paymentServer + "/alipay/authRedirect.html");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
	}
	
	/**
	 * 
	 * 
	 * #沙箱环境
	 * https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?app_id=2016092000557569&scope=auth_base&redirect_uri=http://127.0.0.1:8090/api/alipay/buyerAuthRedirect
	 * #正式环境
	 * https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018102961920282&scope=auth_base&redirect_uri=https://api.yidpu.com/api/alipay/buyerAuthRedirect
	 * 支付宝买家静默授权回调接口
	 * @param request
	 * @param app_id 支付宝返回的一点谱商服的id
	 * @param app_auth_code 支付宝返回的授权码，需要通过这个授权码换取token
	 * @throws AlipayApiException 
	 * @throws IOException 
	 */
	@RequestMapping(value = "/memberBindRedirect", method = RequestMethod.GET)
	public void memberBindRedirect(HttpServletRequest request, HttpServletResponse response, @RequestParam String app_id, 
			@RequestParam String auth_code, @RequestParam Integer merchantId) throws AlipayApiException, IOException {
		logger.debug("app_id:" + app_id);
		logger.debug("merchantId:" + merchantId);
		logger.debug("auth_code:" + auth_code +", 通过这个code换取token");
		AlipayClient alipayClient = new DefaultAlipayClient(sf_gatewayUrl, sf_appId, sf_merchantPrivateKey, FORMAT, CHARSET, sf_alipayPublicKey, SIGN_TYPE);
		AlipaySystemOauthTokenRequest alipayRequest = new AlipaySystemOauthTokenRequest();
		alipayRequest.setCode(auth_code);//这个就是第一步获取的auth_code
		alipayRequest.setGrantType("authorization_code");//这个固定值,参考https://docs.open.alipay.com/api_9/alipay.system.oauth.token
	    AlipaySystemOauthTokenResponse oauthTokenResponse = alipayClient.execute(alipayRequest);
	    logger.debug(oauthTokenResponse.getBody());//token
	    logger.debug(oauthTokenResponse.getUserId());//buyer_id;//买家id
	    
	    socketioClient.callMemberBind(2, String.valueOf(oauthTokenResponse.getUserId()), merchantId);
		response.sendRedirect(bindServer + "/bindSuccess.html");
	    
	}
	
	/**
	 * 
	 * 
	 * #沙箱环境
	 * https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?app_id=2016092000557569&scope=auth_base&redirect_uri=http://127.0.0.1:8090/api/alipay/buyerAuthRedirect
	 * #正式环境
	 * https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018102961920282&scope=auth_base&redirect_uri=https://api.yidpu.com/api/alipay/buyerAuthRedirect
	 * 支付宝买家静默授权回调接口
	 * @param request
	 * @param app_id 支付宝返回的一点谱商服的id
	 * @param app_auth_code 支付宝返回的授权码，需要通过这个授权码换取token
	 * @throws AlipayApiException 
	 * @throws IOException 
	 */
	@RequestMapping(value = "/buyerAuthRedirect", method = RequestMethod.GET)
	public void buyerAuthRedirect(HttpServletRequest request, HttpServletResponse response, @RequestParam String app_id, 
			@RequestParam String auth_code, @RequestParam Integer merchantId, @RequestParam String tableCode) throws AlipayApiException, IOException {
		logger.debug("app_id:" + app_id);
		logger.debug("merchantId:" + merchantId);
		logger.debug("tableCode:" + tableCode);
		logger.debug("auth_code:" + auth_code +", 通过这个code换取token");
		AlipayClient alipayClient = new DefaultAlipayClient(sf_gatewayUrl, sf_appId, sf_merchantPrivateKey, FORMAT, CHARSET, sf_alipayPublicKey, SIGN_TYPE);
		AlipaySystemOauthTokenRequest alipayRequest = new AlipaySystemOauthTokenRequest();
		alipayRequest.setCode(auth_code);//这个就是第一步获取的auth_code
		alipayRequest.setGrantType("authorization_code");//这个固定值,参考https://docs.open.alipay.com/api_9/alipay.system.oauth.token
	    AlipaySystemOauthTokenResponse oauthTokenResponse = alipayClient.execute(alipayRequest);
	    logger.debug(oauthTokenResponse.getBody());//token
	    logger.debug(oauthTokenResponse.getUserId());//buyer_id;//买家id
	    String JWT_Token = Jwts.builder()
				// 保存商家ID
					.claim("uid", merchantId)
				// 保存userId
				.claim("openid", oauthTokenResponse.getUserId())
				// 用户名写入标题
				.setSubject("")
				// 有效期设置
				.setExpiration(new Date(System.currentTimeMillis() + JavaWebToken.EXPIRATIONTIME_4HOURE))
				// 签名设置
				.signWith(SignatureAlgorithm.HS512, JavaWebToken.SECRET).compact();
	    response.sendRedirect(paymentServer + "/alipay/alipayment.html?buyerId=" + oauthTokenResponse.getUserId() + "&merchantId=" 
	    		+ merchantId + "&tableCode=" + tableCode + "&token=" + JWT_Token);
	    
	}
	
	/**
	 * 前台收银二维码静默授权跳转
	 * @param request
	 * @param response
	 * @param app_id
	 * @param auth_code
	 * @param merchantId
	 * @throws AlipayApiException
	 * @throws IOException
	 */
	@RequestMapping(value = "/buyerAuthRedirectFront", method = RequestMethod.GET)
	public void buyerAuthRedirectFront(HttpServletRequest request, HttpServletResponse response, @RequestParam String app_id, 
			@RequestParam String auth_code, @RequestParam Integer merchantId) throws AlipayApiException, IOException {
		logger.debug("app_id:" + app_id);
		logger.debug("merchantId:" + merchantId);
		logger.debug("auth_code:" + auth_code +", 通过这个code换取token");
		AlipayClient alipayClient = new DefaultAlipayClient(sf_gatewayUrl, sf_appId, sf_merchantPrivateKey, FORMAT, CHARSET, sf_alipayPublicKey, SIGN_TYPE);
		AlipaySystemOauthTokenRequest alipayRequest = new AlipaySystemOauthTokenRequest();
		alipayRequest.setCode(auth_code);//这个就是第一步获取的auth_code
		alipayRequest.setGrantType("authorization_code");//这个固定值,参考https://docs.open.alipay.com/api_9/alipay.system.oauth.token
		AlipaySystemOauthTokenResponse oauthTokenResponse = alipayClient.execute(alipayRequest);
		logger.debug(oauthTokenResponse.getBody());//token
		logger.debug(oauthTokenResponse.getUserId());//buyer_id;//买家id
		response.sendRedirect(paymentServer + "/alipay/alipaymentFront.html?buyerId=" + oauthTokenResponse.getUserId()
			+ "&merchantId=" + merchantId);
	}
	

	@RequestMapping(value = "/alipayOrder", method = RequestMethod.POST)
	public JSONObject alipayOrder(HttpServletRequest request, HttpServletResponse response, @RequestParam String buyerId, 
			@RequestParam Integer merchantId, @RequestParam String orderNo) throws AlipayApiException, IOException, Exception {
		AlipayTradeCreateRequest tradeCreateRequest = new AlipayTradeCreateRequest();
		AlipayClient alipayClient = new DefaultAlipayClient(sf_gatewayUrl, sf_appId, sf_merchantPrivateKey, FORMAT, CHARSET,
				sf_alipayPublicKey, SIGN_TYPE);
		MerchantUser merchantUser = merchantService.selectBasicInfo(merchantId);
		MerchantAlipayInfo alipayInfo = alipayInfoService.getAlipayInfoByMerchantId(merchantId);
		if(alipayInfo == null) {
			throw new Exception("商家还未开通支付宝支付,请到前台支付");
		}
		tradeCreateRequest.putOtherTextParam("app_auth_token", alipayInfo.getAlipayToken());//沙箱第三方应用 对应商家的token
		tradeCreateRequest.setNotifyUrl(Constants.ALIPAY_NOTIFY_URL);
		
		Map<String, Object> results = orderService.callPaymentByOrderNo(orderNo, merchantId);
		
//		String body = URLEncoder.encode("{\"merchantId\":" + merchantId + ", \"mergedOrder\":" 
//				+ results.get("mergedOrder") + ", \"tableCode\":\"" + tableCode + "\"}", "utf-8");
		
		String body = URLEncoder.encode("{\"merchantId\":" + merchantId + ", \"mergedOrder\":" 
				+ results.get("mergedOrder") + "}", "utf-8");
		
		String outTradeNo = (String) results.get("outTradeNo");
		String totalAmount = (String) results.get("totalAmount");
		tradeCreateRequest.setBizContent("{" +
		"\"out_trade_no\":\"" + outTradeNo + "\"," +
		"\"seller_id\":\"" + alipayInfo.getAlipayUserId() + "\"," +//沙箱账号 -- 商家id //2088102176819054
		"\"total_amount\":" + totalAmount + "," +
		"\"timeout_express\": \"2m\"," +//2分钟后支付订单失效
//		"\"discountable_amount\":" + discountable_amount + "," +
		"\"subject\":\"" + merchantUser.getMerchantName() + "-消费\"," +
		"\"buyer_id\":\"" + buyerId + "\"," +//沙箱账号 买家 id
		"\"body\":\"" + body + "\"" +//业务参数
		"  }");
		AlipayTradeCreateResponse tradeCreateResponse = alipayClient.execute(tradeCreateRequest);
		if(tradeCreateResponse.isSuccess()) {
			String tradeNo = tradeCreateResponse.getTradeNo();
			logger.debug("调用成功, trade_no:" + tradeNo);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("tradeNo", tradeCreateResponse.getTradeNo());
			return jsonObject;
		} else {
			logger.error("/alipayOrder 调用失败" + tradeCreateResponse.getSubMsg());
			throw new Exception("订单创建失败," + tradeCreateResponse.getSubMsg());
		}
	}
	
	
	/**
	 * 桌台扫码支付成功回调
	 * @param request
	 * @throws AlipayApiException 
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/notify", method = RequestMethod.POST, produces="text/plain")
	public String notify(HttpServletRequest request) {
		logger.info("商家支付的异步通知, 支付宝异步回调来了......");
		Map<String,String> params = new HashMap<String,String>();
		Map<String,String[]> requestParams = request.getParameterMap();
		for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i]
						: valueStr + values[i] + ",";
			}
			//乱码解决，这段代码在出现乱码时使用
//			valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
			params.put(name, valueStr);
		}
		try {
			boolean signVerified = AlipaySignature.rsaCheckV1(params, sf_alipayPublicKey, CHARSET, SIGN_TYPE); //调用SDK验证签名
			if(signVerified) {
				//商户订单号
				String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");
			
				//支付宝交易号
				String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");
			
				//交易状态
				String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"),"UTF-8");
				
				//退款状态
				if(request.getParameter("refund_status") != null) {
					String refund_status = new String(request.getParameter("refund_status").getBytes("ISO-8859-1"),"UTF-8");
					logger.debug("退款状态：" + refund_status);
					return "success";
				}
				
				//收款方
				String app_id = new String(request.getParameter("app_id").getBytes("ISO-8859-1"),"UTF-8");
				
				//买家支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字
				String buyer_id = new String(request.getParameter("buyer_id").getBytes("ISO-8859-1"),"UTF-8");
				
				// 订单金额
				String total_amount = new String(request.getParameter("total_amount").getBytes("ISO-8859-1"),"UTF-8");
				
				String gmt_payment = new String(request.getParameter("gmt_payment").getBytes("ISO-8859-1"),"UTF-8");
				
				//body
				String body = new String(request.getParameter("body").getBytes("ISO-8859-1"),"UTF-8");
				body = URLDecoder.decode(body, "UTF-8");
				logger.info("body: " + body);
				JSONObject bodyJson = JSONObject.parseObject(body);
				Integer merchantId = bodyJson.getInteger("merchantId");
//				String tableCode = bodyJson.getString("tableCode");
				Date payDate = DateUtil.parse(gmt_payment, DatePattern.NORM_DATETIME_PATTERN);
				//前台扫码支付单
				if(bodyJson.get("mergedOrder") == null) {
					//交易成功
					if("TRADE_SUCCESS".equals(trade_status)) {
						//更改订单状态(支付成功) 记录支付日志
						payOrderService.paySuccess(trade_no, out_trade_no, merchantId, new BigDecimal(total_amount),
								payDate, Constants.ALIPAY_QRCODE_FRONT, true, buyer_id);//1支付宝扫码支付(前台)
						return "success";
					} else if("TRADE_FINISHED".equals(trade_status)) {//交易结束,不可退款
						payOrderHisService.closeByOrderNo(out_trade_no, merchantId);
						return "success";
					} else if("TRADE_CLOSED".equals(trade_status)) {
						logger.info("前台扫码支付单，已关闭, TRADE_CLOSED");
						return "success";
					}
					return "success";
				} else {
		//			System.out.println("买家支付宝账号对应的支付宝唯一用户号:" + buyer_id);
		//			System.out.println("订单金额:" + total_amount);
					/**
					 * 注意：注意：(当面付的产品 自然是支持退款的)
						状态TRADE_SUCCESS的通知触发条件是商户签约的产品支持退款功能的前提下，买家付款成功；
						交易状态TRADE_FINISHED的通知触发条件是商户签约的产品不支持退款功能的前提下，买家付款成功；
						或者，商户签约的产品支持退款功能的前提下，交易已经成功并且已经超过可退款期限。
					 */
					Integer mergedOrder = bodyJson.getInteger("mergedOrder");
					boolean isMergedOrder = mergedOrder == 1 ? true : false;
					//如果商家签约的是 可退协议，返回TRADE_SUCCESS，如果签约的是不可退协议，返回的是TRADE_FINISHED
					if (trade_status.equals("TRADE_SUCCESS")) {
						//1、需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
						if(!sf_appId.equals(app_id)) {
							//未收到款项
							logger.error("支付宝异步回调,调用SDK验证签名, 验证失败");
							return "fail";
						} else {
//							payOrderService.paySuccess(trade_no, out_trade_no, merchantId, new BigDecimal(total_amount),
//									payDate, Constants.ALIPAY_QRCODE_FRONT);//支付宝桌台扫码支付
							try {
								orderService.paySuccess(trade_no, out_trade_no, new BigDecimal(total_amount), payDate, merchantId,
										isMergedOrder, Constants.PAY_METHOD_ALIPAY, buyer_id);
								return "success";
							} catch (PaymentException e) {
								e.printStackTrace();
								orderService.lockedOrder(out_trade_no, Constants.PAY_METHOD_ALIPAY, trade_no, new BigDecimal(total_amount), 
										payDate, merchantId, buyer_id);
								logger.error("支付金额≠订单金额");
								return "success";
							}
						}
					} else if(trade_status.equals("TRADE_FINISHED")) {
						//交易关闭,已不可以退款
						//交易完成 不可退款（3个月） 关闭 订单
						orderHisService.closeHisOrder(out_trade_no, isMergedOrder, merchantId);
						return "success";
					} else if("TRADE_CLOSED".equals(trade_status)) {
						logger.info("桌台扫码支付，已关闭, TRADE_CLOSED");
						return "success";
					} else {
						logger.error("支付宝异步通知返回的不是TRADE_SUCCESS与TRADE_FINISHED与TRADE_CLOSED状态");
						return "success";
					}
				}
			} else {
				logger.error("支付宝异步回调,调用SDK验证签名, 验证失败");
				return "fail";
			}
		} catch(AlipayApiException e) {
			e.printStackTrace();
			logger.error("桌台扫码支付通知异常:" + e.getErrMsg());
			return "fail";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return "fail";
		} catch (YdpException e) {
			e.printStackTrace();
			logger.error("桌台扫码通知入库异常:" + e.getMessage());
			//业务异常返回success给支付宝，不要它在发消息过来了
			return "success";
		}
	}
	
	/**
	 * 输入金额支付
	 * @param request
	 * @param response
	 * @param buyerId
	 * @param merchantId
	 * @param payAmount
	 * @return
	 * @throws AlipayApiException
	 * @throws IOException
	 * @throws Exception
	 */
	@RequestMapping(value = "/alipayFrontOrder", method = RequestMethod.POST)
	public JSONObject alipayFrontOrder(HttpServletRequest request, HttpServletResponse response, @RequestParam String buyerId, 
			@RequestParam Integer merchantId, @RequestParam String payAmount) throws AlipayApiException, IOException, Exception {
		MerchantAlipayInfo alipayInfo = alipayInfoService.getAlipayInfoByMerchantId(merchantId);
		if(alipayInfo == null) {
			throw new Exception("商家还未绑定支付宝收款账号");
		}
		MerchantUser merchantUser = merchantService.selectBasicInfo(merchantId);
		String orderNo = DateUtil.format(new Date(), DatePattern.PURE_DATETIME_MS_PATTERN) + buyerId.substring(4);
		String body = URLEncoder.encode("{\"merchantId\":" + merchantId + "}", "utf-8");
		MerchantPayOrder payOrder = new MerchantPayOrder();
		payOrder.setOrderNo(orderNo);		
		BigDecimal payAmountBD = new BigDecimal(payAmount);
		payOrder.setOrderPrice(payAmountBD);
		payOrder.setOrderStatus(Constants.ORDER_STATUS_NO_PAYMENT);
		payOrder.setPayMethod(Constants.ALIPAY_QRCODE_FRONT);
		JSONObject bizContent = new JSONObject();
		bizContent.put("out_trade_no", orderNo);
		bizContent.put("seller_id", alipayInfo.getAlipayUserId());
		bizContent.put("total_amount", payAmountBD.floatValue());
		bizContent.put("subject", merchantUser.getMerchantName() + "-消费");
		bizContent.put("buyer_id", buyerId);
		//该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m。
		bizContent.put("timeout_express", "5m");
		bizContent.put("body", body);
		String tadeNo = payOrderService.saveByAlipay(payOrder, merchantId, alipayInfo.getAlipayToken(), bizContent);
		JSONObject results = new JSONObject();
		results.put("tradeNo", tadeNo);
		return results;
	}
	
//	/**
//	 * 关闭前台扫码订单 
//	 * @param request
//	 * @param tradeNo
//	 * @return
//	 */
//	@RequestMapping(value = "/closeFrontOrder", method = RequestMethod.POST)
//	public JSONObject closeFrontOrder(HttpServletRequest request, @RequestParam String orderNo, @RequestParam Integer merchantId) {
//		new Thread(new Runnable() {
//			@Override
//			public void run() {
//				try {
//					//关闭订单
//					payOrderService.closeByOrderNo(orderNo, merchantId);
//				} catch (YdpException e) {
//					e.printStackTrace();
//					logger.error("/closeFrontOrder 调用异常:" + e.getMessage());
//				}
//			}
//		}).start();
//		return JSONResult.success();
//	}
	
}
