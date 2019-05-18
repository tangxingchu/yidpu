import React, { Fragment } from 'react';
import numeral from 'numeral';

import Button from 'antd-mobile/lib/button';
import WhiteSpace from 'antd-mobile/lib/white-space';
import WingBlank from 'antd-mobile/lib/wing-blank';
import List from 'antd-mobile/lib/list';
import Card from 'antd-mobile/lib/card';
import Checkbox from 'antd-mobile/lib/checkbox';
import Modal from 'antd-mobile/lib/modal';
import NoticeBar from 'antd-mobile/lib/notice-bar';

import 'antd-mobile/lib/button/style'; //less
import 'antd-mobile/lib/white-space/style'; //less
import 'antd-mobile/lib/wing-blank/style'; //less
import 'antd-mobile/lib/list/style'; //less
import 'antd-mobile/lib/card/style'; //less
import 'antd-mobile/lib/checkbox/style'; //less
import 'antd-mobile/lib/modal/style'; //less
import 'antd-mobile/lib/notice-bar/style';

import Config, { staticHost } from '../utils/config';
import service_png from '../images/service.png';
import refresh_png from '../images/refresh.png';
import styles from './index.less';
import parseUrl from '../utils';
import services from '../services';

export default class Payment extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			payBtnDisabled: true,
			orderLoading: true,
			orderList: [],
			subtractMap: [],
			couponConsumeMap: [],
			payAmount: 0, //订单总价
			merchantInfo: null,
			noticeBar: false,
		}
	}

	componentDidMount() {
		const params = parseUrl();
		const token = decodeURIComponent(params.token);
		this.token = token || window.localStorage.getItem('Authorization');
		window.localStorage.setItem('Authorization', token);
		this.onRefresh();
	}

	onRefresh = () => {
		const token = this.token;
		//加载商家信息
		this.loadMInfo(token).then(merchantInfo => {
			//如果是快餐店 已点餐人角度查询订单
			//如果是中小餐厅 已桌台角度查询订单
			if(merchantInfo.merchantProperty == 1) {//快餐厅
				//加载订单详情
				if(this.props.openid) {
					this.loadOrderListByOpenid(token);
				} else {
					this.loadOrderListByBuyerId(token);
				}
			} else if(merchantInfo.merchantProperty == 2){ //中小餐厅
				//加载订单详情
				this.loadOrderList(token);
			}
		});
	}

	loadMInfo = (token) => {
		const { merchantId } = this.props;
		return fetch(`${Config.apiHost}/api/mobile/getMInfo`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `merchantId=${merchantId}`
		}).then(response => {
			return response.json();
		}).then(data => {
			this.setState({merchantInfo: data})
			return data;
		}).catch(e => {
			alert(e.message)
		});
	}

	loadOrderList = (token) => {
		const { merchantId, tableCode } = this.props;
		this.setState({orderLoading: true});
		fetch(`${Config.apiHost}/api/mobile/listNoPaymentOrderByTableCode`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': token,
			},
			body: `merchantId=${merchantId}&tableCode=${tableCode}`
		}).then(response => {
			return response.json();
		}).then(data => {
			//订单加载失败
			if(data.status && data.status != 200) {
				alert(data.message);
				this.setState({orderLoading: false});
			} else {
				const { orderVos, subtractVoMap, couponConsumeMap, payAmount } = data;
				if(orderVos.length > 0) {
					for(let key in subtractVoMap) {
						let subtractList = subtractVoMap[key].map(subtract => {
							subtract.checked = true;
							return subtract;
						});
						subtractVoMap[key] = subtractList;
					}
					//待确认或者已支付就让支付按钮变灰
					const orderVo = orderVos.find(item => item.orderStatus == '0' || item.orderStatus == '3');
					this.setState({orderLoading: false, payBtnDisabled: orderVo ? true : false, orderList: orderVos, 
						subtractMap: subtractVoMap, couponConsumeMap, payAmount});
				} else {
					this.setState({orderLoading: false, payBtnDisabled: true, orderList: orderVos, 
						subtractMap: {}, couponConsumeMap: {}, payAmount});
				}
			}
		}).catch(e => {
			alert(e.message)
		});
	}

	loadOrderListByOpenid = (token) => {
		const { merchantId, openid } = this.props;
		this.setState({orderLoading: true});
		fetch(`${Config.apiHost}/api/mobile/listOrderByOpendid`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': token,
			},
			body: `merchantId=${merchantId}&openid=${openid}`
		}).then(response => {
			return response.json();
		}).then(data => {
			//订单加载失败
			if(data.status && data.status != 200) {
				alert(data.message);
				this.setState({orderLoading: false});
			} else {
				const { orderVos, subtractVoMap, couponConsumeMap, payAmount } = data;
				if(orderVos.length > 0) {
					for(let key in subtractVoMap) {
						let subtractList = subtractVoMap[key].map(subtract => {
							subtract.checked = true;
							return subtract;
						});
						subtractVoMap[key] = subtractList;
					}
					//待确认或者已支付就让支付按钮变灰
					const orderVo = orderVos.find(item => item.orderStatus == '0' || item.orderStatus == '3');
					//是否有未支付的单,提示顾客要先支付才会做菜
					const orderVo2 = orderVos.find(item => item.orderStatus == '1');
					this.setState({orderLoading: false, payBtnDisabled: orderVo ? true : false, 
						noticeBar: orderVo2 ? true : false, orderList: orderVos, 
						subtractMap: subtractVoMap, couponConsumeMap, payAmount});
				} else {
					this.setState({orderLoading: false, payBtnDisabled: true, noticeBar: false, orderList: orderVos, 
						subtractMap: {}, couponConsumeMap: {}, payAmount});
				}
			}
		}).catch(e => {
			alert(e.message)
		});
	}

	loadOrderListByBuyerId = (token) => {
		const { merchantId, buyerId } = this.props;
		this.setState({orderLoading: true});
		fetch(`${Config.apiHost}/api/mobile/listOrderBybuyerId`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': token,
			},
			body: `merchantId=${merchantId}&buyerId=${buyerId}`
		}).then(response => {
			return response.json();
		}).then(data => {
			//订单加载失败
			if(data.status && data.status != 200) {
				alert(data.message);
				this.setState({orderLoading: false});
			} else {
				const { orderVos, subtractVoMap, couponConsumeMap, payAmount } = data;
				if(orderVos.length > 0) {
					for(let key in subtractVoMap) {
						let subtractList = subtractVoMap[key].map(subtract => {
							subtract.checked = true;
							return subtract;
						});
						subtractVoMap[key] = subtractList;
					}
					//待确认或者已支付就让支付按钮变灰
					const orderVo = orderVos.find(item => item.orderStatus == '0' || item.orderStatus == '3');
					//是否有未支付的单,提示顾客要先支付才会做菜
					const orderVo2 = orderVos.find(item => item.orderStatus == '1');
					this.setState({orderLoading: false, payBtnDisabled: orderVo ? true : false, 
						noticeBar: orderVo2 ? true : false, orderList: orderVos, 
						subtractMap: subtractVoMap, couponConsumeMap, payAmount});
				} else {
					this.setState({orderLoading: false, payBtnDisabled: true, noticeBar: false, orderList: orderVos, 
						subtractMap: {}, couponConsumeMap: {}, payAmount});
				}
			}
		}).catch(e => {
			alert(e.message)
		});
	}

	pay = (orderNo) => {
		const { orderList, merchantInfo } = this.state;
		if(orderList.length > 0) {
			this.props.pay(orderNo || orderList[0].orderNo, merchantInfo.merchantProperty);
		} else {
			alert("没有需要支付的用餐订单");
		}
	}

	cancelOrder = (orderNo) => {
		Modal.alert('提示', '确认取消该用餐订单吗?', [
			{text: '不取消'},
			{text: '确认', onPress: () => {this.props.cancelOrder(orderNo).then(() => {
					const { orderList } = this.state;
					const new_orderList = orderList.filter(item => item.orderNo != orderNo);
					this.setState({orderList: new_orderList});
			});}}
		]);
	}

	goPlaceOrder = (type) => {
		const { merchantInfo } = this.state;
		//如果是快餐厅 就无需确认人数,就是1人 还是确认一下吧
		// if(merchantInfo.merchantProperty == 1) {
		// 	type = 2;
		// }
		this.props.goPlaceOrder(type, merchantInfo.merchantProperty);
	}

	closeWindow = () => {
		this.props.closeWindow();
	}

	callService = () => {
		const { tableCode } = this.props;
		Modal.alert('提示', "确定呼叫服务吗?", [
			{text: '取消'},
			{ text: '确定', onPress: () => {
				services.callService(tableCode)
			}
			},
		])
	}

	render() {
		const { payLoading, primaryColor, statusColor, cancelLoading } = this.props;
		const { payBtnDisabled, orderLoading, noticeBar, orderList, subtractMap, payAmount, couponConsumeMap, merchantInfo } = this.state;
		const renderHeader = (order, index) => {
            return (
                <div className={styles.orderHeader}>
                    <div><span style={{fontWeight: 'bold'}}>{index+1}</span>&nbsp;&nbsp;桌台编号:{order.tableCode}<br/>下单时间:{order.orderTime}</div>
                    <div>{order.orderStatusName}</div>
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
								<div key={subtract.id} className={`${styles.bottomItem} ${styles.bottomItem_noBorder}`}>
									{subtract.type == 3 ? null : <Checkbox onChange={(e) => {this.subtractOnChange(e, subtract.id)}} checked={subtract.checked}/>}
									{
										subtract.constraintType == 2 ? <div style={{paddingLeft: 4, paddingRight: 8}}>时间约束:{subtract.constraintTimeStart}-{subtract.constraintTimeEnd}</div>
										: <div style={{paddingLeft: 4, paddingRight: 8}}>消费满
											<span style={{paddingLeft: 2, color: '#ff4242', fontSize: 14}}>
												￥{numeral(subtract.consumePrice).format('0,0.00')}
											</span>
										</div>
									}
									{
										subtract.type == 3 ?  <div style={{paddingLeft: 4, paddingRight: 8}}>赠现金券<span style={{fontSize: 14, color: '#ff4242'}}>￥{numeral(subtract.amount2).format('0,0.00')}</span></div> :
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
									<div>现金券抵扣<span style={{fontSize: 14, color: '#ff4242'}}>-￥{numeral(coupon.couponPrice).format('0,0.00')}</span></div> 
								</div>
							)
						})
						: null
					}
					{
						merchantInfo && merchantInfo.merchantProperty==1 && order.orderStatus == "1" ? 
						<Fragment>
							<div className={`${styles.bottomItem} ${styles.bottomItem_noBorder}`}>
								合计应支付：
								<span style={{fontSize: 18, color: '#1890ff'}}>
									￥{numeral(order.receivedAmount).format('0,0.00')}
								</span>
							</div>
							<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 4}}>
								<Button loading={cancelLoading}  size="small" style={{flex: 1}} inline onClick={() => {this.cancelOrder(order.orderNo)}}>取消订单</Button>
								<Button type="primary" inline  size="small" loading={payLoading} style={{backgroundColor: primaryColor, flex: 1, marginLeft: 8}} onClick={() => {this.pay(order.orderNo)}}>支付</Button>
							</div>
						</Fragment>
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
        const renderItem = (orderItem) => {
            return (
                <List.Item key={orderItem.id}>
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
                                "已退单"
								: 
								orderItem.orderItemStatus == '4' ?
									<span className={styles.status} style={{color: '#FFD700'}}>已出菜</span>
								:
								orderItem.orderItemStatus == '12' ?
									<span className={styles.status} style={{color: statusColor}}>已上菜</span>
								:
								orderItem.orderItemStatus == '0' ?
									<span className={styles.status} style={{color: 'rgb(254, 238, 175)'}}>待确认</span>
								:
									<span className={styles.status}>待上菜</span>
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
		if(merchantInfo && merchantInfo.merchantProperty == 2) {
			return (
				<WingBlank size={"md"}>
					<div style={{width: 32, height: 32, position: 'fixed', top: 16, right: 8, zIndex:999, boxShadow: '0px 0px 5px #ccc', borderRadius: 16 }}>
						<img src={service_png} style={{width: 32, height: 32}} onClick={() => this.callService()}/>
					</div>
					<div style={{width: 32, height: 32, position: 'fixed', top: 16, left: 8, zIndex:999, boxShadow: '0px 0px 5px #ccc', borderRadius: 16 }}>
						<img src={refresh_png} style={{width: 32, height: 32}} onClick={() => this.onRefresh()}/>
					</div>
					{
						merchantInfo ? 
						<Fragment>
							<WhiteSpace/>
							<div className={styles.merchantInfo}>
								<div><img src={`${staticHost}${merchantInfo.logoPath}`} className={styles.merchantLogo}/></div>
								<div className={styles.merchantName}>{merchantInfo.merchantName}</div>
							</div>
						</Fragment>
						: null
					}				
					<WhiteSpace/>
					{
						orderLoading ? <div style={{textAlign: 'center'}}>正在加载订单详情...</div>
						:
						orderList.length > 0 ?
						<Fragment>
							
							<div className={styles.container}>
								{
									orderList.map((order, index) => (
										<List
											key={order.id}
											renderHeader={renderHeader(order, index)}
											renderFooter={renderFooter(order)}
											style={{marginBottom: 4}}
										>
											{
												order.orderItemVos && order.orderItemVos.map(orderItem => {
													return renderItem(orderItem)
												})
											}
										</List>
									))
								}
								<Card style={{padding: 0}}>
									<div className={styles.bottomItem}>共{orderList.length}笔单。 消费合计:
										<span style={{fontSize: 18, color: primaryColor}}>￥
										{
											numeral(calTotalAmount(orderList)).format('0,0.00')
										}
										</span>
									</div>
									<div className={`${styles.bottomItem} ${styles.bottomItem_noBorder}`}>
										合计应支付：<span style={{color: '#ff4242', fontSize: 18}}>￥{numeral(payAmount).format('0,0.00')}</span>
									</div>
								</Card>
							</div>
							<WhiteSpace/>
							<Button onClick={() => this.goPlaceOrder(2)}>加菜</Button>
						</Fragment>
						:
						<Fragment>
							<div style={{textAlign: 'center'}}>此桌台没有用餐订单。</div>
							<WhiteSpace/>
							<Button onClick={() => this.goPlaceOrder(1)}>点餐</Button>
						</Fragment>
					}
					<WhiteSpace/>
					<Button type="primary" loading={payLoading} disabled={payBtnDisabled} style={{backgroundColor: primaryColor}} onClick={() => {this.pay()}}>支付</Button>
					<WhiteSpace/>
					<Button onClick={() => {this.closeWindow()}}>关闭</Button>
					<WhiteSpace/>
				  </WingBlank>
			);
		} else {
			return (
				<WingBlank size={"md"}>
					{
						noticeBar ?
                        <NoticeBar marqueeProps={{ loop: true, fps: 20, style: { padding: '0 7.5px' } }}>
                            {`亲，您需要支付完用餐订单之后店家才会帮您制作美食哦。`}
                        </NoticeBar>
                        : null
					}
					<div style={{width: 32, height: 32, position: 'fixed', top: 16, right: 8, zIndex:999, boxShadow: '0px 0px 5px #ccc', borderRadius: 16 }}>
						<img src={service_png} style={{width: 32, height: 32}} onClick={() => this.callService()}/>
					</div>
					<div style={{width: 32, height: 32, position: 'fixed', top: 16, left: 8, zIndex:999, boxShadow: '0px 0px 5px #ccc', borderRadius: 16 }}>
						<img src={refresh_png} style={{width: 32, height: 32}} onClick={() => this.onRefresh()}/>
					</div>
					{
						merchantInfo ? 
						<Fragment>
							<WhiteSpace/>
							<div className={styles.merchantInfo}>
								<div><img src={`${staticHost}${merchantInfo.logoPath}`} className={styles.merchantLogo}/></div>
								<div className={styles.merchantName}>{merchantInfo.merchantName}</div>
							</div>
						</Fragment>
						: null
					}				
					<WhiteSpace/>
					{
						orderLoading ? <div style={{textAlign: 'center'}}>正在加载订单详情...</div>
						:
						orderList.length > 0 ?
						<Fragment>
							
							<div className={styles.container}>
								{
									orderList.map((order, index) => (
										<List
											key={order.id}
											renderHeader={renderHeader(order, index)}
											renderFooter={renderFooter(order)}
											style={{marginBottom: 4}}
										>
											{
												order.orderItemVos && order.orderItemVos.map(orderItem => {
													return renderItem(orderItem)
												})
											}
										</List>
									))
								}
							</div>
							<WhiteSpace/>
							<Button onClick={() => this.goPlaceOrder(2)}>加菜</Button>
						</Fragment>
						:
						<Fragment>
							<div style={{textAlign: 'center'}}>您还没有点餐或已完成了就餐。</div>
							<WhiteSpace/>
							<Button onClick={() => this.goPlaceOrder(1)}>点餐</Button>
						</Fragment>
					}
					<WhiteSpace/>
					<Button onClick={() => {this.closeWindow()}}>关闭</Button>
					<WhiteSpace/>
				</WingBlank>
			)
		}
		
	}
}