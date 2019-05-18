import { RuleAnalysis } from '../utils/constants';
import requestapi from '../common/requestapi';

const init = (ruleBeginDate, ruleEndDate) => {
    return (dispatch, getState) => {
        dispatch({type: RuleAnalysis.INIT_RULE_ANALYSIS_PENDING});
        return requestapi({uri: `/api/ruleAnalysis/init`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `ruleBeginDate=${ruleBeginDate}&ruleEndDate=${ruleEndDate}`,
        }}).then((data) => {
            dispatch({type: RuleAnalysis.INIT_RULE_ANALYSIS_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: RuleAnalysis.INIT_RULE_ANALYSIS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询运营规则启用历史
const listRuleHis = (ruleBeginDate, ruleEndDate) => {
    return (dispatch, getState) => {
        dispatch({type: RuleAnalysis.LIST_RULE_HIS_PENDING});
        return requestapi({uri: `/api/ruleAnalysis/listRuleHis`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `ruleBeginDate=${ruleBeginDate}&ruleEndDate=${ruleEndDate}`,
        }}).then((data) => {
            dispatch({type: RuleAnalysis.LIST_RULE_HIS_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: RuleAnalysis.LIST_RULE_HIS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询运营规则历史时间轴数据
const selectByTimeline = () => {
    return (dispatch, getState) => {
        dispatch({type: RuleAnalysis.SELECT_RULEHIS_TIMELINE_PENDING});
        return requestapi({uri: `/api/ruleAnalysis/selectByTimeline`}).then((data) => {
            dispatch({type: RuleAnalysis.SELECT_RULEHIS_TIMELINE_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: RuleAnalysis.SELECT_RULEHIS_TIMELINE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//加载历史规则明细
const selectRuleHisDetail = (ruleHisId) => {
    return (dispatch, getState) => {
        dispatch({type: RuleAnalysis.SELECT_RULEHIS_DETAIL_PENDING});
        return requestapi({uri: `/api/ruleAnalysis/selectRuleHisDetail`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `ruleHisId=${ruleHisId}`,
        }}).then((data) => {
            dispatch({type: RuleAnalysis.SELECT_RULEHIS_DETAIL_SUCCESS, payload: {ruleHisId, data}});
        }).catch(err => {
            dispatch({type: RuleAnalysis.SELECT_RULEHIS_DETAIL_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//刷新
const dispatch_refresh = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: RuleAnalysis.RULEHIS_REFRESH})
        );
    }
}

//周期change事件
const onDateChange = (date) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: RuleAnalysis.RULEHIS_ON_DATECHANGE, payload: date})
        );
    }
}

//营业额类型change事件
const onTurnoverTypeChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: RuleAnalysis.RULEHIS_ON_TURNOVERCHANGE, payload: value})
        );
    }
}

//客流量类型change事件
const onCustomerFlowTypeChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: RuleAnalysis.RULEHIS_ON_CUSTOMERFLOWCHANGE, payload: value})
        );
    }
}

//翻台率类型change事件
const onTableRateTypeChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: RuleAnalysis.RULEHIS_ON_TABLERATECHANGE, payload: value})
        );
    }
}

const selectTurnoverData = (ruleBeginDate, ruleEndDate, type) => {
    return (dispatch, getState) => {
        dispatch({type: RuleAnalysis.SELECT_TRUNOVERDATA_PENDING});
        return requestapi({uri: `/api/ruleAnalysis/selectTurnoverData`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `ruleBeginDate=${ruleBeginDate}&ruleEndDate=${ruleEndDate}&type=${type}`,
        }}).then((data) => {
            dispatch({type: RuleAnalysis.SELECT_TRUNOVERDATA_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: RuleAnalysis.SELECT_TRUNOVERDATA_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectCustomerFlowData = (ruleBeginDate, ruleEndDate, type) => {
    return (dispatch, getState) => {
        dispatch({type: RuleAnalysis.SELECT_CUSTOMERFLOW_PENDING});
        return requestapi({uri: `/api/ruleAnalysis/selectCustomerFlowData`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `ruleBeginDate=${ruleBeginDate}&ruleEndDate=${ruleEndDate}&type=${type}`,
        }}).then((data) => {
            dispatch({type: RuleAnalysis.SELECT_CUSTOMERFLOW_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: RuleAnalysis.SELECT_CUSTOMERFLOW_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectTableRateData = (ruleBeginDate, ruleEndDate, type) => {
    return (dispatch, getState) => {
        dispatch({type: RuleAnalysis.SELECT_TABLERATE_PENDING});
        return requestapi({uri: `/api/ruleAnalysis/selectTableRateData`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `ruleBeginDate=${ruleBeginDate}&ruleEndDate=${ruleEndDate}&type=${type}`,
        }}).then((data) => {
            dispatch({type: RuleAnalysis.SELECT_TABLERATE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: RuleAnalysis.SELECT_TABLERATE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    init,
    listRuleHis,
    selectByTimeline,
    selectRuleHisDetail,
    dispatch_refresh,
    onDateChange,
    onTurnoverTypeChange,
    onCustomerFlowTypeChange,
    onTableRateTypeChange,
    selectTurnoverData,
    selectCustomerFlowData,
    selectTableRateData,
}