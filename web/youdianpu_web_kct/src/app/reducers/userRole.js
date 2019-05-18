import createReducers from '../utils/createReducers'
import { UserRole } from '../utils/constants'

const initialState = {
    roleList: [],
    loading: false,
    functionList: [],
    userList: [],
    userRoles: {},
    saveLoading: false,
    childUserCheckedKeys: [],
    roleTreeCheckedKeys: [],
    functionExpandedKeys: ["0"],
    roleFunctions: [],
    userName: "",
    searchValue: "",//查询关键字
}

const loop = (data, expandedKeys) => {
    data.forEach(element => {
        expandedKeys.push(element.functionCode);
    });
}

const userRoleHandler = {
    [UserRole.USER_ROLE_INIT_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [UserRole.USER_ROLE_INIT_SUCCESS]: (state, action) => {
        const { roles, functions, childUsers } = action.payload;
        const roleList = [{ id: 0, roleName: "系统角色", children: roles }];
        const functionList = [{ functionCode: "0", functionName: "系统功能菜单", children: functions }];
        const expandedKeys = [];
        loop(functions, expandedKeys)
        const functionExpandedKeys = [...state.functionExpandedKeys, ...expandedKeys];
        return Object.assign({}, state, { loading: false, roleList, functionList, userList: childUsers, functionExpandedKeys });
    },
    [UserRole.USER_ROLE_INIT_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [UserRole.USERROLE_ON_ROLE_TREE_CHECK]: (state, action) => {
        const roleTreeCheckedKeys = action.payload;
        return Object.assign({}, state, { roleTreeCheckedKeys });
    },
    [UserRole.USERROLE_LIST_FUNCTION]: (state, action) => {
        const roleFunctions = action.payload;
        return Object.assign({}, state, { roleFunctions });
    },
    [UserRole.USERROLE_FUNCTION_DISABLED]: (state, action) => {
        const roleFunctions = [];
        return Object.assign({}, state, { roleFunctions });
    },
    [UserRole.USERROLE_ON_TABLE_CHANGE]: (state, action) => {
        const { selectedRowKey, selectedRow } = action.payload;
        if (selectedRow) {
            let childUserCheckedKeys = [...selectedRowKey];
            return Object.assign({}, state, { childUserCheckedKeys, userName: selectedRow.account });
        } else {
            let childUserCheckedKeys = [];
            return Object.assign({}, state, { childUserCheckedKeys, userName: "" });
        }
    },
    [UserRole.USERROLE_RELOAD]: (state, action) => {
        const childUserCheckedKeys = [], roleTreeCheckedKeys = [], roleFunctions = [],
            userList = [], functionList = [], roleList = [];
        return Object.assign({}, state, {
            roleFunctions, childUserCheckedKeys, roleTreeCheckedKeys, userList,
            functionList, roleList
        });
    },
    [UserRole.SAVE_USER_ROLE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [UserRole.SAVE_USER_ROLE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [UserRole.SAVE_USER_ROLE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [UserRole.QUERY_USER_ROLE_SUCCESS]: (state, action) => {
        const roleTreeCheckedKeys = [];
        action.payload.data.forEach(item => {
            roleTreeCheckedKeys.push(item.roleId);
        });
        return Object.assign({}, state, { roleTreeCheckedKeys });
    },
    [UserRole.USERROLE_UNCHECKED_ROLE]: (state, action) => {
        return Object.assign({}, state, { roleTreeCheckedKeys: [] });
    },
    [UserRole.USERROLE_ON_NAME_CHANGE]: (state, action) => {
        return Object.assign({}, state, { searchValue: action.payload });
    },
    [UserRole.USERROLE_SEARCH_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [UserRole.USERROLE_SEARCH_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { loading: false, userList: action.payload });
    },
    [UserRole.USERROLE_SEARCH_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
}

export default createReducers(initialState, userRoleHandler);