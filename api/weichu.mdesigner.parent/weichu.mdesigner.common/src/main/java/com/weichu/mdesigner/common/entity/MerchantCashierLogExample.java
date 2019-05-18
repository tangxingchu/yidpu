package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantCashierLogExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantCashierLogExample() {
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

        public Criteria andTableCodeIsNull() {
            addCriterion("table_code is null");
            return (Criteria) this;
        }

        public Criteria andTableCodeIsNotNull() {
            addCriterion("table_code is not null");
            return (Criteria) this;
        }

        public Criteria andTableCodeEqualTo(String value) {
            addCriterion("table_code =", value, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeNotEqualTo(String value) {
            addCriterion("table_code <>", value, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeGreaterThan(String value) {
            addCriterion("table_code >", value, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeGreaterThanOrEqualTo(String value) {
            addCriterion("table_code >=", value, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeLessThan(String value) {
            addCriterion("table_code <", value, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeLessThanOrEqualTo(String value) {
            addCriterion("table_code <=", value, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeLike(String value) {
            addCriterion("table_code like", value, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeNotLike(String value) {
            addCriterion("table_code not like", value, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeIn(List<String> values) {
            addCriterion("table_code in", values, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeNotIn(List<String> values) {
            addCriterion("table_code not in", values, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeBetween(String value1, String value2) {
            addCriterion("table_code between", value1, value2, "tableCode");
            return (Criteria) this;
        }

        public Criteria andTableCodeNotBetween(String value1, String value2) {
            addCriterion("table_code not between", value1, value2, "tableCode");
            return (Criteria) this;
        }

        public Criteria andCashierAmountIsNull() {
            addCriterion("cashier_amount is null");
            return (Criteria) this;
        }

        public Criteria andCashierAmountIsNotNull() {
            addCriterion("cashier_amount is not null");
            return (Criteria) this;
        }

        public Criteria andCashierAmountEqualTo(BigDecimal value) {
            addCriterion("cashier_amount =", value, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierAmountNotEqualTo(BigDecimal value) {
            addCriterion("cashier_amount <>", value, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierAmountGreaterThan(BigDecimal value) {
            addCriterion("cashier_amount >", value, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierAmountGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("cashier_amount >=", value, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierAmountLessThan(BigDecimal value) {
            addCriterion("cashier_amount <", value, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierAmountLessThanOrEqualTo(BigDecimal value) {
            addCriterion("cashier_amount <=", value, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierAmountIn(List<BigDecimal> values) {
            addCriterion("cashier_amount in", values, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierAmountNotIn(List<BigDecimal> values) {
            addCriterion("cashier_amount not in", values, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierAmountBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("cashier_amount between", value1, value2, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierAmountNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("cashier_amount not between", value1, value2, "cashierAmount");
            return (Criteria) this;
        }

        public Criteria andCashierTimeIsNull() {
            addCriterion("cashier_time is null");
            return (Criteria) this;
        }

        public Criteria andCashierTimeIsNotNull() {
            addCriterion("cashier_time is not null");
            return (Criteria) this;
        }

        public Criteria andCashierTimeEqualTo(Date value) {
            addCriterion("cashier_time =", value, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierTimeNotEqualTo(Date value) {
            addCriterion("cashier_time <>", value, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierTimeGreaterThan(Date value) {
            addCriterion("cashier_time >", value, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("cashier_time >=", value, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierTimeLessThan(Date value) {
            addCriterion("cashier_time <", value, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierTimeLessThanOrEqualTo(Date value) {
            addCriterion("cashier_time <=", value, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierTimeIn(List<Date> values) {
            addCriterion("cashier_time in", values, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierTimeNotIn(List<Date> values) {
            addCriterion("cashier_time not in", values, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierTimeBetween(Date value1, Date value2) {
            addCriterion("cashier_time between", value1, value2, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierTimeNotBetween(Date value1, Date value2) {
            addCriterion("cashier_time not between", value1, value2, "cashierTime");
            return (Criteria) this;
        }

        public Criteria andCashierMethodIsNull() {
            addCriterion("cashier_method is null");
            return (Criteria) this;
        }

        public Criteria andCashierMethodIsNotNull() {
            addCriterion("cashier_method is not null");
            return (Criteria) this;
        }

        public Criteria andCashierMethodEqualTo(Integer value) {
            addCriterion("cashier_method =", value, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andCashierMethodNotEqualTo(Integer value) {
            addCriterion("cashier_method <>", value, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andCashierMethodGreaterThan(Integer value) {
            addCriterion("cashier_method >", value, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andCashierMethodGreaterThanOrEqualTo(Integer value) {
            addCriterion("cashier_method >=", value, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andCashierMethodLessThan(Integer value) {
            addCriterion("cashier_method <", value, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andCashierMethodLessThanOrEqualTo(Integer value) {
            addCriterion("cashier_method <=", value, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andCashierMethodIn(List<Integer> values) {
            addCriterion("cashier_method in", values, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andCashierMethodNotIn(List<Integer> values) {
            addCriterion("cashier_method not in", values, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andCashierMethodBetween(Integer value1, Integer value2) {
            addCriterion("cashier_method between", value1, value2, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andCashierMethodNotBetween(Integer value1, Integer value2) {
            addCriterion("cashier_method not between", value1, value2, "cashierMethod");
            return (Criteria) this;
        }

        public Criteria andOrderNoIsNull() {
            addCriterion("order_no is null");
            return (Criteria) this;
        }

        public Criteria andOrderNoIsNotNull() {
            addCriterion("order_no is not null");
            return (Criteria) this;
        }

        public Criteria andOrderNoEqualTo(String value) {
            addCriterion("order_no =", value, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoNotEqualTo(String value) {
            addCriterion("order_no <>", value, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoGreaterThan(String value) {
            addCriterion("order_no >", value, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoGreaterThanOrEqualTo(String value) {
            addCriterion("order_no >=", value, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoLessThan(String value) {
            addCriterion("order_no <", value, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoLessThanOrEqualTo(String value) {
            addCriterion("order_no <=", value, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoLike(String value) {
            addCriterion("order_no like", value, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoNotLike(String value) {
            addCriterion("order_no not like", value, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoIn(List<String> values) {
            addCriterion("order_no in", values, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoNotIn(List<String> values) {
            addCriterion("order_no not in", values, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoBetween(String value1, String value2) {
            addCriterion("order_no between", value1, value2, "orderNo");
            return (Criteria) this;
        }

        public Criteria andOrderNoNotBetween(String value1, String value2) {
            addCriterion("order_no not between", value1, value2, "orderNo");
            return (Criteria) this;
        }

        public Criteria andCashierTypeIsNull() {
            addCriterion("cashier_type is null");
            return (Criteria) this;
        }

        public Criteria andCashierTypeIsNotNull() {
            addCriterion("cashier_type is not null");
            return (Criteria) this;
        }

        public Criteria andCashierTypeEqualTo(Integer value) {
            addCriterion("cashier_type =", value, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierTypeNotEqualTo(Integer value) {
            addCriterion("cashier_type <>", value, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierTypeGreaterThan(Integer value) {
            addCriterion("cashier_type >", value, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("cashier_type >=", value, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierTypeLessThan(Integer value) {
            addCriterion("cashier_type <", value, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierTypeLessThanOrEqualTo(Integer value) {
            addCriterion("cashier_type <=", value, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierTypeIn(List<Integer> values) {
            addCriterion("cashier_type in", values, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierTypeNotIn(List<Integer> values) {
            addCriterion("cashier_type not in", values, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierTypeBetween(Integer value1, Integer value2) {
            addCriterion("cashier_type between", value1, value2, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("cashier_type not between", value1, value2, "cashierType");
            return (Criteria) this;
        }

        public Criteria andCashierSourceIsNull() {
            addCriterion("cashier_source is null");
            return (Criteria) this;
        }

        public Criteria andCashierSourceIsNotNull() {
            addCriterion("cashier_source is not null");
            return (Criteria) this;
        }

        public Criteria andCashierSourceEqualTo(Integer value) {
            addCriterion("cashier_source =", value, "cashierSource");
            return (Criteria) this;
        }

        public Criteria andCashierSourceNotEqualTo(Integer value) {
            addCriterion("cashier_source <>", value, "cashierSource");
            return (Criteria) this;
        }

        public Criteria andCashierSourceGreaterThan(Integer value) {
            addCriterion("cashier_source >", value, "cashierSource");
            return (Criteria) this;
        }

        public Criteria andCashierSourceGreaterThanOrEqualTo(Integer value) {
            addCriterion("cashier_source >=", value, "cashierSource");
            return (Criteria) this;
        }

        public Criteria andCashierSourceLessThan(Integer value) {
            addCriterion("cashier_source <", value, "cashierSource");
            return (Criteria) this;
        }

        public Criteria andCashierSourceLessThanOrEqualTo(Integer value) {
            addCriterion("cashier_source <=", value, "cashierSource");
            return (Criteria) this;
        }

        public Criteria andCashierSourceIn(List<Integer> values) {
            addCriterion("cashier_source in", values, "cashierSource");
            return (Criteria) this;
        }

        public Criteria andCashierSourceNotIn(List<Integer> values) {
            addCriterion("cashier_source not in", values, "cashierSource");
            return (Criteria) this;
        }

        public Criteria andCashierSourceBetween(Integer value1, Integer value2) {
            addCriterion("cashier_source between", value1, value2, "cashierSource");
            return (Criteria) this;
        }

        public Criteria andCashierSourceNotBetween(Integer value1, Integer value2) {
            addCriterion("cashier_source not between", value1, value2, "cashierSource");
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