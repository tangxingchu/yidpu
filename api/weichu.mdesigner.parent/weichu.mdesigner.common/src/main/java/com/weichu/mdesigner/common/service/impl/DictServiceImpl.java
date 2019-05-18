package com.weichu.mdesigner.common.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.common.entity.AdminDictionary;
import com.weichu.mdesigner.common.entity.AdminDictionaryExample;
import com.weichu.mdesigner.common.entity.AdminDictionaryItem;
import com.weichu.mdesigner.common.entity.AdminDictionaryItemExample;
import com.weichu.mdesigner.common.mapper.AdminDictionaryItemMapper;
import com.weichu.mdesigner.common.mapper.AdminDictionaryMapper;
import com.weichu.mdesigner.common.service.IDictService;

/**
 * 字典service
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class DictServiceImpl implements IDictService {

	@Autowired
	private AdminDictionaryMapper dictMapper;

	@Autowired
	private AdminDictionaryItemMapper dictItemMapper;
	
	@Override
	public int saveDict(AdminDictionary dict) {
		return dictMapper.insertSelective(dict);
	}

	@Override
	public int saveDictItem(AdminDictionaryItem dictItem) {
		dictItemMapper.insertSelective(dictItem);
		return dictItem.getId();
	}

	@Override
	public int deleteDict(int dictId) {
		AdminDictionaryItemExample example = new AdminDictionaryItemExample();
		example.createCriteria().andDictIdEqualTo(dictId);
		dictItemMapper.deleteByExample(example);
		return dictMapper.deleteByPrimaryKey(dictId);
	}

	@Override
	public int deleteDictItem(int dictItemId) {
		return dictItemMapper.deleteByPrimaryKey(dictItemId);
	}

	@Override
	public int updateDict(AdminDictionary dict) {
		return dictMapper.updateByPrimaryKeySelective(dict);
	}

	@Override
	public int updateDictItem(AdminDictionaryItem dictItem) {
		return dictItemMapper.updateByPrimaryKeySelective(dictItem);
	}

	public AdminDictionary selectDictById(int dictId) {
		return dictMapper.selectByPrimaryKey(dictId);
	}

	public AdminDictionaryItem selectDictItemById(int dictItemId) {
		return dictItemMapper.selectByPrimaryKey(dictItemId);
	}

	@Override
	public List<AdminDictionary> selectDict(AdminDictionary dict) {
		AdminDictionaryExample example = new AdminDictionaryExample();
		example.setOrderByClause("sort_no asc");
		AdminDictionaryExample.Criteria criteria = example.createCriteria();
		if (!StringUtils.isEmpty(dict.getDictName())) {
			criteria.andDictNameLike("%" + dict.getDictName() + "%");
		}
		if (!StringUtils.isEmpty(dict.getDictCode())) {
			criteria.andDictCodeLike("%" + dict.getDictCode() + "%");
		}
		return dictMapper.selectByExample(example);
	}

	@Override
	public List<AdminDictionaryItem> selectDictItem(AdminDictionaryItem dictItem) {
		AdminDictionaryItemExample example = new AdminDictionaryItemExample();
		example.setOrderByClause("sort_no asc");
		AdminDictionaryItemExample.Criteria criteria = example.createCriteria();
		if (!StringUtils.isEmpty(dictItem.getDictCode())) {
			criteria.andDictCodeEqualTo(dictItem.getDictCode());
		}
		if(!StringUtils.isEmpty(dictItem.getItemCode())) {
			criteria.andItemCodeEqualTo(dictItem.getItemCode());
		}
		if(!StringUtils.isEmpty(dictItem.getItemValue())) {
			criteria.andItemValueEqualTo(dictItem.getItemValue());
		}
		return dictItemMapper.selectByExample(example);
	}

	@Override
	public List<AdminDictionaryItem> selectDictItem(String dictCode) throws Exception {
		if (StringUtils.isEmpty(dictCode)) {
			throw new Exception("dictCode must not be empty!");
		}
		AdminDictionaryItemExample example = new AdminDictionaryItemExample();
		example.setOrderByClause("sort_no asc");
		AdminDictionaryItemExample.Criteria criteria = example.createCriteria();
		criteria.andDictCodeEqualTo(dictCode);
		return dictItemMapper.selectByExample(example);
	}

}
