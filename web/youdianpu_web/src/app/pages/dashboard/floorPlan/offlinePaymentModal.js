import React, { Component, Fragment } from 'react';
import { InputNumber, Card, Modal, Input, Button, Table, Select, Form, message, Checkbox } from 'antd';
import styles from './shoppingCart.less';
import { ipcRenderer } from 'electron';
import { getSub } from '../../../utils/authority';
import numeral from 'numeral';

class OfflinePaymentModal extends Component {

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
        ];
        this.state = {
            receivedAmount: null,
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
    }

    onReceviedAmountChange = (value) => {
        this.setState({receivedAmount: value});
    }

    handleSubmit = () => {
        const { receivedAmount } = this.state;
        const { tableCode } = this.props;
        this.props.form.validateFields((err, values) => {
            if(err) return;
            let cashierLog = {tableCode, cashierAmount: receivedAmount || this.totalPrice, 
                cashierMethod: values.payMethod, remark: values.remark, operationStaff: getSub()};
            ipcRenderer.send('saveCashierLog', cashierLog);
            message.success("离线收银成功");
            this.props.handleModalVisible(false);
        });
    }

    render() {
        const { receivedAmount } = this.state;
        const { dataSource = [], tableCode, visible, handleModalVisible, currentSubtracts } = this.props;
        const footer = () => {
            let totalPrice = 0;
            dataSource.forEach(item => {
                totalPrice += item.itemPrice;
            });
            return (
                <div className={styles.total}>总计: ￥{numeral(totalPrice).format('0,0.00')}</div>
            )
        }
        const callPayPrice = () => {
            let totalPrice = 0;
            dataSource.forEach(item => {
                totalPrice += item.itemPrice;
            });
            //减免与折扣折扣
            currentSubtracts.map(subtract => {
                if(subtract.type == 3) {
                    // noticeStr += `赠现金券￥${numeral(subtract.amount2).format('0,0')}元。`;
                } else if(subtract.type == 2) {
                    // noticeStr += `享${subtract.discount}折优惠。`
                    totalPrice = totalPrice * subtract.discount * 0.1;
                } else {
                    // noticeStr += `减￥${numeral(subtract.amount1).format('0,0')}元。`
                    totalPrice = totalPrice - subtract.amount1;
                }
            })
            this.totalPrice = totalPrice;
            return totalPrice;
        }
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 4 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 20 },
              sm: { span: 20 },
            },
        };
        return(
            <Modal
                visible={visible}
                title={`离线单收银,已下单列表(桌台${tableCode})`}
                width={800}
                footer={[
                    <Button key="close" onClick={() => handleModalVisible(false)}>关闭</Button>,
                    <Button key="ok" type={"primary"} onClick={() => this.handleSubmit()}>确认收银</Button>,
                ]}
                onCancel={() => handleModalVisible(false)}
            >
                <Table
                    rowKey={record => record.id}
                    dataSource={dataSource}
                    columns={this.columns}
                    pagination={false}
                    footer={footer}
                    size={"middle"}
                />
                {
                    currentSubtracts.map(subtract => {
                        return (
                            <div key={subtract.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                { subtract.type == 3 ? null : <Checkbox checked={true}/>}
                                {
                                    subtract.constraintType == 2 ? <div style={{paddingLeft: 4, paddingRight: 8}}>每天:{subtract.constraintTimeStart}-{subtract.constraintTimeEnd}</div>
                                    : <div style={{paddingLeft: 4, paddingRight: 8}}>消费满
                                        <span style={{paddingLeft: 2, color: '#ff4242', fontSize: 18}}>
                                            ￥{numeral(subtract.consumePrice).format('0,0.00')}
                                        </span>
                                    </div>
                                }
                                {
                                    subtract.type == 3 ?  <div style={{paddingLeft: 4, paddingRight: 8}}>赠送现金券<span style={{fontSize: 18, color: '#ff4242'}}>￥{numeral(subtract.amount2).format('0,0.00')}</span>,下次消费使用.</div> :
                                    subtract.type == 2 ? <div style={{fontSize: 18, color: '#ff4242'}}>{subtract.discount}折</div>
                                    : <div style={{fontSize: 18, color: '#ff4242'}}>-￥{numeral(subtract.amount1).format('0,0.00')}</div>
                                }
                            </div>
                        )
                    })
                }
                <div className={styles.container}>
                <Card style={{padding: 0}}>
                    <div className={`${styles.bottomItem}`}>
                        合计应收：
                        <span style={{fontSize: 18, color: '#1890ff'}}>
                            ￥{numeral(callPayPrice()).format('0,0.00')}
                        </span>
                    </div>
                    <div className={`${styles.bottomItem} ${styles.bottomItem_noBorder}`}>
                        合计实收：￥<InputNumber style={{color: '#ff4242', fontSize: 18, width: 100}} 
                            value={receivedAmount || callPayPrice()} step={0.01} onChange={this.onReceviedAmountChange}/>
                    </div>
                </Card>
                </div>
                <Form>
                    <Form.Item {...formItemLayout} label="支付方式">
                        {getFieldDecorator('payMethod', {
                            rules: [{required: true, message: '请选择支付方式' }],
                        })(
                            <Select
                                showArrow={true}
                                style={{ width: '100%'}}
                                placeholder="请选择支付方式"
                                onChange={this.onChange}
                            >
                                <Select.Option key={0} value={3}>前台扫码支付(支)</Select.Option>
                                <Select.Option key={0} value={4}>前台扫码支付(微)</Select.Option>
                                <Select.Option key={5} value={5}>现金支付</Select.Option>
                                <Select.Option key={6} value={6}>扫码转账(支)</Select.Option>
                                <Select.Option key={7} value={7}>扫码转账(微)</Select.Option>
                                <Select.Option key={8} value={8}>其他</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('remark')(
                            <Input.TextArea
                                style={{ width: '100%', marginTop: 8}}
                                placeholder={"备注说明,最多200字"}
                                maxLength={200}
                                rows={5}
                            >
                            </Input.TextArea>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}

const OfflinePaymentModalWrapper = Form.create()(OfflinePaymentModal);

export default OfflinePaymentModalWrapper;