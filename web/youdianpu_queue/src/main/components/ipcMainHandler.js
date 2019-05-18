const { ipcMain, shell } = require('electron');
const { getIPAdress } = require('../utils/utils');
const { socketClient } = require('./socketClient');
const { printQueue } = require('./services/printService');
const db = require('./db');

let socket = null;

const initListeners = (mainWindow) => {

    //获取本机ip
    ipcMain.on('getLocalIp-message', function (event, arg) {
        event.sender.send('getLocalIp-reply', getIPAdress());
    });

    ipcMain.on('initSocketClient', function (event, arg) {
        socket = socketClient(arg, mainWindow.webContents);
    });

    ipcMain.on('queryAllTableStatus', function (event, arg) {
        socket.emit("queryAllTableStatus");
    });

    //排队相关
    ipcMain.on('selectQueueElement', function (event, arg) {
        db.sql(`select id, queue_id as queueId, queue_sequence as queueSequence, queue_number as queueNumber,
            person_number as personNumber, sort_no as sortNo, put_time as putTime from queue_element where poll_time is null order by sort_no asc`, [], 'all').then((data) => {
                event.sender.send('selectQueueElement-reply', data);
            });
    });
    ipcMain.on('saveQueueElement', function (event, arg) {
        db.sql(`insert into queue_element(id, queue_id, queue_sequence, queue_number, person_number, sort_no, put_time, create_time)
            values (?, ?, ?, ?, ?, (select ifnull(max(a.sort_no), 0)+1 from queue_element a where a.queue_id=?), datetime('now'), datetime('now'))`,
            [null, arg.queueId, arg.queueSequence, arg.queueNumber, arg.personNumber, arg.queueId]).then(() => {
                db.sql(`select last_insert_rowid() id`, [], 'get').then((data) => {
                    arg.id = data.id;
                    event.sender.send('saveQueueElement-reply', arg);
                })
            });
        
    });
    ipcMain.on('updateQueueElement', function (event, arg) {
        db.sql(`update queue_element set poll_time = datetime('now') where id = ?`, [arg.id]);
    });
    ipcMain.on('updateQueueElement2', function (event, arg) {
        if (arg.dropElementId) {
            db.sql(`update queue_element set sort_no = sort_no + 1 where queue_id=? and id > ?`, [arg.queueId, arg.dropElementId]);
            db.sql(`update queue_element set queue_id = ?, sort_no = ? where id = ?`, [arg.queueId, arg.dropElementSortNo + 1, arg.id]);
        } else {
            db.sql(`update queue_element set sort_no = sort_no + 1 where queue_id=?`, [arg.queueId]);
            db.sql(`update queue_element set queue_id = ?, sort_no = 1 where id = ?`, [arg.queueId, arg.id]);
        }
    });
    ipcMain.on('getSequence', function (event, arg) {
        db.sql(`select max(queue_number) as sequence from queue_element t where t.queue_sequence like ?`,
            [`${arg.queueCode}%`], 'get').then(data => {
                let sequence = data.sequence || 0;
                const queueNumber = sequence + 1;
                const queueSequence = (Array(3).join("0") + queueNumber).slice(-3);
                const element = { queueId: arg.queueId, queueNumber, queueSequence: `${arg.queueCode}${queueSequence}` }
                event.sender.send('getSequence-reply', element);
        }).catch(e => console.log(e));
    });
    //汇总
    ipcMain.on('commitYun', function (event, arg) {

    });

    //打开qq客服
    ipcMain.on('openQQ', function (event, arg) {
        const { qq } = arg;
        shell.openExternal(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
    });

    //删除排队
    ipcMain.on('deleteQueueElementByQueueId', function (event, arg) {
        db.sql(`delete from queue_element where queue_id=?`, [arg]);
    });
    ipcMain.on('deleteQueueElementById', function (event, arg) {
        db.sql(`delete from queue_element where id=?`, [arg]).then(() => {
            event.sender.send('deleteQueueElementById-reply');
        });
    });
    ipcMain.on('udpateTableStatus', function (event, arg) {
        socket.emit('udpateTableStatus', arg);
    });
    ipcMain.on('printQueueElement', function (event, arg) {
        printQueue(arg.data, arg.merchantUser).then(() => {
            event.sender.send("printQueueElement-reply", {success: true});
        }).catch(e => {
            event.sender.send("printQueueElement-reply", {success: false, message: e.message});
        });
    });
}

const removeAllListeners = () => {
    ipcMain.removeAllListeners("getLocalIp-message");
    ipcMain.removeAllListeners("initSocketClient");

    ipcMain.removeAllListeners("selectQueueElement");
    ipcMain.removeAllListeners("saveQueueElement");
    ipcMain.removeAllListeners("updateQueueElement");
    ipcMain.removeAllListeners("getSequence");
    ipcMain.removeAllListeners("updateQueueElement2");
    ipcMain.removeAllListeners("commitYun");

    ipcMain.removeAllListeners("deleteQueueElementByQueueId");
    ipcMain.removeAllListeners("deleteQueueElementById");
    ipcMain.removeAllListeners("udpateTableStatus");
    ipcMain.removeAllListeners("printQueueElement");
}

module.exports = {
    initListeners,
    removeAllListeners,
};