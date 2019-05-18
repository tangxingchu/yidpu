package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantGoodsSubtract {
    private Integer id;

    private Integer merchantId;

    private Integer constraintType;

    private BigDecimal consumePrice;

    private Date constraintTimeStart;

    private Date constraintTimeEnd;

    private Integer type;

    private BigDecimal amount1;

    private BigDecimal discount;

    private BigDecimal amount2;

    private String description;

    private String enabled;

    private Date effectiveTime;

    private Date expiredTime;

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

    public Integer getConstraintType() {
        return constraintType;
    }

    public void setConstraintType(Integer constraintType) {
        this.constraintType = constraintType;
    }

    public BigDecimal getConsumePrice() {
        return consumePrice;
    }

    public void setConsumePrice(BigDecimal consumePrice) {
        this.consumePrice = consumePrice;
    }

    public Date getConstraintTimeStart() {
        return constraintTimeStart;
    }

    public void setConstraintTimeStart(Date constraintTimeStart) {
        this.constraintTimeStart = constraintTimeStart;
    }

    public Date getConstraintTimeEnd() {
        return constraintTimeEnd;
    }

    public void setConstraintTimeEnd(Date constraintTimeEnd) {
        this.constraintTimeEnd = constraintTimeEnd;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public BigDecimal getAmount1() {
        return amount1;
    }

    public void setAmount1(BigDecimal amount1) {
        this.amount1 = amount1;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getAmount2() {
        return amount2;
    }

    public void setAmount2(BigDecimal amount2) {
        this.amount2 = amount2;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled == null ? null : enabled.trim();
    }

    public Date getEffectiveTime() {
        return effectiveTime;
    }

    public void setEffectiveTime(Date effectiveTime) {
        this.effectiveTime = effectiveTime;
    }

    public Date getExpiredTime() {
        return expiredTime;
    }

    public void setExpiredTime(Date expiredTime) {
        this.expiredTime = expiredTime;
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