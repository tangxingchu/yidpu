import React, { Component, Fragment } from 'react';
import { Table, Button, Icon, Alert } from 'antd';
import numeral from 'numeral';

import styles from './index.less';

export default class PayOrderModal extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { dataSource, style, loading } = this.props;
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
                return <span style={{color: '#87d068'}}>￥{numeral(record.payPrice).format('0,0.00')}</span>
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
            title: '状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (text, record) => {
                if(record.orderStatus == '8') {
                    return (
                        <span>交易完成</span>
                    )
                } else if(record.orderStatus == '7') {
                    return (
                        <span style={{color: '#87d068'}}>退款成功</span>
                    )
                } else if(record.orderStatus == '11') {
                    return (
                        <span style={{color: '#809717'}}>部分退款</span>
                    )
                }
            }
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if(record.orderStatus == '10' || record.orderStatus == '9' || record.orderStatus == '7') {
                    return (
                        <span></span>
                    );
                } else {
                    return <span><a href="javascript:;" onClick={() => {this.props.handleRefundModalVisible(record.tableCode, record.relateOrderNo, record.orderNo)}}>退款</a></span>
                }
            },
        }];
        return (
            <Table rowKey={record => record.id}
                loading={loading}
                columns={columns}
                style={{...style}}
                title={() => "关联的扫码支付单"}
                size={"small"}
                dataSource={dataSource}
                pagination={false}>
            </Table>
        )
    }

}