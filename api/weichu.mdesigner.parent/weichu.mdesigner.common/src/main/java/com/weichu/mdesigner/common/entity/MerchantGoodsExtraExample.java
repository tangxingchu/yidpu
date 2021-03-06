package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantGoodsExtraExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantGoodsExtraExample() {
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

        public Criteria andExtraIdIsNull() {
            addCriterion("extra_id is null");
            return (Criteria) this;
        }

        public Criteria andExtraIdIsNotNull() {
            addCriterion("extra_id is not null");
            return (Criteria) this;
        }

        public Criteria andExtraIdEqualTo(Integer value) {
            addCriterion("extra_id =", value, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraIdNotEqualTo(Integer value) {
            addCriterion("extra_id <>", value, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraIdGreaterThan(Integer value) {
            addCriterion("extra_id >", value, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("extra_id >=", value, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraIdLessThan(Integer value) {
            addCriterion("extra_id <", value, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraIdLessThanOrEqualTo(Integer value) {
            addCriterion("extra_id <=", value, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraIdIn(List<Integer> values) {
            addCriterion("extra_id in", values, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraIdNotIn(List<Integer> values) {
            addCriterion("extra_id not in", values, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraIdBetween(Integer value1, Integer value2) {
            addCriterion("extra_id between", value1, value2, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraIdNotBetween(Integer value1, Integer value2) {
            addCriterion("extra_id not between", value1, value2, "extraId");
            return (Criteria) this;
        }

        public Criteria andExtraCodeIsNull() {
            addCriterion("extra_code is null");
            return (Criteria) this;
        }

        public Criteria andExtraCodeIsNotNull() {
            addCriterion("extra_code is not null");
            return (Criteria) this;
        }

        public Criteria andExtraCodeEqualTo(String value) {
            addCriterion("extra_code =", value, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeNotEqualTo(String value) {
            addCriterion("extra_code <>", value, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeGreaterThan(String value) {
            addCriterion("extra_code >", value, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeGreaterThanOrEqualTo(String value) {
            addCriterion("extra_code >=", value, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeLessThan(String value) {
            addCriterion("extra_code <", value, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeLessThanOrEqualTo(String value) {
            addCriterion("extra_code <=", value, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeLike(String value) {
            addCriterion("extra_code like", value, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeNotLike(String value) {
            addCriterion("extra_code not like", value, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeIn(List<String> values) {
            addCriterion("extra_code in", values, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeNotIn(List<String> values) {
            addCriterion("extra_code not in", values, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeBetween(String value1, String value2) {
            addCriterion("extra_code between", value1, value2, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraCodeNotBetween(String value1, String value2) {
            addCriterion("extra_code not between", value1, value2, "extraCode");
            return (Criteria) this;
        }

        public Criteria andExtraNameIsNull() {
            addCriterion("extra_name is null");
            return (Criteria) this;
        }

        public Criteria andExtraNameIsNotNull() {
            addCriterion("extra_name is not null");
            return (Criteria) this;
        }

        public Criteria andExtraNameEqualTo(String value) {
            addCriterion("extra_name =", value, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameNotEqualTo(String value) {
            addCriterion("extra_name <>", value, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameGreaterThan(String value) {
            addCriterion("extra_name >", value, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameGreaterThanOrEqualTo(String value) {
            addCriterion("extra_name >=", value, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameLessThan(String value) {
            addCriterion("extra_name <", value, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameLessThanOrEqualTo(String value) {
            addCriterion("extra_name <=", value, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameLike(String value) {
            addCriterion("extra_name like", value, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameNotLike(String value) {
            addCriterion("extra_name not like", value, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameIn(List<String> values) {
            addCriterion("extra_name in", values, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameNotIn(List<String> values) {
            addCriterion("extra_name not in", values, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameBetween(String value1, String value2) {
            addCriterion("extra_name between", value1, value2, "extraName");
            return (Criteria) this;
        }

        public Criteria andExtraNameNotBetween(String value1, String value2) {
            addCriterion("extra_name not between", value1, value2, "extraName");
            return (Criteria) this;
        }

        public Criteria andGoodsIdIsNull() {
            addCriterion("goods_id is null");
            return (Criteria) this;
        }

        public Criteria andGoodsIdIsNotNull() {
            addCriterion("goods_id is not null");
            return (Criteria) this;
        }

        public Criteria andGoodsIdEqualTo(Integer value) {
            addCriterion("goods_id =", value, "goodsId");
            return (Criteria) this;
        }

        public Criteria andGoodsIdNotEqualTo(Integer value) {
            addCriterion("goods_id <>", value, "goodsId");
            return (Criteria) this;
        }

        public Criteria andGoodsIdGreaterThan(Integer value) {
            addCriterion("goods_id >", value, "goodsId");
            return (Criteria) this;
        }

        public Criteria andGoodsIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("goods_id >=", value, "goodsId");
            return (Criteria) this;
        }

        public Criteria andGoodsIdLessThan(Integer value) {
            addCriterion("goods_id <", value, "goodsId");
            return (Criteria) this;
        }

        public Criteria andGoodsIdLessThanOrEqualTo(Integer value) {
            addCriterion("goods_id <=", value, "goodsId");
            return (Criteria) this;
        }

        public Criteria andGoodsIdIn(List<Integer> values) {
            addCriterion("goods_id in", values, "goodsId");
            return (Criteria) this;
        }

        public Criteria andGoodsIdNotIn(List<Integer> values) {
            addCriterion("goods_id not in", values, "goodsId");
            return (Criteria) this;
        }

        public Criteria andGoodsIdBetween(Integer value1, Integer value2) {
            addCriterion("goods_id between", value1, value2, "goodsId");
            return (Criteria) this;
        }

        public Criteria andGoodsIdNotBetween(Integer value1, Integer value2) {
            addCriterion("goods_id not between", value1, value2, "goodsId");
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