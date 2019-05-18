package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantRuleAnalysisService;
import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHis;
import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHisDetail;
import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHisDetailExample;
import com.weichu.mdesigner.common.mapper.MerchantBusinessRuleHisDetailMapper;
import com.weichu.mdesigner.common.mapper.MerchantBusinessRuleHisMapper;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DateUnit;

@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantRuleAnalysisServiceImpl implements IMerchantRuleAnalysisService {

	@Autowired
	private MerchantBusinessRuleHisMapper ruleHisMapper;
	
	@Autowired
	private MerchantBusinessRuleHisDetailMapper ruleHisDetailMapper;
	
	/**
	 * 初始化分析数据
	 * @param mid
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	@Override
	public Map<String, Object> init(int mid, Date beginDate, Date endDate) throws YdpException {
		Map<String, Object> results = new HashMap<>();
		
		results.put("ruleHisList", listRuleHis(mid, beginDate, endDate));
		
		//营业额上一周期环比数据
		results.putAll(turnoverTotal(mid, beginDate, endDate, 1));
		//客流量上一周期环比数据
		results.putAll(customerFlowTotal(mid, beginDate, endDate, 1));
		//翻台率上一周期环比数据
		results.putAll(tabelRateTotal(mid, beginDate, endDate, 1));
		return results;
	}
	
	/**
	 * 查询运营时间超过1天的运营规则启用历史
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantBusinessRuleHis> listRuleHis(Integer mid, Date ruleBeginDate, Date ruleEndDate) throws YdpException {
		Date beignDayTime = DateUtil.beginOfDay(new Date());
		if(ruleBeginDate.after(beignDayTime)) {
			throw new YdpException("开始日期必须小于当天");
		}
		if(ruleEndDate.after(beignDayTime)) {
			throw new YdpException("结束日期必须小于当天");
		}
//		MerchantBusinessRuleHisExample example = new MerchantBusinessRuleHisExample();
//		example.setOrderByClause(" rule_begin_date asc ");
//		example.createCriteria().andRuleBeginDateBetween(DateUtil.beginOfDay(ruleBeginDate), 
//				DateUtil.endOfDayMySql(ruleEndDate)).andMerchantIdEqualTo(mid);
		return ruleHisMapper.listRuleHis(ruleEndDate, mid);
	}
	
	private Date[] calPruleDate(Date ruleBeginDate, Date ruleEndDate, Integer type) {
		Date[] dates = new Date[2];
		//计算相差多少天
		Date p_ruleEndDate = null, p_ruleBeginDate = null;
		if(type == 1) {
			long day = DateUtil.between(ruleBeginDate, ruleEndDate, DateUnit.DAY);
			p_ruleEndDate = DateUtil.offset(ruleBeginDate, DateField.DAY_OF_YEAR, Math.negateExact(1));//将开始日期的前一天设置为上一周期环比结束日期
			p_ruleBeginDate = DateUtil.offset(p_ruleEndDate, DateField.DAY_OF_YEAR, 
					Long.valueOf(Math.negateExact(day)).intValue());
		} else if(type == 2) {
			p_ruleEndDate = DateUtil.offset(ruleEndDate, DateField.MONTH, Math.negateExact(1));//将开始日期的前一天设置为上一周期环比结束日期
			p_ruleBeginDate = DateUtil.offset(ruleBeginDate, DateField.MONTH, Math.negateExact(1));
		} else {
			p_ruleEndDate = DateUtil.offset(ruleEndDate, DateField.YEAR, Math.negateExact(1));//将开始日期的前一天设置为上一周期环比结束日期
			p_ruleBeginDate = DateUtil.offset(ruleBeginDate, DateField.YEAR, Math.negateExact(1));
		}
		dates[0] = p_ruleBeginDate;
		dates[1] = p_ruleEndDate;
		return dates;
	}
	
	/**
	 * 指定规则运营期间 与上一周期 营业额
	 * @param mid
	 * @param ruleBeginDate
	 * @param ruleEndDate
	 * @param type 1=环比上一周期, 2=同比去年相同周期
	 * @return 
	 * @throws YdpException
	 */
	@Override
	public Map<String, Object> turnoverTotal(Integer mid, Date ruleBeginDate, Date ruleEndDate, Integer type) throws YdpException {
		Map<String, Object> results = new HashMap<String, Object>();
		Date[] dates = calPruleDate(ruleBeginDate, ruleEndDate, type);
		List<Map<String, Object>> turnoverList = ruleHisMapper.sumTurnover(ruleBeginDate, ruleEndDate, 
				dates[0], dates[1], mid);
		Map<String, Object> turnoverMap = new HashMap<>();
		turnoverMap.put("turnoverList", turnoverList);
		BigDecimal preTurnoverTotal = (BigDecimal) turnoverList.get(0).get("turnover");
		BigDecimal currTurnoverTotal = (BigDecimal) turnoverList.get(1).get("turnover");
		BigDecimal percent = null;
		if(preTurnoverTotal.compareTo(BigDecimal.ZERO) == 0) {
			percent = currTurnoverTotal;
		} else {
//			if(currTurnoverTotal.compareTo(preTurnoverTotal) == -1) {//下降率
//				percent = preTurnoverTotal.subtract(currTurnoverTotal).divide(preTurnoverTotal, 4, BigDecimal.ROUND_FLOOR);
//				percent = percent.negate();
//			} else {//增长率				
				percent = currTurnoverTotal.subtract(preTurnoverTotal).divide(preTurnoverTotal, 4, BigDecimal.ROUND_FLOOR);
//			}
		}
		turnoverMap.put("percent", YdpUtils.dfNumberScale4(percent));
		results.put("turnovers", turnoverMap);
		return results;
	}
	
	/**
	 * 指定规则运营期间 与上一周期 客流量
	 * @param mid
	 * @param ruleBeginDate
	 * @param ruleEndDate
	 * @param type 1=环比上一周期, 2=同比去年相同周期
	 * @return 
	 * @throws YdpException
	 */
	@Override
	public Map<String, Object> customerFlowTotal(Integer mid, Date ruleBeginDate, Date ruleEndDate, Integer type) throws YdpException {
		Map<String, Object> results = new HashMap<String, Object>();
		Date[] dates = calPruleDate(ruleBeginDate, ruleEndDate, type);
		List<Map<String, Object>> customerFlowList = ruleHisMapper.sumCustomerFlow(ruleBeginDate, ruleEndDate, 
				dates[0], dates[1], mid);
		Map<String, Object> customerFlowMap = new HashMap<>();
		customerFlowMap.put("customerFlowList", customerFlowList);
		BigDecimal preCFTotal = (BigDecimal) customerFlowList.get(0).get("customer_flow");
		BigDecimal currCFTotal = (BigDecimal) customerFlowList.get(1).get("customer_flow");
		BigDecimal percent = null;
		if(preCFTotal.compareTo(BigDecimal.ZERO) == 0) {
			percent = currCFTotal;
		} else {
//			if(currCFTotal.compareTo(preCFTotal) == -1) {
//				percent = preCFTotal.subtract(currCFTotal).divide(preCFTotal, 4, BigDecimal.ROUND_FLOOR);
//				percent = percent.negate();
//			} else {				
				percent = currCFTotal.subtract(preCFTotal).divide(preCFTotal, 4, BigDecimal.ROUND_FLOOR);
//			}
		}
		customerFlowMap.put("percent", YdpUtils.dfNumberScale4(percent));
		results.put("customerFlows", customerFlowMap);
		return results;
	}

	/**
	 * 指定规则运营期间 与上一周期 翻台率
	 * @param mid
	 * @param ruleBeginDate
	 * @param ruleEndDate
	 * @param type 1=环比上一周期, 2=同比去年相同周期
	 * @return 
	 * @throws YdpException
	 */
	@Override
	public Map<String, Object> tabelRateTotal(Integer mid, Date ruleBeginDate, Date ruleEndDate, Integer type) throws YdpException {
		Map<String, Object> results = new HashMap<String, Object>();
		Date[] dates = calPruleDate(ruleBeginDate, ruleEndDate, type);
		List<Map<String, Object>> tableRateList = ruleHisMapper.sumTableRate(ruleBeginDate, ruleEndDate, 
				dates[0], dates[1], mid);
		Map<String, Object> tableRateMap = new HashMap<>();
		tableRateMap.put("tableRateList", tableRateList);
		BigDecimal preTRTotal = (BigDecimal) tableRateList.get(0).get("table_rate");
		BigDecimal currTRTotal = (BigDecimal) tableRateList.get(1).get("table_rate");
		BigDecimal percent = currTRTotal.subtract(preTRTotal);
		tableRateMap.put("percent", YdpUtils.dfNumberScale4(percent));
		results.put("tableRates", tableRateMap);
		return results;
	}
	
	/**
	 * 查询时间轴数据
	 */
	@Override
	public List<Map<String, Object>> selectByTimeline(Integer mid) {
		Date beignDayTime = DateUtil.beginOfDay(new Date());
		return ruleHisMapper.selectByTimeline(beignDayTime, mid);
	}
	
	/**
	 * 查询历史规则明细
	 * @param ruleHisId
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantBusinessRuleHisDetail> selectRuleHisDetail(Integer ruleHisId, int mid) {
		MerchantBusinessRuleHisDetailExample example = new MerchantBusinessRuleHisDetailExample();
		example.createCriteria().andRuleHisIdEqualTo(ruleHisId).andMerchantIdEqualTo(mid);
		return ruleHisDetailMapper.selectByExample(example);		
	}
	
}
