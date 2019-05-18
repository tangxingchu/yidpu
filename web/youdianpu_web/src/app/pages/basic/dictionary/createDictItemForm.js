import React, { Component } from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';

const FormItem = Form.Item;

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
                title={isUpdate ? "修改属性项" : "新建属性项"}
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
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="属性项名称"
                    help={dictNameError ? dictNameError : ''}
                    validateStatus={dictNameError ? 'error' : ''}>
                    {form.getFieldDecorator('dictName', {
                        rules: [{ required: true, message: '请输入属性项名称', whitespace: true, }],
                    })(<Input placeholder="请输入属性项名称" />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="属性项值"
                    help={dictValueError ? dictValueError : ''}
                    validateStatus={dictValueError ? 'error' : ''}>
                    {form.getFieldDecorator('dictValue', {
                        rules: [{ required: true, message: '请输入属性项值', whitespace: true, }],
                    })(<Input placeholder="属性项值,可以用数字,单个属性里必须唯一" />)}
                </FormItem>
                <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="顺序">
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
            dictValue: Form.createFormField({
                value: props.dictValue.value,
            }),
            sortNo: Form.createFormField({
                value: props.sortNo.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;