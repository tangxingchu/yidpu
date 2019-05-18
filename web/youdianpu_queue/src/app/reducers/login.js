import createReducers from '../utils/createReducers'
import { Login } from '../utils/constants'

const initialState = {
    loginLoading: false,
    data: null,
    errorMessage: null,
    loginFormData: {username: {value: ''}, password: {value: ''}, code: {value: ''}},
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
    [Login.LOGOUT_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            data: action.payload,
        });
    },
    [Login.LOGIN_FIELD_CHANGE]: (state, action) => {
        const loginFormData = { ...state.loginFormData, ...action.payload };
        return Object.assign({}, state, { loginFormData });
    },
    [Login.LOGIN_FIELD_RESET]: (state, action) => {
        const loginFormData = {username: {value: ''}, password: {value: ''}, code: {value: ''}};
        return Object.assign({}, state, { loginFormData, errorMessage: null });
    },
}

export default createReducers(initialState, loginHandler);