import createReducers from '../utils/createReducers'
import { GoodsCategory } from '../utils/constants'

const initialState  = {
    queryLoading: true,
    queryData: [],
}

const CategoryHandler = {
    [GoodsCategory.QUERY_CATEGORY_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            queryLoading: false,
            queryData: action.payload,
        });
    },
}

export default createReducers(initialState, CategoryHandler);