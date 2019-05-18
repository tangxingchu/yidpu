package com.weichu.mdesigner.utils.constants;
/**
 * 支付方式
 * @author Administrator
 *
 */
public enum PayMethod {
	
	ALIPAY_QRCODE_TABLE(1, "桌台扫码支付(支)"),
	WECHAT_QRCODE_TABLE(2, "桌台扫码支付(微)"),
	ALIPAY_QRCODE_FRONT(3, "前台扫码支付(支)"),
	WECHAT_QRCODE_FRONT(4, "前台扫码支付(微)"),
	CASH(5, "现金支付"),
	ALIPAY_TRANSFER(6, "扫码转账(支)"),
	WECHAT_TRANSFER(7, "扫码转账(微)"),
	OTHER(8, "其它"),
	VIP(9, "会员消费"),
	VIP_REFUND(-9, "会员消费-退款"),
	PONIT(10, "积分返现"),
	WXPAY(24, "微信扫码支付"),
	ALIPAY(13, "支付宝扫码支付");
	
	private Integer value;
	
	private String name;

	private PayMethod(Integer value, String name) {
		this.value = value;
		this.name = name;
	}
	
	public Integer getValue() {
		return this.value;
	}
	
	public String getName() {
		return this.name;
	}
	
	public static PayMethod lookup(Integer value) {
		for (PayMethod status : PayMethod.values()) {
			if (status.getValue().equals(value)) {
				return status;
			}
		}
		return null;
	}
}
