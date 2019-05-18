package com.weichu.mdesigner.api.param;

import java.util.List;

/**
 * 购物车明细
 * 
 * @author Administrator
 *
 */
public class CartItem {

	private int goodsId;// 商品id

	private int num;// 订购数量

	private int uId;// 用户id

	private String tableCode; // 桌台编号

	private String remark;// 备注
	
	private List<ExtraItem> extraItems;

	public int getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(int goodsId) {
		this.goodsId = goodsId;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public int getuId() {
		return uId;
	}

	public void setuId(int uId) {
		this.uId = uId;
	}

	public String getTableCode() {
		return tableCode;
	}

	public void setTableCode(String tableCode) {
		this.tableCode = tableCode;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public List<ExtraItem> getExtraItems() {
		return extraItems;
	}

	public void setExtraItems(List<ExtraItem> extraItems) {
		this.extraItems = extraItems;
	}
	
}
