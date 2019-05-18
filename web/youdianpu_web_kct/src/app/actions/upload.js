import { Upload } from '../utils/constants';
import requestapi from '../common/requestapi';

const upload = (formData) => {
    return (dispatch, getState) => {
        dispatch({type: Upload.UPLOAD_PENDING});
        return requestapi({uri: `/api/common/upload`, fetchParams: {
            method: 'post',
            mode:'cors', 
            headers: {},
            body: formData}})
        .then((data) => {
            dispatch({type: Upload.UPLOAD_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Upload.UPLOAD_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    upload
}