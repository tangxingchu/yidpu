import createReducers from '../utils/createReducers'
import { Dictionary } from '../utils/constants'

const initialState = {
    loading: true,
    listData: [],
    saveLoading: false,
    dictData: {id: { value: "" }, dictCode: { value: "" }, dictName: { value: "" }, sortNo: { value: "" }, remark: { value: "" }},
    listItemData: [],
    itemLoading: true,
}

const dictHandler = {
    [Dictionary.QUERY_DICTIONARY_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            loading: false,
            listData: action.payload,
        });
    },
    [Dictionary.QUERY_DICTIONARY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {
            loading: false,
        });
    },
    [Dictionary.QUERY_DICTIONARY_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true, });
    },
    [Dictionary.ADD_DICTIONARY_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false,});
    },
    [Dictionary.ADD_DICTIONARY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false,});
    },
    [Dictionary.ADD_DICTIONARY_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true, });
    },
    [Dictionary.DELETE_DICTIONARY_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true, });
    },
    [Dictionary.DELETE_DICTIONARY_SUCCESS]: (state, action) => {
        const listData = state.listData.filter(item => {
            return item.id != action.payload;
        });
        return Object.assign({}, state, { listData, loading: false});
    },
    [Dictionary.DELETE_DICTIONARY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false,});
    },
    [Dictionary.UPDATE_DICTIONARY_SUCCESS]: (state, action) => {
        const listData = state.listData.map(item => {
            if(item.id === action.payload.id) {
                return {...action.payload};
            } else {
                return item;
            }
        });
        return Object.assign({}, state, {saveLoading: false, listData});
    },
    [Dictionary.UPDATE_DICTIONARY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false,});
    },
    [Dictionary.UPDATE_DICTIONARY_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true, });
    },
    [Dictionary.SELECT_DICTIONARY_SUCCESS]: (state, action) => {
        const dictData = {
            id: {value: action.payload.id},
            dictCode: {value: action.payload.dictCode},
            dictName: {value: action.payload.dictName},
            sortNo: {value: action.payload.sortNo},
            remark: {value: action.payload.remark},
        };
        return Object.assign({}, state, { dictData });
    },
    [Dictionary.CREATE_FIELD_CHANGE]: (state, action) => {
        const dictData = {...state.dictData, ...action.payload};
        return Object.assign({}, state, { dictData });
    },
    [Dictionary.SELECT_ITEMS_PENDING]: (state, action) => {
        return Object.assign({}, state, { itemLoading: false });
    },
    [Dictionary.SELECT_ITEMS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {listItemData: action.payload, itemLoading: false})
    },
    [Dictionary.SELECT_ITEMS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { itemLoading: false });
    },
    [Dictionary.ADD_ITEM_ROW]: (state, action) => {
        const listItemData = [...state.listItemData, action.payload];
        return Object.assign({}, state, { listItemData });
    },
    [Dictionary.REMOVE_ITEM_ROW]: (state, action) => {
        const listItemData = state.listItemData.filter(item => {
            return item.id !== action.payload;
        });
        return Object.assign({}, state, { listItemData });
    },
    [Dictionary.ADD_ITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { itemLoading: true });
    },
    [Dictionary.ADD_ITEM_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { itemLoading: false });
    },
    [Dictionary.ADD_ITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { itemLoading: false });
    },
    [Dictionary.UPDATE_ITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { itemLoading: true });
    },
    [Dictionary.UPDATE_ITEM_SUCCESS]: (state, action) => {
        const listItemData = state.listItemData.map(item => {
            if(item.id === action.payload.id) {
                return {...action.payload};
            } else {
                return item;
            }
        });
        return Object.assign({}, state, { itemLoading: false, listItemData });
    },
    [Dictionary.UPDATE_ITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { itemLoading: false });
    },
    [Dictionary.DELETE_ITEM_PENDING]: (state, action) => {        
        return Object.assign({}, state, { itemLoading: true });
    },
    [Dictionary.DELETE_ITEM_SUCCESS]: (state, action) => {
        const listItemData = state.listItemData.filter(item => {
            return item.id !== action.payload;
        });
        return Object.assign({}, state, { itemLoading: false, listItemData });
    },
    [Dictionary.DELETE_ITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { itemLoading: false });
    },
}

export default createReducers(initialState, dictHandler);
