import { GoodsCategory } from '../utils/constants';
import requestapi from '../common/requestapi';

const list = (category) => {
    return (dispatch, getState) => {
        dispatch({type: GoodsCategory.QUERY_CATEGORY_PENDING});
        return requestapi({uri: `/api/category/list`, fetchParams: {body: category}}).then((data) => {
            dispatch({type: GoodsCategory.QUERY_CATEGORY_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: GoodsCategory.QUERY_CATEGORY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const save = (category) => {
    return (dispatch, getState) => {
        dispatch({type: GoodsCategory.ADD_CATEGORY_PENDING});
        return requestapi({uri: `/api/category/save`, fetchParams: {body: category}}).then((data) => {
            dispatch({type: GoodsCategory.ADD_CATEGORY_SUCCESS, payload: category});
            return data.result;//id
        }).catch(err => {
            dispatch({type: GoodsCategory.ADD_CATEGORY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const update = (category) => {
    return (dispatch, getState) => {
        dispatch({type: GoodsCategory.UPDATE_CATEGORY_PENDING});
        return requestapi({uri: `/api/category/update`, fetchParams: {body: category}}).then((data) => {
            dispatch({type: GoodsCategory.UPDATE_CATEGORY_SUCCESS, payload: category});
        }).catch(err => {
            dispatch({type: GoodsCategory.UPDATE_CATEGORY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: GoodsCategory.SELECT_CATEGORY_PENDING});
        return requestapi({uri: `/api/category/get/${id}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: GoodsCategory.SELECT_CATEGORY_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: GoodsCategory.SELECT_CATEGORY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteCategory = (category) => {
    return (dispatch, getState) => {
        dispatch({type: GoodsCategory.DELETE_CATEGORY_PENDING});
        return requestapi({uri: `/api/category/delete`, fetchParams: {body: category}}).then((data) => {
            dispatch({type: GoodsCategory.DELETE_CATEGORY_SUCCESS, payload: category});
        }).catch(err => {
            dispatch({type: GoodsCategory.DELETE_CATEGORY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: GoodsCategory.CREATE_CATEGORY_FIELD_CHANGE, payload: values})
        );
    }
}

const resetFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: GoodsCategory.CREATE_CATEGORY_FIELD_RESET})
        );
    }
}

const syncPending = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: GoodsCategory.SYNC_CATEGORY_PENDING })
        );
    }
}

const syncSuccess = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: GoodsCategory.SYNC_CATEGORY_SUCCESS })
        );
    }
}

export default {
    list,
    save,
    update,
    selectById,
    deleteCategory,
    fieldChangeValue,
    resetFields,
    syncPending,
    syncSuccess,
}