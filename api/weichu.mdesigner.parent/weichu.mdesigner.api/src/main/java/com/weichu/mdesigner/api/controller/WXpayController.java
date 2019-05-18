package com.weichu.mdesigner.api.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantOrderService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderService;
import com.weichu.mdesigner.api.service.IWxpayService;
import com.weichu.mdesigner.api.socketio.SocketioClient;
import com.weichu.mdesigner.api.wxpay.WXPay;
import com.weichu.mdesigner.api.wxpay.WXPayConfig;
import com.weichu.mdesigner.api.wxpay.WXPayConfigImpl;
import com.weichu.mdesigner.api.wxpay.WXPayUtil;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.PaymentException;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.ip.IPUtils;
import com.xiaoleilu.hutool.date.DatePattern;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * 微信支付
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/wxpay")
public class WXpayController {

	Logger logger = LoggerFactory.getLogger(WXpayController.class);

	@Autowired
	RestTemplate restTemplate;

	@Autowired
	private IWxpayService wxpayService;
	
	@Autowired
	private IMerchantPayOrderService payOrderService;
	
	@Autowired
	private IMerchantOrderService orderService;
	
	@Value("${wxpay.debug.enabled}")
	private boolean debug;

	private String appId = "wx6505d415747fb721";

	private String secret = "c215071beec5e552976d003893c6f4d1";

	@Value("${yidpu.payment.server}")
	private String paymentServer;
	
	@Value("${yidpu.bind.server}")
	private String bindServer;
	
	@Autowired
	private SocketioClient socketioClient;
	
	/**
	 * 微信支付 用户静默授权
	 * 
	 * @param request
	 * @param response
	 * @param code
	 * @param state
	 * @param merchantId
	 * @param tableCode
	 * @throws IOException 
	 */
	@RequestMapping(value = "/memberBindRedirect", method = RequestMethod.GET)
	public void memberBindRedirect(HttpServletRequest request, HttpServletResponse response, @RequestParam String code,
			@RequestParam Integer merchantId) throws YdpException, IOException {
		logger.debug("code: " + code);
		// 公众号SECRET: c215071beec5e552976d003893c6f4d1
		// 公众号APPID: wx6505d415747fb721

		// 小程序appId: wxc05e1b8602afb5e7
		// 小程序SECRET: bf612e58dbcd79200fd204d6f82d4f3f
		// code说明 ：
		// code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
		// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
		String access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret="
				+ secret + "&code=" + code + "&grant_type=authorization_code";
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(access_token_url, String.class);
		String body = responseEntity.getBody();
		logger.debug(body);
		JSONObject jsonObj = JSONObject.parseObject(body);
		// 由于公众号的secret和获取到的access_token安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新access_token、通过access_token获取用户信息等步骤，也必须从服务器发起。
		logger.debug("access_token: " + jsonObj.getString("access_token"));
		logger.debug("openid: " + jsonObj.getString("openid"));
		socketioClient.callMemberBind(1, jsonObj.getString("openid"), merchantId);
		response.sendRedirect(bindServer + "/bindSuccess.html");
	}
	
	/**
	 * 微信支付 用户静默授权
	 * 
	 * @param request
	 * @param response
	 * @param code
	 * @param state
	 * @param merchantId
	 * @param tableCode
	 * @throws IOException 
	 */
	@RequestMapping(value = "/buyerAuthRedirect", method = RequestMethod.GET)
	public void buyerAuthRedirect(HttpServletRequest request, HttpServletResponse response, @RequestParam String code,
			@RequestParam Integer merchantId, @RequestParam String tableCode) throws YdpException, IOException {
		logger.debug("code: " + code);
		// 公众号SECRET: c215071beec5e552976d003893c6f4d1
		// 公众号APPID: wx6505d415747fb721

		// 小程序appId: wxc05e1b8602afb5e7
		// 小程序SECRET: bf612e58dbcd79200fd204d6f82d4f3f
		// code说明 ：
		// code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
		// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
		String access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret="
				+ secret + "&code=" + code + "&grant_type=authorization_code";
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(access_token_url, String.class);
		String body = responseEntity.getBody();
		logger.debug(body);
		JSONObject jsonObj = JSONObject.parseObject(body);
		// 由于公众号的secret和获取到的access_token安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新access_token、通过access_token获取用户信息等步骤，也必须从服务器发起。
		logger.debug("access_token: " + jsonObj.getString("access_token"));
		logger.debug("openid: " + jsonObj.getString("openid"));
		
		String JWT_Token = Jwts.builder()
				// 保存商家ID
					.claim("uid", merchantId)
				// 保存openid
				.claim("openid", jsonObj.get("openid").toString())
				// 用户名写入标题
				.setSubject("")
				// 有效期设置
				.setExpiration(new Date(System.currentTimeMillis() + JavaWebToken.EXPIRATIONTIME_4HOURE))
				// 签名设置
				.signWith(SignatureAlgorithm.HS512, JavaWebToken.SECRET).compact();
		response.sendRedirect(paymentServer + "/wxpay/wxpayment.html?openid=" + jsonObj.getString("openid") + "&merchantId=" 
	    		+ merchantId + "&tableCode=" + tableCode + "&token=" + JWT_Token);
	}
	
