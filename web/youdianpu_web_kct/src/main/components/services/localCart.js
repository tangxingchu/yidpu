const db = require('../db');

const save = (tableCode, cartData) => {
    return db.sql(`insert into local_cart(table_code, cart_data) values (?, ?)`,
        [tableCode, cartData]); 
}

const selectByTableCode = (tableCode) => {
    return db.sql(`select * from local_cart where table_code = ?`, [tableCode], 'all');
}

const deleteByTableCode = (tableCode) => {
    return db.sql(`delete from local_cart where table_code = ?`, [tableCode]);
}

module.exports = {
    save,
    selectByTableCode,
    deleteByTableCode,
}