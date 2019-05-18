import createReducers from '../utils/createReducers'
import moment from 'moment';
import { MemberAnalysis } from '../utils/constants'

const initialState = {
    initLoading: false,//初始化loading
    data: {},//数据
    memberNewDate: [moment().subtract(1, 'month'), moment().subtract(1, 'day')],//初始化时间
    memberRechargeDate: [moment().subtract(1, 'month'), moment().subtract(1, 'day')],//初始化时间
    memberRechargeLoading: false,
    memberNewLoading: false,
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    memberRankList: [],//会员消费排行榜数据
    memberRankLoading: false,//会员消费排行榜loading
}

const memberAnalysisHandler = {
    //初始化loading
    [MemberAnalysis.INIT_MEMBERANALYSIS_PENDING]: (state, action) => {
        return Object.assign({}, state, {initLoading: true});
    },
    [MemberAnalysis.INIT_MEMBERANALYSIS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {initLoading: false, data: action.payload});
    },
    [MemberAnalysis.INIT_MEMBERANALYSIS_FAILURE]: (state, action) => {
        return Object.assign({}, state, {initLoading: false});
    },
    //会员新增日期变更
    [MemberAnalysis.REPORT_ON_MEMBERNEWDATE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {memberNewDate: action.payload});
    },
    //会员消费日期变更
    [MemberAnalysis.REPORT_ON_MEMBERRECHARGEDATE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {memberRechargeDate: action.payload});
    },
    //会员消费分析
    [MemberAnalysis.REPORT_MEMBER_RECHARGE_PENDING]: (state, action) => {
        return Object.assign({}, state, {memberRechargeLoading: true});
    },
    [MemberAnalysis.REPORT_MEMBER_RECHARGE_SUCCESS]: (state, action) => {
        const data = action.payload;
        const newData = {...state.data, ...data};
        return Object.assign({}, state, {memberRechargeLoading: false, data: newData});
    },
    [MemberAnalysis.REPORT_MEMBER_RECHARGE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {memberRechargeLoading: false});
    },
    //新入会员分析
    [MemberAnalysis.REPORT_MEMBER_NEW_PENDING]: (state, action) => {
        return Object.assign({}, state, {memberNewLoading: true});
    },
    [MemberAnalysis.REPORT_MEMBER_NEW_SUCCESS]: (state, action) => {
        const memberNewDatas = action.payload;
        const newData = {...state.data, memberNewDatas: memberNewDatas};
        return Object.assign({}, state, {memberNewLoading: false, data: newData});
    },
    [MemberAnalysis.REPORT_MEMBER_NEW_FAILURE]: (state, action) => {
        return Object.assign({}, state, {memberNewLoading: false});
    },
    //会员消费排行榜
    [MemberAnalysis.LIST_MEMBERRANK_PENDING]: (state, action) => {
        return Object.assign({}, state, {memberRankLoading: true});
    },
    [MemberAnalysis.LIST_MEMBERRANK_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {memberRankLoading: false, memberRankList: items, pageSize, total: totalNum, currentPage});
    },
    [MemberAnalysis.LIST_MEMBERRANK_FAILURE]: (state, action) => {
        return Object.assign({}, state, {memberRankLoading: false});
    },
}

export default createReducers(initialState, memberAnalysisHandler);