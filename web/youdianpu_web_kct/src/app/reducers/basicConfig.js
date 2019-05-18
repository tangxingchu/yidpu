import createReducers from '../utils/createReducers'
import { BasicConfig } from '../utils/constants'

const initialState  = {
    loading: false,
    businessConfigList: [],
}

const basicConfigHandler = {
    [BasicConfig.LIST_BUSINESS_CONFIG_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true}); 
    },
    [BasicConfig.LIST_BUSINESS_CONFIG_SUCCESS]: (state, action) => {
        const businessConfigList = action.payload;
        return Object.assign({}, state, {loading: false, businessConfigList}); 
    },
    [BasicConfig.LIST_BUSINESS_CONFIG_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false}); 
    },
}

export default createReducers(initialState, basicConfigHandler);