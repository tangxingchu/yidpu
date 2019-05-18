import { MemberRefund } from '../utils/constants'
import requestapi from '../common/requestapi';

//重置会员退款form数据
const resetDetailForm = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRefund.MEMBER_REFUND_DETAILFORM_RESET})
        );
    }
}

//phone字段change事件
const onRechargePhoneChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRefund.MEMBER_REFUND_ON_PHONE_CHANGE, payload: value})
        );
    }
}

const selectDetailByPhone = (phone) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRefund.SELECT_MEMBER_BY_REFUND_PENDING});
        return requestapi({uri: `/api/member/selectDetailByPhone`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `phone=${phone}`,
        }}).then((data) => {
            dispatch({type: MemberRefund.SELECT_MEMBER_BY_REFUND_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: MemberRefund.SELECT_MEMBER_BY_REFUND_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listByMemberId = (searchParams, isMore) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRefund.LIST_MEMBERRECORD_BY_MEMBERID_PENDING});
        return requestapi({uri: `/api/memberRecord/listByMemberId`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: MemberRefund.LIST_MEMBERRECORD_BY_MEMBERID_SUCCESS, payload: {data, isMore}});
        }).catch(err => {
            dispatch({type: MemberRefund.LIST_MEMBERRECORD_BY_MEMBERID_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onRecordTypeChange = (typeValue, checked) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRefund.MEMBER_REFUND_ON_RECORDTYPE_CHANGE, payload: {typeValue, checked}})
        );
    }
}

//退款
const refund = (refundAmount, refundMethod, memberId) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRefund.MEMBERREFUND_REFUND_PENDING});
        return requestapi({uri: `/api/member/refund`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `refundAmount=${refundAmount}&refundMethod=${refundMethod}&memberId=${memberId}`,
        }}).then((data) => {
            dispatch({type: MemberRefund.MEMBERREFUND_REFUND_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRefund.MEMBERREFUND_REFUND_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    resetDetailForm,
    onRechargePhoneChange,
    selectDetailByPhone,
    listByMemberId,
    onRecordTypeChange,
    refund,
}