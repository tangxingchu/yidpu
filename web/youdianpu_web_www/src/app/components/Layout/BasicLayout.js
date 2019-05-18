import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout, Drawer } from 'antd';

import SiderMenu from '../SiderMenu';
import GlobalHeader from '../GlobalHeader';


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
		const { location, onCollapse, collapsed, menuData, logo, merchantName, onMenuClick, notifyCount, notices, 
			notifyMsgLoading, messages, onPopupVisibleChange, updateMessageStatus, updateNoticeStatus, deleteMessage } = this.props;
		
		return (
			<Layout>
				<Drawer
					visible={!collapsed}
					placement="left"
					onClose={() => onCollapse(true)}
					style={{
						padding: 0,
						height: '100vh',
					}}
					>
				<SiderMenu
					menuData={menuData}
					location={location}
					collapsed={collapsed}
					onCollapse={onCollapse}
					merchantName={merchantName}
					logo={logo}
				>
				</SiderMenu>
				</Drawer>
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

