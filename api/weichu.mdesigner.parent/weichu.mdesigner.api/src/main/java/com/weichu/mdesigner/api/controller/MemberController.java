package com.weichu.mdesigner.api.controller;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMemberRankConfigService;
import com.weichu.mdesigner.api.service.IMemberRechargeConfigService;
import com.weichu.mdesigner.api.service.IMemberUserService;
import com.weichu.mdesigner.common.vo.MemberChangeHisVo;
import com.weichu.mdesigner.api.vo.MemberRechargeConfigVo;
import com.weichu.mdesigner.common.entity.MemberRankConfig;
import com.weichu.mdesigner.common.entity.MemberRechargeConfig;
import com.weichu.mdesigner.common.entity.MemberUser;
import com.weichu.mdesigner.common.entity.MemberUserDelete;
import com.weichu.mdesigner.common.helper.DictHelper;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.weichu.mdesigner.utils.page.PageBean;


//@CrossOrigin(origins = "http://127.0.0.1:8080", maxAge = 3600) //支持跨域请求 可以配置特定的访问源（方法2）
//@CrossOrigin
@RestController
@RequestMapping("/api/member")
public class MemberController {
	
//	@Autowired
//	MemberMapper mapper;
	
//	@Autowired
//	MemberUserMapper memberMapper;
//	
//	@Autowired
//	DictHelper dictHelper;
//	
//	//@CrossOrigin	//支持跨域请求（方法1）
//	@RequestMapping(value = "/member", method = RequestMethod.GET)
//	String home() {
//		mapper.listAll();
//		memberMapper.selectByPrimaryKey(0);
//		return "One page!";
//	}
	
	/*
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	@PreAuthorize("hasPermission(#baseReq, 'read')")
	String test() {
		String itemName = dictHelper.getItemNameByDictCodeAndItemValue("DICT_BUSINESS_LOG_TYPE", "0");
		return itemName;
	}
	
	@RequestMapping(value = "/bundlejs/get", method = RequestMethod.GET)
	String getBundleJS(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("application/javascript;charset=UTF-8");
		StringBuilder results = new StringBuilder();
		try {
			FileInputStream fis = new FileInputStream(ResourceUtils.getFile("classpath:bundles/kernel/unversioned/bundle.js"));
			InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			String newline = null;
			while((newline = br.readLine()) != null) {
				results.append(newline);
			}
			br.close();
			isr.close();
			fis.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return results.toString();
	}
	
	@RequestMapping(value = "/manifest/get", method = RequestMethod.GET)
	String getManifest(HttpServletRequest request, HttpServletResponse response) {
		String manifestKey = request.getParameter("manifestKey");
		JSONObject manifestJson = new JSONObject();
		manifestJson.put("id", "test1");
		manifestJson.put("bundleUrl", "http://localhost:8080/api/bundlejs/get");
		manifestJson.put("sdkVersion", "UNVERSIONED");
		manifestJson.put("appKey", "rn_mdesigner");
		return manifestJson.toString();
	}
	*/
	
	@Autowired
	private IMemberUserService service;
	
	@Autowired
	private IMemberRankConfigService rankConfigService;
	
	@Autowired
	private IMemberRechargeConfigService rechargeConfigService;
	
