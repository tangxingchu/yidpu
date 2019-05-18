package com.weichu.mdesigner.auth.vo;

/**
 * 登录校验vo类
 * @author tangxingchu
 *
 */
public class UserVo {
	
	private String username;
	
	private String password;
	
	private Integer platform;
	
	//验证码
	private String code;
	
	//时间戳
	private String time;

	public UserVo() {
		super();
	}

	public UserVo(String username, String password, String code, String time) {
		super();
		this.username = username;
		this.password = password;
		this.code = code;
		this.time = time;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Integer getPlatform() {
		return platform;
	}

	public void setPlatform(Integer platform) {
		this.platform = platform;
	}
	
	
}
