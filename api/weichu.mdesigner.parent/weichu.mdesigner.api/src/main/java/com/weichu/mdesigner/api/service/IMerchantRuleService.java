package com.weichu.mdesigner.api.service;

import java.util.Map;

/**
 * 运营规则
 * @author Administrator
 *
 */
public interface IMerchantRuleService {
	
	/**
	 * 查询当天的规则
	 * @param mid
	 * @return
	 */
	Map<String, Object> listTodayRule(int mid);
	
}
