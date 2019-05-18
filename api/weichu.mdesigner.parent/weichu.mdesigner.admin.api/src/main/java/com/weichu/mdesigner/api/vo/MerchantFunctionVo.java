package com.weichu.mdesigner.api.vo;

import java.util.List;

public class MerchantFunctionVo {
	
	private Integer id;

    private String functionName;

    private String functionCode;

    private String functionUri;

    private Integer functionType;

    private Integer functionCategory;

    private Integer parentId;

    private Integer grade;
    
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

	public String getFunctionName() {
		return functionName;
	}

	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}

	public String getFunctionCode() {
		return functionCode;
	}

	public void setFunctionCode(String functionCode) {
		this.functionCode = functionCode;
	}

	public String getFunctionUri() {
		return functionUri;
	}

	public void setFunctionUri(String functionUri) {
		this.functionUri = functionUri;
	}

	public Integer getFunctionType() {
		return functionType;
	}

	public void setFunctionType(Integer functionType) {
		this.functionType = functionType;
	}

	public Integer getFunctionCategory() {
		return functionCategory;
	}

	public void setFunctionCategory(Integer functionCategory) {
		this.functionCategory = functionCategory;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public List<MerchantFunctionVo> getChildren() {
		return children;
	}

	public void setChildren(List<MerchantFunctionVo> children) {
		this.children = children;
	}
    
    
	
}
