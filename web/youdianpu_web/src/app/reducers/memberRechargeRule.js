import createReducers from '../utils/createReducers'
import { MemberRechargeRule } from '../utils/constants'
import moment from 'moment';

const initialState = {
    loading: false,
    rechargeRuleList: [],//结果列表
    rechargeRuleFormData: {id: {value: null}, title: {value: null}, description: {value: null}, rechargeAmount: {value: null}, givePrice: {value: null},
        effectiveTime: {value: moment()}, expiredTime: {value: null}},
    saveLoading: false,//保存loading
    detailLoading: false, //查询明细loading
    routerPath: null,//当前页面路由
}

const memberRechargeRuleHandler = {
    //查询会员充值优惠配置
    [MemberRechargeRule.LIST_RECHARGERULE_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberRechargeRule.LIST_RECHARGERULE_SUCCESS]: (state, action) => {
        const rechargeRuleList = action.payload;
        return Object.assign({}, state, {loading: false, rechargeRuleList,});
    },
    [MemberRechargeRule.LIST_RECHARGERULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //路由change
    [MemberRechargeRule.RECHARGERULE_ROUTER_CHANGE]: (state, action) => {
        return Object.assign({}, state, {routerPath: action.payload});
    },
    //表单信息表单change
    [MemberRechargeRule.RECHARGERULE_FORM_CHANGE]: (state, action) => {
        const rechargeRuleFormData = {...state.rechargeRuleFormData, ...action.payload};
        return Object.assign({}, state, { rechargeRuleFormData });
    },
    [MemberRechargeRule.RECHARGERULE_FORM_RESET]: (state, action) => {
        return Object.assign({}, state, { rechargeRuleFormData: initialState.rechargeRuleFormData });
    },
    //保存会员充值活动信息
    [MemberRechargeRule.SAVE_RECHARGERULE_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true});
    },
    [MemberRechargeRule.SAVE_RECHARGERULE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    [MemberRechargeRule.SAVE_RECHARGERULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    //修改会员充值活动信息
    [MemberRechargeRule.UPDATE_RECHARGERULE_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true});
    },
    [MemberRechargeRule.UPDATE_RECHARGERULE_SUCCESS]: (state, action) => {
        const rechargeRule = action.payload;
        const rechargeRuleList = state.rechargeRuleList.map(item => {
            if(item.id == rechargeRule.id) {
                return {...item, ...rechargeRule};
            }
            return item;
        });
        return Object.assign({}, state, {saveLoading: false, rechargeRuleList});
    },
    [MemberRechargeRule.UPDATE_RECHARGERULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    //删除会员充值活动信息
    [MemberRechargeRule.DELETE_RECHARGERULE_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberRechargeRule.DELETE_RECHARGERULE_SUCCESS]: (state, action) => {
        const id = action.payload;
        const rechargeRuleList = state.rechargeRuleList.filter(item => item.id != id);
        return Object.assign({}, state, {loading: false, rechargeRuleList});
    },
    [MemberRechargeRule.DELETE_RECHARGERULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //查询会员充值活动明细
    [MemberRechargeRule.SELECT_RECHARGERULE_PENDING]: (state, action) => {
        return Object.assign({}, state, {detailLoading: true});
    },
    [MemberRechargeRule.SELECT_RECHARGERULE_SUCCESS]: (state, action) => {
        const rechargeRule = action.payload;
        const rechargeRuleFormData = {id: {value: rechargeRule.id}, title: {value: rechargeRule.title}, description: {value: rechargeRule.description},
            rechargeAmount: {value: rechargeRule.rechargeAmount}, givePrice: {value: rechargeRule.givePrice},
            effectiveTime: {value: moment(rechargeRule.effectiveTime, 'YYYY-MM-DD')},
            expiredTime: {value: rechargeRule.expiredTime ?  moment(rechargeRule.expiredTime, 'YYYY-MM-DD') : null}}
        return Object.assign({}, state, {detailLoading: false, rechargeRuleFormData});
    },
    [MemberRechargeRule.SELECT_RECHARGERULE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {detailLoading: false});
    },
}

export default createReducers(initialState, memberRechargeRuleHandler);