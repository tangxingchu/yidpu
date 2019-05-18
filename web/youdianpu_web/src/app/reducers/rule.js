import createReducers from '../utils/createReducers'
import { Rule } from '../utils/constants'
import moment from 'moment';
import _ from 'lodash';

const initialState  = {
    initLoading: true,//整个界面初始化loading
    configList: [],//是否启用配置信息
    saveConfigLoading: {},//保存配置的加载状态
    goodsList: [],//商品列表
    goodsCheckedKeys: [], //设置特价商品第一步已选择的商品key
    goodsCheckedRows: [], //设置特价商品第一步已选择的商品data
    goodsDayList: [],//每日特价
    saveGoodsDayLoading: false,//保存每日特价loading
    goodsDayLoading: false,//加载每日特价loading
    goodsDayCurrent: 0,//配置每日特价当前步骤
    goodsDayWeek: null, //当前配置的是周几的特价商品

    goodsDiscountList: [],//折扣商品
    saveGoodsDiscountLoading: false,//保存折扣商品loading
    goodsDiscountLoading: false,//加载折扣商品loading
    goodsDiscountCurrent: 0,//配置折扣商品当前步骤
    goodsDiscountCheckedKeys: [], //设置折扣商品第一步已选择的商品key
    goodsDiscountCheckedRows: [], //设置折扣商品第一步已选择的商品data

    goodsSubtractList: [], //所有消费满多少规则
    saveGoodsSubtractLoading: false, //保存消费满多少规则loading
    goodsSubtractLoading: false, //加载消费满多少loading
    goodsSubtractData: {constraintType: {value: 1}, type: { value: 1}, consumePrice: { value: 1 }, amount1: {value: 0}, amount2: {value: 0}, discount : {value: 0},
        description: {value: ""}, enabled: {value: "1"}, constraintTimeStart: {value: null}, constraintTimeEnd: {value: null}, effectiveTime: {value: moment()}, expiredTime: {value: null}},

    //电子优惠券
    goodsCouponList: [],
    saveGoodsCouponLoading: false,
    goodsCouponLoading: false,
    goodsCouponData: {consumePrice: { value: 1 }, amount: {value: 1}, count: {value: 1}, description: {value: ""}, effectiveTime: {value: moment()}, expiredTime: {value: null}},
}

