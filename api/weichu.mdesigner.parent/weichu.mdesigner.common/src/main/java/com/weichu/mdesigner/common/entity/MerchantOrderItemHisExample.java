package com.weichu.mdesigner.common.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantOrderItemHisExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public MerchantOrderItemHisExample() {
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

        public Criteria andOrderIdIsNull() {
            addCriterion("order_id is null");
            return (Criteria) this;
        }

        public Criteria andOrderIdIsNotNull() {
            addCriterion("order_id is not null");
            return (Criteria) this;
        }

        public Criteria andOrderIdEqualTo(Integer value) {
            addCriterion("order_id =", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdNotEqualTo(Integer value) {
            addCriterion("order_id <>", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdGreaterThan(Integer value) {
            addCriterion("order_id >", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("order_id >=", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdLessThan(Integer value) {
            addCriterion("order_id <", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdLessThanOrEqualTo(Integer value) {
            addCriterion("order_id <=", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdIn(List<Integer> values) {
            addCriterion("order_id in", values, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdNotIn(List<Integer> values) {
            addCriterion("order_id not in", values, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdBetween(Integer value1, Integer value2) {
            addCriterion("order_id between", value1, value2, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdNotBetween(Integer value1, Integer value2) {
            addCriterion("order_id not between", value1, value2, "orderId");
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

        public Criteria andGoodsPriceIsNull() {
            addCriterion("goods_price is null");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceIsNotNull() {
            addCriterion("goods_price is not null");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceEqualTo(BigDecimal value) {
            addCriterion("goods_price =", value, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceNotEqualTo(BigDecimal value) {
            addCriterion("goods_price <>", value, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceGreaterThan(BigDecimal value) {
            addCriterion("goods_price >", value, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("goods_price >=", value, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceLessThan(BigDecimal value) {
            addCriterion("goods_price <", value, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("goods_price <=", value, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceIn(List<BigDecimal> values) {
            addCriterion("goods_price in", values, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceNotIn(List<BigDecimal> values) {
            addCriterion("goods_price not in", values, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("goods_price between", value1, value2, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsPriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("goods_price not between", value1, value2, "goodsPrice");
            return (Criteria) this;
        }

        public Criteria andGoodsNameIsNull() {
            addCriterion("goods_name is null");
            return (Criteria) this;
        }

        public Criteria andGoodsNameIsNotNull() {
            addCriterion("goods_name is not null");
            return (Criteria) this;
        }

        public Criteria andGoodsNameEqualTo(String value) {
            addCriterion("goods_name =", value, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameNotEqualTo(String value) {
            addCriterion("goods_name <>", value, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameGreaterThan(String value) {
            addCriterion("goods_name >", value, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameGreaterThanOrEqualTo(String value) {
            addCriterion("goods_name >=", value, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameLessThan(String value) {
            addCriterion("goods_name <", value, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameLessThanOrEqualTo(String value) {
            addCriterion("goods_name <=", value, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameLike(String value) {
            addCriterion("goods_name like", value, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameNotLike(String value) {
            addCriterion("goods_name not like", value, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameIn(List<String> values) {
            addCriterion("goods_name in", values, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameNotIn(List<String> values) {
            addCriterion("goods_name not in", values, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameBetween(String value1, String value2) {
            addCriterion("goods_name between", value1, value2, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsNameNotBetween(String value1, String value2) {
            addCriterion("goods_name not between", value1, value2, "goodsName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameIsNull() {
            addCriterion("goods_unit_name is null");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameIsNotNull() {
            addCriterion("goods_unit_name is not null");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameEqualTo(String value) {
            addCriterion("goods_unit_name =", value, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameNotEqualTo(String value) {
            addCriterion("goods_unit_name <>", value, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameGreaterThan(String value) {
            addCriterion("goods_unit_name >", value, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameGreaterThanOrEqualTo(String value) {
            addCriterion("goods_unit_name >=", value, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameLessThan(String value) {
            addCriterion("goods_unit_name <", value, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameLessThanOrEqualTo(String value) {
            addCriterion("goods_unit_name <=", value, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameLike(String value) {
            addCriterion("goods_unit_name like", value, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameNotLike(String value) {
            addCriterion("goods_unit_name not like", value, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameIn(List<String> values) {
            addCriterion("goods_unit_name in", values, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameNotIn(List<String> values) {
            addCriterion("goods_unit_name not in", values, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameBetween(String value1, String value2) {
            addCriterion("goods_unit_name between", value1, value2, "goodsUnitName");
            return (Criteria) this;
        }

        public Criteria andGoodsUnitNameNotBetween(String value1, String value2) {
            addCriterion("goods_unit_name not between", value1, value2, "goodsUnitName");
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

        public Criteria andNumIsNull() {
            addCriterion("num is null");
            return (Criteria) this;
        }

        public Criteria andNumIsNotNull() {
            addCriterion("num is not null");
            return (Criteria) this;
        }

        public Criteria andNumEqualTo(Integer value) {
            addCriterion("num =", value, "num");
            return (Criteria) this;
        }

        public Criteria andNumNotEqualTo(Integer value) {
            addCriterion("num <>", value, "num");
            return (Criteria) this;
        }

        public Criteria andNumGreaterThan(Integer value) {
            addCriterion("num >", value, "num");
            return (Criteria) this;
        }

        public Criteria andNumGreaterThanOrEqualTo(Integer value) {
            addCriterion("num >=", value, "num");
            return (Criteria) this;
        }

        public Criteria andNumLessThan(Integer value) {
            addCriterion("num <", value, "num");
            return (Criteria) this;
        }

        public Criteria andNumLessThanOrEqualTo(Integer value) {
            addCriterion("num <=", value, "num");
            return (Criteria) this;
        }

        public Criteria andNumIn(List<Integer> values) {
            addCriterion("num in", values, "num");
            return (Criteria) this;
        }

        public Criteria andNumNotIn(List<Integer> values) {
            addCriterion("num not in", values, "num");
            return (Criteria) this;
        }

        public Criteria andNumBetween(Integer value1, Integer value2) {
            addCriterion("num between", value1, value2, "num");
            return (Criteria) this;
        }

        public Criteria andNumNotBetween(Integer value1, Integer value2) {
            addCriterion("num not between", value1, value2, "num");
            return (Criteria) this;
        }

        public Criteria andPriceIsNull() {
            addCriterion("price is null");
            return (Criteria) this;
        }

        public Criteria andPriceIsNotNull() {
            addCriterion("price is not null");
            return (Criteria) this;
        }

        public Criteria andPriceEqualTo(BigDecimal value) {
            addCriterion("price =", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceNotEqualTo(BigDecimal value) {
            addCriterion("price <>", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceGreaterThan(BigDecimal value) {
            addCriterion("price >", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("price >=", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceLessThan(BigDecimal value) {
            addCriterion("price <", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("price <=", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceIn(List<BigDecimal> values) {
            addCriterion("price in", values, "price");
            return (Criteria) this;
        }

        public Criteria andPriceNotIn(List<BigDecimal> values) {
            addCriterion("price not in", values, "price");
            return (Criteria) this;
        }

        public Criteria andPriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("price between", value1, value2, "price");
            return (Criteria) this;
        }

        public Criteria andPriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("price not between", value1, value2, "price");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeIsNull() {
            addCriterion("order_item_time is null");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeIsNotNull() {
            addCriterion("order_item_time is not null");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeEqualTo(Date value) {
            addCriterion("order_item_time =", value, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeNotEqualTo(Date value) {
            addCriterion("order_item_time <>", value, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeGreaterThan(Date value) {
            addCriterion("order_item_time >", value, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("order_item_time >=", value, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeLessThan(Date value) {
            addCriterion("order_item_time <", value, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeLessThanOrEqualTo(Date value) {
            addCriterion("order_item_time <=", value, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeIn(List<Date> values) {
            addCriterion("order_item_time in", values, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeNotIn(List<Date> values) {
            addCriterion("order_item_time not in", values, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeBetween(Date value1, Date value2) {
            addCriterion("order_item_time between", value1, value2, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemTimeNotBetween(Date value1, Date value2) {
            addCriterion("order_item_time not between", value1, value2, "orderItemTime");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusIsNull() {
            addCriterion("order_item_status is null");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusIsNotNull() {
            addCriterion("order_item_status is not null");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusEqualTo(String value) {
            addCriterion("order_item_status =", value, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusNotEqualTo(String value) {
            addCriterion("order_item_status <>", value, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusGreaterThan(String value) {
            addCriterion("order_item_status >", value, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusGreaterThanOrEqualTo(String value) {
            addCriterion("order_item_status >=", value, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusLessThan(String value) {
            addCriterion("order_item_status <", value, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusLessThanOrEqualTo(String value) {
            addCriterion("order_item_status <=", value, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusLike(String value) {
            addCriterion("order_item_status like", value, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusNotLike(String value) {
            addCriterion("order_item_status not like", value, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusIn(List<String> values) {
            addCriterion("order_item_status in", values, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusNotIn(List<String> values) {
            addCriterion("order_item_status not in", values, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusBetween(String value1, String value2) {
            addCriterion("order_item_status between", value1, value2, "orderItemStatus");
            return (Criteria) this;
        }

        public Criteria andOrderItemStatusNotBetween(String value1, String value2) {
            addCriterion("order_item_status not between", value1, value2, "orderItemStatus");
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

        public Criteria andRuleValueIsNull() {
            addCriterion("rule_value is null");
            return (Criteria) this;
        }

        public Criteria andRuleValueIsNotNull() {
            addCriterion("rule_value is not null");
            return (Criteria) this;
        }

        public Criteria andRuleValueEqualTo(BigDecimal value) {
            addCriterion("rule_value =", value, "ruleValue");
            return (Criteria) this;
        }

        public Criteria andRuleValueNotEqualTo(BigDecimal value) {
            addCriterion("rule_value <>", value, "ruleValue");
            return (Criteria) this;
        }

        public Criteria andRuleValueGreaterThan(BigDecimal value) {
            addCriterion("rule_value >", value, "ruleValue");
            return (Criteria) this;
        }

        public Criteria andRuleValueGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("rule_value >=", value, "ruleValue");
            return (Criteria) this;
        }

        public Criteria andRuleValueLessThan(BigDecimal value) {
            addCriterion("rule_value <", value, "ruleValue");
            return (Criteria) this;
        }

        public Criteria andRuleValueLessThanOrEqualTo(BigDecimal value) {
            addCriterion("rule_value <=", value, "ruleValue");
            return (Criteria) this;
        }

        public Criteria andRuleValueIn(List<BigDecimal> values) {
            addCriterion("rule_value in", values, "ruleValue");
            return (Criteria) this;
        }

        public Criteria andRuleValueNotIn(List<BigDecimal> values) {
            addCriterion("rule_value not in", values, "ruleValue");
            return (Criteria) this;
        }

        public Criteria andRuleValueBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("rule_value between", value1, value2, "ruleValue");
            return (Criteria) this;
        }

        public Criteria andRuleValueNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("rule_value not between", value1, value2, "ruleValue");
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

        public Criteria andPrintStatusIsNull() {
            addCriterion("print_status is null");
            return (Criteria) this;
        }

        public Criteria andPrintStatusIsNotNull() {
            addCriterion("print_status is not null");
            return (Criteria) this;
        }

        public Criteria andPrintStatusEqualTo(Integer value) {
            addCriterion("print_status =", value, "printStatus");
            return (Criteria) this;
        }

        public Criteria andPrintStatusNotEqualTo(Integer value) {
            addCriterion("print_status <>", value, "printStatus");
            return (Criteria) this;
        }

        public Criteria andPrintStatusGreaterThan(Integer value) {
            addCriterion("print_status >", value, "printStatus");
            return (Criteria) this;
        }

        public Criteria andPrintStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("print_status >=", value, "printStatus");
            return (Criteria) this;
        }

        public Criteria andPrintStatusLessThan(Integer value) {
            addCriterion("print_status <", value, "printStatus");
            return (Criteria) this;
        }

        public Criteria andPrintStatusLessThanOrEqualTo(Integer value) {
            addCriterion("print_status <=", value, "printStatus");
            return (Criteria) this;
        }

        public Criteria andPrintStatusIn(List<Integer> values) {
            addCriterion("print_status in", values, "printStatus");
            return (Criteria) this;
        }

        public Criteria andPrintStatusNotIn(List<Integer> values) {
            addCriterion("print_status not in", values, "printStatus");
            return (Criteria) this;
        }

        public Criteria andPrintStatusBetween(Integer value1, Integer value2) {
            addCriterion("print_status between", value1, value2, "printStatus");
            return (Criteria) this;
        }

        public Criteria andPrintStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("print_status not between", value1, value2, "printStatus");
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

        public Criteria andHisTimeIsNull() {
            addCriterion("his_time is null");
            return (Criteria) this;
        }

        public Criteria andHisTimeIsNotNull() {
            addCriterion("his_time is not null");
            return (Criteria) this;
        }

        public Criteria andHisTimeEqualTo(Date value) {
            addCriterion("his_time =", value, "hisTime");
            return (Criteria) this;
        }

        public Criteria andHisTimeNotEqualTo(Date value) {
            addCriterion("his_time <>", value, "hisTime");
            return (Criteria) this;
        }

        public Criteria andHisTimeGreaterThan(Date value) {
            addCriterion("his_time >", value, "hisTime");
            return (Criteria) this;
        }

        public Criteria andHisTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("his_time >=", value, "hisTime");
            return (Criteria) this;
        }

        public Criteria andHisTimeLessThan(Date value) {
            addCriterion("his_time <", value, "hisTime");
            return (Criteria) this;
        }

        public Criteria andHisTimeLessThanOrEqualTo(Date value) {
            addCriterion("his_time <=", value, "hisTime");
            return (Criteria) this;
        }

        public Criteria andHisTimeIn(List<Date> values) {
            addCriterion("his_time in", values, "hisTime");
            return (Criteria) this;
        }

        public Criteria andHisTimeNotIn(List<Date> values) {
            addCriterion("his_time not in", values, "hisTime");
            return (Criteria) this;
        }

        public Criteria andHisTimeBetween(Date value1, Date value2) {
            addCriterion("his_time between", value1, value2, "hisTime");
            return (Criteria) this;
        }

        public Criteria andHisTimeNotBetween(Date value1, Date value2) {
            addCriterion("his_time not between", value1, value2, "hisTime");
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