	/**
	 * 微信前台扫码支付 授权
	 * @param request
	 * @param response
	 * @param code
	 * @param merchantId
	 * @throws YdpException
	 */
	@RequestMapping(value = "/buyerAuthRedirectFront", method = RequestMethod.GET)
	public void buyerAuthRedirectFront(HttpServletRequest request, HttpServletResponse response, @RequestParam String code,
			@RequestParam String merchantId) throws YdpException, IOException {
		logger.debug("code: " + code);
		// 公众号SECRET: c215071beec5e552976d003893c6f4d1
		// 公众号APPID: wx6505d415747fb721

		// 小程序appId: wxc05e1b8602afb5e7
		// 小程序SECRET: bf612e58dbcd79200fd204d6f82d4f3f
		// code说明 ：
		// code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
		// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
		String access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appId + "&secret="
				+ secret + "&code=" + code + "&grant_type=authorization_code";
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(access_token_url, String.class);
		String body = responseEntity.getBody();
		logger.debug(body);
		JSONObject jsonObj = JSONObject.parseObject(body);
		// 由于公众号的secret和获取到的access_token安全级别都非常高，必须只保存在服务器，不允许传给客户端。后续刷新access_token、通过access_token获取用户信息等步骤，也必须从服务器发起。
		logger.debug("access_token: " + jsonObj.getString("access_token"));
		logger.debug("openid: " + jsonObj.getString("openid"));
		response.sendRedirect(paymentServer + "/wxpay/wxpaymentFront.html?openid=" + jsonObj.getString("openid") + "&merchantId=" 
	    		+ merchantId);
	}
	
	/**
	 * 微信js-sdk 配置初始化
	 * 
	 * @param request
	 * @param url
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/config", method = RequestMethod.POST)
	public Map<String, String> config(HttpServletRequest request, @RequestParam String url) throws YdpException {
		// 获取token
		String access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId
				+ "&secret=" + secret;
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(access_token_url, String.class);
		String body = responseEntity.getBody();
		logger.debug(body);
		JSONObject jsonObj = JSONObject.parseObject(body);
		if (jsonObj.containsKey("errcode")) {
			throw new YdpException(jsonObj.getString("errmsg"));
		}
		// 在获取jsapi_ticket,这个是微信js-sdk生成签名必须的
		String jsapi_ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="
				+ jsonObj.getString("access_token") + "&type=jsapi";
		ResponseEntity<String> jsapiTicketEntity = restTemplate.getForEntity(jsapi_ticket_url, String.class);
		String jsapiTicketBody = jsapiTicketEntity.getBody();
		JSONObject jsapiTicketObj = JSONObject.parseObject(jsapiTicketBody);
		logger.debug("jsapiTicketObj:" + jsapiTicketObj.toJSONString());
		Long timestamp = WXPayUtil.getCurrentTimestampMs();
		String noncestr = WXPayUtil.generateNonceStr();

		Map<String, String> returnObj = new HashMap<String, String>();
		WXPayConfig wxPayConfig = new WXPayConfigImpl();
		returnObj.put("noncestr", noncestr);
		returnObj.put("timestamp", String.valueOf(timestamp));
		try {
			url = URLDecoder.decode(url, "UTF-8");
			logger.debug("url:" + url);
		} catch (UnsupportedEncodingException e2) {
			e2.printStackTrace();
		}
		StringBuilder sb = new StringBuilder();
		sb.append("jsapi_ticket=").append(jsapiTicketObj.getString("ticket")).append("&noncestr=").append(noncestr).append("&timestamp=")
			.append(timestamp).append("&url").append(url);
		String signature = YdpUtils.SHA1(sb.toString());
		returnObj.put("signature", signature);
		returnObj.put("appId", wxPayConfig.getAppID());
		returnObj.put("debug", debug == true ? "1" : "0");
		logger.debug("返回:" + JSONObject.toJSONString(returnObj));
		// 返回界面(是到获取订单界面)
		return returnObj;
	}

	/**
	 * 微信支付-统一下单
	 * 
	 * @param request
	 * @param response
	 * @param openid
	 * @param merchantId
	 * @param tableCode
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/wxpayOrder", method = RequestMethod.POST)
	public Map<String, String> alipayOrder(HttpServletRequest request, HttpServletResponse response,
			@RequestParam String openid, @RequestParam Integer merchantId, @RequestParam String orderNo)
					throws Exception {
		String ip = IPUtils.getRealIP(request);
		if (StringUtils.isEmpty(merchantId)) {
			throw new YdpException("请扫描商家二维码下单");
		}
		// 调用统一下单,返回prepay_id，在调用h5支付
		return wxpayService.unifiedOrder(merchantId, orderNo, ip, openid);
	}
	

	/**
	 * 前台扫码支付
	 * @param request
	 * @param response
	 * @param openid
	 * @param merchantId
	 * @return
	 */
	@RequestMapping(value = "/wxpayFrontOrder", method = RequestMethod.POST)
	public Map<String, String> wxpayFrontOrder(HttpServletRequest request, HttpServletResponse response,
			@RequestParam String openid, @RequestParam Integer merchantId, @RequestParam String payAmount)
					throws Exception {
		String ip = IPUtils.getRealIP(request);
		if (StringUtils.isEmpty(merchantId)) {
			throw new YdpException("请扫描商家二维码下单");
		}
		// 调用统一下单,返回prepay_id，在调用h5支付
		return wxpayService.unifiedFrontOrder(merchantId, ip, openid, payAmount);
	}
	
