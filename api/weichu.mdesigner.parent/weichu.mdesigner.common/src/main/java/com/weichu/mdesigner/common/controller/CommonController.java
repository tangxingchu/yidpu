package com.weichu.mdesigner.common.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationHome;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.AdminDictionaryItem;
import com.weichu.mdesigner.common.helper.DictHelper;
import com.weichu.mdesigner.common.service.IDictService;
import com.weichu.mdesigner.utils.json.JSONResult;

@RestController
@RequestMapping("/api")
public class CommonController extends BaseController {

	private Logger logger = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	private DictHelper dictHelper;
	
	@Autowired
	private IDictService dictService;
	
	@RequestMapping(value = "/status", method = RequestMethod.GET)
	public String status() {
		return "ok";
	}
	
	@RequestMapping(value = "/common/upload", method = RequestMethod.POST)
	public List<String> upload(MultipartFile[] file) {
		ApplicationHome home = new ApplicationHome(getClass());
		File jarFile = home.getSource();
		File tmpFile = new File(jarFile.getParent() + "/tmp");
		if (!tmpFile.exists()) {
			tmpFile.mkdirs();
		}
		List<String> results = new ArrayList<>();
		if (file != null) {
			String suffix;
			String newFileName;
			File newFile;
			for (int i = 0; i < file.length; i++) {
				MultipartFile mf = file[i];
				suffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				newFileName = UUID.randomUUID().toString() + suffix;
				newFile = new File(jarFile.getParent() + "/tmp/" + newFileName);
				try {
					mf.transferTo(newFile);
				} catch (IllegalStateException | IOException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
				}
				results.add(newFile.getName());
			}
		}
		return results;
	}

	@RequestMapping(value = "/common/image/preview/{id}/**", method = RequestMethod.GET)
	public void imagePreview(HttpServletRequest request, HttpServletResponse response, @PathVariable("id") String id) {
		String path = "/" + id + "/" + extractPathFromPattern(request);
		File imgFile = new File(getJarParentPath() + path);
		responseFile(response, imgFile);
	}
	
	@RequestMapping(value = "/common/dict/listItem/{dictCode}", method = RequestMethod.GET)
	List<AdminDictionaryItem> listDictItem(@PathVariable("dictCode") String dictCode) throws Exception {
		return dictHelper.getDictItem(dictCode);
	}
	
	@RequestMapping(value = "/common/dict/listItems", method = RequestMethod.POST)
	Map<String, List<AdminDictionaryItem>> listDictItems(@RequestBody String[] dictCodes) throws Exception {
		Map<String, List<AdminDictionaryItem>> results = new HashMap<String, List<AdminDictionaryItem>>();
		for (String dictCode : dictCodes) {
			List<AdminDictionaryItem> items = dictHelper.getDictItem(dictCode);
			results.put(dictCode, items);
		}
		return results;
	}
	
	@RequestMapping(value = "/common/dictItem/save", method = RequestMethod.POST)
	JSONObject saveDictItem(@RequestBody AdminDictionaryItem dictItem) throws Exception {
		if(StringUtils.isEmpty(dictItem.getDictCode()) || StringUtils.isEmpty(dictItem.getItemName())) {
			throw new Exception("字典代码|字典项名称不能为空!");
		}
		int dictItemId = dictService.saveDictItem(dictItem);
		return JSONResult.fillResultJsonObject(dictItemId);
	}
	
	@RequestMapping(value = "/common/dictItem/delete", method = RequestMethod.POST)
	JSONObject deleteDictItem(@RequestBody AdminDictionaryItem dictItem) throws Exception {
		dictService.deleteDictItem(dictItem.getId());
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/common/dictItem/update", method = RequestMethod.POST)
	JSONObject updateDictItem(@RequestBody AdminDictionaryItem dictItem) throws Exception {
		dictService.updateDictItem(dictItem);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/common/status", method = RequestMethod.POST)
	JSONObject status(HttpServletRequest request) throws Exception {
		return JSONResult.success();
	}

}
