const db = require('../db');

const setItem = (name, value) => {
    db.sql(`select value from cache where name=?`, [name], 'get').then(data => {
        if (data) { //更新
            return db.sql(`update cache set value=? where name=?`, [value, name]);
        } else {//插入
            return db.sql(`insert into cache(name, value) values (?, ?)`, [name, value]);
        }
    });
}

const getItem = (name) => {
    return db.sql(`select value from cache where name=?`, [name], 'get');
}

module.exports = {
    setItem,
    getItem,
};