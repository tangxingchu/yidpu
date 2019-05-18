import createReducers from '../utils/createReducers'
import { Queue, BasicConfig } from '../utils/constants'
import _ from 'lodash';

const initialState = {
    queueLoading: false,
    queueList: [],
    tableList: [],
    tableStatus: {},
    saveLoading: false,
    queueData: { id: { value: "" }, queueName: { value: "" }, queueCode: { value: "" }, description: { value: "" } },
    queueElementData: { queueId: { value: "" }, queueSequence: { value: "" }, queueNumber: { value: "" }, personNumber: { value: "" } },
    selectQueueLoading: false,
}

const queueHandler = {
    [Queue.QUERY_QUEUE_PENDING]: (state, action) => {
        return Object.assign({}, state, { queueLoading: true });
    },
    [Queue.QUERY_QUEUE_SUCCESS]: (state, action) => {
        const { queues, tables } = action.payload;
        return Object.assign({}, state, { queueLoading: false, queueList: queues, tableList: tables });
    },
    [Queue.QUERY_QUEUE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { queueLoading: false });
    },
    [Queue.SAVE_QUEUE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [Queue.SAVE_QUEUE_SUCCESS]: (state, action) => {
        const queueList = [...state.queueList, action.payload];
        return Object.assign({}, state, { queueList, saveLoading: false });
    },
    [Queue.SAVE_QUEUE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [Queue.UPDATE_QUEUE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [Queue.UPDATE_QUEUE_SUCCESS]: (state, action) => {
        const queueList = state.queueList.map(item => {
            if (item.id === action.payload.id) {
                return { ...item, ...action.payload };
            } else {
                return item;
            }
        });
        return Object.assign({}, state, { queueList, saveLoading: false });
    },
    [Queue.UPDATE_QUEUE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [Queue.DELETE_QUEUE_SUCCESS]: (state, action) => {
        const queueList = state.queueList.filter(item => {
            return item.id !== action.payload.id;
        });
        return Object.assign({}, state, { queueList });
    },
    [Queue.SELECT_QUEUE_PENDING]: (state, action) => {
        return Object.assign({}, state, { selectQueueLoading: true });
    },
    [Queue.SELECT_QUEUE_SUCCESS]: (state, action) => {
        const { id, queueName, queueCode, description } = action.payload;
        const queueData = {
            id: { value: id }, queueName: { value: queueName }, queueCode: { value: queueCode }, description: { value: description },
        };
        return Object.assign({}, state, { selectQueueLoading: false, queueData });
    },
    [Queue.SELECT_QUEUE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { selectQueueLoading: false });
    },
    [Queue.CREATE_QUEUE_FIELD_CHANGE]: (state, action) => {
        const queueData = { ...state.queueData, ...action.payload };
        return Object.assign({}, state, { queueData });
    },
    [Queue.CREATE_QUEUE_ELEMENT_FIELD_CHANGE]: (state, action) => {
        const queueElementData = { ...state.queueElementData, ...action.payload };
        return Object.assign({}, state, { queueElementData });
    },
    [Queue.CREATE_QUEUE_FIELD_RESET]: (state, action) => {
        const queueData = { id: { value: "" }, queueName: { value: "" }, queueCode: { value: "" }, description: { value: "" } };
        return Object.assign({}, state, { queueData });
    },
    [Queue.CREATE_QUEUE_ELEMENT_FIELD_RESET]: (state, action) => {
        const queueElementData = { queueId: { value: "" }, queueSequence: { value: "" }, queueNumber: { value: "" }, personNumber: { value: "" } };
        return Object.assign({}, state, { queueElementData });
    },
    [Queue.INIT_QUEUE_ELEMENT_FIELD]: (state, action) => {
        const { queueId, queueSequence, queueNumber } = action.payload;
        const queueElementData = { queueId: { value: queueId }, queueSequence: { value: queueSequence }, queueNumber: { value: queueNumber } };
        const new_queueElementData = { ...state.queueElementData, ...queueElementData };
        return Object.assign({}, state, { queueElementData: new_queueElementData });
    },
    [Queue.QUEUE_TABLE_GRAG_GRDOP]: (state, action) => {
        const { tableId, queueId, oldQueueId } = action.payload;
        if (queueId !== 0 && oldQueueId !== 0) {//桌台从一个排队到另一个排队
            let dragTable = null;
            //先从一个排队中把桌台拿出来
            const queueList = state.queueList.map(queue => {
                if (queue.id === oldQueueId) {
                    dragTable = queue.tables.find(table => table.id === tableId);
                    const tables = queue.tables.filter(table => table.id !== tableId);
                    queue.tables = tables;
                }
                return queue;
            });
            //在把桌台放到新的排队中
            const new_queueList = queueList.map(queue => {
                if (queue.id === queueId) {
                    const tables = [dragTable, ...queue.tables];
                    queue.tables = tables;
                }
                return queue;
            });
            return Object.assign({}, state, { queueLoading: false, queueList: new_queueList });
        } else {
            if (oldQueueId === 0) {//桌台从未入排队到排队
                const tableList = state.tableList.filter(table => table.id !== tableId);//先从未入排队移除
                const table = state.tableList.find(table => table.id === tableId);
                //在把桌台放到新的排队中
                const queueList = state.queueList.map(queue => {
                    if (queue.id === queueId) {
                        const tables = [table, ...queue.tables];
                        queue.tables = tables;
                        return queue;
                    }
                    return queue;
                });
                return Object.assign({}, state, { queueLoading: false, tableList, queueList });
            } else if (queueId === 0) { //桌台从排队到不排队
                let dragTable = null;
                //先从排队中移除
                const queueList = state.queueList.map(queue => {
                    if (queue.id === oldQueueId) {
                        dragTable = queue.tables.find(table => table.id === tableId);
                        const tables = queue.tables.filter(table => table.id !== tableId);
                        queue.tables = tables;
                    }
                    return queue;
                });
                //在把桌台放到未入排队
                const tableList = [dragTable, ...state.tableList];
                return Object.assign({}, state, { queueLoading: false, queueList, tableList });
            }
        }
    },
    [Queue.SELECT_QUEUE_ELEMENT_SUCCESS]: (state, action) => {
        const queueElements = action.payload;
        const new_queueList = [...state.queueList];
        queueElements.forEach(queueElement => {
            let queue = new_queueList.find(queue => queue.id === queueElement.queueId);
            if (queue) {
                if (!queue.queueElements) {
                    queue.queueElements = [];
                }
                queue.queueElements.push(queueElement);
            }
        });
        return Object.assign({}, state, { queueList: new_queueList });
    },
    [Queue.SAVE_QUEUEELEMENT_SUCCESS]: (state, action) => {
        const queueList = state.queueList.map(queue => {
            if (queue.id === action.payload.queueId) {
                let queueElements = queue.queueElements || [];
                queueElements.push(action.payload);
                queue.queueElements = queueElements;
            }
            return queue;
        })
        return Object.assign({}, state, { queueList });
    },
    [Queue.UPDATE_QUEUEELEMENT_SUCCESS_2]: (state, action) => {
        const { id, queueId, oldQueueId, index } = action.payload;
        let element = null;
        //先在旧的队列中找到要移除的元素
        const queueList = state.queueList.map(queue => {
            if (queue.id === oldQueueId) {
                element = queue.queueElements.find(element => element.id === id);
                const queueElements = queue.queueElements.filter(element => element.id !== id);
                queue.queueElements = queueElements;
            }
            return queue;
        });
        //在添加到制定位置
        const new_queueList = queueList.map(queue => {
            if (queue.id === queueId) {
                if (!queue.queueElements) queue.queueElements = [];
                queue.queueElements.splice(index, 0, element);
            }
            return queue;
        });
        return Object.assign({}, state, { queueList: new_queueList });
    },
    [Queue.UPDATE_TABLE_STATUS_SUCCESS]: (state, action) => {
        let tableStatus = { ...state.tableStatus };
        if(_.isArray(action.payload)) {
            action.payload.map(item => {
                tableStatus[item.tableCode] = item.status;
            });
        } else {
            const { tableCode, status } = action.payload;
            tableStatus[tableCode] = status;
        }
        
        return Object.assign({}, state, { tableStatus });
    },
    [Queue.DELETE_QUEUE_ELEMENT_SUCCESS]: (state, action) => {
        const {id, queueId} = action.payload;
        //先在旧的队列中找到要移除的元素
        const queueList = state.queueList.map(queue => {
            if (queue.id === queueId) {
                const queueElements = queue.queueElements.filter(element => element.id !== id);
                queue.queueElements = queueElements;
            }
            return queue;
        });
        return Object.assign({}, state, { queueList });
    },
}

export default createReducers(initialState, queueHandler);