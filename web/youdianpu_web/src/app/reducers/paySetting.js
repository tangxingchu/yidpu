import createReducers from '../utils/createReducers'
import { PaySetting, HomePage } from '../utils/constants'

const initialState = {
    alipayLoading: false,
    alipayData: {id: {value: ""}, appId: {value: ""}, publicKey: {value: ""}, privateKey: {value: ""}},
    firstSteupLoading: false,//第一步授权 loading
    currentSteup: 0,//支付宝当前步骤
    wxpaySteup: 0,//微信当前步骤
    qyFormData: {alipay_dmf: {value: "0"}, sqh: {value: null}}, //支付宝签约表单
    sqhList: [],//授权函照片
    secondSteupLoading: false,//第二步骤 loading
    wxpayFormData: {id: {value: ""}, contactsName: {value: ""}, phone: {value: ""}, email: {value: ""}, merchantName: {value: ""}, servicePhone: {value: ""},
        businessLicenceNo: {value: ""}, orgPhoto: {value: null}, identityPhotoBack: {value: null}, identityPhotoFront: {value: null}, yyzzs: {value: null},
        accountType: {value: "1"}, accountName: {value: ""}, accountBank: {value: ""}, accountFockback: {value: ""}, accountNo: {value: ""}},//微信支付提交审核信息form
    yyzzList: [],//营业执照登录资质
    identityPhotoBackList: [],
    identityPhotoFrontList: [],
    orgPhotoList: [],
    wxpayInfoLoading: false,//加载微信支付基本信息查询
    wxpayInfoSaveLoading: false,//微信支付 基础资料提交loading
    wxpayInfoData: null,
    defaultActiveKey: "1",//默认支付宝选项卡
}

