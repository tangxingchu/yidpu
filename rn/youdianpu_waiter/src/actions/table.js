import { Table } from '../utils/constants';
import requestapi from '../common/requestapi';

const dispatch_tables = (tableList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Table.DISPATCH_TABLES_SUCCESS, payload: tableList})
        );
    }
}

const dispatch_floors = (floors) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Table.DISPATCH_FLOORS_SUCCESS, payload: floors})
        );
    }
}

const dispatch_tableStatus = (tableCode, status) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({ type: Table.DISPATCH_TABLESTATUS_SUCCESS, payload: {tableCode, status}})
        );
    }
}

export default {
    dispatch_tables,
    dispatch_floors,
    dispatch_tableStatus,
}