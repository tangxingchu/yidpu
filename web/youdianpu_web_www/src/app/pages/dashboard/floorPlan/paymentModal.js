import React, { Component, Fragment } from 'react';
import { Modal, Select, Alert, Input, Form } from 'antd';

class PaymentModal extends Component {

    constructor(props) {
        super(props);
    }

    onChange = (value) => {
        if(value == 0) {
            this.props.handleModalVisible(false);
            this.props.handlePayOrderModalVisible(true);
            this.props.loadPayOrder();
        }
    }

    onOk = () => {
        // if(selectValue == "0") {
        //     this.props.handleModalVisible(false);
        //     this.props.loadPayOrder();
        // } else {
            
            // this.props.orderGathering(selectValue, remark);
        // }        
        this.props.form.validateFields((err, values) => {
            this.props.orderGathering(values.payMethod, values.remark);
        });
    }

    render() {
        const { visible, handleModalVisible, gatheringLoading, receivedAmount } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 4 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 20 },
              sm: { span: 20 },
            },
        };
        return (
            <Modal 
                title={"收银操作"}
                visible={visible}
                onCancel={() => handleModalVisible(false)}
                onOk={() => this.onOk()}
                confirmLoading={gatheringLoading}
                okText="确认收银"
                cancelText="取消收银"
            >   
                <Alert message={"顾客桌台扫码支付无需收银操作,系统会自动收银.前台扫码支付需要您在确认收银时将前台扫码支付单关联用餐订单"} type={"info"} showIcon />
                <div style={{textAlign: 'center'}}>确认收银金额:￥
                    <span style={{fontSize: 30, fontWeight: 'bold',}}>{receivedAmount}</span>
                </div>
                <Form>
                    <Form.Item {...formItemLayout} label="支付方式">
                        {getFieldDecorator('payMethod')(
                            <Select
                                showArrow={true}
                                style={{ width: '100%'}}
                                placeholder="请选择支付方式"
                                onChange={this.onChange}
                            >
                                <Select.Option key={0} value={0}>前台扫码支付</Select.Option>
                                <Select.Option key={5} value={5}>现金支付</Select.Option>
                                <Select.Option key={6} value={6}>扫码转账(支)</Select.Option>
                                <Select.Option key={7} value={7}>扫码转账(微)</Select.Option>
                                <Select.Option key={8} value={8}>其他</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('remark')(
                            <Input.TextArea
                                style={{ width: '100%', marginTop: 8}}
                                placeholder={"备注说明,最多200字"}
                                maxLength={200}
                                rows={5}
                            >
                            </Input.TextArea>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

const PaymentModalWrapper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            payMethod: Form.createFormField({
                value: props.payMethod.value,
            }),
            remark: Form.createFormField({
                value: props.remark.value,
            }),
        }
    }
})(PaymentModal);

export default PaymentModalWrapper;