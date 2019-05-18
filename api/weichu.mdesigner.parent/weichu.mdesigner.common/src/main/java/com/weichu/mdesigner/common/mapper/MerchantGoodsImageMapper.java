package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantGoodsImage;
import com.weichu.mdesigner.common.entity.MerchantGoodsImageExample;

public interface MerchantGoodsImageMapper {
    long countByExample(MerchantGoodsImageExample example);

    int deleteByExample(MerchantGoodsImageExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantGoodsImage record);

    int insertSelective(MerchantGoodsImage record);

    List<MerchantGoodsImage> selectByExample(MerchantGoodsImageExample example);

    MerchantGoodsImage selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantGoodsImage record);

    int updateByPrimaryKey(MerchantGoodsImage record);
    
    int updateDefaultDisByGoodsId(@Param("goodsId") int goodsId, @Param("merchantId") int merchantId);
}