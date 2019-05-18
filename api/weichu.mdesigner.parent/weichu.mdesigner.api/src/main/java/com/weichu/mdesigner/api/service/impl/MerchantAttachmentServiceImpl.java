package com.weichu.mdesigner.api.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.service.IMerchantAttachmentService;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.common.entity.MerchantAttachmentExample;
import com.weichu.mdesigner.common.mapper.MerchantAttachmentMapper;


@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantAttachmentServiceImpl implements IMerchantAttachmentService {

	private Logger logger = LoggerFactory.getLogger(MerchantAttachmentServiceImpl.class);
	
	@Autowired
	private MerchantAttachmentMapper mapper;
	
	@Override
	public long count(MerchantAttachment attachment, int mid) {
		MerchantAttachmentExample example = new MerchantAttachmentExample();
		example.createCriteria().andMerchantIdEqualTo(attachment.getMerchantId())
			.andUidEqualTo(attachment.getUid());
		return mapper.countByExample(example);
	}
	
	public long count(int uid, int mid) {
		MerchantAttachmentExample example = new MerchantAttachmentExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andUidEqualTo(uid)
		.andCategoryEqualTo(2);
		return mapper.countByExample(example);
	}
	
	public MerchantAttachment selectById(int id, int mid) {
		MerchantAttachmentExample example = new MerchantAttachmentExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		List<MerchantAttachment> attachments = mapper.selectByExample(example);
		if(attachments!= null && attachments.size() > 0) {
			return attachments.get(0);
		} else {
			return null;
		}
	}
	
	public List<MerchantAttachment> list(MerchantAttachment attachment, int mid) {
		MerchantAttachmentExample example = new MerchantAttachmentExample();
		MerchantAttachmentExample.Criteria criteria = example.createCriteria().andMerchantIdEqualTo(mid);
		if(!StringUtils.isEmpty(attachment.getUid())) {
			criteria.andUidEqualTo(attachment.getUid());
		}
		if(!StringUtils.isEmpty(attachment.getCategory())) {
			criteria.andCategoryEqualTo(attachment.getCategory());
		}
		return mapper.selectByExample(example);
	}

}
