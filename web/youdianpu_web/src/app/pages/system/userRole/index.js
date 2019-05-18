import React, { Fragment, Component } from 'react';
import { Card, Row, Col, Tree, Button, Spin, message, Table, Input, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import userRoleActions from '../../../actions/userRole';
import { getGrade, getSub } from '../../../utils/authority';
import styles from './index.less';

const TreeNode = Tree.TreeNode;
const { Search } = Input;

class UserRole extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { userList } = this.props.userRole;
        if (userList.length === 0) {
            this.props.userRoleActions.init();
        }
    }

    save = () => {
        const { childUserCheckedKeys, roleTreeCheckedKeys } = this.props.userRole;
        if (childUserCheckedKeys.length > 0) {
            this.props.userRoleActions.save({ [childUserCheckedKeys[0]]: roleTreeCheckedKeys }).then(() => {
                message.success("授权保存成功");
            });
        } else {
            message.info("请选择左边子账户, 在勾选对应的系统角色保存");
        }
    }

    reload = () => {
        this.props.userRoleActions.reload();
        this.props.userRoleActions.init();
    }

    onRoleTreeCheck = (checkedKeys) => {
        //roleFunctions
        this.props.userRoleActions.onRoleTreeCheck(checkedKeys);
        if (checkedKeys.length > 0) {
            this.props.userRoleActions.listFunctionByRoleId(checkedKeys);
        } else {
            this.props.userRoleActions.disabledFunction();
        }
    }

    onTableChange = (selectedRowKeys, selectedRows) => {
        if (selectedRowKeys.length > 0) {
            this.props.userRoleActions.list(selectedRowKeys[0]).then(data => {
                if (data && data.length > 0) {
                    const checkedKeys = [];
                    data.forEach(item => {
                        checkedKeys.push(item.roleId);
                    })
                    this.props.userRoleActions.listFunctionByRoleId(checkedKeys);
                } else {
                    this.props.userRoleActions.disabledFunction();
                }
            });
        } else {
            this.props.userRoleActions.unCheckedRoleTree();
            this.props.userRoleActions.disabledFunction();
        }
        this.props.userRoleActions.onTableChange(selectedRowKeys, selectedRows.pop());
    }

    getRealSub = () => {
        const sub = getSub();
        if(sub.indexOf(":") > -1) {
            return sub.split(":")[0]
        } else {
            return sub;
        }
    }

    onNameChange = (e) => {
        const { value } = e.target;
        this.props.userRoleActions.onNameChange(value);
    }

    onNameSearch = (value) => {
        this.props.userRoleActions.search(value);
    }

    render() {

        const { roleList, functionList, userList, roleTreeCheckedKeys, functionExpandedKeys, childUserCheckedKeys,
            saveLoading, loading, reloading, roleFunctions, userName, searchValue } = this.props.userRole;
        const { listFunctionByRoleId,  } = this.props.userRoleActions;


        const loopRoleList = (data) => data.map((item) => {
            if (item.children && item.children.length) {
                return (
                    <TreeNode key={item.id} title={item.roleName} dataRef={item}>
                        {loopRoleList(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode key={item.id} title={item.roleName} dataRef={item}></TreeNode>
            );
        });

        const renderFunctionTitle = (item) => {
            if (getGrade() < item.grade) {
                return `${item.functionName}(${item.gradeName})`;
            } else {
                return `${item.functionName}`;
            }
        }

        const disabled = (item) => {
            return (roleFunctions.find((f) => f.functionCode.startsWith(item.functionCode)) ? false : true);
        }

        const loopFunctionList = (data) => data.map((item) => {
            if (item.children && item.children.length) {
                return (
                    <TreeNode key={item.functionCode} title={renderFunctionTitle(item)} dataRef={item} disabled={disabled(item)}>
                        {loopFunctionList(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode key={item.functionCode} title={renderFunctionTitle(item)} dataRef={item} disabled={disabled(item)}></TreeNode>
            );
        });

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
                        return <Tooltip title={`过期时间:${record.expirationTime}`}>
                            <span style={{ color: '#ff4d4f' }}>已过期</span>
                        </Tooltip>
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
                title: '是否启用',
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
        ];

        /* const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.props.userRoleActions.onTableChange(selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.account,
            }),
        }; */

        const rowSelection = {
            type: 'radio',
            selectedRowKeys: childUserCheckedKeys,
            onChange: this.onTableChange,
        };

        return (
            <PageHeaderLayout
                title="子账号授权"
                content="您可以给子账户授予固定的角色,子账户将会拥有角色所对应的功能菜单权限。"
            >
                <Spin spinning={loading}>
                    <Card bordered={false}>
                        <div className={styles.tableListOperator}>
                            <Button icon="reload" loading={reloading} onClick={() => this.reload()}>
                                刷新
                            </Button>
                            <Button type={"primary"} icon="save" loading={saveLoading} onClick={() => this.save()}>
                                保存授权
                            </Button>
                        </div>
                        <Row gutter={24}>
                            <Col span={16}>
                                <Search className={styles.extraContentSearch} placeholder="输入员工姓名或手机号码" value={searchValue} 
                                    onChange={this.onNameChange} onSearch={(value) => { this.onNameSearch(value) }} style={{marginBottom: 8}}/>
                                <Table
                                    rowKey={record => record.id}
                                    rowSelection={rowSelection}
                                    dataSource={userList}
                                    columns={columns}
                                >
                                </Table>
                            </Col>
                            <Col span={4}>
                                <div className={styles.title}>可授权的系统角色</div>
                                <Tree
                                    checkable={true}
                                    checkedKeys={roleTreeCheckedKeys}
                                    onCheck={this.onRoleTreeCheck}
                                    defaultExpandedKeys={["0"]}
                                >
                                    {loopRoleList(roleList)}
                                </Tree>
                            </Col>
                            <Col span={4}>
                                {
                                    userName ? <div className={styles.title}>{`账户[${userName}]拥有系统功能`}</div>
                                        : <div className={styles.title}>拥有系统功能</div>
                                }
                                <Tree
                                    expandedKeys={functionExpandedKeys}
                                >
                                    {loopFunctionList(functionList)}
                                </Tree>
                            </Col>
                        </Row>
                    </Card>
                </Spin>
            </PageHeaderLayout>
        )
    }

}

export default connect((state) => {
    return {
        userRole: state.userRole,
    }
}, (dispatch) => {
    return { userRoleActions: bindActionCreators(userRoleActions, dispatch) }
})(UserRole);