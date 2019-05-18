import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Spin, message, Timeline, Icon, Tooltip, Popover, Button, DatePicker, Table, Tag, Radio } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import ruleAnalysisActions from '../../../actions/ruleAnalysis';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import TurnoverChart from './turnoverChart';
import CustomerFlowChart from './customerFlowChart';
import TableRateChart from './tableRateChart';

const colors = {"enabled-goods-day": "orange", "enabled-goods-discount": "#1890ff", "enabled-goods-subtract": "#ff4242"};

class RuleAnalysis extends Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '运营规则',
            dataIndex: 'ruleName',
            key: 'ruleName',
        }, {
            title: '规则开始日期',
            dataIndex: 'ruleBeginDate',
            key: 'ruleBeginDate',
        }, {
            title: '规则结束日期',
            dataIndex: 'ruleEndDate',
            key: 'ruleEndDate',
        }, {
            title: '规则目前状态',
            dataIndex: 'ruleStatus',
            key: 'ruleStatus',
            render: (text, record) => {
                if(record.ruleEndDate) {
                    return <Tag color="#ff4242">已结束</Tag>
                } else {
                    return <Tag color="#87d068">运营中...</Tag>
                }
            }
        }];
    }

    componentDidMount() {
        const { ruleHisTimes } = this.props.ruleAnalysis;
        if(ruleHisTimes.length == 0) {
            this.props.ruleAnalysisActions.selectByTimeline().then(data => {
                const currRuleHisTime = []; //用于计算初始化时间
                const new_ruleHisTimes = data.filter(item => {
                    if(!item.rule_date) {
                        currRuleHisTime.push(item);
                        return false;
                    }
                    return true;
                });
                //表示当前正处于某一个规则运营中...
                let initDate = [];
                if(currRuleHisTime.length > 0) {
                    let beginDate = moment(currRuleHisTime[0].rule_begin_date, 'YYYY-MM-DD');
                    let endDate = moment().subtract(1, 'day');
                    //反正查询周期不能超过3个月
                    if(moment(beginDate).add(3, 'month').isBefore(endDate)) {
                        beginDate = moment(endDate).subtract(3, 'month');
                    }
                    initDate = [beginDate, endDate];
                } else {//所有规则都禁用了
                    //有启用规则历史
                    if(new_ruleHisTimes.length > 0) {
                        const length = new_ruleHisTimes.length;
                        let beginDate = moment(new_ruleHisTimes[length-1].rule_begin_date, 'YYYY-MM-DD');
                        let endDate = moment(new_ruleHisTimes[length-1].rule_end_date, 'YYYY-MM-DD');
                        //反正查询周期不能超过3个月
                        if(moment(beginDate).add(3, 'month').isBefore(endDate)) {
                            beginDate = moment(endDate).subtract(3, 'month');
                        }
                        initDate = [beginDate, endDate];
                    } else {//没有规则历史启用记录
                        //不默认任何数据
                    }
                }
                if(initDate.length != 0) {
                    this.props.ruleAnalysisActions.init(initDate[0].format('YYYY-MM-DD'), initDate[1].format('YYYY-MM-DD'));
                }
            });
        }
    }

    refresh = () => {
        this.props.ruleAnalysisActions.selectByTimeline();
        this.props.ruleAnalysisActions.dispatch_refresh();
    }

    selectRuleHisDetail = (ruleHisId) => {
        const { ruleHisDetails } = this.props.ruleAnalysis;
        const ruleHisDetailList = ruleHisDetails[ruleHisId];
        if(!ruleHisDetailList) {
            this.props.ruleAnalysisActions.selectRuleHisDetail(ruleHisId);
        }
    }    

    disabledDate = (current) => {
        const { ruleHisTimes } = this.props.ruleAnalysis;
        if(ruleHisTimes.length > 0) {
            return current < moment(ruleHisTimes[0].rule_date, 'YYYY-MM-DD').startOf('day') || (current && current >= moment().startOf('day'));
        } else {
            return current < moment().startOf('day') && current && current >= moment().startOf('day');
        }
    }

    onDateChange = (value, dateString) => {
        this.props.ruleAnalysisActions.onDateChange(value);
        if(moment(value[0]).add(3, 'month').isBefore(value[1])) {
            message.info("运营分析时间周期跨度不能超过3个月");
            return;
        }
        this.props.ruleAnalysisActions.init(value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD'));
    }

    onTurnoverChange = (e) => {
        const { value } = e.target;
        const { initDate } = this.props.ruleAnalysis;
        this.props.ruleAnalysisActions.onTurnoverTypeChange(value);
        this.props.ruleAnalysisActions.selectTurnoverData(initDate[0].format('YYYY-MM-DD'), initDate[1].format('YYYY-MM-DD'), value);
    }

    onCustomerFlowChange = (e) => {
        const { value } = e.target;
        const { initDate } = this.props.ruleAnalysis;
        this.props.ruleAnalysisActions.onCustomerFlowTypeChange(value);
        this.props.ruleAnalysisActions.selectCustomerFlowData(initDate[0].format('YYYY-MM-DD'), initDate[1].format('YYYY-MM-DD'), value);
    }

    onTableRateChange = (e) => {
        const { value } = e.target;
        const { initDate } = this.props.ruleAnalysis;
        this.props.ruleAnalysisActions.onTableRateTypeChange(value);
        this.props.ruleAnalysisActions.selectTableRateData(initDate[0].format('YYYY-MM-DD'), initDate[1].format('YYYY-MM-DD'), value);
    }

    render() {
        const { ruleHisTimes, loading, currRuleHisTime, detailsLoading, ruleHisDetails, initDate, analysisLoading, ruleHisList, 
            turnovers, customerFlows, tableRates, turnoverType, customerFlowType, tableRateType, turnoverLoading, customerFlowLoading,
            tableRateLoading, } = this.props.ruleAnalysis;
        const renderContent = (ruleHisId) => {
            const ruleHisDetailList = ruleHisDetails[ruleHisId];
            if(!ruleHisDetailList || detailsLoading) {                
                return <Spin/>
            } else {
                return ruleHisDetailList.map(item => {
                    return <div key={item.id} >
                        <div style={{fontWeight: 'bold'}}>操作: {item.createTime}
                            <span>
                                {item.operationType == "1" ? "启用运营规则" 
                                    : item.operationType == "2" ? "新增运营规则项" 
                                    : item.operationType == "3" ? "删除运营规则项" : item.operationType == "4" ? "修改运营规则项" : ""}
                            </span>
                        </div>
                        <div dangerouslySetInnerHTML={{__html:`${item.ruleDetails}`}}></div>
                    </div>
                })                
            }
        }
        const renderPending = () => {
            if(currRuleHisTime.length > 0) {
                const ruleNames = [];
                currRuleHisTime.forEach(item => {
                    ruleNames.push(item.rule_name);
                });
                return <span>当前运营中的规则[
                        {
                            currRuleHisTime.map(ruleHis => {
                                return (
                                    <Fragment key={ruleHis.id}>
                                        <Popover content={renderContent(ruleHis.id)} title="运营规则历史操作明细" trigger="click">
                                            <span style={{color: colors[ruleHis.rule_code], cursor: 'pointer'}} onClick={() => {this.selectRuleHisDetail(ruleHis.id)}}>{ruleHis.rule_name}</span>
                                        </Popover>
                                        <span>、</span>
                                    </Fragment>
                                )
                            })
                        }
                    ]</span>
            } else {
                return false;
            }
        }
        return(
            <PageHeaderLayout title={"运营分析"}
                content={`运营分析是您在启用了某一个运营规则之后，协助您启用运营规则前后的营业额、客流量、翻台率的对比分析。
                注意：分析运营数据时间间隔必须大于1天，也就是在您启用某一规则的时间与禁用相同规则时间间隔必须大于1天。`}>
                <Row gutter={{ xs: 8, sm: 16, md: 24}}>
                    <Col span={{ xs: 24, sm: 24, md: 6, lg: 6, xl: 6,}}>
                        <Spin spinning={loading}>
                            <Card bordered={false} title={"运营规则时间轴"} 
                                extra={
                                    <Fragment>
                                        <Button loading={loading} style={{marginRight: 8}} onClick={() => {this.refresh()}}>刷新</Button>
                                        <Tooltip title="您可以点击时间轴数据查看明细" >
                                            <Icon type="info-circle-o" />
                                        </Tooltip>
                                    </Fragment>
                                }>
                                <Timeline pending={renderPending()} pendingDot={<Icon type="clock-circle-o" style={{ fontSize: '16px', color: '#87d068' }} />}>
                                    {
                                        ruleHisTimes.length == 0 ? 
                                        <Timeline.Item>未启用任何运营规则</Timeline.Item>
                                        : ruleHisTimes.map((ruleHis, index) => {
                                            if(ruleHis.type == 'begin') {
                                            return <Timeline.Item key={index} dot={<Icon type="check-circle-o" style={{ fontSize: '16px', color: colors[ruleHis.rule_code] }} />}>
                                                        <Popover content={renderContent(ruleHis.id)} title="运营规则明细" trigger="click">
                                                            <span style={{color: colors[ruleHis.rule_code], cursor: 'pointer'}} onClick={() => {this.selectRuleHisDetail(ruleHis.id)}}>{ruleHis.rule_date}启用了[{ruleHis.rule_name}]</span>
                                                        </Popover>
                                                    </Timeline.Item>
                                            } else {
                                                return <Timeline.Item key={index} dot={<Icon type="close-circle-o" style={{ fontSize: '16px', color: colors[ruleHis.rule_code] }} />}>
                                                    <Popover content={renderContent(ruleHis.id)} title="运营规则明细" trigger="click">
                                                        <span style={{color: colors[ruleHis.rule_code], cursor: 'pointer'}} onClick={() => {this.selectRuleHisDetail(ruleHis.id)}}>{ruleHis.rule_date}禁用了[{ruleHis.rule_name}]</span>
                                                    </Popover>
                                                </Timeline.Item>
                                            }
                                        })                                
                                    }
                                </Timeline>
                            </Card>
                        </Spin>
                    </Col>
                    <Col span={{ xs: 24, sm: 24, md: 18, lg: 18, xl: 18,}}>
                        <Spin spinning={analysisLoading}>
                            <Card bordered={false} title={"运营分析"} extra={
                                <div>
                                    运营分析时间周期:
                                    <DatePicker.RangePicker
                                        disabledDate={this.disabledDate}
                                        value={initDate}
                                        format="YYYY-MM-DD"
                                        onChange={this.onDateChange}
                                        style={{marginRight: 8, marginLeft: 16}}
                                    />
                                    <Tooltip title="默认是当前正运营中的最早启用某一运营规则的开始日期与昨天的日期">
                                        <Icon type="info-circle-o" />
                                    </Tooltip>
                                </div>
                            }>
                                <Card title={"当前时间周期内运营规则"}>
                                    <Table rowKey={record => record.id}
                                        dataSource={ruleHisList}
                                        columns={this.columns}
                                        pagination={false}
                                    >
                                    </Table>
                                </Card>
                                <Card title={"营业额"} style={{marginTop: 8}} extra={
                                    <Radio.Group value={turnoverType} buttonStyle="solid" onChange={this.onTurnoverChange}
                                        disabled={turnoverLoading}>
                                        <Radio.Button value="1">上一周期环比</Radio.Button>
                                        <Radio.Button value="2">月环比</Radio.Button>
                                        <Radio.Button value="3">去年同比</Radio.Button>
                                    </Radio.Group>
                                }>
                                    <Spin spinning={turnoverLoading}>
                                        <TurnoverChart turnovers={turnovers} type={turnoverType}/>
                                    </Spin>
                                </Card>

                                <Card title={"客流量"} style={{marginTop: 8}} extra={
                                    <Radio.Group value={customerFlowType} buttonStyle="solid" onChange={this.onCustomerFlowChange}
                                        disabled={customerFlowLoading}>
                                        <Radio.Button value="1">上一周期环比</Radio.Button>
                                        <Radio.Button value="2">月环比</Radio.Button>
                                        <Radio.Button value="3">去年同比</Radio.Button>
                                    </Radio.Group>
                                }>  
                                    <Spin spinning={customerFlowLoading}>
                                        <CustomerFlowChart customerFlows={customerFlows} type={customerFlowType}/>
                                    </Spin>
                                </Card>
                                <Card title={"翻台率"} style={{marginTop: 8}} extra={
                                    <Radio.Group value={tableRateType} buttonStyle="solid" onChange={this.onTableRateChange}
                                        disabled={tableRateLoading}>
                                        <Radio.Button value="1">上一周期环比</Radio.Button>
                                        <Radio.Button value="2">月环比</Radio.Button>
                                        <Radio.Button value="3">去年同比</Radio.Button>
                                    </Radio.Group>
                                }>
                                    <Spin spinning={tableRateLoading}>
                                        <TableRateChart tableRates={tableRates} type={tableRateType}/>
                                    </Spin>
                                </Card>
                            </Card>
                        </Spin>
                    </Col>
                </Row>                
            </PageHeaderLayout>
        )
    }    

}

export default connect((state) => {
    return {
        ruleAnalysis: state.ruleAnalysis,
    }
}, (dispatch) => {
    return {
        ruleAnalysisActions: bindActionCreators(ruleAnalysisActions, dispatch),
    }
})(RuleAnalysis);