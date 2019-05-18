package com.weichu.mdesigner.api.controller;

import java.io.File;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.entity.MerchantFloor;
import com.weichu.mdesigner.api.entity.MerchantFloorExample;
import com.weichu.mdesigner.api.mapper.MerchantFloorMapper;
import com.weichu.mdesigner.api.service.IMerchantFloorService;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.xiaoleilu.hutool.io.FileUtil;

/**
 * 楼层管理
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class FloorController extends BaseController {

	private Logger logger = LoggerFactory.getLogger(FloorController.class);

	@Autowired
	private MerchantFloorMapper mapper;

	@Autowired
	private IMerchantFloorService service;

	@Autowired
	private ResourceLoader resourceLoader;

	@RequestMapping(value = "/floor/list", method = RequestMethod.POST)
	public List<MerchantFloor> list(HttpServletRequest request, @RequestBody MerchantFloor floor) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/floor/list" + ", 用户id:" + mid);
		MerchantFloorExample example = new MerchantFloorExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		example.setOrderByClause("sort_no asc");
		return mapper.selectByExample(example);
	}

	@RequestMapping(value = "/floor/get/{id}", method = RequestMethod.GET)
	public JSONObject getById(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/floor/get/" + id + ", 用户:" + mid);
		MerchantFloorExample example = new MerchantFloorExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		List<MerchantFloor> merchantFloors = mapper.selectByExample(example);
		if (merchantFloors != null && !merchantFloors.isEmpty()) {
			return JSONResult.fillResultJsonObject(merchantFloors.get(0));
		} else {
			return null;
		}
	}

	@RequestMapping(value = "/floor/save", method = RequestMethod.POST)
	public JSONObject save(HttpServletRequest request, @RequestBody MerchantFloor floor) throws Exception {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/floor/save" + ", 用户id:" + mid);
		floor.setMerchantId(mid);
		floor.setStatus(1);
		floor.setCreateTime(new Date());
		mapper.insertSelective(floor);
		Integer floorId = floor.getId();
		Resource resource = resourceLoader.getResource("classpath:xmlTemplates/floorPlan.xml");
		String parentPath = getJarParentPath();
		// 创建目录
		String path = parentPath + "/floorPlan/" + mid + (floorId == null ? "" : "/" + floorId);
		File pathDir = new File(path);
		if (!pathDir.exists()) {
			pathDir.mkdirs();
		}
		File designFile = new File(path + "/design.xml");
		java.nio.file.Files.copy(
				resource.getInputStream(),
				designFile.toPath(),
	            StandardCopyOption.REPLACE_EXISTING);
//		FileUtil.copy(resource.getFile(), designFile, true);
		return JSONResult.fillResultJsonObject(floorId);
	}

	@RequestMapping(value = "/floor/update", method = RequestMethod.POST)
	public JSONObject update(HttpServletRequest request, @RequestBody MerchantFloor floor) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/floor/update" + ", 用户id:" + mid);
		if (mid != floor.getMerchantId()) {
			throw new YdpException("非法操作");
		}
		floor.setModifyTime(new Date());
		mapper.updateByPrimaryKeySelective(floor);
		return JSONResult.success();
	}

	@RequestMapping(value = "/floor/delete", method = RequestMethod.POST)
	public JSONObject delete(HttpServletRequest request, @RequestBody MerchantFloor floor) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/floor/delete" + ", 用户id:" + mid);
		service.delete(floor.getId(), mid);
		String parentPath = getJarParentPath();
		String sourcePath = parentPath + "/floorPlan/" + mid + "/" + floor.getId();
		File pathDir = new File(sourcePath);
		String destPath = parentPath + "/floorPlan/" + mid + "/" + floor.getId() + "_del";
		pathDir.renameTo(new File(destPath));
		return JSONResult.success();
	}

	@RequestMapping(value = "/floor/copy", method = RequestMethod.POST)
	public JSONObject copy(HttpServletRequest request, @RequestParam Integer sourceFloorId,
			@RequestParam Integer targetFloorId) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String parentPath = getJarParentPath();
		String sourcePath = parentPath + "/floorPlan/" + mid + "/" + sourceFloorId + "/design.xml";
		String targetDirPath = parentPath + "/floorPlan/" + mid + "/" + targetFloorId;
		File pathDir = new File(targetDirPath);
		if (!pathDir.exists()) {
			pathDir.mkdirs();
		}
		File sourceFile = new File(sourcePath);
		if (!sourceFile.exists()) {
			throw new Exception("复制失败,复制源平面图不存在.");
		}
		SAXReader reader = new SAXReader();
		Document xmlDoc = reader.read(sourceFile);
		List<Element> elements = xmlDoc.selectNodes("//UserObject[@tableCode]");
		List<Element> elements2 = xmlDoc.selectNodes("//object[@tableCode]");//这个是拖进来的图片 并且设置了tableCode
		for (Element element : elements) {
			element.attribute("tableCode").setValue("");
		}
		for (Element element : elements2) {
			element.attribute("tableCode").setValue("");
		}
		
		File targetFile = new File(targetDirPath + "/design.xml");
		FileUtil.writeUtf8String(xmlDoc.asXML(), targetFile);
//		FileUtil.copy(sourceFile, targetFile, true);
		return JSONResult.success();
	}

	
}
