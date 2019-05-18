import createReducers from '../utils/createReducers'
import { MemberInfo } from '../utils/constants'
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

const initialState = {
    loading: false,//列表加载loading
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    memberList: [],//会员信息列表
    searchCondition: {phone: "", register: "1", referrerName: ""},
    searchFormData: {phone: {value: ""}, register: {value: ""}, referrerName: {value: ""}},
    memberInfoData: {id: {value: ""}, phone: {value: ""}, type: {value: "1"}, name: {value: ""}, source: {value: "1"}, sex: {value: "1"}, birthday: {value: null}, 
        registerTime: {value: moment()}, referrerName: {value: ""}},
    detailLoading: false, //明细加载loading
    saveLoading: false,//保存会员信息loading
    memberDetailData: {phone: {value: ""}, type: {value: ""}, name: {value: ""}, status: {value: ""}, source: {value: ""}, sex: {value: ""}, 
        birthday: {value: null}, registerTime: {value: null}, rank: {value: 0}, point: {value: ""}, accountNo: {value: ""}, accountStatus: {value: ""},
        accountBalance: {value: ""}},
    freezeLoading: false,//冻结\解冻loading
    changeDescValue: "",//冻结\解冻备注信息
    routerPath: null,//当前页面路由
    qrcodeData: null,//绑定支付宝或微信二维码
    bindData: {id: {value: ""}, phone: {value: ""}, bindType: {value: ""}, code: {value: ""}},//绑定微信或支付宝
    bindLoading: false,//绑定微信或支付宝loading
    unbindLoading: false,//解除绑定按钮
    hideUnbindBtn: true,//隐藏解绑按钮
}

