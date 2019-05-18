const db = require('../db');

const save = (arg) => {
    const extraCodes = arg.extraCodes;
    //如果有附属属性,只有附属属性也一样才是一个订单项，属性不一样就再生生成一个订单项
    /**sql示例
     * select t1.cart_id from (select a.table_code, b.* from shopping_cart a left outer join shopping_cart_extra b on a.id=b.cart_id and a.goods_id=b.goods_id where a.goods_id = 126 and table_code='A90') as t1,
    (select a.table_code, b.* from shopping_cart a left outer join shopping_cart_extra b on a.id=b.cart_id and a.goods_id=b.goods_id where a.goods_id = 126 and table_code='A90') as t2
    where (t1.goods_id = 126 and t1.extra_code='EXTRA_FENLIANG' and t1.extra_item_value='1')
       and (t2.goods_id=126 and t2.extra_code='EXTRA_KOUWEI' and t2.extra_item_value='2')
       and t1.cart_id=t2.cart_id and t1.cart_id=t3.cart_id and t2.cart_id = t3.cart_id;
     * 
     */
    if(extraCodes) {
        let extraCount = 1;
        const tableAlias = [];
        const where = [];
        for(let pro in extraCodes) {
            tableAlias.push(`(select a.table_code, b.* from shopping_cart a left outer join shopping_cart_extra b
                on a.id=b.cart_id and a.goods_id=b.goods_id where a.goods_id=${arg.goodsId} and table_code='${arg.tableCode}') as t${extraCount}`);
            where.push(`(t${extraCount}.goods_id=${arg.goodsId} and t${extraCount}.extra_code='${pro}' and t${extraCount}.extra_item_value='${extraCodes[pro]}')`);   
            extraCount++;
        }
        for(let i = 1; i <= tableAlias.length; i++) {
            for(let j = i + 1; j <= tableAlias.length; j++) {
                where.push(`t${i}.cart_id=t${j}.cart_id`);
            }
        }
        let sql = `select t1.cart_id from ${tableAlias.join(", ")} where ${where.join(" and ")}`;
        // console.log(sql);
        return db.sql(sql, [], 'get').then(data => {
            //与之前下的订单完全相同（附属属性都是一样的）
            if(data && data.cart_id) {
                //修改购物车数量
                return db.sql(`update shopping_cart set num=num+1 where id=?`, [data.cart_id]);
            } else {
                return db.sql(`insert into shopping_cart(id, goods_id, num, u_id, table_code, remark, create_time, modify_time) 
                    values (?, ?, ?, ?, ?, ?, datetime('now'), ?)`, [null, arg.goodsId, arg.num, arg.uId, arg.tableCode, arg.remark, null])
                .then(() => {
                    return db.sql(`select last_insert_rowid() as id from shopping_cart`, [], 'get').then(lastIdData => {
                        const cartId = lastIdData.id;
                        let promises = [];
                        for(let pro in extraCodes) {
                            promises.push(db.sql(`insert into shopping_cart_extra(id, cart_id, goods_id, extra_code, extra_item_value) values(?, ?, ?, ?, ?)`,
                                [null, cartId, arg.goodsId, pro, extraCodes[pro]]));
                        }
                        return Promise.all(promises);
                    });
                });
            }
        });
    } else {//没有附属属性
        return db.sql(`select * from shopping_cart where goods_id=? and table_code=?`, [arg.goodsId, arg.tableCode], 'get').then(data => {
            if(data) {
                //修改购物车数量
                return db.sql(`update shopping_cart set num=num+1 where goods_id=? and table_code=?`, [arg.goodsId, arg.tableCode]);
            } else {
                return db.sql(`insert into shopping_cart(id, goods_id, num, u_id, table_code, remark, create_time, modify_time) 
                    values (?, ?, ?, ?, ?, ?, datetime('now'), ?)`, [null, arg.goodsId, arg.num, arg.uId, arg.tableCode, arg.remark || null, null]);
            }
        });
    }
}

const update = (arg) => {
    var param = [];
    var updateSql = "update shopping_cart set";
    if (arg.num != null) {
        updateSql += " num=?,";
        param.push(arg.num);
    }
    if (arg.tableCode != null) {
        updateSql += " table_code=?,";
        param.push(arg.tableCode);
    }
    if(arg.remark != null) {
        updateSql += " remark=?,"
        param.push(arg.remark);
    }
    param.push(arg.id);
    // console.log(`${updateSql} modify_time=datetime('now') where id=?`);
    db.sql(`${updateSql} modify_time=datetime('now') where id=?`, param);
}

const deleleById = (id) => {
    db.sql(`delete from shopping_cart where id=?`, [id]).then(() => {
        db.sql(`delete from shopping_cart_extra where cart_id=?`, [id]);
    });
}

const selectByTableCode = (tableCode) => {
    return db.sql(`select a.id, b.name, b.category,c.category_name as categoryName, d.item_name as unitName,
        b.unit, b.price, a.num, (b.price * a.num) as itemPrice, a.goods_id as goodsId, a.remark, a.table_code as tableCode
        from shopping_cart a left outer join goods b on a.goods_id=b.id
        left outer join goods_category c on c.id=b.category
        left outer join dictionary_item d on d.item_value=b.unit and d.dict_code='DICT_GOODS_UNIT' where table_code=?`, [tableCode], 'all')
    .then(data => {
        if(data) {
            let promises = data.map(item => {
                return db.sql(`select t.id, t.cart_id as cartId, t.goods_id as goodsId, t.extra_code as extraCode, t.extra_item_value as extraItemValue
                    from shopping_cart_extra t left outer join dictionary_item d 
                    on t.extra_code=d.dict_code and d.item_value = t.extra_item_value where t.cart_id=? and t.goods_id=?`, [item.id, item.goodsId], 'all');
            });
            return Promise.all(promises).then((allExtras) => {
                for(let i = 0; i < data.length; i++) {
                    data[i].extraItems = allExtras[i];
                }
                return data;
            });
        } else {
            return data;
        }
    });
}

//换台
const updateTableCode = (tableCode, newTableCode) => {
    return new Promise((resolve, reject) => {
        db.sql(`select * from shopping_cart where table_code=?`, [tableCode], 'all').then(data => {
            if(data && data.length > 0) {
                db.sql(`update shopping_cart set table_code=? where table_code=?`, [newTableCode, tableCode]).then(() => {
                    resolve();
                }).catch(e => {
                    reject(new Error(e.message));
                });
            } else {
                reject(new Error(`您无需换台呀,${tableCode}的购物车空空如也`));
            }
        }).catch(e => {
            reject(new Error(e.message));
        });
    });
}

const clearShoppingCart = (tableCode) => {
    return db.sql(`select id from shopping_cart where table_code=?`, [tableCode], 'all').then(data => {
        if(data) {
            let promises = data.map(item => {
                return db.sql(`delete from shopping_cart_extra where cart_id=?`, [item.id]);
            });
            return Promise.all(promises).then(() => {
                return db.sql(`delete from shopping_cart where table_code=?`, [tableCode]);
            })            
        }
    });    
}

module.exports = {
    save,
    update,
    deleleById,
    selectByTableCode,
    updateTableCode,
    clearShoppingCart,
};