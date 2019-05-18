import createReducers from '../utils/createReducers'
import { Login } from '../utils/constants'

const initialState = {
    loginLoading: false,
    data: null,
    errorMessage: null,
    getPhoneCodeLoading: false,//重置密码 短信验证码loading
    resetPWDLoading: false,
}

const loginHandler = {
    [Login.LOGIN_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            loginLoading: false,
            data: action.payload,
        });
    },
    [Login.LOGIN_FAILURE]: (state, action) => {
        return Object.assign({}, state, {
            loginLoading: false,
            errorMessage: action.payload,
        });
    },
    [Login.LOGIN_PENDING]: (state, action) => {
        return Object.assign({}, state, { loginLoading: true, });
    },
    [Login.LOGOUT]: (state, action) => {
        return Object.assign({}, state, {
            data: action.payload,
        });
    },
    [Login.RESET_PASSWORD_CODE_PENDING]: (state, action) => {
        return Object.assign({}, state, { getPhoneCodeLoading: true,});
    },
    [Login.RESET_PASSWORD_CODE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { getPhoneCodeLoading: false,});
    },
    [Login.RESET_PASSWORD_CODE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { getPhoneCodeLoading: false,});
    },
    [Login.RESET_PASSWORD_PENDING]: (state, action) => {
        return Object.assign({}, state, { resetPWDLoading: true,});
    },
    [Login.RESET_PASSWORD_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { resetPWDLoading: false,});
    },
    [Login.RESET_PASSWORD_FAILURE]: (state, action) => {
        return Object.assign({}, state, { resetPWDLoading: false,});
    },
}

export default createReducers(initialState, loginHandler);