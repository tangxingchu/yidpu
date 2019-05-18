package com.weichu.mdesigner.utils.constants;

public enum MemberChangeType {
	
	PHONE_CHANGE(1, "手机号码变更"),
	FREEZE(2, "冻结"),
	UNFREEZE(3, "解冻"),
	DELETE(4, "删除会员"),
	RECOVER(5, "恢复会员信息"),
	POINTCASH(6, "积分返现"),
	POINTGIFT(7, "兑换礼品");
	
	private Integer value;
	
	private String name;

	private MemberChangeType(Integer value, String name) {
		this.value = value;
		this.name = name;
	}
	
	public Integer getValue() {
		return this.value;
	}
	
	public String getName() {
		return this.name;
	}
	
	public static MemberChangeType lookup(Integer value) {
		for (MemberChangeType status : MemberChangeType.values()) {
			if (status.getValue().equals(value)) {
				return status;
			}
		}
		return null;
	}
	
}
