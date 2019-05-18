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

import com.weichu.mdesigner.api.service.IMerchantGoodsCouponService;
import com.weichu.mdesigner.api.vo.MerchantGoodsCouponVo;
import com.weichu.mdesigner.common.entity.MerchantGoodsCoupon;
import com.weichu.mdesigner.common.entity.MerchantGoodsCouponExample;
import com.weichu.mdesigner.common.mapper.MerchantGoodsCouponMapper;
import com.weichu.mdesigner.utils.DateUtil;

/**
 * 电子优惠券
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantGoodsCouponServiceImpl implements IMerchantGoodsCouponService {

	@Autowired
	private MerchantGoodsCouponMapper mapper;
	
	@Override
	public int save(MerchantGoodsCoupon goodsCoupon, int mid) {
		goodsCoupon.setMerchantId(mid);
		goodsCoupon.setEnabled("1");
		goodsCoupon.setCreateTime(new Date());
		if(goodsCoupon.getEffectiveTime() != null) {
			Date effectiveTime = DateUtil.beginOfDay(goodsCoupon.getEffectiveTime());
			goodsCoupon.setEffectiveTime(effectiveTime);
		}
		if(goodsCoupon.getExpiredTime() != null) {
			Date expiredTime = DateUtil.endOfDayMysql(goodsCoupon.getExpiredTime());
			goodsCoupon.setExpiredTime(expiredTime);
		}
		mapper.insertSelective(goodsCoupon);
		return goodsCoupon.getId();
	}

	@Override
	public int delete(int id, int mid) {
		MerchantGoodsCouponExample example = new MerchantGoodsCouponExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		return mapper.deleteByExample(example);
	}

	@Override
	public List<MerchantGoodsCouponVo> listAll(int mid) {
		List<MerchantGoodsCouponVo> vos = new ArrayList<>();
		List<Map<String, Object>> goodsCoupons = mapper.listAll(mid);
		for (Map<String, Object> map : goodsCoupons) {
			vos.add(mapToVo(map));
		}
		return vos;
	}
	
	private MerchantGoodsCouponVo mapToVo(Map<String, Object> map) {
		MerchantGoodsCouponVo vo = new MerchantGoodsCouponVo();
		vo.setId((int)map.get("id"));
		vo.setMerchantId((int)map.get("merchant_id"));
		vo.setConsumePrice((BigDecimal)map.get("consume_price"));
		vo.setName(map.get("name") != null ? map.get("name").toString() : null);
		vo.setAmount((BigDecimal)map.get("amount"));
		vo.setCount((int)map.get("count"));
		vo.setDescription(map.get("description") != null ? map.get("description").toString() : null);
		vo.setEffectiveTime(map.get("effective_time") != null ? map.get("effective_time").toString() : null);
		vo.setExpiredTime(map.get("expired_time") != null ? map.get("expired_time").toString() : null);
		vo.setEffectiveStatus(map.get("effective_status") != null ? map.get("effective_status").toString() : null);
		vo.setExpiredStatus(map.get("expired_status") != null ? map.get("expired_status").toString() : null);
		return vo;
	}
	
	/**
	 * 查询当前有效的电子优惠券
	 */
	@Override
	public List<MerchantGoodsCouponVo> listEffectiveCoupon(int mid) {
		List<MerchantGoodsCouponVo> vos = new ArrayList<>();
		List<Map<String, Object>> goodsCoupons = mapper.listEffectiveCoupon(mid);
		for (Map<String, Object> map : goodsCoupons) {
			vos.add(mapToVo(map));
		}
		return vos;
	}

}
