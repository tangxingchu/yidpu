package com.weichu.mdesigner.api.service;

import org.springframework.stereotype.Service;

/**
 * 测试程序未正确处理异常时，aop拦截异常并写入数据库
 * @author Administrator
 *
 */
@Service
public class Service1 {
	
	public void method1() {
		//int a = 5/0;
	}
	
}
