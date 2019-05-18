package com.weichu.mdesigner.api.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.param.Cart;
import com.weichu.mdesigner.api.service.IMerchantConfigService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDayService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDiscountSerivce;
import com.weichu.mdesigner.api.service.IMerchantGoodsService;
import com.weichu.mdesigner.api.service.IMerchantGoodsSubtractService;
import com.weichu.mdesigner.api.service.IMerchantOrderService;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.socketio.SocketioClient;
import com.weichu.mdesigner.api.vo.MerchantGoodsSubtractVo;
import com.weichu.mdesigner.common.entity.GoodsCategory;
import com.weichu.mdesigner.common.entity.GoodsCategoryExample;
import com.weichu.mdesigner.common.entity.MerchantGoodsDay;
import com.weichu.mdesigner.common.entity.MerchantGoodsDiscount;
import com.weichu.mdesigner.common.entity.MerchantGoodsSubtract;
import com.weichu.mdesigner.common.entity.MerchantOrderExample;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.mapper.GoodsCategoryMapper;
import com.weichu.mdesigner.common.mapper.MerchantOrderMapper;
import com.weichu.mdesigner.common.vo.MerchantGoodsVo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 移动端api接口
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/mobile")
public class MoblieController {
	
	@Value("${yidpu.payment.server}")
	private String placeOrderServer;
	
	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	private GoodsCategoryMapper mapper;
	
	@Autowired
	private IMerchantService merchantService;
	
	@Autowired
	private IMerchantOrderService orderService;
	
	@Autowired
	private IMerchantGoodsService goodsService;
	
	@Autowired
	private SocketioClient socketioClient;
	
	@Autowired
	private IMerchantGoodsDayService goodsDayService;
	
	@Autowired
	private IMerchantGoodsSubtractService goodsSubtractService;
	
	@Autowired
	private IMerchantGoodsDiscountSerivce goodsDiscountService;
	
	@Autowired
	private IMerchantConfigService configService;
	
	@Autowired
	private MerchantOrderMapper orderMapper;
	
	
	/**
	 * 获取商家信息
	 * 只包括一些基本信息
	 * id，name，logo
	 * @param request
	 * @param merchantId
	 * @return
	 */
	@RequestMapping(value = "/getMInfo", method = RequestMethod.POST)
	public MerchantUser getMerchantBasicInfo(HttpServletRequest request, @RequestParam Integer merchantId) {
		return merchantService.selectBasicInfo(merchantId);
	}
	
	/**
	 * 支付界面显示(h5支付界面调用接口)
	 * 查询桌台编号 待支付的订单
	 * @param merchantId
	 * @param tableCode
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/listNoPaymentOrderByTableCode", method = RequestMethod.POST)
	public Map<String, Object> listNoPaymentOrderByTableCode(@RequestParam Integer merchantId, @RequestParam String tableCode) throws Exception {
		return orderService.listNoPaymentOrderByTableCode(tableCode, merchantId);
	}
	
	/**
	 * 列出商品分类\商品列表
	 * @param request
	 * @param category
	 * @return
	 */
	@RequestMapping(value = "/listCategoryAndGoods", method = RequestMethod.POST)
	public Map<String, Object> listCategoryAndGoods(HttpServletRequest request) throws YdpException {
		int mid = JavaWebToken.getUid(request);
//		int operatingStatus = merchantService.selectOperatingStatus(mid);
//		if(operatingStatus == 0) {
//			throw new YdpException("商家歇业中...");
//		}
		GoodsCategoryExample example = new GoodsCategoryExample();
		example.setOrderByClause("sort_no asc");
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<GoodsCategory> goodsCategories = mapper.selectByExample(example);
		List<MerchantGoodsVo> goodses = goodsService.listAll(mid);
		Map<String, Object> results = new HashMap<>();
		results.put("goodsCategories", goodsCategories);
		results.put("goodses", goodses);
		if("1".equals(configService.getByCode(Constants.ENABLED_GOODS_DAY, mid))) {
			List<MerchantGoodsDay> goodsDays = goodsDayService.listBasicToday(mid);
			results.put("goodsDays", goodsDays);
		}
		if("1".equals(configService.getByCode(Constants.ENABLED_GOODS_DISCOUNT, mid))) {
			List<MerchantGoodsDiscount> goodsDiscounts = goodsDiscountService.listBasicEffectiveGoodsDiscount(mid);
			results.put("goodsDiscounts", goodsDiscounts);
		}
		if("1".equals(configService.getByCode(Constants.ENABLED_GOODS_SUBTRACT, mid))) {
			List<MerchantGoodsSubtractVo> goodsSubtracts = goodsSubtractService.listEffectiveSubtract(mid);
			results.put("goodsSubtracts", goodsSubtracts);
		}
		return results;
	}
	
