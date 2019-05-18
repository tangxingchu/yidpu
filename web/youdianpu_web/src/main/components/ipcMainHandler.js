const { ipcMain, BrowserWindow, dialog, app, shell } = require('electron');
const QRCode = require('qrcode');
const { getIPAdress } = require('../utils/utils');
const tables = require('./db/tableScript');
const { initSocketIo, closeSocketIo, getServerStatus } = require('./socketServer');
const { socketClient } = require('./socketClient');
const yidpuSocketClient = require('./yidpuSocketClient').socketClient;
const shoppingCartService = require('./services/shoppingCart');
const goodsService = require('./services/goods');
const goodsExtraService = require('./services/goodsExtra');
const goodsCategoryService = require('./services/goodsCategory');
const placeOrderService = require('./services/placeOrder');
const syncService = require('./services/syncServerData');
const tableService = require('./services/table');
const printSettingService = require('./services/printSetting');
const cacheService = require('./services/cache');
const configService = require('./services/config');
const orderService = require('./services/order');
const floorService = require('./services/floor');
const ruleService = require('./services/rule');
const localCartService = require('./services/localCart');
const cashierLogService = require('./services/cashierLog');
const encrypted = require('./encrypted');
const db = require('./db');
const fs = require('fs');
const gpath = require('path');
const http = require('http');
const ping = require('ping');
const { apiHost } = require("./services/apihost");
const updateScriptHandler = require("./db/updateScript");

