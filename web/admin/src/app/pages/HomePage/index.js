import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { Header, Content, Footer, Sider } = Layout;

import { getMenuData } from '../../common/menu';
import SwitchRoute from '../../components/Route/SwitchRoute';
import BasicLayout from '../../components/Layout/BasicLayout';
import logo from '../../common/logo.png'

import AnalysisPage from '../dashboard/analysis';
import homePageActions from '../../actions/homePage'

import { getRouteChildrenByPath } from '../../routes';
import Authorized from '../../utils/authority'

import Page404 from '../Exception/404Page';
//<Route component={AnalysisPage} />
//<Redirect to="/youdianpu/dashboard/analysis" />
const defaultComp = () => {
	return (
		<Page404 />
	);
}

class HomePage extends Component {


	onCollapse = (collapsed) => {
		this.props.homePageActions.changeCollapsed(collapsed);
	}

	componentDidMount() {

	}

	render() {
		const menuData = getMenuData();
		const routerData = getRouteChildrenByPath("/youdianpu", menuData);
		const { location, match } = this.props;
		const { collapsed } = this.props.homePage;
		return (
			<BasicLayout location={location}
				menuData={menuData}
				onCollapse={this.onCollapse}
				collapsed={collapsed}
				routerData={routerData}
				logo={logo}
			>
				<SwitchRoute match={match} location={location} menuData={menuData} default={defaultComp()} />
			</BasicLayout>
		)
	}
}

export default withRouter(connect((state) => {
	return {
		login: state.login,
		homePage: state.homePage,
	}
}, (dispatch) => {
	return { homePageActions: bindActionCreators(homePageActions, dispatch) }
})(HomePage));