import React, { Component, Fragment } from 'react';
import { Row, Col, Card, message, Input, Button } from 'antd';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import memberInfoActions from '../../../actions/memberInfo';
import floorPlanActions from '../../../actions/floorPlan';
import MemberDetailForm from '../memberInfo/memberDetailForm';
import CashModal from './cashModal';
import PayOrderModal from '../../dashboard/floorPlan/payOrderModal';
import styles from './index.less';

class MemberRecharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cashModalVisible: false,//现金充值modal
            payOrderModalVisible: false,//支付单modal
        }
    }

    handleCashModalVisible = (flag) => {
        this.setState({cashModalVisible: !!flag});
    }

    handlePayOrderModalVisible = (flag) => {
        if(!flag) {
            this.props.memberInfoActions.resetRechargeMethod();
        }
        this.setState({payOrderModalVisible: !!flag});
    }

    selectDetailByPhone = (phone) => {
        if(phone == null || phone == "") {
            message.info("请输入会员手机号码查询");
            return;
        }
        this.props.memberInfoActions.resetDetailForm();
        this.props.memberInfoActions.selectDetailByPhone(phone);
    }

    handleCash = () => {
        this.props.memberInfoActions.resetMemberRechargeFormFields();
        this.handleCashModalVisible(true);
    }

    selectByRechargePrice = () => {
        const { rechargeFormData } = this.props.memberRecharge;
        const rechargeAmount = rechargeFormData.rechargeAmount.value;
        this.props.memberInfoActions.selectByRechargePrice(rechargeAmount).then((data) => {
            if(data == null) {
                message.info("无赠送金额");
            }
        });
    }

    recharge = () => {
        const { memberDetailData, rechargeFormData } = this.props.memberRecharge;
        const memberId = memberDetailData.id.value;
        const rechargeAmount = rechargeFormData.rechargeAmount.value;
        if(parseInt(rechargeAmount) <= 0) {
            message.info("请确认充值金额.");
            return;
        }
        const rechargeMethod = rechargeFormData.rechargeMethod.value;
        const payOrderIds = rechargeFormData.payOrderIds.value;
        
        //移动支付充值
        if(rechargeMethod == "2") {
            this.props.memberInfoActions.rechargeMobilePayment(payOrderIds, memberId).then((data) => {
                message.success(`成功充值`);
                this.handleCashModalVisible(false);
            });
        } else {//现金充值与微信或者支付宝转账
            this.props.memberInfoActions.rechargeCash(rechargeAmount, memberId, rechargeMethod).then((data) => {
                message.success(`成功充值`);
                this.handleCashModalVisible(false);
            });
        }
    }

    payOrderHandle = (payOrderIds) => {
        const { payOrderList } = this.props.floorPlan;
        this.setState({payOrderModalVisible: false});
        let totalPrice = 0;
        payOrderIds.forEach(rowkey => {
            const payOrder = payOrderList.find(item => item.id == rowkey);
            if(payOrder) {
                totalPrice += parseFloat(payOrder.payPrice);
            }
        });
        this.props.memberInfoActions.resetPayOrderIds(payOrderIds, totalPrice).then(() => {
            if(numeral(totalPrice).value() > 0) {
                this.selectByRechargePrice();
            }
        });
    }

    //加载前台支付的订单
    loadPayOrder = () => {
        this.handlePayOrderModalVisible(true);
        this.props.floorPlanActions.listPayOrder();
    }

    //删除前台扫码 顾客未支付订单
    deletePayOrder = (id) => {
        this.props.floorPlanActions.deletePayOrder(id);
    }

    //订单同步支付宝支付结果(前台扫码支付)
    syncAlipayResultFront = (orderNo) => {
        this.props.floorPlanActions.syncAlipayOrderStatus(orderNo, 3).then((data) => {
            this.loadPayOrder();
            message.success(`订单已支付,金额￥${data.result}`);
        });
    }

    //订单同步微信支付结果(前台扫码支付)
    syncWxpayResultFront = (orderNo) => {
        this.props.floorPlanActions.syncWxpayOrderStatus(orderNo, 4).then(data => {
            this.loadPayOrder();
            message.success(`订单已支付,金额￥${data.result}`);
        });
    }

    render() {
        const { cashModalVisible, payOrderModalVisible } = this.state;
        const { loading, memberDetailData, phone, rechargeLoading, rechargeFormData, rechargeRuleLoading } = this.props.memberRecharge;
        const { payOrderLoading, payOrderList } = this.props.floorPlan;
        const { onRechargePhoneChange, memberRechargeFieldChangeValue, resetMemberRechargeFormFields } = this.props.memberInfoActions;
        return (
            <PageHeaderLayout
                    title={"会员充值"}
                    content={`会员充值包括现金充值, 微信、支付宝支付充值。充值完成后会短信提醒会员用户。`}
                >   
                <Card bordered={false}>
                    <div className={styles.search}>
                        <Input placeholder="请输入会员手机号码" maxLength={20} value={phone} style={{width: 200, marginRight: 8}} 
                            onChange={e => {onRechargePhoneChange(e.target.value)}}
                            onPressEnter={() => this.selectDetailByPhone(phone)}
                        />
                        <Button type="primary" loading={loading} onClick={() => this.selectDetailByPhone(phone)}>查询</Button>
                    </div>
                    <MemberDetailForm {...memberDetailData} detailLoading={loading} >
                        <Button type={"primary"} disabled={!memberDetailData.phone.value} style={{marginRight: 8}} onClick={() => this.handleCash()}>
                            充值
                        </Button>
                    </MemberDetailForm>
                </Card>
                <CashModal visible={cashModalVisible} handleModalVisible={this.handleCashModalVisible}
                    {...rechargeFormData}
                    confirmLoading={rechargeLoading}
                    fieldChangeValue={memberRechargeFieldChangeValue}
                    rechargeRuleLoading={rechargeRuleLoading}
                    selectByRechargePrice={this.selectByRechargePrice}
                    handleSubmit={this.recharge}
                    handlePayOrderModalVisible={this.loadPayOrder}
                    resetMemberRechargeFormFields={resetMemberRechargeFormFields}
                />
                <PayOrderModal visible={payOrderModalVisible}
                    loading={payOrderLoading}
                    payOrderList={payOrderList}
                    confirmLoading={rechargeLoading}
                    handleModalVisible={this.handlePayOrderModalVisible}
                    handleSubmit={this.payOrderHandle}
                    deletePayOrder={this.deletePayOrder}
                    refresh={this.loadPayOrder}
                    syncAlipayResultFront={this.syncAlipayResultFront}
                    syncWxpayResultFront={this.syncWxpayResultFront}
                    primaryBtnText={"关联已勾选单充值"}
                />
            </PageHeaderLayout>
        )
    }

}

export default withRouter(connect((state) => {
    return {
        memberRecharge: state.memberRecharge,
        floorPlan: state.floorPlan,
    }
}, (dispatch) => {
    return {
        memberInfoActions: bindActionCreators(memberInfoActions, dispatch),
        floorPlanActions: bindActionCreators(floorPlanActions, dispatch),
    }
})(MemberRecharge));