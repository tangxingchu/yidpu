import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Row, Col, Spin, message, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';

import { getMenuData, menuData } from '../../common/menu';
import SwitchRoute from '../../components/Route/SwitchRoute';
import BasicLayout from '../../components/Layout/BasicLayout';
import logo from '../../common/logo.png'
import { rootRouter } from '../../common/config';

import homePageActions from '../../actions/homePage'
import loginActions from '../../actions/login'
import basicConfigActions from '../../actions/basicConfig';

import { getRouteChildrenByPath } from '../../routes';
import Queue from '../dashboard/queue';
import styles from './index.less';
import OnlineService from './onlineService';

//<Route component={AnalysisPage} />
{/* <Page404 /> <Redirect to="/dashboard/analysis" />*/}

class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			socketConnectStatus: false,//socket链接状态
			visible: false,//技术客服modal
			versionModalVisible: false,//版本信息
			clientVersion: null,
			updateBtnLoading: false,
			updateBtnText: "在线升级",
			spinTip: "版本更新检查中...",
		}
	}

	componentDidMount() {
		// this.props.homePageActions.getMenuData().catch(e => message.error("请求菜单数据失败"));
		this.props.homePageActions.selectCurrMerchantInfo();
		//在线客服
		ipcRenderer.on("online-service", (event, arg) => {
			this.setState({visible: true});
		});		
		//连接出现错误
        ipcRenderer.on("connect_error", (event, arg) => {
			message.error("连接出错,请检查主应用点餐服务是否已开启.")
			this.setState({socketConnectStatus: false});
        });
        //连接超时
        ipcRenderer.on("connect_timeout", (event, arg) => {
			message.error("连接超时, 请检查本机与主应用的IP是否相通.")
			this.setState({socketConnectStatus: false});
        });
        //连接成功
        ipcRenderer.on("connect", (event, arg) => {
            // notification.success({
            //     message: '提示',
            //     description: '连接E点谱点餐服务成功.',
            //     duration: null,
            //     placement: 'bottomRight',
			// });
			this.setState({socketConnectStatus: true});
        });
        //连接断开
        ipcRenderer.on("disconnect", (event, arg) => {
            /* notification.error({
                message: '错误',
                description: '连接店内WIFI点餐服务已断开,WIFI点餐服务已关闭.',
                duration: null,
                placement: 'bottomRight',
			}); */
			this.setState({socketConnectStatus: false});
		});
		
		//检查更新
		ipcRenderer.on("check-auto-update-reply", (event, arg) => {
			const { data } = arg;
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
						this.initData();
						
						break;
					//下载中
					case "downloadProgress":
						this.setState({spinTip: `检测到新版本，正在下载……${numeral(data.percent).format('0.00')}%`});
						break;
				}
			}
		});
		ipcRenderer.send('check-auto-update');//自动更新自动安装
		//版本检查
		ipcRenderer.on("check-version", (event, arg) => {
			this.setState({versionModalVisible: true, clientVersion: arg});
			this.props.homePageActions.getLastVersion(2);//1=主应用最新版本
		});
		// //定时刷新token, 每4小时刷新一次
		// this.refreshTokenIntv = window.setInterval(() => {
		// 	this.props.homePageActions.refreshToken();
		// }, 1000 * 60 * 60 * 4);
	}

	initData = () => {
		//初始化socket客户端
        this.props.basicConfigActions.selectByCode("server-ip").then(data => {
			ipcRenderer.send("initSocketClient", data.configValue);
		});
		this.props.homePageActions.getMenuData();
	}

	componentWillUnmount() {
		// window.clearInterval(this.refreshTokenIntv);
		ipcRenderer.removeAllListeners("online-service");
        ipcRenderer.removeAllListeners("connect_error");
        ipcRenderer.removeAllListeners("connect_timeout");
        ipcRenderer.removeAllListeners("connect");
		ipcRenderer.removeAllListeners("disconnect");
		ipcRenderer.removeAllListeners("check-auto-update-reply");
		ipcRenderer.removeAllListeners("check-version");
    }

	onMenuClick = ({ item, key, keyPath }) => {
		switch (key) {
			case "logout":
				Modal.confirm({
					title: '提示',
					content: '确定退出当前登录账号吗?',
					onOk: () => {
						this.props.loginActions.logout().then(() => {
							this.props.history.replace(`/login`);
						});
					},
				});				
				break;
		}
	}

	hideModal = () => {
		this.setState({visible: false});
	}

	openQQ = (q) => {
		ipcRenderer.send("openQQ", {qq: q});
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

	render() {
		const { menuData, versionLoading, versionData } = this.props.homePage;
		const routerData = getRouteChildrenByPath(`${rootRouter}`, menuData);
		const { location, match } = this.props;
		const { socketConnectStatus, visible, spinTip, versionModalVisible, updateBtnLoading, updateBtnText, clientVersion } = this.state;
		const formantMenuData = getMenuData(menuData);
		if(menuData.length > 0) {
			return (
				<BasicLayout location={location}
					menuData={formantMenuData}
					routerData={routerData}
					logo={logo}
					onMenuClick={this.onMenuClick}
					socketConnectStatus={socketConnectStatus}
				>
					<SwitchRoute match={match} location={location} menuData={formantMenuData} default={Queue} />
					<OnlineService visible={visible} openQQ={this.openQQ} hide={this.hideModal}/>
					<VersionModal visible={versionModalVisible} loading={versionLoading} 
							versionData={versionData} btnLoading={updateBtnLoading} btnText={updateBtnText}
							updaterClient={this.updaterClient}
							hide={this.hideVersionModal} clientVersion={clientVersion}/>
				</BasicLayout>
			)
		} else {
			return <div className={styles.loadData}>
					<Spin tip={spinTip}/>
					<OnlineService visible={visible} openQQ={this.openQQ} hide={this.hideModal}/>
				</div>;
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
		basicConfigActions: bindActionCreators(basicConfigActions, dispatch),
	}
})(HomePage));