import React, { PureComponent, Fragment, Component } from 'react';
import { Card, Row, Col, Button, message, Divider, Table, Popconfirm, Tooltip, Popover, Icon } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import employeeActions from '../../../actions/employee';
import childUserActions from '../../../actions/childUser';
import { getSub, getUid } from '../../../utils/authority';
import CreateForm from './createForm';
import styles from './index.less'

class ChildUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    componentDidMount() {
        const { userList } = this.props.childUser;
        if (userList.length === 0) {
            this.props.childUserActions.list({});
        }
    }

    list = () => {
        this.props.childUserActions.list({});
    }

    handleModalVisible = (flag) => {
        this.setState({ modalVisible: !!flag });
    }

    save = (values, callback) => {
        this.props.childUserActions.save({ ...values }).then(() => {
            message.success("子账号保存成功");
            this.props.childUserActions.list({});
            this.handleModalVisible(false);
            callback();
        });
    }

    update = (id, enabled) => {
        if (enabled == "1") {
            enabled = "0";
        } else {
            enabled = "1";
        }
        this.props.childUserActions.update({ id, enabled, merchantUsername: this.getRealSub() }).then(() => {
            message.success(`${enabled == "0" ? "成功禁用" : "成功启用"}`);
        });
    }

    deleteUser = (id) => {
        this.props.childUserActions.deleteUser({ id }).then(() => {
            message.success("子账号删除成功");
        });
    }

    xuqi = (id, dayType) => {
        this.props.childUserActions.xuqi({ merchantId: getUid(), dayType, childUserId: id}).then(() => {
            message.success("子账号续期成功");
        });
    }

    getRealSub = () => {
        const sub = getSub();
        if(sub.indexOf(":") > -1) {
            return sub.split(":")[0]
        } else {
            return sub;
        }
    }

    render() {

        const generateContent = (id) => (
            <Row>
                <Col span={8} className={styles.xuqiCol} onClick={() => {this.xuqi(id, 1)}}>
                    一个月
                </Col>
                <Col span={8} className={styles.xuqiCol} onClick={() => {this.xuqi(id, 2)}}>
                    三个月
                </Col>
                <Col span={8} className={styles.xuqiCol} onClick={() => {this.xuqi(id, 3)}}>
                    半年
                </Col>
                <Col span={8} className={styles.xuqiCol} onClick={() => {this.xuqi(id, 4)}}>
                    一年
                </Col>
                <Col span={8} className={styles.xuqiCol} onClick={() => {this.xuqi(id, 5)}}>
                    永久
                </Col>
                {/* <Col span={8} className={styles.xuqiCol} onClick={() => {alert(id)}}>
                    自定义
                </Col> */}
            </Row>
        );

        const columns = [
            {
                title: '登录账号',
                dataIndex: 'account',
                key: 'account',
                render: (text, record) => (
                    <Fragment>
                        <span>{this.getRealSub()}:{text}</span>
                    </Fragment>
                ),
            },
            {
                title: '真实姓名',
                dataIndex: 'realname',
                key: 'realname',
                render: (text, record) => (
                    <Fragment>
                        <span>{record.realname || record.employeeName}</span>
                    </Fragment>
                ),
            },
            {
                title: '员工编号',
                dataIndex: 'employeeNo',
                key: 'employeeNo',
            },
            {
                title: '手机号码',
                dataIndex: 'phone',
                key: 'phone',
                render: (text, record) => (
                    <Fragment>
                        <span>{record.phone || record.employeePhone}</span>
                    </Fragment>
                ),
            },
            {
                title: '账户生效/过期',
                dataIndex: 'effectiveTime',
                key: 'effectiveTime',
                render: (text, record) => {
                    if (record.expirationStatus === 1) {//失效
                        return <Fragment><Tooltip title={`过期时间:${record.expirationTime}`}>
                            <span style={{ color: '#ff4d4f', marginRight: 4 }}>已过期</span>
                        </Tooltip>
                            <Popover content={generateContent(record.id)} title="请选择续期时长" trigger="hover">
                                <a>(续期<Icon type="down" />)</a>
                            </Popover>
                        </Fragment>
                    } else {
                        if (record.effectiveStatus === 1) {
                            return <Tooltip title={`生效时间:${record.effectiveTime} 过期时间:${record.expirationTime}`}>
                                <span style={{ color: '#1890ff' }}>生效中</span>
                            </Tooltip>
                        } else {
                            return <Tooltip title={`生效时间:${record.effectiveTime}`}>
                                <span>未生效</span>
                            </Tooltip>
                        }
                    }
                }
            },
            {
                title: '账户是否启用',
                dataIndex: 'enabled',
                key: 'enabled',
                render: (text, record) => (
                    <Fragment>
                        {
                            record.enabled == "1" ? "已启用" : <span style={{ color: '#ff4d4f' }}>已禁用</span>
                        }
                    </Fragment>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => { this.deleteUser(record.id) }}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a href="javascript:void(0)" onClick={() => { this.update(record.id, record.enabled) }}>
                            {record.enabled === "1" ? "禁用账户" : "启用账户"}
                        </a>
                    </Fragment>
                ),
            },
        ];

        const { loading, userList, saveLoading, childUserData, autoCompleteData } = this.props.childUser;
        const { fieldChangeValue, resetFields, handleSearch } = this.props.childUserActions;
        const { list } = this.props.employeeActions;
        const { modalVisible } = this.state;

        return (
            <PageHeaderLayout
                title="子账户管理"
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}></div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新增
                            </Button>
                            <Button icon="reload" onClick={() => this.list()}>
                                刷新
                            </Button>
                        </div>
                        <Table rowKey={record => record.id}
                            loading={loading}
                            columns={columns}
                            dataSource={userList}
                        />
                    </div>
                </Card>
                <CreateForm modalVisible={modalVisible}
                    {...childUserData}
                    confirmLoading={saveLoading}
                    handleModalVisible={this.handleModalVisible}
                    handleAdd={this.save}
                    handleUpdate={this.update}
                    fieldChangeValue={fieldChangeValue}
                    resetFields={resetFields}
                    autoCompleteData={autoCompleteData}
                    listEmployee={list}
                    handleSearch={handleSearch}
                />
            </PageHeaderLayout>
        )
    }

}


export default connect((state) => {
    return {
        childUser: state.childUser,
        employee: state.employee,
    }
}, (dispatch) => {
    return {
        childUserActions: bindActionCreators(childUserActions, dispatch),
        employeeActions: bindActionCreators(employeeActions, dispatch),
    }
})(ChildUser);