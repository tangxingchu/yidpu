package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.api.vo.MerchantQueueVo;
import com.weichu.mdesigner.common.entity.MerchantQueue;
import com.weichu.mdesigner.common.entity.MerchantQueueTable;

/**
 * 排队
 * @author Administrator
 *
 */
public interface IMerchantQueueService {
	
	int save(MerchantQueue queue, int mid);
	
	int update(MerchantQueue queue, int mid) throws Exception;
	
	List<MerchantQueueVo> list(MerchantQueue queue, int mid);
	
	MerchantQueue selectById(int id, int mid);
	
	int delete(int id, int mid);
	
	int saveQueueTable(MerchantQueueTable queueTable, int mid) throws Exception;
	
	int deleteQueueTableById(int id, int mid);
	
	int deleteQueueTableByQueueId(int queueId, int mid);
	
}
