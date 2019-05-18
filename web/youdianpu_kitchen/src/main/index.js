const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");

const { initListeners, removeAllListeners } = require('./components/ipcMainHandler');
const feedUrl = process.env.NODE_ENV === 'development' ? `http://127.0.0.1:5500/kitchenWin32` : ``; // 更新包位置
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#2e2c29',
    });
    mainWindow.on('closed', () => {
        removeAllListeners();
        mainWindow = null;
    });

    mainWindow.webContents.openDevTools();

    initListeners(mainWindow);

    const url = process.env.NODE_ENV === 'development' ? `http://localhost:3012/` : path.join(__dirname, '../../public/index.html');
    mainWindow.loadURL(url);

    const template = [
        {
            label: '编辑',
            submenu: [
                { label: '撤销', role: 'undo' },
                { label: '重做', role: 'redo' },
                { type: 'separator' },
                { label: '剪切', role: 'cut' },
                { label: '复制', role: 'copy' },
                { label: '粘贴', role: 'paste' },
                { label: '粘贴不清除格式', role: 'pasteandmatchstyle' },
                { label: '删除', role: 'delete' },
                { label: '全选', role: 'selectall' }
            ]
        },
        {
            label: '应用',
            role: 'window',
            submenu: [
                { label: '最小化', role: 'minimize' },
                { label: '关闭', role: 'close' }
            ]
        },
        {
            label: '显示',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { label: '恢复初始比例', role: 'resetzoom' },
                { label: '放大', role: 'zoomin' },
                { label: '缩小', role: 'zoomout' },
                { type: 'separator' },
                { label: '全屏/退出全屏', role: 'togglefullscreen' }
            ]
        },
    ]

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        })

        // Edit menu
        template[1].submenu.push(
            { type: 'separator' },
            {
                label: 'Speech',
                submenu: [
                    { role: 'startspeaking' },
                    { role: 'stopspeaking' }
                ]
            }
        )

        // Window menu
        template[3].submenu = [
            { role: 'close' },
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' }
        ]
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu);

}

// 主进程监听渲染进程传来的信息
ipcMain.on('update', (e, arg) => {
    console.log("update");
    checkForUpdates();
});

let checkForUpdates = () => {
    // 配置安装包远端服务器
    autoUpdater.setFeedURL(feedUrl);

    // 下面是自动更新的整个生命周期所发生的事件
    autoUpdater.on('error', function (message) {
        sendUpdateMessage('error', message);
    });
    autoUpdater.on('checking-for-update', function (message) {
        sendUpdateMessage('checking-for-update', message);
    });
    autoUpdater.on('update-available', function (message) {
        sendUpdateMessage('update-available', message);
    });
    autoUpdater.on('update-not-available', function (message) {
        sendUpdateMessage('update-not-available', message);
    });

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
        sendUpdateMessage('downloadProgress', progressObj);
    });
    // 更新下载完成事件
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        sendUpdateMessage('isUpdateNow');
        ipcMain.on('updateNow', (e, arg) => {
            autoUpdater.quitAndInstall();
        });
    });

    //执行自动更新检查
    autoUpdater.checkForUpdates();
};

// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage(message, data) {
    console.log({ message, data });
    webContents.send('message', { message, data });
}

app.on('ready', () => {
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    removeAllListeners();
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        removeAllListeners();
        createWindow()
    }
});