import { matchPath } from 'react-router';
import pathToRegexp from 'path-to-regexp';

import NotFoundPage from '../pages/Exception/404Page';
import Page403 from '../pages/Exception/403Page';
import HomePage from '../pages/HomePage';

import LoginPage from '../pages/Login';
import DefaultPage from '../pages/DefaultPage';
import AnalysisPage from '../pages/dashboard/analysis';
import MonitorPage from '../pages/dashboard/monitor';
import FloorPlan from '../pages/dashboard/floorPlan';
import Dict from '../pages/basic/dict';
import MenuFunc from '../pages/basic/menuFunc';
import CheckMerchant from '../pages/basic/checkMerchant';
import MerchantDetail from '../pages/basic/checkMerchant/detail';
import MerchantChangeDetail from '../pages/basic/checkMerchant/changeDetail';

const routes = [{
        path: '/',
        exact: true,
        component: DefaultPage,
    }, {
        path: '/login',
        exact: true,
        component: LoginPage,
        title: '登录',
    }, {
        path: '/youdianpu',
        exact: false,
        component: HomePage,
        title: 'E点谱-后台管理系统',
        children: [{
            path: '/dashboard/analysis',
            component: AnalysisPage,
        }, {
            path: '/dashboard/monitor',
            component: MonitorPage,
        }, {
            path: '/dashboard/floorplan',
            component: FloorPlan,
        }, {
            path: '/basic/dict',
            component: Dict,
        }, {
            path: '/basic/function',
            component: MenuFunc,
        }, {
            path: '/basic/checkMerchant',
            component: CheckMerchant,
        }, {
            path: '/basic/merchantDetail',
            component: MerchantDetail,
        }, {
            path: '/basic/merchantChangeDetail',
            component: MerchantChangeDetail,
        }, {
            path: '/exception/403',
            component: Page403,
        }],
    }, {
        component: DefaultPage,
        title: '404 Not Found'
    },
];

export default routes;

const _matchRouteByPath = (pathname, parentPath, routeConfigs, matchResults) => {
    for (var i = 0; i < routeConfigs.length; i++) {
        const route = routeConfigs[i];
        const { path: routePath = '' } = route;
        const path = `${parentPath}${routePath}`;
        const { exact, strict, children } = route;
        const match = matchPath(pathname, {
            path, exact, strict,
        });
        if (match) {
            matchResults.push({ match, route });
            if (children) {
                _matchRouteByPath(pathname, path, children, matchResults);
            }
            break;
        }
    }
};

export const matchRouteByPath = (path) => {
    const matchResults = [];
    _matchRouteByPath(path, '', routes, matchResults);
    return matchResults;
};

export const getRouteChildrenByPath = (path, menuData) => {
    let matchResults = matchRouteByPath(path);
    matchResults = matchResults.filter(r => r.match.url === path && r.route.path);
    const last = matchResults[matchResults.length - 1];
    const { children } = last.route;
    const newMenuData = getFlatMenuData(menuData);
    return children.map(item => {
        const pathRegexp = pathToRegexp(path + item.path);
        const menuKey = Object.keys(newMenuData).find(key => pathRegexp.test(`${key}`));
        let menuItem = {};
        // If menuKey is not empty
        if (menuKey) {
            menuItem = newMenuData[menuKey];
        }
        item = {
            ...item,
            name: item.name || menuItem.name,
            authority: item.authority || menuItem.authority,
            // hideInBreadcrumb: item.hideInBreadcrumb || menuItem.hideInBreadcrumb,
        };
        return item;
    });
};

function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach(item => {
        if (item.children) {
            keys[item.path] = { ...item };
            keys = { ...keys, ...getFlatMenuData(item.children) };
        } else {
            keys[item.path] = { ...item };
        }
    });
    return keys;
}