import createReducers from '../utils/createReducers'
import { RuleAnalysis } from '../utils/constants'
import moment from 'moment';

const initialState  = {
    loading: false, //数据加载    
    ruleHisTimes: [],//规则启用历史记录时间轴
    currRuleHisTime: [],//当前没有停止的运营规则
    ruleHisDetails: {},//历史运营规则明细
    detailsLoading: false, //规则历史明细加载
    initDate: [],//数据查询日期
    analysisData: {}, //分析的数据
    ruleHisList: [],//根据时间条件查询出来的历史规则数据
    analysisLoading: false,//数据分析loading
    turnoverType: "1",//默认环比
    turnoverLoading: false,
    turnovers: {},//营业额数据
    customerFlowType: "1",//默认环比
    customerFlowLoading: false,
    customerFlows: {},//客流量数据
    tableRateType: "1",//默认环比
    tableRateLoading: false,
    tableRates: {},//翻台率
}

const ruleAnalysisHandler = {
    //初始化分析数据
    [RuleAnalysis.INIT_RULE_ANALYSIS_PENDING]: (state, action) => {
        return Object.assign({}, state, {analysisLoading: true});
    },
    [RuleAnalysis.INIT_RULE_ANALYSIS_SUCCESS]: (state, action) => {
        const { ruleHisList, turnovers, customerFlows, tableRates } = action.payload;
        return Object.assign({}, state, {analysisLoading: false, ruleHisList, turnovers, customerFlows, tableRates});
    },
    [RuleAnalysis.INIT_RULE_ANALYSIS_FAILURE]: (state, action) => {
        return Object.assign({}, state, {analysisLoading: false});
    },
    //加载启用规则列表
    [RuleAnalysis.LIST_RULE_HIS_PENDING]: (state, action) => {
        return Object.assign({}, state, {analysisLoading: true});
    },
    [RuleAnalysis.LIST_RULE_HIS_SUCCESS]: (state, action) => {
        const ruleHisList = action.payload;
        return Object.assign({}, state, {analysisLoading: false, ruleHisList});
    },
    [RuleAnalysis.LIST_RULE_HIS_FAILURE]: (state, action) => {
        return Object.assign({}, state, {analysisLoading: false});
    },
    //历史规则启用时间轴
    [RuleAnalysis.SELECT_RULEHIS_TIMELINE_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [RuleAnalysis.SELECT_RULEHIS_TIMELINE_SUCCESS]: (state, action) => {
        const ruleHisTimes = action.payload;
        const currRuleHisTime = [];
        const new_ruleHisTimes = ruleHisTimes.filter(item => {
            if(!item.rule_date) {
                currRuleHisTime.push(item);
                return false;
            }
            return true;
        });
        //表示当前正处于某一个规则运营中...
        let initDate = [];
        if(currRuleHisTime.length > 0) {
            let beginDate = moment(currRuleHisTime[0].rule_begin_date, 'YYYY-MM-DD');
            let endDate = moment().subtract(1, 'day');
            //反正查询周期不能超过3个月
            if(moment(beginDate).add(3, 'month').isBefore(endDate)) {
                beginDate = moment(endDate).subtract(3, 'month');
            }
            initDate = [beginDate, endDate];
        } else {//所有规则都禁用了
            //有启用规则历史
            if(new_ruleHisTimes.length > 0) {
                const length = new_ruleHisTimes.length;
                let beginDate = moment(new_ruleHisTimes[length-1].rule_begin_date, 'YYYY-MM-DD');
                let endDate = moment(new_ruleHisTimes[length-1].rule_end_date, 'YYYY-MM-DD');
                //反正查询周期不能超过3个月
                if(moment(beginDate).add(3, 'month').isBefore(endDate)) {
                    beginDate = moment(endDate).subtract(3, 'month');
                }
                initDate = [beginDate, endDate];
            } else {//没有规则历史启用记录
                //不默认任何数据
            }
        }
        return Object.assign({}, state, {loading: false, ruleHisTimes: new_ruleHisTimes, currRuleHisTime, initDate});
    },
    [RuleAnalysis.SELECT_RULEHIS_TIMELINE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //加载历史规则明细
    [RuleAnalysis.SELECT_RULEHIS_DETAIL_PENDING]: (state, action) => {
        return Object.assign({}, state, {detailsLoading: true});
    },
    [RuleAnalysis.SELECT_RULEHIS_DETAIL_SUCCESS]: (state, action) => {
        const { ruleHisId, data } = action.payload;
        const ruleHisDetails = {...state.ruleHisDetails, [ruleHisId]: data};
        return Object.assign({}, state, {detailsLoading: false, ruleHisDetails});
    },
    [RuleAnalysis.SELECT_RULEHIS_DETAIL_FAILURE]: (state, action) => {
        return Object.assign({}, state, {detailsLoading: false});
    },
    //刷新
    [RuleAnalysis.RULEHIS_REFRESH]: (state, action) => {
        return Object.assign({}, state, {ruleHisDetails: {}});
    },
    //界面日期change
    [RuleAnalysis.RULEHIS_ON_DATECHANGE]: (state, action) => {
        return Object.assign({}, state, {initDate: action.payload});
    },
    //营业额类型change
    [RuleAnalysis.RULEHIS_ON_TURNOVERCHANGE]: (state, action) => {
        return Object.assign({}, state, {turnoverType: action.payload});
    },
    //客流量类型change
    [RuleAnalysis.RULEHIS_ON_CUSTOMERFLOWCHANGE]: (state, action) => {
        return Object.assign({}, state, {customerFlowType: action.payload});
    },
    //翻台率类型change
    [RuleAnalysis.RULEHIS_ON_TABLERATECHANGE]: (state, action) => {
        return Object.assign({}, state, {tableRateType: action.payload});
    },
    //切换营业额分析图表
    [RuleAnalysis.SELECT_TRUNOVERDATA_PENDING]: (state, action) => {
        return Object.assign({}, state, {turnoverLoading: true});
    },
    [RuleAnalysis.SELECT_TRUNOVERDATA_SUCCESS]: (state, action) => {
        const turnovers = action.payload.turnovers;
        return Object.assign({}, state, {turnoverLoading: false, turnovers});
    },
    [RuleAnalysis.SELECT_TRUNOVERDATA_FAILURE]: (state, action) => {
        return Object.assign({}, state, {turnoverLoading: false});
    },
    //切换客流量分析图表
    [RuleAnalysis.SELECT_CUSTOMERFLOW_PENDING]: (state, action) => {
        return Object.assign({}, state, {customerFlowLoading: true});
    },
    [RuleAnalysis.SELECT_CUSTOMERFLOW_SUCCESS]: (state, action) => {
        const customerFlows = action.payload.customerFlows;
        return Object.assign({}, state, {customerFlowLoading: false, customerFlows});
    },
    [RuleAnalysis.SELECT_CUSTOMERFLOW_FAILURE]: (state, action) => {
        return Object.assign({}, state, {customerFlowLoading: false});
    },
    //翻台率分析图表
    [RuleAnalysis.SELECT_TABLERATE_PENDING]: (state, action) => {
        return Object.assign({}, state, {tableRateLoading: true});
    },
    [RuleAnalysis.SELECT_TABLERATE_SUCCESS]: (state, action) => {
        const tableRates = action.payload.tableRates;
        return Object.assign({}, state, {tableRateLoading: false, tableRates});
    },
    [RuleAnalysis.SELECT_TABLERATE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {tableRateLoading: false});
    },
}

export default createReducers(initialState, ruleAnalysisHandler);