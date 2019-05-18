import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Input, Form } from 'antd';
import numeral from 'numeral';

export default class RemarkModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            remarkValue: '',
        }
    }

    onRemarkChange = (e) => {
        const { value } = e.target;
        this.setState({ remarkValue: value });
    }

    render() {
        const { remarkValue } = this.state;
        const { visible, handleModalVisible, loading, relateFrontOrder } = this.props;
        return (
            <WrapperModifyRemarkForm
                handleModalVisible={handleModalVisible}
                loading={loading}
                visible={visible}
                remarkValue={remarkValue}
                onRemarkChange={this.onRemarkChange}
                relateFrontOrder={relateFrontOrder}
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
        const { form, loading, visible, onRemarkChange, remarkValue, relateFrontOrder } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal 
                title={"收银备注说明"}
                visible={visible}
                mask={false}
                onCancel={() => this.handleModalVisible()}
                onOk={() => relateFrontOrder(null, remarkValue)}
                confirmLoading={loading}
                okText="确认关联已勾选单收银"
                cancelText="取消"
            > 
                <Row>
                    <Col span={24}>
                        <Input.TextArea            
                            maxLength={200}
                            autoFocus={true}
                            rows={5}
                            placeholder="请输入收银备注说明,不能超过200字"
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