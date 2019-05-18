import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import MemberDetailForm from '../memberInfo/memberDetailForm';

export default class MemberDetailModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { visible, handleModalVisible, memberDetailData, loading } = this.props;
        return (
            <Modal
                title={"会员详细信息"}
                visible={visible}
                width={800}
                onCancel={() => this.handleModalVisible(false)}
                onOk={() => handleModalVisible(false)}
                footer={[
                    <Button key={"close"} onClick={() => handleModalVisible(false)}>关闭</Button>
                ]}
                okText="确定"
                cancelText="取消"
            > 
                <MemberDetailForm
                    {...memberDetailData}
                    detailLoading={loading}
                />
            </Modal>
        )
    }

}