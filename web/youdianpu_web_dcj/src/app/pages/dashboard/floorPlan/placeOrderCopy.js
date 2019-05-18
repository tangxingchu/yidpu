import React, { Component } from 'react';
import { Row, Col, Modal, Card, Button, Input, Spin, Popconfirm, Tooltip, Select, Form } from 'antd';
import { ipcRenderer } from 'electron';

import styles from './index.less';

class PlaceOrderCopy extends Component {
    
    constructor(props) {
        super(props);
    }

    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.copyOrder(values.sourceTableCode);
            }
        });
    }

    render() {
        const { visible, handleModalVisible, floorList, copyOrderLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 16 },
            },
        };
        return (
            <Modal
                title={"下单(复制其它用餐订单)"}
                visible={visible}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={() => handleModalVisible(false)}>取消</Button>,
                    <Button key="copy" loading={copyOrderLoading}  type={"primary"} onClick={() => this.handleSubmit()}>复制下单</Button>,
                ]}
                okText="复制下单"
                cancelText="取消"
                onCancel={() => handleModalVisible(false)}
            >
                <Form>
                    <Form.Item {...formItemLayout} label="复制哪一桌台的订单">
                        {getFieldDecorator('sourceTableCode', {
                                rules: [{ required: true, message: '请选择复制哪一桌台的订单',}],
                            })(
                                <Select showArrow={true} placeholder="请选择桌台" style={{ width: '100%' }}>
                                {
                                    floorList.map(floor => {
                                        return (
                                            <Select.OptGroup label={floor.name} key={floor.id}>
                                                {
                                                    floor.tables.map(table => {
                                                        //已下单用餐中
                                                        if(table.status == '4') {
                                                            return (
                                                                <Select.Option key={table.id} 
                                                                    value={`${table.tableCode}`}
                                                                >
                                                                    {table.tableCode}-{table.tableName}
                                                                </Select.Option>
                                                            )
                                                        }                                                                     
                                                    })
                                                }
                                            </Select.OptGroup>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

const PlaceOrderCopyWrapper = Form.create()(PlaceOrderCopy);

export default PlaceOrderCopyWrapper;