package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantQueueService;
import com.weichu.mdesigner.api.service.IMerchantTableService;
import com.weichu.mdesigner.api.vo.MerchantQueueVo;
import com.weichu.mdesigner.api.vo.MerchantTableVo;
import com.weichu.mdesigner.common.entity.MerchantQueue;
import com.weichu.mdesigner.common.entity.MerchantQueueExample;
import com.weichu.mdesigner.common.entity.MerchantQueueTable;
import com.weichu.mdesigner.common.entity.MerchantQueueTableExample;
import com.weichu.mdesigner.common.mapper.MerchantQueueMapper;
import com.weichu.mdesigner.common.mapper.MerchantQueueTableMapper;

/**
 * 排队
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantQueueServiceImpl implements IMerchantQueueService {

	@Autowired
	private MerchantQueueMapper mapper;

	@Autowired
	private MerchantQueueTableMapper qtMapper;

	@Autowired
	private IMerchantTableService tableService;

	@Override
	public int save(MerchantQueue queue, int mid) {
		queue.setMerchantId(mid);
		queue.setCreateTime(new Date());
		mapper.insertSelective(queue);
		return queue.getId();
	}

	@Override
	public int update(MerchantQueue queue, int mid) throws Exception {
		if (mid != queue.getMerchantId()) {
			throw new Exception("非法操作");
		}
		return mapper.updateByPrimaryKeySelective(queue);
	}

	@Override
	public List<MerchantQueueVo> list(MerchantQueue queue, int mid) {
		MerchantQueueExample example = new MerchantQueueExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantQueue> queues = mapper.selectByExample(example);
		List<MerchantQueueVo> queueVos = new ArrayList<>();
		for (MerchantQueue merchantQueue : queues) {
			MerchantQueueVo queueVo = new MerchantQueueVo();
			BeanUtils.copyProperties(merchantQueue, queueVo);
			queueVos.add(queueVo);
			List<MerchantTableVo> tables = tableService.selectTableByqueueId(merchantQueue.getId(), mid);
			queueVo.setTables(tables);
		}
		return queueVos;
	}

	@Override
	public MerchantQueue selectById(int id, int mid) {
		MerchantQueueExample example = new MerchantQueueExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		List<MerchantQueue> queues = mapper.selectByExample(example);
		if (!queues.isEmpty()) {
			return queues.get(0);
		}
		return null;
	}

	@Override
	public int delete(int id, int mid) {
		MerchantQueueExample example = new MerchantQueueExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		return mapper.deleteByExample(example);
	}

	@Override
	public int saveQueueTable(MerchantQueueTable queueTable, int mid) throws Exception {
		if (queueTable.getMerchantId() == null || mid != queueTable.getMerchantId()) {
			throw new Exception("非法操作");
		}
		MerchantQueueTableExample example = new MerchantQueueTableExample();
		example.createCriteria().andTableIdEqualTo(queueTable.getTableId()).andMerchantIdEqualTo(mid);
		qtMapper.deleteByExample(example);
		// 为0表示要拖进未入排队的桌台
		if (queueTable.getQueueId() != 0) {
			return qtMapper.insertSelective(queueTable);
		} else {
			return 0;
		}
	}

	@Override
	public int deleteQueueTableById(int id, int mid) {
		MerchantQueueTableExample example = new MerchantQueueTableExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		return qtMapper.deleteByExample(example);
	}

	@Override
	public int deleteQueueTableByQueueId(int queueId, int mid) {
		MerchantQueueTableExample example = new MerchantQueueTableExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andQueueIdEqualTo(queueId);
		return qtMapper.deleteByExample(example);
	}

}
