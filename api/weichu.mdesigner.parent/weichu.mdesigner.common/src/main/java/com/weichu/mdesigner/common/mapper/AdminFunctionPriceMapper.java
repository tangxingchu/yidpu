package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.AdminFunctionPrice;
import com.weichu.mdesigner.common.entity.AdminFunctionPriceExample;

public interface AdminFunctionPriceMapper {
    long countByExample(AdminFunctionPriceExample example);

    int deleteByExample(AdminFunctionPriceExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(AdminFunctionPrice record);

    int insertSelective(AdminFunctionPrice record);

    List<AdminFunctionPrice> selectByExample(AdminFunctionPriceExample example);

    AdminFunctionPrice selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminFunctionPrice record);

    int updateByPrimaryKey(AdminFunctionPrice record);
}