import createReducers from '../utils/createReducers'
import { MemberRankConfig } from '../utils/constants'

const initialState = {
    loading: false,//列表加载loading
    rankConfigList: [], //配置信息
    updateLoading: false,//修改配置loading
}

const memberRankConfigHandler = {
    //查询会员等级配置信息
    [MemberRankConfig.LIST_RANKCONFIG_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberRankConfig.LIST_RANKCONFIG_SUCCESS]: (state, action) => {
        const rankConfigList = action.payload;
        return Object.assign({}, state, {loading: false, rankConfigList,});
    },
    [MemberRankConfig.LIST_RANKCONFIG_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //修改会员等级配置信息
    [MemberRankConfig.UPDATE_RANKCONFIG_PENDING]: (state, action) => {
        return Object.assign({}, state, {updateLoading: true});
    },
    [MemberRankConfig.UPDATE_RANKCONFIG_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {updateLoading: false});
    },
    [MemberRankConfig.UPDATE_RANKCONFIG_FAILURE]: (state, action) => {
        return Object.assign({}, state, {updateLoading: false});
    },
}

export default createReducers(initialState, memberRankConfigHandler);