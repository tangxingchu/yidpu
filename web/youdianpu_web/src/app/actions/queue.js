import { Queue, Table } from '../utils/constants';
import requestapi from '../common/requestapi';

const listQueue = (queue) => {
    return (dispatch, getState) => {
        dispatch({type: Queue.QUERY_QUEUE_PENDING});
        return requestapi({uri: `/api/queue/list`, fetchParams: {body: queue}}).then((data) => {
            dispatch({type: Queue.QUERY_QUEUE_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: Queue.QUERY_QUEUE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const saveQueue = (queue) => {
    return (dispatch, getState) => {
        dispatch({type: Queue.SAVE_QUEUE_PENDING});
        return requestapi({uri: `/api/queue/save`, fetchParams: {body: queue}}).then((data) => {
            queue.id = data.result;
            queue.tables = [];
            dispatch({type: Queue.SAVE_QUEUE_SUCCESS, payload: queue});
        }).catch(err => {
            dispatch({type: Queue.SAVE_QUEUE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const updateQueue = (queue) => {
    return (dispatch, getState) => {
        dispatch({type: Queue.UPDATE_QUEUE_PENDING});
        return requestapi({uri: `/api/queue/update`, fetchParams: {body: queue}}).then((data) => {
            dispatch({type: Queue.UPDATE_QUEUE_SUCCESS, payload: queue});
        }).catch(err => {
            dispatch({type: Queue.UPDATE_QUEUE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectQueueById = (id) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/queue/get/${id}`, fetchParams: {method: 'get'}, pending: true}).then((data) => {
            dispatch({type: Queue.SELECT_QUEUE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Queue.SELECT_QUEUE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteQueue = (queue) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/queue/delete`, fetchParams: {body: queue}, pending: true}).then((data) => {
            dispatch({type: Queue.DELETE_QUEUE_SUCCESS, payload: queue});
        }).catch(err => {
            dispatch({type: Queue.DELETE_QUEUE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Queue.CREATE_QUEUE_FIELD_CHANGE, payload: values})
        );
    }
}

const elementFieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Queue.CREATE_QUEUE_ELEMENT_FIELD_CHANGE, payload: values})
        );
    }
}

const resetFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Queue.CREATE_QUEUE_FIELD_RESET})
        );
    }
}

const resetElementFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Queue.CREATE_QUEUE_ELEMENT_FIELD_RESET})
        );
    } 
}

const initElementFields = (element) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Queue.INIT_QUEUE_ELEMENT_FIELD, payload: element})
        );
    } 
}

const listTable = (table) => {
    return (dispatch, getState) => {
        dispatch({type: Table.QUERY_TABLE_PENDING});
        return requestapi({uri: `/api/table/list`, fetchParams: {body: table}}).then((data) => {
            dispatch({type: Table.QUERY_TABLE_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: Table.QUERY_TABLE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const tableDragDrop = (queueTable) => {
    return (dispatch, getState) => {
        dispatch({type: Queue.QUERY_QUEUE_PENDING});
        return requestapi({uri: `/api/queueTable/save`, fetchParams: {body: queueTable}}).then((data) => {
            dispatch({type: Queue.QUEUE_TABLE_GRAG_GRDOP, payload: queueTable})
        }).catch(err => {
            dispatch({type: Queue.QUERY_QUEUE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectQueueElement = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Queue.SELECT_QUEUE_ELEMENT_SUCCESS, payload: data})
        );
    }
}

const saveQueueElement = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Queue.SAVE_QUEUEELEMENT_SUCCESS, payload: data})
        );
    }
}

//拖动修改
const updateQueueElement2 = (data) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Queue.UPDATE_QUEUEELEMENT_SUCCESS_2, payload: data})
        );
    }
}


export default {
    listQueue,
    saveQueue,
    updateQueue,
    selectQueueById,
    deleteQueue,
    fieldChangeValue,
    elementFieldChangeValue,
    resetFields,
    resetElementFields,
    listTable,
    initElementFields,
    tableDragDrop,
    selectQueueElement,
    saveQueueElement,
    updateQueueElement2,
}