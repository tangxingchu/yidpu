import { Home } from '../utils/constants';
import requestapi from '../common/requestapi';

const listTodayRule = () => {
    return (dispatch, getState) => {
        dispatch({type: Home.TODAY_RULE_PENDING});
        return requestapi({uri: `/api/waiter/listTodayRule`}).then((data) => {
            dispatch({type: Home.TODAY_RULE_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: Home.TODAY_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_socketStatus = (msg, styleName) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Home.DISPATCH_SOCKETSTATUS_SUCCESS, payload: {msg, styleName}})
        );
    }
}

const selectCurrMerchantInfo = () => {
    return (dispatch, getState) => {
        dispatch({type: Home.SELECT_CURRENT_MERCHANT_PENDING});
        return requestapi({uri: `/api/merchant/selectBasicInfo`}).then(merchantUser => {
            dispatch({type: Home.SELECT_CURRENT_MERCHANT_SUCCESS, payload: merchantUser});
        }).catch(err => {
            dispatch({type: Home.SELECT_CURRENT_MERCHANT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    listTodayRule,
    dispatch_socketStatus,
    selectCurrMerchantInfo,
}