import { combineReducers } from 'redux'

import login from './login'
import homePage from './homePage';
import queue from './queue';

const reducers = combineReducers({
    login,
    homePage,
    queue,
})

export default reducers;