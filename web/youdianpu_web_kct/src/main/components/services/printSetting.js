const db = require('../db');
const moment = require('moment');
const numeral = require('numeral');
const escpos = require('escpos');

const Queue = require('promise-queue-plus');
// const q = Queue.Promise; //a Promise utils;
const usbPrintQueue = Queue(1,{
    "retry":0               //Number of retries
    ,"retryIsJump":false     //retry now? 
    ,"timeout":0            //The timeout period
});
const netWorkPrintQueue = Queue(1,{
    "retry":0               //Number of retries
    ,"retryIsJump":false     //retry now? 
    ,"timeout":0            //The timeout period
});

const testPrintCart = {
    orderNo: '测试1000000000001111A01',
    tableCode: '测试A01',
    dinersNum: '2',
    cartItem: [{
        name: '测试菜品1',
        dayOrDiscountName: '特价',
        itemPrice: 58,
        price: 58,
        num: 1,
        unitName: '份',
    }, {
        name: '测试菜品2',
        extraItemNames: '中份',
        itemPrice: 38,
        price: 38,
        num: 1,
        unitName: '份',
    }, {
        name: '测试菜品3',
        dayOrDiscountName: '9折',
        itemPrice: 18,
        price: 18,
        num: 1,
        unitName: '份',
    }, {
        name: '测试啤酒',
        itemPrice: 32,
        price: 8,
        num: 4,
        unitName: '瓶',
    }],
};

const updateOrInsert = (printSetting) => {
    db.sql(`select * from print_setting where print_type=?`, [printSetting.printType], 'get').then(data => {
        if (data) { //更新
            if(printSetting.printType == 1) {
                return db.sql(`update print_setting set print_vid=?, print_pid=? where print_type=?`, 
                    [printSetting.printVid, printSetting.printPid, printSetting.printType]);
            } else {
                return db.sql(`update print_setting set print_ip=?, print_port=? where print_type=?`, 
                    [printSetting.printIp, printSetting.printPort, printSetting.printType]);
            }
        } else {//插入
            return db.sql(`insert into print_setting(id, print_type, print_vid, print_pid, print_ip, print_port) values (?, ?, ?, ?, ?, ?)`,
                [printSetting.id, printSetting.printType, printSetting.printVid, printSetting.printPid, printSetting.printIp, printSetting.printPort]);
        }
    });
}

const insert = (printSetting) => {
    return db.sql(`insert into print_setting(id, print_type, print_vid, print_pid, print_ip, print_port) values (?, ?, ?, ?, ?, ?)`,
                [printSetting.id, printSetting.printType, printSetting.printVid, printSetting.printPid, printSetting.printIp, printSetting.printPort]);
}

const selectPrint = (printType) => {
    return db.sql(`select * from print_setting where print_type=?`, [printType], 'get');
}

const selectPrint2 = () => {
    return db.sql(`select * from config where config_code in ('auto-print-ticket', 'auto-print-order')`, [], 'all').then(data => {
        return data;
    });
}

const findUSBPrinter = () => {
    let printerList = [];
        try {
        let device  = new escpos.USB();//USB设备
        printerList = escpos.USB.findPrinter();
    } catch(e) {
        console.error(e);
    }
    return printerList;
}

