package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantNoticeStatus;
import com.weichu.mdesigner.common.entity.MerchantNoticeStatusExample;

public interface MerchantNoticeStatusMapper {
    long countByExample(MerchantNoticeStatusExample example);

    int deleteByExample(MerchantNoticeStatusExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantNoticeStatus record);

    int insertSelective(MerchantNoticeStatus record);

    List<MerchantNoticeStatus> selectByExample(MerchantNoticeStatusExample example);

    MerchantNoticeStatus selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantNoticeStatus record);

    int updateByPrimaryKey(MerchantNoticeStatus record);
}