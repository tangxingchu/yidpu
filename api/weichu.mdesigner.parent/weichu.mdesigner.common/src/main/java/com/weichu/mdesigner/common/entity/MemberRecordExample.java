package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MemberRecordExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MemberRecordExample() {
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

        public Criteria andPriceAmountIsNull() {
            addCriterion("price_amount is null");
            return (Criteria) this;
        }

        public Criteria andPriceAmountIsNotNull() {
            addCriterion("price_amount is not null");
            return (Criteria) this;
        }

        public Criteria andPriceAmountEqualTo(BigDecimal value) {
            addCriterion("price_amount =", value, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andPriceAmountNotEqualTo(BigDecimal value) {
            addCriterion("price_amount <>", value, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andPriceAmountGreaterThan(BigDecimal value) {
            addCriterion("price_amount >", value, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andPriceAmountGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("price_amount >=", value, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andPriceAmountLessThan(BigDecimal value) {
            addCriterion("price_amount <", value, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andPriceAmountLessThanOrEqualTo(BigDecimal value) {
            addCriterion("price_amount <=", value, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andPriceAmountIn(List<BigDecimal> values) {
            addCriterion("price_amount in", values, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andPriceAmountNotIn(List<BigDecimal> values) {
            addCriterion("price_amount not in", values, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andPriceAmountBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("price_amount between", value1, value2, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andPriceAmountNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("price_amount not between", value1, value2, "priceAmount");
            return (Criteria) this;
        }

        public Criteria andRecordTypeIsNull() {
            addCriterion("record_type is null");
            return (Criteria) this;
        }

        public Criteria andRecordTypeIsNotNull() {
            addCriterion("record_type is not null");
            return (Criteria) this;
        }

        public Criteria andRecordTypeEqualTo(Integer value) {
            addCriterion("record_type =", value, "recordType");
            return (Criteria) this;
        }

        public Criteria andRecordTypeNotEqualTo(Integer value) {
            addCriterion("record_type <>", value, "recordType");
            return (Criteria) this;
        }

        public Criteria andRecordTypeGreaterThan(Integer value) {
            addCriterion("record_type >", value, "recordType");
            return (Criteria) this;
        }

        public Criteria andRecordTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("record_type >=", value, "recordType");
            return (Criteria) this;
        }

        public Criteria andRecordTypeLessThan(Integer value) {
            addCriterion("record_type <", value, "recordType");
            return (Criteria) this;
        }

        public Criteria andRecordTypeLessThanOrEqualTo(Integer value) {
            addCriterion("record_type <=", value, "recordType");
            return (Criteria) this;
        }

        public Criteria andRecordTypeIn(List<Integer> values) {
            addCriterion("record_type in", values, "recordType");
            return (Criteria) this;
        }

        public Criteria andRecordTypeNotIn(List<Integer> values) {
            addCriterion("record_type not in", values, "recordType");
            return (Criteria) this;
        }

        public Criteria andRecordTypeBetween(Integer value1, Integer value2) {
            addCriterion("record_type between", value1, value2, "recordType");
            return (Criteria) this;
        }

        public Criteria andRecordTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("record_type not between", value1, value2, "recordType");
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

        public Criteria andRecordTimeIsNull() {
            addCriterion("record_time is null");
            return (Criteria) this;
        }

        public Criteria andRecordTimeIsNotNull() {
            addCriterion("record_time is not null");
            return (Criteria) this;
        }

        public Criteria andRecordTimeEqualTo(Date value) {
            addCriterion("record_time =", value, "recordTime");
            return (Criteria) this;
        }

        public Criteria andRecordTimeNotEqualTo(Date value) {
            addCriterion("record_time <>", value, "recordTime");
            return (Criteria) this;
        }

        public Criteria andRecordTimeGreaterThan(Date value) {
            addCriterion("record_time >", value, "recordTime");
            return (Criteria) this;
        }

        public Criteria andRecordTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("record_time >=", value, "recordTime");
            return (Criteria) this;
        }

        public Criteria andRecordTimeLessThan(Date value) {
            addCriterion("record_time <", value, "recordTime");
            return (Criteria) this;
        }

        public Criteria andRecordTimeLessThanOrEqualTo(Date value) {
            addCriterion("record_time <=", value, "recordTime");
            return (Criteria) this;
        }

        public Criteria andRecordTimeIn(List<Date> values) {
            addCriterion("record_time in", values, "recordTime");
            return (Criteria) this;
        }

        public Criteria andRecordTimeNotIn(List<Date> values) {
            addCriterion("record_time not in", values, "recordTime");
            return (Criteria) this;
        }

        public Criteria andRecordTimeBetween(Date value1, Date value2) {
            addCriterion("record_time between", value1, value2, "recordTime");
            return (Criteria) this;
        }

        public Criteria andRecordTimeNotBetween(Date value1, Date value2) {
            addCriterion("record_time not between", value1, value2, "recordTime");
            return (Criteria) this;
        }

        public Criteria andCouponPriceIsNull() {
            addCriterion("coupon_price is null");
            return (Criteria) this;
        }

        public Criteria andCouponPriceIsNotNull() {
            addCriterion("coupon_price is not null");
            return (Criteria) this;
        }

        public Criteria andCouponPriceEqualTo(BigDecimal value) {
            addCriterion("coupon_price =", value, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andCouponPriceNotEqualTo(BigDecimal value) {
            addCriterion("coupon_price <>", value, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andCouponPriceGreaterThan(BigDecimal value) {
            addCriterion("coupon_price >", value, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andCouponPriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("coupon_price >=", value, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andCouponPriceLessThan(BigDecimal value) {
            addCriterion("coupon_price <", value, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andCouponPriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("coupon_price <=", value, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andCouponPriceIn(List<BigDecimal> values) {
            addCriterion("coupon_price in", values, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andCouponPriceNotIn(List<BigDecimal> values) {
            addCriterion("coupon_price not in", values, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andCouponPriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("coupon_price between", value1, value2, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andCouponPriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("coupon_price not between", value1, value2, "couponPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceIsNull() {
            addCriterion("point_price is null");
            return (Criteria) this;
        }

        public Criteria andPointPriceIsNotNull() {
            addCriterion("point_price is not null");
            return (Criteria) this;
        }

        public Criteria andPointPriceEqualTo(BigDecimal value) {
            addCriterion("point_price =", value, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceNotEqualTo(BigDecimal value) {
            addCriterion("point_price <>", value, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceGreaterThan(BigDecimal value) {
            addCriterion("point_price >", value, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("point_price >=", value, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceLessThan(BigDecimal value) {
            addCriterion("point_price <", value, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("point_price <=", value, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceIn(List<BigDecimal> values) {
            addCriterion("point_price in", values, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceNotIn(List<BigDecimal> values) {
            addCriterion("point_price not in", values, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("point_price between", value1, value2, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andPointPriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("point_price not between", value1, value2, "pointPrice");
            return (Criteria) this;
        }

        public Criteria andConsumePointIsNull() {
            addCriterion("consume_point is null");
            return (Criteria) this;
        }

        public Criteria andConsumePointIsNotNull() {
            addCriterion("consume_point is not null");
            return (Criteria) this;
        }

        public Criteria andConsumePointEqualTo(Integer value) {
            addCriterion("consume_point =", value, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andConsumePointNotEqualTo(Integer value) {
            addCriterion("consume_point <>", value, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andConsumePointGreaterThan(Integer value) {
            addCriterion("consume_point >", value, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andConsumePointGreaterThanOrEqualTo(Integer value) {
            addCriterion("consume_point >=", value, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andConsumePointLessThan(Integer value) {
            addCriterion("consume_point <", value, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andConsumePointLessThanOrEqualTo(Integer value) {
            addCriterion("consume_point <=", value, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andConsumePointIn(List<Integer> values) {
            addCriterion("consume_point in", values, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andConsumePointNotIn(List<Integer> values) {
            addCriterion("consume_point not in", values, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andConsumePointBetween(Integer value1, Integer value2) {
            addCriterion("consume_point between", value1, value2, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andConsumePointNotBetween(Integer value1, Integer value2) {
            addCriterion("consume_point not between", value1, value2, "consumePoint");
            return (Criteria) this;
        }

        public Criteria andGivePriceIsNull() {
            addCriterion("give_price is null");
            return (Criteria) this;
        }

        public Criteria andGivePriceIsNotNull() {
            addCriterion("give_price is not null");
            return (Criteria) this;
        }

        public Criteria andGivePriceEqualTo(BigDecimal value) {
            addCriterion("give_price =", value, "givePrice");
            return (Criteria) this;
        }

        public Criteria andGivePriceNotEqualTo(BigDecimal value) {
            addCriterion("give_price <>", value, "givePrice");
            return (Criteria) this;
        }

        public Criteria andGivePriceGreaterThan(BigDecimal value) {
            addCriterion("give_price >", value, "givePrice");
            return (Criteria) this;
        }

        public Criteria andGivePriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("give_price >=", value, "givePrice");
            return (Criteria) this;
        }

        public Criteria andGivePriceLessThan(BigDecimal value) {
            addCriterion("give_price <", value, "givePrice");
            return (Criteria) this;
        }

        public Criteria andGivePriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("give_price <=", value, "givePrice");
            return (Criteria) this;
        }

        public Criteria andGivePriceIn(List<BigDecimal> values) {
            addCriterion("give_price in", values, "givePrice");
            return (Criteria) this;
        }

        public Criteria andGivePriceNotIn(List<BigDecimal> values) {
            addCriterion("give_price not in", values, "givePrice");
            return (Criteria) this;
        }

        public Criteria andGivePriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("give_price between", value1, value2, "givePrice");
            return (Criteria) this;
        }

        public Criteria andGivePriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("give_price not between", value1, value2, "givePrice");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceIsNull() {
            addCriterion("record_balance is null");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceIsNotNull() {
            addCriterion("record_balance is not null");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceEqualTo(BigDecimal value) {
            addCriterion("record_balance =", value, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceNotEqualTo(BigDecimal value) {
            addCriterion("record_balance <>", value, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceGreaterThan(BigDecimal value) {
            addCriterion("record_balance >", value, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("record_balance >=", value, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceLessThan(BigDecimal value) {
            addCriterion("record_balance <", value, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("record_balance <=", value, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceIn(List<BigDecimal> values) {
            addCriterion("record_balance in", values, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceNotIn(List<BigDecimal> values) {
            addCriterion("record_balance not in", values, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("record_balance between", value1, value2, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordBalanceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("record_balance not between", value1, value2, "recordBalance");
            return (Criteria) this;
        }

        public Criteria andRecordDescIsNull() {
            addCriterion("record_desc is null");
            return (Criteria) this;
        }

        public Criteria andRecordDescIsNotNull() {
            addCriterion("record_desc is not null");
            return (Criteria) this;
        }

        public Criteria andRecordDescEqualTo(String value) {
            addCriterion("record_desc =", value, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescNotEqualTo(String value) {
            addCriterion("record_desc <>", value, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescGreaterThan(String value) {
            addCriterion("record_desc >", value, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescGreaterThanOrEqualTo(String value) {
            addCriterion("record_desc >=", value, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescLessThan(String value) {
            addCriterion("record_desc <", value, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescLessThanOrEqualTo(String value) {
            addCriterion("record_desc <=", value, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescLike(String value) {
            addCriterion("record_desc like", value, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescNotLike(String value) {
            addCriterion("record_desc not like", value, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescIn(List<String> values) {
            addCriterion("record_desc in", values, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescNotIn(List<String> values) {
            addCriterion("record_desc not in", values, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescBetween(String value1, String value2) {
            addCriterion("record_desc between", value1, value2, "recordDesc");
            return (Criteria) this;
        }

        public Criteria andRecordDescNotBetween(String value1, String value2) {
            addCriterion("record_desc not between", value1, value2, "recordDesc");
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