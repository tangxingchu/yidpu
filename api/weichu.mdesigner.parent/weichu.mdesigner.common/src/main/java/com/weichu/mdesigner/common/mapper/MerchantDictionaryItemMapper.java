package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantDictionaryItem;
import com.weichu.mdesigner.common.entity.MerchantDictionaryItemExample;

public interface MerchantDictionaryItemMapper {
    int deleteByExample(MerchantDictionaryItemExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantDictionaryItem record);

    int insertSelective(MerchantDictionaryItem record);

    List<MerchantDictionaryItem> selectByExample(MerchantDictionaryItemExample example);

    MerchantDictionaryItem selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantDictionaryItem record);

    int updateByPrimaryKey(MerchantDictionaryItem record);
}