package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantGoodsExtra;
import com.weichu.mdesigner.common.entity.MerchantGoodsExtraExample;

public interface MerchantGoodsExtraMapper {
    long countByExample(MerchantGoodsExtraExample example);

    int deleteByExample(MerchantGoodsExtraExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantGoodsExtra record);

    int insertSelective(MerchantGoodsExtra record);

    List<MerchantGoodsExtra> selectByExample(MerchantGoodsExtraExample example);

    MerchantGoodsExtra selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantGoodsExtra record);

    int updateByPrimaryKey(MerchantGoodsExtra record);
}