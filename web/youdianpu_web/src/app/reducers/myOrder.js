import createReducers from '../utils/createReducers'
import { MyOrder } from '../utils/constants'

const initialState  = {
    loading: false,
    listData: null,
}

const myOrderHandler = {
    [MyOrder.SELECT_MYORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [MyOrder.SELECT_MYORDER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { loading: false, listData: action.payload });
    },
    [MyOrder.SELECT_MYORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [MyOrder.CANCEL_MYORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [MyOrder.CANCEL_MYORDER_SUCCESS]: (state, action) => {
        const id = action.payload;
        const new_listData = state.listData.map(item => {
            if(item.id === id) {
                item.orderStatus = 3;//取消订单
            }
            return item;
        });
        return Object.assign({}, state, { loading: false, listData: new_listData });
    },
    [MyOrder.CANCEL_MYORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [MyOrder.DELETE_MYORDER_PENDING]: (state, action) => {        
        return Object.assign({}, state, { loading: true });
    },
    [MyOrder.DELETE_MYORDER_SUCCESS]: (state, action) => {
        const id = action.payload;
        const new_listData = state.listData.filter(item => item.id !== id);
        return Object.assign({}, state, { loading: false, listData: new_listData });
    },
    [MyOrder.DELETE_MYORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
}

export default createReducers(initialState, myOrderHandler);

