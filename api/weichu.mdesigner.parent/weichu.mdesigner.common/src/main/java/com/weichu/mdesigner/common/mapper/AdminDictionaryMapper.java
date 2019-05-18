package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.AdminDictionary;
import com.weichu.mdesigner.common.entity.AdminDictionaryExample;

public interface AdminDictionaryMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AdminDictionary record);

    int insertSelective(AdminDictionary record);

    List<AdminDictionary> selectByExample(AdminDictionaryExample example);

    AdminDictionary selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminDictionary record);

    int updateByPrimaryKey(AdminDictionary record);
    
}