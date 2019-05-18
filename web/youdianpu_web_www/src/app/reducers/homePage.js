import createReducers from '../utils/createReducers'
import { HomePage } from '../utils/constants'

const initialState  = {
    collapsed: false,//是否收起\展开菜单
    menuData: [],//功能菜单数据
    notifyCount: 0,//微标
    notifyLoading: false,//加载消息通知列表loading
    noticeList: [],//通知列表
    messageList: [],//消息列表
    loadingCurrMerchantInfo: true,//加载商家基本信息loading
    currMerchantInfo: null,//当前商家基本信息
    stepVisible: false,//是否显示审核步骤信息
    formData: {merchantName: {value: ""}, merchantLogo: {value: null}, address: {value: ""}, remark: {value: ""}, businessLicenceNo: {value: null}, yyzzs: {value: null}
        , photo: {value: null}, defaultImage: {value: null}},//商家提交审核信息form
    formData_md5: null,//formData的md5值
    currentStep: 0,//默认第一步
    merchantLogoList: [],//merchantLogo照片
    yyzzList: [],//商家营业执照照片
    photoList: [],//商家店铺照片
    saveLoading: false,//商家提交审核信息loading
    useFreeLoading: false,//开始试用按钮loading
    auditHisLoading: false,//加载审核历史loading
    auditHisList: [],//审核历史
    updateDefaultImageLoading: false, //修改店铺商家默认图片
    listFunPriceLoading: false,//加载功能菜单价目loading
    funPriceMap: {},//功能菜单价目map<functionId, funPriceList>
    modifyPWDLoading: false,//修改密码loading
    versionLoading: false,//加载版本信息loading
    versionData: null,//当前版本信息
    updateOperStatusLoading: false,//修改营业状态loading
    commitChangeDsiabled: true,//基本信息中 提交变更按钮是否可用
    commitChangeLoading: false,//提交更改loading
    listChangeHisLoading: false,//加载上次提交变更信息loading
    userChangeHis: null,//基本信息变更
    imageHis: [],//图片变更
}

