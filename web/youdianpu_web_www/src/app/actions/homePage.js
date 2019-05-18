import { HomePage } from '../utils/constants';
import requestapi from '../common/requestapi';

const changeCollapsed = (isCollapsed) => {
    return (dispatch, getState) => {
        return Promise.resolve(dispatch({
            type: HomePage.CHANGE_COLLAPSED,
            payload: isCollapsed,
        }));
    }
}

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

const selectUnReadCount = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/noticeMsg/selectUnReadCount`}).then((data) => {
            dispatch({type: HomePage.SELECT_NOTICE_COUNT_SUCCESS, payload: data.result});
        }).catch(err => {
            throw err;
        });
    }
}

const selectNoticeMsg = () => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.SELECT_NOTICEMSG_PENDING});
        return requestapi({uri: `/api/noticeMsg/selectNoticeMsg`}).then((data) => {
            dispatch({type: HomePage.SELECT_NOTICEMSG_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.SELECT_NOTICEMSG_FAILURE, payload: err.message});
            throw err;
        });
    }
}
const deleteMessage = (id) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.DELETE_MESSAGE_PENDING});
        return requestapi({uri: `/api/noticeMsg/deleteMessage`, fetchParams: {body: {id}}}).then((data) => {
            dispatch({type: HomePage.DELETE_MESSAGE_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: HomePage.DELETE_MESSAGE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const updateNoticeStatus = (noticeId) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/noticeMsg/updateNoticeStatus`, fetchParams: {body: {id: noticeId}}}).then((data) => {
            dispatch({type: HomePage.UPDATE_NOTICE_READSTATUS_SUCCESS, payload: noticeId});
        }).catch(err => {
            throw err;
        });
    }
}

const updateMessageStatus = (messageId) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/noticeMsg/updateMessageStatus`, fetchParams: {body: {id: messageId}}}).then((data) => {
            dispatch({type: HomePage.UPDATE_MESSAGE_READSTATUS_SUCCESS, payload: messageId});
        }).catch(err => {
            throw err;
        });
    }
}

const refreshPrivilege = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/refreshPrivilege`}).catch(err => {
            throw err;
        });
    }
}

const refreshToken = () => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/refreshToken`}).then(token => {
            window.localStorage.setItem("Authorization", token);
        }).catch(err => {
            throw err;
        });
    }
}

const selectCurrMerchantInfo = () => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.SELECT_CURRENT_MERCHANT_PENDING});
        return requestapi({uri: `/api/merchant/getCurrentUser`}).then(merchantUser => {
            dispatch({type: HomePage.SELECT_CURRENT_MERCHANT_SUCCESS, payload: merchantUser});
            return merchantUser;
        }).catch(err => {
            dispatch({type: HomePage.SELECT_CURRENT_MERCHANT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const formFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HomePage.CREATE_MERCHANTINFO_FORM_FIELD_CHANGE, payload: values})
        );
    }
}

const merchantLogoOnChange = (merchantLogoList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HomePage.MERCHANTUSER_LOGO_ONCHANGE, payload: merchantLogoList})
        );
    }
}

const yyzzOnChange = (yyzzList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HomePage.MERCHANTUSER_YYZZ_ONCHANGE, payload: yyzzList})
        );
    }
}

const photoOnChange = (photoList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HomePage.MERCHANTUSER_PHOTO_ONCHANGE, payload: photoList})
        );
    }
}

const save = (formData) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.SAVE_MERCHANTINFO_PENDING});
        return requestapi({uri: `/api/merchant/save`, fetchParams: {headers: {}, body: formData}}).then((data) => {
            dispatch({type: HomePage.SAVE_MERCHANTINFO_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.SAVE_MERCHANTINFO_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const useFree = () => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.USEFREE_PENDING});
        return requestapi({uri: `/api/merchant/useFree`}).then(() => {
            dispatch({type: HomePage.USEFREE_SUCCESS});
        }).catch(err => {
            dispatch({type: HomePage.USEFREE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const listAuditHis = () => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.SELECT_AUITHIS_PENDING});
        return requestapi({uri: `/api/merchant/listAuditHis`}).then((data) => {
            dispatch({type: HomePage.SELECT_AUITHIS_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.SELECT_AUITHIS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const getYYZZImageBlob = ({id, fileName}) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/merchant/yyzz/preview${fileName}`, fetchParams: {method: "get"}, respType: 'blob'}).then((data) => {
            dispatch({type: HomePage.GET_MERCHANT_YYZZ_IMAGE, payload: {info: {id, fileName}, data}});
        }).catch(err => {
            throw err;
        });
    }
}

