package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantGoodsDiscountSerivce;
import com.weichu.mdesigner.api.vo.MerchantGoodsDiscountVo;
import com.weichu.mdesigner.common.entity.MerchantGoodsDiscount;
import com.weichu.mdesigner.common.entity.MerchantGoodsDiscountExample;
import com.weichu.mdesigner.common.mapper.MerchantBusinessRuleHisDetailMapper;
import com.weichu.mdesigner.common.mapper.MerchantGoodsDiscountMapper;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.RuleCode;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 折扣商品
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantGoodsDiscountSerivceImpl implements IMerchantGoodsDiscountSerivce {
	
	@Autowired
	private MerchantGoodsDiscountMapper mapper;
	
	@Autowired
	private MerchantBusinessRuleHisDetailMapper hisDetailMapper;
	
	@Override
	public int save(MerchantGoodsDiscount goodsDiscount, String username, int mid) throws YdpException {
		Date now = new Date();
		goodsDiscount.setCreateTime(now);
		goodsDiscount.setEnabled("1");
		goodsDiscount.setMerchantId(mid);
		if(goodsDiscount.getEffectiveTime() != null) {
			Date effectiveTime = DateUtil.beginOfDay(goodsDiscount.getEffectiveTime());
			goodsDiscount.setEffectiveTime(effectiveTime);
		}
		if(goodsDiscount.getExpiredTime() != null) {
			Date expiredTime = DateUtil.endOfDayMysql(goodsDiscount.getExpiredTime());
			goodsDiscount.setExpiredTime(expiredTime);
		}
		mapper.insertSelective(goodsDiscount);
		return insertHisDetail(goodsDiscount.getId(), mid, Constants.RULEHIS_TYPE_INSERT, username, now);
	}
	
	//记录规则历史(用于运营分析提供数据基础)
	private int insertHisDetail(int id, int mid, int operationType, String operationStaff, Date createTime) {
		//保存的时候需要入库历史明细，为运营分析提供数据显示
		MerchantGoodsDiscountVo goodsDiscountVo = this.mapToVo(mapper.listById(id, mid));
		StringBuilder ruleDetails = new StringBuilder();
//				ruleDetails.append("操作时间:").append(DateUtil.format(new Date(), DatePattern.NORM_DATETIME_PATTERN)).append("。");
		//该商品已经被删除了
		if(goodsDiscountVo.getGoodsName() == null) {
			return 0;
		} else {
			ruleDetails.append("[").append(goodsDiscountVo.getGoodsName()).append("]原价￥")
			.append(YdpUtils.dfNumberScale2(goodsDiscountVo.getOldPrice())).append("/").append(goodsDiscountVo.getUnitName()).append(",折扣：")
			.append(goodsDiscountVo.getDiscountValue()).append("折").append("。有效期限:").append(goodsDiscountVo.getEffectiveTime())
			.append("~").append(goodsDiscountVo.getExpiredTime() == null ? "永久" : goodsDiscountVo.getExpiredTime()).append("<br/>");
			RuleCode ruleCode = RuleCode.lookup(Constants.ENABLED_GOODS_DISCOUNT);
			return hisDetailMapper.insertRuleDetails(mid, Constants.ENABLED_GOODS_DISCOUNT, ruleCode.getName(), 
					ruleDetails.toString(), operationType, operationStaff, createTime);
		}
		
	}
	
	@Override
	public int save(List<MerchantGoodsDiscount> goodsDiscounts, String username, int mid) throws YdpException {
		for (MerchantGoodsDiscount merchantGoodsDiscount : goodsDiscounts) {
			this.save(merchantGoodsDiscount, username, mid);
		}
		return 0;
	}

	@Override
	public int delete(int id, int mid, String username) {
		MerchantGoodsDiscountExample example = new MerchantGoodsDiscountExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		insertHisDetail(id, mid, Constants.RULEHIS_TYPE_DELETE, username, new Date());
		return mapper.deleteByExample(example);
	}

	@Override
	public List<MerchantGoodsDiscountVo> listAll(int mid) {
		List<MerchantGoodsDiscountVo> vos = new ArrayList<>();
		List<Map<String, Object>> goodsDiscounts = mapper.listAll(mid);
		for (Map<String, Object> map : goodsDiscounts) {
			vos.add(mapToVo(map));
		}
		return vos;
	}
	
	private MerchantGoodsDiscountVo mapToVo(Map<String, Object> map) {
		MerchantGoodsDiscountVo vo = new MerchantGoodsDiscountVo();
		vo.setId((int)map.get("id"));
		vo.setMerchantId((int)map.get("merchant_id"));
		vo.setDiscountName(map.get("discount_name") != null ? map.get("discount_name").toString() : null);
		BigDecimal discountValue = (BigDecimal)map.get("discount_value");
		vo.setDiscountValue(discountValue);
		vo.setGoodsId((int)map.get("goods_id"));
		if(map.get("old_price") != null) {
			BigDecimal oldPrice = (BigDecimal)map.get("old_price");
			BigDecimal price = discountValue.multiply(BigDecimal.valueOf(10)).divide(BigDecimal.valueOf(100))
					.multiply(oldPrice);
			vo.setPrice(price);
			vo.setOldPrice(oldPrice);
		}
		vo.setGoodsName(map.get("name") != null ? map.get("name").toString() : null);
		vo.setUnitName(map.get("unit_name") != null ? map.get("unit_name").toString() : null);
		vo.setEffectiveTime(map.get("effective_time") != null ? map.get("effective_time").toString() : null);
		vo.setExpiredTime(map.get("expired_time") != null ? map.get("expired_time").toString() : null);
		vo.setEffectiveStatus(map.get("effective_status") != null ? map.get("effective_status").toString() : null);
		vo.setExpiredStatus(map.get("expired_status") != null ? map.get("expired_status").toString() : null);
		vo.setGoodsStatus(map.get("goods_status") != null ? map.get("goods_status").toString() : null);
		return vo;
	}
	
	@Override
	public List<MerchantGoodsDiscount> listBasicEffectiveGoodsDiscount(int mid) {
		return mapper.listBasicEffectiveGoodsDiscount(mid);
	}
	
	/**
	 * 查询当前有效的商品折扣(包括商品信息)
	 */
	@Override
	public List<MerchantGoodsDiscountVo> listEffectiveGoodsDiscount(int mid) {
		List<MerchantGoodsDiscountVo> vos = new ArrayList<>();
		List<Map<String, Object>> goodsDiscounts = mapper.listEffectiveGoodsDiscount(mid);
		for (Map<String, Object> map : goodsDiscounts) {
			vos.add(mapToVo(map));
		}
		return vos;
	}
	
	@Override
	public List<MerchantGoodsDiscount> listAllBySync(int mid) {
		MerchantGoodsDiscountExample example = new MerchantGoodsDiscountExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}
	
}
