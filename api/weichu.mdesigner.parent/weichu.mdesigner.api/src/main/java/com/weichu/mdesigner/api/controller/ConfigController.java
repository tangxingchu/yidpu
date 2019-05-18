package com.weichu.mdesigner.api.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantConfigService;
import com.weichu.mdesigner.common.entity.MerchantConfig;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 商品基本设置
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class ConfigController {
	
	private Logger logger = LoggerFactory.getLogger(CategoryController.class);
	
	@Autowired
	private IMerchantConfigService service;
	
	@RequestMapping(value = "/config/listBasicConfig", method = RequestMethod.POST)
	public List<MerchantConfig> listBasicConfig(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/config/list" + ", 用户:" + mid);
		List<String> values = new ArrayList<String>();
		values.add(Constants.LOGIN_SYNC_DATA);
		values.add(Constants.AUTO_START_SERVER);
		values.add(Constants.WAITER_APP_KITCHEN);
		values.add(Constants.USER_APP_KITCHEN);
		values.add(Constants.ENABLED_SUBTRACT_COUPON);
		return service.listByCodes(values, mid);
	}
	
	@RequestMapping(value = "/config/listBusinessConfig", method = RequestMethod.POST)
	public List<MerchantConfig> listBusinessConfig(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/config/list" + ", 用户:" + mid);
		List<String> values = new ArrayList<String>();
		values.add(Constants.AUTO_PRINT_TICKET);
		values.add(Constants.AUTO_PRINT_ORDER);
		values.add(Constants.AUTO_PRINT_CASHIER);
		values.add(Constants.IS_OPENED_WARING);
		values.add(Constants.IS_MUSTBE_LINKED_WIFI);
		return service.listByCodes(values, mid);
	}
	
//	@RequestMapping(value = "/config/save", method = RequestMethod.POST)
//	public JSONObject save(HttpServletRequest request, @RequestBody MerchantConfig config) throws Exception {
//		int mid = JavaWebToken.getUid(request);
//		logger.debug("调用api: /api/config/save" + ", 用户id:" + mid);
//		int id = service.save(config, mid);
//		return JSONResult.fillResultJsonObject(id);
//	}
	
	@RequestMapping(value = "/config/update", method = RequestMethod.POST)
	public JSONObject update(HttpServletRequest request, @RequestBody MerchantConfig config) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/config/update" + ", 用户id:" + mid);
		if(Constants.WAITER_APP_KITCHEN.equals(config.getConfigCode())
				|| Constants.USER_APP_KITCHEN.equals(config.getConfigCode())
				|| Constants.ENABLED_SUBTRACT_COUPON.equals(config.getConfigCode())) {
			throw new YdpException("非法操作更改基础配置");
		}
		String username = JavaWebToken.getUsername(request);
		service.updateByConfigCode(config, mid, username);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/config/update09", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0009')")//function_code
	public JSONObject update09(HttpServletRequest request, @RequestBody MerchantConfig config) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/config/update09" + ", 用户id:" + mid);
		config.setConfigCode(Constants.WAITER_APP_KITCHEN);
		String username = JavaWebToken.getUsername(request);
		service.updateByConfigCode(config, mid, username);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/config/update10", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0010')")//function_code
	public JSONObject update10(HttpServletRequest request, @RequestBody MerchantConfig config) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/config/update10" + ", 用户id:" + mid);
		config.setConfigCode(Constants.USER_APP_KITCHEN);
		String username = JavaWebToken.getUsername(request);
		service.updateByConfigCode(config, mid, username);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/config/update12", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0012')")//function_code
	public JSONObject update12(HttpServletRequest request, @RequestBody MerchantConfig config) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/config/update12" + ", 用户id:" + mid);
		config.setConfigCode(Constants.ENABLED_SUBTRACT_COUPON);
		String username = JavaWebToken.getUsername(request);
		service.updateByConfigCode(config, mid, username);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/config/get/{configCode}", method = RequestMethod.GET)
	public MerchantConfig getByCode(HttpServletRequest request, @PathVariable("configCode") String configCode) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/config/get/" + configCode + ", 用户:" + mid);
		return service.getEntityByCode(configCode, mid);
	}
	
	@RequestMapping(value = "/config/syncConfig", method = RequestMethod.POST)
	public List<MerchantConfig> syncConfig(HttpServletRequest request, @RequestBody MerchantConfig config) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/config/syncConfig" + ", 用户:" + mid);
		return service.listAll(mid);
	}
	
}
