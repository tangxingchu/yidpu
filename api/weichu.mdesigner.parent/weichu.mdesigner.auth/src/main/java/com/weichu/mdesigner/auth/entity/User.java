package com.weichu.mdesigner.auth.entity;

import java.io.Serializable;

/**
 * 能登录的用户身份基础类(有会员登录、商家登录、后台管理员登录。)
 * @author tangxingchu
 *
 */
public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String username;

	private String phone;

	private String password;

	private int enabled;

	private int locked;

	private int expired;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getEnabled() {
		return enabled;
	}

	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}

	public int getLocked() {
		return locked;
	}

	public void setLocked(int locked) {
		this.locked = locked;
	}

	public int getExpired() {
		return expired;
	}

	public void setExpired(int expired) {
		this.expired = expired;
	}

}
