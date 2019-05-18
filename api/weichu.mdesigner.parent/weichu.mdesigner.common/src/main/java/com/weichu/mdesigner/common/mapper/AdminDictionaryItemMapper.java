package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.AdminDictionaryItem;
import com.weichu.mdesigner.common.entity.AdminDictionaryItemExample;

public interface AdminDictionaryItemMapper {
    int deleteByExample(AdminDictionaryItemExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(AdminDictionaryItem record);

    int insertSelective(AdminDictionaryItem record);

    List<AdminDictionaryItem> selectByExample(AdminDictionaryItemExample example);

    AdminDictionaryItem selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminDictionaryItem record);

    int updateByPrimaryKey(AdminDictionaryItem record);
}