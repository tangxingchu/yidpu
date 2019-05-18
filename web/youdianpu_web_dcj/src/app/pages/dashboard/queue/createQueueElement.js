import React, { Component } from 'react';
import { Form, Input, Button, Modal, Radio, InputNumber } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class CreateForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { modalVisible, form, handleAdd, handleModalVisible, confirmLoading, resetFields } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                handleAdd(fieldsValue, () => {
                    resetFields()
                });
            });
        };
        /** redux 与 onFieldsChange 会校验提示显示不出来,
         * https://github.com/ant-design/ant-design/issues/3794
         * 那就手动显示错误信息吧
         */
        let personNumberError = null;
        if (this.props.personNumber.errors) {
            personNumberError = this.props.personNumber.errors[0].message;
        }
        return (
            <Modal
                title={"领取排队号"}
                visible={modalVisible}
                okText="确定并打印"
                onOk={okHandle}
                confirmLoading={confirmLoading}
                cancelText="取消"
                onCancel={() => { handleModalVisible() }}
            >
                <FormItem style={{ display: 'none' }}>
                    {form.getFieldDecorator('queueId')(<Input disabled />)}
                </FormItem>
                <FormItem style={{ display: 'none' }}>
                    {form.getFieldDecorator('queueNumber')(<Input disabled />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="排队序号">
                    {form.getFieldDecorator('queueSequence')(<Input readOnly/>)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="用餐人数"
                    help={personNumberError ? personNumberError : ''}
                    validateStatus={personNumberError ? 'error' : ''}>
                    {form.getFieldDecorator('personNumber', {
                        rules: [{ required: true, message: '请输入用餐人数' }],
                    })(<InputNumber min={1}/>)}
                </FormItem>
            </Modal>
        );
    }

}

const CreateFormWarpper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            queueId: Form.createFormField({
                value: props.queueId.value,
            }),
            queueNumber: Form.createFormField({
                value: props.queueNumber.value,
            }),
            queueSequence: Form.createFormField({
                value: props.queueSequence.value,
            }),
            personNumber: Form.createFormField({
                value: props.personNumber.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;