const ruleHandler = {
    [Rule.INIT_GOODS_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { initLoading: true });
    },
    [Rule.INIT_GOODS_RULE_SUCCESS]: (state, action) => {
        const { goodsDays, configs, goodsDiscounts, goodsSubtracts, goodsCoupons } = action.payload;
        return Object.assign({}, state, { initLoading: false, goodsDayList: goodsDays, configList: configs,
            goodsDiscountList: goodsDiscounts, goodsSubtractList: goodsSubtracts, goodsCouponList: goodsCoupons });
    },
    [Rule.INIT_GOODS_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { initLoading: false });
    },
    [Rule.RULE_UPDATE_BASIC_CONFIG_PENDING]: (state, action) => {
        const { configCode } = action.payload;
        const saveConfigLoading = {...state.saveConfigLoading, [configCode]: true}
        return Object.assign({}, state, {saveConfigLoading});
    },
    [Rule.RULE_UPDATE_BASIC_CONFIG_SUCCESS]: (state, action) => {
        const { configCode, configValue } = action.payload;
        const saveConfigLoading = {...state.saveConfigLoading, [configCode]: false}
        const configList = state.configList.map(item => {
            if(item.configCode == configCode) {
                item.configValue = configValue;
            }
            return item;
        })
        return Object.assign({}, state, {saveConfigLoading, configList});
    },
    [Rule.RULE_UPDATE_BASIC_CONFIG_FAILURE]: (state, action) => {
        const { configCode } = action.payload;
        const saveConfigLoading = {...state.saveConfigLoading, [configCode]: false}
        return Object.assign({}, state, {saveConfigLoading});
    },
    [Rule.DISPATCH_RULE_GOODSLIST]: (state, action) => {
        return Object.assign({}, state, { goodsList: action.payload });
    },
    [Rule.RULE_GOODSDAY_ON_TABLE_CHANGE]: (state, action) => {
        const { selectedRowKeys, selectedRows } = action.payload;
        return Object.assign({}, state, { goodsCheckedKeys: selectedRowKeys, goodsCheckedRows: selectedRows });
    },
    [Rule.RULE_GOODSDAY_STEUP_ONNEXT]: (state, action) => {
        const goodsDayCurrent = state.goodsDayCurrent + 1;
        const selectedRowKeys = [...state.goodsCheckedKeys];
        const selectedRows = state.goodsCheckedRows;
        selectedRowKeys.map(key => {
            const selectedRow = selectedRows.find(row => row.id == key);
            selectedRow.effectiveTime = moment();//生效时间默认当前时间
            selectedRow.newPrice = 1;//特价默认1
            selectedRow.limitNum = 1;//每桌限点1份
        });
        return Object.assign({}, state, { goodsDayCurrent, goodsCheckedRows: selectedRows });
    },
    [Rule.RULE_GOODSDAY_STEUP_ONPREV]: (state, action) => {
        const goodsDayCurrent = state.goodsDayCurrent - 1;
        return Object.assign({}, state, { goodsDayCurrent });
    },
    [Rule.RULE_DISPATCH_CURRENT_WEEK]: (state, action) => {
        return Object.assign({}, state, { goodsDayWeek: action.payload });
    },
    [Rule.RULE_ON_DAYS_EFFECTIVETIME_CHANGE]: (state, action) => {
        const { date, dateStr } = action.payload;
        const selectedRows = state.goodsCheckedRows;
        const new_selectedRows = selectedRows.map(row => {
            row.effectiveTime = date;
            return row;
        })
        return Object.assign({}, state, { goodsCheckedRows: new_selectedRows });
    },
    [Rule.RULE_ON_DAYS_EXPIREDTIME_CHANGE]: (state, action) => {
        const { date, dateStr } = action.payload;
        const selectedRows = state.goodsCheckedRows;
        const new_selectedRows = selectedRows.map(row => {
            row.expiredTime = date;
            return row;
        })
        return Object.assign({}, state, { goodsCheckedRows: new_selectedRows });
    },
    [Rule.RULE_ON_DAYS_PRICE_CHANGE]: (state, action) => {
        const {goodsId , newPrice} = action.payload;
        const selectedRows = state.goodsCheckedRows;
        const new_selectedRows = selectedRows.map(row => {
            if(row.id == goodsId) {
                row.newPrice = newPrice;
            }
            return row;
        });
        return Object.assign({}, state, { goodsCheckedRows: new_selectedRows });
    },
    [Rule.RULE_ON_DAYS_LIMIT_CHANGE]: (state, action) => {
        const {goodsId , limitNum} = action.payload;
        const selectedRows = state.goodsCheckedRows;
        const new_selectedRows = selectedRows.map(row => {
            if(row.id == goodsId) {
                row.limitNum = limitNum;
            }
            return row;
        });
        return Object.assign({}, state, { goodsCheckedRows: new_selectedRows });
    },
    [Rule.SAVE_GOODSDAY_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveGoodsDayLoading: true });
    },
    [Rule.SAVE_GOODSDAY_RULE_SUCCESS]: (state, action) => {
        const goodsDayCurrent = state.goodsDayCurrent + 1;
        return Object.assign({}, state, { goodsDayCurrent, saveGoodsDayLoading: false });
    },
    [Rule.SAVE_GOODSDAY_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveGoodsDayLoading: false });
    },
    [Rule.RULE_RESET_GOODSDAY_STEP]: (state, action) => {
        const goodsDayCurrent = 0, goodsCheckedKeys = [], goodsCheckedRows = [];
        return Object.assign({}, state, { goodsDayCurrent, goodsCheckedKeys, goodsCheckedRows });
    },
    [Rule.DELETE_GOODSDAY_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsDayLoading: true });
    },
    [Rule.DELETE_GOODSDAY_RULE_SUCCESS]: (state, action) => {
        const goodsDayId = action.payload;
        const new_goodsDayList = state.goodsDayList.filter(item => item.id != goodsDayId);
        return Object.assign({}, state, { goodsDayLoading: false, goodsDayList: new_goodsDayList });
    },
    [Rule.DELETE_GOODSDAY_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsDayLoading: false });
    },
    [Rule.LIST_GOODSDAY_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsDayLoading: true });
    },
    [Rule.LIST_GOODSDAY_RULE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { goodsDayLoading: false, goodsDayList: action.payload });
    },
    [Rule.LIST_GOODSDAY_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsDayLoading: false });
    },
    //商品折扣
    [Rule.SAVE_GOODSDISCOUNT_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveGoodsDiscountLoading: true });
    },
    [Rule.SAVE_GOODSDISCOUNT_RULE_SUCCESS]: (state, action) => {
        const goodsDiscountCurrent = state.goodsDiscountCurrent + 1;
        return Object.assign({}, state, { goodsDiscountCurrent, saveGoodsDiscountLoading: false });
    },
    [Rule.SAVE_GOODSDISCOUNT_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveGoodsDiscountLoading: false });
    },
    [Rule.DELETE_GOODSDISCOUNT_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsDiscountLoading: true });
    },
    [Rule.DELETE_GOODSDISCOUNT_RULE_SUCCESS]: (state, action) => {
        const goodsDiscountId = action.payload;
        const new_goodsDiscountList = state.goodsDiscountList.filter(item => item.id != goodsDiscountId);
        return Object.assign({}, state, { goodsDiscountLoading: false, goodsDiscountList: new_goodsDiscountList });
    },
    [Rule.DELETE_GOODSDISCOUNT_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsDiscountLoading: false });
    },
    [Rule.LIST_GOODSDISCOUNT_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsDiscountLoading: true });
    },
    [Rule.LIST_GOODSDISCOUNT_RULE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { goodsDiscountLoading: false, goodsDiscountList: action.payload });
    },
    [Rule.LIST_GOODSDISCOUNT_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsDiscountLoading: false });
    },
    [Rule.RULE_GOODSDISCOUNT_ON_TABLE_CHANGE]: (state, action) => {
        const { selectedRowKeys, selectedRows } = action.payload;
        return Object.assign({}, state, { goodsDiscountCheckedKeys: selectedRowKeys, goodsDiscountCheckedRows: selectedRows });
    },
    [Rule.RULE_RESET_GOODSDISCOUNT_STEP]: (state, action) => {
        const goodsDiscountCurrent = 0, goodsDiscountCheckedKeys = [], goodsDiscountCheckedRows = [];
        return Object.assign({}, state, { goodsDiscountCurrent, goodsDiscountCheckedKeys, goodsDiscountCheckedRows });
    },
    [Rule.RULE_GOODSDISCOUNT_STEUP_ONNEXT]: (state, action) => {
        const goodsDiscountCurrent = state.goodsDiscountCurrent + 1;
        const selectedRowKeys = [...state.goodsDiscountCheckedKeys];
        const selectedRows = state.goodsDiscountCheckedRows;
        selectedRowKeys.map(key => {
            const selectedRow = selectedRows.find(row => row.id == key);
            selectedRow.effectiveTime = moment();//生效时间默认当前时间
            selectedRow.discountValue = 9;//折扣默认9折
            selectedRow.newPrice = (9 * 10 / 100) * selectedRow.price;
        });
        return Object.assign({}, state, { goodsDiscountCurrent, goodsDiscountCheckedRows: selectedRows });
    },
    [Rule.RULE_GOODSDISCOUNT_STEUP_ONPREV]: (state, action) => {
        const goodsDiscountCurrent = state.goodsDiscountCurrent - 1;
        return Object.assign({}, state, { goodsDiscountCurrent });
    },
    [Rule.RULE_ON_DISCOUNT_EFFECTIVETIME_CHANGE]: (state, action) => {
        const { date, dateStr } = action.payload;
        const selectedRows = state.goodsDiscountCheckedRows;
        const new_selectedRows = selectedRows.map(row => {
            row.effectiveTime = date;
            return row;
        })
        return Object.assign({}, state, { goodsDiscountCheckedRows: new_selectedRows });
    },
    [Rule.RULE_ON_DISCOUNT_EXPIREDTIME_CHANGE]: (state, action) => {
        const { date, dateStr } = action.payload;
        const selectedRows = state.goodsDiscountCheckedRows;
        const new_selectedRows = selectedRows.map(row => {
            row.expiredTime = date;
            return row;
        })
        return Object.assign({}, state, { goodsDiscountCheckedRows: new_selectedRows });
    },
    [Rule.RULE_ON_DISCOUNT_CHANGE]: (state, action) => {
        const {goodsId , discountValue} = action.payload;
        const selectedRows = state.goodsDiscountCheckedRows;
        const new_selectedRows = selectedRows.map(row => {
            if(row.id == goodsId) {
                row.discountValue = discountValue;
                if(_.isNumber(discountValue)) {
                    row.newPrice = (discountValue * 10 / 100) * row.price;
                }
            }
            return row;
        });
        return Object.assign({}, state, { goodsDiscountCheckedRows: new_selectedRows });
    },
    //消费满多少(折扣/减免/赠实物券)
    [Rule.SAVE_GOODSSUBTRACT_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveGoodsSubtractLoading: true });
    },
    [Rule.SAVE_GOODSSUBTRACT_RULE_SUCCESS]: (state, action) => {
        // const goodsSubtractList = [...state.goodsSubtractList, action.payload];
        // return Object.assign({}, state, { saveGoodsSubtractLoading: false, goodsSubtractList });
        return Object.assign({}, state, { saveGoodsSubtractLoading: false });
    },
    [Rule.SAVE_GOODSSUBTRACT_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveGoodsSubtractLoading: false });
    },
    [Rule.DELETE_GOODSSUBTRACT_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsSubtractLoading: true });
    },
    [Rule.DELETE_GOODSSUBTRACT_RULE_SUCCESS]: (state, action) => {
        const goodsSubtractList = state.goodsSubtractList.filter(item => item.id !== action.payload);
        return Object.assign({}, state, { goodsSubtractLoading: false, goodsSubtractList });
    },
    [Rule.DELETE_GOODSSUBTRACT_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsSubtractLoading: false });
    },
    [Rule.LIST_GOODSSUBTRACT_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsSubtractLoading: true });
    },
    [Rule.LIST_GOODSSUBTRACT_RULE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { goodsSubtractLoading: false, goodsSubtractList: action.payload });
    },
    [Rule.LIST_GOODSSUBTRACT_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsSubtractLoading: false });
    },
    [Rule.RULE_ON_SUBTRACT_FIELD_CHANGE]: (state, action) => {
        const goodsSubtractData = {...state.goodsSubtractData, ...action.payload};
        return Object.assign({}, state, { goodsSubtractData });
    },
    [Rule.RULE_ON_SUBTRACT_RESET_FIELD]: (state, action) => {
        const goodsSubtractData = {constraintType: {value: 1}, type: { value: 1 }, consumePrice: { value: 1 }, amount1: {value: 0}, amount2: {value: 0}, discount : {value: 0},
            description: {value: ""}, enabled: {value: "1"}, constraintTimeStart: {value: null}, constraintTimeEnd: {value: null}, effectiveTime: {value: moment()}, expiredTime: {value: null}};
        return Object.assign({}, state, {goodsSubtractData});
    },
    [Rule.ENABLED_GOODSSUBTRACT_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsSubtractLoading: true, });
    },
    [Rule.ENABLED_GOODSSUBTRACT_RULE_SUCCESS]: (state, action) => {
        const { id, enabled } = action.payload;
        const goodsSubtractList = state.goodsSubtractList.map(item => {
            if(item.id === id) {
                item.enabled = enabled;
            }
            return item;
        });
        return Object.assign({}, state, { goodsSubtractLoading: false, goodsSubtractList });
    },
    [Rule.ENABLED_GOODSSUBTRACT_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsSubtractLoading: false, });
    },
    //电子优惠券
    [Rule.SAVE_GOODSCOUPON_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveGoodsCouponLoading: true });
    },
    [Rule.SAVE_GOODSCOUPON_RULE_SUCCESS]: (state, action) => {
        // const goodsCouponList = [...state.goodsCouponList, action.payload];
        // return Object.assign({}, state, { saveGoodsCouponLoading: false, goodsCouponList });
        return Object.assign({}, state, { saveGoodsCouponLoading: false });
    },
    [Rule.SAVE_GOODSCOUPON_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveGoodsCouponLoading: false });
    },
    [Rule.DELETE_GOODSCOUPON_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsCouponLoading: true });
    },
    [Rule.DELETE_GOODSCOUPON_RULE_SUCCESS]: (state, action) => {
        const goodsCouponList = state.goodsCouponList.filter(item => item.id !== action.payload);
        return Object.assign({}, state, { goodsCouponLoading: false, goodsCouponList });
    },
    [Rule.DELETE_GOODSCOUPON_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsCouponLoading: false });
    },
    [Rule.LIST_GOODSCOUPON_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsCouponLoading: true });
    },
    [Rule.LIST_GOODSCOUPON_RULE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { goodsCouponLoading: false, goodsCouponList: action.payload });
    },
    [Rule.LIST_GOODSCOUPON_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsCouponLoading: false });
    },
    [Rule.RULE_ON_COUPON_FIELD_CHANGE]: (state, action) => {
        const goodsCouponData = {...state.goodsCouponData, ...action.payload};
        return Object.assign({}, state, { goodsCouponData });
    },
    [Rule.RULE_ON_COUPON_RESET_FIELD]: (state, action) => {
        const goodsCouponData = {consumePrice: { value: 1 }, amount: {value: 0}, count: {value: 1}, description: {value: ""}, effectiveTime: {value: moment()}, expiredTime: {value: null}};
        return Object.assign({}, state, {goodsCouponData});
    },
}

export default createReducers(initialState, ruleHandler);