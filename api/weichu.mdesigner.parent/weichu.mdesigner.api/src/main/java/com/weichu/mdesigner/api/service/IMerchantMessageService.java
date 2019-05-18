package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantMessage;

/**
 * 商家消息
 * @author Administrator
 *
 */
public interface IMerchantMessageService {
	
	/**
	 * 查询所有消息
	 * @param mid
	 * @return
	 */
	public List<MerchantMessage> listAllMessage(int mid);
	
	/**
	 * 消息设置已读状态 1=已读
	 * @param mid
	 * @param messageId
	 * @return
	 */
	public int updateReadStatus(int mid, int messageId);
	
	/**
	 * 删除消息
	 * @param messageId
	 * @param mid
	 * @return
	 */
	public int delete(int messageId, int mid);
	
}
