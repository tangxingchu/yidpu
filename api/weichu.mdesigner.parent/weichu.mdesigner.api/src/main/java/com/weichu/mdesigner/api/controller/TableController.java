package com.weichu.mdesigner.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.weichu.mdesigner.api.entity.MerchantTable;
import com.weichu.mdesigner.api.service.IMerchantTableService;
import com.weichu.mdesigner.utils.JavaWebToken;

/**
 * 桌台管理
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class TableController {
	
	@Autowired
	private IMerchantTableService service;
	
	@RequestMapping(value = "/table/list", method = RequestMethod.POST)
	List<MerchantTable> listAllTable(HttpServletRequest request, @RequestBody MerchantTable table) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantTable> tables = service.list(mid);
		return tables;
	}
	
	@RequestMapping(value = "/table/syncTable", method = RequestMethod.POST)
	public List<MerchantTable> syncConfig(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return service.list(mid);
	}
	
}
