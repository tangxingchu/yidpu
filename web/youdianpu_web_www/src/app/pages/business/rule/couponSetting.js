import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Form, InputNumber, Divider, DatePicker, Tooltip, Icon, Input } from 'antd';

const FormItem = Form.Item;

class CouponSetting extends Component {

    constructor(props) {
        super(props);
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

    render() {
        const { form, modalVisible, handleModalVisible, confirmLoading, handleAdd, resetFields } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const { expiredTimeOpen } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const formItemLayoutInner = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const effectiveTimeLable = (
            <span>规则生效日期<Tooltip title={"不填表示立即生效"}><Icon type={"question"} /></Tooltip></span>
        )
        const expiredTimeLable = (
            <span>规则失效日期<Tooltip title={"不填表示永久有效"}><Icon type={"question"} /></Tooltip></span>
        )
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                handleAdd(fieldsValue, () => {
                    resetFields()
                });
            });
        };
        return (
            <Modal title={"电子优惠券规则配置"}
                visible={modalVisible}
                width={640}
                okText="保存"
                onOk={okHandle}
                confirmLoading={confirmLoading}
                cancelText="取消"
                onCancel={() => { handleModalVisible() }}
            >
                <Form >
                <Row gutter={24}>
                        <Col span={12}>
                            <FormItem {...formItemLayoutInner} label={effectiveTimeLable}>
                                {getFieldDecorator('effectiveTime')(
                                    <DatePicker disabledDate={this.disabledEffectiveTime}
                                        format="YYYY-MM-DD"
                                        onOpenChange={this.handleEffectiveOpenChange}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayoutInner} label={expiredTimeLable}>
                                {getFieldDecorator('expiredTime')(
                                    <DatePicker disabledDate={this.disabledExpiredTime} 
                                        format="YYYY-MM-DD"
                                        onOpenChange={this.handleExpiredOpenChange}
                                        open={expiredTimeOpen}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider />
                    <FormItem {...formItemLayout} label="消费满多少使用￥">
                        {getFieldDecorator('consumePrice', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入消费总金额满多少可使用',
                                },
                            ],
                        })(<InputNumber min={1} />)}元
                    </FormItem>
                    <FormItem {...formItemLayout} label="卷面金额￥">
                        {getFieldDecorator('amount', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入卷面金额',
                                },
                            ],
                        })(<InputNumber min={1} />)}元
                    </FormItem>
                    <Divider />
                    <FormItem {...formItemLayout} label="优惠券数量">
                        {getFieldDecorator('count', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入优惠券数量',
                                },
                            ],
                        })(<InputNumber min={1} />)}张
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const CreateFormWarpper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            consumePrice: Form.createFormField({
                value: props.consumePrice.value,
            }),
            amount: Form.createFormField({
                value: props.amount.value,
            }),
            description: Form.createFormField({
                value: props.description.value,
            }),
            count: Form.createFormField({
                value: props.count.value,
            }),
            effectiveTime: Form.createFormField({
                value: props.effectiveTime.value,
            }),
            expiredTime: Form.createFormField({
                value: props.expiredTime.value,
            }),
        }
    }
})(CouponSetting);

export default CreateFormWarpper;