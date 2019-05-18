package com.weichu.mdesigner.api.vo;

import java.util.List;

/**
 * 首页界面侧边栏菜单vo类
 * 
 * @author Administrator
 *
 */
public class MerchantFunctionVo {

	private Integer id;

	private String name;

	private String icon;

	private String path;

	private String[] authority;

	private String grade;

	private String target;

	private List<MerchantFunctionVo> children;

	public MerchantFunctionVo() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String[] getAuthority() {
		return authority;
	}

	public void setAuthority(String[] authority) {
		this.authority = authority;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public List<MerchantFunctionVo> getChildren() {
		return children;
	}

	public void setChildren(List<MerchantFunctionVo> children) {
		this.children = children;
	}

}
