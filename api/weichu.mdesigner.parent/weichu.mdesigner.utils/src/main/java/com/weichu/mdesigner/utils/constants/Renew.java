package com.weichu.mdesigner.utils.constants;

public enum Renew {
	
	ONEMONTH(1, "一个月"),
	TWOMONTH(2, "二个月"),
	THREEMONTH(3, "三个月"),
	SIXMONTH(6, "半年"),
	ONEYEAR(12, "一年");
	
	private int value;
	
	private String name;

	private Renew(int value, String name) {
		this.value = value;
		this.name = name;
	}
	
	public int getValue() {
		return this.value;
	}
	
	public String getName() {
		return this.name;
	}
	
	public static Renew lookup(int value) {
		for (Renew renew : Renew.values()) {
			if (renew.getValue() == value) {
				return renew;
			}
		}
		return null;
	}
	
}
