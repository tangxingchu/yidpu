import { BasicConfig } from '../utils/constants';
import requestapi from '../common/requestapi';

const selectByCode = (configCode) => {
    return (dispatch, getState) => {
        dispatch({type: BasicConfig.SELECT_BASIC_CONFIG_PENDING});
        return requestapi({uri: `/api/config/get/${configCode}`, fetchParams: { method: 'get' }}).then((data) => {
            dispatch({type: BasicConfig.SELECT_BASIC_CONFIG_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: BasicConfig.SELECT_BASIC_CONFIG_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    selectByCode,
}