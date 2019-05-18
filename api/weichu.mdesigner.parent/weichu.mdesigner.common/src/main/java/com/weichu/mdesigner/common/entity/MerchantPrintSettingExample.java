package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantPrintSettingExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantPrintSettingExample() {
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

        public Criteria andPrintTypeIsNull() {
            addCriterion("print_type is null");
            return (Criteria) this;
        }

        public Criteria andPrintTypeIsNotNull() {
            addCriterion("print_type is not null");
            return (Criteria) this;
        }

        public Criteria andPrintTypeEqualTo(Integer value) {
            addCriterion("print_type =", value, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintTypeNotEqualTo(Integer value) {
            addCriterion("print_type <>", value, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintTypeGreaterThan(Integer value) {
            addCriterion("print_type >", value, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("print_type >=", value, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintTypeLessThan(Integer value) {
            addCriterion("print_type <", value, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintTypeLessThanOrEqualTo(Integer value) {
            addCriterion("print_type <=", value, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintTypeIn(List<Integer> values) {
            addCriterion("print_type in", values, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintTypeNotIn(List<Integer> values) {
            addCriterion("print_type not in", values, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintTypeBetween(Integer value1, Integer value2) {
            addCriterion("print_type between", value1, value2, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("print_type not between", value1, value2, "printType");
            return (Criteria) this;
        }

        public Criteria andPrintVidIsNull() {
            addCriterion("print_vid is null");
            return (Criteria) this;
        }

        public Criteria andPrintVidIsNotNull() {
            addCriterion("print_vid is not null");
            return (Criteria) this;
        }

        public Criteria andPrintVidEqualTo(Integer value) {
            addCriterion("print_vid =", value, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintVidNotEqualTo(Integer value) {
            addCriterion("print_vid <>", value, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintVidGreaterThan(Integer value) {
            addCriterion("print_vid >", value, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintVidGreaterThanOrEqualTo(Integer value) {
            addCriterion("print_vid >=", value, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintVidLessThan(Integer value) {
            addCriterion("print_vid <", value, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintVidLessThanOrEqualTo(Integer value) {
            addCriterion("print_vid <=", value, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintVidIn(List<Integer> values) {
            addCriterion("print_vid in", values, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintVidNotIn(List<Integer> values) {
            addCriterion("print_vid not in", values, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintVidBetween(Integer value1, Integer value2) {
            addCriterion("print_vid between", value1, value2, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintVidNotBetween(Integer value1, Integer value2) {
            addCriterion("print_vid not between", value1, value2, "printVid");
            return (Criteria) this;
        }

        public Criteria andPrintPidIsNull() {
            addCriterion("print_pid is null");
            return (Criteria) this;
        }

        public Criteria andPrintPidIsNotNull() {
            addCriterion("print_pid is not null");
            return (Criteria) this;
        }

        public Criteria andPrintPidEqualTo(Integer value) {
            addCriterion("print_pid =", value, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintPidNotEqualTo(Integer value) {
            addCriterion("print_pid <>", value, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintPidGreaterThan(Integer value) {
            addCriterion("print_pid >", value, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintPidGreaterThanOrEqualTo(Integer value) {
            addCriterion("print_pid >=", value, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintPidLessThan(Integer value) {
            addCriterion("print_pid <", value, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintPidLessThanOrEqualTo(Integer value) {
            addCriterion("print_pid <=", value, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintPidIn(List<Integer> values) {
            addCriterion("print_pid in", values, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintPidNotIn(List<Integer> values) {
            addCriterion("print_pid not in", values, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintPidBetween(Integer value1, Integer value2) {
            addCriterion("print_pid between", value1, value2, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintPidNotBetween(Integer value1, Integer value2) {
            addCriterion("print_pid not between", value1, value2, "printPid");
            return (Criteria) this;
        }

        public Criteria andPrintIpIsNull() {
            addCriterion("print_ip is null");
            return (Criteria) this;
        }

        public Criteria andPrintIpIsNotNull() {
            addCriterion("print_ip is not null");
            return (Criteria) this;
        }

        public Criteria andPrintIpEqualTo(String value) {
            addCriterion("print_ip =", value, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpNotEqualTo(String value) {
            addCriterion("print_ip <>", value, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpGreaterThan(String value) {
            addCriterion("print_ip >", value, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpGreaterThanOrEqualTo(String value) {
            addCriterion("print_ip >=", value, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpLessThan(String value) {
            addCriterion("print_ip <", value, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpLessThanOrEqualTo(String value) {
            addCriterion("print_ip <=", value, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpLike(String value) {
            addCriterion("print_ip like", value, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpNotLike(String value) {
            addCriterion("print_ip not like", value, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpIn(List<String> values) {
            addCriterion("print_ip in", values, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpNotIn(List<String> values) {
            addCriterion("print_ip not in", values, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpBetween(String value1, String value2) {
            addCriterion("print_ip between", value1, value2, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintIpNotBetween(String value1, String value2) {
            addCriterion("print_ip not between", value1, value2, "printIp");
            return (Criteria) this;
        }

        public Criteria andPrintPortIsNull() {
            addCriterion("print_port is null");
            return (Criteria) this;
        }

        public Criteria andPrintPortIsNotNull() {
            addCriterion("print_port is not null");
            return (Criteria) this;
        }

        public Criteria andPrintPortEqualTo(Integer value) {
            addCriterion("print_port =", value, "printPort");
            return (Criteria) this;
        }

        public Criteria andPrintPortNotEqualTo(Integer value) {
            addCriterion("print_port <>", value, "printPort");
            return (Criteria) this;
        }

        public Criteria andPrintPortGreaterThan(Integer value) {
            addCriterion("print_port >", value, "printPort");
            return (Criteria) this;
        }

        public Criteria andPrintPortGreaterThanOrEqualTo(Integer value) {
            addCriterion("print_port >=", value, "printPort");
            return (Criteria) this;
        }

        public Criteria andPrintPortLessThan(Integer value) {
            addCriterion("print_port <", value, "printPort");
            return (Criteria) this;
        }

        public Criteria andPrintPortLessThanOrEqualTo(Integer value) {
            addCriterion("print_port <=", value, "printPort");
            return (Criteria) this;
        }

        public Criteria andPrintPortIn(List<Integer> values) {
            addCriterion("print_port in", values, "printPort");
            return (Criteria) this;
        }

        public Criteria andPrintPortNotIn(List<Integer> values) {
            addCriterion("print_port not in", values, "printPort");
            return (Criteria) this;
        }

        public Criteria andPrintPortBetween(Integer value1, Integer value2) {
            addCriterion("print_port between", value1, value2, "printPort");
            return (Criteria) this;
        }

        public Criteria andPrintPortNotBetween(Integer value1, Integer value2) {
            addCriterion("print_port not between", value1, value2, "printPort");
            return (Criteria) this;
        }

        public Criteria andNameIsNull() {
            addCriterion("name is null");
            return (Criteria) this;
        }

        public Criteria andNameIsNotNull() {
            addCriterion("name is not null");
            return (Criteria) this;
        }

        public Criteria andNameEqualTo(String value) {
            addCriterion("name =", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotEqualTo(String value) {
            addCriterion("name <>", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThan(String value) {
            addCriterion("name >", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThanOrEqualTo(String value) {
            addCriterion("name >=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThan(String value) {
            addCriterion("name <", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThanOrEqualTo(String value) {
            addCriterion("name <=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLike(String value) {
            addCriterion("name like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotLike(String value) {
            addCriterion("name not like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameIn(List<String> values) {
            addCriterion("name in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotIn(List<String> values) {
            addCriterion("name not in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameBetween(String value1, String value2) {
            addCriterion("name between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotBetween(String value1, String value2) {
            addCriterion("name not between", value1, value2, "name");
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