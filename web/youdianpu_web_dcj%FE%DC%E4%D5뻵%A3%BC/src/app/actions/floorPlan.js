import { FloorPlan } from '../utils/constants';
import requestapi from '../common/requestapi';

const radioOnChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.SCREEN_RADIO_CHANGE, payload: value })
        );
    }
}

const dispatchInit_local = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.FLOORPLAN_DISPATCH_INIT, payload: data })
        );
    }
}

const dispatchShoppingCart_local = (data, goodsId, extraCodes) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.FLOORPLAN_DISPATCH_SHOPPINGCART, payload: {cartList: data, goodsId, extraCodes} })
        );
    }
}

const listExtra = (goodsId) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.QUERY_GOODSEXTRA_PENDING});
        return requestapi({uri: `/api/floorPlan/listGoodsExtra`, fetchParams: {body: {id: goodsId}}}).then((data) => {
            dispatch({type: FloorPlan.QUERY_GOODSEXTRA_SUCCESS, payload: { goodsId, data }});
            return data;
        }).catch(err => {
            dispatch({type: FloorPlan.QUERY_GOODSEXTRA_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_goodsExtra = (goodsId, data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.QUERY_GOODSEXTRA_SUCCESS, payload: { goodsId, data }})
        );
    }
}

const selectGoods = (goodsId) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.FLOORPLAN_SELECT_GOODS, payload: goodsId })
        );
    }
}

const listTodayGoodsDays = (goodsIds) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.LIST_GOODSDAYS_FLOORPLAN_PENDING});
        return requestapi({uri: `/api/floorPlan/listTodayGoodsDays`, fetchParams: {body: {goodsIds}}}).then((data) => {
            dispatch({type: FloorPlan.LIST_GOODSDAYS_FLOORPLAN_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: FloorPlan.LIST_GOODSDAYS_FLOORPLAN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listEffectiveGoodsDiscount = (goodsIds) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.LIST_GOODSDISCOUNT_FLOORPLAN_PENDING});
        return requestapi({uri: `/api/floorPlan/listEffectiveGoodsDiscount`, fetchParams: {body: {goodsIds}}}).then((data) => {
            dispatch({type: FloorPlan.LIST_GOODSDISCOUNT_FLOORPLAN_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: FloorPlan.LIST_GOODSDISCOUNT_FLOORPLAN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listTodayGoodsDaysAndDiscount = (goodsIds) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.LIST_GOODSDAYSDISCOUNT_FLOORPLAN_PENDING});
        return requestapi({uri: `/api/floorPlan/listTodayGoodsDaysAndDiscount`, fetchParams: {body : {goodsIds}}}).then((data) => {
            dispatch({type: FloorPlan.LIST_GOODSDAYSDISCOUNT_FLOORPLAN_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: FloorPlan.LIST_GOODSDAYSDISCOUNT_FLOORPLAN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const clearGoodsDayDiscount = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.CLEAR_FLOORPLAN_GOODSDAYDISCOUNT })
        );
    }
}

const updateShoppingCart = (row) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.UPDATE_SHOPPING_CART, payload: row })
        );
    }
}
const deleteShoppingCart = (id) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.DELETE_SHOPPING_CART, payload: id })
        );
    }
}

const clearShoppingCart = (tableCode) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.CLEAR_SHOPPING_CART, payload: tableCode })
        );
    }
}

const addCartOrigPrice = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.ADD_SHOPPING_ORIGPRICE })
        );
    }
}

const submitOrder = (cart) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.SUBMIT_ORDER_PENDING});
        return requestapi({uri: `/api/order/submit`, fetchParams: {body : cart}}).then((data) => {
            dispatch({type: FloorPlan.SUBMIT_ORDER_SUCCESS, payload: cart});
            return data.result;
        }).catch(err => {
            dispatch({type: FloorPlan.SUBMIT_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const handleOrderDetailVisible = (flag) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.HANDLE_ORDER_DETAIL_VISIBLE, payload: flag })
        );
    }
}

/**
 * 根据tableCode查询未完成交易、未关闭的所有订单
 * @param {*} tableCode 
 */
const listNoCompleteOrderByTableCode = (tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.LIST_NOCOMPLETE_ORDER_BY_TABLECODE_PENDING});
        return requestapi({uri: `/api/order/listNoCompleteOrderByTableCode`, fetchParams: {body : {tableCode}}}).then((data) => {
            dispatch({type: FloorPlan.LIST_NOCOMPLETE_ORDER_BY_TABLECODE_SUCCESS, payload: {data, tableCode}});
        }).catch(err => {
            dispatch({type: FloorPlan.LIST_NOCOMPLETE_ORDER_BY_TABLECODE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_QRCode = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.DISPATCH_QRCODE, payload: data })
        );
    }
}

