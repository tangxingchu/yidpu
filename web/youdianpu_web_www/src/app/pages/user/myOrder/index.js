import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Table, Popconfirm, Divider, Button } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';
import numeral from 'numeral';
import { withRouter } from 'react-router';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import myOrderActions from '../../../actions/myOrder';
import { getToken } from '../../../utils/authority';
import styles from './index.less'

class MyOrder extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { listData } = this.props.myOrder;
        if(listData == null) {
            this.list();
        }
    }

    list = () => {
        this.props.myOrderActions.list();
    }

    cancelOrder = (id) => {
        this.props.myOrderActions.cancelMyOrder(id);
    }

    delOrder = (id) => {
        this.props.myOrderActions.delMyOrder(id);
    }

    openExternal = (id, orderNo) => {
        ipcRenderer.send("openOrderFunction", {token: getToken(), id, orderNo});
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        const { loading, listData } = this.props.myOrder;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
        };
        const columns = [{
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        }, {
            title: '订单时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
        }, {
            title: '购买功能名称',
            dataIndex: 'functionName',
            key: 'functionName',
        }, {
            title: '订单金额',
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => (
                <span style={{color: 'red'}}>￥{numeral(record.amount).format('0,0.00')}</span>
            )
        }, {
            title: '订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (text, record) => (
                <Fragment>
                    {
                        record.orderStatus == 1 ? "待支付" :
                        record.orderStatus == 2 ? "交易成功" :
                        record.orderStatus == 3 ? "交易取消" :
                        "交易关闭" 
                    }
                </Fragment>
            ),
        }, {
            title: '订单描述',
            dataIndex: 'orderDescription',
            key: 'orderDescription',
        }, {
            title: '操作',
            key: 'action',
            render: (record) => (
                <Fragment>
                    {
                        record.orderStatus == 1 ? 
                        <Fragment>
                            <Popconfirm title="确定取消该订单吗？" okText="确定" cancelText="取消" onConfirm={() => { this.cancelOrder(record.id) }}>
                                <a href="javascript:;">取消</a> 
                            </Popconfirm>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={() => {this.openExternal(record.functionPriceId, record.orderNo)}}>继续支付</a>
                        </Fragment>: null
                    }
                    {
                        record.orderStatus == 3 || record.orderStatus == 4 ? 
                        <Popconfirm title="确定删除该订单吗？" okText="确定" cancelText="取消" onConfirm={() => { this.delOrder(record.id) }}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                        : null
                    }                    
                </Fragment>
            ),
        }];
        return (
            <PageHeaderLayout
                title={"我的订单"}
                content="这是您在我们平台购买某些功能菜单的订单列表。"
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}></div>
                        <div className={styles.tableListOperator}>
                            <Button icon="reload" type={"primary"} onClick={() => this.list()} style={{marginRight: 16}}>
                                刷新
                            </Button>
                            <Button onClick={() => this.goBack()}>
                                返回
                            </Button>
                        </div>
                        <Table rowKey={record => record.id}
                            loading={loading}
                            columns={columns}
                            dataSource={listData}
                            pagination={paginationProps}>
                        </Table>
                    </div>
                </Card>
            </PageHeaderLayout>
        )
    }

}

export default withRouter(connect((state) => {
    return {
        myOrder: state.myOrder,
    }
}, (dispatch) => {
    return {
        myOrderActions: bindActionCreators(myOrderActions, dispatch),
    }
})(MyOrder));