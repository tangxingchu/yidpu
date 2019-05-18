package com.weichu.mdesigner.api.service.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.entity.MerchantUserRole;
import com.weichu.mdesigner.api.entity.MerchantUserRoleExample;
import com.weichu.mdesigner.api.mapper.MerchantUserRoleMapper;
import com.weichu.mdesigner.api.service.IMerchantUserRoleService;

/**
 * 用户授权
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantUserRoleServiceImpl implements IMerchantUserRoleService {

	@Autowired
	private MerchantUserRoleMapper mapper;
	
	@Override
	public int save(int childUserId, List<Integer> roles, int mid) {
		delete(childUserId, mid);
		MerchantUserRole userRole = new MerchantUserRole();
		userRole.setMerchantId(mid);
		userRole.setMerchantChilduserId(childUserId);
		for (Integer roleId : roles) {
			userRole.setRoleId(roleId);
			mapper.insertSelective(userRole);
		}
		return 0;
	}
	
	@Override
	public int save(Map<Integer, List<Integer>> userRoles, int mid) {
		Iterator<Integer> keys = userRoles.keySet().iterator();
		while(keys.hasNext()) {
			Integer childUserId = keys.next();
			save(childUserId, userRoles.get(childUserId), mid);
		}
		return 0;
	}
	
	@Override
	public int delete(int childUserId, int mid) {
		MerchantUserRoleExample example = new MerchantUserRoleExample();
		example.createCriteria().andMerchantChilduserIdEqualTo(childUserId).andMerchantIdEqualTo(mid);
		return mapper.deleteByExample(example);
	}

	@Override
	public List<MerchantUserRole> list(int childUserId, int mid) {
		MerchantUserRoleExample example = new MerchantUserRoleExample();
		example.createCriteria().andMerchantChilduserIdEqualTo(childUserId).andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}

}