//删除订单明细操作
const deleteOrderItem = (orderNo, orderItemId) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.ORDERDETAIL_DELETE_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/deleteOrderItem`, fetchParams: {body : {id: orderItemId, orderNo}}}).then((data) => {
            dispatch({type: FloorPlan.ORDERDETAIL_DELETE_ORDERITEM_SUCCESS, payload: {id: orderItemId, orderNo}});
        }).catch(err => {
            dispatch({type: FloorPlan.ORDERDETAIL_DELETE_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//退单操作
const cancelOrderItem = (orderNo, orderItemId, tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.ORDERDETAIL_CANCEL_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/cancelOrderItem`, fetchParams: {body : {id: orderItemId, orderNo}}}).then((data) => {
            dispatch({type: FloorPlan.ORDERDETAIL_CANCEL_ORDERITEM_SUCCESS, payload: {id: orderItemId, orderNo, tableCode}});
        }).catch(err => {
            dispatch({type: FloorPlan.ORDERDETAIL_CANCEL_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//标记订单项已出菜
const shippedOrderItem = (orderNo, orderItemId) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.ORDERDETAIL_SHIPPED_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/shippedOrderItem`, fetchParams: {body : {id: orderItemId, orderNo}}}).then((data) => {
            dispatch({type: FloorPlan.ORDERDETAIL_SHIPPED_ORDERITEM_SUCCESS, payload: {id: orderItemId, orderNo}});
        }).catch(err => {
            dispatch({type: FloorPlan.ORDERDETAIL_SHIPPED_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//标记订单项为已上菜
const receiveOrderItem = (orderNo, orderItemId) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.ORDERDETAIL_RECEIVE_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/receiveOrderItem`, fetchParams: {body : {id: orderItemId, orderNo}}}).then((data) => {
            dispatch({type: FloorPlan.ORDERDETAIL_RECEIVE_ORDERITEM_SUCCESS, payload: {id: orderItemId, orderNo}});
        }).catch(err => {
            dispatch({type: FloorPlan.ORDERDETAIL_RECEIVE_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//勾选优惠
const subtractOnChange = (subtractId, orderNo, checked) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.ORDERDETAIL_SUBTRACT_ON_CHANGE, payload: {subtractId, orderNo, checked} })
        );
    }
}

//同步支付宝支付结果
const syncAlipayOrderStatus = (orderNo, payMethod) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.SYNC_ALIPAY_ORDER_STATUS_PENDING});
        return requestapi({uri: `/api/order/syncAlipayOrderStatus`, fetchParams: {
            method: "POST",
            headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
			},
            body : `orderNo=${orderNo}&payMethod=${payMethod}`}}).then((data) => {
            dispatch({type: FloorPlan.SYNC_ALIPAY_ORDER_STATUS_SUCCESS, payload: orderNo});
            return data;
        }).catch(err => {
            dispatch({type: FloorPlan.SYNC_ALIPAY_ORDER_STATUS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//同步微信支付结果
const syncWxpayOrderStatus = (orderNo, payMethod) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.SYNC_WXPAY_ORDER_STATUS_PENDING});
        return requestapi({uri: `/api/order/syncWxpayOrderStatus`, fetchParams: {
            method: "POST",
            headers: {
            	'Content-Type': 'application/x-www-form-urlencoded',
			},
            body : `orderNo=${orderNo}&payMethod=${payMethod}`}}).then((data) => {
            dispatch({type: FloorPlan.SYNC_WXPAY_ORDER_STATUS_SUCCESS, payload: orderNo});
            return data;
        }).catch(err => {
            dispatch({type: FloorPlan.SYNC_WXPAY_ORDER_STATUS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//显示当前桌台订单的现金券
const filterCurrCouponConsumes = (orderNo) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.FILTER_CURR_COUPONCONCUME, payload: orderNo })
        );
    }
}

//保存现金券消费记录
const saveCouponConsume = (couponConsume) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.SAVE_COUPONCONSUME_PENDING});
        return requestapi({uri: `/api/floorPlan/couponConsume/save`, fetchParams: {body : couponConsume}}).then((data) => {
            dispatch({type: FloorPlan.SAVE_COUPONCONSUME_SUCCESS, payload: {...couponConsume, id: data.result}});
        }).catch(err => {
            dispatch({type: FloorPlan.SAVE_COUPONCONSUME_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//删除现金券消费记录
const deleteCouponConsume = (id) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.DELETE_COUPONCONSUME_PENDING});
        return requestapi({uri: `/api/floorPlan/couponConsume/delete/${id}`, fetchParams: {method : 'GET'}}).then((data) => {
            dispatch({type: FloorPlan.DELETE_COUPONCONSUME_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: FloorPlan.DELETE_COUPONCONSUME_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//合并其它桌台收银，查询所有桌台(排除桌台自己本身)
const listOtherTables = (tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.LIST_OTHERTABLES_PENDING});
        return requestapi({uri: `/api/floorPlan/table/listOther`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `tableCode=${tableCode}`,
        }, pending: true}).then((data) => {
            dispatch({type: FloorPlan.LIST_OTHERTABLES_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: FloorPlan.LIST_OTHERTABLES_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//合并桌台订单收银
const mergeOrder = (selectedOrderNo, currOrderNo, tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.MERGE_ORDER_PENDING});
        return requestapi({uri: `/api/floorPlan/mergeOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `selectedOrderNo=${selectedOrderNo}&currOrderNo=${currOrderNo}`,
        }, pending: true}).then((data) => {
            dispatch({type: FloorPlan.MERGE_ORDER_SUCCESS, payload: tableCode});
        }).catch(err => {
            dispatch({type: FloorPlan.MERGE_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//取消合并桌台订单收银
const forkOrder = (unSelectedOrderNo, currOrderNo, tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.FORK_ORDER_PENDING});
        return requestapi({uri: `/api/floorPlan/forkOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `unSelectedOrderNo=${unSelectedOrderNo}&currOrderNo=${currOrderNo}`,
        }, pending: true}).then((data) => {
            dispatch({type: FloorPlan.FORK_ORDER_SUCCESS, payload: tableCode});
        }).catch(err => {
            dispatch({type: FloorPlan.FORK_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//处理服务端发来的支付成功消息
const handlePaySuccessMsg = (tableCodes) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.HANDLE_PAYSUCCESS_MSG, payload: tableCodes })
        );
    }
}

//收银操作
const orderGathering = (orderNo, payMethod, payAmount, remark) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.ORDER_GATHERING_PENDING});
        return requestapi({uri: `/api/order/gathering`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&payMethod=${payMethod}&payAmount=${payAmount}${remark ? `&remark=${remark}` : ''}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.ORDER_GATHERING_SUCCESS, payload: orderNo});
            return data.result;
        }).catch(err => {
            dispatch({type: FloorPlan.ORDER_GATHERING_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//确认用餐人数
const onDinersFormFieldChange = (tableCode, values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.ON_DINERSFORM_FIELD_CHANGE, payload: {tableCode, values} })
        );
    }
}

const resetDinersFormData = (tableCode) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.ON_DINERSFORM_FIELD_RESET, payload: tableCode })
        );
    }
}

