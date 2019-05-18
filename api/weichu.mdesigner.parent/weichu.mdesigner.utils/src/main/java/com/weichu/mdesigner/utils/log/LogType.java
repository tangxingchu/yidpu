package com.weichu.mdesigner.utils.log;

/**
 * 业务日志类型
 * 
 * @author Administrator
 *
 */
public enum LogType {

	SPACE(0, "未定义"), LOGIN(1, "登录"), INSERT(2, "增加"), DELETE(3, "删除"), UPDATE(4, "修改"), QUERY(5, "查询"), ERROR(6, "异常"), SMS(7, "SMS");

	private int code;
	private String description;

	private LogType(int code, String description) {
		this.code = code;
		this.description = description;
	}

	public String getDescription() {
		return "" + this.code + " " + this.description;
	}

	public int getCode() {
		return this.code;
	}

	public static LogType lookup(int code) {
		for (LogType status : LogType.values()) {
			if (status.getCode() == code) {
				return status;
			}
		}
		return null;
	}

}
