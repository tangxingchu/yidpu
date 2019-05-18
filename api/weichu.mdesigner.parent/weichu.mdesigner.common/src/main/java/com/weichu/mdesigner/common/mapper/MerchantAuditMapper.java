package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantAudit;
import com.weichu.mdesigner.common.entity.MerchantAuditExample;

public interface MerchantAuditMapper {
    long countByExample(MerchantAuditExample example);

    int deleteByExample(MerchantAuditExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantAudit record);

    int insertSelective(MerchantAudit record);

    List<MerchantAudit> selectByExample(MerchantAuditExample example);

    MerchantAudit selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantAudit record);

    int updateByPrimaryKey(MerchantAudit record);
}