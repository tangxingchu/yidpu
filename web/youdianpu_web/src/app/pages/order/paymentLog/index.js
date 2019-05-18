import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Table, Button, Input , Select, DatePicker, message } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import paymentLogActions from '../../../actions/paymentLog';
import styles from './index.less';

class PaymentLog extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
            title: '支付宝或微信订单号',
            dataIndex: 'payNo',
            key: 'payNo',
        }, /* {
            title: '用餐订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        },  */{
            title: '支付(退)款',
            dataIndex: 'logTypeName',
            key: 'logTypeName',
            render: (text, record) => {
                if(record.logType == "1") {
                    return <span>{record.logTypeName}</span>
                } else {
                    return <span style={{color: '#ff4242'}}>{record.logTypeName}</span>
                }
            }
        }, {
            title: '金额',
            dataIndex: 'payAmount',
            key: 'payAmount',
            render: (text, record) => {
                if(record.payAmount < 0) {
                    return <span style={{color: '#ff4242'}}>￥{numeral(record.payAmount).format('0,0.00')}</span>
                } else {
                    return <span>￥{numeral(record.payAmount).format('0,0.00')}</span>
                }
            }
        }, {
            title: '支付(退)款时间',
            dataIndex: 'payTime',
            key: 'payTime',
        }, {
            title: '支付(退)款方式',
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
    }

    componentDidMount() {
        const { searchFormData, paymentLogList } = this.props.paymentLog;
        if(paymentLogList.length == 0) {
            const searchParams = this.getSearchParams(searchFormData);
            const { pageSize } = this.props.paymentLog;
            searchParams.pageSize = pageSize;
            searchParams.pageNum = 1;
            this.props.paymentLogActions.list(searchParams);
        }
    }

    getSearchParams = (searchData) => {
        const validateDate = moment(searchData.payTime.value[0]);
        if(validateDate.add(1, 'month').isBefore(searchData.payTime.value[1])) {
            message.info("支付(退)款时间查询间隔不能超过1个月");
            return null;
        }
        const payTimeStart = searchData.payTime.value[0].format('YYYY-MM-DD HH:mm');
        const payTimeEnd = searchData.payTime.value[1].format('YYYY-MM-DD HH:mm');
        const orderNo = searchData.orderNo.value;
        const payMethod = searchData.payMethod.value;
        const logType = searchData.logType.value;
        const payNo = searchData.payNo.value;
        const searchParams = {orderNo, payMethod, logType, payTimeStart, payTimeEnd, payNo};
        return searchParams;
    }

    getSearchParams2 = (searchData) => {
        const validateDate = moment(searchData.payTime[0]);
        if(validateDate.add(1, 'month').isBefore(searchData.payTime[1])) {
            message.info("支付(退)款时间查询间隔不能超过1个月");
            return null;
        }
        const payTimeStart = searchData.payTime[0].format('YYYY-MM-DD HH:mm');
        const payTimeEnd = searchData.payTime[1].format('YYYY-MM-DD HH:mm');
        const orderNo = searchData.orderNo;
        const payMethod = searchData.payMethod;
        const logType = searchData.logType;
        const payNo = searchData.payNo;
        const searchParams = {orderNo, payMethod, logType, payTimeStart, payTimeEnd, payNo};
        return searchParams;
    }

    handleSearch = (values) => {
        const { searchFormData } = this.props.paymentLog;
        const searchParams = this.getSearchParams(searchFormData);
        if(!searchParams) return;
        const { pageSize } = this.props.paymentLog;
        searchParams.pageSize = pageSize;
        searchParams.pageNum = 1;
        this.props.paymentLogActions.handleSearch(values);
        this.props.paymentLogActions.list(searchParams);
    }

    onPageChange = (page, pageSize) => {
        // this.pageSize = pageSize;
        // this.pageNum = page;
        const { searchCondition } = this.props.paymentLog;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.paymentLogActions.list(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        // this.pageSize = size;
        // this.pageNum = current;
        const { searchCondition } = this.props.paymentLog;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.paymentLogActions.list(searchParams);
    }

    getSearchParams2 = (searchData) => {
        const validateDate = moment(searchData.payTime[0]);
        if(validateDate.add(1, 'month').isBefore(searchData.payTime[1])) {
            message.info("支付(退)款时间查询间隔不能超过1个月");
            return null;
        }
        const payTimeStart = searchData.payTime[0].format('YYYY-MM-DD HH:mm');
        const payTimeEnd = searchData.payTime[1].format('YYYY-MM-DD HH:mm');
        const orderNo = searchData.orderNo;
        const cashierMethod = searchData.cashierMethod;
        const cashierType = searchData.cashierType;
        const tableCode = searchData.tableCode;
        const searchParams = {orderNo, cashierMethod, cashierType, payTimeStart, payTimeEnd, tableCode};
        return searchParams;
    }

    render() {
        const { pageSize, currentPage, total, searchFormData, loading, paymentLogList } = this.props.paymentLog;
        const { onSearchFromFieldChangeValue, resetSearchFormFields } = this.props.paymentLogActions;
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
                    title={"移动支付与退款流水"}
                    content={`微信支付与退款流水查询、支付宝支付与退款流水查询。注:这里是顾客每次扫码支付的流水。与顾客比对支付金额时可以此作为依据(顾客报微信或支付订单号后6位给您)。查询时间间隔不能超过1个月`}
                >   
                <Card bordered={false}>
                    <WrapperSearchForm
                        {...searchFormData}
                        fieldChangeValue={onSearchFromFieldChangeValue}
                        resetForm={resetSearchFormFields}
                        loading={loading}
                        handleSearch={this.handleSearch}
                    />
                    <Table rowKey={record => record.id}
                        loading={loading}
                        dataSource={paymentLogList}
                        columns={this.columns}
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
        let payTimeError = null;
        if (this.props.payTime.errors) {
            payTimeError = this.props.payTime.errors[0].message;
        }
        return (
            <Form onSubmit={this.handleSearch}>
                <Row>
                    <Col span={10}>
                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="支付(退)款时间" 
                            help={payTimeError ? payTimeError : ''}
                            validateStatus={payTimeError ? 'error' : ''}
                        >
                            {getFieldDecorator('payTime', {
                                rules: [{type: 'array', required: true, message: '请选择支付(退)款时间', whitespace: true }],
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
                        <Form.Item {...formItemLayout} label="支付方式">
                            {getFieldDecorator('payMethod')(
                                <Select placeholder="请选择顾客支付方式" style={{ width: '100%' }}>
                                    <Select.Option value="">所有</Select.Option>
                                    <Select.Option value="1">桌台扫码支付(支)</Select.Option>
                                    <Select.Option value="2">桌台扫码支付(微)</Select.Option>
                                    <Select.Option value="3">前台扫码支付(支)</Select.Option>
                                    <Select.Option value="4">前台扫码支付(微)</Select.Option>
                                    {/* <Select.Option value="5">现金支付</Select.Option>
                                    <Select.Option value="6">扫码转账(支)</Select.Option>
                                    <Select.Option value="7">扫码转账(微)</Select.Option>
                                    <Select.Option value="8">其它</Select.Option> */}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item {...formItemLayout} label="支付(退)款">
                            {getFieldDecorator('logType')(
                                <Select placeholder="请选择支付(退)款" style={{ width: '100%' }}>
                                    <Select.Option value="">所有</Select.Option>
                                    <Select.Option value="1">支付</Select.Option>
                                    <Select.Option value="2">退款</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    {/* <Col span={10}>
                        <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="用餐订单号">
                            {getFieldDecorator('orderNo')(
                                <Input placeholder="用餐订单号" />
                            )}
                        </Form.Item>
                    </Col> */}
                    <Col span={10}>
                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="订单号(支/微)">
                            {getFieldDecorator('payNo')(
                                <Input placeholder="支付宝或者微信订单号(全部或者后6位)" />
                            )}
                        </Form.Item>
                    </Col>
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
            orderNo: Form.createFormField({
                value: props.orderNo.value,
            }),
            payMethod: Form.createFormField({
                value: props.payMethod.value,
            }),
            logType: Form.createFormField({
                value: props.logType.value,
            }),
            payTime: Form.createFormField({
                value: props.payTime.value,
            }),
            payNo: Form.createFormField({
                value: props.payNo.value,
            }),
        }
    }
})(SearchForm);

export default connect((state) => {
    return {
        paymentLog: state.paymentLog,
    }
}, (dispatch) => {
    return {
        paymentLogActions: bindActionCreators(paymentLogActions, dispatch),
    }
})(PaymentLog);