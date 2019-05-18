package com.weichu.mdesigner.utils.rabbitmq;

import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * rabbit mq的链接配置
 * 
 * @author tangxingchu
 * @date 2017-12-21
 */
@Configuration
public class AmqpConfig {
	
	@Value("${rabbitmq.addresses}")
	private String addresses;
	
	@Value("${rabbitmq.username}")
	private String username;
	
	@Value("${rabbitmq.password}")
	private String password;
	
	@Value("${rabbitmq.virtualHost}")
	private String virtualHost;
	
	@Bean
	public ConnectionFactory connectionFactory() {
		CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
		connectionFactory.setAddresses(addresses);
		connectionFactory.setUsername(username);
		connectionFactory.setPassword(password);
		connectionFactory.setVirtualHost(virtualHost);
		//connectionFactory.setPublisherConfirms(true); // 必须要设置
		return connectionFactory;
	}

}
