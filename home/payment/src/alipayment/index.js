import React from 'react';
import ReactDOM from 'react-dom';

import Config from '../utils/config';
import Payment from '../payment'
import services from '../services';

class Alipayment extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			payLoading: false,
			cancelLoading: false,
		}
	}

	pay = (orderNo, merchantProperty) => {
		this.setState({payLoading: true});
		const params = ap.parseQueryString();
		fetch(`${Config.apiHost}/api/alipay/alipayOrder`, {
			method: "POST",
			headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `buyerId=${params.buyerId}&merchantId=${params.merchantId}&orderNo=${orderNo}`
		}).then(response => {
			return response.json();
		}).then(data => {
			//订单创建失败
			if(data.status && data.status != 200) {
				ap.alert(data.message);
				this.setState({payLoading: false});
			} else {
				//订单创建成功过
				ap.tradePay({
					tradeNO: data.tradeNo
				}, (res) => {
					if(res.resultCode == 9000) {//支付成功
						if(merchantProperty == 1) {
							window.history.go(-1);
						} else {
							ap.redirectTo({url: '/pay/payment-success.html'});
						}
					} else if(res.resultCode == 4000) {
						ap.alert("订单支付失败");
						this.setState({payLoading: false});
					} else if(res.resultCode == 6002) {
						ap.alert("网络出现问题, 订单支付失败");
						this.setState({payLoading: false});
					} else {
						this.setState({payLoading: false});
					}
				});
			}
		}).catch(e => {
			ap.alert(e.message)
		});
	}

	closeWindow = () => {
		AlipayJSBridge.call('closeWebview');
	}

	goPlaceOrder = (type, merchantProperty) => {
		const params = ap.parseQueryString();
		const { merchantId, tableCode, buyerId } = params;
		ap.redirectTo({url: `/placeOrder/placeOrder_alipay.html?type=${type}&buyerId=${buyerId}&merchantId=${merchantId}&tableCode=${tableCode}&merchantProperty=${merchantProperty}`});
	}

	cancelOrder = (orderNo) => {
		const params = ap.parseQueryString();
		const { merchantId, buyerId } = params;
		this.setState({cancelLoading: true});
		return services.cancelOrderBybuyerid(orderNo, merchantId, buyerId).then(() => {
			this.setState({cancelLoading: false});
		}).catch(err => {
			this.setState({cancelLoading: false});
		});
	}

	render() {
		const params = ap.parseQueryString();
		const { payLoading, cancelLoading } = this.state;
		return (
			<Payment pay={this.pay} closeWindow={this.closeWindow}
				merchantId={params.merchantId}
				tableCode={params.tableCode}
				buyerId={params.buyerId}
				goPlaceOrder={this.goPlaceOrder}
				payLoading={payLoading}
				cancelOrder={this.cancelOrder}
				cancelLoading={cancelLoading}
				primaryColor={"#108ee9"}
				statusColor={"#87d068"}
			/>
		)
	}
}


ReactDOM.render(
    <Alipayment />,
    document.getElementById('root')
);