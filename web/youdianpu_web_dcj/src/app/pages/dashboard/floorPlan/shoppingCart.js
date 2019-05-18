import React, { Component, Fragment } from 'react';
import { Table, Input, Button, Popconfirm, Form, InputNumber, Spin } from 'antd';
import numeral from 'numeral';

import styles from './shoppingCart.less';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

    state = {
        editing: false,
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {

            
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber 
                style={{width: 60}}
                min={1}
                ref={node => (this.input = node)}
                onPressEnter={this.save}/>;
        }
        return <Input style={{width: 100}}
            ref={node => (this.input = node)}
            onPressEnter={this.save} />;
    };

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            inputType,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            initialValue: record[dataIndex],
                                        })(this.getInput())}
                                    </FormItem>
                                ) : (
                                        <div
                                            className={styles.editable_cell_value_wrap}
                                            style={{ paddingRight: 24,}}
                                            onClick={this.toggleEdit}
                                        >
                                            {restProps.children}
                                        </div>
                                    )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

export default class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 60,
                render (text, record, index) {
                    return index + 1;
                } 
            },
            {
                title: '商品名称[属性]',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    if(record.dayOrDiscountName) {
                        if(record.extraItemNames) {
                            return <span>{text}<span className={styles.goods_extra}>[{record.extraItemNames}]</span><span className={styles.goods_day}>({record.dayOrDiscountName})</span></span>;
                        } else {
                            return <span>{text}<span className={styles.goods_day}>({record.dayOrDiscountName})</span></span>;
                        }
                    } else {
                        if(record.extraItemNames) {
                            return <span>{text}<span className={styles.goods_extra}>[{record.extraItemNames}]</span></span>;
                        } else {
                            return <span>{text}</span>;
                        }
                    }
                } 
            },
            {
                title: '原价',
                dataIndex: 'origPrice',
                key: 'origPrice',
                width: 80,
                render: (text, record) => (
                    <span>￥{numeral(record.origPrice).format('0,0.00')}</span>
                )
            },
            {
                title: '现价',
                dataIndex: 'price',
                key: 'price',
                width: 80,
                render: (text, record) => (
                    <span>￥{numeral(record.price).format('0,0.00')}</span>
                )
            },
            {
                title: '数量',
                dataIndex: 'num',
                key: 'num',
                width: 70,
                editable: true,
            },
            {
                title: '小计',
                dataIndex: 'itemPrice',
                key: 'itemPrice',
                width: 70,
                render: (text, record) => (
                    <span>￥{numeral(record.itemPrice).format('0,0.00')}</span>
                )
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                editable: true,
            },
            {
                title: '操作',
                key: 'action',
                width: 60,
                render: (text, record) => {
                    return (<Fragment>
                        <a href="javascript:;" onClick={() => { this.props.deleteShoppingCart(record.id) }}>取消</a>
                    </Fragment>)
                }
            },
        ];

        this.state = {
            dataSource: [],
            count: 2,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    handleSave = (row) => {
        this.props.updateShoppingCart(row);
    }


    render() {
        const { dataSource, cartLoading } = this.props;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => {
                    return ({
                        record,
                        inputType: col.dataIndex === 'num' ? 'number' : 'text',
                        editable: col.editable,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        handleSave: this.handleSave,
                    })
                },
            };
        });
        const footer = () => {
            let totalPrice = 0;
            dataSource.forEach(item => {
                totalPrice += item.itemPrice;
            });
            return (
                <div className={styles.total}>总计: ￥{numeral(totalPrice).format('0,0.00')}</div>
            )
        }
        return (
            <Spin spinning={cartLoading}>
                <Table
                    rowKey={record => record.id}
                    components={components}
                    rowClassName={() => `${styles.editable_row}`}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    footer={footer}
                    size={"middle"}
                />
            </Spin>
        );
    }

}