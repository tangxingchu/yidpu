package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantAlipayInfo;
import com.weichu.mdesigner.common.entity.MerchantAlipayInfoExample;

public interface MerchantAlipayInfoMapper {
    long countByExample(MerchantAlipayInfoExample example);

    int deleteByExample(MerchantAlipayInfoExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantAlipayInfo record);

    int insertSelective(MerchantAlipayInfo record);

    List<MerchantAlipayInfo> selectByExample(MerchantAlipayInfoExample example);

    MerchantAlipayInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantAlipayInfo record);

    int updateByPrimaryKey(MerchantAlipayInfo record);

    /**
     * 根据商家id变更支付宝收款账号
     * @param oldAlipayInfo
     * @return
     */
	int updateAlipayInfo(MerchantAlipayInfo oldAlipayInfo);
}