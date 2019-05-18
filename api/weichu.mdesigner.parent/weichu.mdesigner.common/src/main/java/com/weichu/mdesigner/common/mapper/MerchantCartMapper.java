package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantCart;
import com.weichu.mdesigner.common.entity.MerchantCartExample;

public interface MerchantCartMapper {
    long countByExample(MerchantCartExample example);

    int deleteByExample(MerchantCartExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantCart record);

    int insertSelective(MerchantCart record);

    List<MerchantCart> selectByExample(MerchantCartExample example);

    MerchantCart selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantCart record);

    int updateByPrimaryKey(MerchantCart record);
}