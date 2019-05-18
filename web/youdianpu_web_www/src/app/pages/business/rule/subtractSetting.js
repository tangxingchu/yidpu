import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Form, Radio, InputNumber, Divider, TimePicker, DatePicker, Tooltip, Icon, Input } from 'antd';

import { constraintType, subtractType } from './dataUtils';

const FormItem = Form.Item;
const { TextArea } = Input;

class SubtractSetting extends Component {

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
            <Modal title={"减免、折扣、赠现金优惠券规则配置"}
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
                    <FormItem {...formItemLayout} label="选择约束条件">
                        {
                            getFieldDecorator('constraintType')(
                                <Radio.Group buttonStyle="solid">
                                    {
                                        constraintType.map(item => {
                                            return <Radio.Button value={item.value} key={item.value}>{item.text}</Radio.Button>
                                        })
                                    }
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="消费总金额￥" style={{ display: getFieldValue('constraintType') == 1 ? 'block' : 'none' }}>
                        {getFieldDecorator('consumePrice', {
                            rules: [
                                {
                                    required: getFieldValue('constraintType') == 1,
                                    message: '请输入消费总金额满多少条件',
                                },
                            ],
                        })(<InputNumber min={1} />)}元
                    </FormItem>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem {...formItemLayoutInner} label="当天起始时间" style={{ display: getFieldValue('constraintType') == 2 ? 'block' : 'none' }}>
                                {getFieldDecorator('constraintTimeStart', {
                                    rules: [
                                        {
                                            required: getFieldValue('constraintType') == 2,
                                            message: '请输入当天起始时间',
                                        },
                                    ],
                                })(<TimePicker format={'HH:mm'}/>)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayoutInner} label="当天结束时间" style={{ display: getFieldValue('constraintType') == 2 ? 'block' : 'none' }}>
                                {getFieldDecorator('constraintTimeEnd', {
                                    rules: [
                                        {
                                            required: getFieldValue('constraintType') == 2,
                                            message: '请输入当天结束时间',
                                        },
                                    ],
                                })(<TimePicker format={'HH:mm'}/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider >我是分割线(上面是具体约束条件,下面是优惠方案)</Divider>
                    <FormItem {...formItemLayout} label="选择优惠方案">
                        {
                            getFieldDecorator('type')(
                                <Radio.Group buttonStyle="solid">
                                    {
                                        subtractType.map(item => {
                                            return <Radio.Button value={item.value} key={item.value}>{item.text}</Radio.Button>
                                        })
                                    }
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem {...formItemLayout} label="现金优惠金额￥" style={{ display: getFieldValue('type') == 1 ? 'block' : 'none' }}>
                        {getFieldDecorator('amount1', {
                            rules: [
                                {
                                    required: getFieldValue('type') == 1,
                                    message: '请输入现金优惠金额',
                                },
                            ],
                        })(<InputNumber min={1} />)}元
                    </FormItem>
                    <FormItem {...formItemLayout} label="折扣率" style={{ display: getFieldValue('type') == 2 ? 'block' : 'none' }}>
                        {getFieldDecorator('discount', {
                            rules: [
                                {
                                    required: getFieldValue('type') == 2,
                                    message: '请输入折扣率',
                                },
                            ],
                        })(<InputNumber min={1} />)}折
                    </FormItem>
                    <FormItem {...formItemLayout} label="卷面金额￥" style={{ display: getFieldValue('type') == 3 ? 'block' : 'none' }}>
                        {getFieldDecorator('amount2', {
                            rules: [
                                {
                                    required: getFieldValue('type') == 3,
                                    message: '请输入卷面金额',
                                },
                            ],
                        })(<InputNumber min={1} />)}元
                    </FormItem>
                    <FormItem {...formItemLayout} label="备注">
                        {getFieldDecorator('description')(
                            <TextArea style={{ minHeight: 32 }} placeholder="备注信息" rows={2} maxLength={200} />
                        )}
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
            constraintType: Form.createFormField({
                value: props.constraintType.value,
            }),
            type: Form.createFormField({
                value: props.type.value,
            }),
            consumePrice: Form.createFormField({
                value: props.consumePrice.value,
            }),
            amount1: Form.createFormField({
                value: props.amount1.value,
            }),
            amount2: Form.createFormField({
                value: props.amount2.value,
            }),
            discount: Form.createFormField({
                value: props.discount.value,
            }),
            description: Form.createFormField({
                value: props.description.value,
            }),
            enabled: Form.createFormField({
                value: props.enabled.value,
            }),
            constraintTimeStart: Form.createFormField({
                value: props.constraintTimeStart.value,
            }),
            constraintTimeEnd: Form.createFormField({
                value: props.constraintTimeEnd.value,
            }),
            effectiveTime: Form.createFormField({
                value: props.effectiveTime.value,
            }),
            expiredTime: Form.createFormField({
                value: props.expiredTime.value,
            }),
        }
    }
})(SubtractSetting);

export default CreateFormWarpper;