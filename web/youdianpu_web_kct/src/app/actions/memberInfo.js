import { MemberInfo, MemberRankConfig, MemberRechargeRule, MemberRecharge, MemberDelete } from '../utils/constants'
import requestapi from '../common/requestapi';

//会员信息表单change事件
const memberInfoFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberInfo.MEMBER_FORM_CHANGE, payload: values})
        );
    }
}

//重置会员信息表单
const resetMemberInfoFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberInfo.MEMBER_FORM_RESET})
        );
    }
}

//保存会员信息
const save = (memberUser) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.SAVE_MEMBER_PENDING});
        return requestapi({uri: "/api/member/save", fetchParams: {body: memberUser}}).then((data) => {
            dispatch({type: MemberInfo.SAVE_MEMBER_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberInfo.SAVE_MEMBER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询表单change
const searchFormFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberInfo.MEMBER_SEARCHFORM_CHANGE, payload: values})
        );
    }
}

//查询表单重置
const resetSearchFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberInfo.MEMBER_SEARCHFORM_RESET})
        );
    }
}

//处理查询条件
const handleSearch = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberInfo.MEMBER_HANDLE_SEARCH, payload: values})
        );
    }
}


//加载当前用餐订单列表
const list = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.LIST_MEMBER_PENDING});
        return requestapi({uri: `/api/member/list`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: MemberInfo.LIST_MEMBER_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberInfo.LIST_MEMBER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//修改会员
const update = (memberUser) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.UPDATE_MEMBER_PENDING});
        return requestapi({uri: `/api/member/update`, fetchParams: {body: memberUser}}).then((data) => {
            dispatch({type: MemberInfo.UPDATE_MEMBER_SUCCESS, payload: memberUser});
        }).catch(err => {
            dispatch({type: MemberInfo.UPDATE_MEMBER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询会员信息
const selectById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.SELECT_MEMBER_PENDING});
        return requestapi({uri: `/api/member/selectById/${id}`, fetchParams: { method: 'get' } }).then((data) => {
            dispatch({type: MemberInfo.SELECT_MEMBER_SUCCESS, payload: data.result});
        }).catch(err => {
            dispatch({type: MemberInfo.SELECT_MEMBER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//删除会员信息入库delete表
const deleteById = (id, changeDesc) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.DELETE_MEMBER_PENDING});
        return requestapi({uri: `/api/member/deleteById`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}&changeDesc=${changeDesc}`,
        }}).then((data) => {
            dispatch({type: MemberInfo.DELETE_MEMBER_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: MemberInfo.DELETE_MEMBER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//恢复已删除的会员
const recoverById = (id, changeDesc) => {
    return (dispatch, getState) => {
        dispatch({type: MemberDelete.RECOVER_MEMBER_PENDING});
        return requestapi({uri: `/api/member/recoverById`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}&changeDesc=${changeDesc}`,
        }}).then((data) => {
            dispatch({type: MemberDelete.RECOVER_MEMBER_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: MemberDelete.RECOVER_MEMBER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//冻结会员
const freeze = (id, changeDesc) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.FREEZE_MEMBER_PENDING});
        return requestapi({uri: `/api/member/freeze`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}&changeDesc=${changeDesc}`,
        }}).then((data) => {
            dispatch({type: MemberInfo.FREEZE_MEMBER_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: MemberInfo.FREEZE_MEMBER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//解冻会员信息
const unfreeze = (id, changeDesc) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.UNFREEZE_MEMBER_PENDING});
        return requestapi({uri: `/api/member/unfreeze`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}&changeDesc=${changeDesc}`,
        }}).then((data) => {
            dispatch({type: MemberInfo.UNFREEZE_MEMBER_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: MemberInfo.UNFREEZE_MEMBER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询会员详细信息(包括账户信息)
const selectDetailById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.SELECT_MEMBERDETAIL_PENDING});
        return requestapi({uri: `/api/member/selectDetailById`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}`,
        }}).then((data) => {
            dispatch({type: MemberInfo.SELECT_MEMBERDETAIL_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberInfo.SELECT_MEMBERDETAIL_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listRankConfig = () => {
    return (dispatch, getState) => {
        dispatch({type: MemberRankConfig.LIST_RANKCONFIG_PENDING});
        return requestapi({uri: `/api/member/listRankConfig`}).then((data) => {
            dispatch({type: MemberRankConfig.LIST_RANKCONFIG_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRankConfig.LIST_RANKCONFIG_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//修改会员等级配置
const updateRankConfig = (values) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRankConfig.UPDATE_RANKCONFIG_PENDING});
        return requestapi({uri: `/api/member/updateRankConfig`, fetchParams: {body: values}}).then((data) => {
            dispatch({type: MemberRankConfig.UPDATE_RANKCONFIG_SUCCESS, payload: values});
        }).catch(err => {
            dispatch({type: MemberRankConfig.UPDATE_RANKCONFIG_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//会员基本信息路由change
const memberInfoChangeRouter = (path) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberInfo.MEMBER_ROUTER_CHANGE, payload: path})
        );
    }
}

//重置会员充值form数据
const resetDetailForm = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRecharge.MEMBER_RECHARGE_DETAILFORM_RESET})
        );
    }
}

//会员充值活动界面路由change
const rechargeRuleChangeRouter = (path) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRechargeRule.RECHARGERULE_ROUTER_CHANGE, payload: path})
        );
    }
}

//查询会员充值优惠配置
const listRechargeConfig = () => {
    return (dispatch, getState) => {
        dispatch({type: MemberRechargeRule.LIST_RECHARGERULE_PENDING});
        return requestapi({uri: `/api/member/listRechargeConfig`}).then((data) => {
            dispatch({type: MemberRechargeRule.LIST_RECHARGERULE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRechargeRule.LIST_RECHARGERULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//会员充值活动表单change事件
const rechargeRuleFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRechargeRule.RECHARGERULE_FORM_CHANGE, payload: values})
        );
    }
}

//重置会员充值活动信息表单
const resetRechargeRuleFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRechargeRule.RECHARGERULE_FORM_RESET})
        );
    }
}

//新增会员充值活动
const saveRechargeRule = (rechargeRule) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRechargeRule.SAVE_RECHARGERULE_PENDING});
        return requestapi({uri: `/api/member/saveRechargeRule`, fetchParams: {body: rechargeRule}}).then((data) => {
            dispatch({type: MemberRechargeRule.SAVE_RECHARGERULE_SUCCESS, payload: rechargeRule});
        }).catch(err => {
            dispatch({type: MemberRechargeRule.SAVE_RECHARGERULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//修改会员充值活动
const updateRechargeRule = (rechargeRule) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRechargeRule.UPDATE_RECHARGERULE_PENDING});
        return requestapi({uri: `/api/member/updateRechargeRule`, fetchParams: {body: rechargeRule}}).then((data) => {
            dispatch({type: MemberRechargeRule.UPDATE_RECHARGERULE_SUCCESS, payload: rechargeRule});
        }).catch(err => {
            dispatch({type: MemberRechargeRule.UPDATE_RECHARGERULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//删除会员充值活动信息
const deleteRechargeRule = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRechargeRule.DELETE_RECHARGERULE_PENDING});
        return requestapi({uri: `/api/member/deleteRechargeRule`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}`,
        }}).then((data) => {
            dispatch({type: MemberRechargeRule.DELETE_RECHARGERULE_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: MemberRechargeRule.DELETE_RECHARGERULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询会员充值优惠信息
const selectRechargeRuleById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRechargeRule.SELECT_RECHARGERULE_PENDING});
        return requestapi({uri: `/api/member/selectRechargeRuleById/${id}`, fetchParams: { method: 'get' } }).then((data) => {
            dispatch({type: MemberRechargeRule.SELECT_RECHARGERULE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRechargeRule.SELECT_RECHARGERULE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//会员充值界面, 根据手机号码查询
const selectDetailByPhone = (phone) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRecharge.SELECT_MEMBER_BY_PHONE_PENDING});
        return requestapi({uri: `/api/member/selectDetailByPhone`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `phone=${phone}`,
        }}).then((data) => {
            dispatch({type: MemberRecharge.SELECT_MEMBER_BY_PHONE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRecharge.SELECT_MEMBER_BY_PHONE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//change事件
const onRechargePhoneChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRecharge.MEMBER_RECHARGE_ON_PHONE_CHANGE, payload: value})
        );
    }
}

//会员现金充值表单change
//会员信息表单change事件
const memberRechargeFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRecharge.MEMBERRECHARGE_FORM_CHANGE, payload: values})
        );
    }
}

