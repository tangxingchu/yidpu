package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantBusinessRuleHisExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantBusinessRuleHisExample() {
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

        public Criteria andRuleCodeIsNull() {
            addCriterion("rule_code is null");
            return (Criteria) this;
        }

        public Criteria andRuleCodeIsNotNull() {
            addCriterion("rule_code is not null");
            return (Criteria) this;
        }

        public Criteria andRuleCodeEqualTo(String value) {
            addCriterion("rule_code =", value, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeNotEqualTo(String value) {
            addCriterion("rule_code <>", value, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeGreaterThan(String value) {
            addCriterion("rule_code >", value, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeGreaterThanOrEqualTo(String value) {
            addCriterion("rule_code >=", value, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeLessThan(String value) {
            addCriterion("rule_code <", value, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeLessThanOrEqualTo(String value) {
            addCriterion("rule_code <=", value, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeLike(String value) {
            addCriterion("rule_code like", value, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeNotLike(String value) {
            addCriterion("rule_code not like", value, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeIn(List<String> values) {
            addCriterion("rule_code in", values, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeNotIn(List<String> values) {
            addCriterion("rule_code not in", values, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeBetween(String value1, String value2) {
            addCriterion("rule_code between", value1, value2, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleCodeNotBetween(String value1, String value2) {
            addCriterion("rule_code not between", value1, value2, "ruleCode");
            return (Criteria) this;
        }

        public Criteria andRuleNameIsNull() {
            addCriterion("rule_name is null");
            return (Criteria) this;
        }

        public Criteria andRuleNameIsNotNull() {
            addCriterion("rule_name is not null");
            return (Criteria) this;
        }

        public Criteria andRuleNameEqualTo(String value) {
            addCriterion("rule_name =", value, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameNotEqualTo(String value) {
            addCriterion("rule_name <>", value, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameGreaterThan(String value) {
            addCriterion("rule_name >", value, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameGreaterThanOrEqualTo(String value) {
            addCriterion("rule_name >=", value, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameLessThan(String value) {
            addCriterion("rule_name <", value, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameLessThanOrEqualTo(String value) {
            addCriterion("rule_name <=", value, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameLike(String value) {
            addCriterion("rule_name like", value, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameNotLike(String value) {
            addCriterion("rule_name not like", value, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameIn(List<String> values) {
            addCriterion("rule_name in", values, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameNotIn(List<String> values) {
            addCriterion("rule_name not in", values, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameBetween(String value1, String value2) {
            addCriterion("rule_name between", value1, value2, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleNameNotBetween(String value1, String value2) {
            addCriterion("rule_name not between", value1, value2, "ruleName");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateIsNull() {
            addCriterion("rule_begin_date is null");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateIsNotNull() {
            addCriterion("rule_begin_date is not null");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateEqualTo(Date value) {
            addCriterion("rule_begin_date =", value, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateNotEqualTo(Date value) {
            addCriterion("rule_begin_date <>", value, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateGreaterThan(Date value) {
            addCriterion("rule_begin_date >", value, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateGreaterThanOrEqualTo(Date value) {
            addCriterion("rule_begin_date >=", value, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateLessThan(Date value) {
            addCriterion("rule_begin_date <", value, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateLessThanOrEqualTo(Date value) {
            addCriterion("rule_begin_date <=", value, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateIn(List<Date> values) {
            addCriterion("rule_begin_date in", values, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateNotIn(List<Date> values) {
            addCriterion("rule_begin_date not in", values, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateBetween(Date value1, Date value2) {
            addCriterion("rule_begin_date between", value1, value2, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleBeginDateNotBetween(Date value1, Date value2) {
            addCriterion("rule_begin_date not between", value1, value2, "ruleBeginDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateIsNull() {
            addCriterion("rule_end_date is null");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateIsNotNull() {
            addCriterion("rule_end_date is not null");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateEqualTo(Date value) {
            addCriterion("rule_end_date =", value, "ruleEndDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateNotEqualTo(Date value) {
            addCriterion("rule_end_date <>", value, "ruleEndDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateGreaterThan(Date value) {
            addCriterion("rule_end_date >", value, "ruleEndDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateGreaterThanOrEqualTo(Date value) {
            addCriterion("rule_end_date >=", value, "ruleEndDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateLessThan(Date value) {
            addCriterion("rule_end_date <", value, "ruleEndDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateLessThanOrEqualTo(Date value) {
            addCriterion("rule_end_date <=", value, "ruleEndDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateIn(List<Date> values) {
            addCriterion("rule_end_date in", values, "ruleEndDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateNotIn(List<Date> values) {
            addCriterion("rule_end_date not in", values, "ruleEndDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateBetween(Date value1, Date value2) {
            addCriterion("rule_end_date between", value1, value2, "ruleEndDate");
            return (Criteria) this;
        }

        public Criteria andRuleEndDateNotBetween(Date value1, Date value2) {
            addCriterion("rule_end_date not between", value1, value2, "ruleEndDate");
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