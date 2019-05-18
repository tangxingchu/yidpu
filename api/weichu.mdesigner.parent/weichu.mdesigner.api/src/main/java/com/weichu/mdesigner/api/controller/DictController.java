package com.weichu.mdesigner.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantDictItemService;
import com.weichu.mdesigner.common.entity.MerchantDictionaryItem;
import com.weichu.mdesigner.common.helper.DictHelper;
import com.weichu.mdesigner.common.entity.MerchantDictionary;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 商家基础数据管理(字典 计量单位、商品附属属性等)
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class DictController {

	@Autowired
	private IMerchantDictItemService dictService;

//	@Value("${public.dictionary}")
//	private String syncDicts;
	
	@Autowired
	private DictHelper dictHelper;
	
	@RequestMapping(value = "/dict/list", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0201')")
	List<MerchantDictionary> listAllDict(HttpServletRequest request, @RequestBody MerchantDictionary dict) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantDictionary> dicts = dictService.selectDict(dict, mid);
		return dicts;
	}

	@RequestMapping(value = "/dict/listItem/{dictCode}", method = RequestMethod.GET)
	List<MerchantDictionaryItem> listDictItem(HttpServletRequest request, @PathVariable("dictCode") String dictCode)
			throws Exception {
		int mid = JavaWebToken.getUid(request);
		return dictService.selectDictItem(dictCode, mid);
	}

	@RequestMapping(value = "/dict/save", method = RequestMethod.POST)
	JSONObject saveDict(HttpServletRequest request, @RequestBody MerchantDictionary dict) throws Exception {
		int mid = JavaWebToken.getUid(request);
		Integer id = dictService.saveExtra(dict, mid);
		return JSONResult.fillResultJsonObject(id);
	}
	
	@RequestMapping(value = "/dict/delete", method = RequestMethod.POST)
	JSONObject deleteDict(HttpServletRequest request, @RequestBody MerchantDictionary dict) throws Exception {
		int mid = JavaWebToken.getUid(request);
		dictService.deleteExtra(dict.getId(), mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/dict/get/{id}", method = RequestMethod.GET)
	public MerchantDictionary getExtraById(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		return dictService.selectExtraById(id, mid);
	}
	
	@RequestMapping(value = "/dict/update", method = RequestMethod.POST)
	JSONObject updateDict(HttpServletRequest request, @RequestBody MerchantDictionary dict) throws Exception {
		int mid = JavaWebToken.getUid(request);
		dictService.updateExtra(dict, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/dictItem/save", method = RequestMethod.POST)
	JSONObject saveDictItem(HttpServletRequest request, @RequestBody MerchantDictionaryItem dictItem) throws Exception {
		if (StringUtils.isEmpty(dictItem.getDictCode()) || StringUtils.isEmpty(dictItem.getItemName())) {
			throw new Exception("字典代码|字典项名称不能为空!");
		}
		int mid = JavaWebToken.getUid(request);
		Integer id = dictService.saveDictItem(dictItem, mid);
		return JSONResult.fillResultJsonObject(id);
	}

	@RequestMapping(value = "/dictItem/delete", method = RequestMethod.POST)
	JSONObject deleteDictItem(HttpServletRequest request, @RequestBody MerchantDictionaryItem dictItem) throws Exception {
		int mid = JavaWebToken.getUid(request);
		dictService.deleteDictItem(dictItem.getId(), mid);
		return JSONResult.success();
	}

	@RequestMapping(value = "/dictItem/update", method = RequestMethod.POST)
	JSONObject updateDictItem(HttpServletRequest request, @RequestBody MerchantDictionaryItem dictItem) throws Exception {
		int mid = JavaWebToken.getUid(request);
		dictService.updateDictItem(dictItem, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/dictItem/get/{id}", method = RequestMethod.GET)
	public MerchantDictionaryItem getById(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		return dictService.selectDictItemById(id, mid);
	}
	
//	@RequestMapping(value = "/dictItem/syncItems", method = RequestMethod.POST)
//	Map<String, List<AdminDictionaryItem>> syncItems() throws Exception {
//		Map<String, List<AdminDictionaryItem>> results = new HashMap<String, List<AdminDictionaryItem>>();
//		String[] dictCodes = this.syncDicts.split(",");
//		for (String dictCode : dictCodes) {
//			List<AdminDictionaryItem> items = dictHelper.getDictItem(dictCode);
//			results.put(dictCode, items);
//		}
//		return results;
//	}
	
	@RequestMapping(value = "/dictItem/syncItems", method = RequestMethod.POST)
	public List<MerchantDictionaryItem> syncItems(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		MerchantDictionaryItem dictItem = new MerchantDictionaryItem();
		dictItem.setMerchantId(mid);
		return dictService.selectDictItem(dictItem);
	}
	
	@RequestMapping(value = "/dict/listItems", method = RequestMethod.POST)
	Map<String, List<MerchantDictionaryItem>> listDictItems(HttpServletRequest request, 
			@RequestBody String[] dictCodes) throws Exception {
		int mid = JavaWebToken.getUid(request);
		Map<String, List<MerchantDictionaryItem>> results = new HashMap<String, List<MerchantDictionaryItem>>();
		for (String dictCode : dictCodes) {
			List<MerchantDictionaryItem> dictItems = dictService.selectDictItem(dictCode, mid);
			results.put(dictCode, dictItems);
		}
		return results;
	}
}
