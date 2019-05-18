import { matchPath } from 'react-router';
import pathToRegexp from 'path-to-regexp';

import NotFoundPage from '../pages/Exception/404Page';
import Page403 from '../pages/Exception/403Page';
import HomePage from '../pages/HomePage';

import LoginPage from '../pages/Login';
import RootPage from '../pages/rootPage';
import DefaultPage from '../pages/DefaultPage';
import AnalysisPage from '../pages/dashboard/analysis';
import MonitorPage from '../pages/dashboard/monitor';
import FloorPlan from '../pages/dashboard/floorPlan';
import Queue from '../pages/dashboard/queue';
import Dict from '../pages/basic/dictionary';
import Screen from '../pages/basic/screen';
import Goods from '../pages/basic/Goods';
import GoodsCategory from '../pages/basic/Category';
import ChildUser from '../pages/system/childUser';
import Employee from '../pages/system/employee';
import MobilePreview from '../pages/mobile/preview';
import RoleFunction from '../pages/system/roleFunction';
import UserRole from '../pages/system/userRole';
import Rule from '../pages/business/rule';
import PaySetting from '../pages/system/paySetting';
import Profile from '../pages/user/profile';
import MyOrder from '../pages/user/myOrder';
import ModifyPWD from '../pages/user/password';
import BasicInfo from '../pages/user/basicInfo';
import HistoryOrder from '../pages/order/historyOrder';
import PaymentLog from '../pages/order/paymentLog';
import CurrentOrder from '../pages/order/currentOrder';
import TodayOverview from '../pages/report/todayOverview';
import TurnoverReport from '../pages/report/turnover';
import CustomerFlowReport from '../pages/report/CustomerFlow';
import OrderReport from '../pages/report/orderNum';
import RuleAnalysis from '../pages/business/analysis';
import TableRate from '../pages/report/tableRate';
import GoodsRank from '../pages/report/goodsRank';
import MemberInfo from '../pages/member/memberInfo';
import MemberRecharge from '../pages/member/memberRecharge';
import MemberRank from '../pages/member/rankConfig';
import MemberRechargeRule from '../pages/member/memberRechargeRule';
import CashierLog from '../pages/order/cashierLog';
import MemberRefund from '../pages/member/refund';
import MemberRecord from '../pages/member/memberRecord';
import MemberRedemption from '../pages/member/redemption';
import MemberDelete from '../pages/member/memberDelete';
import MemberChangeHis from '../pages/member/changeHis';
import MemberAnalysis from '../pages/member/memberAnalysis';
import SMSSign from '../pages/system/smsSign';
import PrintSetting from '../pages/system/printSetting';
import Reconciliation from '../pages/report/reconciliation';
import OfflineCashierLog from '../pages/order/offlineCashierLog';

const routes = [{
    path: '/',
    exact: true,
    component: RootPage,
}, {
    path: '/login',
    exact: true,
    component: LoginPage,
    title: '登录一点谱餐饮平台',
}, {
    path: '/youdianpu',
    exact: false,
    component: HomePage,
    title: '一点谱餐饮平台',
    children: [{
        path: '/defaultPage',
        component: DefaultPage,
    }, {
        path: '/dashboard/analysis',
        component: AnalysisPage,
    }, {
        path: '/dashboard/monitor',
        component: MonitorPage,
    }, {
        path: '/dashboard/floorplan',
        component: FloorPlan,
    },  {
        path: '/dashboard/queue',
        component: Queue,
    }, {
        path: '/basic/dict',
        component: Dict,
    }, {
        path: '/basic/goods',
        component: Goods,
    }, {
        path: '/basic/screen',
        component: Screen,
    }, {
        path: '/basic/category',
        component: GoodsCategory,
    }, {
        path: '/system/account',
        component: ChildUser,
    }, {
        path: '/system/employee',
        component: Employee,
    }, {
        path: '/system/roleFunction',
        component: RoleFunction,
    }, {
        path: '/system/userRole',
        component: UserRole,
    }, {
        path: '/system/paysetting',
        component: PaySetting,
    }, {
        path: '/system/smsSign',
        component: SMSSign,
    }, {
        path: '/system/printSetting',
        component: PrintSetting,
    }, {
        path: '/mobile/preview',
        component: MobilePreview,
    }, {
        path: '/business/brule',
        component: Rule,
    }, {
        path: '/business/ruleAnalysis',
        component: RuleAnalysis,
    }, {
        path: '/user/profile',
        component: Profile,
    }, {
        path: '/user/myOrder',
        component: MyOrder,
    }, {
        path: '/user/modifyPWD',
        component: ModifyPWD,
    }, {
        path: '/user/basicInfo',
        component: BasicInfo,
    }, {
        path: '/order/historyOrder',
        component: HistoryOrder,
    }, {
        path: '/order/paymentLog',
        component: PaymentLog,
    }, {
        path: '/order/cashierLog',
        component: CashierLog,
    }, {
        path: '/order/currOrder',
        component: CurrentOrder,
    }, {
        path: '/order/offlineCashierLog',
        component: OfflineCashierLog,
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
        path: '/member/memberInfo',
        component: MemberInfo,
    }, {
        path: '/member/memberRecharge',
        component: MemberRecharge,
    }, {
        path: '/member/memberRefund',
        component: MemberRefund,
    }, {
        path: '/member/memberRecord',
        component: MemberRecord,
    }, {
        path: '/member/memberRechargeRule',
        component: MemberRechargeRule,
    }, {
        path: '/member/memberRank',
        component: MemberRank,
    }, {
        path: '/member/memberRedemption',
        component: MemberRedemption,
    }, {
        path: '/member/memberChangeHis',
        component: MemberChangeHis,
    }, {
        path: '/member/memberDelete',
        component: MemberDelete,
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
