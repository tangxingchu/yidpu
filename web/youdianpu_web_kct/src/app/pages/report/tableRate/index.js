import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Spin, Icon, Tooltip, List, Radio, DatePicker, Table, Button, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import reportActions from '../../../actions/report';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import styles from './index.less';
import TableRateChart from './tableRateChart';

class TableRate extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { tableRateData } = this.props.report;
        if(tableRateData.length == 0) {
            this.refresh();
        }
    }

    refresh = () => {
        const { tableRateDate } = this.props.report;
        const beginDate = tableRateDate[0].format('YYYY-MM-DD');
        const endDate = tableRateDate[1].format('YYYY-MM-DD');
        this.props.reportActions.reportTableRate(beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    onDateChange = (value, dateString) => {
        const validateDate = moment(value[0]);
        if(validateDate.subtract(1, 'day').add(1, 'month').isBefore(value[1])) {
            message.info("查询间隔不能超过1个月");
            return;
        }
        this.props.reportActions.onTableRateDateChange(value);
        const beginDate = dateString[0];
        const endDate = dateString[1];
        this.props.reportActions.reportTableRate(beginDate, endDate).then(data => {
            if(data.length == 0) {
                message.info("没有任何数据");
            }
        });
    }

    disabledDate = (current) => {
        return current && current >= moment().startOf('day');
    }

    render() {
        const { tableRateData, loading, tableRateDate } = this.props.report;
        return (
            <PageHeaderLayout title={"历史翻台率"}
                content="历史翻台率可以协助您设定精准的营销策略">
                <Spin spinning={loading}>
                    <Card bordered={false} title={"翻台率图表"}
                        extra={
                            <Fragment>
                                <Button loading={loading} onClick={() => this.refresh()}>刷新</Button>
                                <DatePicker.RangePicker
                                    disabledDate={this.disabledDate}
                                    value={tableRateDate}
                                    format="YYYY-MM-DD"
                                    onChange={this.onDateChange}
                                    style={{marginRight: 16, marginLeft: 16}}
                                />
                            </Fragment>
                        }>
                        <TableRateChart data={tableRateData}/>
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
})(TableRate);