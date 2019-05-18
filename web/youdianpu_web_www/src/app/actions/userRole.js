import { UserRole } from '../utils/constants';
import requestapi from '../common/requestapi';

const init = () => {
    return (dispatch, getState) => {
        dispatch({ type: UserRole.USER_ROLE_INIT_PENDING });
        return requestapi({ uri: `/api/userRole/init` }).then((data) => {
            dispatch({ type: UserRole.USER_ROLE_INIT_SUCCESS, payload: data });
        }).catch(err => {
            dispatch({ type: UserRole.USER_ROLE_INIT_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const save = (userRoles) => {
    return (dispatch, getState) => {
        dispatch({ type: UserRole.SAVE_USER_ROLE_PENDING });
        return requestapi({
            uri: `/api/userRole/save`, fetchParams: { body: userRoles }
        }).then((data) => {
            dispatch({ type: UserRole.SAVE_USER_ROLE_SUCCESS, payload: userRoles });
        }).catch(err => {
            dispatch({ type: UserRole.SAVE_USER_ROLE_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const list = (childUserId) => {
    return (dispatch, getState) => {
        return requestapi({ uri: `/api/userRole/list`, fetchParams: { body: { merchantChilduserId: childUserId } }, pending: true }).then((data) => {
            dispatch({ type: UserRole.QUERY_USER_ROLE_SUCCESS, payload: { childUserId, data } });
            return data;
        }).catch(err => {
            throw err;
        });
    }
}

const onRoleTreeCheck = (keys) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: UserRole.USERROLE_ON_ROLE_TREE_CHECK, payload: keys })
        );
    }
}

const reload = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: UserRole.USERROLE_RELOAD })
        );
    }
}

const listFunctionByRoleId = (roleIds) => {
    return (dispatch, getState) => {
        return requestapi({ uri: `/api/userRole/listFunctionByRoleId`, fetchParams: { body: roleIds }, pending: true }).then((data) => {
            dispatch({ type: UserRole.USERROLE_LIST_FUNCTION, payload: data });
        }).catch(err => {
            throw err;
        });
    }
}

const disabledFunction = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: UserRole.USERROLE_FUNCTION_DISABLED })
        );
    }
}

const onTableChange = (selectedRowKey, selectedRow) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: UserRole.USERROLE_ON_TABLE_CHANGE, payload: {selectedRowKey, selectedRow} })
        );
    }
}

const unCheckedRoleTree = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: UserRole.USERROLE_UNCHECKED_ROLE })
        );
    }
}

export default {
    init,
    save,
    list,
    onRoleTreeCheck,
    reload,
    listFunctionByRoleId,
    disabledFunction,
    onTableChange,
    unCheckedRoleTree,
}