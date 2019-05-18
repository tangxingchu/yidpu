import { MenuFunc } from '../utils/constants';
import requestapi from '../common/requestapi';

const listFunctionTree = (category) => {
    return (dispatch, getState) => {
        dispatch({type: MenuFunc.LIST_FUNC_TREE_PENDING});
        return requestapi({uri: `/api/function/tree/${category}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: MenuFunc.LIST_FUNC_TREE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MenuFunc.LIST_FUNC_TREE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MenuFunc.FIELD_CHANGE, payload: values})
        );
    }
}

const addFunction = (item) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MenuFunc.ADD_FUNCTION, payload: item})
        );
    }
}

const saveFunction = (func) => {
    return (dispatch, getState) => {
        dispatch({type: MenuFunc.SAVE_FUNCTION_PENDING});
        return requestapi({uri: "/api/function/save", fetchParams: {body: func}}).then((data) => {
            dispatch({type: MenuFunc.SAVE_FUNCTION_SUCCESS, payload: func});
        }).catch(err => {
            dispatch({type: MenuFunc.SAVE_FUNCTION_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MenuFunc.SELECT_FUNCTION_PENDING});
        return requestapi({uri: `/api/function/get/${id}`, fetchParams: {method: 'get'}, pending: true}).then((data) => {
            dispatch({type: MenuFunc.SELECT_FUNCTION_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MenuFunc.SELECT_FUNCTION_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const updateFunction = (func) => {
    return (dispatch, getState) => {
        dispatch({type: MenuFunc.UPDATE_FUNCTION_PENDING});
        return requestapi({uri: "/api/function/update", fetchParams: {body: func}}).then((data) => {
            dispatch({type: MenuFunc.UPDATE_FUNCTION_SUCCESS, payload: func});
        }).catch(err => {
            dispatch({type: MenuFunc.UPDATE_FUNCTION_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteFunction = (id) => {
    return (dispatch, getState) => {
        return requestapi({uri: "/api/function/delete", fetchParams: {body: {id}}, pending: true}).then((data) => {
            dispatch({type: MenuFunc.DELETE_FUNCTION_SUCCESS, payload: id});
        }).catch(err => {
            throw err;
        });
    }
}

const queryDict = (dictCodes) => {
    return (dispatch, getState) => {
        return requestapi({uri: "/api/dict/listItems", fetchParams: {body: dictCodes}, pending: true}).then((data) => {
            dispatch({type: MenuFunc.LIST_DICTITEMS_SUCCESS, payload: data});
        }).catch(err => {
            throw err;
        });
    }
}

export default {
    listFunctionTree,
    fieldChangeValue,
    addFunction,
    saveFunction,
    selectById,
    updateFunction,
    deleteFunction,
    queryDict,
}