//实际支付文本框change事件
const onReceviedAmountChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.ON_RECEVIEDAMOUNT_CHANGE, payload: value })
        );
    }
}

//查询本地[减免或折扣]与现金券是否可以同时享受
const dispatch_ESCT = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.SELECT_ESCT_VALUE, payload: value })
        );
    }
}

//查询所有前台扫码支付订单
const listPayOrder = () => {    
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.LIST_PAYORDER_PENDING});
        return requestapi({uri: `/api/floorPlan/listPayOrder`}).then((data) => {
            dispatch({type: FloorPlan.LIST_PAYORDER_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: FloorPlan.LIST_PAYORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//删除顾客前台扫码，但是中途取消支付的订单
const deletePayOrder = (id) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.DELETE_PAYORDER_PENDING});
        return requestapi({uri: `/api/floorPlan/deletePayOrder/${id}`, fetchParams: {method : 'GET'}}).then((data) => {
            dispatch({type: FloorPlan.DELETE_PAYORDER_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: FloorPlan.DELETE_PAYORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//确认用餐订单关联支付单
const relateFrontOrder = (orderNo, payOrderIds, remark) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.RELATE_FRONTORDER_PENDING});
        return requestapi({uri: `/api/order/relateFrontOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&payOrderIds=${payOrderIds.join(",")}${remark ? `&remark=${remark}` : ''}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.RELATE_FRONTORDER_SUCCESS, payload: {orderNo, payOrderIds}});
            return data.result;
        }).catch(err => {
            dispatch({type: FloorPlan.RELATE_FRONTORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//完成订单
const finishedOrder = (orderNo, tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.FINISHED_ORDER_PENDING});
        return requestapi({uri: `/api/order/finishedOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}`,
        }}).then((data) => {
            //合并完成订单,
            if(data.length > 0) {
                dispatch({type: FloorPlan.FINISHED_ORDER_SUCCESS, payload: {orderNo, tableCodes: data}});
            } else {
                dispatch({type: FloorPlan.FINISHED_ORDER_SUCCESS, payload: {orderNo, tableCode}});
            }
            return data;
        }).catch(err => {
            dispatch({type: FloorPlan.FINISHED_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//将桌台设置为空闲，需校验一下当前桌台是否有未完成的订单
const countByTableCode = (tableCode) => {    
    return (dispatch, getState) => {
        return requestapi({uri: `/api/order/countOrderByTableCode`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `tableCode=${tableCode}`,
        }, pending: true}).then((data) => {
            return data.result;
        }).catch(err => {
            throw err;
        });
    }
}

//所有桌台状态
const dispatch_tableStatus = (allTableStatus) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.FLOORPLAN_DISPATCH_TABLESTATUS, payload: allTableStatus })
        );
    }
}


//修改桌台状态
const changeTableStatus = ({tableCode, status}) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.FLOORPLAN_CHANGE_TABLESTATUS, payload: {tableCode, status} })
        );
    }
}

//复制其它桌台订单 下单
const copyOrder = (sourceTableCode, targetTableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.COPY_ORDER_PENDING});
        return requestapi({uri: `/api/order/copyOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `sourceTableCode=${sourceTableCode}&targetTableCode=${targetTableCode}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.COPY_ORDER_SUCCESS, payload: targetTableCode});
        }).catch(err => {
            dispatch({type: FloorPlan.COPY_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectMemberInfo = (phone) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.SELECT_MEMBERDETAIL_FLOORPLAN_PENDING});
        return requestapi({uri: `/api/member/selectDetailByPhone`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `phone=${phone}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.SELECT_MEMBERDETAIL_FLOORPLAN_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: FloorPlan.SELECT_MEMBERDETAIL_FLOORPLAN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const resetMemberInfo = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.FLOORPLAN_RESET_MEMBERINFO})
        );
    }
}

