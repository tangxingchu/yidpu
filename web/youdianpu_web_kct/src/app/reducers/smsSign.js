import createReducers from '../utils/createReducers'
import { SMSSign } from '../utils/constants'

const initialState = {
    loading: false,
    formData: {signName: {value: null}, sqh: {value: null}, signStatus: {value: null}},
    sqhList: [],//委托授权函照片
    saveLoading: false,
}

const smsSignHandler = {
    [SMSSign.SIGNFORM_FIELD_CHANGE]: (state, action) => {
        const formData = {...state.formData, ...action.payload};
        return Object.assign({}, state, { formData });
    },
    [SMSSign.SIGNFORM_IMAGE_CHANGE]: (state, action) => {
        return Object.assign({}, state, { sqhList: action.payload });
    },
    [SMSSign.SIGNFORM_REMOVE_IMAGE]: (state, action) => {
        const formData = { ...state.formData, signStatus: {value: null} };
        return Object.assign({}, state, { formData, sqhList: [] });  
    },
    //查询短信签名配置
    [SMSSign.SELECT_SMSSIGN_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [SMSSign.SELECT_SMSSIGN_SUCCESS]: (state, action) => {
        const data = action.payload;
        const formData = {signName: {value: data.signName}, sqh: {value: null}, signStatus: {value: data.signStatus}};
        return Object.assign({}, state, { loading: false, formData });
    },
    [SMSSign.SELECT_SMSSIGN_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    //保存短信签名
    [SMSSign.SAVE_SMSSIGN_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [SMSSign.SAVE_SMSSIGN_SUCCESS]: (state, action) => {
        const formData = {...state.formData, signStatus: {value: 1}};
        return Object.assign({}, state, { saveLoading: false, formData });
    },
    [SMSSign.SAVE_SMSSIGN_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    //获取授权函图片
    [SMSSign.GET_SMSSIGN_SQH_IMAGE]: (state, action) => {
        const imageUrl = URL.createObjectURL(action.payload.data);
        const file = { uid: "id", name: "fileName", status: 'done', url: imageUrl }
        const n_sqhList = [file];
        const formData = {...state.formData, sqh: {value: n_sqhList }};
        return Object.assign({}, state, { sqhList: n_sqhList, formData });
    },
}

export default createReducers(initialState, smsSignHandler);