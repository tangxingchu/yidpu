package com.weichu.mdesigner.api.vo;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantPayLogVo {
	private Integer id;

	private Integer merchantId;

	private String outId;
	
    private String payNo;

    private BigDecimal payAmount;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date payTime;

    private Integer payMethod;
    
    private String payMethodName;

    private String orderNo;

    private Integer logType;
    
    private String logTypeName;

    private Integer logSource;
    
    private String logSourceName;

    private String remark;

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
	
	public String getOutId() {
		return outId;
	}

	public void setOutId(String outId) {
		this.outId = outId;
	}

	public String getPayNo() {
		return payNo;
	}

	public void setPayNo(String payNo) {
		this.payNo = payNo;
	}

	public BigDecimal getPayAmount() {
		return payAmount;
	}

	public void setPayAmount(BigDecimal payAmount) {
		this.payAmount = payAmount;
	}

	public Date getPayTime() {
		return payTime;
	}

	public void setPayTime(Date payTime) {
		this.payTime = payTime;
	}

	public Integer getPayMethod() {
		return payMethod;
	}

	public void setPayMethod(Integer payMethod) {
		this.payMethod = payMethod;
	}

	public String getPayMethodName() {
		return payMethodName;
	}

	public void setPayMethodName(String payMethodName) {
		this.payMethodName = payMethodName;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getLogType() {
		return logType;
	}

	public void setLogType(Integer logType) {
		this.logType = logType;
	}

	public String getLogTypeName() {
		return logTypeName;
	}

	public void setLogTypeName(String logTypeName) {
		this.logTypeName = logTypeName;
	}

	public Integer getLogSource() {
		return logSource;
	}

	public void setLogSource(Integer logSource) {
		this.logSource = logSource;
	}

	public String getLogSourceName() {
		return logSourceName;
	}

	public void setLogSourceName(String logSourceName) {
		this.logSourceName = logSourceName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
    
}
