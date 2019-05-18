import createReducers from '../utils/createReducers'
import { MemberRedemption } from '../utils/constants'
import moment from 'moment';
import numeral from 'numeral';

const initialState = {
    loading: false, //查询会员积分等信息loading
    selectedKeys: ["1"],//默认选中的菜单
    routerPath: null, //当前页面路由
    phone: "",//查询条件
    giftLoading: false,//加载礼品loading
    pageSize: 10,//分页大小
    total: 0, //总记录大小
    currentPage: 1,//当前页
    giftList: [],//礼品
    saveGiftLoading: false,//保存礼品loading
    detailGiftLoading: false,//明细加载loading
    giftFormData: {id: {value: null}, giftName: {value: null}, giftNum: {value: 1}, giftPoint: {value: 0}},
    pointLoading: false,
    pointFormData: {id: {value: null}, phone: {value: null}, name: {value: null}, registerTime: {value: null}, birthday: {value: null}, rank: {value: null}, point: {value: null}},
    pointGiftFormData: {giftId: {value: null}, giftNum: {value: null}, giftPoint: {value: null}, changeDesc: {value: null}},//兑换礼品
    redemptionLoading: false,//兑换礼品loading
    selectPointCashLoading: false,//查询积分返现1元需要多少积分loading
    pointCashFormData: {type: {value: null}, point: {value: 10}, pointCash: {value: null}, cash: {value: null}, changeDesc: {value: null}},//积分返现formdata
    //兑换记录
    recordLoading: false,//兑换记录加载loading
    recordPageSize: 10,//分页大小
    recordTotal: 0, //总记录大小
    recordCurrentPage: 1,//当前页
    recordList: [],//兑换记录
    recordSearchForm: {phone: {value: ""}},//查询条件表单
    recordSearchCondition: {phone: ""},//查询条件
}

