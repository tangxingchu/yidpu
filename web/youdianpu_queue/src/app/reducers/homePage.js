import createReducers from '../utils/createReducers'
import { HomePage } from '../utils/constants'

const initialState  = {
    menuData: [],
    versionLoading: false,//加载版本信息loading
    versionData: null,//当前版本信息
    currMerchantUser: null,
}

const homePageHandler = {
    [HomePage.SELECT_MENU_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {menuData: action.payload});
    },
    [HomePage.GET_LAST_VERSION_PENDING]: (state, action) => {
        return Object.assign({}, state, { versionLoading: true });
    },
    [HomePage.GET_LAST_VERSION_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { versionLoading: false, versionData: action.payload });
    },
    [HomePage.GET_LAST_VERSION_FAILURE]: (state, action) => {
        return Object.assign({}, state, { versionLoading: false });
    },
    [HomePage.SELECT_CURRENT_MERCHANT_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { currMerchantUser: action.payload });
    },
}

export default createReducers(initialState, homePageHandler);