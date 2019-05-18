import { Goods } from '../utils/constants';
import requestapi from '../common/requestapi';

const list = (goods) => {
    return (dispatch, getState) => {
        dispatch({type: Goods.QUERY_GOODS_PENDING});
        return requestapi({uri: `/api/goods/list`, fetchParams: {body: goods}}).then((data) => {
            dispatch({type: Goods.QUERY_GOODS_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Goods.QUERY_GOODS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const save = (goods) => {
    return (dispatch, getState) => {
        dispatch({type: Goods.SAVE_GOODS_PENDING});
        return requestapi({uri: `/api/goods/save`, fetchParams: {headers: {}, body: goods}}).then((data) => {
            dispatch({type: Goods.SAVE_GOODS_SUCCESS, payload: data.result});
            return data.result;
        }).catch(err => {
            dispatch({type: Goods.SAVE_GOODS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const update = (goods) => {
    return (dispatch, getState) => {
        dispatch({type: Goods.UPDATE_GOODS_PENDING});
        return requestapi({uri: `/api/goods/update`, fetchParams: {headers: {}, body: goods}}).then((data) => {
            dispatch({type: Goods.UPDATE_GOODS_SUCCESS, payload: goods});
        }).catch(err => {
            dispatch({type: Goods.UPDATE_GOODS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: Goods.SELECT_GOODS_PENDING});
        return requestapi({uri: `/api/goods/get/${id}`, fetchParams: {method: 'get'}, pending: true}).then((data) => {
            dispatch({type: Goods.SELECT_GOODS_SUCCESS, payload: data.result});
        }).catch(err => {
            dispatch({type: Goods.SELECT_GOODS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteGoods = (goods) => {
    return (dispatch, getState) => {
        dispatch({type: Goods.DELETE_GOODS_PENDING});
        return requestapi({uri: `/api/goods/delete`, fetchParams: {body: goods}}).then((data) => {
            dispatch({type: Goods.DELETE_GOODS_SUCCESS, payload: goods});
        }).catch(err => {
            dispatch({type: Goods.DELETE_GOODS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Goods.CREATE_GOODS_FIELD_CHANGE, payload: values})
        );
    }
}

const resetFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Goods.CREATE_GOODS_FIELD_RESET})
        );
    }
}

const fileOnChange = (fileList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Goods.GOODS_FILE_ONCHANGE, payload: fileList})
        );
    }
}

const saleOff = (goods) => {
    return (dispatch, getState) => {
        dispatch({type: Goods.SALEOFF_GOODS_PENDING});
        return requestapi({uri: `/api/goods/saleOff`, fetchParams: {body: goods}}).then((data) => {
            dispatch({type: Goods.SALEOFF_GOODS_SUCCESS, payload: goods});
        }).catch(err => {
            dispatch({type: Goods.SALEOFF_GOODS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const queryDict = (dictCodes) => {
    return (dispatch, getState) => {
        return requestapi({uri: "/api/dict/listItems", fetchParams: {body: dictCodes}, pending: true}).then((data) => {
            dispatch({type: Goods.LIST_GOODS_DICTITEMS_SUCCESS, payload: data});
        }).catch(err => {
            throw err;
        });
    }
}

const initGoodsExtra = (goodsId) => {
    return (dispatch, getState) => {
        dispatch({type: Goods.GOODS_INIT_EXTRAS_PENDING});
        return requestapi({uri: "/api/goods/extra/init", fetchParams: {body: {id: goodsId}}}).then((data) => {
            dispatch({type: Goods.GOODS_INIT_EXTRAS_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Goods.GOODS_INIT_EXTRAS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listGoodsExtra = () => {
    return (dispatch, getState) => {
        return requestapi({uri: "/api/extra/list", pending: true}).then((data) => {
            dispatch({type: Goods.GOODS_LIST_EXTRAITEM_SUCCESS, payload: data});
        }).catch(err => {
            throw err;
        });
    }
}

const listExtraItem = (dictCode) => {
    return (dispatch, getState) => {
        return requestapi({ uri: `/api/extra/extraItem/${dictCode}`, fetchParams: { method: 'get' }, pending: true }).then((data) => {
            dispatch({ type: Goods.GOODS_LIST_EXTRAITEM_SUCCESS, payload: { dictCode, data } });
        }).catch(err => {
            throw err;
        });
    }
}

const extraUnChecked = (extraCode) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Goods.GOODS_UNCHECKED_EXTRA, payload: extraCode})
        );
    }
}

const extraChecked = (extraCode) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Goods.GOODS_CHECKED_EXTRA, payload: extraCode})
        );
    }
}

const onTabChange = (key) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Goods.GOODS_ON_TABCHANGE, payload: key})
        );
    }
}

const onPriceChange = (value, dictCode, dictItemId) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Goods.GOODS_ON_PRICECHANGE, payload: {value, dictCode, dictItemId}})
        );
    }
}

const saveExtra = (goodsId, extras) => {
    return (dispatch, getState) => {
        dispatch({type: Goods.SAVE_GOODSEXTRA_PENDING});
        return requestapi({uri: `/api/goods/saveExtra`, fetchParams: {body: extras}}).then((data) => {
            dispatch({type: Goods.SAVE_GOODSEXTRA_SUCCESS, payload: goodsId});
        }).catch(err => {
            dispatch({type: Goods.SAVE_GOODSEXTRA_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteExtra = (goodsId) => {
    return (dispatch, getState) => {
        dispatch({type: Goods.SAVE_GOODSEXTRA_PENDING});
        return requestapi({uri: `/api/goods/deleteExtra`, fetchParams: {body: {id: goodsId}}}).then((data) => {
            dispatch({type: Goods.SAVE_GOODSEXTRA_SUCCESS, payload: goodsId});
        }).catch(err => {
            dispatch({type: Goods.SAVE_GOODSEXTRA_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const removeGoodsImageFile = (uid) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Goods.GOODS_REMOVE_GOODSIMAGE_FILE, payload: {uid}})
        );
    }
}

export default {
    list,
    save,
    update,
    selectById,
    deleteGoods,
    fieldChangeValue,
    resetFields,
    fileOnChange,
    saleOff,
    queryDict,
    initGoodsExtra,
    listGoodsExtra,
    listExtraItem,
    extraUnChecked,
    extraChecked,
    onTabChange,
    onPriceChange,
    saveExtra,
    deleteExtra,
    removeGoodsImageFile,
}