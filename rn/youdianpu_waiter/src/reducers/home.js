import createReducers from '../utils/createReducers'
import { Home } from '../utils/constants'

const initialState = {
    todayRuleLoading: false,
    todayRule: {},
    socketInfo: null,
    socketInfoStyle: null,
    currMerchantUserLoading: false,
    currMerchantUser: null,
}

const homeHandler = {
    [Home.TODAY_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, {todayRuleLoading: true});
    },
    [Home.TODAY_RULE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {
            todayRuleLoading: false,
            todayRule: action.payload || {...state.todayRule},
        });
    },
    [Home.TODAY_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { todayRuleLoading: false, });
    },
    //socket链接状态
    [Home.DISPATCH_SOCKETSTATUS_SUCCESS]: (state, action) => {
        const {msg, styleName} = action.payload;
        return Object.assign({}, state, { socketInfo: msg, socketInfoStyle: styleName});
    },
    //当前商家基本信息
    [Home.SELECT_CURRENT_MERCHANT_PENDING]: (state, action) => {
        return Object.assign({}, state, {currMerchantUserLoading: true});
    },
    [Home.SELECT_CURRENT_MERCHANT_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {currMerchantUserLoading: false, currMerchantUser: action.payload});
    },
    [Home.SELECT_CURRENT_MERCHANT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {currMerchantUserLoading: false});
    }
}

export default createReducers(initialState, homeHandler);
