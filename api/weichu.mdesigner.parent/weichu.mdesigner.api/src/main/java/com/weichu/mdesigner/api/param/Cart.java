package com.weichu.mdesigner.api.param;

import java.util.List;

/**
 * 购物车对象
 * @author Administrator
 *
 */
public class Cart {
	
	//渠道id
	private Integer channelId;
	
	//下单方式
	private Integer orderMethod;
	
	//商家id，用户app下单时，需要带上商家id
	private Integer merchantId;
	
	private List<CartItem> cartItem;
	
	//桌台编号
	private String tableCode;
	
	//桌台状态
	private Integer tableStatus;
	
	//用餐人数
	private Integer dinersNum;
	
	//餐牌号
	private String seqNumber;
	
	//微信openid
	private String openid;
	
	//支付宝buyerid
	private String buyerId;
	
	//备注
	private String remark;

	public Integer getChannelId() {
		return channelId;
	}

	public void setChannelId(Integer channelId) {
		this.channelId = channelId;
	}
	
	public Integer getOrderMethod() {
		return orderMethod;
	}

	public void setOrderMethod(Integer orderMethod) {
		this.orderMethod = orderMethod;
	}

	public Integer getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}

	public List<CartItem> getCartItem() {
		return cartItem;
	}

	public void setCartItem(List<CartItem> cartItem) {
		this.cartItem = cartItem;
	}
	
	public String getSeqNumber() {
		return seqNumber;
	}

	public void setSeqNumber(String seqNumber) {
		this.seqNumber = seqNumber;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public Integer getDinersNum() {
		return dinersNum;
	}

	public void setDinersNum(Integer dinersNum) {
		this.dinersNum = dinersNum;
	}

	public Integer getTableStatus() {
		return tableStatus;
	}

	public void setTableStatus(Integer tableStatus) {
		this.tableStatus = tableStatus;
	}

	public String getTableCode() {
		return tableCode;
	}

	public void setTableCode(String tableCode) {
		this.tableCode = tableCode;
	}
	
}
