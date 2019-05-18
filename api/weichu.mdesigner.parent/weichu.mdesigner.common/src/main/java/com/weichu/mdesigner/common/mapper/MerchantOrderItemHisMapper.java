package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantOrderItemHis;
import com.weichu.mdesigner.common.entity.MerchantOrderItemHisExample;

public interface MerchantOrderItemHisMapper {
    long countByExample(MerchantOrderItemHisExample example);

    int deleteByExample(MerchantOrderItemHisExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantOrderItemHis record);

    int insertSelective(MerchantOrderItemHis record);

    List<MerchantOrderItemHis> selectByExample(MerchantOrderItemHisExample example);

    MerchantOrderItemHis selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantOrderItemHis record);

    int updateByPrimaryKey(MerchantOrderItemHis record);
    
    /**
     * 支付成功后订单入历史表
     * @param orderNo
     * @return
     */
    int insertFromOrder(@Param("orderNo")String orderNo, @Param("merchantId")Integer merchantId);
}