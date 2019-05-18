import React from 'react';
import ReactDOM from 'react-dom';

import Button from 'antd-mobile/lib/button';
import Result from 'antd-mobile/lib/result';
import WhiteSpace from 'antd-mobile/lib/white-space';
import WingBlank from 'antd-mobile/lib/wing-blank'
import Icon from 'antd-mobile/lib/icon';
import Flex from 'antd-mobile/lib/flex';
import 'antd-mobile/lib/button/style'; //less
import 'antd-mobile/lib/result/style'; //less
import 'antd-mobile/lib/white-space/style'; //less
import 'antd-mobile/lib/wing-blank/style'; //less
import 'antd-mobile/lib/icon/style'; //less
import styles from './index.less';

class PayMentSuccess extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			primaryColor: '#108ee9',
		}
	}

	componentDidMount() {
		var ua = navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			this.setState({primaryColor: '#1AAD19'});
		} else if (ua.match(/AlipayClient/i) == 'alipayclient')  {
			this.setState({primaryColor: '#108ee9'});
		} else if(ua.indexOf("baidu") != -1) {
			//百度钱包
		}
	}

	closeWin = () => {
		var ua = navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			//微信客户端
			WeixinJSBridge.call('closeWindow');
		} else if (ua.match(/AlipayClient/i) == 'alipayclient')  {
			AlipayJSBridge.call('closeWebview');
		} else if(ua.indexOf("baidu") != -1) {
			//百度钱包
		}
	}

	render() {
		const { primaryColor } = this.state;
		return (
			<Flex className={styles.authResult}>
				<WhiteSpace/>
				<WingBlank>
					<Result
						img={<Icon type="check-circle" className={styles.spe} style={{ fill: '#09BB07' }} />}
						title="支付成功"
					/>
				</WingBlank>
				<WhiteSpace/>
				<WingBlank>
					<Button type={"primary"} style={{backgroundColor: primaryColor}} onClick={() => {this.closeWin()}}>朕知道了</Button>
				</WingBlank>
			</Flex>
		);
	}
}


ReactDOM.render(
    <PayMentSuccess />,
    document.getElementById('root')
);