import React, { Component } from 'react';
import { Card, message, Input, Button, List, Spin, Divider, Tag } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import PageHeaderLayout from '../../../components/Layout/PageHeaderLayout';
import memberRefundActions from '../../../actions/memberRefund';
import MemberDetailForm from '../memberInfo/memberDetailForm';
import RefundModal from './refundModal';
import styles from './index.less';

class MemberRefundPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refundModalVisible: false,//退款modal
        }
    }

    selectDetailByPhone = (phone) => {
        if (phone == null || phone == "") {
            message.info("请输入会员手机号码查询");
            return;
        }
        const { recordTypes, pageSize, currentPage } = this.props.memberRefund;
        this.props.memberRefundActions.resetDetailForm();
        this.props.memberRefundActions.selectDetailByPhone(phone).then((data) => {
            const searchParams = {memberId: data.memberUser.id, recordTypes: recordTypes.join(","), pageSize, pageNum: 1};
            this.props.memberRefundActions.listByMemberId(searchParams, false);
        });
    }

    handleRefundModalVisible = (flag) => {
        this.setState({refundModalVisible: !!flag});
    }

    onLoadMore = (newRecordTypes) => {
        const { memberDetailData, recordTypes, pageSize, currentPage } = this.props.memberRefund;
        const searchParams = {memberId: memberDetailData.id.value, recordTypes: recordTypes.join(","), pageSize, pageNum: currentPage + 1};
        this.props.memberRefundActions.listByMemberId(searchParams, true);
    }

    onRecordTypeChange = (typeValue, checked) => {
        let { memberDetailData, recordTypes, pageSize, currentPage } = this.props.memberRefund;
        this.props.memberRefundActions.onRecordTypeChange(typeValue, checked);
        if(checked) {
            recordTypes = [...recordTypes, typeValue];
        } else {
            recordTypes = recordTypes.filter(item => item != typeValue);
        }
        const searchParams = {memberId: memberDetailData.id.value, recordTypes: recordTypes.join(","), pageSize, pageNum: 1};
        this.props.memberRefundActions.listByMemberId(searchParams, false);
    }

    refund = (values) => {
        if(values.refundAmount == 0) {
            message.info("请确认退款金额");
            return;
        }
        const { memberDetailData, recordTypes, pageSize } = this.props.memberRefund;
        const memberId = memberDetailData.id.value;
        this.props.memberRefundActions.refund(values.refundAmount, values.refundMethod, memberId).then(() => {
            message.success("退款成功");
            this.handleRefundModalVisible(false);
            const searchParams = {memberId, recordTypes: recordTypes.join(","), pageSize, pageNum: 1};
            this.props.memberRefundActions.listByMemberId(searchParams, false);
        });
    }

    render() {
        const { refundModalVisible } = this.state;
        const { loading, memberDetailData, phone, refundLoading, refundFormData, recordLoading, recordList, hasMore, recordTypes } = this.props.memberRefund;
        const { onRechargePhoneChange, onRecordTypeChange } = this.props.memberRefundActions;
        const loadMore =  memberDetailData.phone.value ? (
            <div style={{
                textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
                {
                    hasMore ?
                    recordLoading ? <Spin/> :
                    <a onClick={this.onLoadMore} >加载更多</a>
                    : <span>没有更多数据了</span>
                }
            </div>
        ) : null;
        const renderChecked = typeValue => recordTypes.find(item => item == typeValue);
        const renderItemTitle = (item) => {
            if(item.recordType == 1) {//充值
                return <span>{item.recordTime}-<span style={{color: '#87d068'}}>{item.recordTypeName}</span></span>
            } else if(item.recordType == 3) {//退款
                return <span>{item.recordTime}-<span style={{color: '#ff4242'}}>{item.recordTypeName}</span></span>
            } else {//消费
                return <span>{item.recordTime}-<span>{item.recordTypeName}</span></span>
            }
        }
        const renderContent = (item) => {
            if(item.recordType == 1) {//充值
                return (
                    <div>充值金额:￥{numeral(Math.abs(item.priceAmount)).format("0,0.00")}元;&nbsp;充值方式:{item.payMethodName};&nbsp;
                        积分抵扣金额:￥{numeral(Math.abs(item.pointPrice)).format("0,0.00")};&nbsp;消耗积分:{item.consumePoint};&nbsp;
                        充值赠送金额:￥{numeral(Math.abs(item.givePrice)).format("0,0.00")};&nbsp;本次结余:￥{numeral(item.recordBalance).format("0,0.00")}元
                    </div>
                )
            } else if(item.recordType == 3) {//退款
                return (
                    <div>退款金额:￥{numeral(Math.abs(item.priceAmount)).format("0,0.00")}元;&nbsp;本次结余:￥{numeral(item.recordBalance).format("0,0.00")}元</div>
                )
            } else {
                return (
                    <div>消费金额:￥{numeral(Math.abs(item.priceAmount)).format("0,0.00")}元;&nbsp;本次结余:￥{numeral(item.recordBalance).format("0,0.00")}元</div>
                )
            }            
        }
        return (
            <PageHeaderLayout
                title={"会员退款"}
                content={`会员退款目前只能线下退款,线下退款方式请与会员顾客协商,退款金额请您根据详细充值、消费记录计算退款金额。退款之后会短信提醒会员用户。如果您需要线上开发公众号退款申请,请联系我们定制为您开发`}
            >
                <Card bordered={false}>
                    <div className={styles.search}>
                        <Input placeholder="请输入会员手机号码" maxLength={20} value={phone} style={{ width: 200, marginRight: 8 }}
                            onChange={e => { onRechargePhoneChange(e.target.value) }}
                            onPressEnter={() => this.selectDetailByPhone(phone)}
                        />
                        <Button type="primary" loading={loading} onClick={() => this.selectDetailByPhone(phone)}>查询</Button>
                    </div>
                    <MemberDetailForm {...memberDetailData} detailLoading={loading} >
                        <Button type={"primary"} disabled={!memberDetailData.phone.value} style={{ marginRight: 8 }} onClick={() => this.handleRefundModalVisible(true)}>
                            退款
                        </Button>
                    </MemberDetailForm>
                    <Divider>最近充值\消费\退款记录</Divider>
                    <div className={styles.recordTypes}>
                        <div style={{ marginRight: 8, fontSize: 14 }}>记录类型:</div>
                        <Tag.CheckableTag checked={renderChecked(1)} onChange={checked => {this.onRecordTypeChange(1, checked)}}>
                            充值
                        </Tag.CheckableTag>
                        <Divider type="vertical"/>
                        <Tag.CheckableTag checked={renderChecked(2)} onChange={checked => {this.onRecordTypeChange(2, checked)}}>
                            消费
                        </Tag.CheckableTag>
                        <Divider type="vertical"/>
                        <Tag.CheckableTag checked={renderChecked(3)} onChange={checked => {this.onRecordTypeChange(3, checked)}}>
                            退款
                        </Tag.CheckableTag>
                    </div>
                    <List
                        className="demo-loadmore-list"
                        loading={recordLoading}
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={recordList}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={renderItemTitle(item)}
                                    description={item.recordDesc}
                                />
                                {renderContent(item)}
                            </List.Item>
                        )}
                    />
                </Card>
                <RefundModal visible={refundModalVisible} handleModalVisible={this.handleRefundModalVisible}
                    confirmLoading={refundLoading}
                    handleSubmit={this.refund}
                >
                </RefundModal>
            </PageHeaderLayout>
        )
    }

}

export default withRouter(connect((state) => {
    return {
        memberRefund: state.memberRefund,
    }
}, (dispatch) => {
    return {
        memberRefundActions: bindActionCreators(memberRefundActions, dispatch),
    }
})(MemberRefundPage));