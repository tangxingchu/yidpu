import createReducers from '../utils/createReducers'
import moment from 'moment';
import { Report } from '../utils/constants'

const initialState = {
    loading: false,
    turnoverDate: [moment().subtract(1, 'month'), moment().subtract(1, 'day')],//初始化时间
    turnoverReportType: "1", //日报
    turnoverReportDateDisabled: false,
    turnoverData: [], //营业额报表数据
    customerFlowDate: [moment().subtract(1, 'month'), moment().subtract(1, 'day')],//初始化时间
    customerFlowReportType: "1", //日报
    customerFlowReportDateDisabled: false,
    customerFlowData: [],//客流量报表数据
    orderDate: [moment().subtract(1, 'month'), moment().subtract(1, 'day')],//初始化时间
    orderReportType: "1", //日报
    orderReportDateDisabled: false,
    orderData: [],//订单数据报表
    orderLoading: false,//订单报表 钻取
    orderDetailData: [],//订单详情 信息
    exportLoading: false, //导出excelloading
    goodsRankMap: {},//商品销售排行榜数据
    goodsRankType: "1",//默认按销量份数
    goodsRankLoading: false,//商品销售排行榜
    tableRateDate: [moment().subtract(1, 'month'), moment().subtract(1, 'day')],//初始化时间
    tableRateData: [],//翻台率报表数据
    analysisLoading: false,//分析页loading
    analysisData: {},//分析页数据
}

const reportHandler = {
    //营业额报表数据
    [Report.SELECT_REPORT_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [Report.SELECT_REPORT_SUCCESS]: (state, action) => {
        const { dataType, data } = action.payload;
        return Object.assign({}, state, { loading: false, [dataType]: data });
    },
    [Report.SELECT_REPORT_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    //订单详情加载
    [Report.SELECT_REPORT_ORDERDETAIL_PENDING]: (state, action) => {
        return Object.assign({}, state, { orderLoading: true });
    },
    [Report.SELECT_REPORT_ORDERDETAIL_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { orderLoading: false, orderDetailData: action.payload});
    },
    [Report.SELECT_REPORT_ORDERDETAIL_FAILURE]: (state, action) => {
        return Object.assign({}, state, { orderLoading: false });
    },
    //导出订单
    [Report.EXPORT_ORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { exportLoading: true });
    },
    [Report.EXPORT_ORDER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { exportLoading: false });
    },
    [Report.EXPORT_ORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { exportLoading: false });
    },
    //营业额 日期change
    [Report.REPORT_ON_TURNOVERDATE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {turnoverDate: action.payload});
    },
    //营业额 报表类型change
    [Report.REPORT_ON_TURNOVE_RREPORTTYPE_CHANGE]: (state, action) => {
        const value = action.payload;
        //月报、季报、年报
        let turnoverReportDateDisabled = null;
        if(value == "3" || value == "4" || value == "5") {
            turnoverReportDateDisabled = true;
        } else {
            turnoverReportDateDisabled = false;
        }
        return Object.assign({}, state, {turnoverReportType: action.payload, turnoverReportDateDisabled});
    },
    //客流量 日期change
    [Report.REPORT_ON_CUSTOMERFLOWDATE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {customerFlowDate: action.payload});
    },
    //客流量 报表类型change
    [Report.REPORT_ON_CUSTOMERFLOW_REPORTTYPE_CHANGE]: (state, action) => {
        const value = action.payload;
        //月报、季报、年报
        let customerFlowReportDateDisabled = null;
        if(value == "3" || value == "4" || value == "5") {
            customerFlowReportDateDisabled = true;
        } else {
            customerFlowReportDateDisabled = false;
        }
        return Object.assign({}, state, {customerFlowReportType: action.payload, customerFlowReportDateDisabled});
    },
    //订单 日期change
    [Report.REPORT_ON_ORDERDATE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {orderDate: action.payload});
    },
    //订单 报表类型change
    [Report.REPORT_ON_ORDER_REPORTTYPE_CHANGE]: (state, action) => {
        const value = action.payload;
        //月报、季报、年报
        let orderReportDateDisabled = null;
        if(value == "3" || value == "4" || value == "5") {
            orderReportDateDisabled = true;
        } else {
            orderReportDateDisabled = false;
        }
        return Object.assign({}, state, {orderReportType: action.payload, orderReportDateDisabled});
    },
    //销售排行榜
    [Report.SELECT_GOODSRANK_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsRankLoading: true });
    },
    [Report.SELECT_GOODSRANK_SUCCESS]: (state, action) => {
        const {data, type} = action.payload;
        const goodsRankMap = {...state.goodsRankMap, [type]: data};
        return Object.assign({}, state, { goodsRankLoading: false, goodsRankMap });
    },
    [Report.SELECT_GOODSRANK_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsRankLoading: false });
    },
    //销售排行类型change
    [Report.ON_GOODSRANK_TYPE_CHANGE]: (state, action) => {
        return Object.assign({}, state, { goodsRankType: action.payload });
    },
    //翻台率日期change
    [Report.REPORT_ON_TABLERATEDATE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {tableRateDate: action.payload});
    },
    //分析页
    [Report.SELECT_ANALYSIS_REPORT_PENDING]: (state, action) => {
        return Object.assign({}, state, { analysisLoading: true });
    },
    [Report.SELECT_ANALYSIS_REPORT_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { analysisLoading: false, analysisData: action.payload });
    },
    [Report.SELECT_ANALYSIS_REPORT_FAILURE]: (state, action) => {
        return Object.assign({}, state, { analysisLoading: false });
    },
}

export default createReducers(initialState, reportHandler);