const usbPrint = (cart, merchant, printVid, printPid) => {
    return new Promise((resolve,reject) => {
        try {
            const device = new escpos.USB(printVid, printPid);//USB打印机
            const options = { encoding: "GB18030" /* default */ }
            const printer = new escpos.Printer(device, options);
            device.open((error) => {
                if(error) {
                    reject(error);
                } else {
                    if(!cart.isAppend) {
                        printer
                        //   .print('\x1B\x40')//初始化打印机 
                        .print('\x1B\x44\x00')//消除所有的水平制表位置
                        .print('\x1B\x44\x16\x21\x29\x00') //设置水平制表值(每行的每个的(3个)水平制表值)
                        .font('a')
                        .style('normal')
                        .print('\x1D\x21\x11') //2倍大小
                        .align('ct')
                        .text(`欢迎光临`)
                        .text(`${merchant.merchantName}`).text('')
                        .print('\x1D\x21\x00')//取消2倍大小
                    } else {
                        printer
                        //   .print('\x1B\x40')//初始化打印机 
                        .print('\x1B\x44\x00')//消除所有的水平制表位置
                        .print('\x1B\x44\x16\x21\x29\x00') //设置水平制表值(每行的每个的(3个)水平制表值)
                        .font('a')
                        .style('normal')
                        .print('\x1D\x21\x11') //2倍大小
                        .align('ct')
                        .text(`加菜`).text('')
                        .print('\x1D\x21\x00')//取消2倍大小
                    }
                    printer
                    .font('a')
                    .align('lt')
                    .pureText('桌台号:').pureText(cart.tableCode).control('LF')
                    .pureText('下单时间:').pureText(cart.orderTime ? cart.orderTime : moment().format('YYYY-MM-DD HH:mm:ss')).control('HT')
                    .pureText('用餐人数:').pureText(cart.dinersNum).control('LF')
                    .pureText('用餐单号:').pureText(cart.orderNo).control('LF')
                    .text('------------------------------------------------')
                    .align('lt')
                    .print('\x1b\x45\x01')//加粗
                    .pureText('菜名').control('HT')
                    .pureText('单价').control('HT')
                    .pureText('数量').control('HT')
                    .pureText('小计').control('LF');
                    let totalPrice = 0;
                    let totalNum = 0;
                    cart.cartItem.map(item => {
                        printer.print('\x1b\x45\x00')//取消加粗
                        .pureText(`${item.name}${item.extraItemNames ? `(${item.extraItemNames})` : `` }`)
                        .pureText(`${item.dayOrDiscountName ? `(${item.dayOrDiscountName })` : `` }`).control('HT')
                        .pureText(numeral(item.price).format('0,0.00')).control('HT')
                        .pureText(`${item.num}${item.unitName}`).control('HT')
                        .pureText(numeral(item.itemPrice).format('0,0.00')).control('LF');
                        totalPrice += item.itemPrice;
                        totalNum += parseInt(item.num);
                    });
                    printer.text('------------------------------------------------')
                    .align('rt')
                    .text(`总共${totalNum}份,消费合计:￥${numeral(totalPrice).format('0,0.00')}`)
                    .align('ct');
                    //补打
                    if(cart.isRePrint) {
                        printer.print('\x1D\x21\x11') //2倍大小
                        .text(`补打`)
                        .print('\x1D\x21\x00')//取消2倍大小
                    }
                    printer.text('').pureText('门店地址:')
                    .pureText(`${merchant.address}`).text('')
                    .control('LF')
                    .control('LF');
                    printer.cut();
                    printer.close(() => {
                        resolve();
                    });
                }
            });
        } catch(e) {
            reject(new Error('没有找到USB打印设备'));
        }
    });
}

const printTicket = (cart, merchant, printVid, printPid) => {
    return usbPrintQueue.go(usbPrint, [cart, merchant, printVid, printPid]);
}

const networkPrint = (cart, printIp, printPort) => {
    return new Promise((resolve,reject) => {
        try {
            const device = new escpos.Network(printIp, printPort);//网络打印机
            const options = { encoding: "GB18030" /* default */ }
            const printer = new escpos.Printer(device, options);
            device.open((error) => {
                if(error) {
                    console.log(error);
                    reject(error);
                } else {
                    printer
                    //   .print('\x1B\x40')//初始化打印机 
                    .print('\x1B\x44\x00')//消除所有的水平制表位置
                    .print('\x1B\x44\x18\x20\x00') //设置水平制表值
                    .font('a')
                    .style('normal')
                    .print('\x1D\x21\x11') //2倍大小
                    .align('ct');
                    if(cart.seqNumber) {
                        printer.text(`餐牌号`)
                        .pureText(`${cart.seqNumber}`);
                    } else {
                        printer.text(`桌台号`)
                        .pureText(`${cart.tableCode}`);
                    }
                    if(cart.isAppend) {
                        printer.pureText(`(加菜)`)
                    }
                    printer.text('')
                    .print('\x1D\x21\x00')//取消2倍大小
                    .font('a')
                    .align('lt')
                    .pureText('下单时间:').pureText(cart.orderTime ? cart.orderTime : moment().format('YYYY-MM-DD HH:mm:ss'))
                    .control('LF')
                    .pureText('用餐单号:').pureText(cart.orderNo).control('LF')
                    .text('------------------------------------------------')
                    .align('lt')
                    .print('\x1b\x45\x01')//加粗
                    .pureText('菜名').control('HT')
                    .pureText('数量').control('HT')
                    .pureText('备注').control('LF');
                    let totalNum = 0;
                    cart.cartItem.map(item => {
                        printer.print('\x1b\x45\x00')//取消加粗
                        .pureText(`${item.name}${item.extraItemNames ? `(${item.extraItemNames})` : ``}`).control('HT')
                        .pureText(`${item.num}${item.unitName}`).control('HT')
                        .pureText(`${item.remark ? item.remark : ``}`).control('LF');
                        totalNum += item.num;
                    });
                    printer.text('------------------------------------------------')
                    .align('rt')
                    .text(`总共${totalNum}份`)
                    .control('LF')
                    .control('LF');
                    printer.cut();
                    printer.close(() => {
                        resolve();
                    });
                }
            });
        } catch(e) {
            reject(new Error(`没有找到IP为${printIp}的打印设备`));
        }
    });
}

