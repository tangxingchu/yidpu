package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class AdminVersion {
    private Integer id;

    private Integer appType;

    private String currVersion;

    private String mainAppVersion;

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

    public Integer getAppType() {
        return appType;
    }

    public void setAppType(Integer appType) {
        this.appType = appType;
    }

    public String getCurrVersion() {
        return currVersion;
    }

    public void setCurrVersion(String currVersion) {
        this.currVersion = currVersion == null ? null : currVersion.trim();
    }

    public String getMainAppVersion() {
        return mainAppVersion;
    }

    public void setMainAppVersion(String mainAppVersion) {
        this.mainAppVersion = mainAppVersion == null ? null : mainAppVersion.trim();
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