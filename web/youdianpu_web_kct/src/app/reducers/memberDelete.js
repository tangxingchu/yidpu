import createReducers from '../utils/createReducers'
import { MemberDelete } from '../utils/constants'
import moment from 'moment';
import numeral from 'numeral';

const initialState = {
    loading: false,//列表加载loading
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    memberList: [],//会员信息列表
    searchCondition: {phone: ""},
    searchFormData: {phone: {value: ""}},
    recoverLoading: false,
    changeDescValue: "",//恢复已删除会员备注信息
    detailLoading: false,
    memberDetailData: {phone: {value: ""}, type: {value: ""}, name: {value: ""}, status: {value: ""}, source: {value: ""}, sex: {value: ""}, 
        birthday: {value: null}, registerTime: {value: null}, rank: {value: 0}, point: {value: ""}, accountNo: {value: ""}, accountStatus: {value: ""},
        accountBalance: {value: ""}},
}

const memberDeleteHandler = {
    //查询已删除的会员列表信息
    [MemberDelete.LIST_MEMBERDELETE_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberDelete.LIST_MEMBERDELETE_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {loading: false, total: totalNum, pageSize, currentPage, memberList: items,});
    },
    [MemberDelete.LIST_MEMBERDELETE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //查询表单change
    [MemberDelete.MEMBERDELETE_SEARCHFORM_CHANGE]: (state, action) => {
        const searchFormData = {...state.searchFormData, ...action.payload};
        return Object.assign({}, state, { searchFormData });
    },
    [MemberDelete.MEMBERDELETE_SEARCHFORM_RESET]: (state, action) => {
        return Object.assign({}, state, { searchFormData: initialState.searchFormData, searchCondition: initialState.searchCondition });
    },
    //处理查询条件
    [MemberDelete.MEMBERDELETE_HANDLE_SEARCH]: (state, action) => {
        return Object.assign({}, state, {searchCondition: {...action.payload}});
    },
    //恢复会员信息
    [MemberDelete.RECOVER_MEMBER_PENDING]: (state, action) => {
        return Object.assign({}, state, {recoverLoading: true});
    },
    [MemberDelete.RECOVER_MEMBER_SUCCESS]: (state, action) => {
        const id = action.payload;
        const memberList = state.memberList.filter(item => item.id != id);
        return Object.assign({}, state, {recoverLoading: false, memberList});
    },
    [MemberDelete.RECOVER_MEMBER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {recoverLoading: false});
    },
    //冻结、解冻会员备注信息change
    [MemberDelete.MEMBERCHANGE_ON_CHANGEDESC_CHANGE]: (state, action) => {
        return Object.assign({}, state, { changeDescValue: action.payload });
    },
    //明细查询
    [MemberDelete.SELECT_MEMBERDELETE_DETAIL_PENDING]: (state, action) => {
        return Object.assign({}, state, {detailLoading: true});
    },
    [MemberDelete.SELECT_MEMBERDELETE_DETAIL_SUCCESS]: (state, action) => {
        const { memberUser, memberAccount } = action.payload;
        const memberDetailData = {phone: {value: memberUser.phone}, type: {value: memberUser.type+""}, name: {value: memberUser.name}, status: {value: "2"},
        source: {value: memberUser.source+""},  sex: {value: memberUser.sex+""}, birthday: {value: memberUser.birthday ? moment(memberUser.birthday, 'YYYY-MM-DD') : null}, 
        registerTime: {value: moment(memberUser.registerTime, 'YYYY-MM-DD')}, rank: {value: parseInt(memberUser.rank)}, point: {value: memberUser.point}, accountNo: {value: memberAccount.accountNo}, 
        accountStatus: {value: memberAccount.accountStatus+""}, accountBalance: {value: numeral(memberAccount.accountBalance).format('0,0.00')}}
        return Object.assign({}, state, {detailLoading: false, memberDetailData});
    },
    [MemberDelete.SELECT_MEMBERDELETE_DETAIL_FAILURE]: (state, action) => {
        return Object.assign({}, state, {detailLoading: false});
    },
}

export default createReducers(initialState, memberDeleteHandler);