const usbPrintOrder = (cart, printVid, printPid) => {
    return new Promise((resolve,reject) => {
        try {
            const device = new escpos.USB(printVid, printPid);//USB打印机
            const options = { encoding: "GB18030" /* default */ }
            const printer = new escpos.Printer(device, options);
            device.open((error) => {
                if(error) {
                    reject(error);
                } else {
                    printer
                    //   .print('\x1B\x40')//初始化打印机 
                    .print('\x1B\x44\x00')//消除所有的水平制表位置
                    .print('\x1B\x44\x18\x20\x00') //设置水平制表值
                    .font('a')
                    .style('normal')
                    .print('\x1D\x21\x11') //2倍大小
                    .align('ct');
                    if(cart.seqNumber) {
                        printer.text(`餐牌号`)
                        .pureText(`${cart.seqNumber}`);
                    } else {
                        printer.text(`桌台号`)
                        .pureText(`${cart.tableCode}`);
                    }
                    if(cart.isAppend) {
                        printer.pureText(`(加菜)`)
                    }
                    printer.text('')
                    .print('\x1D\x21\x00')//取消2倍大小
                    .font('a')
                    .align('lt')
                    .pureText('下单时间:').pureText(cart.orderTime ? cart.orderTime : moment().format('YYYY-MM-DD HH:mm:ss'))
                    .control('LF')
                    .pureText('用餐单号:').pureText(cart.orderNo).control('LF')
                    .text('------------------------------------------------')
                    .align('lt')
                    .print('\x1b\x45\x01')//加粗
                    .pureText('菜名').control('HT')
                    .pureText('数量').control('HT')
                    .pureText('备注').control('LF');
                    let totalNum = 0;
                    cart.cartItem.map(item => {
                        printer.print('\x1b\x45\x00')//取消加粗
                        .pureText(`${item.name}${item.extraItemNames ? `(${item.extraItemNames})` : ``}`).control('HT')
                        .pureText(`${item.num}${item.unitName}`).control('HT')
                        .pureText(`${item.remark ? item.remark : ``}`).control('LF');
                        totalNum += item.num;
                    });
                    printer.text('------------------------------------------------')
                    .align('rt')
                    .text(`总共${totalNum}份`)
                    .control('LF')
                    .control('LF');
                    printer.cut();
                    printer.close(() => {
                        resolve();
                    });
                }
            });
        } catch(e) {
            reject(new Error('没有找到USB打印设备'));
        }
    });
}

const printOrder = (cart, printIp, printPort) => {
    return netWorkPrintQueue.go(networkPrint, [cart, printIp, printPort]);
}

//开发环境使用USB打印后厨订单
const printOrderByUSB = (cart, printVid, printPid) => {
    return usbPrintQueue.go(usbPrintOrder, [cart, printVid, printPid]);
}

