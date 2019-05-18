import React, { Component, Fragment } from 'react';
import { Card, Modal, Button, List, Spin, Popconfirm, InputNumber, Checkbox, Popover, Icon, Alert, Dropdown, Menu } from 'antd';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

import { rootRouter } from '../../../common/config';
import styles from './orderDetail.less';

export default class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        }];
    }

    subtractOnChange = (e, subtractId, orderNo) => {
        const checked = e.target.checked;
        this.props.subtractOnChange(subtractId, orderNo, checked);
    }

    onReceviedAmountChange = (e) => {
        const { value } = e.target;
        this.props.onReceviedAmountChange(value);
    }

    render() {
        const { visible, handleModalVisible, loading, orderList, subtractMap, couponConsumeMap, refreshOrderItemByTableCode, deleteOrderItem,
            cancelOrderItem, confirmOrderItem, receiveOrderItem, payAmount, receivedAmount, finishedOrderLoading,
            syncAlipayResultLoading, syncWxpayResultLoading, syncAlipayResult, syncWechatResult, showCouponModal, listOtherTables, handlePaymentModalVisible, 
            handleMemberPaymentModalVisible, onReceviedAmountChange, goPlaceOrder, confirmOrderLoading } = this.props;
        const isDisabledFinishedBtn = () => {
            if(orderList.length == 0) {
                return true;
            } else {
                const currOrder = orderList[0];
                if(currOrder.orderStatus == '3') {
                    return false;
                } else {
                    return true;
                }
            }
        }
        const isDisabledPaymentBtn = () => {
            if(orderList.length == 0) {
                return true;
            } else {
                const currOrder = orderList[0];
                // if(currOrder.orderStatus == '3' || currOrder.orderStatus == '0' || currOrder.orderStatus == '-1') {
                if(currOrder.orderStatus == '3' || currOrder.orderStatus == '0') {
                    return true;
                } else {
                    return false;
                }
            }
        }
        const isDisabledMemberPaymentBtn = () => {
            if(orderList.length == 0) {
                return true;
            } else {
                const currOrder = orderList[0];
                if(currOrder.orderStatus == '3' || currOrder.orderStatus == '0' || currOrder.orderStatus == '-1') {
                    return true;
                } else {
                    return false;
                }
            }
        }
        const content = (orderNo) => (
            <Fragment>
                <Button type="primary" loading={syncAlipayResultLoading} onClick={() => syncAlipayResult(orderNo)}>查询一次支付宝支付结果</Button>
                <br/>
                <Button type="primary" style={{marginTop: 8}} loading={syncWxpayResultLoading} onClick={() => syncWechatResult(orderNo)}>查询一次微信支付结果</Button>
            </Fragment>
        )
        const renderHeader = (order, index) => {
            return (
                <div className={styles.orderHeader}>
                    <div><span style={{fontWeight: 'bold'}}>{index+1}</span>&nbsp;&nbsp;桌台编号:{order.tableCode}&nbsp;&nbsp;下单时间:{order.orderTime}</div>
                    <div className={styles.orderStatus}>
                        {
                            order.orderStatus == "0" ?
                            <div style={{marginRight: 4}}>
                                <Button type={"primary"} loading={confirmOrderLoading} onClick={() => this.props.confirmOrder(order.orderNo)}>全部确认</Button>
                            </div>
                            : null
                        }
                        <Popover content={content(order.orderNo)} title="状态有疑问?(仅限顾客桌台扫码支付疑问)">
                            <div>{order.orderStatusName}<Icon type="question"/></div>
                        </Popover>
                    </div>
                </div>
            )
        }
        const renderFooter = (order) => {
            return (
                <Fragment>
                    <div className={styles.orderFooter}>
                        <div>共{order.orderItemVos.length}件商品</div>
                        <div className={styles.orderTotalPrice}>￥{numeral(order.totalPrice).format('0,0.00')}</div>                    
                    </div>
                    {
                        subtractMap[order.orderNo] ? subtractMap[order.orderNo].map(subtract => {
                            return (
                                <div key={subtract.id} className={styles.bottomItem_border}>
                                    { subtract.type == 3 ? null : <Checkbox /* onChange={(e) => {this.subtractOnChange(e, subtract.id, order.orderNo)}} */ checked={subtract.checked}/>}
                                    {
                                        subtract.constraintType == 2 ? <div style={{paddingLeft: 4, paddingRight: 8}}>时间约束:{subtract.constraintTimeStart}-{subtract.constraintTimeEnd}</div>
                                        : <div style={{paddingLeft: 4, paddingRight: 8}}>消费满
                                            <span style={{paddingLeft: 2, color: '#ff4242', fontSize: 18}}>
                                                ￥{numeral(subtract.consumePrice).format('0,0.00')}
                                            </span>
                                        </div>
                                    }
                                    {
                                        subtract.type == 3 ?  <div style={{paddingLeft: 4, paddingRight: 8}}>赠送现金券<span style={{fontSize: 18, color: '#ff4242'}}>￥{numeral(subtract.amount2).format('0,0.00')}</span>,下次消费使用.</div> :
                                        subtract.type == 2 ? <div style={{fontSize: 18, color: '#ff4242'}}>{subtract.discount}折</div>
                                        : <div style={{fontSize: 18, color: '#ff4242'}}>-￥{numeral(subtract.amount1).format('0,0.00')}</div>
                                    }
                                </div>
                            )
                        })
                        : null
                    }
                    {
                        couponConsumeMap[order.orderNo] ? couponConsumeMap[order.orderNo].map(coupon => {
                            return (
                                <div key={coupon.id} className={styles.bottomItem}>
                                    <div>现金券抵扣<span style={{fontSize: 18, color: '#ff4242'}}>-￥{numeral(coupon.couponPrice).format('0,0.00')}</span></div> 
                                </div>
                            )
                        })
                        : null
                    }
                </Fragment>
            )
        }
        const renderGoodsName = (orderItem) => {
            //特价
            if(orderItem.ruleCode == "1") {
                return <span>{orderItem.goodsName}<span className={styles.ruleName}>(特价)</span></span>;
            } else if(orderItem.ruleCode == "2") {//折扣
                return <span>{orderItem.goodsName}<span className={styles.ruleName}>({orderItem.ruleValue}折)</span></span>;
            } else {
                return orderItem.goodsName;
            }
        }
        const menu = ({ orderItem }) => {
            return (
                <Menu>
                    <Menu.Item>
                        <Popconfirm okText="确定" cancelText="取消" title={"确定取消并删除吗?"} onConfirm={() => deleteOrderItem(orderItem.orderNo, orderItem.id)}>
                            <a>取消并删除</a>
                        </Popconfirm>
                    </Menu.Item>
                    <Menu.Item>
                        <Popconfirm okText="确定" cancelText="取消" title={"确定标记为已上菜吗?"} onConfirm={() => receiveOrderItem(orderItem.orderNo, orderItem.id)}>
                            <a>标记为已上菜</a>
                        </Popconfirm>
                    </Menu.Item>
                </Menu>
            )
        };
        const MoreBtn = (orderItem) => {
            return (
                <Dropdown overlay={menu(orderItem)}>
                    <a>
                        操作 <Icon type="down" />
                    </a>
                </Dropdown>
            )
        };
        const menu2 = ({ orderItem }) => {
            return (
                <Menu>
                    <Menu.Item>
                        <Popconfirm okText="确定" cancelText="取消" title={"确定标记为已上菜吗?"} onConfirm={() => receiveOrderItem(orderItem.orderNo, orderItem.id)}>
                            <a>标记为已上菜</a>
                        </Popconfirm>
                    </Menu.Item>
                </Menu>
            )
        };
        const MoreBtn2 = (orderItem) => {
            return (
                <Dropdown overlay={menu2(orderItem)}>
                    <a>
                        操作 <Icon type="down" />
                    </a>
                </Dropdown>
            )
        };
        const menu3 = ({ orderItem }) => {
            return (
                <Menu>
                    <Menu.Item>
                        <Popconfirm okText="确定" cancelText="取消" title={"确定取消并删除吗?"} onConfirm={() => deleteOrderItem(orderItem.orderNo, orderItem.id)}>
                            <a>取消并删除</a>
                        </Popconfirm>
                    </Menu.Item>
                    <Menu.Item>
                        <Popconfirm okText="确定" cancelText="取消" title={"确定确认该项吗?"} onConfirm={() => confirmOrderItem(orderItem.orderNo, orderItem.id)}>
                            <a>确认该项</a>
                        </Popconfirm>
                    </Menu.Item>
                </Menu>
            )
        };
        const MoreBtn3 = (orderItem) => {
            return (
                <Dropdown overlay={menu3(orderItem)}>
                    <a>
                        操作 <Icon type="down" />
                    </a>
                </Dropdown>
            )
        };
        const renderItem = (orderItem) => {
            return (
                <List.Item>
                    <div className={orderItem.orderItemStatus == 9 ? `${styles.orderItem} ${styles.orderItemCancel}` : `${styles.orderItem}`}>
                        <div className={styles.left}>
                            <div>{renderGoodsName(orderItem)}</div>
                            <div className={styles.extraItem}>{orderItem.extraName}</div>
                            <div className={styles.remark}>{orderItem.remark ? `(${orderItem.remark})` : null}</div>
                        </div>
                        <div className={styles.priceItem}>
                            <div className={styles.num}>{orderItem.num}{orderItem.goodsUnitName}</div>
                            <div className={styles.price}>￥{numeral(orderItem.price).format('0,0.00')}</div>
                        </div>
                        <div className={styles.orderItemStatus}>
                            {
                                orderItem.orderItemStatus == '9' ?
                                    <span style={{color: '#ff4242'}}>已退单</span>
                                : 
                                orderItem.orderItemStatus == '12' ?
                                <span>
                                    <span className={styles.status} style={{color: '#87d068'}}>已上菜</span>
                                    <Popconfirm okText="确定" cancelText="取消" title={"确定退单吗?"} onConfirm={() => cancelOrderItem(orderItem.orderNo, orderItem.id)}>
                                        <a>退单</a>
                                    </Popconfirm>
                                </span>
                                :
                                orderItem.orderItemStatus == '4' ?
                                <span>
                                    <span className={styles.status} style={{color: '#FFD700'}}>已出菜</span>
                                    <MoreBtn2 orderItem={orderItem} />
                                </span>
                                :
                                orderItem.orderItemStatus == '0' ?
                                <span>
                                    <span className={styles.status} style={{color: 'rgb(254, 238, 175)'}}>待确认</span>
                                    <MoreBtn3 orderItem={orderItem} />
                                </span>
                                :
                                <span>
                                    <span className={styles.status}>待上菜</span>
                                    <MoreBtn orderItem={orderItem} />
                                </span>
                            }
                        </div>
                    </div>
                </List.Item>
            )
        }
        const calTotalAmount = (orderList) => {
            let totalAmount = 0;
            orderList.forEach(order => {
                totalAmount += order.totalPrice;
            });
            return totalAmount;
        }
        const renderMessage = (order) => {
            return <span>订单状态异常,顾客支付金额≠订单金额。顾客已支付￥{numeral(order.exceptionPrice).format('0,0.00')}。</span>;
        }
        return (
            <Modal
                title="用餐订单(待确认、待支付、已支付)"
                width={760}
                onCancel={() => handleModalVisible(false)}
                footer={[
                    <Button key="close" style={{marginRight: 8,}} onClick={() => handleModalVisible(false)}>
                        关闭
                    </Button>,
                    <Popconfirm key="finished" title="确认完成该笔用餐订单吗?" onConfirm={() => this.props.finishedOrder()}>
                        <Button style={{marginRight: 8,}} type="primary" loading={finishedOrderLoading} disabled={isDisabledFinishedBtn()}>
                            完成订单
                        </Button>
                    </Popconfirm>,
                    <Button key="payment" onClick={() => {handlePaymentModalVisible(true)}} type="primary" disabled={isDisabledPaymentBtn()}>收银</Button>,
                    <Button key="memberPayment" onClick={() => {handleMemberPaymentModalVisible(true)}} type="primary" disabled={isDisabledMemberPaymentBtn()}>会员消费</Button>,
                ]}
                visible={visible}
            >
                <Spin spinning={loading}>
                {
                   orderList.length > 0 && orderList[0].orderStatus == '-1' ?
                    <Alert message={renderMessage(orderList[0])} type="warning" showIcon style={{marginBottom: 8}}/>
                    : null
                }
                { orderList.length === 0 ? 
                    <Fragment>
                        <div className={styles.noData}>
                            这里只显示<span style={{fontSize: 18, fontWeight: 'bold'}}>待确认、待支付、已支付</span>的订单,如果希望查询其它状态的订单,请前往
                                <Link to={`${rootRouter}/order/historyOrder`}>历史用餐订单</Link>        
                        </div>
                        <div style={{textAlign: 'center'}}><Button type={"primary"} onClick={() => goPlaceOrder()}>下单</Button></div>
                    </Fragment>
                    : 
                    <div className={styles.container}>
                        <Button icon={"reload"} style={{marginBottom: 8, marginRight: 8}} loading={loading} onClick={() => refreshOrderItemByTableCode()}>刷新</Button>
                        <Button style={{marginBottom: 8, marginRight: 8}} onClick={() => {listOtherTables(true)}}>合并其它桌台收银</Button>
                        <Button style={{marginBottom: 8}} onClick={() => {showCouponModal()}}>消费现金券</Button>
                        {
                            orderList.map((order, index) => (
                                <List
                                    key={order.id}
                                    header={renderHeader(order, index)}
                                    footer={renderFooter(order)}
                                    style={{marginBottom: 4}}
                                    bordered
                                    size={"small"}
                                    dataSource={order.orderItemVos}
                                    renderItem={(item) => (renderItem(item))}
                                >
                                </List>
                            ))
                        }
                        <Card style={{padding: 0}}>
                            <div className={styles.bottomItem}>共{orderList.length}笔单。 
                                消费合计：<span className={styles.orderTotalPrice}>￥
                                {
                                    numeral(calTotalAmount(orderList)).format('0,0.00')
                                }
                                </span>
                            </div>
                            <div className={`${styles.bottomItem}`}>
                                合计应收(已减优惠)：
                                <span style={{fontSize: 18, color: '#1890ff'}}>
                                    ￥{numeral(payAmount).format('0,0.00')}
                                </span>
                            </div>
                            <div className={`${styles.bottomItem} ${styles.bottomItem_noBorder}`}>
                                合计实收：￥<InputNumber style={{color: '#ff4242', fontSize: 18, width: 100}} 
                                    value={receivedAmount} step={0.01} onChange={onReceviedAmountChange}/>
                            </div>
                        </Card>
                    </div>
                }
                </Spin>
            </Modal>
        )
    }

}