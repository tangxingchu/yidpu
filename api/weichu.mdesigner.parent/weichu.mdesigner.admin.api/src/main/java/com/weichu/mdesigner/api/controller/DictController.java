package com.weichu.mdesigner.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.common.entity.AdminDictionary;
import com.weichu.mdesigner.common.entity.AdminDictionaryItem;
import com.weichu.mdesigner.common.service.IDictService;
import com.weichu.mdesigner.exception.NotEmptyException;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 字典
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class DictController {

	@Autowired
	private IDictService dictService;
	
	@RequestMapping(value = "/dict/list", method = RequestMethod.POST)
	List<AdminDictionary> listAllDict(@RequestBody AdminDictionary dict) throws Exception {
		List<AdminDictionary> dicts = dictService.selectDict(dict);
		return dicts;
	}
	
	@RequestMapping(value = "/dict/list/{id}", method = RequestMethod.GET)
	AdminDictionary listDictById(@PathVariable("id") Integer id) throws Exception {
		AdminDictionary dict = dictService.selectDictById(id);
		return dict;
	}
	
	@RequestMapping(value = "/dict/save", method = RequestMethod.POST)
	JSONObject saveDict(@RequestBody AdminDictionary dict) throws Exception {
		if(StringUtils.isEmpty(dict.getDictCode()) || StringUtils.isEmpty(dict.getDictName())) {
			throw new NotEmptyException("字典代码|字典名称不能为空!");
		}
		dictService.saveDict(dict);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/dict/delete", method = RequestMethod.POST)
	JSONObject deleteDict(@RequestBody AdminDictionary dict) throws Exception {
		if(StringUtils.isEmpty(dict.getId())) {
			throw new NotEmptyException("字典ID不能为空!");
		}
		dictService.deleteDict(dict.getId());
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/dict/update", method = RequestMethod.POST)
	JSONObject updateDict(@RequestBody AdminDictionary dict) throws Exception {
		if(StringUtils.isEmpty(dict.getDictCode()) || StringUtils.isEmpty(dict.getDictName())) {
			throw new NotEmptyException("字典代码|字典名称不能为空!");
		}
		dictService.updateDict(dict);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/dict/listItem/{dictCode}", method = RequestMethod.GET)
	List<AdminDictionaryItem> listDictItem(@PathVariable("dictCode") String dictCode) throws Exception {
		return dictService.selectDictItem(dictCode);
	}
	
	@RequestMapping(value = "/dict/listItems", method = RequestMethod.POST)
	Map<String, List<AdminDictionaryItem>> listDictItems(@RequestBody String[] dictCodes) throws Exception {
		Map<String, List<AdminDictionaryItem>> results = new HashMap<String, List<AdminDictionaryItem>>();
		for (String dictCode : dictCodes) {
			List<AdminDictionaryItem> items = dictService.selectDictItem(dictCode);
			results.put(dictCode, items);
		}
		return results;
	}
	
	@RequestMapping(value = "/dictItem/save", method = RequestMethod.POST)
	JSONObject saveDictItem(@RequestBody AdminDictionaryItem dictItem) throws Exception {
		if(StringUtils.isEmpty(dictItem.getDictCode()) || StringUtils.isEmpty(dictItem.getItemName())) {
			throw new NotEmptyException("字典代码|字典项名称不能为空!");
		}
		dictService.saveDictItem(dictItem);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/dictItem/delete", method = RequestMethod.POST)
	JSONObject deleteDictItem(@RequestBody AdminDictionaryItem dictItem) throws Exception {
		dictService.deleteDictItem(dictItem.getId());
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/dictItem/update", method = RequestMethod.POST)
	JSONObject updateDictItem(@RequestBody AdminDictionaryItem dictItem) throws Exception {
		dictService.updateDictItem(dictItem);
		return JSONResult.success();
	}
	
}
