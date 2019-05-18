package com.weichu.mdesigner.auth.entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUser implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	private boolean isChildUser;
	
	// 登录 用户
	private String username;

	private String password;
	
	private int grade;

	private int enabled;

	private int locked;

	private int expired;
	
	private Collection<GrantedAuthority> authorities;

	public SecurityUser(){
		this.enabled = 1;
		this.locked = 0;
		this.expired = 0;
	}
	
	public SecurityUser(User user) {
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.enabled = user.getEnabled();
		this.locked = user.getLocked();
		this.expired = user.getExpired();
	}
	
	public SecurityUser(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
//		Collection<GrantedAuthority> authorities = new ArrayList<>();
//		// 返回用户的权限列表
//		String role = "role-admin";
//		SimpleGrantedAuthority sga = new SimpleGrantedAuthority(role);
//		authorities.add(sga);
		return this.authorities;
	}

	public void setAuthorities(Collection<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.expired == 0;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.locked == 0;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled == 1;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}

	public void setLocked(int locked) {
		this.locked = locked;
	}

	public void setExpired(int expired) {
		this.expired = expired;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public boolean isChildUser() {
		return isChildUser;
	}

	public void setChildUser(boolean isChildUser) {
		this.isChildUser = isChildUser;
	}
	
}
