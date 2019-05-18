import React, { Component } from 'react';
import { Form, Input, Button, Modal, Radio, InputNumber } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class CreateForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, confirmLoading, resetFields, id } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const isUpdate = !!id.value;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                if (isUpdate) {
                    handleUpdate(fieldsValue, () => {
                        resetFields()
                    });
                } else {
                    handleAdd(fieldsValue, () => {
                        resetFields()
                    });
                }
            });
        };
        /** redux 与 onFieldsChange 会校验提示显示不出来,
         * https://github.com/ant-design/ant-design/issues/3794
         * 那就手动显示错误信息吧
         */
        let floorNameError = null;
        if (this.props.floorName.errors) {
            floorNameError = this.props.floorName.errors[0].message;
        }
        return (
            <Modal
                title={isUpdate ? "修改场地" : "新建场地(保存之后会默认新建一个空的平面图设计)"}
                visible={modalVisible}
                okText="保存"
                onOk={okHandle}
                confirmLoading={confirmLoading}
                cancelText="取消"
                onCancel={() => { handleModalVisible() }}
            >
                <FormItem style={{ display: 'none' }}>
                    {form.getFieldDecorator('id')(<Input disabled />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="场地名称"
                    help={floorNameError ? floorNameError : ''}
                    validateStatus={floorNameError ? 'error' : ''}>
                    {form.getFieldDecorator('floorName', {
                        rules: [{ required: true, message: '请输入场地名称', whitespace: true, }],
                    })(<Input placeholder="请输入场地名称" />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="顺序">
                    {form.getFieldDecorator('sortNo')(<InputNumber />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="描述">
                    {form.getFieldDecorator('floorDesc')(<TextArea style={{ minHeight: 32 }} rows={2} maxLength={200} />)}
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
            id: Form.createFormField({
                value: props.id.value,
            }),
            floorName: Form.createFormField({
                value: props.floorName.value,
            }),
            sortNo: Form.createFormField({
                value: props.sortNo.value,
            }),
            floorDesc: Form.createFormField({
                value: props.floorDesc.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;