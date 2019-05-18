import React, { Component } from 'react';
import { Row, Col, Spin, message } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';
import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import DaysSetting from './daysSetting';
import DiscountsSetting from './discountsSetting';
import SubtractSetting from './subtractSetting';
import CouponSetting from './couponSetting';
import ruleActions from '../../../actions/rule';
import Day from './day';
import Discount from './discount';
import Subtract from './subtract';
import Coupon from './coupon';

import styles from './index.less';

const weeks = [{ week: 1, name: "星期日" }, { week: 2, name: "星期一" }, { week: 3, name: "星期二" },
{ week: 4, name: "星期三" }, { week: 5, name: "星期四" }, { week: 6, name: "星期五" }, { week: 7, name: "星期六" }];

class Brule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goodsDayModalVisible: false,
            goodsDiscountModalVisible: false,
            goodsSubtractModalVisible: false,
            goodsCouponModalVisible: false,
        }
    }

    componentDidMount() {
        ipcRenderer.on("selectGoods-reply", (event, arg) => {
            this.props.ruleActions.dispatchGoodsList(arg);
        });
        ipcRenderer.send('selectGoods', {});
        this.props.ruleActions.init();
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("selectGoods-reply");
    }

    handleGoodsDayModalVisible = (flag) => {
        const { goodsDayCurrent }  = this.props.rule;
        this.setState({ goodsDayModalVisible: !!flag });
        if(goodsDayCurrent === 2) {
            window.setTimeout(() => {
                this.props.ruleActions.resetGoodsDayStep();
            }, 100);
        }
    }

    handleGoodsDiscountModalVisible = (flag) => {
        const { goodsDiscountCurrent }  = this.props.rule;
        this.setState({ goodsDiscountModalVisible: !!flag });
        if(goodsDiscountCurrent === 2) {
            window.setTimeout(() => {
                this.props.ruleActions.resetGoodsDiscountStep();
            }, 100);
        }
    }

    handleGoodsSubtractModalVisible = (flag) => {
        this.setState({ goodsSubtractModalVisible: !!flag });
    }

    handleGoodsCouponModalVisible = (flag) => {
        this.setState({ goodsCouponModalVisible: !!flag });
    }

    //添加每日特价商品
    addGoodsDay = (week) => {
        this.handleGoodsDayModalVisible(true);
        this.props.ruleActions.dispatchCurrentWeek(week);
    }

    saveGoodsDay = () => {
        const goodsDays = [];
        const { goodsCheckedRows, goodsDayWeek } = this.props.rule;
        goodsCheckedRows.map(row => {
            let goodsDay = {
                goodsId: row.id,
                price: row.newPrice,
                week: goodsDayWeek,
                limitNum: row.limitNum,
                effectiveTime: row.effectiveTime ? row.effectiveTime.toDate() : row.effectiveTime,
                expiredTime: row.expiredTime ? row.expiredTime.toDate() : row.expiredTime,
            };
            goodsDays.push(goodsDay);
        });
        this.props.ruleActions.saveGoodsDay(goodsDays).then(() => {
            ipcRenderer.send('insertGoodsDays', goodsDays);
            this.props.ruleActions.listGoodsDay();
        });
    }

    deleteGoodsDay = (id) => {
        this.props.ruleActions.deleteGoodsDay(id).then(() => {
            message.success("每日特价商品移除成功.");
            ipcRenderer.send('deleteGoodsDay', id);
        });
    }

    updateConfig = (code, value) => {
        const basicConfig = { "configCode": code, "configValue": value };
        this.props.ruleActions.updateConfig(basicConfig).then(() => {
            ipcRenderer.send("updateBasicConfig", basicConfig);
        });
    }

    //添加商品折扣
    addGoodsDiscount = () => {
        this.handleGoodsDiscountModalVisible(true);
    }

    saveGoodsDiscount = () => {
        const goodsDiscounts = [];
        const { goodsDiscountCheckedRows } = this.props.rule;
        goodsDiscountCheckedRows.map(row => {
            let goodsDiscount = {
                goodsId: row.id,
                discountValue: row.discountValue,
                effectiveTime: row.effectiveTime.toDate(),
                expiredTime: row.expiredTime ? row.expiredTime.toDate() : null,
            };
            goodsDiscounts.push(goodsDiscount);
        });
        this.props.ruleActions.saveGoodsDiscount(goodsDiscounts).then(() => {
            ipcRenderer.send('insertGoodsDiscounts', goodsDiscounts);
            this.props.ruleActions.listGoodsDiscount();
        });
    }

    deleteGoodsDiscount = (id) => {
        this.props.ruleActions.deleteGoodsDiscount(id).then(() => {
            message.success("折扣商品移除成功.");
            ipcRenderer.send('deleteGoodsDiscount', id);
        });
    }

    //添加消费满多少(折扣/减免/赠券)
    addGoodsSubtract = () => {
        this.handleGoodsSubtractModalVisible(true);
    }

    saveGoodsSubtract = (fieldsValue, callback) => {
        this.props.ruleActions.saveGoodsSubtract(fieldsValue).then(() => {
            message.success("折扣/减免/赠现金优惠券规则添加成功.")
            this.handleGoodsSubtractModalVisible(false);
            this.props.ruleActions.listGoodsSubtract();
            callback();
            ipcRenderer.send("saveGoodsSubtract", {...fieldsValue, effectiveTime: 
                fieldsValue.effectiveTime ? fieldsValue.effectiveTime.toDate() : null, 
                expiredTime: fieldsValue.expiredTime ? fieldsValue.expiredTime.toDate() : null,
                constraintTimeStart: fieldsValue.constraintTimeStart ? fieldsValue.constraintTimeStart.toDate() : null,
                constraintTimeEnd: fieldsValue.constraintTimeEnd ? fieldsValue.constraintTimeEnd.toDate() : null});
        });
    }

    enabledGoodsSubtract = (e, id) => {
        const enabled = e.target.checked ? "1" : "0";
        this.props.ruleActions.enabledGoodsSubtract({id, enabled}).then(() => {
            if(enabled == "1") {
                message.success("启用成功.")
            } else {
                message.success("禁用成功.")
            }
            ipcRenderer.send("enabledGoodsSubtract", {id, enabled});
        });
    }

    deleteGoodsSubtract = (id) => {
        this.props.ruleActions.deleteGoodsSubtract(id).then(() => {
            message.success("折扣/减免/赠现金优惠券规则移除成功.");
            ipcRenderer.send("deleteGoodsSubtract", id);
        });
    }

    //添加电子优惠券
    addGoodsCoupon = () => {
        this.handleGoodsCouponModalVisible(true);
    }

    saveGoodsCoupon = (fieldsValue, callback) => {
        this.props.ruleActions.saveGoodsCoupon(fieldsValue).then(() => {
            message.success("电子优惠券规则添加成功.")
            this.handleGoodsCouponModalVisible(false);
            this.props.ruleActions.listGoodsCoupon();
            callback();
        });
    }

    deleteGoodsCoupon = (id) => {
        this.props.ruleActions.deleteGoodsCoupon(id).then(() => {
            message.success("电子优惠券规则移除成功.");
        });
    }

    render() {
        const topColResponsiveProps = {
            xs: 24,
            sm: 24,
            md: 24,
            lg: 24,
            xl: 24,
            style: { marginBottom: 24 },
        };

        const { goodsDayModalVisible, goodsDiscountModalVisible, goodsSubtractModalVisible, goodsCouponModalVisible } = this.state;
        const { initLoading, configList, goodsDayList, goodsList, goodsCheckedKeys, goodsCheckedRows,
            goodsDayCurrent, saveConfigLoading, goodsDayWeek, saveGoodsDayLoading, goodsDayLoading } = this.props.rule;
        const { goodsDiscountLoading, goodsDiscountList, goodsDiscountCheckedKeys, goodsDiscountCheckedRows,
            goodsDiscountCurrent, saveGoodsDiscountLoading } = this.props.rule;
        const { goodsSubtractData, saveGoodsSubtractLoading, goodsSubtractList, goodsSubtractLoading } = this.props.rule;
        const { goodsCouponData, saveGoodsCouponLoading, goodsCouponList, goodsCouponLoading } = this.props.rule;
        const { onTableChange, nextGoodsDay, prevGoodsDay, onDaysEffectiveTimeChange, onDaysExpiredTimeChange, 
            onDaysPriceChange, onDaysLimitChange } = this.props.ruleActions;
        const { onTableChange_discount, nextGoodsDiscount, prevGoodsDiscount, onDiscountEffectiveTimeChange,
            onDiscountExpiredTimeChange, onDiscountChange, } = this.props.ruleActions;
        const { goodsSubtractFieldChangeValue, goodsSubtractResetField } = this.props.ruleActions;
        const { goodsCouponFieldChangeValue, goodsCouponResetField } = this.props.ruleActions;
        const ruleEnabled = (code) => {
            const config = configList.find(item => item.configCode == code);
            return config && config.configValue == "1" ? true : false;
        }
        const goodsDayWeekName = () => {
            const week = weeks.find(item => item.week == goodsDayWeek);
            return week ? week.name : "";
        }
        return (
            <PageHeaderLayout
                title="运营规则管理"
                content={`您可以根据实际情况，合理选择运营优惠方案。规则包括每日特价商品(以单个商品、一星期为周期维度来优惠)、
                    商品折扣(以单个商品、时间维度来优惠)、总消费满多少优惠(以用餐订单、时间维度来优惠)、电子优惠券(以虚拟物来优惠,
                    这个是由您来发放电子优惠券，我们一点谱平台来引流，以达到一个共赢的目的。)`}
            >
                <Spin spinning={initLoading}>
                    <Row gutter={24} className={styles.container}>
                        <Col {...topColResponsiveProps} className={ruleEnabled("enabled-goods-day") ? styles.ruleEnabled : styles.ruleDsiabled}>
                            <Day addGoodsDay={this.addGoodsDay}
                                goodsDayList={goodsDayList}
                                goodsDayLoading={goodsDayLoading}
                                deleteGoodsDay={this.deleteGoodsDay}
                                configList={configList}
                                updateConfig={this.updateConfig}
                                weeks={weeks}
                                saveloading={saveConfigLoading["enabled-goods-day"]}
                            />
                        </Col>
                        
                        <Col {...topColResponsiveProps} className={ruleEnabled("enabled-goods-discount") ? styles.ruleEnabled : styles.ruleDsiabled}>
                            <Discount addGoodsDiscount={this.addGoodsDiscount}
                                goodsDiscountList={goodsDiscountList}
                                goodsDiscountLoading={goodsDiscountLoading}
                                deleteGoodsDiscount={this.deleteGoodsDiscount}
                                configList={configList}
                                updateConfig={this.updateConfig}
                                saveloading={saveConfigLoading["enabled-goods-discount"]}
                            />
                        </Col>
                        <Col {...topColResponsiveProps} className={ruleEnabled("enabled-goods-subtract") ? styles.ruleEnabled : styles.ruleDsiabled}>                            
                            <Subtract addGoodsSubtract={this.addGoodsSubtract}
                                goodsSubtractList={goodsSubtractList}
                                goodsSubtractLoading={goodsSubtractLoading}
                                deleteGoodsSubtract={this.deleteGoodsSubtract}
                                configList={configList}
                                updateConfig={this.updateConfig}
                                enabledGoodsSubtract={this.enabledGoodsSubtract}
                                saveloading={saveConfigLoading["enabled-goods-subtract"]}
                            />
                        </Col>
                        <Col {...topColResponsiveProps} className={ruleEnabled("enabled-goods-coupon") ? styles.ruleEnabled : styles.ruleDsiabled}>
                            <Coupon addGoodsCoupon={this.addGoodsCoupon}
                                goodsCouponList={goodsCouponList}
                                goodsCouponLoading={goodsCouponLoading}
                                deleteGoodsCoupon={this.deleteGoodsCoupon}
                                configList={configList}
                                updateConfig={this.updateConfig}
                                saveloading={saveConfigLoading["enabled-goods-coupon"]}
                            />
                        </Col>
                    </Row>
                </Spin>
                <DaysSetting
                    modalVisible={goodsDayModalVisible}
                    handleModalVisible={this.handleGoodsDayModalVisible}
                    goodsList={goodsList}
                    goodsDayWeekName={goodsDayWeekName()}
                    goodsDayWeek={goodsDayWeek}
                    goodsCheckedKeys={goodsCheckedKeys}
                    goodsCheckedRows={goodsCheckedRows}
                    onTableChange={onTableChange}
                    saveGoodsDay={this.saveGoodsDay}
                    saveGoodsDayLoading={saveGoodsDayLoading}
                    current={goodsDayCurrent}
                    next={nextGoodsDay}
                    prev={prevGoodsDay}
                    onEffectiveTimeChange={onDaysEffectiveTimeChange}
                    onExpiredTimeChange={onDaysExpiredTimeChange}
                    onPriceChange={onDaysPriceChange}
                    onLimitChange={onDaysLimitChange}
                    goodsDayList={goodsDayList}
                >
                </DaysSetting>
                <DiscountsSetting
                    modalVisible={goodsDiscountModalVisible}
                    handleModalVisible={this.handleGoodsDiscountModalVisible}
                    goodsList={goodsList}
                    goodsCheckedKeys={goodsDiscountCheckedKeys}
                    goodsCheckedRows={goodsDiscountCheckedRows}
                    onTableChange={onTableChange_discount}
                    goodsDiscountList={goodsDiscountList}
                    current={goodsDiscountCurrent}
                    next={nextGoodsDiscount}
                    prev={prevGoodsDiscount}
                    saveGoodsDiscountLoading={saveGoodsDiscountLoading}
                    saveGoodsDiscount={this.saveGoodsDiscount}
                    onEffectiveTimeChange={onDiscountEffectiveTimeChange}
                    onExpiredTimeChange={onDiscountExpiredTimeChange}
                    onDiscountChange={onDiscountChange}
                >
                </DiscountsSetting>
                <SubtractSetting
                    modalVisible={goodsSubtractModalVisible}
                    handleModalVisible={this.handleGoodsSubtractModalVisible}
                    {...goodsSubtractData}
                    fieldChangeValue={goodsSubtractFieldChangeValue}
                    confirmLoading={saveGoodsSubtractLoading}
                    resetFields={goodsSubtractResetField}
                    handleAdd={this.saveGoodsSubtract}
                >
                </SubtractSetting>
                <CouponSetting
                    modalVisible={goodsCouponModalVisible}
                    handleModalVisible={this.handleGoodsCouponModalVisible}
                    {...goodsCouponData}
                    fieldChangeValue={goodsCouponFieldChangeValue}
                    confirmLoading={saveGoodsCouponLoading}
                    resetFields={goodsCouponResetField}
                    handleAdd={this.saveGoodsCoupon}
                >
                </CouponSetting>
            </PageHeaderLayout>
        )
    }

}

export default connect((state) => {
    return {
        rule: state.rule,
    }
}, (dispatch) => {
    return {
        ruleActions: bindActionCreators(ruleActions, dispatch),
    }
})(Brule);