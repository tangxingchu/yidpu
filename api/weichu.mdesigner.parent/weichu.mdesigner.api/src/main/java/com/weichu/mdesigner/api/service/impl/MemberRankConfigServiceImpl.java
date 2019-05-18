package com.weichu.mdesigner.api.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.service.IMemberRankConfigService;
import com.weichu.mdesigner.common.entity.MemberRankConfig;
import com.weichu.mdesigner.common.entity.MemberRankConfigExample;
import com.weichu.mdesigner.common.mapper.MemberRankConfigMapper;

/**
 * 会员等级规则配置
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MemberRankConfigServiceImpl implements IMemberRankConfigService {

	@Autowired
	private MemberRankConfigMapper mapper;
	
	@Override
	public int batchAdd(Integer mid) {
		return mapper.batchAdd(mid);
	}

	@Override
	public int update(Integer rank, Integer point, Integer mid) {
		return mapper.updatePoint(rank, point, mid);
	}
	
	/**
	 * 查询会员等级配置
	 * @param mid
	 * @return
	 */
	@Override
	public List<MemberRankConfig> selectRankConfig(Integer mid) {
		MemberRankConfigExample example = new MemberRankConfigExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}
	
	/**
	 * 修改等级对应的积分
	 * @return
	 */
	@Override
	public int update(Map<String, String> params, Integer mid) {
		for(int i = 1; i <= 5; i++) {
			String point = params.get("rank" + i);
			if(!StringUtils.isEmpty(point)) {
				this.update(i, Integer.parseInt(point), mid);
			}
		}
		return 0;
	}
}
