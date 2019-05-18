import createReducers from '../utils/createReducers'
import { MenuFunc } from '../utils/constants'

const initialState = {
    treeLoading: true,
    treeData: [],
    functionData: {
        id: { value: "" }, functionName: { value: "" }, functionCode: { value: "" },
        functionUri: { value: "" }, functionIcon: { value: "" }, functionType: { value: "1" }, 
        enabled: { value: 1}, sortNo: { value: 1}, functionCategory: { value: "0" },
        parentId: { value: "" }, grade: { value: "" },
    },
    parentFunction: null,
    saveLoading: false,
    dictItemMap: {},
}

const loop = (data, id, callback) => {
    data.forEach((item, index, arr) => {
        if (item.id === id) {
            return callback(item, index, arr);
        }
        if (item.children) {
            return loop(item.children, id, callback);
        }
    });
};

const menuFuncHandler = {
    [MenuFunc.LIST_FUNC_TREE_PENDING]: (state, action) => {
        return Object.assign({}, state, { treeLoading: true });
    },
    [MenuFunc.LIST_FUNC_TREE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { treeLoading: false, treeData: [action.payload] });
    },
    [MenuFunc.LIST_FUNC_TREE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { treeLoading: false });
    },
    [MenuFunc.FIELD_CHANGE]: (state, action) => {
        const functionData = {...state.functionData, ...action.payload};
        
        return Object.assign({}, state, { functionData });
    },
    [MenuFunc.ADD_FUNCTION]: (state, action) => {
        const functionData = {
            id: {value: ""},
            functionName: {value: ""},
            functionCode: {value: ""},
            functionUri: {value: ""},
            functionIcon: {value: ""},
            functionType: {value: "1"},
            enabled: { value: 1},
            sortNo: { value: 1},
            functionCategory: {value: "0"},
            parentId: {value: action.payload.id},
            grade: {value: ""},
        };
        return Object.assign({}, state, { functionData, parentFunction: action.payload });
    },
    [MenuFunc.SAVE_FUNCTION_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [MenuFunc.SAVE_FUNCTION_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [MenuFunc.SAVE_FUNCTION_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [MenuFunc.SELECT_FUNCTION_SUCCESS]: (state, action) => {
        const { parentId } = action.payload;
        let parentFunction = null;
        loop(state.treeData, parentId, (item, index, arr) => {
            parentFunction = item;
        });
        const functionData = {
            id: {value: action.payload.id},
            functionName: {value: action.payload.functionName},
            functionCode: {value: action.payload.functionCode},
            functionUri: {value: action.payload.functionUri},
            functionIcon: {value: action.payload.functionIcon},
            functionType: {value: action.payload.functionType + ""},
            enabled: {value: action.payload.enabled},
            sortNo: {value: action.payload.sortNo},
            functionCategory: {value: action.payload.functionCategory + ""},
            parentId: {value: action.payload.parentId},
            grade: {value: action.payload.grade + ""},
        };
        return Object.assign({}, state, { functionData, parentFunction });
    },
    [MenuFunc.UPDATE_FUNCTION_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [MenuFunc.UPDATE_FUNCTION_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [MenuFunc.UPDATE_FUNCTION_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [MenuFunc.DELETE_FUNCTION_SUCCESS]: (state, action) => {
        const functionData = {
            id: {value: ""},
            functionName: {value: ""},
            functionCode: {value: ""},
            functionUri: {value: ""},
            functionIcon: {value: ""},
            functionType: {value: "1"},
            enabled: {value: 1},
            sortNo: {value: 1},
            functionCategory: {value: "0"},
            parentId: {value: ""},
            grade: {value: ""},
        };
        return Object.assign({}, state, { functionData});
    },
    [MenuFunc.LIST_DICTITEMS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { dictItemMap: action.payload });
    },
}

export default createReducers(initialState, menuFuncHandler);