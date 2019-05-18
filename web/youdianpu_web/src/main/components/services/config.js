const db = require('../db');

const selectPrintConfig = () => {
    return db.sql(`select * from config where config_code in ('auto-print-ticket', 'auto-print-order')`, [], 'all');
}

const selectCashierConfig = () => {
    return db.sql(`select * from config where config_code = 'auto-print-cashier'`, [], 'get');
}

module.exports = {
    selectPrintConfig,
    selectCashierConfig,
};