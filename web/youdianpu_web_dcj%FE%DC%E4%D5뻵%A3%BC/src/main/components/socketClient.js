const io = require("socket.io-client");

const socketClient = (serverIp, webContents) => {
    const socket = io(`http://${serverIp}?clientType=5&token=yidpu`, {
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
        console.log(JSON.parse(data));
        const new_data = data.map(item => {
            const new_item = {tableCode: item.table_code, status: item.status};
            return new_item;
        });
        webContents.send('queryAllTableStatusMsg', new_data);
    });
    //查询餐桌状态(只有餐桌没有场地信息)
    socket.on('selectTableStatusMsg', data => {
        webContents.send('selectTableStatus-reply', data);
    });
    socket.on('selectAllTableFloorMsg', data => {
        webContents.send('selectAllTableFloor-reply', data);
    });
    //换台操作
    socket.on('changeTableMsg',  data => {
        webContents.send('changeTableMsg', data);
    });
    //下单model界面 数据初始化
    socket.on('initPlaceOrderMsg', data => {
        webContents.send('initPlaceOrder-reply', data);
    });
    //商品附属属性
    socket.on('listExtraMsg', ({goodsId, data}) => {
        webContents.send('listExtra-reply', data);
    });
    //商品附属属性
    socket.on('listExtrasMsg', ({goodsIds, data}) => {
        webContents.send('listExtras-reply', data);
    });
    //添加至购物车
    socket.on('saveShoppingCartMsg', data => {
        webContents.send('saveShoppingCart-reply', data);
    });
    //后厨打印消息
    socket.on('app_printOrderMsg', data => {
        webContents.send('printOrder-reply', data);
    });
    //确认订单消息
    socket.on('confirmOrderMsg', ({orderNo, tableCode, username}) => {
        webContents.send('confirmOrderMsg', {orderNo});
    });
    //查询场地信息
    socket.on('selectFloorMsg', data => {
        webContents.send('selectFloor-reply', data);
    });
    //查询平面图信息
    socket.on('getFloorXMLMsg', ({floorId, xmlData}) => {
        webContents.send('getFloorXML-reply', {floorId, xmlData});
    });
    //查询打印信息
    socket.on('selectPrintConfigsMsg', (data) => {
        webContents.send('selectPrintConfigs-reply', data);
    });
    //每日特价
    socket.on('listTodayGoodsDaysMsg', (data) => {
        webContents.send('listTodayGoodsDays-reply', data);
    });
    //每日折扣
    socket.on('listEffectiveGoodsDiscountMsg', (data) => {
        webContents.send('listEffectiveGoodsDiscount-reply', data);
    });
    //每日折扣与特价
    socket.on('listTodayGoodsDaysAndDiscountMsg', (data) => {
        webContents.send('listTodayGoodsDaysAndDiscount-reply', data);
    });
    socket.on('submitOrderToServerMsg', (data) => {
        webContents.send('submitOrderToServer-reply', data);
    });
    socket.on('getTokenMsg', (token) => {
        webContents.send('getToken-reply', token);
    });
    socket.on('refreshTokenMsg', (token) => {
        webContents.send('refreshToken-reply', token);
    });
    return socket;
}

module.exports = {
    socketClient,
}