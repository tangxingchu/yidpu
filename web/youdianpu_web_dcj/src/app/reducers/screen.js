import createReducers from '../utils/createReducers'
import { Screen } from '../utils/constants'

const initialState  = {
    loading: true,
    screenList: [],
    saveLoading: false,
    syncLoading: false,
    screenData: {id: {value: ""}, floorName: {value: ""}, sortNo: {value: "1"}, floorDesc: {value: ""}},
}

const screenHandler = {
    [Screen.QUERY_SCREEN_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [Screen.QUERY_SCREEN_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {loading: false, screenList: action.payload});
    },
    [Screen.QUERY_SCREEN_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [Screen.SAVE_SCREEN_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true});
    },
    [Screen.SAVE_SCREEN_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    [Screen.SAVE_SCREEN_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    [Screen.UPDATE_SCREEN_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true});
    },
    [Screen.UPDATE_SCREEN_SUCCESS]: (state, action) => {
        const screenList = state.screenList.map(item => {
            if(item.id === action.payload.id) {
                return {...item, ...action.payload};
            } else {
                return item;
            }
        });
        return Object.assign({}, state, {saveLoading: false, screenList});
    },
    [Screen.UPDATE_SCREEN_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    [Screen.DELETE_SCREEN_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [Screen.DELETE_SCREEN_SUCCESS]: (state, action) => {
        const screenList = state.screenList.filter(item => {
            return item.id !== action.payload.id;
        });
        return Object.assign({}, state, {loading: false, screenList});
    },
    [Screen.DELETE_SCREEN_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    [Screen.CREATE_SCREEN_FIELD_CHANGE]: (state, action) => {
        const screenData = {...state.screenData, ...action.payload};
        return Object.assign({}, state, { screenData });
    },
    [Screen.CREATE_SCREEN_FIELD_RESET]: (state, action) => {
        const screenData = {id: {value: ""}, floorName: {value: ""}, sortNo: {value: ""}, floorDesc: {value: ""}};
        return Object.assign({}, state, {screenData});
    },
    [Screen.SELECT_SCREEN_SUCCESS]: (state, action) => {
        const { id, floorName, sortNo, floorDesc } = action.payload;
        const screenData = {
            id: {value: id}, floorName: {value: floorName}, sortNo: {value: sortNo}, floorDesc: {value: floorDesc},
        };
        return Object.assign({}, state, {screenData});
    },
    [Screen.SYNC_SCREEN_PENDING]: (state, action) => {
        return Object.assign({}, state, { syncLoading: true });
    },
    [Screen.SYNC_SCREEN_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { syncLoading: false });
    },
}

export default createReducers(initialState, screenHandler);