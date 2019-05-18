package com.weichu.mdesigner.api.controller;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantChildUserService;
import com.weichu.mdesigner.common.entity.MerchantUserChildren;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenEmp;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 子账户api接口
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class ChildUserController {
	
	private Logger logger = LoggerFactory.getLogger(ChildUserController.class);
	
	@Autowired
	private IMerchantChildUserService childUserService;
	
	@RequestMapping(value = "/childUser/list", method = RequestMethod.POST)
	public List<MerchantUserChildren> list(HttpServletRequest request, @RequestBody MerchantUserChildren user) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/childUser/list" + ", 用户:" + mid);
		return childUserService.list(user, mid);
	}
	
	@RequestMapping(value = "/childUser/list2", method = RequestMethod.POST)
	public List<MerchantUserChildrenEmp> list2(HttpServletRequest request, @RequestBody MerchantUserChildren user) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/childUser/list" + ", 用户:" + mid);
		return childUserService.list(mid);
	}
	
	@RequestMapping(value = "/childUser/get/{id}", method = RequestMethod.GET)
	public MerchantUserChildren getById(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/childUser/get/" + id + ", 用户:" + mid);
		return childUserService.selectById(id, mid);
	}
	
	@RequestMapping(value = "/childUser/save", method = RequestMethod.POST)
	public JSONObject save(HttpServletRequest request, @RequestBody MerchantUserChildren user) throws Exception {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/childUser/save" + ", 用户:" + mid);
		Pattern pattern = Pattern.compile("^[A-Za-z0-9]+$");
		Matcher match = pattern.matcher(user.getAccount());
		if(!match.matches()) {
			throw new YdpException("子账户只能是数字与字母的组合");
		}
		childUserService.save(user, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/childUser/update", method = RequestMethod.POST)
	public JSONObject update(HttpServletRequest request, @RequestBody MerchantUserChildren user) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/childUser/update" + ", 用户:" + mid);
		childUserService.update(user, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/childUser/xuqi", method = RequestMethod.POST)
	public JSONObject update(HttpServletRequest request, @RequestBody Map<String, Integer> days) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		int merchantId = days.get("merchantId");
		if(mid != merchantId) {
			throw new YdpException("非法操作");
		}
		int childUserId = days.get("childUserId");
		int day = days.get("day");
		logger.debug("调用api: /api/childUser/update" + ", 用户:" + mid);
		String result = childUserService.update(childUserId, day);
		return JSONResult.fillResultJsonObject(result);
	}
	
	@RequestMapping(value = "/childUser/delete", method = RequestMethod.POST)
	public JSONObject delete(HttpServletRequest request, @RequestBody MerchantUserChildren user) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/childUser/delete" + ", 用户:" + mid);
		childUserService.delete(user.getId(), mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/childUser/resetPWD", method = RequestMethod.POST)
	public JSONObject resetPWD(HttpServletRequest request, @RequestParam String childAccount) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		String newPassword = childUserService.resetPWD(childAccount, mid);
		return JSONResult.fillResultJsonObject(newPassword);
	}
	
	
	
}
