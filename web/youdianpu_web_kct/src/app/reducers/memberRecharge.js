import createReducers from '../utils/createReducers'
import { MemberRecharge } from '../utils/constants'
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

const initialState = {
    loading: false,//加载会员信息
    memberDetailData: {id: {value: ""}, phone: {value: ""}, type: {value: ""}, name: {value: ""}, status: {value: ""}, source: {value: ""}, sex: {value: ""}, 
        birthday: {value: null}, registerTime: {value: null}, rank: {value: 0}, point: {value: ""}, accountNo: {value: ""}, accountStatus: {value: ""},
        accountBalance: {value: ""}},
    phone: "",//查询号码
    rechargeLoading: false,//充值loading
    rechargeFormData: {rechargeMethod: {value: "5"}, rechargeAmount: {value: 0}, givePrice: {value: 0}, totalPrice: {value: 0}, payOrderIds: {value: []}},//会员现金充值表单
    rechargeRuleLoading: false,//加载活动赠送金额
}

const memberRechargeHandler = {
    //查询会员明细（包括账户信息）
    [MemberRecharge.SELECT_MEMBER_BY_PHONE_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberRecharge.SELECT_MEMBER_BY_PHONE_SUCCESS]: (state, action) => {
        const { memberUser, memberAccount } = action.payload;
        const memberDetailData = {id: {value: memberUser.id}, phone: {value: memberUser.phone}, type: {value: memberUser.type+""}, name: {value: memberUser.name}, status: {value: memberUser.status+""},
        source: {value: memberUser.source+""},  sex: {value: memberUser.sex+""}, birthday: {value: memberUser.birthday ? moment(memberUser.birthday, 'YYYY-MM-DD') : null}, 
        registerTime: {value: moment(memberUser.registerTime, 'YYYY-MM-DD')}, rank: {value: parseInt(memberUser.rank)}, point: {value: memberUser.point}, accountNo: {value: memberAccount.accountNo}, 
        accountStatus: {value: memberAccount.accountStatus+""}, accountBalance: {value: numeral(memberAccount.accountBalance).format("0,0.00")}}
        return Object.assign({}, state, {loading: false, memberDetailData});
    },
    [MemberRecharge.SELECT_MEMBER_BY_PHONE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //重置明细表单
    [MemberRecharge.MEMBER_RECHARGE_DETAILFORM_RESET]: (state, action) => {
        return Object.assign({}, state, { memberDetailData: initialState.memberDetailData });
    },
    [MemberRecharge.MEMBER_RECHARGE_ON_PHONE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {phone: _.trim(action.payload)});
    },
    //会员现金充值表单change
    [MemberRecharge.MEMBERRECHARGE_FORM_CHANGE]: (state, action) => {
        const rechargeFormData = {...state.rechargeFormData, ...action.payload};
        return Object.assign({}, state, { rechargeFormData });
    },
    [MemberRecharge.MEMBERRECHARGE_FORM_RESET]: (state, action) => {
        return Object.assign({}, state, { rechargeFormData: initialState.rechargeFormData });
    },
    //加载活动赠送金额
    [MemberRecharge.SELECT_RECHARGERULE_BY_PRICE_PENDING]: (state, action) => {
        return Object.assign({}, state, {rechargeRuleLoading: true});
    },
    [MemberRecharge.SELECT_RECHARGERULE_BY_PRICE_SUCCESS]: (state, action) => {
        const rechargeRuleData = action.payload;
        let totalPrice = 0, givePrice = 0;
        if(rechargeRuleData != null) {
            totalPrice = numeral(state.rechargeFormData.rechargeAmount.value + rechargeRuleData.givePrice).format("0.00");
            givePrice = numeral(rechargeRuleData.givePrice).format("0.00");
        } else {
            totalPrice = state.rechargeFormData.rechargeAmount.value;
        }
        const rechargeFormData = {...state.rechargeFormData, givePrice: {value: givePrice}, totalPrice: {value: totalPrice}}
        return Object.assign({}, state, {rechargeRuleLoading: false, rechargeFormData});
    },
    [MemberRecharge.SELECT_RECHARGERULE_BY_PRICE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {rechargeRuleLoading: false});
    },
    //会员现金充值 、
    [MemberRecharge.RECHARGE_BY_CASH_PENDING]: (state, action) => {
        return Object.assign({}, state, {rechargeLoading: true});
    },
    [MemberRecharge.RECHARGE_BY_CASH_SUCCESS]: (state, action) => {
        const accountBalance = action.payload;
        const memberDetailData = {...state.memberDetailData, accountBalance: {value: accountBalance}};
        return Object.assign({}, state, {rechargeLoading: false, memberDetailData});
    },
    [MemberRecharge.RECHARGE_BY_CASH_FAILURE]: (state, action) => {
        return Object.assign({}, state, {rechargeLoading: false});
    },
    //会员移动支付充值
    [MemberRecharge.RECHARGE_BY_MPAYMENT_PENDING]: (state, action) => {
        return Object.assign({}, state, {rechargeLoading: true});
    },
    [MemberRecharge.RECHARGE_BY_MPAYMENT_SUCCESS]: (state, action) => {
        const accountBalance = action.payload;
        const memberDetailData = {...state.memberDetailData, accountBalance: {value: accountBalance}};
        return Object.assign({}, state, {rechargeLoading: false, memberDetailData});
    },
    [MemberRecharge.RECHARGE_BY_MPAYMENT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {rechargeLoading: false});
    },
    //change
    [MemberRecharge.MEMBERRECHARGE_PAYORDERIDS_RESET]: (state, action) => {
        const { payOrderIds, rechargeAmount } = action.payload;
        const rechargeFormData = {...state.rechargeFormData, payOrderIds: {value: payOrderIds}, rechargeAmount: {value: numeral(rechargeAmount).value()}};
        return Object.assign({}, state, {rechargeFormData});
    },
    [MemberRecharge.MEMBERRECHARGE_RECHARGEMETHOD_RESET]: (state, action) => {
        const rechargeFormData = {...state.rechargeFormData, rechargeMethod: {value: "1"}, payOrderIds: {value: []}};
        return Object.assign({}, state, {rechargeFormData});
    },
}

export default createReducers(initialState, memberRechargeHandler);