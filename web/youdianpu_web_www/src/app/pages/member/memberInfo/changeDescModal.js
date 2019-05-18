import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Input, Form } from 'antd';

export default class ChangeDescModal extends Component {

    constructor(props) {
        super(props);
    }

    onChangeDescValueChange = (e) => {
        const { value } = e.target;
        this.props.onChangeDescValueChange(value);
    }

    render() {
        const { visible, handleModalVisible, loading, changeDescValue, handleSubmit } = this.props;
        return (
            <WrapperModifyRemarkForm
                handleModalVisible={handleModalVisible}
                loading={loading}
                visible={visible}
                changeDescValue={changeDescValue}
                onChangeDescValueChange={this.onChangeDescValueChange}
                handleSubmit={handleSubmit}
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
        const { form, loading, visible, changeDescValue, onChangeDescValueChange, handleSubmit } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal 
                title={"原因"}
                visible={visible}
                onCancel={() => this.handleModalVisible(false)}
                onOk={() => handleSubmit()}
                confirmLoading={loading}
                okText="确定"
                cancelText="取消"
            > 
                <Row>
                    <Col span={24}>
                        <Input.TextArea
                            maxLength={500}
                            autoFocus={true}
                            rows={5}
                            placeholder="请输入原因,不超过500字"
                            style={{ width: '100%'}}
                            value={changeDescValue}
                            onChange={onChangeDescValueChange}
                        />
                    </Col>
                </Row>
            </Modal>
        )
    }
}

const WrapperModifyRemarkForm = Form.create()(ModifyRemarkForm);