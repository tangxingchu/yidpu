import { combineReducers } from 'redux'

import login from './login'
import homePage from './homePage'
import goodsCategory from './goodsCategory'
import screen from './screen'
import floorPlan from './floorPlan';
import defaultPage from './defaultPage';
import hisOrder from './hisOrder';

const reducers = combineReducers({
    login,
    homePage,
    goodsCategory,
    screen,
    floorPlan,
    defaultPage,
    hisOrder,
})

export default reducers;