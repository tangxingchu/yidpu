import { MemberRecord } from '../utils/constants'
import requestapi from '../common/requestapi';

//加载当前用餐订单列表
const list = (searchParams) => {
    return (dispatch, getState) => {
        dispatch({type: MemberRecord.LIST_MEMBERRECORD_PENDING});
        return requestapi({uri: `/api/memberRecord/list`, fetchParams: {body: searchParams}}).then((data) => {
            dispatch({type: MemberRecord.LIST_MEMBERRECORD_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: MemberRecord.LIST_MEMBERRECORD_FAILURE, payload: err.message});
            throw err;
        });
    }
}
//查询表单change事件
const onSearchFromFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRecord.MEMBERRECORD_SEARCHFORM_CHANGE, payload: values})
        );
    }
}

//重置查询表单
const resetSearchFormFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRecord.MEMBERRECORD_SEARCHFORM_RESET})
        );
    }
}

//处理查询条件
const handleSearch = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: MemberRecord.MEMBERRECORD_HANDLE_SEARCH, payload: values})
        );
    }
}

export default {
    list,
    onSearchFromFieldChangeValue,
    resetSearchFormFields,
    handleSearch,
}