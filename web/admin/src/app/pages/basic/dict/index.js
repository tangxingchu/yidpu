import React, { Fragment, Component } from 'react';
import { Row, Col, Card, Form, Input, Button, InputNumber, Modal, message, Divider, Table, Popconfirm } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import SearchForm from './searchForm';
import DictItem from './dictItem';
import dictionaryActions from '../../../actions/dictionary';
import styles from './index.less'

const FormItem = Form.Item;
const { TextArea } = Input;

class CreateForm extends Component {
    
    componentDidMount() {

    }

    render() {
        const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, confirmLoading } = this.props;
        const { getFieldDecorator, getFieldValue, getFieldError, getFieldsError } = this.props.form;
        const isUpdate = !!this.props.id.value;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                if(isUpdate) {
                    handleUpdate(fieldsValue, ()=>{
                        form.resetFields()
                    });
                } else {
                    handleAdd(fieldsValue, ()=>{
                        form.resetFields()
                    });
                }                
            });
        };
        /** redux 与 onFieldsChange 会校验提示显示不出来,
         * https://github.com/ant-design/ant-design/issues/3794
         * 那就手动显示错误信息吧
         */
        let dictCodeError = null;
        if (this.props.dictCode.errors) {
            dictCodeError = this.props.dictCode.errors[0].message;
        }
        let dictNameError = null;
        if (this.props.dictName.errors) {
            dictNameError = this.props.dictName.errors[0].message;
        }
        return (
            <Modal
                title={isUpdate ? "编辑字典" :"新建字典"}
                visible={modalVisible}
                okText="保存"
                onOk={okHandle}
                confirmLoading={confirmLoading}
                cancelText="取消"
                onCancel={() => {form.resetFields();handleModalVisible()}}
            >
                <FormItem style={{display: 'none'}}>
                    {form.getFieldDecorator('id')(<Input disabled/>)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典代码"
                    help={dictCodeError ? dictCodeError : ''}
                    validateStatus={dictCodeError ? 'error' : ''}>
                    {form.getFieldDecorator('dictCode', {
                        rules: [{ required: true, message: '请输入字典代码' }],
                    })(<Input placeholder="请输入字典代码" autoFocus />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典名称"
                    help={dictNameError ? dictNameError : ''}
                    validateStatus={dictNameError ? 'error' : ''}>
                    {form.getFieldDecorator('dictName', {
                        rules: [{ required: true, message: '请输入字典名称' }],
                    })(<Input placeholder="请输入字典名称" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序">
                    {form.getFieldDecorator('sortNo')(<InputNumber placeholder="排序" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
                    {form.getFieldDecorator('remark')(<TextArea rows={4} placeholder="备注" />)}
                </FormItem>
            </Modal>
        );
    }

}

const CreateFormWarpper = Form.create({
    onFieldsChange(props, changedFields) {
        props.createFormfieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            id: Form.createFormField({
                value: props.id.value,
            }),
            dictName: Form.createFormField({
                value: props.dictName.value,
            }),
            dictCode: Form.createFormField({
                value: props.dictCode.value,
            }),
            sortNo: Form.createFormField({
                value: props.sortNo.value,
            }),
            remark: Form.createFormField({
                value: props.remark.value,
            }),
        }
    }
})(CreateForm);

class Dictionary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            itemModalVisible: false,
            searchFields: { dictCode: { value: "" }, dictName: { value: "" } },
        }
    }

    componentDidMount() {
        this.queryDictionary();
    }

    queryDictionary = () => {
        const { dictCode, dictName } = this.state.searchFields;
        this.props.dictionaryActions.queryDictionary(dictCode.value, dictName.value);
    }

    handleAdd = (fieldsValue, callback) => {
        return this.props.dictionaryActions.addDictionary(fieldsValue).then(() => {
            message.success('字典添加成功');
            this.setState({ modalVisible: false });
            callback();
            this.queryDictionary();
        });
    }

    handleUpdate = (fieldsValue, callback) => {
        return this.props.dictionaryActions.updateDict(fieldsValue).then(() => {
            message.success('字典修改成功');
            this.setState({ modalVisible: false });
            callback();
        });
    }

    deleteDict = (id) => {
        this.props.dictionaryActions.deleteDict(id).then(() => {
            message.success('字典删除成功');
        });
    }

    selectById = (id) => {
        this.props.dictionaryActions.selectById(id).then(() => {
            this.setState({ modalVisible: true });
        });
    }

    selectItemByDictCode = (dict) => {
        this.dict = dict;
        this.setState({ itemModalVisible: true });
        this.props.dictionaryActions.listItem(dict.dictCode);
    }

    handleModalVisible = (flag) => {
        this.setState({ modalVisible: !!flag });
    }

    handleItemModalVisible = (flag) => {
        this.setState({ itemModalVisible: !!flag });
    }

    fieldChangeValue = (values) => {
        const searchFields = {...this.state.searchFields, ...values};
        this.setState({searchFields});
    }

    render() {
        const columns = [{
            title: '字典代码',
            dataIndex: 'dictCode',
            key: 'dictCode',
        }, {
            title: '字典名称',
            dataIndex: 'dictName',
            key: 'dictName',
        }, {
            title: '排序',
            dataIndex: 'sortNo',
            key: 'sortNo',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }, {
            title: '操作',
            key: 'action',
            render: (record) => (
                <Fragment>
                    <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => {this.deleteDict(record.id)}}>
                        <a href="javascript:;">删除</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={() => {this.selectById(record.id)}}>编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={() => {this.selectItemByDictCode(record)}}>编辑子项</a>
                </Fragment>
            ),
        }];
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
        };
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            handleUpdate: this.handleUpdate,
        };

        const { listData, loading, saveLoading, itemLoading, listItemData, dictData } = this.props.dictionary;
        const { modalVisible, itemModalVisible, searchFields } = this.state;
        const { createFormfieldChangeValue } = this.props.dictionaryActions;
        const { dictionaryActions } = this.props;

        return (
            <PageHeaderLayout
                title="字典管理"
            >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            <SearchForm {...searchFields} 
                                handleSubmit={this.queryDictionary}
                                fieldChangeValue={this.fieldChangeValue}
                            />
                        </div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新增
                            </Button>
                        </div>
                        <Table rowKey={record => record.id}
                            loading={loading}
                            columns={columns}
                            dataSource={listData}
                            pagination={paginationProps}
                        />
                    </div>
                </Card>
                <CreateFormWarpper {...parentMethods}
                    {...dictData}
                    modalVisible={modalVisible}
                    createFormfieldChangeValue={createFormfieldChangeValue}
                    confirmLoading={saveLoading}
                />
                <DictItem modalVisible={itemModalVisible}
                    loading={itemLoading}
                    listData={listItemData}
                    dict={this.dict}
                    handleItemModalVisible={this.handleItemModalVisible}
                    {...dictionaryActions}
                />
            </PageHeaderLayout>
        )
    }

}


export default connect((state) => {
    return {
        dictionary: state.dictionary,
    }
}, (dispatch) => {
    return { dictionaryActions: bindActionCreators(dictionaryActions, dispatch) }
})(Dictionary);