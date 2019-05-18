const db = require('../db');

const insert = (tableInfo) => {
    let regExp = new RegExp('<br>', 'g');
    let regExpSpance = new RegExp('&nbsp;', 'g');
    db.sql(`select * from diner_table where table_code=?`, [tableInfo.tableCode], 'get').then(data => {
        if (data) { //更新
            return db.sql(`update diner_table set table_name=? where table_code=?`, [tableInfo.tableName ? 
                tableInfo.tableName.replace(regExp, "").replace(regExpSpance, "") : "", tableInfo.tableCode]);
        } else {//插入
            return db.sql(`insert into diner_table(id, table_code, table_class, table_name, table_limit, table_description, floor_id, status) 
                values (?, ?, ?, ?,?, ?, ?, ?)`,
                [tableInfo.id, tableInfo.tableCode, tableInfo.tableClass, tableInfo.tableName ? 
                    tableInfo.tableName.replace(regExp, "").replace(regExpSpance, "") : "", tableInfo.tableLimit, tableInfo.tableDescription,
                    tableInfo.floorId, tableInfo.status || 0]);
        }
    });

}

const update = (tableCode, status) => {
    return db.sql(`update diner_table set status=? where table_code=?`, [status, tableCode]);
}

const selectAllStatus = () => {
    return db.sql(`select table_code as tableCode, status from diner_table`, [], 'all');
}

const selectAllTableFloor = () => {
    return db.sql(`select t.*, f.floor_name from diner_table t left outer join floor f on t.floor_id=f.id`, [], 'all');
}

module.exports = {
    insert,
    update,
    selectAllStatus,
    selectAllTableFloor,
};