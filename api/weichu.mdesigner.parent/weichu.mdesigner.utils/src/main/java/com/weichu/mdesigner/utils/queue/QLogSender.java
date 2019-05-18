package com.weichu.mdesigner.utils.queue;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.weichu.mdesigner.utils.log.ILogBackUp;
import com.weichu.mdesigner.utils.log.ILogSender;
import com.weichu.mdesigner.utils.log.entity.SysLogger;

/**
 * 本地日志入库队列
 * @author Administrator
 *
 */
public class QLogSender implements ILogSender, Runnable {
	
	private static final Logger logger = LoggerFactory.getLogger(QLogSender.class);
	
	private BlockingQueue<SysLogger> queue = new LinkedBlockingQueue<SysLogger>();
	
	public QLogSender() {
		new Thread(this).start();
	}
	
	@Autowired
	private ILogBackUp logBackUp;
	
	@Override
	public void sendLog(SysLogger sysLogger) {
		//put 将元素插入此队列的尾部，如果该队列已满，则一直阻塞
		try {
			queue.put(sysLogger);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void run() {
		try {
			while(true) {
				SysLogger sysLogger = queue.take();//take 获取并移除此队列头元素，若没有元素则一直阻塞
				// 日志入库操作
				logger.debug("调用日志入库操作");
				logBackUp.saveSysLogger(sysLogger);
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}
