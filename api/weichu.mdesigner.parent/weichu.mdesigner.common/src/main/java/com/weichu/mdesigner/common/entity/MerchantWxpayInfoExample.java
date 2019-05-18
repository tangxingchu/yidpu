package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantWxpayInfoExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantWxpayInfoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andMerchantIdIsNull() {
            addCriterion("merchant_id is null");
            return (Criteria) this;
        }

        public Criteria andMerchantIdIsNotNull() {
            addCriterion("merchant_id is not null");
            return (Criteria) this;
        }

        public Criteria andMerchantIdEqualTo(Integer value) {
            addCriterion("merchant_id =", value, "merchantId");
            return (Criteria) this;
        }

        public Criteria andMerchantIdNotEqualTo(Integer value) {
            addCriterion("merchant_id <>", value, "merchantId");
            return (Criteria) this;
        }

        public Criteria andMerchantIdGreaterThan(Integer value) {
            addCriterion("merchant_id >", value, "merchantId");
            return (Criteria) this;
        }

        public Criteria andMerchantIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("merchant_id >=", value, "merchantId");
            return (Criteria) this;
        }

        public Criteria andMerchantIdLessThan(Integer value) {
            addCriterion("merchant_id <", value, "merchantId");
            return (Criteria) this;
        }

        public Criteria andMerchantIdLessThanOrEqualTo(Integer value) {
            addCriterion("merchant_id <=", value, "merchantId");
            return (Criteria) this;
        }

        public Criteria andMerchantIdIn(List<Integer> values) {
            addCriterion("merchant_id in", values, "merchantId");
            return (Criteria) this;
        }

        public Criteria andMerchantIdNotIn(List<Integer> values) {
            addCriterion("merchant_id not in", values, "merchantId");
            return (Criteria) this;
        }

        public Criteria andMerchantIdBetween(Integer value1, Integer value2) {
            addCriterion("merchant_id between", value1, value2, "merchantId");
            return (Criteria) this;
        }

        public Criteria andMerchantIdNotBetween(Integer value1, Integer value2) {
            addCriterion("merchant_id not between", value1, value2, "merchantId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdIsNull() {
            addCriterion("sub_mch_id is null");
            return (Criteria) this;
        }

        public Criteria andSubMchIdIsNotNull() {
            addCriterion("sub_mch_id is not null");
            return (Criteria) this;
        }

        public Criteria andSubMchIdEqualTo(String value) {
            addCriterion("sub_mch_id =", value, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdNotEqualTo(String value) {
            addCriterion("sub_mch_id <>", value, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdGreaterThan(String value) {
            addCriterion("sub_mch_id >", value, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdGreaterThanOrEqualTo(String value) {
            addCriterion("sub_mch_id >=", value, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdLessThan(String value) {
            addCriterion("sub_mch_id <", value, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdLessThanOrEqualTo(String value) {
            addCriterion("sub_mch_id <=", value, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdLike(String value) {
            addCriterion("sub_mch_id like", value, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdNotLike(String value) {
            addCriterion("sub_mch_id not like", value, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdIn(List<String> values) {
            addCriterion("sub_mch_id in", values, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdNotIn(List<String> values) {
            addCriterion("sub_mch_id not in", values, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdBetween(String value1, String value2) {
            addCriterion("sub_mch_id between", value1, value2, "subMchId");
            return (Criteria) this;
        }

        public Criteria andSubMchIdNotBetween(String value1, String value2) {
            addCriterion("sub_mch_id not between", value1, value2, "subMchId");
            return (Criteria) this;
        }

        public Criteria andContactsNameIsNull() {
            addCriterion("contacts_name is null");
            return (Criteria) this;
        }

        public Criteria andContactsNameIsNotNull() {
            addCriterion("contacts_name is not null");
            return (Criteria) this;
        }

        public Criteria andContactsNameEqualTo(String value) {
            addCriterion("contacts_name =", value, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameNotEqualTo(String value) {
            addCriterion("contacts_name <>", value, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameGreaterThan(String value) {
            addCriterion("contacts_name >", value, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameGreaterThanOrEqualTo(String value) {
            addCriterion("contacts_name >=", value, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameLessThan(String value) {
            addCriterion("contacts_name <", value, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameLessThanOrEqualTo(String value) {
            addCriterion("contacts_name <=", value, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameLike(String value) {
            addCriterion("contacts_name like", value, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameNotLike(String value) {
            addCriterion("contacts_name not like", value, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameIn(List<String> values) {
            addCriterion("contacts_name in", values, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameNotIn(List<String> values) {
            addCriterion("contacts_name not in", values, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameBetween(String value1, String value2) {
            addCriterion("contacts_name between", value1, value2, "contactsName");
            return (Criteria) this;
        }

        public Criteria andContactsNameNotBetween(String value1, String value2) {
            addCriterion("contacts_name not between", value1, value2, "contactsName");
            return (Criteria) this;
        }

        public Criteria andPhoneIsNull() {
            addCriterion("phone is null");
            return (Criteria) this;
        }

        public Criteria andPhoneIsNotNull() {
            addCriterion("phone is not null");
            return (Criteria) this;
        }

        public Criteria andPhoneEqualTo(String value) {
            addCriterion("phone =", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneNotEqualTo(String value) {
            addCriterion("phone <>", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneGreaterThan(String value) {
            addCriterion("phone >", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneGreaterThanOrEqualTo(String value) {
            addCriterion("phone >=", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneLessThan(String value) {
            addCriterion("phone <", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneLessThanOrEqualTo(String value) {
            addCriterion("phone <=", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneLike(String value) {
            addCriterion("phone like", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneNotLike(String value) {
            addCriterion("phone not like", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneIn(List<String> values) {
            addCriterion("phone in", values, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneNotIn(List<String> values) {
            addCriterion("phone not in", values, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneBetween(String value1, String value2) {
            addCriterion("phone between", value1, value2, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneNotBetween(String value1, String value2) {
            addCriterion("phone not between", value1, value2, "phone");
            return (Criteria) this;
        }

        public Criteria andEmailIsNull() {
            addCriterion("email is null");
            return (Criteria) this;
        }

        public Criteria andEmailIsNotNull() {
            addCriterion("email is not null");
            return (Criteria) this;
        }

        public Criteria andEmailEqualTo(String value) {
            addCriterion("email =", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailNotEqualTo(String value) {
            addCriterion("email <>", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailGreaterThan(String value) {
            addCriterion("email >", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailGreaterThanOrEqualTo(String value) {
            addCriterion("email >=", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailLessThan(String value) {
            addCriterion("email <", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailLessThanOrEqualTo(String value) {
            addCriterion("email <=", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailLike(String value) {
            addCriterion("email like", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailNotLike(String value) {
            addCriterion("email not like", value, "email");
            return (Criteria) this;
        }

        public Criteria andEmailIn(List<String> values) {
            addCriterion("email in", values, "email");
            return (Criteria) this;
        }

        public Criteria andEmailNotIn(List<String> values) {
            addCriterion("email not in", values, "email");
            return (Criteria) this;
        }

        public Criteria andEmailBetween(String value1, String value2) {
            addCriterion("email between", value1, value2, "email");
            return (Criteria) this;
        }

        public Criteria andEmailNotBetween(String value1, String value2) {
            addCriterion("email not between", value1, value2, "email");
            return (Criteria) this;
        }

        public Criteria andMerchantNameIsNull() {
            addCriterion("merchant_name is null");
            return (Criteria) this;
        }

        public Criteria andMerchantNameIsNotNull() {
            addCriterion("merchant_name is not null");
            return (Criteria) this;
        }

        public Criteria andMerchantNameEqualTo(String value) {
            addCriterion("merchant_name =", value, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameNotEqualTo(String value) {
            addCriterion("merchant_name <>", value, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameGreaterThan(String value) {
            addCriterion("merchant_name >", value, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameGreaterThanOrEqualTo(String value) {
            addCriterion("merchant_name >=", value, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameLessThan(String value) {
            addCriterion("merchant_name <", value, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameLessThanOrEqualTo(String value) {
            addCriterion("merchant_name <=", value, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameLike(String value) {
            addCriterion("merchant_name like", value, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameNotLike(String value) {
            addCriterion("merchant_name not like", value, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameIn(List<String> values) {
            addCriterion("merchant_name in", values, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameNotIn(List<String> values) {
            addCriterion("merchant_name not in", values, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameBetween(String value1, String value2) {
            addCriterion("merchant_name between", value1, value2, "merchantName");
            return (Criteria) this;
        }

        public Criteria andMerchantNameNotBetween(String value1, String value2) {
            addCriterion("merchant_name not between", value1, value2, "merchantName");
            return (Criteria) this;
        }

        public Criteria andServicePhoneIsNull() {
            addCriterion("service_phone is null");
            return (Criteria) this;
        }

        public Criteria andServicePhoneIsNotNull() {
            addCriterion("service_phone is not null");
            return (Criteria) this;
        }

        public Criteria andServicePhoneEqualTo(String value) {
            addCriterion("service_phone =", value, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneNotEqualTo(String value) {
            addCriterion("service_phone <>", value, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneGreaterThan(String value) {
            addCriterion("service_phone >", value, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneGreaterThanOrEqualTo(String value) {
            addCriterion("service_phone >=", value, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneLessThan(String value) {
            addCriterion("service_phone <", value, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneLessThanOrEqualTo(String value) {
            addCriterion("service_phone <=", value, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneLike(String value) {
            addCriterion("service_phone like", value, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneNotLike(String value) {
            addCriterion("service_phone not like", value, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneIn(List<String> values) {
            addCriterion("service_phone in", values, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneNotIn(List<String> values) {
            addCriterion("service_phone not in", values, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneBetween(String value1, String value2) {
            addCriterion("service_phone between", value1, value2, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andServicePhoneNotBetween(String value1, String value2) {
            addCriterion("service_phone not between", value1, value2, "servicePhone");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoIsNull() {
            addCriterion("business_licence_no is null");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoIsNotNull() {
            addCriterion("business_licence_no is not null");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoEqualTo(String value) {
            addCriterion("business_licence_no =", value, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoNotEqualTo(String value) {
            addCriterion("business_licence_no <>", value, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoGreaterThan(String value) {
            addCriterion("business_licence_no >", value, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoGreaterThanOrEqualTo(String value) {
            addCriterion("business_licence_no >=", value, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoLessThan(String value) {
            addCriterion("business_licence_no <", value, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoLessThanOrEqualTo(String value) {
            addCriterion("business_licence_no <=", value, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoLike(String value) {
            addCriterion("business_licence_no like", value, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoNotLike(String value) {
            addCriterion("business_licence_no not like", value, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoIn(List<String> values) {
            addCriterion("business_licence_no in", values, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoNotIn(List<String> values) {
            addCriterion("business_licence_no not in", values, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoBetween(String value1, String value2) {
            addCriterion("business_licence_no between", value1, value2, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andBusinessLicenceNoNotBetween(String value1, String value2) {
            addCriterion("business_licence_no not between", value1, value2, "businessLicenceNo");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathIsNull() {
            addCriterion("org_photo_path is null");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathIsNotNull() {
            addCriterion("org_photo_path is not null");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathEqualTo(String value) {
            addCriterion("org_photo_path =", value, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathNotEqualTo(String value) {
            addCriterion("org_photo_path <>", value, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathGreaterThan(String value) {
            addCriterion("org_photo_path >", value, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathGreaterThanOrEqualTo(String value) {
            addCriterion("org_photo_path >=", value, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathLessThan(String value) {
            addCriterion("org_photo_path <", value, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathLessThanOrEqualTo(String value) {
            addCriterion("org_photo_path <=", value, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathLike(String value) {
            addCriterion("org_photo_path like", value, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathNotLike(String value) {
            addCriterion("org_photo_path not like", value, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathIn(List<String> values) {
            addCriterion("org_photo_path in", values, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathNotIn(List<String> values) {
            addCriterion("org_photo_path not in", values, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathBetween(String value1, String value2) {
            addCriterion("org_photo_path between", value1, value2, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andOrgPhotoPathNotBetween(String value1, String value2) {
            addCriterion("org_photo_path not between", value1, value2, "orgPhotoPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathIsNull() {
            addCriterion("identity_photo_front_path is null");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathIsNotNull() {
            addCriterion("identity_photo_front_path is not null");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathEqualTo(String value) {
            addCriterion("identity_photo_front_path =", value, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathNotEqualTo(String value) {
            addCriterion("identity_photo_front_path <>", value, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathGreaterThan(String value) {
            addCriterion("identity_photo_front_path >", value, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathGreaterThanOrEqualTo(String value) {
            addCriterion("identity_photo_front_path >=", value, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathLessThan(String value) {
            addCriterion("identity_photo_front_path <", value, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathLessThanOrEqualTo(String value) {
            addCriterion("identity_photo_front_path <=", value, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathLike(String value) {
            addCriterion("identity_photo_front_path like", value, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathNotLike(String value) {
            addCriterion("identity_photo_front_path not like", value, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathIn(List<String> values) {
            addCriterion("identity_photo_front_path in", values, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathNotIn(List<String> values) {
            addCriterion("identity_photo_front_path not in", values, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathBetween(String value1, String value2) {
            addCriterion("identity_photo_front_path between", value1, value2, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontPathNotBetween(String value1, String value2) {
            addCriterion("identity_photo_front_path not between", value1, value2, "identityPhotoFrontPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathIsNull() {
            addCriterion("identity_photo_back_path is null");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathIsNotNull() {
            addCriterion("identity_photo_back_path is not null");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathEqualTo(String value) {
            addCriterion("identity_photo_back_path =", value, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathNotEqualTo(String value) {
            addCriterion("identity_photo_back_path <>", value, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathGreaterThan(String value) {
            addCriterion("identity_photo_back_path >", value, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathGreaterThanOrEqualTo(String value) {
            addCriterion("identity_photo_back_path >=", value, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathLessThan(String value) {
            addCriterion("identity_photo_back_path <", value, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathLessThanOrEqualTo(String value) {
            addCriterion("identity_photo_back_path <=", value, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathLike(String value) {
            addCriterion("identity_photo_back_path like", value, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathNotLike(String value) {
            addCriterion("identity_photo_back_path not like", value, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathIn(List<String> values) {
            addCriterion("identity_photo_back_path in", values, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathNotIn(List<String> values) {
            addCriterion("identity_photo_back_path not in", values, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathBetween(String value1, String value2) {
            addCriterion("identity_photo_back_path between", value1, value2, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackPathNotBetween(String value1, String value2) {
            addCriterion("identity_photo_back_path not between", value1, value2, "identityPhotoBackPath");
            return (Criteria) this;
        }

        public Criteria andAccountTypeIsNull() {
            addCriterion("account_type is null");
            return (Criteria) this;
        }

        public Criteria andAccountTypeIsNotNull() {
            addCriterion("account_type is not null");
            return (Criteria) this;
        }

        public Criteria andAccountTypeEqualTo(Integer value) {
            addCriterion("account_type =", value, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountTypeNotEqualTo(Integer value) {
            addCriterion("account_type <>", value, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountTypeGreaterThan(Integer value) {
            addCriterion("account_type >", value, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("account_type >=", value, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountTypeLessThan(Integer value) {
            addCriterion("account_type <", value, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountTypeLessThanOrEqualTo(Integer value) {
            addCriterion("account_type <=", value, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountTypeIn(List<Integer> values) {
            addCriterion("account_type in", values, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountTypeNotIn(List<Integer> values) {
            addCriterion("account_type not in", values, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountTypeBetween(Integer value1, Integer value2) {
            addCriterion("account_type between", value1, value2, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("account_type not between", value1, value2, "accountType");
            return (Criteria) this;
        }

        public Criteria andAccountNameIsNull() {
            addCriterion("account_name is null");
            return (Criteria) this;
        }

        public Criteria andAccountNameIsNotNull() {
            addCriterion("account_name is not null");
            return (Criteria) this;
        }

        public Criteria andAccountNameEqualTo(String value) {
            addCriterion("account_name =", value, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameNotEqualTo(String value) {
            addCriterion("account_name <>", value, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameGreaterThan(String value) {
            addCriterion("account_name >", value, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameGreaterThanOrEqualTo(String value) {
            addCriterion("account_name >=", value, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameLessThan(String value) {
            addCriterion("account_name <", value, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameLessThanOrEqualTo(String value) {
            addCriterion("account_name <=", value, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameLike(String value) {
            addCriterion("account_name like", value, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameNotLike(String value) {
            addCriterion("account_name not like", value, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameIn(List<String> values) {
            addCriterion("account_name in", values, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameNotIn(List<String> values) {
            addCriterion("account_name not in", values, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameBetween(String value1, String value2) {
            addCriterion("account_name between", value1, value2, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountNameNotBetween(String value1, String value2) {
            addCriterion("account_name not between", value1, value2, "accountName");
            return (Criteria) this;
        }

        public Criteria andAccountBankIsNull() {
            addCriterion("account_bank is null");
            return (Criteria) this;
        }

        public Criteria andAccountBankIsNotNull() {
            addCriterion("account_bank is not null");
            return (Criteria) this;
        }

        public Criteria andAccountBankEqualTo(String value) {
            addCriterion("account_bank =", value, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankNotEqualTo(String value) {
            addCriterion("account_bank <>", value, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankGreaterThan(String value) {
            addCriterion("account_bank >", value, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankGreaterThanOrEqualTo(String value) {
            addCriterion("account_bank >=", value, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankLessThan(String value) {
            addCriterion("account_bank <", value, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankLessThanOrEqualTo(String value) {
            addCriterion("account_bank <=", value, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankLike(String value) {
            addCriterion("account_bank like", value, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankNotLike(String value) {
            addCriterion("account_bank not like", value, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankIn(List<String> values) {
            addCriterion("account_bank in", values, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankNotIn(List<String> values) {
            addCriterion("account_bank not in", values, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankBetween(String value1, String value2) {
            addCriterion("account_bank between", value1, value2, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountBankNotBetween(String value1, String value2) {
            addCriterion("account_bank not between", value1, value2, "accountBank");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackIsNull() {
            addCriterion("account_fockback is null");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackIsNotNull() {
            addCriterion("account_fockback is not null");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackEqualTo(String value) {
            addCriterion("account_fockback =", value, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackNotEqualTo(String value) {
            addCriterion("account_fockback <>", value, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackGreaterThan(String value) {
            addCriterion("account_fockback >", value, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackGreaterThanOrEqualTo(String value) {
            addCriterion("account_fockback >=", value, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackLessThan(String value) {
            addCriterion("account_fockback <", value, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackLessThanOrEqualTo(String value) {
            addCriterion("account_fockback <=", value, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackLike(String value) {
            addCriterion("account_fockback like", value, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackNotLike(String value) {
            addCriterion("account_fockback not like", value, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackIn(List<String> values) {
            addCriterion("account_fockback in", values, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackNotIn(List<String> values) {
            addCriterion("account_fockback not in", values, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackBetween(String value1, String value2) {
            addCriterion("account_fockback between", value1, value2, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountFockbackNotBetween(String value1, String value2) {
            addCriterion("account_fockback not between", value1, value2, "accountFockback");
            return (Criteria) this;
        }

        public Criteria andAccountNoIsNull() {
            addCriterion("account_no is null");
            return (Criteria) this;
        }

        public Criteria andAccountNoIsNotNull() {
            addCriterion("account_no is not null");
            return (Criteria) this;
        }

        public Criteria andAccountNoEqualTo(String value) {
            addCriterion("account_no =", value, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoNotEqualTo(String value) {
            addCriterion("account_no <>", value, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoGreaterThan(String value) {
            addCriterion("account_no >", value, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoGreaterThanOrEqualTo(String value) {
            addCriterion("account_no >=", value, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoLessThan(String value) {
            addCriterion("account_no <", value, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoLessThanOrEqualTo(String value) {
            addCriterion("account_no <=", value, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoLike(String value) {
            addCriterion("account_no like", value, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoNotLike(String value) {
            addCriterion("account_no not like", value, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoIn(List<String> values) {
            addCriterion("account_no in", values, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoNotIn(List<String> values) {
            addCriterion("account_no not in", values, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoBetween(String value1, String value2) {
            addCriterion("account_no between", value1, value2, "accountNo");
            return (Criteria) this;
        }

        public Criteria andAccountNoNotBetween(String value1, String value2) {
            addCriterion("account_no not between", value1, value2, "accountNo");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeIsNull() {
            addCriterion("modify_time is null");
            return (Criteria) this;
        }

        public Criteria andModifyTimeIsNotNull() {
            addCriterion("modify_time is not null");
            return (Criteria) this;
        }

        public Criteria andModifyTimeEqualTo(Date value) {
            addCriterion("modify_time =", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeNotEqualTo(Date value) {
            addCriterion("modify_time <>", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeGreaterThan(Date value) {
            addCriterion("modify_time >", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("modify_time >=", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeLessThan(Date value) {
            addCriterion("modify_time <", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeLessThanOrEqualTo(Date value) {
            addCriterion("modify_time <=", value, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeIn(List<Date> values) {
            addCriterion("modify_time in", values, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeNotIn(List<Date> values) {
            addCriterion("modify_time not in", values, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeBetween(Date value1, Date value2) {
            addCriterion("modify_time between", value1, value2, "modifyTime");
            return (Criteria) this;
        }

        public Criteria andModifyTimeNotBetween(Date value1, Date value2) {
            addCriterion("modify_time not between", value1, value2, "modifyTime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}