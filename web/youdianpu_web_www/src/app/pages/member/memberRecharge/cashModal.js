import React, { Component, Fragment } from 'react';
import { Modal, Button, Form, Popconfirm, Input, InputNumber, Radio } from 'antd';
import numeral from 'numeral';

class CashModal extends Component {

    constructor(props) {
        super(props)
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSubmit();
        });
    }

    onRechargeMethodChange = (value) => {
        if(value == "2") {
            this.props.handlePayOrderModalVisible(true);
        }
        this.props.resetMemberRechargeFormFields();
    }

    render() {
        const { visible, confirmLoading, handleModalVisible, handleSubmit, rechargeRuleLoading, selectByRechargePrice } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 15 },
              sm: { span: 15 },
            },
        };
        return (
            <Modal
                visible={visible}
                title="会员充值"
                width={640}
                onCancel={() => handleModalVisible(false)}
                okText="确定充值"
                footer={[
                    <Button key="cancel" onClick={() => handleModalVisible(false)}>取消充值</Button>,
                    <Popconfirm key="ok" title="确定充值吗?" onConfirm={() => this.handleSubmit()}>
                        <Button type={"primary"} loading={confirmLoading}>确定充值</Button>
                    </Popconfirm>
                ]}
                cancelText="取消充值"
                confirmLoading={confirmLoading}
                onOk={() => this.handleSubmit()}
            >
                <Form>
                    <Form.Item {...formItemLayout} label="充值方式">
                        {getFieldDecorator('rechargeMethod')(
                            <Radio.Group buttonStyle="solid" onChange={(e) => this.onRechargeMethodChange(e.target.value)}>
                                <Radio.Button value="5">现金充值</Radio.Button>
                                <Radio.Button value="2">手机支付充值</Radio.Button>
                                <Radio.Button value="6">扫码转账(支)</Radio.Button>
                                <Radio.Button value="7">扫码转账(微)</Radio.Button>
                                <Radio.Button value="8">其它</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="充值金额">
                        {getFieldDecorator('rechargeAmount', {
                            rules: [{ required: true, message: '请输入充值金额',}],
                        })(
                            <InputNumber placeholder={"充值金额"} style={{width: '100%'}} min={0} step={1} 
                                disabled={confirmLoading}
                            />
                        )}
                        <Button loading={rechargeRuleLoading} onClick={() => selectByRechargePrice()}>加载活动赠送金额</Button>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="赠送金额">
                        {getFieldDecorator('givePrice')(
                            <Input placeholder={"赠送金额"} readOnly />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="到账金额">
                        {getFieldDecorator('totalPrice')(
                            <Input placeholder={"到账金额"} readOnly/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

const CashModalWrapper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            rechargeMethod: Form.createFormField({
                value: props.rechargeMethod.value,
            }),
            rechargeAmount: Form.createFormField({
                value: props.rechargeAmount.value,
            }),
            givePrice: Form.createFormField({
                value: props.givePrice.value,
            }),
            totalPrice: Form.createFormField({
                value: props.totalPrice.value,
            }),
        }
    }
})(CashModal);

export default CashModalWrapper;