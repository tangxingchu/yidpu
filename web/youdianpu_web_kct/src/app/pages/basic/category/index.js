import React, { Fragment, Component } from 'react';
import { Card, message, Button, Divider, Table, Popconfirm, Tooltip } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import CreateForm from './createForm';
import goodsCategoryActions from '../../../actions/goodsCategory';
import { getUid, getToken } from '../../../utils/authority';

import styles from './index.less'

class Category extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.preOpreation = null;
    }

    componentDidMount() {
        const { categoryList } = this.props.goodsCategory;
        if (categoryList.length === 0) {
            this.list();
        }
        ipcRenderer.on("syncGoodsCategory-reply", (event, arg) => {
            if(arg.success) {
                message.success(arg.message);
            } else {
                message.error(arg.message);
            }
            this.props.goodsCategoryActions.syncSuccess();
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("syncGoodsCategory-reply");
    }

    list = () => {
        this.props.goodsCategoryActions.list({});
    }

    handleModalVisible = (flag, operation) => {
        //保证编辑 取消之后 在添加显示的不是脏数据
        if (flag) {
            if (this.preOpreation != operation && operation) {
                this.props.goodsCategoryActions.resetFields();
            }
            this.preOpreation = operation;
        }
        this.setState({ modalVisible: !!flag });
    }

    save = (values, callback) => {
        this.props.goodsCategoryActions.save({ ...values, merchantId: getUid() }).then((id) => {
            message.success("分类保存成功");
            this.props.goodsCategoryActions.list({});
            this.handleModalVisible(false);
            callback();
            //保存至本地
            ipcRenderer.send('saveGoodsCategory', { ...values, id, merchantId: getUid() });
        });
    }

    update = (values, callback) => {
        this.props.goodsCategoryActions.update({ ...values, merchantId: getUid() }).then(() => {
            message.success("分类修改成功");
            this.handleModalVisible(false);
            callback();
            //同时修改本地数据
            ipcRenderer.send('updateGoodsCategory', { ...values, merchantId: getUid() });
        });
    }

    selectById = (id) => {
        this.props.goodsCategoryActions.selectById(id).then(data => {
            this.handleModalVisible(true);
        });
    }

    deleteCategory = (id) => {
        this.props.goodsCategoryActions.deleteCategory({ id }).then(() => {
            message.success("分类删除成功");
            //删除本地缓存
            ipcRenderer.send("deleteGoodsCategory", {id});
        });
    }

    syncCategory = () => {
        ipcRenderer.send("syncGoodsCategory", {token: getToken()});
        this.props.goodsCategoryActions.syncPending();
    }

    render() {

        const columns = [
            {
                title: '分类名称',
                dataIndex: 'categoryName',
                key: 'categoryName',
            },
            {
                title: '分类描述',
                dataIndex: 'categoryDesc',
                key: 'categoryDesc',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => { this.deleteCategory(record.id) }}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => { this.selectById(record.id) }}>编辑</a>
                    </Fragment>
                ),
            },
        ];
        const { modalVisible } = this.state;
        const { categoryList, saveLoading, categoryData, loading, syncLoading } = this.props.goodsCategory;
        const { fieldChangeValue, resetFields } = this.props.goodsCategoryActions;

        return (
            <PageHeaderLayout
                title="商品分类管理"
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
                            <Tooltip placement="top" title={"什么时候需要同步云端数据？答：当您在浏览器端进行了增、删、改商品分类操作。"}>
                                <Button icon="cloud-o" loading={syncLoading} onClick={() => this.syncCategory()}>
                                    同步云端数据至本地
                                </Button>
                            </Tooltip>
                        </div>
                        <Table rowKey={record => record.id}
                            columns={columns}
                            loading={loading}
                            dataSource={categoryList} />
                    </div>
                </Card>
                <CreateForm modalVisible={modalVisible}
                    confirmLoading={saveLoading}
                    {...categoryData}
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
        goodsCategory: state.goodsCategory,
    }
}, (dispatch) => {
    return { goodsCategoryActions: bindActionCreators(goodsCategoryActions, dispatch) }
})(Category);