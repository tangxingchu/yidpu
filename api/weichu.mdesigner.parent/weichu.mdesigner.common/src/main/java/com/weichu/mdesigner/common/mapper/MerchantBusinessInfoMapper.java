package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantBusinessInfo;
import com.weichu.mdesigner.common.entity.MerchantBusinessInfoExample;

public interface MerchantBusinessInfoMapper {
    long countByExample(MerchantBusinessInfoExample example);

    int deleteByExample(MerchantBusinessInfoExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantBusinessInfo record);

    int insertSelective(MerchantBusinessInfo record);

    List<MerchantBusinessInfo> selectByExample(MerchantBusinessInfoExample example);

    MerchantBusinessInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantBusinessInfo record);

    int updateByPrimaryKey(MerchantBusinessInfo record);
    
    /**
     * 查询积分返现1元需要多少积分
     * @param mid
     * @return
     */
    Integer selectPointCash(@Param("merchantId") Integer mid);
    
    /**
     * 根据merchantId修改
     * @param businessInfo
     * @return
     */
	int updateByEntity(MerchantBusinessInfo businessInfo);
}