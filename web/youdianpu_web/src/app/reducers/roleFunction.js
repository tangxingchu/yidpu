import createReducers from '../utils/createReducers'
import { RoleFunction } from '../utils/constants'

const initialState = {
    roleList: [],
    loading: false,
    functionList: [],
    roleFunctions: {},
    saveLoading: false,
    roleTreeSelectedKeys: [],
    functionTreeCheckedKeys: [],
    functionExpandedKeys: ["0"],
}

const roleFunctionHandler = {
    [RoleFunction.ROLE_FUNCTION_INIT_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [RoleFunction.ROLE_FUNCTION_INIT_SUCCESS]: (state, action) => {
        const { roles, functions } = action.payload;
        const roleList = [{ id: 0, roleName: "系统角色", children: roles }];
        const functionList = [{ functionId: 0, functionName: "系统功能菜单", children: functions }];
        return Object.assign({}, state, { loading: false, roleList, functionList, });
    },
    [RoleFunction.ROLE_FUNCTION_INIT_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [RoleFunction.QUERY_ROLE_FUNCTION_SUCCESS]: (state, action) => {
        const { roleId, data } = action.payload;
        const functionTreeCheckedKeys = [];
        const roleFunctions = { ...state.roleFunctions };
        if (data) {
            data.forEach(element => {
                functionTreeCheckedKeys.push(element.functionId);
            });
        }
        roleFunctions[roleId] = functionTreeCheckedKeys;
        return Object.assign({}, state, { roleFunctions, functionTreeCheckedKeys });
    },
    [RoleFunction.SAVE_ROLE_FUNCTION_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [RoleFunction.SAVE_ROLE_FUNCTION_SUCCESS]: (state, action) => {
        const roleFunctions = { ...state.roleFunctions, ...action.payload };
        return Object.assign({}, state, { saveLoading: false, roleFunctions });
    },
    [RoleFunction.SAVE_ROLE_FUNCTION_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [RoleFunction.ON_ROLE_TREE_SELECT]: (state, action) => {
        const roleTreeSelectedKeys = action.payload;
        return Object.assign({}, state, { roleTreeSelectedKeys });
    },
    [RoleFunction.ON_FUNCTION_TREE_CHECK]: (state, action) => {
        const functionTreeCheckedKeys = action.payload;
        return Object.assign({}, state, { functionTreeCheckedKeys });
    },
    [RoleFunction.ROLEFUNCTION_RELOAD]: (state, action) => {
        const roleFunctions = {}, roleList = [], functionList = [];
        return Object.assign({}, state, { roleFunctions, roleList, functionList });
    },
    [RoleFunction.ROLEFUNCTION_FUNCTION_EXPANDED]: (state, action) => {
        const functionExpandedKeys = action.payload.expandedKeys;
        return Object.assign({}, state, { functionExpandedKeys });
    },
}

export default createReducers(initialState, roleFunctionHandler);