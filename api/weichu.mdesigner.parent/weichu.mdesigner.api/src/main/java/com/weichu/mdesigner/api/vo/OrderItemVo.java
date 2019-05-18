package com.weichu.mdesigner.api.vo;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 订单项vo
 * @author Administrator
 *
 */
public class OrderItemVo {
	
	private Integer id;

    private Integer orderId;

    private String orderNo;

    private Integer goodsId;

    private BigDecimal goodsPrice;

    private String goodsName;

    private String goodsUnitName;

    private String extraName;

    private Integer num;

    private BigDecimal price;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date orderItemTime;

    private String orderItemStatus;
    
    private String orderItemStatusName;

    private String ruleCode;
    
    private BigDecimal ruleValue;
    
    private String ruleCodeName;

    private String remark;
    
    private Integer printStatus;
    
    private Integer printerId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(Integer goodsId) {
		this.goodsId = goodsId;
	}

	public BigDecimal getGoodsPrice() {
		return goodsPrice;
	}

	public void setGoodsPrice(BigDecimal goodsPrice) {
		this.goodsPrice = goodsPrice;
	}

	public String getGoodsName() {
		return goodsName;
	}

	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}

	public String getGoodsUnitName() {
		return goodsUnitName;
	}

	public void setGoodsUnitName(String goodsUnitName) {
		this.goodsUnitName = goodsUnitName;
	}

	public String getExtraName() {
		return extraName;
	}

	public void setExtraName(String extraName) {
		this.extraName = extraName;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Date getOrderItemTime() {
		return orderItemTime;
	}

	public void setOrderItemTime(Date orderItemTime) {
		this.orderItemTime = orderItemTime;
	}

	public String getOrderItemStatus() {
		return orderItemStatus;
	}

	public void setOrderItemStatus(String orderItemStatus) {
		this.orderItemStatus = orderItemStatus;
	}

	public String getOrderItemStatusName() {
		return orderItemStatusName;
	}

	public void setOrderItemStatusName(String orderItemStatusName) {
		this.orderItemStatusName = orderItemStatusName;
	}

	public String getRuleCode() {
		return ruleCode;
	}

	public void setRuleCode(String ruleCode) {
		this.ruleCode = ruleCode;
	}

	public BigDecimal getRuleValue() {
		return ruleValue;
	}

	public void setRuleValue(BigDecimal ruleValue) {
		this.ruleValue = ruleValue;
	}

	public String getRuleCodeName() {
		return ruleCodeName;
	}

	public void setRuleCodeName(String ruleCodeName) {
		this.ruleCodeName = ruleCodeName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getPrintStatus() {
		return printStatus;
	}

	public void setPrintStatus(Integer printStatus) {
		this.printStatus = printStatus;
	}

	public Integer getPrinterId() {
		return printerId;
	}

	public void setPrinterId(Integer printerId) {
		this.printerId = printerId;
	}
	
    
}
