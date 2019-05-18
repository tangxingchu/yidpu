package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantAlipay;
import com.weichu.mdesigner.common.entity.MerchantAlipayExample;

public interface MerchantAlipayMapper {
    long countByExample(MerchantAlipayExample example);

    int deleteByExample(MerchantAlipayExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantAlipay record);

    int insertSelective(MerchantAlipay record);

    List<MerchantAlipay> selectByExample(MerchantAlipayExample example);

    MerchantAlipay selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantAlipay record);

    int updateByPrimaryKey(MerchantAlipay record);
    
    /**
     * 根据商家id修改支付宝配置
     * @param record
     * @return
     */
    int updateByMerchantId(MerchantAlipay record);
}