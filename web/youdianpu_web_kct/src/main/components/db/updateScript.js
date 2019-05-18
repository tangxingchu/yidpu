//数据库更新脚本
//需要执行每个比当前版本号大的脚本
//之前的版本号要存入本地数据库,下次更新直接读取，更新完在修改数据库中对应的版本号
const updaterScript = {
    '0.0.9': {
        "key1": "alter table test_updater add column aaaaa varchar(20) NULL",
    },
}

const Utils = require("../../utils/utils");
const db = require('./index');

const update = (curr_version) => {
    //db执行对应的脚本
    db.sql("select * from updater", [], "get").then(data => {
        if(data) {
            let promises = [];
            //只要有更新 就需要提示更新内容
            let v1 = Utils.cpr_version(curr_version, data.his_version);
            if(v1 > 0 ) {
                promises.push(db.sql("update updater set has_show=0 where id=?", [1]));
            }
            Object.keys(updaterScript).forEach((key) => {
                let v2 = Utils.cpr_version(key, data.his_version);
                if(v2 > 0) {
                    Object.keys(updaterScript[key]).forEach(childKey => {
                        console.log(updaterScript[key][childKey]);
                        promises.push(db.sql(updaterScript[key][childKey]));
                    });
                }
            });
            Promise.all(promises).then(() => {
                db.sql("update updater set his_version=? where id=?", [curr_version, 1]);
            });
        } else {//第一次打开应用也提示更新内容
            db.sql("insert into updater(id, has_show, his_version) values (?, ?, ?)", [null, 0, curr_version]);
        }
    });
}

const select = () => {
    return db.sql("select * from updater", [], "get").then(data => {
        return data;
    });
}

const updateHasshow = () => {
    return db.sql("update updater set has_show=1 where id=?", [1]);
}

module.exports =  {
    update,
    select,
    updateHasshow,
}