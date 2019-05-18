package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.weichu.mdesigner.api.config.ExperienceAccount;
import com.weichu.mdesigner.api.param.Cart;
import com.weichu.mdesigner.api.param.CartItem;
import com.weichu.mdesigner.api.param.ExtraItem;
import com.weichu.mdesigner.api.service.IMemberUserService;
import com.weichu.mdesigner.api.service.IMerchantCashierLogService;
import com.weichu.mdesigner.api.service.IMerchantConfigService;
import com.weichu.mdesigner.api.service.IMerchantCouponConsumeService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDayService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDiscountSerivce;
import com.weichu.mdesigner.api.service.IMerchantGoodsService;
import com.weichu.mdesigner.api.service.IMerchantGoodsSubtractService;
import com.weichu.mdesigner.api.service.IMerchantOrderHisService;
import com.weichu.mdesigner.api.service.IMerchantOrderService;
import com.weichu.mdesigner.api.service.IMerchantPayLogService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderService;
import com.weichu.mdesigner.api.service.IMerchantSMSSignService;
import com.weichu.mdesigner.api.service.IMerchantTableService;
import com.weichu.mdesigner.api.socketio.SocketioClient;
import com.weichu.mdesigner.api.vo.MerchantGoodsSubtractVo;
import com.weichu.mdesigner.api.vo.OrderItemVo;
import com.weichu.mdesigner.api.vo.OrderVo;
import com.weichu.mdesigner.common.entity.MerchantPayLog;
import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.common.entity.MerchantPayOrderExample;
import com.weichu.mdesigner.common.entity.MerchantSMSSign;
import com.weichu.mdesigner.common.entity.MemberAccount;
import com.weichu.mdesigner.common.entity.MemberUser;
import com.weichu.mdesigner.common.entity.MerchantCashierLog;
import com.weichu.mdesigner.common.entity.MerchantCashierLogExample;
import com.weichu.mdesigner.common.entity.MerchantConfigExample;
import com.weichu.mdesigner.common.entity.MerchantCouponConsume;
import com.weichu.mdesigner.common.entity.MerchantGoodsDay;
import com.weichu.mdesigner.common.entity.MerchantGoodsDiscount;
import com.weichu.mdesigner.common.entity.MerchantOrder;
import com.weichu.mdesigner.common.entity.MerchantOrderExample;
import com.weichu.mdesigner.common.entity.MerchantOrderItem;
import com.weichu.mdesigner.common.entity.MerchantOrderItemExample;
import com.weichu.mdesigner.utils.exception.PaymentException;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantCashierLogMapper;
import com.weichu.mdesigner.common.mapper.MerchantOrderItemMapper;
import com.weichu.mdesigner.common.mapper.MerchantOrderMapper;
import com.weichu.mdesigner.common.mapper.MerchantPayOrderHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantPayOrderMapper;
import com.weichu.mdesigner.common.vo.MerchantGoodsVo;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.OrderStatus;
import com.weichu.mdesigner.utils.constants.PayMethod;
import com.weichu.mdesigner.utils.page.PageBean;
import com.weichu.mdesigner.utils.sms.AliSMSUtil;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 订单处理service
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantOrderServiceImpl implements IMerchantOrderService {
	
	private Logger logger = LoggerFactory.getLogger(MerchantOrderServiceImpl.class);

	@Autowired
	private IMerchantGoodsService goodsService;

	@Autowired
	private IMerchantGoodsDayService dayService;

	@Autowired
	private IMerchantGoodsDiscountSerivce discountService;
	
	@Autowired
	private IMerchantConfigService configService;

	@Autowired
	private MerchantOrderMapper orderMapper;

	@Autowired
	private MerchantOrderItemMapper orderItemMapper;
	
	@Autowired
	private IMerchantTableService tableService;
	
	@Autowired
	private IMerchantCashierLogService cashierLogService;
	
	@Autowired
	private IMerchantPayLogService payLogService;
	
	@Autowired
	private IMerchantCouponConsumeService couponConsumeService;
	
	@Autowired
	private IMerchantGoodsSubtractService subtractService;
	
	@Autowired
	private IMerchantOrderHisService orderHisService;
	
	@Autowired
	private MerchantPayOrderMapper payOrderMapper;
	
	@Autowired
	private MerchantPayOrderHisMapper payOrderHisMapper;
	
	@Autowired
	private MerchantCashierLogMapper cashierLogMapper;
	
	@Autowired
	private IMemberUserService memberService;
	
	@Autowired
	private IMerchantSMSSignService smsSignService;
	
	@Autowired
	private IMerchantPayOrderService payOrderService;
	
	@Autowired
	private IMemberUserService memberUserService;
	
	@Autowired
	private AliSMSUtil alismsUtil;
	
	@Autowired
	private SocketioClient socketClient;

	@Autowired
	private ExperienceAccount account;
	
	/**
	 * 生成订单号
	 * 
	 * @param businessId
	 * @param channelId
	 * @param merchantId
	 * @param tableCode
	 * @param now
	 * @return
	 */
	private String generateOrderNo(Integer businessId, Integer channelId, Integer merchantId, String tableCode, Date now) {
		// 商家编号后5位
		String merchantIdStr = YdpUtils.convertMechantId2Str(merchantId);
		//服务员版app与桌面端app下单是没有用户id的
//		String userIdStr = userId == null ? "0000" : String.valueOf(userId);
//		String time = String.valueOf(now.getTime());
		StringBuilder orderNo = new StringBuilder();
		orderNo.append(businessId);
		orderNo.append(channelId);
		orderNo.append(DateUtil.format(now, DatePattern.PURE_DATETIME_PATTERN));
//		orderNo.append(time.substring(time.length() - 8));
		orderNo.append(merchantIdStr);
		orderNo.append(tableCode);
		return orderNo.toString();
	}
	
	/**
	 * 生成订单号
	 * 
	 * @param businessId
	 * @param channelId
	 * @param merchantId
	 * @param tableCode
	 * @param now
	 * @return
	 */
	private String generateOrderNoByKCT(Integer businessId, Integer channelId, Integer merchantId, String code) {
		// 商家编号后5位
		Date now = new Date();
		String merchantIdStr = YdpUtils.convertMechantId2Str(merchantId);
		//服务员版app与桌面端app下单是没有用户id的
//		String userIdStr = userId == null ? "0000" : String.valueOf(userId);
		String time = String.valueOf(now.getTime());
		StringBuilder orderNo = new StringBuilder();
		orderNo.append(businessId);
		orderNo.append(channelId);
		if(StringUtils.isEmpty(code)) {
			orderNo.append(DateUtil.format(now, DatePattern.PURE_DATETIME_PATTERN));
		} else {
			orderNo.append(time.substring(time.length() - 8));
			orderNo.append(code.substring(code.length() - 12 < 0 ? 0 : code.length() - 12));
		}
		orderNo.append(merchantIdStr);
		return orderNo.toString();
	}

	@Override
	public Map<String, Object> submitOrder(Integer orderMethod, Integer merchantId, Integer memberId, 
			String createUser, Cart cart) throws YdpException {
		// 生成订单号(第一位业务渠道 1=餐饮行业,2=便利店行业,
		// 第二位下单渠道1=用户版app下单,2=服务员版app下单,3=桌面版app下单,4=用户版app预定单
		// 接着日期0820的4位,时间戳后8位,用户ID后4位（不足前面补0）
		List<CartItem> cartItems = cart.getCartItem();
		if (cartItems.size() > 0) {
//			MerchantUser merchantUser = userMapper.selectByPrimaryKey(merchantId);
			//查询是否有已支付的订单, 已支付的订单需要先完成交易才能继续下单
//			if(Constants.TABLE_STATUS_DINING == cart.getTableStatus()) {
				MerchantOrderExample countExample = new MerchantOrderExample();
				List<String> orderStatus = new ArrayList<>();
				orderStatus.add(Constants.ORDER_STATUS_LOCKED);
				orderStatus.add(Constants.ORDER_STATUS_PAYMENT);
				countExample.createCriteria().andOrderStatusIn(orderStatus).andTableCodeEqualTo(cart.getTableCode())
					.andMerchantIdEqualTo(merchantId);
				long count = orderMapper.countByExample(countExample);
				if(count > 0) {
					//顾客扫码点餐提示
					if(orderMethod == Constants.ORDER_METHOD_QRCODE) {
						throw new YdpException("该桌台有已支付但是未完成交易的订单或者支付异常订单,需要商家确认并完成交易后在下单");
					} else {
						throw new YdpException("该桌台有已支付但是未完成交易的订单或者支付异常订单,请先完成交易在下单");
					}
				}
//			}
			List<MerchantOrder> orders = null;
			if(Constants.TABLE_STATUS_EMPTY == cart.getTableStatus()) {
				//空闲状态桌台不需要查
			} else {
				//查询桌台是否存在未支付的订单,如果有则 追加订单项， 没有则 新建订单
				MerchantOrderExample orderExample = new MerchantOrderExample();
				List<String> orderStatusValues = new ArrayList<String>();
				orderStatusValues.add(Constants.ORDER_STATUS_TOBECOMMIT);//待确认订单
				orderStatusValues.add(Constants.ORDER_STATUS_NO_PAYMENT);//待支付订单
				orderStatusValues.add(Constants.ORDER_STATUS_DEPOSIT);//预支付订单
				orderExample.createCriteria().andOrderStatusIn(orderStatusValues).andTableCodeEqualTo(cart.getTableCode())
					.andMerchantIdEqualTo(merchantId);
				orders = orderMapper.selectByExample(orderExample);
			}			
			MerchantOrder order = null;//订单
			Date now = new Date();
			boolean isAppend = false;//是否是加菜
			if(orders == null || orders.isEmpty()) {
//				String orderNo = generateOrderNo(merchantUser.getBusinessCategory(), orderMethod, merchantId, cart.getTableCode(), now);
				String orderNo = generateOrderNo(1, orderMethod, merchantId, cart.getTableCode(), now);
				// 组装订单
				order = new MerchantOrder();
				order.setOrderNo(orderNo);// 订单号
				order.setMerchantId(merchantId);// 商家ID			
				order.setOrderTime(now);// 下单时间
				order.setMemberId(memberId);// 用户id
				order.setDinersNum(cart.getDinersNum());//用餐人数
				if(orderMethod == Constants.ORDER_METHOD_QRCODE || orderMethod == Constants.ORDER_METHOD_WAITER
						|| orderMethod == Constants.ORDER_METHOD_DESKTOP || Constants.ORDER_METHOD_DCJ == orderMethod) {
					order.setOrderChannel(Constants.ORDER_CHANNLE_OFFLINE);
				} else {
					order.setOrderChannel(Constants.ORDER_CHANNLE_ONLINE);
				}
				order.setOrderMethod(orderMethod);// 1=小程序扫码下单,2=服务员版app下单,3=桌面版app下单,4=小程序预定下单,5=点餐机下单
				//2=服务员版app下单,3=桌面版app下单
				if(Constants.ORDER_METHOD_WAITER == orderMethod || Constants.ORDER_METHOD_DESKTOP == orderMethod
						|| Constants.ORDER_METHOD_DCJ == orderMethod) {
					order.setOrderStatus(Constants.ORDER_STATUS_NO_PAYMENT); // 待支付
				} else {// 1=小程序扫码下单(微信扫码下单) , 4=微信小程序预定单
					order.setOrderStatus(calOrderStatus(merchantId));
				}
				order.setTableCode(cart.getTableCode());
				order.setCreateUser(createUser);// 下单人(或订单确认人)
				order.setCreateTime(now);// 记录创建时间
			} else {
				//加菜也重新生成订单号(如果顾客点了支付中途取消，接着加菜在点支付会出错，订单信息篡改了。)
				order = orders.get(0);
				//2=服务员版app下单,3=桌面版app下单
				if(Constants.ORDER_METHOD_WAITER == orderMethod || Constants.ORDER_METHOD_DESKTOP == orderMethod
						|| Constants.ORDER_METHOD_DCJ == orderMethod) {
					order.setOrderStatus(Constants.ORDER_STATUS_NO_PAYMENT); // 待支付
				} else {// 1=小程序扫码下单(微信扫码下单) , 4=微信小程序预定单
					order.setOrderStatus(calOrderStatus(merchantId));
				}
				isAppend = true;
			}
			// 查询是否启用了每日特价/折扣商品优惠规则
//			List<String> values = new ArrayList<String>();
//			values.add(Constants.ENABLED_GOODS_DAY);// 特价商品
//			values.add(Constants.ENBALED_GOODS_DISCOUNT);// 折扣商品
//			List<MerchantConfig> configs = configService.listByCodes(values, merchantId);
			String enabledGoodsDay = "0", enabledGoodsDiscount = "0";
//			if (configs.size() == 2) {
//				MerchantConfig goodsDayConfig = configs.get(0);
//				MerchantConfig goodsDiscountConfig = configs.get(1);
//				enabledGoodsDay = goodsDayConfig.getConfigValue();
//				enabledGoodsDiscount = goodsDiscountConfig.getConfigValue();
//			}
			enabledGoodsDay = configService.getByCode(Constants.ENABLED_GOODS_DAY, merchantId);
			enabledGoodsDiscount = configService.getByCode(Constants.ENABLED_GOODS_DISCOUNT, merchantId);
			List<MerchantGoodsDay> goodsDays = null;
			List<MerchantGoodsDiscount> goodsDiscounts = null;
			// 如果启用了特价商品
			if ("1".equals(enabledGoodsDay)) {
				// 当天有效的特价商品
				goodsDays = dayService.listBasicToday(merchantId);
			}
			// 如果启用了折扣商品
			if ("1".equals(enabledGoodsDiscount)) {
				// 有效的折扣商品
				goodsDiscounts = discountService.listBasicEffectiveGoodsDiscount(merchantId);
			}
			BigDecimal totalPrice = new BigDecimal("0.00");
			// 组装订单项
			List<MerchantOrderItem> orderItems = new ArrayList<>();
			//批量修改减库存
			for (CartItem cartItem : cartItems) {
				MerchantOrderItem orderItem = new MerchantOrderItem();
				int goodsId = cartItem.getGoodsId();
				MerchantGoodsVo goodsVo = goodsService.selectBasicById(goodsId, merchantId);
				orderItem.setGoodsId(cartItem.getGoodsId());
				orderItem.setGoodsName(goodsVo.getName());
				orderItem.setGoodsPrice(goodsVo.getPrice());//要加附属属性项受影响价格
				orderItem.setGoodsUnitName(goodsVo.getUnitName());
				orderItem.setNum(cartItem.getNum());
				orderItem.setOrderItemTime(now);
				orderItem.setOrderNo(order.getOrderNo());
//				orderItem.setOrderNo(orderNo);
				orderItem.setMerchantId(merchantId);
				orderItem.setRemark(cartItem.getRemark());
//				只计算了每日特价与折扣商品， 还差附属属性 影响的价格没有计算
				calGoodsDayDiscount(goodsVo, goodsDays, goodsDiscounts, orderItem, cartItem);
				totalPrice = totalPrice.add(orderItem.getPrice().multiply(BigDecimal.valueOf(cartItem.getNum())));
				//保存订单项
//				orderItemMapper.insertSelective(orderItem);
				orderItem.setOrderItemStatus(order.getOrderStatus());
				orderItems.add(orderItem);
//				if(Constants.ORDER_CHANNLE_WAITER == channelId || Constants.ORDER_CHANNLE_DESKTOP == channelId) {
//					orderItem.setOrderItemStatus(Constants.ORDER_STATUS_NO_PAYMENT); // 待支付
//				} else {// 1=用户版app下单 , 4=用户版app预定单
//					orderItem.setOrderStatus(calOrderStatus(merchantId));
//				}
				//减库存
				goodsService.subInventory(goodsVo.getId(), goodsVo.getName(), cartItem.getNum(), merchantId);
			}
			if(orders == null || orders.isEmpty()) {
				order.setTotalPrice(totalPrice);
				//修改桌台状态
//				tableService.updateStatusByTableCode(cart.getTableCode(), Constants.TABLE_STATUS_DINING, merchantId);
				//保存订单
				orderMapper.insertSelective(order);
			} else {
				//修改原先的订单号
//				orderItemMapper.updateOrderNo(order.getOrderNo(), orderNo, merchantId);
				//修改订单号
				order.setTotalPrice(order.getTotalPrice().add(totalPrice));
				//更新订单总金额
				orderMapper.updateByPrimaryKeySelective(order);
			}
			//批量保存订单项
			for(MerchantOrderItem orderItem : orderItems) {
				orderItem.setOrderId(order.getId());
			}
			orderItemMapper.insertBatch(orderItems);
			Map<String, Object> results = new HashMap<>();
			results.put("orderNo", order.getOrderNo());
			results.put("orderTime", DateUtil.format(order.getOrderTime(), DatePattern.NORM_DATETIME_PATTERN));
			results.put("isAppend", isAppend);
			return results;
		} else {
			throw new YdpException("您还没有下单呢，不能提交订单");
		}
	}
	
	/**
	 * 快餐厅提交
	 */
	@Override
	public Map<String, Object> submitOrderByKCT(Integer orderMethod, Integer merchantId, String createUser, Cart cart) throws YdpException {
		// 生成订单号(第一位业务渠道 1=餐饮行业,2=便利店行业,
			// 第二位下单渠道1=用户版app下单,2=服务员版app下单,3=桌面版app下单,4=用户版app预定单
			// 接着日期0820的4位,时间戳后8位,用户ID后4位（不足前面补0）
			List<CartItem> cartItems = cart.getCartItem();
			if (cartItems.size() > 0) {
				MerchantOrder order = null;//订单
				Date now = new Date();
				String code = StringUtils.isEmpty(cart.getBuyerId()) ? cart.getOpenid() : cart.getBuyerId();
				String orderNo = generateOrderNoByKCT(1, orderMethod, merchantId, code);
				// 组装订单
				order = new MerchantOrder();
				order.setOrderNo(orderNo);// 订单号
				order.setMerchantId(merchantId);// 商家ID			
				order.setOrderTime(now);// 下单时间
				order.setDinersNum(cart.getDinersNum());//用餐人数
				order.setAlipayUserid(cart.getBuyerId());
				order.setWxOpenid(cart.getOpenid());
				order.setSeqNumber(cart.getSeqNumber());//餐牌号 
				if(orderMethod == Constants.ORDER_METHOD_QRCODE || orderMethod == Constants.ORDER_METHOD_WAITER
						|| orderMethod == Constants.ORDER_METHOD_DESKTOP) {
					order.setOrderChannel(Constants.ORDER_CHANNLE_OFFLINE);
				} else {
					order.setOrderChannel(Constants.ORDER_CHANNLE_ONLINE);
				}
				order.setOrderMethod(orderMethod);// 1=小程序扫码下单,2=服务员版app下单,3=桌面版app下单,4=小程序预定下单
				//2=服务员版app下单,3=桌面版app下单
//				if(Constants.ORDER_METHOD_WAITER == orderMethod || Constants.ORDER_METHOD_DESKTOP == orderMethod) {
					order.setOrderStatus(Constants.ORDER_STATUS_NO_PAYMENT); // 待支付
//				} else {// 1=小程序扫码下单(微信扫码下单) , 4=微信小程序预定单
//					order.setOrderStatus(calOrderStatus(merchantId));
//				}
				order.setTableCode(cart.getTableCode());
				order.setCreateUser(createUser);// 下单人(或订单确认人)
				order.setCreateTime(now);// 记录创建时间
				// 查询是否启用了每日特价/折扣商品优惠规则
				String enabledGoodsDay = "0", enabledGoodsDiscount = "0";
				enabledGoodsDay = configService.getByCode(Constants.ENABLED_GOODS_DAY, merchantId);
				enabledGoodsDiscount = configService.getByCode(Constants.ENABLED_GOODS_DISCOUNT, merchantId);
				List<MerchantGoodsDay> goodsDays = null;
				List<MerchantGoodsDiscount> goodsDiscounts = null;
				// 如果启用了特价商品
				if ("1".equals(enabledGoodsDay)) {
					// 当天有效的特价商品
					goodsDays = dayService.listBasicToday(merchantId);
				}
				// 如果启用了折扣商品
				if ("1".equals(enabledGoodsDiscount)) {
					// 有效的折扣商品
					goodsDiscounts = discountService.listBasicEffectiveGoodsDiscount(merchantId);
				}
				BigDecimal totalPrice = new BigDecimal("0.00");
				// 组装订单项
				List<MerchantOrderItem> orderItems = new ArrayList<>();
				//批量修改减库存
				for (CartItem cartItem : cartItems) {
					MerchantOrderItem orderItem = new MerchantOrderItem();
					int goodsId = cartItem.getGoodsId();
					MerchantGoodsVo goodsVo = goodsService.selectBasicById(goodsId, merchantId);
					orderItem.setGoodsId(cartItem.getGoodsId());
					orderItem.setGoodsName(goodsVo.getName());
					orderItem.setGoodsPrice(goodsVo.getPrice());//要加附属属性项受影响价格
					orderItem.setGoodsUnitName(goodsVo.getUnitName());
					orderItem.setNum(cartItem.getNum());
					orderItem.setOrderItemTime(now);
					orderItem.setOrderNo(order.getOrderNo());
//						orderItem.setOrderNo(orderNo);
					orderItem.setMerchantId(merchantId);
					orderItem.setRemark(cartItem.getRemark());
//						只计算了每日特价与折扣商品， 还差附属属性 影响的价格没有计算
					calGoodsDayDiscount(goodsVo, goodsDays, goodsDiscounts, orderItem, cartItem);
					totalPrice = totalPrice.add(orderItem.getPrice().multiply(BigDecimal.valueOf(cartItem.getNum())));
					//保存订单项
//						orderItemMapper.insertSelective(orderItem);
					orderItem.setOrderItemStatus(order.getOrderStatus());
					orderItems.add(orderItem);
					//减库存
					goodsService.subInventory(goodsVo.getId(), goodsVo.getName(), cartItem.getNum(), merchantId);
				}
				order.setTotalPrice(totalPrice);
				//修改桌台状态
//				tableService.updateStatusByTableCode(cart.getTableCode(), Constants.TABLE_STATUS_DINING, merchantId);
				//保存订单
				orderMapper.insertSelective(order);
				//批量保存订单项
				for(MerchantOrderItem orderItem : orderItems) {
					orderItem.setOrderId(order.getId());
				}
				orderItemMapper.insertBatch(orderItems);
				Map<String, Object> results = new HashMap<>();
				results.put("orderNo", order.getOrderNo());
				results.put("orderTime", DateUtil.format(order.getOrderTime(), DatePattern.NORM_DATETIME_PATTERN));
				return results;
			} else {
				throw new YdpException("您还没有下单呢，不能提交订单");
			}
	}
	
	/**
	 * 当前运营规则(扫码点餐是否直达厨房)
	 * @param merchantId
	 * @return
	 */
	private String calOrderStatus(int merchantId) {
		MerchantConfigExample configExample = new MerchantConfigExample();
		configExample.createCriteria().andConfigCodeEqualTo(Constants.USER_APP_KITCHEN).andMerchantIdEqualTo(merchantId);
		String configValue = configService.getByCode(Constants.USER_APP_KITCHEN, merchantId);
		if(configValue == null) {
			return Constants.ORDER_STATUS_TOBECOMMIT; // 待确认
		} else {
			if("0".equals(configValue)) {//不直接下达后厨系统或打印
				return Constants.ORDER_STATUS_TOBECOMMIT; // 待确认
			} else {//直接下单后厨系统或直接打印
				return Constants.ORDER_STATUS_NO_PAYMENT; //待支付
			}
		}
	}

	// 计算特价商品优惠价格
	private void calGoodsDayDiscount(MerchantGoodsVo goodsVo, List<MerchantGoodsDay> goodsDays,
			List<MerchantGoodsDiscount> goodsDiscounts, MerchantOrderItem orderItem, CartItem cartItem) {
		//商品定义了附属属性(找出受影响的价格)
		BigDecimal extraPrice = new BigDecimal("0.00");
		if(cartItem.getExtraItems() != null && cartItem.getExtraItems().size() > 0) {
			StringBuilder extraNames = new StringBuilder();
			List<ExtraItem> extraItems = cartItem.getExtraItems();
			for (ExtraItem extraItem : extraItems) {
				Map<String, Object> extraMap = orderMapper.selectExtraItem(extraItem.getExtraCode(), extraItem.getExtraItemValue(),
						goodsVo.getId(), goodsVo.getMerchantId());
				BigDecimal extraItemPrice =(BigDecimal)extraMap.get("price");
				extraNames.append(extraMap.get("item_name")).append(",");
				extraPrice = extraPrice.add(extraItemPrice);
			}
			orderItem.setExtraName(extraNames.substring(0, extraNames.length() - 1));
		}
		
		//商家启用了每日特价 与 折扣商品
		if(goodsDays != null && goodsDiscounts != null) {
			MerchantGoodsDay goodsDay = findGoodsDay(goodsVo.getId(), goodsDays);
			MerchantGoodsDiscount goodsDiscount = findGoodsDiscount(goodsVo.getId(), goodsDiscounts);
			if(goodsDay == null && goodsDiscount == null) {//商品什么都没有启用
				orderItem.setPrice(goodsVo.getPrice().add(extraPrice));//加上附属属性价格
				orderItem.setRuleCode(Constants.NO_RULE);
			} else if(goodsDay != null && goodsDiscount != null) { //商品同时启用了特价与折扣 (取最低价)
				BigDecimal goodsDayPrice = goodsDay.getPrice();
				BigDecimal price = goodsDiscount.getDiscountValue().multiply(BigDecimal.valueOf(10))
						.divide(BigDecimal.valueOf(100)).multiply(goodsVo.getPrice());
//				BigDecimal price = goodsVo.getPrice().multiply(goodsDiscount.getDiscountValue().multiply(new BigDecimal("0.1")));
				if(goodsDayPrice.compareTo(price) > 0) {
					//采用商品折扣 附属属性价格在乘以折扣
					BigDecimal goodsDiscountPrice = goodsDiscount.getDiscountValue().multiply(BigDecimal.valueOf(10))
							.divide(BigDecimal.valueOf(100)).multiply(goodsVo.getPrice().add(extraPrice));
//					BigDecimal goodsDiscountPrice = goodsVo.getPrice().add(extraPrice).multiply(goodsDiscount.getDiscountValue().multiply(new BigDecimal("0.1")));
					orderItem.setPrice(goodsDiscountPrice);
					orderItem.setRuleValue(goodsDiscount.getDiscountValue());
					orderItem.setRuleCode(Constants.GOODS_DISCOUNT_RULE);
				} else {
					goodsDayPrice = goodsDayPrice.add(extraPrice);
					orderItem.setPrice(goodsDayPrice);
					orderItem.setRuleValue(goodsDayPrice);
					orderItem.setRuleCode(Constants.GOODS_DAY_RULE);
				}
			} else if(goodsDay != null) {//商品只启用特价
				orderItem.setPrice(goodsDay.getPrice().add(extraPrice));
				orderItem.setRuleValue(goodsDay.getPrice());
				orderItem.setRuleCode(Constants.GOODS_DAY_RULE);
			} else if(goodsDiscounts != null) {//商品只启用了折扣
				BigDecimal goodsDiscountPrice = goodsDiscount.getDiscountValue().multiply(BigDecimal.valueOf(10))
						.divide(BigDecimal.valueOf(100)).multiply(goodsVo.getPrice().add(extraPrice));
//				BigDecimal goodsDiscountPrice = goodsVo.getPrice().add(extraPrice).multiply(goodsDiscount.getDiscountValue().multiply(new BigDecimal("0.1")));
				orderItem.setPrice(goodsDiscountPrice);
				orderItem.setRuleValue(goodsDiscount.getDiscountValue());
				orderItem.setRuleCode(Constants.GOODS_DISCOUNT_RULE);
			}
			
		} else if(goodsDays != null) {//商家只启用了每日特价
			MerchantGoodsDay goodsDay = findGoodsDay(goodsVo.getId(), goodsDays);
			if(goodsDay != null) {//商品启用了每日特价
				orderItem.setPrice(goodsDay.getPrice().add(extraPrice));
				orderItem.setRuleValue(goodsDay.getPrice());
				orderItem.setRuleCode(Constants.GOODS_DAY_RULE);
			} else {//商品什么都没有启用
				orderItem.setPrice(goodsVo.getPrice().add(extraPrice));
				orderItem.setRuleCode(Constants.NO_RULE);
			}
		} else if(goodsDiscounts != null) {//商家只启用了折扣商品
			MerchantGoodsDiscount goodsDiscount = findGoodsDiscount(goodsVo.getId(), goodsDiscounts);
			if(goodsDiscount != null) {//商品启用了折扣商品
				BigDecimal goodsDiscountPrice = goodsDiscount.getDiscountValue().multiply(BigDecimal.valueOf(10))
						.divide(BigDecimal.valueOf(100)).multiply(goodsVo.getPrice().add(extraPrice));
//				BigDecimal goodsDiscountPrice = goodsVo.getPrice().add(extraPrice).multiply(goodsDiscount.getDiscountValue().multiply(new BigDecimal("0.1")));
				orderItem.setPrice(goodsDiscountPrice);
				orderItem.setRuleValue(goodsDiscount.getDiscountValue());
				orderItem.setRuleCode(Constants.GOODS_DISCOUNT_RULE);
			} else {//商品什么都没有启用
				orderItem.setPrice(goodsVo.getPrice().add(extraPrice));
				orderItem.setRuleCode(Constants.NO_RULE);
			}
		} 
		if(goodsDays == null && goodsDiscounts == null){//商家什么都没有启用
			orderItem.setPrice(goodsVo.getPrice().add(extraPrice));
			orderItem.setRuleCode(Constants.NO_RULE);
		}
	}
	
	private MerchantGoodsDay findGoodsDay(int goodsId, List<MerchantGoodsDay> goodsDays) {
		MerchantGoodsDay goodsDay = null;
		for (MerchantGoodsDay merchantGoodsDay : goodsDays) {
			if (goodsId == merchantGoodsDay.getGoodsId()) {
				goodsDay = merchantGoodsDay;
				break;
			}
		}
		return goodsDay;
	}
	
	private MerchantGoodsDiscount findGoodsDiscount(int goodsId, List<MerchantGoodsDiscount> goodsDiscounts) {
		MerchantGoodsDiscount goodsDiscount = null;
		for (MerchantGoodsDiscount merchantGoodsDiscount : goodsDiscounts) {
			if (goodsId == merchantGoodsDiscount.getGoodsId()) {
				goodsDiscount = merchantGoodsDiscount;
				break;
			}
		}
		return goodsDiscount;
	}
	
	/**
	 * 根据订单号获取订单
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	@Override
	public MerchantOrder getByOrderNo(String orderNo, Integer merchantId) {
		return orderMapper.selectByOrderNo(orderNo, merchantId);
	}
	
	/**
	 * 确认订单
	 * @param orderNo
	 * @return
	 */
	//由待确认改成待支付订单
	@Override
	public int confirmOrder(String orderNo, int mid, String username, String tableCode) throws YdpException {
		int result = orderMapper.confirmOrder(orderNo, mid, username);
		if(result == 0) {//没有受影响的行
			throw new YdpException("订单状态异常,不是待确认状态,请刷新重试");
		}
//		socketClient.callConfirmOrder(tableCode, username, mid);
		orderItemMapper.confirmOrderItemByOrderNo(orderNo, mid);
		return result;
	}
	
	/**
	 * 确认订单项
	 * @param orderNo 订单号
	 * @param orderItemId 订单项Id
	 * @param mid 商家id
	 * @return
	 */
	//由待确认改成待支付订单项
	@Override
	public int confirmOrderItem(String orderNo, int orderItemId, int mid, String username, String tableCode) throws YdpException {
		int result = orderItemMapper.confirmOrderItem(orderNo, orderItemId, mid);
		if(result == 0) {//没有受影响的行
			throw new YdpException("订单项状态异常,不是待确认状态,请刷新重试");
		}
		MerchantOrderItemExample orderItemExample = new MerchantOrderItemExample();
		orderItemExample.createCriteria().andOrderItemStatusEqualTo(Constants.ORDER_STATUS_TOBECOMMIT)
			.andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		long size = orderItemMapper.countByExample(orderItemExample);
		//全部确认完毕
		if(size == 0) {
			orderMapper.confirmOrder(orderNo, mid, username);
//			socketClient.callConfirmOrder(tableCode, username, mid);
		}
		return Long.valueOf(size).intValue();
	}
	
	/**
	 * 根据桌台编号查询订单vo(包括订单项vo)
	 * 待支付的订单和
	 * 待确认订单（线下扫码订单） 线上预定订单在订单管理确认（因为还没有桌台编号）
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	@Override
	public List<OrderVo> listOrderVo(String tableCode, int mid) {
		MerchantOrderExample example = new MerchantOrderExample();
		example.setOrderByClause(" order_time asc ");
		List<String> status = new ArrayList<>();
		//待确认订单,(扫码订单) /待支付订单，有tableCode(服务员版app下单或者桌面端下单)
//		status.add(Constants.ORDER_STATUS_CANCEL);//交易取消
//		status.add(Constants.ORDER_STATUS_CLOSED);//交易关闭
//		status.add(Constants.ORDER_STATUS_COMPLETE);//交易完成
		status.add(Constants.ORDER_STATUS_LOCKED);//支付异常
		status.add(Constants.ORDER_STATUS_TOBECOMMIT);//待确认
		status.add(Constants.ORDER_STATUS_NO_PAYMENT);//待支付
		status.add(Constants.ORDER_STATUS_DEPOSIT);//预支付
		status.add(Constants.ORDER_STATUS_PAYMENT);//已支付
		example.createCriteria().andTableCodeEqualTo(tableCode).andOrderStatusIn(status)
			.andMerchantIdEqualTo(mid);
		List<OrderVo> orderVos = listOrderVos(example);
		return orderVos;
	}
	
	/**
	 * 后厨系统查询显示
	 * 根据商家id查询所有订单vo(包括订单项vo)
	 * 所有已确认但是还没有发货的订单
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	@Override
	public List<OrderVo> listOrderVo(int mid) {
		MerchantOrderExample example = new MerchantOrderExample();
		example.setOrderByClause(" order_time desc ");
		List<String> status = new ArrayList<>();
		//所有已确认但是还没有发货的订单
		status.add(Constants.ORDER_STATUS_NO_PAYMENT);
		status.add(Constants.ORDER_STATUS_DEPOSIT);
		status.add(Constants.ORDER_STATUS_PAYMENT);
		example.createCriteria().andOrderStatusIn(status).andMerchantIdEqualTo(mid);
		List<OrderVo> orderVos = listOrderVos(example);
		return orderVos;
	}
	
	private List<OrderVo> listOrderVos(MerchantOrderExample example) {
		List<MerchantOrder> orders = orderMapper.selectByExample(example);
		List<OrderVo> orderVos = new ArrayList<>();
		for (MerchantOrder merchantOrder : orders) {
			OrderVo orderVo = new OrderVo();
			BeanUtils.copyProperties(merchantOrder, orderVo);
			OrderStatus orderStatus = OrderStatus.lookup(merchantOrder.getOrderStatus());
			if(orderStatus != null) {
				orderVo.setOrderStatusName(orderStatus.getName());
			} else {
				orderVo.setOrderStatusName("未知状态");
			}
			if(merchantOrder.getPayMethod() != null) {
				PayMethod payMethodEnum = PayMethod.lookup(merchantOrder.getPayMethod());
				if(payMethodEnum != null) {
					orderVo.setPayMethodName(payMethodEnum.getName());
				} else {
					StringBuilder payMethodNameSB = new StringBuilder();
					//可能是关联了前台扫码支付多笔支付单
					String[] payMethods = YdpUtils.converString2Array(String.valueOf(merchantOrder.getPayMethod()));
					for (String s : payMethods) {
						payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
						payMethodNameSB.append(payMethodEnum.getName()).append(",");
					}
					orderVo.setPayMethodName(payMethodNameSB.toString());
				}
			}
			MerchantOrderItemExample itemExample = new MerchantOrderItemExample();
			itemExample.createCriteria().andOrderItemStatusNotEqualTo(Constants.ORDER_STATUS_CLOSED)
				.andOrderIdEqualTo(merchantOrder.getId()).andMerchantIdEqualTo(merchantOrder.getMerchantId());
			List<MerchantOrderItem> orderItems = orderItemMapper.selectByExample(itemExample);
			List<OrderItemVo> orderItemVos = new ArrayList<>();
			for (MerchantOrderItem merchantOrderItem : orderItems) {
				OrderItemVo itemVo = new OrderItemVo();
				BeanUtils.copyProperties(merchantOrderItem, itemVo);
				orderItemVos.add(itemVo);
			}
			orderItems = null;
			orderVo.setOrderItemVos(orderItemVos);
			orderVos.add(orderVo);
		}
		orders = null;
		return orderVos;
	}
	
	private List<OrderVo> listOrderVos2(MerchantOrderExample example) {
		List<MerchantOrder> orders = orderMapper.selectByExample(example);
		List<OrderVo> orderVos = new ArrayList<>();
		for (MerchantOrder merchantOrder : orders) {
			OrderVo orderVo = new OrderVo();
			BeanUtils.copyProperties(merchantOrder, orderVo);
			OrderStatus orderStatus = OrderStatus.lookup(merchantOrder.getOrderStatus());
			if(orderStatus != null) {
				orderVo.setOrderStatusName(orderStatus.getName());
			} else {
				orderVo.setOrderStatusName("未知状态");
			}
			if(merchantOrder.getPayMethod() != null) {
				PayMethod payMethodEnum = PayMethod.lookup(merchantOrder.getPayMethod());
				if(payMethodEnum != null) {
					orderVo.setPayMethodName(payMethodEnum.getName());
				} else {
					StringBuilder payMethodNameSB = new StringBuilder();
					//可能是关联了前台扫码支付多笔支付单
					String[] payMethods = YdpUtils.converString2Array(String.valueOf(merchantOrder.getPayMethod()));
					for (String s : payMethods) {
						payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
						payMethodNameSB.append(payMethodEnum.getName()).append(",");
					}
					orderVo.setPayMethodName(payMethodNameSB.toString());
				}
			}
			orderVos.add(orderVo);
		}
		orders = null;
		return orderVos;
	}
	
	/**
	 * 客户扫二维码支付时候，根据桌台编号查询未支付的订单
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	private List<OrderVo> listNoPaymentOrderVo(String orderNo, int mid) {
		MerchantOrderExample example = new MerchantOrderExample();
//		example.setOrderByClause(" order_time asc ");
		List<String> status = new ArrayList<>();
		status.add(Constants.ORDER_STATUS_NO_PAYMENT);
		example.createCriteria().andOrderStatusIn(status).andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		List<OrderVo> orderVos = listOrderVos(example);
		return orderVos;
	}
	
//	/**
//	 * 查询商家历史订单(不包括订单项vo)
//	 * 历史订单 需要查历史表
//	 * @param mid
//	 * @return
//	 */
//	@SuppressWarnings("rawtypes")
//	@Override
//	public PageBean<MerchantOrder> listOrderVo(int mid, int pageNum, int pageSize) {
//		PageBean<MerchantOrder> pageBean = new PageBean<MerchantOrder>();
//		MerchantOrderExample example = new MerchantOrderExample();
//		example.setOrderByClause(" order_time desc ");
//		example.createCriteria().andOrderStatusEqualTo(Constants.ORDER_STATUS_NO_PAYMENT)
//			.andMerchantIdEqualTo(mid);
//		Page page = PageHelper.startPage(pageNum, pageSize);
//		List<MerchantOrder> orders = orderMapper.selectByExample(example);
//		pageBean.setCurrentPage(pageNum);
//		pageBean.setPageSize(pageSize);
//		pageBean.setTotalNum(page.getTotal());
//		pageBean.setItems(orders);
//		return pageBean;
//	}
	
	/**
	 * 查询订单明细
	 * @param orderId
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantOrderItem> listOrderItem(int orderId, int mid) {
		MerchantOrderItemExample example = new MerchantOrderItemExample();
		example.setOrderByClause(" id asc ");
		example.createCriteria().andOrderIdEqualTo(orderId).andMerchantIdEqualTo(mid);
		return orderItemMapper.selectByExample(example);
	}
	
	/**
	 * 订单项退单
	 * @param orderno
	 * @param itemId
	 * @param mid
	 * @return
	 */
	@Override
	public int cancelOrderItem(String orderNo, int orderItemId, int mid) throws YdpException {
		int result = orderItemMapper.cancelOrderItem(orderNo, orderItemId, mid);
		if(result == 1) {//防止重复取消
			//修改一下订单总金额, 减去退单的订单项金额
//			orderMapper.updateOrderPrice(orderNo, orderItemId, mid);
			orderMapper.updateOrderPrice(orderNo, mid);
		} else {
			throw new YdpException("该单已退,无法重复退单");
		}
		return result;
	}
	
	/**
	 *  删除订单项
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public int deleteOrderItem(String orderNo, Integer id, int mid) throws YdpException {
		int result = orderItemMapper.deleteOrderItem(orderNo, id, mid);
		if(result == 1) {
			//只有先取消订单项之后才能删除订单项
			orderMapper.updateOrderPrice(orderNo, mid);
		} else {
			throw new YdpException("请先取消该单在删除");
		}
		return result;
	}
	
	/**
	 * 关闭订单项
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public int closeOrderItem(String orderNo, Integer id, int mid) throws YdpException {
		int result = orderItemMapper.closeOrderItem(orderNo, id, mid);
		if(result == 1) {
			//只有先取消订单项之后才能删除订单项
			orderMapper.updateOrderPrice(orderNo, mid);
		} else {
			throw new YdpException("请先取消该单在删除");
		}
		return result;
	}
	
	/**
	 *  标记订单项为已出菜
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public int shippedOrderItem(String orderNo, Integer id, int mid) throws YdpException {
		int result = orderItemMapper.shippedOrderItem(orderNo, id, mid);
		if(result == 1) {
			return result;
		} else {
			throw new YdpException("订单项状态异常");
		}
	}
	
	/**
	 * 标记订单项为已上菜
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	@Override
	public int receiveOrderItem(String orderNo, Integer id, int mid) throws YdpException {
		int result = orderItemMapper.receiveOrderItem(orderNo, id, mid);
		if(result == 1) {
			return result;
		} else {
			throw new YdpException("订单项状态异常");
		}
	}
	
	/**
	 * 支付宝\微信
	 * 订单支付成功
	 * @param outTradeNo 就是我们的支付单号
	 */
	@Override
	public int paySuccess(String tradeNo, String outTradeNo, BigDecimal payAmount, Date payTime, 
			Integer merchantId, boolean isMergedOrder, Integer payMethod, String code) throws YdpException, PaymentException {
		//根据支付单号查询出订单号或者合并订单号
		MerchantPayOrder payOrder = payOrderService.getByOrderNo(outTradeNo, merchantId);
		if(payOrder == null) {
			throw new YdpException("处理支付通知失败,未找到支付单");
		}
		//支付单支付成功
		payOrderMapper.paySuccess(tradeNo, outTradeNo, merchantId, payAmount, payTime, payMethod, code);
		//会员累计积分
		memberUserService.moblieAddPoint(payMethod, code, payAmount, merchantId);
		if(!StringUtils.isEmpty(payOrder.getParentOrderNo())) {
			payOrderHisMapper.insertFromPayOrderByOrderNo(payOrder.getParentOrderNo(), merchantId);
			payOrderMapper.deleteByParentOrderNo(payOrder.getParentOrderNo(), merchantId);
		} else {
			payOrderHisMapper.insertFromPayOrderByoutTradeNo(payOrder.getParentOutTradeNo(), merchantId);
			payOrderMapper.deleteByParentOutTradeNo(payOrder.getParentOutTradeNo(), merchantId);
		}
		String orderNoOrOutTradeNo = payOrder.getParentOrderNo() == null ? payOrder.getParentOutTradeNo() : payOrder.getParentOrderNo();
		//1、移动支付日志流水
		MerchantPayLog payLog = new MerchantPayLog();
		payLog.setPayMethod(payMethod);
		payLog.setPayAmount(payAmount);
		payLog.setPayNo(tradeNo);
		payLog.setPayTime(payTime);
		payLog.setLogSource(1);//正常
		payLog.setLogType(1);//支付流水
		payLog.setOrderNo(outTradeNo);//商家的订单号(用餐订单号或者合并订单号)
		payLog.setRemark("桌台扫码支付");
		payLogService.save(payLog, merchantId);	
		
		//2、处理订单
		Date now = new Date();//当前时间
		//获取商家是否可以同时享受现金券与优惠
		String configValue = configService.getByCode(Constants.ENABLED_SUBTRACT_COUPON, merchantId);
		boolean enabledSC = configValue == null ? false : "1".equals(configValue);
		//发消息给商家客户端,哪个桌台扫码付款了
		JSONArray tableCodes = new JSONArray();
		//发消息给商家客户端,哪个桌台用餐订单扫码付款了
		JSONArray orderNos = new JSONArray();
		//合并单支付
		if(isMergedOrder) {
			MerchantOrderExample orderExample = new MerchantOrderExample();
			orderExample.createCriteria().andOrderStatusEqualTo(Constants.ORDER_STATUS_NO_PAYMENT)
				.andOutTradeNoEqualTo(orderNoOrOutTradeNo).andMerchantIdEqualTo(merchantId);
			List<MerchantOrder> orders = orderMapper.selectByExample(orderExample);
			//没有需要支付的订单
			if(orders.isEmpty()) {
				throw new YdpException("没有需要支付的订单");
			}
			
			//3、收银流水(桌台扫码支付自动收银)
			MerchantCashierLog cashierLog = new MerchantCashierLog();
			cashierLog.setCashierMethod(payMethod);
			cashierLog.setCashierType(1);//收款
			cashierLog.setCashierSource(1);//正常收款
			cashierLog.setRemark("桌台扫码支付,系统自动收银");//退款原因
			cashierLog.setOperationStaff("系统");//操作员
			cashierLog.setCashierTime(now);
			
			MerchantOrder otherUpdaterOrder = new MerchantOrder();//更新订单
			otherUpdaterOrder.setEndTime(now);
			BigDecimal otherOrderTotalPrice = new BigDecimal("0");
			for (int i = 0; i < orders.size(); i++) {
				MerchantOrder merchantOrder = orders.get(i);
				tableCodes.add(merchantOrder.getTableCode());
				orderNos.add(merchantOrder.getOrderNo());
				Map<String, Object> results = this.calOrderPrice(merchantOrder.getOrderNo(), merchantOrder.getTotalPrice(),
						merchantOrder.getOrderTime(), merchantId, enabledSC);
				String subtractTypeStr = (String) results.get("subtractTypeStr");
				BigDecimal subtractAmount = (BigDecimal) results.get("subtractAmount");
				String subtractRemark = (String) results.get("subtractRemark");
				otherUpdaterOrder.setOrderNo(merchantOrder.getOrderNo());
				otherUpdaterOrder.setPayMethod(payMethod);
				otherUpdaterOrder.setMerchantId(merchantId);
				otherUpdaterOrder.setSubtractType(StringUtils.isEmpty(subtractTypeStr) ? 0 : Integer.parseInt(subtractTypeStr));
				otherUpdaterOrder.setSubtractAmount(subtractAmount);
				otherUpdaterOrder.setSubtractRemark(subtractRemark);
				
				if(i == orders.size() - 1) {//最后一笔单实际支付金额
					BigDecimal lastPayPrice = payAmount.subtract(otherOrderTotalPrice);
					BigDecimal lastOrderPrice = merchantOrder.getTotalPrice().subtract(subtractAmount);
					if(lastPayPrice.compareTo(lastOrderPrice) == -1) {
						socketClient.callPaymentException(merchantId, tableCodes.toJSONString(), YdpUtils.dfNumberScale2(payAmount), 
								YdpUtils.dfNumberScale2(otherOrderTotalPrice.add(lastOrderPrice)));//发送支付异常通知
						throw new PaymentException("实际支付金额小于总订单金额");
					}
					otherUpdaterOrder.setPayPrice(lastPayPrice);
				} else {
					otherUpdaterOrder.setPayPrice(merchantOrder.getTotalPrice().subtract(subtractAmount));
					otherOrderTotalPrice = otherOrderTotalPrice.add(otherUpdaterOrder.getPayPrice());
				}
				otherUpdaterOrder.setPayNo(tradeNo);//支付宝或微信交易号
				int result = orderMapper.paySuccess(otherUpdaterOrder);//更改订单状态（支付成功）
				if(result == 0) {//受影响行数=0,未修改任何记录
					throw new YdpException("订单状态异常:不是待支付状态");
				}
				//消费现金券
				if(subtractTypeStr.indexOf("3") > -1) {
					couponConsumeService.paySuccess(merchantOrder.getOrderNo(), merchantId);//现金券抵扣成功
				}
				cashierLog.setCashierAmount(merchantOrder.getTotalPrice().subtract(subtractAmount));
				cashierLog.setTableCode(merchantOrder.getTableCode());
				cashierLog.setOrderNo(merchantOrder.getOrderNo());
				cashierLogService.save(cashierLog, merchantId);
			}
		} else {
			MerchantOrder order = orderMapper.selectByOrderNo(orderNoOrOutTradeNo, merchantId);
			//待支付订单
			if(order == null || !order.getOrderStatus().equals(Constants.ORDER_STATUS_NO_PAYMENT)) {
				throw new YdpException("没有需要支付的订单");
			} else {
				tableCodes.add(order.getTableCode());
				orderNos.add(order.getOrderNo());
				//3、收银流水(桌台扫码支付自动收银)
				MerchantCashierLog cashierLog = new MerchantCashierLog();
				cashierLog.setCashierMethod(payMethod);
				cashierLog.setCashierType(1);//收款
				cashierLog.setCashierSource(1);//正常收款
				cashierLog.setRemark("桌台扫码支付,系统自动收银");//退款原因
				cashierLog.setOperationStaff("系统");//操作员
				cashierLog.setCashierTime(now);
				cashierLog.setCashierAmount(payAmount);
				cashierLog.setTableCode(order.getTableCode());
				cashierLog.setOrderNo(order.getOrderNo());
				cashierLogService.save(cashierLog, merchantId);
				
				//更新订单
				MerchantOrder updaterOrder = new MerchantOrder();
				updaterOrder.setEndTime(now);
				Map<String, Object> results = this.calOrderPrice(order.getOrderNo(), order.getTotalPrice(),
						order.getOrderTime(), merchantId, enabledSC);
				String subtractTypeStr = (String) results.get("subtractTypeStr");
				BigDecimal subtractAmount = (BigDecimal) results.get("subtractAmount");
				String subtractRemark = (String) results.get("subtractRemark");
				updaterOrder.setOrderNo(orderNoOrOutTradeNo);
				updaterOrder.setPayMethod(payMethod);
				updaterOrder.setMerchantId(merchantId);
				updaterOrder.setSubtractType(StringUtils.isEmpty(subtractTypeStr) ? 0 : Integer.parseInt(subtractTypeStr));
				updaterOrder.setSubtractAmount(subtractAmount);
				updaterOrder.setSubtractRemark(subtractRemark);
				BigDecimal orderPrice = order.getTotalPrice().subtract(subtractAmount);
				if(payAmount.compareTo(orderPrice) == -1) {
					socketClient.callPaymentException(merchantId, tableCodes.toJSONString(), YdpUtils.dfNumberScale2(payAmount), 
							YdpUtils.dfNumberScale2(orderPrice));//发送支付异常通知
					throw new PaymentException("实际支付金额小于总订单金额");
				}
				updaterOrder.setPayPrice(payAmount);
				updaterOrder.setPayNo(tradeNo);//支付宝或微信交易号
				int result = orderMapper.paySuccess(updaterOrder);//更改订单状态（支付成功）
				if(result == 0) {//受影响行数=0,未修改任何记录
					throw new YdpException("订单状态异常:不是待支付状态");
				}
				if(subtractTypeStr.indexOf("3") > -1) {
					couponConsumeService.paySuccess(orderNoOrOutTradeNo, merchantId);//现金券抵扣成功
				}
			}
		}
		
//		throw new Exception("哈哈哈哈,测试记录支付流水异常");
		//4、发送支付通知
		socketClient.callPaymentFinished(merchantId, tableCodes, payAmount.toString(), orderNos);//发送支付成功通知
		return 0;
	}
	
	/**
	 * 同步支付宝或者微信支付结果
	 * @param tradeNo
	 * @param orderNo 如果是单个订单付款就是订单号，如果是合并付款就是outTradeNo
	 * @param mid
	 * @param tableCode
	 */
	@Override
	public int syncPaymentResult(String tradeNo, MerchantOrder order, Integer merchantId, BigDecimal payAmount,
			Date payTime, String username, Integer payMethod) throws YdpException, PaymentException {
		
		String orderNo = order.getOrderNo();
		Date now = new Date();
		String configValue = configService.getByCode(Constants.ENABLED_SUBTRACT_COUPON, merchantId);
		boolean enabledSC = configValue == null ? false : "1".equals(configValue);
		if(order != null && StringUtils.isEmpty(order.getOutTradeNo())) {//单个订单收款
			if(Constants.ORDER_STATUS_LOCKED.equals(order.getOrderStatus())
					|| Constants.ORDER_STATUS_NO_PAYMENT.equals(order.getOrderStatus())
					|| Constants.ORDER_STATUS_DEPOSIT.equals(order.getOrderStatus())) {
				MerchantOrder updaterOrder = new MerchantOrder();
				//计算优惠规则、现金券等
				Map<String, Object> results = this.calOrderPrice(order.getOrderNo(), order.getTotalPrice(),
						order.getOrderTime(), merchantId, enabledSC);
				String subtractTypeStr = (String) results.get("subtractTypeStr");
				BigDecimal subtractAmount = (BigDecimal) results.get("subtractAmount");
				String subtractRemark = (String) results.get("subtractRemark");
				BigDecimal totalAmount = order.getTotalPrice().subtract(subtractAmount);
				if(totalAmount.compareTo(payAmount) != 0) {//需要支付的钱!=实际支付的钱
					throw new PaymentException("支付出现了异常,需要支付金额￥" + YdpUtils.dfNumberScale2(totalAmount) + ",顾客实际支付金额￥" + payAmount + "");
				}
				if(StringUtils.isEmpty(subtractTypeStr)) {
					updaterOrder.setSubtractType(0);
				} else {
					updaterOrder.setSubtractType(Integer.parseInt(subtractTypeStr));
				}
				updaterOrder.setSubtractAmount(subtractAmount);
				updaterOrder.setSubtractRemark(subtractRemark);
				//支付日志流水
				MerchantPayLog payLog = new MerchantPayLog();
				payLog.setOrderNo(orderNo);
				payLog.setPayMethod(payMethod);
				payLog.setPayAmount(payAmount);
				payLog.setPayNo(tradeNo);
				payLog.setPayTime(payTime);
				payLog.setLogSource(2);//异常
				payLog.setLogType(1);//收款流水
				payLog.setRemark("查询一次支付宝或者微信支付结果");
				payLogService.save(payLog, merchantId);
				
//				orderItemMapper.paySuccess(orderNo, merchantId);//更改订单项状态(支付成功)
				if(String.valueOf(updaterOrder.getSubtractType().intValue()).indexOf("3") > -1) {
					couponConsumeService.paySuccess(orderNo, merchantId);//现金券抵扣成功
				}
				updaterOrder.setOrderNo(orderNo);
				updaterOrder.setEndTime(now);
				updaterOrder.setPayNo(tradeNo);
				updaterOrder.setPayPrice(payAmount);
				updaterOrder.setPayMethod(payMethod);
				updaterOrder.setMerchantId(merchantId);
				orderMapper.paySuccess(updaterOrder);//更改订单状态（支付成功）
				
				//收款日志流水
				//3、收银流水(桌台扫码支付自动收银)
				MerchantCashierLog cashierLog = new MerchantCashierLog();
				cashierLog.setCashierMethod(payMethod);
				cashierLog.setCashierType(1);//收款
				cashierLog.setCashierSource(2);//异常收款
				cashierLog.setRemark("查询一次支付宝或者微信支付结果,系统自动收银");//退款原因
				cashierLog.setOperationStaff("系统");//操作员
				cashierLog.setCashierTime(now);
				cashierLog.setCashierAmount(payAmount);
				cashierLog.setTableCode(order.getTableCode());
				cashierLog.setOrderNo(order.getOrderNo());
				cashierLogService.save(cashierLog, merchantId);
				
				return 0;
			}
		} else {//合并订单收款
			MerchantOrderExample orderExmaple = new MerchantOrderExample();
			List<String> orderStatus = new ArrayList<>();
			orderStatus.add(Constants.ORDER_STATUS_NO_PAYMENT);
			orderStatus.add(Constants.ORDER_STATUS_DEPOSIT);
			orderExmaple.createCriteria().andOrderStatusIn(orderStatus).andOutTradeNoEqualTo(order.getOutTradeNo()).andMerchantIdEqualTo(merchantId);
			List<MerchantOrder> orders = orderMapper.selectByExample(orderExmaple);
			if(orders.size() == 0) {//没有需要支付的订单
				return 0;
			} else {
				//支付日志流水
				MerchantPayLog payLog = new MerchantPayLog();
				//
				BigDecimal totalAmount = new BigDecimal("0.00");
				BigDecimal subtractDB = new BigDecimal("0.00");
				MerchantOrder updaterOrder = new MerchantOrder();
				for(MerchantOrder mOrder : orders) {
					totalAmount = totalAmount.add(mOrder.getTotalPrice());
					updaterOrder.setOrderNo(mOrder.getOrderNo());
					updaterOrder.setMerchantId(merchantId);
					updaterOrder.setEndTime(now);
					updaterOrder.setPayNo(tradeNo);
					updaterOrder.setPayMethod(payMethod);
					Integer subtractTypeInt = 0;
					BigDecimal subtractAmount = new BigDecimal("0.00");
					String subtractRemark = null;
					//计算优惠规则、现金券等
					Map<String, Object> results = this.calOrderPrice(mOrder.getOrderNo(), mOrder.getTotalPrice(),
							mOrder.getOrderTime(), merchantId, enabledSC);
					String subtractTypeStr = (String) results.get("subtractTypeStr");
					subtractTypeInt = StringUtils.isEmpty(subtractTypeStr) ? 0 : Integer.parseInt(subtractTypeStr);
					BigDecimal subtractAmount_o = (BigDecimal) results.get("subtractAmount");
					subtractDB = subtractDB.add(subtractAmount_o);
					subtractAmount = subtractAmount.add(subtractAmount_o);//优惠金额 累积起来
					subtractRemark = (String) results.get("subtractRemark");
					
					updaterOrder.setPayPrice(mOrder.getTotalPrice().subtract(subtractAmount));
					updaterOrder.setSubtractType(subtractTypeInt);
					updaterOrder.setSubtractAmount(subtractAmount);
					updaterOrder.setSubtractRemark(subtractRemark);
//					orderItemMapper.paySuccess(mOrder.getOrderNo(), merchantId);//更改订单项状态(支付成功)
					if(String.valueOf(updaterOrder.getSubtractType().intValue()).indexOf("3") > -1) {
						couponConsumeService.paySuccess(mOrder.getOrderNo(), merchantId);//现金券抵扣成功
					}
					orderMapper.paySuccess(updaterOrder);//更改订单状态（支付成功）
					
					//收款日志流水
					//3、收银流水(桌台扫码支付自动收银)
					MerchantCashierLog cashierLog = new MerchantCashierLog();
					cashierLog.setCashierMethod(payMethod);
					cashierLog.setCashierType(1);//收款
					cashierLog.setCashierSource(2);//异常收款
					cashierLog.setRemark("查询一次支付宝或者微信支付结果,系统自动收银");//原因
					cashierLog.setOperationStaff("系统");//操作员
					cashierLog.setCashierTime(now);
					cashierLog.setCashierAmount(mOrder.getTotalPrice().subtract(subtractAmount));
					cashierLog.setTableCode(mOrder.getTableCode());
					cashierLog.setOrderNo(mOrder.getOrderNo());
					cashierLogService.save(cashierLog, merchantId);
				}
				totalAmount = totalAmount.subtract(subtractDB);
				if(totalAmount.compareTo(payAmount) != 0) {//需要支付的钱!=实际支付的钱
					throw new PaymentException("支付出现了异常,需要支付金额￥" + YdpUtils.dfNumberScale2(totalAmount) + ",顾客实际支付金额￥" + payAmount + "");
				}
				payLog.setOrderNo(order.getOutTradeNo());
				payLog.setPayMethod(payMethod);//支付宝扫码支付
				payLog.setPayAmount(payAmount);
				payLog.setPayNo(tradeNo);
				payLog.setPayTime(payTime);
				payLog.setLogSource(2);//异常
				payLog.setLogType(1);//收款流水
				payLog.setRemark("查询一次支付宝或者微信支付结果");
				payLogService.save(payLog, merchantId);
				return 0;
			}
		}
		return 0;
	}
	
	/**
	 * 合并桌台订单收款
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	@Override
	public int mergeOrder(String selectedOrderNo, String currOrderNo, int mid) throws YdpException {
		MerchantOrder currOrder = orderMapper.selectByOrderNo(currOrderNo, mid);
		List<String> orderNos = new ArrayList<>();
		orderNos.add(selectedOrderNo);
		String outTradeNo = currOrder.getOutTradeNo();
		if(StringUtils.isEmpty(outTradeNo)) {
			String merchantIdStr = YdpUtils.convertMechantId2Str(mid);
			outTradeNo = DateUtil.format(new Date(), DatePattern.PURE_DATETIME_MS_PATTERN) + merchantIdStr;
			orderNos.add(currOrderNo);
		}
		return orderMapper.mergeOrder(orderNos, outTradeNo, mid);
	}
	
	/**
	 * 将已合并的桌台订单拆分
	 * @param orderNos
	 * @param outTradeNo 当前桌台的合并号
	 * @param mid
	 * @return
	 */
	@Override
	public int forkOrder(String unSelectedOrderNo, String currOrderNo, int mid) throws YdpException {
		//如果当前桌台(outTradeNo)的所有合并数 === tableCode.size(), 表示解散改合并组, 全部将outTradeNo设置为null
		//如果当前桌台(outTradeNo)的所有合并数 > tableCode.size(), 表示tableCodes出组.
		MerchantOrder order = this.getByOrderNo(currOrderNo, mid);
		if(Constants.ORDER_STATUS_LOCKED.equals(order.getOrderStatus())) {
			throw new YdpException("该用餐订单处于支付异常状态，请处理。");
		}
		long count = orderMapper.countGroupSizeByOrderNo(currOrderNo, mid);
		List<String> orderNos = new ArrayList<>();
		orderNos.add(unSelectedOrderNo);
		if(count == 1) {
			orderNos.add(currOrderNo);
		}
		return orderMapper.forkOrder(orderNos, mid);
	}
	
	/**
	 * 工作台显示 未完成的订单
	 * @param tableCode
	 * @param merchantId
	 * @return
	 * @throws Exception 
	 */
	@Override
	public Map<String, Object> listNoCompleteOrderByTableCode(String tableCode, int merchantId) throws Exception {
		List<OrderVo> orderVos = listOrderVo(tableCode, merchantId);//当前桌台待确定、待支付、预支付订单
		if(orderVos.size() > 1) {
			throw new Exception("桌台编号: "+ tableCode + "存在多个待确定、待支付、已支付订单.请前面当前用餐订单处理。");
		}
		return calMerchantOrder(orderVos, merchantId);
	}
	
	/**
	 * 工作台显示 未完成的订单 （快餐厅版本）
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	@Override
	public Map<String, Object> listNoCompleteOrderByTableCodeKCT(String tableCode, int merchantId) throws Exception {
		List<OrderVo> orderVos = listOrderVo(tableCode, merchantId);//当前桌台待确定、待支付、预支付订单
		return calMerchantOrderKCT(orderVos, merchantId);
	}
	
	/**
	 * 界面显示订单明细(h5扫码支付、工作台订单详情)
	 * @param orderVos
	 * @param tableCode
	 * @param merchantId
	 * @return
	 * @throws YdpException
	 */
	private Map<String, Object> calMerchantOrder(List<OrderVo> orderVos, Integer merchantId) throws YdpException {
		Map<String, Object> results = new HashMap<String, Object>();
		Map<String, List<MerchantCouponConsume>> couponConsumeMap = new HashMap<>();
		Map<String, List<MerchantGoodsSubtractVo>> subtractVoMap = new HashMap<>();
		if(orderVos.size() == 1) {
			OrderVo orderVo = orderVos.get(0);
			if(!StringUtils.isEmpty(orderVo.getOutTradeNo())) {//属于合并订单,查询其它合并一起的订单
				MerchantOrderExample orderExample = new MerchantOrderExample();
				orderExample.createCriteria().andOrderNoNotEqualTo(orderVo.getOrderNo())
					.andOutTradeNoEqualTo(orderVo.getOutTradeNo()).andMerchantIdEqualTo(merchantId);
				List<OrderVo> otherOrderVos = listOrderVos(orderExample);
				orderVos.addAll(otherOrderVos);
			}
		}
		
		String configValue = configService.getByCode(Constants.ENABLED_SUBTRACT_COUPON, merchantId);
		boolean enabledSC = configValue == null ? false : "1".equals(configValue);
		
		BigDecimal totalAmountBD = new BigDecimal("0.00");
		for(OrderVo orderVo : orderVos) {
			BigDecimal orderTotalAmount = orderVo.getTotalPrice();
			//现金消费券
			List<MerchantCouponConsume> couponConsumes = couponConsumeService.list(orderVo.getOrderNo(), merchantId);
			//[减免、折扣与现金券是否同时享受]
			if(enabledSC || couponConsumes.isEmpty()) {
				//如果启用了优惠减免规则
				if("1".equals(configService.getByCode(Constants.ENABLED_GOODS_SUBTRACT, merchantId))) {
					//价格优惠规则
					List<MerchantGoodsSubtractVo> subtractVos = subtractService.listCurrentSubtract(orderVo.getTotalPrice(), 
							orderVo.getOrderTime(), merchantId);
					subtractVoMap.put(orderVo.getOrderNo(), subtractVos);
					for (MerchantGoodsSubtractVo subtractVo : subtractVos) {
						if(subtractVo.getType() == 1) {//具体减免金额
							orderTotalAmount = orderTotalAmount.subtract(subtractVo.getAmount1());
						} else if(subtractVo.getType() == 2) {//折扣率(先减了在折扣)
//								Float subtractV = ((100 - subtractVo.getDiscount().floatValue() * 10) / 100) * orderVo.getTotalPrice();
//							BigDecimal subtractV = orderVo.getTotalPrice().multiply(subtractVo.getDiscount().multiply(new BigDecimal("0.1")));
//							orderTotalAmount = subtractV;
							BigDecimal subtractV = orderTotalAmount.multiply(new BigDecimal("10").subtract(subtractVo.getDiscount()).multiply(new BigDecimal("0.1")));
							orderTotalAmount = orderTotalAmount.subtract(subtractV);
						}
					}
				}
			}
			//现金消费券
			couponConsumeMap.put(orderVo.getOrderNo(), couponConsumes);
			for (MerchantCouponConsume merchantCouponConsume : couponConsumes) {
				orderTotalAmount = orderTotalAmount.subtract(merchantCouponConsume.getCouponPrice());
			}
			//如果是已经支付的,直接相加订单的payPrice
			if(orderVo.getOrderStatus().equals(Constants.ORDER_STATUS_PAYMENT)) {
				totalAmountBD = totalAmountBD.add(orderVo.getPayPrice());
			} else {
				totalAmountBD = totalAmountBD.add(orderTotalAmount);
			}
		}
		results.put("orderVos", orderVos);
		if(couponConsumeMap != null) {
			results.put("couponConsumeMap", couponConsumeMap);
		}
		if(subtractVoMap != null) {
			results.put("subtractVoMap", subtractVoMap);
		}
		if(orderVos.size() > 0) {
			//减去异常订单已支付金额
			totalAmountBD = totalAmountBD.subtract(orderVos.get(0).getExceptionPrice());
		}
		//需要支付的金额
		results.put("payAmount", YdpUtils.dfNumberScale2(totalAmountBD));
		return results;
	}
	
	/**
	 * h5扫码支付 订单详情界面
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	@Override
	public Map<String, Object> listNoPaymentOrderByTableCode(String tableCode, Integer merchantId) throws Exception {
		MerchantOrderExample example = new MerchantOrderExample();
		example.setOrderByClause(" order_time asc ");
		List<String> status = new ArrayList<>();
		status.add(Constants.ORDER_STATUS_NO_PAYMENT);//未支付
		status.add(Constants.ORDER_STATUS_TOBECOMMIT);//待确认
		status.add(Constants.ORDER_STATUS_PAYMENT);//已支付
		example.createCriteria().andOrderStatusIn(status).andTableCodeEqualTo(tableCode).andMerchantIdEqualTo(merchantId);
		List<OrderVo> orderVos = listOrderVos(example);
		if(orderVos.size() > 1) {
			throw new Exception("桌台编号: "+ tableCode + "存在多个待确定、待支付、预支付、已支付订单.请联系下商家。");
		}
		return calMerchantOrder(orderVos, merchantId);
	}
	
	/**
	 * 服务员版app查询使用
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	@Override
	public Map<String, Object> listOrderByTableCode(String tableCode, Integer merchantId) throws Exception {
		List<OrderVo> orderVos = listOrderVo(tableCode, merchantId);//当前桌台待确定、待支付、预支付订单
		if(orderVos.size() == 1) {
			orderVos.get(0).setOutTradeNo(null);//改成null 就不会去查合并单了
		} else {
			return new HashMap<>();
		}
		return calMerchantOrder(orderVos, merchantId);
	}
	
	/**
	 * 计算订单匹配优惠规则和消费券之后的价格
	 * @param orderNo
	 * @param orderTotalPrice
	 * @param merchantId
	 * @return
	 */
	private Map<String, Object> calOrderPrice(String orderNo, BigDecimal orderTotalPrice, Date orderTime, Integer merchantId, boolean enabledSC) {
		Map<String, Object> results = new HashMap<>();
		String subtractTypeStr = "";
		StringBuilder subtractRemarkSB = new StringBuilder();
		BigDecimal subtractBD = new BigDecimal("0.00");
		//现金消费券
		List<MerchantCouponConsume> couponConsumes = couponConsumeService.list(orderNo, merchantId);
		//[减免、折扣与现金券是否同时享受]
		if(enabledSC || couponConsumes.isEmpty()) {
			//如果启用了优惠减免规则
			if("1".equals(configService.getByCode(Constants.ENABLED_GOODS_SUBTRACT, merchantId))) {
				//价格优惠规则
				List<MerchantGoodsSubtractVo> subtractVos = subtractService.listCurrentSubtract(orderTotalPrice, orderTime, merchantId);
				//可能有折上折
				BigDecimal new_orderTotalPrice = orderTotalPrice.multiply(new BigDecimal("1"));
				for (MerchantGoodsSubtractVo subtractVo : subtractVos) {
					if(subtractVo.getType() == 1) {//具体减免金额
						subtractTypeStr = "1";
						subtractBD = subtractBD.add(subtractVo.getAmount1());
						subtractRemarkSB.append(subtractVo.getRemark()).append("<br/>");
					} else if(subtractVo.getType() == 2) {//折扣率
						subtractTypeStr = "2";
	//					Float subtractV = ((100 - subtractVo.getDiscount().floatValue() * 10) / 100) * orderTotalPrice;
						BigDecimal subtractV = new_orderTotalPrice.multiply(new BigDecimal("10").subtract(subtractVo.getDiscount()).multiply(new BigDecimal("0.1")));
						new_orderTotalPrice = new_orderTotalPrice.subtract(subtractV);
						subtractBD = subtractBD.add(subtractV);
						subtractRemarkSB.append(subtractVo.getRemark()).append("<br/>");
					}
				}
			}
		}
		//只要有现金券就消费
		for (MerchantCouponConsume merchantCouponConsume : couponConsumes) {
			subtractTypeStr = "3";
			subtractBD = subtractBD.add(merchantCouponConsume.getCouponPrice());
			subtractRemarkSB.append("消费现金券￥").append(YdpUtils.dfNumberScale2(merchantCouponConsume.getCouponPrice())).append("<br/>");
		}
		results.put("subtractTypeStr", subtractTypeStr);
		results.put("subtractRemark", subtractRemarkSB.toString());
		results.put("subtractAmount", subtractBD);
		return results;
	}
	
	/**
	 * 界面收款
	 * @param orderNo
	 * @param payMethod
	 * @param mid
	 * @return
	 */
	@Override
	public Map<String, Object> gathering(String orderNo, Integer payMethod, BigDecimal payAmount, Integer merchantId, 
			String username, String remark) throws YdpException {
		Map<String, Object> returnMap = new HashMap<>();
		MerchantOrder order = orderMapper.selectByOrderNo(orderNo, merchantId);
		if(order == null) {
			throw new YdpException("未查找到收款订单");
		}
		returnMap.put("merchantOrder", order);
		//加上异常订单金额(异常金额如果是合并订单收款，每个订单的异常金额是一样的)
		payAmount = payAmount.add(order.getExceptionPrice());
		//如果有异常订单金额
		if(order.getPayMethod() != null) {
			StringBuilder sb = new StringBuilder();
			sb.append(order.getPayMethod()).append(payMethod);
			payMethod = Integer.valueOf(sb.toString());
		}
		//返回所有订单号
		JSONArray orderNos = new JSONArray();
		returnMap.put("orderNos", orderNos);
		orderNos.add(orderNo);
		String configValue = configService.getByCode(Constants.ENABLED_SUBTRACT_COUPON, merchantId);
		boolean enabledSC = configValue == null ? false : "1".equals(configValue);
		Date now = new Date();
		if(StringUtils.isEmpty(order.getOutTradeNo())) {//单个订单收款
			if(Constants.ORDER_STATUS_LOCKED.equals(order.getOrderStatus())
					|| Constants.ORDER_STATUS_NO_PAYMENT.equals(order.getOrderStatus())
					|| Constants.ORDER_STATUS_DEPOSIT.equals(order.getOrderStatus())) {
				//计算优惠规则、现金券等
				Map<String, Object> results = this.calOrderPrice(order.getOrderNo(), order.getTotalPrice(),
						order.getOrderTime(), merchantId, enabledSC);
				String subtractTypeStr = (String) results.get("subtractTypeStr");
				String subtractRemark = (String) results.get("subtractRemark");
				BigDecimal subtractAmount = (BigDecimal) results.get("subtractAmount");
//				orderItemMapper.paySuccess(orderNo, merchantId);//更改订单项状态(支付成功)
				if(subtractTypeStr.indexOf("3") > -1) {
					couponConsumeService.paySuccess(orderNo, merchantId);//现金券抵扣成功
				}
				MerchantOrder updaterOrder = new MerchantOrder();
				updaterOrder.setOrderNo(orderNo);
				updaterOrder.setMerchantId(merchantId);
				updaterOrder.setEndTime(now);
				updaterOrder.setPayPrice(payAmount);//收款金额
				updaterOrder.setPayMethod(payMethod);
				updaterOrder.setSubtractType(StringUtils.isEmpty(subtractTypeStr) ? 0 : Integer.valueOf(subtractTypeStr));
				updaterOrder.setSubtractAmount(subtractAmount);
				updaterOrder.setSubtractRemark(subtractRemark);
				updaterOrder.setRemark(remark);
				int result = orderMapper.paySuccess(updaterOrder);//更改订单状态（支付成功）
				if(result == 0) {
					throw new YdpException("订单状态异常,收银失败");
				}

				//3、收银流水(桌台扫码支付自动收银)
				MerchantCashierLog cashierLog = new MerchantCashierLog();
				cashierLog.setRemark(remark);
				cashierLog.setCashierMethod(payMethod);
				cashierLog.setCashierType(1);//收款
				cashierLog.setCashierSource(1);//正常收款
				cashierLog.setOperationStaff(username);//操作员
				cashierLog.setCashierTime(now);
				cashierLog.setCashierAmount(payAmount);
				cashierLog.setTableCode(order.getTableCode());
				cashierLog.setOrderNo(order.getOrderNo());
				cashierLogService.save(cashierLog, merchantId);
				
			}
		} else {//合并订单收款
			MerchantOrderExample orderExmaple = new MerchantOrderExample();
			List<String> orderStatus = new ArrayList<>();
			orderStatus.add(Constants.ORDER_STATUS_LOCKED);//支付异常锁定
			orderStatus.add(Constants.ORDER_STATUS_NO_PAYMENT);//待支付
			orderStatus.add(Constants.ORDER_STATUS_DEPOSIT);//预支付
			orderExmaple.createCriteria().andOrderStatusIn(orderStatus).andOutTradeNoEqualTo(order.getOutTradeNo()).andMerchantIdEqualTo(merchantId);
			List<MerchantOrder> orders = orderMapper.selectByExample(orderExmaple);
			if(orders.size() == 0) {//没有需要支付的订单
				throw new YdpException("未查找到收款订单");
			} else {
				MerchantOrder updaterOrder = new MerchantOrder();
				updaterOrder.setEndTime(now);
				updaterOrder.setPayMethod(payMethod);
				updaterOrder.setMerchantId(merchantId);
				BigDecimal totalPrice = new BigDecimal("0.00");
				
				//操作收款的订单
				MerchantOrder currOrder = new MerchantOrder();
				currOrder.setEndTime(now);
				currOrder.setPayMethod(payMethod);
				currOrder.setMerchantId(merchantId);
				
				//3、收银流水(桌台扫码支付自动收银)
				MerchantCashierLog cashierLog = new MerchantCashierLog();
				cashierLog.setCashierMethod(payMethod);
				cashierLog.setCashierType(1);//收款
				cashierLog.setCashierSource(1);//正常
				cashierLog.setOperationStaff(username);//操作员
				cashierLog.setCashierTime(now);
				
				MerchantCashierLog currCashierLog = new MerchantCashierLog();
				currCashierLog.setCashierMethod(payMethod);
				currCashierLog.setCashierType(1);//收款
				currCashierLog.setCashierSource(1);//正常
				currCashierLog.setOperationStaff(username);//操作员
				currCashierLog.setCashierTime(now);
				
				for(int i = 0; i < orders.size(); i++) {
					MerchantOrder mOrder = orders.get(i);
					orderNos.add(mOrder.getOrderNo());
					BigDecimal orderPirce = mOrder.getTotalPrice();
					//计算优惠规则、现金券等
					Map<String, Object> results = this.calOrderPrice(mOrder.getOrderNo(), mOrder.getTotalPrice(),
							mOrder.getOrderTime(), merchantId, enabledSC);
					String subtractTypeStr = (String) results.get("subtractTypeStr");
					BigDecimal subtractAmount = (BigDecimal) results.get("subtractAmount");
					String subtractRemark = (String) results.get("subtractRemark");
					Integer subtractTypeInt = StringUtils.isEmpty(subtractTypeStr) ? 0 : Integer.parseInt(subtractTypeStr);
					
					if(mOrder.getOrderNo().equals(orderNo)) {
						//实际支付金额-其他订单金额总和
						currOrder.setOrderNo(orderNo);
						currOrder.setSubtractType(subtractTypeInt);
						currOrder.setSubtractAmount(subtractAmount);
						currOrder.setSubtractRemark(subtractRemark);
						
						currCashierLog.setTableCode(mOrder.getTableCode());
						currCashierLog.setOrderNo(mOrder.getOrderNo());
						continue;
					} else {
						updaterOrder.setOrderNo(mOrder.getOrderNo());
						updaterOrder.setSubtractType(subtractTypeInt);
						updaterOrder.setSubtractAmount(subtractAmount);
						updaterOrder.setSubtractRemark(subtractRemark);
						updaterOrder.setPayPrice(orderPirce.subtract(subtractAmount));
						
						cashierLog.setRemark("订单收款");
						cashierLog.setCashierAmount(orderPirce.subtract(subtractAmount));
						cashierLog.setTableCode(mOrder.getTableCode());
						cashierLog.setOrderNo(mOrder.getOrderNo());
						cashierLogService.save(cashierLog, merchantId);
					}
					totalPrice = totalPrice.add(orderPirce).subtract(subtractAmount);
					orderMapper.paySuccess(updaterOrder);//更改订单状态（支付成功）
//					orderItemMapper.paySuccess(mOrder.getOrderNo(), merchantId);//更改订单项状态(支付成功)
					if(subtractTypeStr.indexOf("3") > -1) {
						couponConsumeService.paySuccess(mOrder.getOrderNo(), merchantId);//现金券抵扣成功
					}
				}
				//当前收款订单
				currOrder.setPayPrice(payAmount.subtract(totalPrice));
				currOrder.setRemark(remark);
				orderMapper.paySuccess(currOrder);//更改订单状态（支付成功）
//				orderItemMapper.paySuccess(currOrder.getOrderNo(), merchantId);//更改订单项状态(支付成功)
				if(String.valueOf(currOrder.getSubtractType().intValue()).indexOf("3") > -1) {
					couponConsumeService.paySuccess(currOrder.getOrderNo(), merchantId);//现金券抵扣成功
				}
				
				//当前收款订单 收款流水
				currCashierLog.setRemark(remark);
				currCashierLog.setCashierAmount(payAmount.subtract(totalPrice));
				cashierLogService.save(currCashierLog, merchantId);
			}
		}
		return returnMap;
	}
	
	/**
	 * 桌台扫码支付的时候结算需要支付多少钱
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	@Override
	public Map<String, Object> callPaymentByOrderNo(String orderNo, Integer merchantId) throws YdpException {
		Map<String, Object> returnMap = new HashMap<>();
		List<OrderVo> orderVos = this.listNoPaymentOrderVo(orderNo, merchantId);
		if(orderVos.size() == 0) {
			throw new YdpException("没有需要支付的订单.");
		}
		OrderVo currOrderVo = orderVos.get(0);
		//创建一个支付单
		MerchantPayOrder payOrder = new 	MerchantPayOrder();
		String payOrderNo = UUID.randomUUID().toString().replaceAll("-", "");
		payOrder.setOrderNo(payOrderNo);
//		String outTradeNo = null;
		//以第一个订单 也就是当前桌台的订单号做支付宝的outTradeNo
		if(!StringUtils.isEmpty(currOrderVo.getOutTradeNo())) {//属于合并订单,查询其它合并一起的订单
			MerchantOrderExample orderExample = new MerchantOrderExample();
			orderExample.createCriteria().andOrderNoNotEqualTo(currOrderVo.getOrderNo())
				.andOutTradeNoEqualTo(currOrderVo.getOutTradeNo()).andMerchantIdEqualTo(merchantId);
			List<OrderVo> otherOrderVos = listOrderVos(orderExample);
			orderVos.addAll(otherOrderVos);
			payOrder.setParentOutTradeNo(currOrderVo.getOutTradeNo());
//			outTradeNo = currOrderVo.getOutTradeNo();
			returnMap.put("mergedOrder", 1); //是合并单
		} else {
			payOrder.setParentOrderNo(currOrderVo.getOrderNo());
//			outTradeNo = currOrderVo.getOrderNo();
			returnMap.put("mergedOrder", 0);//不是合并单
		}
		//是否可以同时享受 优惠 与 现金券
		String configValue = configService.getByCode(Constants.ENABLED_SUBTRACT_COUPON, merchantId);
		boolean enabledSC = configValue == null ? false : "1".equals(configValue);
		//计算订单支付总价
		BigDecimal totalAmount = new BigDecimal("0.00");
		//减免金额合计
		BigDecimal subtractDB = new BigDecimal("0.00");
		//记录支付流水 的减免类型(1=减免具体金额，2=折扣率，3=消费现金优惠券, 12=减免与折扣......等等)
		for(OrderVo orderVo : orderVos) {
			BigDecimal orderPrice = orderVo.getTotalPrice();
			totalAmount = totalAmount.add(orderPrice);
			//计算优惠规则、现金券等
			Map<String, Object> results = this.calOrderPrice(orderVo.getOrderNo(), orderVo.getTotalPrice(),
					orderVo.getOrderTime(), merchantId, enabledSC);
			BigDecimal subtractAmount_o = (BigDecimal) results.get("subtractAmount");
			subtractDB = subtractDB.add(subtractAmount_o);//优惠金额 累积起来
			//更改支付单号
			orderMapper.updatePayOrderNo(orderVo.getId(), payOrderNo);
		}
		//多个订单 实际 合计支付金额
		totalAmount = totalAmount.subtract(subtractDB);
		payOrder.setOrderStatus(Constants.ORDER_STATUS_NO_PAYMENT);
		payOrder.setOrderPrice(totalAmount);
		payOrderService.save(payOrder, merchantId);
//		returnMap.put("outTradeNo", outTradeNo);
		returnMap.put("outTradeNo", payOrderNo);
		returnMap.put("totalAmount", YdpUtils.dfNumberScale2(totalAmount));
		return returnMap;
	}
	
	/**
	 * 用餐订单界面查询 按条件
	 * @param pageSize
	 * @param pageNum
	 * @param searchParams
	 * @param mid
	 * @return
	 */
	@Override
	public PageBean<OrderVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, int mid) {
		PageBean<OrderVo> pageBean = new PageBean<OrderVo>();
		MerchantOrderExample example = new MerchantOrderExample();
		example.setOrderByClause(" order_time desc ");
		MerchantOrderExample.Criteria criteria = example.createCriteria();
		if(!StringUtils.isEmpty(searchParams.get("tableCodes"))) {
			List<String> tableCodes = Arrays.asList(searchParams.get("tableCodes").split(","));
			if(tableCodes.size() > 1) {
				criteria.andTableCodeIn(tableCodes);
			} else {
				criteria.andTableCodeEqualTo(tableCodes.get(0));
			}
		}
//		String orderNo = searchParams.get("orderNo"); 
//		if(!StringUtils.isEmpty(orderNo)) {
//			criteria.andOrderNoEqualTo(orderNo);
//		}
		String orderStatus = searchParams.get("orderStatus");
		if(!StringUtils.isEmpty(orderStatus)) {
			criteria.andOrderStatusEqualTo(orderStatus);
		}
		String orderTimeStart = searchParams.get("orderTimeStart");
		String orderTimeEnd = searchParams.get("orderTimeEnd");
		criteria.andOrderTimeBetween(DateUtil.parse(orderTimeStart, DatePattern.NORM_DATETIME_MINUTE_PATTERN), 
				DateUtil.parse(orderTimeEnd, DatePattern.NORM_DATETIME_MINUTE_PATTERN));
		criteria.andMerchantIdEqualTo(mid);
		Page<OrderVo> page = PageHelper.startPage(pageNum, pageSize);
		List<MerchantOrder> orders = orderMapper.selectByExample(example);
		List<OrderVo> orderVos = new ArrayList<>();
		for (MerchantOrder order : orders) {
			OrderVo orderVo = new OrderVo();
			BeanUtils.copyProperties(order, orderVo);
			OrderStatus orderStatusEnum = OrderStatus.lookup(order.getOrderStatus());
			if(orderStatusEnum != null) {
				orderVo.setOrderStatusName(orderStatusEnum.getName());
			} else {
				orderVo.setOrderStatusName("未知状态");
			}
			if(order.getPayMethod() != null) {
				PayMethod payMethodEnum = PayMethod.lookup(order.getPayMethod());
				if(payMethodEnum != null) {
					orderVo.setPayMethodName(payMethodEnum.getName());
				} else {
					StringBuilder payMethodNameSB = new StringBuilder();
					//可能是关联了前台扫码支付多笔支付单
					String[] payMethods = YdpUtils.converString2Array(String.valueOf(order.getPayMethod()));
					for (String s : payMethods) {
						payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
						payMethodNameSB.append(payMethodEnum.getName()).append(",");
					}
					orderVo.setPayMethodName(payMethodNameSB.toString());
				}
			}
			orderVos.add(orderVo);
		}
		orders = null;
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(orderVos);
		return pageBean;
	}
	
	/**
	 * 用餐订单界面点+号查询订单明细
	 * @param orderId
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantOrderItem> listOrderItemByOrderId(Integer orderId, int mid) {
		MerchantOrderItemExample itemExample = new MerchantOrderItemExample();
		itemExample.createCriteria().andOrderIdEqualTo(orderId).andMerchantIdEqualTo(mid);
		List<MerchantOrderItem> orderItems = orderItemMapper.selectByExample(itemExample);
		return orderItems;
	}
	
	/**
	 * 修改备注信息
	 * @param orderId
	 * @param remark
	 * @param mid
	 * @return
	 */
	@Override
	public int modifyRemark(Integer orderId, String remark, int mid) {
		return orderMapper.modifyRemark(orderId, remark, mid);
	}
	
	/**
	 * 关联前台扫码支付单收款
	 * @param orderNo
	 * @param payOrderIds
	 * @param remark
	 */
	@Override
	public JSONArray relateFrontOrder(String orderNo, List<Integer> payOrderIds, String remark, String username, Integer merchantId) throws YdpException {
		MerchantPayOrderExample payOrderExample = new MerchantPayOrderExample();
		payOrderExample.createCriteria().andIdIn(payOrderIds).andMerchantIdEqualTo(merchantId);
		List<MerchantPayOrder> payOrders = payOrderMapper.selectByExample(payOrderExample);
		BigDecimal totalAmount = new BigDecimal("0.00");
		StringBuilder payMethodSB = new StringBuilder();
		for (MerchantPayOrder merchantPayOrder : payOrders) {
			if(merchantPayOrder.getOrderStatus().equals(Constants.ORDER_STATUS_NO_PAYMENT)) {
				throw new YdpException("关联失败.您勾选的支付单有未支付的,请重新选择");
			}
			totalAmount = totalAmount.add(merchantPayOrder.getPayPrice());
			payMethodSB.append(merchantPayOrder.getPayMethod());
			//会员累计积分
			if(Constants.ALIPAY_QRCODE_FRONT == merchantPayOrder.getPayMethod()) {
				memberUserService.moblieAddPoint(merchantPayOrder.getPayMethod(), merchantPayOrder.getAlipayUserid(), merchantPayOrder.getPayPrice(), merchantId);
			} else if(Constants.WECHAT_QRCODE_FRONT == merchantPayOrder.getPayMethod()) {
				memberUserService.moblieAddPoint(merchantPayOrder.getPayMethod(), merchantPayOrder.getWechatOpenId(), merchantPayOrder.getPayPrice(), merchantId);
			}
			
		}
		// 之前可能想的是 收款流水 不同于 支付流水
		Map<String, Object> resultMap = this.gathering(orderNo, Integer.valueOf(payMethodSB.toString()), totalAmount, 
				merchantId, username, remark);
		//多笔支付单 还是要分开记录支付流水 ,
//		MerchantOrder order = this.gathering(orderNo, Integer.valueOf(payMethodSB.toString()), totalAmount, 
//				merchantId, username, remark, true);
		//是合并单收款
		MerchantOrder order = (MerchantOrder) resultMap.get("merchantOrder");
		if(StringUtils.isEmpty(order.getOutTradeNo())) {
			payOrderMapper.relateFrontOrder(payOrderIds, orderNo, merchantId);
		} else {
			payOrderMapper.relateFrontOrderByOutTradeNo(payOrderIds, order.getOutTradeNo(), merchantId);
		}
		return (JSONArray) resultMap.get("orderNos");
	}
	
	/**
	 * 完成订单
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public List<String> finishedOrder(String orderNo, int mid) throws YdpException {
		List<String> tableCodes = new ArrayList<String>();
		MerchantOrder order = orderMapper.selectByOrderNo(orderNo, mid);
		if(order == null) {
			throw new YdpException("订单不存在");
		}
		//合并支付订单
		if(!StringUtils.isEmpty(order.getOutTradeNo())) {
			MerchantOrderExample orderExmaple = new MerchantOrderExample();
			orderExmaple.createCriteria().andOrderStatusEqualTo(Constants.ORDER_STATUS_PAYMENT)
				.andOutTradeNoEqualTo(order.getOutTradeNo()).andMerchantIdEqualTo(mid);
			List<MerchantOrder> orders = orderMapper.selectByExample(orderExmaple);
			for (MerchantOrder merchantOrder : orders) {
				int result = orderMapper.finishOrder(merchantOrder.getOrderNo(), mid);
				if(result == 0) {
					throw new YdpException("完成订单失败,请确认订单是否已支付");
				}
				orderItemMapper.finishOrder(merchantOrder.getOrderNo(), mid);
				orderHisService.insertFromOrder(merchantOrder.getOrderNo(), mid);//归档历史表
				if(order.getPayMethod() == Constants.ALIPAY_QRCODE_FRONT
						|| order.getPayMethod() == Constants.WECHAT_QRCODE_FRONT
						|| String.valueOf(order.getPayMethod()).indexOf("3") > -1 
						|| String.valueOf(order.getPayMethod()).indexOf("4") > -1) {
					payOrderHisMapper.insertFromPayOrderByoutTradeNo(merchantOrder.getOutTradeNo(), mid);
					payOrderMapper.deleteByParentOutTradeNo(merchantOrder.getOutTradeNo(), mid);
				}
				tableCodes.add(merchantOrder.getTableCode());
			}
		} else {
			int result = orderMapper.finishOrder(orderNo, mid);
			if(result == 0) {
				throw new YdpException("完成订单失败,请确认订单是否已支付");
			}
			orderItemMapper.finishOrder(orderNo, mid);
			if(order.getPayMethod() == Constants.ALIPAY_QRCODE_FRONT
					|| order.getPayMethod() == Constants.WECHAT_QRCODE_FRONT
					|| String.valueOf(order.getPayMethod()).indexOf("3") > -1 
					|| String.valueOf(order.getPayMethod()).indexOf("4") > -1) {
				payOrderHisMapper.insertFromPayOrderByOrderNo(orderNo, mid);
				payOrderMapper.deleteByParentOrderNo(orderNo, mid);
			}
			orderHisService.insertFromOrder(orderNo, mid);//归档历史表
		}		
		return tableCodes;
	}
	
	/**
	 * 取消订单(用餐订单界面)
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public int cancelOrder(String orderNo, int mid) throws YdpException {
		MerchantOrderItemExample example = new MerchantOrderItemExample();
		List<String> values = new ArrayList<String>();
//		values.add("4");//已出菜
		values.add("12");//已上菜
		values.add("9");//已退单
		example.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid)
		.andOrderItemStatusIn(values);
		long count = orderItemMapper.countByExample(example);
		if(count > 0) {
			throw new YdpException("无法取消已上过菜的用餐订单");
		}
		int result = orderMapper.cancelOrder(orderNo, mid);
		if(result == 0) {
			throw new YdpException("只能取消待确认与待支付的用餐订单");
		}
		return result;
	}
	

	/**
	 * 删除订单(用餐订单界面)
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public int deleteOrder(String orderNo, int mid) throws YdpException {
		int result = orderMapper.deleteOrder(orderNo, mid);
		if(result == 0) {
			throw new YdpException("只能删除已取消的用餐订单");
		}
		orderItemMapper.deleteOrderItemByOrderNo(orderNo, mid);
		return result;
	}
	
	/**
	 * 查询当前桌台是否有未完成的订单,提示用户
	 * 界面将桌台状态设置为空闲时需要校验一下
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	@Override
	public long countOrderByTableCode(String tableCode, int merchantId) {
		long count = orderMapper.countByTableCode(tableCode, merchantId);
		return count;
	}
	
	/**
	 * 复制其它桌台订单下单
	 * @param sourceTableCode
	 * @param targetTableCode
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	public int copyOrder(String sourceTableCode, String targetTableCode, int mid, String username) throws YdpException {
		
		MerchantOrderExample countExample = new MerchantOrderExample();
		countExample.createCriteria().andTableCodeEqualTo(targetTableCode).andMerchantIdEqualTo(mid);
		long count = orderMapper.countByExample(countExample);		
		if(count > 0) {
			throw new YdpException("该桌台已下单");
		}
		
		MerchantOrderExample example = new MerchantOrderExample();
		example.createCriteria().andTableCodeEqualTo(sourceTableCode).andMerchantIdEqualTo(mid);
		List<MerchantOrder> orders = orderMapper.selectByExample(example);
		Date now = new Date();
		for (MerchantOrder merchantOrder : orders) {
			MerchantOrder order = new MerchantOrder();
			String orderNo = generateOrderNo(1, merchantOrder.getOrderMethod(), mid, targetTableCode, now);
			order.setOrderNo(orderNo);
			order.setMerchantId(mid);// 商家ID			
			order.setOrderTime(now);// 下单时间
			order.setMemberId(merchantOrder.getMemberId());// 用户id
			order.setDinersNum(merchantOrder.getDinersNum());//用餐人数
			order.setOrderChannel(merchantOrder.getOrderChannel());
			order.setOrderMethod(merchantOrder.getOrderMethod());// 1=小程序扫码下单,2=服务员版app下单,3=桌面版app下单,4=小程序预定下单
			//2=服务员版app下单,3=桌面版app下单
			order.setOrderStatus(Constants.ORDER_STATUS_NO_PAYMENT); // 待支付
			order.setTableCode(targetTableCode);
			order.setCreateUser(username);// 下单人(或订单确认人)
			order.setTotalPrice(merchantOrder.getTotalPrice());
			order.setCreateTime(now);// 记录创建时间
			orderMapper.insertSelective(order);
			MerchantOrderItemExample itemExample = new MerchantOrderItemExample();
			itemExample.createCriteria().andOrderIdEqualTo(merchantOrder.getId()).andMerchantIdEqualTo(mid);
			List<MerchantOrderItem> orderItems = orderItemMapper.selectByExample(itemExample);
			List<MerchantOrderItem> records = new ArrayList<>();
			for (MerchantOrderItem merchantOrderItem : orderItems) {
				MerchantOrderItem orderItem = new MerchantOrderItem();
				BeanUtils.copyProperties(merchantOrderItem, orderItem);
				orderItem.setOrderId(order.getId());
				orderItem.setOrderNo(orderNo);
				orderItem.setOrderItemStatus(order.getOrderStatus());
				records.add(orderItem);
				//减库存
				goodsService.subInventory(merchantOrderItem.getGoodsId(), merchantOrderItem.getGoodsName(),
						merchantOrderItem.getNum(), mid);
			}
			orderItemMapper.insertBatch(records);
		}
		return 0;
	}
	
	/**
	 * 会员消费
	 * @param phone
	 * @param username
	 * @param mid
	 * @return
	 */
	@Override
	public int memberConsume(String orderNo, String phone, String username, Integer mid, String remark) throws YdpException {
		Map<String, Object> members = memberService.selectDetailByPhone(phone, mid);
		MemberUser memberUser = (MemberUser) members.get("memberUser");
		MemberAccount memberAccount = (MemberAccount) members.get("memberAccount");
		MerchantOrder order = orderMapper.selectByOrderNo(orderNo, mid);
		if(order == null) {
			throw new YdpException("未查找到收款订单");
		}
		if(Constants.ORDER_STATUS_LOCKED.equals(order.getOrderStatus())) {
			throw new YdpException("支付异常单无法会员消费");
		}
		String configValue = configService.getByCode(Constants.ENABLED_SUBTRACT_COUPON, mid);
		boolean enabledSC = configValue == null ? false : "1".equals(configValue);
		Date now = new Date();
		if(StringUtils.isEmpty(order.getOutTradeNo())) {//单个订单收款
			if(Constants.ORDER_STATUS_NO_PAYMENT.equals(order.getOrderStatus())
					|| Constants.ORDER_STATUS_DEPOSIT.equals(order.getOrderStatus())) {
				//计算优惠规则、现金券等
				BigDecimal payAmount = null;
				Map<String, Object> results = this.calOrderPrice(order.getOrderNo(), order.getTotalPrice(),
						order.getOrderTime(), mid, enabledSC);
				String subtractTypeStr = (String) results.get("subtractTypeStr");
				String subtractRemark = (String) results.get("subtractRemark");
				BigDecimal subtractAmount = (BigDecimal) results.get("subtractAmount");
				payAmount = order.getTotalPrice().subtract(subtractAmount);
//				BigDecimal accountBalance = memberService.subAccountBalance(memberAccount.getMemberId(), mid, payAmount, username);
				Map<String, Object> memberResults = memberService.subAccountBalance(memberAccount.getMemberId(), mid, payAmount, username);;
				BigDecimal accountBalance = (BigDecimal) memberResults.get("accountBalance");
				Integer pointBalance = (Integer) memberResults.get("pointBalance");
				if(subtractTypeStr.indexOf("3") > -1) {
					couponConsumeService.paySuccess(orderNo, mid);//现金券抵扣成功
				}
				MerchantOrder updaterOrder = new MerchantOrder();
				updaterOrder.setOrderNo(orderNo);
				updaterOrder.setMerchantId(mid);
				updaterOrder.setEndTime(now);
				updaterOrder.setMemberId(memberUser.getId());
				updaterOrder.setPayPrice(payAmount);//收款金额
				updaterOrder.setPayMethod(PayMethod.VIP.getValue());//会员消费
				updaterOrder.setSubtractType(StringUtils.isEmpty(subtractTypeStr) ? 0 : Integer.valueOf(subtractTypeStr));
				updaterOrder.setSubtractAmount(subtractAmount);
				updaterOrder.setSubtractRemark(subtractRemark);
				updaterOrder.setRemark(remark);
				orderMapper.paySuccess(updaterOrder);//更改订单状态（支付成功）

				//3、收银流水(桌台扫码支付自动收银)
				MerchantCashierLog cashierLog = new MerchantCashierLog();
				cashierLog.setRemark(remark);
				cashierLog.setCashierMethod(PayMethod.VIP.getValue());//会员消费
				cashierLog.setCashierType(1);//收款
				cashierLog.setCashierSource(1);//正常收款
				cashierLog.setOperationStaff(username);//操作员
				cashierLog.setCashierTime(now);
				cashierLog.setCashierAmount(payAmount);
				cashierLog.setTableCode(order.getTableCode());
				cashierLog.setOrderNo(order.getOrderNo());
				cashierLogService.save(cashierLog, mid);
				try {
					boolean isExperienceAccount = false;
					if(!StringUtils.isEmpty(username)) {
						if(username.indexOf(":") > -1) {
							username = username.split(":")[0];
						}
						if(account.getAccounts().contains(username)) {
							isExperienceAccount = true;
						}
					}
					if(!isExperienceAccount) {
						//消费短信通知
						MerchantSMSSign smsSign = smsSignService.selectStatus0ByMid(mid);
						JSONObject templateParam = new JSONObject();
						templateParam.put("rechargePrice", YdpUtils.dfNumberScale2(payAmount));
						templateParam.put("accountBalance", YdpUtils.dfNumberScale2(accountBalance));
						templateParam.put("point", pointBalance);
						if(smsSign == null) {
							alismsUtil.sendSMS(Constants.DEFAULT_SIGNNAME, phone, "SMS_159773738", templateParam.toJSONString());
						} else {
							alismsUtil.sendSMS(smsSign.getSignName(), phone, "SMS_159773738", templateParam.toJSONString());
						}
					}
				} catch (YdpException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
				}
			}
			
			
		} else {//合并订单收款
			MerchantOrderExample orderExmaple = new MerchantOrderExample();
			List<String> orderStatus = new ArrayList<>();
			orderStatus.add(Constants.ORDER_STATUS_NO_PAYMENT);
			orderStatus.add(Constants.ORDER_STATUS_DEPOSIT);
			orderExmaple.createCriteria().andOrderStatusIn(orderStatus).andOutTradeNoEqualTo(order.getOutTradeNo()).andMerchantIdEqualTo(mid);
			List<MerchantOrder> orders = orderMapper.selectByExample(orderExmaple);
			if(orders.size() == 0) {//没有需要支付的订单
				throw new YdpException("未查找到收款订单");
			} else {
				MerchantOrder updaterOrder = new MerchantOrder();
				updaterOrder.setEndTime(now);
				updaterOrder.setMemberId(memberUser.getId());
				updaterOrder.setPayMethod(PayMethod.VIP.getValue());
				updaterOrder.setMerchantId(mid);
				BigDecimal totalPrice = new BigDecimal("0.00");
				
				//3、收银流水(桌台扫码支付自动收银)
				MerchantCashierLog cashierLog = new MerchantCashierLog();
				cashierLog.setCashierMethod(PayMethod.VIP.getValue());
				cashierLog.setCashierType(1);//收款
				cashierLog.setCashierSource(1);//正常
				cashierLog.setOperationStaff(username);//操作员
				cashierLog.setCashierTime(now);
				
				for(int i = 0; i < orders.size(); i++) {
					MerchantOrder mOrder = orders.get(i);
					BigDecimal orderPirce = mOrder.getTotalPrice();
					//计算优惠规则、现金券等
					Map<String, Object> results = this.calOrderPrice(mOrder.getOrderNo(), mOrder.getTotalPrice(),
							mOrder.getOrderTime(), mid, enabledSC);
					String subtractTypeStr = (String) results.get("subtractTypeStr");
					BigDecimal subtractAmount = (BigDecimal) results.get("subtractAmount");
					String subtractRemark = (String) results.get("subtractRemark");
					Integer subtractTypeInt = StringUtils.isEmpty(subtractTypeStr) ? 0 : Integer.parseInt(subtractTypeStr);
					updaterOrder.setOrderNo(mOrder.getOrderNo());
					updaterOrder.setSubtractType(subtractTypeInt);
					updaterOrder.setSubtractAmount(subtractAmount);
					updaterOrder.setSubtractRemark(subtractRemark);
					updaterOrder.setPayPrice(orderPirce.subtract(subtractAmount));
					
					cashierLog.setRemark("订单收款");
					cashierLog.setCashierAmount(orderPirce.subtract(subtractAmount));
					cashierLog.setTableCode(mOrder.getTableCode());
					cashierLog.setOrderNo(mOrder.getOrderNo());
					cashierLogService.save(cashierLog, mid);
					totalPrice = totalPrice.add(orderPirce).subtract(subtractAmount);
					orderMapper.paySuccess(updaterOrder);//更改订单状态（支付成功）
					if(subtractTypeStr.indexOf("3") > -1) {
						couponConsumeService.paySuccess(mOrder.getOrderNo(), mid);//现金券抵扣成功
					}
				}
				//会员消费
//				BigDecimal accountBalance = memberService.subAccountBalance(memberAccount.getMemberId(), mid, totalPrice, username);
				Map<String, Object> memberResults = memberService.subAccountBalance(memberAccount.getMemberId(), mid, totalPrice, username);
				BigDecimal accountBalance = (BigDecimal) memberResults.get("accountBalance");
				Integer pointBalance = (Integer) memberResults.get("pointBalance");
				try {
					boolean isExperienceAccount = false;
					if(!StringUtils.isEmpty(username)) {
						if(username.indexOf(":") > -1) {
							username = username.split(":")[0];
						}
						if(account.getAccounts().contains(username)) {
							isExperienceAccount = true;
						}
					}
					if(!isExperienceAccount) {
						//消费短信通知
						MerchantSMSSign smsSign = smsSignService.selectStatus0ByMid(mid);
						JSONObject templateParam = new JSONObject();
						templateParam.put("rechargePrice", YdpUtils.dfNumberScale2(totalPrice));
						templateParam.put("accountBalance", YdpUtils.dfNumberScale2(accountBalance));
						templateParam.put("point", pointBalance);
						if(smsSign == null) {
							alismsUtil.sendSMS(Constants.DEFAULT_SIGNNAME, phone, "SMS_159773738", templateParam.toJSONString());
						} else {
							alismsUtil.sendSMS(smsSign.getSignName(), phone, "SMS_159773738", templateParam.toJSONString());
						}
					}
				} catch(YdpException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
				}
				
			}
		}
		return 0;
	}
	
	/**
	 * 查询当前桌台的用餐订单(补打小票使用)
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	@Override
	public OrderVo selectOrderByTableCode(String tableCode, int merchantId) throws YdpException {
		MerchantOrderExample example = new MerchantOrderExample();
		example.createCriteria().andTableCodeEqualTo(tableCode).andMerchantIdEqualTo(merchantId);
		List<OrderVo> orderVos = listOrderVos(example);
		if(orderVos.isEmpty()) {
			throw new YdpException("该桌台没有正在用餐订单,请前往历史用餐订单补打小票");
		}
		return orderVos.get(0);
	}
	
	/**
	 * 顾客餐桌扫码支付金额≠用餐订单金额时，系统无法完成自动收银，可以使用该功能完成收银并完成订单
	 * @param orderNo
	 * @param remark
	 * @param mid
	 */
	@Override
	public int hadnleExceptionOrder(String orderNo, Integer payMethod, List<Integer> payOrderIds, BigDecimal payPrice, 
			String remark, int mid) throws YdpException {
		
		return 0;
	}
	
	/**
	 * 桌台扫码支付成功后自动打印收银小票
	 * @param tableCodes
	 * @param mid
	 * @return
	 */
	@Override
	public List<Map<String, Object>> selectPrinterOrder(List<String> orderNos, int mid) throws YdpException {
		List<Map<String, Object>> results = new ArrayList<>();
		MerchantOrderExample example = new MerchantOrderExample();
		example.createCriteria().andOrderNoIn(orderNos).andMerchantIdEqualTo(mid);
		List<OrderVo> orderVos = this.listOrderVos2(example);
		for (OrderVo orderVo : orderVos) {
			MerchantOrderItemExample itemEexmaple = new MerchantOrderItemExample();
			itemEexmaple.createCriteria().andOrderNoEqualTo(orderVo.getOrderNo()).andMerchantIdEqualTo(mid);
			orderVo.setOrderItems(orderItemMapper.selectByExample(itemEexmaple));
			Map<String, Object> resultMap = new HashMap<>();
			resultMap.put("orderVo", orderVo);
			MerchantCashierLogExample cashierExample = new MerchantCashierLogExample();
			cashierExample.createCriteria().andOrderNoEqualTo(orderVo.getOrderNo()).andMerchantIdEqualTo(mid);
			List<MerchantCashierLog> cashierLogs = cashierLogMapper.selectByExample(cashierExample);
			if(cashierLogs.isEmpty()) {
				throw new YdpException("没有找到收银记录");
			}
			resultMap.put("cashierLog", cashierLogs.get(0));
			results.add(resultMap);
		}
		return results;
	}
	
	/**
	 * 修改订单项的后厨打印状态
	 * @param tableCode
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	@Override
	public int updateOrderItemPrintStatus(String tableCode, Integer mid) throws YdpException {
		return orderItemMapper.updateOrderItemPrintStatus(tableCode, mid);
	}
	
	/**
	 * 修改订单项的后厨打印状态
	 * @param tableCode
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	@Override
	public int updatePrintStatusByOrderItemIds(List<Integer> orderItemIds, int mid) throws YdpException {
		return orderItemMapper.updatePrintStatusByOrderItemIds(orderItemIds, mid);
	}
	
	/**
	 * 修改订单项的后厨打印状态
	 * @param goodsIds
	 * @param tableCode
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	@Override
	public int updatePrintStatusBygoodsIds(List<Integer> goodsIds, String tableCode, int mid) throws YdpException {
		return orderItemMapper.updatePrintStatusBygoodsIds(goodsIds, tableCode, mid);
	}
	
	/**
	 * 支付金额≠订单金额时锁定订单，将状态改为-1，并更改支付方式
	 * @param orderNo
	 * @param payMethod
	 * @param mid
	 * @param isMergedOrder
	 * @return
	 * @throws YdpException
	 */
	@Override
	public int lockedOrder(String orderNo, Integer payMethod, String payNo, BigDecimal payPrice, Date payTime, Integer mid, String code) throws YdpException {
		//1、移动支付日志流水
		MerchantPayLog payLog = new MerchantPayLog();
		payLog.setPayMethod(payMethod);
		payLog.setPayAmount(payPrice);
		payLog.setPayNo(payNo);
		payLog.setPayTime(payTime);
		payLog.setLogSource(1);//正常
		payLog.setLogType(1);//支付流水
		payLog.setOrderNo(orderNo);//支付单号
		payLog.setRemark("桌台扫码支付");
		payLogService.save(payLog, mid);	
		int result = orderMapper.lockedOrderByPayOrderNo(orderNo, payMethod, payNo, payPrice, mid);
		//完成支付单
		//支付单支付成功
		payOrderMapper.paySuccess(payNo, orderNo, mid, payPrice, payTime, payMethod, code);
		if(result == 0) {
			throw new YdpException("订单状态异常,不是待支付状态");
		}
		return result;
	}
	
	/**
	 * 换台
	 * @param tableCode
	 * @param newTableCode
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	@Override
	public int changeTableCode(String tableCode, String newTableCode, int mid) throws YdpException {
		int result = orderMapper.changeTableCode(tableCode, newTableCode, mid);
		if(result == 0) {
			throw new YdpException("换台失败,桌台" + tableCode + "没有用餐订单");
		}
		return result;
	}
	
	/**
	 * 根据微信openid查询
	 * @param openid
	 * @param merchantId
	 * @return
	 */
	@Override
	public Map<String, Object> listOrderByOpendid(String openid, Integer merchantId) throws YdpException {
		MerchantOrderExample example = new MerchantOrderExample();
		example.setOrderByClause(" order_time asc ");
		List<String> status = new ArrayList<>();
		status.add(Constants.ORDER_STATUS_NO_PAYMENT);//未支付
//		status.add(Constants.ORDER_STATUS_TOBECOMMIT);//待确认
		status.add(Constants.ORDER_STATUS_PAYMENT);//已支付
		example.createCriteria().andOrderStatusIn(status).andWxOpenidEqualTo(openid).andMerchantIdEqualTo(merchantId);
		List<OrderVo> orderVos = listOrderVos(example);
		return calMerchantOrderKCT(orderVos, merchantId);
	}
	
	/**
	 * 根据支付宝buyerId查询
	 * @param openid
	 * @param merchantId
	 * @return
	 */
	@Override
	public Map<String, Object> listOrderBybuyerId(String buyerId, Integer merchantId) throws YdpException {
		MerchantOrderExample example = new MerchantOrderExample();
		example.setOrderByClause(" order_time asc ");
		List<String> status = new ArrayList<>();
		status.add(Constants.ORDER_STATUS_NO_PAYMENT);//未支付
//		status.add(Constants.ORDER_STATUS_TOBECOMMIT);//待确认
		status.add(Constants.ORDER_STATUS_PAYMENT);//已支付
		example.createCriteria().andOrderStatusIn(status).andAlipayUseridEqualTo(buyerId).andMerchantIdEqualTo(merchantId);
		List<OrderVo> orderVos = listOrderVos(example);
		return calMerchantOrderKCT(orderVos, merchantId);
	}
	
	/**
	 * 界面显示订单明细(h5扫码支付、工作台订单详情)
	 * @param orderVos
	 * @param tableCode
	 * @param merchantId
	 * @return
	 * @throws YdpException
	 */
	private Map<String, Object> calMerchantOrderKCT(List<OrderVo> orderVos, Integer merchantId) throws YdpException {
		Map<String, Object> results = new HashMap<String, Object>();
		Map<String, List<MerchantCouponConsume>> couponConsumeMap = new HashMap<>();
		Map<String, List<MerchantGoodsSubtractVo>> subtractVoMap = new HashMap<>();
		
		String configValue = configService.getByCode(Constants.ENABLED_SUBTRACT_COUPON, merchantId);
		boolean enabledSC = configValue == null ? false : "1".equals(configValue);
		
//		BigDecimal totalAmountBD = new BigDecimal("0.00");
		for(OrderVo orderVo : orderVos) {
			BigDecimal orderTotalAmount = orderVo.getTotalPrice();
			//现金消费券
			List<MerchantCouponConsume> couponConsumes = couponConsumeService.list(orderVo.getOrderNo(), merchantId);
			//[减免、折扣与现金券是否同时享受]
			if(enabledSC || couponConsumes.isEmpty()) {
				//如果启用了优惠减免规则
				if("1".equals(configService.getByCode(Constants.ENABLED_GOODS_SUBTRACT, merchantId))) {
					//价格优惠规则
					List<MerchantGoodsSubtractVo> subtractVos = subtractService.listCurrentSubtract(orderVo.getTotalPrice(), 
							orderVo.getOrderTime(), merchantId);
					subtractVoMap.put(orderVo.getOrderNo(), subtractVos);
					for (MerchantGoodsSubtractVo subtractVo : subtractVos) {
						if(subtractVo.getType() == 1) {//具体减免金额
							orderTotalAmount = orderTotalAmount.subtract(subtractVo.getAmount1());
						} else if(subtractVo.getType() == 2) {//折扣率(先减了在折扣) 折上折
	//							Float subtractV = ((100 - subtractVo.getDiscount().floatValue() * 10) / 100) * orderVo.getTotalPrice();
							BigDecimal subtractV = orderTotalAmount.multiply(new BigDecimal("10").subtract(subtractVo.getDiscount()).multiply(new BigDecimal("0.1")));
							orderTotalAmount = orderTotalAmount.subtract(subtractV);
						}
					}
				}
			}
			//现金消费券
			couponConsumeMap.put(orderVo.getOrderNo(), couponConsumes);
			for (MerchantCouponConsume merchantCouponConsume : couponConsumes) {
				orderTotalAmount = orderTotalAmount.subtract(merchantCouponConsume.getCouponPrice());
			}
			orderVo.setReceivedAmount(orderTotalAmount);
			//如果是已经支付的,直接相加订单的payPrice
//			if(orderVo.getOrderStatus().equals(Constants.ORDER_STATUS_PAYMENT)) {
//				totalAmountBD = totalAmountBD.add(orderVo.getPayPrice());
//			} else {
//				totalAmountBD = totalAmountBD.add(orderTotalAmount);
//			}
		}
		results.put("orderVos", orderVos);
		if(couponConsumeMap != null) {
			results.put("couponConsumeMap", couponConsumeMap);
		}
		if(subtractVoMap != null) {
			results.put("subtractVoMap", subtractVoMap);
		}
//		if(orderVos.size() > 0) {
//			//减去异常订单已支付金额
//			totalAmountBD = totalAmountBD.subtract(orderVos.get(0).getExceptionPrice());
//		}
//		//需要支付的金额
//		results.put("payAmount", YdpUtils.dfNumberScale2(totalAmountBD));
		return results;
	}
	
	/**
	 * 根据微信openid取消订单
	 * @param orderNo
	 * @param openid
	 * @param merchantId
	 * @return
	 */
	@Override
	public int deleteOrderByOpenid(String orderNo, String openid, Integer merchantId) throws YdpException {
		int result = orderMapper.deleteOrderByOpenid(orderNo, openid, merchantId);
		if(result == 0) {
			throw new YdpException("取消失败");
		}
		orderItemMapper.deleteOrderItemByOrderNo(orderNo, merchantId);
		return result;
	}
	
	/**
	 * 根据支付宝buyerid取消订单
	 * @param orderNo
	 * @param buyerid
	 * @param merchantId
	 * @return
	 */
	public int cancelOrderByBuyerid(String orderNo, String buyerid, Integer merchantId) throws YdpException {
		int result = orderMapper.deleteOrderByBuyerid(orderNo, buyerid, merchantId);
		if(result == 0) {
			throw new YdpException("取消失败");
		}
		orderItemMapper.deleteOrderItemByOrderNo(orderNo, merchantId);
		return result;
	}
	
	@Override
	public OrderVo selectOrderByOrderNo(String orderNo, int mid) throws YdpException {
		MerchantOrderExample example = new MerchantOrderExample();
		example.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		List<OrderVo> orderVos = this.listOrderVos2(example);
		if(orderVos.isEmpty()) {
			throw new YdpException("没有找到订单数据");
		} else {
			OrderVo orderVo = orderVos.get(0);
			MerchantOrderItemExample itemEexmaple = new MerchantOrderItemExample();
			itemEexmaple.createCriteria().andOrderNoEqualTo(orderVo.getOrderNo()).andMerchantIdEqualTo(mid);
			orderVo.setOrderItems(orderItemMapper.selectByExample(itemEexmaple));
			return orderVo;
		}
	}
	
}
