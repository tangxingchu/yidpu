package com.weichu.mdesigner.utils;

import java.util.Calendar;
import java.util.Date;

import com.xiaoleilu.hutool.date.DateTime;

public class DateUtil extends com.xiaoleilu.hutool.date.DateUtil {
	
	public static DateTime endOfDayMysql(Date date) {
		return new DateTime(endOfDayMysql(calendar(date)));
	}
	
	/**
	 * 获取某天的结束时间
	 * 
	 * @param calendar 日期 {@link Calendar}
	 * @return {@link Calendar}
	 */
	public static Calendar endOfDayMysql(Calendar calendar) {
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar;
	}
	
}
