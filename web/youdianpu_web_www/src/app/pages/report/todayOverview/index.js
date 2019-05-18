import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Spin, Icon, Tooltip as TooltipAntd, List, Avatar, Tabs } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
TweenOne.plugins.push(Children);

import todayOverviewActions from '../../../actions/todayOverview';
import reportActions from '../../../actions/report';
import SalesByCategoryChart from './salesByCategoryChart';
import MemberRechargeChart from './memberRechargeChart';
import PayMethodChart from './payMethodChart.js';
import OrderNumChart from './orderNumChart';
import OrderDetailModal from '../orderNum/orderDetailModal';
import gold from './gold.png';
import silver from './silver.png';
import copper from './copper.png';

import styles from './index.less';


class TodayOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sumAmounttAnimation: null,
            sumIncomeAnimation: null,
            sumRefundAnimation: null,
            countOrderAnimation: null,
            countOrderByRefundAnimation: null,
            countOrderByExceptionAnimation: null,
            countOrderByRefund_AllAnimation: null,
            countOrderByRefund_PartAnimation: null,
            modalVisible: false,
        };
    }

    componentDidMount() {
        const { dataResults } = this.props.todayOverview;
        if(dataResults.beginDateTime == null) {
            this.init();
        } else {
            this.renderAnimation(dataResults);
        }
        // ipcRenderer.on('loadGoodsDefaultImage-reply',  (event, arg) => {
        //     const {goodsId, base64} = arg;
        //     this.props.todayOverviewActions.dispatch_goodsImage(goodsId, base64);
        // });
    }

    init = () => {
        this.props.todayOverviewActions.init().then((data) => {
            this.renderAnimation(data);
            const { salesRank = [] } = data;
            salesRank.forEach(item => {
                const { goods_id } = item;                
                // ipcRenderer.send('loadGoodsDefaultImage', {goodsId: goods_id, token: getToken()});
            });
        });
    }

    componentWillUnmount() {
        // ipcRenderer.removeAllListeners("loadGoodsDefaultImage-reply");
    }

    renderAnimation = (data) => {
        this.setState({
            sumAmounttAnimation: {
                Children: { 
                    value: data.sumAmount,
                    floatLength: 2,
                    formatMoney: true, 
                }, 
                duration: 1000,
            },
            sumIncomeAnimation: {
                Children: { 
                    value: data.sumIncome,
                    floatLength: 2,
                    formatMoney: true, 
                }, 
                duration: 1000,
            },
            sumRefundAnimation: {
                Children: { 
                    value: Math.abs(data.sumRefund),
                    floatLength: 2,
                    formatMoney: true, 
                }, 
                duration: 1000,
            },
            countOrderAnimation: {
                Children: { 
                    value: data.countOrder,
                    floatLength: 0,
                    formatMoney: false, 
                }, 
                duration: 500,
            },
            countOrderByRefundAnimation: {
                Children: { 
                    value: data.countOrderByRefund,
                    floatLength: 0,
                    formatMoney: false, 
                }, 
                duration: 500,
            },
            countOrderByExceptionAnimation: {
                Children: { 
                    value: data.countOrderByException,
                    floatLength: 0,
                    formatMoney: false, 
                }, 
                duration: 500,
            },
            countOrderByRefund_AllAnimation: {
                Children: { 
                    value: data.countOrderByRefund_All,
                    floatLength: 0,
                    formatMoney: false, 
                }, 
                duration: 500,
            },
            countOrderByRefund_PartAnimation: {
                Children: { 
                    value: data.countOrderByRefund_Part,
                    floatLength: 0,
                    formatMoney: false, 
                }, 
                duration: 500,
            },
          });
    }

    handleModalVisible = (flag, type) => {
        if(flag) {
            this.props.reportActions.reportOrderDetail(type, "", "");
        }
        this.setState({modalVisible: !!flag});
    }

    render() {
        const { modalVisible } = this.state;
        const { orderLoading, orderDetailData } = this.props.report;    
        const { initLoading, dataResults, goodsImages, activeKey } = this.props.todayOverview;
        const { onTabChange } = this.props.todayOverviewActions;
        const { payMethods = [], orders = [], salesByCategory = [], memberRechargeResults = [] } = dataResults;
        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            style: { marginBottom: 24 },
        };
        const bottomColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: { marginBottom: 24 },
        };
        const renderDescription = (item) => {
            if(item.total_num) {
                return (
                    <span>今日已销售出<span className={styles.salesNum}>{item.total_num}</span>{item.goods_unit_name}</span>
                )
            } else {
                return (
                    <span></span>
                )
            }
        }
        const renderRank = (item) => {
            if(item.rank) {
                if(item.rank == "1") {
                    return <div className={styles.top}><img src={gold}/></div>
                } else if(item.rank == "2") {
                    return <span className={styles.top}><img src={silver}/></span>
                } if(item.rank == "3") {
                    return <span className={styles.top}><img src={copper}/></span>
                } else {
                    return <span className={styles.top_other}>{item.rank}</span>
                }
            } else {
                return '未上榜';
            }
        }
        return (
            <Fragment>
                <Spin spinning={initLoading}>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Card bordered={false} style={{marginBottom: 24}}>
                                <div className={styles.todayTime}>
                                    <TooltipAntd title="刷新">
                                        <Icon type={"reload"} onClick={() => {this.init()}} className={styles.reload}/>
                                    </TooltipAntd>
                                    今日[<span>{dataResults.todayDate}({dataResults.beginDateTime}~{dataResults.endDateTime})</span>]的统计数据
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col {...topColResponsiveProps}>
                            <Card bordered={false} title={"今日营业额概览"} extra={<TooltipAntd title={
                                    <div>营业额=收银金额-退款金额<br/>销售额=销售各种商品单价合计(包含减免金额)</div>}>
                                    <Icon type="info-circle-o" />
                                </TooltipAntd>}>
                                <div className={styles.sales}>
                                    <div className={styles.totalAmount}>
                                        <span>营业额:￥</span>
                                        <TweenOne
                                            animation={this.state.sumAmounttAnimation}
                                            style={{ fontSize: 56, }}
                                        >
                                            0
                                        </TweenOne>
                                        <span>元</span>
                                    </div>
                                    <div className={styles.income_refund}>
                                        <div className={`${styles.totalAmount} ${styles.totalAmount_secondary}`}>
                                            <span>收银金额:￥</span>
                                            <TweenOne
                                                animation={this.state.sumIncomeAnimation}
                                                style={{ fontSize: 26, color: '#87d068' }}
                                            >
                                                0
                                            </TweenOne>
                                            <span>元</span>
                                        </div>
                                        <div className={`${styles.totalAmount} ${styles.totalAmount_secondary}`}>
                                            <span>退款金额:￥</span>
                                            <TweenOne
                                                animation={this.state.sumRefundAnimation}
                                                style={{ fontSize: 26, color: '#ff4242'}}
                                            >
                                                0
                                            </TweenOne>
                                            <span>元</span>
                                        </div>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        {/* <PayMethodChart data={payMethods}/> */}
                                        <Tabs tabPosition={'bottom'} activeKey={activeKey} onChange={onTabChange}>
                                            <Tabs.TabPane tab="销售额占比" key="2">
                                                <SalesByCategoryChart data={salesByCategory} salesTotal={dataResults.salesTotal}/>
                                                {/* <Pie
                                                    hasLegend
                                                    total={() => (
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: yuan(salesByCategory.reduce((pre, now) => now.y + pre, 0)),
                                                            }}
                                                        />
                                                    )}
                                                    data={salesByCategory}
                                                    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                                                    height={248}
                                                    lineWidth={4}
                                                /> */}
                                            </Tabs.TabPane>
                                            <Tabs.TabPane tab="支付占比" key="1">
                                                <PayMethodChart data={payMethods}/>
                                            </Tabs.TabPane>
                                            <Tabs.TabPane tab="会员充值" key="3">
                                                <MemberRechargeChart data={memberRechargeResults} rechargeTotal={dataResults.rechargeTotal}/>
                                            </Tabs.TabPane>
                                        </Tabs>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col {...topColResponsiveProps}>
                            <Card bordered={false} title={"今日用餐订单概览"}>
                                <div className={styles.order}>
                                    <div className={styles.totalOrderNum}>
                                        <span>合计用餐订单笔数:</span>
                                            <TweenOne
                                                animation={this.state.countOrderAnimation}
                                                style={{ fontSize: 56 }}
                                            >
                                                0
                                            </TweenOne>
                                        <span>笔</span>
                                    </div>
                                    <div className={`${styles.otherOrderNum} ${styles.dataItem_second}`}>
                                        <div className={styles.otherOrderNumChild}>
                                            <div className={styles.firstDataItem}>
                                                <span>退款订单笔数:</span>
                                                    <TweenOne
                                                        animation={this.state.countOrderByRefundAnimation}
                                                        style={{ fontSize: 26, color: '#ff4242', cursor: 'pointer'}}
                                                        onClick={() => this.handleModalVisible(true, 1)}
                                                    >
                                                        0
                                                    </TweenOne>
                                                <span>笔</span>
                                            </div>
                                            <div className={styles.secondDataItem}>
                                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                    <span>全额退款:</span>
                                                    <TweenOne
                                                        animation={this.state.countOrderByRefund_AllAnimation}
                                                        style={{ fontSize: 18, color: '#ff4242'}}
                                                    >
                                                        0
                                                    </TweenOne>
                                                    <span>笔</span>
                                                </div>
                                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                    <span>部分退款:</span>
                                                    <TweenOne
                                                        animation={this.state.countOrderByRefund_PartAnimation}
                                                        style={{ fontSize: 18, color: '#ff4242'}}
                                                    >
                                                        0
                                                    </TweenOne>
                                                    <span>笔</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.otherOrderNumChild}>
                                            <span>异常单(订单金额≠收银金额+优惠金额):</span>
                                                <TweenOne
                                                    animation={this.state.countOrderByExceptionAnimation}
                                                    style={{ fontSize: 26, color: '#FACC14', cursor: 'pointer'}}
                                                    onClick={() => this.handleModalVisible(true, 4)}
                                                >
                                                    0
                                                </TweenOne>
                                            <span>笔</span>
                                        </div>
                                    </div>
                                    <div style={{width: '100%', marginTop: 32}}>
                                        <OrderNumChart data={orders}/>
                                    </div>
                                </div>                                
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col {...bottomColResponsiveProps}>
                            <Card bordered={false} title={"今日客流量"}>
                                <div className={styles.number}>
                                    {dataResults.countDiners}<span>人</span>
                                </div>
                            </Card>
                        </Col>
                        <Col {...bottomColResponsiveProps}>
                            <Card bordered={false} title={"人均消费"}>
                                <div className={styles.number}>
                                    <span>￥</span>{dataResults.averageOrderPrice || 0.00}<span>元</span>
                                </div>
                            </Card>
                        </Col>
                        <Col {...bottomColResponsiveProps} xl={12}>
                            <Card bordered={false} title={"今日翻台率"} extra={<TooltipAntd title="中餐统计时间(08:00~15:00),晚餐统计时间:(15:00~24:00)">
                                    <Icon type="info-circle-o" />
                                </TooltipAntd>}>
                                <div className={styles.ftl}>
                                    <div className={styles.number}>
                                        <span>中餐</span>{dataResults.noonFTL}
                                    </div>
                                    <div className={styles.number}>
                                        <span>晚餐</span>{dataResults.nightFTL}
                                    </div>
                                    <div className={styles.number}>
                                        <span>全天</span>{dataResults.todayFTL}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Card bordered={false} title={"今日商品销售排行榜"}>
                                <div className={styles.salesRank}>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={dataResults.salesRank}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={goodsImages[item.goods_id]} style={{width: 64, height: 64}}/>}
                                                    title={item.goods_name}
                                                    description={renderDescription(item)}
                                                />
                                                <div>{renderRank(item)}</div>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Spin>
                <OrderDetailModal visible={modalVisible} 
                    handleModalVisible={this.handleModalVisible}
                    loading={orderLoading}
                    orderDetailData={orderDetailData}
                >
                </OrderDetailModal>
            </Fragment>
        )
    }

}

export default connect((state) => {
	return {
        todayOverview: state.todayOverview,
        report: state.report,
	}
}, (dispatch) => {
	return {
        todayOverviewActions: bindActionCreators(todayOverviewActions, dispatch),
        reportActions: bindActionCreators(reportActions, dispatch),
	}
})(TodayOverview);