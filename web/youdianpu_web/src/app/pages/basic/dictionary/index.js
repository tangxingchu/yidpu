import React, { Fragment, Component } from 'react';
import { Card, Row, Col, Collapse, Icon, Tooltip, Tree, Button, Table, Divider, Popconfirm, Dropdown, Menu, message, Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import dictionaryActions from '../../../actions/dictionary';
import CreateExtraForm from './createExtraForm';
import CreateExtraItemForm from './createExtraItemForm';
import styles from './index.less';
import { getUid, getToken } from '../../../utils/authority';

const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode;

class Dictionary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            itemModalVisible: false,
            fieldName: null,
            updateOrAdd: null,
        }
    }

    componentDidMount() {
        if (this.props.dictionary.dictList.length === 0 && this.props.dictionary.extraList.length === 0) {
            this.props.dictionaryActions.listDict({});
        }
        ipcRenderer.on("syncDictionaryItem-reply", (event, arg) => {
            if(arg.success) {
                message.success(arg.message);
            } else {
                message.error(arg.message);
            }
            this.props.dictionaryActions.syncDictItemSuccess();
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("syncDictionaryItem-reply");
    }

    handleModalVisible = (flag, updateOrAdd) => {
        this.setState({ modalVisible: !!flag, updateOrAdd });
    }

    handleItemModalVisible = (flag, fieldName, updateOrAdd) => {
        this.setState({ itemModalVisible: !!flag, fieldName:  fieldName || '', updateOrAdd });
    }

    onDictTreeSelect = (selectedKeys, obj) => {
        if(selectedKeys && selectedKeys.length == 1) {
            const dictCode = obj.node.props.dataRef.dictCode;
            this.props.dictionaryActions.onDictTreeSelect(selectedKeys);
            if (!this.props.dictionary.itemMap[selectedKeys[0]]) {
                this.props.dictionaryActions.listItem(dictCode);
            }
        }
    }

    onExtraTreeSelect = (selectedKeys, obj) => {
        if(selectedKeys && selectedKeys.length == 1) {
            const dictCode = obj.node.props.dataRef.dictCode;
            this.props.dictionaryActions.onExtraTreeSelect(selectedKeys);
            if (!this.props.dictionary.itemMap[selectedKeys[0]]) {
                this.props.dictionaryActions.listItem(dictCode);
            }
        }
    }

    handlerMenuClick = ({ parentId, id, type, item, key, keyPath, domEvent }) => {
        domEvent.stopPropagation();
        if (key === "delete") {
            Modal.confirm({
                title: '确定删除该商品附属属性吗?',
                content: '使用了该商品附属属性的对应的商品的属性将会被去除。',
                onOk: () => {
                    this.deleteExtra(item.props.id);
                },
            });
        } else {
            this.selectExtraById(item.props.id);
        }
    }

    saveExtra = (values, callback) => {
        this.props.dictionaryActions.saveExtra(values).then((data) => {
            message.success("保存成功");
            this.handleModalVisible(false);
            // this.props.dictionaryActions.onExtraTreeSelect([data.dictCode]);
            this.props.dictionaryActions.listDict({});
            callback();
        });
    }

    saveItem = (values, callback) => {
        const { dictList, extraList, dictSelectedKeys, extraSelectedKeys } = this.props.dictionary;
        if (dictSelectedKeys.length > 0) {
            const dict = dictList.find(item => item.dictCode == dictSelectedKeys[0]);
            values.dictCode = dict.dictCode;
            values.dictId = dict.id;
        } else {
            const extra = extraList.find(item => item.dictCode == extraSelectedKeys[0]);
            values.dictCode = extra.dictCode;
            values.dictId = extra.id;
        }
        this.props.dictionaryActions.saveItem(values).then(() => {
            message.success("保存成功");
            this.handleItemModalVisible(false);
            callback();
            // ipcRenderer.send('', values);
        });
    }

    deleteDictItem = (id, dictCode) => {
        this.props.dictionaryActions.deleteItem({ id, dictCode }).then(() => {
            message.success("删除成功");
        });
    }

    deleteExtra = (id, dictCode) => {
        this.props.dictionaryActions.deleteExtra({ id, dictCode }).then(() => {
            message.success("删除成功");
        });
    }

    selectExtraById = (id) => {
        this.props.dictionaryActions.selectExtraById(id).then(data => {
            this.handleModalVisible(true);
        });
    }

    selectItemById = (id, fieldName) => {
        this.props.dictionaryActions.selectItemById(id).then(data => {
            this.handleItemModalVisible(true, fieldName);
        });
    }

    updateExtra = (values, callback) => {
        this.props.dictionaryActions.updateExtra({ ...values, merchantId: getUid() }).then(data => {
            message.success("修改成功");
            this.handleModalVisible(false);
            callback();
        });
    }

    updateItem = (values, callback) => {
        this.props.dictionaryActions.updateItem({ ...values, merchantId: getUid() }).then(() => {
            message.success("修改成功");
            this.handleItemModalVisible(false);
            callback();
        });
    }

    updateEnabled = (id, enabled, dictCode) => {
        this.props.dictionaryActions.updateItem({ id, dictCode, enabled: enabled === "1" ? "0" : "1", merchantId: getUid() }).then(() => {
            if (enabled === "1") {
                message.success("禁用成功");
            } else {
                message.success("启用成功");
            }
            // ipcRenderer.send("updateFloorStatus", {id, status: status === 1 ? 0 : 1});    
        });
    }

    reload = () => {
        this.props.dictionaryActions.listDict({}).then(() => {
            const { dictSelectedKeys, extraSelectedKeys } = this.props.dictionary;
            let dictCode = null;
            if (dictSelectedKeys.length > 0) {
                dictCode = dictSelectedKeys[0];
            } else if (extraSelectedKeys.length > 0) {
                dictCode = extraSelectedKeys[0];
            }
            if (dictCode) {
                this.props.dictionaryActions.listItem(dictCode);
            }
        });
    }

    syncDictionary = () => {
        ipcRenderer.send("syncDictionaryItem", {token: getToken()});
        this.props.dictionaryActions.syncDictItemPending();
    }

    render() {
        const { dictList, extraList, loading, itemMap, dictSelectedKeys, saveExtraLoading, saveDictItemLoading, syncLoading,
            extraSelectedKeys, showDictItemTable, showExtraItemTable, extraData, dictItemData } = this.props.dictionary;
        const { saveItem, extraFieldChangeValue, resetExtraFields, itemFieldChangeValue,
            resetItemFields, } = this.props.dictionaryActions;
        const { modalVisible, itemModalVisible, fieldName, updateOrAdd } = this.state;
        const dictItemList = itemMap[dictSelectedKeys[0]] || [];
        const extraItemList = itemMap[extraSelectedKeys[0]] || [];

        const loopDictList = () => dictList.map((item) => {
            return (
                <TreeNode key={item.dictCode} title={`${item.dictName}(公有)`} dataRef={item}>
                </TreeNode>
            );
        });

        const contextMenu = (item) => {
            return (
                <Menu onClick={this.handlerMenuClick}>
                    <Menu.Item key="edit" id={item.id}>
                        <Icon type="edit" />&nbsp;修改
                    </Menu.Item>
                    <Menu.Item key="delete" id={item.id}>
                        <Icon type="delete" />&nbsp;删除
                    </Menu.Item>
                </Menu>
            );
        }

        const renderTitle = (item) => {
            if (item.merchantId === 0) {//公有
                return (
                    <span>{item.dictName}(公有)</span>
                )
            } else {//私有
                return (
                    <Dropdown overlay={contextMenu(item)} trigger={['contextMenu']}>
                        <span>{item.dictName}(私有)</span>
                    </Dropdown>
                )
            }
        }

        const loopExtraList = () => extraList.map((item) => {
            console.log(item.dictCode);
            return (
                <TreeNode key={item.dictCode} title={renderTitle(item)} dataRef={item}></TreeNode>
            );
        });

        const itemColumns = [{
            title: '名称',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: '值',
            dataIndex: 'itemValue',
            key: 'itemValue',
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (text, record) => {
                if (record.enabled === "1") {
                    return (
                        <span>启用</span>
                    );
                } else {
                    return (
                        <span className={styles.disabled}>禁用</span>
                    );
                }
            }
        },
        {
            title: '私有/公有',
            dataIndex: 'private',
            key: 'private',
            render: (text, record) => {
                if (record.merchantId === 0) {
                    return (
                        <span>公有</span>
                    );
                } else {
                    return (
                        <span>私有</span>
                    );
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if (record.merchantId === 0) {
                } else {
                    return (
                        <Fragment>
                            <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => { this.deleteDictItem(record.id, record.dictCode) }}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={() => { this.updateEnabled(record.id, record.enabled, record.dictCode) }}>
                                {
                                    record.enabled === "1" ? "禁用" : "启用"
                                }
                            </a>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={() => { this.selectItemById(record.id, "数据") }}>编辑</a>
                        </Fragment>
                    )
                }
            },
        }];

        const extraColumns = [{
            title: '属性项名称',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: '属性项值',
            dataIndex: 'itemValue',
            key: 'itemValue',
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (text, record) => {
                if (record.enabled === "1") {
                    return (
                        <span>启用</span>
                    );
                } else {
                    return (
                        <span className={styles.disabled}>禁用</span>
                    );
                }
            }
        },
        {
            title: '私有/公有',
            dataIndex: 'private',
            key: 'private',
            render: (text, record) => {
                if (record.merchantId === 0) {
                    return (
                        <span>公有</span>
                    );
                } else {
                    return (
                        <span>私有</span>
                    );
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if (record.merchantId === 0) {
                } else {
                    return (
                        <Fragment>
                            <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => { this.deleteDictItem(record.id, record.dictCode) }}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={() => { this.updateEnabled(record.id, record.enabled, record.dictCode) }}>
                                {
                                    record.enabled === "1" ? "禁用" : "启用"
                                }
                            </a>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={() => { this.selectItemById(record.id, "属性") }}>编辑</a>
                        </Fragment>
                    )
                }
            },
        }];

        const extraTitle = (
            <div>
                商品附属属性
                <span className={styles.tooltip}>(右键属性名编辑、删除)</span>
            </div>
        )


        return (
            <PageHeaderLayout
                title="基础数据管理"
                content="包括自定义计量单位、商品附属属性。公有的基础数据与商品附属属性不允许修改，私有的可以。"
            >
                <Card bordered={false}>
                    <div className={styles.tableListOperator}>
                        <Button icon="reload" onClick={() => this.reload()}>
                            刷新
                        </Button>
                        <Tooltip placement="top" title={"什么时候需要同步云端数据？答：当您在浏览器端进行了增、删、改场地操作。"}>
                            <Button icon="cloud-o" loading={syncLoading} onClick={() => this.syncDictionary()}>
                                同步云端数据至本地
                            </Button>
                        </Tooltip>
                    </div>
                    <Row gutter={24}>
                        <Col span={6} style={{ minWidth: 200 }}>
                            <Collapse defaultActiveKey={['1', '2']}>
                                <Panel showArrow={false} header="基础数据" key="1">
                                    {dictList.length > 0 ?
                                        <Tree
                                            selectedKeys={dictSelectedKeys}
                                            onSelect={this.onDictTreeSelect}
                                        >
                                            {loopDictList()}
                                        </Tree> : <span className={styles.nodata}>暂无数据</span>
                                    }
                                </Panel>
                                <Panel showArrow={false} header={extraTitle} key="2">
                                    <Tooltip title={"新增商品附属属性"}>
                                        <Icon type="plus" className={styles.icon} onClick={() => this.handleModalVisible(true, 'add')} />
                                    </Tooltip>
                                    {extraList.length > 0 ?
                                        <Tree
                                            selectedKeys={extraSelectedKeys}
                                            onSelect={this.onExtraTreeSelect}
                                        >
                                            {loopExtraList()}
                                        </Tree> : <span className={styles.nodata}>暂无数据</span>
                                    }

                                </Panel>
                            </Collapse>
                        </Col>
                        <Col span={18}>
                            {
                                showDictItemTable ?
                                    <Button className={styles.button} type={"primary"} icon={"plus"} onClick={() => this.handleItemModalVisible(true, "数据", 'add')}>添加数据项</Button> : null
                            }
                            {
                                showDictItemTable ?
                                    <Table rowKey={record => record.id}
                                        loading={loading}
                                        columns={itemColumns}
                                        dataSource={dictItemList}
                                        pagination={false}
                                    /> : null
                            }
                            {
                                showExtraItemTable ?
                                    <Button className={styles.button} type={"primary"} icon={"plus"} onClick={() => this.handleItemModalVisible(true, "属性", 'add')}>添加属性项</Button> : null
                            }
                            {
                                showExtraItemTable ?
                                    <Table rowKey={record => record.id}
                                        loading={loading}
                                        columns={extraColumns}
                                        dataSource={extraItemList}
                                        pagination={false}
                                    /> : null
                            }

                        </Col>
                    </Row>
                </Card>

                <CreateExtraForm handleModalVisible={this.handleModalVisible}
                    {...extraData}
                    modalVisible={modalVisible}
                    confirmLoading={saveExtraLoading}
                    handleAdd={this.saveExtra}
                    fieldChangeValue={extraFieldChangeValue}
                    resetFields={resetExtraFields}
                    updateOrAdd={updateOrAdd}
                    handleUpdate={this.updateExtra}
                />

                <CreateExtraItemForm handleModalVisible={this.handleItemModalVisible}
                    {...dictItemData}
                    modalVisible={itemModalVisible}
                    fieldName={fieldName}
                    confirmLoading={saveDictItemLoading}
                    handleAdd={this.saveItem}
                    fieldChangeValue={itemFieldChangeValue}
                    resetFields={resetItemFields}
                    updateOrAdd={updateOrAdd}
                    handleUpdate={this.updateItem}
                />
            </PageHeaderLayout >
        );
    }

}


export default connect((state) => {
    return {
        dictionary: state.dictionary,
    }
}, (dispatch) => {
    return { dictionaryActions: bindActionCreators(dictionaryActions, dispatch) }
})(Dictionary);