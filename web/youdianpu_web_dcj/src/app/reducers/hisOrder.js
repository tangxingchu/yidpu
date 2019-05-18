import createReducers from '../utils/createReducers'
import moment from 'moment';
import { HisOrder } from '../utils/constants'

const initialState  = {
    loading: false,//历史订单加载loading
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    hisOrderList: [],//历史订单列表
    searchCondition: {tableCode: [], orderNo: "", orderStatus: "", orderTime: [moment().startOf('day'), moment().endOf('day')]},
    searchFormData: {tableCode: {value: []}, orderNo: {value: ''}, orderStatus: {value: ""}, orderTime: {value: [moment().startOf('day'), moment().endOf('day')]}},
    refundLoading: false, //退款loading
    refundData: {refundType: {value: 1}, refundLimit: {value: "1"}, refundMethod: {value: null}, refundAmount: {value: null}, refundAmountDinerOrder: {value: null},
        refundReason: {value: "退款"}, orderNo: {value: null}, tableCode: {value: null},  payOrderNo: {value: null}, orderPayAmount: {value: null}},// 当前退款信息
    listOrderItemLoading: false,//加载订单明细loading
    hisOrderItemMap: {},//历史订单项
    payLogMap: {},//支付流水
    payOrderMap: {},//前台扫码支付单
    confirmPWDData: {validationPWD: {value: ""}}, //确认退款 登录密码
    refundAmountReadOnly: true,//退款金额是否只读
    modifyRemarkLoading: false,//修改备注loading
    remarkValue: "", //当前订单备注信息
    floorList: [],//桌台列表
    phoneCodeLoading: false,
    countDown: 0,
}

