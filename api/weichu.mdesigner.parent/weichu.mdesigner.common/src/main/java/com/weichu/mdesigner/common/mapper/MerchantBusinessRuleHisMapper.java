package com.weichu.mdesigner.common.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHis;
import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHisExample;

public interface MerchantBusinessRuleHisMapper {
    long countByExample(MerchantBusinessRuleHisExample example);

    int deleteByExample(MerchantBusinessRuleHisExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantBusinessRuleHis record);

    int insertSelective(MerchantBusinessRuleHis record);

    List<MerchantBusinessRuleHis> selectByExample(MerchantBusinessRuleHisExample example);

    MerchantBusinessRuleHis selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantBusinessRuleHis record);

    int updateByPrimaryKey(MerchantBusinessRuleHis record);
    
    /**
     * 修改某一种(ruleCode)运营规则停止日期
     * @param ruleEndDate
     * @param ruleCode
     * @param merchantId
     * @return
     */
    int updateRuleEndDate(@Param("ruleEndDate")Date ruleEndDate, @Param("ruleCode")String ruleCode, 
    		@Param("merchantId")Integer merchantId);
    
    /**
     * 查询时间轴数据
     * @param ruleBeginDate
     * @param merchantId
     * @return
     */
    List<Map<String, Object>> selectByTimeline(@Param("ruleBeginDate")Date ruleBeginDate, @Param("merchantId")Integer merchantId);

    /**
     * 运营分析时间周期内 营业额求和
     * @param ruleBeginDate
     * @param ruleEndDate
     * @param mid
     * @return
     */
	List<Map<String, Object>> sumTurnover(@Param("beginDate")Date ruleBeginDate, @Param("endDate")Date ruleEndDate,
			@Param("preBeginDate")Date preBeginDate, @Param("preEndDate")Date preRuleEndDate,
			@Param("merchantId")Integer mid);
	
	/**
	 * 运营分析时间周期内 客流量求和
	 * @param ruleBeginDate
	 * @param ruleEndDate
	 * @param preBeginDate
	 * @param preRuleEndDate
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> sumCustomerFlow(@Param("beginDate")Date ruleBeginDate, @Param("endDate")Date ruleEndDate,
			@Param("preBeginDate")Date preBeginDate, @Param("preEndDate")Date preRuleEndDate,
			@Param("merchantId")Integer mid);
    
	/**
	 * 运营分析时间周期内 翻台率求和
	 * @param ruleBeginDate
	 * @param ruleEndDate
	 * @param preBeginDate
	 * @param preRuleEndDate
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> sumTableRate(@Param("beginDate")Date ruleBeginDate, @Param("endDate")Date ruleEndDate,
			@Param("preBeginDate")Date preBeginDate, @Param("preEndDate")Date preRuleEndDate,
			@Param("merchantId")Integer mid);
	
	/**
	 * 查询当前时间周期内运营过的规则
	 * @param ruleBeginDate
	 * @param ruleEndDate
	 * @param mid
	 * @return
	 */
	List<MerchantBusinessRuleHis> listRuleHis(@Param("ruleEndDate")Date ruleEndDate, Integer mid);
}