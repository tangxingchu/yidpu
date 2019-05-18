const io = require("socket.io-client");

const socketClient = (port, webContents) => {
    const socket = io(`http://localhost:${port}?clientType=1&token=yidpu`, {
        path: "/placeOrder",
        // forceNew: true, 否则会有多个连接
        reconnection: true,
        reconnectionDelay: 5000,
    });
    socket.on("connect", function () {
        // console.log("connect");
    });

    socket.on('allItemMessage', (data) => {
        let logInfo = [];
        const keys = Object.keys(data);
        keys.map(key => {
            if (data[key] && data[key].length > 0) {
                logInfo.push({ type: 'placeOrder', msg: `桌子编号:${key} 客户点了[${data[key]}]。` })
            }
        });
        try {
            webContents.send('log-info-messages', logInfo);
        } catch(e) {
            
        };
    });
    socket.on('orderItemMessage', data => {
        let logInfo = [{ type: 'placeOrder', msg: `桌台:${data.tableCode} 客户点了[${data.data}]。` }];
        webContents.send('log-info-messages', logInfo);
    });
    //服务员版App或者点餐机提交了订单
    socket.on('isCommited', data => {
        let logInfo = [{ type: 'placeOrder', msg: `${data.createUser}在${data.orderMethod == 2 ? "服务员版APP" : "点餐机"}帮桌台[${data.tableCode}]提交了用餐订单。` }];
        webContents.send('log-info-messages', logInfo);
    });
    //后厨打印失败了
    socket.on('printOrderErrorMsg', data => {
        let logInfo = [{ type: 'highInfo', msg: `桌台[${data.tableCode}]后厨打印失败,原因:${data.message}。` }];
        webContents.send('log-info-messages', logInfo);
    });
    //小票打印失败了
    socket.on('printTicketErrorMsg', data => {
        let logInfo = [{ type: 'highInfo', msg: `桌台[${data.tableCode}]小票打印失败,原因:${data.message}。` }];
        webContents.send('log-info-messages', logInfo);
    });
    //桌台状态修改
    socket.on('udpateTableStatusMsg', ({tableCode, status}) => {
        webContents.send('udpateTableStatusMsg', {tableCode, status});
    });
    //查询出排队队列信息
    socket.on('selectQueueElementMsg', (data) => {
        if(data) {
            webContents.send('selectQueueElementMsg-reply', {success: true, data});
        } else {
            webContents.send('selectQueueElementMsg-reply', {success: false});
        }
    });
    //确认订单消息
    socket.on('confirmOrderMsg', ({orderNo, tableCode, username}) => {
        webContents.send('confirmOrderMsg', {orderNo});
        let logInfo = [{ type: 'info', msg: `${username}确认了[${tableCode}]顾客的点餐订单。` }];
        webContents.send('log-info-messages', logInfo);
    });
    return socket;
}

module.exports = {
    socketClient,
}