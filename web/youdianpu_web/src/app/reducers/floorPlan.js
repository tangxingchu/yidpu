import createReducers from '../utils/createReducers'
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import { FloorPlan, HomePage, Goods } from '../utils/constants'
//需要场地信息、商品分类信息、商品信息、购物车信息、订单信息、socket实时信息、排队信息、收付款、相关字典。
const initialState = {
    defaultFloorId: null,
    graphLeft: 200,
    local_goodsList: [],
    local_cartList: [],
    local_goodsCategory: [],
    goodsExtraMap: {},//缓存商品附属属性
    goodsLoading: false,//商品loading
    cartLoading: false,//购物车loading
    submitOrderLoading:  false,//提交订单loading
    currentGoodsId: null,//当前下单商品
    isEnabledDays: null,//是否启用了每日特价商品
    isEnabledDiscount: null,//是否启用了折扣商品
    todayGoodsDays: [],//当天特价商品
    effectiveGoodsDiscounts: [], //当前生效的折扣商品
    orderDetailVisible: false,//订单详情抽屉页
    orderListLoading: false, //订单列表加载loading
    orderList: [], //订单列表
    orderListMap: {},//已加载的订单,做桌台的tips
    subtractMap: {},//当前符合订单消费金额等约束条件的优惠
    // subtractMap_bak: {},//在添加现金券与删除现金券是需要用到这个，删除现金券恢复优惠
    couponConsumeMap: {}, //现金券抵扣
    currCouponConsumes: [], //当前桌台添加的现金券
    payAmount: 0, //应收
    receivedAmount: 0, //实收
    qrcodeData: null, //二维码
    syncAlipayResultLoading: false,//同步支付宝支付结果loading
    syncWxpayResultLoading: false,//同步微信支付结果loading
    saveCouponConsumeLoading: false,//保存记录现金优惠券loading
    deleteCouponConsumeLoading: false,//删除现金优惠券loading
    listOtherTablesLoading: false,//合并桌台收银 查询其它桌台loading
    otherTables: [],//所有其它桌台
    selectedOtherTables: [], //已选择的其它桌台
    gatheringLoading: false,//收银操作
    dinersFormData: {dinersNum: {value: ""}}, //用餐人数formdata
    dinersNumMap: {}, //用餐人数map
    // enabledSET: false,//[减免或折扣]与现金券是否可以同时享受
    payOrderList: [],//前台扫码支付订单
    payOrderLoading: false,//加载前台支付订单loading
    relateFrontOrderLoading: false,//关联前台扫码单收银loading
    finishedOrderLoading: false,//完成订单loading
    allTableStatus: [],//所有桌台状态
    copyOrderLoading: false,//复制其它桌台订单下单loading
    memberInfo: {phone: {value: null}, name: {value: null}, birthday: {value: null}, registerTime: {value: null},
        rank: {value: null}, accountBalance: {value: null}},//会员消费
    memberBtnIsDisabled: true,//会员消费按钮
    selectMemberInfoLoading: false,//加载会员信息loading
    memberComsumeLoading: false,//会员消费loading
    phoneCodeLoading: false, //短信动态密码loading
    countDown: 0,//60s倒计时
    selectOrderLoading: false,//补打小票查询当前桌台用餐订单
    confirmOrderLoading: false,
    confirmOrderItemLoading: false,
    paymentFormData: {payMethod: {value: 5}, remark: {value: ""}},//支付窗口formdata
    changeTableLoading: false,//换台
}

//计算附属属性影响的价格波动
const calCartExtraPrice = (cartItem, goodsExtraMap, goods) => {
    const extraItemNames = [];
    cartItem.extraPrice = 0;
    cartItem.extraItems.map(extraItem => {
        //找到商品对应的所有附属属性列表
        const extraList = goodsExtraMap[cartItem.goodsId];
        extraList.map(extra => {
            //找到对应的附属属性
            if(extra.extraCode === extraItem.extraCode) {
                const extraItems2 = extra.items;
                extraItems2.map(extraItem2 => {
                    //再找到对应的附属属性项
                    if(extraItem2.itemValue == extraItem.extraItemValue) {
                        cartItem.extraPrice += extraItem2.price;
                        extraItemNames.push(extraItem2.itemName);
                    }
                });
            }
        });
    });
    if(extraItemNames.length > 0) {
        cartItem.extraItemNames = `${extraItemNames.join(" ")}`;
    }
}

