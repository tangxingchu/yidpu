
var net = require('net');

//获取本机IP
const getIPAdress = function () {
    const interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

// 检测port是否被占用
const probe = function (port, callback) {

    // 创建服务并监听该端口
    var server = net.createServer().listen(port)

    server.on('listening', function () { // 执行这块代码说明端口未被占用
        server.close() // 关闭服务
        console.log('The port【' + port + '】 is available.') // 控制台输出信息
        callback(false);
    })

    server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') { // 端口已经被使用
            console.log('The port【' + port + '】 is occupied, please change other port.')
        }
        callback(true);//已被占用
    })
}

const toNum = (a) => {
    var a = a.toString();
    //也可以这样写 var c=a.split(/\./);
    var c = a.split('.');
    var num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
    for (var i = 0; i < c.length; i++) {
        var len = c[i].length;
        c[i] = r[len] + c[i];
    }
    var res = c.join('');
    return res;
}

const cpr_version = (a, b) => {
    var _a = toNum(a), _b = toNum(b);
    if (_a == _b) {
        return 0;
    } else if (_a > _b) {
        return 1;
    } else {
        return -1;
    }
};

module.exports = {
    getIPAdress,
    probe,
    cpr_version,
}