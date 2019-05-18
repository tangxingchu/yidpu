const io = require("socket.io-client");
const db = require('./db');

const socketClient = (serverIp, webContents) => {
    const socket = io(`http://${serverIp}?clientType=3&token=yidpu`, {
        path: "/placeOrder",
        // forceNew: true, 否则会有多个连接
        reconnection: true,
        reconnectionDelay: 5000,
    });
    socket.on("connect", function () {
        try {
            webContents.send('connect');
        } catch (e) {}
    });
    socket.on('connect_error', (error) => {
        try {
            webContents.send('connect_error');
        } catch (e) {}
    });
    socket.on('connect_timeout', (timeout) => {
        try {
            webContents.send('connect_timeout');
        } catch (e) {}
    });
    socket.on("disconnect", function () {
        try {
            webContents.send('disconnect');
        } catch (e) {}
    });
    //更新桌台状态
    socket.on('udpateTableStatusMsg', data => {
        webContents.send('udpateTableStatusMsg', data);
    });
    //初始化桌台状态
    socket.on('queryAllTableStatusMsg', data => {
        const new_data = data.map(item => {
            const new_item = {tableCode: item.table_code, status: item.status};
            return new_item;
        });
        webContents.send('queryAllTableStatusMsg', new_data);
    });
    socket.on('selectQueueElement', id => {
        db.sql(`select id, queue_id as queueId, queue_sequence as queueSequence, queue_number as queueNumber,
            person_number as personNumber, sort_no as sortNo, put_time as putTime from queue_element where poll_time is null 
            order by sort_no asc `, [], 'all').then((data) => {
            socket.emit('selectQueueElementMsg', data);
        });
    })
    return socket;
}

module.exports = {
    socketClient,
}