import { Employee } from '../utils/constants';
import requestapi from '../common/requestapi';
import employee from '../reducers/employee';

const list = (employee) => {
    return (dispatch, getState) => {
        dispatch({type: Employee.QUERY_EMPLOYEE_PENDING});
        return requestapi({uri: `/api/employee/list`, fetchParams: {body: employee}}).then((data) => {
            dispatch({type: Employee.QUERY_EMPLOYEE_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: Employee.QUERY_EMPLOYEE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const save = (employee) => {
    return (dispatch, getState) => {
        dispatch({type: Employee.ADD_EMPLOYEE_PENDING});
        return requestapi({uri: `/api/employee/save`, fetchParams: {headers: {}, body: employee}}).then((data) => {
            dispatch({type: Employee.ADD_EMPLOYEE_SUCCESS, payload: employee});
        }).catch(err => {
            dispatch({type: Employee.ADD_EMPLOYEE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const update = (employee) => {
    return (dispatch, getState) => {
        dispatch({type: Employee.ADD_EMPLOYEE_PENDING});
        return requestapi({uri: `/api/employee/update`, fetchParams: {headers: {}, body: employee}}).then((data) => {
            dispatch({type: Employee.ADD_EMPLOYEE_SUCCESS, payload: employee});
        }).catch(err => {
            dispatch({type: Employee.ADD_EMPLOYEE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const selectById = (id) => {
    return (dispatch, getState) => {
        dispatch({type: Employee.SELECT_EMPLOYEE_DETAILS_PENDING});
        return requestapi({uri: `/api/employee/get/${id}`, fetchParams: {method: 'get'}, pending: true}).then((data) => {
            dispatch({type: Employee.SELECT_EMPLOYEE_DETAILS_SUCCESS, payload: data});
            return data;
        }).catch(err => {
            dispatch({type: Employee.SELECT_EMPLOYEE_DETAILS_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const deleteEmployee = (employee) => {
    return (dispatch, getState) => {
        dispatch({type: Employee.DELETE_EMPLOYEE_PENDING});
        return requestapi({uri: `/api/employee/delete`, fetchParams: {body: employee}}).then((data) => {
            dispatch({type: Employee.DELETE_EMPLOYEE_SUCCESS, payload: employee});
        }).catch(err => {
            dispatch({type: Employee.DELETE_EMPLOYEE_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Employee.CREATE_EMPLOYEE_FIELD_CHANGE, payload: values})
        );
    }
}

const resetFields = () => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Employee.CREATE_EMPLOYEE_FIELD_RESET})
        );
    }
}

const fileOnChange = (fileList) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Employee.EMPLOYEE_FILE_ONCHANGE, payload: fileList})
        );
    }
}

const photoOnChange = (photoImageUrl) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: Employee.EMPLOYEE_PHOTO_ONCHANGE, payload: photoImageUrl})
        );
    }
}

const importExcel = (formData) => {
    return (dispatch, getState) => {
        dispatch({type: Employee.IMPORT_EMPLOYEE_PENDING});
        return requestapi({uri: `/api/employee/import`, fetchParams: {headers: {}, body: formData}}).then((data) => {
            dispatch({type: Employee.IMPORT_EMPLOYEE_SUCCESS, payload: data});
            return data.result;
        }).catch(err => {
            dispatch({type: Employee.IMPORT_EMPLOYEE_FAILURE, payload: err.message});
            throw err;
        });
    }    
}

const queryDict = (dictCodes) => {
    return (dispatch, getState) => {
        return requestapi({uri: "/api/common/dict/listItems", fetchParams: {body: dictCodes}, pending: true}).then((data) => {
            dispatch({type: Employee.LIST_EMPLOYEE_DICTITEMS_SUCCESS, payload: data});
        }).catch(err => {
            throw err;
        });
    }
}

const getPhotoImageBlob = (imagePath) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/employee/image/preview${imagePath}`, fetchParams: {method: "get"}, respType: 'blob'}).then((data) => {
            dispatch({type: Employee.GET_EMPLOYEE_PHOTO_IMAGE, payload: data});
        }).catch(err => {
            throw err;
        });
    }
}

const getQualificationImageBlob = (info) => {
    return (dispatch, getState) => {
        return requestapi({uri: `/api/employee/image/preview${info.filePath}`, fetchParams: {method: "get"}, respType: 'blob'}).then((data) => {
            dispatch({type: Employee.GET_EMPLOYEE_QUALIFICATION_IMAGE, payload: {data, info}});
        }).catch(err => {
            throw err;
        });
    }
}

export default {
    list,
    save,
    update,
    selectById,
    deleteEmployee,
    fieldChangeValue,
    resetFields,
    fileOnChange,
    photoOnChange,
    importExcel,
    queryDict,
    getPhotoImageBlob,
    getQualificationImageBlob,
}