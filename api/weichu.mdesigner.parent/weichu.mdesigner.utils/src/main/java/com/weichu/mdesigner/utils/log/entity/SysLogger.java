package com.weichu.mdesigner.utils.log.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 系统业务日志类
 * @author Administrator
 *
 */

public class SysLogger implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8713456970870536193L;

	private String ip;
	
	private Integer logType;
	
	private Date logTime;
	
	private String className;
	
	private String methodName;
	
	private String logContent;
	
	private String username;
	
	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Integer getLogType() {
		return logType;
	}

	public void setLogType(Integer logType) {
		this.logType = logType;
	}

	public Date getLogTime() {
		return logTime;
	}

	public void setLogTime(Date logTime) {
		this.logTime = logTime;
	}
	
	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getLogContent() {
		return logContent;
	}

	public void setLogContent(String logContent) {
		this.logContent = logContent;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
}
