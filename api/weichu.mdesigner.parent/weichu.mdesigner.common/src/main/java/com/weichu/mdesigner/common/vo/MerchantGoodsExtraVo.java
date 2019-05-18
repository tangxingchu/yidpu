package com.weichu.mdesigner.common.vo;

import java.util.List;

import com.weichu.mdesigner.common.vo.MerchantGoodsExtraItemVo;

/**
 * 商品附属属性vo
 * @author Administrator
 *
 */
public class MerchantGoodsExtraVo {

	private Integer id;

	private Integer extraId;

	private String extraCode;

	private String extraName;

	private Integer goodsId;

	private Integer merchantId;
	
	private List<MerchantGoodsExtraItemVo> items;

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

	public String getExtraCode() {
		return extraCode;
	}

	public void setExtraCode(String extraCode) {
		this.extraCode = extraCode;
	}

	public String getExtraName() {
		return extraName;
	}

	public void setExtraName(String extraName) {
		this.extraName = extraName;
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

	public List<MerchantGoodsExtraItemVo> getItems() {
		return items;
	}

	public void setItems(List<MerchantGoodsExtraItemVo> items) {
		this.items = items;
	}
	
}
