import React, { Component } from 'react';

import { Modal, Button, Row, Col } from 'antd';
import qq from '../../common/qq.png'

export default class OnlineService extends Component {

	constructor(props) {
        super(props);
        
	}

	render() {
		const { visible, hide, openQQ } = this.props;
		return (
			<Modal title={"在线技术客服"}
				visible={visible}
				onCancel={hide}
				centered={true}
				footer={[<Button key='close' onClick={hide}>关闭</Button>]}
			>
				<Row>
					<Col span={12} style={{textAlign: 'center'}}>
						<p>QQ</p>
						<p><a href="javascript:void(0)" onClick={() => {openQQ(51697550)}}>
							<img src={qq} style={{width: 24, height: 29}}/>联系技术客服1</a>
						</p>
						<p><a href="javascript:void(0)"onClick={() => {openQQ(413697012)}}>
							<img src={qq} style={{width: 24, height: 29}}/>联系技术客服2</a>
						</p>
					</Col>
					<Col span={12} style={{textAlign: 'center'}}>
						<p>扫一扫加微信好友(技术支持)</p>
						<img src={'https://www.yidpu.com/assets/images/suspension/side_ewm.jpg'} style={{width: 128, height: 128}}/>
					</Col>
				</Row>
			</Modal>
		)
	}
}