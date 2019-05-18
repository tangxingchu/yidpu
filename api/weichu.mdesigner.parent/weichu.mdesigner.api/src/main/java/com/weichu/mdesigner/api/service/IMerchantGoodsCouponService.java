package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.api.vo.MerchantGoodsCouponVo;
import com.weichu.mdesigner.common.entity.MerchantGoodsCoupon;

/**
 * 电子优惠券
 * @author Administrator
 *
 */
public interface IMerchantGoodsCouponService {
	
	/**
	 * 新增
	 * @param goodsDiscount
	 * @return
	 */
	int save(MerchantGoodsCoupon goodsCoupon, int mid);
	
	/**
	 * 移除消费满多少规则
	 * @param id
	 * @param mid
	 * @return
	 */
	int delete(int id, int mid);
	
	/**
	 * 查询所有消费满多少规则
	 * @param mid
	 * @return
	 */
	List<MerchantGoodsCouponVo> listAll(int mid);
	
	
	/**
	 * 查询当前有效的电子优惠券
	 */
	List<MerchantGoodsCouponVo> listEffectiveCoupon(int mid);
	
}
