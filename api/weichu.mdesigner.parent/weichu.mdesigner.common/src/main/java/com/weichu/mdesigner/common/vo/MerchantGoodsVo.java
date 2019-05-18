package com.weichu.mdesigner.common.vo;

import java.math.BigDecimal;
import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.weichu.mdesigner.common.entity.MerchantGoodsImage;

public class MerchantGoodsVo extends PageVo {
	
	private Integer id;

    private Integer merchantId;

    private String name;

    private String piny;
    
    private Integer unit;
    
    private String unitName;

    private BigDecimal costPrice;

    private BigDecimal price;

    private Integer inventory;
    
    @JSONField(serialize = false)
    private Integer enabledWaring;

    @JSONField(serialize = false)
    private Integer warningValue;

    private Integer category;
    
    private Integer[] categories;
    
    private String categoryName;

    private String description;
    
    private Integer status;
    
    private Integer salesNum;
    
    private Integer printerId;
    
    private List<MerchantGoodsImage> images;
    
    private String defaultImagePath;
    
    private int defaultImage;
    
    private List<MerchantGoodsExtraVo> goodsExtraVos;
    
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
		this.name = name;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<MerchantGoodsImage> getImages() {
		return images;
	}

	public void setImages(List<MerchantGoodsImage> images) {
		this.images = images;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getDefaultImagePath() {
		return defaultImagePath;
	}

	public void setDefaultImagePath(String defaultImagePath) {
		this.defaultImagePath = defaultImagePath;
	}

	public int getDefaultImage() {
		return defaultImage;
	}

	public void setDefaultImage(int defaultImage) {
		this.defaultImage = defaultImage;
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
	
	public Integer getPrinterId() {
		return printerId;
	}

	public void setPrinterId(Integer printerId) {
		this.printerId = printerId;
	}

	public Integer[] getCategories() {
		return categories;
	}

	public void setCategories(Integer[] categories) {
		this.categories = categories;
	}

	public String getPiny() {
		return piny;
	}

	public void setPiny(String piny) {
		this.piny = piny;
	}

	public List<MerchantGoodsExtraVo> getGoodsExtraVos() {
		return goodsExtraVos;
	}

	public void setGoodsExtraVos(List<MerchantGoodsExtraVo> goodsExtraVos) {
		this.goodsExtraVos = goodsExtraVos;
	}
	
}
