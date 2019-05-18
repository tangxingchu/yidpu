package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MemberRecord {
    private Integer id;

    private Integer merchantId;

    private Integer memberId;

    private BigDecimal priceAmount;

    private Integer recordType;

    private Integer payMethod;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date recordTime;

    private BigDecimal couponPrice;

    private BigDecimal pointPrice;

    private Integer consumePoint;

    private BigDecimal givePrice;

    private BigDecimal recordBalance;

    private String recordDesc;

    private String operationStaff;

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

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public BigDecimal getPriceAmount() {
        return priceAmount;
    }

    public void setPriceAmount(BigDecimal priceAmount) {
        this.priceAmount = priceAmount;
    }

    public Integer getRecordType() {
        return recordType;
    }

    public void setRecordType(Integer recordType) {
        this.recordType = recordType;
    }

    public Integer getPayMethod() {
        return payMethod;
    }

    public void setPayMethod(Integer payMethod) {
        this.payMethod = payMethod;
    }

    public Date getRecordTime() {
        return recordTime;
    }

    public void setRecordTime(Date recordTime) {
        this.recordTime = recordTime;
    }

    public BigDecimal getCouponPrice() {
        return couponPrice;
    }

    public void setCouponPrice(BigDecimal couponPrice) {
        this.couponPrice = couponPrice;
    }

    public BigDecimal getPointPrice() {
        return pointPrice;
    }

    public void setPointPrice(BigDecimal pointPrice) {
        this.pointPrice = pointPrice;
    }

    public Integer getConsumePoint() {
        return consumePoint;
    }

    public void setConsumePoint(Integer consumePoint) {
        this.consumePoint = consumePoint;
    }

    public BigDecimal getGivePrice() {
        return givePrice;
    }

    public void setGivePrice(BigDecimal givePrice) {
        this.givePrice = givePrice;
    }

    public BigDecimal getRecordBalance() {
        return recordBalance;
    }

    public void setRecordBalance(BigDecimal recordBalance) {
        this.recordBalance = recordBalance;
    }

    public String getRecordDesc() {
        return recordDesc;
    }

    public void setRecordDesc(String recordDesc) {
        this.recordDesc = recordDesc == null ? null : recordDesc.trim();
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