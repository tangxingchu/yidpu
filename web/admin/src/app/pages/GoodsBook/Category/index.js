import React, { PureComponent, Fragment, Component } from 'react';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider, Table } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import SearchForm from './searchForm';

import goodsCategoryActions from '../../../actions/goodsCategory';

import styles from './index.less'

class Category extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                key: 'action',
                render: () => (
                    <Fragment>
                        <a href="">删除</a>
                        <Divider type="vertical" />
                        <a href="">编辑</a>
                    </Fragment>
                ),
            },
        ];

        const data = [{
            name: "分类1",
            key: "name",
        }];

        return (
            <PageHeaderLayout
                title="商品分类管理"
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}></div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新增
                            </Button>
                        </div>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Card>
            </PageHeaderLayout>
        )
    }

}


export default connect((state) => {
    return {
        goodsCategory: state.goodsCategory,
    }
}, (dispatch) => {
    return { goodsCategoryActions: bindActionCreators(goodsCategoryActions, dispatch) }
})(Category);