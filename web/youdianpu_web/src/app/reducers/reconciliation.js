import createReducers from '../utils/createReducers'
import moment from 'moment';
import { Reconciliation } from '../utils/constants'

const initialState = {
    detailLoading: false,
    totalLaoding: false,//初始化loading
    totalDataList: [],//数据
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    detailDataList: [],//数据
    searchCondition: {payMethod: "", payTime: [moment().subtract(1, 'day').startOf('day'), moment().subtract(1, 'day').endOf('day')]},
    searchFormData: {payMethod: {value: ""}, payTime: {value: [moment().subtract(1, 'day').startOf('day'), moment().subtract(1, 'day').endOf('day')]}},
}

const reconciliationHandler = {
    [Reconciliation.RECONCILIATION_SEARCHFORM_CHANGE]: (state, action) => {
        const searchFormData = {...state.searchFormData, ...action.payload};
        return Object.assign({}, state, { searchFormData });
    },
    [Reconciliation.RECONCILIATION_SEARCHFORM_RESET]: (state, action) => {
        const searchFormData = initialState.searchFormData;
        return Object.assign({}, state, {searchFormData, searchCondition: initialState.searchCondition});
    },
    //处理查询条件
    [Reconciliation.RECONCILIATION_HANDLE_SEARCH]: (state, action) => {
        return Object.assign({}, state, {searchCondition: {...action.payload}});
    },
    //查询汇总
    [Reconciliation.LIST_RECONCILIATION_TOTAL_PENDING]: (state, action) => {
        return Object.assign({}, state, {totalLaoding: true, totalDataList: [], detailDataList: []});
    },
    [Reconciliation.LIST_RECONCILIATION_TOTAL_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {totalLaoding: false, totalDataList: action.payload,
            pageSize: initialState.pageSize, total: initialState.total, currentPage: initialState.currentPage});
    },
    [Reconciliation.LIST_RECONCILIATION_TOTAL_FAILURE]: (state, action) => {
        return Object.assign({}, state, {totalLaoding: false});
    },
    //查询明细
    [Reconciliation.LIST_RECONCILIATION_PENDING]: (state, action) => {
        return Object.assign({}, state, {detailLoading: true});
    },
    [Reconciliation.LIST_RECONCILIATION_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {detailLoading: false, pageSize, detailDataList: items, total: totalNum, currentPage});
    },
    [Reconciliation.LIST_RECONCILIATION_FAILURE]: (state, action) => {
        return Object.assign({}, state, {detailLoading: false});
    },
}

export default createReducers(initialState, reconciliationHandler);