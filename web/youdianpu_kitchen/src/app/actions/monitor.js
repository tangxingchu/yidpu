import { Monitor } from '../utils/constants';

const dispathQuerySuccess = (data) => {
    return (dispatch, getState) => {
        dispatch({type: Monitor.SELECT_PLACEORDER_SUCCESS, payload: data});
    }
}

const dispathQueryPending = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Monitor.SELECT_PLACEORDER_PENDING})
        );
    }
}

const dispathQueryFailure = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Monitor.SELECT_PLACEORDER_FAILURE})
        );
    }
}


export default {
    dispathQuerySuccess,
    dispathQueryPending,
    dispathQueryFailure,
}