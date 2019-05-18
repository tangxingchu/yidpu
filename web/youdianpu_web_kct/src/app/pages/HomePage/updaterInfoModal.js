import React, { Component } from 'react';

import { Modal, Button } from 'antd';

export default class UpdaterInfoModal extends Component {

	constructor(props) {
        super(props);
	}

	render() {
		const { visible, handleVisible, clientVersion } = this.props;
		return (
			<Modal title={`版本${clientVersion}更新内容`}
				visible={visible}
				onCancel={() => handleVisible(false)}
				centered={true}
				footer={[<Button type={"primary"} key='close' onClick={() => handleVisible(false)}>我知道了</Button>]}
			>
				<div>
                    <p>1、修复部分bug</p>
                    <p>2、会员新增扫码绑定微信或支付宝功能</p>
                </div>
			</Modal>
		)
	}
}