//打印收银(移动支付自动打印收银)
const usbPrintCashier = (dataList, merchant, printVid, printPid) => {
    return new Promise((resolve,reject) => {
        try {
            const device = new escpos.USB(printVid, printPid);//USB打印机
            const options = { encoding: "GB18030" /* default */ }
            const printer = new escpos.Printer(device, options);
            device.open((error) => {
                if(error) {
                    reject(error);
                } else {
                    printer
                    //   .print('\x1B\x40')//初始化打印机 
                    .print('\x1B\x44\x00')//消除所有的水平制表位置
                    .print('\x1B\x44\x16\x21\x29\x00') //设置水平制表值(每行的每个的(3个)水平制表值)
                    .font('a')
                    .style('normal')
                    .print('\x1D\x21\x11') //2倍大小
                    .align('ct')
                    .text(`${merchant.merchantName}(收银单)`).text('')
                    .print('\x1D\x21\x00')//取消2倍大小
                    .font('a')
                    .align('lt');
                    let totalPrice = 0;//消费合计
                    let receivableValue = 0; //应收
                    let receivedValue = 0; //实收
                    dataList.map(item => {
                        const order = item.orderVo;
                        const cashier = item.cashierLog;
                        receivedValue += cashier.cashierAmount;
                        totalPrice += order.totalPrice;
                        printer.align('lt').pureText('桌台号:').pureText(order.tableCode).control('LF')
                        .pureText('下单时间:').pureText(order.orderTime ? order.orderTime : moment().format('YYYY-MM-DD HH:mm:ss')).control('HT')
                        .pureText('用餐人数:').pureText(order.dinersNum).control('LF')
                        .pureText('用餐单号:').pureText(order.orderNo).control('LF')
                        .text('------------------------------------------------')
                        .align('lt')
                        .print('\x1b\x45\x01')//加粗
                        .pureText('菜名').control('HT')
                        .pureText('单价').control('HT')
                        .pureText('数量').control('HT')
                        .pureText('小计').control('LF');
                        let totalNum = 0;
                        order.orderItems.map(item => {
                            printer.print('\x1b\x45\x00')//取消加粗
                            .pureText(`${item.goodsName}${item.ruleCode == "1" 
                                ? `(特价)` : item.ruleCode == "2" ? `(${item.ruleValue}折)` :  ``}`)
                            .pureText(` ${item.extraItemNames ? `(${item.extraItemNames})` : `` }`)
                            .control('HT')
                            .pureText(numeral(item.price).format('0,0.00')).control('HT')
                            .pureText(`${item.num}${item.goodsUnitName}`).control('HT')
                            .pureText(numeral(item.price * parseInt(item.num)).format('0,0.00')).control('LF');
                            totalNum += parseInt(item.num);
                        });
                        printer.text('------------------------------------------------')
                        .align('rt')
                        .text(`总共${totalNum}份,合计:￥${numeral(order.totalPrice).format('0,0.00')}`);
                        if(order.subtractRemark) {
                            //打印优惠信息
                            printer.text(`${order.subtractRemark.split("<br/>").join('')}`)
                        };
                        printer.text('------------------------------------------------');
                        receivableValue += (order.totalPrice - order.subtractAmount);
                    });
                    let cashier0 = dataList[0].cashierLog;
                    let order0 = dataList[0].orderVo;
                    //打印消费合计
                    printer.text(`总共${dataList.length}笔单，消费合计:￥${numeral(totalPrice).format('0,0.00')}`)
                    //打印应收
                    printer.text(`应收:￥${numeral(receivableValue).format('0,0.00')}`)
                    //打印实收
                    printer.text(`实收:￥${numeral(receivedValue).format('0,0.00')}`)
                    //打印支付方式与支付时间
                    .text(`支付方式:${order0.payMethodName}`)
                    .text(`支付时间:${cashier0.cashierTime}`)
                    .align('ct');
                    printer.text('').pureText('门店地址:').pureText(`${merchant.address}`).text('')
                    .print('\x1D\x21\x11') //2倍大小
                    .text(`欢迎下次光临`)
                    .print('\x1D\x21\x00')//取消2倍大小
                    .control('LF')
                    .control('LF');
                    printer.cut();
                    printer.close(() => {
                        resolve();
                    });
                }
            });
        } catch(e) {
            reject(new Error('没有找到USB打印设备'));
        }
    });
}

