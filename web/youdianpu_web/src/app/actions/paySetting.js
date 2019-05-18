import { PaySetting } from '../utils/constants';
import requestapi from '../common/requestapi';

const alipayFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaySetting.ALIPAY_FIELD_CHANGE, payload: values})
        );
    }
}

const selectAlipayByMid = () => {
    return (dispatch, getState) => {
        dispatch({type: PaySetting.SELECT_ALIPAY_PENDING});
        return requestapi({uri: "/api/paySetting/selectAlipayByMId"}).then((data) => {
            dispatch({type: PaySetting.SELECT_ALIPAY_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: PaySetting.SELECT_ALIPAY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const saveAlipay = (alipay) => {
    return (dispatch, getState) => {
        dispatch({type: PaySetting.SAVE_ALIPAY_PENDING});
        return requestapi({uri: "/api/paySetting/saveAlipay", fetchParams: {body: alipay}}).then((data) => {
            dispatch({type: PaySetting.SAVE_ALIPAY_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: PaySetting.SAVE_ALIPAY_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//获取商家签约阿里支付宝的状态
const getPaySteup = () => {
    return (dispatch, getState) => {
        dispatch({type: PaySetting.SELECT_PAY_STEUP_PENDING});
        return requestapi({uri: "/api/merchant/getPaySteup"}).then((data) => {
            dispatch({type: PaySetting.SELECT_PAY_STEUP_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: PaySetting.SELECT_PAY_STEUP_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const secondFormFieldChange = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaySetting.PAYSETTING_SECOND_FORM_FIELD_CHANGE, payload: values})
        );
    }
}

const sqhOnChange = (sqhList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaySetting.PAYSETTING_SQH_ONCHANGE, payload: sqhList})
        );
    }
}

const removeImage = (info) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaySetting.PAYSETTING_REMOVE_IMAGE, payload: info})
        );
    }
}

const saveAuthFile = (formData) => {
    return (dispatch, getState) => {
        dispatch({type: PaySetting.SAVE_PAYSETTING_SECOND_PENDING});
        return requestapi({uri: `/api/merchant/saveAuthFile`, fetchParams: {headers: {}, body: formData}}).then((data) => {
            dispatch({type: PaySetting.SAVE_PAYSETTING_SECOND_SUCCESS, payload: data.result});
            return data.result;
        }).catch(err => {
            dispatch({type: PaySetting.SAVE_PAYSETTING_SECOND_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//支付宝授权函照片预览
const getSqhImage = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/merchant/sqh/preview`, fetchParams: {method: "get"}, respType: 'blob'}).then((data) => {
            dispatch({type: PaySetting.GET_PAYSETTING_SQH_IMAGE, payload: {data}});
        }).catch(err => {
            throw err;
        });
    }
}

//微信支付申请表单change
const wxpayFormFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaySetting.WXPAY_FORM_FIELD_CHANGE, payload: values})
        );
    }
}

//身份证正面照片
const identityPhotoFrontOnChange = (identityPhotoFrontList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaySetting.WXPAY_IDENTITYPHOTOFRONT_ONCHANGE, payload: identityPhotoFrontList})
        );
    }
}

//身份证背面照片
const identityPhotoBackOnChange = (identityPhotoBackList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaySetting.WXPAY_IDENTITYPHOTOBACK_ONCHANGE, payload: identityPhotoBackList})
        );
    }
}

//组织机构代码证
const orgPhotoOnChange = (orgPhotoList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaySetting.WXPAY_ORGPHOTO_ONCHANGE, payload: orgPhotoList})
        );
    }
}

//保存微信支付申请基本信息
const saveWxpayInfo = (formData) => {
    return (dispatch, getState) => {
        dispatch({type: PaySetting.SAVE_WXPAY_FIRST_PENDING});
        return requestapi({uri: `/api/merchant/saveWxpayInfo`, fetchParams: {headers: {}, body: formData}}).then((data) => {
            dispatch({type: PaySetting.SAVE_WXPAY_FIRST_SUCCESS, payload: data.result});
        }).catch(err => {
            dispatch({type: PaySetting.SAVE_WXPAY_FIRST_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//查询微信支付申请基本信息
const getWxPayInfo = () => {
    return (dispatch, getState) => {
        dispatch({type: PaySetting.SELECT_WXPAYINFO_PENDING});
        return requestapi({uri: "/api/merchant/getWxPayInfo"}).then((data) => {
            dispatch({type: PaySetting.SELECT_WXPAYINFO_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: PaySetting.SELECT_WXPAYINFO_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//微信支付申请基础信息照片预览
const getWxpayImage = (photoPath, fileType) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/merchant/wxpay/preview`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `photoPath=${photoPath}`,
        }, respType: 'blob'}).then((data) => {
            dispatch({type: PaySetting.GET_WXPAY_IMAGE, payload: {fileType, data}});
        }).catch(err => {
            throw err;
        });
    }
}

//修改微信支付审核步骤
const updateWxpaySteup = (wxpaySteup) => {
    return (dispatch, getState) => {
        dispatch({type: PaySetting.UPDATE_WXPAYSTEUP_PENDING});
        return requestapi({uri: `/api/merchant/updateWxpaySteup`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `wxpaySteup=${wxpaySteup}`,
        }}).then((data) => {
            dispatch({type: PaySetting.UPDATE_WXPAYSTEUP_SUCCESS, payload: wxpaySteup});
        }).catch(err => {
            dispatch({type: PaySetting.UPDATE_WXPAYSTEUP_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//tabchange事件
const onTabChange = (activeKey) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PaySetting.PAYSETTING_ONTAB_CHANGE, payload: activeKey})
        );
    }
}

export default {
    alipayFieldChangeValue,
    selectAlipayByMid,
    saveAlipay,
    getPaySteup,
    secondFormFieldChange,
    sqhOnChange,
    removeImage,
    saveAuthFile,
    getSqhImage,
    wxpayFormFieldChangeValue,
    identityPhotoFrontOnChange,
    identityPhotoBackOnChange,
    orgPhotoOnChange,
    saveWxpayInfo,
    getWxPayInfo,
    getWxpayImage,
    updateWxpaySteup,
    onTabChange,
}