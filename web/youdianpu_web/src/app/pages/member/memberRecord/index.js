import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Table, Button, Input , Select, DatePicker, Spin, Popconfirm, Tooltip, Icon, Popover, message } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import memberRecordActions from '../../../actions/memberRecord';
import styles from './index.less';

class MemberRecordPage extends Component {

    constructor(props) {
        super(props)
        this.columns = [{
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '会员姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '消费(充值)',
            dataIndex: 'recordType',
            key: 'recordType',
            render: (text, record) => {
                if(record.recordType == "1") {
                    return <span>{record.recordTypeName}</span>
                } else {
                    return <span style={{color: '#ff4242'}}>{record.recordTypeName}</span>
                }
            }
        }, {
            title: '充值(消费)金额',
            dataIndex: 'priceAmount',
            key: 'priceAmount',
            render: (text, record) => {                
                if(record.priceAmount < 0) {
                    return <span style={{color: '#ff4242'}}>￥{numeral(record.priceAmount).format('0,0.00')}</span>
                } else {
                    return <span>￥{numeral(record.priceAmount).format('0,0.00')}</span>
                }
            }
        }, {
            title: '充值方式',
            dataIndex: 'payMethodName',
            key: 'payMethodName',
        }, {
            title: '充值(消费)时间',
            dataIndex: 'recordTime',
            key: 'recordTime',
        }, {
            title: '积分抵扣金额',
            dataIndex: 'pointPrice',
            key: 'pointPrice',
            render: (text, record) => {
                return <span>￥{numeral(record.pointPrice).format('0,0.00')}</span>
            }
        }, {
            title: '消耗积分',
            dataIndex: 'consumePoint',
            key: 'consumePoint',
        }, {
            title: '充值赠送金额',
            dataIndex: 'givePrice',
            key: 'givePrice',
            render: (text, record) => {
                return <span>￥{numeral(record.givePrice).format('0,0.00')}</span>
            }
        }, {
            title: '本次结余',
            dataIndex: 'recordBalance',
            key: 'recordBalance',
            render: (text, record) => {
                return <span>￥{numeral(record.recordBalance).format('0,0.00')}</span>
            }
        }, {
            title: '操作员',
            dataIndex: 'operationStaff',
            key: 'operationStaff',
        }, {
            title: '备注',
            dataIndex: 'recordDesc',
            key: 'recordDesc',
            width: 200,
        }];
    }

    componentDidMount() {
        const { searchFormData, memberRecordList } = this.props.memberRecord;
        if(memberRecordList.length == 0) {
            const searchParams = this.getSearchParams(searchFormData);
            const { pageSize } = this.props.memberRecord;
            searchParams.pageSize = pageSize;
            searchParams.pageNum = 1;
            this.props.memberRecordActions.list(searchParams);
        }
    }

    getSearchParams = (searchData) => {
        // const validateDate = moment(searchData.recordTime.value[0]);
        // if(validateDate.add(1, 'month').isBefore(searchData.recordTime.value[1])) {
        //     message.info("时间查询间隔不能超过1个月");
        //     return null;
        // }
        const recordTimeStart = searchData.recordTime.value[0].format('YYYY-MM-DD');
        const recordTimeEnd = searchData.recordTime.value[1].format('YYYY-MM-DD');
        const phone = searchData.phone.value;
        const searchParams = {phone, recordTimeStart, recordTimeEnd};
        return searchParams;
    }

    getSearchParams2 = (searchData) => {
        // const validateDate = moment(searchData.recordTime[0]);
        // if(validateDate.add(1, 'month').isBefore(searchData.recordTime[1])) {
        //     message.info("时间查询间隔不能超过1个月");
        //     return null;
        // }
        const recordTimeStart = searchData.recordTime[0].format('YYYY-MM-DD');
        const recordTimeEnd = searchData.recordTime[1].format('YYYY-MM-DD');
        const phone = searchData.phone;
        const searchParams = {phone, recordTimeStart, recordTimeEnd};
        return searchParams;
    }

    handleSearch = (values) => {
        const { searchFormData } = this.props.memberRecord;
        const searchParams = this.getSearchParams(searchFormData);
        if(!searchParams) return;
        const { pageSize } = this.props.memberRecord;
        searchParams.pageSize = pageSize;
        searchParams.pageNum = 1;
        this.props.memberRecordActions.handleSearch(values);
        this.props.memberRecordActions.list(searchParams);
    }

    onPageChange = (page, pageSize) => {
        // this.pageSize = pageSize;
        // this.pageNum = page;
        const { searchCondition } = this.props.memberRecord;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.memberRecordActions.list(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        // this.pageSize = size;
        // this.pageNum = current;
        const { searchCondition } = this.props.memberRecord;
        const searchParams = this.getSearchParams2(searchCondition);
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.memberRecordActions.list(searchParams);
    }

    render() {
        const { pageSize, currentPage, total, searchFormData, loading, memberRecordList } = this.props.memberRecord;
        const { onSearchFromFieldChangeValue, resetSearchFormFields } = this.props.memberRecordActions;
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
                    title={"会员充值、消费、退款记录"}
                    content={`会员充值、消费、退款流水查询。`}
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
                        dataSource={memberRecordList}
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
        let recordTimeError = null;
        if (this.props.recordTime.errors) {
            recordTimeError = this.props.recordTime.errors[0].message;
        }
        return (
            <Form onSubmit={this.handleSearch}>
                <Row>
                    <Col span={10}>
                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="充值(消费)时间" 
                            help={recordTimeError ? recordTimeError : ''}
                            validateStatus={recordTimeError ? 'error' : ''}
                        >
                            {getFieldDecorator('recordTime', {
                                rules: [{type: 'array', required: true, message: '请选择充值(消费)时间', whitespace: true }],
                            })(
                                <DatePicker.RangePicker 
                                    ranges={{ "全天(默认)": [moment().startOf('day'), moment().endOf('day')],
                                        "过去2小时": [moment().subtract(2, 'hour'), moment()],
                                        "过去6小时": [moment().subtract(6, 'hour'), moment()],
                                        "过去12小时": [moment().subtract(12, 'hour'), moment()],
                                        '过去一周': [moment().subtract(7, 'day'), moment()],
                                        '过去一月': [moment().subtract(1, 'month'), moment()] }}
                                    format="YYYY-MM-DD"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="会员手机号">
                            {getFieldDecorator('phone')(
                                <Input placeholder="会员手机号" />
                            )}
                        </Form.Item>
                    </Col>
                    
                    <Col span={4} style={{ textAlign: 'right' }}>
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
            phone: Form.createFormField({
                value: props.phone.value,
            }),
            recordTime: Form.createFormField({
                value: props.recordTime.value,
            }),
        }
    }
})(SearchForm);

export default connect((state) => {
    return {
        memberRecord: state.memberRecord,
    }
}, (dispatch) => {
    return {
        memberRecordActions: bindActionCreators(memberRecordActions, dispatch),
    }
})(MemberRecordPage);