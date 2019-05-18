import createReducers from '../utils/createReducers'
import { HomePage } from '../utils/constants'

const initialState  = {
    menuData: [],
}

const homePageHandler = {
    [HomePage.SELECT_MENU_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {menuData: action.payload});
    },
}

export default createReducers(initialState, homePageHandler);