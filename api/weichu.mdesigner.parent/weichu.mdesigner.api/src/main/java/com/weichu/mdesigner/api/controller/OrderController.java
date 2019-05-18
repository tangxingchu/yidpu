package com.weichu.mdesigner.api.controller;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.response.AlipayTradeQueryResponse;
import com.weichu.mdesigner.api.param.Cart;
import com.weichu.mdesigner.api.service.IAlipayService;
import com.weichu.mdesigner.api.service.IMerchantAlipayInfoService;
import com.weichu.mdesigner.api.service.IMerchantOrderService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderHisService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderService;
import com.weichu.mdesigner.api.service.IMerchantSMSSignService;
import com.weichu.mdesigner.api.service.IMerchantWxpayInfoService;
import com.weichu.mdesigner.api.service.IWxpayService;
import com.weichu.mdesigner.api.vo.OrderVo;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.MerchantAlipayInfo;
import com.weichu.mdesigner.common.entity.MerchantOrder;
import com.weichu.mdesigner.common.entity.MerchantOrderItem;
import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.common.entity.MerchantSMSSign;
import com.weichu.mdesigner.common.entity.MerchantWxpayInfo;
import com.weichu.mdesigner.utils.exception.PaymentException;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.weichu.mdesigner.utils.page.PageBean;
import com.weichu.mdesigner.utils.sms.AliSMSUtil;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 订单处理
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/order")
public class OrderController extends BaseController {
	
	private Logger logger = LoggerFactory.getLogger(OrderController.class);
	
	@Autowired
	private IMerchantOrderService orderService;
	
	@Autowired
	private IMerchantAlipayInfoService alipayInfoService;
	
	@Autowired
	private IMerchantWxpayInfoService wxpayInfoService;
	
	@Autowired
	private IAlipayService alipayService;
	
	@Autowired
	private IWxpayService wxpayService;
	
	@Autowired
	private IMerchantPayOrderService payOrderService;
	
//	@Autowired
//	private IMerchantPayOrderHisService payOrderHisService;
	
	@Autowired
	private IMerchantSMSSignService smsSignService;
	
	@Autowired
	private AliSMSUtil aliSMSUtil;
	
	@Autowired
	private CacheManager cacheManager;
	
	/**
	 * paramMap包括渠道来源、购物车明细、用户信息或者桌台编号
	 * @param request
	 * @param cartItems
	 * @return
	 */
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	JSONObject submitOrder(HttpServletRequest request, @RequestBody Cart cart) throws Exception {
		//订单来源下小程序扫码\预定下单
		Map<String, Object> results = null;
		if(Constants.ORDER_METHOD_QRCODE == cart.getOrderMethod() || Constants.ORDER_METHOD_BOOK == cart.getOrderMethod()) {
			int memberId = JavaWebToken.getUid(request);
			//createUser为空， 需要在订单确认的时候在更改createUser
			results = orderService.submitOrder(cart.getOrderMethod(), cart.getMerchantId(), memberId, null, cart);
		} else {//桌面版下单、服务员版app下单(memberId就为空)
			String createUser = JavaWebToken.getUsername(request);
			int merchantId = JavaWebToken.getUid(request);
			results = orderService.submitOrder(cart.getOrderMethod(), merchantId, null, createUser, cart);
		}
		return JSONResult.fillResultJsonObject(results);
	}
	
