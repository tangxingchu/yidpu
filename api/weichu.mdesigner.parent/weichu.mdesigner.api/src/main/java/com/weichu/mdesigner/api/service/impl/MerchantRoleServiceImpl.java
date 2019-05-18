package com.weichu.mdesigner.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.entity.MerchantRole;
import com.weichu.mdesigner.api.entity.MerchantRoleExample;
import com.weichu.mdesigner.api.mapper.MerchantRoleMapper;
import com.weichu.mdesigner.api.service.IMerchantRoleService;

@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantRoleServiceImpl implements IMerchantRoleService {

	@Autowired
	private MerchantRoleMapper mapper;
	
	@Override
	public List<MerchantRole> list(int mid) {
		MerchantRoleExample example = new MerchantRoleExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		MerchantRoleExample.Criteria cirteria = example.createCriteria();
		cirteria.andMerchantIdEqualTo(0);
		example.or(cirteria);
		return mapper.selectByExample(example);
	}

}