	/**
	 * 分页查询会员信息
	 * @param request
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	PageBean<MemberUser> list(HttpServletRequest request, @RequestBody Map<String, String> searchParams) {
		int mid = JavaWebToken.getUid(request);// 商家id
		String pageSizeStr = searchParams.get("pageSize");
		String pageNumStr = searchParams.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		return service.list(pageSize, pageNum, searchParams, mid);
	}
	
	/**
	 * 分页查询删除的会员信息
	 * @param request
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/listDelMember", method = RequestMethod.POST)
	PageBean<MemberUserDelete> listDelMember(HttpServletRequest request, @RequestBody Map<String, String> searchParams) {
		int mid = JavaWebToken.getUid(request);// 商家id
		String pageSizeStr = searchParams.get("pageSize");
		String pageNumStr = searchParams.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		return service.listDelMember(pageSize, pageNum, searchParams, mid);
	}
	
	/**
	 * 保存会员信息
	 * @param request
	 * @param memberUser
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	JSONObject save(HttpServletRequest request, @RequestBody MemberUser memberUser) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		if(StringUtils.isEmpty(memberUser.getPhone())) {
			throw new YdpException("联系电话不能为空");
		}
		if(StringUtils.isEmpty(memberUser.getName())) {
			throw new YdpException("真实姓名不能为空");
		}
		if(StringUtils.isEmpty(memberUser.getRegisterTime())) {
			throw new YdpException("会员入会时间不能为空");
		}
		service.add(memberUser, mid);
		return JSONResult.success();
	}
	
	/**
	 * 保存会员信息
	 * @param request
	 * @param memberUser
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	JSONObject update(HttpServletRequest request, @RequestBody MemberUser memberUser) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		service.update(memberUser, mid);
		return JSONResult.success();
	}
	
	/**
	 * 根据id查询
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/selectById/{id}", method = RequestMethod.GET)
	JSONObject selectById(HttpServletRequest request, @PathVariable(name="id") Integer id) {
		int mid = JavaWebToken.getUid(request);// 商家id
		MemberUser memberUser = service.selectById(id, mid);
		return JSONResult.fillResultJsonObject(memberUser);
	}
	
	/**
	 * 根据id查询
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteById", method = RequestMethod.POST)
	JSONObject deleteById(HttpServletRequest request, @RequestParam Integer id, @RequestParam String changeDesc) throws YdpException {
		if(StringUtils.isEmpty(changeDesc)) {
			throw new YdpException("删除原因不能空");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		service.deleteById(id, mid, changeDesc, username);
		return JSONResult.success();
	}
	
	/**
	 * 根据id查询
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/recoverById", method = RequestMethod.POST)
	JSONObject recoverById(HttpServletRequest request, @RequestParam Integer id, @RequestParam String changeDesc) throws YdpException {
		if(StringUtils.isEmpty(changeDesc)) {
			throw new YdpException("恢复原因不能空");
		}
		if(id == null) {
			throw new YdpException("请选择需要恢复的会员信息");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		service.recoverById(id, mid, changeDesc, username);
		return JSONResult.success();
	}
	
	/**
	 * 冻结会员信息
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/freeze", method = RequestMethod.POST)
	JSONObject freeze(HttpServletRequest request, @RequestParam Integer id, @RequestParam String changeDesc) throws YdpException {
		if(StringUtils.isEmpty(changeDesc)) {
			throw new YdpException("冻结原因不能空");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		service.updateStatus(1, id, mid, changeDesc, username);//冻结会员信息 会员状态(0=正常,1=冻结)
		return JSONResult.success();
	}
	
	/**
	 * 解冻会员信息
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/unfreeze", method = RequestMethod.POST)
	JSONObject unfreeze(HttpServletRequest request, @RequestParam Integer id, @RequestParam String changeDesc) throws YdpException {
		if(StringUtils.isEmpty(changeDesc)) {
			throw new YdpException("解冻原因不能空");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		service.updateStatus(0, id, mid, changeDesc, username);//解冻会员信息 会员状态(0=正常,1=冻结)
		return JSONResult.success();
	}
	
	/**
	 * 查询会员详细信息(包括账户信息)
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/selectDetailById", method = RequestMethod.POST)
	Map<String, Object> selectDetailById(HttpServletRequest request, @RequestParam Integer id) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return service.selectDetailById(id, mid);
	}
	
	/**
	 * 查询会员详细信息(包括账户信息)
	 * @param request
	 * @param id
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/selectDetailByPhone", method = RequestMethod.POST)
	Map<String, Object> selectDetailByPhone(HttpServletRequest request, @RequestParam String phone) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		return service.selectDetailByPhone(phone, mid);
	}
	
	/**
	 * 查询会员等级配置
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listRankConfig", method = RequestMethod.POST)
	List<MemberRankConfig> listRankConfig(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return rankConfigService.selectRankConfig(mid);
	}
	
	/**
	 * 修改会员等级配置信息
	 * @param request
	 * @param params
	 * @return
	 */
	@RequestMapping(value = "/updateRankConfig", method = RequestMethod.POST)
	JSONObject updateRankConfig(HttpServletRequest request, @RequestBody Map<String, String> params) {
		int mid = JavaWebToken.getUid(request);// 商家id
		rankConfigService.update(params, mid);
		return JSONResult.success();
	}
	
