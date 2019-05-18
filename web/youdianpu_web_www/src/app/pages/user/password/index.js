import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Form, Button, Input, message } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import homePageActions from '../../../actions/homePage';
import styles from './index.less'

class ModifyPWD extends Component {

    constructor(props) {
        super(props);
    }

    goback = () => {
        this.props.history.goBack();
    }

    modifyPWD = (oldpwd, newpwd) => {
        this.props.homePageActions.modifyPWD(oldpwd, newpwd).then(() => {
            message.success("密码修改成功");
        });
    }

    render() {
        const { modifyPWDLoading } = this.props.homePage;
        return (
            <PageHeaderLayout
                title={"修改密码"}
                content=""
            >
                <Card bordered={false}>
                    <WrappedPWDForm goback={this.goback} loading={modifyPWDLoading} modifyPWD={this.modifyPWD}/>
                </Card>
            </PageHeaderLayout>
        )
    }

}

class PWDForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.modifyPWD(values.oldpassword, values.password);
            }
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    goback = () => {
        this.props.goback();
    }

    render() {
        const { form, loading } = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="原始密码" pa>
                    {form.getFieldDecorator('oldpassword', {
                        rules: [{ required: true, message: '请输入原始密码', whitespace: true }],
                    })(
                        <Input type="password" maxLength={20} placeholder="请输入原始密码"/>
                        )}
                </Form.Item>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="新密码">
                    {form.getFieldDecorator('password', {
                        rules: [{ required: true, min: 6, message: '请输入新密码(不能低于6位数)', whitespace: true }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" maxLength={20} placeholder="新密码不能低于6位数"/>
                        )}
                </Form.Item>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认新密码">
                    {form.getFieldDecorator('confirm', {
                        rules: [{ required: true, min: 6, message: '请输入确认新密码(不能低于6位数)', whitespace: true }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" maxLength={20} placeholder="新密码不能低于6位数" onBlur={this.handleConfirmBlur}/>
                        )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24, offset: 5 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>确认修改</Button>
                    <Button style={{marginLeft: 16}} onClick={() => {this.goback()}}>返回</Button>
                </Form.Item>
            </Form>
        )
    }

}


const WrappedPWDForm = Form.create()(PWDForm);


export default withRouter(connect((state) => {
    return {
        homePage: state.homePage,
    }
}, (dispatch) => {
    return {
        homePageActions: bindActionCreators(homePageActions, dispatch),
    }
})(ModifyPWD));