package com.weichu.mdesigner.common.mapper;

import java.util.Date;

public class MemberChangeHis {
    private Integer id;

    private Integer merchantId;

    private Integer memberId;

    private Integer changeType;

    private String changeDesc;

    private String beforePhone;

    private String afterPhone;

    private String operationStaff;

    private Date createTime;

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

    public Integer getChangeType() {
        return changeType;
    }

    public void setChangeType(Integer changeType) {
        this.changeType = changeType;
    }

    public String getChangeDesc() {
        return changeDesc;
    }

    public void setChangeDesc(String changeDesc) {
        this.changeDesc = changeDesc == null ? null : changeDesc.trim();
    }

    public String getBeforePhone() {
        return beforePhone;
    }

    public void setBeforePhone(String beforePhone) {
        this.beforePhone = beforePhone == null ? null : beforePhone.trim();
    }

    public String getAfterPhone() {
        return afterPhone;
    }

    public void setAfterPhone(String afterPhone) {
        this.afterPhone = afterPhone == null ? null : afterPhone.trim();
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