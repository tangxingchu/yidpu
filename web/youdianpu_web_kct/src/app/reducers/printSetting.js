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
    usbPrinter: {printVid: '', printPid: ''},//usb打印机
    networkPrinter: {printIp: '', printPort: '9100'},//网络打印机
}

const printSettingHandler = {
    //查询打印机设置
    [PrintSetting.LIST_PRINT_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [PrintSetting.LIST_PRINT_SUCCESS]: (state, action) => {
        const printDataList = action.payload;
        const usbPrinterObj = printDataList.find(item => item.printType == "1");
        const networkPrinterObj = printDataList.find(item => item.printType == "2");
        let usbPrinter = {...initialState.usbPrinter};
        let printType1Value = null;
        if(usbPrinterObj) {
            usbPrinter.printVid = usbPrinterObj.printVid;
            usbPrinter.printPid = usbPrinterObj.printPid;
            printType1Value = `${usbPrinterObj.printVid}_${usbPrinterObj.printPid}`;
        }
        let networkPrinter = {...initialState.networkPrinter};
        if(networkPrinterObj) {
            networkPrinter.printIp = networkPrinterObj.printIp;
            networkPrinter.printPort = networkPrinterObj.printPort;
        }
        return Object.assign({}, state, {loading: false, printDataList, usbPrinter, networkPrinter, printType1Value});
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
            usbPrinter.printVid = printer.printVid;
            usbPrinter.printPid = printer.printPid;
            return Object.assign({}, state, {saveLoading: false, usbPrinter, printType1Value});
        } else {
            let networkPrinter = {...initialState.networkPrinter};
            networkPrinter.printIp = printer.printIp;
            networkPrinter.printPort = printer.printPort;
            return Object.assign({}, state, {saveLoading: false, networkPrinter});
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
}

export default createReducers(initialState, printSettingHandler);