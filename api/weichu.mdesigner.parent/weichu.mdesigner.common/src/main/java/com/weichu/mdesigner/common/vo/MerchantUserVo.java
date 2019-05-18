package com.weichu.mdesigner.common.vo;

import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.common.entity.MerchantImage;

/**
 * 商家信息vo
 * @author Administrator
 *
 */
public class MerchantUserVo {
	
	private Integer id;

    private String merchantName;

    private String merchantCode;

    private String businessLicenceNo;
    
    private Integer businessPhotoId;

    private Integer businessCategory;

    private String phone;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date registerTime;

    private String address;

    private Double lon;

    private Double lat;

    private Integer grade;

    private Integer enabled;

    private Integer locked;

    private Integer merchantStatus;//商家状态

    private Integer operatingStatus;//营业状态(0=歇业中,1=营业中)
    
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
    
    private MerchantAttachment bizAuth;//商家签约支付宝授权函
    
    private String logoPath;
    
    private String remark;
    
    private String wxOpenid;

    private Integer merchantProperty;
    
    private Double distance;
    
    private List<MerchantAttachment> yyzzs;//营业执照
    
    private List<MerchantImage> photos;//商铺照片
    
    private MerchantImage defaultImage; //商家默认图片

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
		this.merchantName = merchantName;
	}

	public String getMerchantCode() {
		return merchantCode;
	}

	public void setMerchantCode(String merchantCode) {
		this.merchantCode = merchantCode;
	}
	
	public String getBusinessLicenceNo() {
		return businessLicenceNo;
	}

	public void setBusinessLicenceNo(String businessLicenceNo) {
		this.businessLicenceNo = businessLicenceNo;
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
		this.phone = phone;
	}

	public Date getRegisterTime() {
		return registerTime;
	}

	public void setRegisterTime(Date registerTime) {
		this.registerTime = registerTime;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	public String getCityCode() {
		return cityCode;
	}

	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
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
		this.telephone = telephone;
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
		this.email = email;
	}

	public Integer getBizLicenseAuthId() {
		return bizLicenseAuthId;
	}

	public void setBizLicenseAuthId(Integer bizLicenseAuthId) {
		this.bizLicenseAuthId = bizLicenseAuthId;
	}

	public MerchantAttachment getBizAuth() {
		return bizAuth;
	}

	public void setBizAuth(MerchantAttachment bizAuth) {
		this.bizAuth = bizAuth;
	}

	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public Double getDistance() {
		return distance;
	}

	public void setDistance(Double distance) {
		this.distance = distance;
	}

	public List<MerchantAttachment> getYyzzs() {
		return yyzzs;
	}

	public void setYyzzs(List<MerchantAttachment> yyzzs) {
		this.yyzzs = yyzzs;
	}

	public List<MerchantImage> getPhotos() {
		return photos;
	}

	public void setPhotos(List<MerchantImage> photos) {
		this.photos = photos;
	}

	public MerchantImage getDefaultImage() {
		return defaultImage;
	}

	public void setDefaultImage(MerchantImage defaultImage) {
		this.defaultImage = defaultImage;
	}
	
}
