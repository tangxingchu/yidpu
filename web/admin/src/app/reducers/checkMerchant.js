import createReducers from '../utils/createReducers'
import { CheckMerchant } from '../utils/constants'

const initialState = {
    loading: true,
    listData: [], //商家列表
    detailLoading: false,//商家详情loading
    detailData: {merchantName: {value: null}, address: {value: null}, businessLicenceNo: {value: null}, remark: {value: null}, lon: {value: null}, lat: {value: null}},
    merchantUser: null,//商家信息
    checkLoading: false,//审核按钮loading
    auditHisList: [],//审核历史列表
    zzList: [],//资质照片列表

    userHis: {},//商家历史信息
    imageHis: [],//商家店铺历史信息
}

const checkMerchantHandler = {
    [CheckMerchant.SELECT_CHECKMERCHANT_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [CheckMerchant.SELECT_CHECKMERCHANT_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { loading: false, listData: action.payload });
    },
    [CheckMerchant.SELECT_CHECKMERCHANT_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [CheckMerchant.SELECT_MERCHANT_DETAIL_PENDING]: (state, action) => {
        return Object.assign({}, state, { detailLoading: true });
    },
    [CheckMerchant.SELECT_MERCHANT_DETAIL_SUCCESS]: (state, action) => {
        const detailData = {merchantName: {value: action.payload.merchantName}, address: {value: action.payload.address},
            remark: {value: action.payload.remark},
            businessLicenceNo: {value: action.payload.businessLicenceNo}};
        const new_detailData = {...state.detailData, ...detailData};
        return Object.assign({}, state, { detailLoading: false, detailData: new_detailData, merchantUser: action.payload });
    },
    [CheckMerchant.SELECT_MERCHANT_DETAIL_FAILURE]: (state, action) => {
        return Object.assign({}, state, { detailLoading: false });
    },
    [CheckMerchant.GET_LONLAT_SUCCESS]: (state, action) => {
        if(action.payload.status == 0) {
            const lonlat = {lon: {value: action.payload.result.location.lng}, 
                lat: {value: action.payload.result.location.lat}};
            const new_detailData = {...state.detailData, ...lonlat};
            return Object.assign({}, state, {detailData: new_detailData});
        }
    },
    [CheckMerchant.CHECK_MERCHANT_DETAIL_PENDING]: (state, action) => {
        return Object.assign({}, state, { checkLoading: true });
    },
    [CheckMerchant.CHECK_MERCHANT_DETAIL_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { checkLoading: false });
    },
    [CheckMerchant.CHECK_MERCHANT_DETAIL_FAILURE]: (state, action) => {
        return Object.assign({}, state, { checkLoading: false });
    },
    [CheckMerchant.LIST_AUDIT_HIS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { auditHisList: action.payload });
    },
    [CheckMerchant.GET_MERCHANT_YYZZ_IMAGE]: (state, action) => {
        const imageUrl = URL.createObjectURL(action.payload.data);
        const file = { url: imageUrl }
        const n_zzList = [...state.zzList, file];
        return Object.assign({}, state, { zzList: n_zzList });
    },
    [CheckMerchant.LIST_USERCHANGE_HIS_SUCCESS]: (state, action) => {
        const { userChangeHis, imageHises } = action.payload;
        return Object.assign({}, state, { userHis: userChangeHis, imageHis: imageHises });
    },
}

export default createReducers(initialState, checkMerchantHandler);