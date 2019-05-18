package com.weichu.mdesigner.common.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class MerchantBusinessInfoExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantBusinessInfoExample() {
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

        public Criteria andMorningEnabledIsNull() {
            addCriterion("morning_enabled is null");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledIsNotNull() {
            addCriterion("morning_enabled is not null");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledEqualTo(Integer value) {
            addCriterion("morning_enabled =", value, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledNotEqualTo(Integer value) {
            addCriterion("morning_enabled <>", value, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledGreaterThan(Integer value) {
            addCriterion("morning_enabled >", value, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledGreaterThanOrEqualTo(Integer value) {
            addCriterion("morning_enabled >=", value, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledLessThan(Integer value) {
            addCriterion("morning_enabled <", value, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledLessThanOrEqualTo(Integer value) {
            addCriterion("morning_enabled <=", value, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledIn(List<Integer> values) {
            addCriterion("morning_enabled in", values, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledNotIn(List<Integer> values) {
            addCriterion("morning_enabled not in", values, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledBetween(Integer value1, Integer value2) {
            addCriterion("morning_enabled between", value1, value2, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningEnabledNotBetween(Integer value1, Integer value2) {
            addCriterion("morning_enabled not between", value1, value2, "morningEnabled");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningIsNull() {
            addCriterion("morning_opening is null");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningIsNotNull() {
            addCriterion("morning_opening is not null");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningEqualTo(Date value) {
            addCriterionForJDBCTime("morning_opening =", value, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningNotEqualTo(Date value) {
            addCriterionForJDBCTime("morning_opening <>", value, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningGreaterThan(Date value) {
            addCriterionForJDBCTime("morning_opening >", value, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("morning_opening >=", value, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningLessThan(Date value) {
            addCriterionForJDBCTime("morning_opening <", value, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningLessThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("morning_opening <=", value, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningIn(List<Date> values) {
            addCriterionForJDBCTime("morning_opening in", values, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningNotIn(List<Date> values) {
            addCriterionForJDBCTime("morning_opening not in", values, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("morning_opening between", value1, value2, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningOpeningNotBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("morning_opening not between", value1, value2, "morningOpening");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingIsNull() {
            addCriterion("morning_closeing is null");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingIsNotNull() {
            addCriterion("morning_closeing is not null");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingEqualTo(Date value) {
            addCriterionForJDBCTime("morning_closeing =", value, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingNotEqualTo(Date value) {
            addCriterionForJDBCTime("morning_closeing <>", value, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingGreaterThan(Date value) {
            addCriterionForJDBCTime("morning_closeing >", value, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("morning_closeing >=", value, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingLessThan(Date value) {
            addCriterionForJDBCTime("morning_closeing <", value, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingLessThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("morning_closeing <=", value, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingIn(List<Date> values) {
            addCriterionForJDBCTime("morning_closeing in", values, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingNotIn(List<Date> values) {
            addCriterionForJDBCTime("morning_closeing not in", values, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("morning_closeing between", value1, value2, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andMorningCloseingNotBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("morning_closeing not between", value1, value2, "morningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledIsNull() {
            addCriterion("nooning_enabled is null");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledIsNotNull() {
            addCriterion("nooning_enabled is not null");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledEqualTo(Integer value) {
            addCriterion("nooning_enabled =", value, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledNotEqualTo(Integer value) {
            addCriterion("nooning_enabled <>", value, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledGreaterThan(Integer value) {
            addCriterion("nooning_enabled >", value, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledGreaterThanOrEqualTo(Integer value) {
            addCriterion("nooning_enabled >=", value, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledLessThan(Integer value) {
            addCriterion("nooning_enabled <", value, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledLessThanOrEqualTo(Integer value) {
            addCriterion("nooning_enabled <=", value, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledIn(List<Integer> values) {
            addCriterion("nooning_enabled in", values, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledNotIn(List<Integer> values) {
            addCriterion("nooning_enabled not in", values, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledBetween(Integer value1, Integer value2) {
            addCriterion("nooning_enabled between", value1, value2, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningEnabledNotBetween(Integer value1, Integer value2) {
            addCriterion("nooning_enabled not between", value1, value2, "nooningEnabled");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningIsNull() {
            addCriterion("nooning_opening is null");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningIsNotNull() {
            addCriterion("nooning_opening is not null");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningEqualTo(Date value) {
            addCriterionForJDBCTime("nooning_opening =", value, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningNotEqualTo(Date value) {
            addCriterionForJDBCTime("nooning_opening <>", value, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningGreaterThan(Date value) {
            addCriterionForJDBCTime("nooning_opening >", value, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("nooning_opening >=", value, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningLessThan(Date value) {
            addCriterionForJDBCTime("nooning_opening <", value, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningLessThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("nooning_opening <=", value, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningIn(List<Date> values) {
            addCriterionForJDBCTime("nooning_opening in", values, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningNotIn(List<Date> values) {
            addCriterionForJDBCTime("nooning_opening not in", values, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("nooning_opening between", value1, value2, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningOpeningNotBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("nooning_opening not between", value1, value2, "nooningOpening");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingIsNull() {
            addCriterion("nooning_closeing is null");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingIsNotNull() {
            addCriterion("nooning_closeing is not null");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingEqualTo(Date value) {
            addCriterionForJDBCTime("nooning_closeing =", value, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingNotEqualTo(Date value) {
            addCriterionForJDBCTime("nooning_closeing <>", value, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingGreaterThan(Date value) {
            addCriterionForJDBCTime("nooning_closeing >", value, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("nooning_closeing >=", value, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingLessThan(Date value) {
            addCriterionForJDBCTime("nooning_closeing <", value, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingLessThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("nooning_closeing <=", value, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingIn(List<Date> values) {
            addCriterionForJDBCTime("nooning_closeing in", values, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingNotIn(List<Date> values) {
            addCriterionForJDBCTime("nooning_closeing not in", values, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("nooning_closeing between", value1, value2, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andNooningCloseingNotBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("nooning_closeing not between", value1, value2, "nooningCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledIsNull() {
            addCriterion("afternoon_enabled is null");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledIsNotNull() {
            addCriterion("afternoon_enabled is not null");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledEqualTo(Integer value) {
            addCriterion("afternoon_enabled =", value, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledNotEqualTo(Integer value) {
            addCriterion("afternoon_enabled <>", value, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledGreaterThan(Integer value) {
            addCriterion("afternoon_enabled >", value, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledGreaterThanOrEqualTo(Integer value) {
            addCriterion("afternoon_enabled >=", value, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledLessThan(Integer value) {
            addCriterion("afternoon_enabled <", value, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledLessThanOrEqualTo(Integer value) {
            addCriterion("afternoon_enabled <=", value, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledIn(List<Integer> values) {
            addCriterion("afternoon_enabled in", values, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledNotIn(List<Integer> values) {
            addCriterion("afternoon_enabled not in", values, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledBetween(Integer value1, Integer value2) {
            addCriterion("afternoon_enabled between", value1, value2, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonEnabledNotBetween(Integer value1, Integer value2) {
            addCriterion("afternoon_enabled not between", value1, value2, "afternoonEnabled");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningIsNull() {
            addCriterion("afternoon_opening is null");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningIsNotNull() {
            addCriterion("afternoon_opening is not null");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningEqualTo(Date value) {
            addCriterionForJDBCTime("afternoon_opening =", value, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningNotEqualTo(Date value) {
            addCriterionForJDBCTime("afternoon_opening <>", value, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningGreaterThan(Date value) {
            addCriterionForJDBCTime("afternoon_opening >", value, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("afternoon_opening >=", value, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningLessThan(Date value) {
            addCriterionForJDBCTime("afternoon_opening <", value, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningLessThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("afternoon_opening <=", value, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningIn(List<Date> values) {
            addCriterionForJDBCTime("afternoon_opening in", values, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningNotIn(List<Date> values) {
            addCriterionForJDBCTime("afternoon_opening not in", values, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("afternoon_opening between", value1, value2, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonOpeningNotBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("afternoon_opening not between", value1, value2, "afternoonOpening");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingIsNull() {
            addCriterion("afternoon_closeing is null");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingIsNotNull() {
            addCriterion("afternoon_closeing is not null");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingEqualTo(Date value) {
            addCriterionForJDBCTime("afternoon_closeing =", value, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingNotEqualTo(Date value) {
            addCriterionForJDBCTime("afternoon_closeing <>", value, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingGreaterThan(Date value) {
            addCriterionForJDBCTime("afternoon_closeing >", value, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("afternoon_closeing >=", value, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingLessThan(Date value) {
            addCriterionForJDBCTime("afternoon_closeing <", value, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingLessThanOrEqualTo(Date value) {
            addCriterionForJDBCTime("afternoon_closeing <=", value, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingIn(List<Date> values) {
            addCriterionForJDBCTime("afternoon_closeing in", values, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingNotIn(List<Date> values) {
            addCriterionForJDBCTime("afternoon_closeing not in", values, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("afternoon_closeing between", value1, value2, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andAfternoonCloseingNotBetween(Date value1, Date value2) {
            addCriterionForJDBCTime("afternoon_closeing not between", value1, value2, "afternoonCloseing");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceIsNull() {
            addCriterion("takeout_distance is null");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceIsNotNull() {
            addCriterion("takeout_distance is not null");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceEqualTo(Float value) {
            addCriterion("takeout_distance =", value, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceNotEqualTo(Float value) {
            addCriterion("takeout_distance <>", value, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceGreaterThan(Float value) {
            addCriterion("takeout_distance >", value, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceGreaterThanOrEqualTo(Float value) {
            addCriterion("takeout_distance >=", value, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceLessThan(Float value) {
            addCriterion("takeout_distance <", value, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceLessThanOrEqualTo(Float value) {
            addCriterion("takeout_distance <=", value, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceIn(List<Float> values) {
            addCriterion("takeout_distance in", values, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceNotIn(List<Float> values) {
            addCriterion("takeout_distance not in", values, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceBetween(Float value1, Float value2) {
            addCriterion("takeout_distance between", value1, value2, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andTakeoutDistanceNotBetween(Float value1, Float value2) {
            addCriterion("takeout_distance not between", value1, value2, "takeoutDistance");
            return (Criteria) this;
        }

        public Criteria andHasParkingIsNull() {
            addCriterion("has_parking is null");
            return (Criteria) this;
        }

        public Criteria andHasParkingIsNotNull() {
            addCriterion("has_parking is not null");
            return (Criteria) this;
        }

        public Criteria andHasParkingEqualTo(String value) {
            addCriterion("has_parking =", value, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingNotEqualTo(String value) {
            addCriterion("has_parking <>", value, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingGreaterThan(String value) {
            addCriterion("has_parking >", value, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingGreaterThanOrEqualTo(String value) {
            addCriterion("has_parking >=", value, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingLessThan(String value) {
            addCriterion("has_parking <", value, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingLessThanOrEqualTo(String value) {
            addCriterion("has_parking <=", value, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingLike(String value) {
            addCriterion("has_parking like", value, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingNotLike(String value) {
            addCriterion("has_parking not like", value, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingIn(List<String> values) {
            addCriterion("has_parking in", values, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingNotIn(List<String> values) {
            addCriterion("has_parking not in", values, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingBetween(String value1, String value2) {
            addCriterion("has_parking between", value1, value2, "hasParking");
            return (Criteria) this;
        }

        public Criteria andHasParkingNotBetween(String value1, String value2) {
            addCriterion("has_parking not between", value1, value2, "hasParking");
            return (Criteria) this;
        }

        public Criteria andParkingIsNull() {
            addCriterion("parking is null");
            return (Criteria) this;
        }

        public Criteria andParkingIsNotNull() {
            addCriterion("parking is not null");
            return (Criteria) this;
        }

        public Criteria andParkingEqualTo(String value) {
            addCriterion("parking =", value, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingNotEqualTo(String value) {
            addCriterion("parking <>", value, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingGreaterThan(String value) {
            addCriterion("parking >", value, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingGreaterThanOrEqualTo(String value) {
            addCriterion("parking >=", value, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingLessThan(String value) {
            addCriterion("parking <", value, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingLessThanOrEqualTo(String value) {
            addCriterion("parking <=", value, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingLike(String value) {
            addCriterion("parking like", value, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingNotLike(String value) {
            addCriterion("parking not like", value, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingIn(List<String> values) {
            addCriterion("parking in", values, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingNotIn(List<String> values) {
            addCriterion("parking not in", values, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingBetween(String value1, String value2) {
            addCriterion("parking between", value1, value2, "parking");
            return (Criteria) this;
        }

        public Criteria andParkingNotBetween(String value1, String value2) {
            addCriterion("parking not between", value1, value2, "parking");
            return (Criteria) this;
        }

        public Criteria andPointCashIsNull() {
            addCriterion("point_cash is null");
            return (Criteria) this;
        }

        public Criteria andPointCashIsNotNull() {
            addCriterion("point_cash is not null");
            return (Criteria) this;
        }

        public Criteria andPointCashEqualTo(Integer value) {
            addCriterion("point_cash =", value, "pointCash");
            return (Criteria) this;
        }

        public Criteria andPointCashNotEqualTo(Integer value) {
            addCriterion("point_cash <>", value, "pointCash");
            return (Criteria) this;
        }

        public Criteria andPointCashGreaterThan(Integer value) {
            addCriterion("point_cash >", value, "pointCash");
            return (Criteria) this;
        }

        public Criteria andPointCashGreaterThanOrEqualTo(Integer value) {
            addCriterion("point_cash >=", value, "pointCash");
            return (Criteria) this;
        }

        public Criteria andPointCashLessThan(Integer value) {
            addCriterion("point_cash <", value, "pointCash");
            return (Criteria) this;
        }

        public Criteria andPointCashLessThanOrEqualTo(Integer value) {
            addCriterion("point_cash <=", value, "pointCash");
            return (Criteria) this;
        }

        public Criteria andPointCashIn(List<Integer> values) {
            addCriterion("point_cash in", values, "pointCash");
            return (Criteria) this;
        }

        public Criteria andPointCashNotIn(List<Integer> values) {
            addCriterion("point_cash not in", values, "pointCash");
            return (Criteria) this;
        }

        public Criteria andPointCashBetween(Integer value1, Integer value2) {
            addCriterion("point_cash between", value1, value2, "pointCash");
            return (Criteria) this;
        }

        public Criteria andPointCashNotBetween(Integer value1, Integer value2) {
            addCriterion("point_cash not between", value1, value2, "pointCash");
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