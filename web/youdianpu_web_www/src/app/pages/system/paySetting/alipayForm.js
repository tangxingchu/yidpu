import React, { Fragment, Component } from 'react';
import { Form, Input, Button, Alert, message } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class AlipayForm extends Component {

    constructor(props) {
        super(props)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.saveAlipay(values).then(() => {
                    message.success("支付宝配置成功");
                });
            }
        });
    }

    render() {
        const { form, id, fieldChangeValue } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        let appIdError = null;
        if (this.props.appId.errors) {
            appIdError = this.props.appId.errors[0].message;
        }
        let privateKeyError = null;
        if (this.props.privateKey.errors) {
            privateKeyError = this.props.privateKey.errors[0].message;
        }
        let publicKeyError = null;
        if (this.props.publicKey.errors) {
            publicKeyError = this.props.publicKey.errors[0].message;
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                {
                    id.value ? null :
                    <FormItem wrapperCol={{ span: 18, offset: 4 }}>
                        <Alert message="您还未添加支付宝的支付配置" type="info" showIcon />
                    </FormItem>
                }
                <FormItem style={{ display: 'none' }}>
                    {form.getFieldDecorator('id')(<Input disabled />)}
                </FormItem>
                <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} label="商家(您)appId"
                    help={appIdError ? appIdError : ''}
                    validateStatus={appIdError ? 'error' : ''}>
                    {form.getFieldDecorator('appId', {
                        rules: [{ required: true, message: '请输入支付宝商家(您)appId', whitespace: true, }],
                    })(<Input placeholder="请输入支付宝商家(您)appId" />)}
                </FormItem>
                <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} label="商家(您)私钥"
                    help={privateKeyError ? privateKeyError : ''}
                    validateStatus={privateKeyError ? 'error' : ''}>
                    {form.getFieldDecorator('privateKey', {
                        rules: [{ required: true, message: '请输入商家(您)私钥', whitespace: true, }],
                    })(<TextArea style={{ minHeight: 32 }} rows={12} maxLength={1000} />)}
                </FormItem>
                <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} label="支付宝公钥"
                    help={publicKeyError ? publicKeyError : ''}
                    validateStatus={publicKeyError ? 'error' : ''}>
                    {form.getFieldDecorator('publicKey', {
                        rules: [{ required: true, message: '请输入支付宝公钥', whitespace: true, }],
                    })(<TextArea style={{ minHeight: 32 }} rows={5} maxLength={1000} />)}
                </FormItem>
                <FormItem wrapperCol={{ span: 18, offset: 4 }}>
                    <Button type="primary" htmlType="submit" icon={"save"} style={{ width: '100%' }}>
                        {id.value ? "更新" : "保存" }
                    </Button>
                </FormItem>
            </Form>
        )
    }

}

const AlipayFormWarpper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            appId: Form.createFormField({
                value: props.appId.value,
            }),
            publicKey: Form.createFormField({
                value: props.publicKey.value,
            }),
            privateKey: Form.createFormField({
                value: props.privateKey.value,
            }),
        }
    }
})(AlipayForm);

export default AlipayFormWarpper;