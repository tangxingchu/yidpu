package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantImageHis;
import com.weichu.mdesigner.common.entity.MerchantImageHisExample;

public interface MerchantImageHisMapper {
    long countByExample(MerchantImageHisExample example);

    int deleteByExample(MerchantImageHisExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantImageHis record);

    int insertSelective(MerchantImageHis record);

    List<MerchantImageHis> selectByExample(MerchantImageHisExample example);

    MerchantImageHis selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantImageHis record);

    int updateByPrimaryKey(MerchantImageHis record);
}