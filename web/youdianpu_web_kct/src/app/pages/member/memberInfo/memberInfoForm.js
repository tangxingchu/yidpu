import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Button, Input , Select, DatePicker, Spin, Divider, Alert } from 'antd';

import styles from './index.less';

class MemberInfoForm extends Component {

    constructor(props) {
        super(props)
    }

    handleSubmit = (flag) => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSubmit(values, flag);
        });
    }

    render() {
        const { detailLoading, form, saveLoading } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
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
        let phoneError = null;
        if (this.props.phone.errors) {
            phoneError = this.props.phone.errors[0].message;
        }
        let nameError = null;
        if (this.props.name.errors) {
            nameError = this.props.name.errors[0].message;
        }
        let registerTimeError = null;
        if (this.props.registerTime.errors) {
            registerTimeError = this.props.registerTime.errors[0].message;
        }
        return (
            <Spin spinning={detailLoading}>
                <Divider>
                    {this.props.id.value ? "修改会员信息" : "新增会员信息"}
                </Divider>
                {
                    this.props.id.value ? null :
                    <Alert message="新增会员的同时会默认新增一个会员账户信息,同一会员只有一个账户" type="info" showIcon style={{marginBottom: 8}}/>
                }
                <Form>
                    <Form.Item style={{ display: 'none' }}>
                        {form.getFieldDecorator('id')(<Input disabled />)}
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="手机号码"
                                help={phoneError ? phoneError : ''}
                                validateStatus={phoneError ? 'error' : ''}
                            >
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, pattern: new RegExp("^[0-9]*$"), message: '请输入正确的手机号码',}],
                                })(
                                    <Input placeholder="会员手机号码" maxLength={20} disabled={this.props.id.value ? true : false}
                                        
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="会员类型"
                            >
                                {getFieldDecorator('type')(
                                    <Select placeholder="选择信息来源" maxLength={20}>
                                        <Select.Option key="1" value="1">个人</Select.Option>
                                        <Select.Option key="2" value="2">企业</Select.Option>
                                        <Select.Option key="3" value="3">其它</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label={getFieldValue("type") == "2" ? "企业名称" : "真实姓名"}
                                help={nameError ? nameError : ''}
                                validateStatus={nameError ? 'error' : ''}
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入真实姓名',}],
                                })(
                                    <Input placeholder="会员真实姓名" maxLength={50}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="信息来源"
                                help={'一般选择线下,如果有其它线上来源请选线上'}
                            >
                                {getFieldDecorator('source', {
                                    rules: [{ required: true, message: '请选择会员信息来源',}],
                                })(
                                    <Select placeholder="选择信息来源" maxLength={20}>
                                        <Select.Option key="1" value="1">线下</Select.Option>
                                        <Select.Option key="2" value="2">线上</Select.Option>
                                        <Select.Option key="3" value="3">其它</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="性别"
                            >
                                {getFieldDecorator('sex', {
                                    rules: [{ required: true, message: '请选择性别',}],
                                })(
                                    <Select placeholder="请选择性别" maxLength={20}>
                                        <Select.Option key="1" value="1">男</Select.Option>
                                        <Select.Option key="2" value="2">女</Select.Option>
                                        <Select.Option key="3" value="3">未知</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="会员生日">
                                {getFieldDecorator('birthday')(
                                    <DatePicker placeholder="会员生日" format={"MM-DD"} style={{width: '100%'}}/>
                                )}
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="入会日期"
                                help={registerTimeError ? registerTimeError : ''}
                                validateStatus={registerTimeError ? 'error' : ''}
                            >
                                {getFieldDecorator('registerTime', {
                                    rules: [{ required: true, message: '请输入会员入会日期',}],
                                })(
                                    <DatePicker placeholder="会员加入日期" format={"YYYY-MM-DD"} style={{width: '100%'}}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="推荐人">
                                {getFieldDecorator('referrerName')(
                                    <Input placeholder="推荐人" maxLength={20}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            <Form.Item>
                                {
                                    !this.props.id.value ?
                                        <Button type="primary" loading={saveLoading} style={{marginRight: 8}} onClick={() => this.handleSubmit(false)}>保存并继续新增</Button>
                                    : null
                                }
                                <Fragment>
                                    <Button type="primary" loading={saveLoading} style={{marginRight: 8}} onClick={() => this.handleSubmit(true)}>保存并返回</Button>
                                    <Button onClick={() => this.props.goBack(false)}>返回</Button>
                                </Fragment>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        )
    }

}

const WrapperMemberInfoForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            phone: Form.createFormField({
                value: props.phone.value,
            }),
            type: Form.createFormField({
                value: props.type.value,
            }),
            name: Form.createFormField({
                value: props.name.value,
            }),
            source: Form.createFormField({
                value: props.source.value,
            }),
            sex: Form.createFormField({
                value: props.sex.value,
            }),
            birthday: Form.createFormField({
                value: props.birthday.value,
            }),
            registerTime: Form.createFormField({
                value: props.registerTime.value,
            }),
            referrerName: Form.createFormField({
                value: props.referrerName.value,
            }),
        }
    }
})(MemberInfoForm);

export default WrapperMemberInfoForm;