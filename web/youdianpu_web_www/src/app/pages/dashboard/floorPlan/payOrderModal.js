import React, { Component, Fragment } from 'react';
import { Modal, Table, Button, Icon, Popconfirm, Alert, Dropdown, Menu, message } from 'antd';
import numeral from 'numeral';

export default class PayOrderModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
        }
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    handleSubmit = () => {
        const { selectedRowKeys } = this.state;
        if(selectedRowKeys == null || selectedRowKeys.length == 0) {
            message.info("您没有勾选任何支付单");
            return;
        }
        const { payOrderList } = this.props;
        for(let i = 0; i < selectedRowKeys.length; i++) {
            const payOrder = payOrderList.find(item => item.id == selectedRowKeys[i]);
            if(payOrder.orderStatus == "1") {
                message.info("您勾选的支付单有未支付的,请重新选择");
                return;
            }
        }
        this.props.handleSubmit([...selectedRowKeys]);
        this.setState({selectedRowKeys: []});
    }

    render() {
        const { selectedRowKeys } = this.state;
        const { visible, handleModalVisible, payOrderList, loading, confirmLoading, primaryBtnText } = this.props;
        const menu = ({ record }) => {
            return (
                <Menu>
                    <Menu.Item>
                        <Popconfirm title="确认关闭并删除订单吗?" onConfirm={() =>{this.props.deletePayOrder(record.id)}}>
                            <a href="javascript:;">关闭并删除</a>
                        </Popconfirm>
                    </Menu.Item>
                    <Menu.Item>
                        {
                            record.payMethod == 3 ? <a href="javascript:;" onClick={() => {this.props.syncAlipayResultFront(record.orderNo)}}>查询一次支付宝支付结果</a>
                            : <a href="javascript:;" onClick={() => {this.props.syncWxpayResultFront(record.orderNo)}}>查询一次微信支付结果</a>
                        }
                    </Menu.Item>
                </Menu>
            )
        };
        const MoreBtn = (record) => {
            return (
                <Dropdown overlay={menu(record)}>
                    <a>
                        操作 <Icon type="down" />
                    </a>
                </Dropdown>
            )
        };
        const columns = [{
            title: '支付单创建时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
        }, {
            title: '支付单金额',
            dataIndex: 'orderPrice',
            key: 'orderPrice',
            render: (text, record) => (
                <span>￥{numeral(record.orderPrice).format('0,0.00')}</span>
            )
        }, {
            title: '支付宝(微信)交易号',
            dataIndex: 'payNo',
            key: 'payNo',
        }, {
            title: '支付时间',
            dataIndex: 'payTime',
            key: 'payTime'
        }, {
            title: '已支付金额',
            dataIndex: 'payPrice',
            key: 'payPrice',
            render: (text, record) => {
                if(record.payPrice) {
                    return <span style={{color: '#87d068'}}>￥{numeral(record.payPrice).format('0,0.00')}</span>
                }
            }
        }, {
            title: '支付方式',
            dataIndex: 'payMethod',
            key: 'payMethod',
            render: (text, record) => {
                if(record.payMethod == 3) {
                    return (
                        <span>前台扫码支付(支)</span>
                    )
                } else if(record.payMethod == 4) {
                    return (
                        <span>前台扫码支付(微)</span>
                    )
                } else if(record.payMethod == 1) {
                    return (
                        <span>桌台扫码支付(支)</span>
                    )
                } else if(record.payMethod == 2) {
                    return (
                        <span>桌台扫码支付(微)</span>
                    )
                }
            }
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if(record.orderStatus == '1') {
                    return (
                        
                        <MoreBtn record={record} />
                    );
                }
            },
        }];
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Modal
                visible={visible}
                title="关联前台扫码支付单(顾客自己输入金额支付)"
                width={1020}
                footer={[
                    <Button key="close" onClick={() => handleModalVisible(false)}>关闭</Button>,
                    <Button key="refresh" loading={loading} onClick={() => this.props.refresh()}>刷新</Button>,
                    <Button key="ok" type={"primary"} loading={confirmLoading} onClick={() => this.handleSubmit()}>{primaryBtnText}</Button>,
                ]}
            >
                <Alert message={"前台扫码支付是顾客输入金额然后在支付.支付宝(微信)交易号为空表示顾客扫了码且在支付过程中中途取消了,如果您确认该单不会再支付可以删除掉"} type={"info"} showIcon style={{marginBottom: 8}}/>
                <Table rowKey={record => record.id}
                    rowSelection={rowSelection}
                    loading={loading}
                    columns={columns}
                    size={"middle"}
                    dataSource={payOrderList}
                    pagination={false}>
                </Table>
            </Modal>
        )
    }

}