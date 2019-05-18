package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantQueue {
    private Integer id;

    private String queueName;

    private String queueCode;

    private Integer averageWaitTime;

    private Integer totalNumber;

    private Integer merchantId;

    private String description;

    @JSONField(serialize = false)
    private Date createTime;

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
        this.queueName = queueName == null ? null : queueName.trim();
    }

    public String getQueueCode() {
        return queueCode;
    }

    public void setQueueCode(String queueCode) {
        this.queueCode = queueCode == null ? null : queueCode.trim();
    }

    public Integer getAverageWaitTime() {
        return averageWaitTime;
    }

    public void setAverageWaitTime(Integer averageWaitTime) {
        this.averageWaitTime = averageWaitTime;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}