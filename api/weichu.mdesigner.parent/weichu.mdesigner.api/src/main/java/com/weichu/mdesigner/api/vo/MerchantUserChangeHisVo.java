package com.weichu.mdesigner.api.vo;

/**
 * 基本信息变更 vo
 * @author Administrator
 *
 */
public class MerchantUserChangeHisVo {
	
	private Integer id;

    private Integer merchantId;

    private String merchantName;

    private String address;
    
    private String logoPath;

    private String remark;

    private Integer merchantAuditId;

    private Integer auditStatus;

    private String auditRemark;

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

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getMerchantAuditId() {
		return merchantAuditId;
	}

	public void setMerchantAuditId(Integer merchantAuditId) {
		this.merchantAuditId = merchantAuditId;
	}

	public Integer getAuditStatus() {
		return auditStatus;
	}

	public void setAuditStatus(Integer auditStatus) {
		this.auditStatus = auditStatus;
	}

	public String getAuditRemark() {
		return auditRemark;
	}

	public void setAuditRemark(String auditRemark) {
		this.auditRemark = auditRemark;
	}
    
}
