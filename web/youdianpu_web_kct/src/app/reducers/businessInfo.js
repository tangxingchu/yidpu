import createReducers from '../utils/createReducers'
import { BusinessInfo } from '../utils/constants'

const initialState  = {
    loading: false,
    saveLoading: false,
    businessInfoData: {},
}

const businessInfoHandler = {
    [BusinessInfo.SAVE_BUSINESSINFO_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true}); 
    },
    [BusinessInfo.SAVE_BUSINESSINFO_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false}); 
    },
    [BusinessInfo.SAVE_BUSINESSINFO_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false}); 
    },
    [BusinessInfo.SELECT_BUSINESSINFO_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [BusinessInfo.SELECT_BUSINESSINFO_SUCCESS]: (state, action) => {
        const businessInfoData = action.payload;
        return Object.assign({}, state, {loading: false, businessInfoData}); 
    },
    [BusinessInfo.SELECT_BUSINESSINFO_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
}

export default createReducers(initialState, businessInfoHandler);