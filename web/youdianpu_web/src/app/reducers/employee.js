import createReducers from '../utils/createReducers'
import { Employee } from '../utils/constants'
import Config from '../common/config';

const initialState = {
    loading: true,
    employeeList: [],
    saveLoading: false,
    employeeData: {
        id: { value: "" }, fullName: { value: "" }, mobileTelephone: { value: "" }, position: { value: [] }, identityCard: { value: "" }, email: { value: "" },
        birthday: { value: null }, education: { value: "" }, sex: { value: "1" }, maritalStatus: { value: "1" }, joinedDate: { value: null }, wokeDate: { value: null },
        contractDate: { value: null }, address: { value: "" }, employeeNo: { value: "" }
    },
    byIdLoading: false,
    fileList: [],
    zizhiDisabled: false,
    photoImageUrl: null,
    importLoading: false,
    dictItemMap: null,
}

const employeeHandler = {
    [Employee.QUERY_EMPLOYEE_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [Employee.QUERY_EMPLOYEE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { loading: false, employeeList: action.payload });
    },
    [Employee.QUERY_EMPLOYEE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [Employee.ADD_EMPLOYEE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [Employee.ADD_EMPLOYEE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [Employee.ADD_EMPLOYEE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [Employee.UPDATE_EMPLOYEE_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [Employee.UPDATE_EMPLOYEE_SUCCESS]: (state, action) => {
        //返回的是FormData对象
        /*
        const employeeList = state.employeeList.map(item => {
            if(item.id === action.payload.id) {
                return {...item, ...action.payload};
            } else {
                return item;
            }
        });*/
        return Object.assign({}, state, { saveLoading: false });
    },
    [Employee.UPDATE_EMPLOYEE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [Employee.DELETE_EMPLOYEE_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [Employee.DELETE_EMPLOYEE_SUCCESS]: (state, action) => {
        const employeeList = state.employeeList.filter(item => {
            return item.id !== action.payload.id;
        });
        return Object.assign({}, state, { loading: false, employeeList });
    },
    [Employee.DELETE_EMPLOYEE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [Employee.CREATE_EMPLOYEE_FIELD_CHANGE]: (state, action) => {
        const employeeData = { ...state.employeeData, ...action.payload };
        return Object.assign({}, state, { employeeData });
    },
    [Employee.SELECT_EMPLOYEE_DETAILS_PENDING]: (state, action) => {
        return Object.assign({}, state, { byIdLoading: true });
    },
    [Employee.SELECT_EMPLOYEE_DETAILS_SUCCESS]: (state, action) => {
        const employeeData = {
            id: { value: action.payload.id }, fullName: { value: action.payload.fullName }, mobileTelephone: { value: action.payload.mobileTelephone },
            position: { value: action.payload.position ? action.payload.position.split(",") : [] }, identityCard: { value: action.payload.identityCard },
            email: { value: action.payload.email }, birthday: { value: action.payload.birthday },
            education: { value: action.payload.education ? action.payload.education + "" : null }, sex: { value: action.payload.sex + "" },
            maritalStatus: { value: action.payload.maritalStatus + "" }, joinedDate: { value: action.payload.joinedDate }, wokeDate: { value: action.payload.wokeDate },
            contractDate: { value: action.payload.contractDate }, address: { value: action.payload.address }, employeeNo: { value: action.payload.employeeNo }
        }
        const o_fileList = action.payload.qualificationes || [];
        return Object.assign({}, state, { employeeData, photoImageUrl: '', fileList: [], byIdLoading: false, zizhiDisabled: o_fileList.length >= 5 });
    },
    [Employee.SELECT_EMPLOYEE_DETAILS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { byIdLoading: false });
    },
    [Employee.CREATE_EMPLOYEE_FIELD_RESET]: (state, action) => {
        const employeeData = {
            id: { value: "" }, fullName: { value: "" }, mobileTelephone: { value: "" }, position: { value: [] }, identityCard: { value: "" }, email: { value: "" },
            birthday: { value: null }, education: { value: "" }, sex: { value: "1" }, maritalStatus: { value: "1" }, joinedDate: { value: null }, wokeDate: { value: null },
            contractDate: { value: null }, address: { value: "" }, employeeNo: { value: "" }
        };
        const photoImageUrl = '';
        const fileList = [];
        return Object.assign({}, state, { employeeData, photoImageUrl, fileList, zizhiDisabled: false });
    },
    [Employee.EMPLOYEE_FILE_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { fileList: action.payload, zizhiDisabled: action.payload.length >= 5 });
    },
    [Employee.EMPLOYEE_PHOTO_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { photoImageUrl: action.payload });
    },
    [Employee.IMPORT_EMPLOYEE_PENDING]: (state, action) => {
        return Object.assign({}, state, { importLoading: true });
    },
    [Employee.IMPORT_EMPLOYEE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { importLoading: false });
    },
    [Employee.IMPORT_EMPLOYEE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { importLoading: false });
    },
    [Employee.LIST_EMPLOYEE_DICTITEMS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { dictItemMap: action.payload });
    },
    [Employee.GET_EMPLOYEE_PHOTO_IMAGE]: (state, action) => {
        const photoImageUrl = URL.createObjectURL(action.payload);
        return Object.assign({}, state, { photoImageUrl, });
    },
    [Employee.GET_EMPLOYEE_QUALIFICATION_IMAGE]: (state, action) => {
        const imageUrl = URL.createObjectURL(action.payload.data);
        const { id, fileName } = action.payload.info;
        const file = { uid: id, name: fileName, status: 'done', url: imageUrl }
        const n_fileList = [...state.fileList, file];
        return Object.assign({}, state, { fileList: n_fileList });
    },
}

export default createReducers(initialState, employeeHandler);