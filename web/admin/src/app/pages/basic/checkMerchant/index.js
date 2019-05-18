import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Form, Input, Button, InputNumber, Modal, message, Divider, Table, Popconfirm } from 'antd';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import checkMerchantActions from '../../../actions/checkMerchant';
import styles from './index.less';

class CheckMerchant extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.checkMerchantActions.list();
    }

    render() {
        const { loading, listData } = this.props.checkMerchant;
        const columns = [{
            title: '商家名称',
            dataIndex: 'merchantName',
            key: 'merchantName',
        }, {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '注册时间',
            dataIndex: 'registerTime',
            key: 'registerTime',
        }, {
            title: '操作',
            key: 'action',
            render: (record) => {
                if(record.changeAuditStatus == 0 && record.merchantStatus == 3) {
                    return (
                        <Fragment>
                            <a href="javascript:;" onClick={() => {this.props.history.push("/youdianpu/basic/merchantChangeDetail", {query: {id: record.id}})}}>商家信息变更审核</a>
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            <a href="javascript:;" onClick={() => {this.props.history.push("/youdianpu/basic/merchantDetail", {query: {id: record.id}})}}>商家首次审核</a>
                        </Fragment>
                    )
                }
            },
        }];
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
        };
        return (
            <PageHeaderLayout
                title="审核商家"
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
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
        checkMerchant: state.checkMerchant,
    }
}, (dispatch) => {
    return { checkMerchantActions: bindActionCreators(checkMerchantActions, dispatch) }
})(CheckMerchant));