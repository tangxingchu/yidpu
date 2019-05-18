const db = require('../db');
const moment = require('moment');

const insertGoodsDay = (goodsDay) => {
    return db.sql(`insert into goods_day(id, goods_id, price, description, enabled, week, 
            limit_num, effective_time, expired_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [goodsDay.id, goodsDay.goodsId, goodsDay.price, goodsDay.description, goodsDay.enabled, 
            goodsDay.week, goodsDay.limitNum, goodsDay.effectiveTime, goodsDay.expiredTime]);
}

const insertGoodsDays = (goodsDays) => {
    goodsDays.forEach(goodsDay => {
        db.sql(`insert into goods_day(id, goods_id, price, description, enabled, week, 
                limit_num, effective_time, expired_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [goodsDay.id, goodsDay.goodsId, goodsDay.price, goodsDay.description, 1, 
                goodsDay.week, goodsDay.limitNum, moment(goodsDay.effectiveTime).format('YYYY-MM-DD'),
                goodsDay.expiredTime ? moment(goodsDay.expiredTime).format('YYYY-MM-DD') : goodsDay.expiredTime]);
    });
}

const listTodayGoodsDays = () => {
    const week = new Date().getDay() + 1;
    return db.sql(`select t.id, t.goods_id as goodsId, t.price, t.description,
    t.enabled, t.week, t.limit_num as limitNum from goods_day t left outer join goods g on g.id = t.goods_id
    where (case 
    when t.effective_time is null then 1
    when t.effective_time <= date('now') then 1
    else 0
    end) = 1 and ( case
    when t.expired_time is null then 0
    when t.expired_time < date('now') then 1
    else 0
    end) = 0 and g.id is not null and g.status=1 and
    t.week = ?`, [week], 'all').then(data => data);
}

const deleteGoodsDay = (id) => {
    return db.sql(`delete from goods_day where id =?`, [id]);
}

const insertGoodsDiscount = (goodsDiscount) => {
    return db.sql(`insert into goods_discount(id, goods_id, discount_name, discount_value, description, enabled, 
        effective_time, expired_time) values (?, ?, ?, ?, ?, ?, ?, ?)`,
    [goodsDiscount.id, goodsDiscount.goodsId, goodsDiscount.discountName, goodsDiscount.discountValue, 
        goodsDiscount.description, goodsDiscount.enabled, goodsDiscount.effectiveTime, goodsDiscount.expiredTime]);
}

const insertGoodsDiscounts = (goodsDiscounts) => {
    goodsDiscounts.forEach(goodsDiscount => {
        db.sql(`insert into goods_discount(id, goods_id, discount_name, discount_value, description, enabled, 
            effective_time, expired_time) values (?, ?, ?, ?, ?, ?, ?, ?)`,
        [goodsDiscount.id, goodsDiscount.goodsId, goodsDiscount.discountName, goodsDiscount.discountValue, 
            goodsDiscount.description, 1, moment(goodsDiscount.effectiveTime).format('YYYY-MM-DD'),
        goodsDiscount.expiredTime ? moment(goodsDiscount.expiredTime).format('YYYY-MM-DD') : goodsDiscount.expiredTime]);
    });
}

const deleteGoodsDiscount = (id) => {
    return db.sql(`delete from goods_discount where id =?`, [id]);
}

const listEffectiveGoodsDiscount = () => {
    return db.sql(`select t.id, t.goods_id as goodsId, t.discount_name as discountName, t.discount_value as discountValue,
    t.description, t.enabled from goods_discount t left outer join goods g on g.id = t.goods_id
    where (case 
    when t.effective_time is null then 1
    when t.effective_time <= date('now') then 1
    else 0
    end) = 1 and ( case
    when t.expired_time is null then 0
    when t.expired_time < date('now') then 1
    else 0
    end) = 0 and g.id is not null and g.status=1`, [], 'all').then(data => data);
}

const listTodayGoodsDaysAndDiscount = () => {
    const promises = [
        listTodayGoodsDays(), 
        listEffectiveGoodsDiscount(),
    ];
    return Promise.all(promises);
}

const insertGoodsSubtract = (goodsSubtract) => {
    return db.sql(`insert into goods_subtract(id, constraint_type, consume_price, constraint_time_start, constraint_time_end,
        type, amount1, discount, amount2, description, enabled, effective_time, expired_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [goodsSubtract.id, goodsSubtract.constraintType, goodsSubtract.consumePrice, goodsSubtract.constraintTimeStart, goodsSubtract.constraintTimeEnd,
        goodsSubtract.type, goodsSubtract.amount1, goodsSubtract.discount, goodsSubtract.amount2,
        goodsSubtract.description, goodsSubtract.enabled, goodsSubtract.effectiveTime, goodsSubtract.expiredTime]);
}

const saveGoodsSubtract = (goodsSubtract) => {
    return db.sql(`insert into goods_subtract(id, constraint_type, consume_price, constraint_time_start, constraint_time_end,
        type, amount1, discount, amount2, description, enabled, effective_time, expired_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [goodsSubtract.id, goodsSubtract.constraintType, goodsSubtract.consumePrice, 
        moment(goodsSubtract.constraintTimeStart).format('HH:mm'), moment(goodsSubtract.constraintTimeEnd).format('HH:mm'),
        goodsSubtract.type, goodsSubtract.amount1, goodsSubtract.discount, goodsSubtract.amount2,
        goodsSubtract.description, 1, moment(goodsSubtract.effectiveTime).format('YYYY-MM-DD'),
        goodsSubtract.expiredTime ? moment(goodsSubtract.expiredTime).format('YYYY-MM-DD') : goodsSubtract.expiredTime]);
}

const deleteGoodsSubtract = (id) => {
    return db.sql(`delete from goods_subtract where id =?`, [id]);
}

const enabledGoodsSubtract = (id, enabled) => {
    return db.sql(`update goods_subtract set enabled = ? where id = ?`, [enabled, id]);
}

module.exports = {
    insertGoodsDay,
    insertGoodsDays,
    listTodayGoodsDays,
    deleteGoodsDay,
    
    insertGoodsDiscount,
    insertGoodsDiscounts,
    deleteGoodsDiscount,
    listEffectiveGoodsDiscount,

    listTodayGoodsDaysAndDiscount,

    insertGoodsSubtract,
    saveGoodsSubtract,
    deleteGoodsSubtract,
    enabledGoodsSubtract,
};