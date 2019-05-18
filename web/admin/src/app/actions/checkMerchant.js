import { CheckMerchant } from '../utils/constants';
import requestapi from '../common/requestapi';

const list = () => {
    return (dispatch, getState) => {
        dispatch({type: CheckMerchant.SELECT_CHECKMERCHANT_PENDING});
        return requestapi({uri: "/api/merchant/listUnChecked"}).then((data) => {
            dispatch({type: CheckMerchant.SELECT_CHECKMERCHANT_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: CheckMerchant.SELECT_CHECKMERCHANT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: CheckMerchant.SELECT_MERCHANT_DETAIL_PENDING});
        return requestapi({uri: `/api/merchant/${id}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: CheckMerchant.SELECT_MERCHANT_DETAIL_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: CheckMerchant.SELECT_MERCHANT_DETAIL_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const formFieldChangeValue = (values) => {

}

const getLonLat = (address) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/getLonLat/${encodeURIComponent(address)}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: CheckMerchant.GET_LONLAT_SUCCESS, payload: data.result});
            return data.result;
        }).catch(err => {
            throw err;
        });
    }
}

const checkMerchant = (auditMsg) => {
    return (dispatch, getState) => {
        dispatch({type: CheckMerchant.CHECK_MERCHANT_DETAIL_PENDING});
        return requestapi({uri: `/api/merchant/check`, fetchParams: {body: auditMsg}}).then((data) => {
            dispatch({type: CheckMerchant.CHECK_MERCHANT_DETAIL_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: CheckMerchant.CHECK_MERCHANT_DETAIL_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const updateMerchantExp = (merchantId) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/merchant/updateMerchantExp/${merchantId}`, fetchParams: {method: 'get'}}).then((data) => {
            return data;
        }).catch(err => {
            throw err;
        });
    }
}

const listAuditHis = (merchantId) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/merchant/listAuditHis/${merchantId}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: CheckMerchant.LIST_AUDIT_HIS_SUCCESS, payload: data});
        }).catch(err => {
            throw err;
        });
    }
}

const getYYZZImageBlob = ({merchantId, filePath}) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/merchant/yyzz/preview/${merchantId}${filePath}`, fetchParams: {method: "get"}, respType: 'blob'}).then((data) => {
            dispatch({type: CheckMerchant.GET_MERCHANT_YYZZ_IMAGE, payload: {info: {merchantId, filePath}, data}});
        }).catch(err => {
            throw err;
        });
    }
}

const listUserChangeHis = (merchantId) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/merchant/listUserChangeHis/${merchantId}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: CheckMerchant.LIST_USERCHANGE_HIS_SUCCESS, payload: data});
        }).catch(err => {
            throw err;
        });
    }
}

const checkMerchantChange = (auditMsg) => {
    return (dispatch, getState) => {
        dispatch({type: CheckMerchant.CHECK_MERCHANT_CHANGE_PENDING});
        return requestapi({uri: `/api/merchant/checkMerchantChange`, fetchParams: {body: auditMsg}}).then((data) => {
            dispatch({type: CheckMerchant.CHECK_MERCHANT_CHANGE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: CheckMerchant.CHECK_MERCHANT_CHANGE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    list,
    selectById,
    formFieldChangeValue,
    getLonLat,
    checkMerchant,
    updateMerchantExp,
    listAuditHis,
    getYYZZImageBlob,
    listUserChangeHis,
    checkMerchantChange,
}