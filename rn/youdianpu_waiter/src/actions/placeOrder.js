import { PlaceOrder } from '../utils/constants';
import requestapi from '../common/requestapi';

//商品特价与折扣信息
const listTodayGoodsDaysAndDiscount = () => {
    return (dispatch, getState) => {
        dispatch({type: PlaceOrder.LIST_GOODSDAYSDISCOUNT_PENDING});
        return requestapi({uri: `/api/waiter/listTodayGoodsDaysAndDiscount`}).then((data) => {
            dispatch({type: PlaceOrder.LIST_GOODSDAYSDISCOUNT_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: PlaceOrder.LIST_GOODSDAYSDISCOUNT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const submitOrder = (cart) => {
    return (dispatch, getState) => {
        dispatch({type: PlaceOrder.SUBMIT_ORDER_PENDING});
        return requestapi({uri: `/api/order/submit`, fetchParams: {body : cart}}).then((data) => {
            dispatch({type: PlaceOrder.SUBMIT_ORDER_SUCCESS, payload: cart});
            return data.result;
        }).catch(err => {
            dispatch({type: PlaceOrder.SUBMIT_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_checkedGoodsExtraItem = (goodsExtra, extraItem) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: PlaceOrder.CHECKED_GOODS_EXTRAITEM_SUCCESS, payload: {goodsExtra, extraItem} })
        );
    }
}

const dispatch_goodsExtra = (goodsId, extras) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: PlaceOrder.DISPATCH_GOODSEXTRA_SUCCESS, payload: {goodsId, extras}})
        );
    }
}

const dispatch_goodsExtras = (goodsExtraMap) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: PlaceOrder.DISPATCH_GOODSEXTRAS_SUCCESS, payload: goodsExtraMap})
        );
    }
}

//修改订单项的后厨打印状态
const updateOrderItemPrintStatus = (tableCode) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/order/updateOrderItemPrintStatus`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `tableCode=${tableCode}`,
        }}).then((data) => {
            return data;
        }).catch(err => {
            throw err;
        });
    }
}

const listCurrentSubtract = (totalPrice) => {
    return requestApi({uri: `/api/mobile/listCurrentSubtract`,  fetchParams: {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `totalPrice=${totalPrice}`
    }}).then((data) => {
        dispatch({type: PlaceOrder.LIST_CURRENT_SUBTRACT_SUCCESS, payload: data});
        return data;
    }).catch(err => {
        throw err;
    });
}

export default {
    listTodayGoodsDaysAndDiscount,
    submitOrder,
    dispatch_checkedGoodsExtraItem,
    dispatch_goodsExtra,
    dispatch_goodsExtras,
    updateOrderItemPrintStatus,
    listCurrentSubtract,
}