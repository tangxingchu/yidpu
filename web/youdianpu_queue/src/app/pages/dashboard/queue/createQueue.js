import React, { Component } from 'react';
import { Form, Input, Button, Modal, Radio, InputNumber, Icon, Tooltip, Spin } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class CreateForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { modalVisible, form, handleAdd, handleUpdate, selectQueueLoading, handleModalVisible, confirmLoading, resetFields, id } = this.props;
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
        let queueNameError = null;
        if (this.props.queueName.errors) {
            queueNameError = this.props.queueName.errors[0].message;
        }
        let queueCodeError = null;
        if (this.props.queueCode.errors) {
            queueCodeError = this.props.queueCode.errors[0].message;
        }
        return (
            <Modal
                title={isUpdate ? "修改排队" : "新建排队"}
                visible={modalVisible}
                okText="保存"
                onOk={okHandle}
                confirmLoading={confirmLoading}
                cancelText="取消"
                onCancel={() => { handleModalVisible() }}
            >  
                <Spin spinning={selectQueueLoading}>
                    <FormItem style={{ display: 'none' }}>
                        {form.getFieldDecorator('id')(<Input disabled />)}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="排队名称"
                        help={queueNameError ? queueNameError : ''}
                        validateStatus={queueNameError ? 'error' : ''}>
                        {form.getFieldDecorator('queueName', {
                            rules: [{ required: true, message: '请输入排队名称', whitespace: true, }],
                        })(<Input placeholder="请输入排队名称" />)}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label={(
                        <span>
                            排队代码&nbsp;
                            <Tooltip title="排队代码用于区分排队列表,如代码+序号001=A001">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )} help={queueCodeError ? queueCodeError : ''} validateStatus={queueCodeError ? 'error' : ''}>
                        {form.getFieldDecorator('queueCode', {
                            rules: [{ required: true, message: '请输入排队代码', whitespace: true, }],
                        })(<Input placeholder="请输入排队代码,如:A、B、C" />)}
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="描述">
                        {form.getFieldDecorator('description')(<TextArea style={{ minHeight: 32 }} rows={2} maxLength={200} />)}
                    </FormItem>
                </Spin>
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
            queueName: Form.createFormField({
                value: props.queueName.value,
            }),
            queueCode: Form.createFormField({
                value: props.queueCode.value,
            }),
            description: Form.createFormField({
                value: props.description.value,
            }),
        }
    }
})(CreateForm);

export default CreateFormWarpper;