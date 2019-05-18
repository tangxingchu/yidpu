import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Input, InputNumber, Form, Radio, Select } from 'antd';
import numeral from 'numeral';
export default class RefundModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { visible, handleModalVisible, loading, refundData, confirmRefundOrder, fieldChangeValue, refundAmountReadOnly } = this.props;
        return (
            <WrapperRefundForm
                {...refundData}
                handleModalVisible={handleModalVisible}
                loading={loading}
                visible={visible}
                confirmRefundOrder={confirmRefundOrder}
                fieldChangeValue={fieldChangeValue}
                refundAmountReadOnly={refundAmountReadOnly}
            />
        )
    }

}

class RefundForm extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.confirmRefundOrder();
        });
    }

    render() {
        const { form, loading, visible, handleModalVisible, refundAmountReadOnly, refundAmount, orderPayAmount } = this.props;
        const { getFieldDecorator } = form;
        let refundReasonError = null;
        if (this.props.refundReason.errors) {
            refundReasonError = this.props.refundReason.errors[0].message;
        }
        return (
            <Modal 
                title={"退款操作"}
                visible={visible}
                onCancel={() => handleModalVisible(false)}
                onOk={() => this.onSubmit()}
                confirmLoading={loading}
                okText="确认退款"
                cancelText="取消"
            > 
                <div style={{textAlign: 'center'}}>确认退款金额:￥
                    <span style={{fontSize: 30, fontWeight: 'bold', color: '#ff4242'}}>{numeral(refundAmount.value).format('0,0.00')}</span>
                </div>
                <Form>
                    <Row>
                        <Col span={24}>
                            <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="退款额度">
                                {getFieldDecorator('refundLimit')(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="1">全额退款</Radio.Button>
                                        <Radio.Button value="2">部分退款</Radio.Button>
                                        {
                                            this.props.refundType.value == 2 ? <Radio.Button value="3">用餐订单收银金额退款</Radio.Button> : null
                                        }
                                    </Radio.Group>
                                )}
                            </Form.Item>
                            { this.props.refundType.value == 2 ?
                                <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="退款方式" 
                                    help={"手机支付退款可以选择支付单退款-原路退还顾客"}>
                                    {getFieldDecorator('refundMethod')(
                                        <Select buttonStyle="solid">
                                            <Select.Option value={-1}>桌台扫码支付(支)-退款</Select.Option>
                                            <Select.Option value={-2}>桌台扫码支付(微)-退款</Select.Option>
                                            <Select.Option value={-3}>前台扫码支付(支)-退款</Select.Option>
                                            <Select.Option value={-4}>前台扫码支付(微)-退款</Select.Option>
                                            <Select.Option value={-5}>现金支付-退款</Select.Option>
                                            <Select.Option value={-6}>扫码转账(支)-退款</Select.Option>
                                            <Select.Option value={-7}>扫码转账(微)-退款</Select.Option>
                                            <Select.Option value={-8}>其它-退款</Select.Option>
                                            <Select.Option value={-9}>会员消费-退款</Select.Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            :
                                <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="退款方式" 
                                    help={"手机支付退款可以选择支付单退款-原路退还顾客"}>
                                    {getFieldDecorator('refundMethod')(
                                        <Select buttonStyle="solid">
                                            <Select.Option value={-5}>现金支付-退款</Select.Option>
                                            <Select.Option value={-6}>扫码转账(支)-退款</Select.Option>
                                            <Select.Option value={-7}>扫码转账(微)-退款</Select.Option>
                                            <Select.Option value={-8}>其它-退款</Select.Option>
                                            <Select.Option value={-9}>会员消费-退款</Select.Option>
                                        </Select>
                                )}
                            </Form.Item>
                            }
                            <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="退款金额(￥)">
                                {getFieldDecorator('refundAmount', {
                                    rules: [{required: true, message: '请确认退款金额' }],
                                })(
                                    <InputNumber
                                        readOnly={refundAmountReadOnly}
                                        style={{ width: '100%'}}
                                        min={0.00}
                                        /* max={orderPayAmount.value} */
                                        step={0.01}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="退款原因"
                                help={refundReasonError ? refundReasonError : ''}
                                validateStatus={refundReasonError ? 'error' : ''}
                            >
                                {getFieldDecorator('refundReason', {
                                    rules: [{required: true, message: '请输入退款原因' }],
                                })(
                                    <Input.TextArea
                                        style={{ width: '100%'}}
                                        cols={5}
                                        maxLength={200}
                                        placeholder="请输入退款原因"
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

const WrapperRefundForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            refundLimit: Form.createFormField({
                value: props.refundLimit.value,
            }),
            refundMethod: Form.createFormField({
                value: props.refundMethod.value,
            }),
            refundAmount: Form.createFormField({
                value: props.refundAmount.value,
            }),
            refundReason: Form.createFormField({
                value: props.refundReason.value,
            }),
        }
    }
})(RefundForm);