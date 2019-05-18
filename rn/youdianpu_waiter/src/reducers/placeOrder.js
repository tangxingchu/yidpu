import createReducers from '../utils/createReducers'
import { PlaceOrder } from '../utils/constants'

const initialState = {
    loading: false,
    submitOrderLoading: false,
    todayGoodsDays: [],
    effectiveGoodsDiscounts: [],
    goodsExtraMap: {},
    currentSubtracts: [],
}

const placeOrderHandler = {
    [PlaceOrder.LIST_GOODSDAYSDISCOUNT_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true,});
    },
    [PlaceOrder.LIST_GOODSDAYSDISCOUNT_SUCCESS]: (state, action) => {
        const { goodsDays, goodsDiscounts } = action.payload;
        return Object.assign({}, state, { loading: false, todayGoodsDays: goodsDays, effectiveGoodsDiscounts: goodsDiscounts, goodsExtraMap: {} });
    },
    [PlaceOrder.LIST_GOODSDAYSDISCOUNT_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [PlaceOrder.CHECKED_GOODS_EXTRAITEM_SUCCESS]: (state, action) => {
        const { goodsExtra, extraItem } = action.payload;
        const goodsExtraMap = state.goodsExtraMap;
        const currentGoodsExtraList = goodsExtraMap[goodsExtra.goodsId];
        const currentGoodsExtra = currentGoodsExtraList.find(goodsExtraItem => goodsExtraItem.extraId == extraItem.extraId);
        const new_extraItem = currentGoodsExtra.items.map(item => {
            if(item.id == extraItem.id) {
                item.checked = true;
            } else {
                item.checked = false;
            }
            return item;
        });
        currentGoodsExtra.items = new_extraItem;
        return Object.assign({}, state, {goodsExtraMap: {...goodsExtraMap}});
    },
    //查询商品附属属性socket查询
    [PlaceOrder.DISPATCH_GOODSEXTRA_SUCCESS]: (state, action) => {
        const { goodsId, extras } = action.payload;
        const goodsExtraMap = state.goodsExtraMap;
        const new_goodsExtraMap = {...goodsExtraMap, [goodsId]: extras};
        return Object.assign({}, state, {goodsExtraMap: new_goodsExtraMap});
    },
    //查询多个商品的附属属性socket查询
    [PlaceOrder.DISPATCH_GOODSEXTRAS_SUCCESS]: (state, action) => {
        const goodsExtraMap = action.payload;
        const new_goodsExtraMap = {...state.goodsExtraMap, ...goodsExtraMap};
        //计算购物车总价
        return Object.assign({}, state, {goodsExtraMap: new_goodsExtraMap});
    },
    //提交购物车
    [PlaceOrder.SUBMIT_ORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { submitOrderLoading: true });
    },
    [PlaceOrder.SUBMIT_ORDER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { submitOrderLoading: false });
    },
    [PlaceOrder.SUBMIT_ORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { submitOrderLoading: false });
    },
    [PlaceOrder.LIST_CURRENT_SUBTRACT_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { currentSubtracts: action.payload });
    },
}

export default createReducers(initialState, placeOrderHandler);