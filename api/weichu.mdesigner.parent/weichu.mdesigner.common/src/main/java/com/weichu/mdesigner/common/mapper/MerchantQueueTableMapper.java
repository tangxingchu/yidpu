package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantQueueTable;
import com.weichu.mdesigner.common.entity.MerchantQueueTableExample;

public interface MerchantQueueTableMapper {
    long countByExample(MerchantQueueTableExample example);

    int deleteByExample(MerchantQueueTableExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantQueueTable record);

    int insertSelective(MerchantQueueTable record);

    List<MerchantQueueTable> selectByExample(MerchantQueueTableExample example);

    MerchantQueueTable selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantQueueTable record);

    int updateByPrimaryKey(MerchantQueueTable record);
    
    /**
     * 删除已经不存在的桌台
     * @param tableCodes
     * @param mid
     * @return
     */
	int deleteByTable(@Param("merchantId")Integer merchantId, @Param("floorId")Integer floorId);
}