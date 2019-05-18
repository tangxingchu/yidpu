import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Table, Button, Dropdown , Select, DatePicker, Spin, Popconfirm, Menu, Icon, Popover, message, Divider } from 'antd'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { ipcRenderer } from 'electron';

import RemarkModal from '../historyOrder/remarkModal';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import currOrderActions from '../../../actions/currOrder';
import hisOrderActions from '../../../actions/hisOrder';
import floorPlanActions from '../../../actions/floorPlan';
import OrderItemTable from '../historyOrder/orderItemTable';
import DivergenceModal from './divergenceModal';
import styles from './index.less';
import PayOrderModal from '../../dashboard/floorPlan/payOrderModal';


class CurrentOrder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            remarkModalVisible: false,
            divergenceModalVisible: false,
            payOrderModalVisible: false,
        }
    }

    componentDidMount() {
        ipcRenderer.on("selectAllTableFloor-reply", (event, arg) => {
            this.props.hisOrderActions.dispatchAllTables(arg);
        });
        ipcRenderer.send("selectAllTableFloor");

        const { searchFormData, currOrderList } = this.props.currOrder;
        if(currOrderList.length == 0) {
            const searchParams = this.getSearchParams(searchFormData);
            const { pageSize } = this.props.currOrder;
            searchParams.pageSize = pageSize;
            searchParams.pageNum = 1;
            this.props.currOrderActions.list(searchParams);
        }
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("selectAllTableFloor-reply");
    }

    handleRemarkModalVisible = (flag) => {
        this.setState({remarkModalVisible: !!flag});
    }

    handleDivergenceModalVisible = (flag, orderId) => {
        if(flag) {
            this.props.currOrderActions.dispatchCurrOrder(orderId);
        }
        this.setState({divergenceModalVisible: !!flag});
    }

    handlePayOrderModalVisible = (flag) => {
        if(!flag) {
            this.props.currOrderActions.resetPayMethod();
        }
        this.setState({payOrderModalVisible: !!flag});
    }

    showRemarkModal = (orderId) => {
        this.orderId = orderId;
        this.setState({remarkModalVisible: true});
        this.props.currOrderActions.handleRemarkModal(orderId);
    }

    modifyOrderRemark = () => {
        const { remarkValue } = this.props.currOrder;
        this.props.currOrderActions.modifyRemark(this.orderId, remarkValue).then(() => {
            this.handleRemarkModalVisible(false);
        });
    }

    onPageChange = (page, pageSize) => {
        // this.pageSize = pageSize;
        // this.pageNum = page;
        const { searchCondition } = this.props.currOrder;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.currOrderActions.list(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        // this.pageSize = size;
        // this.pageNum = current;
        const { searchCondition } = this.props.currOrder;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.currOrderActions.list(searchParams);
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
        const orderStatus = searchData.orderStatus;
        const orderNo = searchData.orderNo;
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
        const orderStatus = searchData.orderStatus.value;
        const orderNo = searchData.orderNo.value;
        const searchParams = {tableCodes, orderNo, orderStatus, orderTimeStart, orderTimeEnd};
        return searchParams;
    }

    handleSearch = (values) => {
        const { searchFormData } = this.props.currOrder;
        const searchParams = this.getSearchParams(searchFormData);
        if(!searchParams) return;
        const { pageSize } = this.props.currOrder;
        searchParams.pageSize = pageSize;
        searchParams.pageNum = 1;
        this.props.currOrderActions.handleSearch(values);
        this.props.currOrderActions.list(searchParams);
    }

    onExpand = (expanded, record) => {
        const { orderItemMap } = this.props.currOrder;
        if(!orderItemMap[record.id] && expanded) {
            this.props.currOrderActions.listOrderItem(record.id);
        }
    }

    refresh = (id) => {
        this.props.currOrderActions.listOrderItem(id);
    }

    expandedRowRender = (record) => {
        const { orderItemMap, listOrderItemLoading } = this.props.currOrder;
        const orderItems = orderItemMap[record.id];
        if(!orderItems) {
            return (
                <Spin />
            );
        } else {
            return <Fragment>
                    <Button loading={listOrderItemLoading} onClick={() => {this.refresh(record.id)}} style={{marginBottom: 4}}>刷新</Button>
                    <OrderItemTable dataSource={orderItems} loading={listOrderItemLoading}/>
                </Fragment>
        }
    }

    //订单同步支付宝支付结果(桌台扫码支付)
    syncAlipayResult = (orderNo) => {
        this.props.floorPlanActions.syncAlipayOrderStatus(orderNo, 1).then((data) => {
            this.refresh();
            message.success(`订单已支付,金额￥${data.result}`);
        });
    }

    //订单同步微信支付结果(桌台扫码支付)
    syncWechatResult = (orderNo) => {
        this.props.floorPlanActions.syncWxpayOrderStatus(orderNo, 2).then(data => {
            this.refresh();
            message.success(`订单已支付,金额￥${data.result}`);
        });
    }

    payOrderHandle = (payOrderIds) => {
        alert(payOrderIds);
    }

    //加载前台支付的订单
    loadPayOrder = () => {
        this.handlePayOrderModalVisible(true);
        this.props.floorPlanActions.listPayOrder();
    }

    //删除前台扫码 顾客未支付订单
    deletePayOrder = (id) => {
        this.props.floorPlanActions.deletePayOrder(id);
    }

    //订单同步支付宝支付结果(前台扫码支付)
    syncAlipayResultFront = (orderNo) => {
        this.props.floorPlanActions.syncAlipayOrderStatus(orderNo, 3).then((data) => {
            this.loadPayOrder();
            message.success(`订单已支付,金额￥${data.result}`);
        });
    }

    //订单同步微信支付结果(前台扫码支付)
    syncWxpayResultFront = (orderNo) => {
        this.props.floorPlanActions.syncWxpayOrderStatus(orderNo, 4).then(data => {
            this.loadPayOrder();
            message.success(`订单已支付,金额￥${data.result}`);
        });
    }

    render() {
        const { remarkModalVisible, divergenceModalVisible, payOrderModalVisible } = this.state;
        const { pageSize, currentPage, total, searchFormData, loading, currOrderList,  modifyRemarkLoading, 
            remarkValue, divergenceFormData, divergenceLoading, currOrderData } = this.props.currOrder;
        const { floorList } = this.props.hisOrder;
        const { payOrderLoading, payOrderList } = this.props.floorPlan;
        const { syncAlipayResultLoading, syncWxpayResultLoading } = this.props.floorPlan;
        const { onSearchFromFieldChangeValue, resetSearchFormFields, onRemarkChange, onDivergenceFromFieldChangeValue } = this.props.currOrderActions;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            total,
            current: currentPage,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
        };
        const menu = ({ record }) => {
            return (
                <Menu>
                    <Menu.Item >
                        <a href="javascript:;" onClick={() => this.handleDivergenceModalVisible(true, record.id)}>处理分歧订单</a>
                    </Menu.Item>
                </Menu>
            )
        };
        const MoreBtn = (record) => {
            return (
                <Dropdown overlay={menu(record)}>
                    <a>
                        其它 <Icon type="down" />
                    </a>
                </Dropdown>
            )
        };
        const content = (orderNo) => (
            <Fragment>
                <Button type="primary" loading={syncAlipayResultLoading} onClick={() => this.syncAlipayResult(orderNo)}>查询一次支付宝支付结果</Button>
                <br/>
                <Button type="primary" style={{marginTop: 8}} loading={syncWxpayResultLoading} onClick={() => this.syncWechatResult(orderNo)}>查询一次微信支付结果</Button>
            </Fragment>
        )
        const columns = [{
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
            title: '订单状态',
            dataIndex: 'orderStatusName',
            key: 'orderStatusName',
            render: (text, record) => {
                return (
                    <span>{record.orderStatusName}
                        <Popover content={content(record.orderNo)} title="状态有疑问?(仅限顾客桌台扫码支付疑问)">
                            <Icon type="question"></Icon>
                        </Popover>
                    </span>
                );
            }
        }, {
            title: '支付方式',
            dataIndex: 'payMethodName',
            key: 'payMethodName',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            render: (text, record) => {
                if(!record.remark) {
                    return <span><a href="javascript:void(0)" onClick={() => this.showRemarkModal(record.id)}>添加备注</a></span>
                } else {
                    return <span>{record.remark}<a href="javascript:void(0)" style={{fontSize: 12, marginLeft: 8}} 
                        onClick={() => this.showRemarkModal(record.id)}>修改备注</a></span>
                }
            }
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                //0待确认,1待支付
                if(record.orderStatus == '0' || record.orderStatus == '1') {
                    return (
                        <span>
                            <Popconfirm title="确认取消该笔订单吗?" onConfirm={() =>{this.props.currOrderActions.cancelOrder(record.orderNo)}}>
                                <a href="javascript:void(0)">取消订单</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                        </span>
                    )
                } else if(record.orderStatus == '9') {//已取消的订单
                    return (
                        <span>
                            <Popconfirm title="确认删除该笔订单吗?" onConfirm={() =>{this.props.currOrderActions.deleteOrder(record.orderNo)}}>
                                <a href="javascript:void(0)">删除订单</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                        </span>
                    )
                } else if(record.orderStatus == '-1') {//支付异常订单
                    /* return (
                        <a href="javascript:;" onClick={() => this.handleDivergenceModalVisible(true, record.id)}>处理分歧订单</a>
                    ) */
                }
                
            },
        }];
        return (
            <PageHeaderLayout
                    title={"用餐订单"}
                    /* content={`顾客当前正在用餐的订单(待确认、待支付、支付异常)订单。您可以取消或删除未支付的用餐订单。还可以处理您与顾客关于用餐订单支付金额产生的分歧。`} */
                    content={`顾客当前正在用餐的订单(待确认、待支付、支付异常)订单。您可以取消或删除未支付的用餐订单。`}
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
                        dataSource={currOrderList}
                        columns={columns}
                        size={"middle"}
                        pagination={paginationProps}
                        onExpand={this.onExpand}
                        expandedRowRender={this.expandedRowRender}
                        style={{marginTop: 8}}
                        locale={
                            {emptyText: '查无数据,初始默认查询是当天的用餐订单数据'}
                        }
                    />
                </Card>
                <RemarkModal visible={remarkModalVisible}
                    handleModalVisible={this.handleRemarkModalVisible}
                    loading={modifyRemarkLoading}
                    remarkValue={remarkValue}
                    onRemarkChange={onRemarkChange}
                    modifyOrderRemark={this.modifyOrderRemark}
                >
                </RemarkModal>
                <DivergenceModal visible={divergenceModalVisible}
                    handleModalVisible={this.handleDivergenceModalVisible}
                    divergenceFormData={divergenceFormData}
                    fieldChangeValue={onDivergenceFromFieldChangeValue}
                    loading={divergenceLoading}
                    currOrderData={currOrderData}
                    handlePayOrderModalVisible={this.loadPayOrder}
                >
                </DivergenceModal>
                <PayOrderModal visible={payOrderModalVisible}
                    loading={payOrderLoading}
                    payOrderList={payOrderList}
                    confirmLoading={divergenceLoading}
                    handleModalVisible={this.handlePayOrderModalVisible}
                    handleSubmit={this.payOrderHandle}
                    deletePayOrder={this.deletePayOrder}
                    refresh={this.loadPayOrder}
                    syncAlipayResultFront={this.syncAlipayResultFront}
                    syncWxpayResultFront={this.syncWxpayResultFront}
                    primaryBtnText={"关联已勾选单补差价"}
                ></PayOrderModal>
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
                                    <Select.Option value="1">待确认</Select.Option>
                                    <Select.Option value="2">待支付</Select.Option>
                                    <Select.Option value="3">预支付</Select.Option>                                    
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>                    
                    <Col span={24} style={{ textAlign: 'right' }}>
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
            orderTime: Form.createFormField({
                value: props.orderTime.value,
            }),
        }
    }
})(SearchForm);

export default connect((state) => {
    return {
        currOrder: state.currOrder,
        hisOrder: state.hisOrder,
        floorPlan: state.floorPlan,
    }
}, (dispatch) => {
    return {
        currOrderActions: bindActionCreators(currOrderActions, dispatch),
        hisOrderActions: bindActionCreators(hisOrderActions, dispatch),
        floorPlanActions: bindActionCreators(floorPlanActions, dispatch),
    }
})(CurrentOrder);