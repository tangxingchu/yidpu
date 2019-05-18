package com.weichu.mdesigner.common.mapper;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.MerchantCashierLog;
import com.weichu.mdesigner.common.entity.MerchantCashierLogExample;

public interface MerchantCashierLogMapper {
    long countByExample(MerchantCashierLogExample example);

    int deleteByExample(MerchantCashierLogExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantCashierLog record);

    int insertSelective(MerchantCashierLog record);

    List<MerchantCashierLog> selectByExample(MerchantCashierLogExample example);

    MerchantCashierLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantCashierLog record);

    int updateByPrimaryKey(MerchantCashierLog record);
    
    /**
     * 根据条件分页查询
     * @param params
     * @return
     */
	List<MerchantCashierLog> selectByParams(Map<String, Object> params);
}