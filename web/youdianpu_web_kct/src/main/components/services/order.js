const { apiHost } = require('./apihost');
const fetch = require("node-fetch");

const listNoCompleteOrder = (token) => {
    const body = JSON.stringify({});
    const headers = { 'Content-type': "application/json", "Authorization": token };    
    return fetch(`${apiHost}/api/order/listNoCompleteOrder`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    });
}

//查询打印收银小票信息
const listPrintCashier = (orderNos, token) => {
    const body = `orderNos=${orderNos}`;
    const headers = { 'Content-type': "application/x-www-form-urlencoded", "Authorization": token };    
    return fetch(`${apiHost}/api/order/selectPrinterOrder`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    });
}

//查询订单后厨打印(快餐厅顾客扫码点餐支付完成之后自动打印)
const selectOrderByOrderNo = (orderNo, token) => {
    const body = `orderNo=${orderNo}`;
    const headers = { 'Content-type': "application/x-www-form-urlencoded", "Authorization": token };    
    return fetch(`${apiHost}/api/order/selectOrderByOrderNo`, { method: 'POST', body, headers }).then(res => {
        return res.json();
    });
}

module.exports = {
    listNoCompleteOrder,
    listPrintCashier,
    selectOrderByOrderNo,
}