import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Spin, Icon, Tooltip, List, Avatar, Radio, DatePicker, Table, Button, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';
import moment from 'moment';

import reportActions from '../../../actions/report';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import TurnoverChart from './turnoverChart.js';
import CardExtra from '../cardExtra';
import styles from './index.less';

class TurnOver extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { turnoverData } = this.props.report;
        if(turnoverData.length == 0) {
            this.refresh();
        }        
    }
    
    refresh = () => {
        const { turnoverDate, turnoverReportType } = this.props.report;
        const beginDate = turnoverDate[0].format('YYYY-MM-DD');
        const endDate = turnoverDate[1].format('YYYY-MM-DD');
        this.props.reportActions.reportTurnover(turnoverReportType, beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    onDateChange = (value, dateString) => {
        const { turnoverReportType } = this.props.report;
        const validateDate = moment(value[0]);
        if(turnoverReportType == "1" && validateDate.subtract(1, 'day').add(1, 'month').isBefore(value[1])) {
            message.info("日报查询间隔不能超过1个月");
            return;
        }
        this.props.reportActions.onTurnoverDateChange(value);
        const beginDate = dateString[0];
        const endDate = dateString[1];
        this.props.reportActions.reportTurnover(turnoverReportType, beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    onReportTypeChange = (e) => {
        const { value } = e.target;
        this.props.reportActions.onTurnoverReportTypeChange(value);
        const { turnoverDate } = this.props.report;
        const beginDate = turnoverDate[0].format('YYYY-MM-DD');
        const endDate = turnoverDate[1].format('YYYY-MM-DD');
        this.props.reportActions.reportTurnover(value, beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    exportExcel = () => {
        const { turnoverDate, turnoverReportType } = this.props.report;
        const beginDate = turnoverDate[0].format('YYYY-MM-DD');
        const endDate = turnoverDate[1].format('YYYY-MM-DD');
        this.props.reportActions.exportTurnover(turnoverReportType, beginDate, endDate).then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "营业额报表.xlsx";
            a.click(); 
        });
    }

    render() {
        const { turnoverDate, turnoverReportType, turnoverReportDateDisabled } = this.props.report;
        const { turnoverData, loading, exportLoading } = this.props.report;        
        const columns = [{
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '营业额',
            dataIndex: 'total_price',
            key: 'total_price',
            sorter: (a, b) => a.total_price - b.total_price,
            render: (text, record) => {
                return <span>￥{numeral(record.total_price).format("0,0.00")}</span>
            }
        },];
        const renderFooter = () => {
            let total = 0;
            turnoverData.forEach((item) => {
                total += item.total_price;
            });
            return (                
                <div className={styles.footer}>
                    总计：￥<span className={styles.total}>{numeral(total).format("0,0.00")}</span>
                </div>
            )
        }
        return(
            <PageHeaderLayout title={"营业额报表"}
                content="营业额报表。包括日报、周报、月报、季报、年报。(查看月报、季报、年报时不受时间条件影响，月报、季报、年报不包括当月数据)">
                <Spin spinning={loading}>
                    <Card bordered={false} title={"营业额图表与表格"}
                        extra={<CardExtra onDateChange={this.onDateChange} 
                            onReportTypeChange={this.onReportTypeChange}
                            dateValue={turnoverDate}
                            loading={loading}
                            reportTypeValue={turnoverReportType}
                            dateDisabled={turnoverReportDateDisabled}
                            onRefresh={this.refresh}
                        />}>
                        <TurnoverChart data={turnoverData}/>
                        <div style={{marginTop: 8}}>
                            <Button type={"primary"} loading={exportLoading} onClick={() => {this.exportExcel()}}>表格导出Excel</Button>
                        </div>
                        <Table rowKey={record => record.date}
                            columns={columns}
                            dataSource={turnoverData}
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
})(TurnOver);