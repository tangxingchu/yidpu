package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.GoodsCategory;
import com.weichu.mdesigner.common.entity.GoodsCategoryExample;


public interface GoodsCategoryMapper {
    long countByExample(GoodsCategoryExample example);

    int deleteByExample(GoodsCategoryExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(GoodsCategory record);

    int insertSelective(GoodsCategory record);

    List<GoodsCategory> selectByExample(GoodsCategoryExample example);

    GoodsCategory selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(GoodsCategory record);

    int updateByPrimaryKey(GoodsCategory record);
}