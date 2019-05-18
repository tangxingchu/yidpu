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

class AuthRedirect extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	closeWin = () => {
		AlipayJSBridge.call('closeWebview');
	}

	render() {
		return (
			<Flex className={styles.authResult}>
				<WhiteSpace/>
				<WingBlank>
					<Result
						img={<Icon type="check-circle" className={styles.spe} style={{ fill: '#09BB07' }} />}
						title="授权成功"
					/>
				</WingBlank>
				<WhiteSpace/>
				<WingBlank>
					<Button type={"primary"} onClick={() => {this.closeWin()}}>我知道了</Button>
				</WingBlank>
			</Flex>
		);
	}
}


ReactDOM.render(
    <AuthRedirect />,
    document.getElementById('root')
);