const db = require('../db');
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { apiHost } = require('./apihost');
const tableService = require('./table');
const printSettingService = require('./printSetting');
const ruleService = require('./rule');
const { app } = require('electron');

const syncDictionaryItem = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    return fetch(`${apiHost}/api/dictItem/syncItems`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                db.sql(`delete from dictionary_item`).then(() => {
                    var promises = data.map(dictItem => {
                        return db.sql(`insert into dictionary_item(id, dict_id, dict_code, item_code, item_name, item_value, sort_no, enabled, remark) 
                        values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                            [dictItem.id, dictItem.dictId, dictItem.dictCode, dictItem.itemCode, dictItem.itemName,
                            dictItem.itemValue, dictItem.sortNo, dictItem.enabled, dictItem.remark]);
                    });
                    return Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端基础数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            })
        }
    });
}

const syncFloor = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/floor/list`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                db.sql(`delete from floor`).then(() => {
                    var promises = data.map(floor => {
                        return db.sql(`insert into floor(id, floor_name, floor_desc, merchant_id, status, sort_no) 
                                values (?, ?, ?, ?, ?, ?)`,
                            [floor.id, floor.floorName, floor.floorDesc, floor.merchantId, floor.status, floor.sortNo]);
                    });
                    Promise.all(promises).then(() => {
                        data.map(floor => {
                            const destPath = path.join(app.getPath('userData'), `${floor.id}.xml`);
                            fetch(`${apiHost}/api/floorPlan/open/${floor.id}`, { method: 'GET', headers }).then(res => res.text()).then(xmlData => {
                                fs.writeFile(destPath, xmlData, () => { });
                            });
                        });
                        event.sender.send(eventName, { success: true, message: "云端场地数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        };
    });
}

const syncGoodsCategory = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/category/list`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                db.sql(`delete from goods_category`).then(() => {
                    var promises = data.map(category => {
                        return db.sql(`insert into goods_category(id, category_name, category_desc, merchant_id, sort_no) 
                                values (?, ?, ?, ?, ?)`,
                            [category.id, category.categoryName, category.categoryDesc, category.merchantId, category.sortNo]);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端商品分类数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        };
    });
}

const syncGoods = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/goods/syncGoods`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                db.sql(`delete from goods`).then(() => {
                    var promises = data.map(goods => {
                        return db.sql(`insert into goods(id, merchant_id, name, piny, unit, cost_price, price, inventory, category,
                                status, description) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                            [goods.id, goods.merchantId, goods.name, goods.piny, goods.unit, goods.costPrice, goods.price,
                            goods.inventory, goods.category, goods.status, goods.description]);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端商品数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        }
    });
}

//同步商品附属属性
const syncGoodsExtra = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/goods/syncGoodsExtra`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                db.sql(`delete from goods_extra`).then(() => {
                    var promises = data.map(goodsExtra => {
                        return db.sql(`insert into goods_extra(id, extra_id, extra_code, goods_id, extra_name) 
                        values (?, ?, ?, ?, ?)`,
                            [goodsExtra.id, goodsExtra.extraId, goodsExtra.extraCode, goodsExtra.goodsId, goodsExtra.extraName]);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端商品数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        }
    });
}

//同步商品附属属性项
const syncGoodsExtraItem = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/goods/syncGoodsExtraItem`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                db.sql(`delete from goods_extra_item`).then(() => {
                    var promises = data.map(goodsExtraItem => {
                        return db.sql(`insert into goods_extra_item(id, extra_id, dict_item_id, goods_id, price) 
                        values (?, ?, ?, ?, ?)`,
                            [goodsExtraItem.id, goodsExtraItem.extraId, goodsExtraItem.dictItemId, goodsExtraItem.goodsId, goodsExtraItem.price]);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端商品数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        }
    });
}

const syncConfig = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/config/syncConfig`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                //删除非本地数据
                // db.sql(`delete from config where local<>1`).then(() => {
                    db.sql(`delete from config where local<>1`).then(() => {
                    var promises = data.map(basicConfig => {
                        return db.sql(`insert into config(id, config_code, config_name, config_value) values (?, ?, ?, ?)`,
                            [basicConfig.id, basicConfig.configCode, basicConfig.configName, basicConfig.configValue]);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端常规配置同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        }
    });
}
//缓存桌台数据
const syncTable = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/table/syncTable`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                //删除非本地数据
                const tableCodes = data.map(item => {
                    return item.tableCode;
                });
                db.sql(`delete from diner_table where table_code not in (?)`, [tableCodes.join(',')]).then(() => {
                    var promises = data.map(tableInfo => {
                        return tableService.insert(tableInfo);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端桌台数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        }
    });
}

//缓存打印机配置数据
const syncPrintSetting = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/print/list`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                //删除本地数据
                db.sql(`delete from print_setting`).then(() => {
                    var promises = data.map(printInfo => {
                        return printSettingService.insert(printInfo);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端打印机配置同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        }
    });
}

//同步每日特价
const syncGoodsDay = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/rule/syncGoodsDay`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                //删除本地数据
                db.sql(`delete from goods_day`).then(() => {
                    var promises = data.map(goodsDay => {
                        return ruleService.insertGoodsDay(goodsDay);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端每日特价数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        }
    });
}

//同步商品折扣
const syncGoodsDiscount = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/rule/syncGoodsDiscount`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                //删除本地数据
                db.sql(`delete from goods_discount`).then(() => {
                    var promises = data.map(goodsDiscount => {
                        return ruleService.insertGoodsDiscount(goodsDiscount);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端商品折扣数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        }
    });
}

//同步减免、折扣
const syncGoodsSubtract = (token, event, eventName) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };
    fetch(`${apiHost}/api/rule/syncGoodsSubtract`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    }).then(data => {
        if (data.status && data.status !== 200) {
            event.sender.send(eventName, { success: false, message: data.message });
        } else {
            db.serialize(() => {
                db.sql('BEGIN');
                //删除本地数据
                db.sql(`delete from goods_subtract`).then(() => {
                    var promises = data.map(goodsSubtract => {
                        return ruleService.insertGoodsSubtract(goodsSubtract);
                    });
                    Promise.all(promises).then(() => {
                        event.sender.send(eventName, { success: true, message: "云端减免、折扣数据同步成功." });
                    }).catch(err => {
                        event.sender.send(eventName, { success: false, message: err.message });
                    });
                });
                db.sql('COMMIT');
            });
        }
    });
}

module.exports = {
    syncDictionaryItem,
    syncFloor,
    syncGoodsCategory,
    syncGoods,
    syncGoodsExtra,
    syncGoodsExtraItem,
    syncConfig,
    syncTable,
    syncPrintSetting,
    syncGoodsDay,
    syncGoodsDiscount,
    syncGoodsSubtract,
};