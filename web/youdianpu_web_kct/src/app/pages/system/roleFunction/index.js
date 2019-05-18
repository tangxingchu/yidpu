import React, { Fragment, Component } from 'react';
import { Card, Row, Col, Tree, Button, Spin, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import roleFunctionActions from '../../../actions/roleFunction';
import { getGrade } from '../../../utils/authority';
import styles from './index.less';

const TreeNode = Tree.TreeNode;

class RoleFunction extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { roleList } = this.props.roleFunction;
        if (roleList.length == 0) {
            this.props.roleFunctionActions.init();
        }
    }

    onRoleTreeSelect = (selectedKeys) => {
        if (!selectedKeys || selectedKeys.length == 0) {
            return;
        }
        const key = selectedKeys[0];
        if (key == 0) {
            return;
        }
        this.props.roleFunctionActions.onRoleTreeSelect(selectedKeys);
        const { roleFunctions } = this.props.roleFunction;
        if (!roleFunctions[key]) {
            this.props.roleFunctionActions.list(key);
        } else {
            this.props.roleFunctionActions.onFunctionTreeCheck(roleFunctions[key]);
        }
    }

    save = () => {
        const { roleTreeSelectedKeys, functionTreeCheckedKeys } = this.props.roleFunction;
        if (roleTreeSelectedKeys.length > 0) {
            this.props.roleFunctionActions.save({ [roleTreeSelectedKeys[0]]: functionTreeCheckedKeys }).then(() => {
                message.success("授权保存成功");
            });
        } else {
            message.info("请选择左边系统角色, 在勾选对应的功能菜单保存");
        }
    }

    reload = () => {
        const { roleTreeSelectedKeys } = this.props.roleFunction;
        this.props.roleFunctionActions.reload();
        this.props.roleFunctionActions.init().then(() => {
            if (roleTreeSelectedKeys && roleTreeSelectedKeys.length > 0) {
                const roleId = roleTreeSelectedKeys[0];
                this.props.roleFunctionActions.list(roleId);
            }
        });
    }

    render() {

        const { roleList, functionList, roleTreeSelectedKeys, functionTreeCheckedKeys, functionExpandedKeys, saveLoading, loading, reloading } = this.props.roleFunction;
        const { onFunctionTreeCheck, functionTreeExapand } = this.props.roleFunctionActions;

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

        const disabledFunction = (item) => {
            if(item.disabled == true || getGrade() < item.grade) {
                return true;
            }
            return false;
        }

        const loopFunctionList = (data) => data.map((item) => {
            if (item.children && item.children.length) {
                return (
                    <TreeNode key={item.functionId} title={renderFunctionTitle(item)} dataRef={item} disabled={disabledFunction(item)}>
                        {loopFunctionList(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode key={item.functionId} title={renderFunctionTitle(item)} dataRef={item} disabled={disabledFunction(item)}></TreeNode>
            );
        });

        return (
            <PageHeaderLayout
                title="角色授权"
                content="您可以给系统预置好的一些角色授予一定的功能权限。"
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
                            <Col span={12}>
                                <Tree
                                    selectedKeys={roleTreeSelectedKeys}
                                    onSelect={this.onRoleTreeSelect}
                                    defaultExpandedKeys={["0"]}
                                >
                                    {loopRoleList(roleList)}
                                </Tree>
                            </Col>
                            <Col span={12}>
                                <Tree
                                    checkable={true}
                                    checkedKeys={functionTreeCheckedKeys}
                                    onCheck={onFunctionTreeCheck}
                                    expandedKeys={functionExpandedKeys}
                                    onExpand={functionTreeExapand}
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
        roleFunction: state.roleFunction,
    }
}, (dispatch) => {
    return { roleFunctionActions: bindActionCreators(roleFunctionActions, dispatch) }
})(RoleFunction);