import React, { Component } from 'react';
import { Modal, Table, Form, Popconfirm, Input, InputNumber, Divider, Alert } from 'antd';
import numeral from 'numeral';

export default class CashCouponModal extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { visible, handleModalVisible, saveCouponConsumeLoading, saveCouponConsume, currCouponConsumes, 
            deleteCouponConsume, deleteCouponConsumeLoading } = this.props;
        const columns = [{
            title: '现金券编号',
            dataIndex: 'couponNo',
            key: 'couponNo',
        }, {
            title: '现金券金额',
            dataIndex: 'couponPrice',
            key: 'couponPrice',
            render: (text, record) => (
                <span>￥{numeral(record.couponPrice).format('0,0.00')}</span>
            )
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }, {
            title: '操作',
            key: 'action',
            render: (record) => {
                return (
                    <Popconfirm title="确定删除该现金券吗？" okText="确定" cancelText="取消" onConfirm={() => { deleteCouponConsume(record.id) }}>
                        <a href="javascript:;">删除现金券</a>
                    </Popconfirm>
                )
            },
        }];
        return (
            <CreateFormWrapper visible={visible}
                handleModalVisible={handleModalVisible}
                saveCouponConsume={saveCouponConsume}
                confirmLoading={saveCouponConsumeLoading}
            >
                <Table rowKey={record => record.id}
                    loading={deleteCouponConsumeLoading}
                    columns={columns}
                    dataSource={currCouponConsumes}
                    pagination={false}>
                </Table>
            </CreateFormWrapper>
        )
    }

}

class createForm extends Component {

    constructor(props) {
        super(props);
    }

    submitForm = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            this.props.saveCouponConsume(fieldsValue);
        });
    }

    render() {
        const { visible, handleModalVisible,confirmLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 18 },
              sm: { span: 18 },
            },
        };
        return (
            <Modal
                visible={visible}
                title="消费现金券"
                width={640}
                onCancel={() => handleModalVisible(false)}
                okText="添加现金券"
                cancelText="关闭"
                confirmLoading={confirmLoading}
                onOk={() => this.submitForm()}
            >
                <Alert message={"注:合并收银也只能添加当前桌台的现金券消费"} type={"info"} showIcon style={{marginBottom: 8}}/>
                {this.props.children}
                <Divider dashed={true}/>
                <Form>
                    <Form.Item {...formItemLayout} label="现金券编号">
                        {getFieldDecorator('couponNo')(
                            <Input placeholder={"现金券编号"} maxLength={45} />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="券面金额(￥)">
                        {getFieldDecorator('couponPrice', {
                            rules: [{
                                required: true, message: '请输入券面金额'
                            }],
                        })(
                            <InputNumber placeholder={"券面金额"} min={1} style={{width: 200}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('remark')(
                            <Input.TextArea placeholder={"备注说明"} />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

const CreateFormWrapper = Form.create()(createForm);