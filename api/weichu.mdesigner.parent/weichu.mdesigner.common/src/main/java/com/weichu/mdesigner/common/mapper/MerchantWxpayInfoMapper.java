package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantWxpayInfo;
import com.weichu.mdesigner.common.entity.MerchantWxpayInfoExample;

public interface MerchantWxpayInfoMapper {
    long countByExample(MerchantWxpayInfoExample example);

    int deleteByExample(MerchantWxpayInfoExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantWxpayInfo record);

    int insertSelective(MerchantWxpayInfo record);

    List<MerchantWxpayInfo> selectByExample(MerchantWxpayInfoExample example);

    MerchantWxpayInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantWxpayInfo record);

    int updateByPrimaryKey(MerchantWxpayInfo record);
}