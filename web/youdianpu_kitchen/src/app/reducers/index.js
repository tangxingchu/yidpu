import { combineReducers } from 'redux'

import login from './login'
import homePage from './homePage';
import monitor from './monitor';

const reducers = combineReducers({
    login,
    homePage,
    monitor,
})

export default reducers;