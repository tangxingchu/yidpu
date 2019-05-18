import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Spin, DatePicker, message, Button, Menu, Dropdown, Icon, Table, Popover, Rate } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';

import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
TweenOne.plugins.push(Children);

import memberAnalysisActions from '../../../actions/memberAnalysis';
import styles from './index.less';
import MemberConsumeChart from './memberConsumeChart';
import MemberNewChart from './memberNewChart';
import MemberRechargeChart from './memberRechargeChart';
import NumericInput from './NumericInput';

class MemberAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalAmountAnimation: null,
            priceAmountAnimation: null,
            pointPriceAnimation: null,
            givePriceAnimation: null,
            accountBalanceAnimation: null,
            totalRecharge: '',
            totalConsume: '',
            orderByTotalRecharge: '',
            orderByTotalConsume: '',
        }
    }

    componentDidMount() {
        const beginDate = moment().subtract(1, 'month').format("YYYY-MM-DD");
        const endDate = moment().subtract(1, 'day').format("YYYY-MM-DD");
        this.props.memberAnalysisActions.init(beginDate, endDate).then(data => {
            this.setState({
                totalAmountAnimation: {
                    Children: { 
                        value: data.accountTotal || 0,
                        floatLength: 2,
                        formatMoney: true, 
                    }, 
                    duration: 1000,
                },
                priceAmountAnimation: {
                    Children: { 
                        value: data.recordTotal ? (data.recordTotal.price_amount || 0) : 0,
                        floatLength: 2,
                        formatMoney: true, 
                    }, 
                    duration: 1000,
                },
                pointPriceAnimation: {
                    Children: { 
                        value: data.recordTotal ? (data.recordTotal.point_price || 0) : 0,
                        floatLength: 2,
                        formatMoney: true, 
                    }, 
                    duration: 1000,
                },
                givePriceAnimation: {
                    Children: { 
                        value: data.recordTotal ? (data.recordTotal.give_price || 0) : 0,
                        floatLength: 2,
                        formatMoney: true, 
                    }, 
                    duration: 1000,
                },
                accountBalanceAnimation: {
                    Children: { 
                        value: data.accountBalance || 0,
                        floatLength: 2,
                        formatMoney: true, 
                    }, 
                    duration: 1000,
                }
            });
        });
        const { pageNum, pageSize } = this.props.memberAnalysis;
        const params = { pageNum, pageSize };
        this.props.memberAnalysisActions.selectMemberRank(params);
    }

    disabledDate = (current) => {
        return current && current >= moment().startOf('day');
    }

    onMemberNewDateChange = (value, dateString) => {
        const validateDate = moment(value[0]);
        if(validateDate.subtract(1, 'day').add(1, 'month').isBefore(value[1])) {
            message.info("日报查询间隔不能超过1个月");
            return;
        }
        this.props.memberAnalysisActions.onMemberNewDateChange(value);
        const beginDate = dateString[0];
        const endDate = dateString[1];
        this.props.memberAnalysisActions.reportMemberNew(beginDate, endDate);
    }

    onMemberRechargeDateChange = (value, dateString) => {
        const validateDate = moment(value[0]);
        if(validateDate.subtract(1, 'day').add(1, 'month').isBefore(value[1])) {
            message.info("日报查询间隔不能超过1个月");
            return;
        }
        this.props.memberAnalysisActions.onMemberRechargeDateChange(value);
        const beginDate = dateString[0];
        const endDate = dateString[1];
        this.props.memberAnalysisActions.reportMemberRecharge(beginDate, endDate);
    }

    handleMenuClick = (e) => {
        const { key } = e;
        let orderByTotalRecharge = '';
        switch(key) {
            case "1": 
                orderByTotalRecharge = " total_recharge desc ";
                this.setState({orderByTotalRecharge});
            break;
            case "2":
                orderByTotalRecharge = " total_recharge asc ";
                this.setState({orderByTotalRecharge});
            case "3":
                orderByTotalRecharge = "";
                this.setState({orderByTotalRecharge});
            break;
        }
        const { totalRecharge, totalConsume, orderByTotalConsume } = this.state;
        const { pageSize, currentPage } = this.props.memberAnalysis;
        let orderByClause = this.getOrderByClause(orderByTotalRecharge, orderByTotalConsume);
        let searchParams = {totalRecharge, totalConsume, orderByClause, pageSize, currentPage};
        this.props.memberAnalysisActions.selectMemberRank(searchParams);
    }

    handleMenuClick2 = (e) => {
        const { key } = e;
        let orderByTotalConsume = '';
        switch(key) {
            case "1": 
                orderByTotalConsume = " total_consume desc ";
                this.setState({orderByTotalConsume});
            break;
            case "2":
                orderByTotalConsume = " total_consume asc ";
                this.setState({orderByTotalConsume});
            case "3":
                orderByTotalConsume = "";
                this.setState({orderByTotalConsume});
            break;
        }
        const { totalRecharge, totalConsume, orderByTotalRecharge, } = this.state;
        let orderByClause = this.getOrderByClause(orderByTotalRecharge, orderByTotalConsume);
        const { pageSize, currentPage } = this.props.memberAnalysis;
        let searchParams = {totalRecharge, totalConsume, orderByClause, pageSize, currentPage};
        this.props.memberAnalysisActions.selectMemberRank(searchParams);
    }

    onTotalRechargeChange = (value) => {
        this.setState({totalRecharge: value});
    }

    onTotalConsumeChange = (value) => {
        this.setState({totalConsume: value});
    }

    getOrderByClause = (orderByTotalRecharge, orderByTotalConsume) => {
        let orderByClause = '';
        if(orderByTotalRecharge && orderByTotalConsume) {
            orderByClause = `${orderByTotalRecharge}, ${orderByTotalConsume}`;
        } else {
            if(orderByTotalRecharge && !orderByTotalConsume) {
                orderByClause = `${orderByTotalRecharge}`;
            } else if(!orderByTotalRecharge && orderByTotalConsume) {
                orderByClause = `${orderByTotalConsume}`;
            }
        }
        return orderByClause;
    }

    onPageChange = (page, pageSize) => {
        const { totalRecharge, totalConsume, orderByTotalRecharge, orderByTotalConsume } = this.state;
        let orderByClause = this.getOrderByClause(orderByTotalRecharge, orderByTotalConsume);
        let searchParams = {totalRecharge, totalConsume, orderByClause};
        searchParams.pageSize = pageSize;
        searchParams.pageNum = page;
        this.props.memberAnalysisActions.selectMemberRank(searchParams);
    }

    onShowSizeChange = (current, pageSize) => {
        const { totalRecharge, totalConsume, orderByTotalRecharge, orderByTotalConsume } = this.state;
        let orderByClause = this.getOrderByClause(orderByTotalRecharge, orderByTotalConsume);
        let searchParams = {totalRecharge, totalConsume, orderByClause};
        searchParams.pageSize = pageSize;
        searchParams.pageNum = current;
        this.props.memberAnalysisActions.selectMemberRank(searchParams);
    }

    onRechargePressEnter = (e) => {
        const { value } = e.target;
        const { totalConsume, orderByTotalRecharge, orderByTotalConsume} = this.state;
        const { pageSize, currentPage } = this.props.memberAnalysis;
        let orderByClause = this.getOrderByClause(orderByTotalRecharge, orderByTotalConsume);
        let searchParams = {totalRecharge: value, totalConsume, orderByClause, pageSize, currentPage};
        this.props.memberAnalysisActions.selectMemberRank(searchParams);
    }

    onConsumePressEnter = (e) => {
        const { value } = e.target;
        const { totalRecharge, orderByTotalRecharge, orderByTotalConsume } = this.state;
        const { pageSize, currentPage } = this.props.memberAnalysis;
        let orderByClause = this.getOrderByClause(orderByTotalRecharge, orderByTotalConsume);
        let searchParams = {totalRecharge, totalConsume: value, orderByClause, pageSize, currentPage};
        this.props.memberAnalysisActions.selectMemberRank(searchParams);
    }

    render() {
        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            style: { marginBottom: 24 },
        };
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">由多到少排序</Menu.Item>
                <Menu.Item key="2">由少到多排序</Menu.Item>
                <Menu.Item key="3">取消排序</Menu.Item>
            </Menu>
        );
        const menu2 = (
            <Menu onClick={this.handleMenuClick2}>
                <Menu.Item key="1">由多到少排序</Menu.Item>
                <Menu.Item key="2">由少到多排序</Menu.Item>
                <Menu.Item key="3">取消排序</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '入会日期',
            dataIndex: 'register_time',
            key: 'register_time',
            render: (text, record) => {
                return <Popover title={"具体日期"} content={`${record.register_time}`}>{`${moment(record.register_time, "YYYY-MM-DD").fromNow()}`}</Popover>
            }
        }, {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (text, record) => {
                if(record.birthday) {
                    return <span>{moment(record.birthday, "YYYY-MM-DD").format('MMM Do')}</span>
                }
            }
        }, {
            title: '最近一次消费时间',
            dataIndex: 'last_consumption_time',
            key: 'last_consumption_time',
        }, {
            title: '积分',
            dataIndex: 'point',
            key: 'point',
        }, {
            title: '等级',
            dataIndex: 'rank',
            key: 'rank',
            render: (text, record) => {
                return <Rate disabled defaultValue={parseInt(record.rank)} />
            }
        }, {
            title: '累计充值',
            dataIndex: 'total_recharge',
            key: 'total_recharge',
            render: (text, record) => {
                return <span>{numeral(record.total_recharge).format("0,0.00")}</span>
            }
        }, {
            title: '累计消费',
            dataIndex: 'total_consume',
            key: 'total_consume',
            render: (text, record) => {
                return <span>{numeral(record.total_consume).format("0,0.00")}</span>
            }
        }];
        const { initLoading, data, pageSize, total, currentPage, memberNewDate, memberRechargeDate, memberRechargeLoading, 
            memberNewLoading, memberRankLoading, memberRankList } = this.props.memberAnalysis;
        const { memberPercentResults = [], memberNewDatas = [], memberRechargeDatas = [], memberConsumeDatas = [] } = data;
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
            <Spin spinning={initLoading}>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <Card bordered={false} title={"会员资金汇总"}>
                            <div className={styles.sales}>
                                <div className={styles.totalAmount}>
                                    <span>累计金额:￥</span>
                                    <TweenOne
                                        animation={this.state.totalAmountAnimation}
                                        style={{ fontSize: 56, }}
                                    >
                                        0
                                    </TweenOne>
                                    <span>元</span>
                                </div>
                                <div className={styles.income_refund}>
                                    <div className={`${styles.totalAmount} ${styles.totalAmount_secondary}`}>
                                        <span>充值金额:￥</span>
                                        <TweenOne
                                            animation={this.state.priceAmountAnimation}
                                            style={{ fontSize: 26, color: '#87d068' }}
                                        >
                                            0
                                        </TweenOne>
                                        <span>元</span>
                                    </div>
                                    <div className={`${styles.totalAmount} ${styles.totalAmount_secondary}`}>
                                        <span>积分返现金额:￥</span>
                                        <TweenOne
                                            animation={this.state.pointPriceAnimation}
                                            style={{ fontSize: 26, color: '#87d068'}}
                                        >
                                            0
                                        </TweenOne>
                                        <span>元</span>
                                    </div>
                                    <div className={`${styles.totalAmount} ${styles.totalAmount_secondary}`}>
                                        <span>充值赠送金额:￥</span>
                                        <TweenOne
                                            animation={this.state.givePriceAnimation}
                                            style={{ fontSize: 26, color: '#87d068'}}
                                        >
                                            0
                                        </TweenOne>
                                        <span>元</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.sales}>
                                <div className={styles.totalAmount}>
                                    <span>累计结余:￥</span>
                                    <TweenOne
                                        animation={this.state.accountBalanceAnimation}
                                        style={{ fontSize: 56, color: '#ff4242'}}
                                    >
                                        0
                                    </TweenOne>
                                    <span>元</span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <Card bordered={false} title={"会员消费占比"}>
                            <MemberConsumeChart data={memberPercentResults} turnoverTotal={data.turnoverTotal}/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Spin spinning={memberNewLoading}>
                            <Card bordered={false} title={"新入会员趋势图"} 
                                extra={
                                    <DatePicker.RangePicker
                                        disabledDate={this.disabledDate}
                                        value={memberNewDate}
                                        format="YYYY-MM-DD"
                                        onChange={this.onMemberNewDateChange}
                                        style={{marginRight: 16, marginLeft: 16}}
                                    />
                                }>
                                <MemberNewChart data={memberNewDatas} />
                            </Card>
                        </Spin>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Spin spinning={memberRechargeLoading}>
                            <Card bordered={false} title={"充值消费趋势图"}
                                extra={
                                    <DatePicker.RangePicker
                                        disabledDate={this.disabledDate}
                                        value={memberRechargeDate}
                                        format="YYYY-MM-DD"
                                        onChange={this.onMemberRechargeDateChange}
                                        style={{marginRight: 16, marginLeft: 16}}
                                    />
                                }>
                                <MemberRechargeChart rechargeData={memberRechargeDatas} consumeData={memberConsumeDatas}/>
                            </Card>
                        </Spin>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24} style={{marginBottom: 24}}>
                        <Spin spinning={memberRechargeLoading}>
                            <Card bordered={false} title={"消费排行榜"}
                                extra={
                                    <Fragment>
                                        <span>
                                        累计充值金额:<NumericInput style={{ width: 120 }} 
                                            value={this.state.totalRecharge}
                                            onChange={this.onTotalRechargeChange} 
                                            placeholder={">=输入金额"}
                                            onPressEnter={this.onRechargePressEnter}
                                        />
                                        </span>
                                        <span style={{marginLeft: 8}}>
                                        累计消费金额:<NumericInput style={{ width: 120 }} 
                                            value={this.state.totalConsume}
                                            onChange={this.onTotalConsumeChange}
                                            placeholder={">=输入金额"}
                                            onPressEnter={this.onConsumePressEnter}
                                        />
                                        </span>
                                        <Dropdown overlay={menu}>
                                            <Button style={{marginRight: 8, marginLeft: 8}}>
                                                累计消费<Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                        <Dropdown overlay={menu2}>
                                            <Button style={{marginRight: 8}}>
                                                累计充值<Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                    </Fragment>
                                }>
                                <Table rowKey={record => `${record.id}`}
                                    loading={memberRankLoading}
                                    dataSource={memberRankList}
                                    columns={columns}
                                    size={"middle"}
                                    locale={
                                        {emptyText: '查无数据'}
                                    }
                                    pagination={paginationProps}
                                />
                            </Card>
                        </Spin>
                    </Col>
                </Row>
            </Spin>
        )
    }
}

export default withRouter(connect((state) => {
    return {
        memberAnalysis: state.memberAnalysis,
    }
}, (dispatch) => {
    return {
        memberAnalysisActions: bindActionCreators(memberAnalysisActions, dispatch),
    }
})(MemberAnalysis));