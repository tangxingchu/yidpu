import { Reconciliation } from '../utils/constants';
import requestapi from '../common/requestapi';


const reportReconciliationTotal = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: Reconciliation.LIST_RECONCILIATION_TOTAL_PENDING});
        return requestapi({uri: `/api/report/reportReconciliationTotal`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: Reconciliation.LIST_RECONCILIATION_TOTAL_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Reconciliation.LIST_RECONCILIATION_TOTAL_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const reportReconciliation = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: Reconciliation.LIST_RECONCILIATION_PENDING});
        return requestapi({uri: `/api/report/reportReconciliation`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: Reconciliation.LIST_RECONCILIATION_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Reconciliation.LIST_RECONCILIATION_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询表单change事件
const onSearchFromFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Reconciliation.RECONCILIATION_SEARCHFORM_CHANGE, payload: values})
        );
    }
}

//重置查询表单
const resetSearchFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Reconciliation.RECONCILIATION_SEARCHFORM_RESET})
        );
    }
}

//处理查询条件
const handleSearch = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Reconciliation.RECONCILIATION_HANDLE_SEARCH, payload: values})
        );
    }
}

export default {
    reportReconciliationTotal,
    reportReconciliation,
    onSearchFromFieldChangeValue,
    resetSearchFormFields,
    handleSearch,
}