import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Input, InputNumber, Form, Alert } from 'antd';
import numeral from 'numeral';

export default class ConfirmPWDModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { visible, handleModalVisible, loading, refundOrder, fieldChangeValue, confirmPWDData, resetForm } = this.props;
        return (
            <WrapperConfirmPWDForm
                handleModalVisible={handleModalVisible}
                {...confirmPWDData}
                loading={loading}
                visible={visible}
                refundOrder={refundOrder}
                resetForm={resetForm}
                fieldChangeValue={fieldChangeValue}
            />
        )
    }

}

class ConfirmPWDForm extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.resetForm();
            this.props.refundOrder(values.validationPWD);
        });
    }

    handleModalVisible = () => {
        this.props.resetForm();
        this.props.handleModalVisible(false);
    }

    render() {
        const { form, loading, visible } = this.props;
        const { getFieldDecorator } = form;
        let validationPWDError = null;
        if (this.props.validationPWD.errors) {
            validationPWDError = this.props.validationPWD.errors[0].message;
        }
        return (
            <Modal 
                title={"请输入当前登录账号的登录密码确认退款"}
                visible={visible}
                onCancel={() => this.handleModalVisible(false)}
                onOk={() => this.onSubmit()}
                confirmLoading={loading}
                okText="确认退款"
                cancelText="取消"
            > 
                <Form>
                    <Row>
                        <Col span={24}>
                            {/* <Alert type="info" showIcon message="升级会员等级将享有安全级别更高的短信验证码校验退款。" style={{marginBottom: 8}}/> */}
                            <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="登录密码"
                                help={validationPWDError ? validationPWDError : ''}
                                validateStatus={validationPWDError ? 'error' : ''}
                            >
                                {getFieldDecorator('validationPWD', {
                                    rules: [{required: true, message: '请输入当前登录账号的登录密码' }],
                                })(
                                    <Input                     
                                        autoFocus={true}              
                                        type={"password"}
                                        maxLength={30}
                                        style={{ width: '100%'}}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

const WrapperConfirmPWDForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            validationPWD: Form.createFormField({
                value: props.validationPWD.value,
            }),
        }
    }
})(ConfirmPWDForm);