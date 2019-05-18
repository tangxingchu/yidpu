package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantBusinessRuleHisDetail {
    private Integer id;

    private Integer ruleHisId;

    private Integer merchantId;

    private String ruleCode;

    private String ruleName;

    private String ruleDetails;

    private Integer operationType;

    private String operationStaff;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    @JSONField(serialize = false)
    private Date modifyTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRuleHisId() {
        return ruleHisId;
    }

    public void setRuleHisId(Integer ruleHisId) {
        this.ruleHisId = ruleHisId;
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
    }

    public String getRuleCode() {
        return ruleCode;
    }

    public void setRuleCode(String ruleCode) {
        this.ruleCode = ruleCode == null ? null : ruleCode.trim();
    }

    public String getRuleName() {
        return ruleName;
    }

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName == null ? null : ruleName.trim();
    }

    public String getRuleDetails() {
        return ruleDetails;
    }

    public void setRuleDetails(String ruleDetails) {
        this.ruleDetails = ruleDetails == null ? null : ruleDetails.trim();
    }

    public Integer getOperationType() {
        return operationType;
    }

    public void setOperationType(Integer operationType) {
        this.operationType = operationType;
    }

    public String getOperationStaff() {
        return operationStaff;
    }

    public void setOperationStaff(String operationStaff) {
        this.operationStaff = operationStaff == null ? null : operationStaff.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }
}