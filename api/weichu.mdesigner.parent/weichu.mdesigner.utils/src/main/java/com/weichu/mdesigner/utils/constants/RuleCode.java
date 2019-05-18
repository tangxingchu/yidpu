package com.weichu.mdesigner.utils.constants;

/**
 * 运营规则枚举
 * @author Administrator
 *
 */
public enum RuleCode {
	
	GOODS_DAY(Constants.ENABLED_GOODS_DAY, "每日特价"),
	GOODS_DISCOUNT(Constants.ENABLED_GOODS_DISCOUNT, "商品折扣"),
	GOODS_SUBTRACT(Constants.ENABLED_GOODS_SUBTRACT, "消费满多少(减免/折扣/赠券)"),
	GOODS_COUPON(Constants.ENABLED_GOODS_COUPON, "电子优惠券");
	
	private String code;
	
	private String name;

	private RuleCode(String code, String name) {
		this.code = code;
		this.name = name;
	}
	
	public String getCode() {
		return code;
	}

	public String getName() {
		return this.name;
	}
	
	public static RuleCode lookup(String code) {
		for (RuleCode ruleCode : RuleCode.values()) {
			if (ruleCode.getCode().equals(code)) {
				return ruleCode;
			}
		}
		return null;
	}
	
}
