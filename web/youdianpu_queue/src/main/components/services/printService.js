const escpos = require('escpos');
const moment = require('moment');
const Queue = require('promise-queue-plus');
// const q = Queue.Promise; //a Promise utils;
const usbPrintQueue = Queue(1,{
    "retry":0               //Number of retries
    ,"retryIsJump":false     //retry now? 
    ,"timeout":0            //The timeout period
});

const usbPrint = (data, merchant) => {
    return new Promise((resolve,reject) => {
        try {
            const device = new escpos.USB();//USB打印机
            const options = { encoding: "GB18030" /* default */ }
            const printer = new escpos.Printer(device, options);
            device.open((error) => {
                if(error) {
                    reject(error);
                } else {
                    printer
                        .print('\x1B\x40')//初始化打印机 
                    .print('\x1B\x44\x00')//消除所有的水平制表位置
                    .print('\x1B\x44\x16\x21\x29\x00') //设置水平制表值(每行的每个的(3个)水平制表值)
                    .font('a')
                    .style('normal')
                    .print('\x1D\x21\x11') //2倍大小
                    .align('ct')
                    .text(`${merchant.merchantName}(排队取号)`).text('')
                    printer
                    .font('a')
                    .align('ct')
                    .pureText(data.queueSequence).control('LF')
                    .print('\x1D\x21\x00')//取消2倍大小
                    .control('LF')
                    .pureText('用餐人数:').pureText(data.personNumber).control('LF')
                    .pureText('排队时间:').pureText(moment().format('YYYY-MM-DD HH:mm:ss'))
                    .pureText('前面还有 ').pureText(data.beforeNumber || 0).pureText(' 桌在排队').control('LF')
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

const printQueue = (data, merchant) => {
    return usbPrintQueue.go(usbPrint, [data, merchant]);
}

module.exports = {
    printQueue,
}