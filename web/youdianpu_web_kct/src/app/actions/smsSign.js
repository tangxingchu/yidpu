import { SMSSign } from '../utils/constants';
import requestapi from '../common/requestapi';

//表单change
const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: SMSSign.SIGNFORM_FIELD_CHANGE, payload: values})
        );
    }
}

const removeImage = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: SMSSign.SIGNFORM_REMOVE_IMAGE})
        );
    }
}

const onImageChange = (fileList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: SMSSign.SIGNFORM_IMAGE_CHANGE, payload: fileList})
        );
    }
}

//查询短信签名
const selectSMSSign = () => {
    return (dispatch, getState) => {
        dispatch({type: SMSSign.SELECT_SMSSIGN_PENDING});
        return requestapi({uri: `/api/smsSign/selectSMSSign`}).then((data) => {
            dispatch({type: SMSSign.SELECT_SMSSIGN_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: SMSSign.SELECT_SMSSIGN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//保存短信签名
const saveSMSSign = (formData) => {
    return (dispatch, getState) => {
        dispatch({type: SMSSign.SAVE_SMSSIGN_PENDING});
        return requestapi({uri: `/api/smsSign/saveSMSSign`, fetchParams: {headers: {}, body: formData}}).then((data) => {
            dispatch({type: SMSSign.SAVE_SMSSIGN_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: SMSSign.SAVE_SMSSIGN_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//阿里云短信服务 授权委托书照片预览
const getSqhImage = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/smsSign/sqh/preview`, fetchParams: {method: "get"}, respType: 'blob'}).then((data) => {
            dispatch({type: SMSSign.GET_SMSSIGN_SQH_IMAGE, payload: {data}});
        }).catch(err => {
            throw err;
        });
    }
}

export default {
    fieldChangeValue,
    removeImage,
    onImageChange,
    selectSMSSign,
    saveSMSSign,
    getSqhImage,
}