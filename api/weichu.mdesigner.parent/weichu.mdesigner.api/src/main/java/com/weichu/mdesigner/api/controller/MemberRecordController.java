package com.weichu.mdesigner.api.controller;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.weichu.mdesigner.api.service.IMemberRecordService;
import com.weichu.mdesigner.common.vo.MemberRecordVo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;

@RestController
@RequestMapping("/api/memberRecord")
public class MemberRecordController {

	@Autowired
	private IMemberRecordService service;
	
	/**
	 * 根据会员id查询充值消费记录
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/listByMemberId", method = RequestMethod.POST)
	PageBean<MemberRecordVo> listByMemberId(HttpServletRequest request, @RequestBody Map<String, String> searchParams) throws YdpException {
		Integer memberId, pageSize, pageNum;
		String recordTypes;
		try {
			String memberIdStr = searchParams.get("memberId");
			recordTypes = searchParams.get("recordTypes");
			String pageSizeStr = searchParams.get("pageSize");
			String pageNumStr = searchParams.get("pageNum");
			memberId = Integer.valueOf(memberIdStr);
			pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
			pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		} catch(Exception e) {
			e.printStackTrace();
			throw new YdpException("参数类型错误");
		}
		int mid = JavaWebToken.getUid(request);// 商家id
		return service.listByMemberId(pageSize, pageNum, mid, memberId, recordTypes);
	}
	
	/**
	 * 查询收退款流水
	 * 
	 * @param request
	 * @param searchParams
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public PageBean<MemberRecordVo> list(HttpServletRequest request, @RequestBody Map<String, String> searchParams)
			throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		String recordTimeStartStr = searchParams.get("recordTimeStart");
		String recordTimeEndStr = searchParams.get("recordTimeEnd");
		if (StringUtils.isEmpty(recordTimeStartStr) || StringUtils.isEmpty(recordTimeEndStr)) {
			throw new YdpException("时间查询条件不能为空");
		}
		Date startTimeStart = DateUtil.parse(recordTimeStartStr, DatePattern.NORM_DATE_PATTERN);
		Date endTimeStart = DateUtil.parse(recordTimeEndStr, DatePattern.NORM_DATE_PATTERN);
		long betweenDays = (long) ((endTimeStart.getTime() - startTimeStart.getTime()) / (1000 * 60 * 60 * 24) + 0.5);
		if (betweenDays > 31) {
			throw new YdpException("时间查询跨度最多1个月");
		}
		String pageSizeStr = searchParams.get("pageSize");
		String pageNumStr = searchParams.get("pageNum");
		Integer pageSize = pageSizeStr == null ? Constants.DEFAULT_PAGESIZE : Integer.valueOf(pageSizeStr);
		Integer pageNum = pageNumStr == null ? 1 : Integer.valueOf(pageNumStr);
		return service.list(pageSize, pageNum, searchParams, mid);
	}
	
}