const homePageHandler = {
    [HomePage.CHANGE_COLLAPSED]: (state, action) => {
        return Object.assign({}, state, {
            collapsed: action.payload
        });
    },
    [HomePage.SELECT_MENU_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {menuData: action.payload});
    },
    [HomePage.SELECT_NOTICE_COUNT_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {notifyCount: action.payload});
    },
    [HomePage.SELECT_NOTICEMSG_PENDING]: (state, action) => {
        return Object.assign({}, state, {notifyLoading: true});
    },
    [HomePage.SELECT_NOTICEMSG_SUCCESS]: (state, action) => {
        const { messages, notices } = action.payload;
        return Object.assign({}, state, {notifyLoading: false, noticeList: notices, messageList: messages});
    },
    [HomePage.SELECT_NOTICEMSG_FAILURE]: (state, action) => {
        return Object.assign({}, state, {notifyLoading: false}); 
    },
    [HomePage.DELETE_MESSAGE_PENDING]: (state, action) => {
        return Object.assign({}, state, {notifyLoading: true}); 
    },
    [HomePage.DELETE_MESSAGE_SUCCESS]: (state, action) => {
        const message = state.messageList.find(message => message.id == action.payload);
        //如果消息还是未读状态就删除了, 微标减1
        let notifyCount = state.notifyCount;
        if(message && message.messageStatus == 0) {
            notifyCount = Math.max(notifyCount - 1, 0);
        }
        const messageList = state.messageList.filter(message => {
            return message.id != action.payload;
        });
        return Object.assign({}, state, {notifyLoading: false, messageList, notifyCount}); 
    },
    [HomePage.DELETE_MESSAGE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {notifyLoading: false}); 
    },
    [HomePage.UPDATE_NOTICE_READSTATUS_SUCCESS]: (state, action) => {
        const notifyCount = Math.max(state.notifyCount - 1, 0);
        const noticeList = state.noticeList.map(notice => {
            if(notice.id == action.payload) {
                notice.status = 1;
            }
            return notice;
        });
        return Object.assign({}, state, {notifyCount, noticeList}); 
    },
    [HomePage.UPDATE_MESSAGE_READSTATUS_SUCCESS]: (state, action) => {
        const notifyCount = Math.max(state.notifyCount - 1, 0);
        const messageList = state.messageList.map(message => {
            if(message.id == action.payload) {
                message.messageStatus = 1;
            }
            return message;
        });
        return Object.assign({}, state, {notifyCount, messageList}); 
    },
    [HomePage.SELECT_CURRENT_MERCHANT_PENDING]: (state, action) => {
        return Object.assign({}, state, {loadingCurrMerchantInfo: true}); 
    },
    [HomePage.SELECT_CURRENT_MERCHANT_SUCCESS]: (state, action) => {
        const currMerchantInfo = action.payload;
        let stepVisible = false;
        if(currMerchantInfo.merchantStatus === 0 || currMerchantInfo.merchantStatus === 1 || currMerchantInfo.merchantStatus === 2) {
            stepVisible = true;
        }
        let new_merchantLogo = [];
        if(currMerchantInfo.logoPath) {
            new_merchantLogo.push({uid: currMerchantInfo.id, name: 'logo', status: 'done', url: `${currMerchantInfo.logoPath}?t=${new Date().getTime()}`});
        }
        const o_photoList = currMerchantInfo.photos || [];
        const n_fileList = o_photoList.map((item, index) => {
            return { uid: item.id, name: item.imageName, status: 'done', url: item.imagePath };
        });
        //默认商家图片id
        let defaultImageId = null;
        o_photoList.forEach(item => {
            if(item.defaultDisplay == 1) {
                defaultImageId = item.id;
            }
        });
        const formData = {merchantName: {value: currMerchantInfo.merchantName}, address: {value: currMerchantInfo.address},
            remark: {value: currMerchantInfo.remark},
            businessLicenceNo: {value: currMerchantInfo.businessLicenceNo},
            defaultImage: {value: defaultImageId},
            merchantLogo: {value: new_merchantLogo},
            yyzzs: {value: null}, photo: {value: n_fileList}};
        return Object.assign({}, state, {loadingCurrMerchantInfo: false, currMerchantInfo, stepVisible, 
            currentStep: currMerchantInfo.merchantStatus, formData, photoList: n_fileList, merchantLogoList: new_merchantLogo, 
            commitChangeDsiabled: true}); 
    },
    [HomePage.SELECT_CURRENT_MERCHANT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loadingCurrMerchantInfo: true}); 
    },
    [HomePage.CREATE_MERCHANTINFO_FORM_FIELD_CHANGE]: (state, action) => {
        //不知道为什么merchantLogo的上传图片的onRemove事件会触发onChange, 然而其他的都不会触发
        let formData = null;
        if(action.payload.merchantLogo && action.payload.merchantLogo.value) {
            if(action.payload.merchantLogo.value.file && 
                action.payload.merchantLogo.value.file.status == 'removed') {
                formData = { ...state.formData, merchantLogo: {value: null}};
            } else {
                formData = { ...state.formData, ...action.payload};
            }
        } else {
            formData = { ...state.formData, ...action.payload};
        }
        // const logoValue = action.payload.logo ? (action.payload.logo.value == null ? null : action.payload.logo.value.file.status == 'removed' ?  null :
        //     action.logo.value) : null;
        // const formData = { ...state.formData, ...action.payload};
        //这里是修改基本信息判断表单是否有更改
        let formData_clone = {merchantName: formData.merchantName.value, address: formData.address.value, 
            remark: formData.remark.value, merchantLogo: formData.merchantLogo.value, photo: formData.photo.value};
        return Object.assign({}, state, { formData });
    },
    [HomePage.MERCHANTUSER_LOGO_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { merchantLogoList: action.payload });
    },
    [HomePage.MERCHANTUSER_YYZZ_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { yyzzList: action.payload });
    },
    [HomePage.MERCHANTUSER_PHOTO_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { photoList: action.payload });
    },
    [HomePage.SAVE_MERCHANTINFO_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [HomePage.SAVE_MERCHANTINFO_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false, currentStep: 1, yyzzList: [] });
    },
    [HomePage.SAVE_MERCHANTINFO_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [HomePage.USEFREE_PENDING]: (state, action) => {
        return Object.assign({}, state, { useFreeLoading: true });
    },
    [HomePage.USEFREE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { useFreeLoading: false });
    },
    [HomePage.USEFREE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { useFreeLoading: false });
    },
    [HomePage.SELECT_AUITHIS_PENDING]: (state, action) => {
        return Object.assign({}, state, { auditHisLoading: true });
    },
    [HomePage.SELECT_AUITHIS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { auditHisLoading: false, auditHisList: action.payload });
    },
    [HomePage.SELECT_AUITHIS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { auditHisLoading: false });
    },
    [HomePage.GET_MERCHANT_YYZZ_IMAGE]: (state, action) => {
        const imageUrl = URL.createObjectURL(action.payload.data);
        const { id, fileName } = action.payload.info;
        const file = { uid: id, name: fileName, status: 'done', url: imageUrl }
        const n_yyzzList = [...state.yyzzList, file];
        const formData = {...state.formData, yyzzs: {value: n_yyzzList }};
        return Object.assign({}, state, { yyzzList: n_yyzzList, formData });
    },
    [HomePage.MERCHANTUSER_REMOVE_IMAGE]: (state, action) => {
        if(action.payload.type == 'yyzz') {
            const yyzzList = state.yyzzList;
            const new_yyzzList = yyzzList.filter(item => {
                return item.uid != action.payload.uid;
            });
            let new_formData = { ...state.formData, yyzzs: {value: new_yyzzList.length === 0 ? null : new_yyzzList} };
            return Object.assign({}, state, { formData: new_formData, yyzzList: new_yyzzList });    
        } else if(action.payload.type == 'logo') {
            let new_formData = { ...state.formData, merchantLogo: {value: null} };
            //这里是修改基本信息判断表单是否有更改
            let formData_clone = {merchantName: new_formData.merchantName.value, address: new_formData.address.value, 
                remark: new_formData.remark.value, merchantLogo: new_formData.merchantLogo.value, photo: new_formData.photo.value};
            return Object.assign({}, state, { formData: new_formData });    
        } else {
            const photoList = state.photoList;
            const new_photoList = photoList.filter(item => {
                return item.uid != action.payload.uid;
            });
            let defaultImage = state.formData.defaultImage;
            if(state.formData.defaultImage.value == action.payload.uid) {
                defaultImage.value = null;
            }
            let new_formData = { ...state.formData, photo: {value: new_photoList.length === 0 ? null : new_photoList}, defaultImage };
            //这里是修改基本信息判断表单是否有更改
            let formData_clone = {merchantName: new_formData.merchantName.value, address: new_formData.address.value, 
                remark: new_formData.remark.value, merchantLogo: new_formData.merchantLogo.value, photo: new_formData.photo.value};

            return Object.assign({}, state, { formData: new_formData, photoList: new_photoList });    
        }
    },
    [HomePage.HOMEPAGE_UPDATE_DEFAULTIMAGE_PENDING]: (state, action) => {
        return Object.assign({}, state, { updateDefaultImageLoading: true });
    },
    [HomePage.HOMEPAGE_UPDATE_DEFAULTIMAGE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { updateDefaultImageLoading: false });
    },
    [HomePage.HOMEPAGE_UPDATE_DEFAULTIMAGE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { updateDefaultImageLoading: false });
    },
    [HomePage.SELECT_ADMIN_FUNPRICE_PENDING]: (state, action) => {
        return Object.assign({}, state, { listFunPriceLoading: true });
    },
    [HomePage.SELECT_ADMIN_FUNPRICE_SUCCESS]: (state, action) => {
        const {data, functionId} = action.payload;
        const funPriceMap = {...state.funPriceMap, [functionId]: data}; 
        return Object.assign({}, state, { listFunPriceLoading: false, funPriceMap});
    },
    [HomePage.SELECT_ADMIN_FUNPRICE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { listFunPriceLoading: false });
    },
    [HomePage.MODIFY_PWD_PENDING]: (state, action) => {
        return Object.assign({}, state, { modifyPWDLoading: true });
    },
    [HomePage.MODIFY_PWD_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { modifyPWDLoading: false });
    },
    [HomePage.MODIFY_PWD_FAILURE]: (state, action) => {
        return Object.assign({}, state, { modifyPWDLoading: false });
    },
    [HomePage.GET_LAST_VERSION_PENDING]: (state, action) => {
        return Object.assign({}, state, { versionLoading: true });
    },
    [HomePage.GET_LAST_VERSION_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { versionLoading: false, versionData: action.payload });
    },
    [HomePage.GET_LAST_VERSION_FAILURE]: (state, action) => {
        return Object.assign({}, state, { versionLoading: false });
    },
    [HomePage.UPDATE_OPERATING_STATUS_PENDING]: (state, action) => {
        return Object.assign({}, state, { updateOperStatusLoading: true });
    },
    [HomePage.UPDATE_OPERATING_STATUS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { updateOperStatusLoading: false });
    },
    [HomePage.UPDATE_OPERATING_STATUS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { updateOperStatusLoading: false });
    },
    [HomePage.CHANGE_MERCHANTINFO_PENDING]: (state, action) => {
        return Object.assign({}, state, { commitChangeLoading: true });
    },
    [HomePage.CHANGE_MERCHANTINFO_SUCCESS]: (state, action) => {
        const currMerchantInfo = {...state.currMerchantInfo, changeAuditStatus: 0};
        return Object.assign({}, state, { commitChangeLoading: false, currMerchantInfo, userChangeHis: null });
    },
    [HomePage.CHANGE_MERCHANTINFO_FAILURE]: (state, action) => {
        return Object.assign({}, state, { commitChangeLoading: false });
    },
    [HomePage.LIST_USERCHANGE_HIS_PENDING]: (state, action) => {
        return Object.assign({}, state, { listChangeHisLoading: true });
    },
    [HomePage.LIST_USERCHANGE_HIS_SUCCESS]: (state, action) => {
        const { userChangeHis, imageHises } = action.payload;
        return Object.assign({}, state, { listChangeHisLoading: false, userChangeHis, imageHis: imageHises });
    },
    [HomePage.LIST_USERCHANGE_HIS_FAILURE]: (state, action) => {        
        return Object.assign({}, state, { listChangeHisLoading: false });
    },
}

export default createReducers(initialState, homePageHandler);