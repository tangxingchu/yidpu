package com.weichu.mdesigner.utils.rabbitmq;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 发送消息队列
 * 
 * @author Administrator
 *
 */
@Configuration
public class SenderConf {

	public static final String ROUTING_KEY = "logQueue";
	
	@Bean
	public Queue queue() {
		return new Queue(ROUTING_KEY);
	}

}
