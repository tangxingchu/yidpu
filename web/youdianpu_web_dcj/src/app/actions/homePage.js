import { HomePage } from '../utils/constants';
import requestapi from '../common/requestapi';

const getMenuData = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/menu`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: HomePage.SELECT_MENU_SUCCESS, payload: data || []});
        }).catch(err => {
            throw err;
        });
    }
}

const dispatchMenuData = (menuData) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HomePage.SELECT_MENU_SUCCESS, payload: menuData})
        );
    }
}

const getSrvStatus = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/common/status`, fetchParams: {method: 'post'}}).then((data) => {
            return data;
        }).catch(err => {
            throw err;
        });
    }
}

/** 查询服务端最新版本信息 **/
const getLastVersion = (appType) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.GET_LAST_VERSION_PENDING})
        return requestapi({uri: `/api/version/getLastVersion/${appType}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: HomePage.GET_LAST_VERSION_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.GET_LAST_VERSION_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectCurrMerchantInfo = () => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.SELECT_CURRENT_MERCHANT_PENDING});
        return requestapi({uri: `/api/merchant/selectBasicInfo`}).then(merchantUser => {
            dispatch({type: HomePage.SELECT_CURRENT_MERCHANT_SUCCESS, payload: merchantUser});
        }).catch(err => {
            dispatch({type: HomePage.SELECT_CURRENT_MERCHANT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const refreshToken = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/refreshToken`}).then(token => {
            window.localStorage.setItem("Authorization", token);
        }).catch(err => {
            throw err;
        });
    }
}

export default {
    getMenuData,
    dispatchMenuData,
    getSrvStatus,
    getLastVersion,
    selectCurrMerchantInfo,
    refreshToken,
}