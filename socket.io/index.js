require('url-search-params-polyfill');
const http = require('http');
const _ = require('underscore');
const fetch = require('node-fetch');
const Base64 = require('js-base64').Base64;

const argv = require('argv');
const args = argv.option({
    name: 'apihost',
    short: 'h',
    type: 'string',
    description: 'Defines an option for your script',
    example: "'script --apihost=value' or 'script -h value'"
}).run();

const hashUID = new Object();

const initSocketIo = (port, callback) => {
	const server = http.createServer();
	const io = require('socket.io')(server, {
		path: '/',
		serveClient: false,
		// below are engine.IO options
		pingInterval: 30000,
		pingTimeout: 5000,
		cookie: false,
	});
	server.listen(port);
	io.use((socket, next) => {
		const token = socket.handshake.query.token;
		if(token === "yidpu9527@163.com") {
			return next();
		} else {
			validateToken(token).then((data) => {
				if(data.result) {
					return next();
				} else {
					return next(new Error("Authentication error"));	
				}
			});
		}
	});
	io.sockets.on('connection', (socket) => {
		const token = socket.handshake.query.token;
		if(token === "yidpu9527@163.com") {
			console.log('java端的客户端来了.');
		} else {
			const payload = JSON.parse(Base64.decode(token.split(".")[1]));
			socket.join(payload.uid);
			//hashUID[payload.uid] = socket.id;
			console.log('客户端socket.id:' + socket.id + '链接成功', 'uid:' + payload.uid);
			//营业状态改为营业中
			updateOperatingStatus(token, 1);
		}
		//扫码点餐提交订单(顾客下单消息)
		socket.on('customerPlaceOrder', (jsonData) => {
			const { mid, orderNo, tableCode, isAppend } = jsonData;
			/*
			const toSocket = _.findWhere(io.sockets.sockets, {id: hashUID[mid]});
			if(toSocket != null) {
				toSocket.emit('customerPlaceOrderMSG', {orderNo, tableCode});
			}*/
			io.sockets.in(mid).emit('customerPlaceOrderMSG', {orderNo, tableCode, isAppend});
		});
		//呼叫服务
		socket.on('callService', (jsonData) => {
			const { mid, tableCode } = jsonData;
			/*
			const toSocket = _.findWhere(io.sockets.sockets, {id: hashUID[mid]});
			if(toSocket != null) {
				toSocket.emit('callServiceMSG', {tableCode});
			}
			*/
			io.sockets.in(mid).emit('callServiceMSG', {tableCode});
		});
		//餐桌扫码支付成功
		socket.on('callPaymentFinished', (jsonData) => {
			const { mid, tableCodes, payAmount, orderNos } = jsonData;
			/*
			const toSocket = _.findWhere(io.sockets.sockets, {id: hashUID[mid]});
			if(toSocket != null) {
				toSocket.emit('callPaymentFinishedMSG', {tableCode, payAmount});
			}
			*/
			io.sockets.in(mid).emit('callPaymentFinishedMSG', {tableCodes, payAmount, orderNos});
		});
		//前台扫码支付成功消息
		socket.on('callFrontPaymentFinished', (jsonData) => {
			const { mid, payAmount } = jsonData;
			/*
			const toSocket = _.findWhere(io.sockets.sockets, {id: hashUID[mid]});
			if(toSocket != null) {
				toSocket.emit('callFrontPaymentFinishedMSG', {payAmount});
			}*/
			io.sockets.in(mid).emit('callFrontPaymentFinishedMSG', {payAmount});
		});
		//餐桌扫支付异常(实际支付金额 小于 订单金额)
		socket.on('callPaymentException', (jsonData) => {
			const { mid, tableCode, payAmount, orderAmount } = jsonData;
			/*
			const toSocket = _.findWhere(io.sockets.sockets, {id: hashUID[mid]});
			if(toSocket != null) {
				toSocket.emit('callPaymentExceptionMSG', {tableCode, payAmount, orderAmount});
			}
			*/
			io.sockets.in(mid).emit('callPaymentExceptionMSG', {tableCode, payAmount, orderAmount});
		});
		//订单确认
		socket.on('callConfirmOrder', (jsonData) => {
			const { mid, tableCode, username } = jsonData;
			io.sockets.in(mid).emit('callConfirmOrderMSG', {tableCode, username});
		});
		//会员绑定支付宝或者微信
		socket.on('callMemberBind', (jsonData) => {
			const { mid, bindType, code } = jsonData;
			io.sockets.in(mid).emit('callMemberBindMSG', {bindType, code});
		});
		//console.log(JSON.stringify(hashUID));
		//查询socket
		//const toSocket = _.findWhere(io.sockets.sockets, {id: hashUID[1]});
		//console.log(toSocket.id);
		//客户端断开连接
		socket.on('disconnect', (reason) => {
			if(token === "yidpu9527@163.com") {
				console.log('java客户端断开连接');
			} else {
				console.log(socket.id + '断开连接');
				//营业状态改为歇业中
				updateOperatingStatus(token, 0);
			}
		});
	});
	callback("1888服务已启动。");
}

/**校验token，认证通过才能连上服务**/
const validateToken = (token) => {
	const params = new URLSearchParams();
	params.append('token', token);
	const url = `${args.options.apihost}/api/validateToken`;
	return fetch(url, { method: 'POST', body: params })
		.then(res => res.json());
}

/**修改营业状态**/
const updateOperatingStatus = (token, operatingStatus) => {
	const params = new URLSearchParams();
	params.append('operatingStatus', operatingStatus);
	const url = `${args.options.apihost}/api/merchant/updateOperatingStatus`;
	fetch(url, {headers: {'Authorization': token}, method: 'POST', body: params });
}

initSocketIo(1888, (msg) => {
	console.log(msg);
});

//防止出现异常，进程就终止
// process.on('uncaughtException', function (err) {
//     console.log('Caught exception: ' + err);
// });