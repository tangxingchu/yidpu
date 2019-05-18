import createReducers from '../utils/createReducers'
import moment from 'moment';
import { TodayOverview } from '../utils/constants'

const initialState = {
    initLoading: false,
    dataResults: {},
    goodsImages: {},//商品图片的base64
    activeKey: "1",
}

const todayOverviewHandler = {
    //初始化
    [TodayOverview.INIT_TODAY_OVERVIEW_PENDING]: (state, action) => {
        return Object.assign({}, state, { initLoading: true });
    },
    [TodayOverview.INIT_TODAY_OVERVIEW_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { initLoading: false , dataResults: action.payload });
    },
    [TodayOverview.INIT_TODAY_OVERVIEW_FAILURE]: (state, action) => {
        return Object.assign({}, state, { initLoading: false });
    },
    //商品图片信息
    [TodayOverview.TODAY_GOODS_IMAGE_REPLY]: (state, action) => {
        const { goodsId, base64Image } = action.payload;
        const goodsImages = {...state.goodsImages, [goodsId]: base64Image};
        return Object.assign({}, state, { goodsImages, initLoading: false });
    },
    [TodayOverview.TODAY_ONTAB_CHANGE]: (state, action) => {
        return Object.assign({}, state, { activeKey: action.payload });
    },
}

export default createReducers(initialState, todayOverviewHandler);