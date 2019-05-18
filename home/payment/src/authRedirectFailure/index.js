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

import parseUrl from '../utils';

class AuthRedirect extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			errorMsg: null,
		}
	}

	componentDidMount() {
		const params = parseUrl();
		if(params && params.errorCode) {
			this.setState({errorMsg: "您已授权, 如果需要更改收款账户，请发起更改收款账户流程。"})
		}
	}

	closeWin = () => {
		AlipayJSBridge.call('closeWebview');
	}

	render() {
		const {errorMsg = "请关闭页面尝试重新扫码"} = this.state;
		return (
			<Flex className={styles.authResult}>
				<WhiteSpace/>
				<WingBlank>
					<Result
						img={<Icon type="cross-circle-o" className={styles.spe} style={{ fill: '#F13642' }} />}
						title="授权失败"
						message={errorMsg}
					/>
				</WingBlank>
				<WhiteSpace/>
				<WingBlank>
					<Button onClick={() => {this.closeWin()}}>关闭</Button>
				</WingBlank>
			</Flex>
		);
	}
}


ReactDOM.render(
    <AuthRedirect />,
    document.getElementById('root')
);