package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantUser {
    private Integer id;

    private String merchantName;

    private String merchantCode;

    private String businessLicenceNo;

    private Integer businessPhotoId;

    private Integer businessCategory;

    private String phone;

    private String password;

    private Integer identityPhotoFrontId;

    private Integer identityPhotoBackId;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date registerTime;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date lastLoginTime;

    private String lastLoginIp;

    private String lastLoginToken;

    private String address;

    private Double lon;

    private Double lat;

    private Integer grade;

    private Integer enabled;

    private Integer locked;

    private Integer merchantStatus;

    private Integer operatingStatus;

    private String adcode;

    private String cityCode;

    private String cityName;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date expirationTime;

    private Float star;

    private String telephone;

    private Integer alipaySteup;
    
    private Integer wxpaySteup;

    private Integer changeAuditStatus;

    private String email;

    private Integer bizLicenseAuthId;

    private String logoPath;

    private String remark;
    
    private String wxOpenid;
    
    private Integer merchantProperty;

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

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName == null ? null : merchantName.trim();
    }

    public String getMerchantCode() {
        return merchantCode;
    }

    public void setMerchantCode(String merchantCode) {
        this.merchantCode = merchantCode == null ? null : merchantCode.trim();
    }

    public String getBusinessLicenceNo() {
        return businessLicenceNo;
    }

    public void setBusinessLicenceNo(String businessLicenceNo) {
        this.businessLicenceNo = businessLicenceNo == null ? null : businessLicenceNo.trim();
    }

    public Integer getBusinessPhotoId() {
        return businessPhotoId;
    }

    public void setBusinessPhotoId(Integer businessPhotoId) {
        this.businessPhotoId = businessPhotoId;
    }

    public Integer getBusinessCategory() {
        return businessCategory;
    }

    public void setBusinessCategory(Integer businessCategory) {
        this.businessCategory = businessCategory;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public Integer getIdentityPhotoFrontId() {
        return identityPhotoFrontId;
    }

    public void setIdentityPhotoFrontId(Integer identityPhotoFrontId) {
        this.identityPhotoFrontId = identityPhotoFrontId;
    }

    public Integer getIdentityPhotoBackId() {
        return identityPhotoBackId;
    }

    public void setIdentityPhotoBackId(Integer identityPhotoBackId) {
        this.identityPhotoBackId = identityPhotoBackId;
    }

    public Date getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Date registerTime) {
        this.registerTime = registerTime;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public String getLastLoginIp() {
        return lastLoginIp;
    }

    public void setLastLoginIp(String lastLoginIp) {
        this.lastLoginIp = lastLoginIp == null ? null : lastLoginIp.trim();
    }

    public String getLastLoginToken() {
        return lastLoginToken;
    }

    public void setLastLoginToken(String lastLoginToken) {
        this.lastLoginToken = lastLoginToken == null ? null : lastLoginToken.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public Integer getLocked() {
        return locked;
    }

    public void setLocked(Integer locked) {
        this.locked = locked;
    }

    public Integer getMerchantStatus() {
        return merchantStatus;
    }

    public void setMerchantStatus(Integer merchantStatus) {
        this.merchantStatus = merchantStatus;
    }

    public Integer getOperatingStatus() {
        return operatingStatus;
    }

    public void setOperatingStatus(Integer operatingStatus) {
        this.operatingStatus = operatingStatus;
    }

    public String getAdcode() {
        return adcode;
    }

    public void setAdcode(String adcode) {
        this.adcode = adcode == null ? null : adcode.trim();
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode == null ? null : cityCode.trim();
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName == null ? null : cityName.trim();
    }

    public Date getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Date expirationTime) {
        this.expirationTime = expirationTime;
    }

    public Float getStar() {
        return star;
    }

    public void setStar(Float star) {
        this.star = star;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone == null ? null : telephone.trim();
    }

    public Integer getAlipaySteup() {
        return alipaySteup;
    }

    public void setAlipaySteup(Integer alipaySteup) {
        this.alipaySteup = alipaySteup;
    }
    
    public Integer getWxpaySteup() {
		return wxpaySteup;
	}

	public void setWxpaySteup(Integer wxpaySteup) {
		this.wxpaySteup = wxpaySteup;
	}

	public Integer getChangeAuditStatus() {
        return changeAuditStatus;
    }

    public void setChangeAuditStatus(Integer changeAuditStatus) {
        this.changeAuditStatus = changeAuditStatus;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Integer getBizLicenseAuthId() {
        return bizLicenseAuthId;
    }

    public void setBizLicenseAuthId(Integer bizLicenseAuthId) {
        this.bizLicenseAuthId = bizLicenseAuthId;
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
    
    public String getWxOpenid() {
		return wxOpenid;
	}

	public void setWxOpenid(String wxOpenid) {
		this.wxOpenid = wxOpenid;
	}
	
	public Integer getMerchantProperty() {
		return merchantProperty;
	}

	public void setMerchantProperty(Integer merchantProperty) {
		this.merchantProperty = merchantProperty;
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