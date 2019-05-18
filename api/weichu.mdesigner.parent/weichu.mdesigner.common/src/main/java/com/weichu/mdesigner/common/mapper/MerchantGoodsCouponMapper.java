package com.weichu.mdesigner.common.mapper;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.MerchantGoodsCoupon;
import com.weichu.mdesigner.common.entity.MerchantGoodsCouponExample;

public interface MerchantGoodsCouponMapper {
    long countByExample(MerchantGoodsCouponExample example);

    int deleteByExample(MerchantGoodsCouponExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantGoodsCoupon record);

    int insertSelective(MerchantGoodsCoupon record);

    List<MerchantGoodsCoupon> selectByExample(MerchantGoodsCouponExample example);

    MerchantGoodsCoupon selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantGoodsCoupon record);

    int updateByPrimaryKey(MerchantGoodsCoupon record);

    /**
     * 查询所有优惠券信息
     * @param mid
     * @return
     */
	List<Map<String, Object>> listAll(int mid);

	/**
	 * 查询当前有效的电子优惠券
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> listEffectiveCoupon(int mid);
}