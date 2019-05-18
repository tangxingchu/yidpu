import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
    Spin,
} from 'antd';
import numeral from 'numeral';
import {
    ChartCard,
    yuan,
    MiniArea,
    MiniBar,
    MiniLine,
    Field,
    Bar,
    Pie,
} from '../../../components/Charts';
import Trend from '../../../components/Trend';
import { getTimeDistance } from '../../../utils/utils';
import reportActions from '../../../actions/report';
import PayMethodChart from './payMethodChart';

import styles from './index.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

class Analysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            salesType: 'all',
            rangePickerValue: "",
        }
    }

    componentDidMount() {
        const { analysisData } = this.props.report;
        if(!analysisData.turnovers) {
            this.props.reportActions.reportAnalysis();
        }
    }

    refresh = () => {
        this.props.reportActions.reportAnalysis();
    }

    isActive = (type) => {
        const { rangePickerValue } = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return;
        }
        if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
            return styles.currentDate;
        }
    }

    handleChangeSalesType = e => {
        this.setState({
            salesType: e.target.value,
        });
    }

    render() {

        const { rangePickerValue, salesType } = this.state;

        const { analysisData, analysisLoading } = this.props.report;
        const { turnovers = {}, orders = {}, averages = {}, tableRates = {}, customerFlowDatas = [], saleCategorys = [], payMethods = [] } = analysisData;

        const salesExtra = (
            <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                    <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                        今日
                </a>
                    <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                        本周
                </a>
                    <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                        本月
                </a>
                    <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                        全年
                </a>
                </div>
                <RangePicker
                    value={rangePickerValue}
                    onChange={this.handleRangePickerChange}
                    style={{ width: 256 }}
                />
            </div>
        );

        const visitData = [{ "x": "2018-05-25", "y": 12 }, { "x": "2018-05-26", "y": 20 }, { "x": "2018-05-27", "y": 10 }, { "x": "2018-05-28", "y": 15 }
            , { "x": "2018-05-29", "y": 12 }, { "x": "2018-05-30", "y": 20 }, { "x": "2018-05-31", "y": 10 }, { "x": "2018-06-01", "y": 15 }];
        const salesData = [{ "x": "2018-05-25", "y": 12 }, { "x": "2018-05-26", "y": 20 }, { "x": "2018-05-27", "y": 10 }, { "x": "2018-05-28", "y": 15 }
            , { "x": "2018-05-29", "y": 12 }, { "x": "2018-05-30", "y": 20 }, { "x": "2018-05-31", "y": 10 }, { "x": "2018-06-01", "y": 15 }];
        const salesTypeData = [{ "x": "酒水类", "y": 1100 }, { "x": "菜肴类", "y": 6000 }, { "x": "其他", "y": 2000 }];
        const salesTypeDataOnline = [{ "x": "酒水类", "y": 3100 }, { "x": "菜肴类", "y": 5000 }, { "x": "其他", "y": 1000 }];
        const salesTypeDataOffline = [{ "x": "酒水类", "y": 2100 }, { "x": "菜肴类", "y": 4000 }, { "x": "其他", "y": 4000 }];
        const salesPieData = salesType === 'all' ? salesTypeData : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
        const topColResponsiveProps = {
            xs: 24,
            sm: 24,
            md: 24,
            lg: 24,
            xl: 12,
            style: { marginBottom: 24 },
        };

        const menu = (
            <Menu>
                <Menu.Item>操作一</Menu.Item>
                <Menu.Item>操作二</Menu.Item>
            </Menu>
        );
        const iconGroup = (
            <span className={styles.iconGroup}>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Icon type="ellipsis" />
                </Dropdown>
            </span>
        );

        return (
            <Spin spinning={analysisLoading}>
                <div className={styles.refresh}>
                    <div><Tooltip title="刷新"><Icon type="reload" onClick={() => this.refresh()}/></Tooltip></div>
                </div>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="总营业额"
                            action={
                                <Tooltip title="日环比是昨天与前天的数据对比">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={() => <span dangerouslySetInnerHTML={{ __html: yuan(turnovers.turnoverTotal) }} />}
                            footer={<Field label="日均营业额" value={`￥${numeral(turnovers.turnoverAvg).format('0,0.00')}`} />}
                            contentHeight={46}
                        >
                            {/* <Trend flag="up" style={{ marginRight: 16 }}>
                                周同比<span className={styles.trendText}>12%</span>
                            </Trend> */}
                            <Trend flag={turnovers.turnoverPercent >= 0 ? 'up' : 'down'}>
                                日环比<span className={styles.trendText}>{((turnovers.turnoverPercent || 0) * 100).toFixed(2)}%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="总用餐订单量"
                            action={
                                <Tooltip title="最近15天的订单数据">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={numeral(orders.orderTotal).format('0,0')}
                            footer={<Field label="日均用餐订单量" value={numeral(orders.orderAvg).format('0,0.00')} />}
                            contentHeight={46}
                        >
                            <MiniArea color="#975FE4" data={orders.orderDatas} />
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="平均人均消费"
                            action={
                                <Tooltip title="最近15天的人均消费数据">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={`￥${numeral(averages.averageAvg).format('0,0.00')}`}
                            footer={
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    {/* <Trend flag="up" style={{ marginRight: 16 }}>
                                        周同比<span className={styles.trendText}>12%</span>
                                    </Trend> */}
                                    <Trend flag={averages.averagePercent >= 0 ? 'up' : 'down'}>
                                        日环比<span className={styles.trendText}>{((averages.averagePercent || 0) * 100).toFixed(2)}%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            <MiniBar data={averages.averageDatas} />
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="平均翻台率"
                            action={
                                <Tooltip title="日同比是昨天与上月同一天数据对比,日环比是昨天与前天数据对比">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={`${((tableRates.tableRateAvg || 0) * 100).toFixed(2)}%`}
                            footer={
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    {/* <Trend flag="up" style={{ marginRight: 16 }}>
                                        日同比<span className={styles.trendText}>12%</span>
                                    </Trend> */}
                                    <Trend flag={tableRates.tableRatePercent >= 0 ? 'up' : 'down'}>
                                        日环比<span className={styles.trendText}>{((tableRates.tableRatePercent || 0) * 100).toFixed(2)}%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            {/* <div>达到目标(目标值：150%)</div> */}
                            {/* <MiniProgress percent={80} strokeWidth={8} target={100} color="#13C2C2" /> */}
                            <MiniLine data={tableRates.tableRateDatas}/>
                        </ChartCard>
                    </Col>
                </Row>

                <Card bordered={false} bodyStyle={{ padding: 0 }}>
                    <div className={styles.salesCard}>
                        <Tabs /* tabBarExtraContent={salesExtra}  */ tabBarExtraContent={
                                <Tooltip title="最近15天的营业额">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            } size="large" tabBarStyle={{ marginBottom: 24 }}>
                            <TabPane tab="营业额" key="sales">
                                <Row>
                                    {/* <Col xl={16} lg={12} md={12} sm={24} xs={24}> */}
                                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <Bar height={295} title="营业额趋势" data={turnovers.turnoverDatas} />
                                        </div>
                                    </Col>
                                    {/* <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>门店营业额排名</h4>
                                            <ul className={styles.rankingList}>
                                                {rankingListData.map((item, i) => (
                                                    <li key={item.title}>
                                                        <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                        <span>{item.title}</span>
                                                        <span>{numeral(item.total).format('0,0')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className={styles.rankingList}>测试1</ul>
                                        </div>
                                    </Col> */}
                                </Row>
                            </TabPane>
                            <TabPane tab="客流量" key="views">
                                <Row>
                                    {/* <Col xl={16} lg={12} md={12} sm={24} xs={24}> */}
                                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <Bar height={292} title="客流量趋势" data={customerFlowDatas} />
                                        </div>
                                    </Col>
                                    {/* <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>门店客流量排名</h4>
                                            <ul className={styles.rankingList}>
                                                {rankingListData.map((item, i) => (
                                                    <li key={item.title}>
                                                        <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                        <span>{item.title}</span>
                                                        <span>{numeral(item.total).format('0,0')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className={styles.rankingList}>测试2</ul>
                                        </div>
                                    </Col> */}
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>

                <Row gutter={24}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card bordered={false} 
                            className={styles.salesOrder}
                            bodyStyle={{ padding: 24 }}
                            style={{ marginTop: 24, minHeight: 562 }}
                            title="支付方式占比">
                            <Card bordered={false}>
                                <PayMethodChart data={payMethods}/>
                          </Card>
                        </Card>
                    </Col>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            className={styles.salesCard}
                            bordered={false}
                            title="销售额类别占比"
                            bodyStyle={{ padding: 24 }}
                            extra={
                                <div className={styles.salesCardExtra}>
                                    {/* iconGroup */}
                                    <div className={styles.salesTypeRadio}>
                                        <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                                            <Radio.Button value="all">全部渠道</Radio.Button>
                                            {/* <Radio.Button value="online">线上</Radio.Button>
                                            <Radio.Button value="offline">门店</Radio.Button> */}
                                        </Radio.Group>
                                    </div>
                                </div>
                            }
                            style={{ marginTop: 24, minHeight: 562 }}
                        >
                            <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>
                            <Pie
                                hasLegend
                                subTitle="销售额"
                                total={() => (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: yuan(saleCategorys.reduce((pre, now) => now.y + pre, 0)),
                                        }}
                                    />
                                )}
                                data={saleCategorys}
                                valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                                height={248}
                                lineWidth={4}
                            />
                        </Card>
                    </Col>
                </Row>

            </Spin>
        );
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
})(Analysis);