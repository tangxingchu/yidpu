import { BasicConfig } from '../utils/constants';
import requestapi from '../common/requestapi';

const update = (basicConfig) => {
    return (dispatch, getState) => {
        dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_PENDING, payload: basicConfig});
        return requestapi({uri: `/api/config/update`, fetchParams: {body: basicConfig}}).then((data) => {
            dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_SUCCESS, payload: basicConfig});
        }).catch(err => {
            dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_FAILURE, payload: basicConfig});
            throw err;
        });
    }
}

const update09 = (basicConfig) => {
    return (dispatch, getState) => {
        dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_PENDING, payload: basicConfig});
        return requestapi({uri: `/api/config/update09`, fetchParams: {body: basicConfig}}).then((data) => {
            dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_SUCCESS, payload: basicConfig});
        }).catch(err => {
            dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_FAILURE, payload: basicConfig});
            throw err;
        });
    }
}

const update10 = (basicConfig) => {
    return (dispatch, getState) => {
        dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_PENDING, payload: basicConfig});
        return requestapi({uri: `/api/config/update10`, fetchParams: {body: basicConfig}}).then((data) => {
            dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_SUCCESS, payload: basicConfig});
        }).catch(err => {
            dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_FAILURE, payload: basicConfig});
            throw err;
        });
    }
}

const update12 = (basicConfig) => {
    return (dispatch, getState) => {
        dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_PENDING, payload: basicConfig});
        return requestapi({uri: `/api/config/update12`, fetchParams: {body: basicConfig}}).then((data) => {
            dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_SUCCESS, payload: basicConfig});
        }).catch(err => {
            dispatch({type: BasicConfig.UPDATE_BASIC_CONFIG_FAILURE, payload: basicConfig});
            throw err;
        });
    }
}


const list = () => {
    return (dispatch, getState) => {
        dispatch({type: BasicConfig.LIST_BASIC_CONFIG_PENDING});
        return requestapi({uri: `/api/config/listBasicConfig`}).then((data) => {
            dispatch({type: BasicConfig.LIST_BASIC_CONFIG_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: BasicConfig.LIST_BASIC_CONFIG_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listBusiness = () => {
    return (dispatch, getState) => {
        dispatch({type: BasicConfig.LIST_BUSINESS_CONFIG_PENDING});
        return requestapi({uri: `/api/config/listBusinessConfig`}).then((data) => {
            dispatch({type: BasicConfig.LIST_BUSINESS_CONFIG_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: BasicConfig.LIST_BUSINESS_CONFIG_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const syncPending = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: BasicConfig.SYNC_BASIC_CONFIG_PENDING })
        );
    }
}

const syncSuccess = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: BasicConfig.SYNC_BASIC_CONFIG_SUCCESS })
        );
    }
}

export default {
    update,
    update09,
    update10,
    update12,
    syncPending,
    syncSuccess,
    list,
    listBusiness,
}