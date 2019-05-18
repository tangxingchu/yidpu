package com.weichu.mdesigner.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.service.IMerchantDictService;
import com.weichu.mdesigner.common.entity.MerchantDictionary;
import com.weichu.mdesigner.common.entity.MerchantDictionaryExample;
import com.weichu.mdesigner.common.entity.MerchantDictionaryItem;
import com.weichu.mdesigner.common.entity.MerchantDictionaryItemExample;
import com.weichu.mdesigner.common.mapper.MerchantDictionaryItemMapper;
import com.weichu.mdesigner.common.mapper.MerchantDictionaryMapper;

/**
 * 后台管理维护商家字典
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class MerchantDictServiceImpl implements IMerchantDictService {

	@Autowired
	private MerchantDictionaryMapper dictMapper;

	@Autowired
	private MerchantDictionaryItemMapper dictItemMapper;
	
	@Override
	public int saveDict(MerchantDictionary dict) {
		return dictMapper.insertSelective(dict);
	}

	@Override
	public int saveDictItem(MerchantDictionaryItem dictItem) {
		dictItemMapper.insertSelective(dictItem);
		return dictItem.getId();
	}

	@Override
	public int deleteDict(int dictId) {
		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
		example.createCriteria().andDictIdEqualTo(dictId);
		dictItemMapper.deleteByExample(example);
		return dictMapper.deleteByPrimaryKey(dictId);
	}

	@Override
	public int deleteDictItem(int dictItemId) {
		return dictItemMapper.deleteByPrimaryKey(dictItemId);
	}

	@Override
	public int updateDict(MerchantDictionary dict) {
		return dictMapper.updateByPrimaryKeySelective(dict);
	}

	@Override
	public int updateDictItem(MerchantDictionaryItem dictItem) {
		return dictItemMapper.updateByPrimaryKeySelective(dictItem);
	}

	@Override
	public MerchantDictionary selectDictById(int dictId) {
		return dictMapper.selectByPrimaryKey(dictId);
	}

	@Override
	public MerchantDictionaryItem selectDictItemById(int dictItemId) {
		return dictItemMapper.selectByPrimaryKey(dictItemId);
	}

	@Override
	public List<MerchantDictionary> selectDict(MerchantDictionary dict) {
		MerchantDictionaryExample example = new MerchantDictionaryExample();
		example.setOrderByClause("sort_no asc");
		MerchantDictionaryExample.Criteria criteria = example.createCriteria();
		if (!StringUtils.isEmpty(dict.getDictName())) {
			criteria.andDictNameLike("%" + dict.getDictName() + "%");
		}
		if (!StringUtils.isEmpty(dict.getDictCode())) {
			criteria.andDictCodeLike("%" + dict.getDictCode() + "%");
		}
		return dictMapper.selectByExample(example);
	}

	@Override
	public List<MerchantDictionaryItem> selectDictItem(MerchantDictionaryItem dictItem) {
		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
		example.setOrderByClause("sort_no asc");
		MerchantDictionaryItemExample.Criteria criteria = example.createCriteria();
		if (!StringUtils.isEmpty(dictItem.getDictCode())) {
			criteria.andDictCodeEqualTo(dictItem.getDictCode());
		}
		if(!StringUtils.isEmpty(dictItem.getItemValue())) {
			criteria.andItemValueEqualTo(dictItem.getItemValue());
		}
		return dictItemMapper.selectByExample(example);
	}

	@Override
	public List<MerchantDictionaryItem> selectDictItem(String dictCode) throws Exception {
		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
		example.setOrderByClause("sort_no asc");
		MerchantDictionaryItemExample.Criteria criteria = example.createCriteria();
		if (StringUtils.isEmpty(dictCode)) {
			throw new Exception("dictCode must not be empty!");
		}
		criteria.andDictCodeEqualTo(dictCode);
		return dictItemMapper.selectByExample(example);
	}

}