//重置会员信息表单
const resetMemberRechargeFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRecharge.MEMBERRECHARGE_FORM_RESET})
        );
    }
}

//加载会员充值金额 赠送多少金额
const selectByRechargePrice = (rechargeAmount) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRecharge.SELECT_RECHARGERULE_BY_PRICE_PENDING});
        return requestapi({uri: `/api/member/selectByRechargePrice`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `rechargeAmount=${rechargeAmount}`,
        }}).then((data) => {
            dispatch({type: MemberRecharge.SELECT_RECHARGERULE_BY_PRICE_SUCCESS, payload: data.result});
            return data.result;
        }).catch(err => {
            dispatch({type: MemberRecharge.SELECT_RECHARGERULE_BY_PRICE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//会员现金充值
const rechargeCash = (rechargeAmount, memberId, payMethod) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRecharge.RECHARGE_BY_CASH_PENDING});
        return requestapi({uri: `/api/member/rechargeCash`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `rechargeAmount=${rechargeAmount}&memberId=${memberId}&payMethod=${payMethod}`,
        }}).then((data) => {
            dispatch({type: MemberRecharge.RECHARGE_BY_CASH_SUCCESS, payload: data.result});
        }).catch(err => {
            dispatch({type: MemberRecharge.RECHARGE_BY_CASH_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//会员充值(移动支付)
const rechargeMobilePayment = (payOrderIds, memberId) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRecharge.RECHARGE_BY_MPAYMENT_PENDING});
        return requestapi({uri: `/api/member/rechargeMobilePayment`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `memberId=${memberId}&payOrderIds=${payOrderIds.join(",")}`,
        }}).then((data) => {
            dispatch({type: MemberRecharge.RECHARGE_BY_MPAYMENT_SUCCESS, payload: data.result});
        }).catch(err => {
            dispatch({type: MemberRecharge.RECHARGE_BY_MPAYMENT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//充值方式change
const resetPayOrderIds = (payOrderIds, rechargeAmount) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRecharge.MEMBERRECHARGE_PAYORDERIDS_RESET, payload: {payOrderIds, rechargeAmount}})
        );
    }
}
//充值充值方式
const resetRechargeMethod = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRecharge.MEMBERRECHARGE_RECHARGEMETHOD_RESET})
        );
    }
}

