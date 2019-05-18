import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Input, InputNumber, Form, Button, Alert } from 'antd';
import numeral from 'numeral';

export default class ConfirmSMSCodeModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { visible, handleModalVisible, loading, refundOrder, fieldChangeValue, confirmPWDData, resetForm, phoneCodeLoading, 
            countDown, generatePhoneCode } = this.props;
        return (
            <WrapperConfirmSMSForm
                handleModalVisible={handleModalVisible}
                {...confirmPWDData}
                loading={loading}
                visible={visible}
                refundOrder={refundOrder}
                resetForm={resetForm}
                fieldChangeValue={fieldChangeValue}
                phoneCodeLoading={phoneCodeLoading}
                countDown={countDown}
                generatePhoneCode={generatePhoneCode}
            />
        )
    }

}

class ConfirmSMSForm extends Component {
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
        const { form, loading, visible, phoneCodeLoading, countDown } = this.props;
        const { getFieldDecorator } = form;
        let validationPWDError = null;
        if (this.props.validationPWD.errors) {
            validationPWDError = this.props.validationPWD.errors[0].message;
        }
        return (
            <Modal 
                title={"请输入主账号对应手机号码收到的短信验证码确认退款"}
                visible={visible}
                onCancel={() => this.handleModalVisible(false)}
                onOk={() => this.onSubmit()}
                confirmLoading={loading}
                okText="确认退款"
                cancelText="取消"
            > 
                <Form>
                    <Alert message="鉴于资金安全考虑,退款短信验证码只会发送至主账号的手机号码上,如果您是子账号,请联系主账号获取短信验证码。验证码5分钟内有效。" type="info" showIcon/>
                    <Row>
                        <Col span={24}>
                            <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="短信验证码"
                                help={validationPWDError ? validationPWDError : ''}
                                validateStatus={validationPWDError ? 'error' : ''}
                            >
                                {getFieldDecorator('validationPWD', {
                                    rules: [{required: true, message: '请输入当前登录账号对应手机号码收到的短信验证码' }],
                                })(
                                    <Input                     
                                        autoFocus={true}              
                                        type={"password"}
                                        maxLength={30}
                                        style={{ width: '100%'}}
                                    />

                                )}
                                <Button type={"primary"} loading={phoneCodeLoading} disabled={countDown > 0} 
                                    onClick={() => this.props.generatePhoneCode()}>
                                        { countDown > 0 ? `${countDown}S后重新获取验证码` :  `获取短信验证码`}
                                </Button>
                            </Form.Item>
                            
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

const WrapperConfirmSMSForm = Form.create({
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
})(ConfirmSMSForm);