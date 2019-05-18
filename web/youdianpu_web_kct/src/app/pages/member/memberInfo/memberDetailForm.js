import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Button, Input , Select, DatePicker, Spin, Divider, Alert, Rate } from 'antd';

import styles from './index.less';

class MemberDetailForm extends Component {

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
        const { detailLoading, form } = this.props;
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
                
                <Form>
                    <Divider>会员基本信息</Divider>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="手机号码"
                            >
                                {getFieldDecorator('phone')(
                                    <Input placeholder="会员手机号码" maxLength={20} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="会员类型"
                            >
                                {getFieldDecorator('type')(
                                    <Select placeholder="选择信息来源" maxLength={20} readOnly>
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
                            <Form.Item {...formItemLayout} label="真实姓名">
                                {getFieldDecorator('name')(
                                    <Input placeholder="会员真实姓名" maxLength={50} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="信息来源">
                                {getFieldDecorator('source')(
                                    <Select placeholder="选择信息来源" maxLength={20} readOnly>
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
                                {getFieldDecorator('sex')(
                                    <Select placeholder="请选择性别" maxLength={20} readOnly>
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
                                    <DatePicker placeholder="会员生日" format={"MM-DD"} style={{width: '100%'}} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="入会日期">
                                {getFieldDecorator('registerTime')(
                                    <DatePicker placeholder="会员加入日期" format={"YYYY-MM-DD"} style={{width: '100%'}} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="会员状态">
                                {getFieldDecorator('status')(
                                    <Select placeholder="会员状态" maxLength={20} readOnly>
                                        <Select.Option key="0" value="0">正常</Select.Option>
                                        <Select.Option key="1" value="1">冻结</Select.Option>
                                        <Select.Option key="1" value="2">已删除</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="会员积分"
                                help={"消费1元等于1积分"}
                            >
                                {getFieldDecorator('point')(
                                    <Input placeholder="会员积分" maxLength={50} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="会员等级">
                                {getFieldDecorator('rank')(
                                    <Rate disabled/>
                                )}
                                {this.props.rank.value != 0 && <span>{this.props.rank.value}星会员</span>}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider>账户信息</Divider>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="账户号"
                            >
                                {getFieldDecorator('accountNo')(
                                    <Input maxLength={50} readOnly/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="账户状态">
                                {getFieldDecorator('accountStatus')(
                                    <Select placeholder="账户状态" maxLength={20} readOnly>
                                        <Select.Option key="0" value="0">正常</Select.Option>
                                        <Select.Option key="1" value="1">冻结</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="账户余额">
                                {getFieldDecorator('accountBalance')(
                                    <Input maxLength={50} readOnly style={{fontWeight: 'bold'}}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                                        
                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            <Form.Item>                                
                                {
                                    this.props.children
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        )
    }

}

const WrapperMemberDetailForm = Form.create({
    mapPropsToFields(props) {
        return {
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
            status: Form.createFormField({
                value: props.status.value,
            }),
            point: Form.createFormField({
                value: props.point.value,
            }),
            rank: Form.createFormField({
                value: props.rank.value,
            }),
            accountNo: Form.createFormField({
                value: props.accountNo.value,
            }),
            accountStatus: Form.createFormField({
                value: props.accountStatus.value,
            }),
            accountBalance: Form.createFormField({
                value: props.accountBalance.value,
            }),
        }
    }
})(MemberDetailForm);

export default WrapperMemberDetailForm;