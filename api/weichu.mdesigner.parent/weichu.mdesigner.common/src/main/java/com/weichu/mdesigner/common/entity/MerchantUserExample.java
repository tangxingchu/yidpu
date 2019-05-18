package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantUserExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantUserExample() {
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

        public Criteria andMerchantCodeIsNull() {
            addCriterion("merchant_code is null");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeIsNotNull() {
            addCriterion("merchant_code is not null");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeEqualTo(String value) {
            addCriterion("merchant_code =", value, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeNotEqualTo(String value) {
            addCriterion("merchant_code <>", value, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeGreaterThan(String value) {
            addCriterion("merchant_code >", value, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeGreaterThanOrEqualTo(String value) {
            addCriterion("merchant_code >=", value, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeLessThan(String value) {
            addCriterion("merchant_code <", value, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeLessThanOrEqualTo(String value) {
            addCriterion("merchant_code <=", value, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeLike(String value) {
            addCriterion("merchant_code like", value, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeNotLike(String value) {
            addCriterion("merchant_code not like", value, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeIn(List<String> values) {
            addCriterion("merchant_code in", values, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeNotIn(List<String> values) {
            addCriterion("merchant_code not in", values, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeBetween(String value1, String value2) {
            addCriterion("merchant_code between", value1, value2, "merchantCode");
            return (Criteria) this;
        }

        public Criteria andMerchantCodeNotBetween(String value1, String value2) {
            addCriterion("merchant_code not between", value1, value2, "merchantCode");
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

        public Criteria andBusinessPhotoIdIsNull() {
            addCriterion("business_photo_id is null");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdIsNotNull() {
            addCriterion("business_photo_id is not null");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdEqualTo(Integer value) {
            addCriterion("business_photo_id =", value, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdNotEqualTo(Integer value) {
            addCriterion("business_photo_id <>", value, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdGreaterThan(Integer value) {
            addCriterion("business_photo_id >", value, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("business_photo_id >=", value, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdLessThan(Integer value) {
            addCriterion("business_photo_id <", value, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdLessThanOrEqualTo(Integer value) {
            addCriterion("business_photo_id <=", value, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdIn(List<Integer> values) {
            addCriterion("business_photo_id in", values, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdNotIn(List<Integer> values) {
            addCriterion("business_photo_id not in", values, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdBetween(Integer value1, Integer value2) {
            addCriterion("business_photo_id between", value1, value2, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessPhotoIdNotBetween(Integer value1, Integer value2) {
            addCriterion("business_photo_id not between", value1, value2, "businessPhotoId");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryIsNull() {
            addCriterion("business_category is null");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryIsNotNull() {
            addCriterion("business_category is not null");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryEqualTo(Integer value) {
            addCriterion("business_category =", value, "businessCategory");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryNotEqualTo(Integer value) {
            addCriterion("business_category <>", value, "businessCategory");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryGreaterThan(Integer value) {
            addCriterion("business_category >", value, "businessCategory");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryGreaterThanOrEqualTo(Integer value) {
            addCriterion("business_category >=", value, "businessCategory");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryLessThan(Integer value) {
            addCriterion("business_category <", value, "businessCategory");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryLessThanOrEqualTo(Integer value) {
            addCriterion("business_category <=", value, "businessCategory");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryIn(List<Integer> values) {
            addCriterion("business_category in", values, "businessCategory");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryNotIn(List<Integer> values) {
            addCriterion("business_category not in", values, "businessCategory");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryBetween(Integer value1, Integer value2) {
            addCriterion("business_category between", value1, value2, "businessCategory");
            return (Criteria) this;
        }

        public Criteria andBusinessCategoryNotBetween(Integer value1, Integer value2) {
            addCriterion("business_category not between", value1, value2, "businessCategory");
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

        public Criteria andPasswordIsNull() {
            addCriterion("password is null");
            return (Criteria) this;
        }

        public Criteria andPasswordIsNotNull() {
            addCriterion("password is not null");
            return (Criteria) this;
        }

        public Criteria andPasswordEqualTo(String value) {
            addCriterion("password =", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotEqualTo(String value) {
            addCriterion("password <>", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordGreaterThan(String value) {
            addCriterion("password >", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordGreaterThanOrEqualTo(String value) {
            addCriterion("password >=", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLessThan(String value) {
            addCriterion("password <", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLessThanOrEqualTo(String value) {
            addCriterion("password <=", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLike(String value) {
            addCriterion("password like", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotLike(String value) {
            addCriterion("password not like", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordIn(List<String> values) {
            addCriterion("password in", values, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotIn(List<String> values) {
            addCriterion("password not in", values, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordBetween(String value1, String value2) {
            addCriterion("password between", value1, value2, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotBetween(String value1, String value2) {
            addCriterion("password not between", value1, value2, "password");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdIsNull() {
            addCriterion("identity_photo_front_id is null");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdIsNotNull() {
            addCriterion("identity_photo_front_id is not null");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdEqualTo(Integer value) {
            addCriterion("identity_photo_front_id =", value, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdNotEqualTo(Integer value) {
            addCriterion("identity_photo_front_id <>", value, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdGreaterThan(Integer value) {
            addCriterion("identity_photo_front_id >", value, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("identity_photo_front_id >=", value, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdLessThan(Integer value) {
            addCriterion("identity_photo_front_id <", value, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdLessThanOrEqualTo(Integer value) {
            addCriterion("identity_photo_front_id <=", value, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdIn(List<Integer> values) {
            addCriterion("identity_photo_front_id in", values, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdNotIn(List<Integer> values) {
            addCriterion("identity_photo_front_id not in", values, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdBetween(Integer value1, Integer value2) {
            addCriterion("identity_photo_front_id between", value1, value2, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoFrontIdNotBetween(Integer value1, Integer value2) {
            addCriterion("identity_photo_front_id not between", value1, value2, "identityPhotoFrontId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdIsNull() {
            addCriterion("identity_photo_back_id is null");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdIsNotNull() {
            addCriterion("identity_photo_back_id is not null");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdEqualTo(Integer value) {
            addCriterion("identity_photo_back_id =", value, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdNotEqualTo(Integer value) {
            addCriterion("identity_photo_back_id <>", value, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdGreaterThan(Integer value) {
            addCriterion("identity_photo_back_id >", value, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("identity_photo_back_id >=", value, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdLessThan(Integer value) {
            addCriterion("identity_photo_back_id <", value, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdLessThanOrEqualTo(Integer value) {
            addCriterion("identity_photo_back_id <=", value, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdIn(List<Integer> values) {
            addCriterion("identity_photo_back_id in", values, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdNotIn(List<Integer> values) {
            addCriterion("identity_photo_back_id not in", values, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdBetween(Integer value1, Integer value2) {
            addCriterion("identity_photo_back_id between", value1, value2, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andIdentityPhotoBackIdNotBetween(Integer value1, Integer value2) {
            addCriterion("identity_photo_back_id not between", value1, value2, "identityPhotoBackId");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeIsNull() {
            addCriterion("register_time is null");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeIsNotNull() {
            addCriterion("register_time is not null");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeEqualTo(Date value) {
            addCriterion("register_time =", value, "registerTime");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeNotEqualTo(Date value) {
            addCriterion("register_time <>", value, "registerTime");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeGreaterThan(Date value) {
            addCriterion("register_time >", value, "registerTime");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("register_time >=", value, "registerTime");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeLessThan(Date value) {
            addCriterion("register_time <", value, "registerTime");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeLessThanOrEqualTo(Date value) {
            addCriterion("register_time <=", value, "registerTime");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeIn(List<Date> values) {
            addCriterion("register_time in", values, "registerTime");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeNotIn(List<Date> values) {
            addCriterion("register_time not in", values, "registerTime");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeBetween(Date value1, Date value2) {
            addCriterion("register_time between", value1, value2, "registerTime");
            return (Criteria) this;
        }

        public Criteria andRegisterTimeNotBetween(Date value1, Date value2) {
            addCriterion("register_time not between", value1, value2, "registerTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeIsNull() {
            addCriterion("last_login_time is null");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeIsNotNull() {
            addCriterion("last_login_time is not null");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeEqualTo(Date value) {
            addCriterion("last_login_time =", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeNotEqualTo(Date value) {
            addCriterion("last_login_time <>", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeGreaterThan(Date value) {
            addCriterion("last_login_time >", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("last_login_time >=", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeLessThan(Date value) {
            addCriterion("last_login_time <", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeLessThanOrEqualTo(Date value) {
            addCriterion("last_login_time <=", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeIn(List<Date> values) {
            addCriterion("last_login_time in", values, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeNotIn(List<Date> values) {
            addCriterion("last_login_time not in", values, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeBetween(Date value1, Date value2) {
            addCriterion("last_login_time between", value1, value2, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeNotBetween(Date value1, Date value2) {
            addCriterion("last_login_time not between", value1, value2, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpIsNull() {
            addCriterion("last_login_ip is null");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpIsNotNull() {
            addCriterion("last_login_ip is not null");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpEqualTo(String value) {
            addCriterion("last_login_ip =", value, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpNotEqualTo(String value) {
            addCriterion("last_login_ip <>", value, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpGreaterThan(String value) {
            addCriterion("last_login_ip >", value, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpGreaterThanOrEqualTo(String value) {
            addCriterion("last_login_ip >=", value, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpLessThan(String value) {
            addCriterion("last_login_ip <", value, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpLessThanOrEqualTo(String value) {
            addCriterion("last_login_ip <=", value, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpLike(String value) {
            addCriterion("last_login_ip like", value, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpNotLike(String value) {
            addCriterion("last_login_ip not like", value, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpIn(List<String> values) {
            addCriterion("last_login_ip in", values, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpNotIn(List<String> values) {
            addCriterion("last_login_ip not in", values, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpBetween(String value1, String value2) {
            addCriterion("last_login_ip between", value1, value2, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginIpNotBetween(String value1, String value2) {
            addCriterion("last_login_ip not between", value1, value2, "lastLoginIp");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenIsNull() {
            addCriterion("last_login_token is null");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenIsNotNull() {
            addCriterion("last_login_token is not null");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenEqualTo(String value) {
            addCriterion("last_login_token =", value, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenNotEqualTo(String value) {
            addCriterion("last_login_token <>", value, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenGreaterThan(String value) {
            addCriterion("last_login_token >", value, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenGreaterThanOrEqualTo(String value) {
            addCriterion("last_login_token >=", value, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenLessThan(String value) {
            addCriterion("last_login_token <", value, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenLessThanOrEqualTo(String value) {
            addCriterion("last_login_token <=", value, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenLike(String value) {
            addCriterion("last_login_token like", value, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenNotLike(String value) {
            addCriterion("last_login_token not like", value, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenIn(List<String> values) {
            addCriterion("last_login_token in", values, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenNotIn(List<String> values) {
            addCriterion("last_login_token not in", values, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenBetween(String value1, String value2) {
            addCriterion("last_login_token between", value1, value2, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andLastLoginTokenNotBetween(String value1, String value2) {
            addCriterion("last_login_token not between", value1, value2, "lastLoginToken");
            return (Criteria) this;
        }

        public Criteria andAddressIsNull() {
            addCriterion("address is null");
            return (Criteria) this;
        }

        public Criteria andAddressIsNotNull() {
            addCriterion("address is not null");
            return (Criteria) this;
        }

        public Criteria andAddressEqualTo(String value) {
            addCriterion("address =", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressNotEqualTo(String value) {
            addCriterion("address <>", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressGreaterThan(String value) {
            addCriterion("address >", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressGreaterThanOrEqualTo(String value) {
            addCriterion("address >=", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressLessThan(String value) {
            addCriterion("address <", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressLessThanOrEqualTo(String value) {
            addCriterion("address <=", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressLike(String value) {
            addCriterion("address like", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressNotLike(String value) {
            addCriterion("address not like", value, "address");
            return (Criteria) this;
        }

        public Criteria andAddressIn(List<String> values) {
            addCriterion("address in", values, "address");
            return (Criteria) this;
        }

        public Criteria andAddressNotIn(List<String> values) {
            addCriterion("address not in", values, "address");
            return (Criteria) this;
        }

        public Criteria andAddressBetween(String value1, String value2) {
            addCriterion("address between", value1, value2, "address");
            return (Criteria) this;
        }

        public Criteria andAddressNotBetween(String value1, String value2) {
            addCriterion("address not between", value1, value2, "address");
            return (Criteria) this;
        }

        public Criteria andLonIsNull() {
            addCriterion("lon is null");
            return (Criteria) this;
        }

        public Criteria andLonIsNotNull() {
            addCriterion("lon is not null");
            return (Criteria) this;
        }

        public Criteria andLonEqualTo(Double value) {
            addCriterion("lon =", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonNotEqualTo(Double value) {
            addCriterion("lon <>", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonGreaterThan(Double value) {
            addCriterion("lon >", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonGreaterThanOrEqualTo(Double value) {
            addCriterion("lon >=", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonLessThan(Double value) {
            addCriterion("lon <", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonLessThanOrEqualTo(Double value) {
            addCriterion("lon <=", value, "lon");
            return (Criteria) this;
        }

        public Criteria andLonIn(List<Double> values) {
            addCriterion("lon in", values, "lon");
            return (Criteria) this;
        }

        public Criteria andLonNotIn(List<Double> values) {
            addCriterion("lon not in", values, "lon");
            return (Criteria) this;
        }

        public Criteria andLonBetween(Double value1, Double value2) {
            addCriterion("lon between", value1, value2, "lon");
            return (Criteria) this;
        }

        public Criteria andLonNotBetween(Double value1, Double value2) {
            addCriterion("lon not between", value1, value2, "lon");
            return (Criteria) this;
        }

        public Criteria andLatIsNull() {
            addCriterion("lat is null");
            return (Criteria) this;
        }

        public Criteria andLatIsNotNull() {
            addCriterion("lat is not null");
            return (Criteria) this;
        }

        public Criteria andLatEqualTo(Double value) {
            addCriterion("lat =", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotEqualTo(Double value) {
            addCriterion("lat <>", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatGreaterThan(Double value) {
            addCriterion("lat >", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatGreaterThanOrEqualTo(Double value) {
            addCriterion("lat >=", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatLessThan(Double value) {
            addCriterion("lat <", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatLessThanOrEqualTo(Double value) {
            addCriterion("lat <=", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatIn(List<Double> values) {
            addCriterion("lat in", values, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotIn(List<Double> values) {
            addCriterion("lat not in", values, "lat");
            return (Criteria) this;
        }

        public Criteria andLatBetween(Double value1, Double value2) {
            addCriterion("lat between", value1, value2, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotBetween(Double value1, Double value2) {
            addCriterion("lat not between", value1, value2, "lat");
            return (Criteria) this;
        }

        public Criteria andEnabledIsNull() {
            addCriterion("enabled is null");
            return (Criteria) this;
        }

        public Criteria andEnabledIsNotNull() {
            addCriterion("enabled is not null");
            return (Criteria) this;
        }

        public Criteria andEnabledEqualTo(Integer value) {
            addCriterion("enabled =", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledNotEqualTo(Integer value) {
            addCriterion("enabled <>", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledGreaterThan(Integer value) {
            addCriterion("enabled >", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledGreaterThanOrEqualTo(Integer value) {
            addCriterion("enabled >=", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledLessThan(Integer value) {
            addCriterion("enabled <", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledLessThanOrEqualTo(Integer value) {
            addCriterion("enabled <=", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledIn(List<Integer> values) {
            addCriterion("enabled in", values, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledNotIn(List<Integer> values) {
            addCriterion("enabled not in", values, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledBetween(Integer value1, Integer value2) {
            addCriterion("enabled between", value1, value2, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledNotBetween(Integer value1, Integer value2) {
            addCriterion("enabled not between", value1, value2, "enabled");
            return (Criteria) this;
        }

        public Criteria andGradeIsNull() {
            addCriterion("grade is null");
            return (Criteria) this;
        }

        public Criteria andGradeIsNotNull() {
            addCriterion("grade is not null");
            return (Criteria) this;
        }

        public Criteria andGradeEqualTo(Integer value) {
            addCriterion("grade =", value, "grade");
            return (Criteria) this;
        }

        public Criteria andGradeNotEqualTo(Integer value) {
            addCriterion("grade <>", value, "grade");
            return (Criteria) this;
        }

        public Criteria andGradeGreaterThan(Integer value) {
            addCriterion("grade >", value, "grade");
            return (Criteria) this;
        }

        public Criteria andGradeGreaterThanOrEqualTo(Integer value) {
            addCriterion("grade >=", value, "grade");
            return (Criteria) this;
        }

        public Criteria andGradeLessThan(Integer value) {
            addCriterion("grade <", value, "grade");
            return (Criteria) this;
        }

        public Criteria andGradeLessThanOrEqualTo(Integer value) {
            addCriterion("grade <=", value, "grade");
            return (Criteria) this;
        }

        public Criteria andGradeIn(List<Integer> values) {
            addCriterion("grade in", values, "grade");
            return (Criteria) this;
        }

        public Criteria andGradeNotIn(List<Integer> values) {
            addCriterion("grade not in", values, "grade");
            return (Criteria) this;
        }

        public Criteria andGradeBetween(Integer value1, Integer value2) {
            addCriterion("grade between", value1, value2, "grade");
            return (Criteria) this;
        }

        public Criteria andGradeNotBetween(Integer value1, Integer value2) {
            addCriterion("grade not between", value1, value2, "grade");
            return (Criteria) this;
        }

        public Criteria andLockedIsNull() {
            addCriterion("locked is null");
            return (Criteria) this;
        }

        public Criteria andLockedIsNotNull() {
            addCriterion("locked is not null");
            return (Criteria) this;
        }

        public Criteria andLockedEqualTo(Integer value) {
            addCriterion("locked =", value, "locked");
            return (Criteria) this;
        }

        public Criteria andLockedNotEqualTo(Integer value) {
            addCriterion("locked <>", value, "locked");
            return (Criteria) this;
        }

        public Criteria andLockedGreaterThan(Integer value) {
            addCriterion("locked >", value, "locked");
            return (Criteria) this;
        }

        public Criteria andLockedGreaterThanOrEqualTo(Integer value) {
            addCriterion("locked >=", value, "locked");
            return (Criteria) this;
        }

        public Criteria andLockedLessThan(Integer value) {
            addCriterion("locked <", value, "locked");
            return (Criteria) this;
        }

        public Criteria andLockedLessThanOrEqualTo(Integer value) {
            addCriterion("locked <=", value, "locked");
            return (Criteria) this;
        }

        public Criteria andLockedIn(List<Integer> values) {
            addCriterion("locked in", values, "locked");
            return (Criteria) this;
        }

        public Criteria andLockedNotIn(List<Integer> values) {
            addCriterion("locked not in", values, "locked");
            return (Criteria) this;
        }

        public Criteria andLockedBetween(Integer value1, Integer value2) {
            addCriterion("locked between", value1, value2, "locked");
            return (Criteria) this;
        }

        public Criteria andLockedNotBetween(Integer value1, Integer value2) {
            addCriterion("locked not between", value1, value2, "locked");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusIsNull() {
            addCriterion("merchant_status is null");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusIsNotNull() {
            addCriterion("merchant_status is not null");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusEqualTo(Integer value) {
            addCriterion("merchant_status =", value, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusNotEqualTo(Integer value) {
            addCriterion("merchant_status <>", value, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusGreaterThan(Integer value) {
            addCriterion("merchant_status >", value, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("merchant_status >=", value, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusLessThan(Integer value) {
            addCriterion("merchant_status <", value, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusLessThanOrEqualTo(Integer value) {
            addCriterion("merchant_status <=", value, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusIn(List<Integer> values) {
            addCriterion("merchant_status in", values, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusNotIn(List<Integer> values) {
            addCriterion("merchant_status not in", values, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusBetween(Integer value1, Integer value2) {
            addCriterion("merchant_status between", value1, value2, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andMerchantStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("merchant_status not between", value1, value2, "merchantStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusIsNull() {
            addCriterion("operating_status is null");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusIsNotNull() {
            addCriterion("operating_status is not null");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusEqualTo(Integer value) {
            addCriterion("operating_status =", value, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusNotEqualTo(Integer value) {
            addCriterion("operating_status <>", value, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusGreaterThan(Integer value) {
            addCriterion("operating_status >", value, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("operating_status >=", value, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusLessThan(Integer value) {
            addCriterion("operating_status <", value, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusLessThanOrEqualTo(Integer value) {
            addCriterion("operating_status <=", value, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusIn(List<Integer> values) {
            addCriterion("operating_status in", values, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusNotIn(List<Integer> values) {
            addCriterion("operating_status not in", values, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusBetween(Integer value1, Integer value2) {
            addCriterion("operating_status between", value1, value2, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andOperatingStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("operating_status not between", value1, value2, "operatingStatus");
            return (Criteria) this;
        }

        public Criteria andAdcodeIsNull() {
            addCriterion("adcode is null");
            return (Criteria) this;
        }

        public Criteria andAdcodeIsNotNull() {
            addCriterion("adcode is not null");
            return (Criteria) this;
        }

        public Criteria andAdcodeEqualTo(String value) {
            addCriterion("adcode =", value, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeNotEqualTo(String value) {
            addCriterion("adcode <>", value, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeGreaterThan(String value) {
            addCriterion("adcode >", value, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeGreaterThanOrEqualTo(String value) {
            addCriterion("adcode >=", value, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeLessThan(String value) {
            addCriterion("adcode <", value, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeLessThanOrEqualTo(String value) {
            addCriterion("adcode <=", value, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeLike(String value) {
            addCriterion("adcode like", value, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeNotLike(String value) {
            addCriterion("adcode not like", value, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeIn(List<String> values) {
            addCriterion("adcode in", values, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeNotIn(List<String> values) {
            addCriterion("adcode not in", values, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeBetween(String value1, String value2) {
            addCriterion("adcode between", value1, value2, "adcode");
            return (Criteria) this;
        }

        public Criteria andAdcodeNotBetween(String value1, String value2) {
            addCriterion("adcode not between", value1, value2, "adcode");
            return (Criteria) this;
        }

        public Criteria andCityCodeIsNull() {
            addCriterion("city_code is null");
            return (Criteria) this;
        }

        public Criteria andCityCodeIsNotNull() {
            addCriterion("city_code is not null");
            return (Criteria) this;
        }

        public Criteria andCityCodeEqualTo(String value) {
            addCriterion("city_code =", value, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeNotEqualTo(String value) {
            addCriterion("city_code <>", value, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeGreaterThan(String value) {
            addCriterion("city_code >", value, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeGreaterThanOrEqualTo(String value) {
            addCriterion("city_code >=", value, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeLessThan(String value) {
            addCriterion("city_code <", value, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeLessThanOrEqualTo(String value) {
            addCriterion("city_code <=", value, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeLike(String value) {
            addCriterion("city_code like", value, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeNotLike(String value) {
            addCriterion("city_code not like", value, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeIn(List<String> values) {
            addCriterion("city_code in", values, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeNotIn(List<String> values) {
            addCriterion("city_code not in", values, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeBetween(String value1, String value2) {
            addCriterion("city_code between", value1, value2, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityCodeNotBetween(String value1, String value2) {
            addCriterion("city_code not between", value1, value2, "cityCode");
            return (Criteria) this;
        }

        public Criteria andCityNameIsNull() {
            addCriterion("city_name is null");
            return (Criteria) this;
        }

        public Criteria andCityNameIsNotNull() {
            addCriterion("city_name is not null");
            return (Criteria) this;
        }

        public Criteria andCityNameEqualTo(String value) {
            addCriterion("city_name =", value, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameNotEqualTo(String value) {
            addCriterion("city_name <>", value, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameGreaterThan(String value) {
            addCriterion("city_name >", value, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameGreaterThanOrEqualTo(String value) {
            addCriterion("city_name >=", value, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameLessThan(String value) {
            addCriterion("city_name <", value, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameLessThanOrEqualTo(String value) {
            addCriterion("city_name <=", value, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameLike(String value) {
            addCriterion("city_name like", value, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameNotLike(String value) {
            addCriterion("city_name not like", value, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameIn(List<String> values) {
            addCriterion("city_name in", values, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameNotIn(List<String> values) {
            addCriterion("city_name not in", values, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameBetween(String value1, String value2) {
            addCriterion("city_name between", value1, value2, "cityName");
            return (Criteria) this;
        }

        public Criteria andCityNameNotBetween(String value1, String value2) {
            addCriterion("city_name not between", value1, value2, "cityName");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeIsNull() {
            addCriterion("expiration_time is null");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeIsNotNull() {
            addCriterion("expiration_time is not null");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeEqualTo(Date value) {
            addCriterion("expiration_time =", value, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeNotEqualTo(Date value) {
            addCriterion("expiration_time <>", value, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeGreaterThan(Date value) {
            addCriterion("expiration_time >", value, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("expiration_time >=", value, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeLessThan(Date value) {
            addCriterion("expiration_time <", value, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeLessThanOrEqualTo(Date value) {
            addCriterion("expiration_time <=", value, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeIn(List<Date> values) {
            addCriterion("expiration_time in", values, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeNotIn(List<Date> values) {
            addCriterion("expiration_time not in", values, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeBetween(Date value1, Date value2) {
            addCriterion("expiration_time between", value1, value2, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andExpirationTimeNotBetween(Date value1, Date value2) {
            addCriterion("expiration_time not between", value1, value2, "expirationTime");
            return (Criteria) this;
        }

        public Criteria andStarIsNull() {
            addCriterion("star is null");
            return (Criteria) this;
        }

        public Criteria andStarIsNotNull() {
            addCriterion("star is not null");
            return (Criteria) this;
        }

        public Criteria andStarEqualTo(Float value) {
            addCriterion("star =", value, "star");
            return (Criteria) this;
        }

        public Criteria andStarNotEqualTo(Float value) {
            addCriterion("star <>", value, "star");
            return (Criteria) this;
        }

        public Criteria andStarGreaterThan(Float value) {
            addCriterion("star >", value, "star");
            return (Criteria) this;
        }

        public Criteria andStarGreaterThanOrEqualTo(Float value) {
            addCriterion("star >=", value, "star");
            return (Criteria) this;
        }

        public Criteria andStarLessThan(Float value) {
            addCriterion("star <", value, "star");
            return (Criteria) this;
        }

        public Criteria andStarLessThanOrEqualTo(Float value) {
            addCriterion("star <=", value, "star");
            return (Criteria) this;
        }

        public Criteria andStarIn(List<Float> values) {
            addCriterion("star in", values, "star");
            return (Criteria) this;
        }

        public Criteria andStarNotIn(List<Float> values) {
            addCriterion("star not in", values, "star");
            return (Criteria) this;
        }

        public Criteria andStarBetween(Float value1, Float value2) {
            addCriterion("star between", value1, value2, "star");
            return (Criteria) this;
        }

        public Criteria andStarNotBetween(Float value1, Float value2) {
            addCriterion("star not between", value1, value2, "star");
            return (Criteria) this;
        }

        public Criteria andTelephoneIsNull() {
            addCriterion("telephone is null");
            return (Criteria) this;
        }

        public Criteria andTelephoneIsNotNull() {
            addCriterion("telephone is not null");
            return (Criteria) this;
        }

        public Criteria andTelephoneEqualTo(String value) {
            addCriterion("telephone =", value, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneNotEqualTo(String value) {
            addCriterion("telephone <>", value, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneGreaterThan(String value) {
            addCriterion("telephone >", value, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneGreaterThanOrEqualTo(String value) {
            addCriterion("telephone >=", value, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneLessThan(String value) {
            addCriterion("telephone <", value, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneLessThanOrEqualTo(String value) {
            addCriterion("telephone <=", value, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneLike(String value) {
            addCriterion("telephone like", value, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneNotLike(String value) {
            addCriterion("telephone not like", value, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneIn(List<String> values) {
            addCriterion("telephone in", values, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneNotIn(List<String> values) {
            addCriterion("telephone not in", values, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneBetween(String value1, String value2) {
            addCriterion("telephone between", value1, value2, "telephone");
            return (Criteria) this;
        }

        public Criteria andTelephoneNotBetween(String value1, String value2) {
            addCriterion("telephone not between", value1, value2, "telephone");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupIsNull() {
            addCriterion("alipay_steup is null");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupIsNotNull() {
            addCriterion("alipay_steup is not null");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupEqualTo(Integer value) {
            addCriterion("alipay_steup =", value, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupNotEqualTo(Integer value) {
            addCriterion("alipay_steup <>", value, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupGreaterThan(Integer value) {
            addCriterion("alipay_steup >", value, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupGreaterThanOrEqualTo(Integer value) {
            addCriterion("alipay_steup >=", value, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupLessThan(Integer value) {
            addCriterion("alipay_steup <", value, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupLessThanOrEqualTo(Integer value) {
            addCriterion("alipay_steup <=", value, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupIn(List<Integer> values) {
            addCriterion("alipay_steup in", values, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupNotIn(List<Integer> values) {
            addCriterion("alipay_steup not in", values, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupBetween(Integer value1, Integer value2) {
            addCriterion("alipay_steup between", value1, value2, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andAlipaySteupNotBetween(Integer value1, Integer value2) {
            addCriterion("alipay_steup not between", value1, value2, "alipaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupIsNull() {
            addCriterion("wxpay_steup is null");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupIsNotNull() {
            addCriterion("wxpay_steup is not null");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupEqualTo(Integer value) {
            addCriterion("wxpay_steup =", value, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupNotEqualTo(Integer value) {
            addCriterion("wxpay_steup <>", value, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupGreaterThan(Integer value) {
            addCriterion("wxpay_steup >", value, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupGreaterThanOrEqualTo(Integer value) {
            addCriterion("wxpay_steup >=", value, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupLessThan(Integer value) {
            addCriterion("wxpay_steup <", value, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupLessThanOrEqualTo(Integer value) {
            addCriterion("wxpay_steup <=", value, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupIn(List<Integer> values) {
            addCriterion("wxpay_steup in", values, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupNotIn(List<Integer> values) {
            addCriterion("wxpay_steup not in", values, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupBetween(Integer value1, Integer value2) {
            addCriterion("wxpay_steup between", value1, value2, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andWxpaySteupNotBetween(Integer value1, Integer value2) {
            addCriterion("wxpay_steup not between", value1, value2, "wxpaySteup");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusIsNull() {
            addCriterion("change_audit_status is null");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusIsNotNull() {
            addCriterion("change_audit_status is not null");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusEqualTo(Integer value) {
            addCriterion("change_audit_status =", value, "changeAuditStatus");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusNotEqualTo(Integer value) {
            addCriterion("change_audit_status <>", value, "changeAuditStatus");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusGreaterThan(Integer value) {
            addCriterion("change_audit_status >", value, "changeAuditStatus");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("change_audit_status >=", value, "changeAuditStatus");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusLessThan(Integer value) {
            addCriterion("change_audit_status <", value, "changeAuditStatus");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusLessThanOrEqualTo(Integer value) {
            addCriterion("change_audit_status <=", value, "changeAuditStatus");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusIn(List<Integer> values) {
            addCriterion("change_audit_status in", values, "changeAuditStatus");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusNotIn(List<Integer> values) {
            addCriterion("change_audit_status not in", values, "changeAuditStatus");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusBetween(Integer value1, Integer value2) {
            addCriterion("change_audit_status between", value1, value2, "changeAuditStatus");
            return (Criteria) this;
        }

        public Criteria andChangeAuditStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("change_audit_status not between", value1, value2, "changeAuditStatus");
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

        public Criteria andBizLicenseAuthIdIsNull() {
            addCriterion("biz_license_auth_id is null");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdIsNotNull() {
            addCriterion("biz_license_auth_id is not null");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdEqualTo(Integer value) {
            addCriterion("biz_license_auth_id =", value, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdNotEqualTo(Integer value) {
            addCriterion("biz_license_auth_id <>", value, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdGreaterThan(Integer value) {
            addCriterion("biz_license_auth_id >", value, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("biz_license_auth_id >=", value, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdLessThan(Integer value) {
            addCriterion("biz_license_auth_id <", value, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdLessThanOrEqualTo(Integer value) {
            addCriterion("biz_license_auth_id <=", value, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdIn(List<Integer> values) {
            addCriterion("biz_license_auth_id in", values, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdNotIn(List<Integer> values) {
            addCriterion("biz_license_auth_id not in", values, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdBetween(Integer value1, Integer value2) {
            addCriterion("biz_license_auth_id between", value1, value2, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andBizLicenseAuthIdNotBetween(Integer value1, Integer value2) {
            addCriterion("biz_license_auth_id not between", value1, value2, "bizLicenseAuthId");
            return (Criteria) this;
        }

        public Criteria andLogoPathIsNull() {
            addCriterion("logo_path is null");
            return (Criteria) this;
        }

        public Criteria andLogoPathIsNotNull() {
            addCriterion("logo_path is not null");
            return (Criteria) this;
        }

        public Criteria andLogoPathEqualTo(String value) {
            addCriterion("logo_path =", value, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathNotEqualTo(String value) {
            addCriterion("logo_path <>", value, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathGreaterThan(String value) {
            addCriterion("logo_path >", value, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathGreaterThanOrEqualTo(String value) {
            addCriterion("logo_path >=", value, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathLessThan(String value) {
            addCriterion("logo_path <", value, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathLessThanOrEqualTo(String value) {
            addCriterion("logo_path <=", value, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathLike(String value) {
            addCriterion("logo_path like", value, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathNotLike(String value) {
            addCriterion("logo_path not like", value, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathIn(List<String> values) {
            addCriterion("logo_path in", values, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathNotIn(List<String> values) {
            addCriterion("logo_path not in", values, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathBetween(String value1, String value2) {
            addCriterion("logo_path between", value1, value2, "logoPath");
            return (Criteria) this;
        }

        public Criteria andLogoPathNotBetween(String value1, String value2) {
            addCriterion("logo_path not between", value1, value2, "logoPath");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNull() {
            addCriterion("remark is null");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNotNull() {
            addCriterion("remark is not null");
            return (Criteria) this;
        }

        public Criteria andRemarkEqualTo(String value) {
            addCriterion("remark =", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotEqualTo(String value) {
            addCriterion("remark <>", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThan(String value) {
            addCriterion("remark >", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("remark >=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThan(String value) {
            addCriterion("remark <", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThanOrEqualTo(String value) {
            addCriterion("remark <=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLike(String value) {
            addCriterion("remark like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotLike(String value) {
            addCriterion("remark not like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkIn(List<String> values) {
            addCriterion("remark in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotIn(List<String> values) {
            addCriterion("remark not in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkBetween(String value1, String value2) {
            addCriterion("remark between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotBetween(String value1, String value2) {
            addCriterion("remark not between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andWxOpenidIsNull() {
            addCriterion("wx_openid is null");
            return (Criteria) this;
        }

        public Criteria andWxOpenidIsNotNull() {
            addCriterion("wx_openid is not null");
            return (Criteria) this;
        }

        public Criteria andWxOpenidEqualTo(String value) {
            addCriterion("wx_openid =", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidNotEqualTo(String value) {
            addCriterion("wx_openid <>", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidGreaterThan(String value) {
            addCriterion("wx_openid >", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidGreaterThanOrEqualTo(String value) {
            addCriterion("wx_openid >=", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidLessThan(String value) {
            addCriterion("wx_openid <", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidLessThanOrEqualTo(String value) {
            addCriterion("wx_openid <=", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidLike(String value) {
            addCriterion("wx_openid like", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidNotLike(String value) {
            addCriterion("wx_openid not like", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidIn(List<String> values) {
            addCriterion("wx_openid in", values, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidNotIn(List<String> values) {
            addCriterion("wx_openid not in", values, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidBetween(String value1, String value2) {
            addCriterion("wx_openid between", value1, value2, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidNotBetween(String value1, String value2) {
            addCriterion("wx_openid not between", value1, value2, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyIsNull() {
            addCriterion("merchant_property is null");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyIsNotNull() {
            addCriterion("merchant_property is not null");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyEqualTo(Integer value) {
            addCriterion("merchant_property =", value, "merchantProperty");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyNotEqualTo(Integer value) {
            addCriterion("merchant_property <>", value, "merchantProperty");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyGreaterThan(Integer value) {
            addCriterion("merchant_property >", value, "merchantProperty");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyGreaterThanOrEqualTo(Integer value) {
            addCriterion("merchant_property >=", value, "merchantProperty");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyLessThan(Integer value) {
            addCriterion("merchant_property <", value, "merchantProperty");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyLessThanOrEqualTo(Integer value) {
            addCriterion("merchant_property <=", value, "merchantProperty");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyIn(List<Integer> values) {
            addCriterion("merchant_property in", values, "merchantProperty");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyNotIn(List<Integer> values) {
            addCriterion("merchant_property not in", values, "merchantProperty");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyBetween(Integer value1, Integer value2) {
            addCriterion("merchant_property between", value1, value2, "merchantProperty");
            return (Criteria) this;
        }

        public Criteria andMerchantPropertyNotBetween(Integer value1, Integer value2) {
            addCriterion("merchant_property not between", value1, value2, "merchantProperty");
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