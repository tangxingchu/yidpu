import createReducers from '../utils/createReducers'
import { Order } from '../utils/constants'

const initialState = {
    loading: true,
    orderInfo: null,
    payAmount: 0,
    subtractMap: [],
}

const orderHandler = {
    [Order.SELECT_ORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [Order.SELECT_ORDER_SUCCESS]: (state, action) => {
        const { orderVos, subtractVoMap, payAmount } = action.payload;
        return Object.assign({}, state, {
            loading: false,
            orderInfo: orderVos && orderVos.length > 0 ? orderVos[0] : null,
            subtractMap: subtractVoMap,
            payAmount,
        });
    },
    [Order.SELECT_ORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false, });
    },
    //删除成功
    [Order.ORDERDETAIL_DELETE_ORDERITEM_SUCCESS]: (state, action) => {
        const new_orderInfo = {...state.orderInfo};
        const { id, orderNo } = action.payload;
        const orderItemVos = new_orderInfo.orderItemVos.filter(item => item.id !== id);
        new_orderInfo.orderItemVos = orderItemVos;
        return Object.assign({}, state, { orderInfo: new_orderInfo });
    },
    //取消成功
    [Order.ORDERDETAIL_CANCEL_ORDERITEM_SUCCESS]: (state, action) => {
        const new_orderInfo = {...state.orderInfo};
        const { id, orderNo } = action.payload;
        let payAmount = state.payAmount;
        const orderItemVos = new_orderInfo.orderItemVos.map(item => {
            if(item.id == id) {
                item.orderItemStatus = '9';//取消状态
                payAmount -= item.price;
                new_orderInfo.totalPrice -= item.price;
            }
            return item;
        });
        new_orderInfo.orderItemVos = orderItemVos;
        return Object.assign({}, state, { orderInfo: new_orderInfo, payAmount });
    },
    //标记为已出菜
    [Order.ORDERDETAIL_SHIPPED_ORDERITEM_SUCCESS]: (state, action) => {
        const new_orderInfo = {...state.orderInfo};
        const { id, orderNo } = action.payload;
        const orderItemVos = new_orderInfo.orderItemVos.map(item => {
            if(item.id == id) {
                item.orderItemStatus = '4';//已出菜状态
            }
            return item;
        });
        new_orderInfo.orderItemVos = orderItemVos;
        return Object.assign({}, state, { orderInfo: new_orderInfo });
    },
    //标记为已上菜
    [Order.ORDERDETAIL_RECEIVE_ORDERITEM_SUCCESS]: (state, action) => {
        const new_orderInfo = {...state.orderInfo};
        const { id, orderNo } = action.payload;
        const orderItemVos = new_orderInfo.orderItemVos.map(item => {
            if(item.id == id) {
                item.orderItemStatus = '12';//已上菜状态
            }
            return item;
        });
        new_orderInfo.orderItemVos = orderItemVos;
        return Object.assign({}, state, { orderInfo: new_orderInfo });
    },
    //确认订单项
    [Order.CONFIRM_ORDERITEM_SUCCESS]: (state, action) => {
        const {orderNo, orderItemId, result} = action.payload;
        const new_orderInfo = {...state.orderInfo};
        const orderItemVos = new_orderInfo.orderItemVos.map(orderItem => {
            if(orderItem.id == orderItemId) {
                orderItem.orderItemStatus = '1';
            }
            return orderItem;
        });
        new_orderInfo.orderItemVos = orderItemVos;
        if(result == 0) {
            new_orderInfo.orderStatus = '1';
            new_orderInfo.orderStatusName = '待支付';
        }
        return Object.assign({}, state, { orderInfo: new_orderInfo });
    },
    //确认订单
    [Order.CONFIRM_ORDER_SUCCESS]: (state, action) => {
        const new_orderInfo = {...state.orderInfo};
        new_orderInfo.orderStatus = '1';
        new_orderInfo.orderStatusName = '待支付';
        const orderItemVos = new_orderInfo.orderItemVos.map(orderItem => {
            orderItem.orderItemStatus = '1';
            return orderItem;
        });
        new_orderInfo.orderItemVos = orderItemVos;
        return Object.assign({}, state, { orderInfo: new_orderInfo });
    },
    //完成订单
    [Order.FINISHED_ORDER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { orderInfo: null });
    },
}

export default createReducers(initialState, orderHandler);
