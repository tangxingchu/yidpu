package com.weichu.mdesigner.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMemberRechargeConfigService;
import com.weichu.mdesigner.api.service.IMerchantGoodsCouponService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDayService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDiscountSerivce;
import com.weichu.mdesigner.api.service.IMerchantGoodsSubtractService;
import com.weichu.mdesigner.api.service.IMerchantRuleService;
import com.weichu.mdesigner.api.vo.MemberRechargeConfigVo;
import com.weichu.mdesigner.api.vo.MerchantGoodsCouponVo;
import com.weichu.mdesigner.api.vo.MerchantGoodsDayVo;
import com.weichu.mdesigner.api.vo.MerchantGoodsDiscountVo;
import com.weichu.mdesigner.api.vo.MerchantGoodsSubtractVo;
import com.weichu.mdesigner.common.entity.MerchantConfig;
import com.weichu.mdesigner.common.entity.MerchantConfigExample;
import com.weichu.mdesigner.common.entity.MerchantGoodsCoupon;
import com.weichu.mdesigner.common.entity.MerchantGoodsDay;
import com.weichu.mdesigner.common.entity.MerchantGoodsDiscount;
import com.weichu.mdesigner.common.entity.MerchantGoodsSubtract;
import com.weichu.mdesigner.common.mapper.MerchantConfigMapper;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 运营规则配置
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class RuleController {
	
	@Autowired
	private IMerchantGoodsDayService goodsDayService;
	
	@Autowired
	private IMerchantGoodsDiscountSerivce goodsDiscountService;
	
	@Autowired
	private IMerchantGoodsSubtractService goodsSubtractService;
	
	@Autowired
	private IMerchantGoodsCouponService goodsCouponService;
	
	@Autowired
	private IMerchantRuleService ruleService;
	
	@Autowired
	private IMemberRechargeConfigService rechargeConfigService;
	
	@Autowired
	private MerchantConfigMapper configMapper;
	
	@RequestMapping(value = "/rule/init", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	Map<String, List<?>> init(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		List<MerchantGoodsDayVo> goodsDays = goodsDayService.listAll(mid);
		Map<String, List<?>> result = new HashMap<>();
		result.put("goodsDays", goodsDays);
		MerchantConfigExample example = new MerchantConfigExample();
		List<String> values = new ArrayList<String>();
		values.add(Constants.ENABLED_GOODS_DAY);
		values.add(Constants.ENABLED_GOODS_DISCOUNT);
		values.add(Constants.ENABLED_GOODS_SUBTRACT);
		values.add(Constants.ENABLED_GOODS_COUPON);
		example.createCriteria().andConfigCodeIn(values).andMerchantIdEqualTo(mid);
		List<MerchantConfig> configs = configMapper.selectByExample(example);
		result.put("configs", configs);
		List<MerchantGoodsDiscountVo> goodsDiscounts = goodsDiscountService.listAll(mid);
		result.put("goodsDiscounts", goodsDiscounts);
		List<MerchantGoodsSubtractVo> goodsSubtracts = goodsSubtractService.listAll(mid);
		result.put("goodsSubtracts", goodsSubtracts);
		List<MerchantGoodsCouponVo> goodsCoupons = goodsCouponService.listAll(mid);
		result.put("goodsCoupons", goodsCoupons);
		return result;
	}
	
	@RequestMapping(value = "/rule/listGoodsDay", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	List<MerchantGoodsDayVo> listGoodsDay(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantGoodsDayVo> goodsDays = goodsDayService.listAll(mid);
		return goodsDays;
	}
	
	@RequestMapping(value = "/rule/saveGoodsDay", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	JSONObject saveGoodsDay(HttpServletRequest request, @RequestBody List<MerchantGoodsDay> goodsDays) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		Integer goodsDayId = goodsDayService.save(goodsDays, username, mid);
		return JSONResult.fillResultJsonObject(goodsDayId);
	}
	
	@RequestMapping(value = "/rule/deleteGoodsDay", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	JSONObject deleteGoodsDay(HttpServletRequest request, @RequestBody MerchantGoodsDay goodsDay) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		goodsDayService.delete(goodsDay.getId(), username, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/rule/listGoodsDiscount", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	List<MerchantGoodsDiscountVo> listGoodsDiscount(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantGoodsDiscountVo> goodsDiscounts = goodsDiscountService.listAll(mid);
		return goodsDiscounts;
	}
	
	@RequestMapping(value = "/rule/saveGoodsDiscount", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	JSONObject saveGoodsDiscount(HttpServletRequest request, @RequestBody List<MerchantGoodsDiscount> goodsDiscounts) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		Integer goodsDiscountId = goodsDiscountService.save(goodsDiscounts, username, mid);
		return JSONResult.fillResultJsonObject(goodsDiscountId);
	}
	
	@RequestMapping(value = "/rule/deleteGoodsDiscount", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	JSONObject deleteGoodsDiscount(HttpServletRequest request, @RequestBody MerchantGoodsDiscount goodsDiscount) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		goodsDiscountService.delete(goodsDiscount.getId(), mid, username);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/rule/listGoodsSubtract", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	List<MerchantGoodsSubtractVo> listGoodsSubtract(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantGoodsSubtractVo> goodsSubtracts = goodsSubtractService.listAll(mid);
		return goodsSubtracts;
	}
	
	@RequestMapping(value = "/rule/saveGoodsSubtract", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	JSONObject saveGoodsSubtract(HttpServletRequest request, @RequestBody MerchantGoodsSubtract goodsSubtract) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		Integer goodsSubtractId = goodsSubtractService.save(goodsSubtract, username, mid);
		return JSONResult.fillResultJsonObject(goodsSubtractId);
	}
	
	@RequestMapping(value = "/rule/enabledGoodsSubtract", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	JSONObject enabledGoodsSubtract(HttpServletRequest request, @RequestBody MerchantGoodsSubtract goodsSubtract) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		goodsSubtractService.updateEnabled(goodsSubtract.getId(), mid, goodsSubtract.getEnabled(), username);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/rule/deleteGoodsSubtract", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	JSONObject deleteGoodsSubtract(HttpServletRequest request, @RequestBody MerchantGoodsSubtract goodsSubtract) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		goodsSubtractService.delete(goodsSubtract.getId(), mid, username);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/rule/listGoodsCoupon", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	List<MerchantGoodsCouponVo> listGoodsCoupon(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantGoodsCouponVo> goodsCoupons = goodsCouponService.listAll(mid);
		return goodsCoupons;
	}
	
	@RequestMapping(value = "/rule/saveGoodsCoupon", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	JSONObject saveGoodsCoupon(HttpServletRequest request, @RequestBody MerchantGoodsCoupon goodsCoupon) throws Exception {
		int mid = JavaWebToken.getUid(request);
		Integer goodsCouponId = goodsCouponService.save(goodsCoupon, mid);
		return JSONResult.fillResultJsonObject(goodsCouponId);
	}
	
	@RequestMapping(value = "/rule/deleteGoodsCoupon", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0301')")
	JSONObject deleteGoodsCoupon(HttpServletRequest request, @RequestBody MerchantGoodsCoupon goodsCoupon) throws Exception {
		int mid = JavaWebToken.getUid(request);
		goodsCouponService.delete(goodsCoupon.getId(), mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/rule/listTodayRule", method = RequestMethod.POST)
	Map<String, Object> listTodayRule(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		Map<String, Object> results = ruleService.listTodayRule(mid);
		List<MemberRechargeConfigVo> rechargeConfigVos = rechargeConfigService.listEffective(mid);
		if (rechargeConfigVos != null && !rechargeConfigVos.isEmpty()) {
			results.put("rechargeConfigs", rechargeConfigVos);
		}
		return results;
	}
	
	/**
	 * 同步每日特价至本地
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rule/syncGoodsDay", method = RequestMethod.POST)
	List<MerchantGoodsDay> syncGoodsDay(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantGoodsDay> goodsDays = goodsDayService.listAllBySync(mid);
		return goodsDays;
	}
	
	/**
	 * 同步商品折扣至本地
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rule/syncGoodsDiscount", method = RequestMethod.POST)
	List<MerchantGoodsDiscount> syncGoodsDiscount(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantGoodsDiscount> goodsDiscount = goodsDiscountService.listAllBySync(mid);
		return goodsDiscount;
	}
	
	/**
	 * 同步减免、折扣至本地
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/rule/syncGoodsSubtract", method = RequestMethod.POST)
	List<MerchantGoodsSubtract> syncGoodsSubtract(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantGoodsSubtract> goodsSubtract = goodsSubtractService.listAllBySync(mid);
		return goodsSubtract;
	}
	
}
