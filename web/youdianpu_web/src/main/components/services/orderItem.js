const db = require('../db');

const insert = (cart) => {
    let promises = [];
    cart.cartItem.forEach(item => {
        promises.push(db.sql(`insert into order_item(id, order_id, order_no, goods_id, goods_price, goods_name,
            goods_unit_name, extra_name, num, price, order_item_time, order_item_status, rule_code, rule_value,
            remark, print_status, modify_time) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,? ,?, ?, ?)`,
            [null, null, ]));
    });
    return Promise.all(promises);
}

const delOrderItem = (orderNo) => {
    return db.sql(`delete from order_item where order_no=?`, [orderNo]);
}

const updatePrinterStatus = (orderNo, goodsId) => {
    return db.sql(`update order_item set print_status=1 where order_no=? and goods_id = ?`, [orderNo, goodsId]);
}

const list = (orderNo) => {
    return db.sql(`select * from order_item where order_no = ?`, [orderNo], 'all');
}

module.exports = {
    insert,
    delOrderItem,
    updatePrinterStatus,
    list,
}