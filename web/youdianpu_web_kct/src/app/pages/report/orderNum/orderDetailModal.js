import React, { Component, Fragment } from 'react';
import { Spin, Table, Button, message, Modal, Popover } from 'antd';

import moment from 'moment';
import numeral from 'numeral';

export default class OrderDetailModal extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
            title: '下单时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
            render: (text, record) => (
                <span>{moment(record.orderTime).format("YYYY-MM-DD HH:mm")}</span>
            )
        }, {
            title: '用餐订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        }, /* {
            title: '桌台编号',
            dataIndex: 'tableCode',
            key: 'tableCode',
        },  */{
            title: '用餐人数',
            dataIndex: 'dinersNum',
            key: 'dinersNum',
            render: (text, record) => (
                <span>{record.dinersNum}人</span>
            )
        }, {
            title: '订单金额',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => (
                <span>￥{numeral(record.totalPrice).format('0,0.00')}</span>
            )
        }, {
            title: '支付金额',
            dataIndex: 'payPrice',
            key: 'payPrice',
            render: (text, record) => (
                <span style={{color: '#87d068'}}>￥{numeral(record.payPrice).format('0,0.00')}</span>
            )
        }, {
            title: '优惠金额',
            dataIndex: 'subtractAmount',
            key: 'subtractAmount',
            render: (text, record) => {
                if(record.subtractAmount == 0) {
                    return <span>￥{numeral(record.subtractAmount).format('0,0.00')}</span>
                } else {
                    return (
                        <Popover content={this.subtractDetailContent(record)} title="优惠明细">
                            <span style={{color: '#ff4242'}}>￥-{numeral(record.subtractAmount).format('0,0.00')}</span>
                        </Popover>
                    )
                }
            }
        }, {
            title: '退款(异常)金额',
            dataIndex: 'refundPrice',
            key: 'refundPrice',
            render: (text, record) => (
                <span style={{color: '#ff4242'}}>-￥{numeral(record.totalPrice - record.subtractAmount - record.payPrice).format('0,0.00')}</span>
            )
        }, {
            title: '备注说明',
            dataIndex: 'remark',
            key: 'remark',
        }];
    }

    subtractDetailContent = (record) => {
        return (
            <div dangerouslySetInnerHTML={{__html:`${record.subtractRemark}`}}></div>
        )
    }

    render() {
        const { visible, handleModalVisible, loading, orderDetailData } = this.props;
        return (
            <Modal
                title={"订单明细"}
                visible={visible}
                width={980}
                onCancel={() => handleModalVisible(false)}
                footer={[<Button key='close' onClick={() => handleModalVisible(false)}>关闭</Button>]}
            > 
                <Table rowKey={record => record.id}
                    loading={loading}
                    dataSource={orderDetailData}
                    columns={this.columns}
                    size={"middle"}
                    pagination={false}
                />
            </Modal>
        )
    }

}