	/**
	 * 快餐厅
	 * paramMap包括渠道来源、购物车明细、用户信息或者桌台编号
	 * @param request
	 * @param cartItems
	 * @return
	 */
	@RequestMapping(value = "/submitKCT", method = RequestMethod.POST)
	JSONObject submitKCT(HttpServletRequest request, @RequestBody Cart cart) throws Exception {
		//订单来源下小程序扫码\预定下单
		Map<String, Object> results = null;
		if(Constants.ORDER_METHOD_QRCODE == cart.getOrderMethod() || Constants.ORDER_METHOD_BOOK == cart.getOrderMethod()) {
			int memberId = JavaWebToken.getUid(request);
			//createUser为空， 需要在订单确认的时候在更改createUser
			results = orderService.submitOrderByKCT(cart.getOrderMethod(), cart.getMerchantId(), null, cart);
		} else {//桌面版下单、服务员版app下单(memberId就为空)
			String createUser = JavaWebToken.getUsername(request);
			int merchantId = JavaWebToken.getUid(request);
			results = orderService.submitOrderByKCT(cart.getOrderMethod(), merchantId, createUser, cart);
		}
		return JSONResult.fillResultJsonObject(results);
	}
	
	
	/**
	 * 确认订单
	 * @param request
	 * @param order
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/confirmOrder", method = RequestMethod.POST)
	JSONObject confirmOrder(HttpServletRequest request, @RequestParam String orderNo, @RequestParam String tableCode) throws YdpException {
		int merchantId = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		orderService.confirmOrder(orderNo, merchantId, username, tableCode);
		return JSONResult.success();
	}
	
	/**
	 * 确认订单项
	 * @param request
	 * @param order
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/confirmOrderItem", method = RequestMethod.POST)
	JSONObject confirmOrderItem(HttpServletRequest request, @RequestParam String orderNo, @RequestParam Integer orderItemId,
			@RequestParam String tableCode) throws YdpException {
		int merchantId = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		int result = orderService.confirmOrderItem(orderNo, orderItemId, merchantId, username, tableCode);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 工作台显示(待确认、待支付、预支付订单)
	 * 根据桌台编号查询待支付订单或者待确认订单
	 * 
	 * 查询符合当前时间、当前消费价格的优惠
	 * @return
	 */
	@RequestMapping(value = "/listNoCompleteOrderByTableCode", method = RequestMethod.POST)
	Map<String, Object> listNoCompleteOrderByTableCode(HttpServletRequest request, @RequestBody MerchantOrder order) throws Exception {
		int merchantId = JavaWebToken.getUid(request);
		Map<String, Object> results = orderService.listNoCompleteOrderByTableCode(order.getTableCode(), merchantId);
		return results;
	}
	
	/**
	 * 快餐厅版本
	 * 工作台显示(待确认、待支付、预支付订单)
	 * 根据桌台编号查询待支付订单或者待确认订单
	 * 
	 * 查询符合当前时间、当前消费价格的优惠
	 * @return
	 */
	@RequestMapping(value = "/listNoCompleteOrderByTableCodeKCT", method = RequestMethod.POST)
	Map<String, Object> listNoCompleteOrderByTableCodeKCT(HttpServletRequest request, @RequestBody MerchantOrder order) throws Exception {
		int merchantId = JavaWebToken.getUid(request);
		Map<String, Object> results = orderService.listNoCompleteOrderByTableCodeKCT(order.getTableCode(), merchantId);
		return results;
	}
	
