import createReducers from '../utils/createReducers'
import moment from 'moment';
import numeral from 'numeral';
import { CurrOrder } from '../utils/constants'

const initialState  = {
    loading: false,//历史订单加载loading
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    currOrderList: [],//当前用餐订单列表
    searchCondition: {tableCode: [], orderNo: "", orderStatus: "", orderTime: [moment().startOf('day'), moment().endOf('day')]},
    searchFormData: {tableCode: {value: []}, orderNo: {value: ""}, orderStatus: {value: ""}, orderTime: {value: [moment().startOf('day'), moment().endOf('day')]}},
    listOrderItemLoading: false,//加载订单明细loading
    orderItemMap: {},//订单明细记录
    modifyRemarkLoading: false,//修改备注信息
    remarkValue: "",//备注信息
    divergenceFormData: {remark: {value: ""}, payMethod: {value: 5}, divergencePrice: {value: 0}},//补差价formdata
    divergenceLoading: false,//补差价loading
    currOrderData: null,//当前选择的用餐订单
}

const currOrderHandler = {
    //查询当前用餐订单
    [CurrOrder.LIST_CURRORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [CurrOrder.LIST_CURRORDER_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {loading: false, total: totalNum, pageSize, currentPage, currOrderList: items,});
    },
    [CurrOrder.LIST_CURRORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [CurrOrder.CURRORDER_SEARCHFORM_CHANGE]: (state, action) => {
        const searchFormData = {...state.searchFormData, ...action.payload};
        return Object.assign({}, state, { searchFormData });
    },
    [CurrOrder.CURRORDER_SEARCHFORM_RESET]: (state, action) => {
        const searchFormData = {tableCode: {value: []}, orderNo: {value: ""}, orderStatus: {value: ''}, orderTime: {value: [moment().startOf('day'), moment().endOf('day')]}};
        return Object.assign({}, state, {searchFormData, searchCondition: initialState.searchCondition});
    },
    //订单明细
    [CurrOrder.LIST_ORDERITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, {listOrderItemLoading: true});
    },
    [CurrOrder.LIST_ORDERITEM_SUCCESS]: (state, action) => {
        const { data, orderId } = action.payload;
        const orderItemMap = {...state.orderItemMap, [orderId]: data};
        return Object.assign({}, state, {listOrderItemLoading: false, orderItemMap});
    },
    [CurrOrder.LIST_ORDERITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, {listOrderItemLoading: false});
    },
    //备注change事件
    [CurrOrder.CURRORDER_ONREMARK_CHANGE]: (state, action) => {
        return Object.assign({}, state, {remarkValue: action.payload});
    },
    [CurrOrder.CURRORDER_HANDLE_REMARKMODAL]: (state, action) => {
        const id = action.payload;
        const currOrder = state.currOrderList.find(item => item.id == id);
        return Object.assign({}, state, {remarkValue: currOrder.remark});
    },
    //修改备注信息
    [CurrOrder.MODIFY_ORDERREMARK_PENDING]: (state, action) => {
        return Object.assign({}, state, {modifyRemarkLoading: true});
    },
    [CurrOrder.MODIFY_ORDERREMARK_SUCCESS]: (state, action) => {
        const { id, remark } = action.payload;
        const currOrderList = state.currOrderList.map(item => {
            if(item.id == id) {
                item.remark = remark;
            }
            return item;
        })
        return Object.assign({}, state, {modifyRemarkLoading: false, currOrderList});
    },
    [CurrOrder.MODIFY_ORDERREMARK_FAILURE]: (state, action) => {
        return Object.assign({}, state, {modifyRemarkLoading: false});
    },
    //取消订单
    [CurrOrder.CANCEL_CURRORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [CurrOrder.CANCEL_CURRORDER_SUCCESS]: (state, action) => {
        const orderNo = action.payload;
        const currOrderList = state.currOrderList.map(order => {
            if(order.orderNo == orderNo) {
                order.orderStatus = '9';
                order.orderStatusName = '交易取消';
            }
            return order;
        })
        return Object.assign({}, state, {loading: false, currOrderList});
    },
    [CurrOrder.CANCEL_CURRORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //删除订单
    [CurrOrder.DELETE_CURRORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [CurrOrder.DELETE_CURRORDER_SUCCESS]: (state, action) => {
        const orderNo = action.payload;
        const currOrderList = state.currOrderList.filter(order => order.orderNo !== orderNo);
        return Object.assign({}, state, {loading: false, currOrderList});
    },
    [CurrOrder.DELETE_CURRORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //处理查询条件
    [CurrOrder.CURRORDER_HANDLE_SEARCH]: (state, action) => {
        return Object.assign({}, state, {searchCondition: {...action.payload}});
    },
    //
    [CurrOrder.CURRORDER_DIVERGENCE_FORM_CHANGE]: (state, action) => {
        const divergenceFormData = {...state.divergenceFormData, ...action.payload};
        return Object.assign({}, state, { divergenceFormData });
    },
    [CurrOrder.CURRORDER_DIVERGENCE_FORM_RESET]: (state, action) => {
        const divergenceFormData = initialState.divergenceFormData;
        return Object.assign({}, state, {divergenceFormData});
    },
    //处理当前选择的订
    [CurrOrder.DISPATCH_CURR_ORDER]: (state, action) => {
        const orderId = action.payload;
        const currOrderData = state.currOrderList.find(order => order.id == orderId);
        const divergencePrice = numeral(currOrderData.totalPrice - currOrderData.payPrice).format('0,0.00');
        const divergenceFormData = {...state.divergenceFormData, divergencePrice: {value: divergencePrice}};
        return Object.assign({}, state, {currOrderData, divergenceFormData});
    },
    [CurrOrder.CURRORDER_RESET_PAYMETHOD]: (state, action) => {
        const divergenceFormData = {...state.divergenceFormData, payMethod: {value: 5}}
        return Object.assign({}, state, {divergenceFormData});
    },
}

export default createReducers(initialState, currOrderHandler);