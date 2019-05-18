const escpos = require('escpos');

// const device  = new escpos.USB(1155, 22339);//USB打印机
//const device  = new escpos.Network('localhost');//网络打印机
//const device  = new escpos.Serial('/dev/usb/lp0');//串口打印机
// const device = new escpos.Console();//调试打印

// const options = { encoding: "GB18030" /* default */ }
// encoding is optional

// const printerList = escpos.USB.findPrinter();
//console.log(printerList[0].deviceDescriptor.idProduct);
//console.log(printerList[0].deviceDescriptor.idVendor);
// return;
// const printer = new escpos.Printer(device, options);

/*
device.open(function () {
  printer.font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text('The quick brown fox jumps over the lazy dog')
      .text('敏捷的棕色狐狸跳过懒狗')
      .barcode('1234567', 'EAN8')
      .qrimage('https://github.com/song940/node-escpos', function (err) {
          this.cut();//剪纸
          this.close();
      });
});
*/

/*
device.open(function(){
  printer
      .size(1, 1)
      .text('Demo')
      .align('lt')
      .size(1, 2)
      .text('出货单')
      .text('编码').control('').text('数量').spacing().text('金额').control('LF')
      .text('GS-32').spacing().text('5').spacing().text('$120').control('LF')
      .barcode('NIKE102948392109', 'CODE39')
      .control('LF')
  printer.cut();
  printer.close();
  // .barcode('1234567', 'EAN8')
  // .qrimage('https://github.com/song940/node-escpos', function(err){
    // this.cut();//剪纸
    // this.close();
  // });
});
*/

/*
device.open(function(){
  printer
      // .print('\x1B\x40')//初始化打印机,清除打印缓存
      .font('a')
      //.print('\x1b\x7b\x00') //倒置打印
      .print('\x1b\x45\x01') //加粗
      .print('\x1B\x44\x00')//消除所有的水平制表位置
      // .print('\x1B\x44\x16\x21\x29\x00') //设置水平制表值
      .print('\x1B\x44\x18\x29\x00') //设置水平制表值
      .pureText('菜名').control('HT')
      .pureText('数量').control('HT')
      .pureText('备注')
      .control('LF').control('LF')
      printer.cut();
      printer.close(); */
    /*
      printer.print('\x1D\x21\x11') //2倍大小
      .align('ct')
      .text('一点谱餐饮平台打印测试').text('')
      .print('\x1D\x21\x00')//取消2倍大小
      // .print('\x1b\x45\x00')//取消加粗
      //.print('\x1b\x2d\x01')//下划线
      .font('a')
      .align('lt')
      .pureText('下单时间:').pureText('2019-01-14')
      .control('LF')
      .text('------------------------------------------------')
      // .print('\x1B\x44\x12\x19\x24\x00') //设置水平制表值
      .align('lt')
      .print('\x1b\x45\x01')//加粗
      .pureText('商品名称').control('HT').control('HT')
      .pureText('单价').control('HT')
      .pureText('数量').control('HT')
      .pureText('小计').control('LF')
      .print('\x1b\x45\x00')//取消加粗
      .pureText('剁椒鱼头(微辣)剁椒鱼头(微辣)剁椒鱼头(微辣)剁椒鱼头(微辣)').control('HT').control('HT')
      .pureText('19.08').control('HT')
      .pureText('5').control('HT')
      .pureText('95.40').control('LF')
      .text('------------------------------------------------')
      .align('rt')
      .text('合计5件商品,应支付:￥95.40')
      .control('LF')
      .control('LF')*/
 /* });

*/

var Queue = require('promise-queue-plus');
var q = Queue.Promise; //a Promise utils;
var usbPrintQueue = Queue(1,{
    "retry":0               //Number of retries
    ,"retryIsJump":true     //retry now? 
    ,"timeout":0            //The timeout period
});

//a return promise function
function testfn(i){
  return new Promise(function(resolve,reject){
      setTimeout(function(){
          resolve(i)
      },300)
  })
}

function testfn3(i){
  return new Promise(function(resolve,reject){
      setTimeout(function(){
        reject(i)
      },300)
  })
}


//a return promise function
function testfn2(){
  // var deferred = q.defer();
  return new Promise((resolve,reject) => {
      // const device  = new escpos.USB(1155, 22339);//USB打印机
      const device = new escpos.Network("192.168.0.102", 9100);//网络打印机
      const options = { encoding: "GB18030" /* default */ }
      const printer = new escpos.Printer(device, options);

      /*
      device.open((error) => {
        const a = printer.print('\x10\x04\x03');
        console.log(a);
        printer.close(() => {
          resolve('打印完毕');
        });
      });
      */
      
      escpos.Image.load('https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superlanding/img/logo_top.png', function(image) {
        device.open((error) => {
        if(error) {
          reject(error);
        } else {
          printer
            .print('\x1B\x40')//初始化打印机,清除打印缓存
            .font('a')
            //.print('\x1b\x7b\x00') //倒置打印
            // .print('\x1b\x45\x01') //加粗
            // .print('\x1B\x44\x00')//消除所有的水平制表位置
            // // .print('\x1B\x44\x16\x21\x29\x00') //设置水平制表值
            .print('\x1B\x44\x18\x20\x00') //设置水平制表值
            .pureText('菜名').control('HT')
            .pureText('数量').control('HT')
            .pureText('备注').control('LF')
            .align('ct')
            .raster(image)
            .control('LF').control('LF');
            printer.cut();
            printer.close(() => {
              resolve('打印完毕');
            });
        }
      })
      });
  })
}

var log = function(msg){ console.log(msg); }

usbPrintQueue.push(testfn, [1]) //add job (FIFO)
.then(log); 

usbPrintQueue.push(testfn3, ['eeeoe']) //add job (FIFO)
.then(log).catch(e => {
  console.error(e);
});

usbPrintQueue.push(testfn2) //add job (FIFO)
.then(log); 

// usbPrintQueue.push(testfn2) //add job (FIFO)
// .then(log);

// usbPrintQueue.push(testfn2) //add job (FIFO)
// .then(log); 

usbPrintQueue.push(function(){return 2;}) //The normal function returns a promise according to the Promise / A + rule
.then(log);

usbPrintQueue.push(testfn3,['go']).then(log).catch(e => {
  usbPrintQueue.stop();
  console.error('错误:' + e);
});

usbPrintQueue.unshift(testfn,[0]) //add job (LIFO)
.then(log);



usbPrintQueue.go(function(){return 3;}) //The normal function returns a promise according to the Promise / A + rule
.then(log);