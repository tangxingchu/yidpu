package com.weichu.mdesigner.api.mapper;

import java.util.List;

import com.weichu.mdesigner.api.entity.MerchantUserRole;
import com.weichu.mdesigner.api.entity.MerchantUserRoleExample;

public interface MerchantUserRoleMapper {
    int deleteByExample(MerchantUserRoleExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantUserRole record);

    int insertSelective(MerchantUserRole record);

    List<MerchantUserRole> selectByExample(MerchantUserRoleExample example);

    MerchantUserRole selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantUserRole record);

    int updateByPrimaryKey(MerchantUserRole record);
}