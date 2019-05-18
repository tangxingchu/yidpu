import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux';

import SiderMenu from '../SiderMenu';
import GlobalHeader from '../GlobalHeader';
import { getMenuData } from '../../common/menu';

const { Header, Content, Footer, Sider } = Layout;

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
	const result = {};
	const childResult = {};
	for (const i of menuData) {
		if (!routerData[i.path]) {
			result[i.path] = i;
		}
		if (i.children) {
			Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
		}
	}
	return Object.assign({}, routerData, result, childResult);
};

export default class BasicLayout extends Component {

	static childContextTypes = {
		location: PropTypes.object,
		breadcrumbNameMap: PropTypes.object,
	};

	getChildContext() {
		const { location, routerData, menuData } = this.props;
		const breadcrumbNameMap = getBreadcrumbNameMap(menuData, routerData);
		return {
			location,
			breadcrumbNameMap,
		};
	}

	componentDidMount() {

	}

	render() {
		const { location, match, onCollapse, menuData, collapsed, logo, merchantName, onMenuClick, notifyCount, notices, 
			notifyMsgLoading, messages, onPopupVisibleChange, updateMessageStatus, updateNoticeStatus, deleteMessage,
			refreshPrivilege, socketConnectStatus, disconnectYdipuSocket, reconnectYdipuSocket, updateOperStatusLoading } = this.props;
		
		return (
			<Layout>
				<SiderMenu
					menuData={menuData}
					location={location}
					collapsed={collapsed}
					onCollapse={onCollapse}
					merchantName={merchantName}
					logo={logo}
				>
				</SiderMenu>
				<Layout>
					<Header style={{ padding: 0 }}>
						<GlobalHeader onCollapse={onCollapse} 
							collapsed={collapsed}
							merchantName={merchantName}
							onMenuClick={onMenuClick}
							notifyCount={notifyCount}
							notices={notices}
							notifyMsgLoading={notifyMsgLoading}
							messages={messages}
							onPopupVisibleChange={onPopupVisibleChange}
							updateMessageStatus={updateMessageStatus}
							updateNoticeStatus={updateNoticeStatus}
							deleteMessage={deleteMessage}
							refreshPrivilege={refreshPrivilege}
							socketConnectStatus={socketConnectStatus}
							disconnectYdipuSocket={disconnectYdipuSocket}
							reconnectYdipuSocket={reconnectYdipuSocket}
							updateOperStatusLoading={updateOperStatusLoading}
						/>
					</Header>
					<Content style={{ margin: '24px 24px 0' }}>
						{this.props.children}
					</Content>
				</Layout>

			</Layout>
		)
	}
}

