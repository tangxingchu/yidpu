
const http = require('http');
const path = require('path');
const fs = require('fs');
const { probe } = require('../utils/utils');
const { app } = require('electron');
const tableService = require("./services/table");
const shoppingCartService = require("./services/shoppingCart");
const orderService = require('./services/order');
const goodsService = require('./services/goods');
const placeOrderService = require('./services/placeOrder');
const printSettingService = require('./services/printSetting');
const cacheService = require('./services/cache');
const goodsExtraService = require('./services/goodsExtra');
const configService = require('./services/config');
const floorService = require('./services/floor');
const fetch = require("node-fetch");

var server = null;
var io = null;
var serverPort = null;
//超级管理员房间
var superRoom = 'superRoom';
// 桌台用户购物车map
var cartInfo = {};
// 根据clientType保存对应的socket客户端
var allSockets = {};
const hashUID = new Object();

const initSocketIo = (port, callback) => {
    probe(port, function (bl) {
        if (server != null) {
            callback({port, message: `点餐服务已启动。端口:${port}`});
        } else {
            if (!bl) {
                server = http.createServer();
                io = require('socket.io')(server, {
                    path: '/placeOrder',
                    serveClient: false,
                    // below are engine.IO options
                    pingInterval: 30000,
                    pingTimeout: 5000,
                    cookie: false,
                });
                server.listen(port);
                io.use((socket, next) => {
                    let token = socket.handshake.query.token;
                    if(token == "yidpu") {
                        return next();
                    } else {
                        return next(new Error("Authentication error"));
                    }                    
                });
                io.sockets.on('connection', (socket) => {
                    //数据实体：table、order、queue
                    //客户端类型：clientType=1表示控制台,//clientType=2表示后厨系统,//clientType=3表示排队系统,//clientType=4表示手机客户端（服务员版与用户版）
                    //系统：控制台table、order。后厨order、table。排队：table、queue、手机客户端(服务员版)：order，用户版：order
                    //分组：table纬度分组、业务纬度分组。
                    //桌子用餐状态(1=空闲中、2=入座点菜中、3=待确认, 4=等待上菜用餐中、5=打扫中)，只通知排队系统、控制台
                    var clientType = socket.handshake.query.clientType;
                    var tableCode = socket.handshake.query.tableCode;
                    if (!clientType) {
                        return;
                    }
                    if (clientType == 1) {
                        socket.join(superRoom, () => {
                            socket.emit('allItemMessage', cartInfo);//发送已下单产品列表给当前客户端
                        });
                        //删除排队时候要校验下面是否有队列信息
                        socket.on("selectQueueElement", (id) => {
                            var queueClient = io.sockets.sockets[allSockets[3]];//排队子系统客户端
                            if(queueClient == null) {
                                socket.emit('selectQueueElementMsg', null);
                            } else {
                                queueClient.emit("selectQueueElement", id);
                            }
                        });
                        
                    } else if(clientType == 2) {//后厨子系统只需要知道下单信息
                        allSockets[clientType] = socket.id;//保存后厨子系统客户端
                    } else if(clientType == 3) {//排队子系统只需要知道桌台状态
                        allSockets[clientType] = socket.id;//保存排队子系统客户端
                        socket.on("selectQueueElementMsg", data => {
                            socket.to(superRoom).broadcast.emit('selectQueueElementMsg', data);
                        });
                    } else if (clientType == 4 || clientType == 5) {
                        if (!cartInfo[tableCode]) {
                            cartInfo[tableCode] = [];
                        }
                        // socket.emit('news', { hello: 'world' });
                        // socket.on('join', (data) => {
                        socket.join(tableCode, () => {
                            let rooms = Object.keys(socket.rooms);
                            socket.to(tableCode).broadcast.emit('joinMessage', socket.id);//广播给其他用户加入房间消息
                            socket.emit('allItemMessage', cartInfo[tableCode]);//发送已下单产品列表给当前客户端
                        });
                        // });

                        //服务员版移动端初始化下单场景界面
                        socket.on('initPlaceOrder', tableCode => {
                            placeOrderService.init(tableCode).then((data) => {
                                socket.emit('initPlaceOrderMsg', data);
                            });
                        })
                        // //下单消息
                        // socket.on('palceOrder', (data) => {
                        //     console.log(socket.id, data);
                        //     cartInfo[tableCode].push(data);
                        //     socket.to(tableCode).broadcast.emit('orderItemMessage', data);//广播给房间其他用户
                        //     //广播给管理员房间
                        //     socket.to(superRoom).broadcast.emit('orderItemMessage', { tableCode: tableCode, data: data });
                            
                        //     //插入桌子状态
                        //     // tableService.update(tableCode, 2);
                        //     //发送桌子状态给排队子系统（2=下单中）  这里应该是排队系统将状态更改为2=入座下单中
                        //     // var queueClient = io.sockets.sockets[allSockets[3]];//排队子系统客户端
                        //     // if (queueClient) {
                        //     //     queueClient.emit('tableStatus', {tableCode, status: 2});
                        //     // }
                        // });
                        //取消下单
                        socket.on('cancelOrder', (data) => {
                            
                        });
                        //确定购物车提交订单
                        socket.on('submitOrder', (arg) => {
                            placeOrderService.submitOrder(arg);
                            // tableService.update(arg.tableCode, 4);//上菜用餐中,上面submitOrder方法以及修改了
                            //广播给所有人包括自己
                            io.sockets.emit("udpateTableStatusMsg", {tableCode: arg.tableCode, status: 4});                            
                            //广播给管理员房间 提交订单了, 打印用餐订单与小票
                            socket.to(superRoom).broadcast.emit('isCommited', {orderMethod: arg.orderMethod, createUser: arg.createUser, tableCode: arg.tableCode});
                            socket.emit("submitOrderMsg", arg);
                        });
                        //下单或确认订单之后打印
                        socket.on('printSubmitOrder', (arg) => {
                            //检查下单之后是否自动打印
                            configService.selectPrintConfig().then(data => {
                                if(data) {
                                    const autoPrintTicket = data.find(item => item.config_code == 'auto-print-ticket' && item.config_value == "1");
                                    if(autoPrintTicket) {
                                        //打印小票
                                        printSettingService.selectPrint(1).then(data => {
                                            if(data) {
                                                cacheService.getItem("merchantUser").then(cachedData => {
                                                    printSettingService.printTicket(arg, JSON.parse(cachedData.value), data.print_vid, data.print_pid).then(() => {
                                                        socket.emit('printTicketMsg', {success: true, tableCode: arg.tableCode});
                                                    }).catch(error => {
                                                        socket.emit('printTicketMsg', {success: false, tableCode: arg.tableCode, message: error.message});
                                                        //广播给管理员房间 打印小票失败
                                                        socket.to(superRoom).broadcast.emit('printTicketErrorMsg', {success: false, tableCode: arg.tableCode, message: error.message});
                                                    });
                                                });
                                            } else {
                                                socket.emit('printTicketMsg', {success: false, tableCode: arg.tableCode, message: '还没有设置好USB打印机'});
                                                //广播给管理员房间 打印小票失败
                                                socket.to(superRoom).broadcast.emit('printTicketErrorMsg', {success: false, tableCode: arg.tableCode, message: '还没有设置好USB打印机'});
                                            }
                                        });
                                    }
                                    const autoPrintOrder = data.find(item => item.config_code == 'auto-print-order' && item.config_value == "1");
                                    if(autoPrintOrder) {
                                        //后厨打印用餐订单明细
                                        printSettingService.selectPrint(2).then(data => {
                                            if(data) {
                                                printSettingService.printOrder(arg, data.print_ip, data.print_port).then(() => {
                                                    socket.emit('printOrderMsg', {success: true, tableCode: arg.tableCode});
                                                }).catch(error => {
                                                    socket.emit('printOrderMsg', {success: false, tableCode: arg.tableCode, message: error.message});
                                                    //广播给管理员房间 后厨打印失败
                                                    socket.to(superRoom).broadcast.emit('printOrderErrorMsg', {success: false, tableCode: arg.tableCode, message: error.message})
                                                });
                                            } else {
                                                socket.emit('printOrderMsg', {success: false, tableCode: arg.tableCode, message: '还没有设置好网络打印机'});
                                                //广播给管理员房间 后厨打印失败
                                                socket.to(superRoom).broadcast.emit('printOrderErrorMsg', {success: false, tableCode: arg.tableCode, message: '还没有设置好网络打印机'})
                                            }
                                        });
                                    }
                                }
                            });
                        })
                        //服务版app后厨打印
                        socket.on('app_printOrder', (arg) => {
                            //后厨打印用餐订单明细
                            printSettingService.selectPrint(2).then(data => {
                                if(data) {
                                    printSettingService.printOrder(arg, data.print_ip, data.print_port).then(() => {
                                        socket.emit('app_printOrderMsg', {success: true, tableCode: arg.tableCode});
                                    }).catch(error => {
                                        socket.emit('app_printOrderMsg', {success: false, tableCode: arg.tableCode, message: error.message});
                                        //广播给管理员房间 后厨打印失败
                                        socket.to(superRoom).broadcast.emit('printOrderErrorMsg', {success: false, tableCode: arg.tableCode, message: error.message})
                                    });
                                } else {
                                    ocket.emit('app_printOrderMsg', {success: false, tableCode: arg.tableCode, message: '还没有设置好网络打印机'});
                                    //广播给管理员房间 后厨打印失败
                                    socket.to(superRoom).broadcast.emit('printOrderErrorMsg', {success: false, tableCode: arg.tableCode, message: '还没有设置好网络打印机'});
                                }
                            });
                        });
                        
                        //服务员点餐版添加购物车
                        socket.on('saveShoppingCart', (arg) => {
                            shoppingCartService.save(arg).then(() => {
                                shoppingCartService.selectByTableCode(arg.tableCode).then(data => {
                                    socket.emit('saveShoppingCartMsg', data);
                                });
                            });
                            //插入桌子状态
                            tableService.update(arg.tableCode, 2);
                            //广播给所有人包括自己
                            io.sockets.emit("udpateTableStatusMsg", {tableCode: arg.tableCode, status: 2});
                        });
                        //服务员版点餐减购物车项
                        socket.on('updateShoppingCart', (arg) => {
                            shoppingCartService.update(arg);
                            //广播给其他所有人(不包括自己)
                            // socket.broadcast.emit("updateShoppingCartMsg");
                        });
                        //服务员版点餐删除购物车项
                        socket.on('deleteShoppingCart', (arg) => {
                            shoppingCartService.deleleById(arg.id);
                        });
                        //清空购物车
                        socket.on('clearShoppingCart', (arg) => {
                            shoppingCartService.clearShoppingCart(arg);
                        });
                    }

                    ///////下面是公共的
                    //修改桌台状态
                    socket.on("udpateTableStatus", ({tableCode, status}) => {
                        tableService.update(tableCode, status);
                        //广播给所有人包括自己
                        io.sockets.emit("udpateTableStatusMsg", {tableCode, status});
                    });
                    //确认订单(确认订单发往后厨)
                    socket.on('confirmOrder', ({orderNo, tableCode, username}) => {
                        //sqlite3查询订单信息
                        //订单信息发往后厨
                        // var kitchenClient = io.sockets.sockets[allSockets[2]];//后厨子系统客户端
                        // kitchenClient.emit('kitchenSystem', {tableCode: 'A81', orderItem: [{goodsName: '宫保鸡丁', goodsId: '1'}]});
                        //广播给所有人（不包括自己）
                        socket.broadcast.emit("confirmOrderMsg", {orderNo, tableCode, username});
                    });
                    //查询桌台状态
                    socket.on('queryAllTableStatus', () => {
                        tableService.selectAllTableFloor().then((data) => {
                            socket.emit('queryAllTableStatusMsg', data);
                        });
                    });
                    //查询商品附属属性
                    socket.on('listExtra', ({goodsId}) => {
                        goodsExtraService.listExtra(goodsId).then(data => {
                            socket.emit('listExtraMsg', {goodsId, data});
                        });
                    });
                    //查询多个商品的附属属性(服务员版app点击购物车的时候，有可能需要查)
                    socket.on('listExtras', ({goodsIds}) => {
                        goodsExtraService.listExtras(goodsIds).then(data => {
                            socket.emit('listExtrasMsg', {goodsIds, data});
                        });
                    });
                    //查询所有未完成的订单(哪个客户端查就发给哪个客户端，一般是后厨系统发)
                    socket.on('queryPlaceOrder', (token) => {
                        console.log('queryPlaceOrder', token);
                        orderService.listNoCompleteOrder(token).then(data => {
                            if (data.status && data.status !== 200) {
                                socket.emit('queryPlaceOrderMsg', { success: false, message: data.message });
                            } else {
                                socket.emit('queryPlaceOrderMsg', { success: true, message: data });
                            }
                        }).catch(e => {
                            socket.emit('queryPlaceOrderMsg', { success: false, message: e.message });
                        });
                    });
                    //后厨显示系统、服务员版点餐app,查询商品默认图片
                    socket.on('queryGoodsDefaultImage', ({goodsId, token}) => {
                        const goodsImagePath = path.join(app.getPath('userData'), `localGoodsImage/${goodsId}`);
                        console.log(goodsImagePath);
                        fs.exists(goodsImagePath, (isExists) => {
                            //本地存在缓存的商品默认图片
                            if(isExists) {
                                fs.readFile(goodsImagePath, (err, buffer) => {
                                    socket.emit('queryGoodsDefaultImageMsg', {goodsId, base64: buffer.toString()});
                                });
                            } else {//本地没有缓存商品默认图片
                                goodsService.selectGoodsDefaultImageURL(goodsId, token).then(base64 => {
                                    socket.emit('queryGoodsDefaultImageMsg', {goodsId, base64});
                                });
                            }
                        })
                    });
                    //换台操作(服务员版APP)
                    socket.on('changeTable', ({tableCode, newTableCode}) => {
                        console.log('rrrrrrr')
                        shoppingCartService.updateTableCode(tableCode, newTableCode).then(() => {
                            socket.emit('changeTableMsg', { success: true});
                        }).catch((e) => {
                            socket.emit('changeTableMsg', { success: false, message: e.message });
                        })
                    });
                    //查询餐桌状态
                    socket.on('selectTableStatus', () => {
                        tableService.selectAllStatus().then(data => {
                            socket.emit('selectTableStatusMsg', data);
                        });
                    });
                    //界面查询table数据待场地名称
                    socket.on('selectAllTableFloor', () => {
                        tableService.selectAllTableFloor().then(data => {
                            socket.emit('selectAllTableFloorMsg', data);
                        });
                    });
                    //查询场地信息
                    socket.on('selectFloor', () => {
                        floorService.selectFloor().then(data => {
                            socket.emit('selectFloorMsg', data);
                        });
                    });
                    //查询平面图
                    socket.on('getFloorXML', ({floorId, token}) => {
                        //加载本地平面图信息
                        const floorPath = path.join(app.getPath('userData'), `${floorId}.xml`);
                        fs.exists(floorPath, (isExists) => {
                            //本地存在缓存的平面图信息
                            if (isExists) {
                                fs.readFile(floorPath, (err, buffer) => {
                                    socket.emit('getFloorXMLMsg', { floorId, xmlData: buffer.toString() });
                                });
                            } else {//本地没有缓存商品默认图片
                                floorService.selectFloorById(floorId, token).then(xmlData => {
                                    socket.emit('getFloorXMLMsg', {floorId, xmlData});
                                });
                            }
                        });
                    });
                    //打印信息
                    socket.on('selectPrintConfigs', () => {
                        printSettingService.selectPrint2().then(data => {
                            socket.emit('selectPrintConfigsMsg', data);
                        });
                    });
                });
                serverPort = port;
                callback({port, message: `点餐服务已启动。端口:${port}`});
            } else {
                initSocketIo(port + 1, callback);
            }
        }
    });
}

//关闭服务
const closeSocketIo = (callback) => {
    if (server != null) {
        io.close();
        server.close();
        server = null;
        io = null;
        serverPort = null;
        if(callback) {
            callback();
        }        
    }
}

const getServerStatus = (callback) => {
    if (server != null) {
        callback(serverPort);
    } else {
        callback(null);
    }
}

module.exports = {
    initSocketIo,
    closeSocketIo,
    getServerStatus
}


