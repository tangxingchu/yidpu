package com.weichu.mdesigner.common.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantUserFunction;
import com.weichu.mdesigner.common.entity.MerchantUserFunctionExample;

public interface MerchantUserFunctionMapper {
	long countByExample(MerchantUserFunctionExample example);

    int deleteByExample(MerchantUserFunctionExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantUserFunction record);

    int insertSelective(MerchantUserFunction record);

    List<MerchantUserFunction> selectByExample(MerchantUserFunctionExample example);

    MerchantUserFunction selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantUserFunction record);

    int updateByPrimaryKey(MerchantUserFunction record);
    
    /**
     * 用户订购菜单功能续费
     * @param dateTime
     * @param mid
     * @return
     */
	int updateEffectiveTime(@Param("expirationTime")Date expirationTime, @Param("functionId")Integer functionId,
			@Param("merchantId")Integer merchantId);
}