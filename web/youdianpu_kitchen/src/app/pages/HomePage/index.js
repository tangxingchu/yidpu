import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';

import { Spin, Modal } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';

import { getMenuData } from '../../common/menu';
import SwitchRoute from '../../components/Route/SwitchRoute';
import BasicLayout from '../../components/Layout/BasicLayout';
import logo from '../../common/logo.png'
import { rootRouter } from '../../common/config';

import homePageActions from '../../actions/homePage'
import loginActions from '../../actions/login'
import monitorActions from '../../actions/monitor';

import { getRouteChildrenByPath } from '../../routes';
import Authorized from '../../utils/authority';
import Page404 from '../Exception/404Page';
import Monitor from '../dashboard/monitor';
import styles from './index.less';
import { getUid, getToken } from '../../utils/authority';

//<Route component={AnalysisPage} />
{/* <Page404 /> <Redirect to="/dashboard/analysis" />*/}

class HomePage extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// this.props.homePageActions.getMenuData().catch(e => message.error("请求菜单数据失败"));
		this.props.homePageActions.getMenuData();
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

	onRefresh = () => {
		this.props.monitorActions.dispathQueryPending();
		ipcRenderer.send('queryPlaceOrder', {token: getToken()});
	}

	render() {
		const { menuData } = this.props.homePage;
		const routerData = getRouteChildrenByPath(`${rootRouter}`, menuData);
		const { location, match } = this.props;
		const formantMenuData = getMenuData(menuData);
		if(menuData.length > 0) {
			return (
				<BasicLayout location={location}
					menuData={formantMenuData}
					routerData={routerData}
					logo={logo}
					onMenuClick={this.onMenuClick}
					onRefresh={this.onRefresh}
					refreshLoading={this.props.monitor.loading}
				>
					<SwitchRoute match={match} location={location} menuData={formantMenuData} default={Monitor} />
				</BasicLayout>
			)
		} else {
			return <div className={styles.loadData}>
					<Spin />
				</div>;
		}
	}
}

export default withRouter(connect((state) => {
	return {
		login: state.login,
		homePage: state.homePage,
		monitor: state.monitor,
	}
}, (dispatch) => {
	return { 
		homePageActions: bindActionCreators(homePageActions, dispatch),
		loginActions: bindActionCreators(loginActions, dispatch),
		monitorActions: bindActionCreators(monitorActions, dispatch),
	}
})(HomePage));