import { combineReducers } from 'redux'

import login from './login'
import homePage from './homePage'
import goodsCategory from './goodsCategory'
import dictionary from './dictionary'
import menuFunc from './menuFunc'
import checkMerchant from './checkMerchant';

const reducers = combineReducers({
    login,
    homePage,
    goodsCategory,
    dictionary,
    menuFunc,
    checkMerchant,
})

export default reducers;