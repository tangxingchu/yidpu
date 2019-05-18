import createReducers from '../utils/createReducers'
import { HomePage } from '../utils/constants'

const initialState  = {
    collapsed: false,
}

const homePageHandler = {
    [HomePage.CHANGE_COLLAPSED]: (state, action) => {
        return Object.assign({}, state, {
            collapsed: action.payload
        });
    },
}

export default createReducers(initialState, homePageHandler);