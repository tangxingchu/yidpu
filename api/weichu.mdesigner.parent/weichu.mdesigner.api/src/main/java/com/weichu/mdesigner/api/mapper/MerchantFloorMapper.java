package com.weichu.mdesigner.api.mapper;

import java.util.List;

import com.weichu.mdesigner.api.entity.MerchantFloor;
import com.weichu.mdesigner.api.entity.MerchantFloorExample;

public interface MerchantFloorMapper {
    long countByExample(MerchantFloorExample example);

    int deleteByExample(MerchantFloorExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantFloor record);

    int insertSelective(MerchantFloor record);

    List<MerchantFloor> selectByExample(MerchantFloorExample example);

    MerchantFloor selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantFloor record);

    int updateByPrimaryKey(MerchantFloor record);
}