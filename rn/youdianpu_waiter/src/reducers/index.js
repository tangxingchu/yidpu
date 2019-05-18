import { combineReducers } from 'redux'

import login from './login'
import home from './home'
import table from './table'
import placeOrder from './placeOrder'
import order from './order';
import profile from './profile';

const reducers = combineReducers({
    login,
    home,
    table,
    placeOrder,
    order,
    profile,
});

export default reducers;