	/**
	 * 查询会员充值优惠配置
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listRechargeConfig", method = RequestMethod.POST)
	List<MemberRechargeConfigVo> listRechargeConfig(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return rechargeConfigService.list(mid);
	}
	
	/**
	 * 修改会员充值优惠信息
	 * @param request
	 * @param rechargeConfig
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/updateRechargeRule", method = RequestMethod.POST)
	JSONObject updateRechargeRule(HttpServletRequest request, @RequestBody MemberRechargeConfig rechargeConfig) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		rechargeConfigService.update(rechargeConfig, mid);
		return JSONResult.success();
	}
	
	/**
	 * 新增会员充值优惠信息
	 * @param request
	 * @param rechargeConfig
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/saveRechargeRule", method = RequestMethod.POST)
	JSONObject saveRechargeRule(HttpServletRequest request, @RequestBody MemberRechargeConfig rechargeConfig) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		rechargeConfigService.save(rechargeConfig, mid);
		return JSONResult.success();
	}
	
	/**
	 * 删除会员充值优惠信息
	 * @param request
	 * @param rechargeConfig
	 * @return
	 */
	@RequestMapping(value = "/deleteRechargeRule", method = RequestMethod.POST)
	JSONObject deleteRechargeRule(HttpServletRequest request, @RequestParam Integer id) {
		int mid = JavaWebToken.getUid(request);// 商家id
		rechargeConfigService.delete(id, mid);
		return JSONResult.success();
	}
	