var initClient = false;
var promptResponse;
var mainSocketClient = null; //主应用socket客户端对象
const initListeners = (mainWindow, version) => {

    ipcMain.on('app.first.install', function (event, arg) {
        //检查是否首次安装,首次安装同步数据
        db.sql(`select config_value from config where config_code='login-sync-data'`, [], 'get').then(data => {
            if (data && data.config_value == "1") {
                event.sender.send('app.first.install-reply', true);
            } else {
                db.sql(`select config_value from config where config_code='app.first.install'`, [], 'get').then(data => {
                    if (!data || data.config_value == "0") {
                        event.sender.send('app.first.install-reply', true);
                    } else {
                        event.sender.send('app.first.install-reply', false);
                    }
                });
            }
        })
    });
    ipcMain.on('initDbTable', function (event, arg) {
        db.connectDataBase().then((result) => {
            var promises = tables.map(table => {
                return db.createTable(table);
            });
            Promise.all(promises).then(() => {
                //更新当前版本
                updateScriptHandler.update(version);
            }).then(() => event.sender.send('initDbTable-reply'));
        });
    });
    //桌台二维码
    ipcMain.on('qrcode', function (event, arg) {
        QRCode.toDataURL(arg, function (err, url) {
            event.sender.send('qrcode-reply', url);
        });
    });
    //前台收银二维码
    ipcMain.on('front-qrcode', function (event, arg) {
        QRCode.toDataURL(arg, function (err, url) {
            event.sender.send('front-qrcode-reply', url);
        });
    });
    ipcMain.on('save-dialog', function (event, arg) {
        const options = {
            title: '保存二维码',
            filters: [
                { name: 'Images', extensions: ['png'] }
            ]
        }
        dialog.showSaveDialog(options, function (filename) {
            if (filename) {
                event.sender.send('saved-file', filename);
            }
        });
    });
    ipcMain.on('save-qrcode', function (event, arg) {
        const { path, qrcodeData } = arg;
        var base64 = qrcodeData.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
        fs.writeFile(path, dataBuffer);
    });
    //缓存常用数据
    ipcMain.on('cacheDictionaryItem', function (event, arg) {
        syncService.syncDictionaryItem(arg.token, event, "cacheDictionaryItem-reply");
    });
    ipcMain.on('cacheFloor', function (event, arg) {
        syncService.syncTable(arg.token, event, "cacheTable-reply");
        syncService.syncFloor(arg.token, event, "cacheFloor-reply");
    });
    ipcMain.on('cacheGoodsCategory', function (event, arg) {
        syncService.syncGoodsCategory(arg.token, event, "cacheGoodsCategory-reply");
    });
    ipcMain.on('cacheGoods', function (event, arg) {
        syncService.syncGoods(arg.token, event, "cacheGoods-reply");
        syncService.syncGoodsExtra(arg.token, event, "cacheGoodsExtra-reply");
        syncService.syncGoodsExtraItem(arg.token, event, "cacheGoodsExtraItem-reply");
    });
    ipcMain.on('cacheBasicConfig', function (event, arg) {
        syncService.syncConfig(arg.token, event, "cacheBasicConfig-reply");
    });
    ipcMain.on('cachePrintSetting', function (event, arg) {
        syncService.syncPrintSetting(arg.token, event, "cachePrintSetting-reply");
    });
    ipcMain.on('cacheGoodsDay', function (event, arg) {
        syncService.syncGoodsDay(arg.token, event, "cacheGoodsDay-reply");
    });
    ipcMain.on('cacheGoodsDiscount', function (event, arg) {
        syncService.syncGoodsDiscount(arg.token, event, "cacheGoodsDiscount-reply");
    });
    ipcMain.on('cacheGoodsSubtract', function (event, arg) {
        syncService.syncGoodsSubtract(arg.token, event, "cacheGoodsSubtract-reply");
    });
    //数据同步完毕之后将值更改为1
    ipcMain.on('updateConfig-app.first.install', function (event, arg) {
        db.sql(`insert into config(id, config_code, config_value, local) values(1, 'app.first.install', 1, 1)`).catch(e => {
            db.sql(`update config set config_value=1 where id=1`);
        });
    });
    //平面图设计好之后同步一次桌台数据
    ipcMain.on('syncDinerTable', function (event, arg) {
        syncService.syncTable(arg.token, event, "cacheTable-reply");
    });
    //界面查询table数据待场地名称
    ipcMain.on('selectAllTableFloor', function (event, arg) {
        tableService.selectAllTableFloor().then(data => {
            event.sender.send('selectAllTableFloor-reply', data);
        });
    });
    //同步常规配置数据
    ipcMain.on('syncBasicConfig', function (event, arg) {
        syncService.syncConfig(arg.token, event, "syncBasicConfig-reply");
    });
    //更新配置数据
    ipcMain.on('updateBasicConfig', function (event, arg) {
        db.sql(`update config set config_value=? where config_code=?`, [arg.configValue, arg.configCode]);
    });
    //根据code查询配置
    ipcMain.on('selectBasicConfig', function (event, arg) {
        db.sql(`select * from config where config_code = ?`, [arg], 'get').then(data => {
            event.sender.send('selectBasicConfig-reply', data.config_value);
        });
    });
    //根据code查询配置
    ipcMain.on('selectPrintConfigs', function (event, arg) {
        // db.sql(`select * from config where config_code in ('auto-print-ticket', 'auto-print-order')`, [], 'all').then(data => {
        //     event.sender.send('selectPrintConfigs-reply', data);
        // });
        printSettingService.selectPrint2().then(data => {
            event.sender.send('selectPrintConfigs-reply', data);
        });
    });
    //查询配置
    ipcMain.on('selectGoodsDayDiscountConfig', function (event, arg) {
        db.sql(`select * from config where config_code in ('enabled-goods-day', 'enabled-goods-discount')`, [], 'all').then(data => {
            event.sender.send('selectGoodsDayDiscountConfig-reply', data);
        });
    });

    //获取本机ip
    ipcMain.on('getLocalIp-message', function (event, arg) {
        event.sender.send('getLocalIp-reply', getIPAdress());
    });

    //开启socket服务
    ipcMain.on('initSocketIo-message', function (event, arg) {
        initSocketIo(arg, function (result) {
            event.sender.send('initSocketIo-reply', result.message);
            //初始化本机客户端
            if (!initClient) {
                mainSocketClient = socketClient(result.port, mainWindow.webContents);
                initClient = true;
            }
        });
    });

    //停止socket服务
    ipcMain.on('stopSocketIo-message', function (event, arg) {
        closeSocketIo(function () {
            event.sender.send('stopSocketIo-reply');
        });
    });

    /* ipcMain.on('getServerStatus-message', function (event, arg) {
        getServerStatus(function (isStarted) {
            event.sender.send('getServerStatus-reply', isStarted);
        })
    }); */

    ipcMain.on('prompt', function (eventRet, arg) {
        promptResponse = null
        var promptWindow = new BrowserWindow({
            width: 320,
            height: 120,
            show: false,
            resizable: false,
            center: true,
            movable: false,
            modal: true,
            alwaysOnTop: true,
            parent: BrowserWindow.getFocusedWindow(),
            frame: false
        })
        arg.val = arg.val || ''
        const promptHtml = '<meta http-equiv="Content-Type" Content="text/html;charset=utf8"/><label for="val">' + arg.title + '</label>\
    <input id="val" value="' + arg.val + '" autofocus />\
    <button onclick="require(\'electron\').ipcRenderer.send(\'prompt-response\', document.getElementById(\'val\').value);window.close()">确定</button>\
    <button onclick="window.close()">取消</button>\
    <style>body {font-family: sans-serif;} button {float:right; margin-left: 10px;} label,input {margin-bottom: 10px; width: 100%; display:block;}</style>'
        promptWindow.loadURL('data:text/html,' + promptHtml)
        promptWindow.show()
        promptWindow.on('closed', function () {
            eventRet.returnValue = promptResponse;
            promptWindow = null
        });
    });

    ipcMain.on('prompt-response', function (event, arg) {
        if (arg === '') { arg = null }
        promptResponse = arg
    });

    //数据库操作相关
    //保存字典(附属属性)项
    ipcMain.on('saveDictionaryItem', function (event, arg) {
        db.sql(`insert into dictionary_item(id, dict_id, dict_code, item_code, item_name, item_value, sort_no, enabled, remark) 
            values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [arg.id, arg.dictId, arg.dictCode, arg.itemCode, arg.itemName, arg.itemValue, arg.sortNo, arg.enabled, arg.remark]);
    });
    //修改字典(附属属性)项
    ipcMain.on('updateDictionaryItem', function (event, arg) {
        db.sql(`update dictionary_item set item_name=?, sort_no=? where id=?`,
            [arg.itemName, arg.sortNo, arg.id]);
    });
    //删除字典(附属属性)项
    ipcMain.on('deleteDictionaryItem', function (event, arg) {
        db.sql(`delete from dictionary_item where id=?`, [arg.id]);
    });
    //禁用\启用
    ipcMain.on('updateDictionaryItemEnabled', function (event, arg) {
        db.sql(`update dictionary_item set enabled=? where id=?`, [arg.enabled, arg.id]);
    });
    //同步字典(附属属性)项
    ipcMain.on('syncDictionaryItem', function (event, arg) {
        syncService.syncDictionaryItem(arg.token, event, "syncDictionaryItem-reply");
    });

    //查询场地分类
    ipcMain.on('selectFloor', function (event, arg) {
        floorService.selectFloor().then(data => {
            event.sender.send('selectFloor-reply', data);
        });
    });
    ipcMain.on('getFloorXML', function (event, arg) {
        //加载本地平面图信息
        const { floorId, token } = arg;
        const floorPath = gpath.join(app.getPath('userData'), `${floorId}.xml`);
        fs.exists(floorPath, (isExists) => {
            //本地存在缓存的平面图信息
            if (isExists) {
                fs.readFile(floorPath, (err, buffer) => {
                    event.sender.send('getFloorXML-reply', { floorId, xmlData: buffer.toString() });
                });
            } else {//本地没有缓存商品默认图片
                floorService.selectFloorById(floorId, token).then(xmlData => {
                    event.sender.send('getFloorXML-reply', {floorId, xmlData});
                });
            }
        });
    });
    //添加场地分类
    ipcMain.on('saveFloor', function (event, arg) {
        db.sql(`insert into floor(id, floor_name, floor_desc, merchant_id, status, sort_no) 
            values (?, ?, ?, ?, ?, ?)`,
            [arg.id, arg.floorName, arg.floorDesc, arg.merchantId, 1, arg.sortNo]);
    });
    //删除场地分类
    ipcMain.on('deleteFloor', function (event, arg) {
        db.sql(`delete from floor where id=?`, arg.id);
    });
    //修改场地分类
    ipcMain.on('updateFloor', function (event, arg) {
        db.sql(`update floor set floor_name=?, floor_desc=?, merchant_id=?, sort_no=? where id=?`,
            [arg.floorName, arg.floorDesc, arg.merchantId, arg.sortNo, arg.id]);
    });
    //停用\启用
    ipcMain.on('updateFloorStatus', function (evnet, arg) {
        db.sql(`update floor set status=? where id=?`, [arg.status, arg.id]);
    });
    //同步场地数据
    ipcMain.on('syncFloor', function (event, arg) {
        syncService.syncFloor(arg.token, event, 'syncFloor-reply');
    });

    //添加商品分类
    ipcMain.on('saveGoodsCategory', function (event, arg) {
        db.sql(`insert into goods_category(id, category_name, category_desc, merchant_id, sort_no, create_time, modify_time) 
            values (?, ?, ?, ?, ?, datetime('now'), ?)`,
            [arg.id, arg.categoryName, arg.categoryDesc, arg.merchantId, arg.sortNo, null]);
    });
    //删除商品分类
    ipcMain.on('deleteGoodsCategory', function (event, arg) {
        db.sql(`delete from goods_category where id=?`, arg.id);
    });
    //修改商品分类
    ipcMain.on('updateGoodsCategory', function (event, arg) {
        db.sql(`update goods_category set category_name=?, category_desc=?, sort_no=?, modify_time=datetime('now') where id=?`,
            [arg.categoryName, arg.categoryDesc, arg.sortNo, arg.id]);
    });
    //查询商品分类
    ipcMain.on('selectGoodsCategory', function (event, arg) {
        goodsCategoryService.selectGoodsCategory().then(data => {
            event.sender.send('selectGoodsCategory-reply', data);
        });
    });
    //同步云端数据
    ipcMain.on('syncGoodsCategory', function (event, arg) {
        syncService.syncGoodsCategory(arg.token, event, 'syncGoodsCategory-reply');
    });

    //添加购物车
    ipcMain.on('saveShoppingCart', function (event, arg) {
        shoppingCartService.save(arg).then(() => {
            shoppingCartService.selectByTableCode(arg.tableCode).then(data => {
                event.sender.send('saveShoppingCart-reply', data);
            })
        });
    });
    //查询购物车
    // ipcMain.on('selectShoppingCart', function (event, arg) {
    //     shoppingCartService.selectByTableCode(arg.tableCode).then((data) => {
    //         if (data) {
    //             data.map()
    //         }
    //         event.sender.send('selectShoppingCart-reply', data);
    //     });
    // });
    //删除购物车
    ipcMain.on('deleteShoppingCart', function (event, arg) {
        shoppingCartService.deleleById(arg.id);
    });
    //修改购物车 订购数量
    ipcMain.on('updateShoppingCart', function (event, arg) {
        shoppingCartService.update(arg);
    });
    //清空购物车
    ipcMain.on('clearShoppingCart', function (event, arg) {
        shoppingCartService.clearShoppingCart(arg.tableCode);
    });
    //下单界面换台
    ipcMain.on('changeTable', function (event, arg) {
        shoppingCartService.updateTableCode(arg.tableCode, arg.newTableCode).then(() => {
            event.sender.send('changeTable-reply', {success: true});
        }).catch(e => {
            event.sender.send('changeTable-reply', {success: false, message: e.message});
        });
    });

    //添加商品
    ipcMain.on('saveGoods', function (event, arg) {
        db.sql(`insert into goods(id, merchant_id, name, piny, unit, cost_price, price, inventory, category,
            status, description, create_time, modify_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?)`,
            [arg.id, arg.merchantId, arg.name, arg.piny, arg.unit, arg.costPrice, arg.price,
            arg.inventory, arg.category, 1, arg.description, null]);
    });
    //查询所有商品
    ipcMain.on('selectGoods', function (event, arg) {
        goodsService.selectGoods(arg).then((data) => {
            event.sender.send('selectGoods-reply', data);
        });
    });
    //删除商品
    ipcMain.on('deleteGoods', function (event, arg) {
        db.sql(`delete from goods where id=?`, arg.id);
    });
    //修改商品
    ipcMain.on('updateGoods', function (event, arg) {
        var param = [];
        var updateSql = "update goods set name=?, piny=?, unit=?, cost_price=?, price=?, inventory=?, category=?, description=?, printer_id=?, ";
        param.push(arg.name);
        param.push(arg.piny);
        param.push(arg.unit);
        param.push(arg.costPrice);
        param.push(arg.price);
        param.push(arg.inventory);
        param.push(arg.category);
        param.push(arg.description);
        param.push(arg.printerId);
        param.push(arg.id);
        db.sql(`${updateSql} modify_time=datetime('now') where id=?`, param);
    });
    //下架/上架商品
    ipcMain.on('saleOff', function (event, arg) {
        db.sql(`update goods set status=?, modify_time=datetime('now') where id=?`, [arg.status, arg.id]);
    });
    //同步云端数据
    ipcMain.on('syncGoods', function (event, arg) {
        syncService.syncGoods(arg.token, event, 'syncGoods-reply');
    });
    //保存默认商品图片至本地(供后厨系统使用)
    ipcMain.on('saveGoodsDefaultImage', function (event, arg) {
        const { goodsId, base64, url } = arg;
        // const destPath = gpath.join(__dirname, `../../../public/localGoodsImage/goodsId`);
        const dirPath = gpath.join(app.getPath('userData'), 'localGoodsImage');
        const destPath = gpath.join(app.getPath('userData'), `localGoodsImage/${goodsId}`);
        //缓存商品默认图片
        const cacheGoodsDefaultImage = () => {
            //上传商品图片的时候选择的本地图片base64
            if (base64) {
                fs.writeFile(destPath, base64, function (err) {
                    //nothing
                });
            } else {//更改默认图片时,选的线上图片 需要先下载
                var req = http.get(url, function (res) {
                    let bufferList = [];
                    let bufferLength = 0;
                    res.on('error', (error) => {
                        // console.log(error);
                    });
                    res.on('data', function (data) {
                        bufferList.push(data);
                        bufferLength += data.length;
                    });
                    res.on('end', function (data) {
                        let imgBuffer = new Buffer(bufferLength);
                        let pos = 0;
                        for (let buffer of bufferList) {
                            buffer.copy(imgBuffer, pos);
                            pos += buffer.length;
                        }
                        const suffix = url.substring(url.lastIndexOf('.') + 1);
                        const base64Data = `data:image/${suffix};base64,${imgBuffer.toString('base64')}`;
                        fs.writeFile(destPath, base64Data, function (err) {
                            //nothing
                        });
                    });
                });
                //请求出错
                req.on('error', (error) => {
                    console.log(error);
                });
            }
        }
        fs.exists(dirPath, function (isExists) {
            if (!isExists) {
                fs.mkdir(dirPath, function (err) {
                    if (!err) {
                        cacheGoodsDefaultImage();
                    }
                });
            } else {
                cacheGoodsDefaultImage();
            }
        });

    });


    //排队相关
    ipcMain.on('selectQueueElement', function (event, arg) {
        // db.sql(`select id, queue_id as queueId, queue_sequence as queueSequence, queue_number as queueNumber,
        //     person_number as personNumber, sort_no as sortNo, put_time as putTime from queue_element where poll_time is null order by sort_no asc`, [], 'all').then((data) => {
        //     event.sender.send('selectQueueElement-reply', data);
            
        // });
        mainSocketClient.emit('selectQueueElement', arg);
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
            });
    });
    //汇总
    ipcMain.on('commitYun', function (event, arg) {

    });

    //下单model界面 数据初始化
    ipcMain.on('initPlaceOrder', function (event, arg) {
        placeOrderService.init(arg.tableCode).then((data) => {
            event.sender.send('initPlaceOrder-reply', data);
        });
    });
    //提交订单之后的操作桌台状态
    ipcMain.on('submitOrder', function (event, arg) {
        placeOrderService.submitOrder(arg);
    });
    //提交离线订单之后的操作桌台状态
    ipcMain.on('submitOrderOffline', function (event, arg) {
        placeOrderService.submitOrderOffline(arg);
    });
    //获取桌台状态
    ipcMain.on('selectTableStatus', function (event, arg) {
        tableService.selectAllStatus().then(data => {
            event.sender.send('selectTableStatus-reply', data);
        });
    });
    //修改桌台状态
    ipcMain.on('udpateTableStatus', function (event, arg) {
        mainSocketClient.emit("udpateTableStatus", { tableCode: arg.tableCode, status: arg.status });
    });
    //商品附属属性相关
    //保存商品附属属性
    ipcMain.on('saveExtra', function (event, arg) {
        goodsExtraService.saveExtra(arg);
    });
    //删除商品附属属性
    ipcMain.on('deleteExtra', function (event, arg) {
        goodsExtraService.deleteExtra(arg);
    });
    //查询商品附属属性
    ipcMain.on('listExtra', function (event, arg) {
        goodsExtraService.listExtra(arg).then(data => {
            event.sender.send('listExtra-reply', data);
        });
    });
    //查询商品附属属性
    ipcMain.on('listExtras', function (event, arg) {
        goodsExtraService.listExtras(arg.goodsIds).then(data => {
            event.sender.send('listExtras-reply', data);
        });
    });

    //打开支付宝支付的跳转链接
    ipcMain.on('openOrderFunction', function (event, arg) {
        const { token, id, orderNo } = arg;
        const encryptStr = encodeURIComponent(encrypted(token));
        let URL = null;
        if (orderNo) {
            URL = (`${apiHost}/api/merchant/goAlipay?id=${id}&token=${encryptStr}&orderNo=${orderNo}`);
        } else {
            URL = (`${apiHost}/api/merchant/goAlipay?id=${id}&token=${encryptStr}`);
        }
        shell.openExternal(URL);
    });
    //打开qq客服
    ipcMain.on('openQQ', function (event, arg) {
        const { qq } = arg;
        shell.openExternal(`http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`);
    });
    //链接yidpusocketserver
    let yidpuSocketClientObj = null;
    ipcMain.on('connectYidpuSocket', function (event, arg) {
        const token = arg;
        yidpuSocketClientObj = yidpuSocketClient(token, mainWindow.webContents, (msg) => {
            event.sender.send('connectYidpuSocket-reply', msg);
        });
    });
    //断开连接
    ipcMain.on('disconnectYidpuSocket', function (event, arg) {
        if (yidpuSocketClientObj) yidpuSocketClientObj.disconnect();
    });
    //重连
    ipcMain.on('reconnectYdipuSocket', function (event, arg) {
        if (yidpuSocketClientObj) yidpuSocketClientObj.connect();
    });
    //打开平面图设计器
    ipcMain.on('openFloorPlan', function (event, arg) {
        const { id } = arg;
        const url = process.env.NODE_ENV === 'development' ? `http://localhost:3010/` : `http://localhost:30101/`;
        var win = new BrowserWindow({ width: 800, height: 600, show: false });
        win.on('closed', function () {
            win = null;
        });
        win.on('close', function (e) {
            return false;
        });
        win.loadURL(`${url}/floorPlan.html?floor=${id}`);
        win.show();
    });
    //单击通知显示窗口
    ipcMain.on('restoreWin', function (event, arg) {
        if (mainWindow.isVisible() && mainWindow.isFocused()) {
            // mainWindow.maximize();
        } else if (mainWindow.isMinimized()) {
            mainWindow.restore();
            mainWindow.show();
            mainWindow.focus();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });
    //加载本地商品图片
    ipcMain.on('loadGoodsDefaultImage', function (event, arg) {
        const { goodsId, token } = arg;
        const goodsImagePath = gpath.join(app.getPath('userData'), `localGoodsImage/${goodsId}`);
        fs.exists(goodsImagePath, (isExists) => {
            //本地存在缓存的商品默认图片
            if (isExists) {
                fs.readFile(goodsImagePath, (err, buffer) => {
                    event.sender.send('loadGoodsDefaultImage-reply', { goodsId, base64: buffer.toString() });
                });
            } else {//本地没有缓存商品默认图片
                goodsService.selectGoodsDefaultImageURL(goodsId, token).then(base64 => {
                    event.sender.send('loadGoodsDefaultImage-reply', { goodsId, base64 });
                });
            }
        });
    });
    //加载本地logo
    ipcMain.on('loadLogo', function (event, arg) {
        /* const goodsImagePath = gpath.join(app.getPath('userData'), `localGoodsImage/logo`);
        fs.exists(goodsImagePath, (isExists) => {
            //本地存在缓存的商品默认图片
            if (isExists) {
                fs.readFile(goodsImagePath, (err, buffer) => {
                    event.sender.send('loadLogo-reply', { base64: buffer.toString() });
                });
            }
        }); */
        cacheService.getItem("logo").then(data => {
            if(data) {
                event.sender.send("loadLogo-reply", data.value);
            }
        });
    });
    //加载本地商铺名称
    ipcMain.on('loadMerchantName', function (event, arg) {
        /* const goodsImagePath = gpath.join(app.getPath('userData'), `localGoodsImage/name`);
        fs.exists(goodsImagePath, (isExists) => {
            //本地存在缓存的商品默认图片
            if (isExists) {
                fs.readFile(goodsImagePath, (err, buffer) => {
                    event.sender.send('loadMerchantName-reply', { base64: buffer.toString() });
                });
            }
        }); */
        cacheService.getItem("merchantName").then(data => {
            if(data) {
                event.sender.send("loadMerchantName-reply", data.value);
            }
        });
    });
    //加载USB打印机列表
    ipcMain.on("findUSBPrinter", function (event, arg) {
        const printerList = printSettingService.findUSBPrinter();
        event.sender.send("findUSBPrinter-reply", printerList);
    });
    //保存打印设置
    ipcMain.on("savePrintSetting", function (event, arg) {
        printSettingService.updateOrInsert(arg);
    });
    //删除网络打印机
    ipcMain.on("delPrinter", function (event, arg) {
        printSettingService.delPrinter(arg);
    });
    //查找网络打印机
    ipcMain.on("listNetwordPrinter", function (event, arg) {
        printSettingService.selectPrint(2).then(data => {
            event.sender.send("listNetwordPrinter-reply", data);
        });
    });
    //测试打印小票\收银
    ipcMain.on("testPrintTicket", function (event, arg) {
        printSettingService.printTicket(printSettingService.testPrintCart, arg.merchant, arg.printVid, arg.printPid)
            .then(() => {
                event.sender.send("testPrintTicket-reply", {success: true});
        }).catch(e => {
            event.sender.send("testPrintTicket-reply", {success: false, message: e.message});
        });
    });
    //打印小票
    ipcMain.on("printTicket", function (event, arg) {
        printSettingService.selectPrint(1).then(data => {
            if(data) {
                printSettingService.printTicket(arg.cart, arg.merchant, data.print_vid, data.print_pid)
                .then(() => {
                    event.sender.send("printTicket-reply", {success: true});
                }).catch(e => {
                    event.sender.send("printTicket-reply", {success: false, message: e.message});
                });
            } else {
                event.sender.send("printTicket-reply", {success: false, message: '您还没有设置好USB打印机'});
            }
        });
    });
    //测试用餐订单打印
    ipcMain.on("testPrintOrder", function (event, arg) {
        printSettingService.printOrder(printSettingService.testPrintCart, arg.printIp, arg.printPort)
            .then(() => {
                event.sender.send("testPrintOrder-reply", {success: true});
        }).catch(e => {
            event.sender.send("testPrintOrder-reply", {success: false, message: e.message});
        });
    });
    //后厨用餐订单明细打印
    ipcMain.on("printOrder", function (event, arg) {
        const env = process.env.NODE_ENV;
        // if(env === "development") {//使用USB打印机
        if(env === "development_nnnnnooooo") {//使用USB打印机
            printSettingService.selectPrint(1).then(data => {
                if(data) {
                    printSettingService.printOrderByUSB(arg.cart, data.print_vid, data.print_pid)
                        .then(() => {
                            event.sender.send("printOrder-reply", {success: true});
                    }).catch(e => {
                        event.sender.send("printOrder-reply", {success: false, message: e.message});
                    });
                } else {
                    event.sender.send("printOrder-reply", {success: false, message: '您还没有设置好USB打印机'});
                }
            });
        } else {//用网络打印机
            goodsService.selectGoods({}).then(goodsList => {
                printSettingService.selectPrint(2).then(data => {
                    if(data) {
                        let cart = arg.cart;
                        let new_group = {};
                        cart.cartItem.forEach(item => {
                            const goods = goodsList.find(g => g.id == item.goodsId);
                            if(goods && goods.printer_id) {
                                if(!new_group[goods.printer_id]) {
                                    new_group[goods.printer_id] = [];
                                }
                                new_group[goods.printer_id].push(item);
                            }
                        });
                        let promises = [];
                        for(let p in new_group) {
                            let printer = data.find(item => item.id == p);
                            if(printer) {
                                // promises.push(printSettingService.printOrder({...cart, cartItem: new_group[p]}, 
                                //     printer.print_ip, printer.print_port));
                                printSettingService.printOrder({...cart, cartItem: new_group[p]}, 
                                    printer.print_ip, printer.print_port).then(() => {
                                    console.log('print success');
                                    let goodsIds = [];
                                    new_group[p].forEach(cartItem => {
                                        goodsIds.push(cartItem.goodsId);
                                    });
                                    cacheService.getItem('token').then(cacheData => {
                                        placeOrderService.updatePrintStatusBygoodsIds(goodsIds, cart.tableCode, cacheData.value);
                                    });
                                }).catch(e => {
                                    event.sender.send("printOrder-reply", {success: false, message: e.message});
                                });
                            }
                        }
                        // Promise.all(promises).then(() => {
                        //         event.sender.send("printOrder-reply", {success: true});
                        // }).catch(e => {
                        //     event.sender.send("printOrder-reply", {success: false, message: e.message});
                        // });
                    } else {
                        event.sender.send("printOrder-reply", {success: false, message: '您还没有设置好网络打印机'});
                    }
                });
            });
        }
    });
    //测试网络打印机是否能ping通
    ipcMain.on("ping", function (event, arg) {
        let ips = arg.printIp.split(";");
        ips.forEach(ip => {
            ping.sys.probe(ip, function(isAlive){
                event.sender.send("ping-reply", {ip, isAlive: isAlive});
            });
        })
    });
    //收银流水界面-打印收银小票
    ipcMain.on("printCashier", function (event, arg) {
        printSettingService.selectPrint(1).then(data => {
            if(data) {
                printSettingService.printCashierBymanual(arg.order, arg.merchant, arg.cashier, data.print_vid, data.print_pid)
                .then(() => {
                    event.sender.send("printCashier-reply", {success: true});
                }).catch(e => {
                    event.sender.send("printCashier-reply", {success: false, message: e.message});
                });
            } else {
                event.sender.send("printCashier-reply", {success: false, message: '您还没有设置好USB打印机'});
            }
        });
    });
    //缓存数据
    ipcMain.on("setCacheData", function (event, arg) {
        cacheService.setItem(arg.name, arg.value);
    });
    ipcMain.on("getCacheData", function (event, arg) {
        cacheService.getItem(arg.name).then(data => {
            if(data) {
                event.sender.send("getCacheData-reply", {name: arg.name, value: data.value});
            }
        });
    });
    //重置网络打印机
    ipcMain.on("resetNetworkPrinter", function (event, arg) {
        // printSettingService.selectPrint(2).then(data => {
        //     if(data) {
        //         if(data.print_ip && data.print_port) {
                    printSettingService.resetNetworkPrinter(arg.printIp, arg.printPort)
                        .then(() => {
                            event.sender.send("resetNetworkPrinter-reply", {success: true});
                    }).catch(e => {
                        event.sender.send("resetNetworkPrinter-reply", {success: false, message: e.message});
                    });
        //         }
        //     } else {
        //         event.sender.send("resetNetworkPrinter-reply", {success: false, message: '您还没有设置好网络打印机'});
        //     }
        // });
    });
    //重置USB打印机
    ipcMain.on("resetUSBPrinter", function (event, arg) {
        printSettingService.selectPrint(1).then(data => {
            if(data) {
                printSettingService.resetUSBPrinter(data.print_vid, data.print_pid)
                    .then(() => {
                        event.sender.send("resetUSBPrinter-reply", {success: true});
                }).catch(e => {
                    event.sender.send("resetUSBPrinter-reply", {success: false, message: e.message});
                });
            } else {
                event.sender.send("resetUSBPrinter-reply", {success: false, message: '您还没有设置好USB打印机'});
            }
        });
    });
    //移动支付之后自动打印收银小票
    ipcMain.on("autoPrintCashier", function (event, arg) {
        configService.selectCashierConfig().then(data => {
            if(data && data.config_value == "1") {
                printSettingService.selectPrint(1).then(printerData => {
                    if(printerData) {
                        orderService.listPrintCashier(arg.orderNos, arg.token).then(dataList => {
                            // dataList.map(item => { //item.orderVo, item.cashierLog
                                printSettingService.printCashier(dataList, arg.merchant, printerData.print_vid, printerData.print_pid)
                                    .then(() => {
                                        event.sender.send("autoPrintCashier-reply", {success: true});
                                    }).catch(e => {
                                        event.sender.send("autoPrintCashier-reply", {success: false, message: e.message});
                                    });
                            // });
                        }).catch(e => {
                            event.sender.send("autoPrintCashier-reply", {success: false, message: e.message});
                        });
                    } else {
                        event.sender.send("autoPrintCashier-reply", {success: false, message: '您还没有设置好USB打印机'});
                    }
                });
            }
        });
    });
    // //查询排队队列信息
    // ipcMain.on('selectQueueElementByQueueId', function (event, arg) {
    //     mainSocketClient.emit('selectQueueElementByQueueId', arg);
    // });
    //确认订单
    ipcMain.on('confirmOrder', function(event, arg) {
        mainSocketClient.emit('confirmOrder', arg);
    });
    //更新提示
    ipcMain.on('selectUpdater', function(event, arg) {
        updateScriptHandler.select().then(data => {
            event.sender.send("selectUpdater-reply", {has_show: data.has_show, version: version});
        });
    });
    //更改更新提示
    ipcMain.on('updateHasshow', function(event, arg) {
        updateScriptHandler.updateHasshow();
    });
    //运营规则-每日特价
    ipcMain.on('insertGoodsDays', function(event, arg) {
        ruleService.insertGoodsDays(arg);
    });
    ipcMain.on('deleteGoodsDay', function(event, arg) {
        ruleService.deleteGoodsDay(arg);
    });
    ipcMain.on('listTodayGoodsDays', function(event, arg) {
        ruleService.listTodayGoodsDays().then(data => {
            event.sender.send("listTodayGoodsDays-reply", data);
        });
    });
    //运营规则-商品折扣
    ipcMain.on('insertGoodsDiscounts', function(event, arg) {
        ruleService.insertGoodsDiscounts(arg);
    });
    ipcMain.on('deleteGoodsDiscount', function(event, arg) {
        ruleService.deleteGoodsDiscount(arg);
    });
    ipcMain.on('listEffectiveGoodsDiscount', function(event, arg) {
        ruleService.listEffectiveGoodsDiscount().then(data => {
            event.sender.send("listEffectiveGoodsDiscount-reply", data);
        });
    });
    ipcMain.on('listTodayGoodsDaysAndDiscount', function(event, arg) {
        ruleService.listTodayGoodsDaysAndDiscount().then(data => {
            event.sender.send("listTodayGoodsDaysAndDiscount-reply", data);
        });
    });
    //运营规则订单-减免、折扣
    ipcMain.on('saveGoodsSubtract', function(event, arg) {
        ruleService.saveGoodsSubtract(arg);
    });
    ipcMain.on('deleteGoodsSubtract', function(event, arg) {
        ruleService.deleteGoodsSubtract(arg);
    });
    ipcMain.on('enabledGoodsSubtract', function(event, arg) {
        ruleService.enabledGoodsSubtract(arg.id, arg.enabled);
    });
    ipcMain.on('refreshToken', function(event, arg) {
        mainSocketClient.emit('refreshToken', arg);
    });
    ipcMain.on('saveLocalCart', function(event, arg) {
        localCartService.save(arg.tableCode, JSON.stringify(arg));
    });
    ipcMain.on('selectLocalCart', function(event, arg) {
        localCartService.selectByTableCode(arg).then(data => {
            event.sender.send("selectLocalCart-reply", data);
        });
    });
    ipcMain.on('deleteLocalCart', function(event, arg) {
        localCartService.deleteByTableCode(arg);
    });
    ipcMain.on('listCurrentGoodsSubtract', function(event, arg) {
        ruleService.listCurrentGoodsSubtract(arg.totalPrice, arg.orderTime).then(data => {
            event.sender.send("listCurrentGoodsSubtract-reply", data);
        });
    });
    //查询购物车（离线收银）
    ipcMain.on('selectShoppingCartByTableCode', function(event, arg) {
        shoppingCartService.selectByTableCode(arg).then(data => {
            event.sender.send("selectShoppingCartByTableCode-reply", data);
        });
    });
    //离线收银
    ipcMain.on('saveCashierLog', function(event, arg) {
        cashierLogService.save(arg);
    });
    ipcMain.on('listCashierLog', function(event, arg) {
        cashierLogService.list(arg.payMethod).then(data => {
            event.sender.send("listCashierLog-reply", data);
        });
    });
    ipcMain.on('deleteAllCashierLog', function(event, arg) {
        cashierLogService.delAll();
    });
}

