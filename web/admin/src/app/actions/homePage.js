import { HomePage } from '../utils/constants';

const changeCollapsed = (isCollapsed) => {
    return (dispatch, getState) => {
        return Promise.resolve(dispatch({
            type: HomePage.CHANGE_COLLAPSED,
            payload: isCollapsed,
        }));
    }
}

export default {
    changeCollapsed,
}