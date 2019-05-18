package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantPrintSetting {
    private Integer id;

    private Integer merchantId;

    private Integer printType;

    private Integer printVid;

    private Integer printPid;

    private String printIp;
    
    private Integer printPort;
    
    private String name;

    @JSONField(serialize = false)
    private Date createTime;

    @JSONField(serialize = false)
    private Date modifyTime;

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

    public Integer getPrintType() {
        return printType;
    }

    public void setPrintType(Integer printType) {
        this.printType = printType;
    }

    public Integer getPrintVid() {
        return printVid;
    }

    public void setPrintVid(Integer printVid) {
        this.printVid = printVid;
    }

    public Integer getPrintPid() {
        return printPid;
    }

    public void setPrintPid(Integer printPid) {
        this.printPid = printPid;
    }

    public String getPrintIp() {
        return printIp;
    }

    public void setPrintIp(String printIp) {
        this.printIp = printIp == null ? null : printIp.trim();
    }

	public Integer getPrintPort() {
		return printPort;
	}

	public void setPrintPort(Integer printPort) {
		this.printPort = printPort;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }
}