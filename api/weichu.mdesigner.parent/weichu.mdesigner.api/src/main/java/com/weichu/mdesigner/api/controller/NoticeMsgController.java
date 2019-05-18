package com.weichu.mdesigner.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantMessageService;
import com.weichu.mdesigner.api.service.IMerchantNoticeService;
import com.weichu.mdesigner.api.vo.MerchantNoticeVo;
import com.weichu.mdesigner.common.entity.MerchantMessage;
import com.weichu.mdesigner.common.entity.MerchantNotice;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.json.JSONResult;

/**
 * 通知、消息
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api")
public class NoticeMsgController {
	
	private Logger logger = LoggerFactory.getLogger(NoticeMsgController.class);
	
	@Autowired
	private IMerchantNoticeService noticeService;
	
	@Autowired
	private IMerchantMessageService messageService;
	
	/**
	 * 查询
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/noticeMsg/selectUnReadCount", method = RequestMethod.POST)
	JSONObject selectUnReadCount(HttpServletRequest request) throws Exception {
		int mid = JavaWebToken.getUid(request);
		long count = noticeService.selectUnReadNoticeAndMessageCount(mid);
		return JSONResult.fillResultJsonObject(count);
	}
	
	/**
	 * 查询通知
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/noticeMsg/selectNoticeMsg", method = RequestMethod.POST)
	Map<String, List<?>> selectNotice(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		Map<String, List<?>> result = new HashMap<String, List<?>>();
		List<MerchantMessage> messages = messageService.listAllMessage(mid);
		List<MerchantNoticeVo> notices = noticeService.listNotice(mid);
		result.put("messages", messages);
		result.put("notices", notices);
		return result;
	}
	
	/**
	 * 删除消息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/noticeMsg/deleteMessage", method = RequestMethod.POST)
	Integer deleteMessage(HttpServletRequest request, @RequestBody MerchantMessage message) {
		int mid = JavaWebToken.getUid(request);
		return messageService.delete(message.getId(), mid);
	}
	
	/**
	 * 标记通知为已读
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/noticeMsg/updateNoticeStatus", method = RequestMethod.POST)
	Integer updateNoticeStatus(HttpServletRequest request, @RequestBody MerchantNotice notice) {
		int mid = JavaWebToken.getUid(request);
		return noticeService.addMerchantNoticeStatus(notice.getId(), mid);
	}
	
	/**
	 * 标记消息为已读
	 * @param request
	 * @param message
	 * @return
	 */
	@RequestMapping(value = "/noticeMsg/updateMessageStatus", method = RequestMethod.POST)
	Integer updateMessageStatus(HttpServletRequest request, @RequestBody MerchantMessage message) {
		int mid = JavaWebToken.getUid(request);
		return messageService.updateReadStatus(mid, message.getId());
	}
}
