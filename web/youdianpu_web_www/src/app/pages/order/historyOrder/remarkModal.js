import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Input, Form } from 'antd';
import numeral from 'numeral';

export default class RemarkModal extends Component {

    constructor(props) {
        super(props);
    }

    onRemarkChange = (e) => {
        const { value } = e.target;
        this.props.onRemarkChange(value);
    }

    render() {
        const { visible, handleModalVisible, loading, remarkValue, modifyOrderRemark } = this.props;
        return (
            <WrapperModifyRemarkForm
                handleModalVisible={handleModalVisible}
                loading={loading}
                visible={visible}
                remarkValue={remarkValue}
                onRemarkChange={this.onRemarkChange}
                modifyOrderRemark={modifyOrderRemark}
            />
        )
    }

}

class ModifyRemarkForm extends Component {
    constructor(props) {
        super(props);
    }
    handleModalVisible = () => {
        this.props.handleModalVisible(false);
    }

    render() {
        const { form, loading, visible, remarkValue, onRemarkChange, modifyOrderRemark } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal 
                title={"订单备注"}
                visible={visible}
                onCancel={() => this.handleModalVisible(false)}
                onOk={() => modifyOrderRemark()}
                confirmLoading={loading}
                okText="保存"
                cancelText="取消"
            > 
                <Row>
                    <Col span={24}>
                        <Input.TextArea                     
                            maxLength={200}
                            autoFocus={true}
                            rows={5}
                            placeholder="请输入订单备注,不能超过200字"
                            style={{ width: '100%'}}
                            value={remarkValue}
                            onChange={onRemarkChange}
                        />
                    </Col>
                </Row>
            </Modal>
        )
    }
}

const WrapperModifyRemarkForm = Form.create()(ModifyRemarkForm);