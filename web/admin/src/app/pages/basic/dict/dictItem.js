import React, { Fragment, Component } from 'react';
import { Form, Input, Button, InputNumber, Modal, message, Divider, Table, Popconfirm } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} ></tr>
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };
    render() {
        const {
            required,
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: required,
                                            message: `请输入${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

export default class DictItem extends Component {

    constructor(props) {
        super(props);
        this.state = { editingId: '' };
        this.columns = [{
            title: '字典项代码',
            dataIndex: 'itemCode',
            key: 'itemCode',
            editable: true,
            required: true,
        }, {
            title: '字典项名称',
            dataIndex: 'itemName',
            key: 'itemName',
            editable: true,
            required: true,
        }, {
            title: '字典项值',
            dataIndex: 'itemValue',
            key: 'itemValue',
            editable: true,
            required: true,
        }, {
            title: '排序',
            dataIndex: 'sortNo',
            key: 'sortNo',
            editable: true,
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            editable: true,
        }, {
            title: '操作',
            width: 120,
            key: 'action',
            render: (text, record) => {
                const editable = this.isEditing(record);
                return (
                    <Fragment>
                        {editable ?
                            (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a href="javascript:;"
                                                onClick={() => this.save(form, record.id)}
                                                style={{ marginRight: 8 }}
                                            >
                                                保存
                                            </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="确定取消吗?"
                                        okText="确定"
                                        cancelText="取消"
                                        onConfirm={() => this.cancel(record.id, record.isNewData)}
                                    >
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                <Fragment>
                                    <a href="#" onClick={() => { this.edit(record.id) }}>编辑</a>
                                    <Divider type="vertical" />
                                    <Popconfirm title="确定删除吗？" okText="确定" cancelText="取消" onConfirm={() => { this.deleteDict(record.id) }}>
                                        <a href="#">删除</a>
                                    </Popconfirm>
                                </Fragment>
                            )}
                    </Fragment>
                );
            },
        }];
    }

    isEditing = (record) => {
        return record.id === this.state.editingId;
    };

    cancel = (id, isNewData) => {
        this.setState({ editingId: '' });
        if (isNewData) {
            this.props.removeItemRow(id);
        }
    };

    edit = (id) => {
        this.setState({ editingId: id });
    }

    save = (form, id) => {
        const { dictCode } = this.props.dict;
        const dictId = this.props.dict.id;
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            if(id > 0) {//修改
                const newUpdateRow = {...row, id};
                this.props.updateDictItem(newUpdateRow).then(() => {
                    this.setState({ editingId: '' });
                }).then(() => {
                    message.success("修改成功.");
                });
            } else {
                const newAddRow = {...row, dictCode, dictId};
                this.props.addDictItem(newAddRow).then(() => {
                    message.success("保存成功.");
                    this.setState({ editingId: '' });
                    this.props.listItem(dictCode);
                });
            }
        });
    }

    deleteDict = (id) => {
        this.props.deleteDictItem(id).then(() => {
            message.success("删除成功.");
        });
    }

    handleAdd = () => {
        const count = this.props.listData.length;
        const dictCode = this.props.dictCode;
        const newData = {
            id: -count,
            itemCode: "",
            itemName: "",
            itemValue: "",
            sortNo: 1,
            remark: "",
            isNewData: true,
        };
        this.props.addItemRow(newData).then(() => {
            this.edit(newData.id);
        });
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const { modalVisible, listData, loading, handleItemModalVisible } = this.props;
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'sortNo' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    required: col.required ? true : false,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <Modal
                title={"字典数据项"}
                visible={modalVisible}
                footer={[<Button key="close" onClick={() => { handleItemModalVisible() }}>关闭</Button>]}
                width={1000}
                onCancel={() => handleItemModalVisible()}
            >
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
                                新增字典项
                            </Button>
                        </div>
                        <Table rowKey={record => record.id}
                            components={components}
                            loading={loading}
                            columns={columns}
                            dataSource={listData}
                        />
                    </div>
            </Modal>
        );
    }

}