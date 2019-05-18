import createReducers from '../utils/createReducers'
import moment from 'moment';
import { PaymentLog } from '../utils/constants'

const initialState  = {
    loading: false,//加载loading
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    paymentLogList: [],//移动支付日志列表
    searchCondition: {orderNo: "", payNo: "", payMethod: "", logType: "", payTime: [moment().startOf('day'), moment().endOf('day')]},
    searchFormData: {orderNo: {value: ""}, payNo: {value: ""}, payMethod: {value: ""}, logType: {value: ""}, payTime: {value: [moment().startOf('day'), moment().endOf('day')]}},
}

const paymentLogHandler = {
    //查询移动支付日志
    [PaymentLog.LIST_PAYMENTLOG_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [PaymentLog.LIST_PAYMENTLOG_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {loading: false, total: totalNum, pageSize, currentPage, paymentLogList: items,});
    },
    [PaymentLog.LIST_PAYMENTLOG_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [PaymentLog.PAYMENTLOG_SEARCHFORM_CHANGE]: (state, action) => {
        const searchFormData = {...state.searchFormData, ...action.payload};
        return Object.assign({}, state, { searchFormData });
    },
    [PaymentLog.PAYMENTLOG_SEARCHFORM_RESET]: (state, action) => {
        const searchFormData = initialState.searchFormData;
        return Object.assign({}, state, {searchFormData, searchCondition: initialState.searchCondition});
    },
    //处理查询条件
    [PaymentLog.PAYMENTLOG_HANDLE_SEARCH]: (state, action) => {
        return Object.assign({}, state, {searchCondition: {...action.payload}});
    },
}

export default createReducers(initialState, paymentLogHandler);