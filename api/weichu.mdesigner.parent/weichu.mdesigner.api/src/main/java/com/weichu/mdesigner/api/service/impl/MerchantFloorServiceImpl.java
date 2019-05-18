package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.entity.MerchantFloor;
import com.weichu.mdesigner.api.entity.MerchantFloorExample;
import com.weichu.mdesigner.api.entity.MerchantTableExample;
import com.weichu.mdesigner.api.mapper.MerchantFloorMapper;
import com.weichu.mdesigner.api.mapper.MerchantTableMapper;
import com.weichu.mdesigner.api.service.IMerchantFloorService;
import com.weichu.mdesigner.utils.exception.YdpException;

@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantFloorServiceImpl implements IMerchantFloorService {

	@Autowired
	private MerchantFloorMapper mapper;

	@Autowired
	private MerchantTableMapper tableMapper;

	@Override
	public int delete(int id, int mid) {
		MerchantTableExample tableExample = new MerchantTableExample();
		tableExample.createCriteria().andFloorIdEqualTo(id).andMerchantIdEqualTo(mid);
		tableMapper.deleteByExample(tableExample);
		MerchantFloorExample example = new MerchantFloorExample();
		example.createCriteria().andIdEqualTo(id).andMerchantIdEqualTo(mid);
		return mapper.deleteByExample(example);
	}

	public int update(MerchantFloor floor, int mid) throws YdpException {
		if (mid != floor.getMerchantId()) {
			throw new YdpException("非法操作");
		}
		floor.setModifyTime(new Date());
		return mapper.updateByPrimaryKeySelective(floor);
	}

	public MerchantFloor selectById(int id, int mid) {
		MerchantFloorExample example = new MerchantFloorExample();
		example.createCriteria().andIdEqualTo(id).andMerchantIdEqualTo(mid);
		List<MerchantFloor> floors = mapper.selectByExample(example);
		if (!floors.isEmpty()) {
			return floors.get(0);
		}
		return null;
	}

}
