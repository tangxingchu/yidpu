package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantGoods {
    private Integer id;

    private Integer merchantId;

    private String name;

    private String piny;

    private Integer unit;

    private BigDecimal costPrice;

    private BigDecimal price;

    private Integer inventory;
    
    @JSONField(serialize = false)
    private Integer enabledWaring;

    @JSONField(serialize = false)
    private Integer warningValue;

    private Integer category;

    private Integer status;

    private Integer salesNum;
    
    private String description;
    
    private Integer printerId;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getPiny() {
        return piny;
    }

    public void setPiny(String piny) {
        this.piny = piny == null ? null : piny.trim();
    }

    public Integer getUnit() {
        return unit;
    }

    public void setUnit(Integer unit) {
        this.unit = unit;
    }

    public BigDecimal getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }
    
    public Integer getEnabledWaring() {
		return enabledWaring;
	}

	public void setEnabledWaring(Integer enabledWaring) {
		this.enabledWaring = enabledWaring;
	}

	public Integer getWarningValue() {
		return warningValue;
	}

	public void setWarningValue(Integer warningValue) {
		this.warningValue = warningValue;
	}

	public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    
    public Integer getSalesNum() {
		return salesNum;
	}

	public void setSalesNum(Integer salesNum) {
		this.salesNum = salesNum;
	}

	public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Integer getPrinterId() {
		return printerId;
	}

	public void setPrinterId(Integer printerId) {
		this.printerId = printerId;
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