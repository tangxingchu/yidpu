package com.weichu.mdesigner.common.mapper;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.common.entity.MerchantAttachmentExample;


public interface MerchantAttachmentMapper {
    long countByExample(MerchantAttachmentExample example);

    int deleteByExample(MerchantAttachmentExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantAttachment record);

    int insertSelective(MerchantAttachment record);

    List<MerchantAttachment> selectByExample(MerchantAttachmentExample example);

    MerchantAttachment selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantAttachment record);

    int updateByPrimaryKey(MerchantAttachment record);
}