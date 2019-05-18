package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantFunctionService;
import com.weichu.mdesigner.api.vo.MerchantFunctionVo;
import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.common.entity.MerchantFunctionExample;
import com.weichu.mdesigner.common.entity.MerchantRoleFunctionExample;
import com.weichu.mdesigner.common.mapper.MerchantFunctionMapper;
import com.weichu.mdesigner.common.mapper.MerchantRoleFunctionMapper;

@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class MerchantFunctionServiceImpl implements IMerchantFunctionService {

	
	@Autowired
	private MerchantFunctionMapper functionMapper;
	
	@Autowired
	private MerchantRoleFunctionMapper roleFunctionMapper;
	/**
	 * 树形function
	 * @return
	 */
	public MerchantFunctionVo listFunction(int category) {
		MerchantFunctionVo functionVo = new MerchantFunctionVo();
		
		List<MerchantFunction> functions = functionMapper.selectByMerchantCategoryForAdmin(1, category);
		if(functions != null && functions.size() > 0) {
			MerchantFunction rootFunc = functions.get(0);
			BeanUtils.copyProperties(rootFunc, functionVo);
			loopFunction(functionVo, functions);
		}
		return functionVo;
	}
	
	/**
	 * 递归出function
	 * @param root
	 * @param functions
	 */
	private void loopFunction(MerchantFunctionVo root, List<MerchantFunction> functions) {
		List<MerchantFunctionVo> children = new ArrayList<MerchantFunctionVo>();
		for(MerchantFunction function : functions) {
			if(function.getParentId() == root.getId()) {
				MerchantFunctionVo funcVo = new MerchantFunctionVo();
				BeanUtils.copyProperties(function, funcVo);
				children.add(funcVo);
				loopFunction(funcVo, functions);
			}
		}
		root.setChildren(children);
	}

	@Override
	public int save(MerchantFunction function) {
		function.setCreateTime(new Date());
		return functionMapper.insertSelective(function);
	}
	
	public int update(MerchantFunction function) {
		function.setModifyTime(new Date());
		return functionMapper.updateByPrimaryKeySelective(function);
	}
	
	public int delete(int id) {
		MerchantFunctionExample example = new MerchantFunctionExample();
		example.createCriteria().andParentIdEqualTo(id);
		functionMapper.deleteByExample(example);
		MerchantRoleFunctionExample rfExample = new MerchantRoleFunctionExample();
		rfExample.createCriteria().andFunctionIdEqualTo(id);
		roleFunctionMapper.deleteByExample(rfExample);
		return functionMapper.deleteByPrimaryKey(id);
	}
	
	public MerchantFunction selectById(int id) {
		return functionMapper.selectByPrimaryKey(id);
	}
	
}
