package com.weichu.mdesigner.common.vo;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MemberRecordVo {
	
	private String phone;
	
	private String name;
	
	private Integer id;

    private Integer merchantId;

    private Integer memberId;

    private BigDecimal priceAmount;

    private Integer recordType;

    private String recordTypeName;
    
    private Integer payMethod;

    private String payMethodName;
    
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date recordTime;

    private BigDecimal couponPrice;

    private BigDecimal pointPrice;

    private Integer consumePoint;

    private BigDecimal givePrice;

    private BigDecimal recordBalance;

    private String recordDesc;

    private String operationStaff;
    
    @JSONField(serialize = false)
    private Date createTime;

    @JSONField(serialize = false)
    private Date modifyTime;
    
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

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

	public BigDecimal getPriceAmount() {
		return priceAmount;
	}

	public void setPriceAmount(BigDecimal priceAmount) {
		this.priceAmount = priceAmount;
	}

	public Integer getRecordType() {
		return recordType;
	}

	public void setRecordType(Integer recordType) {
		this.recordType = recordType;
	}

	public String getRecordTypeName() {
		return recordTypeName;
	}

	public void setRecordTypeName(String recordTypeName) {
		this.recordTypeName = recordTypeName;
	}

	public Integer getPayMethod() {
		return payMethod;
	}

	public void setPayMethod(Integer payMethod) {
		this.payMethod = payMethod;
	}

	public String getPayMethodName() {
		return payMethodName;
	}

	public void setPayMethodName(String payMethodName) {
		this.payMethodName = payMethodName;
	}

	public Date getRecordTime() {
		return recordTime;
	}

	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}

	public BigDecimal getCouponPrice() {
		return couponPrice;
	}

	public void setCouponPrice(BigDecimal couponPrice) {
		this.couponPrice = couponPrice;
	}

	public BigDecimal getPointPrice() {
		return pointPrice;
	}

	public void setPointPrice(BigDecimal pointPrice) {
		this.pointPrice = pointPrice;
	}

	public Integer getConsumePoint() {
		return consumePoint;
	}

	public void setConsumePoint(Integer consumePoint) {
		this.consumePoint = consumePoint;
	}

	public BigDecimal getGivePrice() {
		return givePrice;
	}

	public void setGivePrice(BigDecimal givePrice) {
		this.givePrice = givePrice;
	}

	public BigDecimal getRecordBalance() {
		return recordBalance;
	}

	public void setRecordBalance(BigDecimal recordBalance) {
		this.recordBalance = recordBalance;
	}

	public String getRecordDesc() {
		return recordDesc;
	}

	public void setRecordDesc(String recordDesc) {
		this.recordDesc = recordDesc;
	}

	public String getOperationStaff() {
		return operationStaff;
	}

	public void setOperationStaff(String operationStaff) {
		this.operationStaff = operationStaff;
	}
    
}
