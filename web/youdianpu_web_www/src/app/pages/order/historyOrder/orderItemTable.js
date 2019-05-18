import React, { Component, Fragment } from 'react';
import numeral from 'numeral';
import { Table } from 'antd';

import styles from './index.less';

export default class OrderItemTable extends Component {

    constructor(props) {
        super(props);
    }   

    render() {
        const { dataSource, style, loading } = this.props;
        const renderGoodsName = (orderItem) => {
            //特价
            if(orderItem.ruleCode == "1") {
                return <span>{orderItem.goodsName}<span className={styles.ruleName}>(特价)</span></span>;
            } else if(orderItem.ruleCode == "2") {//折扣
                return <span>{orderItem.goodsName}<span className={styles.ruleName}>({orderItem.ruleValue}折)</span></span>;
            } else {
                return orderItem.goodsName;
            }
        }
        const columns = [{
            title: '商品名称',
            dataIndex: 'goodsName',
            key: 'goodsName',
            render: (text, record) => {
                return <span className={styles.goodsName}>{renderGoodsName(record)}</span>
            }
        }, {
            title: '下单数量',
            dataIndex: 'num',
            key: 'num',
            render: (text, record) => {
                return (
                    <span>{record.num}{record.goodsUnitName}</span>
                )
            }
        }, {
            title: '原价',
            dataIndex: 'goodsPrice',
            key: 'goodsPrice',
            render: (text, record) => {
                return (
                    <span>￥{numeral(record.goodsPrice).format("0,0.00")}</span>
                )
            }
        }, {
            title: '成交价',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => {
                if(record.ruleValue) {
                    return (
                        <span style={{color: '#ff4242'}}>￥{numeral(record.price).format("0,0.00")}</span>
                    )
                } else {
                    return (
                        <span>￥{numeral(record.price).format("0,0.00")}</span>
                    )
                }
            }
        }, {
            title: '状态',
            dataIndex: 'orderItemStatus',
            key: 'orderItemStatus',
            render: (text, record) => {
                if(record.orderItemStatus == '9') {
                    return <span style={{color: '#ff4242'}}>已退单</span>
                } else if(record.orderItemStatus == '4') {
                    return <span>已出菜</span>
                } if(record.orderItemStatus == '8') {
                    return <span>已成交</span>
                } if(record.orderItemStatus == '10') {
                    return <span style={{color: '#ff4242'}}>已删除(交易未达成)</span>
                } if(record.orderItemStatus == '12') {
                    return <span >已上菜</span>
                } else {
                    return <span>未上菜</span>
                }
            },
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }];
        return (
            <Table rowKey={record => record.id}
                columns={columns}
                style={{...style}}
                dataSource={dataSource}
                title={() => "用餐订单明细"}
                loading={loading}
                size={"small"}
                pagination={false}
            >
            </Table>
        )
    }

}