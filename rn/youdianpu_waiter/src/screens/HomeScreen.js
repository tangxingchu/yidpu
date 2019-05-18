import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Alert,
    Dimensions,
} from 'react-native';
import {
    WingBlank,
    Card,
    Toast
} from 'antd-mobile-rn';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';
import CodePush from 'react-native-code-push';

import homeActions from '../actions/home';
import Storage from '../utils/storage';
import { renderSubtract, renderConstraint } from '../utils/dataUtils';

class HomeScreen extends Component {

    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/images/home_focused.png')} />
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../assets/images/home.png')} />
            );
        },
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /* if (!window.location) {
            // App is running in simulator
            window.navigator.userAgent = 'ReactNative';
        } */
        CodePush.sync({
            updateDialog: {
                //是否显示更新描述
                appendReleaseDescription : true ,
                //更新描述的前缀。 默认为"Description"
                descriptionPrefix : "更新内容：" ,
                //强制更新按钮文字，默认为continue
                mandatoryContinueButtonLabel : "立即更新" ,
                //强制更新时的信息. 默认为"An update is available that must be installed."
                mandatoryUpdateMessage : "必须更新后才能使用" ,
                //非强制更新时，按钮文字,默认为"ignore"
                optionalIgnoreButtonLabel : '稍后' ,
                //非强制更新时，确认按钮文字. 默认为"Install"
                optionalInstallButtonLabel : '后台更新' ,
                //非强制更新时，检查到更新的消息文本
                optionalUpdateMessage : '有新版本了，是否更新？' ,
                //Alert窗口的标题
                title : '更新提示'
            },
            installMode: CodePush.InstallMode.IMMEDIATE,
            mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
            deploymentKey: 'TY9N69pDp1fgJD2gif2zc1NQO4hS7af62b32-1bc3-4054-97e0-1f0e7eae229b',
        }, (status) => {
            switch (status) {
                case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                    //alert(CodePush.SyncStatus.CHECKING_FOR_UPDATE);
                    break;
                // case CodePush.SyncStatus.AWAITING_USER_ACTION:
                //     alert('CodePush.SyncStatus.AWAITING_USER_ACTION');
                //     break;
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                    //应用更新中，请稍后...
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                    CodePush.allowRestart();
                    break;
                case CodePush.SyncStatus.UP_TO_DATE:
                    //当前已是最新版本
                    break;
                // case CodePush.SyncStatus.UPDATE_IGNORED:
                //     alert('CodePush.SyncStatus.UPDATE_IGNORED');
                //     break;
                // case CodePush.SyncStatus.UPDATE_INSTALLED:
                //     alert('CodePush.SyncStatus.UPDATE_INSTALLED');
                //     break;
                // case CodePush.SyncStatus.SYNC_IN_PROGRESS:
                //     alert('CodePush.SyncStatus.SYNC_IN_PROGRESS');
                //     break;
                // case CodePush.SyncStatus.UNKNOWN_ERROR:
                //     alert('CodePush.SyncStatus.UNKNOWN_ERROR');
                //break;
            }
        });
        if (!window.location) {
            // App is running in simulator
            window.navigator.userAgent = 'ReactNative';
        }
        // This must be below your `window.navigator` hack above
        this._onRefresh().then(data => {
            if (data) {
                let ipPort = null;
                if(__DEV__) {
                    // ipPort = '127.0.0.1:1688';
                    ipPort = data.configs[0].configValue;
                } else {
                    ipPort = data.configs[0].configValue;
                }
                if (!global.socket) {
                    global.socket = io(`http://${ipPort}?clientType=4&token=yidpu`, {
                        path: "/placeOrder",
                        // forceNew: true, 否则会有多个连接
                        reconnection: true,
                        reconnectionDelay: 5000,
                        // transports: ['websocket'] // you need to explicitly tell it to use websockets
                    });
                }
                global.socket.on('connect', () => {
                    this.props.homeActions.dispatch_socketStatus("已成功链接WIFI点餐服务", styles.socketInfoSuccess);
                    Toast.success("已成功链接WIFI点餐服务");
                });
                global.socket.on('connect_error', (error) => {
                    this.props.homeActions.dispatch_socketStatus("链接WIFI点餐服务失败", styles.socketInfoError);
                    Toast.fail("链接WIFI点餐服务失败");
                });
                global.socket.on('connect_timeout', (timeout) => {
                    this.props.homeActions.dispatch_socketStatus("链接WIFI点餐服务超时", styles.socketInfoWarning);
                    Toast.fail("链接WIFI点餐服务超时");
                });
                global.socket.on("disconnect", () => {
                    this.props.homeActions.dispatch_socketStatus("已与WIFI点餐服务断开链接", styles.socketInfoInfo);
                    Toast.fail("已与WIFI点餐服务断开链接");
                });
            }
        });
        // this.props.homeActions.selectCurrMerchantInfo();
    }

    componentWillUnmount() {
        if (global.socket) {
            global.socket.removeAllListeners("connect");
            global.socket.removeAllListeners("connect_error");
            global.socket.removeAllListeners("connect_timeout");
            global.socket.removeAllListeners("disconnect");
        }
    }

    _onRefresh = () => {
        return this.props.homeActions.listTodayRule().catch(err => {
            if (err.status) {
                Alert.alert("提示", err.message, [
                    { text: '确定', onPress: () => this.props.navigation.navigate('Auth') },
                ], { cancelable: false });
                //移除token
                Storage.remove({ key: 'Authorization' });
            } else {
                Toast.fail(err.message, 2);
            }
        });
    }

    render() {
        const { socketInfo, socketInfoStyle } = this.props.home;
        const { todayRuleLoading, todayRule = {} } = this.props.home;
        const { enabledConfigs = [], goodsDayVos = [], goodsDiscountVos = [], goodsSubtractVos = [], goodsCouponVos = [], rechargeConfigs } = todayRule;

        const renderBody = (config) => {
            if (config.configCode == 'enabled-goods-day') {
                if (goodsDayVos.length > 0) {
                    return goodsDayVos.map(goodsDay => {
                        return (
                            <View key={goodsDay.id}>
                                <WingBlank size="lg">
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{goodsDay.goodsName}(限{goodsDay.limitNum}{goodsDay.unitName})</Text>
                                        <Text style={{ marginLeft: 8, marginRight: 8, textDecorationLine: 'line-through' }}>原价:￥{numeral(goodsDay.oldPrice).format('0,0.00')}</Text>
                                        <Text>特价:</Text><Text style={{ fontSize: 16, color: '#ff4242' }}>￥{numeral(goodsDay.price).format('0,0.00')}</Text>
                                    </View>
                                </WingBlank>
                            </View>
                        )
                    });
                } else {
                    return <View><WingBlank size="lg"><Text>今日无特价商品</Text></WingBlank></View>
                }
            } else if (config.configCode == 'enabled-goods-discount') {//折扣
                if (goodsDiscountVos.length > 0) {
                    return goodsDiscountVos.map(goodsDiscount => {
                        return (
                            <View key={goodsDiscount.id}>
                                <WingBlank size="lg">
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{goodsDiscount.goodsName}</Text>
                                        <Text style={{ marginLeft: 8, marginRight: 8, textDecorationLine: 'line-through' }}>原价:￥{numeral(goodsDiscount.oldPrice).format('0,0.00')}</Text>
                                        <Text style={{ marginRight: 8 }}>{goodsDiscount.discountValue}折</Text>
                                        <Text>现价:</Text><Text style={{ fontSize: 16, color: '#ff4242' }}>￥{numeral(goodsDiscount.price).format('0,0.00')}</Text>
                                    </View>
                                </WingBlank>
                            </View>
                        )
                    });
                } else {
                    return <View><WingBlank size="lg"><Text>今日无折扣商品</Text></WingBlank></View>
                }
            } else if (config.configCode == 'enabled-goods-subtract') {//减免规则
                if (goodsSubtractVos.length > 0) {
                    return goodsSubtractVos.map(goodsSubtract => {
                        return (
                            <View key={goodsSubtract.id}>
                                <WingBlank size="lg">
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>约束:{renderConstraint(goodsSubtract.constraintType)}</Text>
                                        {
                                            goodsSubtract.constraintType == 1 ? <Text>￥{numeral(goodsSubtract.consumePrice).format('0,0.00')}。</Text>
                                                : <Text>{goodsSubtract.constraintTimeStart}~{goodsSubtract.constraintTimeEnd}。</Text>
                                        }
                                        <Text>{renderSubtract(goodsSubtract.type)}:</Text>
                                        {
                                            goodsSubtract.type == 1 ? <Text style={{ fontSize: 16, color: '#ff4242' }}>￥{numeral(goodsSubtract.amount1).format('0,0.00')}</Text>
                                                : goodsSubtract.type == 2 ? <Text style={{ fontSize: 16, color: '#ff4242' }}>{goodsSubtract.discount}折</Text>
                                                    : <Text style={{ fontSize: 16, color: '#ff4242' }}>￥{numeral(goodsSubtract.amount2).format('0,0.00')}</Text>
                                        }
                                    </View>
                                </WingBlank>
                            </View>
                        )
                    })
                } else {
                    return <View><WingBlank size="lg"><Text>无活动</Text></WingBlank></View>
                }
            } else {//电子优惠券
                if (goodsCouponVos.length > 0) {
                    return goodsCouponVos.map(goodsCoupon => {
                        return (
                            <View key={goodsCoupon.id}>
                                <WingBlank size="lg">
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                        <Text>满{numeral(goodsCoupon.consumePrice).format('0,0.00')}元减</Text>
                                        <Text style={{ fontSize: 16, color: '#ff4242' }}>￥{numeral(goodsCoupon.amount).format('0,0.00')}</Text>
                                        <Text>(还剩{goodsCoupon.count}张未领取)</Text>
                                    </View>
                                </WingBlank>
                            </View>
                        )
                    });
                } else {
                    return <View><WingBlank size="lg"><Text>无电子优惠券</Text></WingBlank></View>
                }
            }
        }

        const { height, width } = Dimensions.get('window');

        return (
            <View style={[styles.container]}>
                {
                    socketInfo ?
                        <View style={[styles.socketInfo, socketInfoStyle]}>
                            <Text>{socketInfo}</Text>
                        </View>
                        : null
                }
                {
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={todayRuleLoading}
                                onRefresh={this._onRefresh}
                                tintColor="#ffffff"
                                title="数据加载中..."
                                titleColor="#ffffff"
                                colors={['#ffffff']}
                                progressBackgroundColor="#1296db"
                            />
                        }
                    >
                        <View>
                            <WingBlank size="md"><Text style={styles.todayTitle}>今日{todayRule.today}运营规则</Text></WingBlank>
                        </View>
                        {
                            enabledConfigs && enabledConfigs.map(config => {
                                return (
                                    <WingBlank size="md" key={config.id} style={{ marginBottom: 8 }}>
                                        <Card>
                                            <Card.Header
                                                title={config.configName}
                                            />
                                            <Card.Body>
                                                {renderBody(config)}
                                            </Card.Body>
                                        </Card>
                                    </WingBlank>
                                )
                            })
                        }
                        {
                            rechargeConfigs ?
                                <WingBlank size="md" style={{ marginBottom: 8 }}>
                                    <Card>
                                        <Card.Header
                                            title={"今日会员充值活动"}
                                        />
                                        <Card.Body>
                                            {
                                               rechargeConfigs.length > 0 ? rechargeConfigs.map(rechargeConfig => {
                                                    return (
                                                        <View key={rechargeConfig.id}>
                                                            <WingBlank size="lg">
                                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Text>会员充值￥{numeral(rechargeConfig.rechargeAmount).format('0,0.00')}，</Text>
                                                                    <Text>送</Text><Text style={{ fontSize: 16, color: '#ff4242' }}>￥{numeral(rechargeConfig.givePrice).format('0,0.00')}。</Text>
                                                                </View>
                                                            </WingBlank>
                                                        </View>
                                                    )
                                                })
                                                : 
                                                <View>
                                                    <WingBlank size="lg">
                                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text>今天无会员充值活动</Text>
                                                        </View>
                                                    </WingBlank>
                                                </View>
                                            }
                                        </Card.Body>
                                    </Card>
                                </WingBlank>
                            : null
                        }
                        
                    </ScrollView>
                }
            </View>
        )
    }

}

export default connect((state) => {
    return {
        home: state.home,
    }
}, (dispatch) => {
    return { homeActions: bindActionCreators(homeActions, dispatch) }
})(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    socketInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        padding: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4,
    },
    socketInfoInfo: {
        backgroundColor: "#e6f7ff",
        borderColor: "#91d5ff",
    },
    socketInfoSuccess: {
        backgroundColor: "#f6ffed",
        borderColor: "#b7eb8f",
    },
    socketInfoWarning: {
        backgroundColor: "#fffbe6",
        borderColor: "#ffe58f",
    },
    socketInfoError: {
        backgroundColor: "#fff1f0",
        borderColor: "#ffa39e",
    },
    todayTitle: {
        padding: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    }
});