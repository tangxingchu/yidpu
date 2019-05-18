package com.weichu.mdesigner.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantGoodsDiscount;
import com.weichu.mdesigner.common.entity.MerchantGoodsDiscountExample;

public interface MerchantGoodsDiscountMapper {
    long countByExample(MerchantGoodsDiscountExample example);

    int deleteByExample(MerchantGoodsDiscountExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantGoodsDiscount record);

    int insertSelective(MerchantGoodsDiscount record);

    List<MerchantGoodsDiscount> selectByExample(MerchantGoodsDiscountExample example);

    MerchantGoodsDiscount selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantGoodsDiscount record);

    int updateByPrimaryKey(MerchantGoodsDiscount record);
    
    /**
     * 查询所有折扣商品
     * @param mid
     * @return
     */
	List<Map<String, Object>> listAll(@Param("merchantId")int merchantId);
	
	
	Map<String, Object> listById(@Param("id")int id, @Param("merchantId")int merchantId);
	
	/**
	 * 查询当前有效的折扣商品(只有基础信息)
	 * @param merchantId
	 * @return
	 */
	List<MerchantGoodsDiscount> listBasicEffectiveGoodsDiscount(@Param("merchantId")int merchantId);
	
	/**
     * 查询当天有效特价商品(包括商品信息信息)
     * @param week
     * @param merchantId
     * @return
     */
    List<Map<String, Object>> listEffectiveGoodsDiscount(@Param("merchantId")int merchantId);
}