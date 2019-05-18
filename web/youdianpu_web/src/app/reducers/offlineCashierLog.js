import createReducers from '../utils/createReducers'
import moment from 'moment';
import { OfflineCashierLog } from '../utils/constants'

const initialState  = {
    loading: false,//加载loading
    offlineCashierLogList: [],
    payOrderList: [],
    archLoading: false,
}

const offlineCashierLogHandler = {
    [OfflineCashierLog.DISPATCH_CASHIERLOG]: (state, action) => {
        return Object.assign({}, state, {offlineCashierLogList: action.payload}); 
    },
    [OfflineCashierLog.LIST_OFFLINE_PAYORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true}); 
    },
    [OfflineCashierLog.LIST_OFFLINE_PAYORDER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {loading: false, payOrderList: action.payload}); 
    },
    [OfflineCashierLog.LIST_OFFLINE_PAYORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false}); 
    },
    [OfflineCashierLog.ARCH_OFFLINE_PAYORDER_PENDING]:  (state, action) => {
        return Object.assign({}, state, {archLoading: true}); 
    },
    [OfflineCashierLog.ARCH_OFFLINE_PAYORDER_SUCCESS]:  (state, action) => {
        return Object.assign({}, state, {archLoading: false, payOrderList: [], offlineCashierLogList: []}); 
    },
    [OfflineCashierLog.ARCH_OFFLINE_PAYORDER_FAILURE]:  (state, action) => {
        return Object.assign({}, state, {archLoading: false}); 
    },
}

export default createReducers(initialState, offlineCashierLogHandler);