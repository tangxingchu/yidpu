package com.weichu.mdesigner.api.vo;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantCashierLogVo {
	private Integer id;

    private Integer merchantId;

    private String tableCode;

    private BigDecimal cashierAmount;
    
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date cashierTime;

    private Integer cashierMethod;
    
    private String cashierMethodName;

    private String orderNo;

    private Integer cashierType;
    
    private String cashierTypeName;

    private Integer cashierSource;
    
    private String cashierSourceName;

    private String remark;

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

	public String getTableCode() {
		return tableCode;
	}

	public void setTableCode(String tableCode) {
		this.tableCode = tableCode;
	}

	public BigDecimal getCashierAmount() {
		return cashierAmount;
	}

	public void setCashierAmount(BigDecimal cashierAmount) {
		this.cashierAmount = cashierAmount;
	}

	public Date getCashierTime() {
		return cashierTime;
	}

	public void setCashierTime(Date cashierTime) {
		this.cashierTime = cashierTime;
	}

	public Integer getCashierMethod() {
		return cashierMethod;
	}

	public void setCashierMethod(Integer cashierMethod) {
		this.cashierMethod = cashierMethod;
	}

	public String getCashierMethodName() {
		return cashierMethodName;
	}

	public void setCashierMethodName(String cashierMethodName) {
		this.cashierMethodName = cashierMethodName;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getCashierType() {
		return cashierType;
	}

	public void setCashierType(Integer cashierType) {
		this.cashierType = cashierType;
	}

	public String getCashierTypeName() {
		return cashierTypeName;
	}

	public void setCashierTypeName(String cashierTypeName) {
		this.cashierTypeName = cashierTypeName;
	}

	public Integer getCashierSource() {
		return cashierSource;
	}

	public void setCashierSource(Integer cashierSource) {
		this.cashierSource = cashierSource;
	}

	public String getCashierSourceName() {
		return cashierSourceName;
	}

	public void setCashierSourceName(String cashierSourceName) {
		this.cashierSourceName = cashierSourceName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getOperationStaff() {
		return operationStaff;
	}

	public void setOperationStaff(String operationStaff) {
		this.operationStaff = operationStaff;
	}
    
}
