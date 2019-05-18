import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Spin, Icon, Tooltip, List, Avatar, Radio, DatePicker, Table, Button, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';
import moment from 'moment';

import reportActions from '../../../actions/report';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import CustomerFlowChart from './customerFlowChart';
import CardExtra from '../cardExtra';
import styles from './index.less';

class CustomerFlow extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { customerFlowData } = this.props.report;
        if(customerFlowData.length == 0) {
            this.refresh();
        }
    }

    refresh = () => {
        const { customerFlowDate, customerFlowReportType } = this.props.report;
        const beginDate = customerFlowDate[0].format('YYYY-MM-DD');
        const endDate = customerFlowDate[1].format('YYYY-MM-DD');
        this.props.reportActions.reportCustomerFlow(customerFlowReportType, beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    onDateChange = (value, dateString) => {
        const { customerFlowReportType } = this.props.report;
        const validateDate = moment(value[0]);
        if(customerFlowReportType == "1" && validateDate.subtract(1, 'day').add(1, 'month').isBefore(value[1])) {
            message.info("日报查询间隔不能超过1个月");
            return;
        }
        this.props.reportActions.onCustomerFlowDateChange(value);
        const beginDate = dateString[0];
        const endDate = dateString[1];
        this.props.reportActions.reportCustomerFlow(customerFlowReportType, beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    onReportTypeChange = (e) => {
        const { value } = e.target;
        this.props.reportActions.onCustomerFlowReportTypeChange(value);
        const { customerFlowDate } = this.props.report;
        const beginDate = customerFlowDate[0].format('YYYY-MM-DD');
        const endDate = customerFlowDate[1].format('YYYY-MM-DD');
        this.props.reportActions.reportCustomerFlow(value, beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    exportExcel = () => {
        const { customerFlowDate, customerFlowReportType } = this.props.report;
        const beginDate = customerFlowDate[0].format('YYYY-MM-DD');
        const endDate = customerFlowDate[1].format('YYYY-MM-DD');
        this.props.reportActions.exportCustomerFlow(customerFlowReportType, beginDate, endDate).then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "客流量报表.xlsx";
            a.click(); 
        });
    }

    render() {
        const { customerFlowDate, customerFlowReportType, customerFlowReportDateDisabled } = this.props.report;
        const { customerFlowData, loading, exportLoading } = this.props.report;        
        const columns = [{
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '客流量',
            dataIndex: 'customer_flow',
            key: 'customer_flow',
            sorter: (a, b) => a.customer_flow - b.customer_flow,
            render: (text, record) => {
                return <span>{numeral(record.customer_flow).format("0,0")}人</span>
            }
        },];
        const renderFooter = () => {
            let total = 0;
            customerFlowData.forEach((item) => {
                total += item.customer_flow;
            });
            return (                
                <div className={styles.footer}>
                    总计：<span className={styles.total}>{numeral(total).format("0,0")}</span>人
                </div>
            )
        }
        return(
            <PageHeaderLayout title={"客流量报表"}
                content="客流量报表。包括日报、周报、月报、季报、年报。(查看月报、季报、年报时不受时间条件影响，月报、季报、年报不包括当月数据)">
                <Spin spinning={loading}>
                    <Card bordered={false} title={"客流量图表与表格"}
                        extra={<CardExtra onDateChange={this.onDateChange} 
                            onReportTypeChange={this.onReportTypeChange}
                            dateValue={customerFlowDate}
                            reportTypeValue={customerFlowReportType}
                            loading={loading}
                            dateDisabled={customerFlowReportDateDisabled}
                            onRefresh={this.refresh}
                        />}>
                        <CustomerFlowChart data={customerFlowData}/>
                        <div style={{marginTop: 8}}>
                            <Button type={"primary"} loading={exportLoading} onClick={() => {this.exportExcel()}}>表格导出Excel</Button>
                        </div>
                        <Table rowKey={record => record.date}
                            columns={columns}
                            dataSource={customerFlowData}
                            style={{marginTop: 8}}
                            loading={loading}
                            pagination={false}
                            footer={renderFooter}
                        >
                        </Table>
                    </Card>
                </Spin>
            </PageHeaderLayout>
        )
    }

}

export default connect((state) => {
	return {
        report: state.report,
	}
}, (dispatch) => {
	return {
        reportActions: bindActionCreators(reportActions, dispatch),
	}
})(CustomerFlow);