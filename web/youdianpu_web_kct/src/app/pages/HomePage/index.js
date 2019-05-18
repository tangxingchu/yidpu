import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Icon, Spin, message, Progress, Modal, Button, Row, Col, notification } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';
import numeral from 'numeral';


import { getMenuData } from '../../common/menu';
import SwitchRoute from '../../components/Route/SwitchRoute';
import BasicLayout from '../../components/Layout/BasicLayout';
import { rootRouter } from '../../common/config';


import OnlineService from './onlineService';
import homePageActions from '../../actions/homePage'
import loginActions from '../../actions/login'
import floorPlanActions from '../../actions/floorPlan';

import { getRouteChildrenByPath } from '../../routes';
import DefaultPage from '../DefaultPage';
import ChangeAccoutModal from './changeAccountModal';
import styles from './index.less';
import { getUid, getToken } from '../../utils/authority';
import { getBase64 } from '../../utils/utils';

import Steps from './steps';
import UpdaterInfoModal from './updaterInfoModal';

//<Route component={AnalysisPage} />
{/* <Page404 /> <Redirect to="/dashboard/analysis" />*/ }

class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			percent: 0,
			textInfo: "基础数据",
			firstInstall: false,
			visible: false,
			versionModalVisible: false,
			changeAccountModalVisible: false,
			clientVersion: null,
			updateBtnLoading: false,
			updateBtnText: "在线升级",
			socketConnectStatus: false,//socket链接状态
			spinTip: "版本更新检查中...",
			updaterInfoModalVisible: false,//更新提示信息
		}
		this.count = 9;
	}

	onCollapse = (collapsed) => {
		this.props.homePageActions.changeCollapsed(collapsed);
	}

	componentDidMount() {
		//链接服务
		ipcRenderer.on('connectYidpuSocket-reply', (event, arg) => {
			const {socketConnectStatus} = this.state;
			if(arg === "connect" && !socketConnectStatus) {
				this.setState({socketConnectStatus: true});
			} else if(socketConnectStatus && arg !== "connect") {
				this.setState({socketConnectStatus: false});
			}
			if(arg !== 'disconnect' && arg !== "connect") {	
				message.error('连接一点谱餐饮服务超时');
			}
		});
		//在线客服
		ipcRenderer.on("online-service", (event, arg) => {
			this.setState({visible: true});
		});		
		//顾客下单消息
		ipcRenderer.on("customerPlaceOrderMSG", (event, arg) => {
			console.log(arg);
			var audio = new Audio('/sound/order.mp3');
			audio.play();
			//应用内的通知
			// notification.open({
			// 	duration: null,
			// 	placement: "bottomRight",
			// 	message: `下单消息`,
			// 	description: `桌台编号${arg.tableCode}已下单, 【顾客扫码下单】。`,
			// 	icon: <Icon type="sound" style={{ color: '#108ee9' }} />,
			// });
			//electron 的通知
			const notificationEntity = {
				title: '下单消息',
				body: `桌台编号${arg.tableCode}已下单,${arg.isAppend == "1" ? `【顾客桌台扫码加菜】` : `【顾客桌台扫码下单】`}。`,
				icon: "/images/yidpu/logo.png",
			}
			const myNotification = new window.Notification(notificationEntity.title, notificationEntity);
			myNotification.onclick = () => {
				ipcRenderer.send("restoreWin");
			}
			ipcRenderer.send('udpateTableStatus', {tableCode: arg.tableCode, status: 4});
            this.props.floorPlanActions.changeTableStatus({tableCode: arg.tableCode, status: 4});
		});
		//桌台扫码支付成功消息
		ipcRenderer.on("callPaymentFinishedMSG", (event, arg) => {
			var audio = new Audio('/sound/gold.mp3');
			audio.play();
			// if(BrowserWindow.getFocusedWindow()) {
			// 	notification.open({
			// 		duration: null,
			// 		placement: "bottomRight",
			// 		message: `付款消息`,
			// 		description: `桌台编号${arg.tableCode}已付款, 【顾客扫码付款】。`,
			// 		icon: <Icon type="sound" style={{ color: '#108ee9' }} />,
			// 	});
			// } else {
				const notificationEntity = {
					title: '收银消息',
					body: `桌台编号${arg.tableCodes}已付款,金额:￥${numeral(arg.payAmount).format('0,0.00')},【顾客桌台扫码点餐付款】。`,
					icon: "/images/yidpu/logo.png",
				}
				const myNotification = new window.Notification(notificationEntity.title, notificationEntity);
				myNotification.onclick = () => {
					ipcRenderer.send("restoreWin");
				}
				this.props.floorPlanActions.handlePaySuccessMsg(arg.tableCodes);
				//后厨打印
				ipcRenderer.on('autoPrintOrder-reply', (event, arg) => {
					if(!arg.success) {
						notification['error']({
							message: `后厨打印失败,${arg.message}`,
							duration: null,
						});
					} else {
						message.success("成功发往后厨打印");
					}
					ipcRenderer.removeAllListeners("autoPrintOrder-reply");
				});
				const { currMerchantInfo } = this.props.homePage;
				ipcRenderer.send("autoPrintOrder", {orderNos: arg.orderNos, token: getToken(), merchant: currMerchantInfo});
			// }

		});
		//前台扫码支付成功消息
		ipcRenderer.on("callFrontPaymentFinishedMSG", (event, arg) => {
			var audio = new Audio('/sound/gold.mp3');
			audio.play();
			const notificationEntity = {
				title: '收银消息',
				body: `收银金额:￥${numeral(arg.payAmount).format('0,0.00')},【顾客前台扫码付款】。`,
				icon: "/images/yidpu/logo.png",
			}
			const myNotification = new window.Notification(notificationEntity.title, notificationEntity);
			myNotification.onclick = () => {
				ipcRenderer.send("restoreWin");
			}
		});
		//操作扫码支付异常消息(实际支付金额 小于 订单金额)
		ipcRenderer.on("callPaymentExceptionMSG", (event, arg) => {
			var audio = new Audio('/sound/alarm.mp3');
			audio.play();
			notification.open({
				duration: null,
				placement: "bottomRight",
				message: `收银异常消息`,
				description: `桌台编号${arg.tableCode}支付异常，收银金额:￥${numeral(arg.payAmount).format('0,0.00')}, 订单金额：￥${numeral(arg.orderAmount).format('0,0.00')}【顾客桌台扫码付款】。`,
				icon: <Icon type="exclamation-circle-o" style={{ color: 'red' }} />,
			});
			const notificationEntity = {
				title: '收银异常消息',
				body: `桌台编号${arg.tableCode}支付异常，收银金额:￥${numeral(arg.payAmount).format('0,0.00')}, 订单金额：￥${numeral(arg.orderAmount).format('0,0.00')}【顾客桌台扫码付款】。`,
				icon: "/images/yidpu/logo.png",
			}
			const myNotification = new window.Notification(notificationEntity.title, notificationEntity);
			myNotification.onclick = () => {
				ipcRenderer.send("restoreWin");
			}
		});
		//呼叫服务
		ipcRenderer.on("callServiceMSG", (event, arg) => {
			var audio = new Audio('/sound/service.mp3');
			audio.play();
			const notificationEntity = {
				title: '呼叫服务',
				body: `桌台编号${arg.tableCode}呼叫服务,请处理。`,
				icon: "/images/yidpu/service.png",
			}
			const myNotification = new window.Notification(notificationEntity.title, notificationEntity);
			myNotification.onclick = () => {
				ipcRenderer.send("restoreWin");
			}
		});
		// this.props.homePageActions.getMenuData().catch(e => message.error("请求菜单数据失败"));
		ipcRenderer.on("cacheBasicConfig-reply", (event, arg) => {
			this.setState({ percent: parseInt(100 / this.count * 9), textInfo: "所有数据缓存完毕,系统初始化中..." });
			ipcRenderer.removeAllListeners("cacheBasicConfig-reply");
			ipcRenderer.send("updateConfig-app.first.install");
			// this.props.homePageActions.getMenuData().then(() => {
			// 	this.setState({ firstInstall: false });
			// });
			this.initData(true);
		});
		ipcRenderer.on("cacheGoodsSubtract-reply", (event, arg) => {
			this.setState({ percent: parseInt(100 / this.count * 8), textInfo: "缓存运营规则数据" });
			ipcRenderer.send('cacheBasicConfig', { token: getToken() })
			ipcRenderer.removeAllListeners("cacheGoodsSubtract-reply");
		});
		ipcRenderer.on("cacheGoodsDiscount-reply", (event, arg) => {
			this.setState({ percent: parseInt(100 / this.count * 7), textInfo: "缓存运营规则数据" });
			ipcRenderer.send('cacheGoodsSubtract', { token: getToken() })
			ipcRenderer.removeAllListeners("cacheGoodsDiscount-reply");
		});
		ipcRenderer.on("cacheGoodsDay-reply", (event, arg) => {
			this.setState({ percent: parseInt(100 / this.count * 6), textInfo: "缓存运营规则数据" });
			ipcRenderer.send('cacheGoodsDiscount', { token: getToken() })
			ipcRenderer.removeAllListeners("cacheGoodsDay-reply");
		});
		ipcRenderer.on("cachePrintSetting-reply", (event, arg) => {
			this.setState({ percent: parseInt(100 / this.count * 5), textInfo: "缓存打印机配置数据" });
			ipcRenderer.send('cacheGoodsDay', { token: getToken() })
			ipcRenderer.removeAllListeners("cachePrintSetting-reply");
		});
		ipcRenderer.on("cacheGoods-reply", (event, arg) => {
			this.setState({ percent: parseInt(100 / this.count * 4), textInfo: "缓存常规配置数据" });
			ipcRenderer.send('cachePrintSetting', { token: getToken() })
			ipcRenderer.removeAllListeners("cacheGoods-reply");
		});
		ipcRenderer.on("cacheGoodsCategory-reply", (event, arg) => {
			this.setState({ percent: parseInt(100 / this.count * 3), textInfo: "缓存商品数据" });
			ipcRenderer.send('cacheGoods', { token: getToken() })
			ipcRenderer.removeAllListeners("cacheGoodsCategory-reply");
		});
		ipcRenderer.on("cacheFloor-reply", (event, arg) => {
			this.setState({ textInfo: "缓存商品分类数据", percent: parseInt(100 / this.count * 2) });
			ipcRenderer.send('cacheGoodsCategory', { token: getToken() })
			ipcRenderer.removeAllListeners("cacheFloor-reply");
		});
		ipcRenderer.on("cacheDictionaryItem-reply", (event, arg) => {
			this.setState({ textInfo: "缓存场地数据", percent: parseInt(100 / this.count * 1) });
			ipcRenderer.send('cacheFloor', { token: getToken() })
			ipcRenderer.removeAllListeners("cacheDictionaryItem-reply");
		});
		//检测是否是首次安装
		ipcRenderer.on("app.first.install-reply", (event, arg) => {
			if (arg) {
				this.setState({ firstInstall: true, textInfo: "缓存基础数据" });
				ipcRenderer.send('cacheDictionaryItem', { token: getToken() })
			} else {
				// this.props.homePageActions.getMenuData();
				this.initData(false);
			}
			ipcRenderer.removeAllListeners("app.first.install-reply");
		});
		ipcRenderer.on("initDbTable-reply", (event, arg) => {
			this.props.homePageActions.getSrvStatus().then(() => {//未登录的时候不拉取数据
				ipcRenderer.send('app.first.install');
			});
			ipcRenderer.removeAllListeners("initDbTable-reply");
		});		
		ipcRenderer.on("check-auto-update-reply", (event, arg) => {
			const { data, } = arg;
			const messageInfo = arg.message;
			const { versionModalVisible } = this.state;
			if(versionModalVisible) {
				switch(messageInfo) {
					//更新错误
					case "error": 
						message.error("更新出错,请联系客服人员.");
						this.setState({updateBtnLoading: false, updateBtnText: '在线升级'});
						break;
					//检查到新版本
					case "update-available":
						this.setState({updateBtnLoading: true, updateBtnText: '正在下载...'});
						break;
					//没有更新
					case "update-not-available":
						this.setState({updateBtnLoading: false, updateBtnText: '在线升级'});
						break;
					//下载中
					case "downloadProgress":
						this.setState({updateBtnLoading: true, updateBtnText: `正在下载...${numeral(data.percent).format('0.00')}%`});
						break;
					// case "isUpdateNow":
					// 	this.setState({updateBtnLoading: false, updateBtnText: '在线升级', versionModalVisible: false});
					// 	Modal.confirm({
					// 		title: '在线升级',
					// 		content: '下载完毕，是否现在更新？',
					// 		onOk: () => {
					// 			ipcRenderer.send("updateNow");
					// 		},
					// 	});
					// 	break;
				}
			} else {
				switch(messageInfo) {
					//更新错误
					case "error": 
						this.setState({spinTip: `${data}，请点上面：帮助->在线客服`});
						break;
					//检查到新版本
					case "update-available":
						this.setState({spinTip: `${data}`});
						break;
					//没有更新
					case "update-not-available": 					
						ipcRenderer.send('initDbTable');
						break;
					//下载中
					case "downloadProgress":
						this.setState({spinTip: `检测到新版本，正在下载……${numeral(data.percent).format('0.00')}%`});
						break;
				}
			}
		});
		ipcRenderer.send('check-auto-update');//自动更新自动安装

		//弹出更新内容提示
		ipcRenderer.on('selectUpdater-reply', (event, arg) => {
			ipcRenderer.removeAllListeners('selectUpdater-reply');
			if(arg.has_show == 0) {
				this.setState({updaterInfoModalVisible: true, clientVersion: arg.version});
				ipcRenderer.send('updateHasshow');
			}
		});
		
		//定时刷新token, 每4小时刷新一次(主要是等级)
		this.refreshTokenIntv = window.setInterval(() => {
			this.props.homePageActions.refreshToken().then(token => {
				//缓存token
                ipcRenderer.send("setCacheData", {name: "token", value: token});
			});
		}, 1000 * 60 * 60 * 4);
	}

	initData = (flag) => {		
		this.setState({spinTip: `数据初始化中...`});
		//查询当前商家信息(如果信息还未完善就弹出完善信息框)
		return this.props.homePageActions.selectCurrMerchantInfo().then(merchantUser => {
			if(merchantUser.merchantStatus === 3) {
				//查询功能菜单
				this.props.homePageActions.getMenuData().then(() => {
					//版本检查
					ipcRenderer.on("check-version", (event, arg) => {
						this.setState({versionModalVisible: true, clientVersion: arg});
						this.props.homePageActions.getLastVersion(1);//1=主应用最新版本
						// ipcRenderer.removeAllListeners("check-version");
					});
					
					ipcRenderer.send('selectUpdater');
				});
				//查询未读通知、消息总数
				this.props.homePageActions.selectUnReadCount();
				//链接socket
				ipcRenderer.send('connectYidpuSocket', getToken());
				//缓存店铺名称与地址
				ipcRenderer.send('setCacheData', {name: 'merchantUser', value: JSON.stringify(merchantUser)});
			}
			if(flag) {
				this.setState({ firstInstall: false });
			}
			return merchantUser;
		});		
	}

	disconnectYdipuSocket = () => {
		ipcRenderer.send('disconnectYidpuSocket');
		// this.props.homePageActions.updateOperatingStatus(0);//歇业中...
	}

	reconnectYdipuSocket = () => {
		ipcRenderer.send('reconnectYdipuSocket');
		// this.props.homePageActions.updateOperatingStatus(1);//营业中...
	}

	componentWillUnmount() {
		window.clearInterval(this.refreshTokenIntv);
		ipcRenderer.removeAllListeners("connectYidpuSocket-reply");
		ipcRenderer.removeAllListeners("check-version");
		ipcRenderer.removeAllListeners("online-service");
		ipcRenderer.removeAllListeners("customerPlaceOrderMSG");
		ipcRenderer.removeAllListeners("callPaymentFinishedMSG");
		ipcRenderer.removeAllListeners("callFrontPaymentFinishedMSG");
		ipcRenderer.removeAllListeners("callPaymentExceptionMSG");
		ipcRenderer.removeAllListeners("callServiceMSG");
		ipcRenderer.removeAllListeners("check-auto-update-reply");
		ipcRenderer.removeAllListeners("check-update-reply");
		ipcRenderer.removeAllListeners("isUpdateNow");
	}

	onMenuClick = ({ item, key, keyPath }) => {
		switch (key) {
			case "logout":
				Modal.confirm({
					title: '退出登录',
					content: '确定退出当前登录账号吗?',
					onOk: () => {
						this.logout();
					},
				});
				break;
			case "user":
				this.props.history.push(`${rootRouter}/user/profile`);
				break;
			case "setting":
				this.props.history.push(`${rootRouter}/user/basicInfo`);
				break;
			case "myOrder": 
			this.props.history.push(`${rootRouter}/user/myOrder`);
				break;
			case "modifyPWD":
				this.props.history.push(`${rootRouter}/user/modifyPWD`);
				break;		
			case "changeAccount":
				this.setState({changeAccountModalVisible: true});
				break;	
		}
	}

	logout = () => {
		this.props.loginActions.logout().then(() => {
			//this.props.history.replace(`/login`);
			//停止socket服务
			ipcRenderer.send('stopSocketIo-message');
			this.disconnectYdipuSocket();
			window.location.replace(`/login`);
		});
	}

	onPopupVisibleChange = (visible) => {
		if(visible) {
			this.props.homePageActions.selectNoticeMsg();
		}		
	}

	updateNoticeStatus = (id) => {
		this.props.homePageActions.updateNoticeStatus(id);
	}

	updateMessageStatus = (id) => {
		this.props.homePageActions.updateMessageStatus(id);
	}

	deleteMessage = (id) => {
		this.props.homePageActions.deleteMessage(id);
	}

	refreshPrivilege = (id) => {
		this.props.homePageActions.refreshPrivilege();
		return this.props.homePageActions.getMenuData().then(() => {
			this.props.history.push(this.props.location.pathname);
			message.success("权限刷新成功");
		});
	}

	handleCommit = (fieldValues, removeFileIds, removeZZFileIds) => {
		let formData = new FormData();
		formData.append("merchantName", fieldValues.merchantName);
		formData.append("address", fieldValues.address);
		formData.append("remark", fieldValues.remark || '');
		formData.append("businessLicenceNo", fieldValues.businessLicenceNo);
		formData.append("phone", this.props.homePage.currMerchantInfo.phone);
		formData.append("merchantProperty", fieldValues.merchantProperty);//店铺性质 1=快餐厅,2=中小餐厅
		const { merchantLogoList, yyzzList, photoList } = this.props.homePage;
		if(merchantLogoList && merchantLogoList[0]) {
			if(merchantLogoList[0].originFileObj) {
				formData.append("logo", merchantLogoList[0].originFileObj);
				getBase64(merchantLogoList[0].originFileObj, (data) => {
					ipcRenderer.send("setCacheData", {name: "logo", value: data});
				});
			}
		}
		ipcRenderer.send("setCacheData", {name: "merchantName", value: fieldValues.merchantName});
        for (let i = 0; i < yyzzList.length; i++) {
			if(yyzzList[i].originFileObj) {
				formData.append("yyzzs", yyzzList[i].originFileObj);
			}
		}
		let defaultPhotoIndex = null;
		let index = 0;
		for (let i = 0; i < photoList.length; i++) {
			if(photoList[i].originFileObj) {
				if(photoList[i].uid == fieldValues.defaultImage) {
					defaultPhotoIndex = index;
				}
				formData.append("photos", photoList[i].originFileObj);
				index++;
			}			
		}
		if(defaultPhotoIndex != null) {
			formData.append("defaultPhotoIndex", defaultPhotoIndex);
		}
		if (removeFileIds && removeFileIds.length > 0) {
			formData.append("delPhotoImage", removeFileIds.join(","));
		}
		if (removeZZFileIds && removeZZFileIds.length > 0) {
			formData.append("delZZImage", removeZZFileIds.join(","));
		}
        this.props.homePageActions.save(formData).then(() => {
			
        });
	}

	refresh = () => {
		this.initData().then(merchantUser => {
			if(merchantUser.merchantStatus == 1) {
				message.info('审核中,请您耐心等待...')
			}
		});
	}

	useFree = () => {
		this.props.homePageActions.useFree().then(() => {
			//查询功能菜单
			this.props.homePageActions.getMenuData();
			//查询未读通知、消息总数
			this.props.homePageActions.selectUnReadCount();
			//链接socket
			ipcRenderer.send('connectYidpuSocket', getToken());
		});
	}

	listAuditHis = () => {
		this.props.homePageActions.listAuditHis();
	}

	defaultImageChange = (value) => {
		const { photoList } = this.props.homePage;
		const merchantId = getUid();
		for (let i = 0; i < photoList.length; i++) {
			if(photoList[i].uid == value && !photoList[i].originFileObj) {//已保存的商家店铺图片
				this.props.homePageActions.updateDefaultImage(value);
			}
		}
	}

	hideVersionModal = () => {
		const { updateBtnLoading } = this.state;
		if(!updateBtnLoading) {
			this.setState({versionModalVisible: false});
		}		
	}

	updaterClient = () => {
		Modal.confirm({
			title: '在线升级',
			content: '升级过程中不可取消，下载完成后会自动覆盖安装，确认现在升级更新吗？',
			onOk: () => {
				ipcRenderer.send('check-auto-update');
			},
		});		
	}

	hideModal = () => {
		this.setState({visible: false});
	}

	openQQ = (q) => {
		ipcRenderer.send("openQQ", {qq: q});
	}

	onLoginSubmit = (values) => {
		return this.props.homePageActions.changeAccount(values.username, values.password).then(() => {
			message.success("子账号切换成功");
			this.setState({changeAccountModalVisible: false});
		});
	}

	handleUpdaterInfoModalVisible = (flag) => {
		this.setState({updaterInfoModalVisible: !!flag});
	}

	render() {
		const { collapsed, menuData, notifyCount, notifyLoading, noticeList, messageList, loadingCurrMerchantInfo, currMerchantInfo,
			stepVisible, formData, currentStep, merchantLogoList, yyzzList, photoList, saveLoading, useFreeLoading, auditHisLoading, auditHisList,
			updateDefaultImageLoading, listFunPriceLoading, funPriceMap, versionLoading, versionData, updateOperStatusLoading, 
			changeAccountLoading} = this.props.homePage;
		const routerData = getRouteChildrenByPath(`${rootRouter}`, menuData);
		const { location, match, history } = this.props;
		const formantMenuData = getMenuData(menuData);
		const { firstInstall, textInfo, percent, socketConnectStatus, spinTip, visible, versionModalVisible, clientVersion, 
			updateBtnLoading, updateBtnText, changeAccountModalVisible, updaterInfoModalVisible } = this.state;
		const { formFieldChangeValue, merchantLogoOnChange, yyzzOnChange, photoOnChange, getYYZZImageBlob, removeImage, listFunctionPrice } = this.props.homePageActions;
		if (firstInstall) {
			return (
				<div className={styles.loadData}>
					<div>{`${textInfo}`}</div>
					<Progress percent={percent} status="active" />
					<OnlineService visible={visible} openQQ={this.openQQ} hide={this.hideModal}/>
				</div>
			)
		} else {
			if (menuData.length > 0) {
				return (
					<BasicLayout location={location}
						menuData={formantMenuData}
						onCollapse={this.onCollapse}
						collapsed={collapsed}
						routerData={routerData}
						logo={currMerchantInfo.logoPath}
						merchantName={currMerchantInfo.merchantName}
						onMenuClick={this.onMenuClick}
						notifyCount={notifyCount}
						notices={noticeList}
						notifyMsgLoading={notifyLoading}
						messages={messageList}
						onPopupVisibleChange={this.onPopupVisibleChange}
						updateNoticeStatus={this.updateNoticeStatus}
						updateMessageStatus={this.updateMessageStatus}
						deleteMessage={this.deleteMessage}
						refreshPrivilege={this.refreshPrivilege}
						socketConnectStatus={socketConnectStatus}
						disconnectYdipuSocket={this.disconnectYdipuSocket}
						reconnectYdipuSocket={this.reconnectYdipuSocket}
						updateOperStatusLoading={updateOperStatusLoading}
					>
						<SwitchRoute match={match} 
							location={location}
							menuData={formantMenuData}
							default={DefaultPage} 
							listFunctionPrice={listFunctionPrice}
							listFunPriceLoading={listFunPriceLoading}
							funPriceMap={funPriceMap}
							refreshPrivilege={this.refreshPrivilege}
						/>
						<OnlineService visible={visible} openQQ={this.openQQ} hide={this.hideModal}/>
						<VersionModal visible={versionModalVisible} loading={versionLoading} 
							versionData={versionData} btnLoading={updateBtnLoading} btnText={updateBtnText}
							updaterClient={this.updaterClient}
							hide={this.hideVersionModal} clientVersion={clientVersion}/>
						<ChangeAccoutModal visible={changeAccountModalVisible}
							onClose={() => {this.setState({changeAccountModalVisible: false})}}
							handleSubmit={this.onLoginSubmit}
							loading={changeAccountLoading}
						>
						</ChangeAccoutModal>
						<UpdaterInfoModal visible={updaterInfoModalVisible}
							handleVisible={this.handleUpdaterInfoModalVisible}
							clientVersion={clientVersion}
						>
						</UpdaterInfoModal>
					</BasicLayout>
				)
			} else if(stepVisible) {
				return (
					<Spin spinning={updateDefaultImageLoading}>
						<Steps current={currentStep}
							formData={formData}
							fieldChangeValue={formFieldChangeValue}
							merchantLogoOnChange={merchantLogoOnChange}
							yyzzOnChange={yyzzOnChange}
							merchantLogoList={merchantLogoList}
							yyzzList={yyzzList}
							photoList={photoList}
							photoOnChange={photoOnChange}
							saveLoading={saveLoading}
							handleCommit={this.handleCommit}
							refresh={this.refresh}
							logout={this.logout}
							useFree={this.useFree}
							useFreeLoading={useFreeLoading}
							auditHisLoading={auditHisLoading}
							auditHisList={auditHisList}
							listAuditHis={this.listAuditHis}
							getYYZZImageBlob={getYYZZImageBlob}
							currMerchantInfo={currMerchantInfo}
							removeImage={removeImage}
							defaultImageChange={this.defaultImageChange}
						/>
						<OnlineService visible={visible} openQQ={this.openQQ} hide={this.hideModal}/>
					</Spin>
				)
			} else {
				return <div className={styles.loadData}>
					<Spin tip={spinTip}/>
					<OnlineService visible={visible} openQQ={this.openQQ} hide={this.hideModal}/>
				</div>;
			}
		}
	}
}



