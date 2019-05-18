import { Profile } from '../utils/constants';
import requestapi from '../common/requestapi';

const selectLastVersion = () => {
    return (dispatch, getState) => {
        dispatch({type: Profile.SELECT_LASTVERSION_PENDING});
        return requestapi({uri: `/api/waiter/selectLastVersion`}).then((data) => {
            dispatch({type: Profile.SELECT_LASTVERSION_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Profile.SELECT_LASTVERSION_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const dispatch_appVersion = (versionName) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Profile.DISPATCH_VERSIONNAME_SUCCESS, payload: versionName})
        );
    }
}

export default {
    selectLastVersion,
    dispatch_appVersion,
}