//查询已删除的会员信息
const listDelMember = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: MemberDelete.LIST_MEMBERDELETE_PENDING});
        return requestapi({uri: `/api/member/listDelMember`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: MemberDelete.LIST_MEMBERDELETE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberDelete.LIST_MEMBERDELETE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询表单change
const memberDeleteSearchFormFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberDelete.MEMBERDELETE_SEARCHFORM_CHANGE, payload: values})
        );
    }
}

//查询表单重置
const memberDeleteResetSearchFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberDelete.MEMBERDELETE_SEARCHFORM_RESET})
        );
    }
}

//处理已删除会员查询条件
const handleMemberDeleteSearch = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberDelete.MEMBERDELETE_HANDLE_SEARCH, payload: values})
        );
    }
}

//冻结、解冻会员备注信息change
const onChangeDescValueChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberInfo.MEMBER_ON_CHANGEDESC_CHANGE, payload: value})
        );
    }
}

//恢复已删除会员备注信息change
const memberDeleteOnChangeDescValueChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberDelete.MEMBERCHANGE_ON_CHANGEDESC_CHANGE, payload: value})
        );
    }
}

//查询已删除会员信息明细
const selectDeleteDetailById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MemberDelete.SELECT_MEMBERDELETE_DETAIL_PENDING});
        return requestapi({uri: `/api/member/selectDeleteDetailById`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}`,
        }}).then((data) => {
            dispatch({type: MemberDelete.SELECT_MEMBERDELETE_DETAIL_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberDelete.SELECT_MEMBERDELETE_DETAIL_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//绑定支付宝或微信二维码
const dispatch_QRCode = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: MemberInfo.DISPATCH_BIND_QRCODE, payload: data })
        );
    }
}

//绑定支付宝或者微信
const dispatch_bind = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: MemberInfo.BINDDATA_FORM_CHANGE, payload: data })
        );
    }
}

//会员绑定支付宝或者微信
const memberBind = (memberId, bindType, code) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.MEMBER_BIND_PENDING});
        return requestapi({uri: `/api/member/bind`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `memberId=${memberId}&bindType=${bindType}&code=${code}`,
        }}).then((data) => {
            dispatch({type: MemberInfo.MEMBER_BIND_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberInfo.MEMBER_BIND_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//会员解除绑定支付宝或者微信
const memberunBind = (memberId, bindType) => {
    return (dispatch, getState) => {
        dispatch({type: MemberInfo.MEMBER_UNBIND_PENDING});
        return requestapi({uri: `/api/member/unbind`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `memberId=${memberId}&bindType=${bindType}`,
        }}).then((data) => {
            dispatch({type: MemberInfo.MEMBER_UNBIND_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberInfo.MEMBER_UNBIND_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    memberInfoFieldChangeValue,
    resetMemberInfoFormFields,
    save,
    searchFormFieldChangeValue,
    resetSearchFormFields,
    handleSearch,
    resetDetailForm,
    list,
    update,
    selectById,
    deleteById,
    recoverById,
    freeze,
    unfreeze,
    selectDetailById,
    listRankConfig,
    updateRankConfig,
    listRechargeConfig,
    memberInfoChangeRouter,
    rechargeRuleChangeRouter,
    rechargeRuleFieldChangeValue,
    resetRechargeRuleFormFields,
    saveRechargeRule,
    updateRechargeRule,
    deleteRechargeRule,
    selectRechargeRuleById,
    selectDetailByPhone,
    onRechargePhoneChange,
    memberRechargeFieldChangeValue,
    resetMemberRechargeFormFields,
    selectByRechargePrice,
    rechargeCash,
    rechargeMobilePayment,
    resetPayOrderIds,
    resetRechargeMethod,
    listDelMember,
    memberDeleteSearchFormFieldChangeValue,
    memberDeleteResetSearchFormFields,
    handleMemberDeleteSearch,
    onChangeDescValueChange,
    memberDeleteOnChangeDescValueChange,
    selectDeleteDetailById,
    dispatch_QRCode,
    dispatch_bind,
    memberBind,
    memberunBind,
}