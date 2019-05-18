import { GoodsCategory } from '../utils/constants';

const queryCategory = ({name}) => {
    return (dispatch, getState) => {
        // return fetch
        return Promise.resolve(dispatch({
            type: GoodsCategory.QUERY_CATEGORY_SUCCESS,
            payload: [],
        }));
    }
}

export default {
    queryCategory,
}