	/**
	 * 查询会员充值优惠信息
	 * @param request
	 * @param rechargeConfig
	 * @return
	 */
	@RequestMapping(value = "/selectRechargeRuleById/{id}", method = RequestMethod.GET)
	MemberRechargeConfig selectRechargeRuleById(HttpServletRequest request, @PathVariable(name="id") Integer id) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return rechargeConfigService.selectById(id, mid);
	}
	
	/**
	 * 查询满足充值金额的 充值活动信息
	 * @param request
	 * @param rechargeAmount
	 * @return
	 */
	@RequestMapping(value = "/selectByRechargePrice", method = RequestMethod.POST)
	JSONObject selectByRechargePrice(HttpServletRequest request, @RequestParam String rechargeAmount) {
		int mid = JavaWebToken.getUid(request);// 商家id
		BigDecimal rechargePrice = new BigDecimal(rechargeAmount);
		MemberRechargeConfig config = rechargeConfigService.selectByRechargePrice(rechargePrice, mid);
		if(config != null) {
			return JSONResult.fillResultJsonObject(config);
		} else {
			return JSONResult.fillResultJsonObject(null);
		}
	}
	
	/**
	 * 会员现金充值
	 * @param request
	 * @param rechargeAmount
	 * @param phone
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/rechargeCash", method = RequestMethod.POST)
	JSONObject rechargeCash(HttpServletRequest request, @RequestParam String rechargeAmount, @RequestParam Integer memberId,
			@RequestParam Integer payMethod) throws YdpException {
		if(new BigDecimal(rechargeAmount).compareTo(BigDecimal.ZERO) <= 0) {
			throw new YdpException("会员充值金额必须大于0");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		BigDecimal accountBalance = service.rechargeCash(rechargeAmount, memberId, mid, username, payMethod);
		return JSONResult.fillResultJsonObject(accountBalance.toString());
	}
	
	/**
	 * 会员移动支付充值
	 * @param request
	 * @param payOrderIds
	 * @param memberId
	 * @return
	 */
	@RequestMapping(value = "/rechargeMobilePayment", method = RequestMethod.POST)
	public JSONObject rechargeMobilePayment(HttpServletRequest request, @RequestParam List<Integer> payOrderIds, 
			@RequestParam Integer memberId) throws YdpException {
		if(payOrderIds == null || payOrderIds.size() == 0) {
			throw new YdpException("请选择支付单");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		BigDecimal accountBalance = service.rechargeMobilePayment(payOrderIds, memberId, mid, username);
		return JSONResult.fillResultJsonObject(accountBalance.toString());
	}
	
	/**
	 * 会员现金充值
	 * @param request
	 * @param rechargeAmount
	 * @param phone
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/refund", method = RequestMethod.POST)
	JSONObject refund(HttpServletRequest request, @RequestParam String refundAmount, @RequestParam Integer refundMethod,
			@RequestParam Integer memberId) throws YdpException {
		if(new BigDecimal(refundAmount).compareTo(BigDecimal.ZERO) <= 0) {
			throw new YdpException("退款金额必须大于0");
		}
		if(refundMethod == null) {
			throw new YdpException("请选择退款方式");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		int result = service.refund(refundAmount, refundMethod, memberId, mid, username);
		return JSONResult.fillResultJsonObject(result);
	}
	
	
	/**
	 * 分页查询会员变更历史信息
	 * @param request
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/listChangeHis", method = RequestMethod.POST)
	PageBean<MemberChangeHisVo> listChangeHis(HttpServletRequest request, @RequestBody Map<String, String> searchParams) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		String phone = searchParams.get("phone");
		if(StringUtils.isEmpty(phone)) {
			throw new YdpException("查询条件手机号码不能为空");
		}
		String pageSizeStr = searchParams.get("pageSize");
		String pageNumStr = searchParams.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		return service.listChangeHisByPhone(pageSize, pageNum, mid, phone, null);
	}
	
	/**
	 * 查询 已删除的会员详细信息(包括账户信息)
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/selectDeleteDetailById", method = RequestMethod.POST)
	Map<String, Object> selectDeleteDetailById(HttpServletRequest request, @RequestParam Integer id) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return service.selectDeleteDetailById(id, mid);
	}
	
	/**
	 * 查询会员积分
	 * @param request
	 * @param phone
	 * @return
	 */
	@RequestMapping(value = "/selectMemberPoint", method = RequestMethod.POST)
	MemberUser selectMemberPoint(HttpServletRequest request, @RequestParam String phone) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return service.selectMemberPoint(phone, mid);
	}
	
	/**
	 * 会员绑定支付宝或者微信
	 * @param request
	 * @param memberId
	 * @param bindType
	 * @param code
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/bind", method = RequestMethod.POST)
	JSONObject bind(HttpServletRequest request, @RequestParam Integer memberId, @RequestParam Integer bindType,
			 @RequestParam String code) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		if(memberId == null || StringUtils.isEmpty(memberId)) {
			throw new YdpException("请选择您需要绑定的会员");
		}
		if(bindType == null || StringUtils.isEmpty(bindType)) {
			throw new YdpException("绑定类型不能为空");
		}
		if(code == null || StringUtils.isEmpty(code)) {
			throw new YdpException("绑定代码不能为空");
		}
		service.bind(memberId, bindType, code, mid);
		return JSONResult.success();
	}
	
	/**
	 * 解除绑定
	 * @param request
	 * @param memberId
	 * @param bindType
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/unbind", method = RequestMethod.POST)
	JSONObject unbind(HttpServletRequest request, @RequestParam Integer memberId, @RequestParam Integer bindType) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		if(memberId == null || StringUtils.isEmpty(memberId)) {
			throw new YdpException("请选择您需要解除绑定的会员");
		}
		if(bindType == null || StringUtils.isEmpty(bindType)) {
			throw new YdpException("绑定类型不能为空");
		}
		service.unbind(memberId, bindType, mid);
		return JSONResult.success();
	}
	
}