	/**
	 * 支付通知
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/notify", method = RequestMethod.POST, produces = { "text/plain;charset=UTF-8" })
	public String notify(HttpServletRequest request) {
		String resXml = "";
		logger.info("进入微信支付异步通知");
		String results = null;
		try {
			//
			InputStream is = request.getInputStream();
			// 将InputStream转换成String
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			StringBuilder sb = new StringBuilder();
			String line = null;
			try {
				while ((line = reader.readLine()) != null) {
					sb.append(line + "\n");
				}
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			resXml = sb.toString();
			WXPay wxpay = null;
				wxpay = new WXPay(new WXPayConfigImpl());
				Map<String, String> notifyMap = WXPayUtil.xmlToMap(resXml);
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
//						String tableCode = attachJson.getString("tableCode");
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
//							payOrderService.paySuccess(transaction_id, out_trade_no, merchantId, total_amount, payDate,
//									Constants.WECHAT_QRCODE_FRONT);//微信桌台扫码支付
							try {
								orderService.paySuccess(transaction_id, out_trade_no, total_amount, payDate, merchantId,
										isMergedOrder, Constants.PAY_METHOD_WECHAT, openid);
							} catch(PaymentException e) {
								e.printStackTrace();
								orderService.lockedOrder(out_trade_no, Constants.PAY_METHOD_WECHAT, transaction_id, total_amount, payDate, merchantId, openid);
								logger.error("微信支付异步通知PaymentException:" + e.getMessage());
								return "<xml>" + "<return_code><![CDATA[" + Constants.WXPAY_SUCCESS_CODE + "]]></return_code>"
										+ "<return_msg><![CDATA[" + Constants.WXPAY_OK_CODE + "]]></return_msg>" + "</xml> ";
							}
						}
						logger.info("微信支付回调成功订单号:{}", out_trade_no);
						return "<xml>" + "<return_code><![CDATA[" + Constants.WXPAY_SUCCESS_CODE + "]]></return_code>"
						+ "<return_msg><![CDATA[" + Constants.WXPAY_OK_CODE + "]]></return_msg>" + "</xml> ";
					} else {
						return "<xml>" + "<return_code><![CDATA[FAIL]]></return_code>"
								+ "<return_msg><![CDATA[报文为空]]></return_msg>" + "</xml>";
					}
				} else {
					return "<xml>" + "<return_code><![CDATA[FAIL]]></return_code>"
							+ "<return_msg><![CDATA[报文为空]]></return_msg>" + "</xml>";
				} 
		} catch(YdpException e) {
			e.printStackTrace();
			logger.error("微信支付异步通知YdpException:" + e.getMessage());
			return "<xml>" + "<return_code><![CDATA[" + Constants.WXPAY_SUCCESS_CODE + "]]></return_code>"
			+ "<return_msg><![CDATA[" + Constants.WXPAY_OK_CODE + "]]></return_msg>" + "</xml> ";
		} catch (Exception e) {
			logger.error("微信支付回调通知失败", e);
			return "<xml>" + "<return_code><![CDATA[FAIL]]></return_code>"
					+ "<return_msg><![CDATA[报文为空]]></return_msg>" + "</xml>";
		}
	}

}
