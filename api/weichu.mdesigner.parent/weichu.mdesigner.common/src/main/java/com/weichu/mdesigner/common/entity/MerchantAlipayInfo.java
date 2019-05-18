package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantAlipayInfo {
    private Integer id;

    private Integer merchantId;

    private String alipayAppId;

    private String alipayUserId;

    private String alipayToken;

    private String alipayRefreshToken;

    private Integer hasChange;

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

    public String getAlipayAppId() {
        return alipayAppId;
    }

    public void setAlipayAppId(String alipayAppId) {
        this.alipayAppId = alipayAppId == null ? null : alipayAppId.trim();
    }

    public String getAlipayUserId() {
        return alipayUserId;
    }

    public void setAlipayUserId(String alipayUserId) {
        this.alipayUserId = alipayUserId == null ? null : alipayUserId.trim();
    }

    public String getAlipayToken() {
        return alipayToken;
    }

    public void setAlipayToken(String alipayToken) {
        this.alipayToken = alipayToken == null ? null : alipayToken.trim();
    }

    public String getAlipayRefreshToken() {
        return alipayRefreshToken;
    }

    public void setAlipayRefreshToken(String alipayRefreshToken) {
        this.alipayRefreshToken = alipayRefreshToken == null ? null : alipayRefreshToken.trim();
    }

    public Integer getHasChange() {
        return hasChange;
    }

    public void setHasChange(Integer hasChange) {
        this.hasChange = hasChange;
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