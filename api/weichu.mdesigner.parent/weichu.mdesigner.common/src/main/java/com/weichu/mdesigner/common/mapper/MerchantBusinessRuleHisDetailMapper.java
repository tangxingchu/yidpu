package com.weichu.mdesigner.common.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHisDetail;
import com.weichu.mdesigner.common.entity.MerchantBusinessRuleHisDetailExample;

public interface MerchantBusinessRuleHisDetailMapper {
    long countByExample(MerchantBusinessRuleHisDetailExample example);

    int deleteByExample(MerchantBusinessRuleHisDetailExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantBusinessRuleHisDetail record);

    int insertSelective(MerchantBusinessRuleHisDetail record);

    List<MerchantBusinessRuleHisDetail> selectByExample(MerchantBusinessRuleHisDetailExample example);

    MerchantBusinessRuleHisDetail selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantBusinessRuleHisDetail record);

    int updateByPrimaryKey(MerchantBusinessRuleHisDetail record);
    
    /**
     * 在添加具体规则时,需要添加进具体的历史规则明细,为运营分析提供数据基础
     * @param merchantId
     * @param ruleCode
     * @param ruleDetail
     * @return
     */
    int updateRuleDetails(@Param("merchantId")Integer merchantId, @Param("ruleCode")String ruleCode, 
    		@Param("ruleDetails")String ruleDetails);
    
    /**
     * 新增规则历史明细(上面修改已弃用)
     * @param merchantId
     * @param ruleCode
     * @param ruleName
     * @param ruleDetails
     * @param createTime
     * @return
     */
    int insertRuleDetails(@Param("merchantId")Integer merchantId, @Param("ruleCode")String ruleCode, 
    		@Param("ruleName")String ruleName, @Param("ruleDetails")String ruleDetails, 
    		@Param("operationType")Integer operationType, @Param("operationStaff")String operationStaff, 
    		@Param("createTime")Date createTime);
}