//打印收银(收银界面手动打印收银)
const usbPrintCashierBymanual = (order, merchant, cashier, printVid, printPid) => {
    return new Promise((resolve,reject) => {
        try {
            const device = new escpos.USB(printVid, printPid);//USB打印机
            const options = { encoding: "GB18030" /* default */ }
            const printer = new escpos.Printer(device, options);
            device.open((error) => {
                if(error) {
                    reject(error);
                } else {
                    printer
                    //   .print('\x1B\x40')//初始化打印机 
                    .print('\x1B\x44\x00')//消除所有的水平制表位置
                    .print('\x1B\x44\x16\x21\x29\x00') //设置水平制表值(每行的每个的(3个)水平制表值)
                    .font('a')
                    .style('normal')
                    .print('\x1D\x21\x11') //2倍大小
                    .align('ct')
                    .text(`${merchant.merchantName}(收银单)`).text('')
                    .print('\x1D\x21\x00')//取消2倍大小
                    .font('a')
                    .align('lt');
                    let totalPrice = 0;//消费合计
                    let receivableValue = 0; //应收
                    let receivedValue = 0; //实收
                    receivedValue += cashier.cashierAmount;
                    totalPrice += order.totalPrice;
                    printer.align('lt').pureText('桌台号:').pureText(order.tableCode).control('LF')
                    .pureText('下单时间:').pureText(order.orderTime ? order.orderTime : moment().format('YYYY-MM-DD HH:mm:ss')).control('HT')
                    .pureText('用餐人数:').pureText(order.dinersNum).control('LF')
                    .pureText('用餐单号:').pureText(order.orderNo).control('LF')
                    .text('------------------------------------------------')
                    .align('lt')
                    .print('\x1b\x45\x01')//加粗
                    .pureText('菜名').control('HT')
                    .pureText('单价').control('HT')
                    .pureText('数量').control('HT')
                    .pureText('小计').control('LF');
                    let totalNum = 0;
                    order.orderItems.map(item => {
                        printer.print('\x1b\x45\x00')//取消加粗
                        .pureText(`${item.goodsName}${item.ruleCode == "1" 
                            ? `(特价)` : item.ruleCode == "2" ? `(${item.ruleValue}折)` :  ``}`)
                        .pureText(` ${item.extraItemNames ? `(${item.extraItemNames})` : `` }`)
                        .control('HT')
                        .pureText(numeral(item.price).format('0,0.00')).control('HT')
                        .pureText(`${item.num}${item.goodsUnitName}`).control('HT')
                        .pureText(numeral(item.price * parseInt(item.num)).format('0,0.00')).control('LF');
                        totalNum += parseInt(item.num);
                    });
                    printer.text('------------------------------------------------')
                    .align('rt')
                    .text(`总共${totalNum}份,合计:￥${numeral(order.totalPrice).format('0,0.00')}`);
                    if(order.subtractRemark) {
                        //打印优惠信息
                        printer.text(`${order.subtractRemark.split("<br/>").join('')}`)
                    };
                    printer.text('------------------------------------------------');
                    receivableValue += (order.totalPrice - order.subtractAmount);
                    //打印消费合计
                    printer.text(`总共1笔单，消费合计:￥${numeral(totalPrice).format('0,0.00')}`)
                    //打印应收
                    printer.text(`应收:￥${numeral(receivableValue).format('0,0.00')}`)
                    //打印实收
                    printer.text(`实收:￥${numeral(receivedValue).format('0,0.00')}`)
                    //打印支付方式与支付时间
                    .text(`支付方式:${order.payMethodName}`)
                    .text(`支付时间:${cashier.cashierTime}`)
                    .align('ct');
                    printer.text('').pureText('门店地址:').pureText(`${merchant.address}`).text('')
                    .print('\x1D\x21\x11') //2倍大小
                    .text(`欢迎下次光临`)
                    .print('\x1D\x21\x00')//取消2倍大小
                    .control('LF')
                    .control('LF');
                    printer.cut();
                    printer.close(() => {
                        resolve();
                    });
                }
            });
        } catch(e) {
            reject(new Error('没有找到USB打印设备'));
        }
    });
}

const printCashier = (dataList, merchant, printVid, printPid) => {
    return usbPrintQueue.go(usbPrintCashier, [dataList, merchant, printVid, printPid]);
}

const printCashierBymanual = (orderInfo, merchant, cashier, printVid, printPid) => {
    return usbPrintQueue.go(usbPrintCashierBymanual, [orderInfo, merchant, cashier, printVid, printPid]);
}

const resetUSBPrinter = (printVid, printPid) => {
    return new Promise((resolve,reject) => {
        const device = new escpos.USB(printVid, printPid);//USB打印机
        const options = { encoding: "GB18030" /* default */ }
        const printer = new escpos.Printer(device, options);
        device.open((error) => {
            if(error) {
                reject(error);
            } else {
                printer
                .print('\x1B\x40')//初始化打印机 
                .close(() => {
                    resolve();
                });
            }
        });
    });
}

const resetNetworkPrinter = (printIp, printPort) => {
    return new Promise((resolve,reject) => {
        const device = new escpos.Network(printIp, printPort);//网络打印机
        const options = { encoding: "GB18030" /* default */ }
        const printer = new escpos.Printer(device, options);
        device.open((error) => {
            if(error) {
                reject(error);
            } else {
                printer
                .print('\x1B\x40')//初始化打印机 
                .close(() => {
                    resolve();
                });
            }
        });
    });
}

module.exports = {
    updateOrInsert,
    insert,
    selectPrint,
    selectPrint2,
    findUSBPrinter,
    printTicket,
    printOrder,
    testPrintCart,
    printOrderByUSB,
    printCashier,
    printCashierBymanual,
    resetUSBPrinter,
    resetNetworkPrinter,
};