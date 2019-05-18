package com.weichu.mdesigner.common.entity;

public class MerchantUserChildrenEmp extends MerchantUserChildren {
	
	private String employeeNo;
	
	private String employeeName;
	
	private String employeePhone;
	
	private Integer effectiveStatus;
	
	private Integer expirationStatus;

	public String getEmployeeNo() {
		return employeeNo;
	}

	public void setEmployeeNo(String employeeNo) {
		this.employeeNo = employeeNo;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEmployeePhone() {
		return employeePhone;
	}

	public void setEmployeePhone(String employeePhone) {
		this.employeePhone = employeePhone;
	}

	public Integer getEffectiveStatus() {
		return effectiveStatus;
	}

	public void setEffectiveStatus(Integer effectiveStatus) {
		this.effectiveStatus = effectiveStatus;
	}

	public Integer getExpirationStatus() {
		return expirationStatus;
	}

	public void setExpirationStatus(Integer expirationStatus) {
		this.expirationStatus = expirationStatus;
	}
	
}