	/**
	 * 查询当前桌台是否有未完成的订单,提示用户
	 * 界面将桌台状态设置为空闲时需要校验一下
	 * @param request
	 * @param tableCode
	 * @return
	 */
	@RequestMapping(value = "/countOrderByTableCode", method = RequestMethod.POST)
	JSONObject countOrderByTableCode(HttpServletRequest request, @RequestParam String tableCode) {
		int merchantId = JavaWebToken.getUid(request);
		long result = orderService.countOrderByTableCode(tableCode, merchantId);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 查询未完成交易订单(后厨系统显示)
	 * 所有 已确认但是还没有发货的订单
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listNoCompleteOrder", method = RequestMethod.POST)
	List<OrderVo> listNoCompleteOrder(HttpServletRequest request) {
		int merchantId = JavaWebToken.getUid(request);
		return orderService.listOrderVo(merchantId);
	}
	
	/**
	 * 查询当前桌台的用餐订单(补打小票时用到)
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/selectOrderByTableCode", method = RequestMethod.POST)
	OrderVo selectOrderByTableCode(HttpServletRequest request, @RequestParam String tableCode) throws YdpException {
		int merchantId = JavaWebToken.getUid(request);
		return orderService.selectOrderByTableCode(tableCode, merchantId);
	}
	
	/**
	 * 取消订单项
	 * @param request
	 * @param orderItemId
	 * @param orderNo
	 * @return
	 */
	@RequestMapping(value = "/cancelOrderItem", method = RequestMethod.POST)
	JSONObject cancelOrderItem(HttpServletRequest request, @RequestBody MerchantOrderItem orderItem) throws Exception {		
		int mid = JavaWebToken.getUid(request);
		int result = orderService.cancelOrderItem(orderItem.getOrderNo(), orderItem.getId(), mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 删除订单项
	 * @param request
	 * @param orderItemId
	 * @param orderNo
	 * @return
	 */
	@RequestMapping(value = "/deleteOrderItem", method = RequestMethod.POST)
	JSONObject deleteOrderItem(HttpServletRequest request, @RequestBody MerchantOrderItem orderItem) throws Exception {		
		int mid = JavaWebToken.getUid(request);
		int result = orderService.deleteOrderItem(orderItem.getOrderNo(), orderItem.getId(), mid);
//		int result = orderService.closeOrderItem(orderItem.getOrderNo(), orderItem.getId(), mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 标记为已出菜订单项
	 * @param request
	 * @param orderItemId
	 * @param orderNo
	 * @return
	 */
	@RequestMapping(value = "/shippedOrderItem", method = RequestMethod.POST)
	JSONObject shippedOrderItem(HttpServletRequest request, @RequestBody MerchantOrderItem orderItem) throws Exception {		
		int mid = JavaWebToken.getUid(request);
		int result = orderService.shippedOrderItem(orderItem.getOrderNo(), orderItem.getId(), mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 标记为已上菜订单项
	 * @param request
	 * @param orderItemId
	 * @param orderNo
	 * @return
	 */
	@RequestMapping(value = "/receiveOrderItem", method = RequestMethod.POST)
	JSONObject receiveOrderItem(HttpServletRequest request, @RequestBody MerchantOrderItem orderItem) throws Exception {		
		int mid = JavaWebToken.getUid(request);
		int result = orderService.receiveOrderItem(orderItem.getOrderNo(), orderItem.getId(), mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 可能由于一些网络原因或其它原因未能成功更新订单状态，这是个在工作台界面手动同步接口
	 * @param request
	 * @param orderNo 如果是单个订单付款就是订单号，如果是合并付款就是outTradeNo
	 * @param payMethod 桌台扫码支付,还是前台扫码支付
	 * @return
	 * @throws AlipayApiException 
	 */
	@RequestMapping(value = "/syncAlipayOrderStatus", method = RequestMethod.POST)
	public JSONObject syncAlipayOrderStatus(HttpServletRequest request, @RequestParam String orderNo,
			@RequestParam Integer payMethod) throws AlipayApiException, YdpException {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		MerchantAlipayInfo alipayInfo = alipayInfoService.getAlipayInfoByMerchantId(mid);
		if(alipayInfo == null) {
			throw new YdpException("您还开通支付宝收银");
		}
		String out_trade_no = null;
		MerchantOrder order = null;
		if(payMethod == Constants.PAY_METHOD_ALIPAY) {//顾客桌台扫码支付
			order = orderService.getByOrderNo(orderNo, mid);
			if(order == null) {
				throw new YdpException("未查找订单");
			}
			if(order.getPayOrderNo() == null) {
				throw new YdpException("订单未支付");
			}
//			if(StringUtils.isEmpty(order.getOutTradeNo())) {
//				out_trade_no = order.getOrderNo();
//			} else {
//				out_trade_no = order.getOutTradeNo();
//				isMergedOrder = true;
//			}
			out_trade_no = order.getPayOrderNo();
		} else if(payMethod == Constants.ALIPAY_QRCODE_FRONT) {//顾客前台扫码支付
//			MerchantPayOrder payOrder = payOrderService.getByOrderNo(orderNo, mid);
			out_trade_no = orderNo;
		} else {
			throw new YdpException("只能查询支付宝支付的订单");
		}
		AlipayTradeQueryResponse alipayResponse = alipayService.tradeQuery(out_trade_no, alipayInfo.getAlipayToken());
		if(alipayResponse.isSuccess()) {
			logger.debug("调用成功");
			if("WAIT_BUYER_PAY".equals(alipayResponse.getTradeStatus())) {
				throw new YdpException("交易已创建,等待顾客付款");
			} else if("TRADE_CLOSED".equals(alipayResponse.getTradeStatus())) {
				throw new YdpException("交易已关闭(未付款交易超时关闭，或支付完成后全额退款)");
			}
			String totalAmountStr = alipayResponse.getTotalAmount();//交易金额
			String tradeNo = alipayResponse.getTradeNo();//交易号 
			Date payDate = alipayResponse.getSendPayDate();//交易时间
			String buyerId = alipayResponse.getBuyerUserId();//买家支付宝账号对应的支付宝唯一用户号
			BigDecimal totalAmount = new BigDecimal(totalAmountStr);
			//剩下的就是 交易成功或者交易结束,不可退款
			if(payMethod == Constants.PAY_METHOD_ALIPAY) {
				//同步支付宝 支付结果
				payOrderService.paySuccess(tradeNo, out_trade_no, mid, totalAmount, payDate, Constants.PAY_METHOD_ALIPAY, buyerId);
				try {
					orderService.syncPaymentResult(tradeNo, order, mid, totalAmount, payDate, username, Constants.PAY_METHOD_ALIPAY);
				} catch(PaymentException e) {
					e.printStackTrace();
					logger.error(e.getMessage());
					//如果订单已锁定就不重复锁定
					if(!Constants.ORDER_STATUS_LOCKED.equals(order.getOrderStatus())) {
						orderService.lockedOrder(out_trade_no, payMethod, tradeNo, totalAmount, payDate, mid, buyerId);
					}
					throw new YdpException(e.getMessage());
				}
			} else if(payMethod == Constants.ALIPAY_QRCODE_FRONT) {
				//同步支付宝 支付结果
				payOrderService.paySuccess(tradeNo, out_trade_no, mid, totalAmount, payDate, Constants.ALIPAY_QRCODE_FRONT, false, buyerId);
			}
			return JSONResult.fillResultJsonObject(totalAmountStr);
		} else {
			logger.error("/api/alipay/alipaySuccess调用失败,merchantId:" + mid + ",tradeNo:" + alipayResponse.getTradeNo() + ",orderNo:" + orderNo);
			throw new AlipayApiException("查询支付宝支付结果:" + alipayResponse.getSubMsg());
		}
	}
	
	/**
	 * 可能由于一些网络原因或其它原因未能成功更新订单状态，这是个在工作台界面手动同步接口
	 * @param request
	 * @param orderNo 如果是单个订单付款就是订单号，如果是合并付款就是outTradeNo
	 * @param payMethod 桌台扫码支付,还是前台扫码支付
	 * @return
	 */
	@RequestMapping(value = "/syncWxpayOrderStatus", method = RequestMethod.POST)
	public JSONObject syncWxpayOrderStatus(HttpServletRequest request, @RequestParam String orderNo,
			@RequestParam Integer payMethod) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		MerchantWxpayInfo wxpayInfo = wxpayInfoService.selectByMid(mid);
		if(wxpayInfo == null || StringUtils.isEmpty(wxpayInfo.getSubMchId())) {
			throw new YdpException("您还未开通微信支付");
		}
		String out_trade_no = null;
		MerchantOrder order = null;
		if(payMethod == Constants.PAY_METHOD_WECHAT) {//顾客桌台扫码支付
			order = orderService.getByOrderNo(orderNo, mid);
			if(order == null) {
				throw new YdpException("未查找订单");
			}
			if(order.getPayOrderNo() == null) {
				throw new YdpException("订单未支付");
			}
			out_trade_no = order.getPayOrderNo();
		} else if(payMethod == Constants.WECHAT_QRCODE_FRONT) {//顾客前台扫码支付
//			MerchantPayOrder payOrder = payOrderService.getByOrderNo(orderNo, mid);
			out_trade_no = orderNo;
		} else {
			throw new YdpException("只能查询微信支付的订单");
		}
		Map<String, String> params = new HashMap<String, String>();
		params.put("sub_mch_id", wxpayInfo.getSubMchId());
		params.put("out_trade_no", out_trade_no);
		Map<String, String> results = null;
		try {
			results = wxpayService.orderquery(params);
		} catch (Exception e) {
			e.printStackTrace();
			throw new YdpException("查询微信支付结果失败:0000系统异常");
		}
		String return_code = results.get("return_code");
		if(Constants.WXPAY_SUCCESS_CODE.equals(return_code)) {//是否请求成功
			String result_code = results.get("result_code");
			if(Constants.WXPAY_SUCCESS_CODE.equals(result_code)) {//是否查询成功
				String trade_state = results.get("trade_state"); //交易状态
				if(Constants.WXPAY_SUCCESS_CODE.equals(trade_state)) {
					//交易成功
					String transaction_id = results.get("transaction_id");//微信支付订单号 
					String total_fee = results.get("total_fee");//订单总金额，单位为分 
					String time_end = results.get("time_end");//交易完成时间
					String openid = results.get("openid");//用户在商户appid下的唯一标识
					Date payDate = DateUtil.parse(time_end, DatePattern.PURE_DATETIME_PATTERN);
					BigDecimal totalAmount = new BigDecimal(total_fee).divide(new BigDecimal(100L));
					if(payMethod == Constants.PAY_METHOD_WECHAT) {
						//同步微信 支付结果
						payOrderService.paySuccess(transaction_id, out_trade_no, mid, totalAmount,
								payDate, Constants.PAY_METHOD_WECHAT, openid);
						try {
							orderService.syncPaymentResult(transaction_id, order, mid, totalAmount, payDate, username
									,Constants.PAY_METHOD_WECHAT);
						} catch(PaymentException e) {
							e.printStackTrace();
							logger.error(e.getMessage());
							//如果订单已锁定就不重复锁定
							if(!Constants.ORDER_STATUS_LOCKED.equals(order.getOrderStatus())) {
								orderService.lockedOrder(out_trade_no, payMethod, transaction_id, totalAmount, payDate, mid, openid);
							}
							throw new YdpException(e.getMessage());
						}
					} else if(payMethod == Constants.WECHAT_QRCODE_FRONT) {
						//同步微信 支付结果
						payOrderService.paySuccess(transaction_id, out_trade_no, mid, totalAmount,
								payDate, Constants.WECHAT_QRCODE_FRONT, false, openid);
					}
					return JSONResult.fillResultJsonObject(new BigDecimal(total_fee).divide(new BigDecimal(100L)).toString());
				} else {
					String trade_state_desc = results.get("trade_state_desc");
					throw new YdpException("查询微信支付结果:" + trade_state_desc);
				}
			} else {
				String err_code_des = results.get("err_code_des");
				throw new YdpException("查询微信支付结果:" + err_code_des);
			}
		} else {
			String return_msg = results.get("return_msg");
			throw new YdpException("查询微信支付结果:" + return_msg);
		}
	}
	
	/**
	 * 界面 收款 功能(现金收款、支付宝转账、微信转账、其他)
	 * @param request
	 * @param orderNo 如果是单个订单付款就是订单号，如果是合并付款就是outTradeNo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/gathering", method = RequestMethod.POST)
	public JSONObject gathering(HttpServletRequest request, @RequestParam String orderNo, @RequestParam Integer payMethod,
			@RequestParam String payAmount, @RequestParam(required = false) String remark) throws Exception {
		if(new BigDecimal(payAmount).compareTo(BigDecimal.ZERO) < 0) {
			throw new YdpException("收银金额不能小于0");
		}
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		Map<String, Object> resultMap = orderService.gathering(orderNo, payMethod, new BigDecimal(payAmount), mid, username, remark);
		return JSONResult.fillResultJsonObject(resultMap.get("orderNos"));
	}
	
	
	/**
	 * 查询历史订单
	 * 
	 * @param request
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public PageBean<OrderVo> list(HttpServletRequest request, @RequestBody Map<String, String> searchParams)
			throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		String orderTimeStartStr = searchParams.get("orderTimeStart");
		String orderTimeEndStr = searchParams.get("orderTimeEnd");
		if (StringUtils.isEmpty(orderTimeStartStr) || StringUtils.isEmpty(orderTimeEndStr)) {
			throw new YdpException("下单时间查询条件不能为空");
		}
		// 免费商家用户(只能查询一个月内的数据)
		Date orderTimeStart = DateUtil.parse(orderTimeStartStr, DatePattern.NORM_DATETIME_MINUTE_PATTERN);
		Date endTimeStart = DateUtil.parse(orderTimeEndStr, DatePattern.NORM_DATETIME_MINUTE_PATTERN);
		long betweenDays = (long) ((endTimeStart.getTime() - orderTimeStart.getTime()) / (1000 * 60 * 60 * 24) + 0.5);
		if (betweenDays > 31) {
			throw new YdpException("下单时间查询跨度最多1个月");
		}
		String pageSizeStr = searchParams.get("pageSize");
		String pageNumStr = searchParams.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		return orderService.list(pageSize, pageNum, searchParams, mid);
	}
	
	/**
	 * 用餐订单界面,点开+号查询订单明细,详细订单项
	 * @param request
	 * @param orderNo
	 * @return
	 */
	@RequestMapping(value = "/listOrderItem/{orderId}", method = RequestMethod.GET)
	public List<MerchantOrderItem> listOrderItemByOrderNo(HttpServletRequest request, @PathVariable("orderId") Integer orderId) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return orderService.listOrderItemByOrderId(orderId, mid);
	}
	
	/**
	 * 修改备注信息
	 * @param request
	 * @param orderId
	 * @param remark
	 * @return
	 */
	@RequestMapping(value = "/modifyRemark", method = RequestMethod.POST)
	public JSONObject modifyRemark(HttpServletRequest request, @RequestParam Integer orderId, @RequestParam String remark) {
		int mid = JavaWebToken.getUid(request);// 商家id
		orderService.modifyRemark(orderId, remark, mid);
		return JSONResult.success();
	}
	
	/**
	 * 关联前台扫码支付订单
	 * @param request
	 * @param payOrderIds
	 * @param remark
	 * @return
	 */
	@RequestMapping(value = "/relateFrontOrder", method = RequestMethod.POST)
	public JSONObject relateFrontOrder(HttpServletRequest request, @RequestParam List<Integer> payOrderIds, 
			@RequestParam String orderNo, @RequestParam(required = false) String remark) throws YdpException {
		if(payOrderIds == null || payOrderIds.size() == 0) {
			throw new YdpException("请选择需要关联的支付单");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		JSONArray orderNos = orderService.relateFrontOrder(orderNo, payOrderIds, remark, username, mid);
		return JSONResult.fillResultJsonObject(orderNos);
	}
	
	/**
	 * 完成订单
	 * @param request
	 * @param orderNo
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/finishedOrder", method = RequestMethod.POST)
	public List<String> finishedOrder(HttpServletRequest request, @RequestParam String orderNo) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		return orderService.finishedOrder(orderNo, mid);
	}
	
	/**
	 * 取消订单(用餐订单界面)
	 * @param request
	 * @param orderNo
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/cancelOrder", method = RequestMethod.POST)
	public JSONObject cancelOrder(HttpServletRequest request, @RequestParam String orderNo) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		orderService.cancelOrder(orderNo, mid);
		return JSONResult.success();
	}
	
	/**
	 * 删除订单(用餐订单界面)
	 * @param request
	 * @param orderNo
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/deleteOrder", method = RequestMethod.POST)
	public JSONObject deleteOrder(HttpServletRequest request, @RequestParam String orderNo) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		orderService.deleteOrder(orderNo, mid);
		return JSONResult.success();
	}
	
	/**
	 * 复制其它桌台订单下单
	 * @param request
	 * @param tableCode
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/copyOrder", method = RequestMethod.POST)
	public JSONObject copyOrder(HttpServletRequest request, @RequestParam String sourceTableCode, @RequestParam String targetTableCode) throws YdpException {
		if(StringUtils.isEmpty(sourceTableCode)) {
			throw new YdpException("请选择复制哪一桌台的订单");
		}
		if(StringUtils.isEmpty(targetTableCode)) {
			throw new YdpException("请选择复制到哪一桌台");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		orderService.copyOrder(sourceTableCode, targetTableCode, mid, username);
		return JSONResult.success();
	}
	
	/**
	 * 会员消费
	 * @param request
	 * @param orderNo 用餐订单号
	 * @param phone 会员手机号码
	 * @param code 动态密码
	 * @param remark 备注
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/memberConsume", method = RequestMethod.POST)
	public JSONObject memberConsume(HttpServletRequest request, @RequestParam String orderNo, @RequestParam String phone, @RequestParam String code) throws YdpException {
		if(StringUtils.isEmpty(code)) {
			throw new YdpException("动态密码不能为空");
		}
		//5分钟内有效
		String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(phone + "_CONSUME", String.class);
		if(cacheCode == null) {
			throw new YdpException("动态密码已失效,请重新发送.");
		} else if(!cacheCode.toUpperCase().equals(code.toUpperCase())) {
			throw new YdpException("动态密码错误");
		}
		cacheManager.getCache(Constants.CODE_CACHE_NAME).evict(phone + "_CONSUME");
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		orderService.memberConsume(orderNo, phone, username, mid, "会员消费");
		return JSONResult.success();
	}
	
	/**
	 * 会员消费动态密码
	 * @param request
	 * @param phone
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/getMemberConsumeCode", method = RequestMethod.POST)
	public JSONObject getMemberConsumeCode(HttpServletRequest request, @RequestParam String phone) throws YdpException {
		if(StringUtils.isEmpty(phone)) {
			throw new YdpException("手机号码不能为空");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		//5分钟内有效
		String random = String.valueOf((int)(Math.random() * 9000 + 1000));
		logger.debug("会员消费短信验证码:" + random);
		cacheManager.getCache(Constants.CODE_CACHE_NAME).put(phone + "_CONSUME", random);
		MerchantSMSSign smsSign = smsSignService.selectStatus0ByMid(mid);
		JSONObject templateParam = new JSONObject();
		templateParam.put("code", random);
		if(smsSign == null) {
			aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, phone, "SMS_154589481", templateParam.toJSONString());
		} else {
			aliSMSUtil.sendSMS(smsSign.getSignName(), phone, "SMS_154589481", templateParam.toJSONString());
		}
		return JSONResult.success();
	}
	
	/**
	 * 餐桌扫码支付金额≠订单金额时，在当前用餐订单界面需要强制完成订单功能按钮
	 * @param request
	 * @param orderNo
	 * @param remark
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/hadnleExceptionOrder", method = RequestMethod.POST)
	public JSONObject hadnleExceptionOrder(HttpServletRequest request, @RequestParam String orderNo, @RequestParam Integer payMethod, 
			@RequestParam(required = false) String payPrice, @RequestParam(required = false) List<Integer> payOrderIds, @RequestParam String remark) throws YdpException {
		if(StringUtils.isEmpty(orderNo)) {
			throw new YdpException("用餐订单号不能为空");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		orderService.hadnleExceptionOrder(orderNo, payMethod, payOrderIds, new BigDecimal(payPrice), remark, mid);
		return JSONResult.success();
	}
	
	/**
	 * 桌台扫码支付成功后自动打印收银小票
	 * @param request
	 * @param tableCodes
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/selectPrinterOrder", method = RequestMethod.POST)
	public List<Map<String, Object>> selectPrinterOrder(HttpServletRequest request, @RequestParam List<String> orderNos) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		return orderService.selectPrinterOrder(orderNos, mid);
	}
	
	/**
	 * 快餐厅桌台扫码点餐支付成功后自动后厨打印
	 * @param request
	 * @param tableCodes
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/selectOrderByOrderNo", method = RequestMethod.POST)
	public OrderVo selectOrderByOrderNo(HttpServletRequest request, @RequestParam String orderNo) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		return orderService.selectOrderByOrderNo(orderNo, mid);
	}
	
	/**
	 * 修改订单项的后厨打印状态
	 * @param request
	 * @param orderNo
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/updateOrderItemPrintStatus", method = RequestMethod.POST)
	public JSONObject updateOrderItemPrintStatus(HttpServletRequest request, @RequestParam String tableCode) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		orderService.updateOrderItemPrintStatus(tableCode, mid);
		return JSONResult.success();
	}
	
	/**
	 * 修改订单项的后厨打印状态
	 * @param request
	 * @param orderNo
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/updatePrintStatusByOrderItemIds", method = RequestMethod.POST)
	public JSONObject updatePrintStatusByOrderItemIds(HttpServletRequest request, @RequestParam List<Integer> orderItemIds) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		if(orderItemIds == null || orderItemIds.size() == 0) {
			return JSONResult.success();
		}
		orderService.updatePrintStatusByOrderItemIds(orderItemIds, mid);
		return JSONResult.success();
	}
	
	/**
	 * 修改订单项的后厨打印状态
	 * @param request
	 * @param orderNo
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/updatePrintStatusBygoodsIds", method = RequestMethod.POST)
	public JSONObject updatePrintStatusBygoodsIds(HttpServletRequest request, @RequestParam List<Integer> goodsIds, @RequestParam String tableCode) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		if(goodsIds == null || goodsIds.size() == 0) {
			return JSONResult.success();
		}
		orderService.updatePrintStatusBygoodsIds(goodsIds, tableCode, mid);
		return JSONResult.success();
	}
	
	/**
	 * 换台
	 * @param request
	 * @param tableCode
	 * @param newTableCode
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/changeTableCode", method = RequestMethod.POST)
	public JSONObject changeTableCode(HttpServletRequest request, @RequestParam String tableCode, @RequestParam String newTableCode) throws YdpException {
		if(StringUtils.isEmpty(tableCode)) {
			throw new YdpException("您是要换哪一台?");
		}
		if(StringUtils.isEmpty(newTableCode)) {
			throw new YdpException("您是要换到哪里去?");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		orderService.changeTableCode(tableCode, newTableCode, mid);
		return JSONResult.success();
	}
	
}
