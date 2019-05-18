const db = require('../db');

const selectGoodsCategory = () => {
    return db.sql(`select * from goods_category order by sort_no asc`, [], 'all');
}

module.exports = {
    selectGoodsCategory,
};