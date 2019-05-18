import React, { Component } from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';

const FormItem = Form.Item;

class CreateForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, confirmLoading, resetFields, id, updateOrAdd } = this.props;
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
        let dictNameError = null;
        if (this.props.dictName.errors) {
            dictNameError = this.props.dictName.errors[0].message;
        }
        let dictCodeError = null;
        if (this.props.dictCode.errors) {
            dictCodeError = this.props.dictCode.errors[0].message;
        }
        return (
            <Modal
                title={isUpdate ? "修改商品附属属性" : "新增商品附属属性"}
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
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="属性代码"
                    help={dictCodeError ? dictCodeError : '保存之后不能在更改'}
                    validateStatus={dictCodeError ? 'error' : ''}>
                    {form.getFieldDecorator('dictCode', {
                        rules: [{ required: true, message: '请输入属性代码', whitespace: true, }],
                    })(<Input placeholder="属性代码推荐用拼音简写,属性代码必须唯一" disabled={updateOrAdd !== "add"}/>)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="属性名称"
                    help={dictNameError ? dictNameError : ''}
                    validateStatus={dictNameError ? 'error' : ''}>
                    {form.getFieldDecorator('dictName', {
                        rules: [{ required: true, message: '请输入属性名称', whitespace: true, }],
                    })(<Input placeholder="请输入属性名称" />)}
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
            dictName: Form.createFormField({
                value: props.dictName.value,
            }),
            dictCode: Form.createFormField({
                value: props.dictCode.value,
            }),
            sortNo: Form.createFormField({
                value: props.sortNo.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;