package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantAuditExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantAuditExample() {
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

        public Criteria andAuditDateIsNull() {
            addCriterion("audit_date is null");
            return (Criteria) this;
        }

        public Criteria andAuditDateIsNotNull() {
            addCriterion("audit_date is not null");
            return (Criteria) this;
        }

        public Criteria andAuditDateEqualTo(Date value) {
            addCriterion("audit_date =", value, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditDateNotEqualTo(Date value) {
            addCriterion("audit_date <>", value, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditDateGreaterThan(Date value) {
            addCriterion("audit_date >", value, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditDateGreaterThanOrEqualTo(Date value) {
            addCriterion("audit_date >=", value, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditDateLessThan(Date value) {
            addCriterion("audit_date <", value, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditDateLessThanOrEqualTo(Date value) {
            addCriterion("audit_date <=", value, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditDateIn(List<Date> values) {
            addCriterion("audit_date in", values, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditDateNotIn(List<Date> values) {
            addCriterion("audit_date not in", values, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditDateBetween(Date value1, Date value2) {
            addCriterion("audit_date between", value1, value2, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditDateNotBetween(Date value1, Date value2) {
            addCriterion("audit_date not between", value1, value2, "auditDate");
            return (Criteria) this;
        }

        public Criteria andAuditStatusIsNull() {
            addCriterion("audit_status is null");
            return (Criteria) this;
        }

        public Criteria andAuditStatusIsNotNull() {
            addCriterion("audit_status is not null");
            return (Criteria) this;
        }

        public Criteria andAuditStatusEqualTo(Integer value) {
            addCriterion("audit_status =", value, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditStatusNotEqualTo(Integer value) {
            addCriterion("audit_status <>", value, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditStatusGreaterThan(Integer value) {
            addCriterion("audit_status >", value, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("audit_status >=", value, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditStatusLessThan(Integer value) {
            addCriterion("audit_status <", value, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditStatusLessThanOrEqualTo(Integer value) {
            addCriterion("audit_status <=", value, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditStatusIn(List<Integer> values) {
            addCriterion("audit_status in", values, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditStatusNotIn(List<Integer> values) {
            addCriterion("audit_status not in", values, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditStatusBetween(Integer value1, Integer value2) {
            addCriterion("audit_status between", value1, value2, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("audit_status not between", value1, value2, "auditStatus");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkIsNull() {
            addCriterion("audit_remark is null");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkIsNotNull() {
            addCriterion("audit_remark is not null");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkEqualTo(String value) {
            addCriterion("audit_remark =", value, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkNotEqualTo(String value) {
            addCriterion("audit_remark <>", value, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkGreaterThan(String value) {
            addCriterion("audit_remark >", value, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("audit_remark >=", value, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkLessThan(String value) {
            addCriterion("audit_remark <", value, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkLessThanOrEqualTo(String value) {
            addCriterion("audit_remark <=", value, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkLike(String value) {
            addCriterion("audit_remark like", value, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkNotLike(String value) {
            addCriterion("audit_remark not like", value, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkIn(List<String> values) {
            addCriterion("audit_remark in", values, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkNotIn(List<String> values) {
            addCriterion("audit_remark not in", values, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkBetween(String value1, String value2) {
            addCriterion("audit_remark between", value1, value2, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditRemarkNotBetween(String value1, String value2) {
            addCriterion("audit_remark not between", value1, value2, "auditRemark");
            return (Criteria) this;
        }

        public Criteria andAuditAccountIsNull() {
            addCriterion("audit_account is null");
            return (Criteria) this;
        }

        public Criteria andAuditAccountIsNotNull() {
            addCriterion("audit_account is not null");
            return (Criteria) this;
        }

        public Criteria andAuditAccountEqualTo(String value) {
            addCriterion("audit_account =", value, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountNotEqualTo(String value) {
            addCriterion("audit_account <>", value, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountGreaterThan(String value) {
            addCriterion("audit_account >", value, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountGreaterThanOrEqualTo(String value) {
            addCriterion("audit_account >=", value, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountLessThan(String value) {
            addCriterion("audit_account <", value, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountLessThanOrEqualTo(String value) {
            addCriterion("audit_account <=", value, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountLike(String value) {
            addCriterion("audit_account like", value, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountNotLike(String value) {
            addCriterion("audit_account not like", value, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountIn(List<String> values) {
            addCriterion("audit_account in", values, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountNotIn(List<String> values) {
            addCriterion("audit_account not in", values, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountBetween(String value1, String value2) {
            addCriterion("audit_account between", value1, value2, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditAccountNotBetween(String value1, String value2) {
            addCriterion("audit_account not between", value1, value2, "auditAccount");
            return (Criteria) this;
        }

        public Criteria andAuditTypeIsNull() {
            addCriterion("audit_type is null");
            return (Criteria) this;
        }

        public Criteria andAuditTypeIsNotNull() {
            addCriterion("audit_type is not null");
            return (Criteria) this;
        }

        public Criteria andAuditTypeEqualTo(Integer value) {
            addCriterion("audit_type =", value, "auditType");
            return (Criteria) this;
        }

        public Criteria andAuditTypeNotEqualTo(Integer value) {
            addCriterion("audit_type <>", value, "auditType");
            return (Criteria) this;
        }

        public Criteria andAuditTypeGreaterThan(Integer value) {
            addCriterion("audit_type >", value, "auditType");
            return (Criteria) this;
        }

        public Criteria andAuditTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("audit_type >=", value, "auditType");
            return (Criteria) this;
        }

        public Criteria andAuditTypeLessThan(Integer value) {
            addCriterion("audit_type <", value, "auditType");
            return (Criteria) this;
        }

        public Criteria andAuditTypeLessThanOrEqualTo(Integer value) {
            addCriterion("audit_type <=", value, "auditType");
            return (Criteria) this;
        }

        public Criteria andAuditTypeIn(List<Integer> values) {
            addCriterion("audit_type in", values, "auditType");
            return (Criteria) this;
        }

        public Criteria andAuditTypeNotIn(List<Integer> values) {
            addCriterion("audit_type not in", values, "auditType");
            return (Criteria) this;
        }

        public Criteria andAuditTypeBetween(Integer value1, Integer value2) {
            addCriterion("audit_type between", value1, value2, "auditType");
            return (Criteria) this;
        }

        public Criteria andAuditTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("audit_type not between", value1, value2, "auditType");
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