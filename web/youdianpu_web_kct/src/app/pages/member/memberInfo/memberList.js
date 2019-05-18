import React, { Component, Fragment } from 'react';
import { Card, Table, Button, Popconfirm, Popover, Divider, Rate } from 'antd';
import { Link , Redirect } from 'react-router-dom';
import moment from 'moment';

import SearchForm from './searchForm';
import styles from './index.less';

export default class MemberList extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
            title: '真实姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '推荐人',
            dataIndex: 'referrerName',
            key: 'referrerName',
        }, {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
            render: (text, record) => {
                return <Link to={`${this.props.path}/detail`} onClick={() => this.props.selectDetailById(record.id)}>{record.phone}</Link>
            }
        }, {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: (text, record) => {
                if(record.sex == "1") {
                    return <span>男</span>
                } else if(record.sex == "2") {
                    return <span>女</span>
                } else {
                    return <span>未知</span>
                }
            }
        }, {
            title: '入会日期',
            dataIndex: 'registerTime',
            key: 'registerTime',
            sorter: true,
            render: (text, record) => {
                return <Popover title={"具体日期"} content={`${record.registerTime}`}>{`${moment(record.registerTime, "YYYY-MM-DD").fromNow()}`}</Popover>
            }
        }, {
            title: '会员状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                if(record.status == "0") {
                    return <span>正常</span>
                } else if(record.status == "1") {
                    return <span style={{color: "#00a0ea"}}>已冻结</span>
                } else {
                    return <span>未知</span>
                }
            }
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (text, record) => {
                if(record.birthday) {
                    return <span>{moment(record.birthday, "YYYY-MM-DD").format('MMM Do')}</span>
                }
            }
        }, {
            title: '会员积分',
            dataIndex: 'point',
            key: 'point',
            sorter: true,
        }, {
            title: '会员等级',
            dataIndex: 'rank',
            key: 'rank',
            sorter: true,
            render: (text, record) => {
                return <Rate disabled defaultValue={parseInt(record.rank)} />
            }
        }, {
            title: '最近一次消费时间',
            dataIndex: 'lastConsumptionTime',
            key: 'lastConsumptionTime',
            sorter: true,
        }, {
            title: '绑定微信',
            dataIndex: 'wechatOpenId',
            key: 'wechatOpenId',
            render: (text, record) => {
                if(record.wechatOpenId) {
                    return <span style={{color: "#00a0ea"}}>已绑定</span>
                } else {
                    return <span style={{color: "#ff4242"}}>未绑定</span>
                }
            }
        }, {
            title: '绑定支付宝',
            dataIndex: 'alipayUserid',
            key: 'alipayUserid',
            render: (text, record) => {
                if(record.alipayUserid) {
                    return <span style={{color: "#00a0ea"}}>已绑定</span>
                } else {
                    return <span style={{color: "#ff4242"}}>未绑定</span>
                }
            }
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        {
                            record.status == "1" ?
                            <a href="javascript:void(0)" onClick={() =>{this.props.handleChangeDescModalVisible(true, record.id, 0)}}>解冻</a>
                            :
                            <a href="javascript:void(0)" onClick={() =>{this.props.handleChangeDescModalVisible(true, record.id, 1)}}>冻结</a>
                        }
                        {
                            record.status == "0" ?
                            <Fragment>
                                <Divider type={"vertical"}/>
                                <Link to={`${this.props.path}/add`} onClick={() => this.props.selectById(record.id)}>修改</Link>
                            </Fragment>
                            : null
                        }
                        <Divider type={"vertical"}/>
                        <Popconfirm title="确认暂时删除会员信息吗?" onConfirm={() =>{this.props.handleChangeDescModalVisible(true, record.id, 2)}}>
                            <a href="javascript:void(0)">删除</a>
                        </Popconfirm>
                        <Divider type={"vertical"}/>
                        <a href="javascript:void(0)" onClick={() => this.props.handleBindModalVisible(true, record.id, record.phone)}>绑定微信或支付宝</a>
                    </span>
                )
            }
        }];
    }

    handleTableChange = (pagination, filters, sorter) => {
        if(sorter.field == 'lastConsumptionTime') {
            this.sorterField = 'last_consumption_time';
        } else if(sorter.field == 'registerTime') {
            this.sorterField = 'register_time';
        } else {
            this.sorterField = sorter.field;
        }
        this.sorterOrder = sorter.order;
        this.props.handleSearch(null, this.sorterField, this.sorterOrder);
    }

    handleSearch = (values) => {
        this.props.handleSearch(values, this.sorterField, this.sorterOrder);
    }

    render() {
        const { loading, memberList = [], path, pageSize, total, currentPage, searchFormData, searchFormFieldChangeValue,
            resetSearchFormFields, onPageChange, onShowSizeChange, handleAddMemberInfo } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            total,
            current: currentPage,
            onChange: onPageChange,
            onShowSizeChange: onShowSizeChange,
        };
        return (
            <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                    <SearchForm {...searchFormData}
                        fieldChangeValue={searchFormFieldChangeValue}
                        resetFields={resetSearchFormFields}
                        handleSearch={this.handleSearch}
                        loading={loading}
                    />
                </div>
                <div className={styles.tableListOperator}>
                    <Link to={`${path}/add`} onClick={() => {handleAddMemberInfo()}}>
                        <Button icon="plus" type="primary">
                            新增会员
                        </Button>
                    </Link>
                </div>
                <Table rowKey={record => record.id}
                    columns={this.columns}
                    loading={loading}
                    dataSource={memberList}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                    size={"middle"}
                />
            </div>
        )
    }

}