package com.weichu.mdesigner.businesslogger.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.weichu.mdesigner.utils.rabbitmq.SenderConf;


/**
 * 接收日志(用于测试，要单独弄一个jar包消费日志记录)
 * @author Administrator
 *
 */
@Component
public class LogReceive {
	
	public static final Logger logger = LoggerFactory.getLogger(LogReceive.class);
	
	@RabbitListener(queues = SenderConf.ROUTING_KEY)
	public void processLogQueue(String msg) {
		logger.info(msg);
	}
	
}
