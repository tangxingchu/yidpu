import createReducers from '../utils/createReducers'
import { MemberRefund } from '../utils/constants'
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

const initialState = {
    loading: false,//加载会员信息
    memberDetailData: {id: {value: ""}, phone: {value: ""}, type: {value: ""}, name: {value: ""}, status: {value: ""}, source: {value: ""}, sex: {value: ""}, 
        birthday: {value: null}, registerTime: {value: null}, rank: {value: 0}, point: {value: ""}, accountNo: {value: ""}, accountStatus: {value: ""},
        accountBalance: {value: ""}},
    phone: "",//查询号码
    refundLoading: false,
    refundFormData: {refundAmount: {value: ""}},
    recordList: [],
    recordLoading: false,
    hasMore: false,//是否有更多数据,消费充值记录数据
    pageSize: 5,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    recordTypes: [1, 2, 3],//记录类型(1=充值,2=消费,3=退款)
}

const memberRefundHandler = {
    //查询会员明细（包括账户信息）
    [MemberRefund.SELECT_MEMBER_BY_REFUND_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberRefund.SELECT_MEMBER_BY_REFUND_SUCCESS]: (state, action) => {
        const { memberUser, memberAccount } = action.payload;
        const memberDetailData = {id: {value: memberUser.id}, phone: {value: memberUser.phone}, type: {value: memberUser.type+""}, name: {value: memberUser.name}, status: {value: memberUser.status+""},
        source: {value: memberUser.source+""},  sex: {value: memberUser.sex+""}, birthday: {value: memberUser.birthday ? moment(memberUser.birthday, 'YYYY-MM-DD') : null}, 
        registerTime: {value: moment(memberUser.registerTime, 'YYYY-MM-DD')}, rank: {value: parseInt(memberUser.rank)}, point: {value: memberUser.point}, accountNo: {value: memberAccount.accountNo}, 
        accountStatus: {value: memberAccount.accountStatus+""}, accountBalance: {value: numeral(memberAccount.accountBalance).format("0,0.00")}}
        return Object.assign({}, state, {loading: false, memberDetailData});
    },
    [MemberRefund.SELECT_MEMBER_BY_REFUND_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [MemberRefund.MEMBER_REFUND_DETAILFORM_RESET]: (state, action) => {
        return Object.assign({}, state, { memberDetailData: initialState.memberDetailData });
    },
    [MemberRefund.MEMBER_REFUND_ON_PHONE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {phone: _.trim(action.payload)});
    },
    //加载会员充值\消费记录
    [MemberRefund.LIST_MEMBERRECORD_BY_MEMBERID_PENDING]: (state, action) => {
        return Object.assign({}, state, {recordLoading: true});
    },
    [MemberRefund.LIST_MEMBERRECORD_BY_MEMBERID_SUCCESS]: (state, action) => {
        const { data, isMore } = action.payload;
        const { pageSize, items, totalNum, currentPage } = data;
        let recordList = [];
        if(isMore) {
            recordList = [...state.recordList, ...items];
        } else {
            recordList = [...items];
        }
        const hasMore = currentPage * pageSize < totalNum;
        return Object.assign({}, state, {recordLoading: false, total: totalNum, pageSize, currentPage, recordList, hasMore});
    },
    [MemberRefund.LIST_MEMBERRECORD_BY_MEMBERID_FAILURE]: (state, action) => {
        return Object.assign({}, state, {recordLoading: false});
    },
    //记录类型change
    [MemberRefund.MEMBER_REFUND_ON_RECORDTYPE_CHANGE]: (state, action) => {
        let recordTypes = null;
        const { typeValue, checked } = action.payload;
        if(checked) {
            recordTypes = [...state.recordTypes, typeValue];
        } else {
            recordTypes = state.recordTypes.filter(item => item != typeValue);
        }   
        return Object.assign({}, state, {recordTypes});     
    },
    //退款
    [MemberRefund.MEMBERREFUND_REFUND_PENDING]: (state, action) => {
        return Object.assign({}, state, {refundLoading: true});
    },
    [MemberRefund.MEMBERREFUND_REFUND_SUCCESS]: (state, action) => {
        const memberDetailData = {...state.memberDetailData, accountBalance: {value: numeral(0).format("0,0.00")}}
        return Object.assign({}, state, {refundLoading: false, memberDetailData});
    },
    [MemberRefund.MEMBERREFUND_REFUND_FAILURE]: (state, action) => {
        return Object.assign({}, state, {refundLoading: false});
    },
}

export default createReducers(initialState, memberRefundHandler);