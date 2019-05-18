const { ipcMain, shell } = require('electron');
const { getIPAdress } = require('../utils/utils');
const { socketClient } = require('./socketClient');
const printSettingService = require('./services/printSetting');

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

    //打开qq客服
    ipcMain.on('openQQ', function (event, arg) {
        const { qq } = arg;
        shell.openExternal(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
    });

    //更新桌台状态
    ipcMain.on('udpateTableStatus', function (event, arg) {
        socket.emit('udpateTableStatus', arg);
    });

    //下单界面换台
    ipcMain.on('changeTable', function (event, arg) {
        console.log('changeTable');
        socket.emit("changeTable", arg);
    });

    //界面查询table数据待场地名称
    ipcMain.on('selectAllTableFloor', function (event, arg) {
        socket.emit("selectAllTableFloor");
    });

    //获取桌台状态
    ipcMain.on('selectTableStatus', function (event, arg) {
        socket.emit("selectTableStatus");
    });

    //打印小票
    ipcMain.on("printTicket", function (event, arg) {
        printSettingService.printTicket(arg.cart, arg.merchant)
        .then(() => {
            event.sender.send("printTicket-reply", {success: true});
        }).catch(e => {
            event.sender.send("printTicket-reply", {success: false, message: e.message});
        });
    });

    //下单model界面 数据初始化
    ipcMain.on('initPlaceOrder', function (event, arg) {
        socket.emit('initPlaceOrder', arg.tableCode);
    });

    //查询商品附属属性
    ipcMain.on('listExtra', function (event, arg) {
        socket.emit('listExtra', {goodsId: arg});
    });
    ipcMain.on('listExtras', function (event, arg) {
        socket.emit('listExtras', arg);
    });

    //添加购物车
    ipcMain.on('saveShoppingCart', function (event, arg) {
        socket.emit("saveShoppingCart", arg);
    });

    //提交订单之后的操作桌台状态
    ipcMain.on('submitOrder', function (event, arg) {
        socket.emit("submitOrder", arg);
    });
    ipcMain.on('submitOrderOffline', function (event, arg) {
        socket.emit('submitOrderOffline', arg);
    });
    
    //删除购物车
    ipcMain.on('deleteShoppingCart', function (event, arg) {
        socket.emit("deleteShoppingCart", arg);
    });
    //修改购物车 订购数量
    ipcMain.on('updateShoppingCart', function (event, arg) {
        socket.emit("updateShoppingCart", arg);
    });
    //清空购物车
    ipcMain.on('clearShoppingCart', function (event, arg) {
        socket.emit("clearShoppingCart", arg.tableCode);
    });

    //根据code查询配置
    ipcMain.on('app_printOrder', function (event, arg) {
        socket.emit("app_printOrder", arg.cart);
    });

    //查询场地分类
    ipcMain.on('selectFloor', function (event, arg) {
        socket.emit("selectFloor");
    });
    //查询平面图信息
    ipcMain.on('getFloorXML', function (event, arg) {
        socket.emit("getFloorXML", arg);
    });
    //查询打印启用信息
    ipcMain.on('selectPrintConfigs', function (event, arg) {
        socket.emit("selectPrintConfigs");
    });
    ipcMain.on('listTodayGoodsDays', function(event, arg) {
        socket.emit('listTodayGoodsDays');
    });
    ipcMain.on('listEffectiveGoodsDiscount', function(event, arg) {
        socket.emit('listEffectiveGoodsDiscount');
    });
    ipcMain.on('listTodayGoodsDaysAndDiscount', function(event, arg) {
        socket.emit('listTodayGoodsDaysAndDiscount');
    });
    ipcMain.on('submitOrderToServer', function(event, arg) {
        socket.emit('submitOrderToServer', arg);
    });
    ipcMain.on('getToken', function(event, arg) {
        socket.emit('getToken');
    });
    ipcMain.on('saveLocalCart', function(event, arg) {
        socket.emit('saveLocalCart', arg);
    });
    ipcMain.on('selectLocalCart', function(event, arg) {
        socket.emit('selectLocalCart', arg);
    });
    ipcMain.on('deleteLocalCart', function(event, arg) {
        socket.emit('deleteLocalCart', arg);
    });
    
}

const removeAllListeners = () => {
    ipcMain.removeAllListeners("getLocalIp-message");
    ipcMain.removeAllListeners("initSocketClient");

    ipcMain.removeAllListeners("selectAllTableFloor");
    ipcMain.removeAllListeners("udpateTableStatus");
    ipcMain.removeAllListeners("changeTable");
    ipcMain.removeAllListeners("selectTableStatus");

    ipcMain.removeAllListeners("printTicket");
    ipcMain.removeAllListeners("initPlaceOrder");
    ipcMain.removeAllListeners("listExtra");
    ipcMain.removeAllListeners("saveShoppingCart");
    ipcMain.removeAllListeners("submitOrder");
    ipcMain.removeAllListeners("deleteShoppingCart");
    ipcMain.removeAllListeners("updateShoppingCart");
    ipcMain.removeAllListeners("clearShoppingCart");

    ipcMain.removeAllListeners("app_printOrder");
    ipcMain.removeAllListeners("selectFloor");
    ipcMain.removeAllListeners("getFloorXML");

    ipcMain.removeAllListeners("selectPrintConfigs");
    ipcMain.removeAllListeners("listTodayGoodsDays");
    ipcMain.removeAllListeners("listEffectiveGoodsDiscount");
    ipcMain.removeAllListeners("listTodayGoodsDaysAndDiscount");
    ipcMain.removeAllListeners("submitOrderToServer");
    ipcMain.removeAllListeners("getToken");

    ipcMain.removeAllListeners("saveLocalCart");
    ipcMain.removeAllListeners("selectLocalCart");
    ipcMain.removeAllListeners("deleteLocalCart");
}

module.exports = {
    initListeners,
    removeAllListeners,
};