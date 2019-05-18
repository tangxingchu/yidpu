package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantAlipayInfoExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantAlipayInfoExample() {
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

        public Criteria andAlipayAppIdIsNull() {
            addCriterion("alipay_app_id is null");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdIsNotNull() {
            addCriterion("alipay_app_id is not null");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdEqualTo(String value) {
            addCriterion("alipay_app_id =", value, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdNotEqualTo(String value) {
            addCriterion("alipay_app_id <>", value, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdGreaterThan(String value) {
            addCriterion("alipay_app_id >", value, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdGreaterThanOrEqualTo(String value) {
            addCriterion("alipay_app_id >=", value, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdLessThan(String value) {
            addCriterion("alipay_app_id <", value, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdLessThanOrEqualTo(String value) {
            addCriterion("alipay_app_id <=", value, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdLike(String value) {
            addCriterion("alipay_app_id like", value, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdNotLike(String value) {
            addCriterion("alipay_app_id not like", value, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdIn(List<String> values) {
            addCriterion("alipay_app_id in", values, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdNotIn(List<String> values) {
            addCriterion("alipay_app_id not in", values, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdBetween(String value1, String value2) {
            addCriterion("alipay_app_id between", value1, value2, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayAppIdNotBetween(String value1, String value2) {
            addCriterion("alipay_app_id not between", value1, value2, "alipayAppId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdIsNull() {
            addCriterion("alipay_user_id is null");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdIsNotNull() {
            addCriterion("alipay_user_id is not null");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdEqualTo(String value) {
            addCriterion("alipay_user_id =", value, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdNotEqualTo(String value) {
            addCriterion("alipay_user_id <>", value, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdGreaterThan(String value) {
            addCriterion("alipay_user_id >", value, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("alipay_user_id >=", value, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdLessThan(String value) {
            addCriterion("alipay_user_id <", value, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdLessThanOrEqualTo(String value) {
            addCriterion("alipay_user_id <=", value, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdLike(String value) {
            addCriterion("alipay_user_id like", value, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdNotLike(String value) {
            addCriterion("alipay_user_id not like", value, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdIn(List<String> values) {
            addCriterion("alipay_user_id in", values, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdNotIn(List<String> values) {
            addCriterion("alipay_user_id not in", values, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdBetween(String value1, String value2) {
            addCriterion("alipay_user_id between", value1, value2, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayUserIdNotBetween(String value1, String value2) {
            addCriterion("alipay_user_id not between", value1, value2, "alipayUserId");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenIsNull() {
            addCriterion("alipay_token is null");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenIsNotNull() {
            addCriterion("alipay_token is not null");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenEqualTo(String value) {
            addCriterion("alipay_token =", value, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenNotEqualTo(String value) {
            addCriterion("alipay_token <>", value, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenGreaterThan(String value) {
            addCriterion("alipay_token >", value, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenGreaterThanOrEqualTo(String value) {
            addCriterion("alipay_token >=", value, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenLessThan(String value) {
            addCriterion("alipay_token <", value, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenLessThanOrEqualTo(String value) {
            addCriterion("alipay_token <=", value, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenLike(String value) {
            addCriterion("alipay_token like", value, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenNotLike(String value) {
            addCriterion("alipay_token not like", value, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenIn(List<String> values) {
            addCriterion("alipay_token in", values, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenNotIn(List<String> values) {
            addCriterion("alipay_token not in", values, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenBetween(String value1, String value2) {
            addCriterion("alipay_token between", value1, value2, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayTokenNotBetween(String value1, String value2) {
            addCriterion("alipay_token not between", value1, value2, "alipayToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenIsNull() {
            addCriterion("alipay_refresh_token is null");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenIsNotNull() {
            addCriterion("alipay_refresh_token is not null");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenEqualTo(String value) {
            addCriterion("alipay_refresh_token =", value, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenNotEqualTo(String value) {
            addCriterion("alipay_refresh_token <>", value, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenGreaterThan(String value) {
            addCriterion("alipay_refresh_token >", value, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenGreaterThanOrEqualTo(String value) {
            addCriterion("alipay_refresh_token >=", value, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenLessThan(String value) {
            addCriterion("alipay_refresh_token <", value, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenLessThanOrEqualTo(String value) {
            addCriterion("alipay_refresh_token <=", value, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenLike(String value) {
            addCriterion("alipay_refresh_token like", value, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenNotLike(String value) {
            addCriterion("alipay_refresh_token not like", value, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenIn(List<String> values) {
            addCriterion("alipay_refresh_token in", values, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenNotIn(List<String> values) {
            addCriterion("alipay_refresh_token not in", values, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenBetween(String value1, String value2) {
            addCriterion("alipay_refresh_token between", value1, value2, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andAlipayRefreshTokenNotBetween(String value1, String value2) {
            addCriterion("alipay_refresh_token not between", value1, value2, "alipayRefreshToken");
            return (Criteria) this;
        }

        public Criteria andHasChangeIsNull() {
            addCriterion("has_change is null");
            return (Criteria) this;
        }

        public Criteria andHasChangeIsNotNull() {
            addCriterion("has_change is not null");
            return (Criteria) this;
        }

        public Criteria andHasChangeEqualTo(Integer value) {
            addCriterion("has_change =", value, "hasChange");
            return (Criteria) this;
        }

        public Criteria andHasChangeNotEqualTo(Integer value) {
            addCriterion("has_change <>", value, "hasChange");
            return (Criteria) this;
        }

        public Criteria andHasChangeGreaterThan(Integer value) {
            addCriterion("has_change >", value, "hasChange");
            return (Criteria) this;
        }

        public Criteria andHasChangeGreaterThanOrEqualTo(Integer value) {
            addCriterion("has_change >=", value, "hasChange");
            return (Criteria) this;
        }

        public Criteria andHasChangeLessThan(Integer value) {
            addCriterion("has_change <", value, "hasChange");
            return (Criteria) this;
        }

        public Criteria andHasChangeLessThanOrEqualTo(Integer value) {
            addCriterion("has_change <=", value, "hasChange");
            return (Criteria) this;
        }

        public Criteria andHasChangeIn(List<Integer> values) {
            addCriterion("has_change in", values, "hasChange");
            return (Criteria) this;
        }

        public Criteria andHasChangeNotIn(List<Integer> values) {
            addCriterion("has_change not in", values, "hasChange");
            return (Criteria) this;
        }

        public Criteria andHasChangeBetween(Integer value1, Integer value2) {
            addCriterion("has_change between", value1, value2, "hasChange");
            return (Criteria) this;
        }

        public Criteria andHasChangeNotBetween(Integer value1, Integer value2) {
            addCriterion("has_change not between", value1, value2, "hasChange");
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