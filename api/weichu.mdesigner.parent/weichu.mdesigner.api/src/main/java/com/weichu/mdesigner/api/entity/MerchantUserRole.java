package com.weichu.mdesigner.api.entity;

public class MerchantUserRole {
    private Integer id;

    private Integer roleId;

    private Integer merchantId;

    private Integer merchantChilduserId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
    }

    public Integer getMerchantChilduserId() {
        return merchantChilduserId;
    }

    public void setMerchantChilduserId(Integer merchantChilduserId) {
        this.merchantChilduserId = merchantChilduserId;
    }
}