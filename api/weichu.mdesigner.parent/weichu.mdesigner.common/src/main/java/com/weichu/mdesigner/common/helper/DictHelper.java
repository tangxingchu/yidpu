package com.weichu.mdesigner.common.helper;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONArray;
import com.weichu.mdesigner.common.entity.AdminDictionaryItem;
import com.weichu.mdesigner.common.entity.AdminDictionaryItemExample;
import com.weichu.mdesigner.common.service.IDictService;
import com.weichu.mdesigner.utils.constants.Constants;

/**
 * 字典帮助类
 * 
 * @author tangxingchu
 *
 */
@Component
public class DictHelper {
	
	@Autowired
	private CacheManager cacheManager;
	
	@Autowired
	private IDictService dictService;

	public String getItemNameByDictCodeAndItemValue(String dictCode, String itemValue) {
		Cache cache = cacheManager.getCache(Constants.NO_EXP_CACHE_NAME);
		String value = cache.get(dictCode, String.class);
		if(!StringUtils.isEmpty(value)) {
			List<AdminDictionaryItem> dictItems = (List<AdminDictionaryItem>) JSONArray.parseArray(value, AdminDictionaryItem.class);
			for (AdminDictionaryItem dictItem : dictItems) {
				if(itemValue.equals(dictItem.getItemValue())) {
					return dictItem.getItemName();
				}
			}
			return null;
		} else {
			AdminDictionaryItem itemObj = new AdminDictionaryItem();
			itemObj.setDictCode(dictCode);
			itemObj.setItemValue(itemValue);
			List<AdminDictionaryItem> dictItems = dictService.selectDictItem(itemObj);
			if (!dictItems.isEmpty() && dictItems.size() > 0) {
				AdminDictionaryItem dictItem = dictItems.get(0);
				return dictItem.getItemName();
			} else {
				return null;
			}
		}
	}
	
	public List<AdminDictionaryItem> getDictItem(String dictCode) throws Exception {
		Cache cache = cacheManager.getCache(Constants.NO_EXP_CACHE_NAME);
		String value = cache.get(dictCode, String.class);
		if(!StringUtils.isEmpty(value)) {
			List<AdminDictionaryItem> dictItems = (List<AdminDictionaryItem>) JSONArray.parseArray(value, AdminDictionaryItem.class);
			return dictItems;
		} else {
			return dictService.selectDictItem(dictCode);
		}
	}

}
