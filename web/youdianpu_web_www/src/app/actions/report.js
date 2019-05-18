import { Report } from '../utils/constants';
import requestapi from '../common/requestapi';

//营业额报表
const reportTurnover = (reportType, beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: Report.SELECT_REPORT_PENDING});
        return requestapi({uri: `/api/report/reportTurnover`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `reportType=${reportType}&beginDate=${beginDate}&endDate=${endDate}`,
        }}).then((data) => {
            dispatch({type: Report.SELECT_REPORT_SUCCESS, payload: {data, dataType: "turnoverData"}});
            return data;
        }).catch(err => {
            dispatch({type: Report.SELECT_REPORT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//客流量报表
const reportCustomerFlow = (reportType, beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: Report.SELECT_REPORT_PENDING});
        return requestapi({uri: `/api/report/reportCustomerFlow`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `reportType=${reportType}&beginDate=${beginDate}&endDate=${endDate}`,
        }}).then((data) => {
            dispatch({type: Report.SELECT_REPORT_SUCCESS, payload: {data, dataType: "customerFlowData"}});
            return data;
        }).catch(err => {
            dispatch({type: Report.SELECT_REPORT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//用餐订单报表
const reportOrder = (reportType, beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: Report.SELECT_REPORT_PENDING});
        return requestapi({uri: `/api/report/reportOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `reportType=${reportType}&beginDate=${beginDate}&endDate=${endDate}`,
        }}).then((data) => {
            dispatch({type: Report.SELECT_REPORT_SUCCESS, payload: {data, dataType: "orderData"}});
            return data;
        }).catch(err => {
            dispatch({type: Report.SELECT_REPORT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//用餐订单详情
const reportOrderDetail = (orderType, reportType, beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: Report.SELECT_REPORT_ORDERDETAIL_PENDING});
        return requestapi({uri: `/api/report/reportOrderDetail`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `orderType=${orderType}&reportType=${reportType}&beginDate=${beginDate}&endDate=${endDate}`,
        }}).then((data) => {
            dispatch({type: Report.SELECT_REPORT_ORDERDETAIL_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: Report.SELECT_REPORT_ORDERDETAIL_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//订单导出excel
const exportOrder = (reportType, beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: Report.EXPORT_ORDER_PENDING});
        return requestapi({uri: `/api/report/exportOrder`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `reportType=${reportType}&beginDate=${beginDate}&endDate=${endDate}`,
        }, respType: 'blob'}).then((data) => {
            dispatch({type: Report.EXPORT_ORDER_SUCCESS});            
            return data;
        }).catch(err => {
            dispatch({type: Report.EXPORT_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//订单导出excel
const exportCustomerFlow = (reportType, beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: Report.EXPORT_ORDER_PENDING});
        return requestapi({uri: `/api/report/exportCustomerFlow`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `reportType=${reportType}&beginDate=${beginDate}&endDate=${endDate}`,
        }, respType: 'blob'}).then((data) => {
            dispatch({type: Report.EXPORT_ORDER_SUCCESS});            
            return data;
        }).catch(err => {
            dispatch({type: Report.EXPORT_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//订单导出excel
const exportTurnover = (reportType, beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: Report.EXPORT_ORDER_PENDING});
        return requestapi({uri: `/api/report/exportTurnover`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `reportType=${reportType}&beginDate=${beginDate}&endDate=${endDate}`,
        }, respType: 'blob'}).then((data) => {
            dispatch({type: Report.EXPORT_ORDER_SUCCESS});            
            return data;
        }).catch(err => {
            dispatch({type: Report.EXPORT_ORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onTurnoverDateChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Report.REPORT_ON_TURNOVERDATE_CHANGE, payload: value})
        );
    }
}

const onTurnoverReportTypeChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Report.REPORT_ON_TURNOVE_RREPORTTYPE_CHANGE, payload: value})
        );
    }
}

const onCustomerFlowDateChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Report.REPORT_ON_CUSTOMERFLOWDATE_CHANGE, payload: value})
        );
    }
}

const onCustomerFlowReportTypeChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Report.REPORT_ON_CUSTOMERFLOW_REPORTTYPE_CHANGE, payload: value})
        );
    }
}

const onOrderDateChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Report.REPORT_ON_ORDERDATE_CHANGE, payload: value})
        );
    }
}

const onOrderReportTypeChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Report.REPORT_ON_ORDER_REPORTTYPE_CHANGE, payload: value})
        );
    }
}

//商品销售排行榜
const selectGoodsRank = (type) => {
    return (dispatch, getState) => {
        dispatch({type: Report.SELECT_GOODSRANK_PENDING});
        return requestapi({uri: `/api/report/selectGoodsRank`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `type=${type}`,
        }}).then((data) => {
            dispatch({type: Report.SELECT_GOODSRANK_SUCCESS, payload: {data, type}});
            return data;
        }).catch(err => {
            dispatch({type: Report.SELECT_GOODSRANK_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onGoodsRankTypeChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Report.ON_GOODSRANK_TYPE_CHANGE, payload: value})
        );
    }
}

//历史翻台率
const reportTableRate = (beginDate, endDate) => {
    return (dispatch, getState) => {
        dispatch({type: Report.SELECT_REPORT_PENDING});
        return requestapi({uri: `/api/report/reportTableRate`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `beginDate=${beginDate}&endDate=${endDate}`,
        }}).then((data) => {
            dispatch({type: Report.SELECT_REPORT_SUCCESS, payload: {data, dataType: "tableRateData"}});
            return data;
        }).catch(err => {
            dispatch({type: Report.SELECT_REPORT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onTableRateDateChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Report.REPORT_ON_TABLERATEDATE_CHANGE, payload: value})
        );
    }
}

//分析页
const reportAnalysis = () => {
    return (dispatch, getState) => {
        dispatch({type: Report.SELECT_ANALYSIS_REPORT_PENDING});
        return requestapi({uri: `/api/report/reportAnalysis`}).then((data) => {
            dispatch({type: Report.SELECT_ANALYSIS_REPORT_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Report.SELECT_ANALYSIS_REPORT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    reportTurnover,
    reportCustomerFlow,
    reportOrder,
    reportOrderDetail,
    exportOrder,
    exportCustomerFlow,
    exportTurnover,
    onTurnoverDateChange,
    onTurnoverReportTypeChange,
    onCustomerFlowDateChange,
    onCustomerFlowReportTypeChange,
    onOrderDateChange,
    onOrderReportTypeChange,
    selectGoodsRank,
    onGoodsRankTypeChange,
    reportTableRate,
    onTableRateDateChange,
    reportAnalysis,
}