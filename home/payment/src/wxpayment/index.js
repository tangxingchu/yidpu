import React from 'react';
import ReactDOM from 'react-dom';

import Payment from '../payment';
import parseUrl from '../utils';
import services from '../services';

import Config from '../utils/config';

class WXpayment extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			payLoading: false,
			cancelLoading: false,
		}
	}

	componentDidMount() {
		/* wx.ready(function(){
			alert("通过");
		});
		wx.error(function(res){
			alert("失败");
		}); */
		const url = encodeURIComponent(location.href.split('#')[0]);
		fetch(`${Config.apiHost}/api/wxpay/config`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `url=${url}`
		}).then((response) => {
			return response.json();
		}).then((data) => {
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

	pay = (orderNo, merchantProperty) => {
		const params = parseUrl();
		this.setState({payLoading: true});
		fetch(`${Config.apiHost}/api/wxpay/wxpayOrder`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `openid=${params.openid}&merchantId=${params.merchantId}&orderNo=${orderNo}`
		}).then((response) => {
			return response.json();
		}).then((data) => {
			//订单创建失败
			if(data.status && data.status != 200) {
				alert(data.message);
				this.setState({payLoading: false});
			} else {
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
						this.setState({payLoading: false});
						if(merchantProperty == 1) {
							window.history.go(-1);
						} else {
							window.location.href = '/pay/payment-success.html';
						}
					},
					fail: (res) => {
						//支付失败
						this.setState({payLoading: false});
						alert(JSON.stringify(res));
					},
					cancel: (res) => {
						//支付成功
						this.setState({payLoading: false});
					},
				});
			}
		}).catch(err => {
			alert(err.message);
		});
	}

	closeWindow = () => {
		WeixinJSBridge.call('closeWindow');
	}

	goPlaceOrder = (type, merchantProperty) => {
		const params = parseUrl();
		const { merchantId, tableCode, openid } = params;
		window.location.href = `/placeOrder/placeOrder_wx.html?type=${type}&openid=${openid}&merchantId=${merchantId}&tableCode=${tableCode}&merchantProperty=${merchantProperty}`;
	}

	cancelOrder = (orderNo) => {
		const params = parseUrl();
		const { merchantId, openid } = params;
		this.setState({cancelLoading: true});
		return services.cancelOrderByopenid(orderNo, merchantId, openid).then(() => {
			this.setState({cancelLoading: false});
		}).catch(err => {
			this.setState({cancelLoading: false});
		});
	}

	render() {
		const params = parseUrl();
		const { payLoading, cancelLoading } = this.state;
		return (
			<Payment pay={this.pay} closeWindow={this.closeWindow}
				merchantId={params.merchantId}
				tableCode={params.tableCode}
				openid={params.openid}
				payLoading={payLoading}
				primaryColor={"#1AAD19"}
				statusColor={"#87d068"}
				goPlaceOrder={this.goPlaceOrder}
				cancelLoading={cancelLoading}
				cancelOrder={this.cancelOrder}
			/>
		)
	}
}


ReactDOM.render(
    <WXpayment />,
    document.getElementById('root')
);