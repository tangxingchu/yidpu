package com.weichu.mdesigner.api.vo;

public class MerchantTableVo {
	
	private Integer id;

    private Integer merchantId;

    private String tableCode;

    private Integer tableClass;

    private String tableName;   
    
    private Integer tableLimit;
    
    private String tableLimitName;

    private String tableDescription;
    
    private String orderNo;
    
    private String outTradeNo;
    
    private boolean merged;

    private Integer floorId;
	
    private String floorName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}

	public String getTableCode() {
		return tableCode;
	}

	public void setTableCode(String tableCode) {
		this.tableCode = tableCode;
	}

	public Integer getTableClass() {
		return tableClass;
	}

	public void setTableClass(Integer tableClass) {
		this.tableClass = tableClass;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public Integer getTableLimit() {
		return tableLimit;
	}

	public void setTableLimit(Integer tableLimit) {
		this.tableLimit = tableLimit;
	}

	public String getTableLimitName() {
		return tableLimitName;
	}

	public void setTableLimitName(String tableLimitName) {
		this.tableLimitName = tableLimitName;
	}

	public String getTableDescription() {
		return tableDescription;
	}

	public void setTableDescription(String tableDescription) {
		this.tableDescription = tableDescription;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	
	public String getOutTradeNo() {
		return outTradeNo;
	}

	public void setOutTradeNo(String outTradeNo) {
		this.outTradeNo = outTradeNo;
	}

	public boolean isMerged() {
		return merged;
	}

	public void setMerged(boolean merged) {
		this.merged = merged;
	}

	public Integer getFloorId() {
		return floorId;
	}

	public void setFloorId(Integer floorId) {
		this.floorId = floorId;
	}

	public String getFloorName() {
		return floorName;
	}

	public void setFloorName(String floorName) {
		this.floorName = floorName;
	}
    
}
