package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MemberChangeHisExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MemberChangeHisExample() {
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

        public Criteria andMemberIdIsNull() {
            addCriterion("member_id is null");
            return (Criteria) this;
        }

        public Criteria andMemberIdIsNotNull() {
            addCriterion("member_id is not null");
            return (Criteria) this;
        }

        public Criteria andMemberIdEqualTo(Integer value) {
            addCriterion("member_id =", value, "memberId");
            return (Criteria) this;
        }

        public Criteria andMemberIdNotEqualTo(Integer value) {
            addCriterion("member_id <>", value, "memberId");
            return (Criteria) this;
        }

        public Criteria andMemberIdGreaterThan(Integer value) {
            addCriterion("member_id >", value, "memberId");
            return (Criteria) this;
        }

        public Criteria andMemberIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("member_id >=", value, "memberId");
            return (Criteria) this;
        }

        public Criteria andMemberIdLessThan(Integer value) {
            addCriterion("member_id <", value, "memberId");
            return (Criteria) this;
        }

        public Criteria andMemberIdLessThanOrEqualTo(Integer value) {
            addCriterion("member_id <=", value, "memberId");
            return (Criteria) this;
        }

        public Criteria andMemberIdIn(List<Integer> values) {
            addCriterion("member_id in", values, "memberId");
            return (Criteria) this;
        }

        public Criteria andMemberIdNotIn(List<Integer> values) {
            addCriterion("member_id not in", values, "memberId");
            return (Criteria) this;
        }

        public Criteria andMemberIdBetween(Integer value1, Integer value2) {
            addCriterion("member_id between", value1, value2, "memberId");
            return (Criteria) this;
        }

        public Criteria andMemberIdNotBetween(Integer value1, Integer value2) {
            addCriterion("member_id not between", value1, value2, "memberId");
            return (Criteria) this;
        }

        public Criteria andChangeTypeIsNull() {
            addCriterion("change_type is null");
            return (Criteria) this;
        }

        public Criteria andChangeTypeIsNotNull() {
            addCriterion("change_type is not null");
            return (Criteria) this;
        }

        public Criteria andChangeTypeEqualTo(Integer value) {
            addCriterion("change_type =", value, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeTypeNotEqualTo(Integer value) {
            addCriterion("change_type <>", value, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeTypeGreaterThan(Integer value) {
            addCriterion("change_type >", value, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("change_type >=", value, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeTypeLessThan(Integer value) {
            addCriterion("change_type <", value, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeTypeLessThanOrEqualTo(Integer value) {
            addCriterion("change_type <=", value, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeTypeIn(List<Integer> values) {
            addCriterion("change_type in", values, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeTypeNotIn(List<Integer> values) {
            addCriterion("change_type not in", values, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeTypeBetween(Integer value1, Integer value2) {
            addCriterion("change_type between", value1, value2, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("change_type not between", value1, value2, "changeType");
            return (Criteria) this;
        }

        public Criteria andChangeDescIsNull() {
            addCriterion("change_desc is null");
            return (Criteria) this;
        }

        public Criteria andChangeDescIsNotNull() {
            addCriterion("change_desc is not null");
            return (Criteria) this;
        }

        public Criteria andChangeDescEqualTo(String value) {
            addCriterion("change_desc =", value, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescNotEqualTo(String value) {
            addCriterion("change_desc <>", value, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescGreaterThan(String value) {
            addCriterion("change_desc >", value, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescGreaterThanOrEqualTo(String value) {
            addCriterion("change_desc >=", value, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescLessThan(String value) {
            addCriterion("change_desc <", value, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescLessThanOrEqualTo(String value) {
            addCriterion("change_desc <=", value, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescLike(String value) {
            addCriterion("change_desc like", value, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescNotLike(String value) {
            addCriterion("change_desc not like", value, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescIn(List<String> values) {
            addCriterion("change_desc in", values, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescNotIn(List<String> values) {
            addCriterion("change_desc not in", values, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescBetween(String value1, String value2) {
            addCriterion("change_desc between", value1, value2, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeDescNotBetween(String value1, String value2) {
            addCriterion("change_desc not between", value1, value2, "changeDesc");
            return (Criteria) this;
        }

        public Criteria andChangeTimeIsNull() {
            addCriterion("change_time is null");
            return (Criteria) this;
        }

        public Criteria andChangeTimeIsNotNull() {
            addCriterion("change_time is not null");
            return (Criteria) this;
        }

        public Criteria andChangeTimeEqualTo(Date value) {
            addCriterion("change_time =", value, "changeTime");
            return (Criteria) this;
        }

        public Criteria andChangeTimeNotEqualTo(Date value) {
            addCriterion("change_time <>", value, "changeTime");
            return (Criteria) this;
        }

        public Criteria andChangeTimeGreaterThan(Date value) {
            addCriterion("change_time >", value, "changeTime");
            return (Criteria) this;
        }

        public Criteria andChangeTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("change_time >=", value, "changeTime");
            return (Criteria) this;
        }

        public Criteria andChangeTimeLessThan(Date value) {
            addCriterion("change_time <", value, "changeTime");
            return (Criteria) this;
        }

        public Criteria andChangeTimeLessThanOrEqualTo(Date value) {
            addCriterion("change_time <=", value, "changeTime");
            return (Criteria) this;
        }

        public Criteria andChangeTimeIn(List<Date> values) {
            addCriterion("change_time in", values, "changeTime");
            return (Criteria) this;
        }

        public Criteria andChangeTimeNotIn(List<Date> values) {
            addCriterion("change_time not in", values, "changeTime");
            return (Criteria) this;
        }

        public Criteria andChangeTimeBetween(Date value1, Date value2) {
            addCriterion("change_time between", value1, value2, "changeTime");
            return (Criteria) this;
        }

        public Criteria andChangeTimeNotBetween(Date value1, Date value2) {
            addCriterion("change_time not between", value1, value2, "changeTime");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneIsNull() {
            addCriterion("before_phone is null");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneIsNotNull() {
            addCriterion("before_phone is not null");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneEqualTo(String value) {
            addCriterion("before_phone =", value, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneNotEqualTo(String value) {
            addCriterion("before_phone <>", value, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneGreaterThan(String value) {
            addCriterion("before_phone >", value, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneGreaterThanOrEqualTo(String value) {
            addCriterion("before_phone >=", value, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneLessThan(String value) {
            addCriterion("before_phone <", value, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneLessThanOrEqualTo(String value) {
            addCriterion("before_phone <=", value, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneLike(String value) {
            addCriterion("before_phone like", value, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneNotLike(String value) {
            addCriterion("before_phone not like", value, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneIn(List<String> values) {
            addCriterion("before_phone in", values, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneNotIn(List<String> values) {
            addCriterion("before_phone not in", values, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneBetween(String value1, String value2) {
            addCriterion("before_phone between", value1, value2, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andBeforePhoneNotBetween(String value1, String value2) {
            addCriterion("before_phone not between", value1, value2, "beforePhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneIsNull() {
            addCriterion("after_phone is null");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneIsNotNull() {
            addCriterion("after_phone is not null");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneEqualTo(String value) {
            addCriterion("after_phone =", value, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneNotEqualTo(String value) {
            addCriterion("after_phone <>", value, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneGreaterThan(String value) {
            addCriterion("after_phone >", value, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneGreaterThanOrEqualTo(String value) {
            addCriterion("after_phone >=", value, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneLessThan(String value) {
            addCriterion("after_phone <", value, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneLessThanOrEqualTo(String value) {
            addCriterion("after_phone <=", value, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneLike(String value) {
            addCriterion("after_phone like", value, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneNotLike(String value) {
            addCriterion("after_phone not like", value, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneIn(List<String> values) {
            addCriterion("after_phone in", values, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneNotIn(List<String> values) {
            addCriterion("after_phone not in", values, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneBetween(String value1, String value2) {
            addCriterion("after_phone between", value1, value2, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andAfterPhoneNotBetween(String value1, String value2) {
            addCriterion("after_phone not between", value1, value2, "afterPhone");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathIsNull() {
            addCriterion("change_img_path is null");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathIsNotNull() {
            addCriterion("change_img_path is not null");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathEqualTo(String value) {
            addCriterion("change_img_path =", value, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathNotEqualTo(String value) {
            addCriterion("change_img_path <>", value, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathGreaterThan(String value) {
            addCriterion("change_img_path >", value, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathGreaterThanOrEqualTo(String value) {
            addCriterion("change_img_path >=", value, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathLessThan(String value) {
            addCriterion("change_img_path <", value, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathLessThanOrEqualTo(String value) {
            addCriterion("change_img_path <=", value, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathLike(String value) {
            addCriterion("change_img_path like", value, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathNotLike(String value) {
            addCriterion("change_img_path not like", value, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathIn(List<String> values) {
            addCriterion("change_img_path in", values, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathNotIn(List<String> values) {
            addCriterion("change_img_path not in", values, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathBetween(String value1, String value2) {
            addCriterion("change_img_path between", value1, value2, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andChangeImgPathNotBetween(String value1, String value2) {
            addCriterion("change_img_path not between", value1, value2, "changeImgPath");
            return (Criteria) this;
        }

        public Criteria andOperationStaffIsNull() {
            addCriterion("operation_staff is null");
            return (Criteria) this;
        }

        public Criteria andOperationStaffIsNotNull() {
            addCriterion("operation_staff is not null");
            return (Criteria) this;
        }

        public Criteria andOperationStaffEqualTo(String value) {
            addCriterion("operation_staff =", value, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffNotEqualTo(String value) {
            addCriterion("operation_staff <>", value, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffGreaterThan(String value) {
            addCriterion("operation_staff >", value, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffGreaterThanOrEqualTo(String value) {
            addCriterion("operation_staff >=", value, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffLessThan(String value) {
            addCriterion("operation_staff <", value, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffLessThanOrEqualTo(String value) {
            addCriterion("operation_staff <=", value, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffLike(String value) {
            addCriterion("operation_staff like", value, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffNotLike(String value) {
            addCriterion("operation_staff not like", value, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffIn(List<String> values) {
            addCriterion("operation_staff in", values, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffNotIn(List<String> values) {
            addCriterion("operation_staff not in", values, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffBetween(String value1, String value2) {
            addCriterion("operation_staff between", value1, value2, "operationStaff");
            return (Criteria) this;
        }

        public Criteria andOperationStaffNotBetween(String value1, String value2) {
            addCriterion("operation_staff not between", value1, value2, "operationStaff");
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