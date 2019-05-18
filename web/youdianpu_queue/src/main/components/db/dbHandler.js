var SQLite3 = require('sqlite3').verbose();

/**
 * 使用sqlite3持久化数据   
 * 需求：把一个数组中的每个对象,每个对象中的属性,存到xxx.db文件中去,像数据库一样的去操作它
 * 功能：1. 创建数据库(数据库存在的话，那就直接打开)
 *       2. 创建一个表(表存在的话就不用创建啦)
 *       3. 有了数据库和表, 最最基础的功能就是：
 *          插入数据(单个数据插入或者多个并行插入)
 *          更新数据(根据不同的条件更新每列数据)
 *          删除数据(根据不同的条件来删除每列数据)
 *          查询数据(单个数据查询，多个数据查询)
 */
class HandleDB {

    constructor(options) {
        this.databaseFile = options && options.databaseFile;    // 数据库文件(文件路径+文件名)
        this.tableName = options && options.tableName || `adsTable`;   // 表名
        this.db = null;    // 打开的数据库对象
    }

    // 连接数据库(不存在就创建,存在则打开)
    connectDataBase() {
        return new Promise((resolve, reject) => {
            this.db = new SQLite3.Database(this.databaseFile, function (err) {
                if (err) reject(new Error(err));
                resolve('db connect success!');
            });
        });
    }

    /**
     * 创建表
     * @param sentence    CREATE TABLE 语句
     * @used
      let sentence = `
       create table if not exists ${this.tableName}(
            begin_time varchar(255),
            create_time varchar(255),
            end_time varchar(255),
            play_id varchar(255),
            postion_id int(50),
            status int(50),
            task_id int(50)
        );`;
     this.createTable(sentence);
     */
    createTable(sentence) {
        return new Promise((resolve, reject) => {
            this.db.exec(sentence, (err) => {
                if (err) reject(new Error(err));
                resolve(`table ${sentence} create success / exist`);
            });
        });
    }

    /**
     * 执行 增  删  改  查(单个数据查询或者多个数据查询)
     * @param sql    sql语句
     * @param param     参数(可以是数组或者数字或者字符串,根据sql语句来定)
     * @param mode    执行模式, 默认run,执行sql,如果查询的话,则使用get(单个)all(多个)
     * @returns {Promise}
       @used
       增 : this.sql(`insert into ${this.tableName} (begin_time, create_time, end_time, play_id, postion_id, status, task_id) values(?, ?, ?, ?, ?, ?, ?)`,
                    [obj.begin_time, obj.create_time, obj.end_time, obj.play_id, obj.postion_id, obj.status, obj.task_id]);

       删 : this.sql(`delete from ${this.tableName} where id = ?`, id);

       改 : this.sql(`update ${this.tableName} set begin_time = ?, status = ? where postion_id = ?`, [begin_timeValue, statusValue, postion_idValue]);

       查 : this.sql(`select * from ${this.tableName} where id = ?`, id, 'get/all');
     */
    sql(sql, param, mode) {
        mode = mode == 'all' ? 'all' : mode == 'get' ? 'get' : 'run';
        return new Promise((resolve, reject) => {
            this.db[mode](sql, param,
                (err, data) => {    // data: Array, Object
                    if (err) {
                        console.log(err);
                        reject(new Error(err));
                    } else {
                        if(mode == 'all' || mode == 'get') {
                            resolve(data);
                        } else {
                            if (data) {
                                resolve(data);    // 返回数据查询成功的结果
                            } else {
                                resolve('success');    // 提示 增 删 改 操作成功
                            };
                        }                        
                    };
                }
            );
        });
    }
}

module.exports = HandleDB;