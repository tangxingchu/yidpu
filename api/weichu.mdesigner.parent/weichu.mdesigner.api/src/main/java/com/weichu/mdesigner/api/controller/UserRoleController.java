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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.entity.MerchantRole;
import com.weichu.mdesigner.api.entity.MerchantUserRole;
import com.weichu.mdesigner.api.service.IMerchantChildUserService;
import com.weichu.mdesigner.api.service.IMerchantFunctionService;
import com.weichu.mdesigner.api.service.IMerchantRoleService;
import com.weichu.mdesigner.api.service.IMerchantUserRoleService;
import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.common.entity.MerchantUserChildren;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenEmp;
import com.weichu.mdesigner.common.vo.RoleFunctionVo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;


/**
 * 用户授权
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class UserRoleController {

	@Autowired
	private IMerchantRoleService roleService;
	
	@Autowired
	private IMerchantChildUserService childUserService;
	
	@Autowired
	private IMerchantFunctionService functionService;
	
	@Autowired
	private IMerchantUserRoleService service;
	
	@RequestMapping(value = "/userRole/init", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0404')")
	Map<String, List<?>> init(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		List<MerchantUserChildrenEmp> childUsers = childUserService.list(mid);
		List<MerchantRole> roles = roleService.list(mid);
		List<RoleFunctionVo> functions = functionService.listFunction(mid);
		Map<String, List<?>> result = new HashMap<>();
		result.put("childUsers", childUsers);
		result.put("roles", roles);
		result.put("functions", functions);
		return result;
	}
	
	@RequestMapping(value = "/userRole/save", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0404')")
	JSONObject saveRoleFunction(HttpServletRequest request, @RequestBody Map<Integer, List<Integer>> userRoles) throws Exception {
		int mid = JavaWebToken.getUid(request);
		service.save(userRoles, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/userRole/list", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0404')")
	List<MerchantUserRole> listRoleFunction(HttpServletRequest request, @RequestBody MerchantUserRole userRole) {
		int mid = JavaWebToken.getUid(request);
		return service.list(userRole.getMerchantChilduserId(), mid);
	}
	
	@RequestMapping(value = "/userRole/listFunctionByRoleId", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0404')")
	List<MerchantFunction> listFunctionByRoleId(HttpServletRequest request, @RequestBody List<Integer> roleIds) {
		int mid = JavaWebToken.getUid(request);
		return functionService.listFunctionByRoleId(roleIds, mid);
	}
	
	@RequestMapping(value = "/userRole/search", method = RequestMethod.POST)
	public List<MerchantUserChildrenEmp> search(HttpServletRequest request, @RequestParam String key)  throws YdpException {
		int mid = JavaWebToken.getUid(request);
		List<MerchantUserChildrenEmp> childUsers = childUserService.listByKey(key, mid);
		return childUsers;
	}
	
}
