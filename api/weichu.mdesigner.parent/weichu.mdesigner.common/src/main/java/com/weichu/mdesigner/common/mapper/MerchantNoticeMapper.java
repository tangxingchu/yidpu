package com.weichu.mdesigner.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantNotice;
import com.weichu.mdesigner.common.entity.MerchantNoticeExample;

public interface MerchantNoticeMapper {
    long countByExample(MerchantNoticeExample example);

    int deleteByExample(MerchantNoticeExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantNotice record);

    int insertSelective(MerchantNotice record);

    List<MerchantNotice> selectByExampleWithBLOBs(MerchantNoticeExample example);

    List<MerchantNotice> selectByExample(MerchantNoticeExample example);

    MerchantNotice selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantNotice record);

    int updateByPrimaryKeyWithBLOBs(MerchantNotice record);

    int updateByPrimaryKey(MerchantNotice record);
    
    /**
     * 查询所有通知
     * @param merchantId
     * @return
     */
    List<Map<String, Object>> selectAllNotice(@Param("merchantId")int merchantId);
    
    /**
     * 查询未读通知与消息总数
     * @param merchantId
     * @return
     */
    long selectUnReadNoticeAndMessageCount(@Param("merchantId")int merchantId);
    
}