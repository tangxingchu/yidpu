import { TodayOverview } from '../utils/constants';
import requestapi from '../common/requestapi';

//初始化
const init = () => {
    return (dispatch, getState) => {
        dispatch({type: TodayOverview.INIT_TODAY_OVERVIEW_PENDING});
        return requestapi({uri: `/api/report/todayOverview`}).then((data) => {
            dispatch({type: TodayOverview.INIT_TODAY_OVERVIEW_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: TodayOverview.INIT_TODAY_OVERVIEW_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_goodsImage = (goodsId, base64Image) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: TodayOverview.TODAY_GOODS_IMAGE_REPLY, payload: {goodsId, base64Image}})
        );
    }
}

const onTabChange = (activeKey) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: TodayOverview.TODAY_ONTAB_CHANGE, payload: activeKey})
        );
    }
}

export default {
    init,
    dispatch_goodsImage,
    onTabChange,
}