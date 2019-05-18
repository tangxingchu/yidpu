package com.weichu.mdesigner.api.controller;

import java.awt.image.RenderedImage;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantFunctionService;
import com.weichu.mdesigner.api.vo.MerchantFunctionVo;
import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.weichu.mdesigner.utils.validatecode.RandomValidateCodeUtil;

@RestController
@RequestMapping("/api")
public class AdminController {

	private Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	private CacheManager cacheManager;
	
	@Autowired
	private IMerchantFunctionService functionService;
	
	
	@RequestMapping(value = "/validateCode", method = RequestMethod.GET)
	public void validatecode(HttpServletResponse response, @RequestParam(value = "time", required = true) String time) throws Exception {
		Object[] objs = RandomValidateCodeUtil.creatValidateCode();
		response.setContentType("image/png");// 设置相应类型,告诉浏览器输出的内容为图片
		response.setHeader("Pragma", "No-cache");// 设置响应头信息，告诉浏览器不要缓存此内容
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expire", 0);
		logger.debug(objs[1].toString());
		//1分钟内有效
		cacheManager.getCache(Constants.CODE_CACHE_NAME).put(time, objs[1].toString());
		ImageIO.write((RenderedImage) objs[0], "png", response.getOutputStream());
	}

	/**
	 * 以树的方式显示function
	 * @return
	 */
	@RequestMapping(value = "/function/tree/{category}", method = RequestMethod.GET)
	public MerchantFunctionVo listFunctionTree(@PathVariable("category") int category) {
		return functionService.listFunction(category);
	}
	
	@RequestMapping(value = "/function/save", method = RequestMethod.POST)
	public JSONObject saveMerchantFunction(@RequestBody MerchantFunction function) {
		functionService.save(function);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/function/update", method = RequestMethod.POST)
	public JSONObject updateMerchantFunction(@RequestBody MerchantFunction function) {
		functionService.update(function);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/function/delete", method = RequestMethod.POST)
	public JSONObject deleteMerchantFunction(@RequestBody MerchantFunction function) {
		functionService.delete(function.getId());
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/function/get/{id}", method = RequestMethod.GET)
	public MerchantFunction getMerchantFunctionById(@PathVariable("id") int id) {
		return functionService.selectById(id);
	}
	//merchantFunction操作end
	
}
