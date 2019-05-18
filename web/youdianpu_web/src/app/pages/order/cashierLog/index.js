import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Table, Button, Input , Select, DatePicker, Popconfirm, message } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { ipcRenderer } from 'electron';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import cashierLogActions from '../../../actions/cashierLog';
import hisOrderActions from '../../../actions/hisOrder';
import styles from './index.less';

class CashierLog extends Component {

    constructor(props) {
        super(props)
        
    }

    componentDidMount() {
        ipcRenderer.on("selectAllTableFloor-reply", (event, arg) => {
            this.props.hisOrderActions.dispatchAllTables(arg);
        });
        ipcRenderer.send("selectAllTableFloor");

        const { searchFormData, cashierLogList } = this.props.cashierLog;
        if(cashierLogList.length == 0) {
            const searchParams = this.getSearchParams(searchFormData);
            const { pageSize } = this.props.cashierLog;
            searchParams.pageSize = pageSize;
            searchParams.pageNum = 1;
            this.props.cashierLogActions.list(searchParams);
        }
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("selectAllTableFloor-reply");
    }

    getSearchParams = (searchData) => {
        const validateDate = moment(searchData.cashierTime.value[0]);
        if(validateDate.add(1, 'month').isBefore(searchData.cashierTime.value[1])) {
            message.info("支付(退)款时间查询间隔不能超过1个月");
            return null;
        }
        const cashierTimeStart = searchData.cashierTime.value[0].format('YYYY-MM-DD HH:mm');
        const cashierTimeEnd = searchData.cashierTime.value[1].format('YYYY-MM-DD HH:mm');
        const orderNo = searchData.orderNo.value;
        const cashierMethod = searchData.cashierMethod.value;
        const cashierType = searchData.cashierType.value;
        const tableCode = searchData.tableCode.value;
        const searchParams = {orderNo, cashierMethod, cashierType, cashierTimeStart, cashierTimeEnd, tableCode};
        return searchParams;
    }

    getSearchParams2 = (searchData) => {
        const validateDate = moment(searchData.cashierTime[0]);
        if(validateDate.add(1, 'month').isBefore(searchData.cashierTime[1])) {
            message.info("支付(退)款时间查询间隔不能超过1个月");
            return null;
        }
        const cashierTimeStart = searchData.cashierTime[0].format('YYYY-MM-DD HH:mm');
        const cashierTimeEnd = searchData.cashierTime[1].format('YYYY-MM-DD HH:mm');
        const orderNo = searchData.orderNo;
        const cashierMethod = searchData.cashierMethod;
        const cashierType = searchData.cashierType;
        const tableCode = searchData.tableCode;
        const searchParams = {orderNo, cashierMethod, cashierType, cashierTimeStart, cashierTimeEnd, tableCode};
        return searchParams;
    }

    handleSearch = (values) => {
        const { searchFormData } = this.props.cashierLog;
        const searchParams = this.getSearchParams(searchFormData);
        if(!searchParams) return;
        const { pageSize } = this.props.cashierLog;
        searchParams.pageSize = pageSize;
        searchParams.pageNum = 1;
        this.props.cashierLogActions.handleSearch(values);
        this.props.cashierLogActions.list(searchParams);
    }

