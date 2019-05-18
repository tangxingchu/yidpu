package com.weichu.mdesigner.common.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class MerchantNotice {
    private Integer id;

    private String noticeTitle;

    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date noticeTime;

    private String noticeDetailLink;

    private String noticeContent;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNoticeTitle() {
        return noticeTitle;
    }

    public void setNoticeTitle(String noticeTitle) {
        this.noticeTitle = noticeTitle == null ? null : noticeTitle.trim();
    }

    public Date getNoticeTime() {
        return noticeTime;
    }

    public void setNoticeTime(Date noticeTime) {
        this.noticeTime = noticeTime;
    }

    public String getNoticeDetailLink() {
        return noticeDetailLink;
    }

    public void setNoticeDetailLink(String noticeDetailLink) {
        this.noticeDetailLink = noticeDetailLink == null ? null : noticeDetailLink.trim();
    }

    public String getNoticeContent() {
        return noticeContent;
    }

    public void setNoticeContent(String noticeContent) {
        this.noticeContent = noticeContent == null ? null : noticeContent.trim();
    }
}