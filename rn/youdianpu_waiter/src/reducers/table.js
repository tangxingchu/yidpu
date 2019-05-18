import createReducers from '../utils/createReducers'
import { Table } from '../utils/constants'

const initialState = {
    floorList: [],
    tableList: [],
}

const tableHandler = {
    //查询桌台列表以及状态
    [Table.DISPATCH_FLOORS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { floorList: action.payload });
    },
    [Table.DISPATCH_TABLES_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { tableList: action.payload });
    },
    //socket其他客户端修改桌台状态
    [Table.DISPATCH_TABLESTATUS_SUCCESS]: (state, action) => {
        const { tableCode, status } = action.payload;
        const new_tableList = state.tableList.map(item => {
            if(item.table_code == tableCode) {
                item.status = status;
            }
            return item;
        });
        return Object.assign({}, state, { tableList: new_tableList });
    }
}

export default createReducers(initialState, tableHandler);
