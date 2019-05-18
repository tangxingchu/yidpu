import { RoleFunction } from '../utils/constants';
import requestapi from '../common/requestapi';

const init = () => {
    return (dispatch, getState) => {
        dispatch({ type: RoleFunction.ROLE_FUNCTION_INIT_PENDING });
        return requestapi({ uri: `/api/roleFunction/init` }).then((data) => {
            dispatch({ type: RoleFunction.ROLE_FUNCTION_INIT_SUCCESS, payload: data });
        }).catch(err => {
            dispatch({ type: RoleFunction.ROLE_FUNCTION_INIT_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const save = (roleFunctions) => {
    return (dispatch, getState) => {
        dispatch({ type: RoleFunction.SAVE_ROLE_FUNCTION_PENDING });
        return requestapi({
            uri: `/api/roleFunction/save`, fetchParams: { body: roleFunctions }
        }).then((data) => {
            dispatch({ type: RoleFunction.SAVE_ROLE_FUNCTION_SUCCESS, payload: roleFunctions });
        }).catch(err => {
            dispatch({ type: RoleFunction.SAVE_ROLE_FUNCTION_FAILURE, payload: err.message });
            throw err;
        });
    }
}

const list = (roleId) => {
    return (dispatch, getState) => {
        return requestapi({ uri: `/api/roleFunction/list`, fetchParams: { body: { roleId } }, pending: true }).then((data) => {
            dispatch({ type: RoleFunction.QUERY_ROLE_FUNCTION_SUCCESS, payload: { roleId, data } });
        }).catch(err => {
            throw err;
        });
    }
}

const onRoleTreeSelect = (keys) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: RoleFunction.ON_ROLE_TREE_SELECT, payload: keys })
        );
    }
}

const onFunctionTreeCheck = (keys) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: RoleFunction.ON_FUNCTION_TREE_CHECK, payload: keys })
        );
    }
}

const reload = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: RoleFunction.ROLEFUNCTION_RELOAD })
        );
    }
}

const functionTreeExapand = (expandedKeys, {expanded, node}) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: RoleFunction.ROLEFUNCTION_FUNCTION_EXPANDED, payload: {expandedKeys, expanded, node} })
        );
    }
}

export default {
    init,
    save,
    list,
    onRoleTreeSelect,
    onFunctionTreeCheck,
    reload,
    functionTreeExapand,
}