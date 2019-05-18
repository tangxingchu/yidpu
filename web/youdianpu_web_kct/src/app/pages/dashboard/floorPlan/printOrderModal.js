import React, { Component, Fragment } from 'react';
import { Modal, Table, message, notification } from 'antd';
import { ipcRenderer } from 'electron';

export default class PrintOrderModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            printOrderLoading: false,
        }
    }

    okHandle = () => {
        const selectedRows = this.state.selectedRows;
        if(selectedRows.length == 0) {
            message.info("没有需要打印的项");
            return;
        }
        this.setState({printOrderLoading: true});
        const orderList = this.props.orderList;
        const data = orderList[0];
        let cart = {
            orderNo: data.orderNo,
            tableCode: data.tableCode,
            dinersNum: data.dinersNum,
            orderTime: data.orderTime,
            cartItem: [],
        };
        const orderItemIds = [];
        selectedRows.forEach(orderItem => {
            let cartItem = {};
            cartItem.name = orderItem.goodsName;
            cartItem.price = orderItem.price;
            cartItem.itemPrice = orderItem.price * parseInt(orderItem.num);
            cartItem.num = orderItem.num;
            cartItem.unitName = orderItem.goodsUnitName;
            if(orderItem.ruleCode == "1") {
                cartItem.dayOrDiscountName = '特价';
            } else if(orderItem.ruleCode == "2") {
                cartItem.dayOrDiscountName = `${orderItem.ruleValue}折`;
            }
            cartItem.extraItemNames = orderItem.extraName;
            cartItem.remark = orderItem.remark;
            cart.cartItem.push(cartItem);
            cart.orderTime = orderItem.orderItemTime;
            orderItemIds.push(orderItem.id);
        });
        //后厨打印用餐订单明细
        ipcRenderer.on('printOrder-reply', (event, arg) => {
            if(arg.success) {
                //修改订单打印状态
                this.props.updatePrintStatusByOrderItemIds(orderItemIds);
                message.success("成功发往后厨打印");
            } else {
                // message.error(`后厨用餐订单明细打印失败,${arg.message}`);
                notification['error']({
                    message: `后厨打印用餐订单明细失败,${arg.message}`,
                    duration: null,
                });
            }
            ipcRenderer.removeAllListeners("printOrder-reply");
            this.setState({printOrderLoading: false});
        });
        ipcRenderer.send('printOrder', {cart});
    }

    render() {
        const { printOrderLoading } = this.state;
        const { visible, handleModalVisible, loading, orderList = []} = this.props;
        let dataSource = [];
        orderList.map(order => {
            dataSource = dataSource.concat(order.orderItemVos);
        });
        // orderList.length == 0 ? [] : orderList[0].orderItemVos;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({selectedRows: selectedRows});
            },
        };
        const columns = [{
            title: '菜名',
            dataIndex: 'goodsName',
            key: 'goodsName',
        }, {
            title: '数量',
            dataIndex: 'num',
            key: 'num',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }, {
            title: '是否已打印',
            dataIndex: 'printStatus',
            key: 'printStatus',
            render: (text) => {
                if(text == "1") {
                    return <span>已发往打印</span>
                } else {
                    return <span>未发往打印</span>
                }
            }
        }];
        return (
            <Modal title={"打印后厨订单明细"}
                visible={visible}
                okText="确定并打印"
                onOk={this.okHandle}
                width={600}
                cancelText="取消"
                onCancel={() => { handleModalVisible() }}
                confirmLoading={printOrderLoading}
            >
                <Table rowKey={record => record.id}
                    loading={loading}
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                    size={"middle"}
                    locale={
                        {emptyText: '查无数据'}
                    }
                    pagination={false}
                >
                </Table>
            </Modal>
        );
    }

}