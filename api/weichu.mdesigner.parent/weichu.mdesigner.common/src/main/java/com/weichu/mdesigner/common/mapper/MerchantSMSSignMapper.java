package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantSMSSign;
import com.weichu.mdesigner.common.entity.MerchantSMSSignExample;

public interface MerchantSMSSignMapper {
    long countByExample(MerchantSMSSignExample example);

    int deleteByExample(MerchantSMSSignExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantSMSSign record);

    int insertSelective(MerchantSMSSign record);

    List<MerchantSMSSign> selectByExample(MerchantSMSSignExample example);

    MerchantSMSSign selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantSMSSign record);

    int updateByPrimaryKey(MerchantSMSSign record);
    
    /**
     * 根据商家ID修改
     * @param smsSign
     * @return
     */
	int updateByMid(MerchantSMSSign smsSign);
}