const memberInfoHandler = {
    //查询会员列表信息
    [MemberInfo.LIST_MEMBER_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberInfo.LIST_MEMBER_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {loading: false, total: totalNum, pageSize, currentPage, memberList: items,});
    },
    [MemberInfo.LIST_MEMBER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //会员信息表单change
    [MemberInfo.MEMBER_FORM_CHANGE]: (state, action) => {
        const memberInfoData = {...state.memberInfoData, ...action.payload};
        return Object.assign({}, state, { memberInfoData });
    },
    [MemberInfo.MEMBER_FORM_RESET]: (state, action) => {
        return Object.assign({}, state, { memberInfoData: initialState.memberInfoData });
    },
    //查询表单change
    [MemberInfo.MEMBER_SEARCHFORM_CHANGE]: (state, action) => {
        const searchFormData = {...state.searchFormData, ...action.payload};
        return Object.assign({}, state, { searchFormData });
    },
    [MemberInfo.MEMBER_SEARCHFORM_RESET]: (state, action) => {
        return Object.assign({}, state, { searchFormData: initialState.searchFormData, searchCondition: initialState.searchCondition });
    },
    //处理查询条件
    [MemberInfo.MEMBER_HANDLE_SEARCH]: (state, action) => {
        return Object.assign({}, state, {searchCondition: {...action.payload}});
    },
    //保存会员信息
    [MemberInfo.SAVE_MEMBER_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true});
    },
    [MemberInfo.SAVE_MEMBER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    [MemberInfo.SAVE_MEMBER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    //查询会员信息
    [MemberInfo.SELECT_MEMBER_PENDING]: (state, action) => {
        return Object.assign({}, state, {detailLoading: true});
    },
    [MemberInfo.SELECT_MEMBER_SUCCESS]: (state, action) => {
        const data = action.payload;
        const memberInfoData = {id: {value: data.id}, phone: {value: data.phone}, type: {value: data.type+""}, name: {value: data.name}, 
            source: {value: data.source+""},  sex: {value: data.sex+""}, birthday: {value: data.birthday ? moment(data.birthday, 'YYYY-MM-DD') : null}, 
            registerTime: {value: moment(data.registerTime, 'YYYY-MM-DD')}, referrerName: {value: data.referrerName}};
        return Object.assign({}, state, {detailLoading: false, memberInfoData});
    },
    [MemberInfo.SELECT_MEMBER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {detailLoading: false});
    },
    //删除会员信息 入库delete表
    [MemberInfo.DELETE_MEMBER_PENDING]: (state, action) => {
        return Object.assign({}, state, {loading: true});
    },
    [MemberInfo.DELETE_MEMBER_SUCCESS]: (state, action) => {
        const id = action.payload;
        const memberList = state.memberList.filter(item => item.id != id);
        return Object.assign({}, state, {loading: false, memberList});
    },
    [MemberInfo.DELETE_MEMBER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {loading: false});
    },
    //修改会员信息
    [MemberInfo.UPDATE_MEMBER_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveLoading: true});
    },
    [MemberInfo.UPDATE_MEMBER_SUCCESS]: (state, action) => {
        const memberUser = action.payload;
        const new_memberList = state.memberList.map(item => {
            if(item.id == memberUser.id) {
                return {...item, ...memberUser};
            }
            return item;
        })
        return Object.assign({}, state, {saveLoading: false, memberList: new_memberList});
    },
    [MemberInfo.UPDATE_MEMBER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveLoading: false});
    },
    //冻结会员信息
    [MemberInfo.FREEZE_MEMBER_PENDING]: (state, action) => {
        return Object.assign({}, state, {freezeLoading: true});
    },
    [MemberInfo.FREEZE_MEMBER_SUCCESS]: (state, action) => {
        const id = action.payload;
        const memberList = state.memberList.map(item => {
            if(item.id == id) {
                item.status = '1';//
            }
            return item;
        });
        return Object.assign({}, state, {freezeLoading: false});
    },
    [MemberInfo.FREEZE_MEMBER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {freezeLoading: false});
    },
    //解冻会员信息
    [MemberInfo.UNFREEZE_MEMBER_PENDING]: (state, action) => {
        return Object.assign({}, state, {freezeLoading: true});
    },
    [MemberInfo.UNFREEZE_MEMBER_SUCCESS]: (state, action) => {
        const id = action.payload;
        const memberList = state.memberList.map(item => {
            if(item.id == id) {
                item.status = '0';//
            }
            return item;
        });
        return Object.assign({}, state, {freezeLoading: false});
    },
    [MemberInfo.UNFREEZE_MEMBER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {freezeLoading: false});
    },
    //查询会员明细（包括账户信息）
    [MemberInfo.SELECT_MEMBERDETAIL_PENDING]: (state, action) => {
        return Object.assign({}, state, {detailLoading: true});
    },
    [MemberInfo.SELECT_MEMBERDETAIL_SUCCESS]: (state, action) => {
        const { memberUser, memberAccount } = action.payload;
        const memberDetailData = {phone: {value: memberUser.phone}, type: {value: memberUser.type+""}, name: {value: memberUser.name}, status: {value: memberUser.status+""},
        source: {value: memberUser.source+""},  sex: {value: memberUser.sex+""}, birthday: {value: memberUser.birthday ? moment(memberUser.birthday, 'YYYY-MM-DD') : null}, 
        registerTime: {value: moment(memberUser.registerTime, 'YYYY-MM-DD')}, rank: {value: parseInt(memberUser.rank)}, point: {value: memberUser.point}, accountNo: {value: memberAccount.accountNo}, 
        accountStatus: {value: memberAccount.accountStatus+""}, accountBalance: {value: numeral(memberAccount.accountBalance).format('0,0.00')}}
        return Object.assign({}, state, {detailLoading: false, memberDetailData});
    },
    [MemberInfo.SELECT_MEMBERDETAIL_FAILURE]: (state, action) => {
        return Object.assign({}, state, {detailLoading: false});
    },    
    [MemberInfo.MEMBER_ROUTER_CHANGE]: (state, action) => {
        return Object.assign({}, state, { routerPath: action.payload });
    },
    //冻结、解冻会员备注信息change
    [MemberInfo.MEMBER_ON_CHANGEDESC_CHANGE]: (state, action) => {
        return Object.assign({}, state, { changeDescValue: action.payload });
    },
    //绑定支付宝或微信二维码
    [MemberInfo.DISPATCH_BIND_QRCODE]: (state, action) => {
        return Object.assign({}, state, { qrcodeData: action.payload });
    },
    //绑定微信或支付宝
    [MemberInfo.BINDDATA_FORM_CHANGE]: (state, action) => {
        const bindData = {...state.bindData, ...action.payload};
        return Object.assign({}, state, { bindData, hideUnbindBtn: true });
    },
    //绑定微信或者支付宝
    [MemberInfo.MEMBER_BIND_PENDING]: (state, action) => {
        return Object.assign({}, state, { bindLoading: true });
    },
    [MemberInfo.MEMBER_BIND_SUCCESS]: (state, action) => {
        const bindData = {...initialState.bindData};
        return Object.assign({}, state, { bindLoading: false, bindData });
    },
    [MemberInfo.MEMBER_BIND_FAILURE]: (state, action) => {
        return Object.assign({}, state, { bindLoading: false, hideUnbindBtn: false });
    },
    //解除绑定微信或者支付宝
    [MemberInfo.MEMBER_UNBIND_PENDING]: (state, action) => {
        return Object.assign({}, state, { unbindLoading: true });
    },
    [MemberInfo.MEMBER_UNBIND_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { unbindLoading: false, hideUnbindBtn: true });
    },
    [MemberInfo.MEMBER_UNBIND_FAILURE]: (state, action) => {
        return Object.assign({}, state, { unbindLoading: false, hideUnbindBtn: false });
    },
}

export default createReducers(initialState, memberInfoHandler);