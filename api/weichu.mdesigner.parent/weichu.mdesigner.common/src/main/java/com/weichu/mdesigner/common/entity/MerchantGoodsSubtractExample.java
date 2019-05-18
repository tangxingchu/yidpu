package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class MerchantGoodsSubtractExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantGoodsSubtractExample() {
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

        protected void addCriterionForJDBCTime(String condition, Date value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Time(value.getTime()), property);
        }

        protected void addCriterionForJDBCTime(String condition, List<Date> values, String property) {
            if (values == null || values.size() == 0) {
                throw new RuntimeException("Value list for " + property + " cannot be null or empty");
            }
            List<java.sql.Time> timeList = new ArrayList<java.sql.Time>();
            Iterator<Date> iter = values.iterator();
            while (iter.hasNext()) {
                timeList.add(new java.sql.Time(iter.next().getTime()));
            }
            addCriterion(condition, timeList, property);
        }

        protected void addCriterionForJDBCTime(String condition, Date value1, Date value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Time(value1.getTime()), new java.sql.Time(value2.getTime()), property);
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

        public Criteria andConstraintTypeIsNull() {
            addCriterion("constraint_type is null");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeIsNotNull() {
            addCriterion("constraint_type is not null");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeEqualTo(Integer value) {
            addCriterion("constraint_type =", value, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeNotEqualTo(Integer value) {
            addCriterion("constraint_type <>", value, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeGreaterThan(Integer value) {
            addCriterion("constraint_type >", value, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("constraint_type >=", value, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeLessThan(Integer value) {
            addCriterion("constraint_type <", value, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeLessThanOrEqualTo(Integer value) {
            addCriterion("constraint_type <=", value, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeIn(List<Integer> values) {
            addCriterion("constraint_type in", values, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeNotIn(List<Integer> values) {
            addCriterion("constraint_type not in", values, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeBetween(Integer value1, Integer value2) {
            addCriterion("constraint_type between", value1, value2, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConstraintTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("constraint_type not between", value1, value2, "constraintType");
            return (Criteria) this;
        }

        public Criteria andConsumePriceIsNull() {
            addCriterion("consume_price is null");
            return (Criteria) this;
        }

        public Criteria andConsumePriceIsNotNull() {
            addCriterion("consume_price is not null");
            return (Criteria) this;
        }

        public Criteria andConsumePriceEqualTo(BigDecimal value) {
            addCriterion("consume_price =", value, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConsumePriceNotEqualTo(BigDecimal value) {
            addCriterion("consume_price <>", value, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConsumePriceGreaterThan(BigDecimal value) {
            addCriterion("consume_price >", value, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConsumePriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("consume_price >=", value, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConsumePriceLessThan(BigDecimal value) {
            addCriterion("consume_price <", value, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConsumePriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("consume_price <=", value, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConsumePriceIn(List<BigDecimal> values) {
            addCriterion("consume_price in", values, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConsumePriceNotIn(List<BigDecimal> values) {
            addCriterion("consume_price not in", values, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConsumePriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("consume_price between", value1, value2, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConsumePriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("consume_price not between", value1, value2, "consumePrice");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartIsNull() {
            addCriterion("constraint_time_start is null");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartIsNotNull() {
            addCriterion("constraint_time_start is not null");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartEqualTo(Date value) {
            addCriterionForJDBCTime("constraint_time_start =", value, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartNotEqualTo(Date value) {
            addCriterionForJDBCTime("constraint_time_start <>", value, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartGreaterThan(Date value) {
            addCriterionForJDBCTime("constraint_time_start >", value, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("constraint_time_start >=", value, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartLessThan(Date value) {
            addCriterionForJDBCTime("constraint_time_start <", value, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartLessThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("constraint_time_start <=", value, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartIn(List<Date> values) {
            addCriterionForJDBCTime("constraint_time_start in", values, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartNotIn(List<Date> values) {
            addCriterionForJDBCTime("constraint_time_start not in", values, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("constraint_time_start between", value1, value2, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeStartNotBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("constraint_time_start not between", value1, value2, "constraintTimeStart");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndIsNull() {
            addCriterion("constraint_time_end is null");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndIsNotNull() {
            addCriterion("constraint_time_end is not null");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndEqualTo(Date value) {
            addCriterionForJDBCTime("constraint_time_end =", value, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndNotEqualTo(Date value) {
            addCriterionForJDBCTime("constraint_time_end <>", value, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndGreaterThan(Date value) {
            addCriterionForJDBCTime("constraint_time_end >", value, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("constraint_time_end >=", value, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndLessThan(Date value) {
            addCriterionForJDBCTime("constraint_time_end <", value, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndLessThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("constraint_time_end <=", value, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndIn(List<Date> values) {
            addCriterionForJDBCTime("constraint_time_end in", values, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndNotIn(List<Date> values) {
            addCriterionForJDBCTime("constraint_time_end not in", values, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("constraint_time_end between", value1, value2, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andConstraintTimeEndNotBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("constraint_time_end not between", value1, value2, "constraintTimeEnd");
            return (Criteria) this;
        }

        public Criteria andTypeIsNull() {
            addCriterion("type is null");
            return (Criteria) this;
        }

        public Criteria andTypeIsNotNull() {
            addCriterion("type is not null");
            return (Criteria) this;
        }

        public Criteria andTypeEqualTo(Integer value) {
            addCriterion("type =", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotEqualTo(Integer value) {
            addCriterion("type <>", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThan(Integer value) {
            addCriterion("type >", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("type >=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThan(Integer value) {
            addCriterion("type <", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThanOrEqualTo(Integer value) {
            addCriterion("type <=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeIn(List<Integer> values) {
            addCriterion("type in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotIn(List<Integer> values) {
            addCriterion("type not in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeBetween(Integer value1, Integer value2) {
            addCriterion("type between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("type not between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andAmount1IsNull() {
            addCriterion("amount1 is null");
            return (Criteria) this;
        }

        public Criteria andAmount1IsNotNull() {
            addCriterion("amount1 is not null");
            return (Criteria) this;
        }

        public Criteria andAmount1EqualTo(BigDecimal value) {
            addCriterion("amount1 =", value, "amount1");
            return (Criteria) this;
        }

        public Criteria andAmount1NotEqualTo(BigDecimal value) {
            addCriterion("amount1 <>", value, "amount1");
            return (Criteria) this;
        }

        public Criteria andAmount1GreaterThan(BigDecimal value) {
            addCriterion("amount1 >", value, "amount1");
            return (Criteria) this;
        }

        public Criteria andAmount1GreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("amount1 >=", value, "amount1");
            return (Criteria) this;
        }

        public Criteria andAmount1LessThan(BigDecimal value) {
            addCriterion("amount1 <", value, "amount1");
            return (Criteria) this;
        }

        public Criteria andAmount1LessThanOrEqualTo(BigDecimal value) {
            addCriterion("amount1 <=", value, "amount1");
            return (Criteria) this;
        }

        public Criteria andAmount1In(List<BigDecimal> values) {
            addCriterion("amount1 in", values, "amount1");
            return (Criteria) this;
        }

        public Criteria andAmount1NotIn(List<BigDecimal> values) {
            addCriterion("amount1 not in", values, "amount1");
            return (Criteria) this;
        }

        public Criteria andAmount1Between(BigDecimal value1, BigDecimal value2) {
            addCriterion("amount1 between", value1, value2, "amount1");
            return (Criteria) this;
        }

        public Criteria andAmount1NotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("amount1 not between", value1, value2, "amount1");
            return (Criteria) this;
        }

        public Criteria andDiscountIsNull() {
            addCriterion("discount is null");
            return (Criteria) this;
        }

        public Criteria andDiscountIsNotNull() {
            addCriterion("discount is not null");
            return (Criteria) this;
        }

        public Criteria andDiscountEqualTo(BigDecimal value) {
            addCriterion("discount =", value, "discount");
            return (Criteria) this;
        }

        public Criteria andDiscountNotEqualTo(BigDecimal value) {
            addCriterion("discount <>", value, "discount");
            return (Criteria) this;
        }

        public Criteria andDiscountGreaterThan(BigDecimal value) {
            addCriterion("discount >", value, "discount");
            return (Criteria) this;
        }

        public Criteria andDiscountGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("discount >=", value, "discount");
            return (Criteria) this;
        }

        public Criteria andDiscountLessThan(BigDecimal value) {
            addCriterion("discount <", value, "discount");
            return (Criteria) this;
        }

        public Criteria andDiscountLessThanOrEqualTo(BigDecimal value) {
            addCriterion("discount <=", value, "discount");
            return (Criteria) this;
        }

        public Criteria andDiscountIn(List<BigDecimal> values) {
            addCriterion("discount in", values, "discount");
            return (Criteria) this;
        }

        public Criteria andDiscountNotIn(List<BigDecimal> values) {
            addCriterion("discount not in", values, "discount");
            return (Criteria) this;
        }

        public Criteria andDiscountBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("discount between", value1, value2, "discount");
            return (Criteria) this;
        }

        public Criteria andDiscountNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("discount not between", value1, value2, "discount");
            return (Criteria) this;
        }

        public Criteria andAmount2IsNull() {
            addCriterion("amount2 is null");
            return (Criteria) this;
        }

        public Criteria andAmount2IsNotNull() {
            addCriterion("amount2 is not null");
            return (Criteria) this;
        }

        public Criteria andAmount2EqualTo(BigDecimal value) {
            addCriterion("amount2 =", value, "amount2");
            return (Criteria) this;
        }

        public Criteria andAmount2NotEqualTo(BigDecimal value) {
            addCriterion("amount2 <>", value, "amount2");
            return (Criteria) this;
        }

        public Criteria andAmount2GreaterThan(BigDecimal value) {
            addCriterion("amount2 >", value, "amount2");
            return (Criteria) this;
        }

        public Criteria andAmount2GreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("amount2 >=", value, "amount2");
            return (Criteria) this;
        }

        public Criteria andAmount2LessThan(BigDecimal value) {
            addCriterion("amount2 <", value, "amount2");
            return (Criteria) this;
        }

        public Criteria andAmount2LessThanOrEqualTo(BigDecimal value) {
            addCriterion("amount2 <=", value, "amount2");
            return (Criteria) this;
        }

        public Criteria andAmount2In(List<BigDecimal> values) {
            addCriterion("amount2 in", values, "amount2");
            return (Criteria) this;
        }

        public Criteria andAmount2NotIn(List<BigDecimal> values) {
            addCriterion("amount2 not in", values, "amount2");
            return (Criteria) this;
        }

        public Criteria andAmount2Between(BigDecimal value1, BigDecimal value2) {
            addCriterion("amount2 between", value1, value2, "amount2");
            return (Criteria) this;
        }

        public Criteria andAmount2NotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("amount2 not between", value1, value2, "amount2");
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

        public Criteria andEnabledIsNull() {
            addCriterion("enabled is null");
            return (Criteria) this;
        }

        public Criteria andEnabledIsNotNull() {
            addCriterion("enabled is not null");
            return (Criteria) this;
        }

        public Criteria andEnabledEqualTo(String value) {
            addCriterion("enabled =", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledNotEqualTo(String value) {
            addCriterion("enabled <>", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledGreaterThan(String value) {
            addCriterion("enabled >", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledGreaterThanOrEqualTo(String value) {
            addCriterion("enabled >=", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledLessThan(String value) {
            addCriterion("enabled <", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledLessThanOrEqualTo(String value) {
            addCriterion("enabled <=", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledLike(String value) {
            addCriterion("enabled like", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledNotLike(String value) {
            addCriterion("enabled not like", value, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledIn(List<String> values) {
            addCriterion("enabled in", values, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledNotIn(List<String> values) {
            addCriterion("enabled not in", values, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledBetween(String value1, String value2) {
            addCriterion("enabled between", value1, value2, "enabled");
            return (Criteria) this;
        }

        public Criteria andEnabledNotBetween(String value1, String value2) {
            addCriterion("enabled not between", value1, value2, "enabled");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeIsNull() {
            addCriterion("effective_time is null");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeIsNotNull() {
            addCriterion("effective_time is not null");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeEqualTo(Date value) {
            addCriterion("effective_time =", value, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeNotEqualTo(Date value) {
            addCriterion("effective_time <>", value, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeGreaterThan(Date value) {
            addCriterion("effective_time >", value, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("effective_time >=", value, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeLessThan(Date value) {
            addCriterion("effective_time <", value, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeLessThanOrEqualTo(Date value) {
            addCriterion("effective_time <=", value, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeIn(List<Date> values) {
            addCriterion("effective_time in", values, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeNotIn(List<Date> values) {
            addCriterion("effective_time not in", values, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeBetween(Date value1, Date value2) {
            addCriterion("effective_time between", value1, value2, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andEffectiveTimeNotBetween(Date value1, Date value2) {
            addCriterion("effective_time not between", value1, value2, "effectiveTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeIsNull() {
            addCriterion("expired_time is null");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeIsNotNull() {
            addCriterion("expired_time is not null");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeEqualTo(Date value) {
            addCriterion("expired_time =", value, "expiredTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeNotEqualTo(Date value) {
            addCriterion("expired_time <>", value, "expiredTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeGreaterThan(Date value) {
            addCriterion("expired_time >", value, "expiredTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("expired_time >=", value, "expiredTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeLessThan(Date value) {
            addCriterion("expired_time <", value, "expiredTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeLessThanOrEqualTo(Date value) {
            addCriterion("expired_time <=", value, "expiredTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeIn(List<Date> values) {
            addCriterion("expired_time in", values, "expiredTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeNotIn(List<Date> values) {
            addCriterion("expired_time not in", values, "expiredTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeBetween(Date value1, Date value2) {
            addCriterion("expired_time between", value1, value2, "expiredTime");
            return (Criteria) this;
        }

        public Criteria andExpiredTimeNotBetween(Date value1, Date value2) {
            addCriterion("expired_time not between", value1, value2, "expiredTime");
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