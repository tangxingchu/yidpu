import React, { Component } from 'react';
import { Row, Col, Modal, Select, Form } from 'antd';

class ChangeTableForm extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.changeTableCode(values.newTableCode);
        });
    }

    render() {
        const { form, loading, visible, handleModalVisible, floorList } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal 
                title={"换台"}
                visible={visible}
                onCancel={() => handleModalVisible(false)}
                onOk={() => this.onSubmit()}
                confirmLoading={loading}
                okText="确认换台"
                cancelText="关闭"
            > 
                <Form>
                    <Row>
                        <Col span={24}>
                            <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="选择换台号">
                                {getFieldDecorator('newTableCode', {
                                    rules: [{required: true, message: '请选择换台号' }],
                                })(
                                    <Select showArrow={true} placeholder="请选择桌台编号" style={{ width: '100%' }}>
                                    {
                                        floorList.map(floor => {
                                            return (
                                                <Select.OptGroup label={floor.name} key={floor.id}>
                                                    {
                                                        floor.tables.map(table => {
                                                            return (
                                                                <Select.Option key={table.id} 
                                                                    value={`${table.tableCode}`}
                                                                >
                                                                    {table.tableCode}-{table.tableName}
                                                                </Select.Option>
                                                            )                            
                                                        })
                                                    }
                                                </Select.OptGroup>
                                            )
                                        })
                                    }
                                </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

const WrapperChangeTableForm = Form.create({
    mapPropsToFields(props) {
        return {
            newTableCode: Form.createFormField({
                value: props.newTableCode.value,
            }),
        }
    }
})(ChangeTableForm);

export default WrapperChangeTableForm;