	/*
	 * 查询当前订单金额、已经下单时间能够享受的折扣与优惠
	 */
	@RequestMapping(value = "/listCurrentSubtract", method = RequestMethod.POST)
	public List<MerchantGoodsSubtractVo> listCurrentSubtract(HttpServletRequest request, @RequestParam String totalPrice) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		if("1".equals(configService.getByCode(Constants.ENABLED_GOODS_SUBTRACT, mid))) {
			return goodsSubtractService.listCurrentSubtract(new BigDecimal(totalPrice), new Date(), mid);
		} else {
			return new ArrayList<>();
		}
	}
	
	/**
	 * 呼叫服务
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/callService", method = RequestMethod.POST)
	public JSONObject callService(HttpServletRequest request, @RequestParam String tableCode) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		int operatingStatus = merchantService.selectOperatingStatus(mid);
		if(operatingStatus == 0) {
			throw new YdpException("商家歇业中...");
		}
		socketioClient.callService(mid, tableCode);
		return JSONResult.success();
	}
	
	/**
	 * 中小餐厅提交订单
	 * paramMap包括渠道来源、购物车明细、用户信息或者桌台编号
	 * @param request
	 * @param cartItems
	 * @return
	 */
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	JSONObject submitOrder(HttpServletRequest request, @RequestBody Cart cart) throws YdpException {
		int merchantId = JavaWebToken.getUid(request);
		int operatingStatus = merchantService.selectOperatingStatus(merchantId);
		if(operatingStatus == 0) {
			throw new YdpException("商家歇业中...");
		}
		MerchantOrderExample countExample = new MerchantOrderExample();
		List<String> orderStatus = new ArrayList<>();
		orderStatus.add(Constants.ORDER_STATUS_LOCKED);
		orderStatus.add(Constants.ORDER_STATUS_PAYMENT);
		countExample.createCriteria().andOrderStatusIn(orderStatus).andTableCodeEqualTo(cart.getTableCode())
			.andMerchantIdEqualTo(merchantId);
		long count = orderMapper.countByExample(countExample);
		if(count > 0) {
			//顾客扫码点餐提示
			throw new YdpException("该桌台有已支付但是未完成交易的订单或者支付异常订单,需要商家确认并完成交易后在下单");
		}
		//订单来源下小程序扫码\预定下单
		Map<String, Object> results = null;
		if(Constants.ORDER_METHOD_QRCODE == cart.getOrderMethod() || Constants.ORDER_METHOD_BOOK == cart.getOrderMethod()) {
			//createUser为空， 需要在订单确认的时候在更改createUser
			results = orderService.submitOrder(cart.getOrderMethod(), merchantId, null, "", cart);
			boolean isAppend = (boolean) results.get("isAppend");
			socketioClient.sendPlaceOrderToMerchant(merchantId, results.get("orderNo").toString(), cart.getTableCode(), isAppend);
		}
		return JSONResult.fillResultJsonObject(results);
	}
	
	/**
	 * 快餐厅提交订单
	 * paramMap包括渠道来源、购物车明细、用户信息或者桌台编号
	 * @param request
	 * @param cartItems
	 * @return
	 */
	@RequestMapping(value = "/submitByKCT", method = RequestMethod.POST)
	JSONObject submitByKCT(HttpServletRequest request, @RequestBody Cart cart) throws YdpException {
		int merchantId = JavaWebToken.getUid(request);
		int operatingStatus = merchantService.selectOperatingStatus(merchantId);
		if(operatingStatus == 0) {
			throw new YdpException("商家歇业中...");
		}
//		MerchantOrderExample countExample = new MerchantOrderExample();
//		List<String> orderStatus = new ArrayList<>();
//		orderStatus.add(Constants.ORDER_STATUS_LOCKED);
//		orderStatus.add(Constants.ORDER_STATUS_PAYMENT);
//		countExample.createCriteria().andOrderStatusIn(orderStatus).andTableCodeEqualTo(cart.getTableCode())
//			.andMerchantIdEqualTo(merchantId);
//		long count = orderMapper.countByExample(countExample);
//		if(count > 0) {
//			//顾客扫码点餐提示
//			throw new YdpException("该桌台有已支付但是未完成交易的订单或者支付异常订单,需要商家确认并完成交易后在下单");
//		}
		//订单来源下小程序扫码\预定下单
		Map<String, Object> results = null;
		if(Constants.ORDER_METHOD_QRCODE == cart.getOrderMethod() || Constants.ORDER_METHOD_BOOK == cart.getOrderMethod()) {
			//createUser为空， 需要在订单确认的时候在更改createUser
			results = orderService.submitOrderByKCT(cart.getOrderMethod(), merchantId, "", cart);
			boolean isAppend = false;//快餐厅不存在加菜不加菜
			socketioClient.sendPlaceOrderToMerchant(merchantId, results.get("orderNo").toString(), cart.getTableCode(), isAppend);
		}
		return JSONResult.fillResultJsonObject(results);
	}
	
	/**
	 * 支付界面显示(h5支付界面调用接口)
	 * 查询顾客微信或者支付宝下的 订单
	 * @param merchantId
	 * @param tableCode
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/listOrderByOpendid", method = RequestMethod.POST)
	public Map<String, Object> listOrderByOpendid(@RequestParam Integer merchantId, @RequestParam String openid) throws Exception {
		return orderService.listOrderByOpendid(openid, merchantId);
	}
	
	/**
	 * 支付界面显示(h5支付界面调用接口)
	 * 查询顾客微信或者支付宝下的 订单
	 * @param merchantId
	 * @param tableCode
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/listOrderBybuyerId", method = RequestMethod.POST)
	public Map<String, Object> listOrderBybuyerId(@RequestParam Integer merchantId, @RequestParam String buyerId) throws Exception {
		return orderService.listOrderBybuyerId(buyerId, merchantId);
	}
	
	/**
	 * 取消订单
	 * @param request
	 * @param orderNo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/cancelOrderByOpenid", method = RequestMethod.POST)
	public JSONObject cancelOrderByOpenid(HttpServletRequest request, @RequestParam String openid, @RequestParam Integer merchantId, 
			@RequestParam String orderNo) throws Exception {
		orderService.deleteOrderByOpenid(orderNo, openid, merchantId);
		return JSONResult.success();
	}
	
	/**
	 * 取消订单
	 * @param request
	 * @param orderNo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/cancelOrderByBuyerid", method = RequestMethod.POST)
	public JSONObject cancelOrderByBuyerid(HttpServletRequest request, @RequestParam String buyerId, @RequestParam Integer merchantId, 
			@RequestParam String orderNo) throws Exception {
		orderService.cancelOrderByBuyerid(orderNo, buyerId, merchantId);
		return JSONResult.success();
	}
	
}
