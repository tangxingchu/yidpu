package com.weichu.mdesigner.api.mapper;

import java.util.List;

import com.weichu.mdesigner.api.entity.MerchantEmployee;
import com.weichu.mdesigner.api.entity.MerchantEmployeeExample;

public interface MerchantEmployeeMapper {
    long countByExample(MerchantEmployeeExample example);

    int deleteByExample(MerchantEmployeeExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantEmployee record);

    int insertSelective(MerchantEmployee record);

    List<MerchantEmployee> selectByExample(MerchantEmployeeExample example);

    MerchantEmployee selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantEmployee record);

    int updateByPrimaryKey(MerchantEmployee record);
    
    /**
     * 批量插入
     * @param records
     * @return
     */
    int insertBatch(List<MerchantEmployee> records);
}