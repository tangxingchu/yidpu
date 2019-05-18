package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantDictionary;
import com.weichu.mdesigner.common.entity.MerchantDictionaryItem;

/**
 * 后台管理维护商家字典
 * @author Administrator
 *
 */
public interface IMerchantDictService {
	
	int saveDict(MerchantDictionary dict);
	
	int saveDictItem(MerchantDictionaryItem dictItem);
	
	int deleteDict(int dictId);
	
	int deleteDictItem(int dictItemId);
	
	int updateDict(MerchantDictionary dict);
	
	int updateDictItem(MerchantDictionaryItem dictItem);
	
	MerchantDictionary selectDictById(int dictId);
	
	MerchantDictionaryItem selectDictItemById(int dictItemId);
	
	List<MerchantDictionary> selectDict(MerchantDictionary dict);
	
	List<MerchantDictionaryItem> selectDictItem(MerchantDictionaryItem dictItem);
	
	List<MerchantDictionaryItem> selectDictItem(String dictCode) throws Exception;
	
}
