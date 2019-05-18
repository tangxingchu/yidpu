package com.weichu.mdesigner.api.vo;

import java.math.BigDecimal;

/**
 * 电子优惠券vo类
 * @author Administrator
 *
 */
public class MerchantGoodsCouponVo {
	
	private Integer id;

    private Integer merchantId;

    private BigDecimal consumePrice;

    private String name;

    private BigDecimal amount;

    private Integer count;

    private String description;

    private String enabled;

    private String effectiveTime;
    
    private String effectiveStatus;

    private String expiredTime;
    
    private String expiredStatus;

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

	public BigDecimal getConsumePrice() {
		return consumePrice;
	}

	public void setConsumePrice(BigDecimal consumePrice) {
		this.consumePrice = consumePrice;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
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
    
}
