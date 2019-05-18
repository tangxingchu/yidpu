package com.weichu.mdesigner.api.service;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.MemberRankConfig;

/**
 * 会员等级规则配置
 * @author Administrator
 *
 */
public interface IMemberRankConfigService {
	
	/**
	 * 从默认的merchantId=0中复制一份
	 * @param mid
	 * @return
	 */
	int batchAdd(Integer mid);
	
	/**
	 * 修改等级对应的积分
	 * @param rank
	 * @param point
	 * @param mid
	 * @return
	 */
	int update(Integer rank, Integer point, Integer mid);
	
	/**
	 * 查询会员等级配置
	 * @param mid
	 * @return
	 */
	List<MemberRankConfig> selectRankConfig(Integer mid);
	
	/**
	 * 修改等级对应的积分
	 * @return
	 */
	int update(Map<String, String> params, Integer mid);
}
