package com.weichu.mdesigner.api.vo;

import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantQueueVo {
	
	private Integer id;

    private String queueName;

    private String queueCode;

    private Integer averageWaitTime;

    private Integer totalNumber;

    private Integer merchantId;

    private String description;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    
    private List<MerchantTableVo> tables;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getQueueName() {
		return queueName;
	}

	public void setQueueName(String queueName) {
		this.queueName = queueName;
	}

	public String getQueueCode() {
		return queueCode;
	}

	public void setQueueCode(String queueCode) {
		this.queueCode = queueCode;
	}

	public Integer getAverageWaitTime() {
		return averageWaitTime;
	}

	public void setAverageWaitTime(Integer averageWaitTime) {
		this.averageWaitTime = averageWaitTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getTotalNumber() {
		return totalNumber;
	}

	public void setTotalNumber(Integer totalNumber) {
		this.totalNumber = totalNumber;
	}

	public Integer getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public List<MerchantTableVo> getTables() {
		return tables;
	}

	public void setTables(List<MerchantTableVo> tables) {
		this.tables = tables;
	}

}
