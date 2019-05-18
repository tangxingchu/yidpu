import { HisOrder } from '../utils/constants';
import requestapi from '../common/requestapi';

//加载历史订单列表
const list = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: HisOrder.LIST_HISORDER_PENDING});
        return requestapi({uri: `/api/hisOrder/list`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: HisOrder.LIST_HISORDER_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HisOrder.LIST_HISORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}
//查询表单change事件
const onSearchFromFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_SEARCHFORM_CHANGE, payload: values})
        );
    }
}

//重置查询表单
const resetSearchFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_SEARCHFORM_RESET})
        );
    }
}

//退款
const refund = (orderNo, refundLimit, refundMethod, refundAmount, refundReason, confirmPWD) => {
    return (dispatch, getState) => {
        dispatch({type: HisOrder.REFUND_HISORDER_PENDING});
        return requestapi({uri: `/api/hisOrder/refund`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&refundLimit=${refundLimit}&refundMethod=${refundMethod}
                &refundAmount=${refundAmount}&refundReason=${refundReason}${confirmPWD ? `&validationPWD=${confirmPWD}` : ''}`,
        }}).then((data) => {
            dispatch({type: HisOrder.REFUND_HISORDER_SUCCESS, payload: {orderNo, refundAmount}});
        }).catch(err => {
            dispatch({type: HisOrder.REFUND_HISORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//前台扫码输入金额支付单退款
const refundFront = (orderNo, payOrderNo, refundLimit, refundMethod, refundAmount, refundReason, confirmPWD, tableCode) => {
    return (dispatch, getState) => {
        dispatch({type: HisOrder.REFUND_HISORDER_PENDING});
        return requestapi({uri: `/api/hisOrder/refundFront`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&payOrderNo=${payOrderNo}&refundLimit=${refundLimit}&refundMethod=${refundMethod}
                &refundAmount=${refundAmount}&refundReason=${refundReason}${confirmPWD ? `&validationPWD=${confirmPWD}` : ''}&tableCode=${tableCode}`,
        }}).then((data) => {
            dispatch({type: HisOrder.REFUND_HISORDER_SUCCESS, payload: {orderNo, payOrderNo, refundAmount}});
        }).catch(err => {
            dispatch({type: HisOrder.REFUND_HISORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//退款原因界面
const handleRefundData = (tableCode, orderNo, payOrderNo) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HANDLE_REFUNDATA, payload: {tableCode, orderNo, payOrderNo}})
        );
    }
}

//退款界面表单change事件
const refundFormFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_REFUNFORM_CHANGE, payload: values})
        );
    }
}

//加载订单明细
const listOrderItem = (tableCode, orderNo, payMethod) => {
    return (dispatch, getState) => {
        dispatch({type: HisOrder.LIST_ORDERITEM_HIS_PENDING});
        return requestapi({uri: `/api/hisOrder/listOrderItem`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&payMethod=${payMethod}`,
        }}).then((data) => {
            dispatch({type: HisOrder.LIST_ORDERITEM_HIS_SUCCESS, payload: {data, orderNo, tableCode}});
        }).catch(err => {
            dispatch({type: HisOrder.LIST_ORDERITEM_HIS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//登录密码change事件
const onConfirmPWDFormChange = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_CONFIRMPWDFORM_CHANGE, payload: values})
        );
    }
}

//重置退款校验密码
const resetConfirmPWDForm = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_CONFIRMPWDFORM_RESET})
        );
    }
}

//修改历史订单备注
const modifyRemark = (orderNo, remark) => {
    return (dispatch, getState) => {
        dispatch({type: HisOrder.MODIFY_ORDERHISREMARK_PENDING});
        return requestapi({uri: `/api/hisOrder/modifyRemark`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderNo=${orderNo}&remark=${remark}`,
        }}).then((data) => {
            dispatch({type: HisOrder.MODIFY_ORDERHISREMARK_SUCCESS, payload: {orderNo, remark}});
        }).catch(err => {
            dispatch({type: HisOrder.MODIFY_ORDERHISREMARK_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onRemarkChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_ONREMARK_CHANGE, payload: value})
        );
    }
}

const handleRemarkModal = (orderNo) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_HANDLE_REMARKMODAL, payload: orderNo})
        );
    }
}
//查询 与我合并支付的订单
const listOrderHisByOutTradeNo = (outTradeNo) => {
    return (dispatch, getState) => {
        dispatch({type: HisOrder.LIST_HISORDER_BYOUTTRADENO_PENDING});
        return requestapi({uri: `/api/hisOrder/listOrderHisByOutTradeNo`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `outTradeNo=${outTradeNo}`,
        }}).then((data) => {
            dispatch({type: HisOrder.LIST_HISORDER_BYOUTTRADENO_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HisOrder.LIST_HISORDER_BYOUTTRADENO_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询所有本地sqlite桌台
const dispatchAllTables = (tables) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_LOCAL_TABLES, payload: tables})
        );
    }
}

//处理查询条件
const handleSearch = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_HANDLE_SEARCH, payload: values})
        );
    }
}

const generatePhoneCode = () => {
    return (dispatch, getState) => {
        dispatch({type: HisOrder.HISORDER_PHONECODE_PENDING});
        return requestapi({uri: `/api/generatePhoneCode`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `codeType=REFUND`,
        }}).then((data) => {
            dispatch({type: HisOrder.HISORDER_PHONECODE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HisOrder.HISORDER_PHONECODE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//60秒倒计时
const down = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HisOrder.HISORDER_DONW_60, payload: value})
        );
    }
}

export default {
    list,
    onSearchFromFieldChangeValue,
    resetSearchFormFields,
    refund,
    refundFront,
    handleRefundData,
    refundFormFieldChangeValue,
    listOrderItem,
    onConfirmPWDFormChange,
    resetConfirmPWDForm,
    modifyRemark,
    onRemarkChange,
    handleRemarkModal,
    listOrderHisByOutTradeNo,
    dispatchAllTables,
    handleSearch,
    generatePhoneCode,
    down,
}