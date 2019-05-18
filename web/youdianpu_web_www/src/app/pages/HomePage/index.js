import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router';

import { Layout, Menu, Breadcrumb, Icon, Spin, message, Progress, Modal, Button, Row, Col, notification } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { getMenuData } from '../../common/menu';
import SwitchRoute from '../../components/Route/SwitchRoute';
import BasicLayout from '../../components/Layout/BasicLayout';
import { rootRouter } from '../../common/config';

import homePageActions from '../../actions/homePage'
import loginActions from '../../actions/login'

import { getRouteChildrenByPath } from '../../routes';
import DefaultPage from '../dashboard/analysis';
import styles from './index.less';

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
			clientVersion: null,
			updateBtnLoading: false,
			updateBtnText: "在线升级",
			socketConnectStatus: false,//socket链接状态
			spinTip: "版本更新检查中...",
		}
		this.count = 6;
	}

	onCollapse = (collapsed) => {
		this.props.homePageActions.changeCollapsed(collapsed);
	}

	componentDidMount() {
		this.initData();
	}

	initData = () => {		
		this.setState({spinTip: `数据初始化中...`});
		//查询当前商家信息(如果信息还未完善就弹出完善信息框)
		return this.props.homePageActions.selectCurrMerchantInfo().then(merchantUser => {
			if(merchantUser.merchantStatus === 3) {
				//查询功能菜单
				this.props.homePageActions.getMenuData().then(() => {
					
				});
				//查询未读通知、消息总数
				// this.props.homePageActions.selectUnReadCount();
			} else {
				message.info("您店铺资料正在审核中...");
			}
			return merchantUser;
		});		
	}

	componentWillUnmount() {
		
	}

	

	render() {
		const { collapsed, menuData, notifyCount, notifyLoading, noticeList, messageList, loadingCurrMerchantInfo, currMerchantInfo,
			stepVisible, formData, currentStep, logoList, yyzzList, photoList, saveLoading, useFreeLoading, auditHisLoading, auditHisList,
			updateDefaultImageLoading, listFunPriceLoading, funPriceMap, versionLoading, versionData, updateOperStatusLoading} = this.props.homePage;
		const routerData = getRouteChildrenByPath(`${rootRouter}`, menuData);
		const { location, match, history } = this.props;
		const formantMenuData = getMenuData(menuData);
		const { firstInstall, textInfo, percent, socketConnectStatus, spinTip, visible, versionModalVisible, clientVersion, 
			updateBtnLoading, updateBtnText } = this.state;
		const { formFieldChangeValue, logoOnChange, yyzzOnChange, photoOnChange, getYYZZImageBlob, removeImage, listFunctionPrice } = this.props.homePageActions;
		
		if (menuData.length > 0) {
			return (
				<BasicLayout location={location}
					onCollapse={this.onCollapse}
					menuData={getMenuData()}
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
				</BasicLayout>
			)
		} else {
			return <div className={styles.loadData}>
				<Spin tip={spinTip}/>
			</div>;
		}
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
	}
})(HomePage));