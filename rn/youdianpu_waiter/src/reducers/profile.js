import createReducers from '../utils/createReducers'
import { Profile } from '../utils/constants'

const initialState = {
    loading: false,
    versionName: "",
    lastVersionName: "",
}

const profileHandler = {
    [Profile.SELECT_LASTVERSION_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [Profile.SELECT_LASTVERSION_SUCCESS]: (state, action) => {
        const { currVersion } = action.payload;
        return Object.assign({}, state, {
            loading: false,
            lastVersionName: currVersion,
        });
    },
    [Profile.SELECT_LASTVERSION_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false, });
    },
    [Profile.DISPATCH_VERSIONNAME_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { versionName: action.payload, });
    },
}

export default createReducers(initialState, profileHandler);
