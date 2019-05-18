package com.weichu.mdesigner.api.vo;

import java.math.BigDecimal;

/**
 * 消费满多少规则1
 * @author Administrator
 *
 */
public class MerchantGoodsSubtractVo {
	
	private Integer id;

    private Integer merchantId;

    private Integer constraintType;
    
    private Integer type;

    private BigDecimal consumePrice;

    private BigDecimal amount1;

    private BigDecimal amount2;

    private BigDecimal discount;

    private String constraintTimeStart;
    
    private String constraintTimeEnd;
    
    private String description;

    private String enabled;

    private String effectiveTime;
    
    private String effectiveStatus;

    private String expiredTime;
    
    private String expiredStatus;
    
    private String remark;

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

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public BigDecimal getConsumePrice() {
		return consumePrice;
	}

	public void setConsumePrice(BigDecimal consumePrice) {
		this.consumePrice = consumePrice;
	}

	public BigDecimal getAmount1() {
		return amount1;
	}

	public void setAmount1(BigDecimal amount1) {
		this.amount1 = amount1;
	}

	public BigDecimal getAmount2() {
		return amount2;
	}

	public void setAmount2(BigDecimal amount2) {
		this.amount2 = amount2;
	}

	public BigDecimal getDiscount() {
		return discount;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEnabled() {
		return enabled;
	}

	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

	public String getEffectiveTime() {
		return effectiveTime;
	}

	public void setEffectiveTime(String effectiveTime) {
		this.effectiveTime = effectiveTime;
	}

	public String getEffectiveStatus() {
		return effectiveStatus;
	}

	public void setEffectiveStatus(String effectiveStatus) {
		this.effectiveStatus = effectiveStatus;
	}

	public String getExpiredTime() {
		return expiredTime;
	}

	public void setExpiredTime(String expiredTime) {
		this.expiredTime = expiredTime;
	}

	public String getExpiredStatus() {
		return expiredStatus;
	}

	public void setExpiredStatus(String expiredStatus) {
		this.expiredStatus = expiredStatus;
	}

	public String getConstraintTimeStart() {
		return constraintTimeStart;
	}

	public void setConstraintTimeStart(String constraintTimeStart) {
		this.constraintTimeStart = constraintTimeStart;
	}

	public String getConstraintTimeEnd() {
		return constraintTimeEnd;
	}

	public void setConstraintTimeEnd(String constraintTimeEnd) {
		this.constraintTimeEnd = constraintTimeEnd;
	}

	public Integer getConstraintType() {
		return constraintType;
	}

	public void setConstraintType(Integer constraintType) {
		this.constraintType = constraintType;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
