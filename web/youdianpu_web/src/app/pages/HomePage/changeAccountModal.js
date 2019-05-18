import React, { Component } from 'react';

import { Modal, Button, Form, Icon, Input } from 'antd';

class ChangeAccountForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSubmit(values).then(() => {
                this.props.form.resetFields();
            });
        });
    }

    onClose = () => {
        this.props.form.resetFields();
        this.props.onClose();
    }

    render() {
        const { visible, loading } = this.props;
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
            <Modal title={"切换子账号"}
                visible={visible}
                onCancel={this.onClose}
                centered={true}
                footer={[<Button key='close' onClick={() => this.onClose()}>关闭</Button>,
                <Button key='login' loading={loading} type="primary" onClick={() => this.handleSubmit()}>切换子账号</Button>]}
            >
                <Form className="login-form">
                    <Form.Item {...formItemLayout} label={"账号"}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入登录账号', whitespace: true }],
                        })(
                            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                placeholder="手机号:子账号" 
                            />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={"密码"}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入登录密码', whitespace: true }],
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                type="password" placeholder="密码" 
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

const WrappedChangeAccountForm = Form.create()(ChangeAccountForm);

export default WrappedChangeAccountForm;