package com.weichu.mdesigner.api;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.CacheManager;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONArray;
import com.weichu.mdesigner.common.entity.AdminDictionary;
import com.weichu.mdesigner.common.entity.AdminDictionaryItem;
import com.weichu.mdesigner.common.service.IDictService;
import com.weichu.mdesigner.utils.constants.Constants;

/**
 * 启动之后缓存字典
 * 
 * @author tangxingchu
 *
 */
@Component
@Order(2) // 所有实现了CommandLineRunner接口的的执行顺序(从小到大)
public class InitDictCached implements CommandLineRunner {

	private Logger logger = LoggerFactory.getLogger(InitDictCached.class);
	
	@Autowired
	private IDictService dictService;
	
	@Autowired
	private CacheManager cacheManager;

	@Override
	public void run(String... args) throws Exception {
		//设置字典缓存
		logger.debug("缓存字典, cache=" + cacheManager);
		if (cacheManager != null) {
			List<AdminDictionary> dicts = dictService.selectDict(new AdminDictionary());
			for (AdminDictionary dict : dicts) {
				String dictCode = dict.getDictCode();
				List<AdminDictionaryItem> dictItems = dictService.selectDictItem(dictCode);
				cacheManager.getCache(Constants.NO_EXP_CACHE_NAME).put(dictCode, JSONArray.toJSONString(dictItems));
			}
		}
	}

}
