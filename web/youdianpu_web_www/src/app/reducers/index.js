import { combineReducers } from 'redux'

import login from './login'
import homePage from './homePage';
import todayOverview from './todayOverview';
import report from './report';
import ruleAnalysis from './ruleAnalysis';
import memberAnalysis from './memberAnalysis';
import reconciliation from './reconciliation';

const reducers = combineReducers({
    login,
    homePage,
    todayOverview,
    report,
    ruleAnalysis,
    memberAnalysis,
    reconciliation,
})

export default reducers;