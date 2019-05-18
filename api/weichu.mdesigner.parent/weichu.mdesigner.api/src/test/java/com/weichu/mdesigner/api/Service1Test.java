package com.weichu.mdesigner.api;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.weichu.mdesigner.api.service.Service1;

/**
 * 测试spring aop 的异常通知
 * @author Administrator
 *
 */
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class Service1Test {
	
	public static final Logger logger = LoggerFactory.getLogger(Service1Test.class);
	
	@Autowired
	private Service1 service;
	
//	@Test
	public void test1() {
		service.method1();
	}
	
}
