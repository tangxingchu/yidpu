package com.weichu.mdesigner.api.mapper;

import java.util.List;

import com.weichu.mdesigner.api.entity.MerchantGoodsHis;
import com.weichu.mdesigner.api.entity.MerchantGoodsHisExample;

public interface MerchantGoodsHisMapper {
    long countByExample(MerchantGoodsHisExample example);

    int deleteByExample(MerchantGoodsHisExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantGoodsHis record);

    int insertSelective(MerchantGoodsHis record);

    List<MerchantGoodsHis> selectByExample(MerchantGoodsHisExample example);

    MerchantGoodsHis selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantGoodsHis record);

    int updateByPrimaryKey(MerchantGoodsHis record);
}