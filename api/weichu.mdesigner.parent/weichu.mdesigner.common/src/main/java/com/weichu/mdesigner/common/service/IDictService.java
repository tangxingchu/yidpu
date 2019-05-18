package com.weichu.mdesigner.common.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.AdminDictionary;
import com.weichu.mdesigner.common.entity.AdminDictionaryItem;

/**
 * 字典
 * @author Administrator
 *
 */
public interface IDictService {
	
	int saveDict(AdminDictionary dict);
	
	int saveDictItem(AdminDictionaryItem dictItem);
	
	int deleteDict(int dictId);
	
	int deleteDictItem(int dictItemId);
	
	int updateDict(AdminDictionary dict);
	
	int updateDictItem(AdminDictionaryItem dictItem);
	
	AdminDictionary selectDictById(int dictId);
	
	AdminDictionaryItem selectDictItemById(int dictItemId);
	
	List<AdminDictionary> selectDict(AdminDictionary dict);
	
	List<AdminDictionaryItem> selectDictItem(AdminDictionaryItem dictItem);
	
	List<AdminDictionaryItem> selectDictItem(String dictCode) throws Exception;
	
	
}
