import React, { Component, Fragment } from 'react';

import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
    ChartCard,
    yuan,
    MiniArea,
    MiniBar,
    MiniProgress,
    Field,
    Bar,
    Pie,
    TimelineChart,
} from '../../../components/Charts';
import Trend from '../../../components/Trend';
import NumberInfo from '../../../components/NumberInfo';
import { getTimeDistance } from '../../../utils/utils';

import styles from './index.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

export default class Analysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            salesType: 'all',
            rangePickerValue: "",
            loading: true,//当卡片内容还在加载中时，可以用 loading 展示一个占位
        }
    }

    componentDidMount() {
        window.setTimeout(() => {
            this.setState({ loading: false });
        }, 1400);
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

        const { rangePickerValue, loading, salesType } = this.state;

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
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
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
            <Fragment>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="总营业额"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={() => <span dangerouslySetInnerHTML={{ __html: yuan(126560) }} />}
                            footer={<Field label="日均营业额" value={`￥${numeral(12423).format('0,0')}`} />}
                            contentHeight={46}
                        >
                            <Trend flag="up" style={{ marginRight: 16 }}>
                                周同比<span className={styles.trendText}>12%</span>
                            </Trend>
                            <Trend flag="down">
                                日环比<span className={styles.trendText}>11%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="客流量"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={numeral(8846).format('0,0')}
                            footer={<Field label="日客流量" value={numeral(1234).format('0,0')} />}
                            contentHeight={46}
                        >
                            <MiniArea color="#975FE4" data={visitData} />
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="人均消费"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={numeral(6560).format('0,0')}
                            footer={
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    <Trend flag="up" style={{ marginRight: 16 }}>
                                        周同比<span className={styles.trendText}>12%</span>
                                    </Trend>
                                    <Trend flag="down">
                                        日环比<span className={styles.trendText}>11%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            <MiniBar data={visitData} />
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="翻台率"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total="178%"
                            footer={
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    <Trend flag="up" style={{ marginRight: 16 }}>
                                        周同比<span className={styles.trendText}>12%</span>
                                    </Trend>
                                    <Trend flag="down">
                                        日环比<span className={styles.trendText}>11%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            <div>达到目标(目标值：150%)</div>
                            {/* <MiniProgress percent={100} strokeWidth={8} target={100} color="#13C2C2" /> */}
                        </ChartCard>
                    </Col>
                </Row>

                <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
                    <div className={styles.salesCard}>
                        <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
                            <TabPane tab="营业额" key="sales">
                                <Row>
                                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <Bar height={295} title="营业额趋势" data={salesData} />
                                        </div>
                                    </Col>
                                    {<Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>门店营业额排名</h4>
                                            {/* <ul className={styles.rankingList}>
                                                {rankingListData.map((item, i) => (
                                                    <li key={item.title}>
                                                        <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                        <span>{item.title}</span>
                                                        <span>{numeral(item.total).format('0,0')}</span>
                                                    </li>
                                                ))}
                                            </ul> */}
                                            <ul className={styles.rankingList}>测试1</ul>
                                        </div>
                                    </Col>}
                                </Row>
                            </TabPane>
                            <TabPane tab="客流量" key="views">
                                <Row>
                                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <Bar height={292} title="客流量趋势" data={salesData} />
                                        </div>
                                    </Col>
                                    {<Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>门店客流量排名</h4>
                                            {/* <ul className={styles.rankingList}>
                                                {rankingListData.map((item, i) => (
                                                    <li key={item.title}>
                                                        <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                        <span>{item.title}</span>
                                                        <span>{numeral(item.total).format('0,0')}</span>
                                                    </li>
                                                ))}
                                            </ul> */}
                                            <ul className={styles.rankingList}>测试2</ul>
                                        </div>
                                    </Col>}
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>

                <Row gutter={24}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card loading={loading} bordered={false} 
                            className={styles.salesOrder}
                            bodyStyle={{ padding: 24 }}
                            style={{ marginTop: 24, minHeight: 562 }}
                            title="本月菜品排行">
                            <Card
                                type="inner"
                                title="畅销菜品Top4"
                                extra={<a href="#">更多</a>}
                            >
                                <Row>
                                    <Col span={6}>
                                        <div className={styles.salesDiv}>
                                            <div><img className={styles.salesImg} src="http://img3.redocn.com/tupian/20141125/xianggucaidan_3613214.jpg"/></div>
                                            <div className={styles.salesText}>香菇菜胆</div>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className={styles.salesDiv}>
                                            <div><img className={styles.salesImg} src="http://pic34.photophoto.cn/20150105/0042040239643097_b.jpg"/></div>
                                            <div className={styles.salesText}>豆豉鲮鱼油麦</div>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className={styles.salesDiv}>
                                            <div><img className={styles.salesImg} src="http://img3.redocn.com/tupian/20141114/shacainiurou2_3449265.jpg"/></div>
                                            <div className={styles.salesText}>沙菜牛肉</div>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className={styles.salesDiv}>
                                            <div><img className={styles.salesImg} src="http://pic35.photophoto.cn/20150527/0042040210064179_b.jpg"/></div>
                                            <div className={styles.salesText}>迎春头盘菜</div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                            <Card
                                type="inner"
                                title="滞销菜品"
                                style={{ marginTop: 24 }}
                                extra={<a href="#">更多</a>}
                            >
                                <Row>
                                    <Col span={6}>
                                        <div className={styles.salesDiv}>
                                            <div><img className={styles.salesImg2} src="http://img3.redocn.com/tupian/20141125/xianggucaidan_3613214.jpg"/></div>
                                            <div className={styles.salesText}>香菇菜胆</div>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className={styles.salesDiv}>
                                            <div><img className={styles.salesImg2} src="http://pic34.photophoto.cn/20150105/0042040239643097_b.jpg"/></div>
                                            <div className={styles.salesText}>豆豉鲮鱼油麦</div>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className={styles.salesDiv}>
                                            <div><img className={styles.salesImg2} src="http://img3.redocn.com/tupian/20141114/shacainiurou2_3449265.jpg"/></div>
                                            <div className={styles.salesText}>沙菜牛肉</div>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div className={styles.salesDiv}>
                                            <div><img className={styles.salesImg2} src="http://pic35.photophoto.cn/20150527/0042040210064179_b.jpg"/></div>
                                            <div className={styles.salesText}>迎春头盘菜</div>
                                        </div>
                                    </Col>
                                </Row>
                          </Card>
                        </Card>
                    </Col>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            loading={loading}
                            className={styles.salesCard}
                            bordered={false}
                            title="销售额类别占比"
                            bodyStyle={{ padding: 24 }}
                            extra={
                                <div className={styles.salesCardExtra}>
                                    {iconGroup}
                                    <div className={styles.salesTypeRadio}>
                                        <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                                            <Radio.Button value="all">全部渠道</Radio.Button>
                                            <Radio.Button value="online">线上</Radio.Button>
                                            <Radio.Button value="offline">门店</Radio.Button>
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
                                            __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
                                        }}
                                    />
                                )}
                                data={salesPieData}
                                valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                                height={248}
                                lineWidth={4}
                            />
                        </Card>
                    </Col>
                </Row>

            </Fragment>
        );
    }

}

