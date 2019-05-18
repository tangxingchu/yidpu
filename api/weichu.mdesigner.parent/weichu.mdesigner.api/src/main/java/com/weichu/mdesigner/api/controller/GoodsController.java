package com.weichu.mdesigner.api.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantDictItemService;
import com.weichu.mdesigner.api.service.IMerchantGoodsExtraService;
import com.weichu.mdesigner.api.service.IMerchantGoodsService;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.MerchantDictionary;
import com.weichu.mdesigner.common.entity.MerchantDictionaryItem;
import com.weichu.mdesigner.common.entity.MerchantGoods;
import com.weichu.mdesigner.common.entity.MerchantGoodsExtra;
import com.weichu.mdesigner.common.entity.MerchantGoodsExtraItem;
import com.weichu.mdesigner.common.entity.MerchantGoodsImage;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.service.IGoodsImageService;
import com.weichu.mdesigner.common.service.IGoodsService;
import com.weichu.mdesigner.common.vo.MerchantGoodsExtraItemVo;
import com.weichu.mdesigner.common.vo.MerchantGoodsVo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.weichu.mdesigner.utils.page.PageBean;

import net.coobird.thumbnailator.Thumbnails;

/**
 * 
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class GoodsController extends BaseController {
	
	private Logger logger = LoggerFactory.getLogger(GoodsController.class);
	
	@Value("${public.image.save.path}")
	private String imageSavePath;
	
	@Autowired
	private IMerchantGoodsService service;
	
	@Autowired
	private IGoodsService goodsService;
	
	@Autowired
	private IGoodsImageService goodsImageService;
	
	@Autowired
	private IMerchantDictItemService dictItemService;
	
	@Autowired
	private IMerchantGoodsExtraService extraService;
	
	@Autowired
	private IMerchantDictItemService dictService;
	
	@RequestMapping(value = "/goods/list", method = RequestMethod.POST)
	public PageBean<MerchantGoodsVo> list(HttpServletRequest request, @RequestBody MerchantGoodsVo goodsVo) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/goods/list" + ", 用户id:" + mid);
		goodsVo.setMerchantId(mid);
		return goodsService.list(goodsVo, goodsVo.getPageNum(), goodsVo.getPageSize(), mid);
	}
	
	@RequestMapping(value = "/goods/query", method = RequestMethod.POST)
	public List<MerchantGoodsVo> query(HttpServletRequest request, @RequestBody MerchantGoods goods) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/goods/query" + ", 用户id:" + mid);
		return service.selectByName(goods.getName(), mid);
	}
	
	@RequestMapping(value = "/goods/get/{id}", method = RequestMethod.GET)
	public JSONObject getById(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/goods/get/" + id + ", 用户id:" + mid);
		MerchantGoodsVo vo = service.selectById(id, mid);
		return JSONResult.fillResultJsonObject(vo); 
	}
	
	/**
	 * 返回商品默认图片链接
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/goods/getDefaultImageURL/{id}", method = RequestMethod.GET)
	public JSONObject getDefaultImageURL(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		String url = service.getDefaultImageURL(id, mid);
		return JSONResult.fillResultJsonObject(url);
	}
	
	@RequestMapping(value = "/goods/save", method = RequestMethod.POST)
	public JSONObject save(HttpServletRequest request, MultipartFile[] files, MerchantGoods goods, Integer defaultImageIndex) throws Exception {
		int mid = JavaWebToken.getUid(request);
		goods.setMerchantId(mid);
		if(files != null && files.length > 5) {
			throw new YdpException("最多上传5张图片.");
		}
		List<MerchantGoodsImage> goodsImages = null;
		if(files != null) {
			String suffix;
			String newFileName;
			goodsImages = new ArrayList<>();
			for (int i = 0; i < files.length; i++) {
				MultipartFile mf = files[i];
				suffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				newFileName = UUID.randomUUID().toString().replaceAll("-", "") + suffix;
				MerchantGoodsImage goodsImage = new MerchantGoodsImage();
				goodsImage.setCreateTime(new Date());
				goodsImage.setImageName(mf.getOriginalFilename());
				goodsImage.setMerchantId(mid);
				File merchantFile = new File(imageSavePath + "/goods/" + mid);
				if (!merchantFile.exists()) {
					merchantFile.mkdirs();
				}
				final String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
				final File newFile = new File(filePath);
				try {
					mf.transferTo(newFile);
					//图片尺寸不变，压缩图片文件大小outputQuality实现,参数1为最高质量
					//设置宽度600 高度等比例缩小
					if(mf.getSize() > 1 * 1024 * 1024) {
						new Thread(new Runnable() {
							@Override
							public void run() {
								try {
									Thumbnails.of(filePath).size(512, 512).keepAspectRatio(true).toFile(newFile);
								} catch (IOException e) {
									e.printStackTrace();
								}
							}
						}).start();
					}
				} catch (IllegalStateException | IOException e) {
					e.printStackTrace();
					throw new YdpException("商品照片上传失败");
				}
				goodsImage.setImagePath("/goods/" + mid + "/" + newFileName);
				goodsImages.add(goodsImage);
			}
		}
		service.save(goods, mid, goodsImages, defaultImageIndex);
		return JSONResult.fillResultJsonObject(goods.getId());
	}
	
	@RequestMapping(value = "/goods/update", method = RequestMethod.POST)
	public JSONObject update(HttpServletRequest request, MultipartFile[] files, MerchantGoods goods, String delImage, Integer defaultImageIndex, Integer defaultImageId) throws Exception {
		int mid = JavaWebToken.getUid(request);
		if(mid != goods.getMerchantId()) {
			throw new YdpException("非法操作.");
		}
		int delImagesLength = 0;
		if(delImage != null) {
			String[] delImages = delImage.split(",");
			delImagesLength = delImages.length;
		}
		long count = goodsImageService.count(goods.getId(), mid);
		if(count + files.length - delImagesLength > 5) {
			throw new Exception("最多上传5张图片.");
		}
		List<MerchantGoodsImage> goodsImages = null;
		if (files != null) {
			String suffix;
			String newFileName;
			goodsImages = new ArrayList<>();
			for (int i = 0; i < files.length; i++) {
				MultipartFile mf = files[i];
				suffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				newFileName = UUID.randomUUID().toString().replaceAll("-", "") + suffix;
				MerchantGoodsImage goodsImage = new MerchantGoodsImage();
				goodsImage.setMerchantId(mid);
				goodsImage.setImageName(mf.getOriginalFilename());
				File merchantFile = new File(imageSavePath + "/goods/" + mid);
				if (!merchantFile.exists()) {
					merchantFile.mkdirs();
				}
				String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
				final File newFile = new File(filePath);
				try {
					mf.transferTo(newFile);
					//图片尺寸不变，压缩图片文件大小outputQuality实现,参数1为最高质量
					//设置宽度600 高度等比例缩小
					if(mf.getSize() > 1 * 1024 * 1024) {
						new Thread(new Runnable() {
							@Override
							public void run() {
								try {
									Thumbnails.of(filePath).size(512, 512).keepAspectRatio(true).toFile(newFile);
								} catch (IOException e) {
									e.printStackTrace();
								}
							}
						}).start();
					}
				} catch (IllegalStateException | IOException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
					throw new YdpException("商品照片上传失败");
				}
				goodsImage.setImagePath("/goods/" + mid + "/" + newFileName);
				goodsImages.add(goodsImage);
			}
		}
		service.update(goods, mid, goodsImages, delImage, defaultImageIndex, defaultImageId);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/goods/delete", method = RequestMethod.POST)
	public JSONObject delete(HttpServletRequest request, @RequestBody MerchantGoods goods) {
		int mid = JavaWebToken.getUid(request);
		logger.debug("调用api: /api/goods/delete" + ", 用户id:" + mid);
		service.delete(goods.getId(), mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/goods/saleOff", method = RequestMethod.POST)
	public JSONObject saleOff(HttpServletRequest request, @RequestBody MerchantGoods goods) throws Exception {
		int mid = JavaWebToken.getUid(request);
		service.update(goods, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/extra/list", method = RequestMethod.POST)
	List<MerchantDictionary> listAllDict(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		MerchantDictionary dict = new MerchantDictionary();
		dict.setCategory(1);
		List<MerchantDictionary> dicts = dictService.selectDict(dict, mid);
		return dicts;
	}

	@RequestMapping(value = "/extra/extraItem/{dictCode}", method = RequestMethod.GET)
	List<MerchantDictionaryItem> listDictItem(HttpServletRequest request, @PathVariable("dictCode") String dictCode)
			throws Exception {
		int mid = JavaWebToken.getUid(request);
		return dictService.selectEnabeldDictItem(dictCode, mid);
	}
	
	@RequestMapping(value = "/goods/extra/init", method = RequestMethod.POST)
	public Map<String, Object> initExtra(HttpServletRequest request, @RequestBody MerchantGoods goods) throws Exception {
		int mid = JavaWebToken.getUid(request);
		Map<String, Object> result = new HashMap<String, Object>();
		MerchantGoodsVo vo = service.selectById(goods.getId(), mid);
		result.put("goods", vo);
		MerchantDictionary dict = new MerchantDictionary();
		dict.setCategory(2);//附属属性
		List<MerchantDictionary> extras = dictItemService.selectDict(dict, mid);
		result.put("extraList", extras);
		List<MerchantGoodsExtra> goodsExtras = extraService.list(goods.getId(), mid);
		result.put("goodsExtras", goodsExtras);
		MerchantGoodsExtraItem extraItem = new MerchantGoodsExtraItem();
		extraItem.setGoodsId(goods.getId());
		extraItem.setMerchantId(mid);
		List<MerchantGoodsExtraItemVo> goodsExtraItems = extraService.listExtraItemVo(goods.getId(), mid);
		result.put("goodsExtraItems", goodsExtraItems);
		return result;
	}
	
	@RequestMapping(value = "/goods/saveExtra", method = RequestMethod.POST)
	public JSONObject saveExtra(HttpServletRequest request, @RequestBody Map<String, List<?>> extras) {
		int mid = JavaWebToken.getUid(request);
		extraService.saveExtras(extras, mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/goods/deleteExtra", method = RequestMethod.POST)
	public JSONObject deleteExtra(HttpServletRequest request, @RequestBody MerchantGoods goods) {
		int mid = JavaWebToken.getUid(request);
		extraService.deleteExtraByGoodsId(goods.getId(), mid);
		return JSONResult.success();
	}
	
	@RequestMapping(value = "/goods/syncGoods", method = RequestMethod.POST)
	public List<MerchantGoods> syncGoods(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		MerchantGoods goods = new MerchantGoods();
		goods.setMerchantId(mid);
		return service.listSyncAll(mid);
	}
	
	@RequestMapping(value = "/goods/syncGoodsExtra", method = RequestMethod.POST)
	public List<MerchantGoodsExtra> syncGoodsExtra(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		return extraService.listAll(mid);
	}
	
	@RequestMapping(value = "/goods/syncGoodsExtraItem", method = RequestMethod.POST)
	public List<MerchantGoodsExtraItem> syncGoodsExtraItem(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		return extraService.listAllExtraItem(mid);
	}
	
}
