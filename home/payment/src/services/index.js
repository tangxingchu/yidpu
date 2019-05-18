import Config from '../utils/config';

import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style';

const requestApi = ({ uri, fetchParams, respType = 'json' }) => {
    const _fetchParams = { ...fetchParams };
    if (!_fetchParams.headers) {
        _fetchParams.headers = {};
        _fetchParams.headers['Content-type'] = 'application/json';
    }
    _fetchParams.method = _fetchParams.method || "post";
    if (typeof _fetchParams.body === 'object' && _fetchParams.headers['Content-type'] === 'application/json') {
        _fetchParams.body = JSON.stringify(_fetchParams.body);
    }
    _fetchParams.headers['Authorization'] = window.localStorage.getItem('Authorization')
        // || "Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjAwMiIsImdyYWRlIjo0LCJ1aWQiOjEsInN1YiI6IjE4OTc1MTMwMjMwOnl2aGl3c3NuIiwiZXhwIjoxNTUxMTkxNTI0fQ.dNzckACMztnp4NMzcdib8sd-qaQw99nZrMZ_WDixtYlNq1n4MXua117vJIMhhuHF-kScBr9B8LrSSyV7yusDDA";
    return new Promise((resolve, reject) => {
        fetch(`${Config.apiHost}${uri}`, _fetchParams).then(resp => {
            if (resp.ok) {
                if (respType === 'json') {
                    return resp.json();
                } else if (respType === 'blob') {
                    return resp.blob();
                } else {
                    return resp.text();
                }
            } else {
                return resp.json();
            }
        }).then(data => {
            if (data.status && data.status !== 200) {
                if (data.status == 500) {
                    if (data.exception === "io.jsonwebtoken.ExpiredJwtException") {
                        reject(data);
                    } else {
                        reject(new Error(data.message));
                    }
                } else {
                    reject(new Error(data.message));
                }
            } else {
                resolve(data);
            }
        }).catch(err => {
            reject(new Error("网络异常"));
        });
    });

}

//查询商品分类
const listGoodsCategoryAndGoods = () => {
    Toast.loading("数据请求中...")
    return requestApi({uri: `/api/mobile/listCategoryAndGoods`}).then((data) => {
        Toast.hide();
        return data;
    }).catch(err => {
        Toast.hide();
        alert(err.message);
        throw err;
    });
}

//呼叫服务
const callService = (tableCode) => {
    Toast.loading("呼叫服务请求中...")
    return requestApi({uri: `/api/mobile/callService`, fetchParams: {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `tableCode=${tableCode}`
    }}).then((data) => {
        Toast.hide()
        Toast.success("已呼叫服务");
        return data;
    }).catch(err => {
        Toast.hide()
        alert(`呼叫服务失败,${err.message}`);
        throw err;
    });
}

const submitOrder = (cart) => {
    Toast.loading("用餐订单提交中...", 0);
    return requestApi({uri: `/api/mobile/submit`, fetchParams: {body: cart}}).then((data) => {
        Toast.hide();
        return data.result;
    }).catch(err => {
        Toast.hide()
        alert(`订单提交失败,${err.message}`);
        throw err;
    });
}

const submitByKCT = (cart) => {
    Toast.loading("用餐订单提交中...", 0);
    return requestApi({uri: `/api/mobile/submitByKCT`, fetchParams: {body: cart}}).then((data) => {
        Toast.hide();
        return data.result;
    }).catch(err => {
        Toast.hide()
        alert(`订单提交失败,${err.message}`);
        throw err;
    });
}

const payWechat = (orderNo, openid, merchantId, callback) => {
    Toast.loading("支付请求中...", 0);
    requestApi({uri: `/api/wxpay/wxpayOrder`, fetchParams: {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : `openid=${openid}&merchantId=${merchantId}&orderNo=${orderNo}`
    }}).then((data) => {
        Toast.hide();
        const { timeStamp, nonceStr, signType, paySign } = data;
        const new_package = data.package;
        wx.chooseWXPay({
            timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
            package: new_package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: paySign, // 支付签名
            success: (res) => {
                // 支付成功后的回调函数
                // window.location.href = '/pay/paymentRedirect.html';
                if(callback) {
                    callback();
                }
            },
            fail: (res) => {
                //支付失败
                alert(JSON.stringify(res));
            },
            cancel: (res) => {
                //支付取消
            },
        });
    }).catch(err => {
        Toast.hide();
        alert(err.message);
    });
}

const wxConfig = (url) => {
    requestApi({uri: `/api/wxpay/config`, fetchParams: {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : `url=${url}`
    }}).then((data) => {
        const { debug, appId, timestamp, noncestr, signature } = data;
        wx.config({
            debug: debug == "1" ? true : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: noncestr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        });
    })
}

const payAilipay = (orderNo, buyerId, merchantId, callback) => {
    Toast.loading("支付请求中...", 0);
    requestApi({uri: `/api/alipay/alipayOrder`, fetchParams: {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `buyerId=${buyerId}&merchantId=${merchantId}&orderNo=${orderNo}`
    }}).then(data => {
        Toast.hide();
        //订单创建失败
        if(data.status && data.status != 200) {
            ap.alert(data.message);
        } else {
            //订单创建成功过
            ap.tradePay({
                tradeNO: data.tradeNo
            }, (res) => {
                if(res.resultCode == 9000) {//支付成功
                    callback();
                } else if(res.resultCode == 4000) {
                    ap.alert("订单支付失败");
                } else if(res.resultCode == 6002) {
                    ap.alert("网络出现问题, 订单支付失败");
                } else {
                }
            });
        }
    }).catch(e => {
        Toast.hide();
        ap.alert(e.message)
    });
}

const cancelOrderByopenid = (orderNo, merchantId, openId) => {
    return requestApi({uri: `/api/mobile/cancelOrderByOpenid`,  fetchParams: {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `openid=${openId}&merchantId=${merchantId}&orderNo=${orderNo}`
    }}).then((data) => {
        return data.result;
    }).catch(err => {
        alert(`订单取消失败,${err.message}`);
        throw err;
    });
}

const cancelOrderBybuyerid = (orderNo, merchantId, buyerId) => {
    return requestApi({uri: `/api/mobile/cancelOrderByBuyerid`,  fetchParams: {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `buyerId=${buyerId}&merchantId=${merchantId}&orderNo=${orderNo}`
    }}).then((data) => {
        return data.result;
    }).catch(err => {
        alert(`订单取消失败,${err.message}`);
        throw err;
    });
}

const listCurrentSubtract = (totalPrice) => {
    Toast.loading('数据加载中...', 0);
    return requestApi({uri: `/api/mobile/listCurrentSubtract`,  fetchParams: {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `totalPrice=${totalPrice}`
    }}).then((data) => {
        Toast.hide();
        return data;
    }).catch(err => {
        Toast.hide();
        alert(`加载优惠信息失败,${err.message}`);
        throw err;
    });
}

export default {
    listGoodsCategoryAndGoods,
    callService,
    submitOrder,
    submitByKCT,
    payWechat,
    wxConfig,
    payAilipay,
    cancelOrderByopenid,
    cancelOrderBybuyerid,
    listCurrentSubtract,
}