//会员消费
const memberConsume = (orderNo, phone, code) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.MEMBER_CONSUME_PENDING});
        return requestapi({uri: `/api/order/memberConsume`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&phone=${phone}&code=${code}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.MEMBER_CONSUME_SUCCESS, payload: orderNo});
        }).catch(err => {
            dispatch({type: FloorPlan.MEMBER_CONSUME_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//消费动态密码
const getMemberConsumeCode = (phone) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.GET_MEMBER_CONSUME_CODE_PENDING});
        return requestapi({uri: `/api/order/getMemberConsumeCode`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `phone=${phone}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.GET_MEMBER_CONSUME_CODE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: FloorPlan.GET_MEMBER_CONSUME_CODE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//60s倒计时
const countDown = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.FLOORPLAN_MEMBER_CONSUME_COUNTDOWN})
        );
    }
}

//根据桌台编号查询正在用餐订单补打小票
const selectOrderByTableCode = (tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.SELECT_ORDER_BYTABLECODE_PENDING});
        return requestapi({uri: `/api/order/selectOrderByTableCode`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `tableCode=${tableCode}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.SELECT_ORDER_BYTABLECODE_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: FloorPlan.SELECT_ORDER_BYTABLECODE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//确认订单
const confirmOrder = (orderNo, tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.CONFIRM_ORDER_PENDING});
        return requestapi({uri: `/api/order/confirmOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&tableCode=${tableCode}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.CONFIRM_ORDER_SUCCESS, payload: orderNo});
        }).catch(err => {
            dispatch({type: FloorPlan.CONFIRM_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatchConfirmOrder = (orderNo) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.CONFIRM_ORDER_SUCCESS,  payload: orderNo})
        );
    }
}

//确认订单项
const confirmOrderItem = (orderNo, orderItemId, tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.CONFIRM_ORDERITEM_PENDING});
        return requestapi({uri: `/api/order/confirmOrderItem`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&orderItemId=${orderItemId}&tableCode=${tableCode}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.CONFIRM_ORDERITEM_SUCCESS, payload: {orderNo, orderItemId, result: data.result}});
            return data.result;
        }).catch(err => {
            dispatch({type: FloorPlan.CONFIRM_ORDERITEM_FAILURE, payload: err.message});
            throw err;
        });
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

const updatePrintStatusByOrderItemIds = (orderItemIds) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/order/updatePrintStatusByOrderItemIds`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderItemIds=${orderItemIds}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.UPDATE_PRINTSTATUS_SUCCESS, payload: orderItemIds});
        }).catch(err => {
            throw err;
        });
    }
}

