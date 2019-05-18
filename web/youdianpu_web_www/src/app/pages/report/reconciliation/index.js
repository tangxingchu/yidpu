import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Table, Button, Select, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';
import moment from 'moment';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import { rootRouter } from '../../../common/config';
import reconciliationActions from '../../../actions/reconciliation';

const payMethod = {"13": "支付宝扫码支付", "24": "微信扫码支付", "5": "现金支付", "6": "支付宝扫码转账", "7": "微信扫码转账", "8": "其它"};

class Reconciliation extends Component {
    constructor(props) {
        super(props)
    }

    onPageChange = (page, pageSize) => {
        // this.pageSize = pageSize;
        // this.pageNum = page;
        const { searchCondition } = this.props.reconciliation;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.reconciliationActions.reportReconciliation(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        // this.pageSize = size;
        // this.pageNum = current;
        const { searchCondition } = this.props.cashierLog;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.reconciliationActions.reportReconciliation(searchParams);
    }

    getSearchParams = (searchData) => {
        const beginDate = searchData.payTime.value[0].format('YYYY-MM-DD HH:mm');
        const endDate = searchData.payTime.value[1].format('YYYY-MM-DD HH:mm');
        const payMethod = searchData.payMethod.value;
        const searchParams = {payMethod, beginDate, endDate};
        return searchParams;
    }

    getSearchParams2 = (searchData) => {
        const beginDate = searchData.payTime[0].format('YYYY-MM-DD HH:mm');
        const endDate = searchData.payTime[1].format('YYYY-MM-DD HH:mm');
        const payMethod = searchData.payMethod;
        const searchParams = {payMethod, beginDate, endDate};
        return searchParams;
    }

    handleSearch = (values) => {
        const { searchFormData } = this.props.reconciliation;
        const searchParams = this.getSearchParams(searchFormData);
        if(!searchParams) return;
        const { pageSize } = this.props.reconciliation;
        searchParams.pageSize = pageSize;
        searchParams.pageNum = 1;
        this.props.reconciliationActions.handleSearch(values);
        this.props.reconciliationActions.reportReconciliation(searchParams);
    }

    handleSearch2 = (values) => {
        const { searchFormData } = this.props.reconciliation;
        const searchParams = this.getSearchParams(searchFormData);
        this.props.reconciliationActions.reportReconciliationTotal(searchParams);
    }

    render() {
        const { searchFormData, totalLaoding, totalDataList, detailLoading, detailDataList, pageSize, total, currentPage } = this.props.reconciliation;
        const { onSearchFromFieldChangeValue, resetSearchFormFields } = this.props.reconciliationActions;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            total,
            current: currentPage,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
        };
        const renderContent = () => {
            return (
                <span>
                    对账单查询只能查询今天之前的数据，如果想要查询当天的数据请前往
                    <Link to={`${rootRouter}/report/todayOverview`}>今日概览</Link>。
                    为了方便您的对账，移动支付交易（微信扫码支付与支付宝扫码支付）没有区分是营业金额还是会员充值金额。
                </span>
            )
        }
        const columns = [{
            title: '支付方式',
            dataIndex: 'pay_method',
            key: 'pay_method',
            render: (text, record) => {
                return (
                    <span>
                        {payMethod[`${record.pay_method}`]}
                    </span>
                )
            }
        }, {
            title: '营业金额',
            dataIndex: 'amount_total',
            key: 'amount_total',
            render: (text, record) => <span>￥{numeral(record.amount_total).format('0,0.00')}</span>
        }, {
            title: '营业退款金额',
            dataIndex: 'trunover_refund_total',
            key: 'trunover_refund_total',
            render: (text, record) => <span style={{color: '#ff4242'}}>￥{numeral(record.trunover_refund_total).format('0,0.00')}</span>
        }, {
            title: '会员充值金额',
            dataIndex: 'member_amount_total',
            key: 'member_amount_total',
            render: (text, record) => <span>￥{numeral(record.member_amount_total).format('0,0.00')}</span>
        }, {
            title: '会员退款金额',
            dataIndex: 'member_refund_total',
            key: 'member_refund_total',
            render: (text, record) => <span style={{color: '#ff4242'}}>￥{numeral(record.member_refund_total).format('0,0.00')}</span>
        }, {
            title: '合计退款总金额',
            dataIndex: 'refund_total',
            key: 'refund_total',
            render: (text, record) => <span style={{color: '#ff4242', fontWeight: 'bold'}}>￥{numeral(record.refund_total).format('0,0.00')}</span>
        }, {
            title: '合计总金额',
            dataIndex: 'total',
            key: 'total',
            render: (text, record) => <span style={{fontWeight: 'bold'}}>￥{numeral(record.total).format('0,0.00')}</span>
        }];
        const detailColumns = [{
            title: '数据日期',
            dataIndex: 'data_df',
            key: 'data_df',
        }, ...columns]
        return (
            <PageHeaderLayout title={"对账单查询"}
                content={renderContent()}>
                <Card bordered={false}>
                    <WrapperSearchForm
                        {...searchFormData}
                        fieldChangeValue={onSearchFromFieldChangeValue}
                        resetForm={resetSearchFormFields}
                        loading={totalLaoding}
                        handleSearch={this.handleSearch2}
                    />
                    <Table rowKey={record => record.id}
                        loading={totalLaoding}
                        dataSource={totalDataList}
                        columns={columns}
                        size={"middle"}
                        locale={
                            {emptyText: '查无数据'}
                        }
                        pagination={false}
                    />
                    {
                        totalDataList.length > 0 ?
                        <Fragment>
                            <div style={{marginTop: 16, marginBottom: 16}}>
                                <Button type={"primary"} loading={detailLoading} onClick={() => this.handleSearch()}>加载每日明细</Button>
                            </div>
                            <Table rowKey={record => `detail_${record.id}`}
                                loading={detailLoading}
                                dataSource={detailDataList}
                                columns={detailColumns}
                                size={"middle"}
                                locale={
                                    {emptyText: '查无数据'}
                                }
                                pagination={paginationProps}
                            />
                        </Fragment>
                        : null
                    }
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

    disabledDate = (current) => {
        return current && current >= moment().startOf('day');
    }

    render() {
        const { form, resetForm, loading } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 6 },
                lg: { span: 6 },
                xl: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 18 },
                lg: { span: 18 },
                xl: { span: 18 },
            },
        };
        let payTimeError = null;
        if (this.props.payTime.errors) {
            payTimeError = this.props.payTime.errors[0].message;
        }
        return (
            <Form onSubmit={this.handleSearch}>
                <Row>
                    <Col xs={24} sm={24} md={12} lg={10} xl={10}>
                        <Form.Item {...formItemLayout} label="数据日期" 
                            help={payTimeError ? payTimeError : ''}
                            validateStatus={payTimeError ? 'error' : ''}
                        >
                            {getFieldDecorator('payTime', {
                                rules: [{type: 'array', required: true, message: '请选择收(退)款时间', whitespace: true }],
                            })(
                                <DatePicker.RangePicker
                                    disabledDate={this.disabledDate}
                                    ranges={{
                                        "昨天(默认)": [moment().subtract(1, 'day').startOf('day'), moment().subtract(1, 'day').endOf('day')],
                                        '过去一周': [moment().subtract(7, 'day'), moment().subtract(1, 'day').endOf('day')],
                                        '过去一月': [moment().subtract(1, 'month'), moment().subtract(1, 'day').endOf('day')] }}
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10} xl={10}>
                        <Form.Item {...formItemLayout} label="支付方式"
                        >
                            {getFieldDecorator('payMethod')(
                                <Select placeholder="请选择顾客支付方式" style={{ width: '100%' }}>
                                    <Select.Option value="">所有</Select.Option>
                                    <Select.Option value="13">支付宝扫码支付</Select.Option>
                                    <Select.Option value="24">微信扫码支付</Select.Option>
                                    <Select.Option value="5">现金支付</Select.Option>
                                    <Select.Option value="6">支付宝扫码转账</Select.Option>
                                    <Select.Option value="7">微信扫码转账</Select.Option>
                                    <Select.Option value="8">其它</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={4} xl={4} style={{ textAlign: 'right' }}>
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
            payMethod: Form.createFormField({
                value: props.payMethod.value,
            }),
            payTime: Form.createFormField({
                value: props.payTime.value,
            }),
        }
    }
})(SearchForm);

export default connect((state) => {
	return {
        reconciliation: state.reconciliation,
	}
}, (dispatch) => {
	return {
        reconciliationActions: bindActionCreators(reconciliationActions, dispatch),
	}
})(Reconciliation);