const removeImage = (info) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: HomePage.MERCHANTUSER_REMOVE_IMAGE, payload: info})
        );
    }
}

const updateDefaultImage = (imageId) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.HOMEPAGE_UPDATE_DEFAULTIMAGE_PENDING});
        return requestapi({uri: `/api/merchant/updateDefaultImage`, fetchParams: {headers: {"content-type": "application/x-www-form-urlencoded"}, body: `imageId=${imageId}`}}).then((data) => {
            dispatch({type: HomePage.HOMEPAGE_UPDATE_DEFAULTIMAGE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.HOMEPAGE_UPDATE_DEFAULTIMAGE_FAILURE, payload: err.message});
            throw err;
        });
    }
}
/** 查询功能函数价目 **/
const listFunctionPrice = (functionId) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.SELECT_ADMIN_FUNPRICE_PENDING})
        return requestapi({uri: `/api/adminFunPrice/list/${functionId}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: HomePage.SELECT_ADMIN_FUNPRICE_SUCCESS, payload: {data, functionId}});
        }).catch(err => {
            dispatch({type: HomePage.SELECT_ADMIN_FUNPRICE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const modifyPWD = (oldPassword, newPassword) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.MODIFY_PWD_PENDING});
        return requestapi({uri: "/api/modifyPWD", fetchParams: {headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
            body: `oldPWD=${oldPassword}&newPWD=${newPassword}`}}).then((data) => {            
            dispatch({type: HomePage.MODIFY_PWD_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.MODIFY_PWD_FAILURE, payload: err.message});
            throw err;
        });
    }
}

/** 查询服务端最新版本信息 **/
const getLastVersion = (appType) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.GET_LAST_VERSION_PENDING})
        return requestapi({uri: `/api/version/getLastVersion/${appType}`, fetchParams: {method: 'get'}}).then((data) => {
            dispatch({type: HomePage.GET_LAST_VERSION_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.GET_LAST_VERSION_FAILURE, payload: err.message});
            throw err;
        });
    }
}

/**修改营业状态 */
const updateOperatingStatus = (status) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.UPDATE_OPERATING_STATUS_PENDING})
        return requestapi({uri: `/api/merchant/updateOperatingStatus`, fetchParams: {method: 'post', 
            headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
            body: `operatingStatus=${status}`}}).then((data) => {
            dispatch({type: HomePage.UPDATE_OPERATING_STATUS_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.UPDATE_OPERATING_STATUS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//商家信息变更
const commitBasicInfoChange = (formData) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.CHANGE_MERCHANTINFO_PENDING});
        return requestapi({uri: `/api/merchant/commitBasicInfoChange`, fetchParams: {headers: {}, body: formData}}).then((data) => {
            dispatch({type: HomePage.CHANGE_MERCHANTINFO_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.CHANGE_MERCHANTINFO_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//上次提交的变更信息
const listUserChangeHis = (merchantId) => {
    return (dispatch, getState) => {
        dispatch({type: HomePage.LIST_USERCHANGE_HIS_PENDING});
        return requestapi({uri: `/api/merchant/listUserChangeHis`}).then((data) => {
            dispatch({type: HomePage.LIST_USERCHANGE_HIS_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: HomePage.LIST_USERCHANGE_HIS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    changeCollapsed,
    getMenuData,
    getSrvStatus,
    selectUnReadCount,
    selectNoticeMsg,
    deleteMessage,
    updateNoticeStatus,
    updateMessageStatus,
    refreshPrivilege,
    refreshToken,
    selectCurrMerchantInfo,
    formFieldChangeValue,
    merchantLogoOnChange,
    yyzzOnChange,
    photoOnChange,
    save,
    useFree,
    listAuditHis,
    getYYZZImageBlob,
    removeImage,
    updateDefaultImage,
    listFunctionPrice,
    modifyPWD,
    getLastVersion,
    updateOperatingStatus,
    commitBasicInfoChange,
    listUserChangeHis,
}