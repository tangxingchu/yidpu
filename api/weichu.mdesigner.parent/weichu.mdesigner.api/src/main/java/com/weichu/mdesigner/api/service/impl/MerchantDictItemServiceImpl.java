package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.service.IMerchantDictItemService;
import com.weichu.mdesigner.api.service.IMerchantGoodsExtraService;
import com.weichu.mdesigner.common.entity.MerchantDictionary;
import com.weichu.mdesigner.common.entity.MerchantDictionaryExample;
import com.weichu.mdesigner.common.entity.MerchantDictionaryItem;
import com.weichu.mdesigner.common.entity.MerchantDictionaryItemExample;
import com.weichu.mdesigner.common.mapper.MerchantDictionaryItemMapper;
import com.weichu.mdesigner.common.mapper.MerchantDictionaryMapper;

/**
 * 商家字典 可自行维护的字典(计量单位、商品附属属性等)
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantDictItemServiceImpl implements IMerchantDictItemService {

	@Autowired
	private MerchantDictionaryMapper dictMapper;
	
	@Autowired
	private MerchantDictionaryItemMapper dictItemMapper;
	
	@Autowired
	private IMerchantGoodsExtraService extraService;

	@Override
	public int saveExtra(MerchantDictionary extra, int mid) throws Exception {
		MerchantDictionaryExample example = new MerchantDictionaryExample();
		example.createCriteria().andDictCodeEqualTo(extra.getDictCode()).andMerchantIdEqualTo(mid);
		MerchantDictionaryExample.Criteria criteria = example.createCriteria();
		criteria.andDictCodeEqualTo(extra.getDictCode()).andMerchantIdEqualTo(0);
		example.or(criteria);
		if(dictMapper.selectByExample(example).size() > 0) {
			throw new Exception("属性代码重复,请换个代码");
		}
		extra.setMerchantId(mid);
		extra.setEnabled("1");
		extra.setCategory(2);
		extra.setCreateTime(new Date());
		dictMapper.insertSelective(extra);
		return extra.getId();
	}
	
	@Override
	public int updateExtra(MerchantDictionary extra, int mid) throws Exception {
		if(extra.getMerchantId() == null || mid != extra.getMerchantId()) {
			throw new Exception("非法操作");
		}		
//		MerchantDictionaryExample example = new MerchantDictionaryExample();
//		example.createCriteria().andIdNotEqualTo(extra.getId()).andDictCodeEqualTo(extra.getDictCode()).andMerchantIdEqualTo(mid);
//		MerchantDictionaryExample.Criteria criteria = example.createCriteria();
//		criteria.andDictCodeEqualTo(extra.getDictCode()).andMerchantIdEqualTo(0);
//		example.or(criteria);
//		
//		if(dictMapper.selectByExample(example).size() > 0) {
//			throw new Exception("属性代码重复,请换个代码");
//		}
		//字典代码不允许修改
		extra.setDictCode(null);
		extra.setMerchantId(mid);
		extra.setModifyTime(new Date());
		return dictMapper.updateByPrimaryKeySelective(extra);
	}
	
	@Override
	public int deleteExtra(int id, int mid) {
		MerchantDictionaryExample example = new MerchantDictionaryExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		MerchantDictionaryItemExample itemExample = new MerchantDictionaryItemExample();
		itemExample.createCriteria().andDictIdEqualTo(id).andMerchantIdEqualTo(mid);
		dictItemMapper.deleteByExample(itemExample);
		//删除已关联到商品的附属属性
		extraService.deleteByExtraId(id, mid);
		return dictMapper.deleteByExample(example);
	}
	
	@Override
	public MerchantDictionary selectExtraById(Integer id, int mid) {
		MerchantDictionaryExample example = new MerchantDictionaryExample();
		example.createCriteria().andIdEqualTo(id).andMerchantIdEqualTo(mid);
		List<MerchantDictionary> dicts = dictMapper.selectByExample(example);
		if (!dicts.isEmpty()) {
			return dicts.get(0);
		}
		return null;
	}
	
	@Override
	public int saveDictItem(MerchantDictionaryItem dictItem, int mid) throws Exception {
		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andDictCodeEqualTo(dictItem.getDictCode())
		.andItemValueEqualTo(dictItem.getItemValue());
		MerchantDictionaryItemExample.Criteria criteria = example.createCriteria();
		criteria.andMerchantIdEqualTo(0).andDictCodeEqualTo(dictItem.getDictCode())
		.andItemValueEqualTo(dictItem.getItemValue());
		example.or(criteria);
		if(dictItemMapper.selectByExample(example).size() > 0) {
			throw new Exception("附属属性项的值重复.");
		}
		dictItem.setMerchantId(mid);
		dictItem.setEnabled("1");
		dictItem.setCreateTime(new Date());
		dictItemMapper.insertSelective(dictItem);
		return dictItem.getId();
	}

	@Override
	public int deleteDictItem(int dictItemId, int mid) {
		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
		example.createCriteria().andIdEqualTo(dictItemId).andMerchantIdEqualTo(mid);
		return dictItemMapper.deleteByExample(example);
	}

	@Override
	public int updateDictItem(MerchantDictionaryItem dictItem, int mid) throws Exception {
		if (dictItem.getMerchantId() == null || mid != dictItem.getMerchantId()) {
			throw new Exception("非法操作");
		}
//		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
//		example.createCriteria().andIdNotEqualTo(dictItem.getId()).andMerchantIdEqualTo(mid).andDictCodeEqualTo(dictItem.getDictCode())
//		.andItemValueEqualTo(dictItem.getItemValue());
//		MerchantDictionaryItemExample.Criteria criteria = example.createCriteria();
//		criteria.andMerchantIdEqualTo(0).andDictCodeEqualTo(dictItem.getDictCode())
//		.andItemValueEqualTo(dictItem.getItemValue());
//		example.or(criteria);
//		if(dictItemMapper.selectByExample(example).size() > 0) {
//			throw new Exception("附属属性项的值重复.");
//		}
		dictItem.setItemValue(null);//属性（数据）项的值不允许修改
		dictItem.setModifyTime(new Date());
		return dictItemMapper.updateByPrimaryKeySelective(dictItem);
	}

	@Override
	public MerchantDictionaryItem selectDictItemById(int dictItemId, int mid) {
		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
		example.createCriteria().andIdEqualTo(dictItemId).andMerchantIdEqualTo(mid);
		List<MerchantDictionaryItem> dictItems = dictItemMapper.selectByExample(example);
		if (!dictItems.isEmpty()) {
			return dictItems.get(0);
		}
		return null;
	}
	
	@Override
	public List<MerchantDictionary> selectDict(MerchantDictionary dict, int mid) {
		MerchantDictionaryExample example = new MerchantDictionaryExample();
		example.setOrderByClause("sort_no asc, id asc");
		//商品附属属性(可以增删改)
		MerchantDictionaryExample.Criteria criteria = example.createCriteria();
		criteria.andMerchantIdEqualTo(mid).andEnabledEqualTo("1");
		if (!StringUtils.isEmpty(dict.getDictName())) {
			criteria.andDictNameLike("%" + dict.getDictName() + "%");
		}
		if (!StringUtils.isEmpty(dict.getDictCode())) {
			criteria.andDictCodeLike("%" + dict.getDictCode() + "%");
		}
		if (!StringUtils.isEmpty(dict.getCategory())) {
			criteria.andCategoryEqualTo(dict.getCategory());
		}
		//公用的字典(不能增删改)
		MerchantDictionaryExample.Criteria criteria2 = example.createCriteria();
		criteria2.andMerchantIdEqualTo(0);
		criteria2.andEnabledEqualTo("1");
		if (!StringUtils.isEmpty(dict.getDictName())) {
			criteria2.andDictNameLike("%" + dict.getDictName() + "%");
		}
		if (!StringUtils.isEmpty(dict.getDictCode())) {
			criteria2.andDictCodeLike("%" + dict.getDictCode() + "%");
		}
		if (!StringUtils.isEmpty(dict.getCategory())) {
			criteria2.andCategoryEqualTo(dict.getCategory());
		}
		example.or(criteria2);
		return dictMapper.selectByExample(example);
	}

	@Override
	public List<MerchantDictionaryItem> selectDictItem(MerchantDictionaryItem dictItem) {
		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
		example.setOrderByClause("sort_no asc");
		MerchantDictionaryItemExample.Criteria criteria = example.createCriteria();
		criteria.andMerchantIdEqualTo(dictItem.getMerchantId());
		if (!StringUtils.isEmpty(dictItem.getDictCode())) {
			criteria.andDictCodeEqualTo(dictItem.getDictCode());
		}
		if(!StringUtils.isEmpty(dictItem.getItemValue())) {
			criteria.andItemValueEqualTo(dictItem.getItemValue());
		}
		MerchantDictionaryItemExample.Criteria criteria2 = example.createCriteria();
		criteria2.andMerchantIdEqualTo(0);//为0表示所有商家共用的字典项
		if (!StringUtils.isEmpty(dictItem.getDictCode())) {
			criteria2.andDictCodeEqualTo(dictItem.getDictCode());
		}
		if(!StringUtils.isEmpty(dictItem.getItemValue())) {
			criteria2.andItemValueEqualTo(dictItem.getItemValue());
		}
		example.or(criteria2);
		return dictItemMapper.selectByExample(example);
	}

	@Override
	public List<MerchantDictionaryItem> selectDictItem(String dictCode, int mid) throws Exception {
		if (StringUtils.isEmpty(dictCode)) {
			throw new Exception("dictCode must not be empty!");
		}
		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
		example.setOrderByClause("sort_no asc");
		MerchantDictionaryItemExample.Criteria criteria = example.createCriteria();
		criteria.andDictCodeEqualTo(dictCode);
		criteria.andMerchantIdEqualTo(mid);
//		criteria.andEnabledEqualTo("1");
		
		MerchantDictionaryItemExample.Criteria criteria2 = example.createCriteria();
		criteria2.andDictCodeEqualTo(dictCode);
		criteria2.andMerchantIdEqualTo(0);//为0表示所有商家共用的字典项
		criteria2.andEnabledEqualTo("1");
		example.or(criteria2);
		
		return dictItemMapper.selectByExample(example);
	}
	
	public List<MerchantDictionaryItem> selectEnabeldDictItem(String dictCode, int mid) {
		MerchantDictionaryItemExample example = new MerchantDictionaryItemExample();
		example.setOrderByClause("sort_no asc");
		MerchantDictionaryItemExample.Criteria criteria = example.createCriteria();
		criteria.andDictCodeEqualTo(dictCode);
		criteria.andMerchantIdEqualTo(mid);
		criteria.andEnabledEqualTo("1");
		
		MerchantDictionaryItemExample.Criteria criteria2 = example.createCriteria();
		criteria2.andDictCodeEqualTo(dictCode);
		criteria2.andMerchantIdEqualTo(0);//为0表示所有商家共用的字典项
		criteria2.andEnabledEqualTo("1");
		example.or(criteria2);
		
		return dictItemMapper.selectByExample(example);
	}

}
