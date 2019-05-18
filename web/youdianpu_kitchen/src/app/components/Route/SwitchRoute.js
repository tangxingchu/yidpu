import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes, { getRouteChildrenByPath } from '../../routes';
import { rootRouter } from '../../common/config';
import Page403 from '../../pages/Exception/403Page';

import Authorized from '../../utils/Authorized';

const { AuthorizedRoute, check } = Authorized;

export default class SwitchRoute extends Component {

	constructor(props) {
		super(props);
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
							page403={Page403}
						/>
					)
				})}
				<Route component={DefaultComponent}/>
			</Switch>
		)
	}
}
