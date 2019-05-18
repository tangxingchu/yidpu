package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantImageHis {
    private Integer id;

    private Integer merchantId;

    private Integer defaultDisplay;

    private String imageName;

    private String imagePath;

    @JSONField(serialize = false)
    private Date createTime;

    private Integer hasAudit;

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

    public Integer getDefaultDisplay() {
        return defaultDisplay;
    }

    public void setDefaultDisplay(Integer defaultDisplay) {
        this.defaultDisplay = defaultDisplay;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName == null ? null : imageName.trim();
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath == null ? null : imagePath.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getHasAudit() {
        return hasAudit;
    }

    public void setHasAudit(Integer hasAudit) {
        this.hasAudit = hasAudit;
    }

    public Date getAuditTime() {
        return auditTime;
    }

    public void setAuditTime(Date auditTime) {
        this.auditTime = auditTime;
    }
}