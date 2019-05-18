import { MyOrder } from '../utils/constants';
import requestapi from '../common/requestapi';

const list = () => {
    return (dispatch, getState) => {
        dispatch({type: MyOrder.SELECT_MYORDER_PENDING});
        return requestapi({uri: "/api/myOrder/list"}).then((data) => {
            dispatch({type: MyOrder.SELECT_MYORDER_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MyOrder.SELECT_MYORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const cancelMyOrder = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MyOrder.CANCEL_MYORDER_PENDING});
        return requestapi({uri: `/api/myOrder/cancel/${id}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: MyOrder.CANCEL_MYORDER_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: MyOrder.CANCEL_MYORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const delMyOrder = (id) => {
    return (dispatch, getState) => {
        dispatch({type: MyOrder.DELETE_MYORDER_PENDING});
        return requestapi({uri: `/api/myOrder/delete/${id}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: MyOrder.DELETE_MYORDER_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: MyOrder.DELETE_MYORDER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    list,
    cancelMyOrder,
    delMyOrder,
}