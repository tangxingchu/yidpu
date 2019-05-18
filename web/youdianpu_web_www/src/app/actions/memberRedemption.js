import { MemberRedemption } from '../utils/constants'
import requestapi from '../common/requestapi';

//菜单选中事件
const onMenuSelect = (selectedKeys) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.REDEMPTION_ONMENU_SELECT, payload: selectedKeys})
        );
    }
}

//路由change事件
const changeRouter = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.REDEMPTION_ROUTER_CHANGE, payload: value})
        );
    }
}

const onPhoneChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.REDEMPTION_ON_PHONE_CHANGE, payload: value})
        );
    }
}

const giftFormFieldsChange = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.GIFT_FORMDATA_CHANGE, payload: values})
        );
    }
}

const giftFormReset = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.GIFT_FORMDATA_RESET})
        );
    }
}

//查询gift列表
const listGift = (pageSize, pageNum) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.LIST_GIFT_PENDING});
        return requestapi({uri: `/api/memberRedemption/list`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `pageSize=${pageSize}&pageNum=${pageNum}`,
        }}).then((data) => {
            dispatch({type: MemberRedemption.LIST_GIFT_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRedemption.LIST_GIFT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询明细
const selectGiftById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.SELECT_GIFT_PENDING});
        return requestapi({uri: `/api/memberRedemption/selectById`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}`,
        }}).then((data) => {
            dispatch({type: MemberRedemption.SELECT_GIFT_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRedemption.SELECT_GIFT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//新增gift
const saveGift = (gift) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.SAVE_GIFT_PENDING});
        return requestapi({uri: `/api/memberRedemption/save`, fetchParams: {body: gift}}).then((data) => {
            dispatch({type: MemberRedemption.SAVE_GIFT_SUCCESS, payload: gift});
        }).catch(err => {
            dispatch({type: MemberRedemption.SAVE_GIFT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//修改gift
const updateGift = (gift) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.UPDATE_GIFT_PENDING});
        return requestapi({uri: `/api/memberRedemption/update`, fetchParams: {body: gift}}).then((data) => {
            dispatch({type: MemberRedemption.UPDATE_GIFT_SUCCESS, payload: gift});
        }).catch(err => {
            dispatch({type: MemberRedemption.UPDATE_GIFT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//删除gift
const deleteGift = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.DELETE_GIFT_PENDING});
        return requestapi({uri: `/api/memberRedemption/delete`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}`,
        }}).then((data) => {
            dispatch({type: MemberRedemption.DELETE_GIFT_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: MemberRedemption.DELETE_GIFT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询会员积分
const selectMemberPoint = (phone) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.SELECT_MEMBER_POINT_PENDING});
        return requestapi({uri: `/api/member/selectMemberPoint`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `phone=${phone}`,
        }}).then((data) => {
            dispatch({type: MemberRedemption.SELECT_MEMBER_POINT_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRedemption.SELECT_MEMBER_POINT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onGiftSelect = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.GIFT_ONGIFT_SELECT, payload: value})
        );
    }
}

//兑换礼品
const redemptionGift = (memberId, giftId, changeDesc) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.REDEMPTION_GIFT_PENDING});
        return requestapi({uri: `/api/memberRedemption/redemptionGift`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `memberId=${memberId}&giftId=${giftId}&changeDesc=${changeDesc}`,
        }}).then((data) => {
            dispatch({type: MemberRedemption.REDEMPTION_GIFT_SUCCESS, payload: giftId});
        }).catch(err => {
            dispatch({type: MemberRedemption.REDEMPTION_GIFT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//积分返现
const redemptionCash = (memberId, point, changeDesc) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.REDEMPTION_CASH_PENDING});
        return requestapi({uri: `/api/memberRedemption/redemptionCash`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `memberId=${memberId}&point=${point}&changeDesc=${changeDesc}`,
        }}).then((data) => {
            dispatch({type: MemberRedemption.REDEMPTION_CASH_SUCCESS, payload: point});
        }).catch(err => {
            dispatch({type: MemberRedemption.REDEMPTION_CASH_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询积分返现1元需要多少积分
const selectPointCash = () => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.SELECT_POINTCASH_PENDING});
        return requestapi({uri: `/api/memberRedemption/selectPointCash`}).then((data) => {
            dispatch({type: MemberRedemption.SELECT_POINTCASH_SUCCESS, payload: data.result});
        }).catch(err => {
            dispatch({type: MemberRedemption.SELECT_POINTCASH_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const pointCashFormFieldsChange = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.POINTCASH_FORM_FIELDS_CHANGE, payload: values})
        );
    }
}


const listChangeHis = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRedemption.LIST_REDEMPTIONHIS_PENDING});
        return requestapi({uri: `/api/memberRedemption/listChangeHis`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: MemberRedemption.LIST_REDEMPTIONHIS_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRedemption.LIST_REDEMPTIONHIS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const searchFormFieldChangeValue = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.MEMBERREDEMPTION_SEARCHFORM_CHANGE, payload: value})
        );
    }
}

const resetSearchFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.MEMBERREDEMPTION_SEARCHFORM_RESET})
        );
    }
}

const handleSearch = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRedemption.MEMBERREDEMPTION_HANDLE_SEARCH, payload: value})
        );
    }
}

export default {
    onMenuSelect,
    changeRouter,
    onPhoneChange,
    giftFormFieldsChange,
    giftFormReset,
    listGift,
    selectGiftById,
    saveGift,
    updateGift,
    deleteGift,
    selectMemberPoint,
    onGiftSelect,
    redemptionGift,
    redemptionCash,
    selectPointCash,
    pointCashFormFieldsChange,
    listChangeHis,
    searchFormFieldChangeValue,
    resetSearchFormFields,
    handleSearch,
}