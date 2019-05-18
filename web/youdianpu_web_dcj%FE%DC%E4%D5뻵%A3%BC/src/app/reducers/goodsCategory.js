import createReducers from '../utils/createReducers'
import { GoodsCategory } from '../utils/constants'

const initialState  = {
    loading: true,
    categoryList: [],
    saveLoading: false,
    syncLoading: false,
    categoryData: {id: {value: ""}, categoryName: {value: ""}, sortNo: {value: "1"}, categoryDesc: {value: ""}},
}

const CategoryHandler = {
    [GoodsCategory.QUERY_CATEGORY_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [GoodsCategory.QUERY_CATEGORY_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            loading: false,
            categoryList: action.payload,
        });
    },
    [GoodsCategory.QUERY_CATEGORY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [GoodsCategory.ADD_CATEGORY_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true});
    },
    [GoodsCategory.ADD_CATEGORY_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    [GoodsCategory.ADD_CATEGORY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    [GoodsCategory.UPDATE_CATEGORY_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true});
    },
    [GoodsCategory.UPDATE_CATEGORY_SUCCESS]: (state, action) => {
        const categoryList = state.categoryList.map(item => {
            if(item.id === action.payload.id) {
                return {...item, ...action.payload};
            } else {
                return item;
            }
        });
        return Object.assign({}, state, {saveLoading: false, categoryList});
    },
    [GoodsCategory.UPDATE_CATEGORY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    [GoodsCategory.DELETE_CATEGORY_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [GoodsCategory.DELETE_CATEGORY_SUCCESS]: (state, action) => {
        const categoryList = state.categoryList.filter(item => {
            return item.id !== action.payload.id;
        });
        return Object.assign({}, state, {loading: false, categoryList});
    },
    [GoodsCategory.DELETE_CATEGORY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [GoodsCategory.CREATE_CATEGORY_FIELD_CHANGE]: (state, action) => {
        const categoryData = {...state.categoryData, ...action.payload};
        return Object.assign({}, state, { categoryData });
    },
    [GoodsCategory.CREATE_CATEGORY_FIELD_RESET]: (state, action) => {
        const categoryData = {id: {value: ""}, categoryName: {value: ""}, sortNo: {value: "1"}, categoryDesc: {value: ""}};
        return Object.assign({}, state, {categoryData});
    },
    [GoodsCategory.SELECT_CATEGORY_SUCCESS]: (state, action) => {
        const { id, categoryName, sortNo, categoryDesc } = action.payload;
        const categoryData = {
            id: {value: id}, categoryName: {value: categoryName}, sortNo: {value: sortNo}, categoryDesc: {value: categoryDesc},
        };
        return Object.assign({}, state, {categoryData});
    },
    [GoodsCategory.SYNC_CATEGORY_PENDING]: (state, action) => {
        return Object.assign({}, state, { syncLoading: true });
    },
    [GoodsCategory.SYNC_CATEGORY_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { syncLoading: false });
    },
}

export default createReducers(initialState, CategoryHandler);