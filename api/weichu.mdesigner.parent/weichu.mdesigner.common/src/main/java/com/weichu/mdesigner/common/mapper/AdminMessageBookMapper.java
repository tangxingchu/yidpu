package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.AdminMessageBook;
import com.weichu.mdesigner.common.entity.AdminMessageBookExample;

public interface AdminMessageBookMapper {
    long countByExample(AdminMessageBookExample example);

    int deleteByExample(AdminMessageBookExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(AdminMessageBook record);

    int insertSelective(AdminMessageBook record);

    List<AdminMessageBook> selectByExample(AdminMessageBookExample example);

    AdminMessageBook selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminMessageBook record);

    int updateByPrimaryKey(AdminMessageBook record);
}