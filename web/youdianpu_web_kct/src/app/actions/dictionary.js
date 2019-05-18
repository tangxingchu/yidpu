import { Dictionary } from '../utils/constants';
import requestapi from '../common/requestapi';

const listDict = (dict) => {
    return (dispatch, getState) => {
        dispatch({ type: Dictionary.QUERY_DICT_PENDING });
        return requestapi({ uri: `/api/dict/list`, fetchParams: { body: dict }, pending: true }).then((data) => {
            dispatch({ type: Dictionary.QUERY_DICT_SUCCESS, payload: data });
        }).catch(err => {
            dispatch({ type: Dictionary.QUERY_DICT_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const listItem = (dictCode) => {
    return (dispatch, getState) => {
        dispatch({ type: Dictionary.QUERY_DICTITEM_PENDING });
        return requestapi({ uri: `/api/dict/listItem/${dictCode}`, fetchParams: { method: 'get' } }).then((data) => {
            dispatch({ type: Dictionary.QUERY_DICTITEM_SUCCESS, payload: { dictCode, data } });
        }).catch(err => {
            dispatch({ type: Dictionary.QUERY_DICTITEM_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const saveExtra = (extra) => {
    return (dispatch, getState) => {
        dispatch({ type: Dictionary.SAVE_EXTRA_PENDING });
        return requestapi({ uri: `/api/dict/save`, fetchParams: { body: extra } }).then((data) => {
            extra.id = data.result;
            extra.enabled = "1";
            dispatch({ type: Dictionary.SAVE_EXTRA_SUCCESS, payload: extra });
            return extra;
        }).catch(err => {
            dispatch({ type: Dictionary.SAVE_EXTRA_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const updateExtra = (extra) => {
    return (dispatch, getState) => {
        dispatch({ type: Dictionary.UPDATE_EXTRA_PENDING });
        return requestapi({ uri: `/api/dict/update`, fetchParams: { body: extra } }).then((data) => {
            dispatch({ type: Dictionary.UPDATE_EXTRA_SUCCESS, payload: extra });
        }).catch(err => {
            dispatch({ type: Dictionary.UPDATE_EXTRA_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const selectExtraById = (id) => {
    return (dispatch, getState) => {
        return requestapi({ uri: `/api/dict/get/${id}`, fetchParams: { method: 'get' }, pending: true }).then((data) => {
            dispatch({ type: Dictionary.SELECT_EXTRA_SUCCESS, payload: data });
        }).catch(err => {
            throw err;
        });
    }
}

const deleteExtra = (extra) => {
    return (dispatch, getState) => {
        return requestapi({ uri: `/api/dict/delete`, fetchParams: { body: extra }, pending: true }).then((data) => {
            dispatch({ type: Dictionary.DELETE_EXTRA_SUCCESS, payload: extra });
        }).catch(err => {
            throw err;
        });
    }
}

const saveItem = (dictItem) => {
    return (dispatch, getState) => {
        dispatch({ type: Dictionary.SAVE_DICTITEM_PENDING });
        return requestapi({ uri: `/api/dictItem/save`, fetchParams: { body: dictItem } }).then((data) => {
            dictItem.id = data.result;
            dictItem.enabled = "1";
            dispatch({ type: Dictionary.SAVE_DICTITEM_SUCCESS, payload: dictItem });
        }).catch(err => {
            dispatch({ type: Dictionary.SAVE_DICTITEM_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const updateItem = (dictItem) => {
    return (dispatch, getState) => {
        dispatch({ type: Dictionary.UPDATE_DICTITEM_PENDING });
        return requestapi({ uri: `/api/dictItem/update`, fetchParams: { body: dictItem } }).then((data) => {
            dispatch({ type: Dictionary.UPDATE_DICTITEM_SUCCESS, payload: dictItem });
        }).catch(err => {
            dispatch({ type: Dictionary.UPDATE_DICTITEM_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const deleteItem = (dictItem) => {
    return (dispatch, getState) => {
        return requestapi({ uri: `/api/dictItem/delete`, fetchParams: { body: dictItem }, pending: true }).then((data) => {
            dispatch({ type: Dictionary.DELETE_DICTITEM_SUCCESS, payload: dictItem });
        }).catch(err => {
            throw err;
        });
    }
}

const selectItemById = (id) => {
    return (dispatch, getState) => {
        return requestapi({ uri: `/api/dictItem/get/${id}`, fetchParams: { method: 'get' }, pending: true }).then((data) => {
            dispatch({ type: Dictionary.SELECT_DICTITEM_SUCCESS, payload: data });
        }).catch(err => {
            throw err;
        });
    }
}

const onDictTreeSelect = (selectedKeys) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Dictionary.ON_DICT_TREE_SELECT, payload: selectedKeys })
        );
    }
}

const onExtraTreeSelect = (selectedKeys) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Dictionary.ON_EXTRA_TREE_SELECT, payload: selectedKeys })
        );
    }
}

const extraFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Dictionary.CREATE_EXTRA_FIELD_CHANGE, payload: values })
        );
    }
}

const resetExtraFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Dictionary.CREATE_EXTRA_FIELD_RESET })
        );
    }
}

const itemFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Dictionary.CREATE_DICTITEM_FIELD_CHANGE, payload: values })
        );
    }
}

const resetItemFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Dictionary.CREATE_DICTITEM_FIELD_RESET })
        );
    }
}

const syncDictItemPending = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Dictionary.SYNC_DICTITEM_PENDING })
        );
    }
}

const syncDictItemSuccess = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Dictionary.SYNC_DICTITEM_SUCCESS })
        );
    }
}

export default {
    listDict,
    listItem,
    saveExtra,
    updateExtra,
    selectExtraById,
    deleteExtra,
    saveItem,
    updateItem,
    selectItemById,
    deleteItem,
    onDictTreeSelect,
    onExtraTreeSelect,
    extraFieldChangeValue,
    resetExtraFields,
    itemFieldChangeValue,
    resetItemFields,
    syncDictItemPending,
    syncDictItemSuccess,
}