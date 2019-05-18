package com.weichu.mdesigner.api.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMemberGiftService;
import com.weichu.mdesigner.api.service.IMemberUserService;
import com.weichu.mdesigner.api.service.IMerchantBusinessInfoService;
import com.weichu.mdesigner.common.vo.MemberChangeHisVo;
import com.weichu.mdesigner.common.entity.MemberGift;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 会员礼品设置
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/memberRedemption")
public class MemberRedemptionController {
	
	@Autowired
	private IMemberGiftService giftService;
	
	@Autowired
	private IMerchantBusinessInfoService busiInfoService;
	
	@Autowired
	private IMemberUserService userService;
	
	/**
	 * 保存
	 * @param request
	 * @param gift
	 * @return
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	JSONObject saveGift(HttpServletRequest request, @RequestBody MemberGift gift) {
		int mid = JavaWebToken.getUid(request);// 商家id
		giftService.save(gift, mid);
		return JSONResult.success();
	}
	
	/**
	 * 修改
	 * @param request
	 * @param gift
	 * @return
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	JSONObject updateGift(HttpServletRequest request, @RequestBody MemberGift gift) {
		int mid = JavaWebToken.getUid(request);// 商家id
		giftService.update(gift, mid);
		return JSONResult.success();
	}
	
	/**
	 * 删除
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	JSONObject deleteGift(HttpServletRequest request, @RequestParam Integer id) {
		int mid = JavaWebToken.getUid(request);// 商家id
		giftService.delete(id, mid);
		return JSONResult.success();
	}
	
	/**
	 * 查询明细
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/selectById", method = RequestMethod.POST)
	MemberGift selectById(HttpServletRequest request, @RequestParam Integer id) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return giftService.selectById(id, mid);
	}
	
	/**
	 * 分页查询
	 * @param request
	 * @param pageSize
	 * @param pageNum
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	PageBean<MemberGift> list(HttpServletRequest request, @RequestParam Integer pageSize, @RequestParam Integer pageNum) {
		int mid = JavaWebToken.getUid(request);// 商家id
		return giftService.list(pageSize, pageNum, mid);
	}
	
	/**
	 * 兑换礼品
	 * @param request
	 * @param memberId
	 * @param giftId
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/redemptionGift", method = RequestMethod.POST)
	JSONObject redemptionGift(HttpServletRequest request, @RequestParam Integer memberId, @RequestParam Integer giftId, 
			String changeDesc) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		giftService.redemptionGift(memberId, giftId, mid, changeDesc, username);
		return JSONResult.success();
	}
	
	/**
	 * 兑换礼品
	 * @param request
	 * @param memberId
	 * @param point 兑换掉多少积分
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/redemptionCash", method = RequestMethod.POST)
	JSONObject redemptionCash(HttpServletRequest request, @RequestParam Integer memberId, @RequestParam Integer point,
			String changeDesc) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		String username = JavaWebToken.getUsername(request);
		giftService.redemptionCash(memberId, point, mid, changeDesc, username);
		return JSONResult.success();
	}
	
	/**
	 * 查询积分返现1元需要多少积分
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/selectPointCash", method = RequestMethod.POST)
	JSONObject selectPointCash(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);// 商家id
		Integer pointCash = busiInfoService.selectPointCash(mid);
		return JSONResult.fillResultJsonObject(pointCash);
	}
	
	/**
	 * 分页查询会员积分兑换信息
	 * @param request
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/listChangeHis", method = RequestMethod.POST)
	PageBean<MemberChangeHisVo> listChangeHis(HttpServletRequest request, @RequestBody Map<String, String> searchParams) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		String phone = searchParams.get("phone");
		String pageSizeStr = searchParams.get("pageSize");
		String pageNumStr = searchParams.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		List<Integer> changeTypes = Arrays.asList(6, 7);//只查兑换记录
		return userService.listChangeHisByPhone(pageSize, pageNum, mid, phone, changeTypes);
	}
	
}
