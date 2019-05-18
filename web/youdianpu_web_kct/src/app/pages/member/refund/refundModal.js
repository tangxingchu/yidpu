import React, { Component, Fragment } from 'react';
import { Modal, Button, Form, Popconfirm, InputNumber, Alert, Radio } from 'antd';

class RefundModal extends Component {

    constructor(props) {
        super(props)
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSubmit(values);
        });
    }
    render() {
        const { visible, confirmLoading, handleModalVisible, handleSubmit, } = this.props;
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
                title="会员退款-现金"
                width={640}
                onCancel={() => handleModalVisible(false)}
                okText="确定退款"
                footer={[
                    <Button key="cancel" onClick={() => handleModalVisible(false)}>取消退款</Button>,
                    <Popconfirm key="ok" title="退款之后会员账户余额会清零,确定退款吗?" onConfirm={() => this.handleSubmit()}>
                        <Button type={"primary"} loading={confirmLoading}>确定退款</Button>
                    </Popconfirm>
                ]}
                cancelText="取消退款"
                confirmLoading={confirmLoading}
                onOk={() => this.handleSubmit()}
            >
                <Alert message="只支持全额退款,请与会员顾客协商退款金额,退款之后账户余额清零。" type="warning" showIcon style={{marginBottom: 8}}/>
                <Form>
                    <Form.Item {...formItemLayout} label="退款方式">
                        {getFieldDecorator('refundMethod', {
                            initialValue: "-5",
                        })(
                            <Radio.Group buttonStyle="solid" >
                                <Radio.Button value="-5">现金退款</Radio.Button>
                                <Radio.Button value="-6">扫码转账(支)</Radio.Button>
                                <Radio.Button value="-7">扫码转账(微)</Radio.Button>
                                <Radio.Button value="-8">其它</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="退款金额">
                        {getFieldDecorator('refundAmount', {
                            rules: [{ required: true, message: '请输入退款金额',}],
                            initialValue: 0,
                        })(
                            <InputNumber placeholder={"退款金额"} style={{width: '100%'}} min={0} step={1} 
                                disabled={confirmLoading}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

const RefundModalWrapper = Form.create()(RefundModal);

export default RefundModalWrapper;