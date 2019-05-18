package com.weichu.mdesigner.utils.constants;

import java.util.Calendar;

public enum Week {
	
	/** 周一 */
	MONDAY(Calendar.MONDAY, "星期一"),
	/** 周二 */
	TUESDAY(Calendar.TUESDAY, "星期二"),
	/** 周三 */
	WEDNESDAY(Calendar.WEDNESDAY, "星期三"),
	/** 周四 */
	THURSDAY(Calendar.THURSDAY, "星期四"),
	/** 周五 */
	FRIDAY(Calendar.FRIDAY, "星期五"),
	/** 周六 */
	SATURDAY(Calendar.SATURDAY, "星期六"),
	/** 周日 */
	SUNDAY(Calendar.SUNDAY, "星期日");
	
	private int value;
	
	private String name;

	private Week(int value, String name) {
		this.value = value;
		this.name = name;
	}
	
	public int getValue() {
		return this.value;
	}
	
	public String getName() {
		return this.name;
	}
	
	public static Week lookup(int value) {
		for (Week week : Week.values()) {
			if (week.getValue() == value) {
				return week;
			}
		}
		return null;
	}
	
}
