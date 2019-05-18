package com.weichu.mdesigner.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.entity.MerchantRole;
import com.weichu.mdesigner.api.service.IMerchantFunctionService;
import com.weichu.mdesigner.api.service.IMerchantRoleFunctionService;
import com.weichu.mdesigner.api.service.IMerchantRoleService;
import com.weichu.mdesigner.common.entity.MerchantRoleFunction;
import com.weichu.mdesigner.common.vo.RoleFunctionVo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 角色授权
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class RoleFunctionController {

	@Autowired
	private IMerchantRoleService roleService;
	
	@Autowired
	private IMerchantFunctionService functionService;
	
	@Autowired
	private IMerchantRoleFunctionService service;
	
	@RequestMapping(value = "/roleFunction/init", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0403')")
	Map<String, List<?>> init(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String userName = JavaWebToken.getUsername(request);
		Map<String, List<?>> results = new HashMap<>();
		List<MerchantRole> roles = roleService.list(mid);
		List<RoleFunctionVo> functions = functionService.listFunction(userName, mid);
		results.put("roles", roles);
		results.put("functions", functions);
		return results;
	}
	
	
	@RequestMapping(value = "/roleFunction/save", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0403')")
	JSONObject saveRoleFunction(HttpServletRequest request, @RequestBody Map<Integer, List<Integer>> roleFunctions) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		String username = JavaWebToken.getUsername(request);
		service.save(roleFunctions, mid, username);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/roleFunction/list", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0403')")
	List<MerchantRoleFunction> listRoleFunction(HttpServletRequest request, @RequestBody MerchantRoleFunction roleFunction) {
		int mid = JavaWebToken.getUid(request);
		return service.list(roleFunction.getRoleId(), mid);
	}
	
}
