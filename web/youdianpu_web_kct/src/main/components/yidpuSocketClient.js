/*链接一点谱的socket服务端口https://socket.yidpu.com, 端口:1888 */
const io = require("socket.io-client");

//const socketURL = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:1888" : "https://socket.yidpu.com";
const socketURL = process.env.NODE_ENV === 'development' ? "https://socket.yidpu.com" : "https://socket.yidpu.com";
const socketClient = (token, webContents, callback) => {
    token = encodeURIComponent(token);
    const url = `${socketURL}?token=${token}`;
    const socket = io(url, {
        path: "/",
        // forceNew: true, 否则会有多个连接
        reconnection: true,
        reconnectionDelay: 5000,
    });
    socket.on("connect", function () {
        callback('connect');
    });
    socket.on('connect_error', (error) => {
        callback('connect_error');
    });
    socket.on('connect_timeout', (timeout) => {
        callback('connect_timeout');
    });
    socket.on("disconnect", function () {
        callback('disconnect');
    });
    //顾客扫码下单消息
    socket.on("customerPlaceOrderMSG", (data) => {
        webContents.send('customerPlaceOrderMSG', data);
    });
    //呼叫服务
    socket.on("callServiceMSG", (data) => {
        webContents.send('callServiceMSG', data);
    });
    //桌台扫码支付成功通知
    socket.on("callPaymentFinishedMSG", (data) => {
        webContents.send('callPaymentFinishedMSG', data);
    });
    //前台扫码支付成功消息
    socket.on("callFrontPaymentFinishedMSG", (data) => {
        webContents.send('callFrontPaymentFinishedMSG', data);
    });
    //桌台扫码支付异常单通知(实际支付金额 小于 订单金额)
    socket.on("callPaymentExceptionMSG", (data) => {
        webContents.send('callPaymentExceptionMSG', data);
    });
    //会员扫码绑定支付宝或者微信
    socket.on("callMemberBindMSG", (data) => {
        webContents.send('callMemberBindMSG', data);
    });
    return socket;
}

module.exports = {
    socketClient,
}