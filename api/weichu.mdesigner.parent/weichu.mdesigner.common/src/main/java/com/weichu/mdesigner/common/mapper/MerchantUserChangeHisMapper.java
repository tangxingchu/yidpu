package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantUserChangeHis;
import com.weichu.mdesigner.common.entity.MerchantUserChangeHisExample;

public interface MerchantUserChangeHisMapper {
    long countByExample(MerchantUserChangeHisExample example);

    int deleteByExample(MerchantUserChangeHisExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantUserChangeHis record);

    int insertSelective(MerchantUserChangeHis record);

    List<MerchantUserChangeHis> selectByExample(MerchantUserChangeHisExample example);

    MerchantUserChangeHis selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantUserChangeHis record);

    int updateByPrimaryKey(MerchantUserChangeHis record);
    
    /**
     * 更新审核id
     * @param merchantId
     * @param auditId
     * @return
     */
	int updateAuditId(@Param("merchantId")Integer merchantId, @Param("auditId")Integer auditId);
}