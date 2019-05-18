package com.weichu.mdesigner.api.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Table;

/**
 * 会员信息实体
 * @author Administrator
 *
 */
@Table(name = "member_user")
public class Member implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id; //主键ID
	
	private String nickname;	//昵称
	
	private String phone;	//电话
	
	private int avtarId;	//头像ID(关联附件表的ID)
	
	private String password; //密码
	
	private int sex; //性别(字典)
	
	private int platform; //平台（第三方登录平台）
	
	private String extra;	//扩展信息（json格式）
	
	private int status;	//会员状态
	
	private Date lastLoginTime;	//最后登录时间
	
	private int countryId;	//国家id
	
	private int provinceId;	//省份id
	
	private int cityId;	//城市id
	
	private double lon;	//经度
	
	private double lat;	//纬度
	
	private Date registerTime; //注册时间
	
	private Date birthday;	//出生日期
	
	private int rank;	//等级
	
	private float point;	//积分
	
	private Date createTime;	//记录创建时间

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public int getAvtarId() {
		return avtarId;
	}

	public void setAvtarId(int avtarId) {
		this.avtarId = avtarId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public int getPlatform() {
		return platform;
	}

	public void setPlatform(int platform) {
		this.platform = platform;
	}

	public String getExtra() {
		return extra;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	public int getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

	public int getProvinceId() {
		return provinceId;
	}

	public void setProvinceId(int provinceId) {
		this.provinceId = provinceId;
	}

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public Date getRegisterTime() {
		return registerTime;
	}

	public void setRegisterTime(Date registerTime) {
		this.registerTime = registerTime;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}

	public float getPoint() {
		return point;
	}

	public void setPoint(float point) {
		this.point = point;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}
