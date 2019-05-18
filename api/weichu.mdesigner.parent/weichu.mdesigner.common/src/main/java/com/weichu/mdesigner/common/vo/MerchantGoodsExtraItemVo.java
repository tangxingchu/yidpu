package com.weichu.mdesigner.common.vo;

import java.math.BigDecimal;

/**
 * 
 * @author Administrator
 *
 */
public class MerchantGoodsExtraItemVo {
	
	private Integer id;

	private Integer extraId;

	private Integer dictItemId;

	private String dictCode;

	private String itemName;

	private String itemValue;

	private Integer goodsId;

	private Integer merchantId;

	private BigDecimal price;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getExtraId() {
		return extraId;
	}

	public void setExtraId(Integer extraId) {
		this.extraId = extraId;
	}

	public Integer getDictItemId() {
		return dictItemId;
	}

	public void setDictItemId(Integer dictItemId) {
		this.dictItemId = dictItemId;
	}

	public String getDictCode() {
		return dictCode;
	}

	public void setDictCode(String dictCode) {
		this.dictCode = dictCode;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemValue() {
		return itemValue;
	}

	public void setItemValue(String itemValue) {
		this.itemValue = itemValue;
	}

	public Integer getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(Integer goodsId) {
		this.goodsId = goodsId;
	}

	public Integer getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

}
