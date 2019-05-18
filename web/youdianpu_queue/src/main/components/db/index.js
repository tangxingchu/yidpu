const HandleDB = require('./dbHandler');
const tables = require('./tableScript');
const path = require('path');
const { app } = require('electron');

const env = process.env.NODE_ENV;
const databaseFile = env === "development" ? path.join(__dirname, '../../../../', 'youdianpu-queue.db') 
    : path.join(app.getPath('userData'), 'youdianpu-queue.db');

var db = null;
if(db == null) {
    db = new HandleDB({
        databaseFile: databaseFile,
    });
    
    db.connectDataBase().then((result) => {
        console.log(result);
        tables.map(table => {
            db.createTable(table).then(r => console.log(r));
        });
    });

    
}

module.exports = db;