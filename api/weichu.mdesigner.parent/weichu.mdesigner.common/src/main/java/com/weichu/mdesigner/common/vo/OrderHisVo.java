package com.weichu.mdesigner.common.vo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.weichu.mdesigner.common.entity.MerchantOrderItemHis;

/**
 * 订单Vo
 * @author Administrator
 *
 */
public class OrderHisVo {
	
	private Integer id;

    private String orderNo;
    
    private String outTradeNo;
    
    private String payOrderNo;

    private Integer merchantId;

    private Integer memberId;
    
    private Integer dinersNum;

    private String orderStatus;
    
    private String orderStatusName;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date orderTime;

    private Integer orderChannel;
    
    private String orderChannelName;

    private Integer orderMethod;

    private Integer payMethod;
    
    private String payMethodName;
    
    private Integer subtractType;
    
    private String subtractTypeName;
    
    private BigDecimal subtractAmount;
    
    private String subtractRemark;

    private BigDecimal totalPrice;

    private BigDecimal payPrice;
    
    private BigDecimal exceptionPrice;
    
    private String payNo;

    private String tableCode;

    private String remark;

    private String createUser;
    
    private String wxOpenid;

    private String alipayUserid;
    
    private String seqNumber;
    
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date endTime;
    
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date colseTime;
    
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date hisTime;
    
    private List<MerchantOrderItemHis> orderItems;
    
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
		this.orderNo = orderNo;
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
		this.outTradeNo = outTradeNo;
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
		this.orderStatus = orderStatus;
	}

	public String getOrderStatusName() {
		return orderStatusName;
	}

	public void setOrderStatusName(String orderStatusName) {
		this.orderStatusName = orderStatusName;
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

	public String getOrderChannelName() {
		return orderChannelName;
	}

	public void setOrderChannelName(String orderChannelName) {
		this.orderChannelName = orderChannelName;
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

	public String getPayMethodName() {
		return payMethodName;
	}

	public void setPayMethodName(String payMethodName) {
		this.payMethodName = payMethodName;
	}
	
	public Integer getSubtractType() {
		return subtractType;
	}

	public void setSubtractType(Integer subtractType) {
		this.subtractType = subtractType;
	}

	public String getSubtractTypeName() {
		return subtractTypeName;
	}

	public void setSubtractTypeName(String subtractTypeName) {
		this.subtractTypeName = subtractTypeName;
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
		this.subtractRemark = subtractRemark;
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
		this.tableCode = tableCode;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
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

	public Date getColseTime() {
		return colseTime;
	}

	public void setColseTime(Date colseTime) {
		this.colseTime = colseTime;
	}

	public Date getHisTime() {
		return hisTime;
	}

	public void setHisTime(Date hisTime) {
		this.hisTime = hisTime;
	}

	public List<MerchantOrderItemHis> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<MerchantOrderItemHis> orderItems) {
		this.orderItems = orderItems;
	}

}
