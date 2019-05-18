package com.weichu.mdesigner.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantPrintSettingService;
import com.weichu.mdesigner.common.entity.MerchantPrintSetting;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 打印机设置
 * @author tangxingchu
 *
 */
@RestController
@RequestMapping("/api/print")
public class PrintController {
	
	@Autowired
	private IMerchantPrintSettingService service;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	List<MerchantPrintSetting> list(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return service.list(mid);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	JSONObject save(HttpServletRequest request, @RequestBody MerchantPrintSetting printSetting) {
		int mid = JavaWebToken.getUid(request);
		int result = service.save(printSetting, mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	JSONObject update(HttpServletRequest request, @RequestBody MerchantPrintSetting printSetting) {
		int mid = JavaWebToken.getUid(request);
		service.update(printSetting, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	JSONObject delete(HttpServletRequest request, @RequestParam Integer id) {
		int mid = JavaWebToken.getUid(request);
		service.delete(id, mid);
		return JSONResult.success();
	}
	
}
