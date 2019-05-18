package com.weichu.mdesigner.api.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantSMSSignService;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.MerchantSMSSign;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;

@RestController
@RequestMapping("/api/smsSign")
public class SMSSignController extends BaseController {
	
	Logger logger = LoggerFactory.getLogger(SMSSignController.class);
	
	@Autowired
	private IMerchantSMSSignService service;
	
	/**
	 * 商家上传授权函，我们代商家签约支付宝的当面付功能
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/saveSMSSign", method = RequestMethod.POST)
	public JSONObject saveSMSSign(HttpServletRequest request, MultipartFile sqh, MerchantSMSSign smsSign) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		String parentPath = getJarParentPath();
		if(sqh != null) {
			String fileSuffix = sqh.getOriginalFilename().substring(sqh.getOriginalFilename().lastIndexOf("."));
			File merchantFile = new File(parentPath + "/merchant/" + mid + "/smsSqh");
			if (!merchantFile.exists()) {
				merchantFile.mkdirs();
			}
			String newFileName = "alisms_sqh" + fileSuffix;
			String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
			File newFile = new File(filePath);
			try {
				sqh.transferTo(newFile);				
			} catch (IllegalStateException | IOException e) {
				logger.error("上传授权委托书失败," + e.getMessage());
				e.printStackTrace();
				throw new YdpException("上传授权委托书失败");
			}
			smsSign.setSqhPath("/smsSqh/" + newFileName);
		}
		int result = service.saveSMSSign(smsSign, mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 支付宝授权函照片预览 
	 */
	@RequestMapping(value = "/sqh/preview", method = RequestMethod.GET)
	public void sqhImagePreview(HttpServletRequest request, HttpServletResponse response) {
		int mid = JavaWebToken.getUid(request);
		MerchantSMSSign smsSign = service.selectByMId(mid);
		if(smsSign != null) {
			String path = "/merchant/" + mid  + smsSign.getSqhPath();
			File imgFile = new File(getJarParentPath() + path);		
			responseFile(response, imgFile);
		}
	}
	
	/**
	 * 查询商家的短信签名
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/selectSMSSign", method = RequestMethod.POST)
	public MerchantSMSSign selectSMSSign(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		MerchantSMSSign smsSign = service.selectByMId(mid);
		if(smsSign == null) {
			return new MerchantSMSSign();
		}
		return smsSign;
	}
	
}
