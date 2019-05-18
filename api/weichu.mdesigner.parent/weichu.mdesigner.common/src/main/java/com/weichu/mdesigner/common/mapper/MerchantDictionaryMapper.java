package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantDictionary;
import com.weichu.mdesigner.common.entity.MerchantDictionaryExample;

public interface MerchantDictionaryMapper {
    int deleteByExample(MerchantDictionaryExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantDictionary record);

    int insertSelective(MerchantDictionary record);

    List<MerchantDictionary> selectByExample(MerchantDictionaryExample example);

    MerchantDictionary selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantDictionary record);

    int updateByPrimaryKey(MerchantDictionary record);
}