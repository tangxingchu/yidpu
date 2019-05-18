import createReducers from '../utils/createReducers'
import { ChildUser, Employee } from '../utils/constants'
import moment from 'moment';

const initialState = {
    loading: true,
    userList: [],
    saveLoading: false,
    childUserData: {
        id: { value: "" }, account: { value: "" }, realname: { value: "" }, phone: { value: "" }, employeeId: { value: "" },
        effectiveTime: { value: null }, expirationTime: { value: null }, hasEmployee: { value: "1" }
    },
    autoCompleteDataSource: [],
    autoCompleteData: [],
}

const childUserHandler = {
    [ChildUser.QUERY_CHILDUSER_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [ChildUser.QUERY_CHILDUSER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { loading: false, userList: action.payload });
    },
    [ChildUser.QUERY_CHILDUSER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [ChildUser.ADD_CHILDUSER_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [ChildUser.ADD_CHILDUSER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [ChildUser.ADD_CHILDUSER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [ChildUser.UPDATE_CHILDUSER_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [ChildUser.UPDATE_CHILDUSER_SUCCESS]: (state, action) => {
        const userList = state.userList.map(item => {
            if (item.id === action.payload.id) {
                return { ...item, ...action.payload };
            } else {
                return item;
            }
        });
        return Object.assign({}, state, { saveLoading: false, userList });
    },
    [ChildUser.UPDATE_CHILDUSER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [ChildUser.DELETE_CHILDUSER_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [ChildUser.DELETE_CHILDUSER_SUCCESS]: (state, action) => {
        const userList = state.userList.filter(item => {
            return item.id !== action.payload.id;
        });
        return Object.assign({}, state, { loading: false, userList });
    },
    [ChildUser.DELETE_CHILDUSER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [ChildUser.CREATE_CHILDUSER_FIELD_CHANGE]: (state, action) => {
        const childUserData = { ...state.childUserData, ...action.payload };
        return Object.assign({}, state, { childUserData });
    },
    [ChildUser.CREATE_CHILDUSER_FIELD_RESET]: (state, action) => {
        const childUserData = {
            id: { value: "" }, account: { value: "" }, realname: { value: "" }, phone: { value: "" }, employeeId: { value: "" },
            effectiveTime: { value: null }, expirationTime: { value: null }, hasEmployee: { value: "1" }
        };
        return Object.assign({}, state, { childUserData });
    },
    [Employee.QUERY_EMPLOYEE_SUCCESS]: (state, action) => {
        // const autoCompleteDataSource = [];
        // action.payload.map(item => {
        //     autoCompleteDataSource.push(`${item.id}-${item.fullName}-${item.mobileTelephone}-${item.employeeNo || ""}`);
        // });
        const autoCompleteDataSource = action.payload;
        return Object.assign({}, state, { autoCompleteDataSource });
    },
    [ChildUser.CHILDUSER_HANDLE_SEARCH]: (state, action) => {
        const searchValue = action.payload.toLowerCase();
        const autoCompleteData = state.autoCompleteDataSource.filter(item => {
            return item.fullName.toLowerCase().indexOf(searchValue) !== -1 || item.mobileTelephone.indexOf(searchValue) !== -1;
        });
        return Object.assign({}, state, { autoCompleteData });
    },
    [ChildUser.CHILDUSER_XUQI_SUCCESS]: (state, action) => {
        const { childUserId, exptime } = action.payload;
        const userList = state.userList.map(item => {
            if (item.id === childUserId) {
                item.expirationTime = exptime;
                item.expirationStatus = 0;
            }
            return item;
        });
        return Object.assign({}, state, { userList });
    },
    //重置密码
    [ChildUser.RESET_CHILDUSER_PWD_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [ChildUser.RESET_CHILDUSER_PWD_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [ChildUser.RESET_CHILDUSER_PWD_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
}

export default createReducers(initialState, childUserHandler);