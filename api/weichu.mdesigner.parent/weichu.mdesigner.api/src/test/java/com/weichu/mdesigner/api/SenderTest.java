package com.weichu.mdesigner.api;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.weichu.mdesigner.utils.log.entity.SysLogger;
import com.weichu.mdesigner.utils.rabbitmq.MQLogSender;

/**
 * 测试rabbitmq发送日志
 * @author Administrator
 *
 */
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SenderTest {
	
	@Autowired
	private MQLogSender mQLogSender;
	
//	@Test
	public void send() {
		mQLogSender.sendLog(new SysLogger());
	}
	
}