const paySettingHandler = {
    [PaySetting.SELECT_ALIPAY_PENDING]: (state, action) => {
        return Object.assign({}, state, {alipayLoading: true});
    },
    [PaySetting.SELECT_ALIPAY_SUCCESS]: (state, action) => {
        const { id, appId, publicKey, privateKey } = action.payload;
        const alipayData = {id: {value: id}, appId: {value: appId}, publicKey: {value: publicKey}, privateKey: {value: privateKey}};
        return Object.assign({}, state, {alipayLoading: false, alipayData});
    },
    [PaySetting.SELECT_ALIPAY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {alipayLoading: false});
    },
    [PaySetting.ALIPAY_FIELD_CHANGE]: (state, action) => {
        const alipayData = {...state.alipayData, ...action.payload};
        return Object.assign({}, state, { alipayData });
    },
    [PaySetting.SAVE_ALIPAY_PENDING]: (state, action) => {
        return Object.assign({}, state, {alipayLoading: true});
    },
    [PaySetting.SAVE_ALIPAY_SUCCESS]: (state, action) => {
        const alipayData = {...state.alipayData, id: {value: action.payload.result}};
        return Object.assign({}, state, {alipayLoading: false, alipayData});
    },
    [PaySetting.SAVE_ALIPAY_FAILURE]: (state, action) => {
        return Object.assign({}, state, {alipayLoading: false});
    },
    [PaySetting.SELECT_PAY_STEUP_PENDING]: (state, action) => {
        return Object.assign({}, state, {firstSteupLoading: true});
    },
    [PaySetting.SELECT_PAY_STEUP_SUCCESS]: (state, action) => {
        const { alipaySteup } = action.payload;        
        return Object.assign({}, state, {firstSteupLoading: false, currentSteup: alipaySteup});
    },
    [PaySetting.SELECT_PAY_STEUP_FAILURE]: (state, action) => {
        return Object.assign({}, state, {firstSteupLoading: false});
    },
    [PaySetting.PAYSETTING_SECOND_FORM_FIELD_CHANGE]: (state, action) => {
        const qyFormData = { ...state.qyFormData, ...action.payload };
        return Object.assign({}, state, { qyFormData });
    },
    [PaySetting.PAYSETTING_SQH_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { sqhList: action.payload });
    },
    [PaySetting.PAYSETTING_REMOVE_IMAGE]: (state, action) => {
        const { type, uid } = action.payload;
        //支付宝授权函
        if(type == "sqh") {
            const qyFormData = { ...state.qyFormData, sqh: {value: null} };
            return Object.assign({}, state, { qyFormData, sqhList: [] }); 
        } else if(type == "identityPhotoFront") {
            const wxpayFormData = { ...state.wxpayFormData, identityPhotoFront: {value: null} };
            return Object.assign({}, state, { wxpayFormData, identityPhotoFrontList: [] }); 
        } else if(type == "identityPhotoBack") {
            const wxpayFormData = { ...state.wxpayFormData, identityPhotoBack: {value: null} };
            return Object.assign({}, state, { wxpayFormData, identityPhotoBackList: [] }); 
        } else if(type == "orgPhoto") {
            const wxpayFormData = { ...state.wxpayFormData, orgPhoto: {value: null} };
            return Object.assign({}, state, { wxpayFormData, orgPhotoList: [] }); 
        }
    },
    [PaySetting.SAVE_PAYSETTING_SECOND_PENDING]: (state, action) => {
        return Object.assign({}, state, {secondSteupLoading: true});
    },
    [PaySetting.SAVE_PAYSETTING_SECOND_SUCCESS]: (state, action) => {
        const alipaySteup = action.payload;        
        return Object.assign({}, state, {secondSteupLoading: false, currentSteup: alipaySteup});
    },
    [PaySetting.SAVE_PAYSETTING_SECOND_FAILURE]: (state, action) => {
        return Object.assign({}, state, {secondSteupLoading: false});
    },
    [PaySetting.GET_PAYSETTING_SQH_IMAGE]: (state, action) => {
        const imageUrl = URL.createObjectURL(action.payload.data);
        const file = { uid: "id", name: "fileName", status: 'done', url: imageUrl }
        const n_sqhList = [file];
        const qyFormData = {...state.qyFormData, sqh: {value: n_sqhList }};
        return Object.assign({}, state, { sqhList: n_sqhList, qyFormData });
    },
    [PaySetting.WXPAY_FORM_FIELD_CHANGE]: (state, action) => {
        const wxpayFormData = { ...state.wxpayFormData, ...action.payload };
        return Object.assign({}, state, { wxpayFormData });
    },
    [PaySetting.WXPAY_IDENTITYPHOTOFRONT_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { identityPhotoFrontList: action.payload });
    },
    [PaySetting.WXPAY_IDENTITYPHOTOBACK_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { identityPhotoBackList: action.payload });
    },
    [PaySetting.WXPAY_ORGPHOTO_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { orgPhotoList: action.payload });
    },
    //微信支付第一步资料提交
    [PaySetting.SAVE_WXPAY_FIRST_PENDING]: (state, action) => {
        return Object.assign({}, state, { wxpayInfoSaveLoading: true });
    },
    [PaySetting.SAVE_WXPAY_FIRST_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { wxpayInfoSaveLoading: false, wxpaySteup: 1 });
    },
    [PaySetting.SAVE_WXPAY_FIRST_FAILURE]: (state, action) => {
        return Object.assign({}, state, { wxpayInfoSaveLoading: false });
    },
    //查询微信支付申请基本信息
    [PaySetting.SELECT_WXPAYINFO_PENDING]: (state, action) => {
        return Object.assign({}, state, { wxpayInfoLoading: true });
    },
    [PaySetting.SELECT_WXPAYINFO_SUCCESS]: (state, action) => {
        const wxpayInfoData = action.payload;
        if(wxpayInfoData.id) {
            const wxpayFormData = {...state.wxpayFormData, id: {value: wxpayInfoData.id}, contactsName: {value: wxpayInfoData.contactsName},
                phone: {value: wxpayInfoData.phone}, email: {value: wxpayInfoData.email}, merchantName: {value: wxpayInfoData.merchantName},
                servicePhone: {value: wxpayInfoData.servicePhone}, businessLicenceNo: {value: wxpayInfoData.businessLicenceNo}, 
                orgPhotoPath: {value: wxpayInfoData.orgPhotoPath}, identityPhotoFrontPath: {value: wxpayInfoData.identityPhotoFrontPath},
                identityPhotoBackPath: {value: wxpayInfoData.identityPhotoBackPath}, accountType: {value: wxpayInfoData.accountType+""},
                accountName: {value: wxpayInfoData.accountName}, accountBank: {value: wxpayInfoData.accountBank}, accountFockback: {value: wxpayInfoData.accountFockback},
                accountNo: {value: wxpayInfoData.accountNo}};
            return Object.assign({}, state, { wxpayInfoLoading: false, wxpayFormData, wxpayInfoData});
        } else {
            return Object.assign({}, state, { wxpayInfoLoading: false, wxpayInfoData});
        }
    },
    [PaySetting.SELECT_WXPAYINFO_FAILURE]: (state, action) => {
        return Object.assign({}, state, { wxpayInfoLoading: false });
    },
    //微信支付基础信息 照片预览
    [PaySetting.GET_WXPAY_IMAGE]: (state, action) => {
        const {fileType, data} = action.payload;
        const imageUrl = URL.createObjectURL(data);
        const file = { uid: fileType, name: fileType, status: 'done', url: imageUrl }
        if(fileType == "identityPhotoFront") {
            const identityPhotoFrontList = [file];
            const wxpayFormData = {...state.wxpayFormData, identityPhotoFront: {value: identityPhotoFrontList }};
            return Object.assign({}, state, { identityPhotoFrontList, wxpayFormData });
        } else if(fileType == "identityPhotoBack") {
            const identityPhotoBackList = [file];
            const wxpayFormData = {...state.wxpayFormData, identityPhotoBack: {value: identityPhotoBackList }};
            return Object.assign({}, state, { identityPhotoBackList, wxpayFormData });
        } else if(fileType == "orgPhoto") {
            const orgPhotoList = [file];
            const wxpayFormData = {...state.wxpayFormData, orgPhotoList: {value: orgPhotoList }};
            return Object.assign({}, state, { orgPhotoList, wxpayFormData });
        }
    },
    //修改步骤
    [PaySetting.UPDATE_WXPAYSTEUP_PENDING]: (state, action) => {
        return Object.assign({}, state, { wxpayInfoSaveLoading: true });
    },
    [PaySetting.UPDATE_WXPAYSTEUP_SUCCESS]: (state, action) => {
        const wxpaySteup = action.payload;
        return Object.assign({}, state, { wxpayInfoSaveLoading: false, wxpaySteup });
    },
    [PaySetting.UPDATE_WXPAYSTEUP_FAILURE]: (state, action) => {
        return Object.assign({}, state, { wxpayInfoSaveLoading: false });
    },
    //tabChange事件
    [PaySetting.PAYSETTING_ONTAB_CHANGE]: (state, action) => {
        return Object.assign({}, state, { defaultActiveKey: action.payload });
    },
    //其他界面的
    [HomePage.SELECT_CURRENT_MERCHANT_SUCCESS]: (state, action) => {
        const currMerchantInfo = action.payload;
        const wxpayFormData = {...state.wxpayFormData, phone: {value: currMerchantInfo.phone}, 
            merchantName: {value: currMerchantInfo.merchantName},
            businessLicenceNo: {value: currMerchantInfo.businessLicenceNo}, servicePhone: {value: currMerchantInfo.phone},
        };
        return Object.assign({}, state, {currentSteup: currMerchantInfo.alipaySteup, 
            wxpaySteup: currMerchantInfo.wxpaySteup, wxpayFormData});
    },
    [HomePage.GET_MERCHANT_YYZZ_IMAGE]: (state, action) => {
        const imageUrl = URL.createObjectURL(action.payload.data);
        const { id, fileName } = action.payload.info;
        const file = { uid: id, name: fileName, status: 'done', url: imageUrl }
        const n_yyzzList = [...state.yyzzList, file];
        const wxpayFormData = {...state.wxpayFormData, yyzzs: {value: n_yyzzList }};
        return Object.assign({}, state, { yyzzList: n_yyzzList, wxpayFormData });
    },
}

export default createReducers(initialState, paySettingHandler);