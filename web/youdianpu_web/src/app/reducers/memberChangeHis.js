import createReducers from '../utils/createReducers'
import { MemberChangeHis } from '../utils/constants'

const initialState = {
    loading: false,//列表加载loading
    pageSize: 5,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    changeHisList: [],//会员变更信息列表
    hasMore: false,
    phone: "",
    searchPhone: "",
}

const memberChangeHisHandler = {
    //加载会员变更历史记录
    [MemberChangeHis.LIST_CHANGEHIS_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberChangeHis.LIST_CHANGEHIS_SUCCESS]: (state, action) => {
        const { data, isMore } = action.payload;
        const { pageSize, items, totalNum, currentPage } = data;
        let changeHisList = [];
        if(isMore) {
            changeHisList = [...state.changeHisList, ...items];
        } else {
            changeHisList = [...items];
        }
        const hasMore = currentPage * pageSize < totalNum;
        return Object.assign({}, state, {loading: false, total: totalNum, pageSize, currentPage, changeHisList, hasMore});
    },
    [MemberChangeHis.LIST_CHANGEHIS_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //手机号码change
    [MemberChangeHis.MEMBERCHANGEHIS_PHONE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {phone: action.payload});
    },
    [MemberChangeHis.MEMBERCHANGEHIS_HANDLE_SEARCH]: (state, action) => {
        return Object.assign({}, state, {searchPhone: action.payload});
    },
}

export default createReducers(initialState, memberChangeHisHandler);