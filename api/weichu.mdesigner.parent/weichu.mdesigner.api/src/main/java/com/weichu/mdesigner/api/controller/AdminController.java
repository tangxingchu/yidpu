package com.weichu.mdesigner.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.weichu.mdesigner.common.entity.AdminFunctionPrice;
import com.weichu.mdesigner.common.entity.AdminFunctionPriceExample;
import com.weichu.mdesigner.common.entity.AdminVersion;
import com.weichu.mdesigner.common.mapper.AdminFunctionPriceMapper;
import com.weichu.mdesigner.common.mapper.AdminVersionMapper;

/**
 * 菜单价目
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class AdminController {
	
	@Autowired
	private AdminFunctionPriceMapper funPriceMapper;
	
	@Autowired
	private AdminVersionMapper versionMapper;
	
	/**
	 * 查询功能菜单价目表
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/adminFunPrice/list/{id}", method = RequestMethod.GET)
	public List<AdminFunctionPrice> listFunctionPrice(HttpServletRequest request, @PathVariable("id") Integer functionId) {
		AdminFunctionPriceExample example = new AdminFunctionPriceExample();
		example.createCriteria().andFunctionIdEqualTo(functionId);
		return funPriceMapper.selectByExample(example);
	}
	
	/**
	 * 检查版本信息
	 * @param request
	 * @param appType 所属应用
	 * @return
	 */
	@RequestMapping(value = "/version/getLastVersion/{appType}", method = RequestMethod.GET)
	public AdminVersion getLastVersion(HttpServletRequest request, @PathVariable("appType") Integer appType) {
		return versionMapper.selectLastVersion(appType);
	}
}
