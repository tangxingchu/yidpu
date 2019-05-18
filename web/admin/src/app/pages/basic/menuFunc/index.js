import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Form, Input, Button, InputNumber, Dropdown, Menu, Icon, Modal, message, Divider, Table, Popconfirm, Tree, Select, Spin } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import menuFuncActions from '../../../actions/menuFunc';
import dictionaryActions from '../../../actions/dictionary';
import styles from './index.less';
import CreateForm from './createForm';

const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;

class MenuFunction extends Component {

    constructor(props) {
        super(props);
        this.defaultCategory = "1";//默认行业类型
    }

    componentDidMount() {
        this.props.menuFuncActions.queryDict(["DICT_MERCHANT_CATEGORY", "DICT_MERCHANT_GRADE", "DICT_MERCHANT_FUNCTION_TYPE"]);
        this.props.menuFuncActions.listFunctionTree(this.defaultCategory);
    }

    onRightClick = ({ event, node }) => {
        this.node = node.props.dataRef;
    }

    onTreeSelect = (selectedKeys, obj) => {
        const id = obj.node.props.dataRef.id;
        if (id == "1") return;
        this.props.menuFuncActions.selectById(id);
    }

    selectOnChange = (value) => {
        this.props.menuFuncActions.listFunctionTree(value);
    }

    handlerMenuClick = ({ parentId, id, type, item, key, keyPath, domEvent }) => {
        domEvent.stopPropagation();
        switch (key) {
            case "newFunction": this.props.menuFuncActions.addFunction(this.node); break;
            case "delete":
                confirm({
                    title: '提示',
                    content: '确定删除该菜单吗?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.props.menuFuncActions.deleteFunction(this.node.id).then(() => {
                            message.success("菜单删除成功.");
                            this.props.menuFuncActions.listFunctionTree(this.defaultCategory);
                        });
                    },
                });
                
                break;
        }
    }

    contextMenu = (item) => {
        if (item.id != "1") {
            return (
                <Menu onClick={this.handlerMenuClick}>
                    <Menu.Item key="newFunction" ><Icon type="file" />&nbsp;新建菜单</Menu.Item>
                    <Menu.Item key="delete" ><Icon type="delete" />&nbsp;删除菜单</Menu.Item>
                </Menu>
            );
        } else {
            return (
                <Menu onClick={this.handlerMenuClick}>
                    <Menu.Item key="newFunction" ><Icon type="file" />&nbsp;新建菜单</Menu.Item>
                </Menu>
            );
        }
    }

    renderTitle = (item) => {
        const { dictItemMap } = this.props.menuFunc;
        let functionTypeName = "";
        if (dictItemMap['DICT_MERCHANT_FUNCTION_TYPE']) {
            console.log(dictItemMap['DICT_MERCHANT_FUNCTION_TYPE']);
            const dictItem = dictItemMap['DICT_MERCHANT_FUNCTION_TYPE'].filter(dict => parseInt(dict.itemValue) === parseInt(item.functionType));
            functionTypeName = `(${dictItem[0].itemName})`;
        }
        return (
            <Dropdown overlay={this.contextMenu(item)} trigger={['contextMenu']}>
                <span >{item.functionName}{functionTypeName}</span>
            </Dropdown>
        );
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={this.renderTitle(item)} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={this.renderTitle(item)} key={item.id} dataRef={item} />;
        });
    }

    saveFunction = (values) => {
        this.props.menuFuncActions.saveFunction(values).then(() => {
            message.success("菜单保存成功");
            this.props.menuFuncActions.listFunctionTree(this.defaultCategory);
        });
    }

    updateFunction = (values) => {
        this.props.menuFuncActions.updateFunction(values).then(() => {
            message.success("菜单修改成功");
            this.props.menuFuncActions.listFunctionTree(this.defaultCategory);
        });
    }

    render() {
        const { treeData, functionData, saveLoading, parentFunction, dictItemMap } = this.props.menuFunc;
        const { fieldChangeValue } = this.props.menuFuncActions;
        const title = (
            <Fragment>
                <Select defaultValue={this.defaultCategory} className={styles.select} onChange={this.selectOnChange}>
                    {dictItemMap["DICT_MERCHANT_CATEGORY"] ? dictItemMap["DICT_MERCHANT_CATEGORY"].map(item => {
                        return <Option key={item.id} value={item.itemValue}>{item.itemName}</Option>
                    }) : null}
                </Select>
            </Fragment>
        );

        return (
            <PageHeaderLayout
                title="菜单功能管理"
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title={title}>
                            {treeData.length
                                ? <Tree showLine
                                    onRightClick={this.onRightClick}
                                    onSelect={this.onTreeSelect}
                                    defaultExpandedKeys={["1"]}
                                >
                                    {this.renderTreeNodes(treeData)}
                                </Tree>
                                : <Spin />
                            }
                        </Card>
                    </Col>
                    <Col span={16}>
                        <CreateForm {...functionData}
                            fieldChangeValue={fieldChangeValue}
                            saveLoading={saveLoading}
                            parentFunction={parentFunction}
                            saveFunction={this.saveFunction}
                            updateFunction={this.updateFunction}
                            dictItemMap={dictItemMap}
                        />
                    </Col>
                </Row>
            </PageHeaderLayout>
        );
    }

}

export default connect((state) => {
    return {
        menuFunc: state.menuFunc,
    }
}, (dispatch) => {
    return {
        menuFuncActions: bindActionCreators(menuFuncActions, dispatch),
    }
})(MenuFunction);