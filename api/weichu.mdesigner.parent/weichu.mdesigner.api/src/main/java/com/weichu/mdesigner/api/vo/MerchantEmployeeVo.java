package com.weichu.mdesigner.api.vo;

import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.weichu.mdesigner.common.entity.MerchantAttachment;

public class MerchantEmployeeVo {
	private Integer id;

	private String fullName;

	private String mobileTelephone;

	private String position;

	private String positionName;

	private String identityCard;

	private String email;

	@JSONField(format = "yyyy-MM-dd")
	private Date birthday;

	private Integer education;

	private String educationName;

	@JSONField(format = "yyyy-MM-dd")
	private Date joinedDate;

	@JSONField(format = "yyyy-MM-dd")
	private Date wokeDate;

	@JSONField(format = "yyyy-MM-dd")
	private Date contractDate;

	private String sex;

	private String sexName;

	private String maritalStatus;

	private String maritalStatusName;

	private String address;

	private Integer merchantId;
	
	private String employeeNo;

	private Integer photoId;
	
	private MerchantAttachment photo;

	private Integer departmentId;

	private String departmentName;
	
	private List<MerchantAttachment> qualificationes;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMobileTelephone() {
		return mobileTelephone;
	}

	public void setMobileTelephone(String mobileTelephone) {
		this.mobileTelephone = mobileTelephone;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public String getIdentityCard() {
		return identityCard;
	}

	public void setIdentityCard(String identityCard) {
		this.identityCard = identityCard;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Integer getEducation() {
		return education;
	}

	public void setEducation(Integer education) {
		this.education = education;
	}

	public String getEducationName() {
		return educationName;
	}

	public void setEducationName(String educationName) {
		this.educationName = educationName;
	}

	public Date getJoinedDate() {
		return joinedDate;
	}

	public void setJoinedDate(Date joinedDate) {
		this.joinedDate = joinedDate;
	}

	public Date getWokeDate() {
		return wokeDate;
	}

	public void setWokeDate(Date wokeDate) {
		this.wokeDate = wokeDate;
	}

	public Date getContractDate() {
		return contractDate;
	}

	public void setContractDate(Date contractDate) {
		this.contractDate = contractDate;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSexName() {
		return sexName;
	}

	public void setSexName(String sexName) {
		this.sexName = sexName;
	}

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	public String getMaritalStatusName() {
		return maritalStatusName;
	}

	public void setMaritalStatusName(String maritalStatusName) {
		this.maritalStatusName = maritalStatusName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}

	public Integer getPhotoId() {
		return photoId;
	}

	public void setPhotoId(Integer photoId) {
		this.photoId = photoId;
	}

	public String getEmployeeNo() {
		return employeeNo;
	}

	public void setEmployeeNo(String employeeNo) {
		this.employeeNo = employeeNo;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public MerchantAttachment getPhoto() {
		return photo;
	}

	public void setPhoto(MerchantAttachment photo) {
		this.photo = photo;
	}

	public List<MerchantAttachment> getQualificationes() {
		return qualificationes;
	}

	public void setQualificationes(List<MerchantAttachment> qualificationes) {
		this.qualificationes = qualificationes;
	}

}
