package com.weichu.mdesigner.utils.rabbitmq;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import com.weichu.mdesigner.utils.log.ILogSender;
import com.weichu.mdesigner.utils.log.entity.SysLogger;

/**
 * MQ业务入库
 * @author Administrator
 *
 */
public class MQLogSender implements ILogSender {
	
	@Autowired
	private AmqpTemplate amqpTemplate;
	
	@Override
	public void sendLog(SysLogger sysLogger) {
		amqpTemplate.convertAndSend(SenderConf.ROUTING_KEY, sysLogger);
	}
	
}
