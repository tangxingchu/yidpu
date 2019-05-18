package com.weichu.mdesigner.api.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantAuditService;
import com.weichu.mdesigner.common.entity.MerchantAudit;
import com.weichu.mdesigner.common.entity.MerchantAuditExample;
import com.weichu.mdesigner.common.mapper.MerchantAuditMapper;

/**
 * 审核商家信息表
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantAuditServiceImpl implements IMerchantAuditService {
	
	private Logger logger = LoggerFactory.getLogger(MerchantAuditServiceImpl.class);
	
	@Autowired
	private MerchantAuditMapper auditMapper;
	
	/**
	 * 查询商家审核结果
	 */
	@Override
	public List<MerchantAudit> list(int mid) {
		MerchantAuditExample example = new MerchantAuditExample();
		example.setOrderByClause(" audit_date asc ");
		//auditType=1初次提交审核记录,2=变更提交审核记录
		example.createCriteria().andAuditTypeEqualTo(1).andMerchantIdEqualTo(mid);
		return auditMapper.selectByExample(example);
	}
	
}
