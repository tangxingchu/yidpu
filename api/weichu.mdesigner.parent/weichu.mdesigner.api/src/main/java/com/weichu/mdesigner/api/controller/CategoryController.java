package com.weichu.mdesigner.api.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.common.entity.GoodsCategory;
import com.weichu.mdesigner.common.entity.GoodsCategoryExample;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.GoodsCategoryMapper;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 商品分类
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class CategoryController {

	private Logger logger = LoggerFactory.getLogger(CategoryController.class);

	@Autowired
	private GoodsCategoryMapper mapper;

	@RequestMapping(value = "/category/list", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0203')")
	public List<GoodsCategory> list(HttpServletRequest request, @RequestBody GoodsCategory category) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/category/list" + ", 用户id:" + mid);
		GoodsCategoryExample example = new GoodsCategoryExample();
		example.setOrderByClause("sort_no asc");
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}

	@RequestMapping(value = "/category/get/{id}", method = RequestMethod.GET)
	@PreAuthorize("hasPermission(#request, '0203')")
	public GoodsCategory getById(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/category/get/" + id + ", 用户:" + mid);
		GoodsCategoryExample example = new GoodsCategoryExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		List<GoodsCategory> categories = mapper.selectByExample(example);
		if (categories != null && !categories.isEmpty()) {
			return categories.get(0);
		} else {
			return null;
		}
	}

	@RequestMapping(value = "/category/save", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0203')")
	public JSONObject save(HttpServletRequest request, @RequestBody GoodsCategory category) throws Exception {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/category/save" + ", 用户id:" + mid);
		category.setMerchantId(mid);
		category.setCreateTime(new Date());
		mapper.insertSelective(category);
		return JSONResult.fillResultJsonObject(category.getId());
	}

	@RequestMapping(value = "/category/update", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0203')")
	public JSONObject update(HttpServletRequest request, @RequestBody GoodsCategory category) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/category/update" + ", 用户id:" + mid);
		if (mid != category.getMerchantId()) {
			throw new YdpException("非法操作");
		}
		category.setModifyTime(new Date());
		mapper.updateByPrimaryKeySelective(category);
		return JSONResult.success();
	}

	@RequestMapping(value = "/category/delete", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0203')")
	public JSONObject delete(HttpServletRequest request, @RequestBody GoodsCategory category) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/category/delete" + ", 用户id:" + mid);
		GoodsCategoryExample example = new GoodsCategoryExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(category.getId());
		mapper.deleteByExample(example);
		return JSONResult.success();
	}

}
