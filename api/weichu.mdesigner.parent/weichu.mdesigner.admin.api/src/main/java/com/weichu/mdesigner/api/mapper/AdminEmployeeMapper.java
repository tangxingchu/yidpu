package com.weichu.mdesigner.api.mapper;

import java.util.List;

import com.weichu.mdesigner.api.entity.AdminEmployee;
import com.weichu.mdesigner.api.entity.AdminEmployeeExample;

public interface AdminEmployeeMapper {
    long countByExample(AdminEmployeeExample example);

    int deleteByExample(AdminEmployeeExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(AdminEmployee record);

    int insertSelective(AdminEmployee record);

    List<AdminEmployee> selectByExample(AdminEmployeeExample example);

    AdminEmployee selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminEmployee record);

    int updateByPrimaryKey(AdminEmployee record);
}