import { combineReducers } from 'redux'

import homePage from './homePage'
import screen from './screen'
import floorPlan from './floorPlan';
import defaultPage from './defaultPage';
import hisOrder from './hisOrder';
import goodsCategory from './goodsCategory';

const reducers = combineReducers({
    homePage,
    screen,
    floorPlan,
    defaultPage,
    hisOrder,
    goodsCategory,
})

export default reducers;