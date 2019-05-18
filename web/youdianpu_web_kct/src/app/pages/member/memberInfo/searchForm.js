import React, { Component, Fragment } from 'react';
import { Row, Col, Form, Button, Input , Select } from 'antd';

import styles from './index.less';

class MemberSearchForm extends Component {

    constructor(props) {
        super(props)
    }

    resetForm = () => {
        this.props.resetFields();
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSearch(values);
        });
    }

    render() {
        const { form, loading,  } = this.props;
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
            <Form onSubmit={this.handleSearch}>
                <Row>
                    <Col span={6}>
                        <Form.Item {...formItemLayout} label="手机号码"
                        >
                            {getFieldDecorator('phone')(
                                <Input placeholder="会员手机号码" maxLength={20}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item {...formItemLayout} label="入会时长"
                        >
                            {getFieldDecorator('register')(
                                <Select>
                                    <Select.Option value="" style={{height: 24}}></Select.Option>
                                    <Select.Option value="1">半年以内</Select.Option>
                                    <Select.Option value="2">半年-1年</Select.Option>
                                    <Select.Option value="3">1年-2年</Select.Option>
                                    <Select.Option value="4">2年-3年</Select.Option>
                                    <Select.Option value="5">3年以上</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item {...formItemLayout} label="推荐人"
                        >
                            {getFieldDecorator('referrerName')(
                                <Input placeholder="推荐人" maxLength={20}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" loading={loading}>查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => this.resetForm()}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }

}

const WrapperMemberSearchForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            phone: Form.createFormField({
                value: props.phone.value,
            }),
            register: Form.createFormField({
                value: props.register.value,
            }),
            referrerName: Form.createFormField({
                value: props.referrerName.value,
            }),
        }
    }
})(MemberSearchForm);

export default WrapperMemberSearchForm;