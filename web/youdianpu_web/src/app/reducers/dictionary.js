import createReducers from '../utils/createReducers'
import { Dictionary } from '../utils/constants'


const initialState = {
    loading: false,
    dictList: [],
    extraList: [],
    itemMap: {},//缓存附属属性 对应的 属性项
    dictSelectedKeys: [],//基础数据树的selectedkeys
    extraSelectedKeys: [],
    saveExtraLoading: false,
    saveDictItemLoading: false,
    showDictItemTable: false,
    showExtraItemTable: false,
    syncLoading: false,
    extraData: { id: { value: "" }, dictCode: { value: "" }, dictName: { value: "" }, sortNo: { value: "1" } },
    dictItemData: { id: { value: "" }, dictCode: { value: "" }, itemName: { value: "" }, itemValue: { value: "" }, sortNo: { value: "1" } },
}

const dictHandler = {
    [Dictionary.QUERY_DICT_SUCCESS]: (state, action) => {
        const list = action.payload;
        const dictList = [], extraList = [];
        list.forEach(element => {
            if (element.category === 1) {
                dictList.push(element);
            } else {
                extraList.push(element);
            }
        });
        return Object.assign({}, state, { dictList, extraList });
    },
    [Dictionary.ON_DICT_TREE_SELECT]: (state, action) => {
        return Object.assign({}, state, { dictSelectedKeys: action.payload, extraSelectedKeys: [], showDictItemTable: true, showExtraItemTable: false });
    },
    [Dictionary.ON_EXTRA_TREE_SELECT]: (state, action) => {
        return Object.assign({}, state, { dictSelectedKeys: [], extraSelectedKeys: action.payload, showDictItemTable: false, showExtraItemTable: true });
    },
    [Dictionary.QUERY_DICTITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [Dictionary.QUERY_DICTITEM_SUCCESS]: (state, action) => {
        const itemMap = { ...state.itemMap };
        itemMap[action.payload.dictCode] = action.payload.data;
        return Object.assign({}, state, { loading: false, itemMap, });
    },
    [Dictionary.QUERY_DICTITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [Dictionary.SAVE_EXTRA_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveExtraLoading: true });
    },
    [Dictionary.SAVE_EXTRA_SUCCESS]: (state, action) => {
        const extraList = [...state.extraList, action.payload];
        return Object.assign({}, state, { saveExtraLoading: false, extraList });
    },
    [Dictionary.SAVE_EXTRA_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveExtraLoading: false });
    },
    [Dictionary.UPDATE_EXTRA_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveExtraLoading: true });
    },
    [Dictionary.UPDATE_EXTRA_SUCCESS]: (state, action) => {
        const extraList = state.extraList.map(item => {
            if (item.id === action.payload.id) {
                return { ...item, ...action.payload };
            } else {
                return item;
            }
        });
        return Object.assign({}, state, { saveExtraLoading: false, extraList });
    },
    [Dictionary.UPDATE_EXTRA_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveExtraLoading: false });
    },
    [Dictionary.DELETE_EXTRA_SUCCESS]: (state, action) => {
        const deletedExtra = state.extraList.find(item => item.id === action.payload.id);
        const extraList = state.extraList.filter(item => {
            return item.id !== action.payload.id;
        });
        const itemMap = { ...state.itemMap };
        delete itemMap[deletedExtra.dictCode];
        return Object.assign({}, state, { extraList, itemMap, dictSelectedKeys: [], extraSelectedKeys: [], showDictItemTable: false, showExtraItemTable: false });
    },
    [Dictionary.SELECT_EXTRA_SUCCESS]: (state, action) => {
        const { id, dictCode, dictName, sortNo } = action.payload;
        const extraData = {
            id: { value: id }, dictCode: { value: dictCode }, dictName: { value: dictName }, sortNo: { value: sortNo },
        };
        return Object.assign({}, state, { extraData });
    },
    [Dictionary.CREATE_EXTRA_FIELD_CHANGE]: (state, action) => {
        const extraData = { ...state.extraData, ...action.payload };
        return Object.assign({}, state, { extraData, });
    },
    [Dictionary.CREATE_EXTRA_FIELD_RESET]: (state, action) => {
        const extraData = { id: { value: "" }, dictCode: { value: "" }, dictName: { value: "" }, sortNo: { value: "1" } };
        return Object.assign({}, state, { extraData });
    },
    [Dictionary.SAVE_DICTITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveDictItemLoading: true });
    },
    [Dictionary.SAVE_DICTITEM_SUCCESS]: (state, action) => {
        const itemMap = { ...state.itemMap };
        const dictItemList = itemMap[action.payload.dictCode] || [];
        dictItemList.push(action.payload);
        return Object.assign({}, state, { saveDictItemLoading: false, itemMap });
    },
    [Dictionary.SAVE_DICTITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveDictItemLoading: false });
    },
    [Dictionary.UPDATE_DICTITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveDictItemLoading: true });
    },
    [Dictionary.UPDATE_DICTITEM_SUCCESS]: (state, action) => {
        const itemMap = { ...state.itemMap };
        const itemList = itemMap[action.payload.dictCode].map(item => {
            if (item.id === action.payload.id) {
                return { ...item, ...action.payload };
            } else {
                return item;
            }
        });
        itemMap[action.payload.dictCode] = itemList;
        return Object.assign({}, state, { saveDictItemLoading: false, itemMap });
    },
    [Dictionary.UPDATE_DICTITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveDictItemLoading: false });
    },
    [Dictionary.DELETE_DICTITEM_SUCCESS]: (state, action) => {
        const itemMap = { ...state.itemMap };
        const itemList = itemMap[action.payload.dictCode].filter(item => {
            return item.id !== action.payload.id;
        });
        itemMap[action.payload.dictCode] = itemList;
        return Object.assign({}, state, { itemMap });
    },
    [Dictionary.SELECT_DICTITEM_SUCCESS]: (state, action) => {
        const { id, dictCode, itemName, itemValue, sortNo } = action.payload;
        const dictItemData = { id: { value: id }, dictCode: { value: dictCode }, itemName: { value: itemName }, itemValue: { value: itemValue }, sortNo: { value: sortNo } };
        return Object.assign({}, state, { dictItemData });
    },
    [Dictionary.CREATE_DICTITEM_FIELD_CHANGE]: (state, action) => {
        const dictItemData = { ...state.dictItemData, ...action.payload };
        return Object.assign({}, state, { dictItemData, });
    },
    [Dictionary.CREATE_DICTITEM_FIELD_RESET]: (state, action) => {
        const dictItemData = { id: { value: "" }, dictCode: { value: "" }, itemName: { value: "" }, itemValue: { value: "" }, sortNo: { value: "1" } };
        return Object.assign({}, state, { dictItemData });
    },
    [Dictionary.SYNC_DICTITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { syncLoading: true });
    },
    [Dictionary.SYNC_DICTITEM_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { syncLoading: false });
    },
}

export default createReducers(initialState, dictHandler);