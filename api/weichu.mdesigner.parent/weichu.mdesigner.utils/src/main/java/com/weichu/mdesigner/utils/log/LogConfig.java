package com.weichu.mdesigner.utils.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.weichu.mdesigner.utils.queue.QLogSender;
import com.weichu.mdesigner.utils.rabbitmq.MQLogSender;

/**
 * 业务日志配置
 * @author Administrator
 *
 */
@Component
public class LogConfig {
	
	private static final Logger logger = LoggerFactory.getLogger(LogConfig.class);
	
	@Value("${business.log.method}")
	private Integer logMethod;
	
	@Value("${business.log.enabled}")
	private boolean enabledLog;
	
	private static final Integer LOCAL_METHOD = 1;//表示本地queue入库
	private static final Integer MQ_METHOD = 2;//表示mq方式入库
	
	@Bean
	public ILogSender logSender() {
		if(enabledLog) {//未捕获的异常信息不入库日志表，查看日志文件
			if(logMethod == LOCAL_METHOD) {
				logger.debug("启用本地队列入库业务日志");
				return new QLogSender();
			} else if(logMethod == MQ_METHOD) {
				logger.debug("启用rabbitmq队列入库业务日志");
				return new MQLogSender();
			}
			return null;
		} else {
			return null;
		}		
	}

}
