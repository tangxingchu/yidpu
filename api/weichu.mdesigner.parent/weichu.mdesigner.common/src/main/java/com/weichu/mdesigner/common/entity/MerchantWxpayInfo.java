package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantWxpayInfo {
    private Integer id;

    private Integer merchantId;

    private String subMchId;

    private String contactsName;

    private String phone;

    private String email;

    private String merchantName;

    private String servicePhone;

    private String businessLicenceNo;

    private String orgPhotoPath;

    private String identityPhotoFrontPath;

    private String identityPhotoBackPath;

    private Integer accountType;

    private String accountName;

    private String accountBank;

    private String accountFockback;

    private String accountNo;

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

    public String getSubMchId() {
        return subMchId;
    }

    public void setSubMchId(String subMchId) {
        this.subMchId = subMchId == null ? null : subMchId.trim();
    }

    public String getContactsName() {
        return contactsName;
    }

    public void setContactsName(String contactsName) {
        this.contactsName = contactsName == null ? null : contactsName.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName == null ? null : merchantName.trim();
    }

    public String getServicePhone() {
        return servicePhone;
    }

    public void setServicePhone(String servicePhone) {
        this.servicePhone = servicePhone == null ? null : servicePhone.trim();
    }

    public String getBusinessLicenceNo() {
        return businessLicenceNo;
    }

    public void setBusinessLicenceNo(String businessLicenceNo) {
        this.businessLicenceNo = businessLicenceNo == null ? null : businessLicenceNo.trim();
    }

    public String getOrgPhotoPath() {
        return orgPhotoPath;
    }

    public void setOrgPhotoPath(String orgPhotoPath) {
        this.orgPhotoPath = orgPhotoPath == null ? null : orgPhotoPath.trim();
    }

    public String getIdentityPhotoFrontPath() {
        return identityPhotoFrontPath;
    }

    public void setIdentityPhotoFrontPath(String identityPhotoFrontPath) {
        this.identityPhotoFrontPath = identityPhotoFrontPath == null ? null : identityPhotoFrontPath.trim();
    }

    public String getIdentityPhotoBackPath() {
        return identityPhotoBackPath;
    }

    public void setIdentityPhotoBackPath(String identityPhotoBackPath) {
        this.identityPhotoBackPath = identityPhotoBackPath == null ? null : identityPhotoBackPath.trim();
    }

    public Integer getAccountType() {
        return accountType;
    }

    public void setAccountType(Integer accountType) {
        this.accountType = accountType;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName == null ? null : accountName.trim();
    }

    public String getAccountBank() {
        return accountBank;
    }

    public void setAccountBank(String accountBank) {
        this.accountBank = accountBank == null ? null : accountBank.trim();
    }

    public String getAccountFockback() {
        return accountFockback;
    }

    public void setAccountFockback(String accountFockback) {
        this.accountFockback = accountFockback == null ? null : accountFockback.trim();
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo == null ? null : accountNo.trim();
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