const memberRedemptionHandler = {
    [MemberRedemption.REDEMPTION_ONMENU_SELECT]: (state, action) => {
        return Object.assign({}, state, {selectedKeys: action.payload});
    },
    [MemberRedemption.REDEMPTION_ROUTER_CHANGE]: (state, action) => {
        return Object.assign({}, state, {routerPath: action.payload});
    },
    [MemberRedemption.REDEMPTION_ON_PHONE_CHANGE]: (state, action) => {
        return Object.assign({}, state, {phone: action.payload});
    },
    //礼品form的change
    [MemberRedemption.GIFT_FORMDATA_CHANGE]: (state, action) => {
        const giftFormData = {...state.giftFormData, ...action.payload};
        return Object.assign({}, state, { giftFormData });
    },
    //礼品form的reset
    [MemberRedemption.GIFT_FORMDATA_RESET]: (state, action) => {
        return Object.assign({}, state, { giftFormData: initialState.giftFormData });
    },
    //列出礼品列表
    [MemberRedemption.LIST_GIFT_PENDING]: (state, action) => {
        return Object.assign({}, state, {giftLoading: true});
    },
    [MemberRedemption.LIST_GIFT_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {giftLoading: false, total: totalNum, pageSize, currentPage, giftList: items,});
    },
    [MemberRedemption.LIST_GIFT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {giftLoading: false});
    },
    //新增礼品
    [MemberRedemption.SAVE_GIFT_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveGiftLoading: true});
    },
    [MemberRedemption.SAVE_GIFT_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {saveGiftLoading: false});
    },
    [MemberRedemption.SAVE_GIFT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveGiftLoading: false});
    },
    //修改礼品
    [MemberRedemption.UPDATE_GIFT_PENDING]: (state, action) => {
        return Object.assign({}, state, {saveGiftLoading: true});
    },
    [MemberRedemption.UPDATE_GIFT_SUCCESS]: (state, action) => {
        const memberGift = action.payload;
        const giftList = state.giftList.map(item => {
            if(item.id == memberGift.id) {
                return {...item, ...memberGift};
            }
            return item;
        });
        return Object.assign({}, state, {saveGiftLoading: false, giftList});
    },
    [MemberRedemption.UPDATE_GIFT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {saveGiftLoading: false});
    },
    //查询明细
    [MemberRedemption.SELECT_GIFT_PENDING]: (state, action) => {
        return Object.assign({}, state, {detailGiftLoading: true});
    },
    [MemberRedemption.SELECT_GIFT_SUCCESS]: (state, action) => {
        const memberGift = action.payload;
        const giftFormData = {id: {value: memberGift.id}, giftName: {value: memberGift.giftName}, 
            giftNum: {value: memberGift.giftNum}, giftPoint: {value: memberGift.giftPoint}};
        return Object.assign({}, state, {detailGiftLoading: false, giftFormData});
    },
    [MemberRedemption.SELECT_GIFT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {detailGiftLoading: false});
    },
    //删除礼品
    [MemberRedemption.DELETE_GIFT_PENDING]: (state, action) => {
        return Object.assign({}, state, {giftLoading: true});
    },
    [MemberRedemption.DELETE_GIFT_SUCCESS]: (state, action) => {
        const id = action.payload;
        const giftList = state.giftList.filter(item => item.id != id);
        return Object.assign({}, state, {giftLoading: false, giftList});
    },
    [MemberRedemption.DELETE_GIFT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {giftLoading: false});
    },
    //加载point
    [MemberRedemption.SELECT_MEMBER_POINT_PENDING]: (state, action) => {
        return Object.assign({}, state, {pointLoading: true});
    },
    [MemberRedemption.SELECT_MEMBER_POINT_SUCCESS]: (state, action) => {
        const data = action.payload;
        const pointFormData = {id: {value: data.id}, phone: {value: data.phone}, name: {value: data.name}, registerTime: {value: `${data.registerTime}(${moment(data.registerTime, "YYYY-MM-DD").fromNow()})`},
            birthday: {value: data.birthday ? moment(data.birthday, "YYYY-MM-DD").format('MMM Do') : data.birthday}, rank: {value: data.rank}, point: {value: data.point}};
        return Object.assign({}, state, {pointLoading: false, pointFormData});
    },
    [MemberRedemption.SELECT_MEMBER_POINT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {pointLoading: false});
    },
    //
    [MemberRedemption.GIFT_ONGIFT_SELECT]: (state, action) => {
        const giftId = action.payload;
        const giftObj = state.giftList.find(item => item.id == giftId);
        const pointGiftFormData = {giftId: {value: giftObj.id}, giftNum: {value: giftObj.giftNum}, 
            giftPoint: {value: giftObj.giftPoint}, changeDesc: {value: null}};//兑换礼品
        return Object.assign({}, state, {pointGiftFormData});
    },
    //兑换礼品
    [MemberRedemption.REDEMPTION_GIFT_PENDING]: (state, action) => {
        return Object.assign({}, state, {redemptionLoading: true});
    },
    [MemberRedemption.REDEMPTION_GIFT_SUCCESS]: (state, action) => {
        const giftId = action.payload;
        const giftList = state.giftList.map(item => {
            if(item.id == giftId) {
                item.giftNum = item.giftNum - 1;
            }
            return item;
        });
        const giftObj = state.giftList.find(item => item.id == giftId);
        const pointFormData = {...state.pointFormData, point: {value: state.pointFormData.point.value - giftObj.giftPoint}};
        const pointGiftFormData = {...state.pointGiftFormData, giftNum: {value: state.pointGiftFormData.giftNum.value - 1}};
        return Object.assign({}, state, {redemptionLoading: false, giftList, pointFormData, pointGiftFormData});
    },
    [MemberRedemption.REDEMPTION_GIFT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {redemptionLoading: false});
    },
    //积分返现
    [MemberRedemption.REDEMPTION_CASH_PENDING]: (state, action) => {
        return Object.assign({}, state, {redemptionLoading: true});
    },
    [MemberRedemption.REDEMPTION_CASH_SUCCESS]: (state, action) => {
        const point = action.payload;
        const pointFormData = {...state.pointFormData, point: {value: state.pointFormData.point.value - point}};
        return Object.assign({}, state, {redemptionLoading: false, pointFormData});
    },
    [MemberRedemption.REDEMPTION_CASH_FAILURE]: (state, action) => {
        return Object.assign({}, state, {redemptionLoading: false});
    },
    //查询积分返现1元需要多少积分
    [MemberRedemption.SELECT_POINTCASH_PENDING]: (state, action) => {
        return Object.assign({}, state, {selectPointCashLoading: true});
    },
    [MemberRedemption.SELECT_POINTCASH_SUCCESS]: (state, action) => {
        const pointCash = action.payload;
        const point = state.pointCashFormData.point.value;
        const pointCashFormData = {...state.pointCashFormData, pointCash: {value: pointCash}, cash: {value: numeral(point/pointCash).format("0,0.00")}}
        return Object.assign({}, state, {selectPointCashLoading: false, pointCashFormData});
    },
    [MemberRedemption.SELECT_POINTCASH_FAILURE]: (state, action) => {
        return Object.assign({}, state, {selectPointCashLoading: false});
    },
    //
    [MemberRedemption.POINTCASH_FORM_FIELDS_CHANGE]: (state, action) => {
        const fields = action.payload;
        let cash = state.pointCashFormData.cash.value;
        if(fields.point) {
            let pointCash = state.pointCashFormData.pointCash.value;
            cash = numeral(fields.point.value/pointCash).format("0,0.00");
        }
        const pointCashFormData = {...state.pointCashFormData, ...fields, cash: {value: cash}};
        return Object.assign({}, state, {pointCashFormData});
    },
    //查询兑换记录
    [MemberRedemption.LIST_REDEMPTIONHIS_PENDING]: (state, action) => {
        return Object.assign({}, state, {recordLoading: true});
    },
    [MemberRedemption.LIST_REDEMPTIONHIS_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, {recordLoading: false, recordTotal: totalNum, 
            recordPageSize: pageSize, recordCurrentPage: currentPage, recordList: items,});
    },
    [MemberRedemption.LIST_REDEMPTIONHIS_FAILURE]: (state, action) => {
        return Object.assign({}, state, {recordLoading: false});
    },
    [MemberRedemption.MEMBERREDEMPTION_SEARCHFORM_CHANGE]: (state, action) => {
        const recordSearchForm = { ...state.recordSearchForm, ...action.payload };
        return Object.assign({}, state, {recordSearchForm});
    },
    [MemberRedemption.MEMBERREDEMPTION_SEARCHFORM_RESET]: (state, action) => {
        return Object.assign({}, state, {recordSearchForm: initialState.recordSearchForm});
    },
    [MemberRedemption.MEMBERREDEMPTION_HANDLE_SEARCH]: (state, action) => {
        const recordSearchCondition = {...state.recordSearchCondition, ...action.payload};
        return Object.assign({}, state, {recordSearchCondition});
    },
}

export default createReducers(initialState, memberRedemptionHandler);