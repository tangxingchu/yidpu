package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.api.vo.MerchantNoticeVo;

/**
 * 商家通知
 * @author Administrator
 *
 */
public interface IMerchantNoticeService {
	
	/**
	 * 查询商家通知,通知时间比商家注册时间大
	 * @param mid
	 * @return
	 */
	public List<MerchantNoticeVo> listNotice(int mid);
	
	/**
	 * 查询未读通知与消息总数
	 * @param mid
	 * @return
	 */
	public long selectUnReadNoticeAndMessageCount(int mid);
	
	/**
	 * 标记通知已读
	 * @param noticeId
	 * @param mid
	 * @return
	 */
	public int addMerchantNoticeStatus(int noticeId, int mid);
	
}
