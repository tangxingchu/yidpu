package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MemberRankConfig {
    private Integer id;

    private Integer merchantId;

    private Integer memberRank;

    private Integer memberPoint;

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

    public Integer getMemberRank() {
        return memberRank;
    }

    public void setMemberRank(Integer memberRank) {
        this.memberRank = memberRank;
    }

    public Integer getMemberPoint() {
        return memberPoint;
    }

    public void setMemberPoint(Integer memberPoint) {
        this.memberPoint = memberPoint;
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