package com.weichu.mdesigner.common.vo;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MemberChangeHisVo {
	
	private Integer id;
	
    private Integer merchantId;

    private Integer memberId;
	
	private String name;
	
	private String phone;

    private Integer changeType;
    
    private String changeTypeName;

    private String changeDesc;
    
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date changeTime;

    private String beforePhone;

    private String afterPhone;

    private String changeImgPath;

    private String operationStaff;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getChangeType() {
		return changeType;
	}

	public void setChangeType(Integer changeType) {
		this.changeType = changeType;
	}

	public String getChangeTypeName() {
		return changeTypeName;
	}

	public void setChangeTypeName(String changeTypeName) {
		this.changeTypeName = changeTypeName;
	}

	public String getChangeDesc() {
		return changeDesc;
	}

	public void setChangeDesc(String changeDesc) {
		this.changeDesc = changeDesc;
	}

	public Date getChangeTime() {
		return changeTime;
	}

	public void setChangeTime(Date changeTime) {
		this.changeTime = changeTime;
	}

	public String getBeforePhone() {
		return beforePhone;
	}

	public void setBeforePhone(String beforePhone) {
		this.beforePhone = beforePhone;
	}

	public String getAfterPhone() {
		return afterPhone;
	}

	public void setAfterPhone(String afterPhone) {
		this.afterPhone = afterPhone;
	}

	public String getChangeImgPath() {
		return changeImgPath;
	}

	public void setChangeImgPath(String changeImgPath) {
		this.changeImgPath = changeImgPath;
	}

	public String getOperationStaff() {
		return operationStaff;
	}

	public void setOperationStaff(String operationStaff) {
		this.operationStaff = operationStaff;
	}
    
}
