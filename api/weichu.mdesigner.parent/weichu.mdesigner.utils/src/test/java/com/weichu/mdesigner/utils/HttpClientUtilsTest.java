package com.weichu.mdesigner.utils;

public class HttpClientUtilsTest {
	
	public static void main(String[] args) {
		String result = com.xiaoleilu.hutool.http.HttpUtil.get("http://127.0.0.1:8082/login");
		
		System.out.println(result);
	}
	
}
