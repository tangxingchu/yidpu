import { Screen } from '../utils/constants';
import requestapi from '../common/requestapi';

const list = (screen) => {
    return (dispatch, getState) => {
        dispatch({type: Screen.QUERY_SCREEN_PENDING});
        return requestapi({uri: `/api/floor/list`, fetchParams: {body: screen}}).then((data) => {
            dispatch({type: Screen.QUERY_SCREEN_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: Screen.QUERY_SCREEN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_screen = (screen) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Screen.QUERY_SCREEN_SUCCESS, payload: screen})
        );
    }
}

const save = (screen) => {
    return (dispatch, getState) => {
        dispatch({type: Screen.SAVE_SCREEN_PENDING});
        return requestapi({uri: `/api/floor/save`, fetchParams: {body: screen}}).then((data) => {
            dispatch({type: Screen.SAVE_SCREEN_SUCCESS, payload: screen});
            return data.result;//id
        }).catch(err => {
            dispatch({type: Screen.SAVE_SCREEN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const update = (screen) => {
    return (dispatch, getState) => {
        dispatch({type: Screen.UPDATE_SCREEN_PENDING});
        return requestapi({uri: `/api/floor/update`, fetchParams: {body: screen}}).then((data) => {
            dispatch({type: Screen.UPDATE_SCREEN_SUCCESS, payload: screen});
        }).catch(err => {
            dispatch({type: Screen.UPDATE_SCREEN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: Screen.SELECT_SCREEN_PENDING});
        return requestapi({uri: `/api/floor/get/${id}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: Screen.SELECT_SCREEN_SUCCESS, payload: data.result});
        }).catch(err => {
            dispatch({type: Screen.SELECT_SCREEN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteScreen = (screen) => {
    return (dispatch, getState) => {
        dispatch({type: Screen.DELETE_SCREEN_PENDING});
        return requestapi({uri: `/api/floor/delete`, fetchParams: {body: screen}}).then((data) => {
            dispatch({type: Screen.DELETE_SCREEN_SUCCESS, payload: screen});
        }).catch(err => {
            dispatch({type: Screen.DELETE_SCREEN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Screen.CREATE_SCREEN_FIELD_CHANGE, payload: values})
        );
    }
}

const resetFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Screen.CREATE_SCREEN_FIELD_RESET})
        );
    }
}

const getXmlById = (id) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/floorPlan/open/${id}`, fetchParams: {method: "get"}, respType: 'text', pending: true}).then((data) => {
            return data;
        }).catch(err => {
            throw err;
        });
    }
}

const copy = (sourceFloorId, targetFloorId) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/floor/copy`, fetchParams: {method: "post", 
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: `sourceFloorId=${sourceFloorId}&targetFloorId=${targetFloorId}`}, pending: true}).then((data) => {
                
        }).catch(err => {
            throw err;
        });
    }
}

const syncPending = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Screen.SYNC_SCREEN_PENDING })
        );
    }
}

const syncSuccess = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Screen.SYNC_SCREEN_SUCCESS })
        );
    }
}

export default {
    list,
    dispatch_screen,
    save,
    update,
    selectById,
    deleteScreen,
    fieldChangeValue,
    resetFields,
    getXmlById,
    copy,
    syncPending,
    syncSuccess,
}