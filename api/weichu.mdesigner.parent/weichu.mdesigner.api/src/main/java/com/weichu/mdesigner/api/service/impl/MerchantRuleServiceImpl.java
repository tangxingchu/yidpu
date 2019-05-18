package com.weichu.mdesigner.api.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantGoodsCouponService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDayService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDiscountSerivce;
import com.weichu.mdesigner.api.service.IMerchantGoodsSubtractService;
import com.weichu.mdesigner.api.service.IMerchantRuleService;
import com.weichu.mdesigner.api.vo.MerchantGoodsCouponVo;
import com.weichu.mdesigner.api.vo.MerchantGoodsDayVo;
import com.weichu.mdesigner.api.vo.MerchantGoodsDiscountVo;
import com.weichu.mdesigner.api.vo.MerchantGoodsSubtractVo;
import com.weichu.mdesigner.common.entity.MerchantConfig;
import com.weichu.mdesigner.common.entity.MerchantConfigExample;
import com.weichu.mdesigner.common.mapper.MerchantConfigMapper;
import com.weichu.mdesigner.utils.constants.Constants;

@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantRuleServiceImpl implements IMerchantRuleService {

	@Autowired
	private MerchantConfigMapper configMapper;
	
	@Autowired
	private IMerchantGoodsDayService dayService;
	
	@Autowired
	private IMerchantGoodsDiscountSerivce discountService;
	
	@Autowired
	private IMerchantGoodsSubtractService subtractService;
	
	@Autowired
	private IMerchantGoodsCouponService couponService;
	/**
	 * 查询当天的规则
	 * @param mid
	 * @return
	 */
	@Override
	public Map<String, Object> listTodayRule(int mid) {
		SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd");
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("today", sdf.format(new Date()));
		//查询当前启用了什么规则
		MerchantConfigExample example = new MerchantConfigExample();
		List<String> values = new ArrayList<String>();
		values.add(Constants.ENABLED_GOODS_DAY);
		values.add(Constants.ENABLED_GOODS_DISCOUNT);
		values.add(Constants.ENABLED_GOODS_SUBTRACT);
		values.add(Constants.ENABLED_GOODS_COUPON);
		example.createCriteria().andConfigCodeIn(values).andConfigValueEqualTo("1").andMerchantIdEqualTo(mid);
		List<MerchantConfig> configs = configMapper.selectByExample(example);
		for (MerchantConfig merchantConfig : configs) {
			switch(merchantConfig.getConfigCode()) {
				case Constants.ENABLED_GOODS_DAY:
					//每日特价
					List<MerchantGoodsDayVo> goodsDayVos = dayService.listToday(mid);
					resultMap.put("goodsDayVos", goodsDayVos);
				break;
				case Constants.ENABLED_GOODS_DISCOUNT:
					//折扣商品
					List<MerchantGoodsDiscountVo> goodsDiscountVos = discountService.listEffectiveGoodsDiscount(mid);
					resultMap.put("goodsDiscountVos", goodsDiscountVos);
				break;
				case Constants.ENABLED_GOODS_SUBTRACT:
					//减免、折扣、赠券
					List<MerchantGoodsSubtractVo> goodsSubtractVos = subtractService.listEffectiveSubtract(mid);
					resultMap.put("goodsSubtractVos", goodsSubtractVos);
				break;
				case Constants.ENABLED_GOODS_COUPON:
					//电子优惠券
					List<MerchantGoodsCouponVo> goodsCouponVos = couponService.listEffectiveCoupon(mid);
					resultMap.put("goodsCouponVos", goodsCouponVos);
				break;
			}
		}
		resultMap.put("enabledConfigs", configs);
		return resultMap;
	}
	
	
	
}
