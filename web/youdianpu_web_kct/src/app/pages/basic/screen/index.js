import React, { Fragment, Component } from 'react';
import { Card, message, Button, Divider, Table, Popconfirm, Menu, Dropdown, Icon, Tooltip } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import CreateForm from './createForm';
import screenActions from '../../../actions/screen';
import { getUid, getToken } from '../../../utils/authority';

import styles from './index.less'

class Screen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.preOpreation = null;
    }

    componentDidMount() {
        const { screenList } = this.props.screen;
        if (screenList.length === 0) {
            this.list();
        }
        ipcRenderer.on("syncFloor-reply", (event, arg) => {
            if(arg.success) {
                message.success(arg.message);
            } else {
                message.error(arg.message);
            }
            this.props.screenActions.syncSuccess();
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("syncFloor-reply");
    }

    list = () => {
        this.props.screenActions.list({});
    }

    handleModalVisible = (flag, operation) => {
        //保证编辑 取消之后 在添加显示的不是脏数据
        if (flag) {
            if (this.preOpreation != operation && operation) {
                this.props.screenActions.resetFields();
            }
            this.preOpreation = operation;
        }
        this.setState({ modalVisible: !!flag });
    }

    save = (values, callback) => {
        this.props.screenActions.save({ ...values, merchantId: getUid() }).then((id) => {
            message.success("场地保存成功");
            this.props.screenActions.list({});
            this.handleModalVisible(false);
            callback();
            //保存至本地
            ipcRenderer.send('saveFloor', { ...values, id, merchantId: getUid() });
        });
    }

    update = (values, callback) => {
        this.props.screenActions.update({ ...values, merchantId: getUid() }).then(() => {
            message.success("场地修改成功");
            this.handleModalVisible(false);
            callback();
            //同时修改本地数据
            ipcRenderer.send('updateFloor', { ...values, merchantId: getUid() });
        });
    }

    selectById = (id) => {
        this.props.screenActions.selectById(id).then(data => {
            this.handleModalVisible(true);
        });
    }

    deleteScreen = (id) => {
        this.props.screenActions.deleteScreen({ id }).then(() => {
            message.success("场地删除成功");
            //删除本地缓存
            ipcRenderer.send("deleteFloor", {id});
        });
    }

    openFloorDesign = (id) => {
        ipcRenderer.send("openFloorPlan", {id});
        // window.open(`/floorPlan.html?floor=${id}`);
    }

    copy = (sourceFloorId, targetFloorId) => {
        this.props.screenActions.copy(sourceFloorId, targetFloorId).then(() => {
            message.success("复制成功");
        }).catch(e => message.error(e));
    }

    updateStatus = (id, status) => {
        this.props.screenActions.update({ id, status: status === 1 ? 0 : 1, merchantId: getUid() }).then(() => {
            if (status === 1) {
                message.success("场地停用成功");
            } else {
                message.success("场地启用成功");
            }
            ipcRenderer.send("updateFloorStatus", {id, status: status === 1 ? 0 : 1});    
        });
    }

    syncScreen = () => {
        this.props.screenActions.syncPending();
        ipcRenderer.send("syncFloor", {token: getToken()});
    }

    render() {
        const { modalVisible } = this.state;
        const { screenList, saveLoading, screenData, loading, syncLoading } = this.props.screen;
        const { fieldChangeValue, resetFields } = this.props.screenActions;

        const menu = ({ record }) => {
            return (
                <Menu>
                    {
                        screenList.map(item => {
                            if (item.id !== record.id) {
                                return (
                                    <Menu.Item key={item.id}>
                                        <Popconfirm title="会覆盖现有的平面图设计,复制完之后请重新打开平面图设计并设置桌台编号。确定复制吗？" okText="确定" cancelText="取消" onConfirm={() => { this.copy(item.id, record.id) }}>
                                            <a href="javascript:;">复制[<strong>{item.floorName}</strong>]的平面设计图</a>
                                        </Popconfirm>
                                    </Menu.Item>
                                )
                            }
                        })
                    }
                </Menu>
            )
        };

        const MoreBtn = (record) => {
            return (
                <Dropdown overlay={menu(record)}>
                    <a>
                        复制 <Icon type="down" />
                    </a>
                </Dropdown>
            )
        };

        const columns = [
            {
                title: '场地名称',
                dataIndex: 'floorName',
                key: 'floorName',
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {
                    if (record.status == 1) {
                        return <span>正常使用</span>
                    } else {
                        return <span style={{ color: '#ff4d4f' }}>暂停使用</span>
                    }
                }
            },
            {
                title: '场地描述',
                dataIndex: 'floorDesc',
                key: 'floorDesc',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => { this.deleteScreen(record.id) }}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => { this.updateStatus(record.id, record.status) }}>
                            {
                                record.status === 1 ? "停用" : "启用"
                            }
                        </a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => { this.selectById(record.id) }}>编辑</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => { this.openFloorDesign(record.id) }}>设计平面图</a>
                        <Divider type="vertical" />
                        <MoreBtn record={record} />
                    </Fragment>
                ),
            },
        ];

        return (
            <PageHeaderLayout
                title="场地管理"
                content="场地管理，可以是楼层、区间、区域等等。另外还可以轻松设计场地平面图(平面图之间可以合并，复制)。"
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}></div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, 'add')}>
                                新增
                            </Button>
                            <Button icon="reload" onClick={() => this.list()}>
                                刷新
                            </Button>
                            <Tooltip placement="top" title={"什么时候需要同步云端数据？答：当您在浏览器端进行了增、删、改场地操作。"}>
                                <Button icon="cloud-o" loading={syncLoading} onClick={() => this.syncScreen()}>
                                    同步云端数据至本地
                                </Button>
                            </Tooltip>
                        </div>
                        <Table rowKey={record => record.id}
                            loading={loading}
                            columns={columns}
                            dataSource={screenList}
                        />
                    </div>
                </Card>
                <CreateForm modalVisible={modalVisible}
                    confirmLoading={saveLoading}
                    {...screenData}
                    handleModalVisible={this.handleModalVisible}
                    handleAdd={this.save}
                    handleUpdate={this.update}
                    resetFields={resetFields}
                    fieldChangeValue={fieldChangeValue}
                >
                </CreateForm>
            </PageHeaderLayout>
        )
    }

}


export default connect((state) => {
    return {
        screen: state.screen,
    }
}, (dispatch) => {
    return { screenActions: bindActionCreators(screenActions, dispatch) }
})(Screen);