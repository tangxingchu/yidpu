const path = require('path');
const expressServer = require('./components/expressServer');
const { app, BrowserWindow, Menu, ipcMain, Tray } = require('electron');
const { autoUpdater } = require("electron-updater");
const package = require("../../package.json");
const { initListeners, removeAllListeners } = require('./components/ipcMainHandler');
//const feedUrl = process.env.NODE_ENV === 'development' ? `http://static.yidpu.com/queue_updater` : `http://download-q.yidpu.com`; // 更新包位置
const feedUrl = `http://download-q.yidpu.com`; // 更新包位置
let mainWindow, tray;
function createTray() {
    tray = new Tray(path.join(__dirname, 'icon_256.ico'));
    const contextMenu = Menu.buildFromTemplate([
        { label: '退出', click: () => {
            removeAllListeners();
            mainWindow.destroy(); 
            mainWindow = null;
            app.quit();
        } },
    ])
    tray.setToolTip('一点谱餐饮平台-排队系统');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
            mainWindow.setSkipTaskbar(false);
        } else {
            mainWindow.show();
            mainWindow.setSkipTaskbar(true);
        }
    });
}
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#2e2c29',
    });
    mainWindow.on('close', (event) => {
        if (process.platform !== 'darwin') {
            mainWindow.hide();
            mainWindow.setSkipTaskbar(true);
            event.preventDefault();
        }
    });
    mainWindow.on('closed', function () {
        mainWindow = null
    });
    if(process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

    initListeners(mainWindow);

    const url = process.env.NODE_ENV === 'development' ? `http://localhost:3011/` : `http://localhost:30111/`;
    if(process.env.NODE_ENV === 'development') {
        mainWindow.loadURL(url);
    } else {
        expressServer(() => {
            mainWindow.loadURL(url);
        });
    }

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
                { label: '恢复初始比例', role: 'resetzoom' },
                { label: '放大', role: 'zoomin' },
                { label: '缩小', role: 'zoomout' },
                { type: 'separator' },
                { label: '全屏/退出全屏', role: 'togglefullscreen' }
            ]
        },
        {
            label: '帮助',
            role: 'help',
            submenu: [
                {
                    label: '官网',
                    click() { require('electron').shell.openExternal('www.yidpu.com') }
                },
                {
                    label: '在线技术客服',
                    click() { mainWindow.webContents.send('online-service') }
                },
                {
                    label: '版本信息',
                    click() { mainWindow.webContents.send('check-version', package.version) }
                }
            ]
        }
    ];

    if(process.env.NODE_ENV === 'development') {
        template[2].submenu.unshift({ role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' });
    }

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

    if (process.platform !== 'darwin') {
        //创建托盘
        createTray();
    }
}

if (process.platform !== 'darwin') {
    // 单实例代码 关键代码在这里
    const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            if (!mainWindow.isVisible()) {
                mainWindow.show();
                mainWindow.setSkipTaskbar(true);
            }
            mainWindow.focus()
        }
    })
    if (shouldQuit) {
        app.quit()
    }
    // 关键代码在这里
}

// 主进程监听渲染进程传来的信息
// 应用启动自动更新
ipcMain.on('check-auto-update', (e, arg) => {
    checkForAutoUpdates();
});

let checkForAutoUpdates = () => {
    // 配置安装包远端服务器
    autoUpdater.setFeedURL(feedUrl);
    let messageInfo = {
        error: '检查更新出错',
        checking: '正在检查更新……',
        updateAva: '检测到新版本，正在下载……',
        updateNotAva: '现在使用的就是最新版本，不用更新',
    };
    // 下面是自动更新的整个生命周期所发生的事件
    //出错
    autoUpdater.on('error', function (message) {
        sendAutoUpdateMessage('error', messageInfo.error);
    });
    //
    autoUpdater.on('checking-for-update', function (message) {
        sendAutoUpdateMessage('checking-for-update', messageInfo.checking);
    });
    autoUpdater.on('update-available', function (message) {
        sendAutoUpdateMessage('update-available', messageInfo.updateAva);
    });
    autoUpdater.on('update-not-available', function (message) {
        sendAutoUpdateMessage('update-not-available', messageInfo.updateNotAva);
    });

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
        sendAutoUpdateMessage('downloadProgress', progressObj);
    });
    // 更新下载完成事件
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        // sendAutoUpdateMessage('isUpdateNow');
        // ipcMain.on('updateNow', (e, arg) => {
            autoUpdater.quitAndInstall();
        // });
    });

    //执行自动更新检查
    autoUpdater.checkForUpdates();
};

// 主进程主动发送消息给渲染进程函数
function sendAutoUpdateMessage(message, data) {
    try {
        mainWindow.webContents.send('check-auto-update-reply', { message, data });
    } catch(e) {
        console.error(e);
    }
}

app.on('ready', () => {
    if(process.env.NODE_ENV === 'development') {
        createWindow();
    } else {
        createWindow();
    }
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