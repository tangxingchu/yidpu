const db = require('../db');
const fetch = require("node-fetch");
const goodsService = require('./goods');
const goodsCategoryService = require('./goodsCategory');
const shoppingCartService = require('./shoppingCart');
const tableService = require('./table');
const { apiHost } = require('./apihost');
const axios = require('axios');

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

const submitOrderOffline = (arg) => {
    db.serialize(() => {
        db.sql('BEGIN');
        //修改桌台状态为4(等待上菜用餐状态)
        const promises = [
            tableService.update(arg.tableCode, 4),
            // shoppingCartService.clearShoppingCart(arg.tableCode),//清空购物车
            shoppingCartService.updatePrinterStatus(arg.tableCode),//修改打印状态
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

const submitOrderToServer = (arg, token) => {
    const body = JSON.stringify(arg);
    const headers = { 'Content-type': "application/json", "Authorization": token };
    /*
    return fetch(`${apiHost}/api/order/submit`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if(data.status && data.status !== 200) {
            if(data.status === 401) {//未登录，
                throw new Error(data.message);
            } else if(data.status === 403) {//没有权限
                throw new Error(data.message);
            } else if(data.status === 500) {              
                throw new Error(data.message);
            } else {
                throw new Error(data.message);
            }
        } else {
            return data;
        }
    }).catch(e => {
        throw e;
    });*/
    return axios.post(`${apiHost}/api/order/submit`, arg, {
        headers,
        timeout: 10000,
    }).then(response => {
        if(response.status && response.status !== 200) {
            if(response.status === 401) {//未登录，
                throw new Error(response.statusText);
            } else if(response.status === 403) {//没有权限
                throw new Error(response.statusText);
            } else if(response.status === 500) {              
                throw new Error(response.statusText);
            } else {
                throw new Error(response.statusText);
            }
        } else {
            return response.data;
        }
    }).catch(e => {
        throw e;
    });
}

const updatePrintStatusBygoodsIds = (goodsIds, tableCode, token) => {
    const body = `goodsIds=${goodsIds}&tableCode=${tableCode}`
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded', "Authorization": token };
    fetch(`${apiHost}/api/order/updatePrintStatusBygoodsIds`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {

    });
};


module.exports = {
    init,
    submitOrder,
    submitOrderOffline,
    submitOrderToServer,
    updatePrintStatusBygoodsIds,
};