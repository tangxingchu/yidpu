package com.weichu.mdesigner.common.vo;

public class LogVo {
	
	private String startLogTime;
	
	private String endLogTime;
	
	private String className;
	
	private String methodName;

	public LogVo() {
		super();
	}

	public String getStartLogTime() {
		return startLogTime;
	}

	public void setStartLogTime(String startLogTime) {
		this.startLogTime = startLogTime;
	}

	public String getEndLogTime() {
		return endLogTime;
	}

	public void setEndLogTime(String endLogTime) {
		this.endLogTime = endLogTime;
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
	
	
}
