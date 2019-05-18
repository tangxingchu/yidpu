import React, { Component, Fragment } from 'react';
import { Card, Spin, Table, Button, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';
import moment from 'moment';

import reportActions from '../../../actions/report';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import OrderNumChart from './orderNumChart';
import CardExtra from '../cardExtra';
import OrderDetailModal from './orderDetailModal';
import styles from './index.less';

class OrderNum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    componentDidMount() {
        const { orderData } = this.props.report;
        if(orderData.length == 0) {
            this.refresh();
        }
    }

    refresh = () => {
        const { orderDate, orderReportType } = this.props.report;
        const beginDate = orderDate[0].format('YYYY-MM-DD');
        const endDate = orderDate[1].format('YYYY-MM-DD');
        this.props.reportActions.reportOrder(orderReportType, beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    onDateChange = (value, dateString) => {
        const { orderReportType } = this.props.report;
        const validateDate = moment(value[0]);
        if(orderReportType == "1" && validateDate.subtract(1, 'day').add(1, 'month').isBefore(value[1])) {
            message.info("日报查询间隔不能超过1个月");
            return;
        }
        this.props.reportActions.onOrderDateChange(value);
        const beginDate = dateString[0];
        const endDate = dateString[1];
        this.props.reportActions.reportOrder(orderReportType, beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    onReportTypeChange = (e) => {
        const { value } = e.target;
        this.props.reportActions.onOrderReportTypeChange(value);
        const { orderDate } = this.props.report;
        const beginDate = orderDate[0].format('YYYY-MM-DD');
        const endDate = orderDate[1].format('YYYY-MM-DD');
        this.props.reportActions.reportOrder(value, beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    handleModalVisible = (flag, type, record) => {
        if(flag) {
            const { orderDate, orderReportType } = this.props.report;
            const beginDate = orderDate[0].format('YYYY-MM-DD');
            const endDate = orderDate[1].format('YYYY-MM-DD');
            // this.props.reportActions.reportOrderDetail(type, beginDate, endDate);
            //季报、年报
            if(orderReportType == "4" || orderReportType == "5") {
                this.props.reportActions.reportOrderDetail(type, orderReportType, record.date, record.date);
            } else {
                this.props.reportActions.reportOrderDetail(type, orderReportType, record.data_date, record.data_date);
            }
        }
        this.setState({modalVisible : !!flag});
    }

    exportExcel = () => {
        const { orderDate, orderReportType } = this.props.report;
        const beginDate = orderDate[0].format('YYYY-MM-DD');
        const endDate = orderDate[1].format('YYYY-MM-DD');
        this.props.reportActions.exportOrder(orderReportType, beginDate, endDate).then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "订单报表.xlsx";
            a.click(); 
        });
    }

    render() {
        const { modalVisible } = this.state;
        const { orderDate, orderReportType, orderReportDateDisabled } = this.props.report;
        const { orderData, loading, orderLoading, orderDetailData, exportLoading } = this.props.report;        
        const columns = [{
            title: '日期',
            dataIndex: 'data_date',
            key: 'data_date',
        }, {
            title: '订单总笔数',
            dataIndex: 'order_num',
            key: 'order_num',
            sorter: (a, b) => a.order_num - b.order_num,
            render: (text, record) => {
                return <span>{numeral(record.order_num).format("0,0")}</span>
            }
        }, {
            title: '退款订单笔数',
            dataIndex: 'refund_num',
            key: 'refund_num',
            sorter: (a, b) => a.refund_num - b.refund_num,
            render: (text, record) => {
                if(record.refund_num > 0) {
                    return <span><a href="javascript:void(0)" onClick={() => {this.handleModalVisible(true, 1, record)}}>{record.refund_num}</a></span>
                } else {
                    return <span>{numeral(record.refund_num).format("0,0")}</span>
                }                
            }
        }, {
            title: '全额退款订单笔数',
            dataIndex: 'all_refund_num',
            key: 'all_refund_num',
            sorter: (a, b) => a.all_refund_num - b.all_refund_num,
            render: (text, record) => {
                if(record.all_refund_num > 0) {
                    return <span><a href="javascript:void(0)" onClick={() => {this.handleModalVisible(true, 2, record)}}>{record.all_refund_num}</a></span>
                } else {
                    return <span>{numeral(record.all_refund_num).format("0,0")}</span>
                }
            }
        }, {
            title: '部分退款订单笔数',
            dataIndex: 'part_refund_num',
            key: 'part_refund_num',
            sorter: (a, b) => a.part_refund_num - b.part_refund_num,
            render: (text, record) => {
                if(record.part_refund_num > 0) {
                    return <span><a href="javascript:void(0)" onClick={() => {this.handleModalVisible(true, 3, record)}}>{record.part_refund_num}</a></span>
                } else {
                    return <span>{numeral(record.part_refund_num).format("0,0")}</span>
                }
            }
        }, {
            title: '异常订单笔数',
            dataIndex: 'exception_num',
            key: 'exception_num',
            sorter: (a, b) => a.exception_num - b.exception_num,
            render: (text, record) => {
                if(record.exception_num > 0) {
                    return <span><a href="javascript:void(0)" onClick={() => {this.handleModalVisible(true, 4, record)}}>{record.exception_num}</a></span>
                } else {
                    return <span>{numeral(record.exception_num).format("0,0")}</span>
                }
            }
        },];
        const renderFooter = () => {
            let total = 0;
            let totalRefund = 0;
            let totalException = 0;
            orderData.forEach((item) => {
                total += item.order_num;
                totalRefund += item.refund_num;
                totalException += item.exception_num;
            });
            return (
                <div className={styles.footer}>
                    总计：<span className={styles.total}>{numeral(total).format("0,0")}</span>笔，
                    退款：<span className={styles.totalRefund}>{numeral(totalRefund).format("0,0")}</span>笔，
                    异常：<span className={styles.totalException}>{numeral(totalException).format("0,0")}</span>笔
                </div>
            )
        }
        return(
            <PageHeaderLayout title={"用餐订单报表"}
                content="用餐订单报表，包括日报、周报、月报、季报、年报。异常订单包括支付异常(支付金额≠订单金额)和存在退单的订单。(查看月报、季报、年报时不受时间条件影响，月报、季报、年报不包括当月数据)">
                <Spin spinning={loading}>
                    <Card bordered={false} title={"用餐订单图表与表格"}
                        extra={<CardExtra onDateChange={this.onDateChange} 
                            onReportTypeChange={this.onReportTypeChange}
                            dateValue={orderDate}
                            reportTypeValue={orderReportType}
                            loading={loading}
                            dateDisabled={orderReportDateDisabled}
                            onRefresh={this.refresh}
                        />}>
                        <OrderNumChart data={orderData}/>
                        <div style={{marginTop: 8}}>
                            <Button type={"primary"} loading={exportLoading} onClick={() => {this.exportExcel()}}>表格导出Excel</Button>
                        </div>
                        <Table rowKey={record => record.data_date}
                            columns={columns}
                            dataSource={orderData}
                            style={{marginTop: 8}}
                            loading={loading}
                            pagination={false}
                            footer={renderFooter}
                        >
                        </Table>
                    </Card>
                </Spin>
                <OrderDetailModal visible={modalVisible}
                    handleModalVisible={this.handleModalVisible}
                    loading={orderLoading}
                    orderDetailData={orderDetailData}
                >
                </OrderDetailModal>
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
})(OrderNum);