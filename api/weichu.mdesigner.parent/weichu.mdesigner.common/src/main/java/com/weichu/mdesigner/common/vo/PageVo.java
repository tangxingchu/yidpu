package com.weichu.mdesigner.common.vo;

import com.alibaba.fastjson.annotation.JSONField;
import com.weichu.mdesigner.utils.constants.Constants;

public class PageVo {

	@JSONField(serialize = false)
	private int pageNum = 1;
    
	@JSONField(serialize = false)
    private int pageSize = Constants.DEFAULT_PAGESIZE;
    
	@JSONField(serialize = false)
    private int startRowNum;
    
    public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getStartRowNum() {
		return (this.pageNum - 1) * this.pageSize;
	}

	public void setStartRowNum(int startRowNum) {
		this.startRowNum = startRowNum;
	}
	
}
