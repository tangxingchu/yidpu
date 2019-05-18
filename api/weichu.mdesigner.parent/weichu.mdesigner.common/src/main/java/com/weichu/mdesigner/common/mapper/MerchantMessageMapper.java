package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantMessage;
import com.weichu.mdesigner.common.entity.MerchantMessageExample;

public interface MerchantMessageMapper {
    long countByExample(MerchantMessageExample example);

    int deleteByExample(MerchantMessageExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantMessage record);

    int insertSelective(MerchantMessage record);

    List<MerchantMessage> selectByExampleWithBLOBs(MerchantMessageExample example);

    List<MerchantMessage> selectByExample(MerchantMessageExample example);

    MerchantMessage selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantMessage record);

    int updateByPrimaryKeyWithBLOBs(MerchantMessage record);

    int updateByPrimaryKey(MerchantMessage record);
    
    /**
     * 修改消息状态为已读
     * @param merchantId
     * @param id
     * @return
     */
    int updateReadStatus(@Param("reciveUserId")int reciveUserId, @Param("id")int id);
}