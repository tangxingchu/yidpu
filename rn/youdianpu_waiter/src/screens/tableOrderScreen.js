import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import {
    WhiteSpace,
    WingBlank,
    List,
    Modal,
    Toast,
    Button as AntdButton,
} from 'antd-mobile-rn';
import Button from 'react-native-button';
import numeral from 'numeral';
const alert = Modal.alert;

import orderActions from '../actions/order';
import tableActions from '../actions/table';
import placeOrderActions from '../actions/placeOrder';
import { getSub } from '../utils/authority';

class TableOrderScreen extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._onRefresh();
        this.emitter = DeviceEventEmitter.addListener('tableOrderRefresh', () => {
            this._onRefresh();
        });
        if(global.socket) {
            global.socket.on('printOrderMsg', data => {
                Toast.hide();
                if(data.success) {
                    //更新一下打印状态
                    //修改订单打印状态
                    // this.props.placeOrderActions.updateOrderItemPrintStatus(data.tableCode);
                    Toast.success("成功发往后厨打印");
                } else {
                    // Toast.fail(`后厨打印用餐订单明细失败,${data.message}`);
                    Modal.alert('错误提示', `后厨打印用餐订单明细失败,${data.message}`, [
                        {text: '知道了'},
                    ]);
                }
            });
            global.socket.on('printTicketMsg', data => {
                if(data.success) {
                    Toast.success("成功在前台打印小票");
                } else {
                    // Toast.fail(`下单小票打印失败,${data.message}`);
                    Modal.alert('错误提示', `下单小票打印失败,${data.message}`, [
                        {text: '知道了'},
                    ]);
                }
            });
            global.socket.on('app_printOrderMsg', data => {
                Toast.hide();
                if(data.success) {
                    //更新一下打印状态
                    //修改订单打印状态
                    // this.props.placeOrderActions.updateOrderItemPrintStatus(data.tableCode);
                    Toast.success("成功发往后厨打印");
                } else {
                    // Toast.fail(`后厨打印用餐订单明细失败,${data.message}`);
                    Modal.alert('错误提示', `后厨打印用餐订单明细失败,${data.message}`, [
                        {text: '知道了'},
                    ]);
                }
            });
            global.socket.on('confirmOrderMsg', data => {
                const { orderNo } = data;
                this.props.orderActions.dispatchConfirmOrder(orderNo);
            });
        }
    }
    
    componentWillUnmount() {
        this.emitter.remove();
        if (global.socket) {
            global.socket.removeAllListeners("printOrderMsg");
            global.socket.removeAllListeners("printTicketMsg");
            global.socket.removeAllListeners("app_printOrderMsg");
            global.socket.removeAllListeners("confirmOrderMsg");
        }
    }

    _onRefresh = () => {
        const { tableCode } = this.props.navigation.state.params;
        this.props.orderActions.selectOrderInfo(tableCode).catch(e => {
            Toast.fail(e.message, 2);
        });
    }

    palceOrder = () => {
        const { tableCode } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        navigate('PlaceOrder', { transition: 'forHorizontal', tableCode: tableCode, isAppend: true });
    }

    finishedOrder = (orderNo) => {
        alert('提示', '确认完成订单吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                const { tableCode } = this.props.navigation.state.params;
                Toast.loading("确认完成订单中...", 0);
                this.props.orderActions.finishedOrder(orderNo).then(() => {
                    Toast.hide();
                    Toast.success("订单成功完成", 1.5);
                    if(global.socket) {
                        global.socket.emit("udpateTableStatus", {tableCode: tableCode, status: 5});
                    }
                    this.props.navigation.pop();
                }).catch(e => {
                    Toast.hide();
                    Toast.fail(e.message, 2);
                });
            } },
        ]);
    }

    goBack = () => {
        this.props.navigation.pop();
    }

    deleteOrderItem = (orderNo, id) => {
        Toast.loading("删除订单项中...", 0);
        this.props.orderActions.deleteOrderItem(orderNo, id).then(() => {
            Toast.hide();
            Toast.success("订单项删除成功", 1.5);
        }).catch(e => {
            Toast.hide();
            Toast.fail(e.message, 2);
        });
    }

    cancelOrderItem = (orderNo, id) => {
        Toast.loading("取消订单项中...", 0);
        this.props.orderActions.cancelOrderItem(orderNo, id).then(() => {
            Toast.hide();
            Toast.success("订单项取消成功", 1.5);
        }).catch(e => {
            Toast.hide();
            Toast.fail(e.message, 2);
        });
    }

    confirmOrderItem = (orderNo, id) => {
        const { tableCode } = this.props.navigation.state.params;
        const { orderInfo } = this.props.order;
        Toast.loading("确认订单项中...", 0);
        this.props.orderActions.confirmOrderItem(orderNo, id, tableCode).then((result) => {
            Toast.hide();
            Toast.success("订单项确认成功", 1.5);
            if(result == 0) {
                if(global.socket) {
                    global.socket.emit("udpateTableStatus", {tableCode: tableCode, status: 4});
                    this.props.tableActions.dispatch_tableStatus(tableCode, 4);
                    Toast.loading("发往前台打印小票与发往后厨打印...", 0);
                    global.socket.emit('printSubmitOrder', this.generateCart(orderInfo));
                    getSub().then(username => {
                        global.socket.emit('confirmOrder', {orderNo, tableCode, username: username.indexOf(':') > -1 ? username.split(":")[1] : username});
                    });
                }
            }
        }).catch(e => {
            Toast.hide();
            Toast.fail(e.message, 2);
        });
    }

    shippedOrderItem = (orderNo, id) => {
        Toast.loading("标记订单项中...", 0);
        this.props.orderActions.shippedOrderItem(orderNo, id).then(() => {
            Toast.hide();
            Toast.success("订单项标记已出菜成功", 1.5);
        }).catch(e => {
            Toast.hide();
            Toast.fail(e.message, 2);
        });
    }

    receiveOrderItem = (orderNo, id) => {
        Toast.loading("标记订单项中...", 0);
        this.props.orderActions.receiveOrderItem(orderNo, id).then(() => {
            Toast.hide();
            Toast.success("订单项标记已上菜成功", 1.5);
        }).catch(e => {
            Toast.hide();
            Toast.fail(e.message, 2);
        });
    }

    showAlert = (orderItemStatus, id, orderNo) => {
        if(orderItemStatus == 9) {
            alert('请选择', "", [
                /* { text: '删除', onPress: () => this.deleteOrderItem(orderNo, id) }, */
                { text: '关闭', onPress: () => {} },
            ])
        } else if(orderItemStatus == 4) {
            alert('请选择', "", [
                { text: '标为已上菜(上菜员使用)', onPress: () => this.receiveOrderItem(orderNo, id) },
                { text: '关闭', onPress: () => {} },
            ])
        } else if(orderItemStatus == 12) {
            alert('请选择', "", [
                { text: '退单', onPress: () => Toast.fail("已上菜的退单请在主应用中操作", 2) },
                { text: '关闭', onPress: () => {} },
            ])
        } else if(orderItemStatus == 0) {
            alert('请选择', "", [
                { text: '取消并删除', onPress: () => this.deleteOrderItem(orderNo, id) },
                { text: '确认该项', onPress: () => this.confirmOrderItem(orderNo, id) },
                { text: '关闭', onPress: () => {} },
            ])
        } else {
            alert('请选择', "", [
                { text: '取消并删除', onPress: () => this.deleteOrderItem(orderNo, id) },
                { text: '标为已出菜(后厨使用)', onPress: () => this.shippedOrderItem(orderNo, id) },
                { text: '标为已上菜(上菜员使用)', onPress: () => this.receiveOrderItem(orderNo, id) },
                { text: '关闭', onPress: () => {} },
            ])
        }
    }

    generateCart = (data) => {
        const cart = {
            orderNo: data.orderNo,
            tableCode: data.tableCode,
            dinersNum: data.dinersNum,
            orderTime: data.orderTime,
            cartItem: [],
        };
        data.orderItemVos.forEach(orderItem => {
            if(orderItem.printStatus == 0) {
                let cartItem = {};
                cartItem.name = orderItem.goodsName;
                cartItem.price = orderItem.price;
                cartItem.itemPrice = orderItem.price * parseInt(orderItem.num);
                cartItem.num = orderItem.num;
                cartItem.unitName = orderItem.goodsUnitName;
                cartItem.goodsId = orderItem.goodsId;
                if(orderItem.ruleCode == "1") {
                    cartItem.dayOrDiscountName = '特价';
                } else if(orderItem.ruleCode == "2") {
                    cartItem.dayOrDiscountName = `${orderItem.ruleValue}折`;
                }
                cartItem.extraItemNames = orderItem.extraName;
                cart.cartItem.push(cartItem);
                cart.orderTime = orderItem.orderItemTime;
            }
        });
        return cart;
    }

    confirmOrder = (orderNo) => {
        const { tableCode } = this.props.navigation.state.params;
        const { orderInfo } = this.props.order;
        Toast.loading("用餐订单确认中...", 0);
        this.props.orderActions.confirmOrder(orderNo, tableCode).then(() => {
            Toast.hide();
            Toast.success("用餐订单确认成功", 1.5);
            if(global.socket) {
                global.socket.emit("udpateTableStatus", {tableCode: tableCode, status: 4});
                this.props.tableActions.dispatch_tableStatus(tableCode, 4);
                Toast.loading("发往前台打印小票与发往后厨打印...", 0);
                global.socket.emit('printSubmitOrder', this.generateCart(orderInfo));
                getSub().then(username => {
                    global.socket.emit('confirmOrder', {orderNo, tableCode, username: username.indexOf(':') > -1 ? username.split(":")[1] : username});
                });
            }
        }).catch(e => {
            Toast.hide();
            Toast.fail(e.message, 2);
        });
    }

    printOrder = () => {
        const { orderInfo } = this.props.order;
        if(global.socket) {
            alert('提示', '提交订单之后会将未打印的菜品自动发往后厨打印，确认再次发往后厨打印吗？', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                    if(global.socket) {
                        Toast.loading("发往后厨打印...", 0);
                        global.socket.emit('app_printOrder', this.generateCart(orderInfo));
                    }
                } },
            ])
        }
    }

    render() {
        const { loading, orderInfo, payAmount, subtractMap } = this.props.order;
        const renderHeader = (order) => {
            return (
                <View style={styles.orderHeader}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontWeight: 'bold'}}>
                            桌台编号:{order.tableCode}
                        </Text>
                        <Text>下单时间:{order.orderTime}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{order.orderStatusName}</Text>
                    </View>
                </View>
            )
        }
        const renderFooter = (order) => {
            return (
				<Fragment>
					<View style={styles.orderFooter}>
						<Text>共{order.orderItemVos.length}件商品</Text>
						<Text style={styles.orderTotalPrice}>￥{numeral(order.totalPrice).format('0,0.00')}</Text>
					</View>
					{
						subtractMap[order.orderNo] ? subtractMap[order.orderNo].map(subtract => {
							return (
								<View key={subtract.id} style={styles.bottomItem_noBorder}>
									{
										subtract.constraintType == 2 ? 
                                        <View style={{paddingLeft: 4, paddingRight: 8}}>
                                            <Text>时间约束:{subtract.constraintTimeStart}-{subtract.constraintTimeEnd}</Text>
                                        </View>
										: 
                                        <View style={{paddingLeft: 4, paddingRight: 8, flexDirection: 'row'}}>
                                            <Text>消费满</Text>
											<Text style={{paddingLeft: 2, color: '#ff4242', fontSize: 14}}>
												￥{numeral(subtract.consumePrice).format('0,0.00')}
											</Text>
										</View>
									}
									{
										subtract.type == 3 ?  
                                            <View style={{paddingLeft: 4, paddingRight: 8, flexDirection: 'row'}}>
                                                <Text>赠现金券</Text>
                                                <Text style={{fontSize: 14, color: '#ff4242'}}>￥{numeral(subtract.amount2).format('0,0.00')}</Text>
                                            </View>
                                        :
										subtract.type == 2 ? 
                                            <View style={{paddingLeft: 4, paddingRight: 8, flexDirection: 'row'}}>
                                                <Text style={{fontSize: 14, color: '#ff4242'}}>{subtract.discount}折</Text>
                                            </View>
										:
                                            <View>
                                                <Text style={{fontSize: 18, color: '#ff4242'}}>-￥{numeral(subtract.amount1).format('0,0.00')}</Text>
                                            </View>
									}
								</View>
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
                return <Text>{orderItem.goodsName}<Text style={styles.ruleName}>(特价)</Text></Text>;
            } else if(orderItem.ruleCode == "2") {//折扣
                return <Text>{orderItem.goodsName}<Text style={styles.ruleName}>({orderItem.ruleValue}折)</Text></Text>;
            } else {
                return <Text>{orderItem.goodsName}</Text>;
            }
        }
        const renderItem = (orderItem) => {
            return (
                <List.Item key={orderItem.id}>
                    <TouchableOpacity onPress={() => this.showAlert(orderItem.orderItemStatus, orderItem.id, orderItem.orderNo)}>
                        <View style={orderItem.orderItemStatus == 9 ? styles.orderItemCancel : styles.orderItem}>
                            <View style={styles.left}>
                                <Text style={orderItem.printStatus == 0 ? {marginRight: 4, fontSize: 12, color: 'red'} : {marginRight: 4, fontSize: 12}}>{orderItem.printStatus == 0 ? '未打单' : '已打单'}</Text>
                                <Text style={orderItem.orderItemStatus == 9 ? styles.orderItemCancel_Text : null}>{renderGoodsName(orderItem)}</Text>
                                <Text style={orderItem.orderItemStatus == 9 ? styles.extraItem_cancel :styles.extraItem}>{orderItem.extraName}</Text>
                                <Text numberOfLines={1} style={orderItem.orderItemStatus == 9 ? styles.orderItemRemark_cancel :styles.orderItemRemark}>{orderItem.remark ? `(${orderItem.remark})` : null}</Text>
                            </View>
                            <View style={styles.priceItem}>
                                <Text style={orderItem.orderItemStatus == 9 ? styles.num_cancel : styles.num}>{orderItem.num}{orderItem.goodsUnitName}</Text>
                                <Text style={orderItem.orderItemStatus == 9 ? styles.price_cancel : styles.price}>￥{numeral(orderItem.price).format('0,0.00')}</Text>
                            </View>
                            <View style={styles.orderItemStatus}>
                                {
                                    orderItem.orderItemStatus == '9' ?
                                        <Text style={styles.status_cancel}>已退单</Text>
                                    :
                                    orderItem.orderItemStatus == '4' ?
                                        <Text style={styles.status4}>已出菜</Text>
                                    :
                                    orderItem.orderItemStatus == '12' ?
                                        <Text style={styles.status12}>已上菜</Text>
                                    :
                                    orderItem.orderItemStatus == '0' ?
									    <Text style={styles.status0}>待确认</Text>
								    :
                                        <Text style={styles.status}>待上菜</Text>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                </List.Item>
            )
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this._onRefresh}
                            tintColor="#ffffff"
                            title="数据加载中..."
                            titleColor="#ffffff"
                            colors={['#ffffff']}
                            progressBackgroundColor="#1296db"
                        />
                    }
                >
                    {
                        orderInfo == null ? loading ? null : <WingBlank size="md"><Text style={styles.title}>没有查到订单数据</Text></WingBlank>
                        : 
                            <WingBlank size="md">
                                <List
                                    renderHeader={renderHeader(orderInfo)}
                                    renderFooter={renderFooter(orderInfo)}
                                    style={{marginBottom: 4}}
                                >
                                    {
                                        orderInfo.orderItemVos && orderInfo.orderItemVos.map(orderItem => {
                                            return renderItem(orderItem)
                                        })
                                    }
                                </List>
                                <List>
                                    <List.Item>
                                        <View style={styles.bottomItem_noBorder}><Text>共1笔单。 合计：</Text>
                                            <Text style={{fontSize: 18, color: '#1890ff'}}>￥
                                            {
                                                numeral(orderInfo.totalPrice).format('0,0.00')
                                            }
                                            </Text>
                                        </View>
                                    </List.Item>
                                    <List.Item>
                                        <View style={styles.bottomItem_noBorder}>
                                            <Text>合计应支付：</Text><Text style={{color: '#ff4242', fontSize: 18}}>￥{numeral(payAmount).format('0,0.00')}</Text>
                                        </View>
                                    </List.Item>
                                </List>
                            </WingBlank>
                    }
                    <WingBlank size="md">
                        <WhiteSpace size="md"/>
                        {
                            orderInfo && orderInfo.orderStatus == "0" ?
                            <Fragment>
                                <Button
                                    containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                                    disabledContainerStyle={{ backgroundColor: 'grey' }}
                                    style={{ fontSize: 16, color: '#fff', marginLeft: 16, marginRight: 16 }}
                                    onPress={() => {this.confirmOrder(orderInfo.orderNo)}}
                                >
                                    全部确认
                                </Button>
                                <WhiteSpace size="md"/>
                            </Fragment>
                            : null
                        }
                        {
                            orderInfo ? 
                            <Fragment>
                                {
                                    orderInfo.orderStatus == "3" ?
                                    <Fragment>
                                        <AntdButton
                                            type={"primary"}
                                            style={{ height: 42 }}
                                            onClick={() => {this.finishedOrder(orderInfo.orderNo)}}
                                        >
                                            完成订单
                                        </AntdButton>
                                        <WhiteSpace size="md"/>
                                    </Fragment>
                                    : null
                                }
                                <AntdButton
                                    type={"primary"}
                                    style={{ height: 42 }}
                                    onClick={() => {this.palceOrder()}}
                                >
                                    加菜
                                </AntdButton>
                                <WhiteSpace size="md"/>
                                <AntdButton
                                    style={{ height: 42 }}
                                    onClick={() => {this.printOrder()}}
                                >
                                    后厨打印
                                </AntdButton>
                                <WhiteSpace size="md"/>

                            </Fragment>
                            :
                            null
                        }
                        
                        {/* <Button
                            containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#fff' }}
                            disabledContainerStyle={{ backgroundColor: 'grey' }}
                            style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', marginLeft: 16, marginRight: 16, }}
                            onPress={() => {this.goBack()}}
                        >
                            返回
                        </Button> */}
                        <AntdButton
                            style={{ height: 42 }}
                            onClick={() => {this.goBack()}}
                        >
                            返回
                        </AntdButton>
                        <WhiteSpace size="md"/>
                    </WingBlank>
                </ScrollView>
            </View>
        )
    }

}

export default connect((state) => {
    return {
        order: state.order,
    }
}, (dispatch) => {
    return { 
        orderActions: bindActionCreators(orderActions, dispatch),
        tableActions: bindActionCreators(tableActions, dispatch),
        placeOrderActions: bindActionCreators(placeOrderActions, dispatch),
    }
})(TableOrderScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    orderFooter: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 4,
    },
    orderTotalPrice: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomItem: {
        flexDirection: "row",
        paddingRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderStyle: 'solid',
        justifyContent: "flex-end",
        alignItems: "center",
        minHeight: 28,
    },
    bottomItem_noBorder: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderItemCancel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderItemCancel_Text: {
        textDecorationLine: 'line-through',
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    ruleName: {
        color: '#ff4242'
    },
    extraItem: {
        marginLeft: 4,
        color: 'rgba(0,0,0,.45)',
        fontSize: 14,
    },
    extraItem_cancel: {
        marginLeft: 4,
        color: 'rgba(0,0,0,.45)',
        fontSize: 14,
        textDecorationLine: 'line-through',
    },
    orderItemRemark: {
        marginLeft: 4,
        color: 'rgba(0,0,0,.45)',
        fontSize: 13,
    },
    orderItemRemark_cancel: {
        marginLeft: 4,
        color: 'rgba(0,0,0,.45)',
        fontSize: 13,
        textDecorationLine: 'line-through',
    },
    priceItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    price: {
        width: 80,
        textAlign: "right",
    },
    price_cancel: {
        width: 80,
        textAlign: "right",
        textDecorationLine: 'line-through',
    },
    num: {
        color: "rgba(0,0,0,.45)",
        fontSize: 14,
    },
    num_cancel: {
        color: "rgba(0,0,0,.45)",
        fontSize: 14,
        textDecorationLine: 'line-through',
    },
    orderItemStatus: {
        marginLeft: 8,
    },
    status4: {
        color: '#FFD700',
        marginRight: 8,
        fontSize: 13,
    },
    status12: {
        color: '#87d068',
        marginRight: 8,
        fontSize: 13,
    },
    status0: {
        color: 'rgb(254, 238, 175)',
        marginRight: 8,
        fontSize: 13,
    },
    status: {
        color: 'rgba(0,0,0,.45)',
        marginRight: 8,
        fontSize: 13,
    },
    status_cancel: {
        color: 'rgba(0,0,0,.45)',
        marginRight: 8,
        fontSize: 13,
        textDecorationLine: 'line-through',
    }
});