    onPageChange = (page, pageSize) => {
        // this.pageSize = pageSize;
        // this.pageNum = page;
        const { searchCondition } = this.props.cashierLog;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.cashierLogActions.list(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        // this.pageSize = size;
        // this.pageNum = current;
        const { searchCondition } = this.props.cashierLog;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.cashierLogActions.list(searchParams);
    }

    printCashier = (orderNo) => {
        const { currMerchantInfo } = this.props.homePage;
        ipcRenderer.on('printCashier-reply', (event, arg) => {
            if(arg.success) {
                message.success("打印命令已成功发送,请检查是否已打印");
            } else {
                message.error(`收银小票打印失败,${arg.message}`);
            }
            ipcRenderer.removeAllListeners("printCashier-reply");
        });
        this.props.cashierLogActions.selectPrintCashier(orderNo).then(data => {
            ipcRenderer.send("printCashier", {order: data.orderHisVo, merchant: currMerchantInfo, cashier: data.cashierLog});
        });
    }

    render() {
        const { pageSize, currentPage, total, searchFormData, loading, cashierLogList } = this.props.cashierLog;
        const { floorList } = this.props.hisOrder;
        const { onSearchFromFieldChangeValue, resetSearchFormFields } = this.props.cashierLogActions;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            total,
            current: currentPage,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
        };
        const columns = [{
            title: '用餐订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        }, {
            title: '桌台编号',
            dataIndex: 'tableCode',
            key: 'tableCode',
        }, {
            title: '收(退)款',
            dataIndex: 'cashierTypeName',
            key: 'cashierTypeName',
            render: (text, record) => {
                if(record.cashierType == "1") {
                    return <span>{record.cashierTypeName}</span>
                } else {
                    return <span style={{color: '#ff4242'}}>{record.cashierTypeName}</span>
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
            dataIndex: 'cashierMethodName',
            key: 'cashierMethodName',
        }, {
            title: '操作员',
            dataIndex: 'operationStaff',
            key: 'operationStaff',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        <Popconfirm title="确认打印收银小票吗?" onConfirm={() =>{this.printCashier(record.orderNo)}}>
                            <a href="javascript:void(0)">打印收银小票</a>
                        </Popconfirm>
                    </span>
                )
            },
        }];
        return (
            <PageHeaderLayout
                    title={"用餐订单收银\退银流水"}
                    content={`用餐订单收银与退款流水查询。注:以台为标准的流水，不管是不是并台支付，收银流水都是按一台（一笔用餐订单）来记录（比如：2台合并收银，收银记录会有2条）。另外查询时间间隔不能超过1个月`}
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
                        dataSource={cashierLogList}
                        columns={columns}
                        size={"middle"}
                        locale={
                            {emptyText: '查无数据'}
                        }
                        pagination={paginationProps}
                    />
                </Card>
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
        let cashierTimeError = null;
        if (this.props.cashierTime.errors) {
            cashierTimeError = this.props.cashierTime.errors[0].message;
        }
        return (
            <Form onSubmit={this.handleSearch}>
                <Row>
                    <Col span={10}>
                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="收(退)款时间" 
                            help={cashierTimeError ? cashierTimeError : ''}
                            validateStatus={cashierTimeError ? 'error' : ''}
                        >
                            {getFieldDecorator('cashierTime', {
                                rules: [{type: 'array', required: true, message: '请选择收(退)款时间', whitespace: true }],
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
                        <Form.Item {...formItemLayout} label="收银方式">
                            {getFieldDecorator('cashierMethod')(
                                <Select placeholder="请选择收银方式" style={{ width: '100%' }}>
                                    <Select.Option value="">所有</Select.Option>
                                    <Select.Option value="1">桌台扫码支付(支)</Select.Option>
                                    <Select.Option value="2">桌台扫码支付(微)</Select.Option>
                                    <Select.Option value="3">前台扫码支付(支)</Select.Option>
                                    <Select.Option value="4">前台扫码支付(微)</Select.Option>
                                    <Select.Option value="5">现金支付</Select.Option>
                                    <Select.Option value="6">扫码转账(支)</Select.Option>
                                    <Select.Option value="7">扫码转账(微)</Select.Option>
                                    <Select.Option value="8">其它</Select.Option>
                                    <Select.Option value="9">会员消费</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item {...formItemLayout} label="收(退)款">
                            {getFieldDecorator('cashierType')(
                                <Select placeholder="请选择收(退)款" style={{ width: '100%' }}>
                                    <Select.Option value="">所有</Select.Option>
                                    <Select.Option value="1">收银</Select.Option>
                                    <Select.Option value="2">退款</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="用餐订单号">
                            {getFieldDecorator('orderNo')(
                                <Input placeholder="用餐订单号" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item {...formItemLayout} label="桌台编号">
                            {getFieldDecorator('tableCode')(
                                <Select showArrow={true} placeholder="请选择桌台编号" style={{ width: '100%' }}>
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
                    <Col span={7} style={{ textAlign: 'right' }}>
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
            orderNo: Form.createFormField({
                value: props.orderNo.value,
            }),
            cashierMethod: Form.createFormField({
                value: props.cashierMethod.value,
            }),
            cashierType: Form.createFormField({
                value: props.cashierType.value,
            }),
            cashierTime: Form.createFormField({
                value: props.cashierTime.value,
            }),
            tableCode: Form.createFormField({
                value: props.tableCode.value,
            }),
        }
    }
})(SearchForm);

export default connect((state) => {
    return {
        cashierLog: state.cashierLog,
        hisOrder: state.hisOrder,
        homePage: state.homePage,
    }
}, (dispatch) => {
    return {
        cashierLogActions: bindActionCreators(cashierLogActions, dispatch),
        hisOrderActions: bindActionCreators(hisOrderActions, dispatch),
    }
})(CashierLog);