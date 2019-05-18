package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.service.IMerchantConfigService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDayService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDiscountSerivce;
import com.weichu.mdesigner.api.service.IMerchantGoodsSubtractService;
import com.weichu.mdesigner.api.vo.MerchantGoodsDayVo;
import com.weichu.mdesigner.api.vo.MerchantGoodsDiscountVo;
import com.weichu.mdesigner.api.vo.MerchantGoodsSubtractVo;
import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHis;
import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHisDetail;
import com.weichu.mdesigner.common.entity.MerchantConfig;
import com.weichu.mdesigner.common.entity.MerchantConfigExample;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.RuleCode;
import com.weichu.mdesigner.utils.constants.Week;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantBusinessRuleHisDetailMapper;
import com.weichu.mdesigner.common.mapper.MerchantBusinessRuleHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantConfigMapper;

/**
 * 商家基础配置开关
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class MerchantConfigServiceImpl implements IMerchantConfigService {
	
	@Autowired
	private MerchantConfigMapper mapper;
	
	@Autowired
	private MerchantBusinessRuleHisMapper ruleHisMapper;
	
	@Autowired
	private MerchantBusinessRuleHisDetailMapper ruleHisDetailMapper;
	
	@Autowired
	private IMerchantGoodsDayService goodsDayService;
	
	@Autowired
	private IMerchantGoodsDiscountSerivce goodsDiscountService;
	
	@Autowired
	private IMerchantGoodsSubtractService goodsSubtractService;
	
	@Override
	public List<MerchantConfig> listAll(int mid) {
		MerchantConfigExample example = new MerchantConfigExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}

	@Override
	public List<MerchantConfig> listByCodes(List<String> codes, int mid) {
		MerchantConfigExample example = new MerchantConfigExample();
		example.createCriteria().andConfigCodeIn(codes).andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}

//	@CachePut(value = Constants.NO_EXP_CACHE_NAME, key = "#mid + #config.configCode")
//	@Override
//	public String save(MerchantConfig config, int mid) {
//		config.setMerchantId(mid);
//		config.setCreateTime(new Date());
//		mapper.insertSelective(config);
//		return config.getConfigValue();
//	}

	@CachePut(value = Constants.NO_EXP_CACHE_NAME, key = "#config.configCode + '_' + #mid")
	@Override
	public String updateByConfigCode(MerchantConfig config, int mid, String username) throws YdpException {
		config.setModifyTime(new Date());
		config.setMerchantId(mid);
		mapper.updateByConfigCode(config);
		Date now = new Date();		
		String configCode = config.getConfigCode();
		//商家每日特价商品 、商品折扣、消费折扣减免、电子优惠券
		if(Constants.ENABLED_GOODS_DAY.equals(configCode)
				|| Constants.ENABLED_GOODS_DISCOUNT.equals(configCode)
				|| Constants.ENABLED_GOODS_SUBTRACT.equals(configCode)) {
//				|| Constants.ENABLED_GOODS_COUPON.equals(configCode)) { //TODO 电子优惠券 暂时保留，等小程序能够上线在启用
			String ruleName = RuleCode.lookup(configCode).getName();
			if("1".equals(config.getConfigValue())) {//是否启用 启用规则开始日期
				MerchantBusinessRuleHis businessRuleHis = new MerchantBusinessRuleHis();
				businessRuleHis.setMerchantId(mid);
				businessRuleHis.setRuleCode(configCode);
				businessRuleHis.setRuleName(ruleName);
				businessRuleHis.setRuleBeginDate(now);
				businessRuleHis.setCreateTime(now);
				ruleHisMapper.insertSelective(businessRuleHis);
				//查询具体的ruleCode下所有规则
				StringBuilder ruleDetails = new StringBuilder();
				//每日特价
				if(Constants.ENABLED_GOODS_DAY.equals(configCode)) {
					List<MerchantGoodsDayVo> goodsDayVos = goodsDayService.listAll(mid);					
					for (MerchantGoodsDayVo goodsDayVo : goodsDayVos) {
						//是生效状态 并且不是失效状态
//						if("1".equals(goodsDayVo.getEffectiveStatus())
//								&& "0".equals(goodsDayVo.getExpiredStatus())) {
						//改成只要不是 失效就记录
						if("0".equals(goodsDayVo.getExpiredStatus())) {
							//商品有可能已经删除了，删除了就不要记录明细
							if(!StringUtils.isEmpty(goodsDayVo.getGoodsName())) {
//								ruleDetails.append("操作时间:").append(DateUtil.format(now, DatePattern.NORM_DATETIME_PATTERN)).append("。");
								String weekName = Week.lookup(goodsDayVo.getWeek()).getName();
								ruleDetails.append(weekName).append(" [").append(goodsDayVo.getGoodsName()).append("]原价￥")
									.append(YdpUtils.dfNumberScale2(goodsDayVo.getOldPrice())).append("/").append(goodsDayVo.getUnitName()).append(",").append("特价￥")
									.append(YdpUtils.dfNumberScale2(goodsDayVo.getPrice())).append("。有效期限:").append(goodsDayVo.getEffectiveTime())
									.append("~").append(goodsDayVo.getExpiredTime() == null ? "永久" : goodsDayVo.getExpiredTime()).append("<br/>");
							}
						}
					}
				} else if(Constants.ENABLED_GOODS_DISCOUNT.equals(configCode)) {//商品特价
					List<MerchantGoodsDiscountVo> goodsDiscountVos = goodsDiscountService.listAll(mid);
					for (MerchantGoodsDiscountVo goodsDiscountVo : goodsDiscountVos) {
						//是生效状态 并且不是失效状态
//						if("1".equals(goodsDiscountVo.getEffectiveStatus())
//								&& "0".equals(goodsDayVo.getExpiredStatus())) {
						//改成只要不是 失效就记录
						if("0".equals(goodsDiscountVo.getExpiredStatus())) {
							//商品有可能已经删除了，删除了就不要记录明细
							if(!StringUtils.isEmpty(goodsDiscountVo.getGoodsName())) {
//								ruleDetails.append("操作时间:").append(DateUtil.format(now, DatePattern.NORM_DATETIME_PATTERN)).append("。");
								ruleDetails.append("[").append(goodsDiscountVo.getGoodsName()).append("]原价￥")
									.append(YdpUtils.dfNumberScale2(goodsDiscountVo.getOldPrice())).append("/").append(goodsDiscountVo.getUnitName()).append(",折扣：")
									.append(goodsDiscountVo.getDiscountValue()).append("折").append("。有效期限:").append(goodsDiscountVo.getEffectiveTime())
									.append("~").append(goodsDiscountVo.getExpiredTime() == null ? "永久" : goodsDiscountVo.getExpiredTime()).append("<br/>");
							}
						}
					}
				} else if(Constants.ENABLED_GOODS_SUBTRACT.equals(configCode)) {//消费满多少(减免/折扣/赠券)
					List<MerchantGoodsSubtractVo> goodsSubtractVos = goodsSubtractService.listAll(mid);
					for (MerchantGoodsSubtractVo goodsSubtractVo : goodsSubtractVos) {
						//是生效状态 并且不是失效状态 并且已启用
//						if("1".equals(goodsDayVo.getEffectiveStatus())
//						&& "0".equals(goodsDayVo.getExpiredStatus())) {
						//改成只要不是 失效就记录
						if("0".equals(goodsSubtractVo.getExpiredStatus())) {
//							ruleDetails.append("操作时间:").append(DateUtil.format(now, DatePattern.NORM_DATETIME_PATTERN)).append("。");
							if(goodsSubtractVo.getConstraintType() == 1) {//消费满多少
								ruleDetails.append("消费总额(满多少)：￥").append(YdpUtils.dfNumberScale2(goodsSubtractVo.getConsumePrice())).append("。");
							} else {//具体消费时间段
								ruleDetails.append("具体时间段：").append(goodsSubtractVo.getConstraintTimeStart()).append("~")
									.append(goodsSubtractVo.getConstraintTimeEnd()).append("。");
							}
							if(goodsSubtractVo.getType() == 1) {
								ruleDetails.append("现金优惠：￥").append(YdpUtils.dfNumberScale2(goodsSubtractVo.getAmount1())).append("。");
							} else if(goodsSubtractVo.getType() == 2) {
								ruleDetails.append("折扣：").append(goodsSubtractVo.getDiscount()).append("折。");
							} else {
								ruleDetails.append("赠现金券：￥").append(YdpUtils.dfNumberScale2(goodsSubtractVo.getAmount2())).append("。");
							}
							ruleDetails.append("有效期限:").append(goodsSubtractVo.getEffectiveTime())
								.append("~").append(goodsSubtractVo.getExpiredTime() == null ? "永久" : goodsSubtractVo.getExpiredTime()).append("。");
							ruleDetails.append("是否启用：").append("1".equals(goodsSubtractVo.getEnabled()) ? "是" : "否").append("<br/>");
						}
					}
				} else if(Constants.ENABLED_GOODS_COUPON.equals(configCode)) {
					//TODO 电子优惠券 暂时保留，等小程序能够上线在启用
				}
				MerchantBusinessRuleHisDetail ruleHisDetail = new MerchantBusinessRuleHisDetail();
				ruleHisDetail.setRuleCode(configCode);				
				ruleHisDetail.setRuleName(ruleName);
				ruleHisDetail.setRuleHisId(businessRuleHis.getId());
				ruleHisDetail.setMerchantId(mid);
				ruleHisDetail.setOperationType(Constants.RULEHIS_TYPE_INIT);
				ruleHisDetail.setOperationStaff(username);
				ruleHisDetail.setRuleDetails(ruleDetails.toString());
				ruleHisDetail.setCreateTime(now);
				ruleHisDetailMapper.insertSelective(ruleHisDetail);
			} else {//停用 //更新规则停止日期
				ruleHisMapper.updateRuleEndDate(now, configCode, mid);
			}
		}
		return config.getConfigValue();
	}


	@Cacheable(value = Constants.NO_EXP_CACHE_NAME, key = "#configCode + '_' + #mid")
	@Override
	public String getByCode(String configCode, int mid) {
		MerchantConfigExample example = new MerchantConfigExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andConfigCodeEqualTo(configCode);
		List<MerchantConfig> configs = mapper.selectByExample(example);
		if (configs != null && !configs.isEmpty()) {
			return configs.get(0).getConfigValue();
		} else {
			return null;
		}
	}
	
	/**
	 * 根据code获取当个配置
	 * @param configCode
	 * @param mid
	 * @return
	 */
	@Override
	public MerchantConfig getEntityByCode(String configCode, int mid) {
		MerchantConfigExample example = new MerchantConfigExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andConfigCodeEqualTo(configCode);
		List<MerchantConfig> configs = mapper.selectByExample(example);
		if (configs != null && !configs.isEmpty()) {
			return configs.get(0);
		} else {
			return null;
		}
	}

}
