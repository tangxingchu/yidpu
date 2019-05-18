import { CashierLog } from '../utils/constants';
import requestapi from '../common/requestapi';

//加载收银日志列表
const list = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: CashierLog.LIST_CASHIERLOG_PENDING});
        return requestapi({uri: `/api/cashierLog/list`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: CashierLog.LIST_CASHIERLOG_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: CashierLog.LIST_CASHIERLOG_FAILURE, payload: err.message});
            throw err;
        });
    }
}
//查询表单change事件
const onSearchFromFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CashierLog.CASHIERLOG_SEARCHFORM_CHANGE, payload: values})
        );
    }
}

//重置查询表单
const resetSearchFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CashierLog.CASHIERLOG_SEARCHFORM_RESET})
        );
    }
}

//处理查询条件
const handleSearch = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CashierLog.CASHIERLOG_HANDLE_SEARCH, payload: values})
        );
    }
}

//打印收银小票
const selectPrintCashier = (orderNo) => {
    return (dispatch, getState) => {
        dispatch({type: CashierLog.SELECT_PRINTCASHIER_PENDING});
        return requestapi({uri: `/api/cashierLog/selectPrintCashier`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}`,
        }}).then((data) => {
            dispatch({type: CashierLog.SELECT_PRINTCASHIER_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: CashierLog.SELECT_PRINTCASHIER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    list,
    onSearchFromFieldChangeValue,
    resetSearchFormFields,
    handleSearch,
    selectPrintCashier,
}