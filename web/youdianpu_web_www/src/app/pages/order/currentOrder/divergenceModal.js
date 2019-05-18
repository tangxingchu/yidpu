import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Input, Form, Alert, Select, InputNumber } from 'antd';

import numeral from 'numeral';

export default class DivergenceModal extends Component {

    constructor(props) {
        super(props);
    }

    onRemarkChange = (e) => {
        const { value } = e.target;
        this.props.onRemarkChange(value);
    }

    onPayMethodChange = (value) => {
        if(value == 0) {
            this.props.handlePayOrderModalVisible(true);
        }
    }

    render() {
        const { visible, handleModalVisible, loading, fieldChangeValue, divergenceFormData, currOrderData } = this.props;
        return (
            <WrapperDivergenceModalForm
                handleModalVisible={handleModalVisible}
                loading={loading}
                visible={visible}
                fieldChangeValue={fieldChangeValue}
                {...divergenceFormData}
                currOrderData={currOrderData}
                onPayMethodChange={this.onPayMethodChange}
            />
        )
    }

}

class DivergenceModalForm extends Component {
    constructor(props) {
        super(props);
    }
    handleModalVisible = () => {
        this.props.handleModalVisible(false);
    }

    render() {
        const { form, loading, visible, modifyOrderRemark, currOrderData, onPayMethodChange } = this.props;
        const { getFieldDecorator } = form;
        let payMethodError = null;
        if (this.props.payMethod.errors) {
            payMethodError = this.props.payMethod.errors[0].message;
        }
        return (
            <Modal 
                title={"处理分歧订单"}
                visible={visible}
                width={600}
                onCancel={() => this.handleModalVisible(false)}
                onOk={() => modifyOrderRemark()}
                confirmLoading={loading}
                okText="确认处理并完成订单"
                cancelText="取消"
            > 
                <Fragment>
                    <Alert message={`注意:此功能是顾客餐桌扫码支付时支付的金额≠订单金额,需要顾客补差价。与顾客协商好之后再使用此功能完成订单。`} 
                        type="warning"
                        style={{marginBottom: 8}}
                        showIcon
                    />
                    {
                        currOrderData ? 
                        <Row>
                            <Col span={24}>
                                <div>订单总金额￥{numeral(currOrderData.totalPrice).format('0,0.00')}。顾客已通过【{currOrderData.payMethodName}】支付了
                                    ￥<span style={{color: '#87d068'}}>{numeral(currOrderData.payPrice).format("0,0.00")}</span>。
                                    还需支付￥<span style={{color: '#ff4242'}}>{numeral(currOrderData.totalPrice - currOrderData.payPrice).format("0,0.00")}</span>
                                </div>
                            </Col>
                        </Row>
                        : null
                    }
                    <Form >
                        <Row>
                            <Col span={24}>
                                <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="补差价方式"
                                    help={payMethodError ? payMethodError : ''}
                                    validateStatus={payMethodError ? 'error' : ''}
                                >
                                    {getFieldDecorator('payMethod')(
                                        <Select
                                            showArrow={true}
                                            style={{ width: '100%'}}
                                            placeholder="请选择补差价方式"
                                            onChange={onPayMethodChange}
                                        >
                                            <Select.Option key={0} value={0}>前台扫码支付</Select.Option>
                                            <Select.Option key={5} value={5}>现金支付</Select.Option>
                                            <Select.Option key={6} value={6}>扫码转账(支)</Select.Option>
                                            <Select.Option key={7} value={7}>扫码转账(微)</Select.Option>
                                            <Select.Option key={8} value={8}>其他</Select.Option>
                                        </Select>

                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="补差价金额">
                                    {getFieldDecorator('divergencePrice')(
                                        <InputNumber                    
                                            min={0}
                                            step={0.01}
                                            style={{ width: '100%'}}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="备注">
                                    {getFieldDecorator('remark')(
                                        <Input.TextArea                     
                                            maxLength={200}
                                            autoFocus={true}
                                            rows={5}
                                            placeholder="请输入订单备注,不能超过200字"
                                            style={{ width: '100%'}}
                                        />
                                    )}
                                </Form.Item>
                                
                            </Col>
                        </Row>
                    </Form>
                </Fragment>
            </Modal>
        )
    }
}

const WrapperDivergenceModalForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            payMethod: Form.createFormField({
                value: props.payMethod.value,
            }),
            divergencePrice: Form.createFormField({
                value: props.divergencePrice.value,
            }),
            remark: Form.createFormField({
                value: props.remark.value,
            }),
        }
    }
})(DivergenceModalForm);