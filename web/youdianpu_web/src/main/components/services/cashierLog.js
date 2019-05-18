const db = require('../db');
const shoppingCartService = require('./shoppingCart');
const localCartService = require('./localCart');
const numeral = require('numeral');
const moment = require('moment');

const save = (cashierLog) => {
    db.sql(`insert into cashier_log(id, table_code, cashier_amount, cashier_time, cashier_method, order_no,
        cashier_type, cashier_source, remark, operation_staff) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            null, cashierLog.tableCode, numeral(cashierLog.cashierAmount).format('0.00'), moment().format('YYYY-MM-DD HH:mm:ss'),
            cashierLog.cashierMethod, '000000', 1, 1, cashierLog.remark ? `${cashierLog.remark}-断网离线收银` : '断网离线收银',
            cashierLog.operationStaff,
        ]).then(() => {
            db.serialize(() => {
                db.sql('BEGIN');
                const promises = [
                    shoppingCartService.clearShoppingCart(cashierLog.tableCode),
                    localCartService.deleteByTableCode(cashierLog.tableCode),
                ];
                Promise.all(promises).then(() => {
                    db.sql('COMMIT');
                }).catch(() => {
                    db.sql('ROLLBACK');
                });
            });
        });
}

//同步至服务端之后删除
const delById = (id) => {
    db.sql(`delete from cashier_log where id=?`, [id]);
}

const delAll = (id) => {
    db.sql(`delete from cashier_log`);
}

const list = (payMethod) => {
    let sql = `select table_code as tableCode, cashier_amount as cashierAmount, cashier_time as cashierTime,
    cashier_method as cashierMethod, order_no as orderNo,
    cashier_type as cashierType, cashier_source as cashierSource, remark, operation_staff as operationStaff
    from cashier_log `;
    let params = [];
    if(payMethod != "") {
        sql += `where cashier_method=? `;
        params.push(payMethod);
    }
    sql += `order by cashier_time asc`;
    return db.sql(sql, params, 'all').then(data => data);
}

module.exports = {
    save,
    delById,
    list,
    delAll,
};