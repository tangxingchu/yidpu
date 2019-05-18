import { combineReducers } from 'redux'

import login from './login'
import homePage from './homePage'
import goodsCategory from './goodsCategory'
import childUser from './childUser'
import employee from './employee'
import screen from './screen'
import goods from './goods';
import floorPlan from './floorPlan';
import defaultPage from './defaultPage';
import queue from './queue';
import dictionary from './dictionary';
import roleFunction from './roleFunction';
import userRole from './userRole';
import rule from './rule';
import paySetting from './paySetting';
import myOrder from './myOrder';
import hisOrder from './hisOrder';
import currOrder from './currOrder';
import paymentLog from './paymentLog';
import todayOverview from './todayOverview';
import report from './report';
import ruleAnalysis from './ruleAnalysis';
import memberInfo from './memberInfo';
import memberRecharge from './memberRecharge';
import memberRechargeRule from './memberRechargeRule';
import memberRecord from './memberRecord';
import memberRankConfig from './memberRankConfig';
import cashierLog from './cashierLog';
import memberRefund from './memberRefund';
import memberRedemption from './memberRedemption';
import memberDelete from './memberDelete';
import memberChangeHis from './memberChangeHis';
import memberAnalysis from './memberAnalysis';
import smsSign from './smsSign';
import printSetting from './printSetting';
import basicConfig from './basicConfig';
import businessInfo from './businessInfo';
import reconciliation from './reconciliation';

const reducers = combineReducers({
    login,
    homePage,
    goodsCategory,
    childUser,
    employee,
    screen,
    goods,
    floorPlan,
    defaultPage,
    queue,
    dictionary,
    roleFunction,
    userRole,
    rule,
    paySetting,
    myOrder,
    hisOrder,
    currOrder,
    paymentLog,
    todayOverview,
    report,
    ruleAnalysis,
    memberInfo,
    memberRecharge,
    memberRechargeRule,
    memberRecord,
    memberRankConfig,
    cashierLog,
    memberRefund,
    memberRedemption,
    memberDelete,
    memberChangeHis,
    memberAnalysis,
    smsSign,
    printSetting,
    basicConfig,
    businessInfo,
    reconciliation,
})

export default reducers;