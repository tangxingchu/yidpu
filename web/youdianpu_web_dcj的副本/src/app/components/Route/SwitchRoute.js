import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes, { getRouteChildrenByPath } from '../../routes';
import { rootRouter } from '../../common/config';
import Page403 from '../../pages/Exception/403Page';

import Authorized from '../../utils/Authorized';

const { AuthorizedRoute, check } = Authorized;

const loop = (data, path, callback) => {
	data.forEach((item, index, arr) => {
		if (item.path === path) {
			return callback(item, index, arr);
		}
		if (item.children) {
			return loop(item.children, path, callback);
		}
	});
};

export default class SwitchRoute extends Component {

	constructor(props) {
		super(props);
	}
	
	//403页面增强(提示需要达到什么等级才会有权限)
	renderPage403 = () => {
		const { match, menuData, location, listFunctionPrice, listFunPriceLoading, funPriceMap, refreshPrivilege } = this.props;
		let grade = 1, functionId = null;
		loop(menuData, location.pathname, (item, index, arr) => {
			grade = item.grade;
			functionId = item.id;
		})
		return (
			<Page403 grade={grade} functionId={functionId} 
				listFunctionPrice={listFunctionPrice}
				listFunPriceLoading={listFunPriceLoading}
				funPriceMap={funPriceMap}
				refreshPrivilege={refreshPrivilege}
			/>
		)
	}

	render() {
		const { match, default: DefaultComponent, menuData } = this.props;
		const basePath = match.path;
		const routes = getRouteChildrenByPath(match.url, menuData);
		return (
			<Switch>
				{routes && routes.map((route, idx) => {
					const { children, path: p, ...rest } = route;
					let path;
					if (p) {
						path = `${basePath}${p}`;
					}
					//<Route key={idx} path={path} {...rest} />);
					return (
						<AuthorizedRoute
							key={idx}
							path={path}
							component={route.component}
							exact={route.exact}
							authority={route.authority}
							redirectPath={`${rootRouter}/exception/403`}
							page403={this.renderPage403}
						/>
					)
				})}
				<Route component={DefaultComponent}/>
			</Switch>
		)
	}
}
