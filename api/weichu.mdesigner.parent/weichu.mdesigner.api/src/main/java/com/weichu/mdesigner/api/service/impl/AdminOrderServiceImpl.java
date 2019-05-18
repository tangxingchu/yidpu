package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IAdminOrderService;
import com.weichu.mdesigner.common.entity.AdminFunctionPrice;
import com.weichu.mdesigner.common.entity.AdminOrder;
import com.weichu.mdesigner.common.entity.AdminOrderExample;
import com.weichu.mdesigner.common.entity.MerchantUserFunction;
import com.weichu.mdesigner.common.mapper.AdminFunctionPriceMapper;
import com.weichu.mdesigner.common.mapper.AdminOrderMapper;
import com.weichu.mdesigner.common.service.IMerchantUserFunctionService;
import com.weichu.mdesigner.utils.DateUtil;
import com.xiaoleilu.hutool.date.DatePattern;

/**
 * 商家购买菜单功能订单
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class AdminOrderServiceImpl implements IAdminOrderService {

	@Autowired
	private AdminOrderMapper mapper;
	
	@Autowired
	private IMerchantUserFunctionService userFunctionService;
	
	@Autowired
	private AdminFunctionPriceMapper funcPriceMapper;
	
	@Override
	public int save(AdminOrder order, int mid) {
		order.setCreateTime(new Date());
		order.setMerchantId(mid);
		return mapper.insertSelective(order);
	}

	@Override
	public int cancelOrder(int orderId, int mid) {
		return mapper.cancelOrder(orderId, mid);
	}

	/**
	 * 删除订单 
	 * @param orderId
	 * @param mid
	 * @return
	 */
	@Override
	public int deleteOrder(int orderId, int mid) {
		AdminOrderExample example = new AdminOrderExample();
		example.createCriteria().andIdEqualTo(orderId).andMerchantIdEqualTo(mid);
		return mapper.deleteByExample(example);
	}
	
	/**
	 * 完成订单(支付成功,交易完成)
	 * @param orderNo
	 * @param tradeNo 平台交易号
	 * @param platform 1=支付宝,2=微信
	 * @param mid=商家id
	 * @return
	 */
	@Override
	public int finishOrder(Map<String, Object> params) {
		String orderNo = params.get("orderNo").toString();
		String tradeNo = params.get("tradeNo").toString();
		BigDecimal totalAmount = new BigDecimal(params.get("totalAmount").toString());
		String buyerId = (String) params.get("buyerId");
		String gmtPaymentStr = (String) params.get("gmtPayment");
		Integer platform = (Integer) params.get("platform");
		String passbackParams = (String) params.get("passbackParams");
		//交易成功 根据实际业务参数设置userfunction
		MerchantUserFunction userFunction = new MerchantUserFunction();
		JSONObject jsonObject = JSONObject.parseObject(passbackParams);
		userFunction.setFunctionId(jsonObject.getInteger("functionId"));
		Integer mid = jsonObject.getInteger("merchantId");
		Integer funPriceId = jsonObject.getInteger("funPriceId");
		//查询价目信息
		AdminFunctionPrice funcPrice = funcPriceMapper.selectByPrimaryKey(funPriceId);
		userFunction.setMerchantId(mid);
		userFunctionService.save(userFunction, mid, funcPrice.getMonth());
		Date gmtPayment = DateUtil.parse(gmtPaymentStr, DatePattern.NORM_DATETIME_PATTERN);
		if(1 == platform) {//支付宝
			return mapper.finishOrderByAlipay(orderNo, tradeNo, totalAmount, buyerId, gmtPayment);
		} else if(2 == platform) {//微信支付
			return mapper.finishOrderByWechat(orderNo, tradeNo, totalAmount, buyerId, gmtPayment);
		} else {
			return 0;
		}
	}
	
	/**
	 * 完成结束(交易结束，不能在退款)
	 * @param orderNo
	 * @return
	 */
	@Override
	public int closeOrder(String orderNo) {
		return mapper.closeOrder(orderNo);
	}

	@Override
	public List<AdminOrder> list(int mid) {
		AdminOrderExample example = new AdminOrderExample();
		example.setOrderByClause(" order_time desc ");
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}
	
	/**
	 * 根据订单号查询订单
	 * @param orderNo
	 * @return
	 * 
	 */
	@Override
	public AdminOrder selectByOrderNo(String orderNo, int mid) {
		AdminOrderExample example = new AdminOrderExample();
		example.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		List<AdminOrder> adminOrders = mapper.selectByExample(example);
		if(!adminOrders.isEmpty()) {
			return adminOrders.get(0);
		} else {
			return null;
		}
	}
	
	/**
	 * 校验订单号与支付金额
	 * @param orderNo
	 * @param totalAmount
	 * @return
	 */
	@Override
	public boolean vilidateOrderAmount(String orderNo, BigDecimal totalAmount) {
		AdminOrderExample example = new AdminOrderExample();
		example.createCriteria().andOrderNoEqualTo(orderNo);
		List<AdminOrder> orders = mapper.selectByExample(example);
		if(orders.isEmpty()) {
			return false;
		} else {
			AdminOrder order = orders.get(0);
			if(totalAmount.compareTo(order.getAmount()) == 0) {
				return true;
			} else {//支付金额小于实际要支付的金额, 校验不通过
				return false;
			}			
		}
	}
	
//	/**
//	 * 修改实际支付金额
//	 * @param orderNo
//	 * @param totalAmount
//	 * @return
//	 */
//	@Override
//	public int updateTotalAmount(String orderNo, Float totalAmount) {
//		return mapper.updateTotalAmount(orderNo, totalAmount);
//	}
	
}
