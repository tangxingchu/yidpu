import { Rule } from '../utils/constants';
import requestapi from '../common/requestapi';

/**
 * 运营规则配置
 */
const init = () => {
    return (dispatch, getState) => {
        dispatch({type: Rule.INIT_GOODS_RULE_PENDING});
        return requestapi({uri: `/api/rule/init`}).then((data) => {
            dispatch({type: Rule.INIT_GOODS_RULE_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: Rule.INIT_GOODS_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const updateConfig = (basicConfig) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.RULE_UPDATE_BASIC_CONFIG_PENDING, payload: basicConfig});
        return requestapi({uri: `/api/config/update`, fetchParams: {body: basicConfig}}).then((data) => {
            dispatch({type: Rule.RULE_UPDATE_BASIC_CONFIG_SUCCESS, payload: basicConfig});
        }).catch(err => {
            dispatch({type: Rule.RULE_UPDATE_BASIC_CONFIG_FAILURE, payload: basicConfig});
            throw err;
        });
    }
}

const saveGoodsDay = (goodsDays) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.SAVE_GOODSDAY_RULE_PENDING});
        return requestapi({uri: `/api/rule/saveGoodsDay`, fetchParams: {body: goodsDays}}).then((data) => {
            dispatch({type: Rule.SAVE_GOODSDAY_RULE_SUCCESS});
        }).catch(err => {
            dispatch({type: Rule.SAVE_GOODSDAY_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteGoodsDay = (id) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.DELETE_GOODSDAY_RULE_PENDING});
        return requestapi({uri: `/api/rule/deleteGoodsDay`, fetchParams: {body: {id}}}).then((data) => {
            dispatch({type: Rule.DELETE_GOODSDAY_RULE_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: Rule.DELETE_GOODSDAY_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listGoodsDay = () => {
    return (dispatch, getState) => {
        dispatch({type: Rule.LIST_GOODSDAY_RULE_PENDING});
        return requestapi({uri: `/api/rule/listGoodsDay`}).then((data) => {
            dispatch({type: Rule.LIST_GOODSDAY_RULE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Rule.LIST_GOODSDAY_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatchGoodsList = (goodsList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Rule.DISPATCH_RULE_GOODSLIST, payload: goodsList})
        );
    }
}

const onTableChange = (selectedRowKeys, selectedRows) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_GOODSDAY_ON_TABLE_CHANGE, payload: {selectedRowKeys, selectedRows} })
        );
    }
}

const nextGoodsDay = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_GOODSDAY_STEUP_ONNEXT })
        );
    }
}

const prevGoodsDay = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_GOODSDAY_STEUP_ONPREV })
        );
    }
}

const dispatchCurrentWeek = (week) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_DISPATCH_CURRENT_WEEK, payload: week })
        );
    }
}

const onDaysEffectiveTimeChange = (date, dateStr) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_DAYS_EFFECTIVETIME_CHANGE, payload: {date, dateStr} })
        );
    }
}
const onDaysExpiredTimeChange = (date, dateStr) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_DAYS_EXPIREDTIME_CHANGE, payload: {date, dateStr} })
        );
    }
}
const onDaysPriceChange = (goodsId, newPrice) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_DAYS_PRICE_CHANGE, payload: {goodsId, newPrice}})
        );
    }
}
const onDaysLimitChange = (goodsId, limitNum) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_DAYS_LIMIT_CHANGE, payload: {goodsId, limitNum}})
        );
    }
}

const resetGoodsDayStep = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_RESET_GOODSDAY_STEP})
        );
    }
}

const saveGoodsDiscount = (goodsDiscounts) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.SAVE_GOODSDISCOUNT_RULE_PENDING});
        return requestapi({uri: `/api/rule/saveGoodsDiscount`, fetchParams: {body: goodsDiscounts}}).then((data) => {
            dispatch({type: Rule.SAVE_GOODSDISCOUNT_RULE_SUCCESS});
        }).catch(err => {
            dispatch({type: Rule.SAVE_GOODSDISCOUNT_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteGoodsDiscount = (id) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.DELETE_GOODSDISCOUNT_RULE_PENDING});
        return requestapi({uri: `/api/rule/deleteGoodsDiscount`, fetchParams: {body: {id}}}).then((data) => {
            dispatch({type: Rule.DELETE_GOODSDISCOUNT_RULE_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: Rule.DELETE_GOODSDISCOUNT_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listGoodsDiscount = () => {
    return (dispatch, getState) => {
        dispatch({type: Rule.LIST_GOODSDISCOUNT_RULE_PENDING});
        return requestapi({uri: `/api/rule/listGoodsDiscount`}).then((data) => {
            dispatch({type: Rule.LIST_GOODSDISCOUNT_RULE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Rule.LIST_GOODSDISCOUNT_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onTableChange_discount = (selectedRowKeys, selectedRows) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_GOODSDISCOUNT_ON_TABLE_CHANGE, payload: {selectedRowKeys, selectedRows} })
        );
    }
}

const nextGoodsDiscount = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_GOODSDISCOUNT_STEUP_ONNEXT })
        );
    }
}

const prevGoodsDiscount = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_GOODSDISCOUNT_STEUP_ONPREV })
        );
    }
}

