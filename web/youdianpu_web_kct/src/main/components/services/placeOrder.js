const db = require('../db');

const goodsService = require('./goods');
const goodsCategoryService = require('./goodsCategory');
const shoppingCartService = require('./shoppingCart');
const tableService = require('./table');

const init = (tableCode) => {
    const configPromise = db.sql(`select * from config where config_code in ('enabled-goods-day', 'enabled-goods-discount')`, [], 'all');
    const promises = [
        goodsCategoryService.selectGoodsCategory(), 
        goodsService.selectGoods({}),
        shoppingCartService.selectByTableCode(tableCode),
        configPromise,
    ];
    return Promise.all(promises);
}

const submitOrder = (arg) => {
    db.serialize(() => {
        db.sql('BEGIN');
        //修改桌台状态为4(等待上菜用餐状态)
        const promises = [
            tableService.update(arg.tableCode, 4),
            shoppingCartService.clearShoppingCart(arg.tableCode),//清空购物车
        ];
        //减库存
        const subInventoryPromises = arg.cartItem.map((item) => {
            return goodsService.subInventory(item.num, item.goodsId);
        });
        const all = [...promises, ...subInventoryPromises];
        Promise.all(all).then(() => {
            db.sql('COMMIT');
        }).catch(() => {
            db.sql('ROLLBACK');
        });
    });
}

module.exports = {
    init,
    submitOrder,
};