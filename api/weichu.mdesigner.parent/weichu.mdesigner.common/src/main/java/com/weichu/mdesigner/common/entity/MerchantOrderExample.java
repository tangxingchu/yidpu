package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantOrderExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantOrderExample() {
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

        public Criteria andOutTradeNoIsNull() {
            addCriterion("out_trade_no is null");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoIsNotNull() {
            addCriterion("out_trade_no is not null");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoEqualTo(String value) {
            addCriterion("out_trade_no =", value, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoNotEqualTo(String value) {
            addCriterion("out_trade_no <>", value, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoGreaterThan(String value) {
            addCriterion("out_trade_no >", value, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoGreaterThanOrEqualTo(String value) {
            addCriterion("out_trade_no >=", value, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoLessThan(String value) {
            addCriterion("out_trade_no <", value, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoLessThanOrEqualTo(String value) {
            addCriterion("out_trade_no <=", value, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoLike(String value) {
            addCriterion("out_trade_no like", value, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoNotLike(String value) {
            addCriterion("out_trade_no not like", value, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoIn(List<String> values) {
            addCriterion("out_trade_no in", values, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoNotIn(List<String> values) {
            addCriterion("out_trade_no not in", values, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoBetween(String value1, String value2) {
            addCriterion("out_trade_no between", value1, value2, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andOutTradeNoNotBetween(String value1, String value2) {
            addCriterion("out_trade_no not between", value1, value2, "outTradeNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoIsNull() {
            addCriterion("pay_order_no is null");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoIsNotNull() {
            addCriterion("pay_order_no is not null");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoEqualTo(String value) {
            addCriterion("pay_order_no =", value, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoNotEqualTo(String value) {
            addCriterion("pay_order_no <>", value, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoGreaterThan(String value) {
            addCriterion("pay_order_no >", value, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoGreaterThanOrEqualTo(String value) {
            addCriterion("pay_order_no >=", value, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoLessThan(String value) {
            addCriterion("pay_order_no <", value, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoLessThanOrEqualTo(String value) {
            addCriterion("pay_order_no <=", value, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoLike(String value) {
            addCriterion("pay_order_no like", value, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoNotLike(String value) {
            addCriterion("pay_order_no not like", value, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoIn(List<String> values) {
            addCriterion("pay_order_no in", values, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoNotIn(List<String> values) {
            addCriterion("pay_order_no not in", values, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoBetween(String value1, String value2) {
            addCriterion("pay_order_no between", value1, value2, "payOrderNo");
            return (Criteria) this;
        }

        public Criteria andPayOrderNoNotBetween(String value1, String value2) {
            addCriterion("pay_order_no not between", value1, value2, "payOrderNo");
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

        public Criteria andDinersNumIsNull() {
            addCriterion("diners_num is null");
            return (Criteria) this;
        }

        public Criteria andDinersNumIsNotNull() {
            addCriterion("diners_num is not null");
            return (Criteria) this;
        }

        public Criteria andDinersNumEqualTo(Integer value) {
            addCriterion("diners_num =", value, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andDinersNumNotEqualTo(Integer value) {
            addCriterion("diners_num <>", value, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andDinersNumGreaterThan(Integer value) {
            addCriterion("diners_num >", value, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andDinersNumGreaterThanOrEqualTo(Integer value) {
            addCriterion("diners_num >=", value, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andDinersNumLessThan(Integer value) {
            addCriterion("diners_num <", value, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andDinersNumLessThanOrEqualTo(Integer value) {
            addCriterion("diners_num <=", value, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andDinersNumIn(List<Integer> values) {
            addCriterion("diners_num in", values, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andDinersNumNotIn(List<Integer> values) {
            addCriterion("diners_num not in", values, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andDinersNumBetween(Integer value1, Integer value2) {
            addCriterion("diners_num between", value1, value2, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andDinersNumNotBetween(Integer value1, Integer value2) {
            addCriterion("diners_num not between", value1, value2, "dinersNum");
            return (Criteria) this;
        }

        public Criteria andOrderStatusIsNull() {
            addCriterion("order_status is null");
            return (Criteria) this;
        }

        public Criteria andOrderStatusIsNotNull() {
            addCriterion("order_status is not null");
            return (Criteria) this;
        }

        public Criteria andOrderStatusEqualTo(String value) {
            addCriterion("order_status =", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusNotEqualTo(String value) {
            addCriterion("order_status <>", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusGreaterThan(String value) {
            addCriterion("order_status >", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusGreaterThanOrEqualTo(String value) {
            addCriterion("order_status >=", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusLessThan(String value) {
            addCriterion("order_status <", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusLessThanOrEqualTo(String value) {
            addCriterion("order_status <=", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusLike(String value) {
            addCriterion("order_status like", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusNotLike(String value) {
            addCriterion("order_status not like", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusIn(List<String> values) {
            addCriterion("order_status in", values, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusNotIn(List<String> values) {
            addCriterion("order_status not in", values, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusBetween(String value1, String value2) {
            addCriterion("order_status between", value1, value2, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusNotBetween(String value1, String value2) {
            addCriterion("order_status not between", value1, value2, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderTimeIsNull() {
            addCriterion("order_time is null");
            return (Criteria) this;
        }

        public Criteria andOrderTimeIsNotNull() {
            addCriterion("order_time is not null");
            return (Criteria) this;
        }

        public Criteria andOrderTimeEqualTo(Date value) {
            addCriterion("order_time =", value, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderTimeNotEqualTo(Date value) {
            addCriterion("order_time <>", value, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderTimeGreaterThan(Date value) {
            addCriterion("order_time >", value, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("order_time >=", value, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderTimeLessThan(Date value) {
            addCriterion("order_time <", value, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderTimeLessThanOrEqualTo(Date value) {
            addCriterion("order_time <=", value, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderTimeIn(List<Date> values) {
            addCriterion("order_time in", values, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderTimeNotIn(List<Date> values) {
            addCriterion("order_time not in", values, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderTimeBetween(Date value1, Date value2) {
            addCriterion("order_time between", value1, value2, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderTimeNotBetween(Date value1, Date value2) {
            addCriterion("order_time not between", value1, value2, "orderTime");
            return (Criteria) this;
        }

        public Criteria andOrderChannelIsNull() {
            addCriterion("order_channel is null");
            return (Criteria) this;
        }

        public Criteria andOrderChannelIsNotNull() {
            addCriterion("order_channel is not null");
            return (Criteria) this;
        }

        public Criteria andOrderChannelEqualTo(Integer value) {
            addCriterion("order_channel =", value, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderChannelNotEqualTo(Integer value) {
            addCriterion("order_channel <>", value, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderChannelGreaterThan(Integer value) {
            addCriterion("order_channel >", value, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderChannelGreaterThanOrEqualTo(Integer value) {
            addCriterion("order_channel >=", value, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderChannelLessThan(Integer value) {
            addCriterion("order_channel <", value, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderChannelLessThanOrEqualTo(Integer value) {
            addCriterion("order_channel <=", value, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderChannelIn(List<Integer> values) {
            addCriterion("order_channel in", values, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderChannelNotIn(List<Integer> values) {
            addCriterion("order_channel not in", values, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderChannelBetween(Integer value1, Integer value2) {
            addCriterion("order_channel between", value1, value2, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderChannelNotBetween(Integer value1, Integer value2) {
            addCriterion("order_channel not between", value1, value2, "orderChannel");
            return (Criteria) this;
        }

        public Criteria andOrderMethodIsNull() {
            addCriterion("order_method is null");
            return (Criteria) this;
        }

        public Criteria andOrderMethodIsNotNull() {
            addCriterion("order_method is not null");
            return (Criteria) this;
        }

        public Criteria andOrderMethodEqualTo(Integer value) {
            addCriterion("order_method =", value, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andOrderMethodNotEqualTo(Integer value) {
            addCriterion("order_method <>", value, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andOrderMethodGreaterThan(Integer value) {
            addCriterion("order_method >", value, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andOrderMethodGreaterThanOrEqualTo(Integer value) {
            addCriterion("order_method >=", value, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andOrderMethodLessThan(Integer value) {
            addCriterion("order_method <", value, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andOrderMethodLessThanOrEqualTo(Integer value) {
            addCriterion("order_method <=", value, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andOrderMethodIn(List<Integer> values) {
            addCriterion("order_method in", values, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andOrderMethodNotIn(List<Integer> values) {
            addCriterion("order_method not in", values, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andOrderMethodBetween(Integer value1, Integer value2) {
            addCriterion("order_method between", value1, value2, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andOrderMethodNotBetween(Integer value1, Integer value2) {
            addCriterion("order_method not between", value1, value2, "orderMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodIsNull() {
            addCriterion("pay_method is null");
            return (Criteria) this;
        }

        public Criteria andPayMethodIsNotNull() {
            addCriterion("pay_method is not null");
            return (Criteria) this;
        }

        public Criteria andPayMethodEqualTo(Integer value) {
            addCriterion("pay_method =", value, "payMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodNotEqualTo(Integer value) {
            addCriterion("pay_method <>", value, "payMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodGreaterThan(Integer value) {
            addCriterion("pay_method >", value, "payMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodGreaterThanOrEqualTo(Integer value) {
            addCriterion("pay_method >=", value, "payMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodLessThan(Integer value) {
            addCriterion("pay_method <", value, "payMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodLessThanOrEqualTo(Integer value) {
            addCriterion("pay_method <=", value, "payMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodIn(List<Integer> values) {
            addCriterion("pay_method in", values, "payMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodNotIn(List<Integer> values) {
            addCriterion("pay_method not in", values, "payMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodBetween(Integer value1, Integer value2) {
            addCriterion("pay_method between", value1, value2, "payMethod");
            return (Criteria) this;
        }

        public Criteria andPayMethodNotBetween(Integer value1, Integer value2) {
            addCriterion("pay_method not between", value1, value2, "payMethod");
            return (Criteria) this;
        }

        public Criteria andTotalPriceIsNull() {
            addCriterion("total_price is null");
            return (Criteria) this;
        }

        public Criteria andTotalPriceIsNotNull() {
            addCriterion("total_price is not null");
            return (Criteria) this;
        }

        public Criteria andTotalPriceEqualTo(BigDecimal value) {
            addCriterion("total_price =", value, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andTotalPriceNotEqualTo(BigDecimal value) {
            addCriterion("total_price <>", value, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andTotalPriceGreaterThan(BigDecimal value) {
            addCriterion("total_price >", value, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andTotalPriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("total_price >=", value, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andTotalPriceLessThan(BigDecimal value) {
            addCriterion("total_price <", value, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andTotalPriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("total_price <=", value, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andTotalPriceIn(List<BigDecimal> values) {
            addCriterion("total_price in", values, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andTotalPriceNotIn(List<BigDecimal> values) {
            addCriterion("total_price not in", values, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andTotalPriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("total_price between", value1, value2, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andTotalPriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("total_price not between", value1, value2, "totalPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceIsNull() {
            addCriterion("pay_price is null");
            return (Criteria) this;
        }

        public Criteria andPayPriceIsNotNull() {
            addCriterion("pay_price is not null");
            return (Criteria) this;
        }

        public Criteria andPayPriceEqualTo(BigDecimal value) {
            addCriterion("pay_price =", value, "payPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceNotEqualTo(BigDecimal value) {
            addCriterion("pay_price <>", value, "payPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceGreaterThan(BigDecimal value) {
            addCriterion("pay_price >", value, "payPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("pay_price >=", value, "payPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceLessThan(BigDecimal value) {
            addCriterion("pay_price <", value, "payPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("pay_price <=", value, "payPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceIn(List<BigDecimal> values) {
            addCriterion("pay_price in", values, "payPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceNotIn(List<BigDecimal> values) {
            addCriterion("pay_price not in", values, "payPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("pay_price between", value1, value2, "payPrice");
            return (Criteria) this;
        }

        public Criteria andPayPriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("pay_price not between", value1, value2, "payPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceIsNull() {
            addCriterion("exception_price is null");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceIsNotNull() {
            addCriterion("exception_price is not null");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceEqualTo(BigDecimal value) {
            addCriterion("exception_price =", value, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceNotEqualTo(BigDecimal value) {
            addCriterion("exception_price <>", value, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceGreaterThan(BigDecimal value) {
            addCriterion("exception_price >", value, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("exception_price >=", value, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceLessThan(BigDecimal value) {
            addCriterion("exception_price <", value, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("exception_price <=", value, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceIn(List<BigDecimal> values) {
            addCriterion("exception_price in", values, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceNotIn(List<BigDecimal> values) {
            addCriterion("exception_price not in", values, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("exception_price between", value1, value2, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andExceptionPriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("exception_price not between", value1, value2, "exceptionPrice");
            return (Criteria) this;
        }

        public Criteria andPayNoIsNull() {
            addCriterion("pay_no is null");
            return (Criteria) this;
        }

        public Criteria andPayNoIsNotNull() {
            addCriterion("pay_no is not null");
            return (Criteria) this;
        }

        public Criteria andPayNoEqualTo(String value) {
            addCriterion("pay_no =", value, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoNotEqualTo(String value) {
            addCriterion("pay_no <>", value, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoGreaterThan(String value) {
            addCriterion("pay_no >", value, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoGreaterThanOrEqualTo(String value) {
            addCriterion("pay_no >=", value, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoLessThan(String value) {
            addCriterion("pay_no <", value, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoLessThanOrEqualTo(String value) {
            addCriterion("pay_no <=", value, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoLike(String value) {
            addCriterion("pay_no like", value, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoNotLike(String value) {
            addCriterion("pay_no not like", value, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoIn(List<String> values) {
            addCriterion("pay_no in", values, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoNotIn(List<String> values) {
            addCriterion("pay_no not in", values, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoBetween(String value1, String value2) {
            addCriterion("pay_no between", value1, value2, "payNo");
            return (Criteria) this;
        }

        public Criteria andPayNoNotBetween(String value1, String value2) {
            addCriterion("pay_no not between", value1, value2, "payNo");
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

        public Criteria andSubtractTypeIsNull() {
            addCriterion("subtract_type is null");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeIsNotNull() {
            addCriterion("subtract_type is not null");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeEqualTo(Integer value) {
            addCriterion("subtract_type =", value, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeNotEqualTo(Integer value) {
            addCriterion("subtract_type <>", value, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeGreaterThan(Integer value) {
            addCriterion("subtract_type >", value, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("subtract_type >=", value, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeLessThan(Integer value) {
            addCriterion("subtract_type <", value, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeLessThanOrEqualTo(Integer value) {
            addCriterion("subtract_type <=", value, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeIn(List<Integer> values) {
            addCriterion("subtract_type in", values, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeNotIn(List<Integer> values) {
            addCriterion("subtract_type not in", values, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeBetween(Integer value1, Integer value2) {
            addCriterion("subtract_type between", value1, value2, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("subtract_type not between", value1, value2, "subtractType");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountIsNull() {
            addCriterion("subtract_amount is null");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountIsNotNull() {
            addCriterion("subtract_amount is not null");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountEqualTo(BigDecimal value) {
            addCriterion("subtract_amount =", value, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountNotEqualTo(BigDecimal value) {
            addCriterion("subtract_amount <>", value, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountGreaterThan(BigDecimal value) {
            addCriterion("subtract_amount >", value, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("subtract_amount >=", value, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountLessThan(BigDecimal value) {
            addCriterion("subtract_amount <", value, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountLessThanOrEqualTo(BigDecimal value) {
            addCriterion("subtract_amount <=", value, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountIn(List<BigDecimal> values) {
            addCriterion("subtract_amount in", values, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountNotIn(List<BigDecimal> values) {
            addCriterion("subtract_amount not in", values, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("subtract_amount between", value1, value2, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractAmountNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("subtract_amount not between", value1, value2, "subtractAmount");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkIsNull() {
            addCriterion("subtract_remark is null");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkIsNotNull() {
            addCriterion("subtract_remark is not null");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkEqualTo(String value) {
            addCriterion("subtract_remark =", value, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkNotEqualTo(String value) {
            addCriterion("subtract_remark <>", value, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkGreaterThan(String value) {
            addCriterion("subtract_remark >", value, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("subtract_remark >=", value, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkLessThan(String value) {
            addCriterion("subtract_remark <", value, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkLessThanOrEqualTo(String value) {
            addCriterion("subtract_remark <=", value, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkLike(String value) {
            addCriterion("subtract_remark like", value, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkNotLike(String value) {
            addCriterion("subtract_remark not like", value, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkIn(List<String> values) {
            addCriterion("subtract_remark in", values, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkNotIn(List<String> values) {
            addCriterion("subtract_remark not in", values, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkBetween(String value1, String value2) {
            addCriterion("subtract_remark between", value1, value2, "subtractRemark");
            return (Criteria) this;
        }

        public Criteria andSubtractRemarkNotBetween(String value1, String value2) {
            addCriterion("subtract_remark not between", value1, value2, "subtractRemark");
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

        public Criteria andCreateUserIsNull() {
            addCriterion("create_user is null");
            return (Criteria) this;
        }

        public Criteria andCreateUserIsNotNull() {
            addCriterion("create_user is not null");
            return (Criteria) this;
        }

        public Criteria andCreateUserEqualTo(String value) {
            addCriterion("create_user =", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotEqualTo(String value) {
            addCriterion("create_user <>", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserGreaterThan(String value) {
            addCriterion("create_user >", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserGreaterThanOrEqualTo(String value) {
            addCriterion("create_user >=", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserLessThan(String value) {
            addCriterion("create_user <", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserLessThanOrEqualTo(String value) {
            addCriterion("create_user <=", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserLike(String value) {
            addCriterion("create_user like", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotLike(String value) {
            addCriterion("create_user not like", value, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserIn(List<String> values) {
            addCriterion("create_user in", values, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotIn(List<String> values) {
            addCriterion("create_user not in", values, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserBetween(String value1, String value2) {
            addCriterion("create_user between", value1, value2, "createUser");
            return (Criteria) this;
        }

        public Criteria andCreateUserNotBetween(String value1, String value2) {
            addCriterion("create_user not between", value1, value2, "createUser");
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

        public Criteria andWxOpenidIsNull() {
            addCriterion("wx_openid is null");
            return (Criteria) this;
        }

        public Criteria andWxOpenidIsNotNull() {
            addCriterion("wx_openid is not null");
            return (Criteria) this;
        }

        public Criteria andWxOpenidEqualTo(String value) {
            addCriterion("wx_openid =", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidNotEqualTo(String value) {
            addCriterion("wx_openid <>", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidGreaterThan(String value) {
            addCriterion("wx_openid >", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidGreaterThanOrEqualTo(String value) {
            addCriterion("wx_openid >=", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidLessThan(String value) {
            addCriterion("wx_openid <", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidLessThanOrEqualTo(String value) {
            addCriterion("wx_openid <=", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidLike(String value) {
            addCriterion("wx_openid like", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidNotLike(String value) {
            addCriterion("wx_openid not like", value, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidIn(List<String> values) {
            addCriterion("wx_openid in", values, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidNotIn(List<String> values) {
            addCriterion("wx_openid not in", values, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidBetween(String value1, String value2) {
            addCriterion("wx_openid between", value1, value2, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andWxOpenidNotBetween(String value1, String value2) {
            addCriterion("wx_openid not between", value1, value2, "wxOpenid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridIsNull() {
            addCriterion("alipay_userid is null");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridIsNotNull() {
            addCriterion("alipay_userid is not null");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridEqualTo(String value) {
            addCriterion("alipay_userid =", value, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridNotEqualTo(String value) {
            addCriterion("alipay_userid <>", value, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridGreaterThan(String value) {
            addCriterion("alipay_userid >", value, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridGreaterThanOrEqualTo(String value) {
            addCriterion("alipay_userid >=", value, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridLessThan(String value) {
            addCriterion("alipay_userid <", value, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridLessThanOrEqualTo(String value) {
            addCriterion("alipay_userid <=", value, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridLike(String value) {
            addCriterion("alipay_userid like", value, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridNotLike(String value) {
            addCriterion("alipay_userid not like", value, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridIn(List<String> values) {
            addCriterion("alipay_userid in", values, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridNotIn(List<String> values) {
            addCriterion("alipay_userid not in", values, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridBetween(String value1, String value2) {
            addCriterion("alipay_userid between", value1, value2, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andAlipayUseridNotBetween(String value1, String value2) {
            addCriterion("alipay_userid not between", value1, value2, "alipayUserid");
            return (Criteria) this;
        }

        public Criteria andSeqNumberIsNull() {
            addCriterion("seq_number is null");
            return (Criteria) this;
        }

        public Criteria andSeqNumberIsNotNull() {
            addCriterion("seq_number is not null");
            return (Criteria) this;
        }

        public Criteria andSeqNumberEqualTo(String value) {
            addCriterion("seq_number =", value, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberNotEqualTo(String value) {
            addCriterion("seq_number <>", value, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberGreaterThan(String value) {
            addCriterion("seq_number >", value, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberGreaterThanOrEqualTo(String value) {
            addCriterion("seq_number >=", value, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberLessThan(String value) {
            addCriterion("seq_number <", value, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberLessThanOrEqualTo(String value) {
            addCriterion("seq_number <=", value, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberLike(String value) {
            addCriterion("seq_number like", value, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberNotLike(String value) {
            addCriterion("seq_number not like", value, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberIn(List<String> values) {
            addCriterion("seq_number in", values, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberNotIn(List<String> values) {
            addCriterion("seq_number not in", values, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberBetween(String value1, String value2) {
            addCriterion("seq_number between", value1, value2, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andSeqNumberNotBetween(String value1, String value2) {
            addCriterion("seq_number not between", value1, value2, "seqNumber");
            return (Criteria) this;
        }

        public Criteria andEndTimeIsNull() {
            addCriterion("end_time is null");
            return (Criteria) this;
        }

        public Criteria andEndTimeIsNotNull() {
            addCriterion("end_time is not null");
            return (Criteria) this;
        }

        public Criteria andEndTimeEqualTo(Date value) {
            addCriterion("end_time =", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeNotEqualTo(Date value) {
            addCriterion("end_time <>", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeGreaterThan(Date value) {
            addCriterion("end_time >", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("end_time >=", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeLessThan(Date value) {
            addCriterion("end_time <", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeLessThanOrEqualTo(Date value) {
            addCriterion("end_time <=", value, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeIn(List<Date> values) {
            addCriterion("end_time in", values, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeNotIn(List<Date> values) {
            addCriterion("end_time not in", values, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeBetween(Date value1, Date value2) {
            addCriterion("end_time between", value1, value2, "endTime");
            return (Criteria) this;
        }

        public Criteria andEndTimeNotBetween(Date value1, Date value2) {
            addCriterion("end_time not between", value1, value2, "endTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeIsNull() {
            addCriterion("close_time is null");
            return (Criteria) this;
        }

        public Criteria andCloseTimeIsNotNull() {
            addCriterion("close_time is not null");
            return (Criteria) this;
        }

        public Criteria andCloseTimeEqualTo(Date value) {
            addCriterion("close_time =", value, "closeTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeNotEqualTo(Date value) {
            addCriterion("close_time <>", value, "closeTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeGreaterThan(Date value) {
            addCriterion("close_time >", value, "closeTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("close_time >=", value, "closeTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeLessThan(Date value) {
            addCriterion("close_time <", value, "closeTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeLessThanOrEqualTo(Date value) {
            addCriterion("close_time <=", value, "closeTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeIn(List<Date> values) {
            addCriterion("close_time in", values, "closeTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeNotIn(List<Date> values) {
            addCriterion("close_time not in", values, "closeTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeBetween(Date value1, Date value2) {
            addCriterion("close_time between", value1, value2, "closeTime");
            return (Criteria) this;
        }

        public Criteria andCloseTimeNotBetween(Date value1, Date value2) {
            addCriterion("close_time not between", value1, value2, "closeTime");
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