package com.weichu.mdesigner.utils.log;

import com.weichu.mdesigner.utils.log.entity.SysLogger;

/**
 * 日志发送接口
 * 开发模式 使用本地queue
 * 生产模式 使用rabbitmq
 * @author Administrator
 *
 */
public interface ILogSender {
	
	public void sendLog(SysLogger sysLogger);
	
}
