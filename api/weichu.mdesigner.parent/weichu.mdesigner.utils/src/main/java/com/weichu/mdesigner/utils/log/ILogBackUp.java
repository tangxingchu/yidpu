package com.weichu.mdesigner.utils.log;

import com.weichu.mdesigner.utils.log.entity.SysLogger;

/**
 * 业务日志备份接口
 * @author tangxingchu
 *
 */
public interface ILogBackUp {
	
	public void saveSysLogger(SysLogger sysLogger);
	
}
