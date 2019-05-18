import createReducers from '../utils/createReducers'
import { MemberRecord } from '../utils/constants'
import moment from 'moment';

const initialState  = {
    loading: false,//加载loading
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    memberRecordList: [],//会员充值\消费列表
    searchCondition: {phone: "", recordTime: [moment().startOf('month'), moment().endOf('day')]},
    searchFormData: {phone: {value: ""}, recordTime: {value: [moment().startOf('month'), moment().endOf('day')]},},
}

const memberRecordHandler = {
    //查询会员充值消费列表
    [MemberRecord.LIST_MEMBERRECORD_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberRecord.LIST_MEMBERRECORD_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {loading: false, total: totalNum, pageSize, currentPage, memberRecordList: items,});
    },
    [MemberRecord.LIST_MEMBERRECORD_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [MemberRecord.MEMBERRECORD_SEARCHFORM_CHANGE]: (state, action) => {
        const searchFormData = {...state.searchFormData, ...action.payload};
        return Object.assign({}, state, { searchFormData });
    },
    [MemberRecord.MEMBERRECORD_SEARCHFORM_RESET]: (state, action) => {
        const searchFormData = initialState.searchFormData;
        return Object.assign({}, state, {searchFormData, searchCondition: initialState.searchCondition});
    },
    //处理查询条件
    [MemberRecord.MEMBERRECORD_HANDLE_SEARCH]: (state, action) => {
        return Object.assign({}, state, {searchCondition: {...action.payload}});
    },
}

export default createReducers(initialState, memberRecordHandler);