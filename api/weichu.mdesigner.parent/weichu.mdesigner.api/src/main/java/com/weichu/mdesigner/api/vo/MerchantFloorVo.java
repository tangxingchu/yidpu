package com.weichu.mdesigner.api.vo;

import java.util.List;

public class MerchantFloorVo {
	
	private Integer id;

    private String floorName;
    
    private Integer status;
    
    private List<MerchantTableVo> tableVos;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFloorName() {
		return floorName;
	}

	public void setFloorName(String floorName) {
		this.floorName = floorName;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public List<MerchantTableVo> getTableVos() {
		return tableVos;
	}

	public void setTableVos(List<MerchantTableVo> tableVos) {
		this.tableVos = tableVos;
	}
	
}
