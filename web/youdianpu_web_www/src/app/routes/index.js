import { matchPath } from 'react-router';
import pathToRegexp from 'path-to-regexp';

import Page403 from '../pages/Exception/403Page';
import HomePage from '../pages/HomePage';

import LoginPage from '../pages/Login';
import RootPage from '../pages/rootPage';
import AnalysisPage from '../pages/dashboard/analysis';
import TodayOverview from '../pages/report/todayOverview';
import TurnoverReport from '../pages/report/turnover';
import CustomerFlowReport from '../pages/report/CustomerFlow';
import OrderReport from '../pages/report/orderNum';
import RuleAnalysis from '../pages/business/analysis';
import TableRate from '../pages/report/tableRate';
import GoodsRank from '../pages/report/goodsRank';
import Reconciliation from '../pages/report/reconciliation';
import MemberAnalysis from '../pages/member/memberAnalysis';

const routes = [{
    path: '/',
    exact: true,
    component: RootPage,
},  {
    path: '/login',
    exact: true,
    component: LoginPage,
    title: '登录一点谱餐饮报表平台',
}, {
    path: '/youdianpu',
    exact: false,
    component: HomePage,
    title: '一点谱餐饮报表平台',
    children: [{
        path: '/dashboard/analysis',
        component: AnalysisPage,
    }, {
        path: '/business/ruleAnalysis',
        component: RuleAnalysis,
    }, {
        path: '/report/todayOverview',
        component: TodayOverview,
    }, {
        path: '/report/reconciliation',
        component: Reconciliation,
    }, {
        path: '/report/turnoverReport',
        component: TurnoverReport,
    }, {
        path: '/report/customerFlowReport',
        component: CustomerFlowReport,
    }, {
        path: '/report/orderReport',
        component: OrderReport,
    }, {
        path: '/report/tableRate',
        component: TableRate,
    }, {
        path: '/report/goodsRank',
        component: GoodsRank,
    }, {
        path: '/member/memberAnalysis',
        component: MemberAnalysis,
    }, {
        path: '/exception/403',
        component: Page403,
    }],
}, {
    component: RootPage,
    title: '404 Not Found'
}];

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
    // console.log(menuData);
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
