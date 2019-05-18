package com.weichu.mdesigner.common.mapper;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.MerchantPayLog;
import com.weichu.mdesigner.common.entity.MerchantPayLogExample;

public interface MerchantPayLogMapper {
    long countByExample(MerchantPayLogExample example);

    int deleteByExample(MerchantPayLogExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantPayLog record);

    int insertSelective(MerchantPayLog record);

    List<MerchantPayLog> selectByExample(MerchantPayLogExample example);

    MerchantPayLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantPayLog record);

    int updateByPrimaryKey(MerchantPayLog record);
    
    /**
     * 根据条件分页查询
     * @param params
     * @return
     */
	List<MerchantPayLog> selectByParams(Map<String, Object> params);
}