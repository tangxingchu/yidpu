package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantNoticeService;
import com.weichu.mdesigner.api.vo.MerchantNoticeVo;
import com.weichu.mdesigner.common.entity.MerchantNoticeStatus;
import com.weichu.mdesigner.common.mapper.MerchantNoticeMapper;
import com.weichu.mdesigner.common.mapper.MerchantNoticeStatusMapper;

/**
 * 商家通知
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantNoticeServiceImpl implements IMerchantNoticeService {
	
	@Autowired
	private MerchantNoticeMapper noticeMapper;

	@Autowired
	private MerchantNoticeStatusMapper statusMapper;
	
	/**
	 * 查询商家通知,通知时间比商家注册时间大
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantNoticeVo> listNotice(int mid) {
		List<MerchantNoticeVo> noticeVos = new ArrayList<>();
		List<Map<String, Object>> notices = noticeMapper.selectAllNotice(mid);
		for (Map<String, Object> map : notices) {
			MerchantNoticeVo noticeVo = new MerchantNoticeVo();
			noticeVo.setId((int)map.get("id"));
			noticeVo.setNoticeTitle(map.get("notice_title") != null ? map.get("notice_title").toString() : null);
			noticeVo.setNoticeContent(map.get("notice_content") != null ? map.get("notice_content").toString() : null);
			noticeVo.setNoticeTime(map.get("notice_time") != null ? map.get("notice_time").toString() : null);
			noticeVo.setStatus(map.get("status") != null ? map.get("status").toString() : null);
			noticeVo.setNoticeDetailLink(map.get("notice_detail_link") != null ? map.get("notice_detail_link").toString() : null);
			noticeVos.add(noticeVo);
		}
		return noticeVos;
	}
	
	/**
	 * 查询未读通知与消息总数
	 * @param mid
	 * @return
	 */
	@Override
	public long selectUnReadNoticeAndMessageCount(int mid) {
		return noticeMapper.selectUnReadNoticeAndMessageCount(mid);
	}
	
	/**
	 * 标记通知已读
	 * @param noticeId
	 * @param mid
	 * @return
	 */
	@Override
	public int addMerchantNoticeStatus(int noticeId, int mid) {
		MerchantNoticeStatus noticeStatus = new MerchantNoticeStatus();
		noticeStatus.setMerchantId(mid);
		noticeStatus.setNoticeId(noticeId);
		noticeStatus.setCreateTime(new Date());
		return statusMapper.insertSelective(noticeStatus);
	}

}
