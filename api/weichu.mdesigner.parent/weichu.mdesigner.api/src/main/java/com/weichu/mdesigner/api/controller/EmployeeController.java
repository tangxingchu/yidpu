package com.weichu.mdesigner.api.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.entity.MerchantEmployee;
import com.weichu.mdesigner.api.service.IMerchantAttachmentService;
import com.weichu.mdesigner.api.service.IMerchantEmployeeService;
import com.weichu.mdesigner.api.vo.MerchantEmployeeVo;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 员工api接口
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class EmployeeController extends BaseController {
	
	private Logger logger = LoggerFactory.getLogger(EmployeeController.class);
	
	@Autowired
	private IMerchantEmployeeService service;
	
	@Autowired
	private IMerchantAttachmentService attachService;
	
	@RequestMapping(value = "/employee/list", method = RequestMethod.POST)
	public List<MerchantEmployee> list(HttpServletRequest request, @RequestBody MerchantEmployee employee) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/employee/list" + ", 用户id:" + mid);
		return service.list(employee, mid);
	}
	
	@RequestMapping(value = "/employee/get/{id}", method = RequestMethod.GET)
	public MerchantEmployeeVo getById(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/employee/get/" + id + ", 用户id:" + mid);
		return service.selectById(id, mid);
	}
	
	@RequestMapping(value = "/employee/save", method = RequestMethod.POST)
	public JSONObject save(HttpServletRequest request, MultipartFile photo, MultipartFile[] files, MerchantEmployee employee) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/employee/save" + ", 用户id:" + mid);
		if(mid != employee.getMerchantId()) {
			throw new YdpException("非法操作.");
		}
		if(files != null && files.length > 5) {
			throw new YdpException("最多上传5张资质照片.");
		}
		MerchantAttachment attachment = null;
		List<MerchantAttachment> attachments = null;
		String parentPath = getJarParentPath();
		if(photo != null) {
			attachment = new MerchantAttachment();
			attachment.setUploadTime(new Date());
			attachment.setFileName(photo.getOriginalFilename());
			attachment.setFileSize(photo.getSize());
			String fileSuffix = photo.getOriginalFilename().substring(photo.getOriginalFilename().lastIndexOf("."));
			attachment.setFileSuffix(fileSuffix);
			attachment.setMerchantId(mid);
			File merchantFile = new File(parentPath + "/employee/" + mid + "/photo");
			if (!merchantFile.exists()) {
				merchantFile.mkdirs();
			}
			String newFileName = UUID.randomUUID().toString() + fileSuffix;
			String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
			File newFile = new File(filePath);
			try {
				photo.transferTo(newFile);
			} catch (IllegalStateException | IOException e) {
				logger.error(e.getMessage());
				e.printStackTrace();
				throw new YdpException("照片上传失败");
			}
			attachment.setFilePath("/employee/" + mid + "/photo/" + newFileName);
		}
		
		if (files != null) {
			String suffix;
			String newFileName;
			File newFile;
			attachments = new ArrayList<>();
			for (int i = 0; i < files.length; i++) {
				MultipartFile mf = files[i];
				suffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				newFileName = UUID.randomUUID().toString() + suffix;
				MerchantAttachment attachment2 = new MerchantAttachment();
				attachment2.setUploadTime(new Date());
				attachment2.setFileName(mf.getOriginalFilename());
				attachment2.setFileSize(mf.getSize());
				String fileSuffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				attachment2.setFileSuffix(fileSuffix);
				attachment2.setMerchantId(mid);
				File merchantFile = new File(parentPath + "/employee/" + mid + "/qualification");
				if (!merchantFile.exists()) {
					merchantFile.mkdirs();
				}
				String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
				newFile = new File(filePath);
				try {
					mf.transferTo(newFile);
				} catch (IllegalStateException | IOException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
					throw new YdpException("资质照片上传失败");
				}
				
				attachment2.setFilePath("/qualification/" + newFileName);
				attachments.add(attachment2);
			}
		}
		service.save(employee, mid, attachment, attachments);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/employee/update", method = RequestMethod.POST)
	public JSONObject update(HttpServletRequest request, MultipartFile photo, MultipartFile[] files,
			MerchantEmployee employee, String delFile) throws Exception {
		int mid = JavaWebToken.getUid(request);
		if(mid != employee.getMerchantId()) {
			throw new YdpException("非法操作.");
		}
		logger.debug("调用api: /api/employee/update" + ", 用户id:" + mid);
		int delFileLength = 0;
		if(delFile != null) {
			String[] delFiles = delFile.split(",");
			delFileLength = delFiles.length;
		}
		long count = attachService.count(employee.getId(), mid);
		if(count + files.length - delFileLength > 5) {
			throw new Exception("最多上传5张资质照片.");
		}
		MerchantAttachment attachment = null;
		List<MerchantAttachment> attachments = null;
		String parentPath = getJarParentPath();
		if(photo != null) {
			attachment = new MerchantAttachment();
			attachment.setUploadTime(new Date());
			attachment.setFileName(photo.getOriginalFilename());
			attachment.setFileSize(photo.getSize());
			String fileSuffix = photo.getOriginalFilename().substring(photo.getOriginalFilename().lastIndexOf("."));
			attachment.setFileSuffix(fileSuffix);
			attachment.setMerchantId(mid);
			File merchantFile = new File(parentPath + "/employee/" + mid + "/photo");
			if (!merchantFile.exists()) {
				merchantFile.mkdirs();
			}
			String newFileName = UUID.randomUUID().toString() + fileSuffix;
			String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
			File newFile = new File(filePath);
			try {
				photo.transferTo(newFile);
			} catch (IllegalStateException | IOException e) {
				logger.error(e.getMessage());
				e.printStackTrace();
				throw new YdpException("照片上传失败");
			}
			attachment.setFilePath("/photo/" + newFileName);
		}
		
		if (files != null) {
			String suffix;
			String newFileName;
			File newFile;
			attachments = new ArrayList<>();
			for (int i = 0; i < files.length; i++) {
				MultipartFile mf = files[i];
				suffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				newFileName = UUID.randomUUID().toString() + suffix;
				MerchantAttachment attachment2 = new MerchantAttachment();
				attachment2.setUploadTime(new Date());
				attachment2.setFileName(mf.getOriginalFilename());
				attachment2.setFileSize(mf.getSize());
				String fileSuffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				attachment2.setFileSuffix(fileSuffix);
				attachment2.setMerchantId(mid);
				File merchantFile = new File(parentPath + "/employee/" + mid + "/qualification");
				if (!merchantFile.exists()) {
					merchantFile.mkdirs();
				}
				String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
				newFile = new File(filePath);
				try {
					mf.transferTo(newFile);
				} catch (IllegalStateException | IOException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
					throw new YdpException("资质照片上传失败");
				}
				attachment2.setFilePath("/employee/" + mid + "/qualification/" + newFileName);
				attachments.add(attachment2);
			}
		}
		service.update(employee, mid, attachment, attachments, delFile);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/employee/delete", method = RequestMethod.POST)
	public JSONObject delete(HttpServletRequest request, @RequestBody MerchantEmployee employee) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/employee/delete" + ", 用户id:" + mid);
		service.delete(employee.getId(), mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/employee/export", method = RequestMethod.GET)
	public void exportExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//TODO 待改进 先在本地生成excel文件，返回链接地址给客户端,客户端在下载.
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/employee/export" + ", 用户id:" + mid);
	    response.setHeader("content-Type", "application/vnd.ms-excel");
	    // 下载文件的默认名称
	    String fileName = "员工信息(" + DateUtil.now() + ").xlsx";
	    response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "utf-8"));
	    OutputStream os = response.getOutputStream();
	    service.exportExcel(os, new MerchantEmployee(), mid);
	    os.flush();
	    os.close();
	}
	
	@RequestMapping(value = "/employee/import", method = RequestMethod.POST)
	public JSONObject importExcel(HttpServletRequest request, HttpServletResponse response, @RequestParam("file") MultipartFile file) throws IOException {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/employee/import" + ", 用户id:" + mid);
		int count = service.importFromExcel(file.getInputStream(), mid);
		return JSONResult.fillResultJsonObject(count);
	}
	
	@RequestMapping(value = "/employee/image/preview/{id}/**", method = RequestMethod.GET)
	public void imagePreview(HttpServletRequest request, HttpServletResponse response, @PathVariable("id") String id) {
		int mid = JavaWebToken.getUid(request);
		String path = "/" + id + "/" + extractPathFromPattern(request);
		File imgFile = new File(getJarParentPath() + "/employee/" + mid + path);
		responseFile(response, imgFile);
	}
	
}
