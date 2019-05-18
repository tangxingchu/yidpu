package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.AdminLog;
import com.weichu.mdesigner.common.entity.AdminLogExample;

public interface AdminLogMapper {
    long countByExample(AdminLogExample example);

    int deleteByExample(AdminLogExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(AdminLog record);

    int insertSelective(AdminLog record);

    List<AdminLog> selectByExampleWithBLOBs(AdminLogExample example);

    List<AdminLog> selectByExample(AdminLogExample example);

    AdminLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminLog record);

    int updateByPrimaryKeyWithBLOBs(AdminLog record);

    int updateByPrimaryKey(AdminLog record);
}