import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Button, Input, InputNumber, DatePicker, Spin, Divider, Alert } from 'antd';

import styles from './index.less';

class RechargeRuleForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expiredTimeOpen: false,
        };
    }

    disabledEffectiveTime = (effectiveTime) => {
        const expiredTime = this.props.expiredTime.value;
        if (!effectiveTime || !expiredTime) {
          return false;
        }
        return effectiveTime.valueOf() > expiredTime.valueOf();
    }

    disabledExpiredTime = (expiredTime) => {
        const effectiveTime = this.props.effectiveTime.value;
        if (!expiredTime || !effectiveTime) {
          return false;
        }
        return expiredTime.valueOf() <= effectiveTime.valueOf();
    }

    handleEffectiveOpenChange = (open) => {
        if (!open) {
          this.setState({ expiredTimeOpen: true });
        }
    }

    handleExpiredOpenChange = (open) => {
        this.setState({ expiredTimeOpen: open });
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSubmit(values);
        });
    }

    render() {
        const { expiredTimeOpen } = this.state;
        const { detailLoading, form, saveLoading } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 12 },
              sm: { span: 12 },
            },
        };
        let titleError = null;
        if (this.props.title.errors) {
            titleError = this.props.title.errors[0].message;
        }
        let effectiveTimeError = null;
        if (this.props.effectiveTime.errors) {
            effectiveTimeError = this.props.effectiveTime.errors[0].message;
        }
        let rechargeAmountError = null;
        if (this.props.rechargeAmount.errors) {
            rechargeAmountError = this.props.rechargeAmount.errors[0].message;
        }
        let givePriceError = null;
        if (this.props.givePrice.errors) {
            givePriceError = this.props.givePrice.errors[0].message;
        }
        return (
            <Spin spinning={detailLoading}>
                <Divider>
                    {this.props.id.value ? "修改会员充值活动信息" : "新增会员充值活动信息"}
                </Divider>
                <Form>
                    <Form.Item style={{ display: 'none' }}>
                        {form.getFieldDecorator('id')(<Input disabled />)}
                    </Form.Item>
                    <Row>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label="活动标题"
                                help={titleError ? titleError : ''}
                                validateStatus={titleError ? 'error' : ''}
                            >
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入活动标题',}],
                                })(
                                    <Input placeholder="活动标题" maxLength={100}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label="活动内容"
                            >
                                {getFieldDecorator('description')(
                                    <Input.TextArea placeholder="活动内容,500字以内" rows={10} maxLength={500}>
                                    </Input.TextArea>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>                    
                    <Row>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label="生效日期"
                                help={effectiveTimeError ? effectiveTimeError : ''}
                                validateStatus={effectiveTimeError ? 'error' : ''}
                            >
                                {getFieldDecorator('effectiveTime', {
                                    rules: [{ required: true, message: '请选择生效日期',}],
                                })(
                                    <DatePicker placeholder="生效日期"
                                        format={"YYYY-MM-DD"}
                                        disabledDate={this.disabledEffectiveTime}
                                        onOpenChange={this.handleEffectiveOpenChange}
                                        style={{width: 200}}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label="失效日期"
                                help={'不选表示长期有效'}
                            >
                                {getFieldDecorator('expiredTime')(
                                    <DatePicker placeholder="失效日期"
                                        format={"YYYY-MM-DD"}
                                        disabledDate={this.disabledExpiredTime}
                                        onOpenChange={this.handleExpiredOpenChange}
                                        open={expiredTimeOpen}
                                        style={{width: 200}}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label={"充值满多少"}
                                help={rechargeAmountError ? rechargeAmountError : ''}
                                validateStatus={rechargeAmountError ? 'error' : ''}
                            >
                                {getFieldDecorator('rechargeAmount', {
                                    rules: [{ required: true, message: '请输入充值满多少金额',}],
                                })(
                                    <InputNumber placeholder="充值满多少金额" min={1} step={1} style={{width: 200}}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label={"赠送金额"}
                                help={givePriceError ? givePriceError : ''}
                                validateStatus={givePriceError ? 'error' : ''}
                            >
                                {getFieldDecorator('givePrice', {
                                    rules: [{ required: true, message: '请输入赠送金额',}],
                                })(
                                    <InputNumber placeholder="赠送金额" min={1} step={1} style={{width: 200}}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            <Form.Item>
                                <Button type="primary" loading={saveLoading} style={{marginRight: 8}} onClick={() => this.handleSubmit()}>保存并返回</Button>
                                <Button onClick={() => this.props.goBack(false)}>返回</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        )
    }

}

const WrapperRechargeRuleForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            title: Form.createFormField({
                value: props.title.value,
            }),
            description: Form.createFormField({
                value: props.description.value,
            }),
            rechargeAmount: Form.createFormField({
                value: props.rechargeAmount.value,
            }),
            givePrice: Form.createFormField({
                value: props.givePrice.value,
            }),
            effectiveTime: Form.createFormField({
                value: props.effectiveTime.value,
            }),
            expiredTime: Form.createFormField({
                value: props.expiredTime.value,
            }),
        }
    }
})(RechargeRuleForm);

export default WrapperRechargeRuleForm;