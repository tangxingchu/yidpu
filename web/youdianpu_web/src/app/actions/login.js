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

//获取短信验证码
const resetPasswordPhoneCode = (phone, time, code) => {
    return (dispatch, getState) => {
        dispatch({type: Login.RESET_PASSWORD_CODE_PENDING})
        return requestapi({uri: `/api/resetPasswordPhoneCode`, fetchParams: {method: 'post', 
                headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
            body: `phone=${phone}&time=${time}&code=${code}`}}).then(data => {
            dispatch({type: Login.RESET_PASSWORD_CODE_SUCCESS});
        }).catch(err => {
            dispatch({type: Login.RESET_PASSWORD_CODE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//重置密码
const resetPassword = (phone, smsCode) => {
    return (dispatch, getState) => {
        dispatch({type: Login.RESET_PASSWORD_PENDING})
        return requestapi({uri: `/api/resetPassword`, fetchParams: {method: 'post', 
                headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
            body: `phone=${phone}&smsCode=${smsCode}`}}).then(data => {
            dispatch({type: Login.RESET_PASSWORD_SUCCESS});
        }).catch(err => {
            dispatch({type: Login.RESET_PASSWORD_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    login,
    logout,
    resetPasswordPhoneCode,
    resetPassword,
}