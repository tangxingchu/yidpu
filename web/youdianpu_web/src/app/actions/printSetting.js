import { PrintSetting } from '../utils/constants';
import requestapi from '../common/requestapi';

const list = () => {
    return (dispatch, getState) => {
        dispatch({type: PrintSetting.LIST_PRINT_PENDING});
        return requestapi({uri: `/api/print/list`}).then((data) => {
            dispatch({type: PrintSetting.LIST_PRINT_SUCCESS, payload: data});
        }).catch(err => {
            dispatch({type: PrintSetting.LIST_PRINT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const save = (printSetting) => {
    return (dispatch, getState) => {
        dispatch({type: PrintSetting.SAVE_PRINT_PENDING});
        return requestapi({uri: `/api/print/save`, fetchParams: {body: printSetting}}).then((data) => {
            dispatch({type: PrintSetting.SAVE_PRINT_SUCCESS, payload: {...printSetting, id: data.result}});
            return {...printSetting, id: data.result};
        }).catch(err => {
            dispatch({type: PrintSetting.SAVE_PRINT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

const update = (printSetting) => {
    return (dispatch, getState) => {
        dispatch({type: PrintSetting.SAVE_PRINT_PENDING});
        return requestapi({uri: `/api/print/update`,  fetchParams: {body: printSetting}}).then((data) => {
            dispatch({type: PrintSetting.SAVE_PRINT_SUCCESS, payload: printSetting});
        }).catch(err => {
            dispatch({type: PrintSetting.SAVE_PRINT_FAILURE, payload: err.message});
            throw err;
        });
    }
}

//tabchange事件
const onTabChange = (activeKey) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PrintSetting.PRINTSETTING_ONTAB_CHANGE, payload: activeKey})
        );
    }
}

const dispatchUsbPrint = (usbPrints) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PrintSetting.DISPATCH_USB_PRINT, payload: usbPrints})
        );
    }
}

const onUSBPrinterChange = (value) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PrintSetting.ON_USBPRINTER_CHANGE, payload: value})
        );
    }
}

const dispatchLocalIp = (ip) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PrintSetting.PRINTSETTING_LOCAL_IP, payload: ip})
        );
    }
}

const editorPrinter = (id) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PrintSetting.PRINTSETTING_EDITOR_PRINTER, payload: id})
        );
    }
}

const fieldChangeValue = (values) => {
    return (dispatch, getState) => {
        return Promise.resolve(
            dispatch({type: PrintSetting.PRINTSETTING_FIELD_CHANGE, payload: values})
        );
    }
}

//删除
const deletePrinter = (id) => {
    return (dispatch, getState) => {
        dispatch({type: PrintSetting.DELETE_PRINTER_PENDING});
        return requestapi({uri: `/api/print/delete`, fetchParams: {
            method : 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : `id=${id}`,
        }}).then((data) => {
            dispatch({type: PrintSetting.DELETE_PRINTER_SUCCESS, payload: id});
        }).catch(err => {
            dispatch({type: PrintSetting.DELETE_PRINTER_FAILURE, payload: err.message});
            throw err;
        });
    }
}

export default {
    list,
    save,
    update,
    onTabChange,
    dispatchUsbPrint,
    onUSBPrinterChange,
    dispatchLocalIp,
    editorPrinter,
    fieldChangeValue,
    deletePrinter,
}