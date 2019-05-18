import createReducers from '../utils/createReducers'
import { Monitor } from '../utils/constants'

const initialState  = {
    loading: false,
    orderList: [],
}

const monitorHandler = {
    [Monitor.SELECT_PLACEORDER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {orderList: action.payload, loading: false});
    },
    [Monitor.SELECT_PLACEORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [Monitor.SELECT_PLACEORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
}

export default createReducers(initialState, monitorHandler);