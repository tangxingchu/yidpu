package com.weichu.mdesigner.api.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHis;
import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHisDetail;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 运营规则分析
 * @author Administrator
 *
 */
public interface IMerchantRuleAnalysisService {
	
	/**
	 * 查询运营时间超过1天的运营规则启用历史
	 * @param mid
	 * @return
	 */
	List<MerchantBusinessRuleHis> listRuleHis(Integer mid, Date ruleBeginDate, Date ruleEndDate) throws YdpException;
	
	/**
	 * 指定规则运营期间 与上一周期 营业额
	 * @param mid
	 * @param ruleBeginDate
	 * @param ruleEndDate
	 * @param type 1=环比上一周期, 2=同比去年相同周期
	 * @return 
	 * @throws YdpException
	 */
	Map<String, Object> turnoverTotal(Integer mid, Date ruleBeginDate, Date ruleEndDate, Integer type) throws YdpException;
	
	/**
	 * 指定规则运营期间 与上一周期 客流量
	 * @param mid
	 * @param ruleBeginDate
	 * @param ruleEndDate
	 * @param type 1=环比上一周期, 2=同比去年相同周期
	 * @return 
	 * @throws YdpException
	 */
	Map<String, Object> customerFlowTotal(Integer mid, Date ruleBeginDate, Date ruleEndDate, Integer type) throws YdpException;
	
	/**
	 * 指定规则运营期间 与上一周期 翻台率
	 * @param mid
	 * @param ruleBeginDate
	 * @param ruleEndDate
	 * @param type 1=环比上一周期, 2=同比去年相同周期
	 * @return 
	 * @throws YdpException
	 */
	Map<String, Object> tabelRateTotal(Integer mid, Date ruleBeginDate, Date ruleEndDate, Integer type) throws YdpException;
	
	/**
	 * 查询时间轴数据
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> selectByTimeline(Integer mid);

	/**
	 * 查询历史规则明细
	 * @param ruleHisId
	 * @param mid
	 * @return
	 */
	List<MerchantBusinessRuleHisDetail> selectRuleHisDetail(Integer ruleHisId, int mid);

	/**
	 * 初始化分析数据
	 * @param mid
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	Map<String, Object> init(int mid, Date beginDate, Date endDate) throws YdpException;
	
}
