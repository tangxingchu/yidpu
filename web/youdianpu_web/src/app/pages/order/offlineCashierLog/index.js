import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Table, Button, Input , Select, DatePicker, Popconfirm, message } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { ipcRenderer } from 'electron';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import offlineCashierLogActions from '../../../actions/offlineCashierLog';
import styles from './index.less';

class OfflineCashierLog extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        ipcRenderer.on("listCashierLog-reply", (event, arg) => {
            this.props.offlineCashierLogActions.dispatch_cashierLog(arg);
        });
        ipcRenderer.send("listCashierLog", {payMethod: ""});
        this.props.offlineCashierLogActions.listPayOrder();
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("listCashierLog-reply");
    }

    handleSearch = (values) => {
    }

    onChange = (value) => {
        ipcRenderer.send("listCashierLog", {payMethod: value});
    }

    archiving = () => {
        const { offlineCashierLogList } = this.props.offlineCashierLog;
        this.props.offlineCashierLogActions.archiving(offlineCashierLogList).then(() => {
            ipcRenderer.send("deleteAllCashierLog");
            message.success("归档成功");
        });
    }

    render() {
        const { loading, offlineCashierLogList, payOrderList, archLoading } = this.props.offlineCashierLog;
        
        const columns = [{
            title: '桌台编号',
            dataIndex: 'tableCode',
            key: 'tableCode',
        }, {
            title: '收(退)款',
            dataIndex: 'cashierType',
            key: 'cashierType',
            render: (text, record) => {
                if(record.cashierType == "1") {
                    return <span>{"收款"}</span>
                } else {
                    return <span style={{color: '#ff4242'}}>{"退款"}</span>
                }
            }
        }, {
            title: '金额',
            dataIndex: 'cashierAmount',
            key: 'cashierAmount',
            render: (text, record) => {                
                if(record.cashierAmount < 0) {
                    return <span style={{color: '#ff4242'}}>￥{numeral(record.cashierAmount).format('0,0.00')}</span>
                } else {
                    return <span>￥{numeral(record.cashierAmount).format('0,0.00')}</span>
                }
            }
        }, {
            title: '收(退)款时间',
            dataIndex: 'cashierTime',
            key: 'cashierTime',
        }, {
            title: '收(退)款方式',
            dataIndex: 'cashierMethod',
            key: 'cashierMethod',
            render: (text, record) => {
                if(record.cashierMethod == 3) {
                    return <span>前台扫码支付(支)</span>
                } else if(record.cashierMethod == 4) {
                    return <span>前台扫码支付(微)</span>
                } else if(record.cashierMethod == 5) {
                    return <span>现金支付</span>
                } else if(record.cashierMethod == 6) {
                    return <span>扫码转账(支)</span>
                } else if(record.cashierMethod == 7) {
                    return <span>扫码转账(微)</span>
                } else if(record.cashierMethod == 8) {
                    return <span>其他</span>
                }
            }
        }, {
            title: '操作员',
            dataIndex: 'operationStaff',
            key: 'operationStaff',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }];

        const payOrderColumns = [{
            title: '支付单创建时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
        }, {
            title: '支付单金额',
            dataIndex: 'orderPrice',
            key: 'orderPrice',
            render: (text, record) => (
                <span>￥{numeral(record.orderPrice).format('0,0.00')}</span>
            )
        }, {
            title: '支付宝(微信)交易号',
            dataIndex: 'payNo',
            key: 'payNo',
        }, {
            title: '支付时间',
            dataIndex: 'payTime',
            key: 'payTime'
        }, {
            title: '已支付金额',
            dataIndex: 'payPrice',
            key: 'payPrice',
            render: (text, record) => {
                if(record.payPrice) {
                    return <span style={{color: '#87d068'}}>￥{numeral(record.payPrice).format('0,0.00')}</span>
                }
            }
        }, {
            title: '支付方式',
            dataIndex: 'payMethod',
            key: 'payMethod',
            render: (text, record) => {
                if(record.payMethod == 3) {
                    return (
                        <span>前台扫码支付(支)</span>
                    )
                } else if(record.payMethod == 4) {
                    return (
                        <span>前台扫码支付(微)</span>
                    )
                } else if(record.payMethod == 1) {
                    return (
                        <span>桌台扫码支付(支)</span>
                    )
                } else if(record.payMethod == 2) {
                    return (
                        <span>桌台扫码支付(微)</span>
                    )
                }
            }
        }];
        return (
            <PageHeaderLayout
                    title={"离线收银流水"}
                    content={`核对离线收银流水，注意：每天的数据请在当天24点之前上报至服务端，为了不影响运营数据统计，所有支付时间都将会变更为您上报的时间。`}
                > 
                <Card bordered={false}>
                    <WrapperSearchForm
                        loading={loading}
                        handleSearch={this.handleSearch}
                        onChange={this.onChange}
                    />
                    <Table rowKey={record => record.id}
                        dataSource={offlineCashierLogList}
                        columns={columns}
                        size={"middle"}
                        locale={
                            {emptyText: '查无数据'}
                        }
                        pagination={false}
                    />
                </Card>
                <Card bordered={false} title={"支付单"}>
                    <Table rowKey={record => record.id}
                        loading={loading}
                        columns={payOrderColumns}
                        size={"middle"}
                        dataSource={payOrderList}
                        pagination={false}>
                    </Table>
                </Card>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 16, marginTop: 8}}>
                    <Button loading={archLoading} type={"primary"} onClick={() => this.archiving()}>归档上报</Button>
                </div>
            </PageHeaderLayout>
        )
    }

}

class SearchForm extends Component {
    constructor(props){
        super(props);
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err) return;
            this.props.handleSearch(values);
        });
    }

    render() {
        const { form, resetForm, loading } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 18 },
              sm: { span: 18 },
            },
        };
        return (
            <Form onSubmit={this.handleSearch}>
                <Row>
                    <Col span={12}>
                        <Form.Item {...formItemLayout} label="收银方式">
                            {getFieldDecorator('cashierMethod')(
                                <Select placeholder="请选择收银方式" style={{ width: '100%' }} onChange={this.props.onChange}>
                                    <Select.Option value="">所有</Select.Option>
                                    <Select.Option value="3">前台扫码支付(支)</Select.Option>
                                    <Select.Option value="4">前台扫码支付(微)</Select.Option>
                                    <Select.Option value="5">现金支付</Select.Option>
                                    <Select.Option value="6">扫码转账(支)</Select.Option>
                                    <Select.Option value="7">扫码转账(微)</Select.Option>
                                    <Select.Option value="8">其它</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    {/* <Col span={12} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" loading={loading}>查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => resetForm()}>重置</Button>
                    </Col> */}
                </Row>
            </Form>
        )
    }
}

const WrapperSearchForm = Form.create()(SearchForm);

export default connect((state) => {
    return {
        offlineCashierLog: state.offlineCashierLog,
    }
}, (dispatch) => {
    return {
        offlineCashierLogActions: bindActionCreators(offlineCashierLogActions, dispatch),
    }
})(OfflineCashierLog);