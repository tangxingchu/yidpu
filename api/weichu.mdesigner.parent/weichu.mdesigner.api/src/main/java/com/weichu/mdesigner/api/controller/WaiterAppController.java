package com.weichu.mdesigner.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMemberRechargeConfigService;
import com.weichu.mdesigner.api.service.IMerchantAuthorization;
import com.weichu.mdesigner.api.service.IMerchantGoodsDayService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDiscountSerivce;
import com.weichu.mdesigner.api.service.IMerchantOrderService;
import com.weichu.mdesigner.api.service.IMerchantRuleService;
import com.weichu.mdesigner.api.vo.MemberRechargeConfigVo;
import com.weichu.mdesigner.common.entity.AdminVersion;
import com.weichu.mdesigner.common.entity.MerchantConfig;
import com.weichu.mdesigner.common.entity.MerchantConfigExample;
import com.weichu.mdesigner.common.entity.MerchantGoodsDay;
import com.weichu.mdesigner.common.entity.MerchantGoodsDiscount;
import com.weichu.mdesigner.common.mapper.AdminVersionMapper;
import com.weichu.mdesigner.common.mapper.MerchantConfigMapper;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 服务员版app
 * 单独建一个controller 是为了将该app的api访问权限用一个functionCode统一管理
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/waiter")
public class WaiterAppController {
	
	@Autowired
	private IMerchantRuleService ruleService;
	
	@Autowired
	private MerchantConfigMapper configMapper;
	
	@Autowired
	private IMerchantGoodsDayService goodsDayService;
	
	@Autowired
	private IMerchantGoodsDiscountSerivce goodsDiscountService;
	
	@Autowired
	private IMerchantAuthorization authorization;
	
	@Autowired
	private IMerchantOrderService orderService;
	
	@Autowired
	private AdminVersionMapper versionMapper;
	
	@Autowired
	private IMemberRechargeConfigService rechargeConfigService;
	
	/**
	 * 查询当天运营规则 以及socket服务端
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listTodayRule", method = RequestMethod.POST)
	Map<String, Object> listTodayRule(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		MerchantConfigExample example = new MerchantConfigExample();
		example.setOrderByClause(" id asc ");
		List<String> values = new ArrayList<>();
		values.add(Constants.WAITER_APP_KITCHEN);
		values.add(Constants.SERVER_IP);
		example.createCriteria().andMerchantIdEqualTo(mid).andConfigCodeIn(values);
		List<MerchantConfig> configs = configMapper.selectByExample(example);
		Map<String, Object> results = ruleService.listTodayRule(mid);
		if (configs != null && !configs.isEmpty()) {
			results.put("configs", configs);
		}
		List<MemberRechargeConfigVo> rechargeConfigVos = rechargeConfigService.listEffective(mid);
		if (rechargeConfigVos != null && !rechargeConfigVos.isEmpty()) {
			results.put("rechargeConfigs", rechargeConfigVos);
		}
		return results;
	}
	
	/**
	 * 服务员版APP显示(待确认、待支付、预支付订单)
	 * 根据桌台编号查询待支付订单或者待确认订单
	 * 
	 * 查询符合当前时间、当前消费价格的优惠
	 * @return
	 */
	@RequestMapping(value = "/listOrderByTableCode", method = RequestMethod.POST)
	Map<String, Object> listNoCompleteOrderByTableCode(HttpServletRequest request, @RequestParam String tableCode) throws Exception {
		int merchantId = JavaWebToken.getUid(request);
		Map<String, Object> results = orderService.listOrderByTableCode(tableCode, merchantId);
		return results;
	}
	
	/**
	 * 查询商品特价与折扣信息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listTodayGoodsDaysAndDiscount", method = RequestMethod.POST)
	public Map<String, Object> listTodayGoodsDaysAndDiscount(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		Map<String, Object> resultMap = new HashMap<>();
		List<MerchantGoodsDay> goodsDays = goodsDayService.listBasicToday(mid);
		resultMap.put("goodsDays", goodsDays);
		List<MerchantGoodsDiscount> goodsDiscounts = goodsDiscountService.listBasicEffectiveGoodsDiscount(mid);
		resultMap.put("goodsDiscounts", goodsDiscounts);
		return resultMap;
	}
	
	/**
	 * 修改密码
	 * @param request
	 * @param newPWD
	 * @param oldPWD
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/modifyPWD", method = RequestMethod.POST)
	public JSONObject modifyPWD(HttpServletRequest request, @RequestParam("newPWD") String newPWD,
			@RequestParam("oldPWD") String oldPWD) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		Integer result = authorization.modifyPWD(username, oldPWD, newPWD, mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 检查版本信息
	 * @param request
	 * @param appType 所属应用
	 * @return
	 */
	@RequestMapping(value = "/selectLastVersion", method = RequestMethod.POST)
	public AdminVersion selectLastVersion(HttpServletRequest request) {
		return versionMapper.selectLastVersion(4);
	}
	
}
