import React, { Component, Fragment } from 'react';
import { Button, Table, Popconfirm, Divider } from 'antd';
import numeral from 'numeral';

import styles from './index.less';

export default class GiftPage extends Component {

    constructor(props) {
        super(props)        
        this.columns = [{
            title: '礼品名称',
            dataIndex: 'giftName',
            key: 'giftName',
        }, {
            title: '数量',
            dataIndex: 'giftNum',
            key: 'giftNum',
        }, {
            title: '兑换所需积分',
            dataIndex: 'giftPoint',
            key: 'giftPoint',
        }, {
            title: '操作',
            key: 'action',
            width: 200,
            render: (text, record) => {
                return (
                    <Fragment>
                        <a href="javascript:void(0)" onClick={() =>{this.props.selectGiftById(record.id)}}>修改</a>
                        <Divider type="vertical" />
                        <Popconfirm title="确认删除该礼品信息吗?" onConfirm={() =>{this.props.deleteGiftById(record.id)}}>
                            <a href="javascript:void(0)">删除</a>
                        </Popconfirm>
                    </Fragment>
                )
            }
        }];
    }

    

    onPageChange = (page, pageSize) => {
        this.props.listGift(pageSize, page);
    }

    onShowSizeChange = (current, pageSize) => {
        this.props.listGift(pageSize, current);
    }

    render() {
        const { loading, giftList, pageSize, total, currentPage } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            total,
            current: currentPage,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
        };
        return (
            <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                    <Button type={"primary"} icon="plus" onClick={() => {this.props.handleModalVisible(true)}} style={{marginLeft: 8}}>新增礼品</Button>
                    <Button icon="reload" loading={loading} onClick={() => {this.props.refresh()}}>刷新</Button>
                </div>
                <Table rowKey={record => record.id}
                    columns={this.columns}
                    loading={loading}
                    dataSource={giftList}
                    pagination={paginationProps}
                />
            </div>
        )
    }

}