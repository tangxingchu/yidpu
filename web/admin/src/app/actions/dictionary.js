import { Dictionary } from '../utils/constants';
import requestapi from '../common/requestapi';

const queryDictionary = (dictCode, dictName) => {
    return (dispatch, getState) => {
        // return fetch
        dispatch({type: Dictionary.QUERY_DICTIONARY_PENDING});
        return requestapi({uri: "/api/dict/list", fetchParams: {body: {dictCode, dictName}}}).then((data) => {
            dispatch({type: Dictionary.QUERY_DICTIONARY_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Dictionary.QUERY_DICTIONARY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const addDictionary = (dict) => {
    return (dispatch, getState) => {
        dispatch({type: Dictionary.ADD_DICTIONARY_PENDING});
        return requestapi({uri: "/api/dict/save", fetchParams: {body: dict}}).then((data) => {
            dispatch({type: Dictionary.ADD_DICTIONARY_SUCCESS, payload: dict});
        }).catch(err => {
            dispatch({type: Dictionary.ADD_DICTIONARY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteDict = (id) => {
    return (dispatch, getState) => {
        dispatch({type: Dictionary.DELETE_DICTIONARY_PENDING});
        return requestapi({uri: "/api/dict/delete", fetchParams: {body: {id}}}).then((data) => {
            dispatch({type: Dictionary.DELETE_DICTIONARY_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: Dictionary.DELETE_DICTIONARY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const updateDict = (dict) => {
    return (dispatch, getState) => {
        dispatch({type: Dictionary.UPDATE_DICTIONARY_PENDING});
        return requestapi({uri: "/api/dict/update", fetchParams: {body: dict},}).then((data) => {
            dispatch({type: Dictionary.UPDATE_DICTIONARY_SUCCESS, payload: dict});
        }).catch(err => {
            dispatch({type: Dictionary.UPDATE_DICTIONARY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectById = (id) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/dict/list/${id}`, fetchParams: {method: 'get'}, pending: true}).then((data) => {
            dispatch({type: Dictionary.SELECT_DICTIONARY_SUCCESS, payload: data});
        }).catch(err => {
            throw err;
        });
    }
}

const createFormfieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Dictionary.CREATE_FIELD_CHANGE, payload: values})
        );
    }
}

const listItem = (dictCode) => {
    return (dispatch, getState) => {
        dispatch({type: Dictionary.SELECT_ITEMS_PENDING});
        return requestapi({uri: `/api/dict/listItem/${dictCode}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: Dictionary.SELECT_ITEMS_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Dictionary.SELECT_ITEMS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const addItemRow = (rowData) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Dictionary.ADD_ITEM_ROW, payload: rowData})
        );
    }
}

const removeItemRow = (id) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Dictionary.REMOVE_ITEM_ROW, payload: id})
        );
    }
}

const addDictItem = (dictItem) => {
    return (dispatch, getState) => {
        dispatch({type: Dictionary.ADD_ITEM_PENDING});
        return requestapi({uri: "/api/dictItem/save", fetchParams: {body: dictItem}}).then((data) => {
            dispatch({type: Dictionary.ADD_ITEM_SUCCESS, payload: dictItem});
        }).catch(err => {
            dispatch({type: Dictionary.ADD_ITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const updateDictItem = (dictItem) => {
    return (dispatch, getState) => {
        dispatch({type: Dictionary.UPDATE_ITEM_PENDING});
        return requestapi({uri: "/api/dictItem/update", fetchParams: {body: dictItem}}).then((data) => {
            dispatch({type: Dictionary.UPDATE_ITEM_SUCCESS, payload: dictItem});
        }).catch(err => {
            dispatch({type: Dictionary.UPDATE_ITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteDictItem = (id) => {
    return (dispatch, getState) => {
        dispatch({type: Dictionary.DELETE_ITEM_PENDING});
        return requestapi({uri: "/api/dictItem/delete", fetchParams: {body: {id}}}).then((data) => {
            dispatch({type: Dictionary.DELETE_ITEM_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: Dictionary.DELETE_ITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}



export default {
    queryDictionary,
    addDictionary,
    deleteDict,
    updateDict,
    selectById,
    createFormfieldChangeValue,
    listItem,
    addItemRow,
    removeItemRow,
    addDictItem,
    updateDictItem,
    deleteDictItem,
}