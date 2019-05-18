package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantFunction {
    private Integer id;

    private String functionName;

    private String functionCode;

    private String functionUri;

    private Integer functionType;

    private Integer functionCategory;

    private Integer parentId;

    private Integer grade;

    private String functionIcon;

    private Integer sortNo;

    private Integer enabled;

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

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName == null ? null : functionName.trim();
    }

    public String getFunctionCode() {
        return functionCode;
    }

    public void setFunctionCode(String functionCode) {
        this.functionCode = functionCode == null ? null : functionCode.trim();
    }

    public String getFunctionUri() {
        return functionUri;
    }

    public void setFunctionUri(String functionUri) {
        this.functionUri = functionUri == null ? null : functionUri.trim();
    }

    public Integer getFunctionType() {
        return functionType;
    }

    public void setFunctionType(Integer functionType) {
        this.functionType = functionType;
    }

    public Integer getFunctionCategory() {
        return functionCategory;
    }

    public void setFunctionCategory(Integer functionCategory) {
        this.functionCategory = functionCategory;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public String getFunctionIcon() {
        return functionIcon;
    }

    public void setFunctionIcon(String functionIcon) {
        this.functionIcon = functionIcon == null ? null : functionIcon.trim();
    }

    public Integer getSortNo() {
        return sortNo;
    }

    public void setSortNo(Integer sortNo) {
        this.sortNo = sortNo;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
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