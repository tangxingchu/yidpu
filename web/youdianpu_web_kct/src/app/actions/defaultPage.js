import { DefaultPage } from '../utils/constants';
import requestapi from '../common/requestapi';

/**
 * 整个action纯粹是为了把状态持久化，只要不reload页面，整个数据都还会再
 * @param {*} ip 
 */
const setLocalIp = (ip) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: DefaultPage.DEFAULT_PAGE_SET_LOCALIP, payload: ip})
        );
    }
}

const setServerStatus = (port) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: DefaultPage.DEFAULT_SET_SERVER_STATUS, payload: port})
        );
    }
}

const initSocketIo = (msg) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: DefaultPage.DEFAULT_INIT_SERVER, payload: msg})
        );
    }
}

const stopSocketIo = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: DefaultPage.DEFAULT_STOP_SERVER})
        );
    }
}

const sendLogInfo = (logInfo) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: DefaultPage.DEFAULT_SEND_LOGINFO, payload: logInfo})
        );
    }
}

const listTodayRule = () => {
    return (dispatch, getState) => {
        dispatch({type: DefaultPage.LIST_TODAY_RULE_PENDING});
        return requestapi({uri: `/api/rule/listTodayRule`}).then((data) => {
            dispatch({type: DefaultPage.LIST_TODAY_RULE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: DefaultPage.LIST_TODAY_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_QRCode = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: DefaultPage.DISPATCH_FRONT_QRCODE, payload: data })
        );
    }
}

export default {
    setLocalIp,
    setServerStatus,
    initSocketIo,
    stopSocketIo,
    sendLogInfo,
    listTodayRule,
    dispatch_QRCode,
}