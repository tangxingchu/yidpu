package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantQueueExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantQueueExample() {
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

        public Criteria andQueueNameIsNull() {
            addCriterion("queue_name is null");
            return (Criteria) this;
        }

        public Criteria andQueueNameIsNotNull() {
            addCriterion("queue_name is not null");
            return (Criteria) this;
        }

        public Criteria andQueueNameEqualTo(String value) {
            addCriterion("queue_name =", value, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameNotEqualTo(String value) {
            addCriterion("queue_name <>", value, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameGreaterThan(String value) {
            addCriterion("queue_name >", value, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameGreaterThanOrEqualTo(String value) {
            addCriterion("queue_name >=", value, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameLessThan(String value) {
            addCriterion("queue_name <", value, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameLessThanOrEqualTo(String value) {
            addCriterion("queue_name <=", value, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameLike(String value) {
            addCriterion("queue_name like", value, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameNotLike(String value) {
            addCriterion("queue_name not like", value, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameIn(List<String> values) {
            addCriterion("queue_name in", values, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameNotIn(List<String> values) {
            addCriterion("queue_name not in", values, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameBetween(String value1, String value2) {
            addCriterion("queue_name between", value1, value2, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueNameNotBetween(String value1, String value2) {
            addCriterion("queue_name not between", value1, value2, "queueName");
            return (Criteria) this;
        }

        public Criteria andQueueCodeIsNull() {
            addCriterion("queue_code is null");
            return (Criteria) this;
        }

        public Criteria andQueueCodeIsNotNull() {
            addCriterion("queue_code is not null");
            return (Criteria) this;
        }

        public Criteria andQueueCodeEqualTo(String value) {
            addCriterion("queue_code =", value, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeNotEqualTo(String value) {
            addCriterion("queue_code <>", value, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeGreaterThan(String value) {
            addCriterion("queue_code >", value, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeGreaterThanOrEqualTo(String value) {
            addCriterion("queue_code >=", value, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeLessThan(String value) {
            addCriterion("queue_code <", value, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeLessThanOrEqualTo(String value) {
            addCriterion("queue_code <=", value, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeLike(String value) {
            addCriterion("queue_code like", value, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeNotLike(String value) {
            addCriterion("queue_code not like", value, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeIn(List<String> values) {
            addCriterion("queue_code in", values, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeNotIn(List<String> values) {
            addCriterion("queue_code not in", values, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeBetween(String value1, String value2) {
            addCriterion("queue_code between", value1, value2, "queueCode");
            return (Criteria) this;
        }

        public Criteria andQueueCodeNotBetween(String value1, String value2) {
            addCriterion("queue_code not between", value1, value2, "queueCode");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeIsNull() {
            addCriterion("average_wait_time is null");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeIsNotNull() {
            addCriterion("average_wait_time is not null");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeEqualTo(Integer value) {
            addCriterion("average_wait_time =", value, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeNotEqualTo(Integer value) {
            addCriterion("average_wait_time <>", value, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeGreaterThan(Integer value) {
            addCriterion("average_wait_time >", value, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeGreaterThanOrEqualTo(Integer value) {
            addCriterion("average_wait_time >=", value, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeLessThan(Integer value) {
            addCriterion("average_wait_time <", value, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeLessThanOrEqualTo(Integer value) {
            addCriterion("average_wait_time <=", value, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeIn(List<Integer> values) {
            addCriterion("average_wait_time in", values, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeNotIn(List<Integer> values) {
            addCriterion("average_wait_time not in", values, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeBetween(Integer value1, Integer value2) {
            addCriterion("average_wait_time between", value1, value2, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andAverageWaitTimeNotBetween(Integer value1, Integer value2) {
            addCriterion("average_wait_time not between", value1, value2, "averageWaitTime");
            return (Criteria) this;
        }

        public Criteria andTotalNumberIsNull() {
            addCriterion("total_number is null");
            return (Criteria) this;
        }

        public Criteria andTotalNumberIsNotNull() {
            addCriterion("total_number is not null");
            return (Criteria) this;
        }

        public Criteria andTotalNumberEqualTo(Integer value) {
            addCriterion("total_number =", value, "totalNumber");
            return (Criteria) this;
        }

        public Criteria andTotalNumberNotEqualTo(Integer value) {
            addCriterion("total_number <>", value, "totalNumber");
            return (Criteria) this;
        }

        public Criteria andTotalNumberGreaterThan(Integer value) {
            addCriterion("total_number >", value, "totalNumber");
            return (Criteria) this;
        }

        public Criteria andTotalNumberGreaterThanOrEqualTo(Integer value) {
            addCriterion("total_number >=", value, "totalNumber");
            return (Criteria) this;
        }

        public Criteria andTotalNumberLessThan(Integer value) {
            addCriterion("total_number <", value, "totalNumber");
            return (Criteria) this;
        }

        public Criteria andTotalNumberLessThanOrEqualTo(Integer value) {
            addCriterion("total_number <=", value, "totalNumber");
            return (Criteria) this;
        }

        public Criteria andTotalNumberIn(List<Integer> values) {
            addCriterion("total_number in", values, "totalNumber");
            return (Criteria) this;
        }

        public Criteria andTotalNumberNotIn(List<Integer> values) {
            addCriterion("total_number not in", values, "totalNumber");
            return (Criteria) this;
        }

        public Criteria andTotalNumberBetween(Integer value1, Integer value2) {
            addCriterion("total_number between", value1, value2, "totalNumber");
            return (Criteria) this;
        }

        public Criteria andTotalNumberNotBetween(Integer value1, Integer value2) {
            addCriterion("total_number not between", value1, value2, "totalNumber");
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

        public Criteria andDescriptionIsNull() {
            addCriterion("description is null");
            return (Criteria) this;
        }

        public Criteria andDescriptionIsNotNull() {
            addCriterion("description is not null");
            return (Criteria) this;
        }

        public Criteria andDescriptionEqualTo(String value) {
            addCriterion("description =", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotEqualTo(String value) {
            addCriterion("description <>", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionGreaterThan(String value) {
            addCriterion("description >", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionGreaterThanOrEqualTo(String value) {
            addCriterion("description >=", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLessThan(String value) {
            addCriterion("description <", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLessThanOrEqualTo(String value) {
            addCriterion("description <=", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLike(String value) {
            addCriterion("description like", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotLike(String value) {
            addCriterion("description not like", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionIn(List<String> values) {
            addCriterion("description in", values, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotIn(List<String> values) {
            addCriterion("description not in", values, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionBetween(String value1, String value2) {
            addCriterion("description between", value1, value2, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotBetween(String value1, String value2) {
            addCriterion("description not between", value1, value2, "description");
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