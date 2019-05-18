package com.weichu.mdesigner.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantBusinessInfoService;
import com.weichu.mdesigner.common.entity.MerchantBusinessInfo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 基础店铺营业信息
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/businessInfo")
public class BusinessInfoController {
	
	@Autowired
	private IMerchantBusinessInfoService service;
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public JSONObject save(HttpServletRequest request, @RequestBody MerchantBusinessInfo businessInfo) throws YdpException {
		if(businessInfo.getPointCash() != null) {
			if(businessInfo.getPointCash() <= 0) {
				throw new YdpException("积分返现比例值必须大于0");
			}
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		service.saveOrUpdate(businessInfo, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/get", method = RequestMethod.POST)
	public MerchantBusinessInfo get(HttpServletRequest request) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		return service.selectByMid(mid);
	}
	
}
