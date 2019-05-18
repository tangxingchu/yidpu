import React, { Component } from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';

const FormItem = Form.Item;

class CreateForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, confirmLoading, resetFields, id, fieldName, updateOrAdd } = this.props;
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
        let itemNameError = null;
        if (this.props.itemName.errors) {
            itemNameError = this.props.itemName.errors[0].message;
        }
        let itemValueError = null;
        if (this.props.itemValue.errors) {
            itemValueError = this.props.itemValue.errors[0].message;
        }
        return (
            <Modal
                title={isUpdate ? `编辑${fieldName}项` : `新增${fieldName}项`}
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
                <FormItem style={{ display: 'none' }}>
                    {form.getFieldDecorator('dictCode')(<Input disabled />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label={`${fieldName}项名称`}
                    help={itemNameError ? itemNameError : ''}
                    validateStatus={itemNameError ? 'error' : ''}>
                    {form.getFieldDecorator('itemName', {
                        rules: [{ required: true, message: `请输入${fieldName}项名称`, whitespace: true, }],
                    })(<Input placeholder={`请输入${fieldName}项名称`} />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label={`${fieldName}项值`}
                    help={itemValueError ? itemValueError : '保存之后不能在更改'}
                    validateStatus={itemValueError ? 'error' : ''}>
                    {form.getFieldDecorator('itemValue', {
                        rules: [{ required: true, message: `请输入${fieldName}项值`, whitespace: true, }],
                    })(<Input placeholder={`${fieldName}项值,可以用数字,单个${fieldName}里必须唯一`} disabled={updateOrAdd !== "add"}/>)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="显示顺序">
                    {form.getFieldDecorator('sortNo')(<InputNumber />)}
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
            dictCode: Form.createFormField({
                value: props.dictCode.value,
            }),
            itemName: Form.createFormField({
                value: props.itemName.value,
            }),
            itemValue: Form.createFormField({
                value: props.itemValue.value,
            }),
            sortNo: Form.createFormField({
                value: props.sortNo.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;