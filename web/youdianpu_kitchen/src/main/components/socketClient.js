const io = require("socket.io-client");

let socket = null;
const socketClient = (serverIp, webContents) => {
    if(socket == null) {
        socket = io(`http://${serverIp}?clientType=2&token=yidpu`, {
            path: "/placeOrder",
            reconnection: true,
            reconnectionDelay: 5000,
        });
    }    
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
    socket.on('kitchenSystem', data => {
        webContents.send('kitchenSystem-messages', data);
    });
    socket.on('queryPlaceOrderMsg', data => {
        webContents.send('queryPlaceOrderMsg', data);
    });
    return socket;
}

module.exports = {
    socketClient,
}