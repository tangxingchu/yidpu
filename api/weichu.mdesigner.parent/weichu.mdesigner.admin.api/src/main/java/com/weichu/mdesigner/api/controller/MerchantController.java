package com.weichu.mdesigner.api.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.vo.MerchantAuditVo;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.MerchantAudit;
import com.weichu.mdesigner.common.entity.MerchantImageHis;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantUserChangeHis;
import com.weichu.mdesigner.common.vo.MerchantUserVo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;


@RestController
@RequestMapping("/api")
public class MerchantController extends BaseController {
	
	Logger logger = LoggerFactory.getLogger(MerchantController.class);
	
	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	private IMerchantService merchantService;
	
	//图片服务器地址
	@Value("${public.getImage.path}")
	private String getImageUrl;
	
	/**
	 * 查询待审核的商家
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/merchant/{id}", method = RequestMethod.GET)
	public MerchantUserVo getById(HttpServletRequest request, @PathVariable("id") Integer id) {
		return merchantService.selectById(id);
	}
	
	@RequestMapping(value = "/getLonLat/{address}", method = RequestMethod.GET)
	public JSONObject getLonLat(HttpServletRequest request, @PathVariable("address") String address) {
		String url = "https://apis.map.qq.com/ws/geocoder/v1/?address=" + address + "&key=PM6BZ-UONR2-VPFUN-CHMNO-5HXVJ-SGFLT";
		JSONObject jsonobject = restTemplate.getForObject(url, JSONObject.class);
		return JSONResult.fillResultJsonObject(jsonobject);
	}
	
	/**
	 * 查询待审核的商家
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/merchant/listUnChecked", method = RequestMethod.POST)
	public List<MerchantUser> listUnCheckedMerchant(HttpServletRequest request) {
		return merchantService.listMerchant();
	}
	
	/**
	 * 审核商家(初次提交审核)
	 * @param request
	 * @param audit
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/merchant/check", method = RequestMethod.POST)
	public JSONObject checkMerchant(HttpServletRequest request, @RequestBody MerchantAuditVo auditVo) throws YdpException {
		String username = JavaWebToken.getUsername(request);
		MerchantUser merchantUser = new MerchantUser();
		merchantUser.setId(auditVo.getMerchantId());
		if(auditVo.getAuditStatus() == 1) {//审核通过
			JSONObject jsonObject = restTemplate
					.getForObject("https://apis.map.qq.com/ws/geocoder/v1/?location="
							+ auditVo.getLat() + "," + auditVo.getLon() + "&key=PM6BZ-UONR2-VPFUN-CHMNO-5HXVJ-SGFLT", JSONObject.class);
			merchantUser.setLat(auditVo.getLat());//纬度
			merchantUser.setLon(auditVo.getLon());//经度
			if(jsonObject.getInteger("status") == 0) {
				JSONObject result = jsonObject.getJSONObject("result");
				JSONObject ad_info = result.getJSONObject("ad_info");
				merchantUser.setCityCode(ad_info.getString("city_code"));//城市代码
				merchantUser.setAdcode(ad_info.getString("adcode"));
				JSONObject addressComponent = result.getJSONObject("address_component");
				merchantUser.setCityName(addressComponent.getString("city") + addressComponent.getString("district"));
			}
		}
		MerchantAudit audit = new MerchantAudit();
		BeanUtils.copyProperties(auditVo, audit);
		audit.setAuditAccount(username);
		int result = merchantService.checkMerchant(merchantUser, audit);
		return JSONResult.fillResultJsonObject(result);
	}

	@RequestMapping(value = "/merchant/yyzz/preview/{merchantId}/**", method = RequestMethod.GET)
	public ResponseEntity<byte[]> imagePreview(HttpServletRequest request, @PathVariable("merchantId") String merchantId) throws IOException {
		String url = getImageUrl + "/api/merchant/getyyzz/" + merchantId + "/" + extractPathFromPattern(request);
		//		Object result = restTemplate.getForObject(url, Object.class);
		HttpHeaders headers = new HttpHeaders();
//		headers.setAccept(Arrays.asList(MediaType.APPLICATION_OCTET_STREAM));
		headers.add("Authorization", request.getHeader("Authorization"));
		ResponseEntity<byte[]> responseEntity = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<byte[]>(headers), byte[].class);
		return responseEntity;
	}

	/**
	 * 使账号失效
	 * @param request
	 * @param merchantId
	 * @return
	 */
	@RequestMapping(value = "/merchant/updateMerchantExp/{id}", method = RequestMethod.GET)
	public JSONObject updateMerchantExp(HttpServletRequest request, @PathVariable("id") Integer merchantId) {
		int result = merchantService.updateMerchantExp(merchantId);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 查询历史审核记录
	 * @param request
	 * @param merchantId
	 * @return
	 */
	@RequestMapping(value = "/merchant/listAuditHis/{id}", method = RequestMethod.GET)
	public List<MerchantAudit> listAuditHis(HttpServletRequest request, @PathVariable("id") Integer merchantId) {
		List<MerchantAudit> audits = merchantService.listAuditHis(merchantId);
		return audits;
	}
	
	/**
	 * 查询最新的需要审核的历史
	 * @param request
	 * @param merchantId
	 * @return
	 */
	@RequestMapping(value = "/merchant/listUserChangeHis/{id}", method = RequestMethod.GET)
	public Map<String, Object> listUserChangeHis(HttpServletRequest request, @PathVariable("id") Integer merchantId) {
		Map<String, Object> resultMap = new HashMap<>();
		MerchantUserChangeHis userChangeHis = merchantService.listChangeHis(merchantId);
		resultMap.put("userChangeHis", userChangeHis);
		List<MerchantImageHis> imageHises = merchantService.listMerchantImageHis(merchantId);
		resultMap.put("imageHises", imageHises);
		return resultMap;
	}
	
	/**
	 * 审核商家(变更提交审核)
	 * @param request
	 * @param audit
	 * @return
	 */
	@RequestMapping(value = "/merchant/checkMerchantChange", method = RequestMethod.POST)
	public JSONObject checkMerchantChange(HttpServletRequest request, @RequestBody MerchantAuditVo auditVo) {
		String username = JavaWebToken.getUsername(request);
		MerchantUser merchantUser = new MerchantUser();
		merchantUser.setId(auditVo.getMerchantId());
		if(auditVo.getAuditStatus() == 1) {//审核通过
			JSONObject jsonObject = restTemplate
					.getForObject("https://apis.map.qq.com/ws/geocoder/v1/?location="
							+ auditVo.getLat() + "," + auditVo.getLon() + "&key=PM6BZ-UONR2-VPFUN-CHMNO-5HXVJ-SGFLT", JSONObject.class);
			merchantUser.setLat(auditVo.getLat());//纬度
			merchantUser.setLon(auditVo.getLon());//经度
			if(jsonObject.getInteger("status") == 0) {
				JSONObject result = jsonObject.getJSONObject("result");
				JSONObject ad_info = result.getJSONObject("ad_info");
				merchantUser.setCityCode(ad_info.getString("city_code"));//城市代码
				merchantUser.setAdcode(ad_info.getString("adcode"));
				JSONObject addressComponent = result.getJSONObject("address_component");
				merchantUser.setCityName(addressComponent.getString("city") + addressComponent.getString("district"));
			}
		}
		MerchantAudit audit = new MerchantAudit();
		BeanUtils.copyProperties(auditVo, audit);
		audit.setAuditAccount(username);
		int result = merchantService.checkMerchantChange(merchantUser, audit);
		return JSONResult.fillResultJsonObject(result);
	}
	
}
