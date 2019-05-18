import { BusinessInfo } from '../utils/constants';
import requestapi from '../common/requestapi';

const save = (businessInfo) => {
    return (dispatch, getState) => {
        dispatch({type: BusinessInfo.SAVE_BUSINESSINFO_PENDING});
        return requestapi({uri: `/api/businessInfo/save`, fetchParams: {body: businessInfo}}).then((data) => {
            dispatch({type: BusinessInfo.SAVE_BUSINESSINFO_SUCCESS, payload: businessInfo});
        }).catch(err => {
            dispatch({type: BusinessInfo.SAVE_BUSINESSINFO_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const select = () => {
    return (dispatch, getState) => {
        dispatch({type: BusinessInfo.SELECT_BUSINESSINFO_PENDING});
        return requestapi({uri: `/api/businessInfo/get`}).then((data) => {
            dispatch({type: BusinessInfo.SELECT_BUSINESSINFO_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: BusinessInfo.SELECT_BUSINESSINFO_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    save,
    select,
}