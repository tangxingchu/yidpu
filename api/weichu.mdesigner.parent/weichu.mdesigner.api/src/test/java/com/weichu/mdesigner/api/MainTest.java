package com.weichu.mdesigner.api;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.alibaba.fastjson.JSONArray;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.exception.PaymentException;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.xiaoleilu.hutool.date.DatePattern;

public class MainTest {

	public static void main(String[] args) {
		StringBuilder sb = new StringBuilder();
		System.out.print(sb.toString());
//		System.out.println(Integer.parseInt(sb.toString()));
		JSONArray a = new JSONArray();
		a.add("a01");
		a.add("a02");
		System.out.println(a.toJSONString());
		
		List<String> strList = new ArrayList<>();
		strList.add("a");
		strList.add("b");
		strList.add("c");
		
		strList= strList.stream().filter(item -> !item.equals("b")).collect(Collectors.toList());
		
		strList.forEach(item -> System.out.println(item));
		
		
		BigDecimal bd = new BigDecimal("89.");
		System.out.println(bd.floatValue());
		
		byte[] ascii = "11abcdefg".getBytes();
		System.out.println((char)ascii[0]);
		System.out.println(Arrays.toString(ascii));
		Date now = new Date();
		Calendar noonCal = DateUtil.calendar(now);
		noonCal.set(Calendar.HOUR_OF_DAY, 9);
		noonCal.set(Calendar.MINUTE, 0);
		noonCal.set(Calendar.SECOND, 0);
		Date noonBeginOrderTime = noonCal.getTime();
		noonCal.set(Calendar.HOUR_OF_DAY, 15);
		Date noonEndOrderTime = noonCal.getTime();
		noonCal.set(Calendar.HOUR_OF_DAY, 24);
		Date noonEndOrderTime2 = noonCal.getTime();
		System.out.println(DateUtil.format(noonBeginOrderTime, DatePattern.NORM_DATETIME_PATTERN));
		System.out.println(DateUtil.format(noonEndOrderTime, DatePattern.NORM_DATETIME_PATTERN));
		System.out.println(DateUtil.format(noonEndOrderTime2, DatePattern.NORM_DATETIME_PATTERN));
		System.out.println(DateUtil.format(now, DatePattern.NORM_DATETIME_PATTERN));
		
		 DecimalFormat df1 = new DecimalFormat("##.00%");    //##.00%   百分比格式，后面不足2位的用0补齐
		 
		 BigDecimal bd222 = new BigDecimal("1.80");
		 System.out.println(bd222.intValue());
		 
		 try {
			test();
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
		 System.out.println(String.valueOf((int)(Math.random() * 900000 + 100000)));
	}
	
	public static void testPaymentException() throws PaymentException {
		throw new PaymentException("支付异常");
	}
	
	public static void testYdpException() throws YdpException {
		throw new YdpException("一点谱异常");
	}
	
	public static void testException() throws Exception {
		throw new Exception("异常exception");
	}
	
	public static void test() throws Exception {
		try {
			testPaymentException();
			testYdpException();
			testException();
		} catch(YdpException e) {
			System.out.println("ydpexcetion");
		} catch(PaymentException e) {
			System.out.println("PaymentException");
		}
		
	}
	
}
