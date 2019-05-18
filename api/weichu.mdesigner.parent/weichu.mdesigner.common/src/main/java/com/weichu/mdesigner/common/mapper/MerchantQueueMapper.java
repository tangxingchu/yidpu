package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantQueue;
import com.weichu.mdesigner.common.entity.MerchantQueueExample;

public interface MerchantQueueMapper {
    long countByExample(MerchantQueueExample example);

    int deleteByExample(MerchantQueueExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantQueue record);

    int insertSelective(MerchantQueue record);

    List<MerchantQueue> selectByExample(MerchantQueueExample example);

    MerchantQueue selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantQueue record);

    int updateByPrimaryKey(MerchantQueue record);
}