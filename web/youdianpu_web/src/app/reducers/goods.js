import createReducers from '../utils/createReducers'
import { Goods, GoodsCategory, Dictionary } from '../utils/constants'
import _ from 'lodash';
import { staticHost } from '../common/config';

const initialState = {
    loading: true,
    goodsList: [],
    saveLoading: false,
    detailLoading: false,
    goodsData: {
        id: { value: "" }, name: { value: "" }, piny: { value: "" }, unit: { value: "1" }, costPrice: { value: "0.0" }, price: { value: "" }, inventory: { value: "9999" },
        category: { value: "" }, printerId: {value: ""}, description: { value: "" }, defaultImage: { value: "" }
    },
    pageSize: 10,
    total: 0,
    currentPage: 1, //当前页
    fileList: [],
    extraList: [],//附属属性列表
    extraItems: {},//附属属性项
    // selectedExtraList: [],//已勾选的附属属性
    selectedExtraItems: {},//已勾选的附属属性项
    dictItemMap: null,
    // goodsExtra: {extraCode: null, extraName: null, goodsId: null}, //商品附属属性关联表
    // goodsExtraItem: {extraId: null, dictItemId: null, goodsId: null, price: null}, //商品附属属性项关联表
    activeKey: "1",//默认是商品主信息选项卡
}

