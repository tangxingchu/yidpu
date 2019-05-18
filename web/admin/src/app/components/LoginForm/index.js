import React, { Component, Fragment } from 'react';
import { Button, Icon, Form, Input, Checkbox, Alert } from 'antd';

import styles from './index.css';

const FormItem = Form.Item;

class LoginForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
                {this.props.errorMessage ? <Alert message={this.props.errorMessage} type="error" showIcon className={styles['alert']}/> : null}
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名或者手机号!' }],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/手机号" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('code', {
                        rules: [{ required: true, message: '请输入验证码!' }],
                    })(
                        <div>
                            <Input size="large" style={{width: 200}} prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="验证码" maxLength="4"/>
                            <img style={{paddingBottom: 5, marginLeft: 4, marginRight: 4}} src={`${this.props.validateCodeURL}?time=${this.props.time}`}/><a href="#" onClick={this.props.refreshValidateCode}>换一个</a>
                        </div>
                    )}
                </FormItem>
                <FormItem>
                    {/* getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>自动登录</Checkbox>
                    ) */}
                    <Button loading={this.props.loginLoading} type="primary" htmlType="submit" className={styles['login-form-button']}>登录</Button>
                    <br/>
                    <a className={styles["login-form-forgot"]} href="">忘记密码</a>
                </FormItem>
            </Form>
        );
    }

}

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;