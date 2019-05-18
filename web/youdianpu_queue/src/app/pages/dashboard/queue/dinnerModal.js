import React, { Component } from 'react';
import { Form,  Modal, Select } from 'antd';

const FormItem = Form.Item;

class DinnerModalForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { modalVisible, form, handleConfirm, handleModalVisible, tableCodes } = this.props;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                handleConfirm(fieldsValue);
            });
        };
        return (
            <Modal
                title={"选择桌台号就餐"}
                visible={modalVisible}
                okText="确认就餐"
                onOk={okHandle}
                cancelText="关闭"
                onCancel={() => { handleModalVisible() }}
            >
                <Form>
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="桌台号">
                        {form.getFieldDecorator('tableCode', {
                            rules: [{ required: true, message: '请选择桌台号' }],
                        })(
                            <Select>
                                {
                                    tableCodes.map(tableCode => {
                                        return <Select.Option key={tableCode} value={tableCode}>{tableCode}</Select.Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }

}

const DinnerModalFormWarpper = Form.create({
    mapPropsToFields(props) {
        return {
            tableCode: Form.createFormField({
                value: props.tableCode.value,
            }),
        }
    }
})(DinnerModalForm);

export default DinnerModalFormWarpper;