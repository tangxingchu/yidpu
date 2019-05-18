import { HomePage } from '../utils/constants';
import requestapi from '../common/requestapi';

const getMenuData = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/menu`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: HomePage.SELECT_MENU_SUCCESS, payload: data || []});
        }).catch(err => {
            throw err;
        });
    }
}

const getSrvStatus = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/common/status`, fetchParams: {method: 'post'}}).then((data) => {
            return data;
        }).catch(err => {
            throw err;
        });
    }
}

export default {
    getMenuData,
    getSrvStatus,
}