package com.weichu.mdesigner.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IAdminOrderService;
import com.weichu.mdesigner.common.entity.AdminOrder;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 我的订单
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/myOrder")
public class MyOrderController {
	
	@Autowired
	private IAdminOrderService orderService;
	
	/**
	 * 查询我的订单
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public List<AdminOrder> list(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return orderService.list(mid);
	}
	
	/**
	 * 取消我的订单
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/cancel/{id}", method = RequestMethod.GET)
	public JSONObject cancel(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		int result = orderService.cancelOrder(id, mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 删除我的订单
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
	public JSONObject delete(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		int result = orderService.deleteOrder(id, mid);
		return JSONResult.fillResultJsonObject(result);
	}
}
