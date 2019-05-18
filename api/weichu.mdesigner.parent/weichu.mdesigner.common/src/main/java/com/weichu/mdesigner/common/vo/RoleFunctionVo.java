package com.weichu.mdesigner.common.vo;

import java.util.List;

/**
 * 授权界面， 功能菜单显示vo
 * @author Administrator
 *
 */
public class RoleFunctionVo {
	
	private Integer functionId;
	
	private String functionName;
	
	private String functionCode;
	
	private Integer grade;
	
	private String gradeName;
	
	private Integer parentId;
	
	private List<RoleFunctionVo> children;
	
	private boolean disabled;

	public Integer getFunctionId() {
		return functionId;
	}

	public void setFunctionId(Integer functionId) {
		this.functionId = functionId;
	}

	public String getFunctionName() {
		return functionName;
	}

	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public String getGradeName() {
		return gradeName;
	}

	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}
	
	public List<RoleFunctionVo> getChildren() {
		return children;
	}

	public void setChildren(List<RoleFunctionVo> children) {
		this.children = children;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getFunctionCode() {
		return functionCode;
	}

	public void setFunctionCode(String functionCode) {
		this.functionCode = functionCode;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	
}
