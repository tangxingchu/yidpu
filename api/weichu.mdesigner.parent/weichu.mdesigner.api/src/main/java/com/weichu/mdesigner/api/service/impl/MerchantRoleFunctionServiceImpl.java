package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.entity.MerchantRole;
import com.weichu.mdesigner.api.mapper.MerchantRoleMapper;
import com.weichu.mdesigner.api.service.IMerchantRoleFunctionService;
import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.common.entity.MerchantRoleFunction;
import com.weichu.mdesigner.common.entity.MerchantRoleFunctionExample;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantUserFunction;
import com.weichu.mdesigner.common.entity.MerchantUserFunctionExample;
import com.weichu.mdesigner.common.mapper.MerchantFunctionMapper;
import com.weichu.mdesigner.common.mapper.MerchantRoleFunctionMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserFunctionMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserMapper;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 角色授权
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantRoleFunctionServiceImpl implements IMerchantRoleFunctionService {

	private static final String ADMIN_ROLE_CODE = "001";
	
	@Autowired
	private MerchantRoleFunctionMapper mapper;

	@Autowired
	private MerchantUserMapper userMapper;

	@Autowired
	private MerchantFunctionMapper functionMapper;
	
	@Autowired
	private MerchantUserFunctionMapper userFunctionMapper;
	
	@Autowired
	private MerchantRoleMapper roleMapper;

	@Override
	public int save(int roleId, List<Integer> functionIds, int mid) throws YdpException {
		deleteByRoleId(roleId, mid);
		Date now = new Date();
		for (Integer functionId : functionIds) {
			// 校验当前商家用户是否有权限授予这个权限     没有考虑已购买了功能
			MerchantFunction function = functionMapper.selectByPrimaryKey(functionId);
			if (function != null && function.getFunctionCode().length() >= 4) {
				//TODO 分级授权校验
				MerchantUser merchantUser = userMapper.selectByPrimaryKey(mid);
				if (merchantUser.getGrade() >= function.getGrade()) {// 商家等级必须大于或者等于授权的功能菜单的等级
					MerchantRoleFunction roleFunction = new MerchantRoleFunction();
					roleFunction.setFunctionId(functionId);
					roleFunction.setRoleId(roleId);
					roleFunction.setMerchantId(mid);
					mapper.insertSelective(roleFunction);
				} else {
					//如果已经购买了该菜单功能 也是可以授权的					
					MerchantUserFunctionExample example = new MerchantUserFunctionExample();
					example.createCriteria().andEffectiveTimeLessThanOrEqualTo(now)
					.andExpirationTimeGreaterThan(now).andFunctionIdEqualTo(function.getId()).andMerchantIdEqualTo(mid);
					List<MerchantUserFunction> userFunctions = userFunctionMapper.selectByExample(example);
					if(userFunctions != null && userFunctions.size() > 0) {//购买了菜单权限 并且还在有效期内
						MerchantRoleFunction roleFunction = new MerchantRoleFunction();
						roleFunction.setFunctionId(functionId);
						roleFunction.setRoleId(roleId);
						roleFunction.setMerchantId(mid);
						mapper.insertSelective(roleFunction);
					} else {
						//1、不抛异常,主要是为了已经过期的菜单权限，在界面上显示状态是勾选中并且灰色不可以操作，在保存角色授权的时候就会抛这个异常
						//throw new Exception("非法授权操作.");
						//2、现在改为什么都不做
						//nothing
						//3、还是要添加进去, 不添加进去就等于移除了改菜单权限， 往后如果该菜单权限续费了 又要重新赋予权限
						MerchantRoleFunction roleFunction = new MerchantRoleFunction();
						roleFunction.setFunctionId(functionId);
						roleFunction.setRoleId(roleId);
						roleFunction.setMerchantId(mid);
						mapper.insertSelective(roleFunction);
					}
				}
			}
		}
		return 0;
	}

	@Override
	public int save(Map<Integer, List<Integer>> roleFunctions, int mid, String username) throws YdpException {
		boolean isChildUser = username.indexOf(":") > -1;
		Iterator<Integer> keys = roleFunctions.keySet().iterator();
		while (keys.hasNext()) {
			Integer roleId = keys.next();
			if(isChildUser) {
				MerchantRole role = roleMapper.selectByPrimaryKey(roleId);
				if(ADMIN_ROLE_CODE.equals(role.getRoleCode())) {
					throw new YdpException("对不起,您是子账户,无权更改超级管理员的功能权限");
				}
			}			
			save(roleId, roleFunctions.get(roleId), mid);
		}
		return 0;
	}

	@Override
	public int deleteByRoleId(int roleId, int mid) {
		MerchantRoleFunctionExample example = new MerchantRoleFunctionExample();
		example.createCriteria().andRoleIdEqualTo(roleId).andMerchantIdEqualTo(mid);
		return mapper.deleteByExample(example);
	}

	@Override
	public List<MerchantRoleFunction> list(int roleId, int mid) {
		MerchantRoleFunctionExample example = new MerchantRoleFunctionExample();
		example.createCriteria().andRoleIdEqualTo(roleId).andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}

}
