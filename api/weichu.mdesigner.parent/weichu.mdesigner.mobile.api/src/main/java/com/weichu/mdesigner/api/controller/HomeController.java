package com.weichu.mdesigner.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.weichu.mdesigner.common.entity.MerchantImage;
import com.weichu.mdesigner.common.entity.MerchantImageExample;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantUserExample;
import com.weichu.mdesigner.common.entity.MobileSwiperImage;
import com.weichu.mdesigner.common.entity.MobileSwiperImageExample;
import com.weichu.mdesigner.common.mapper.MerchantImageMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserMapper;
import com.weichu.mdesigner.common.mapper.MobileSwiperImageMapper;
import com.weichu.mdesigner.common.vo.MerchantUserVo;
import com.weichu.mdesigner.utils.location.LocationUtils;
import com.weichu.mdesigner.utils.page.PageBean;

import ch.qos.logback.core.util.LocationUtil;


/**
 * 小程序首页api接口
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/mobile/index")
public class HomeController {
	
	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	private MobileSwiperImageMapper swiperImageMapper;
	
	@Autowired
	private MerchantImageMapper imageMapper;
	
	@Autowired
	private MerchantUserMapper userMapper;

	@Autowired
	private LocationUtils locationUtils;
	
	private int pageSize = 20;
	/**
	 * 首页查询幻灯片图片，以及当前cityCode的商家列表
	 * @param request
	 * @param cityCode 城市代码
	 * @return
	 */
	@RequestMapping(value = "/init", method = RequestMethod.POST)
	public Map<String, Object> index(HttpServletRequest request, @RequestParam(value="longitude", required = false)Double longitude, 
			@RequestParam(value="latitude", required = false)Double latitude, Integer pageNum) {
		Map<String, Object> returnResult = new HashMap<>();
		//首页幻灯片图片列表
		MobileSwiperImageExample example = new MobileSwiperImageExample();
		List<MobileSwiperImage> swiperImages = swiperImageMapper.selectByExample(example);
		returnResult.put("swiperImages", swiperImages);		
		MerchantUserExample userExample = new MerchantUserExample();
		if(longitude != null && latitude != null) {
			JSONObject jsonObject = restTemplate
					.getForObject("https://apis.map.qq.com/ws/geocoder/v1/?location="
							+ latitude + "," + longitude + "&key=PM6BZ-UONR2-VPFUN-CHMNO-5HXVJ-SGFLT", JSONObject.class);
			if(jsonObject.getInteger("status") == 0) {
				JSONObject result = jsonObject.getJSONObject("result");
				JSONObject ad_info = result.getJSONObject("ad_info");
				String cityCode = ad_info.getString("city_code");//城市代码
				userExample.createCriteria().andCityCodeEqualTo(cityCode);
			}
		}
		PageHelper.startPage(pageNum, pageSize, false);
		List<MerchantUser> merchantUsers = userMapper.selectByExample(userExample);
		PageBean<MerchantUserVo> pageBean = new PageBean<MerchantUserVo>();
		List<MerchantUserVo> merchantVos = new ArrayList<>();
		for (MerchantUser merchantUser : merchantUsers) {
			MerchantUserVo merchantVo = new MerchantUserVo();
			merchantVo.setMerchantCode(merchantUser.getMerchantCode());
			merchantVo.setCityCode(merchantUser.getCityCode());
			merchantVo.setId(merchantUser.getId());
			merchantVo.setMerchantName(merchantUser.getMerchantName());
			merchantVo.setRemark(merchantUser.getRemark());
			merchantVo.setAddress(merchantUser.getAddress());
			merchantVo.setStar(merchantUser.getStar());
			merchantVo.setOperatingStatus(merchantUser.getOperatingStatus());
			if(longitude != null && latitude != null) {
				Double distance = locationUtils.getDistance(latitude, longitude, merchantUser.getLat(), merchantUser.getLon());
				merchantVo.setDistance(distance/1000);
			}
			MerchantImageExample imageExample = new MerchantImageExample();
			imageExample.createCriteria().andDefaultDisplayEqualTo(1).andMerchantIdEqualTo(merchantUser.getId());
			List<MerchantImage> images = imageMapper.selectByExample(imageExample);
			if(!images.isEmpty()) {
				merchantVo.setDefaultImage(images.get(0));
			}
			merchantVos.add(merchantVo);
		}
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setItems(merchantVos);
		returnResult.put("merchantVos", pageBean);
		return returnResult;
	}
	
	/**
	 * 界面下拉刷新功能
	 * @param request
	 * @param cityCode
	 * @return
	 */
	@RequestMapping(value = "/refresh", method = RequestMethod.POST)
	public PageBean<MerchantUserVo> refresh(HttpServletRequest request, @RequestParam(value="cityCode", required = false) String cityCode,
			@RequestParam(value="longitude", required = false)Double longitude, 
			@RequestParam(value="latitude", required = false)Double latitude) {
		Integer pageNum = 0;
		MerchantUserExample userExample = new MerchantUserExample();
		if(StringUtils.isEmpty(cityCode)) {
			userExample.createCriteria().andCityCodeEqualTo(cityCode);
		}		
		PageHelper.startPage(pageNum, pageSize, false);
		List<MerchantUser> merchantUsers = userMapper.selectByExample(userExample);
		PageBean<MerchantUserVo> pageBean = new PageBean<MerchantUserVo>();
		List<MerchantUserVo> merchantVos = new ArrayList<>();
		for (MerchantUser merchantUser : merchantUsers) {
			MerchantUserVo merchantVo = new MerchantUserVo();
			merchantVo.setMerchantCode(merchantUser.getMerchantCode());
			merchantVo.setCityCode(merchantUser.getCityCode());
			merchantVo.setId(merchantUser.getId());
			merchantVo.setMerchantName(merchantUser.getMerchantName());
			merchantVo.setRemark(merchantUser.getRemark());
			merchantVo.setAddress(merchantUser.getAddress());
			merchantVo.setStar(merchantUser.getStar());
			merchantVo.setOperatingStatus(merchantUser.getOperatingStatus());
			if(longitude != null && latitude != null) {
				Double distance = locationUtils.getDistance(latitude, longitude, merchantUser.getLat(), merchantUser.getLon());
				merchantVo.setDistance(distance/1000);
			}
			MerchantImageExample imageExample = new MerchantImageExample();
			imageExample.createCriteria().andDefaultDisplayEqualTo(1).andMerchantIdEqualTo(merchantUser.getId());
			List<MerchantImage> images = imageMapper.selectByExample(imageExample);
			if(!images.isEmpty()) {
				merchantVo.setDefaultImage(images.get(0));
			}
			merchantVos.add(merchantVo);
		}
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setItems(merchantVos);
		return pageBean;
	}
	
	/**
	 * 上拉加载更多
	 * @param request
	 * @param cityCode
	 * @return
	 */
	@RequestMapping(value = "/loadMore", method = RequestMethod.POST)
	public PageBean<MerchantUserVo> loadMore(HttpServletRequest request, @RequestParam(value="pageNum", required = true) Integer pageNum, 
			@RequestParam(value="cityCode", required = false) String cityCode, @RequestParam(value="longitude", required = false)Double longitude, 
			@RequestParam(value="latitude", required = false) Double latitude) {
		MerchantUserExample userExample = new MerchantUserExample();
		if(StringUtils.isEmpty(cityCode)) {
			userExample.createCriteria().andCityCodeEqualTo(cityCode);
		}
		PageHelper.startPage(pageNum, pageSize, false);
		List<MerchantUser> merchantUsers = userMapper.selectByExample(userExample);
		PageBean<MerchantUserVo> pageBean = new PageBean<MerchantUserVo>();
		List<MerchantUserVo> merchantVos = new ArrayList<>();
		for (MerchantUser merchantUser : merchantUsers) {
			MerchantUserVo merchantVo = new MerchantUserVo();
			merchantVo.setMerchantCode(merchantUser.getMerchantCode());
			merchantVo.setCityCode(merchantUser.getCityCode());
			merchantVo.setId(merchantUser.getId());
			merchantVo.setMerchantName(merchantUser.getMerchantName());
			merchantVo.setRemark(merchantUser.getRemark());
			merchantVo.setAddress(merchantUser.getAddress());
			merchantVo.setStar(merchantUser.getStar());
			merchantVo.setOperatingStatus(merchantUser.getOperatingStatus());
			if(longitude != null && latitude != null) {
				Double distance = locationUtils.getDistance(latitude, longitude, merchantUser.getLat(), merchantUser.getLon());
				merchantVo.setDistance(distance/1000);
			}
			MerchantImageExample imageExample = new MerchantImageExample();
			imageExample.createCriteria().andDefaultDisplayEqualTo(1).andMerchantIdEqualTo(merchantUser.getId());
			List<MerchantImage> images = imageMapper.selectByExample(imageExample);
			if(!images.isEmpty()) {
				merchantVo.setDefaultImage(images.get(0));
			}
			merchantVos.add(merchantVo);
		}
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setItems(merchantVos);
		return pageBean;
	}
	
}
