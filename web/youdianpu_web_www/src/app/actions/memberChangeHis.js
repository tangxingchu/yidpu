import { MemberChangeHis } from '../utils/constants'
import requestapi from '../common/requestapi';


const listChangeHis = (searchParams, isMore) => {
    return (dispatch, getState) => {
        dispatch({type: MemberChangeHis.LIST_CHANGEHIS_PENDING});
        return requestapi({uri: `/api/member/listChangeHis`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: MemberChangeHis.LIST_CHANGEHIS_SUCCESS, payload: {data, isMore}});
        }).catch(err => {
            dispatch({type: MemberChangeHis.LIST_CHANGEHIS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const onChangeHisPhoneChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberChangeHis.MEMBERCHANGEHIS_PHONE_CHANGE, payload: value})
        );
    }
}

const handleSearch = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberChangeHis.MEMBERCHANGEHIS_HANDLE_SEARCH, payload: value})
        );
    }
}

export default {
    listChangeHis,
    onChangeHisPhoneChange,
    handleSearch,
}