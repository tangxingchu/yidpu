import React, { Component, Fragment } from 'react';
import { Button, Icon, Form, Input, Alert, message, Modal } from 'antd';

import jQuery from 'jquery';
require('virtual-keyboard/dist/css/keyboard-basic.min.css')
require('virtual-keyboard');
require('virtual-keyboard/dist/js/jquery.keyboard.extension-typing.min.js');

import styles from './index.less';

const FormItem = Form.Item;

class LoginForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        jQuery('#codeInput').keyboard({
            openOn : null,
            usePreview: false, // disabled for contenteditable
            stayOpen : true,
            autoAccept: true,
            maxLength: 4,
            layout : 'qwerty',
            display: {
                accept: '输入完毕',
                enter: '回车'
            },
            change: (event, keyboard, el) => {
                this.props.fieldChangeValue({code : {value: el.value}});
            },
        }).addTyping();
        jQuery('#password').keyboard({
            openOn : null,
            usePreview: false, // disabled for contenteditable
            stayOpen : true,
            autoAccept: true,
            layout : 'qwerty',
            display: {
                accept: '输入完毕',
                enter: '回车'
            },
            change: (event, keyboard, el) => {
                this.props.fieldChangeValue({password : {value: el.value}});
            },
        }).addTyping();
        jQuery('#username').keyboard({
            openOn : null,
            stayOpen : true,
            usePreview: false, // disabled for contenteditable
            useCombos: false,
            autoAccept: true,
            layout: 'qwerty',
            display: {
                accept: '输入完毕',
                enter: '回车'
            },
            change: (event, keyboard, el) => {
                this.props.fieldChangeValue({username : {value: el.value}});
            },
        }).addTyping();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const kb_username = jQuery('#username').getkeyboard();
                kb_username.close();
                const kb_password = jQuery('#password').getkeyboard();
                kb_password.close();
                const kb_codeInput = jQuery('#codeInput').getkeyboard();
                kb_codeInput.close();
                this.props.onSubmit(values);
            }
        });
    }

    handleUserNameClick = () => {
        const kb = jQuery('#username').getkeyboard();
        // close the keyboard if the keyboard is visible and the button is clicked a second time
        if ( kb.isOpen ) {
            kb.close();
        } else {
            kb.reveal();
        }
    }

    handlePasswordClick = () => {
        const kb = jQuery('#password').getkeyboard();
        // close the keyboard if the keyboard is visible and the button is clicked a second time
        if ( kb.isOpen ) {
            kb.close();
        } else {
            kb.reveal();
        }
    }

    handleCodeClick = () => {
        const kb = jQuery('#codeInput').getkeyboard();
        // close the keyboard if the keyboard is visible and the button is clicked a second time
        if ( kb.isOpen ) {
            kb.close();
        } else {
            kb.reveal();
        }
    }

    forgetPWD = () => {
        Modal.info({
            title: '提示',
            content: (
              <div>
                <p>如果您是子账号,请找主账号帮您重置密码。如果您是主账号,请在主应用中重置密码。</p>
              </div>
            ),
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let usernameError = null;
        if (this.props.username.errors) {
            usernameError = this.props.username.errors[0].message;
        }
        let passwordError = null;
        if (this.props.password.errors) {
            passwordError = this.props.password.errors[0].message;
        }
        let codeError = null;
        if (this.props.code.errors) {
            codeError = this.props.code.errors[0].message;
        }
        return (
            <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
                {this.props.errorMessage ? <Alert message={this.props.errorMessage} type="error" showIcon className={styles['alert']}/> : null}
                <FormItem help={usernameError ? usernameError : ''}
                    validateStatus={usernameError ? 'error' : ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名或者手机号!' }],
                    })(
                        <Input id="username" size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/手机号" 
                            suffix={<img src="/images/keyboard.svg"
                            style={{ color: 'rgba(0,0,0,.25)', cursor: 'pointer' }}
                            onClick={this.handleUserNameClick}/>}
                            
                        />
                    )}
                </FormItem>
                <FormItem help={passwordError ? passwordError : ''}
                    validateStatus={passwordError ? 'error' : ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input id="password" size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" 
                            suffix={<img src="/images/keyboard.svg"
                            style={{ color: 'rgba(0,0,0,.25)', cursor: 'pointer' }}
                            onClick={this.handlePasswordClick}/>}                            
                        />
                    )}
                </FormItem>
                <FormItem help={codeError ? codeError : ''}
                    validateStatus={codeError ? 'error' : ''}>
                    {getFieldDecorator('code', {
                        rules: [{ required: true, message: '请输入验证码!' }],
                    })(
                        <div>
                            <Input id="codeInput" size="large" style={{width: 200}} prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="验证码" maxLength="4"
                                suffix={<img src="/images/keyboard.svg"
                                style={{ color: 'rgba(0,0,0,.25)', cursor: 'pointer' }}
                                onClick={this.handleCodeClick}/>}                                
                            />
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
                    <a className={styles["login-form-forgot"]} href="javascript:void(0)" onClick={() => this.forgetPWD()}>忘记密码</a>
                </FormItem>
            </Form>
        );
    }

}

const WrappedLoginForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                value: props.username.value,
            }),
            password: Form.createFormField({
                value: props.password.value,
            }),
            code: Form.createFormField({
                value: props.code.value,
            }),
        }
    }
})(LoginForm);
export default WrappedLoginForm;