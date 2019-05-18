package com.weichu.mdesigner.common.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.common.entity.MerchantUserChildren;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenExample;
import com.weichu.mdesigner.common.mapper.MerchantUserChildrenMapper;
import com.weichu.mdesigner.common.service.IChildUserService;

/**
 * 子账户管理
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class ChildUserServiceImpl implements IChildUserService {
	
	@Autowired
	private MerchantUserChildrenMapper childUserMapper;
	
	@Override
	public int save(MerchantUserChildren user) {
		user.setCreateTime(new Date());
		return childUserMapper.insertSelective(user);
	}

	@Override
	public int update(MerchantUserChildren user) {
		user.setModifyTime(new Date());
		return childUserMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public int delete(int id) {
		return childUserMapper.deleteByPrimaryKey(id);
	}

	@Override
	public MerchantUserChildren selectById(int id) {
		return childUserMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<MerchantUserChildren> list(MerchantUserChildren user) {
		MerchantUserChildrenExample example = new MerchantUserChildrenExample();
		example.setOrderByClause("create_time asc");
		return childUserMapper.selectByExample(example);
	}

}
