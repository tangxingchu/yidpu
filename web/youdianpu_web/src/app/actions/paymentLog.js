import { PaymentLog } from '../utils/constants';
import requestapi from '../common/requestapi';

//加载当前用餐订单列表
const list = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: PaymentLog.LIST_PAYMENTLOG_PENDING});
        return requestapi({uri: `/api/paymentLog/list`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: PaymentLog.LIST_PAYMENTLOG_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: PaymentLog.LIST_PAYMENTLOG_FAILURE, payload: err.message});
            throw err;
        });
    }
}
//查询表单change事件
const onSearchFromFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaymentLog.PAYMENTLOG_SEARCHFORM_CHANGE, payload: values})
        );
    }
}

//重置查询表单
const resetSearchFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaymentLog.PAYMENTLOG_SEARCHFORM_RESET})
        );
    }
}

//处理查询条件
const handleSearch = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaymentLog.PAYMENTLOG_HANDLE_SEARCH, payload: values})
        );
    }
}

export default {
    list,
    onSearchFromFieldChangeValue,
    resetSearchFormFields,
    handleSearch,
}