const removeAllListeners = () => {
    ipcMain.removeAllListeners("app.first.install");
    ipcMain.removeAllListeners("initDbTable");
    ipcMain.removeAllListeners("qrcode");
    ipcMain.removeAllListeners("front-qrcode");
    ipcMain.removeAllListeners("save-dialog");
    ipcMain.removeAllListeners("save-qrcode");
    ipcMain.removeAllListeners("cacheDictionaryItem");
    ipcMain.removeAllListeners("cacheFloor");
    ipcMain.removeAllListeners("cacheGoodsCategory");
    ipcMain.removeAllListeners("cacheGoods");
    ipcMain.removeAllListeners("cacheBasicConfig");
    ipcMain.removeAllListeners("cachePrintSetting");
    ipcMain.removeAllListeners("cacheGoodsDay");
    ipcMain.removeAllListeners("cacheGoodsDiscount");
    ipcMain.removeAllListeners("cacheGoodsSubtract");

    ipcMain.removeAllListeners("updateConfig-app.first.install");
    ipcMain.removeAllListeners("syncDinerTable");
    ipcMain.removeAllListeners("selectAllTableFloor");
    ipcMain.removeAllListeners("syncBasicConfig");
    ipcMain.removeAllListeners("updateBasicConfig");
    ipcMain.removeAllListeners("selectBasicConfig");
    ipcMain.removeAllListeners("selectPrintConfigs");
    ipcMain.removeAllListeners("selectGoodsDayDiscountConfig");
    ipcMain.removeAllListeners("getLocalIp-message");
    ipcMain.removeAllListeners("initSocketIo-message");
    ipcMain.removeAllListeners("stopSocketIo-message");
    ipcMain.removeAllListeners("getServerStatus-message");
    ipcMain.removeAllListeners("prompt");
    ipcMain.removeAllListeners("prompt-response");

    ipcMain.removeAllListeners("saveDictionaryItem");
    ipcMain.removeAllListeners("updateDictionaryItem");
    ipcMain.removeAllListeners("deleteDictionaryItem");
    ipcMain.removeAllListeners("updateDictionaryItemEnabled");
    ipcMain.removeAllListeners("syncDictionaryItem");

    ipcMain.removeAllListeners("saveFloor");
    ipcMain.removeAllListeners("selectFloor");
    ipcMain.removeAllListeners("getFloorXML");
    ipcMain.removeAllListeners("deleteFloor");
    ipcMain.removeAllListeners("updateFloor");
    ipcMain.removeAllListeners("updateFloorStatus");
    ipcMain.removeAllListeners("syncFloor");
    ipcMain.removeAllListeners("saveGoodsCategory");
    ipcMain.removeAllListeners("deleteGoodsCategory");
    ipcMain.removeAllListeners("updateGoodsCategory");
    ipcMain.removeAllListeners("selectGoodsCategory");
    ipcMain.removeAllListeners("syncGoodsCategory");
    ipcMain.removeAllListeners("saveShoppingCart");
    // ipcMain.removeAllListeners("selectShoppingCart");
    ipcMain.removeAllListeners("deleteShoppingCart");
    ipcMain.removeAllListeners("updateShoppingCart");
    ipcMain.removeAllListeners("clearShoppingCart");
    ipcMain.removeAllListeners("saveGoods");
    ipcMain.removeAllListeners("selectGoods");
    ipcMain.removeAllListeners("deleteGoods");
    ipcMain.removeAllListeners("updateGoods");
    ipcMain.removeAllListeners("saleOff");
    ipcMain.removeAllListeners("syncGoods");
    ipcMain.removeAllListeners("saveGoodsDefaultImage");

    ipcMain.removeAllListeners("selectQueueElement");
    ipcMain.removeAllListeners("saveQueueElement");
    ipcMain.removeAllListeners("updateQueueElement");
    ipcMain.removeAllListeners("getSequence");
    ipcMain.removeAllListeners("updateQueueElement2");
    ipcMain.removeAllListeners("commitYun");
    ipcMain.removeAllListeners("initPlaceOrder");
    ipcMain.removeAllListeners("submitOrder");
    ipcMain.removeAllListeners("submitOrderOffline");
    ipcMain.removeAllListeners("selectTableStatus");
    ipcMain.removeAllListeners("udpateTableStatus");
    ipcMain.removeAllListeners("saveExtra");
    ipcMain.removeAllListeners("deleteExtra");
    ipcMain.removeAllListeners("listExtra");
    ipcMain.removeAllListeners("listExtras");
    ipcMain.removeAllListeners("openOrderFunction");
    ipcMain.removeAllListeners("openQQ");
    ipcMain.removeAllListeners("connectYidpuSocket");
    ipcMain.removeAllListeners("disconnectYidpuSocket");
    ipcMain.removeAllListeners("openFloorPlan");
    ipcMain.removeAllListeners("restoreWin");
    ipcMain.removeAllListeners("loadGoodsDefaultImage");
    ipcMain.removeAllListeners("loadLogo");
    ipcMain.removeAllListeners("loadMerchantName");

    ipcMain.removeAllListeners("findUSBPrinter");
    ipcMain.removeAllListeners("savePrintSetting");
    ipcMain.removeAllListeners("testPrintTicket");
    ipcMain.removeAllListeners("printTicket");
    ipcMain.removeAllListeners("testPrintOrder");
    ipcMain.removeAllListeners("printOrder");
    ipcMain.removeAllListeners("ping");
    ipcMain.removeAllListeners("printCashier");
    ipcMain.removeAllListeners("setCacheData");
    ipcMain.removeAllListeners("getCacheData");
    ipcMain.removeAllListeners("resetNetworkPrinter");
    ipcMain.removeAllListeners("resetUSBPrinter");
    ipcMain.removeAllListeners("autoPrintCashier");
    ipcMain.removeAllListeners("confirmOrder");
    ipcMain.removeAllListeners("selectUpdater");
    ipcMain.removeAllListeners("updateHasshow");
    // ipcMain.removeAllListeners("selectQueueElementByQueueId");

    ipcMain.removeAllListeners("insertGoodsDays");
    ipcMain.removeAllListeners("deleteGoodsDay");
    ipcMain.removeAllListeners("listTodayGoodsDays");
    ipcMain.removeAllListeners("insertGoodsDiscounts");
    ipcMain.removeAllListeners("deleteGoodsDiscount");
    ipcMain.removeAllListeners("listEffectiveGoodsDiscount");
    ipcMain.removeAllListeners("saveGoodsSubtract");
    ipcMain.removeAllListeners("deleteGoodsSubtract");
    ipcMain.removeAllListeners("enabledGoodsSubtract");
    ipcMain.removeAllListeners("refreshToken");

    ipcMain.removeAllListeners("saveLocalCart");
    ipcMain.removeAllListeners("selectLocalCart");
    ipcMain.removeAllListeners("deleteLocalCart");

    ipcMain.removeAllListeners("listCurrentGoodsSubtract");
    ipcMain.removeAllListeners("selectShoppingCartByTableCode");
    ipcMain.removeAllListeners("saveCashierLog");
    ipcMain.removeAllListeners("listCashierLog");
    ipcMain.removeAllListeners("deleteAllCashierLog");
}

module.exports = {
    initListeners,
    removeAllListeners,
};