const resetGoodsDiscountStep = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_RESET_GOODSDISCOUNT_STEP})
        );
    }
}

const onDiscountEffectiveTimeChange = (date, dateStr) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_DISCOUNT_EFFECTIVETIME_CHANGE, payload: {date, dateStr} })
        );
    }
}
const onDiscountExpiredTimeChange = (date, dateStr) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_DISCOUNT_EXPIREDTIME_CHANGE, payload: {date, dateStr} })
        );
    }
}
const onDiscountChange = (goodsId, discountValue) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_DISCOUNT_CHANGE, payload: {goodsId, discountValue}})
        );
    }
} 

const saveGoodsSubtract = (goodsSubtract) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.SAVE_GOODSSUBTRACT_RULE_PENDING});
        return requestapi({uri: `/api/rule/saveGoodsSubtract`, fetchParams: {body: goodsSubtract}}).then((data) => {
            dispatch({type: Rule.SAVE_GOODSSUBTRACT_RULE_SUCCESS});
        }).catch(err => {
            dispatch({type: Rule.SAVE_GOODSSUBTRACT_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteGoodsSubtract = (id) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.DELETE_GOODSSUBTRACT_RULE_PENDING});
        return requestapi({uri: `/api/rule/deleteGoodsSubtract`, fetchParams: {body: {id}}}).then((data) => {
            dispatch({type: Rule.DELETE_GOODSSUBTRACT_RULE_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: Rule.DELETE_GOODSSUBTRACT_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listGoodsSubtract = () => {
    return (dispatch, getState) => {
        dispatch({type: Rule.LIST_GOODSSUBTRACT_RULE_PENDING});
        return requestapi({uri: `/api/rule/listGoodsSubtract`}).then((data) => {
            dispatch({type: Rule.LIST_GOODSSUBTRACT_RULE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Rule.LIST_GOODSSUBTRACT_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const goodsSubtractFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_SUBTRACT_FIELD_CHANGE, payload: values})
        );
    }
}

const goodsSubtractResetField = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_SUBTRACT_RESET_FIELD})
        );
    }
}

const enabledGoodsSubtract = (goodsSubtract) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.ENABLED_GOODSSUBTRACT_RULE_PENDING});
        return requestapi({uri: `/api/rule/enabledGoodsSubtract`, fetchParams: {body: goodsSubtract}}).then((data) => {
            dispatch({type: Rule.ENABLED_GOODSSUBTRACT_RULE_SUCCESS, payload: goodsSubtract});
        }).catch(err => {
            dispatch({type: Rule.ENABLED_GOODSSUBTRACT_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const saveGoodsCoupon = (goodsCoupon) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.SAVE_GOODSCOUPON_RULE_PENDING});
        return requestapi({uri: `/api/rule/saveGoodsCoupon`, fetchParams: {body: goodsCoupon}}).then((data) => {
            dispatch({type: Rule.SAVE_GOODSCOUPON_RULE_SUCCESS});
        }).catch(err => {
            dispatch({type: Rule.SAVE_GOODSCOUPON_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteGoodsCoupon = (id) => {
    return (dispatch, getState) => {
        dispatch({type: Rule.DELETE_GOODSCOUPON_RULE_PENDING});
        return requestapi({uri: `/api/rule/deleteGoodsCoupon`, fetchParams: {body: {id}}}).then((data) => {
            dispatch({type: Rule.DELETE_GOODSCOUPON_RULE_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: Rule.DELETE_GOODSCOUPON_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listGoodsCoupon = () => {
    return (dispatch, getState) => {
        dispatch({type: Rule.LIST_GOODSCOUPON_RULE_PENDING});
        return requestapi({uri: `/api/rule/listGoodsCoupon`}).then((data) => {
            dispatch({type: Rule.LIST_GOODSCOUPON_RULE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Rule.LIST_GOODSCOUPON_RULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const goodsCouponFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_COUPON_FIELD_CHANGE, payload: values})
        );
    }
}

const goodsCouponResetField = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Rule.RULE_ON_COUPON_RESET_FIELD})
        );
    }
}

export default {
    init,
    updateConfig,
    saveGoodsDay,
    deleteGoodsDay,
    listGoodsDay,
    dispatchGoodsList,
    onTableChange,
    nextGoodsDay,
    prevGoodsDay,
    dispatchCurrentWeek,
    onDaysEffectiveTimeChange,
    onDaysExpiredTimeChange,
    onDaysPriceChange,
    onDaysLimitChange,
    resetGoodsDayStep,

    saveGoodsDiscount,
    deleteGoodsDiscount,
    listGoodsDiscount,
    onTableChange_discount,
    nextGoodsDiscount,
    prevGoodsDiscount,
    resetGoodsDiscountStep,
    onDiscountEffectiveTimeChange,
    onDiscountExpiredTimeChange,
    onDiscountChange,

    saveGoodsSubtract,
    deleteGoodsSubtract,
    listGoodsSubtract,
    goodsSubtractFieldChangeValue,
    goodsSubtractResetField,
    enabledGoodsSubtract,

    saveGoodsCoupon,
    deleteGoodsCoupon,
    listGoodsCoupon,
    goodsCouponFieldChangeValue,
    goodsCouponResetField,
}