const hisOrderHandler = {
    [HisOrder.LIST_HISORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [HisOrder.LIST_HISORDER_SUCCESS]: (state, action) => {
        const hisOrderList = action.payload;
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {loading: false, total: totalNum, pageSize, currentPage, hisOrderList: items,});
    },
    [HisOrder.LIST_HISORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [HisOrder.HISORDER_SEARCHFORM_CHANGE]: (state, action) => {
        const searchFormData = {...state.searchFormData, ...action.payload};
        return Object.assign({}, state, { searchFormData });
    },
    [HisOrder.HISORDER_SEARCHFORM_RESET]: (state, action) => {
        const searchFormData = {tableCode: {value: []}, orderNo: {value: ''}, orderStatus: {value: ''}, orderTime: {value: [moment().startOf('day'), moment().endOf('day')]}};
        return Object.assign({}, state, {searchFormData, searchCondition: initialState.searchCondition});
    },
    //处理退款界面
    [HisOrder.HANDLE_REFUNDATA]: (state, action) => {
        const {tableCode, orderNo, payOrderNo} = action.payload;
        const currHisOrder = state.hisOrderList.find(item => item.orderNo == orderNo );
        if(payOrderNo) {//支付单退款
            const payOrders = state.payOrderMap[orderNo];
            const currHisPayOrder = payOrders.find(item => item.orderNo == payOrderNo );
            if(currHisPayOrder) {
                const refundData = {refundType: {value: 2}, refundLimit: {value: "3"}, refundMethod: {value: -currHisPayOrder.payMethod}, refundAmount: {value: currHisOrder.payPrice},
                    refundAmountDinerOrder: {value: currHisOrder.payPrice},//用餐订单收银金额
                    refundReason: {value: "退款"}, orderNo: {value: orderNo}, tableCode: {value: tableCode}, payOrderNo: {value: payOrderNo}, orderPayAmount: {value: currHisPayOrder.payPrice}};// 当前退款信息
                return Object.assign({}, state, {refundData});
            } else {
                return Object.assign({}, state, {});
            }
        } else {            
            if(currHisOrder) {
                //默认现金退款
                const refundData = {refundType: {value: 1}, refundLimit: {value: "1"}, refundMethod: {value: -5}, refundAmount: {value: currHisOrder.payPrice},
                    refundAmountDinerOrder: {value: currHisOrder.payPrice},//用餐订单收银金额 这里与refundAmount 一样
                    refundReason: {value: "退款"}, orderNo: {value: orderNo}, tableCode: {value: tableCode}, payOrderNo: {value: null}, orderPayAmount: {value: currHisOrder.payPrice}};// 当前退款信息
                return Object.assign({}, state, {refundData});
            } else {
                return Object.assign({}, state, {});
            }
        }
    },
    [HisOrder.HISORDER_REFUNFORM_CHANGE]: (state, action) => {        
        let refundData = {...state.refundData, ...action.payload};
        const orderNo = refundData.orderNo.value;
        const refundType = refundData.refundType.value;
        let currHisOrder = null;
        if(refundType == 1) {
            currHisOrder = state.hisOrderList.find(item => item.orderNo == orderNo );
        } else {
            const payOrderNo = refundData.payOrderNo.value;
            const payOrders = state.payOrderMap[orderNo];
            currHisOrder = payOrders.find(item => item.orderNo == payOrderNo );
        }
        let refundAmountReadOnly = null;
        if(refundData.refundLimit.value == "2") {
            refundAmountReadOnly = false;
            if(refundType == 2) {
                const v = Math.min(refundData.refundAmount.value, state.refundData.refundAmountDinerOrder.value);
                refundData = {...refundData, refundAmount: {value: v}};
            }            
        } else if(refundData.refundLimit.value == "1") {
            refundAmountReadOnly = true;
            refundData = {...refundData, refundAmount: {value: currHisOrder.payPrice}};
        } else if(refundData.refundLimit.value == "3") {
            refundAmountReadOnly = true;
            // const v = Math.min(refundData.refundAmount.value, state.refundData.refundAmountDinerOrder.value);
            refundData = {...refundData, refundAmount: {value: state.refundData.refundAmountDinerOrder.value}};
        }
        return Object.assign({}, state, { refundData, refundAmountReadOnly });
    },
    //退款处理
    [HisOrder.REFUND_HISORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, {refundLoading: true});
    },
    [HisOrder.REFUND_HISORDER_SUCCESS]: (state, action) => {
        const { orderNo, payOrderNo, refundAmount } = action.payload;
        const hisOrderList = state.hisOrderList.map(order => {
            if(order.orderNo == orderNo) {
                if(parseFloat(order.payPrice) - parseFloat(refundAmount) > 0) {
                    order.orderStatus = '11';
                    order.orderStatusName = '部分退款';
                } else {
                    order.orderStatus = '7';
                    order.orderStatusName = '退款成功';
                }
                order.payPrice = parseFloat(order.payPrice) - parseFloat(refundAmount);
            }
            return order;
        });
        //前台扫码输入金额支付
        if(payOrderNo) {
            const payOrders = state.payOrderMap[orderNo];
            const new_payOrders = payOrders.map(order => {
                if(order.orderNo == payOrderNo) {
                    if(parseFloat(order.payPrice) - parseFloat(refundAmount) > 0) {
                        order.orderStatus = '11';
                    } else {
                        order.orderStatus = '7';
                    }
                    order.payPrice = parseFloat(order.payPrice) - parseFloat(refundAmount);
                }
                return order;
            });
            const new_payOrderMap = {...state.payOrderMap, [orderNo]: new_payOrders};
            return Object.assign({}, state, {refundLoading: false, payOrderMap: new_payOrderMap, hisOrderList});
        } else {
            return Object.assign({}, state, {refundLoading: false, hisOrderList});
        }
    },
    [HisOrder.REFUND_HISORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {refundLoading: false});
    },
    //加载历史订单明细
    [HisOrder.LIST_ORDERITEM_HIS_PENDING]: (state, action) => {
        return Object.assign({}, state, {listOrderItemLoading: true});
    },
    [HisOrder.LIST_ORDERITEM_HIS_SUCCESS]: (state, action) => {
        const { data, orderNo, tableCode } = action.payload;
        const { payLogs = [], orderItems, payOrders=[] } = data;
        const hisOrderItemMap = {...state.hisOrderItemMap, [orderNo]: orderItems};
        const payLogMap = {...state.payLogMap, [orderNo]: payLogs};
        const new_payOrders = payOrders.map(item => {
            item.relateOrderNo = orderNo;
            item.tableCode = tableCode;
            return item;
        });
        const payOrderMap = {...state.payOrderMap, [orderNo]: new_payOrders};
        return Object.assign({}, state, {listOrderItemLoading: false, hisOrderItemMap, payLogMap, payOrderMap});
    },
    [HisOrder.LIST_ORDERITEM_HIS_FAILURE]: (state, action) => {
        return Object.assign({}, state, {listOrderItemLoading: false});
    },
    //确认登录密码
    [HisOrder.HISORDER_CONFIRMPWDFORM_CHANGE]: (state, action) => {
        const confirmPWDData = {...state.confirmPWDData, ...action.payload};
        return Object.assign({}, state, { confirmPWDData });
    },
    [HisOrder.HISORDER_CONFIRMPWDFORM_RESET]: (state, action) => {
        const confirmPWDData =  {validationPWD: {value: ""}}; //确认退款 登录密码
        return Object.assign({}, state, { confirmPWDData });
    },
    //修改备注信息
    [HisOrder.MODIFY_ORDERHISREMARK_PENDING]: (state, action) => {
        return Object.assign({}, state, {modifyRemarkLoading: true});
    },
    [HisOrder.MODIFY_ORDERHISREMARK_SUCCESS]: (state, action) => {
        const { orderNo, remark } = action.payload;
        const hisOrderList = state.hisOrderList.map(item => {
            if(item.orderNo == orderNo) {
                item.remark = remark;
            }
            return item;
        })
        return Object.assign({}, state, {modifyRemarkLoading: false, hisOrderList});
    },
    [HisOrder.MODIFY_ORDERHISREMARK_FAILURE]: (state, action) => {
        return Object.assign({}, state, {modifyRemarkLoading: false});
    },
    //备注change事件
    [HisOrder.HISORDER_ONREMARK_CHANGE]: (state, action) => {
        return Object.assign({}, state, {remarkValue: action.payload});
    },
    [HisOrder.HISORDER_HANDLE_REMARKMODAL]: (state, action) => {
        const orderNo = action.payload;
        const currOrderHis = state.hisOrderList.find(item => item.orderNo == orderNo);
        return Object.assign({}, state, {remarkValue: currOrderHis.remark});
    },
    //查询与我合并的订单
    [HisOrder.LIST_HISORDER_BYOUTTRADENO_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [HisOrder.LIST_HISORDER_BYOUTTRADENO_SUCCESS]: (state, action) => {
        const hisOrderList = action.payload;
        return Object.assign({}, state, {loading: false, hisOrderList, total: hisOrderList.length});
    },
    [HisOrder.LIST_HISORDER_BYOUTTRADENO_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //桌台列表
    [HisOrder.HISORDER_LOCAL_TABLES]: (state, action) => {
        const tables = action.payload;
        const floors = [];
        tables.forEach(item => {
            let floor = floors.find(floorItem => floorItem.id == item.floor_id);
            if(!floor) {
                floor = {id: item.floor_id, name: item.floor_name, tables: []};
                floors.push(floor);
            }
            floor.tables.push({id: item.id, tableCode: item.table_code, tableName: item.table_name, status: item.status});
        });
        return Object.assign({}, state, {floorList: floors});
    },
    //处理查询
    [HisOrder.HISORDER_HANDLE_SEARCH]: (state, action) => {
        return Object.assign({}, state, {searchCondition: {...action.payload}});
    },
    //退款短信验证码
    [HisOrder.HISORDER_PHONECODE_PENDING]: (state, action) => {
        return Object.assign({}, state, { phoneCodeLoading: true });
    },
    [HisOrder.HISORDER_PHONECODE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { phoneCodeLoading: false, countDown: 60 });
    },
    [HisOrder.HISORDER_PHONECODE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { phoneCodeLoading: false });
    },
    //倒计时
    [HisOrder.HISORDER_DONW_60]: (state, action) => {
        return Object.assign({}, state, { countDown: --state.countDown });
    },
}

export default createReducers(initialState, hisOrderHandler);