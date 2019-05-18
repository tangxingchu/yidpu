package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantGoodsExtraItem;
import com.weichu.mdesigner.common.entity.MerchantGoodsExtraItemExample;
import com.weichu.mdesigner.common.vo.MerchantGoodsExtraItemVo;

public interface MerchantGoodsExtraItemMapper {
    long countByExample(MerchantGoodsExtraItemExample example);

    int deleteByExample(MerchantGoodsExtraItemExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantGoodsExtraItem record);

    int insertSelective(MerchantGoodsExtraItem record);

    List<MerchantGoodsExtraItem> selectByExample(MerchantGoodsExtraItemExample example);

    MerchantGoodsExtraItem selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantGoodsExtraItem record);

    int updateByPrimaryKey(MerchantGoodsExtraItem record);

	List<MerchantGoodsExtraItemVo> listExtraItemVo(@Param("goodsId")int goodsId, @Param("merchantId")int mid);
}