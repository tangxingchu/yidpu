import createReducers from '../utils/createReducers'
import { Login } from '../utils/constants'

const initialState = {
    loginLoading: false,
    data: null,
    errorMessage: null,
    modifyPWDLoading: false,
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
    [Login.MODIFY_PWD_PENDING]: (state, action) => {
        return Object.assign({}, state, {modifyPWDLoading: true});
    },
    [Login.MODIFY_PWD_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {modifyPWDLoading: false});
    },
    [Login.MODIFY_PWD_FAILURE]: (state, action) => {
        return Object.assign({}, state, {modifyPWDLoading: false});
    },
}

export default createReducers(initialState, loginHandler);