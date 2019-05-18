import React, { Component, Fragment } from 'react';
import { Row, Col, Form, Rate, Input } from 'antd';

class PointForm extends Component {
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
                <Row>
                    <Col span={8}>
                        <Form.Item {...formItemLayout} label="手机号码">
                            {getFieldDecorator('phone')(
                                <Input placeholder={"手机号码"} readOnly/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item {...formItemLayout} label="会员姓名">
                            {getFieldDecorator('name')(
                                <Input placeholder={"会员姓名"} readOnly/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item {...formItemLayout} label="入会日期">
                            {getFieldDecorator('registerTime')(
                                <Input placeholder={"入会日期"} readOnly/>
                            )}
                        </Form.Item>
                    </Col>                    
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item {...formItemLayout} label="会员生日">
                            {getFieldDecorator('birthday')(
                                <Input placeholder={"会员生日"} readOnly/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item {...formItemLayout} label="会员等级">
                            {getFieldDecorator('rank')(
                                <Rate disabled/>
                            )}
                            {this.props.rank.value != 0 && <span>{this.props.rank.value}星会员</span>}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item {...formItemLayout} label="会员积分">
                            {getFieldDecorator('point')(
                                <Input placeholder={"会员积分"} readOnly/>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const WrapperPointForm = Form.create({
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
            point: Form.createFormField({
                value: props.point.value,
            }),
            rank: Form.createFormField({
                value: props.rank.value,
            }),
        }
    }
})(PointForm);

export default WrapperPointForm;