package com.weichu.mdesigner.api.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantFloor {
    private Integer id;

    private String floorName;

    private String floorDesc;

    private Integer merchantId;

    private String designFilePath;

    private Integer status;

    private Integer sortNo;

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

    public String getFloorName() {
        return floorName;
    }

    public void setFloorName(String floorName) {
        this.floorName = floorName == null ? null : floorName.trim();
    }

    public String getFloorDesc() {
        return floorDesc;
    }

    public void setFloorDesc(String floorDesc) {
        this.floorDesc = floorDesc == null ? null : floorDesc.trim();
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
    }

    public String getDesignFilePath() {
        return designFilePath;
    }

    public void setDesignFilePath(String designFilePath) {
        this.designFilePath = designFilePath == null ? null : designFilePath.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getSortNo() {
        return sortNo;
    }

    public void setSortNo(Integer sortNo) {
        this.sortNo = sortNo;
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