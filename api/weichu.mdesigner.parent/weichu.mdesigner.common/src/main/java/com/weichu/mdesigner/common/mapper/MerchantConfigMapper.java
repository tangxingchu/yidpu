package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantConfig;
import com.weichu.mdesigner.common.entity.MerchantConfigExample;

public interface MerchantConfigMapper {
    long countByExample(MerchantConfigExample example);

    int deleteByExample(MerchantConfigExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantConfig record);

    int insertSelective(MerchantConfig record);

    List<MerchantConfig> selectByExample(MerchantConfigExample example);

    MerchantConfig selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantConfig record);

    int updateByPrimaryKey(MerchantConfig record);
    
    int updateByConfigCode(MerchantConfig record);
}