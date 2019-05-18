package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.AdminVersion;
import com.weichu.mdesigner.common.entity.AdminVersionExample;

public interface AdminVersionMapper {
    long countByExample(AdminVersionExample example);

    int deleteByExample(AdminVersionExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(AdminVersion record);

    int insertSelective(AdminVersion record);

    List<AdminVersion> selectByExample(AdminVersionExample example);

    AdminVersion selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminVersion record);

    int updateByPrimaryKey(AdminVersion record);
    
    /**
     * 查询最新版本信息,按日期排序取第一条数据
     * @return
     */
    AdminVersion selectLastVersion(@Param("appType")Integer appType);
}