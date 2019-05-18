package com.weichu.mdesigner.utils.constants;

public enum RefundMethod {
	ALIPAY_QRCODE_TABLE(-1, "桌台扫码支付(支)-退款"),
	WECHAT_QRCODE_TABLE(-2, "桌台扫码支付(微)-退款"),
	ALIPAY_QRCODE_FRONT(-3, "前台扫码支付(支)-退款"),
	WECHAT_QRCODE_FRONT(-4, "前台扫码支付(微)-退款"),
	CASH(-5, "现金支付-退款"),
	ALIPAY_TRANSFER(-6, "扫码转账(支)-退款"),
	WECHAT_TRANSFER(-7, "扫码转账(微)-退款"),
	OTHER(-8, "其它-退款"),
	VIP(-9, "会员消费-退款");
	
	private Integer value;
	
	private String name;

	private RefundMethod(Integer value, String name) {
		this.value = value;
		this.name = name;
	}
	
	public Integer getValue() {
		return this.value;
	}
	
	public String getName() {
		return this.name;
	}
	
	public static RefundMethod lookup(Integer value) {
		for (RefundMethod status : RefundMethod.values()) {
			if (status.getValue().equals(value)) {
				return status;
			}
		}
		return null;
	}
}
