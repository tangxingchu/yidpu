package com.weichu.mdesigner.common.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantRoleFunction;
import com.weichu.mdesigner.common.entity.MerchantRoleFunctionExample;

public interface MerchantRoleFunctionMapper {
    long countByExample(MerchantRoleFunctionExample example);

    int deleteByExample(MerchantRoleFunctionExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantRoleFunction record);

    int insertSelective(MerchantRoleFunction record);

    List<MerchantRoleFunction> selectByExample(MerchantRoleFunctionExample example);

    MerchantRoleFunction selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") MerchantRoleFunction record, @Param("example") MerchantRoleFunctionExample example);

    int updateByExample(@Param("record") MerchantRoleFunction record, @Param("example") MerchantRoleFunctionExample example);

    int updateByPrimaryKeySelective(MerchantRoleFunction record);

    int updateByPrimaryKey(MerchantRoleFunction record);
}