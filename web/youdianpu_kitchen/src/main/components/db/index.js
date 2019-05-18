const HandleDB = require('./dbHandler');
const tables = require('./tableScript');

var db = null;
if(db == null) {
    db = new HandleDB({
        databaseFile: './db/youdianpu-kitchen.db',
    });
    
    db.connectDataBase().then((result) => {
        console.log(result);
        tables.map(table => {
            db.createTable(table).then(r => console.log(r));
        });
    });

    
}

module.exports = db;