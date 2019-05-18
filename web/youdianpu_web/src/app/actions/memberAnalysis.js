import { MemberAnalysis } from '../utils/constants'
import requestapi from '../common/requestapi';

const init = (beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: MemberAnalysis.INIT_MEMBERANALYSIS_PENDING});
        return requestapi({uri: `/api/report/reportMemberAnalysis`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `beginDate=${beginDate}&endDate=${endDate}`,
        }}).then((data) => {
            dispatch({type: MemberAnalysis.INIT_MEMBERANALYSIS_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: MemberAnalysis.INIT_MEMBERANALYSIS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const reportMemberRecharge = (beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: MemberAnalysis.REPORT_MEMBER_RECHARGE_PENDING});
        return requestapi({uri: `/api/report/reportMemberRecharge`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `beginDate=${beginDate}&endDate=${endDate}`,
        }}).then((data) => {
            dispatch({type: MemberAnalysis.REPORT_MEMBER_RECHARGE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberAnalysis.REPORT_MEMBER_RECHARGE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const reportMemberNew = (beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: MemberAnalysis.REPORT_MEMBER_NEW_PENDING});
        return requestapi({uri: `/api/report/reportMemberNew`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `beginDate=${beginDate}&endDate=${endDate}`,
        }}).then((data) => {
            dispatch({type: MemberAnalysis.REPORT_MEMBER_NEW_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberAnalysis.REPORT_MEMBER_NEW_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onMemberNewDateChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: MemberAnalysis.REPORT_ON_MEMBERNEWDATE_CHANGE, payload: value})
        );
    }
}

const onMemberRechargeDateChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: MemberAnalysis.REPORT_ON_MEMBERRECHARGEDATE_CHANGE, payload: value})
        );
    }
}

const selectMemberRank = (params) => {
    return (dispatch, getState) => {
        dispatch({type: MemberAnalysis.LIST_MEMBERRANK_PENDING});
        return requestapi({uri: `/api/report/selectMemberRank`, fetchParams: {body: params}}).then((data) => {
            dispatch({type: MemberAnalysis.LIST_MEMBERRANK_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberAnalysis.LIST_MEMBERRANK_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    init,
    reportMemberRecharge,
    reportMemberNew,
    onMemberNewDateChange,
    onMemberRechargeDateChange,
    selectMemberRank,
}