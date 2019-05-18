import React, { Component, Fragment } from 'react';
import { Row, Col, Form, Button, Input , Select, Modal } from 'antd';

class BindFormModal extends Component {

    constructor(props) {
        super(props)
    }

    resetForm = () => {
        this.props.resetFields();
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSubmit(values);
        });
    }

    unbind = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.unbind(values);
        });
    }

    render() {
        const { form, loading, visible, handleModalVisible, hideUnbindBtn, unbindLoading } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 18 },
              sm: { span: 18 },
            },
        };
        return (
            <Modal 
                title={"等待顾客扫码"}
                visible={visible}
                onCancel={() => handleModalVisible(false)}
                onOk={() => handleSubmit()}
                confirmLoading={loading}
                okText="确定绑定"
                cancelText="关闭"
                footer={[
                    <Button key="close" onClick={() => handleModalVisible(false)}>关闭</Button>,
                    <Button key="unbind" loading={unbindLoading} style={{display: hideUnbindBtn ? 'none' : ''}} onClick={() => this.unbind()}>解除绑定</Button>,
                    <Button type="primary" loading={loading} key="bind" onClick={() => this.handleSubmit()}>确定绑定</Button>,
                ]}
            > 
                <Form >
                    <Form.Item {...formItemLayout} label="手机号码" style={{display: 'none'}}
                    >
                        {getFieldDecorator('id')(
                            <Input placeholder="会员id" readOnly maxLength={20}/>
                        )}
                    </Form.Item>
                    <Row>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label="手机号码"
                            >
                                {getFieldDecorator('phone')(
                                    <Input placeholder="会员手机号码" readOnly maxLength={20}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item {...formItemLayout}  label="绑定方式"
                            >
                                {getFieldDecorator('bindType')(
                                    <Select disabled>
                                        <Select.Option value="1">微信</Select.Option>
                                        <Select.Option value="2">支付宝</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label="绑定的唯一值"
                            >
                                {getFieldDecorator('code')(
                                    <Input placeholder="顾客扫码之后系统自动填写" disabled maxLength={60}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }

}

const WrapperBindFormModal = Form.create({
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            phone: Form.createFormField({
                value: props.phone.value,
            }),
            bindType: Form.createFormField({
                value: props.bindType.value,
            }),
            code: Form.createFormField({
                value: props.code.value,
            }),
        }
    }
})(BindFormModal);

export default WrapperBindFormModal;