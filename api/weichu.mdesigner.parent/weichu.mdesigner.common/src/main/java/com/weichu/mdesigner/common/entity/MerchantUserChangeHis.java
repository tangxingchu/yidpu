package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantUserChangeHis {
    private Integer id;

    private Integer merchantId;

    private String merchantName;

    private String address;

    private String logoPath;

    private String remark;

    private Integer merchantAuditId;

    private String delImageIds;

    @JSONField(serialize = false)
    private Date createTime;

    private Date auditTime;

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

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName == null ? null : merchantName.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getLogoPath() {
        return logoPath;
    }

    public void setLogoPath(String logoPath) {
        this.logoPath = logoPath == null ? null : logoPath.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Integer getMerchantAuditId() {
        return merchantAuditId;
    }

    public void setMerchantAuditId(Integer merchantAuditId) {
        this.merchantAuditId = merchantAuditId;
    }

    public String getDelImageIds() {
        return delImageIds;
    }

    public void setDelImageIds(String delImageIds) {
        this.delImageIds = delImageIds == null ? null : delImageIds.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getAuditTime() {
        return auditTime;
    }

    public void setAuditTime(Date auditTime) {
        this.auditTime = auditTime;
    }
}