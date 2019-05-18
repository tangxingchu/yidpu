import { ChildUser } from '../utils/constants';
import requestapi from '../common/requestapi';

const list = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: ChildUser.QUERY_CHILDUSER_PENDING });
        return requestapi({ uri: `/api/childUser/list2`, fetchParams: { body: user } }).then((data) => {
            dispatch({ type: ChildUser.QUERY_CHILDUSER_SUCCESS, payload: data });
        }).catch(err => {
            dispatch({ type: ChildUser.QUERY_CHILDUSER_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const save = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: ChildUser.ADD_CHILDUSER_PENDING });
        return requestapi({ uri: `/api/childUser/save`, fetchParams: { body: user } }).then((data) => {
            dispatch({ type: ChildUser.ADD_CHILDUSER_SUCCESS, payload: user });
        }).catch(err => {
            dispatch({ type: ChildUser.ADD_CHILDUSER_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const update = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: ChildUser.UPDATE_CHILDUSER_PENDING });
        return requestapi({ uri: `/api/childUser/update`, fetchParams: { body: user } }).then((data) => {
            dispatch({ type: ChildUser.UPDATE_CHILDUSER_SUCCESS, payload: user });
        }).catch(err => {
            dispatch({ type: ChildUser.UPDATE_CHILDUSER_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const selectById = (id) => {
    return (dispatch, getState) => {
        dispatch({ type: ChildUser.SELECT_CHILDUSER_DETAILS_PENDING });
        return requestapi({ uri: `/api/childUser/get/${id}`, fetchParams: { method: 'get' } }).then((data) => {
            dispatch({ type: ChildUser.SELECT_CHILDUSER_DETAILS_SUCCESS, payload: data });
        }).catch(err => {
            dispatch({ type: ChildUser.SELECT_CHILDUSER_DETAILS_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const deleteUser = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: ChildUser.DELETE_CHILDUSER_PENDING });
        return requestapi({ uri: `/api/childUser/delete`, fetchParams: { body: user } }).then((data) => {
            dispatch({ type: ChildUser.DELETE_CHILDUSER_SUCCESS, payload: user });
        }).catch(err => {
            dispatch({ type: ChildUser.DELETE_CHILDUSER_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: ChildUser.CREATE_CHILDUSER_FIELD_CHANGE, payload: values })
        );
    }
}

const resetFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: ChildUser.CREATE_CHILDUSER_FIELD_RESET })
        );
    }
}

const handleSearch = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: ChildUser.CHILDUSER_HANDLE_SEARCH, payload: value })
        );
    }
}

const xuqi = ({ childUserId, merchantId, dayType }) => {
    return (dispatch, getState) => {
        return requestapi({ uri: `/api/childUser/xuqi`, fetchParams: { body: { childUserId, merchantId, day:dayType } }, pending: true }).then((data) => {
            dispatch({ type: ChildUser.CHILDUSER_XUQI_SUCCESS, payload: { childUserId, exptime: data.result } })
        }).catch(err => {
            throw err;
        });
    }
}

const resetPWD = (childAccount) => {
    return (dispatch, getState) => {
        dispatch({type: ChildUser.RESET_CHILDUSER_PWD_PENDING});
        return requestapi({uri: `/api/childUser/resetPWD`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `childAccount=${childAccount}`,
        }}).then((data) => {
            dispatch({type: ChildUser.RESET_CHILDUSER_PWD_SUCCESS, payload: data});
            return data.result;
        }).catch(err => {
            dispatch({type: ChildUser.RESET_CHILDUSER_PWD_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    list,
    save,
    update,
    selectById,
    deleteUser,
    fieldChangeValue,
    resetFields,
    handleSearch,
    xuqi,
    resetPWD,
}