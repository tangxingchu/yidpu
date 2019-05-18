package com.weichu.mdesigner.utils.constants;

/**
 * 订单状态
 * @author tangxingchu
 *
 */
public enum OrderStatus {
	
	TOBECOMMIT("0", "待确认"),
	NO_PAYMENT("1", "待支付"),
	DEPOSIT("2", "预付定金"),
	PAYMENT("3", "已支付"),
	SHIPPED("4", "已上菜"),
	REFUND("5", "申请退款"),
	REFUNDING("6", "退款中"),
	REFUNDDONE("7", "退款成功"),
	COMPLETE("8", "交易成功"),
	CANCEL("9", "交易取消"),
	CLOSED("10", "交易关闭"),
	REFUND_PART("11", "部分退款"),
	LOCKED("-1", "支付异常");
	
	private String value;
	
	private String name;

	private OrderStatus(String value, String name) {
		this.value = value;
		this.name = name;
	}
	
	public String getValue() {
		return this.value;
	}
	
	public String getName() {
		return this.name;
	}
	
	public static OrderStatus lookup(String value) {
		for (OrderStatus status : OrderStatus.values()) {
			if (status.getValue().equals(value)) {
				return status;
			}
		}
		return null;
	}
	
}
