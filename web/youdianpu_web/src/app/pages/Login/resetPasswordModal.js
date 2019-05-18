import React, { Component } from 'react';

import { Modal, Button, Form, Icon, Input, Alert } from 'antd';

class ResetPasswordForm extends Component {

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

    getSmsCode = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.getPhoneCode(values);
        });
    }

    render() {
        const { visible, loading, getPhoneCodeLoading, num60 } = this.props;
        const { getFieldDecorator } = this.props.form;
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
            <Modal title={"重置密码"}
                visible={visible}
                onCancel={this.onClose}
                centered={true}
                footer={[<Button key='close' onClick={() => this.onClose()}>关闭</Button>,
                <Button key='resetPWD' loading={loading} type="primary" onClick={() => this.handleSubmit()}>重置密码</Button>]}
            >
                <Alert style={{marginBottom: 8}} type="info" message={"温馨提示：无法重置子账号的密码，如果您是子账号请找主账号帮您重置密码。"} showIcon></Alert>
                <Form className="login-form">
                    <Form.Item {...formItemLayout} label={"手机号码"}>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号码', whitespace: true }],
                        })(
                            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                placeholder="手机号" 
                            />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={"验证码"}>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '验证码', whitespace: true }],
                        })(
                            <div>
                                <Input size="large" style={{ width: 200 }} prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" maxLength="4"
                                    />
                                <img style={{ paddingBottom: 5, marginLeft: 4, marginRight: 4 }} src={`${this.props.resetPWDValidateCodeURL}`} /><a href="#" onClick={this.props.refreshValidateCode}>换一个</a>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={"短信验证码"}>
                        {getFieldDecorator('smsCode', {
                            rules: [{ required: num60 ? true : false, message: '短信验证码', whitespace: true }],
                        })(
                            <Input size="large" style={{ width: 200, marginRight: 8 }} 
                                prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="短信验证码" maxLength="4"
                                disabled={this.props.form.getFieldValue('code')
                                    && this.props.form.getFieldValue('phone') ? false : true}
                            />
                        )}
                        <Button onClick={() => this.getSmsCode()} disabled={(this.props.form.getFieldValue('code')
                            && this.props.form.getFieldValue('phone') && !num60) ? false : true}
                            loading={getPhoneCodeLoading}
                        >{
                            num60 ? `${num60}秒重新获取` :
                            `获取短信验证码`
                        }</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

const WrappedResetPasswordForm = Form.create()(ResetPasswordForm);

export default WrappedResetPasswordForm;