import { CurrOrder } from '../utils/constants';
import requestapi from '../common/requestapi';

//加载当前用餐订单列表
const list = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: CurrOrder.LIST_CURRORDER_PENDING});
        return requestapi({uri: `/api/order/list`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: CurrOrder.LIST_CURRORDER_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: CurrOrder.LIST_CURRORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}
//查询表单change事件
const onSearchFromFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CurrOrder.CURRORDER_SEARCHFORM_CHANGE, payload: values})
        );
    }
}

//重置查询表单
const resetSearchFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CurrOrder.CURRORDER_SEARCHFORM_RESET})
        );
    }
}

//加载订单明细
const listOrderItem = (orderId) => {
    return (dispatch, getState) => {
        dispatch({type: CurrOrder.LIST_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/listOrderItem/${orderId}`, fetchParams: {method : 'GET'}}).then((data) => {
            dispatch({type: CurrOrder.LIST_ORDERITEM_SUCCESS, payload: {data, orderId}});
        }).catch(err => {
            dispatch({type: CurrOrder.LIST_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onRemarkChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CurrOrder.CURRORDER_ONREMARK_CHANGE, payload: value})
        );
    }
}

const handleRemarkModal = (id) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CurrOrder.CURRORDER_HANDLE_REMARKMODAL, payload: id})
        );
    }
}

//修改备注
const modifyRemark = (id, remark) => {
    return (dispatch, getState) => {
        dispatch({type: CurrOrder.MODIFY_ORDERREMARK_PENDING});
        return requestapi({uri: `/api/order/modifyRemark`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderId=${id}&remark=${remark}`,
        }}).then((data) => {
            dispatch({type: CurrOrder.MODIFY_ORDERREMARK_SUCCESS, payload: {id, remark}});
        }).catch(err => {
            dispatch({type: CurrOrder.MODIFY_ORDERREMARK_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//取消订单
const cancelOrder = (orderNo) => {
    return (dispatch, getState) => {
        dispatch({type: CurrOrder.CANCEL_CURRORDER_PENDING});
        return requestapi({uri: `/api/order/cancelOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}`,
        }}).then((data) => {
            dispatch({type: CurrOrder.CANCEL_CURRORDER_SUCCESS, payload: orderNo});
        }).catch(err => {
            dispatch({type: CurrOrder.CANCEL_CURRORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//删除订单
const deleteOrder = (orderNo) => {
    return (dispatch, getState) => {
        dispatch({type: CurrOrder.DELETE_CURRORDER_PENDING});
        return requestapi({uri: `/api/order/deleteOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}`,
        }}).then((data) => {
            dispatch({type: CurrOrder.DELETE_CURRORDER_SUCCESS, payload: orderNo});
        }).catch(err => {
            dispatch({type: CurrOrder.DELETE_CURRORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//处理查询条件
const handleSearch = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CurrOrder.CURRORDER_HANDLE_SEARCH, payload: values})
        );
    }
}

//补差价表单change事件
const onDivergenceFromFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CurrOrder.CURRORDER_DIVERGENCE_FORM_CHANGE, payload: values})
        );
    }
}

//重置补差价表单
const resetDivergenceFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CurrOrder.CURRORDER_DIVERGENCE_FORM_RESET})
        );
    }
}

const dispatchCurrOrder = (orderId) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CurrOrder.DISPATCH_CURR_ORDER, payload: orderId})
        );
    }
}

//当关闭关联前台扫码支付单窗口时候需重置支付方式
const resetPayMethod = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: CurrOrder.CURRORDER_RESET_PAYMETHOD})
        );
    }
}

export default {
    list,
    onSearchFromFieldChangeValue,
    resetSearchFormFields,
    listOrderItem,
    onRemarkChange,
    handleRemarkModal,
    modifyRemark,
    cancelOrder,
    deleteOrder,
    handleSearch,
    onDivergenceFromFieldChangeValue,
    resetDivergenceFormFields,
    dispatchCurrOrder,
    resetPayMethod,
}