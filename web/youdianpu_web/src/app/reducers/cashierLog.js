import createReducers from '../utils/createReducers'
import moment from 'moment';
import { CashierLog } from '../utils/constants'

const initialState  = {
    loading: false,//加载loading
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    cashierLogList: [],//收银退款列表
    searchCondition: {orderNo: "", cashierMethod: "", cashierType: "", cashierTime: [moment().startOf('day'), moment().endOf('day')], tableCode: ""},
    searchFormData: {orderNo: {value: ""}, cashierMethod: {value: ""}, cashierType: {value: ""}, 
        cashierTime: {value: [moment().startOf('day'), moment().endOf('day')]}, tableCode: {value: ""}},
}

const cashierLogHandler = {
    //查询收银、退款日志流水
    [CashierLog.LIST_CASHIERLOG_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [CashierLog.LIST_CASHIERLOG_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {loading: false, total: totalNum, pageSize, currentPage, cashierLogList: items,});
    },
    [CashierLog.LIST_CASHIERLOG_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [CashierLog.CASHIERLOG_SEARCHFORM_CHANGE]: (state, action) => {
        const searchFormData = {...state.searchFormData, ...action.payload};
        return Object.assign({}, state, { searchFormData });
    },
    [CashierLog.CASHIERLOG_SEARCHFORM_RESET]: (state, action) => {
        const searchFormData = initialState.searchFormData;
        return Object.assign({}, state, {searchFormData, searchCondition: initialState.searchCondition});
    },
    //处理查询条件
    [CashierLog.CASHIERLOG_HANDLE_SEARCH]: (state, action) => {
        return Object.assign({}, state, {searchCondition: {...action.payload}});
    },
    //打印小票
    [CashierLog.SELECT_PRINTCASHIER_PENDING]:  (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [CashierLog.SELECT_PRINTCASHIER_SUCCESS]:  (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [CashierLog.SELECT_PRINTCASHIER_FAILURE]:  (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
}

export default createReducers(initialState, cashierLogHandler);