import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Row, Col, Modal, Table, Form, Popconfirm, Input, Button, InputNumber, Divider, Alert, Rate, Spin } from 'antd';
import numeral from 'numeral';

import styles from './index.less';

export default class MemberPaymentModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            password: '',
            passwordError: null,
        }
    }

    onCancel = () => {
        this.setState({phone: '', password: '', passwordError: null});
        this.props.resetMemberInfo();
        this.props.handleModalVisible(false);
    }

    onPhoneChange = (value) => {
        this.setState({phone: value});
    }

    onPasswordChange = (value) => {
        this.setState({password: value});
    }

    memberConsume = () => {
        const { password } = this.state;
        if(!password || !_.trim(password)) {
            this.setState({passwordError: '请输入动态密码'});
            return;
        } else {
            this.setState({passwordError: null});
            this.props.memberConsume(password, () => {
                this.setState({phone: '', password: ''});
            });
        }
    }

    render() {
        const { visible, handleModalVisible, confirmLoading, phoneCodeLoading, memberInfo, loading, isDisabled, 
            handleSearch, countDown, getMemberConsumeCode } = this.props;
        const { phone, passwordError, password } = this.state;
        return (
            <Modal
                visible={visible}
                title="会员消费"
                width={680}
                onCancel={() => handleModalVisible(false)}
                footer={[
                    <Button key={"close"} onClick={() => this.onCancel()}>关闭</Button>,
                    <Button key={"ok"} type="primary" loading={confirmLoading} disabled={isDisabled} onClick={() => this.memberConsume()}>确定消费</Button>
                ]}
                maskClosable={false}
                okText="确定消费"
                cancelText="关闭"
                confirmLoading={confirmLoading}
            >   
                <WrapperSearchForm handleSearch={handleSearch} phoneValue={phone}
                    onChange={this.onPhoneChange}/>
                {
                    memberInfo.phone.value ? 
                    <Fragment>
                        <WrapperMemberInfoForm {...memberInfo} loading={loading} accountBalanceError={isDisabled}/>
                        <Divider>动态密码</Divider>
                        <WrapperPasswordForm onPasswordChange={this.onPasswordChange} 
                            passwordError={passwordError} phoneCodeLoading={phoneCodeLoading}
                            countDown={countDown} getMemberConsumeCode={getMemberConsumeCode}
                            passwordValue={password} disabled={isDisabled}
                        />
                    </Fragment>
                    : loading ? 
                        <div className={styles.tips}><Spin></Spin></div>
                    : <div className={styles.tips}>请先查询会员信息</div>
                }
            </Modal>
        )
    }

}

class SearchForm extends Component {

    submitForm = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            this.props.handleSearch(fieldsValue.phone);
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 16 },
              sm: { span: 16 },
            },
        };
        return (
            <Form>
                <Form.Item {...formItemLayout} label="会员手机号码">
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true, message: '请输入会员手机号码查询'
                        }],
                    })(
                        <Input.Search placeholder={"请输入会员手机号码查询"} onPressEnter={() => this.submitForm()}
                            onSearch={() => this.submitForm()} onChange={(e) => this.props.onChange(e.target.value)}/>
                    )}
                </Form.Item>
            </Form>
        )
    }
}

const WrapperSearchForm= Form.create({
    mapPropsToFields(props) {
        return {
            phone: Form.createFormField({
                value: props.phoneValue,
            }),
        }
    }
})(SearchForm);


class MemberInfoForm extends Component {
    render() {
        const { loading, accountBalanceError } = this.props;
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
            <Spin spinning={loading}>
                <Form>
                    <Row style={{display: 'none'}}>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="手机号码" >
                                {getFieldDecorator('phone')(
                                    <Input placeholder={"手机号码"} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="会员姓名">
                                {getFieldDecorator('name')(
                                    <Input placeholder={"会员姓名"} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                    
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="会员生日">
                                {getFieldDecorator('birthday')(
                                    <Input placeholder={"会员生日"} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="会员等级">
                                {getFieldDecorator('rank')(
                                    <Rate disabled/>
                                )}
                                {this.props.rank.value != 0 && <span>{this.props.rank.value}星会员</span>}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="账户余额"
                                help={accountBalanceError ? "账户余额不足,无法完成本次消费" : ""}
                                validateStatus={accountBalanceError ? 'error' : ''}
                            >
                                {getFieldDecorator('accountBalance')(
                                    <Input placeholder={"账户余额"} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        )
    }
}

const WrapperMemberInfoForm = Form.create({
    mapPropsToFields(props) {
        return {
            phone: Form.createFormField({
                value: props.phone.value,
            }),
            name: Form.createFormField({
                value: props.name.value,
            }),
            birthday: Form.createFormField({
                value: props.birthday.value,
            }),
            registerTime: Form.createFormField({
                value: props.registerTime.value,
            }),
            rank: Form.createFormField({
                value: props.rank.value,
            }),
            accountBalance: Form.createFormField({
                value: props.accountBalance.value,
            }),
        }
    }
})(MemberInfoForm);

class PasswordForm extends Component {
    render() {
        const { passwordError, onPasswordChange, phoneCodeLoading, countDown, disabled } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 16 },
              sm: { span: 16 },
            },
        };
        return (
            <Form>
                <Form.Item {...formItemLayout} label="动态密码"
                    help={passwordError ? passwordError : "动态密码会发生至会员手机号码中,请与会员顾客确认动态密码"}
                    validateStatus={passwordError ? 'error' : ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入动态密码'
                        }],
                    })(
                        <Input placeholder={"请输入动态密码"} onChange={(e) => onPasswordChange(e.target.value)} disabled={disabled}/>
                    )}
                    <Button loading={phoneCodeLoading} onClick={() => this.props.getMemberConsumeCode()}
                        disabled={countDown > 0 || disabled}>
                        
                        { countDown > 0 ? `${countDown}S后重发送消费动态密码` :  `发送消费动态密码`}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const WrapperPasswordForm= Form.create({
    mapPropsToFields(props) {
        return {
            password: Form.createFormField({
                value: props.passwordValue,
            }),
        }
    }
})(PasswordForm);