package com.weichu.mdesigner.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantGoodsDay;
import com.weichu.mdesigner.common.entity.MerchantGoodsDayExample;

public interface MerchantGoodsDayMapper {
    long countByExample(MerchantGoodsDayExample example);

    int deleteByExample(MerchantGoodsDayExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantGoodsDay record);

    int insertSelective(MerchantGoodsDay record);

    List<MerchantGoodsDay> selectByExample(MerchantGoodsDayExample example);

    MerchantGoodsDay selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantGoodsDay record);

    int updateByPrimaryKey(MerchantGoodsDay record);
    
    /**
     * 查询所有特价商品
     * @param merchantId
     * @return
     */
    List<Map<String, Object>> listAll(@Param("merchantId")int merchantId); 
    
    Map<String, Object> listById(@Param("id")int id, @Param("merchantId")int merchantId);
    
    /**
     * 查询当天所有有效的特价商品(只有自身基础信息)
     * @param week
     * @param merchantId
     * @return
     */
    List<MerchantGoodsDay> listBasicToday(@Param("week")int week, @Param("merchantId")int merchantId);
    
    /**
     * 查询当天有效特价商品(包括商品信息信息)
     * @param week
     * @param merchantId
     * @return
     */
    List<Map<String, Object>> listToday(@Param("week")int week, @Param("merchantId")int merchantId);
    
}