class VersionModal extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { visible, hide, loading, versionData, clientVersion, btnLoading, btnText,updaterClient } = this.props;
		const footer = () => {
			if(versionData && versionData.currVersion != clientVersion) {
				return [<Button type={"primary"} key='updaterKey' loading={btnLoading} onClick={() => {updaterClient()}}>{btnText}</Button>,
					<Button key='close' onClick={hide}>关闭</Button>];
			} else {
				return [<Button key='close' onClick={hide}>关闭</Button>];
			}			
		}
		return (
			<Modal title={"版本信息"}
				visible={visible}
				onCancel={hide}
				centered={true}
				footer={footer()}
			>
				<Spin spinning={loading}>
					<Row>
						<Col span={24} style={{textAlign: 'center'}}>
							<p>当前版本：{clientVersion}</p>
							<p>最新版本：{versionData && versionData.currVersion}</p>
						</Col>
					</Row>
				</Spin>
			</Modal>
		)
	}
}

export default withRouter(connect((state) => {
	return {
		login: state.login,
		homePage: state.homePage,
	}
}, (dispatch) => {
	return {
		homePageActions: bindActionCreators(homePageActions, dispatch),
		loginActions: bindActionCreators(loginActions, dispatch),
		floorPlanActions: bindActionCreators(floorPlanActions, dispatch),
	}
})(HomePage));