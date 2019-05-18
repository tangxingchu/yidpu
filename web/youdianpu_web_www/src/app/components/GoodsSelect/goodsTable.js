import React, { Component, Fragment } from 'react';
import { Card, Button, Icon, Select, Spin, Table, Modal, Steps, Input, } from 'antd';
import numeral from 'numeral';

import styles from './goodsTable.less';
const Search = Input.Search;

export default class GoodsTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { goodsList, onTableChange, goodsCheckedKeys, goodsFilterList } = this.props;
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品分类',
                dataIndex: 'categoryName',
                key: 'categoryName',
            },
            {
                title: '计量单位',
                dataIndex: 'unitName',
                key: 'unitName',
            },
            {
                title: '销售价格',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
                render: (text, record) => (
                    <span>￥{numeral(record.price).format('0,0.00')}</span>
                )
            },
            {
                title: '商品描述',
                dataIndex: 'description',
                key: 'description',
            },
        ];
        const isDisabled = (goodsId) => {
            const goods = goodsFilterList.find(item => item.goodsId == goodsId);
            return goods ? true : false;
        }
        const rowSelection = {
            selectedRowKeys: goodsCheckedKeys,
            onChange: onTableChange,
            getCheckboxProps: record => ({
                disabled: isDisabled(record.id)
            }),
        };
        return (
            <div className={styles.container}>
                <div>
                    <Search
                        placeholder="输入商品名称或拼音代码"
                        onSearch={value => console.log(value)}
                        className={styles.search}
                    />
                </div>
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={goodsList}
                />
            </div>
        );
    }

}