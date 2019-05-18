const HandleDB = require('./dbHandler');
const path = require('path');
const { app } = require('electron');

const env = process.env.NODE_ENV;
const databaseFile = env === "development" ? path.join(__dirname, '../../../../', 'youdianpu.db') 
    : path.join(app.getPath('userData'), 'youdianpu.db');

var db = null;
if(db == null) {
    db = new HandleDB({
        databaseFile: databaseFile,
    });    
}

module.exports = db;