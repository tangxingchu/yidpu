package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantCashierLog {
    private Integer id;

    private Integer merchantId;

    private String tableCode;

    private BigDecimal cashierAmount;
    
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date cashierTime;

    private Integer cashierMethod;

    private String orderNo;

    private Integer cashierType;

    private Integer cashierSource;

    private String remark;

    private String operationStaff;

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

    public String getTableCode() {
        return tableCode;
    }

    public void setTableCode(String tableCode) {
        this.tableCode = tableCode == null ? null : tableCode.trim();
    }

    public BigDecimal getCashierAmount() {
        return cashierAmount;
    }

    public void setCashierAmount(BigDecimal cashierAmount) {
        this.cashierAmount = cashierAmount;
    }

    public Date getCashierTime() {
        return cashierTime;
    }

    public void setCashierTime(Date cashierTime) {
        this.cashierTime = cashierTime;
    }

    public Integer getCashierMethod() {
        return cashierMethod;
    }

    public void setCashierMethod(Integer cashierMethod) {
        this.cashierMethod = cashierMethod;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo == null ? null : orderNo.trim();
    }

    public Integer getCashierType() {
        return cashierType;
    }

    public void setCashierType(Integer cashierType) {
        this.cashierType = cashierType;
    }

    public Integer getCashierSource() {
        return cashierSource;
    }

    public void setCashierSource(Integer cashierSource) {
        this.cashierSource = cashierSource;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getOperationStaff() {
        return operationStaff;
    }

    public void setOperationStaff(String operationStaff) {
        this.operationStaff = operationStaff == null ? null : operationStaff.trim();
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