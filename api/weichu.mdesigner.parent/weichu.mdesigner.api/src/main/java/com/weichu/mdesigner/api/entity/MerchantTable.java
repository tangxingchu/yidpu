package com.weichu.mdesigner.api.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantTable {
    private Integer id;

    private Integer merchantId;

    private String tableCode;

    private Integer tableClass;

    private String tableName;

    private Integer tableLimit;

    private String tableDescription;

    private Integer status;

    private Integer floorId;

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

    public String getTableCode() {
        return tableCode;
    }

    public void setTableCode(String tableCode) {
        this.tableCode = tableCode == null ? null : tableCode.trim();
    }

    public Integer getTableClass() {
        return tableClass;
    }

    public void setTableClass(Integer tableClass) {
        this.tableClass = tableClass;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName == null ? null : tableName.trim();
    }

    public Integer getTableLimit() {
        return tableLimit;
    }

    public void setTableLimit(Integer tableLimit) {
        this.tableLimit = tableLimit;
    }

    public String getTableDescription() {
        return tableDescription;
    }

    public void setTableDescription(String tableDescription) {
        this.tableDescription = tableDescription == null ? null : tableDescription.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getFloorId() {
        return floorId;
    }

    public void setFloorId(Integer floorId) {
        this.floorId = floorId;
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