package com.weichu.mdesigner.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantMessageService;
import com.weichu.mdesigner.common.entity.MerchantMessage;
import com.weichu.mdesigner.common.entity.MerchantMessageExample;
import com.weichu.mdesigner.common.mapper.MerchantMessageMapper;

/**
 * 商家消息(一般发送权限快到期消息)
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantMessageServiceImpl implements IMerchantMessageService {
	
	@Autowired
	private MerchantMessageMapper mapper;
	
	/**
	 * 查询所有消息
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantMessage> listAllMessage(int mid) {
		MerchantMessageExample example = new MerchantMessageExample();
		example.setOrderByClause(" message_time desc ");
		example.createCriteria().andReciveUserIdEqualTo(mid);
		return mapper.selectByExampleWithBLOBs(example);
	}

	/**
	 * 消息设置已读状态 1=已读
	 * @param mid
	 * @param messageId
	 * @return
	 */
	@Override
	public int updateReadStatus(int mid, int messageId) {
		return mapper.updateReadStatus(mid, messageId);
	}	
	
	/**
	 * 删除消息
	 * @param messageId
	 * @param mid
	 * @return
	 */
	public int delete(int messageId, int mid) {
		MerchantMessageExample example = new MerchantMessageExample();
		example.createCriteria().andReciveUserIdEqualTo(mid).andIdEqualTo(messageId);
		return mapper.deleteByExample(example);
	}
	
}
