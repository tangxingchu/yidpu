package com.weichu.mdesigner.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantQueueService;
import com.weichu.mdesigner.api.service.IMerchantTableService;
import com.weichu.mdesigner.api.vo.MerchantQueueVo;
import com.weichu.mdesigner.api.vo.MerchantTableVo;
import com.weichu.mdesigner.common.entity.MerchantQueue;
import com.weichu.mdesigner.common.entity.MerchantQueueTable;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 排队管理
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class QueueController {
	
	@Autowired
	private IMerchantQueueService service;
	
	@Autowired
	private IMerchantTableService tableService;

	@RequestMapping(value = "/queue/list", method = RequestMethod.POST)
	Map<String, Object> listAllQueue(HttpServletRequest request, @RequestBody MerchantQueue queue) throws Exception {
		int mid = JavaWebToken.getUid(request);
		Map<String, Object> resultMap = new HashMap<>();
		List<MerchantQueueVo> queues = service.list(queue, mid);
		List<MerchantTableVo> tables = tableService.selectNotInQueueTables(mid);
		resultMap.put("queues", queues);
		resultMap.put("tables", tables);
		return resultMap;
	}
	
	@RequestMapping(value = "/queue/save", method = RequestMethod.POST)
	JSONObject saveQueue(HttpServletRequest request, @RequestBody MerchantQueue queue) throws Exception {
		int mid = JavaWebToken.getUid(request);
		Integer queueId = service.save(queue, mid);
		return JSONResult.fillResultJsonObject(queueId);
	}
	
	@RequestMapping(value = "/queueTable/save", method = RequestMethod.POST)
	JSONObject saveQueueTable(HttpServletRequest request, @RequestBody MerchantQueueTable queueTable) throws Exception {
		int mid = JavaWebToken.getUid(request);
		service.saveQueueTable(queueTable, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/queue/delete", method = RequestMethod.POST)
	JSONObject deleteQueue(HttpServletRequest request, @RequestBody MerchantQueue queue) throws Exception {
		int mid = JavaWebToken.getUid(request);
		service.delete(queue.getId(), mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/queue/update", method = RequestMethod.POST)
	JSONObject updateQueue(HttpServletRequest request, @RequestBody MerchantQueue queue) throws Exception {
		int mid = JavaWebToken.getUid(request);
		service.update(queue, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/queue/get/{id}", method = RequestMethod.GET)
	public MerchantQueue getById(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		return service.selectById(id, mid);
	}
	
}
