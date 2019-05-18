import React, { Component, Fragment } from 'react';
import { Modal, Button, Form, Popconfirm, InputNumber, Input, Spin } from 'antd';

class AddGiftModal extends Component {

    constructor(props) {
        super(props)
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSubmit(values);
        });
    }

    render() {
        const { visible, confirmLoading, handleModalVisible, handleSubmit, form, detailGiftLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 16 },
              sm: { span: 16 },
            },
        };
        return (
            <Modal
                visible={visible}
                title={this.props.id.value ? "修改礼品信息" : "新增礼品信息"}
                onCancel={() => handleModalVisible(false)}
                okText="保存"
                footer={[
                    <Button key="cancel" onClick={() => handleModalVisible(false)}>取消</Button>,
                    <Button key="ok" type={"primary"} loading={confirmLoading} onClick={() => this.handleSubmit()}>保存</Button>
                ]}
                cancelText="取消"
                confirmLoading={confirmLoading}
                onOk={() => this.handleSubmit()}
            >
                <Spin spinning={detailGiftLoading}>
                    <Form>
                        <Form.Item style={{ display: 'none' }}>
                            {form.getFieldDecorator('id')(<Input disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="礼品名称">
                            {getFieldDecorator('giftName', {
                                rules: [{ required: true, message: '请输入礼品名称',}],
                            })(
                                <Input placeholder={"礼品名称"} />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="礼品数量">
                            {getFieldDecorator('giftNum', {
                                rules: [{ required: true, message: '请输入礼品数量',}],
                            })(
                                <InputNumber placeholder={"礼品数量"} min={1} step={1} style={{width: '100%'}}/>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="兑换所需积分">
                            {getFieldDecorator('giftPoint', {
                                rules: [{ required: true, message: '请输入兑换所需积分',}],
                            })(
                                <InputNumber placeholder={"兑换所需积分"} min={0} step={1} style={{width: '100%'}}/>
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        )
    }

}

const AddGiftModalWrapper = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            giftName: Form.createFormField({
                value: props.giftName.value,
            }),
            giftNum: Form.createFormField({
                value: props.giftNum.value,
            }),
            giftPoint: Form.createFormField({
                value: props.giftPoint.value,
            }),
        }
    }
})(AddGiftModal);

export default AddGiftModalWrapper;