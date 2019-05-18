package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantBusinessInfo {
    private Integer id;

    private Integer merchantId;

    private Integer morningEnabled;

    @JSONField(format = "yyyy-MM-dd HH:mm")
    private Date morningOpening;

    @JSONField(format = "yyyy-MM-dd HH:mm")
    private Date morningCloseing;

    private Integer nooningEnabled;

    @JSONField(format = "yyyy-MM-dd HH:mm")
    private Date nooningOpening;

    @JSONField(format = "yyyy-MM-dd HH:mm")
    private Date nooningCloseing;

    private Integer afternoonEnabled;

    @JSONField(format = "yyyy-MM-dd HH:mm")
    private Date afternoonOpening;

    @JSONField(format = "yyyy-MM-dd HH:mm")
    private Date afternoonCloseing;

    private Float takeoutDistance;

    private String hasParking;

    private String parking;

    private Integer pointCash;

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

    public Integer getMorningEnabled() {
        return morningEnabled;
    }

    public void setMorningEnabled(Integer morningEnabled) {
        this.morningEnabled = morningEnabled;
    }

    public Date getMorningOpening() {
        return morningOpening;
    }

    public void setMorningOpening(Date morningOpening) {
        this.morningOpening = morningOpening;
    }

    public Date getMorningCloseing() {
        return morningCloseing;
    }

    public void setMorningCloseing(Date morningCloseing) {
        this.morningCloseing = morningCloseing;
    }

    public Integer getNooningEnabled() {
        return nooningEnabled;
    }

    public void setNooningEnabled(Integer nooningEnabled) {
        this.nooningEnabled = nooningEnabled;
    }

    public Date getNooningOpening() {
        return nooningOpening;
    }

    public void setNooningOpening(Date nooningOpening) {
        this.nooningOpening = nooningOpening;
    }

    public Date getNooningCloseing() {
        return nooningCloseing;
    }

    public void setNooningCloseing(Date nooningCloseing) {
        this.nooningCloseing = nooningCloseing;
    }

    public Integer getAfternoonEnabled() {
        return afternoonEnabled;
    }

    public void setAfternoonEnabled(Integer afternoonEnabled) {
        this.afternoonEnabled = afternoonEnabled;
    }

    public Date getAfternoonOpening() {
        return afternoonOpening;
    }

    public void setAfternoonOpening(Date afternoonOpening) {
        this.afternoonOpening = afternoonOpening;
    }

    public Date getAfternoonCloseing() {
        return afternoonCloseing;
    }

    public void setAfternoonCloseing(Date afternoonCloseing) {
        this.afternoonCloseing = afternoonCloseing;
    }

    public Float getTakeoutDistance() {
        return takeoutDistance;
    }

    public void setTakeoutDistance(Float takeoutDistance) {
        this.takeoutDistance = takeoutDistance;
    }

    public String getHasParking() {
        return hasParking;
    }

    public void setHasParking(String hasParking) {
        this.hasParking = hasParking == null ? null : hasParking.trim();
    }

    public String getParking() {
        return parking;
    }

    public void setParking(String parking) {
        this.parking = parking == null ? null : parking.trim();
    }

    public Integer getPointCash() {
        return pointCash;
    }

    public void setPointCash(Integer pointCash) {
        this.pointCash = pointCash;
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