const floorPlanHandler = {
    [FloorPlan.SCREEN_RADIO_CHANGE]: (state, action) => {
        return Object.assign({}, state, { defaultFloorId: action.payload });
    },
    [HomePage.CHANGE_COLLAPSED]: (state, action) => {
        if (action.payload === true) {
            return Object.assign({}, state, { graphLeft: 80 });
        } else {
            return Object.assign({}, state, { graphLeft: 200 });
        }
    },
    [FloorPlan.FLOORPLAN_DISPATCH_INIT]: (state, action) => {
        const datas = action.payload;
        const local_goodsCategory = datas[0];
        const local_goodsList = datas[1];
        const local_cartList = datas[2];
        let isEnabledDays = 0, isEnabledDiscount = 0;
        datas[3].forEach(item => {
            if(item.config_code === 'enabled-goods-day') {
                isEnabledDays = item.config_value;
            } else {
                isEnabledDiscount = item.config_value;
            }
        });
        /* const new_local_cartList = local_cartList.map(cartItem => {
            
        }); */
        return Object.assign({}, state, { local_goodsCategory, local_goodsList, local_cartList, isEnabledDays, isEnabledDiscount });
    },
    //所有商品都没有附属属性，就只要添加一下原价信息
    [FloorPlan.ADD_SHOPPING_ORIGPRICE]: (state, action) => {
        const local_cartList = state.local_cartList.map(cartItem => {
            const goods = state.local_goodsList.find(goodsItem => goodsItem.id === cartItem.goodsId);
            cartItem.origPrice = goods.price;//原价
            return cartItem;
        });
        return Object.assign({}, state, { local_cartList });
    },
    [FloorPlan.QUERY_CARTEXTRA_PENDING]: (state, action) => {
        return Object.assign({}, state, { cartLoading: true });
    },
    //所有优惠都没有启用,但是购物车内的商品有附属属性，需要查出附属属性是否影响价格
    [FloorPlan.QUERY_CARTEXTRA_SUCCESS]: (state, action) => {
        const goodsExtraMap = action.payload;
        //修改购物车数据
        const local_cartList = state.local_cartList.map(cartItem => {
            const goods = state.local_goodsList.find(goodsItem => goodsItem.id === cartItem.goodsId);            
            //如果所勾选的附属属性 特价商品就直接加上加个价格浮动，折扣商品是加上价格浮动 * 折扣率.
            if(cartItem.extraItems) {
                calCartExtraPrice(cartItem, goodsExtraMap, goods);      
                //什么优惠都没有启用,原价加上附属属性项受影响价格
                cartItem.price = cartItem.origPrice + cartItem.extraPrice;
            }
            cartItem.origPrice = goods.price + cartItem.extraPrice;//原价
            //小计
            cartItem.itemPrice = cartItem.price * cartItem.num;
            return cartItem;
        });
        return Object.assign({}, state, { cartLoading: false, goodsExtraMap, local_cartList });
    },
    [FloorPlan.QUERY_CARTEXTRA_FAILURE]: (state, action) => {
        return Object.assign({}, state, { cartLoading: false });
    },
    //从商品列表中添加至购物车
    [FloorPlan.FLOORPLAN_DISPATCH_SHOPPINGCART]: (state, action) => {
        const { cartList, goodsId, extraCodes } = action.payload;
        const { goodsExtraMap } = state;
        //修改购物车数据(重新遍历一遍)
        const local_cartList = cartList.map(cartItem => {
            const goods = state.local_goodsList.find(goodsItem => goodsItem.id === cartItem.goodsId);
            if(goods.calPrice) {
                cartItem.dayOrDiscountName = goods.dayName || goods.discountName;
                cartItem.price = goods.calPrice;//现价
            }
            //如果所勾选的附属属性 特价商品就直接加上加个价格浮动，折扣商品是加上价格浮动 * 折扣率.
            if(cartItem.extraItems) {
                calCartExtraPrice(cartItem, goodsExtraMap, goods);
                //如果商品采用的是折扣 附属属性受影响价格要在乘以折扣
                if(goods.discountValue) {
                    cartItem.price = cartItem.price + (goods.discountValue * 10 /100) * cartItem.extraPrice;
                } else {
                    cartItem.price = cartItem.price + cartItem.extraPrice;
                }
            }
            cartItem.origPrice = goods.price + cartItem.extraPrice;//原价
            //小计
            cartItem.itemPrice = cartItem.price * cartItem.num;
            return cartItem;
        });
        //如果下单的是特价商品,需要在限制一下每桌台限制点几份
        const { todayGoodsDays } = state;
        const local_goodsList = state.local_goodsList.map(goods => {
            const goodsDay = todayGoodsDays.find(item => item.goodsId === goods.id);
            if(goodsDay) {
                //校验特价商品每桌点限点几份
                const new_local_cartList = cartList.filter(item => item.goodsId == goods.id);
                let count = 0;
                new_local_cartList.forEach(cartItem => {
                    count += cartItem.num;
                })
                if(count >= goodsDay.limitNum) {
                    goods.disabled = true;
                }
                goods.limitNum = goodsDay.limitNum;
            }
            return goods;
        });
        return Object.assign({}, state, { local_cartList, local_goodsList });
    },
    [FloorPlan.QUERY_GOODSEXTRA_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsLoading: true });
    },
    [FloorPlan.QUERY_GOODSEXTRA_SUCCESS]: (state, action) => {
        const { goodsId, data } = action.payload;
        const goodsExtraMap = { ...state.goodsExtraMap, [goodsId.toString()]: data };
        return Object.assign({}, state, { goodsLoading: false, goodsExtraMap, currentGoodsId: goodsId });
    },
    [FloorPlan.QUERY_GOODSEXTRA_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsLoading: false });
    },
    [Goods.SAVE_GOODSEXTRA_SUCCESS]: (state, action) => {
        const goodsId = action.payload;
        const goodsExtraMap = { ...state.goodsExtraMap, [goodsId.toString()]: null }
        return Object.assign({}, state, { goodsExtraMap });
    },
    [FloorPlan.FLOORPLAN_SELECT_GOODS]: (state, action) => {
        return Object.assign({}, state, { currentGoodsId: action.payload });
    },
    [FloorPlan.LIST_GOODSDAYS_FLOORPLAN_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsLoading: true, cartLoading: true, });
    },
    [FloorPlan.LIST_GOODSDAYS_FLOORPLAN_SUCCESS]: (state, action) => {
        debugger;
        const todayGoodsDays = action.payload.goodsDays;
        const goodsExtraMap = state.goodsExtraMap;
        //商品列表信息
        const local_goodsList = state.local_goodsList.map(goods => {
            const goodsDay = todayGoodsDays.find(item => item.goodsId === goods.id);
            if(goodsDay) {
                goods.dayName = "特价";
                goods.calPrice = goodsDay.price;
                //校验特价商品每桌点限点几份
                const new_local_cartList = state.local_cartList.filter(item => item.goodsId == goods.id);
                let count = 0;
                new_local_cartList.forEach(cartItem => {
                    count += cartItem.num;
                })
                if(count >= goodsDay.limitNum) {
                    goods.disabled = true;
                }
                goods.limitNum = goodsDay.limitNum;
            }
            return goods;
        });
        //购物车列表信息
        const local_cartList = state.local_cartList.map(cartItem => {
            const goods = state.local_goodsList.find(goodsItem => goodsItem.id === cartItem.goodsId);            
            const goodsDay = todayGoodsDays.find(item => item.goodsId === cartItem.goodsId);
            if(goodsDay) {
                cartItem.dayOrDiscountName = goods.dayName;
                cartItem.price = goodsDay.price;
            }
            //如果所勾选的附属属性 特价商品就直接加上加个价格浮动，折扣商品是加上价格浮动 * 折扣率.
            if(cartItem.extraItems) {
                calCartExtraPrice(cartItem, goodsExtraMap, goods);
                //特价商品直接加上附属属性项受影响的价格
                cartItem.price = cartItem.price + cartItem.extraPrice;
            }
            cartItem.origPrice = goods.price + cartItem.extraPrice;//默认价格就是商品 也等于原价
            //小计
            cartItem.itemPrice = cartItem.price * cartItem.num;
            return cartItem;
        });
        return Object.assign({}, state, { goodsLoading: false, cartLoading: false, local_goodsList, local_cartList, todayGoodsDays, goodsExtraMap });
    },
    [FloorPlan.LIST_GOODSDAYS_FLOORPLAN_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsLoading: false, cartLoading: false });
    },
    [FloorPlan.LIST_GOODSDISCOUNT_FLOORPLAN_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsLoading: true, cartLoading: true });
    },
    [FloorPlan.LIST_GOODSDISCOUNT_FLOORPLAN_SUCCESS]: (state, action) => {
        const effectiveGoodsDiscounts = action.payload.goodsDiscounts;
        const goodsExtraMap = state.goodsExtraMap;
        //商品列表信息
        const local_goodsList = state.local_goodsList.map(goods => {
            const goodsDiscount = effectiveGoodsDiscounts.find(item => item.goodsId === goods.id);
            if(goodsDiscount) {
                goods.discountName = `${goodsDiscount.discountValue}折`;
                goods.discountValue = goodsDiscount.discountValue;
                goods.calPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
            }
            return goods;
        });
        //购物车信息
        const local_cartList = state.local_cartList.map(cartItem => {
            const goods = local_goodsList.find(goodsItem => goodsItem.id === cartItem.goodsId);
            if(goodsDiscount.discountValue) {//表示商品有折扣
                cartItem.dayOrDiscountName = goods.discountName;
                cartItem.price = goods.calPrice;
            }
            //如果所勾选的附属属性 特价商品就直接加上加个价格浮动，折扣商品是加上价格浮动 * 折扣率.
            if(cartItem.extraItems) {
                calCartExtraPrice(cartItem, goodsExtraMap, goods);
                //商品采用的是折扣 附属属性受影响价格要在乘以折扣
                if(goodsDiscount.discountValue) {//表示商品有折扣
                    cartItem.price = cartItem.price + (goodsDiscount.discountValue * 10 /100) * cartItem.extraPrice;
                } else {
                    cartItem.price = cartItem.price + cartItem.extraPrice;
                }
            }
            cartItem.origPrice = goods.price + cartItem.extraPrice;//默认价格就是商品 也等于原价
            //小计
            cartItem.itemPrice = cartItem.price * cartItem.num;
            return cartItem;
        });
        return Object.assign({}, state, { goodsLoading: false, cartLoading: false, local_goodsList, local_cartList, effectiveGoodsDiscounts, goodsExtraMap });
    },
    [FloorPlan.LIST_GOODSDISCOUNT_FLOORPLAN_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsLoading: false, cartLoading: false });
    },
    [FloorPlan.LIST_GOODSDAYSDISCOUNT_FLOORPLAN_PENDING]: (state, action) => {
        return Object.assign({}, state, { goodsLoading: true, cartLoading: true });
    },
    [FloorPlan.LIST_GOODSDAYSDISCOUNT_FLOORPLAN_SUCCESS]: (state, action) => {
        const { goodsDays, goodsDiscounts } = action.payload;
        const local_goodsList = state.local_goodsList.map(goods => {
            const goodsDay = goodsDays.find(item => item.goodsId === goods.id);
            const goodsDiscount = goodsDiscounts.find(item => item.goodsId === goods.id);
            if(goodsDay && goodsDiscount) {
                const discountPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
                const dayPrice = goodsDay.price;
                //以价格最低为准
                goods.calPrice = Math.min(discountPrice, dayPrice);
                //如果价格最低的是特价商品，需要在校验一下特价商品的每桌限点几份
                if(dayPrice < discountPrice) {
                    const new_local_cartList = state.local_cartList.filter(item => item.goodsId == goods.id);
                    let count = 0;
                    new_local_cartList.forEach(cartItem => {
                        count += cartItem.num;
                    })
                    if(count >= goodsDay.limitNum) {
                        goods.disabled = true;
                    }
                    goods.dayName = '特价';
                    goods.limitNum = goodsDay.limitNum;
                } else {
                    goods.discountName = `${goodsDiscount.discountValue}折`;
                    goods.discountValue = goodsDiscount.discountValue;
                }
            } else if(goodsDay) {
                //校验特价商品每桌点限点几份
                const new_local_cartList = state.local_cartList.filter(item => item.goodsId == goods.id);
                let count = 0;
                new_local_cartList.forEach(cartItem => {
                    count += cartItem.num;
                })
                if(count >= goodsDay.limitNum) {
                    goods.disabled = true;
                }
                goods.limitNum = goodsDay.limitNum;
                goods.dayName = '特价';
                goods.calPrice = goodsDay.price;
            } else if(goodsDiscount) {
                goods.discountName = `${goodsDiscount.discountValue}折`;
                goods.calPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
                goods.discountValue = goodsDiscount.discountValue;
            }
            return goods;
        });
        const local_cartList = state.local_cartList.map(cartItem => {
            const goods = local_goodsList.find(goodsItem => goodsItem.id === cartItem.goodsId);            
            if(goods.calPrice) {
                cartItem.dayOrDiscountName = goods.dayName || goods.discountName;
                cartItem.price = goods.calPrice;
            }            
            //如果所勾选的附属属性 特价商品就直接加上加个价格浮动，折扣商品是加上价格浮动 * 折扣率.
            if(cartItem.extraItems) {
                calCartExtraPrice(cartItem, state.goodsExtraMap, goods);
                //如果商品采用的是折扣 附属属性受影响价格要在乘以折扣
                if(goods.discountValue) {
                    cartItem.price = cartItem.price + (goods.discountValue * 10 /100) * cartItem.extraPrice;
                } else {
                    cartItem.price = cartItem.price + cartItem.extraPrice;
                }
            }
            cartItem.origPrice = goods.price + cartItem.extraPrice;//原价
            //小计
            cartItem.itemPrice = cartItem.price * cartItem.num;
            return cartItem;
        });
        return Object.assign({}, state, { goodsLoading: false, cartLoading: false, local_goodsList, local_cartList,
            todayGoodsDays: goodsDays, effectiveGoodsDiscounts: goodsDiscounts });
    },
    [FloorPlan.LIST_GOODSDAYSDISCOUNT_FLOORPLAN_FAILURE]: (state, action) => {
        return Object.assign({}, state, { goodsLoading: false, cartLoading: false });
    },
    [FloorPlan.CLEAR_FLOORPLAN_GOODSDAYDISCOUNT]: (state, action) => {
        const todayGoodsDays = [], effectiveGoodsDiscounts = [];
        return Object.assign({}, state, { todayGoodsDays, effectiveGoodsDiscounts });
    },
    [FloorPlan.UPDATE_SHOPPING_CART]: (state, action) => {
        const cartItem = action.payload;
        const local_cartList = state.local_cartList.map(item => {
            if(item.id === cartItem.id) {
                item.num = cartItem.num;
                item.itemPrice = item.price * item.num;
                item.remark = cartItem.remark;
            }
            return item;
        });
        //特价商品 需要在限制一下每桌点餐份数
        const { todayGoodsDays } = state;
        const local_goodsList = state.local_goodsList.map(goods => {
            if(cartItem.goodsId == goods.id) {
                const goodsDay = todayGoodsDays.find(item => item.goodsId === goods.id);
                if(goodsDay) {//如果是特价商品
                    const carts = state.local_cartList.filter(item => item.goodsId === cartItem.goodsId);
                    let count = 0;
                    carts.forEach(item => { count += item.num });
                    if(count >= goodsDay.limitNum) {
                        goods.disabled = true;
                    } else {
                        goods.disabled = false;
                    }
                }
            }
            return goods;
        });
        return Object.assign({}, state, { local_cartList, local_goodsList });
    },
    [FloorPlan.DELETE_SHOPPING_CART]: (state, action) => {
        const local_cartList = state.local_cartList.filter(item => item.id !== action.payload);
        //特价商品 需要在限制一下每桌点餐份数
        const cartItem = state.local_cartList.find(item => item.id == action.payload);
        const { todayGoodsDays } = state;
        const local_goodsList = state.local_goodsList.map(goods => {            
            if(cartItem.goodsId == goods.id) {
                const goodsDay = todayGoodsDays.find(item => item.goodsId === goods.id);
                if(goodsDay) {//如果是特价商品
                    goods.disabled = false;
                }
            }
            return goods;
        });
        return Object.assign({}, state, { local_cartList, local_goodsList });
    },
    [FloorPlan.CLEAR_SHOPPING_CART]: (state, action) => {
        const { todayGoodsDays } = state;
        const local_goodsList = state.local_goodsList.map(goods => {            
            const goodsDay = todayGoodsDays.find(item => item.goodsId === goods.id);
            if(goodsDay) {//如果是特价商品
                goods.disabled = false;
            }
            return goods;
        });
        return Object.assign({}, state, { local_cartList: [], local_goodsList });
    },
    [FloorPlan.SUBMIT_ORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { submitOrderLoading: true });
    },
    [FloorPlan.SUBMIT_ORDER_SUCCESS]: (state, action) => {
        const cart = action.payload;
        const tableCode = cart.tableCode;
        const orderItemVos = (state.orderListMap[tableCode] && state.orderListMap[tableCode].length > 0 )
            ? state.orderListMap[tableCode][0].orderItemVos : [];
        cart.cartItem.forEach(item => {
            const orderItemVo = {goodsName: item.name, price: item.price, orderItemstatus: 1};
            orderItemVos.push(orderItemVo);
        });
        const orderListMap = {...state.orderListMap, [tableCode]: [{orderItemVos}]}
        return Object.assign({}, state, { submitOrderLoading: false, orderListMap });
    },
    [FloorPlan.SUBMIT_ORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { submitOrderLoading: false });
    },
    [FloorPlan.HANDLE_ORDER_DETAIL_VISIBLE]: (state, action) => {
        return Object.assign({}, state, { orderDetailVisible: !!action.payload });
    },
    [FloorPlan.LIST_NOCOMPLETE_ORDER_BY_TABLECODE_PENDING]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: true });
    },
    [FloorPlan.LIST_NOCOMPLETE_ORDER_BY_TABLECODE_SUCCESS]: (state, action) => {        
        const { tableCode, data } = action.payload;
        const { orderVos, subtractVoMap, couponConsumeMap, payAmount } = data;
        if(orderVos.length > 0) {
            _.keys(subtractVoMap).forEach(orderNo => {
                let subtractList = subtractVoMap[orderNo].map(subtract => {
                    subtract.checked = true;
                    return subtract;
                });
                subtractVoMap[orderNo] = subtractList;
            });
            const orderListMap = {...state.orderListMap, [tableCode]: orderVos};
            return Object.assign({}, state, { orderListLoading: false, orderListMap, orderList: orderVos, subtractMap: subtractVoMap, couponConsumeMap, payAmount,
                receivedAmount: _.clone(payAmount) });
        } else {
            return Object.assign({}, state, { orderListLoading: false, orderList: orderVos, subtractMap: {}, couponConsumeMap: {}, payAmount, 
                receivedAmount: _.clone(payAmount)});
        }
    },
    [FloorPlan.LIST_NOCOMPLETE_ORDER_BY_TABLECODE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: false, orderList: [], subtractMap: {}, couponConsumeMap: {}, payAmount: 0, receivedAmount: 0 });
    },
    [FloorPlan.DISPATCH_QRCODE]: (state, action) => {
        return Object.assign({}, state, { qrcodeData: action.payload });
    },
    [FloorPlan.ORDERDETAIL_CANCEL_ORDERITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: true });
    },
    //退单操作
    [FloorPlan.ORDERDETAIL_CANCEL_ORDERITEM_SUCCESS]: (state, action) => {
        const { id, orderNo, tableCode } = action.payload;
        //订单
        let allTotalPrice = 0; //当前桌台所有订单总价
        const orderList = state.orderList.map(order => {
            let orderItemPrice = 0;
            const orderItems = order.orderItemVos.map(orderItem => {
                if(orderItem.id === id) {
                    orderItem.orderItemStatus = 9;//取消订单项状态
                    orderItemPrice = orderItem.price;
                }
                return orderItem;
            });
            order.orderItemVos = orderItems;
            order.totalPrice -= orderItemPrice;
            allTotalPrice += order.totalPrice;
            return order;
        });
        //当价格变化时,校验是否满足优惠规则
        const subtractList = state.subtractMap[orderNo].filter(subtract => {
            if(subtract.constraintType == 1) {//消费满多少规则
                if(allTotalPrice >= subtract.consumePrice) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        });
        let payAmount = allTotalPrice;//实收
        subtractList && subtractList.forEach(subtract => {
            if(subtract.type === 1) {//具体减免金额
                if(subtract.checked) {
                    payAmount -= subtract.amount1;
                }
            } else if(subtract.type === 2) {//折扣率
                if(subtract.checked) {
                    payAmount = (subtract.discount * 10 /100) * payAmount;
                }
            }
        });
        //现金消费券
        state.couponConsumeMap[orderNo].forEach(coupon => {
            payAmount -= coupon.couponPrice;
        });
        //如果是异常单 还需要 减去异常单已支付金额
        payAmount -= state.orderList[0].exceptionPrice;
        const orderItemVos = state.orderListMap[tableCode][0].orderItemVos;
        const new_orderItemVos = orderItemVos.filter(item => item.id !== id);
        const new_orderListMap = _.cloneDeep(state.orderListMap);
        new_orderListMap[tableCode][0].orderItemVos = new_orderItemVos;
        const subtractMap = {...state.subtractMap, [orderNo]: subtractList};
        return Object.assign({}, state, { orderListLoading: false, orderList, subtractMap, orderListMap: new_orderListMap, 
            payAmount: payAmount, receivedAmount: _.clone(payAmount) });
    },
    [FloorPlan.ORDERDETAIL_CANCEL_ORDERITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: false });
    },
    //删除订单项操作
    [FloorPlan.ORDERDETAIL_DELETE_ORDERITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: true });
    },
    [FloorPlan.ORDERDETAIL_DELETE_ORDERITEM_SUCCESS]: (state, action) => {
        const { id, orderNo } = action.payload;
        const orderList = state.orderList.map(order => {
            const orderItems = order.orderItemVos.filter(orderItem => orderItem.id !== id);
            order.orderItemVos = orderItems;
            return order;
        });
        return Object.assign({}, state, { orderListLoading: false, orderList });
    },
    [FloorPlan.ORDERDETAIL_DELETE_ORDERITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: false });
    },
    //标记为已出菜
    [FloorPlan.ORDERDETAIL_SHIPPED_ORDERITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: true });
    },
    [FloorPlan.ORDERDETAIL_SHIPPED_ORDERITEM_SUCCESS]: (state, action) => {
        const { id, orderNo } = action.payload;
        const orderList = state.orderList.map(order => {
            const orderItems = order.orderItemVos.map(orderItem => {
                if(orderItem.id === id) {
                    orderItem.orderItemStatus = '4';//已出菜订单项状态
                }
                return orderItem;
            });
            order.orderItemVos = orderItems;
            return order;
        });
        return Object.assign({}, state, { orderListLoading: false, orderList });
    },
    [FloorPlan.ORDERDETAIL_SHIPPED_ORDERITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: false });
    },
    //标记为已上菜
    [FloorPlan.ORDERDETAIL_RECEIVE_ORDERITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: true });
    },
    [FloorPlan.ORDERDETAIL_RECEIVE_ORDERITEM_SUCCESS]: (state, action) => {
        const { id, orderNo } = action.payload;
        const orderList = state.orderList.map(order => {
            const orderItems = order.orderItemVos.map(orderItem => {
                if(orderItem.id === id) {
                    orderItem.orderItemStatus = '12';//已出菜订单项状态
                }
                return orderItem;
            });
            order.orderItemVos = orderItems;
            return order;
        });
        return Object.assign({}, state, { orderListLoading: false, orderList });
    },
    [FloorPlan.ORDERDETAIL_RECEIVE_ORDERITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, { orderListLoading: false });
    },
    [FloorPlan.ORDERDETAIL_SUBTRACT_ON_CHANGE]: (state, action) => {
        const { subtractId, orderNo, checked } = action.payload;
        let payAmount = parseFloat(state.payAmount);
        state.subtractMap[orderNo].forEach(subtract => {
            if(subtract.id === subtractId) {
                subtract.checked = checked;
                if(subtract.type === 1) {//具体减免金额
                    if(checked) {
                        payAmount -= parseFloat(subtract.amount1);
                    } else {
                        payAmount += parseFloat(subtract.amount1);
                    }                    
                } else if(subtract.type === 2) {//折扣率
                    if(checked) {
                        payAmount = (subtract.discount * 10 /100) * payAmount;
                    } else {
                        payAmount = payAmount / (subtract.discount * 10 /100);
                    }
                }
            }
        });
        return Object.assign({}, state, { payAmount, receivedAmount: _.clone(payAmount) });
    },
    //查询一次支付宝支付结果
    [FloorPlan.SYNC_ALIPAY_ORDER_STATUS_PENDING]: (state, action) => {
        return Object.assign({}, state, { syncAlipayResultLoading: true, payOrderLoading: true, });
    },
    [FloorPlan.SYNC_ALIPAY_ORDER_STATUS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { syncAlipayResultLoading: false, payOrderLoading: false, });
    },
    [FloorPlan.SYNC_ALIPAY_ORDER_STATUS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { syncAlipayResultLoading: false, payOrderLoading: false, });
    },
    //查询一次微信支付结果
    [FloorPlan.SYNC_WXPAY_ORDER_STATUS_PENDING]: (state, action) => {
        return Object.assign({}, state, { syncWxpayResultLoading: true, payOrderLoading: true, });
    },
    [FloorPlan.SYNC_WXPAY_ORDER_STATUS_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { syncWxpayResultLoading: false, payOrderLoading: false, });
    },
    [FloorPlan.SYNC_WXPAY_ORDER_STATUS_FAILURE]: (state, action) => {
        return Object.assign({}, state, { syncWxpayResultLoading: false, payOrderLoading: false, });
    },
    [FloorPlan.SAVE_COUPONCONSUME_PENDING]: (state, action) => {
        return Object.assign({}, state, { saveCouponConsumeLoading: true });
    },
    //消费现金券
    [FloorPlan.FILTER_CURR_COUPONCONCUME]:  (state, action) => {
        const orderNo = action.payload;
        const currCouponConsumes = state.couponConsumeMap[orderNo];
        return Object.assign({}, state, { currCouponConsumes });
    },
    [FloorPlan.SAVE_COUPONCONSUME_SUCCESS]: (state, action) => {
        const couponObj = action.payload;
        const currCouponConsumes = [...state.couponConsumeMap[couponObj.orderNo], couponObj];
        const new_couponConsumeMap = {...state.couponConsumeMap, [couponObj.orderNo]: currCouponConsumes};
        const new_payAmount = parseFloat(state.payAmount) - parseFloat(couponObj.couponPrice);
        // let subtractMap_bak = {};//先备份一下.在删除现金券时用到
        // let subtractMap = {};
        // if(state.enabledSET == "0") {
        //     subtractMap_bak[couponObj.orderNo] = state.subtractMap[couponObj.orderNo];
        //     subtractMap = {...state.subtractMap, [couponObj.orderNo]: []};
        // }
        return Object.assign({}, state, { saveCouponConsumeLoading: false, couponConsumeMap: new_couponConsumeMap, currCouponConsumes, 
            payAmount: new_payAmount, receivedAmount: _.clone(new_payAmount) });
    },
    [FloorPlan.SAVE_COUPONCONSUME_FAILURE]: (state, action) => {
        return Object.assign({}, state, { saveCouponConsumeLoading: false });
    },
    [FloorPlan.DELETE_COUPONCONSUME_PENDING]: (state, action) => {
        return Object.assign({}, state, { deleteCouponConsumeLoading: true });
    },
    [FloorPlan.DELETE_COUPONCONSUME_SUCCESS]: (state, action) => {
        const couponConsumeId = action.payload;
        const delCouponObj = state.currCouponConsumes.find((item) => item.id === couponConsumeId);
        const new_payAmount = parseFloat(state.payAmount) + parseFloat(delCouponObj.couponPrice);
        const new_couponConsumes = state.currCouponConsumes.filter((item) => item.id !== couponConsumeId);
        const new_couponConsumeMap = {...state.couponConsumeMap, [delCouponObj.orderNo]: new_couponConsumes}; 
        // //已经完全删除了现金券,恢复优惠与折扣
        // let subtractMap = {};
        // if(new_couponConsumes.length === 0) {
        //     const old_subtractMap = state.subtractMap_bak[delCouponObj.orderNo];
        //     subtractMap = {...state.subtractMap, [delCouponObj.orderNo]: [...old_subtractMap]};
        // }
        return Object.assign({}, state, { deleteCouponConsumeLoading: false, couponConsumeMap: new_couponConsumeMap, 
            currCouponConsumes: new_couponConsumes, payAmount: new_payAmount, receivedAmount: _.clone(new_payAmount) });
    },
    [FloorPlan.DELETE_COUPONCONSUME_FAILURE]: (state, action) => {
        return Object.assign({}, state, { deleteCouponConsumeLoading: false });
    },
    [FloorPlan.LIST_OTHERTABLES_PENDING]: (state, action) => {
        return Object.assign({}, state, { listOtherTablesLoading: true });
    },
    [FloorPlan.LIST_OTHERTABLES_SUCCESS]: (state, action) => {
        const unGroupOtherTables = action.payload;
        const filterOtherTables = unGroupOtherTables.filter(item => {
            return item.merged;
        })
        const defaultValue =[];
        filterOtherTables.forEach(item => {
            defaultValue.push(`${item.tableCode}`);
        })
        //按floorId分下组
        const floors = [];
        unGroupOtherTables.forEach(item => {
            if(!floors.find(floor => floor.id === item.floorId)) {
                floors.push({id: item.floorId, name: item.floorName, tables: []});
            }
        });
        unGroupOtherTables.forEach(item => {
            const floor = floors.find(floor => floor.id === item.floorId);
            floor.tables.push(item);
        });        
        return Object.assign({}, state, { listOtherTablesLoading: false, otherTables: floors, selectedOtherTables: defaultValue });
    },
    [FloorPlan.LIST_OTHERTABLES_FAILURE]: (state, action) => {
        return Object.assign({}, state, { listOtherTablesLoading: false });
    },
    //合并收银订单
    [FloorPlan.MERGE_ORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { listOtherTablesLoading: true });
    },
    [FloorPlan.MERGE_ORDER_SUCCESS]: (state, action) => {
        const tableCode = action.payload;
        const selectedOtherTables = [...state.selectedOtherTables, tableCode];
        return Object.assign({}, state, { listOtherTablesLoading: false, selectedOtherTables });
    },
    [FloorPlan.MERGE_ORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { listOtherTablesLoading: false });
    },
    //拆分已合并收银订单
    [FloorPlan.FORK_ORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { listOtherTablesLoading: true });
    },
    [FloorPlan.FORK_ORDER_SUCCESS]: (state, action) => {
        const tableCode = action.payload;
        const selectedOtherTables = state.selectedOtherTables.filter(value => value !== tableCode)
        return Object.assign({}, state, { listOtherTablesLoading: false, selectedOtherTables });
    },
    [FloorPlan.FORK_ORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { listOtherTablesLoading: false });
    },
    //处理服务端发送支付成功消息
    [FloorPlan.HANDLE_PAYSUCCESS_MSG]: (state, action) => {
        const tableCodes = action.payload;
        const orderList = state.orderList.map(item => {
            const tableCodeObj = tableCodes.find(tableCode => tableCode == item.tableCode);
            if(tableCodeObj) {
                item.orderStatus = '3';
                item.orderStatusName = '已支付';
            }
            return item;
        });
        if(state.orderListLoading === false) {
            return Object.assign({}, state, {orderList });
        } else {
            return Object.assign({}, state, {});
        }
    },
    //收银操作
    [FloorPlan.ORDER_GATHERING_PENDING]: (state, action) => {
        return Object.assign({}, state, { gatheringLoading: true });
    },
    [FloorPlan.ORDER_GATHERING_SUCCESS]: (state, action) => {
        const orderNo = action.payload;
        const orderList = state.orderList.map(item => {
            item.orderStatus = '3';
            item.orderStatusName = '已支付';
            return item;
        });
        return Object.assign({}, state, {gatheringLoading: false, orderList });
    },
    [FloorPlan.ORDER_GATHERING_FAILURE]: (state, action) => {
        return Object.assign({}, state, { gatheringLoading: false });
    },
    //确认用餐人数
    [FloorPlan.ON_DINERSFORM_FIELD_CHANGE]: (state, action) => {
        const { tableCode, values } = action.payload;
        const dinersFormData = {...state.dinersFormData, ...values};
        const dinersNumMap = {...state.dinersNumMap, [tableCode]: dinersFormData.dinersNum.value};
        return Object.assign({}, state, { dinersFormData, dinersNumMap });
    },
    [FloorPlan.ON_DINERSFORM_FIELD_RESET]: (state, action) => {
        const tableCode = action.payload;
        const dinersFormData = {dinersNum: {value: state.dinersNumMap[tableCode]}}; //用餐人数formdata
        return Object.assign({}, state, { dinersFormData });
    },
    //实收金额change事件
    [FloorPlan.ON_RECEVIEDAMOUNT_CHANGE]: (state, action) => {
        const receivedAmount = action.payload;
        return Object.assign({}, state, { receivedAmount });
    },
    //[减免或折扣]与现金券是否可以同时享受
    /*[FloorPlan.SELECT_ESCT_VALUE]: (state, action) => {
        return Object.assign({}, state, { enabledSET: action.payload });
    },*/
    //加载前台扫码支付订单
    [FloorPlan.LIST_PAYORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { payOrderLoading: true });
    },
    [FloorPlan.LIST_PAYORDER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { payOrderLoading: false, payOrderList: action.payload });
    },
    [FloorPlan.LIST_PAYORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { payOrderLoading: false });
    },
    //删除前台扫码未支付的订单
    [FloorPlan.DELETE_PAYORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { payOrderLoading: true });
    },
    [FloorPlan.DELETE_PAYORDER_SUCCESS]: (state, action) => {
        const id = action.payload;
        const payOrderList = state.payOrderList.filter(item => item.id !== id);
        return Object.assign({}, state, { payOrderLoading: false, payOrderList });
    },
    [FloorPlan.DELETE_PAYORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { payOrderLoading: false });
    },
    //关联支付单收银
    [FloorPlan.RELATE_FRONTORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { relateFrontOrderLoading: true });
    },
    [FloorPlan.RELATE_FRONTORDER_SUCCESS]: (state, action) => {
        const { orderNo, payOrderIds } = action.payload;
        const orderList = state.orderList.map(item => {
            item.orderStatus = '3';
            item.orderStatusName = '已支付';
            return item;
        });
        const payOrderList = state.payOrderList.filter(item => {
            return payOrderIds.find(id => id === item.id) ? true : false;
        });
        return Object.assign({}, state, { relateFrontOrderLoading: false, orderList, payOrderList });
    },
    [FloorPlan.RELATE_FRONTORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { relateFrontOrderLoading: false });
    },
    //完成订单
    [FloorPlan.FINISHED_ORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { finishedOrderLoading: true });
    },
    [FloorPlan.FINISHED_ORDER_SUCCESS]: (state, action) => {
        const {orderNo, tableCode, tableCodes} = action.payload;
        if(tableCodes) {
            const orderList = [];
            let tablesOrderMap = {};
            tableCodes.forEach(item => {
                tablesOrderMap[item] = [];
            });
            const orderListMap = {...state.orderListMap, ...tablesOrderMap};
            return Object.assign({}, state, { finishedOrderLoading: false, orderList, orderListMap });
        } else {
            const orderList = [];
            const orderListMap = {...state.orderListMap, [tableCode]: orderList};
            return Object.assign({}, state, { finishedOrderLoading: false, orderList, orderListMap });
        }        
    },
    [FloorPlan.FINISHED_ORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { finishedOrderLoading: false });
    },
    //桌台状态
    [FloorPlan.FLOORPLAN_DISPATCH_TABLESTATUS]: (state, action) => {
        return Object.assign({}, state, { allTableStatus: action.payload });
    }, 
    //修改桌台状态
    [FloorPlan.FLOORPLAN_CHANGE_TABLESTATUS]: (state, action) => {
        const {tableCode, status} = action.payload;
        const allTableStatus = state.allTableStatus.map(item => {
            if(item.tableCode == tableCode) {
                item.status = status;
            }
            return item;
        });
        return Object.assign({}, state, { allTableStatus });
    }, 
    //复制其它桌台订单下单
    [FloorPlan.COPY_ORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, { copyOrderLoading: true });
    },
    [FloorPlan.COPY_ORDER_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { copyOrderLoading: false });
    },
    [FloorPlan.COPY_ORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, { copyOrderLoading: false });
    },
    //会员消费(查询会员信息)
    [FloorPlan.SELECT_MEMBERDETAIL_FLOORPLAN_PENDING]: (state, action) => {
        return Object.assign({}, state, {selectMemberInfoLoading: true});
    },
    [FloorPlan.SELECT_MEMBERDETAIL_FLOORPLAN_SUCCESS]: (state, action) => {
        const { memberUser, memberAccount } = action.payload;
        const memberInfo = {phone: {value: memberUser.phone}, name: {value: memberUser.name}, birthday: {value: memberUser.birthday ? moment(memberUser.birthday, "YYYY-MM-DD").format('MMM Do') : memberUser.birthday}, 
            registerTime: {value: memberUser.registerTime}, rank: {value: memberUser.rank}, 
            accountBalance: {value: numeral(memberAccount.accountBalance).format("0,0.00")}};
        let memberBtnIsDisabled = false;
        if(state.payAmount > memberAccount.accountBalance) {
            memberBtnIsDisabled = true;
        }
        return Object.assign({}, state, {selectMemberInfoLoading: false, memberInfo, memberBtnIsDisabled});
    },
    [FloorPlan.SELECT_MEMBERDETAIL_FLOORPLAN_FAILURE]: (state, action) => {
        return Object.assign({}, state, {selectMemberInfoLoading: false});
    },
    //重置会员信息
    [FloorPlan.FLOORPLAN_RESET_MEMBERINFO]: (state, action) => {
        const memberInfo = initialState.memberInfo;
        return Object.assign({}, state, {memberInfo, memberBtnIsDisabled: true});
    },
    //会员消费
    [FloorPlan.MEMBER_CONSUME_PENDING]: (state, action) => {
        return Object.assign({}, state, { memberComsumeLoading: true });
    },
    [FloorPlan.MEMBER_CONSUME_SUCCESS]: (state, action) => {
        const orderNo = action.payload;
        const orderList = state.orderList.map(item => {
            item.orderStatus = '3';
            item.orderStatusName = '已支付';
            return item;
        });
        return Object.assign({}, state, { memberComsumeLoading: false, orderList });
    },
    [FloorPlan.MEMBER_CONSUME_FAILURE]: (state, action) => {
        return Object.assign({}, state, { memberComsumeLoading: false });
    },
    //获取短信动态密码
    [FloorPlan.GET_MEMBER_CONSUME_CODE_PENDING]: (state, action) => {
        return Object.assign({}, state, { phoneCodeLoading: true });
    },
    [FloorPlan.GET_MEMBER_CONSUME_CODE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { phoneCodeLoading: false, countDown: 60 });
    },
    [FloorPlan.GET_MEMBER_CONSUME_CODE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { phoneCodeLoading: false });
    },
    //倒计时
    [FloorPlan.FLOORPLAN_MEMBER_CONSUME_COUNTDOWN]: (state, action) => {
        return Object.assign({}, state, { countDown: --state.countDown });
    },
    //补打小票
    [FloorPlan.SELECT_ORDER_BYTABLECODE_PENDING]: (state, action) => {
        return Object.assign({}, state, {selectOrderLoading: true});
    },
    [FloorPlan.SELECT_ORDER_BYTABLECODE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, {selectOrderLoading: false});
    },
    [FloorPlan.SELECT_ORDER_BYTABLECODE_FAILURE]: (state, action) => {
        return Object.assign({}, state, {selectOrderLoading: false});
    },
    //确认订单
    [FloorPlan.CONFIRM_ORDER_PENDING]: (state, action) => {
        return Object.assign({}, state, {confirmOrderLoading: true});
    },
    [FloorPlan.CONFIRM_ORDER_SUCCESS]: (state, action) => {
        const orderNo = action.payload;
        const orderList = state.orderList.map(item => {
            if(item.orderNo == orderNo) {
                item.orderStatus = '1';
                item.orderStatusName = '待支付';
                item.orderItemVos.map(orderItem => {
                    orderItem.orderItemStatus = '1';
                    return orderItem;
                });
            }
            return item;
        });
        return Object.assign({}, state, {confirmOrderLoading: false, orderList});
    },
    [FloorPlan.CONFIRM_ORDER_FAILURE]: (state, action) => {
        return Object.assign({}, state, {confirmOrderLoading: false});
    },
    //确认订单项
    [FloorPlan.CONFIRM_ORDERITEM_PENDING]: (state, action) => {
        return Object.assign({}, state, {confirmOrderItemLoading: true});
    },
    [FloorPlan.CONFIRM_ORDERITEM_SUCCESS]: (state, action) => {
        const {orderNo, orderItemId, result} = action.payload;
        const orderList = state.orderList.map(order => {
            if(order.orderNo == orderNo) {
                order.orderItemVos.map(orderItem => {
                    if(orderItem.id == orderItemId) {
                        orderItem.orderItemStatus = '1';
                    }
                    return orderItem;
                });
                if(result == 0) {
                    order.orderStatus = '1';
                    order.orderStatusName = '待支付';
                }
            }
            return order;
        });
        return Object.assign({}, state, {confirmOrderItemLoading: false, orderList});
    },
    [FloorPlan.CONFIRM_ORDERITEM_FAILURE]: (state, action) => {
        return Object.assign({}, state, {confirmOrderItemLoading: false});
    },
    // 修改订单项的后厨打印状态
    [FloorPlan.UPDATE_PRINTSTATUS_SUCCESS]: (state, action) => {
        const orderItemIds = action.payload;
        const orderList = state.orderList.map(order => {
            order.orderItemVos.map(orderItem => {
                const found = orderItemIds.find(itemId => itemId == orderItem.id);
                if(found) {
                    orderItem.printStatus = 1;
                }
                return orderItem;
            });
            return order;
        });
        return Object.assign({}, state, { orderList});
    },
    // 支付窗口formdata的change
    [FloorPlan.ON_PAYMENTFORMDATA_FIELDS_CHANGE]: (state, action) => {
        const paymentFormData = {...state.paymentFormData, ...action.payload};
        return Object.assign({}, state, { paymentFormData });
    },
    [FloorPlan.ON_PAYMENTFORMDATA_FIELDS_RESET]: (state, action) => {
        const paymentFormData = {...state.paymentFormData, payMethod: {value: 5}};
        return Object.assign({}, state, { paymentFormData });
    },
    //换台
    [FloorPlan.CHANGE_TABLECODE_PENDING]: (state, action) => {
        return Object.assign({}, state, { changeTableLoading: true });
    },
    [FloorPlan.CHANGE_TABLECODE_SUCCESS]: (state, action) => {
        return Object.assign({}, state, { changeTableLoading: false });
    },
    [FloorPlan.CHANGE_TABLECODE_FAILURE]: (state, action) => {
        return Object.assign({}, state, { changeTableLoading: false });
    },
    //查询多个商品的附属属性socket查询
    [FloorPlan.DISPATCH_GOODSEXTRAS_SUCCESS]: (state, action) => {
        const goodsExtraMap = action.payload;
        const new_goodsExtraMap = {...state.goodsExtraMap, ...goodsExtraMap};
        //计算购物车总价
        return Object.assign({}, state, {goodsExtraMap: new_goodsExtraMap});
    },
}

export default createReducers(initialState, floorPlanHandler);