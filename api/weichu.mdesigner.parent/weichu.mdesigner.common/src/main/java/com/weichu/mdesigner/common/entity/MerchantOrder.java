package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantOrder {
    private Integer id;

    private String orderNo;

    private String outTradeNo;
    
    private String payOrderNo;

    private Integer merchantId;

    private Integer memberId;

    private Integer dinersNum;

    private String orderStatus;

    private Date orderTime;

    private Integer orderChannel;

    private Integer orderMethod;

    private Integer payMethod;

    private BigDecimal totalPrice;

    private BigDecimal payPrice;
    
    private BigDecimal exceptionPrice;
    
    private String payNo;

    private String tableCode;

    private Integer subtractType;

    private BigDecimal subtractAmount;

    private String subtractRemark;

    private String remark;

    private String createUser;

    @JSONField(serialize = false)
    private Date createTime;
    
    private String wxOpenid;

    private String alipayUserid;
    
    private String seqNumber;

    private Date endTime;

    private Date closeTime;

    @JSONField(serialize = false)
    private Date modifyTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo == null ? null : orderNo.trim();
    }
    
    public String getPayOrderNo() {
		return payOrderNo;
	}

	public void setPayOrderNo(String payOrderNo) {
		this.payOrderNo = payOrderNo;
	}

	public String getOutTradeNo() {
        return outTradeNo;
    }

    public void setOutTradeNo(String outTradeNo) {
        this.outTradeNo = outTradeNo == null ? null : outTradeNo.trim();
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Integer getDinersNum() {
        return dinersNum;
    }

    public void setDinersNum(Integer dinersNum) {
        this.dinersNum = dinersNum;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus == null ? null : orderStatus.trim();
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public Integer getOrderChannel() {
        return orderChannel;
    }

    public void setOrderChannel(Integer orderChannel) {
        this.orderChannel = orderChannel;
    }

    public Integer getOrderMethod() {
        return orderMethod;
    }

    public void setOrderMethod(Integer orderMethod) {
        this.orderMethod = orderMethod;
    }

    public Integer getPayMethod() {
        return payMethod;
    }

    public void setPayMethod(Integer payMethod) {
        this.payMethod = payMethod;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getPayPrice() {
        return payPrice;
    }

    public void setPayPrice(BigDecimal payPrice) {
        this.payPrice = payPrice;
    }
    
    public BigDecimal getExceptionPrice() {
		return exceptionPrice;
	}

	public void setExceptionPrice(BigDecimal exceptionPrice) {
		this.exceptionPrice = exceptionPrice;
	}

	public String getPayNo() {
		return payNo;
	}

	public void setPayNo(String payNo) {
		this.payNo = payNo;
	}

	public String getTableCode() {
        return tableCode;
    }

    public void setTableCode(String tableCode) {
        this.tableCode = tableCode == null ? null : tableCode.trim();
    }

    public Integer getSubtractType() {
        return subtractType;
    }

    public void setSubtractType(Integer subtractType) {
        this.subtractType = subtractType;
    }

    public BigDecimal getSubtractAmount() {
        return subtractAmount;
    }

    public void setSubtractAmount(BigDecimal subtractAmount) {
        this.subtractAmount = subtractAmount;
    }

    public String getSubtractRemark() {
        return subtractRemark;
    }

    public void setSubtractRemark(String subtractRemark) {
        this.subtractRemark = subtractRemark == null ? null : subtractRemark.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser == null ? null : createUser.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
    
    public String getWxOpenid() {
		return wxOpenid;
	}

	public void setWxOpenid(String wxOpenid) {
		this.wxOpenid = wxOpenid;
	}

	public String getAlipayUserid() {
		return alipayUserid;
	}

	public void setAlipayUserid(String alipayUserid) {
		this.alipayUserid = alipayUserid;
	}
	
	public String getSeqNumber() {
		return seqNumber;
	}

	public void setSeqNumber(String seqNumber) {
		this.seqNumber = seqNumber;
	}

	public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(Date closeTime) {
        this.closeTime = closeTime;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }
}