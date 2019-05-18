import { Login } from '../utils/constants';
import requestapi from '../common/requestapi';

const login = (userParams) => {
    return (dispatch, getState) => {
        dispatch({type: Login.LOGIN_PENDING});
        return requestapi({uri: "/login", fetchParams: {body: userParams}}).then((data) => {
            window.localStorage.setItem("Authorization", data.token);
            dispatch({type: Login.LOGIN_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: Login.LOGIN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const logout = () => {
    return (dispatch, getState) => {
        window.localStorage.removeItem("Authorization");
        return Promise.resolve(            
            dispatch({ type: Login.LOGOUT_SUCCESS })
        );
    }
}

const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Login.LOGIN_FIELD_CHANGE, payload: values})
        );
    }
}

const resetFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Login.LOGIN_FIELD_RESET})
        );
    }
}

export default {
    login,
    logout,
    fieldChangeValue,
    resetFields,
}