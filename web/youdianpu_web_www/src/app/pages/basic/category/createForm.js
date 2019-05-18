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
        let categoryNameError = null;
        if (this.props.categoryName.errors) {
            categoryNameError = this.props.categoryName.errors[0].message;
        }
        return (
            <Modal
                title={isUpdate ? "修改分类" : "新建分类"}
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
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="分类名称"
                    help={categoryNameError ? categoryNameError : ''}
                    validateStatus={categoryNameError ? 'error' : ''}>
                    {form.getFieldDecorator('categoryName', {
                        rules: [{ required: true, message: '请输入分类名称', whitespace: true, }],
                    })(<Input placeholder="请输入分类名称" />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="顺序">
                    {form.getFieldDecorator('sortNo')(<InputNumber />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="描述">
                    {form.getFieldDecorator('categoryDesc')(<TextArea style={{ minHeight: 32 }} rows={2} maxLength={200} />)}
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
            categoryName: Form.createFormField({
                value: props.categoryName.value,
            }),
            sortNo: Form.createFormField({
                value: props.sortNo.value,
            }),
            categoryDesc: Form.createFormField({
                value: props.categoryDesc.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;