const GoodsHandler = {
    [Goods.QUERY_GOODS_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [Goods.QUERY_GOODS_SUCCESS]: (state, action) => {
        const { pageSize, items, totalNum, currentPage } = action.payload;
        return Object.assign({}, state, { loading: false, goodsList: items, pageSize, currentPage, total: totalNum });
    },
    [Goods.QUERY_GOODS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [Goods.SAVE_GOODS_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [Goods.SAVE_GOODS_SUCCESS]: (state, action) => {
        const goodsData = { ...state.goodsData, id: { value: action.payload } };
        return Object.assign({}, state, { saveLoading: false, goodsData });
    },
    [Goods.SAVE_GOODS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [Goods.SELECT_GOODS_SUCCESS]: (state, action) => {
        const { id, name, piny, unit, costPrice, price, inventory, category, printerId, description, defaultImage } = action.payload;
        const goodsData = {
            id: { value: id }, name: { value: name }, piny: { value: piny }, unit: { value: unit + "" },
            costPrice: { value: costPrice }, price: { value: price },
            inventory: { value: inventory }, category: { value: category },
            printerId: {value: printerId},
            description: { value: description },
            defaultImage: { value: defaultImage }
        }
        const o_fileList = action.payload.images || [];
        const n_fileList = o_fileList.map((item, index) => {
            return { uid: item.id, name: item.imageName, status: 'done', url: `${staticHost}${item.imagePath}` };
        });
        return Object.assign({}, state, { goodsData, fileList: n_fileList });
    },
    [Goods.UPDATE_GOODS_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [Goods.UPDATE_GOODS_SUCCESS]: (state, action) => {
        //返回的是FormData对象
        /*
        const goodsList = state.goodsList.map(item => {
            if(item.id === action.payload.id) {
                return {...item, ...action.payload};
            } else {
                return item;
            }
        });*/
        return Object.assign({}, state, { saveLoading: false });
    },
    [Goods.UPDATE_GOODS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [Goods.DELETE_GOODS_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [Goods.DELETE_GOODS_SUCCESS]: (state, action) => {
        const goodsList = state.goodsList.filter(item => {
            return item.id !== action.payload.id;
        });
        return Object.assign({}, state, { loading: false, goodsList });
    },
    [Goods.DELETE_GOODS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [Goods.SALEOFF_GOODS_PENDING]: (state, action) => {
        return Object.assign({}, state, { loading: true });
    },
    [Goods.SALEOFF_GOODS_SUCCESS]: (state, action) => {
        const goodsList = state.goodsList.map(item => {
            if (item.id === action.payload.id) {
                return { ...item, ...action.payload };
            } else {
                return item;
            }
        });
        return Object.assign({}, state, { loading: false, goodsList });
    },
    [Goods.SALEOFF_GOODS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { loading: false });
    },
    [Goods.LIST_GOODS_DICTITEMS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { dictItemMap: action.payload });
    },
    [Goods.CREATE_GOODS_FIELD_CHANGE]: (state, action) => {
        const goodsData = { ...state.goodsData, ...action.payload };
        return Object.assign({}, state, { goodsData });
    },
    [Goods.CREATE_GOODS_FIELD_RESET]: (state, action) => {
        const goodsData = {
            id: { value: "" }, name: { value: "" }, piny: { value: "" }, unit: { value: "1" }, costPrice: { value: "0.0" }, price: { value: "" }, inventory: { value: "9999" },
            category: { value: "" }, printerId: { value: "" }, description: { value: "" }, defaultImage: { value: "" }
        };
        const fileList = [];
        // const selectedExtraList = [];
        const selectedExtraItems = {};
        const extraItems = {};
        const extraList = [];
        const activeKey = "1";
        return Object.assign({}, state, { fileList, selectedExtraItems, extraItems, extraList, activeKey, goodsData });
    },
    [Goods.GOODS_FILE_ONCHANGE]: (state, action) => {
        return Object.assign({}, state, { fileList: action.payload });
    },
    [Goods.GOODS_LIST_EXTRAS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { extraList: action.payload });
    },
    //查询商品详情
    [Goods.GOODS_INIT_EXTRAS_PENDING]: (state, action) => {
        return Object.assign({}, state, { detailLoading: true });
    },
    [Goods.GOODS_INIT_EXTRAS_SUCCESS]: (state, action) => {
        //附属属性列表、商品附属属性关联、商品附属属性项关联、商品
        const { extraList, goodsExtras, goodsExtraItems, goods } = action.payload;
        const { id, name, piny, unit, costPrice, price, inventory, printerId, category, description, defaultImage } = goods;
        const goodsData = {
            id: { value: id }, name: { value: name }, piny: { value: piny }, unit: { value: unit + "" },
            costPrice: { value: costPrice }, price: { value: price },
            inventory: { value: inventory }, category: { value: category },
            printerId: {value: printerId},
            description: { value: description },
            defaultImage: { value: defaultImage }
        }
        const o_fileList = goods.images || [];
        const n_fileList = o_fileList.map((item, index) => {
            return { uid: item.id, name: item.imageName, status: 'done', url: `${staticHost}${item.imagePath}` };
        });
        const new_extraList = extraList.map(item => {
            if(goodsExtras.find(extra => item.dictCode === extra.extraCode)) {
                item.checked = true;
            } else {
                item.checked = false;
            }
            return item;
        });
        const selectedExtraItems = {};//已勾选的附属属性项
        goodsExtraItems.forEach(item => {
            if(!selectedExtraItems[item.dictCode]) {
                selectedExtraItems[item.dictCode] = [];
            }
            selectedExtraItems[item.dictCode].push({id: item.dictItemId, itemName: item.itemName, dictCode: item.dictCode, price: item.price});
        });
        return Object.assign({}, state, { detailLoading: false, extraList: new_extraList, goodsData, fileList: n_fileList, selectedExtraItems, });
    },
    [Goods.GOODS_INIT_EXTRAS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { detailLoading: false });
    },
    [Goods.GOODS_LIST_EXTRAITEM_SUCCESS]: (state, action) => {
        const { dictCode, data } = action.payload;
        const extraItems = {...state.extraItems, [dictCode]: _.cloneDeep(data)};
        const extraList = state.extraList.map(extra => {
            if(extra.dictCode === dictCode) {
                extra.checked = true;
            }
            return extra;
        });
        const extra = extraList.find(item => item.dictCode == dictCode);
        // const selectedExtraList = [...state.selectedExtraList, extra];
        //复制之前设置的价格浮动
        let extraItemArr;
        if(state.selectedExtraItems[dictCode]) {
            extraItemArr = _.cloneDeep(state.selectedExtraItems[dictCode]);
        } else {//已勾选的附属属性项 不能与属性项是同一个对象
            extraItemArr = _.cloneDeep(data).map(item => {
                item.price = 0;
                return item;
            });
        }
        const selectedExtraItems = {...state.selectedExtraItems, [dictCode]: extraItemArr};
        // return Object.assign({}, state, { extraList, extraItems, selectedExtraList, selectedExtraItems });
        return Object.assign({}, state, { extraList, extraItems, selectedExtraItems });
    },
    [Goods.GOODS_UNCHECKED_EXTRA]: (state, action) => {
        const dictCode = action.payload;
        const extraList = state.extraList.map(extra => {
            if(extra.dictCode === dictCode) {
                extra.checked = false;
            }
            return extra;
        });
        //已勾选的附属属性
        // const selectedExtraList = state.selectedExtraList.filter(item => item.dictCode !== dictCode);
        //已勾选的附属属性项
        // const selectedExtraItems = {...state.selectedExtraItems};
        // delete selectedExtraItems[dictCode];
        // return Object.assign({}, state, { extraList, selectedExtraList });
        return Object.assign({}, state, { extraList });
    },
    [Goods.GOODS_CHECKED_EXTRA]: (state, action) => {
        const dictCode = action.payload;
        const extraList = state.extraList.map(extra => {
            if(extra.dictCode === dictCode) {
                extra.checked = true;
            }
            return extra;
        });
        const extra = extraList.find(item => item.dictCode == dictCode);
        // const selectedExtraList = [...state.selectedExtraList, extra];
        let extraItemArr;
        //复制之前设置的价格浮动
        if(state.selectedExtraItems[dictCode]) {
            extraItemArr = _.cloneDeep(state.selectedExtraItems[dictCode]);
        } else {
            extraItemArr = _.cloneDeep(state.extraItems[dictCode]);
        }
        const selectedExtraItems = {...state.selectedExtraItems, [dictCode]: extraItemArr};
        // return Object.assign({}, state, { extraList, selectedExtraList, selectedExtraItems });
        return Object.assign({}, state, { extraList, selectedExtraItems });
    },
    [Goods.GOODS_ON_TABCHANGE]: (state, action) => {
        return Object.assign({}, state, { activeKey: action.payload });
    },
    [Goods.GOODS_ON_PRICECHANGE]: (state, action) => {
        const { value, dictCode, dictItemId } = action.payload;
        const selectedExtraItemArr = [...state.selectedExtraItems[dictCode]];
        const new_selectedExtraItemArr = selectedExtraItemArr.map(item => {
            if(item.id === dictItemId) {
                item.price = value;
            }
            return item;
        });
        const selectedExtraItems = {...state.selectedExtraItems, [dictCode]: new_selectedExtraItemArr};
        return Object.assign({}, state, { selectedExtraItems });
    },
    [Goods.SAVE_GOODSEXTRA_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveLoading: true });
    },
    [Goods.SAVE_GOODSEXTRA_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [Goods.SAVE_GOODSEXTRA_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveLoading: false });
    },
    [Goods.GOODS_REMOVE_GOODSIMAGE_FILE]: (state, action) => {
        const { uid } = action.payload;
        const defaultImage = state.goodsData.defaultImage;
        if(state.goodsData.defaultImage.value === uid) {
            defaultImage.value = null;
        }
        const new_goodsData = {...state.goodsData, defaultImage};
        return Object.assign({}, state, { saveLoading: false, goodsData: new_goodsData });
    },
    [Dictionary.UPDATE_DICTITEM_SUCCESS]: (state, action) => {
        const selectedExtraItems = {};
        const extraItems = {};
        return Object.assign({}, state, { selectedExtraItems, extraItems });
    },
    [Dictionary.SAVE_DICTITEM_SUCCESS]: (state, action) => {
        const selectedExtraItems = {};
        const extraItems = {};
        return Object.assign({}, state, { selectedExtraItems, extraItems });
    },
    [Dictionary.DELETE_DICTITEM_SUCCESS]: (state, action) => {
        const selectedExtraItems = {};
        const extraItems = {};
        return Object.assign({}, state, { selectedExtraItems, extraItems });
    },
}

export default createReducers(initialState, GoodsHandler);