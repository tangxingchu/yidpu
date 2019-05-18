import { Login } from '../utils/constants';
import requestapi from '../common/requestapi';

const login = (userParams) => {
    return (dispatch, getState) => {
        dispatch({type: Login.LOGIN_PENDING});
        return requestapi({uri: "/login", fetchParams: {body: userParams}}).then((data) => {            
            dispatch({type: Login.LOGIN_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: Login.LOGIN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const modifyPassword = (oldPassword, newPassword) => {
    return (dispatch, getState) => {
        dispatch({type: Login.MODIFY_PWD_PENDING});
        return requestapi({uri: "/api/waiter/modifyPWD", fetchParams: {headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
            body: `oldPWD=${oldPassword}&newPWD=${newPassword}`}}).then((data) => {            
            dispatch({type: Login.MODIFY_PWD_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Login.MODIFY_PWD_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const refreshToken = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/refreshToken`}).then(token => {
            return token;
        }).catch(err => {
            throw err;
        });
    }
}

export default {
    login,
    modifyPassword,
    refreshToken,
}