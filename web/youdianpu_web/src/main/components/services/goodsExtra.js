/*商品附属属性 */

const db = require('../db');

const deleteExtra = (goodsId) => {
    return db.sql(`delete from goods_extra_item where goods_id=?`, [goodsId]).then(() => {
        return db.sql(`delete from goods_extra where goods_id=?`, [goodsId]);
    });    
}

const saveExtra = (extraObj) => {
    const extraList = extraObj.extra;
    if(extraList && extraList.length > 0) {
        const goodsId = extraList[0].goodsId;        
        deleteExtra(goodsId).then(() => {
            extraList.forEach(goodsExtra => {
                const { extraId, extraCode, goodsId, extraName } = goodsExtra;
                db.sql(`insert into goods_extra(id, extra_id, extra_code, goods_id, extra_name) 
                    values (?, ?, ?, ?, ?)`, [null, extraId, extraCode, goodsId, extraName]);
                const extraItemList = extraObj[extraCode];
                extraItemList.forEach(goodsExtraItem => {
                    db.sql(`insert into goods_extra_item(id, extra_id, dict_item_id, goods_id, price) 
                    values (?, ?, ?, ?, ?)`, [null, extraId, goodsExtraItem.dictItemId, goodsId, goodsExtraItem.price]);
                });
            });
        });
    }
}

const listExtra = (goodsId) => {
    return db.sql(`select t.id, t.extra_id as extraId, t.extra_code as extraCode, t.extra_name as extraName,
        t.goods_id as goodsId from goods_extra t where t.goods_id=?`, [goodsId], 'all').then(extras => {        
        return db.sql(`select t.id, t.extra_id as extraId, t.dict_item_id as dictItemId, t.goods_id as goodsId, t.price,
            d.dict_code as dictCode, d.item_name as itemName, d.item_value as itemValue from goods_extra_item t left outer join dictionary_item d
            on t.dict_item_id=d.id where t.goods_id=?`, [goodsId], 'all').then(extraItems => {
            extras.forEach(extra => {
                if(!extra.items) {
                    extra.items = [];
                }
                extraItems.forEach(extraItem => {
                    if(extraItem.extraId === extra.extraId) {
                        extra.items.push(extraItem);
                    }
                });
            });
            return extras;
        });
    });
    
}

const listExtras = (goodsIds) => {
    const promises = goodsIds.map(goodsId => {
        return listExtra(goodsId);
    })
    return Promise.all(promises).then(data => {
        return data;
    })
}

module.exports = {
    deleteExtra,
    saveExtra,
    listExtra,
    listExtras,
};