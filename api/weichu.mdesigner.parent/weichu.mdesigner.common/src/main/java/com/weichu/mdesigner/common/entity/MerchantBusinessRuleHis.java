package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantBusinessRuleHis {
    private Integer id;

    private Integer merchantId;

    private String ruleCode;

    private String ruleName;

    @JSONField(format = "yyyy-MM-dd")
    private Date ruleBeginDate;

    @JSONField(format = "yyyy-MM-dd")
    private Date ruleEndDate;
    
    @JSONField(serialize = false)
    private Date createTime;

    @JSONField(serialize = false)
    private Date modifyTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Date getRuleBeginDate() {
        return ruleBeginDate;
    }

    public void setRuleBeginDate(Date ruleBeginDate) {
        this.ruleBeginDate = ruleBeginDate;
    }

    public Date getRuleEndDate() {
        return ruleEndDate;
    }

    public void setRuleEndDate(Date ruleEndDate) {
        this.ruleEndDate = ruleEndDate;
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