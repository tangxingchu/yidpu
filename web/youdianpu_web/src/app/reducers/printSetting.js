import createReducers from '../utils/createReducers'
import { PrintSetting } from '../utils/constants'

const initialState = {
    loading: false, //加载数据
    printDataList: [], //打印设置列表
    usbPrints: [],//USB打印机列表
    printData: null, //
    currTab: "1",//当前usb打印机模式(前台小票打印)
    saveLoading: false,//保存loading
    printType1Value: null,//USB打印设置值
    localIp: '',//本机ip
    usbPrinter: {printVid: '', printPid: '', id: ''},//usb打印机
    networkPrinter: {printIp: {value: ''}, printPort: {value: '9100'}, name: {value: ''}, id: {value: ''}},//网络打印机
    networkPrinterList: [],//网络打印机列表
}

const printSettingHandler = {
    //查询打印机设置
    [PrintSetting.LIST_PRINT_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [PrintSetting.LIST_PRINT_SUCCESS]: (state, action) => {
        const printDataList = action.payload;
        const usbPrinterObj = printDataList.find(item => item.printType == "1");
        // const networkPrinterObj = printDataList.find(item => item.printType == "2");
        const networkPrinterList = printDataList.filter(item => item.printType == "2");
        let usbPrinter = {...initialState.usbPrinter};
        let printType1Value = null;
        if(usbPrinterObj) {
            usbPrinter.id = usbPrinterObj.id;
            usbPrinter.printVid = usbPrinterObj.printVid;
            usbPrinter.printPid = usbPrinterObj.printPid;
            printType1Value = `${usbPrinterObj.printVid}_${usbPrinterObj.printPid}`;
        }
        let networkPrinter = {...initialState.networkPrinter};
        // if(networkPrinterObj) {
            // networkPrinter.printIp = networkPrinterObj.printIp;
            // networkPrinter.printPort = networkPrinterObj.printPort;
        // }
        return Object.assign({}, state, {loading: false, printDataList, usbPrinter, networkPrinter, printType1Value, networkPrinterList});
    },
    [PrintSetting.LIST_PRINT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //保存打印机设置
    [PrintSetting.SAVE_PRINT_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true});
    },
    [PrintSetting.SAVE_PRINT_SUCCESS]: (state, action) => {
        const printer = action.payload;
        if(printer.printType == "1") {
            let usbPrinter = {...initialState.usbPrinter};
            let printType1Value = `${printer.printVid}_${printer.printPid}`;
            usbPrinter.id = printer.id;
            usbPrinter.printVid = printer.printVid;
            usbPrinter.printPid = printer.printPid;
            return Object.assign({}, state, {saveLoading: false, usbPrinter, printType1Value});
        } else {
            let networkPrinter = {...initialState.networkPrinter};
            // networkPrinter.printIp = printer.printIp;
            // networkPrinter.printPort = printer.printPort;
            let networkPrinterList = [];
            const findPrinter = state.networkPrinterList.find(item => item.id == printer.id);
            if(findPrinter) {
                networkPrinterList = state.networkPrinterList.map(item => {
                    if(item.id == printer.id) {
                        return {...item, ...printer};
                    }
                    return item;
                })
            } else {
                networkPrinterList = [...state.networkPrinterList, printer];
            }
            return Object.assign({}, state, {saveLoading: false, networkPrinter, networkPrinterList});
        }
    },
    [PrintSetting.SAVE_PRINT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    //tab的change事件
    [PrintSetting.PRINTSETTING_ONTAB_CHANGE]: (state, action) => {
        return Object.assign({}, state, {currTab: action.payload});
    },
    //查询USB打印机
    [PrintSetting.DISPATCH_USB_PRINT]: (state, action) => {
        return Object.assign({}, state, {usbPrints: action.payload});
    },
    //USB打印设备change事件
    [PrintSetting.ON_USBPRINTER_CHANGE]: (state, action) => {
        return Object.assign({}, state, {printType1Value: action.payload});
    },
    //本机ip
    [PrintSetting.PRINTSETTING_LOCAL_IP]: (state, action) => {
        return Object.assign({}, state, {localIp: action.payload});
    },
    [PrintSetting.PRINTSETTING_EDITOR_PRINTER]: (state, action) => {
        const id = action.payload;
        let networkPrinterObj = state.networkPrinterList.find(item => item.id == id);
        let networkPrinter = {printIp: {value: networkPrinterObj.printIp}, printPort: {value: networkPrinterObj.printPort},
             name: {value: networkPrinterObj.name}, id: {value: networkPrinterObj.id}}
        return Object.assign({}, state, {networkPrinter});
    },
    [PrintSetting.PRINTSETTING_FIELD_CHANGE]: (state, action) => {
        const networkPrinter = {...state.networkPrinter, ...action.payload};
        return Object.assign({}, state, { networkPrinter });
    },
    //删除
    [PrintSetting.DELETE_PRINTER_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [PrintSetting.DELETE_PRINTER_SUCCESS]: (state, action) => {
        const networkPrinterList = state.networkPrinterList.filter(item => item.id != action.payload);
        return Object.assign({}, state, { loading: false, networkPrinterList });
    },
    [PrintSetting.DELETE_PRINTER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
}

export default createReducers(initialState, printSettingHandler);