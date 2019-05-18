package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantDictionary;
import com.weichu.mdesigner.common.entity.MerchantDictionaryItem;

/**
 * 商家可自行维护的字典(计量单位、商品附属属性等)
 * @author Administrator
 *
 */
public interface IMerchantDictItemService {
	
	int saveExtra(MerchantDictionary extra, int mid) throws Exception;
	
	int updateExtra(MerchantDictionary extra, int mid) throws Exception;
	
	int deleteExtra(int id, int mid);
	
	int saveDictItem(MerchantDictionaryItem dictItem, int mid) throws Exception;
	
	int deleteDictItem(int dictItemId, int mid);
	
	int updateDictItem(MerchantDictionaryItem dictItem, int mid)  throws Exception;
	
	MerchantDictionaryItem selectDictItemById(int dictItemId, int mid);
	
	List<MerchantDictionary> selectDict(MerchantDictionary dict, int mid);
	
	List<MerchantDictionaryItem> selectDictItem(MerchantDictionaryItem dictItem);
	
	List<MerchantDictionaryItem> selectDictItem(String dictCode, int mid) throws Exception;

	MerchantDictionary selectExtraById(Integer id, int mid);

	List<MerchantDictionaryItem> selectEnabeldDictItem(String dictCode, int mid);
	
}
