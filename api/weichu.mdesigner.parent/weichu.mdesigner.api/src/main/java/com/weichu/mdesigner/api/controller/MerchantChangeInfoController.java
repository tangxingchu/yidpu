package com.weichu.mdesigner.api.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.vo.MerchantUserChangeHisVo;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.MerchantImage;
import com.weichu.mdesigner.common.entity.MerchantImageHis;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 基本信息 变更请求
 * 需要加权限,因此单独提取出来
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/merchant")
public class MerchantChangeInfoController extends BaseController {
	
	private Logger logger = LoggerFactory.getLogger(MerchantChangeInfoController.class);
	
	@Autowired
	private IMerchantService service;
	
	@Value("${public.image.save.path}")
	private String publicImagePath;
	
	/**
	 * 提交变更
	 * @param request
	 * @param photos	商家店铺照片信息
	 * @param user 商家信息
	 * @param delPhotoImage	删除的image
	 * @param defaultPhotoIndex 默认图片的下标
	 * @return
	 */
	@RequestMapping(value = "/commitBasicInfoChange", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0011')") //商家基本信息提交更改权限
	public JSONObject commitBasicInfoChange(HttpServletRequest request, MultipartFile logo, MultipartFile[] photos, MerchantUser user,
			String delPhotoImage, Integer defaultPhotoIndex) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		if(logo != null) {
			File logoFileDir = new File(publicImagePath + "/merchant/" + mid + "/logo_new");
			if (!logoFileDir.exists()) {
				logoFileDir.mkdirs();
			}
			String fileSuffixLogo = logo.getOriginalFilename().substring(logo.getOriginalFilename().lastIndexOf("."));
			String newFileNameLogo = "logo" + fileSuffixLogo;
			String filePathLogo = logoFileDir.getAbsolutePath() + "/" + newFileNameLogo;
			user.setLogoPath("/merchant/" + mid + "/logo_new/" + newFileNameLogo);
			File logoFile = new File(filePathLogo);
			try {
				logo.transferTo(logoFile);
			} catch (IllegalStateException | IOException e) {
				logger.error(e.getMessage());
				e.printStackTrace();
				throw new YdpException("logo上传失败");
			}
		}
		List<MerchantImage> merchantImages = null;
		if (photos != null && photos.length > 0) {
			String suffix;
			String newFileName;
			File newFile;
			merchantImages = new ArrayList<>();
			for (int i = 0; i < photos.length; i++) {
				MultipartFile mf = photos[i];
				suffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				newFileName = UUID.randomUUID().toString() + suffix;
				MerchantImage merchantImage = new MerchantImage();
				merchantImage.setMerchantId(mid);
				merchantImage.setImageName(mf.getOriginalFilename());
//				String fileSuffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				File merchantFile = new File(publicImagePath + "/merchant/" + mid);
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
					throw new YdpException("店铺照片上传失败");
				}
				merchantImage.setImagePath("/merchant/" + mid + "/" + newFileName);
				merchantImages.add(merchantImage);
			}
		}
		user.setId(mid);
		int result = service.commitBasicInfoChange(user, merchantImages, delPhotoImage, defaultPhotoIndex);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 查询最新的需要审核的历史
	 * @param request
	 * @param merchantId
	 * @return
	 */
	@RequestMapping(value = "/listUserChangeHis", method = RequestMethod.POST)
	public Map<String, Object> listUserChangeHis(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		Map<String, Object> resultMap = new HashMap<>();
		MerchantUserChangeHisVo userChangeHis = service.listChangeHis(mid);
		resultMap.put("userChangeHis", userChangeHis);
		List<MerchantImageHis> imageHises = service.listMerchantImageHis(mid);
		resultMap.put("imageHises", imageHises);
		return resultMap;
	}
	
}
