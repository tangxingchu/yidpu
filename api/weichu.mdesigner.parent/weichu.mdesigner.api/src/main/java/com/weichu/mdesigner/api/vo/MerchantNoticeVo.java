package com.weichu.mdesigner.api.vo;


/**
 * 商家通知vo
 * @author Administrator
 *
 */
public class MerchantNoticeVo {
	
	private Integer id;

    private String noticeTitle;

    private String noticeTime;

    private String noticeContent;
    
    private String status;//1=已读、0=未读
    
    private String noticeDetailLink;

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
		this.noticeTitle = noticeTitle;
	}

	public String getNoticeTime() {
		return noticeTime;
	}

	public void setNoticeTime(String noticeTime) {
		this.noticeTime = noticeTime;
	}

	public String getNoticeContent() {
		return noticeContent;
	}

	public void setNoticeContent(String noticeContent) {
		this.noticeContent = noticeContent;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getNoticeDetailLink() {
		return noticeDetailLink;
	}

	public void setNoticeDetailLink(String noticeDetailLink) {
		this.noticeDetailLink = noticeDetailLink;
	}

	
}
