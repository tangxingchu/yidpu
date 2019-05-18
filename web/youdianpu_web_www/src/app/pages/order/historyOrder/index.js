import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Table, Button, Input , Select, DatePicker, Spin, Tooltip, Icon, Popover, message } from 'antd'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { ipcRenderer } from 'electron';

import RefundModal from './refundModal';
import ConfirmPWDModal from './confirmPWDModal';
import ConfirmSMSCodeModal from './confirmSMSCode';
import OrderItemTable from './orderItemTable';
import PayOrderTable from './payOrderTable';
import RemarkModal from './remarkModal';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import hisOrderActions from '../../../actions/hisOrder';
import styles from './index.less';

import { getGrade } from '../../../utils/authority';

class OrderHis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refundModalVisible: false,
            confirmPWDModalVisible: false,
            confirmSMSCodeVisible: false,
            remarkModalVisible: false,
        }
        this.columns = [{
            title: '桌台编号',
            dataIndex: 'tableCode',
            key: 'tableCode',
        }, {
            title: '用餐人数',
            dataIndex: 'dinersNum',
            key: 'dinersNum',
            render: (text, record) => (
                <span>{record.dinersNum}人</span>
            )
        }, {
            title: '下单时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
            render: (text, record) => (
                <span>{moment(record.orderTime).format("YYYY-MM-DD HH:mm")}</span>
            )
        }, {
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        }, {
            title: '订单金额',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => (
                <span>￥{numeral(record.totalPrice).format('0,0.00')}</span>
            )
        }, {
            title: '收银金额',
            dataIndex: 'payPrice',
            key: 'payPrice',
            render: (text, record) => {
                if(record.totalPrice > record.payPrice) {
                    return <span style={{color: '#87d068'}}>￥{numeral(record.payPrice).format('0,0.00')}{/* <Icon type="arrow-down" style={{color: '#87d068'}}/> */}</span>
                } else if(record.totalPrice < record.payPrice) {
                    return <span style={{color: '#ff4d4f'}}>￥{numeral(record.payPrice).format('0,0.00')}{/* <Icon type="arrow-up" style={{color: '#ff4d4f'}}/> */}</span>
                } else {
                    return <span>￥{numeral(record.payPrice).format('0,0.00')}</span>
                }
            }
        }, {
            title: '是否合并收银',
            dataIndex: 'outTradeNo',
            key: 'outTradeNo',
            render: (text, record) => {
                if(record.outTradeNo) {
                    return (
                        <Fragment>
                            <span style={{color: '#ff4d4f'}}>是</span>
                            <Tooltip title="只查看与我一起合并付款的用餐订单">
                                <Icon style={{marginLeft: 8, fontSize: 12}} type={"filter"} onClick={() => this.listOrderHisByOutTradeNo(record.outTradeNo)}/>
                            </Tooltip>
                        </Fragment>
                    )
                } else {
                    return (
                        <span>否</span>
                    )
                }
            }
        }, {
            title: '支付方式',
            dataIndex: 'payMethodName',
            key: 'payMethodName',
        }, {
            title: '合计优惠',
            dataIndex: 'subtractAmount',
            key: 'subtractAmount',
            render: (text, record) => {
                if(record.subtractAmount == 0) {
                    return <span>￥{numeral(record.subtractAmount).format('0,0.00')}</span>
                } else {
                    return (
                        <Popover content={this.subtractDetailContent(record)} title="优惠明细">
                            <span style={{color: '#ff4242'}}>￥-{numeral(record.subtractAmount).format('0,0.00')}</span>
                        </Popover>
                    )
                }
            }
        }, {
            title: '订单状态',
            dataIndex: 'orderStatusName',
            key: 'orderStatusName',
            render: (text, record) => {
                if(record.orderStatus == '7') {
                    return (
                        <span style={{color: '#87d068'}}>退款成功</span>
                    );
                } else if(record.orderStatus == '11'){
                    return (
                        <span style={{color: '#809717'}}>部分退款</span>
                    );
                } else {
                    return (
                        <span>{record.orderStatusName}</span>
                    );
                }
            }
        }, {
            title: '交易完成时间',
            dataIndex: 'hisTime',
            key: 'hisTime',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            render: (text, record) => {
                if(!record.remark) {
                    return <span><a href="javascript:void(0)" onClick={() => this.showRemarkModal(record.orderNo)}>添加备注</a></span>
                } else {
                    return <span>{record.remark}<a href="javascript:void(0)" style={{fontSize: 12, marginLeft: 8}} 
                        onClick={() => this.showRemarkModal(record.orderNo)}>修改备注</a></span>
                }
            }
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                //10交易关闭 9已取消、7退款成功
                if(record.orderStatus == '10' || record.orderStatus == '9' || record.orderStatus == '7') {
                    return (
                        <span></span>
                    );
                } else if(record.payPrice > 0) {
                    // if(record.payMethod == 3 || record.payMethod == 4 || (record.payMethod + '').indexOf('3') > -1
                    //     || (record.payMethod + '').indexOf('4') > -1) {
                    //     return (
                    //         <Fragment>
                    //             <a href="javascript:;" onClick={() => { message.info('关联了前台扫码支付的用餐订单请点开+号选择对应的支付单退款') }}>退款</a>                            
                    //         </Fragment>
                    //     )
                    // } else {
                        return (
                            <Fragment>
                                <a href="javascript:;" onClick={() => { this.handleRefundModalVisible(record.tableCode, record.orderNo) }}>退款</a>                            
                            </Fragment>
                        )
                    // }
                }
            },
        }];
    }

    componentDidMount() {
        ipcRenderer.on("selectAllTableFloor-reply", (event, arg) => {
            this.props.hisOrderActions.dispatchAllTables(arg);
        });
        ipcRenderer.send("selectAllTableFloor");
        
        const { searchFormData, hisOrderList } = this.props.hisOrder;
        if(hisOrderList.length == 0) {
            const searchParams = this.getSearchParams(searchFormData);
            const { pageSize } = this.props.hisOrder;
            searchParams.pageSize = pageSize;
            searchParams.pageNum = 1;
            this.props.hisOrderActions.list(searchParams);
        }        
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("selectAllTableFloor-reply");
    }

    subtractDetailContent = (record) => {
        return (
            <div dangerouslySetInnerHTML={{__html:`${record.subtractRemark}`}}></div>
        )
    }

    /**
     * orderNo 用餐订单号(桌台扫码使用用餐订单号支付)
     * payOrderNo 支付单号(前台扫码输入金额支付用支付单号)
     */
    handleRefundModalVisible = (tableCode, orderNo, payOrderNo) => {
        this.setState({refundModalVisible: true});
        this.props.hisOrderActions.handleRefundData(tableCode, orderNo, payOrderNo);
    }

    handleRefundModalVisible2  = (flag) => {
        this.setState({refundModalVisible: !!flag});
    }

    handleConfirmPWDModalVisible = (flag) => {
        this.setState({confirmPWDModalVisible: !!flag});
    }

    handleConfirmSMSCodeVisible = (flag) => {
        this.setState({confirmSMSCodeVisible: !!flag});
    }

    handleRemarkModalVisible = (flag, orderNo) => {
        this.setState({remarkModalVisible: !!flag});
    }

    showRemarkModal = (orderNo) => {
        this.currOrderNo = orderNo;
        this.setState({remarkModalVisible: true});
        this.props.hisOrderActions.handleRemarkModal(orderNo);
    }

    //查询与我合并付款的订单
    listOrderHisByOutTradeNo = (outTradeNo) => {
        this.props.hisOrderActions.listOrderHisByOutTradeNo(outTradeNo);
    }

    confirmRefundOrder = (orderNo) => {
        const { refundData } = this.props.hisOrder;
        
        if(refundData.refundAmount.value <= 0) {
            message.info("退款金额不能是0");
            return;
        }
        /*        
        ipcRenderer.on("selectBasicConfig-reply", (event, arg) => {
            ipcRenderer.removeAllListeners("selectBasicConfig-reply");
            if(arg == "1") {
                this.handleConfirmPWDModalVisible(true);
            } else {
                this.refundOrder();
            }
        });
        ipcRenderer.send("selectBasicConfig", "enabled-refund-password");*/
        if(refundData.refundMethod.value == -1 || refundData.refundMethod.value == -2
            || refundData.refundMethod.value == -3 || refundData.refundMethod.value == -4) {
            if(getGrade() > 1) {
                this.handleConfirmSMSCodeVisible(true);
            } else {
                this.handleConfirmPWDModalVisible(true);
            }
        } else {
            this.handleConfirmPWDModalVisible(true);
        }
    }

    refundOrder = (validationPWD) => {
        const { refundData } = this.props.hisOrder;
        if(refundData.refundType.value == 1) {
            this.props.hisOrderActions.refund(refundData.orderNo.value, refundData.refundLimit.value, refundData.refundMethod.value,
                refundData.refundAmount.value, refundData.refundReason.value, validationPWD).then(() => {
                this.setState({refundModalVisible: false, confirmPWDModalVisible: false, confirmSMSCodeVisible: false});
                message.success("退款成功");
            });
        } else {
            this.props.hisOrderActions.refundFront(refundData.orderNo.value, refundData.payOrderNo.value, refundData.refundLimit.value, refundData.refundMethod.value,
                refundData.refundAmount.value, refundData.refundReason.value, validationPWD, refundData.tableCode.value).then(() => {
                this.setState({refundModalVisible: false, confirmPWDModalVisible: false, confirmSMSCodeVisible: false});
                message.success("退款成功");
            });
        }
    }    
    
    onPageChange = (page, pageSize) => {
        // this.pageSize = pageSize;
        // this.pageNum = page;
        const { searchCondition } = this.props.hisOrder;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.hisOrderActions.list(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        // this.pageSize = size;
        // this.pageNum = current;
        const { searchCondition } = this.props.hisOrder;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.hisOrderActions.list(searchParams);
    }

    getSearchParams2 = (searchData) => {
        const validateDate = moment(searchData.orderTime[0]);
        if(validateDate.add(1, 'month').isBefore(searchData.orderTime[1])) {
            message.info("下单时间查询间隔不能超过1个月");
            return null;
        }
        const orderTimeStart = searchData.orderTime[0].format('YYYY-MM-DD HH:mm');
        const orderTimeEnd = searchData.orderTime[1].format('YYYY-MM-DD HH:mm');
        const tableCodes = searchData.tableCode.toString();
        const orderNo = searchData.orderNo;
        const orderStatus = searchData.orderStatus;
        const searchParams = {tableCodes, orderNo, orderStatus, orderTimeStart, orderTimeEnd};
        return searchParams;
    }

    getSearchParams = (searchData) => {
        const validateDate = moment(searchData.orderTime.value[0]);
        if(validateDate.add(1, 'month').isBefore(searchData.orderTime.value[1])) {
            message.info("下单时间查询间隔不能超过1个月");
            return null;
        }
        const orderTimeStart = searchData.orderTime.value[0].format('YYYY-MM-DD HH:mm');
        const orderTimeEnd = searchData.orderTime.value[1].format('YYYY-MM-DD HH:mm');
        const tableCodes = searchData.tableCode.value.toString();
        const orderNo = searchData.orderNo.value;
        const orderStatus = searchData.orderStatus.value;
        const searchParams = {tableCodes, orderNo, orderStatus, orderTimeStart, orderTimeEnd};
        return searchParams;
    }

    handleSearch = (values) => {
        const { searchFormData } = this.props.hisOrder;
        const searchParams = this.getSearchParams(searchFormData);
        if(!searchParams) return;
        const { pageSize } = this.props.hisOrder;
        searchParams.pageSize = pageSize;
        searchParams.pageNum = 1;
        this.props.hisOrderActions.handleSearch(values);
        this.props.hisOrderActions.list(searchParams);
    }

    onExpand = (expanded, record) => {
        const { hisOrderItemMap, payLogMap } = this.props.hisOrder;
        if(!hisOrderItemMap[record.orderNo] && expanded) {
            this.props.hisOrderActions.listOrderItem(record.tableCode, record.orderNo, record.payMethod);
        }
    }

    refresh = (tableCode, orderNo, payMethod) => {
        this.props.hisOrderActions.listOrderItem(tableCode, orderNo, payMethod);
    }

    expandedRowRender = (record) => {
        const { hisOrderItemMap, payLogMap, payOrderMap, listOrderItemLoading } = this.props.hisOrder;
        const payLogs = payLogMap[record.orderNo];
        const hisOrderItems = hisOrderItemMap[record.orderNo];
        const payOrders = payOrderMap[record.orderNo];
        const columns = [{
            title: '收(退)款',
            dataIndex: 'logTypeName',
            key: 'logTypeName',
            render: (text, record_child) => {
                if(record_child.logType == "1") {
                    return <span>{record_child.logTypeName}</span>
                } else {
                    return <span style={{color: '#87d068'}}>{record_child.logTypeName}</span>
                }
            }
        }, {
            title: '金额',
            dataIndex: 'payAmount',
            key: 'payAmount',
            render: (text, record_child) => {                
                if(record_child.payAmount < 0) {
                    return <span style={{color: '#87d068'}}>￥{numeral(record_child.payAmount).format('0,0.00')}</span>
                } else {
                    return <span>￥{numeral(record_child.payAmount).format('0,0.00')}</span>
                }
            }
        }, {
            title: '收(退)款时间',
            dataIndex: 'payTime',
            key: 'payTime',
        }, {
            title: '收(退)款方式',
            dataIndex: 'payMethodName',
            key: 'payMethodName',
        }, {
            title: '操作员',
            dataIndex: 'operationStaff',
            key: 'operationStaff',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }];
        if(!hisOrderItems) {            
            return (
                <Spin />
            );
        } else {
            return (
                <Fragment>
                    <Button loading={listOrderItemLoading} onClick={() => {this.refresh(record.tableCode, record.orderNo, record.payMethod)}} style={{marginBottom: 4}}>刷新</Button>
                    {
                        payOrders && payOrders.length > 0 ?
                        <PayOrderTable dataSource={payOrders} loading={listOrderItemLoading} handleRefundModalVisible={this.handleRefundModalVisible}/>
                        : null
                    }
                    {/* <Table rowKey={record => record.id}
                        columns={columns}
                        dataSource={payLogs}
                        style={{marginTop: 8}}
                        title={() => "关联的收(退)款流水"}
                        size={"small"}
                        loading={listOrderItemLoading}
                        pagination={false}
                        locale={
                            {emptyText: '查无数据,第一次默认查询是当天的用餐订单历史数据'}
                        }
                    /> */}
                    <OrderItemTable dataSource={hisOrderItems} loading={listOrderItemLoading} style={{marginTop: 8}}/>
                </Fragment>                
            )
        }
    }

    modifyOrderRemark = () => {
        const { remarkValue } = this.props.hisOrder;
        this.props.hisOrderActions.modifyRemark(this.currOrderNo, remarkValue).then(() => {
            this.handleRemarkModalVisible(false);
        });
    }

    //退款短信验证码
    generatePhoneCode = () => {
        let m = 60;
        this.props.hisOrderActions.generatePhoneCode().then(() => {
            message.success("短信验证码已发送");
            const inter = window.setInterval(() => {
                this.props.hisOrderActions.down();
                m--;
                if(m == 0) {
                    window.clearInterval(inter);
                }
            }, 1000);
        });
    }

    render() {
        const { refundModalVisible, confirmPWDModalVisible, remarkModalVisible, confirmSMSCodeVisible } = this.state;        
        const { loading, pageSize, total, currentPage, hisOrderList, searchFormData, refundLoading, refundData, listOrderItemLoading, hisOrderItemMap, payLogMap,
            confirmPWDData, refundAmountReadOnly, modifyRemarkLoading, remarkValue, floorList, phoneCodeLoading, countDown } = this.props.hisOrder;
        const { list, onSearchFromFieldChangeValue, resetSearchFormFields, refundFormFieldChangeValue, onConfirmPWDFormChange, resetConfirmPWDForm,
            onRemarkChange, } = this.props.hisOrderActions;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            total,
            current: currentPage,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
        };
        return (
            <PageHeaderLayout
                title={"历史用餐订单"}
                content={`顾客历史用餐订单管理。顾客支付完成之后用餐订单就成为历史用餐订单，未支付的用餐订单请前往用餐订单。历史用餐订单可进行退款操作。手机支付退款请点开某一行数据前的+号选择具体支付单退款。
                    注意：支付宝、微信扫码支付退款发起后由系统自动退款，其它支付方式退款请线下自行与顾客协商退款`}
            >   
                <Card bordered={false}>
                    <WrapperSearchForm
                        {...searchFormData}
                        fieldChangeValue={onSearchFromFieldChangeValue}
                        resetForm={resetSearchFormFields}
                        loading={loading}
                        floorList={floorList}
                        handleSearch={this.handleSearch}
                    />
                    <Table rowKey={record => record.id}
                        loading={loading}
                        dataSource={hisOrderList}
                        columns={this.columns}
                        size={"middle"}
                        pagination={paginationProps}
                        onExpand={this.onExpand}
                        expandedRowRender={this.expandedRowRender}
                        style={{marginTop: 8}}
                    />
                </Card>
                <RefundModal visible={refundModalVisible}
                    handleModalVisible={this.handleRefundModalVisible2}
                    loading={refundLoading}
                    refundData={refundData}
                    confirmRefundOrder={this.confirmRefundOrder}
                    fieldChangeValue={refundFormFieldChangeValue}
                    refundAmountReadOnly={refundAmountReadOnly}
                >
                </RefundModal>
                <ConfirmPWDModal visible={confirmPWDModalVisible}
                    handleModalVisible={this.handleConfirmPWDModalVisible}
                    loading={refundLoading}
                    fieldChangeValue={onConfirmPWDFormChange}
                    resetForm={resetConfirmPWDForm}
                    confirmPWDData={confirmPWDData}                    
                    refundOrder={this.refundOrder}
                >                
                </ConfirmPWDModal>
                <ConfirmSMSCodeModal visible={confirmSMSCodeVisible}
                    handleModalVisible={this.handleConfirmSMSCodeVisible}
                    loading={refundLoading}
                    fieldChangeValue={onConfirmPWDFormChange}
                    resetForm={resetConfirmPWDForm}
                    confirmPWDData={confirmPWDData}
                    countDown={countDown}
                    phoneCodeLoading={phoneCodeLoading}
                    refundOrder={this.refundOrder}
                    generatePhoneCode={this.generatePhoneCode}
                >
                </ConfirmSMSCodeModal>
                <RemarkModal visible={remarkModalVisible}
                    handleModalVisible={this.handleRemarkModalVisible}
                    loading={modifyRemarkLoading}
                    remarkValue={remarkValue}
                    onRemarkChange={onRemarkChange}
                    modifyOrderRemark={this.modifyOrderRemark}
                >
                </RemarkModal>
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
        const { form, resetForm, loading, floorList } = this.props;
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
        let orderTimeError = null;
        if (this.props.orderTime.errors) {
            orderTimeError = this.props.orderTime.errors[0].message;
        }
        return (
            <Form onSubmit={this.handleSearch}>
                <Row>
                    <Col span={10}>
                        <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="下单时间"
                            help={orderTimeError ? orderTimeError : ''}
                            validateStatus={orderTimeError ? 'error' : ''}
                        >
                            {getFieldDecorator('orderTime', {
                                rules: [{type: 'array', required: true, message: '请选择下单时间', whitespace: true }],
                            })(
                                <DatePicker.RangePicker
                                    ranges={{ "全天(默认)": [moment().startOf('day'), moment().endOf('day')],
                                        "过去2小时": [moment().subtract(2, 'hour'), moment()],
                                        "过去6小时": [moment().subtract(6, 'hour'), moment()],
                                        "过去12小时": [moment().subtract(12, 'hour'), moment()],
                                        '过去一周': [moment().subtract(7, 'day'), moment()],
                                        '过去一月': [moment().subtract(1, 'month'), moment()] }}
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item {...formItemLayout} label="桌台编号">
                            {getFieldDecorator('tableCode')(
                                <Select showArrow={true}
                                    mode="multiple" placeholder="请选择桌台编号" style={{ width: '100%' }}>
                                    {
                                        floorList.map(floor => {
                                            return (
                                                <Select.OptGroup label={floor.name} key={floor.id}>
                                                    {
                                                        floor.tables.map(table => {
                                                            return (
                                                                <Select.Option key={table.id} 
                                                                    value={`${table.tableCode}`}
                                                                >
                                                                    {table.tableCode}-{table.tableName}
                                                                </Select.Option>
                                                            )                            
                                                        })
                                                    }
                                                </Select.OptGroup>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item {...formItemLayout} label="订单状态">
                            {getFieldDecorator('orderStatus')(
                                <Select placeholder="请选择订单状态" style={{ width: '100%' }}>
                                    <Select.Option value="">所有</Select.Option>
                                    <Select.Option value="8">交易成功</Select.Option>
                                    <Select.Option value="9">交易取消</Select.Option>
                                    <Select.Option value="7">退款成功(全额)</Select.Option>
                                    <Select.Option value="11">退款成功(部分)</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>       
                    <Col span={10}>
                        <Form.Item {...formItemLayout} label="订单号">
                            {getFieldDecorator('orderNo')(
                                <Input placeholder="请输入订单号" />
                            )}
                        </Form.Item>
                    </Col>
                    {/* <Col span={10}>
                        <Form.Item {...formItemLayout} label="订单号">
                            {getFieldDecorator('orderNo')(
                                <Input placeholder="请输入订单号" />
                            )}
                        </Form.Item>
                    </Col>    */}        
                    <Col span={14} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" loading={loading}>查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => resetForm()}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const WrapperSearchForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.fieldChangeValue(changedFields);
    },
    mapPropsToFields(props) {
        return {
            tableCode: Form.createFormField({
                value: props.tableCode.value,
            }),
            orderStatus: Form.createFormField({
                value: props.orderStatus.value,
            }),
            orderNo: Form.createFormField({
                value: props.orderNo.value,
            }),
            orderTime: Form.createFormField({
                value: props.orderTime.value,
            }),
        }
    }
})(SearchForm);

export default connect((state) => {
    return {
        hisOrder: state.hisOrder,
    }
}, (dispatch) => {
    return {
        hisOrderActions: bindActionCreators(hisOrderActions, dispatch),
    }
})(OrderHis);