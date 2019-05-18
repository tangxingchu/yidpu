import createReducers from '../utils/createReducers'
import { DefaultPage, BasicConfig } from '../utils/constants'

const initialState  = {
    localIp: null,
    serverIsStart: false,
    info: [],
    loading: false,
    syncLoading: false,
    saveConfigLoading: {},
    configLoading: true,
    ruleLoading: true,
    today: null,
    enabledRuleList: [],//已启用的规则(config)
    goodsDays: [],
    goodsDiscounts: [],
    goodsSubtracts: [],
    goodsCoupons: [],
    rechargeConfigs: null, //会员充值活动
    configList: [],//常规配置列表
    qrcodeData: null,//前台收银二维码
}

const defaultPageHandler = {
    [DefaultPage.DEFAULT_PAGE_SET_LOCALIP]: (state, action) => {
        return Object.assign({}, state, {localIp: action.payload}); 
    },
    [DefaultPage.DEFAULT_SET_SERVER_STATUS]: (state, action) => {
        if(action.payload && !state.serverIsStart) {
            const serverIsStart = true;
            const port = action.payload;
            return Object.assign({}, state, {serverIsStart, loading: false, info: [{msg: `点餐服务已启动。端口${port}`, type: 'successInfo'}]}); 
        }
        return state;
    },
    [DefaultPage.DEFAULT_INIT_SERVER]: (state, action) => {
        const info = [...state.info, {msg: action.payload, type: 'successInfo'}];
        return Object.assign({}, state, {serverIsStart: true, loading: false, info});
    },
    [DefaultPage.DEFAULT_STOP_SERVER]: (state, action) => {
        const newState = {serverIsStart: false, loading: false, info: [...state.info, {msg: "点餐服务已终止.", type: 'highInfo'}]}
        return Object.assign({}, state, {...newState});
    },
    [DefaultPage.DEFAULT_SEND_LOGINFO]: (state, action) => {
        const info = [...state.info, ...action.payload];
        return Object.assign({}, state, {info});
    },
    [BasicConfig.UPDATE_BASIC_CONFIG_PENDING]: (state, action) => {
        const { configCode } = action.payload;
        const saveConfigLoading = {...state.saveConfigLoading, [configCode]: true}
        return Object.assign({}, state, {saveConfigLoading});
    },
    [BasicConfig.UPDATE_BASIC_CONFIG_SUCCESS]: (state, action) => {
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
    [BasicConfig.UPDATE_BASIC_CONFIG_FAILURE]: (state, action) => {
        const { configCode } = action.payload;        
        const saveConfigLoading = {...state.saveConfigLoading, [configCode]: false}
        return Object.assign({}, state, {saveConfigLoading});
    },
    [BasicConfig.SYNC_BASIC_CONFIG_PENDING]: (state, action) => {
        return Object.assign({}, state, {syncLoading: true});
    },
    [BasicConfig.SYNC_BASIC_CONFIG_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {syncLoading: false});
    },
    [BasicConfig.LIST_BASIC_CONFIG_PENDING]: (state, action) => {
        return Object.assign({}, state, {configLoading: true});
    },
    [BasicConfig.LIST_BASIC_CONFIG_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {configLoading: false, configList: action.payload});
    },
    [BasicConfig.LIST_BASIC_CONFIG_FAILURE]: (state, action) => {
        return Object.assign({}, state, {configLoading: false});
    },
    [DefaultPage.LIST_TODAY_RULE_PENDING]: (state, action) => {
        return Object.assign({}, state, {ruleLoading: true});
    },
    [DefaultPage.LIST_TODAY_RULE_SUCCESS]: (state, action) => {
        const { today, enabledConfigs, goodsDayVos = [], goodsDiscountVos = [], goodsSubtractVos = [], 
            goodsCouponVos = [], rechargeConfigs } = action.payload;
        return Object.assign({}, state, {ruleLoading: false, today, enabledRuleList: enabledConfigs, goodsDays: goodsDayVos,
            goodsDiscounts: goodsDiscountVos, goodsSubtracts: goodsSubtractVos, goodsCoupons: goodsCouponVos, rechargeConfigs});
    },
    [DefaultPage.LIST_TODAY_RULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {ruleLoading: false});
    },
    //前台收银二维码
    [DefaultPage.DISPATCH_FRONT_QRCODE]: (state, action) => {
        return Object.assign({}, state, { qrcodeData: action.payload });
    },
}

export default createReducers(initialState, defaultPageHandler);