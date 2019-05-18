import React, { Component, Fragment } from 'react';
import { Card, Row, Col, Button, Tag, Radio, Alert, Tooltip, message, Spin, Divider } from 'antd';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import defaultPageActions from '../../actions/defaultPage';
import basicConfigActions from '../../actions/basicConfig';
import LogPanel from '../../components/LogPanel'
import styles from './index.less';
import { getToken, getUid } from '../../utils/authority';
import { renderConstraint, renderSubtract } from '../business/rule/dataUtils';
import { QRCodeURL } from '../../common/config'

class Defaultpage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        ipcRenderer.send('getLocalIp-message');
        ipcRenderer.on('getLocalIp-reply', (event, arg) => {
            this.props.defaultPageActions.setLocalIp(arg);
        });
        // ipcRenderer.send('getServerStatus-message');
        /* ipcRenderer.on('getServerStatus-reply', (event, arg) => {
            if(arg) {
                this.props.defaultPageActions.setServerStatus(arg);
            }
        }); */
        ipcRenderer.on("syncBasicConfig-reply", (event, arg) => {
            if (arg.success) {
                message.success(arg.message);
            } else {
                message.error(arg.message);
            }
            this.props.basicConfigActions.syncSuccess();
        });
        this.props.basicConfigActions.list().then(data => {
            const { serverIsStart } = this.props.defaultPage;
            const autoStartServerConfig = data.find(item => item.configCode == "auto-start-server");
            if (autoStartServerConfig && autoStartServerConfig.configValue == "1" && !serverIsStart) {
                this.startServer();
            }
        });
        this.props.defaultPageActions.listTodayRule();
        //前台收银二维码
        ipcRenderer.on('front-qrcode-reply', (event, arg) => {
            this.props.defaultPageActions.dispatch_QRCode(arg);
            ipcRenderer.removeAllListeners("front-qrcode-reply");
        });
        ipcRenderer.send('front-qrcode', `${QRCodeURL}/frontPaymentRedirect.html?merchantId=${getUid()}`); 
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("getLocalIp-reply");
        ipcRenderer.removeAllListeners("syncBasicConfig-reply");
        // ipcRenderer.removeAllListeners("getServerStatus-reply");
        // ipcRenderer.removeAllListeners("initSocketIo-reply");
        // ipcRenderer.removeAllListeners("stopSocketIo-reply");
        // ipcRenderer.removeAllListeners("log-info-messages");
    }

    stopServer = () => {
        ipcRenderer.send('stopSocketIo-message');
    }

    startServer = () => {
        const { localIp } = this.props.defaultPage;
        const port = 1688;
        ipcRenderer.send('initSocketIo-message', port);
        this.props.basicConfigActions.update({ "configCode": "server-ip", "configValue": `${localIp}:${port}` });
    }

    onRadioChange = (e, code) => {
        const value = e.target.value;
        const basicConfig = { "configCode": code, "configValue": value };
        if (code == "waiter-app-kitchen") {
            this.props.basicConfigActions.update09(basicConfig).then(() => {
                ipcRenderer.send("updateBasicConfig", basicConfig);
            });
        } else if (code == "user-app-kitchen") {
            this.props.basicConfigActions.update10(basicConfig).then(() => {
                ipcRenderer.send("updateBasicConfig", basicConfig);
            });
        } else if (code == "enabled-subtract-coupon-together") {
            this.props.basicConfigActions.update12(basicConfig).then(() => {
                ipcRenderer.send("updateBasicConfig", basicConfig);
            });
        } else {
            this.props.basicConfigActions.update(basicConfig).then(() => {
                ipcRenderer.send("updateBasicConfig", basicConfig);
            });
        }
    }

    syncBasicConfig = () => {
        ipcRenderer.send("syncBasicConfig", { token: getToken() });
        this.props.basicConfigActions.syncPending();
    }

    refreshRule = () => {
        this.props.defaultPageActions.listTodayRule();
    }

    saveQrCode = (qrcodeData) => {
        ipcRenderer.on('saved-file', function (event, path) {
            ipcRenderer.send('save-qrcode', { path, qrcodeData });
            ipcRenderer.removeAllListeners("saved-file");
        });
        ipcRenderer.send('save-dialog');
    }

    render() {
        const { localIp, serverIsStart, info, loading, syncLoading, saveConfigLoading, configLoading, configList, ruleLoading,
            enabledRuleList, goodsDays, goodsDiscounts, goodsSubtracts, goodsCoupons, rechargeConfigs, today, qrcodeData } = this.props.defaultPage;
        const { initSocketIo, stopSocketIo, sendLogInfo } = this.props.defaultPageActions;
        const extra = (
            <span>
                {
                    !serverIsStart ? <Button type={"primary"} loading={loading} style={{ marginLeft: 4 }} onClick={() => { this.startServer() }}>
                        启动
                    </Button> : <Button type={"danger"} loading={loading} style={{ marginLeft: 4 }} onClick={() => { this.stopServer() }}>停止</Button>
                }
            </span>
        );
        const title = (
            <span>店内WIFI扫码点餐服务
                {serverIsStart ? <Tag color="green">已启动</Tag> : <Tag color="red">未启动</Tag>}
            </span>
        )
        const extraConfig = (
            <Button icon="cloud-o" loading={syncLoading} onClick={() => this.syncBasicConfig()}>同步云端数据至本地</Button>
        )
        const isChecked = (configCode, configValue) => {
            const basicConfig = configList.find(item => (item.configCode == configCode && item.configValue == configValue));
            return basicConfig ? true : false;
        }
        const extraRule = (
            <Button icon="reload" loading={ruleLoading} onClick={() => this.refreshRule()}>刷新</Button>
        )
        const enabledRule = (configCode) => {
            return enabledRuleList.find(item => item.configCode == configCode) ? true : false;
        }
        return (
            <Fragment>
                <Row gutter={24}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card bordered={false}
                            style={{ minHeight: 380 }}
                            title={title}
                            extra={extra}
                        >
                            <LogPanel
                                info={info}
                                initSocketIo={initSocketIo}
                                stopSocketIo={stopSocketIo}
                                sendLogInfo={sendLogInfo}
                            />
                            <Alert message={`本机IP: ${localIp}，确保WIFI点餐网络能与本机IP互通。`} type="info" showIcon style={{ marginTop: 4 }} />
                        </Card>
                    </Col>
                
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Spin spinning={configLoading}>
                            <Card bordered={false}
                                style={{ minHeight: 380 }}
                                title={`常规配置项`}
                                extra={extraConfig}
                            >
                                <Divider orientation="left" style={{fontSize: 16}}>数据相关</Divider>
                                <div className={styles.configItem}>1、是否每次登录系统时自动同步一次云端数据
                                    <Radio.Group disabled={saveConfigLoading['login-sync-data']}
                                        buttonStyle="solid"
                                        onChange={(e) => { this.onRadioChange(e, "login-sync-data") }}>
                                        <Radio.Button value="0" checked={isChecked("login-sync-data", "0")}>否</Radio.Button>
                                        <Radio.Button value="1" checked={isChecked("login-sync-data", "1")}>是</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <div className={styles.configItem}>2、服务员点餐版App下单是否直接下达后厨系统
                                <Radio.Group disabled={saveConfigLoading["waiter-app-kitchen"]}
                                    buttonStyle="solid"
                                    onChange={(e) => { this.onRadioChange(e, "waiter-app-kitchen") }}>
                                        <Radio.Button value="0" checked={isChecked("waiter-app-kitchen", "0")}>
                                            <Tooltip title="需要在主系统控制台确认之后在下达后厨系统">
                                                否
                                            </Tooltip>
                                        </Radio.Button>
                                        <Radio.Button value="1" checked={isChecked("waiter-app-kitchen", "1")}>是</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <div className={styles.configItem}>3、顾客桌台扫码下单是否直接下达后厨系统
                                <Radio.Group disabled={saveConfigLoading["user-app-kitchen"]}
                                    buttonStyle="solid"
                                    onChange={(e) => { this.onRadioChange(e, "user-app-kitchen") }}>
                                        <Radio.Button value="0" checked={isChecked("user-app-kitchen", "0")}>
                                            <Tooltip title="需要在主系统控制台确认之后在下达后厨系统">
                                                否
                                            </Tooltip>
                                        </Radio.Button>
                                        <Radio.Button value="1" checked={isChecked("user-app-kitchen", "1")}>是</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <Divider orientation="left" style={{fontSize: 16}}>运营相关</Divider>
                                <div className={styles.configItem}>1、登录之后是否自动启动WIFI点餐服务
                                <Radio.Group disabled={saveConfigLoading["auto-start-server"]}
                                    buttonStyle="solid"
                                    onChange={(e) => { this.onRadioChange(e, "auto-start-server") }}>
                                        <Radio.Button value="0" checked={isChecked("auto-start-server", "0")}>否</Radio.Button>
                                        <Radio.Button value="1" checked={isChecked("auto-start-server", "1")}>是</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <div className={styles.configItem}>2、[减免或折扣]与现金券是否可以同时享受
                                    <Radio.Group disabled={saveConfigLoading["enabled-subtract-coupon-together"]}
                                        buttonStyle="solid"
                                        onChange={(e) => { this.onRadioChange(e, "enabled-subtract-coupon-together") }}>
                                        <Radio.Button value="0" checked={isChecked("enabled-subtract-coupon-together", "0")}>否</Radio.Button>
                                        <Radio.Button value="1" checked={isChecked("enabled-subtract-coupon-together", "1")}>是</Radio.Button>
                                    </Radio.Group>
                                </div>
                                {/* <div className={styles.configItem}>5、退款操作时是否需要输入登录密码确认
                                <Radio.Group disabled={saveConfigLoading["enabled-refund-password"]}
                                        buttonStyle="solid"
                                        onChange={(e) => { this.onRadioChange(e, "enabled-refund-password") }}>
                                        <Radio.Button value="0" checked={isChecked("enabled-refund-password", "0")}>
                                            <Tooltip title="不需要登录密码确认直接退款">
                                                否
                                            </Tooltip>
                                        </Radio.Button>
                                        <Radio.Button value="1" checked={isChecked("enabled-refund-password", "1")}>是</Radio.Button>
                                    </Radio.Group>
                                </div> */}
                            </Card>
                        </Spin>
                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: 8 }}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Spin spinning={ruleLoading}>
                            <Card bordered={false}
                                style={{ minHeight: 380 }}
                                className={styles.container}
                                title={`今日(${today})运营规则`}
                                extra={extraRule}
                            >
                                {
                                    enabledRuleList.map(item => {
                                        return <Tag color="#87d068" key={item.id}>{item.configName}</Tag>;
                                    })
                                }
                                { enabledRule('enabled-goods-day') ? goodsDays.length > 0 ? <div className={styles.title}>今日特价</div>
                                    : <div><div className={styles.title}>今日特价</div><div>无特价商品</div></div>
                                    : null
                                }
                                {
                                    goodsDays.map(goodsDay => {
                                        return (
                                            <div className={styles.dayItem} key={goodsDay.id}>
                                                商品名称:<div className={styles.goodsName}>{goodsDay.goodsName}，</div>
                                                原价:<div className={styles.oldPrice}>￥{numeral(goodsDay.oldPrice).format('0,0.00')}元，</div>
                                                特价:<div className={styles.price}>￥{numeral(goodsDay.price).format('0,0.00')}元，</div>
                                                (每桌限点{goodsDay.limitNum}{goodsDay.unitName})。
                                            </div>
                                        )
                                    })
                                }
                                { enabledRule('enabled-goods-discount') ? goodsDiscounts.length > 0 ? <div className={styles.title}>今日折扣</div> 
                                    : <div><div className={styles.title}>今日折扣</div><div>无折扣商品</div></div>
                                    : null
                                }
                                {
                                    goodsDiscounts.map(goodsDiscount => {
                                        return (
                                            <div className={styles.discountItem} key={goodsDiscount.id}>
                                                商品名称:<div className={styles.goodsName}>{goodsDiscount.goodsName}，</div>
                                                原价:<div className={styles.oldPrice}>￥{numeral(goodsDiscount.oldPrice).format('0,0.00')}元，</div>
                                                折扣:<div>{goodsDiscount.discountValue}折，</div>
                                                现价:<div className={styles.price}>￥{numeral(goodsDiscount.price).format('0,0.00')}元。</div>
                                            </div>
                                        )
                                    })
                                }
                                { enabledRule('enabled-goods-subtract') ? goodsSubtracts && goodsSubtracts.length > 0 ? <div className={styles.title}>减免、折扣、赠现金优惠券</div> 
                                    : <div><div className={styles.title}>减免、折扣、赠现金优惠券</div><div>无活动</div></div>
                                    : null
                                }
                                {
                                    goodsSubtracts.map(goodsSubtract => {
                                        return (
                                            <div className={styles.discountItem} key={goodsSubtract.id}>
                                                约束条件:{renderConstraint(goodsSubtract.constraintType)}
                                                {
                                                    goodsSubtract.constraintType == 1 ? <div className={styles.goodsName}>￥{numeral(goodsSubtract.consumePrice).format('0,0.00')}</div> 
                                                    : <div className={styles.goodsName}>{goodsSubtract.constraintTimeStart}~{goodsSubtract.constraintTimeEnd}</div>
                                                },
                                                {renderSubtract(goodsSubtract.type)}:
                                                {
                                                    goodsSubtract.type == 1 ?  <div className={styles.price}>￥{numeral(goodsSubtract.amount1).format('0,0.00')}</div>
                                                    : goodsSubtract.type == 2 ? <div className={styles.price}>{goodsSubtract.discount}折</div>
                                                    : <div className={styles.price}>￥{numeral(goodsSubtract.amount2).format('0,0.00')}</div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                { enabledRule('enabled-goods-coupon') ? goodsCoupons && goodsCoupons.length > 0 ? <div className={styles.title}>电子优惠券</div> 
                                    : <div><div className={styles.title}>电子优惠券</div><div>无活动</div></div>
                                    : null
                                }
                                {
                                    goodsCoupons.map(goodsCoupon => {
                                        return (
                                            <div key={goodsCoupon.id} className={styles.couponItem}>
                                                <div className={styles.wrapper}>
                                                    <div className={styles.content}>
                                                        <div className={styles.title}>
                                                            电子优惠券
                                                        </div>
                                                        <div className={styles.time}>
                                                            有效期至: {goodsCoupon.expiredTime}
                                                        </div>
                                                    </div>
                                                    <div className={styles.split_line}></div>
                                                    <div className={styles.tip}>
                                                        <div className={styles.money}>
                                                            ￥{numeral(goodsCoupon.amount).format('0,0.00')}
                                                        </div>
                                                        <div className={styles.pay_line}>
                                                            满{numeral(goodsCoupon.consumePrice).format('0,0.00')}元减
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.couponCount}>还剩{goodsCoupon.count}张未领取。 </div>
                                            </div>
                                        )
                                    })
                                }
                                { rechargeConfigs ? rechargeConfigs.length > 0 ? <div className={styles.title}>今日会员充值活动</div> 
                                    : <div><div className={styles.title}>今日会员充值活动</div><div>无充值活动</div></div>
                                    : null
                                }
                                {
                                    rechargeConfigs && rechargeConfigs.map(rechargeConfig => {
                                        return (
                                            <div className={styles.discountItem} key={rechargeConfig.id}>
                                                会员充值<div className={styles.goodsName}>￥{numeral(rechargeConfig.rechargeAmount).format('0,0.00')}，</div>
                                                送<div className={styles.price}>￥{numeral(rechargeConfig.givePrice).format('0,0.00')}元。</div>
                                            </div>
                                        )
                                    })
                                }
                            </Card>
                        </Spin>
                    </Col>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card bordered={false}
                            style={{ minHeight: 380 }}
                            className={styles.container}
                            title={`前台收银二维码`}
                        >
                            <Alert message={`这是您店铺前台收银二维码,请将此二维码保存至本地并制作实物竖立于前台，顾客扫此二维码可以微信\支付宝输入金额付款。`}  type="info" showIcon/>
                            <div style={{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                                <img src={qrcodeData}/>
                                <Button type={"primary"} style={{marginTop: 8}} onClick={() => {this.saveQrCode(qrcodeData)}}>保存二维码</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }

}

export default connect((state) => {
    return {
        defaultPage: state.defaultPage,
    }
}, (dispatch) => {
    return {
        defaultPageActions: bindActionCreators(defaultPageActions, dispatch),
        basicConfigActions: bindActionCreators(basicConfigActions, dispatch),
    }
})(Defaultpage);