//收银表单change
const paymentFormFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: FloorPlan.ON_PAYMENTFORMDATA_FIELDS_CHANGE, payload: values})
        );
    }
}

//收银表单重置
const paymentFormResetFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: FloorPlan.ON_PAYMENTFORMDATA_FIELDS_RESET})
        );
    }
}

//换台
const changeTableCode = (tableCode, newTableCode) => {
    return (dispatch, getState) => {
        dispatch({type: FloorPlan.CHANGE_TABLECODE_PENDING});
        return requestapi({uri: `/api/order/changeTableCode`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `tableCode=${tableCode}&newTableCode=${newTableCode}`,
        }}).then((data) => {
            dispatch({type: FloorPlan.CHANGE_TABLECODE_SUCCESS});
        }).catch(err => {
            dispatch({type: FloorPlan.CHANGE_TABLECODE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_goodsExtras = (goodsExtraMap) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.DISPATCH_GOODSEXTRAS_SUCCESS, payload: goodsExtraMap})
        );
    }
}

const dispatch_listTodayGoodsDays = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.LIST_GOODSDAYS_FLOORPLAN_SUCCESS, payload: {goodsDays: data}})
        );
    }
}

const dispatch_listEffectiveGoodsDiscount = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.LIST_GOODSDISCOUNT_FLOORPLAN_SUCCESS, payload: {goodsDiscounts: data}})
        );
    }
}

const dispatch_listTodayGoodsDaysAndDiscount = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.LIST_GOODSDAYSDISCOUNT_FLOORPLAN_SUCCESS, payload: {goodsDays: data[0], goodsDiscounts: data[1]}})
        );
    }
}

const dispatch_submitOrderPending = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: FloorPlan.SUBMIT_ORDER_PENDING})
        );
    }
}

const dispatch_submitOrderSuccess = (cart) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: FloorPlan.SUBMIT_ORDER_SUCCESS, payload: cart})
        );
    }
}

const dispatch_submitOrderFailure = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: FloorPlan.SUBMIT_ORDER_FAILURE})
        );
    }
}

export default {
    radioOnChange,
    dispatchInit_local,
    dispatchShoppingCart_local,
    listExtra,
    dispatch_goodsExtra,
    selectGoods,
    listTodayGoodsDays,
    listEffectiveGoodsDiscount,
    listTodayGoodsDaysAndDiscount,
    clearGoodsDayDiscount,
    updateShoppingCart,
    deleteShoppingCart,
    clearShoppingCart,
    addCartOrigPrice,
    submitOrder,
    handleOrderDetailVisible,
    listNoCompleteOrderByTableCode,
    dispatch_QRCode,
    deleteOrderItem,
    cancelOrderItem,
    shippedOrderItem,
    receiveOrderItem,
    subtractOnChange,
    syncAlipayOrderStatus,
    syncWxpayOrderStatus,
    filterCurrCouponConsumes,
    saveCouponConsume,
    deleteCouponConsume,
    listOtherTables,
    mergeOrder,
    forkOrder,
    handlePaySuccessMsg,
    orderGathering,
    onDinersFormFieldChange,
    resetDinersFormData,
    onReceviedAmountChange,
    dispatch_ESCT,
    listPayOrder,
    deletePayOrder,
    relateFrontOrder,
    finishedOrder,
    countByTableCode,
    dispatch_tableStatus,
    changeTableStatus,
    copyOrder,
    selectMemberInfo,
    resetMemberInfo,
    memberConsume,
    getMemberConsumeCode,
    countDown,
    selectOrderByTableCode,
    confirmOrder,
    dispatchConfirmOrder,
    confirmOrderItem,
    updateOrderItemPrintStatus,
    updatePrintStatusByOrderItemIds,
    paymentFormFieldChangeValue,
    paymentFormResetFields,
    changeTableCode,
    dispatch_goodsExtras,
    dispatch_listTodayGoodsDays,
    dispatch_listEffectiveGoodsDiscount,
    dispatch_listTodayGoodsDaysAndDiscount,
    dispatch_submitOrderPending,
    dispatch_submitOrderSuccess,
    dispatch_submitOrderFailure,
}