const { ipcMain, BrowserWindow } = require('electron');
const { getIPAdress } = require('../utils/utils');
const { socketClient } = require('./socketClient');

const initListeners = (mainWindow) => {
    let socket = null;
    //获取本机ip
    ipcMain.on('getLocalIp-message', function (event, arg) {
        event.sender.send('getLocalIp-reply', getIPAdress());
    });

    ipcMain.on('initSocketClient', function (event, arg) {
        socket = socketClient(arg, mainWindow.webContents);
    });

    ipcMain.on('queryPlaceOrder', function (event, arg) {
        if(socket != null) {
            socket.emit('queryPlaceOrder', arg.token);
        }
    });
}

const removeAllListeners = () => {
    ipcMain.removeAllListeners("getLocalIp-message");
    ipcMain.removeAllListeners("initSocketClient");
    ipcMain.removeAllListeners("queryPlaceOrder");
}

module.exports = {
    initListeners,
    removeAllListeners,
};