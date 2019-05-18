package com.weichu.mdesigner.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantAlipayService;
import com.weichu.mdesigner.common.entity.MerchantAlipay;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 商家支付设置(支付宝、微信)
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class PaySettingController {
	
	private Logger logger = LoggerFactory.getLogger(PaySettingController.class);
	
	@Autowired
	private IMerchantAlipayService alipayService;
	
	
	@RequestMapping(value = "/paySetting/selectAlipayByMId", method = RequestMethod.POST)
	MerchantAlipay selectById(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		MerchantAlipay merchantAlipay = alipayService.selectByMId(mid);
		if(merchantAlipay == null) {
			merchantAlipay = new MerchantAlipay();
		}
		return merchantAlipay;
	}
	
	@RequestMapping(value = "/paySetting/saveAlipay", method = RequestMethod.POST)
	JSONObject saveAlipay(HttpServletRequest request, @RequestBody MerchantAlipay alipay) throws Exception {
		int mid = JavaWebToken.getUid(request);
		Integer id = alipayService.addAlipayConfig(alipay, mid);
		return JSONResult.fillResultJsonObject(id);
	}
	
}
