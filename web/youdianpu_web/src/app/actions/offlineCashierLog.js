import { OfflineCashierLog } from '../utils/constants';
import requestapi from '../common/requestapi';

const listPayOrder = () => {
    return (dispatch, getState) => {
        dispatch({type: OfflineCashierLog.LIST_OFFLINE_PAYORDER_PENDING});
        return requestapi({uri: `/api/payOrder/listPaySucessOrder`}).then((data) => {
            dispatch({type: OfflineCashierLog.LIST_OFFLINE_PAYORDER_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: OfflineCashierLog.LIST_OFFLINE_PAYORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_cashierLog = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: OfflineCashierLog.DISPATCH_CASHIERLOG, payload: data})
        );
    }
}

const archiving = (cashierLogs) => {
    return (dispatch, getState) => {
        dispatch({type: OfflineCashierLog.ARCH_OFFLINE_PAYORDER_PENDING});
        return requestapi({uri: `/api/payOrder/archiving`, fetchParams: {body: cashierLogs}}).then((data) => {
            dispatch({type: OfflineCashierLog.ARCH_OFFLINE_PAYORDER_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: OfflineCashierLog.ARCH_OFFLINE_PAYORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    listPayOrder,
    dispatch_cashierLog,
    archiving,
}