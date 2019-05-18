import { Order } from '../utils/constants';
import requestapi from '../common/requestapi';

const selectOrderInfo = (tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: Order.SELECT_ORDER_PENDING});
        return requestapi({uri: `/api/waiter/listOrderByTableCode`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `tableCode=${tableCode}`,
        }}).then((data) => {
            dispatch({type: Order.SELECT_ORDER_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Order.SELECT_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//删除订单明细操作
const deleteOrderItem = (orderNo, orderItemId) => {
    return (dispatch, getState) => {
        dispatch({type: Order.ORDERDETAIL_DELETE_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/deleteOrderItem`, fetchParams: {body : {id: orderItemId, orderNo}}}).then((data) => {
            dispatch({type: Order.ORDERDETAIL_DELETE_ORDERITEM_SUCCESS, payload: {id: orderItemId, orderNo}});
        }).catch(err => {
            dispatch({type: Order.ORDERDETAIL_DELETE_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//退单操作
const cancelOrderItem = (orderNo, orderItemId) => {
    return (dispatch, getState) => {
        dispatch({type: Order.ORDERDETAIL_CANCEL_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/cancelOrderItem`, fetchParams: {body : {id: orderItemId, orderNo}}}).then((data) => {
            dispatch({type: Order.ORDERDETAIL_CANCEL_ORDERITEM_SUCCESS, payload: {id: orderItemId, orderNo}});
        }).catch(err => {
            dispatch({type: Order.ORDERDETAIL_CANCEL_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//标记订单项已出菜
const shippedOrderItem = (orderNo, orderItemId) => {
    return (dispatch, getState) => {
        dispatch({type: Order.ORDERDETAIL_SHIPPED_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/shippedOrderItem`, fetchParams: {body : {id: orderItemId, orderNo}}}).then((data) => {
            dispatch({type: Order.ORDERDETAIL_SHIPPED_ORDERITEM_SUCCESS, payload: {id: orderItemId, orderNo}});
        }).catch(err => {
            dispatch({type: Order.ORDERDETAIL_SHIPPED_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//标记为已上菜
const receiveOrderItem = (orderNo, orderItemId) => {
    return (dispatch, getState) => {
        dispatch({type: Order.ORDERDETAIL_RECEIVE_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/receiveOrderItem`, fetchParams: {body : {id: orderItemId, orderNo}}}).then((data) => {
            dispatch({type: Order.ORDERDETAIL_RECEIVE_ORDERITEM_SUCCESS, payload: {id: orderItemId, orderNo}});
        }).catch(err => {
            dispatch({type: Order.ORDERDETAIL_RECEIVE_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//确认订单项
const confirmOrderItem = (orderNo, orderItemId, tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: Order.CONFIRM_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/confirmOrderItem`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&orderItemId=${orderItemId}&tableCode=${tableCode}`,
        }}).then((data) => {
            dispatch({type: Order.CONFIRM_ORDERITEM_SUCCESS, payload: {orderNo, orderItemId, result: data.result}});
            return data.result;
        }).catch(err => {
            dispatch({type: Order.CONFIRM_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//确认订单
const confirmOrder = (orderNo, tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: Order.CONFIRM_ORDER_PENDING});
        return requestapi({uri: `/api/order/confirmOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&tableCode=${tableCode}`,
        }}).then((data) => {
            dispatch({type: Order.CONFIRM_ORDER_SUCCESS, payload: orderNo});
        }).catch(err => {
            dispatch({type: Order.CONFIRM_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatchConfirmOrder = (orderNo) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Order.CONFIRM_ORDER_SUCCESS,  payload: orderNo})
        );
    }
}

//换台
const changeTableCode = (tableCode, newTableCode) => {
    return (dispatch, getState) => {
        dispatch({type: Order.CHANGE_TABLECODE_PENDING});
        return requestapi({uri: `/api/order/changeTableCode`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `tableCode=${tableCode}&newTableCode=${newTableCode}`,
        }}).then((data) => {
            dispatch({type: Order.CHANGE_TABLECODE_SUCCESS});
        }).catch(err => {
            dispatch({type: Order.CHANGE_TABLECODE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const finishedOrder = (orderNo) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/order/finishedOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}`,
        }}).then((data) => {
            dispatch({type: Order.FINISHED_ORDER_SUCCESS, payload: orderNo});
            return data;
        }).catch(err => {
            throw err;
        });
    }
}

export default {
    selectOrderInfo,
    deleteOrderItem,
    cancelOrderItem,
    shippedOrderItem,
    receiveOrderItem,
    confirmOrderItem,
    confirmOrder,
    dispatchConfirmOrder,
    changeTableCode,
    finishedOrder,
}