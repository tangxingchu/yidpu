import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import numeral from 'numeral';

import Button from 'antd-mobile/lib/button';
import WingBlank from 'antd-mobile/lib/wing-blank';
import WhiteSpace from 'antd-mobile/lib/white-space';
import ListView from 'antd-mobile/lib/list-view';
import Grid from 'antd-mobile/lib/grid';
import Card from 'antd-mobile/lib/card';
import Modal from 'antd-mobile/lib/modal';
import Checkbox from 'antd-mobile/lib/checkbox';
import TextareaItem from 'antd-mobile/lib/textarea-item';
import Badge from 'antd-mobile/lib/badge';
import NoticeBar from 'antd-mobile/lib/notice-bar';

import 'antd-mobile/lib/list-view/style';
import 'antd-mobile/lib/button/style'; //less
import 'antd-mobile/lib/white-space/style'; //less
import 'antd-mobile/lib/wing-blank/style'; //less
import 'antd-mobile/lib/grid/style'; //less
import 'antd-mobile/lib/card/style';
import 'antd-mobile/lib/modal/style';
import 'antd-mobile/lib/checkbox/style';
import 'antd-mobile/lib/textarea-item/style';
import 'antd-mobile/lib/badge/style';
import 'antd-mobile/lib/notice-bar/style';

import { staticHost } from '../utils/config';
import parseUrl from '../utils';
import services from '../services';
import addPng from '../images/add.png';
import removePng from '../images/remove.png';
import closePng from '../images/close.png';
import styles from './index.less';

const width = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;
const CheckboxItem = Checkbox.CheckboxItem;

const GoodsCategoryBody = (props) => {
    return (
        <div >
            {props.children}
        </div>
    );
}

const GoodsBody = (props) => {
    return (
        <div className="am-list-body my-body">
            {props.children}
        </div>
    );
}

//计算附属属性影响的价格波动
const calCartExtraPrice = (cartItem, extraList) => {
    const extraItemNames = [];
    cartItem.extraPrice = 0;
    cartItem.extraItems.map(extraItem => {
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

class PlaceOrder extends React.Component {

    constructor(props) {
        super(props);
        const params = parseUrl();
        this.tableCode = params.tableCode;
        this.merchantId = params.merchantId;
        this.buyerId = params.buyerId || "";
        this.openid = params.openid || "";
        this.merchantProperty = params.merchantProperty;
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const goodsDataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            curr_item: 1,//默认1个人
            type: 1,//1是点餐，2是加菜
            selectedRootCate: 0,
            goodsCategories: [],//商品分类
            goodsList: [],//商品列表
            local_cartList: [],//购物车列表
            goodsLoading: true,
            dataSource,
            goodsDataSource,
            height: clientHeight,
            todayGoodsDays: [],
            effectiveGoodsDiscounts: [],
            goodsSubtracts: [],
            currentSubtracts: [],
            extraModalVisible: false,
            cancelCartItemModalVisible: false,
            generalRemark: [{id: 1, value: "不要辣"}, {id: 2, value: "加辣"}, {id: 3, value: "少盐"}, {id: 4, value: "少油"}, {id: 5, value: "少味精"}],
            remarkText: '',//其他备注信息
            cancelGoodsId: null,
            currGoodsDefaultUrl: null,
        }
    }

    componentDidMount() {
        window.onresize = () => {
            const clientHeight = document.documentElement.clientHeight;
            this.setState({height: clientHeight});
        }
        const params = parseUrl();
        const type = params.type;
        const local_cartList_str = window.localStorage.getItem(`local_cartList_${params.merchantId}`);
        const local_cartList = local_cartList_str ? JSON.parse(local_cartList_str) : null;
        this.setState({type, local_cartList: local_cartList ? local_cartList : []});
        if(type == 2) {
            this.listGoodsCategoryAndGoods();
        }
        //微信扫码并且是快餐厅
        if(this.openid && this.merchantProperty == 1) {
            const url = encodeURIComponent(location.href.split('#')[0]);
            services.wxConfig(url);
        }
    }

    onGridClick = (object, index) => {
        this.setState({curr_item: object});
    }

    listGoodsCategoryAndGoods = () => {
        services.listGoodsCategoryAndGoods().then(data => {
            const goodsCategories = data.goodsCategories || [];
            const goodsList = data.goodses || [];
            const goodsDays = data.goodsDays || [];
            const goodsSubtracts = data.goodsSubtracts || [];
            const effectiveGoodsDiscounts = data.goodsDiscounts || [];
            if(goodsCategories.length > 0) {
                let tempArr = [];
                let defaultGoodsCategoryId = goodsCategories[0].id;
                goodsList.forEach(goods => {
                    if (goods.category == defaultGoodsCategoryId) {
                        tempArr.push(goods);
                    }
                });
                let noticeStr = "";
                if(goodsSubtracts && goodsSubtracts.length > 0) {
                    for(let i = 0; i < goodsSubtracts.length; i++) {
                        const subtract = goodsSubtracts[i];
                        if(subtract.constraintType == 2) {
                            noticeStr += `每天${subtract.constraintTimeStart}-${subtract.constraintTimeEnd},`;
                        } else {
                            noticeStr += `消费满￥${numeral(subtract.consumePrice).format('0,0')},`;
                        }
                        if(subtract.type == 3) {
                            noticeStr += `赠现金券￥${numeral(subtract.amount2).format('0,0')}元。`;
                        } else if(subtract.type == 2) {
                            noticeStr += `享${subtract.discount}折优惠。`
                        } else {
                            noticeStr += `减￥${numeral(subtract.amount1).format('0,0')}元。`
                        }
                    }
                }
                this.setState({selectedRootCate: defaultGoodsCategoryId, 
                    dataSource: this.state.dataSource.cloneWithRows(goodsCategories), 
                    goodsList, goodsCategories, todayGoodsDays: goodsDays, effectiveGoodsDiscounts,
                    goodsDataSource: this.state.goodsDataSource.cloneWithRows(tempArr),
                    noticeStr, goodsSubtracts,
                    goodsLoading: false});
            }
        });
    }

    confirm = () => {
        this.setState({type: 2});
        this.listGoodsCategoryAndGoods();
    }

    onCategoryItemClick = (item) => {
        let tempArr = [];
        const { goodsCategories, goodsList } = this.state;
        if (goodsCategories && goodsCategories.length > 0) {
            goodsList.forEach(goods => {
                if (goods.category == item.id) {
                    tempArr.push(goods);
                }
            });
        }
        this.setState({selectedRootCate: item.id, goodsDataSource: this.state.goodsDataSource.cloneWithRows(tempArr)});
    }

    renderCategoryItem = item => {
        const categoryName = item.categoryName;
        const { selectedRootCate } = this.state;
        return (
            <div key={item.id}
                className={`${selectedRootCate !== item.id ? styles.categoryItem : `${styles.categoryItem} ${styles.currCategoryItem}`}`}
                onClick={() => this.onCategoryItemClick(item)}
            >
                {categoryName}
            </div>
        )
    }

    renderCategory() {
        const { dataSource } = this.state;
        return (
            <ListView
                style={{ backgroundColor: '#fff', width: 110, height: '100%', overflow: 'auto' }}
                className={styles.category}
                dataSource={dataSource}
                renderSeparator={(sectionID, rowID) => <div key={`${sectionID}-${rowID}`} style={{ height: 1, backgroundColor: '#F5F5F5' }} />}
                renderRow={this.renderCategoryItem}
                initialListSize={20}
                renderBodyComponent={() => <GoodsCategoryBody/>}
            >
            </ListView>
        )
    }

    listGoodsExtraByGoodsId = (goods) => {
        const goodsId = goods.id;
        this.goodsId = goodsId;
        const { todayGoodsDays, effectiveGoodsDiscounts, local_cartList = [] } = this.state;
        //看看是否是特价菜, 因为特价菜限制份数
        let todayGoodsDay = todayGoodsDays.find(goodsDayItem => goodsDayItem.goodsId === goodsId);
        let goodsDiscount = effectiveGoodsDiscounts.find(goodsDiscountItem => goodsDiscountItem.goodsId === goods.id);
        //如果一个商品又是特价，又有折扣
        //特价商品价格大于折扣商品价格, 那特价商品就设置成null
        if(todayGoodsDay && goodsDiscount) {
            const discountPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
            const goodsDayPrice = todayGoodsDay.price;
            if(goodsDayPrice > discountPrice) {
                todayGoodsDay = null;
            } else {
                goodsDiscount = null;
            }
        }
        if(todayGoodsDay) {
            let cartNum = 0;
            local_cartList.forEach(cartItem => {
                if(cartItem.goodsId == todayGoodsDay.goodsId) {
                    cartNum += cartItem.num;
                }
            });
            if(cartNum >= todayGoodsDay.limitNum) {
                Modal.alert(
                    '提示',
                    `该特价商品每单只允许点${todayGoodsDay.limitNum}${goods.unitName}`,
                    [
                      {text: '确认'},
                    ],
                )
                return;
            }
        }
        this.setState({extraModalVisible: true});
    }

    renderNameAndPrice = (goods) => {
        const { todayGoodsDays, effectiveGoodsDiscounts } = this.state;
        let todayGoodsDay = todayGoodsDays.find(goodsDayItem => goodsDayItem.goodsId === goods.id);
        let goodsDiscount = effectiveGoodsDiscounts.find(goodsDiscountItem => goodsDiscountItem.goodsId === goods.id);
        //如果一个商品又是特价，又有折扣
        //特价商品价格大于折扣商品价格, 那特价商品就设置成null
        if(todayGoodsDay && goodsDiscount) {
            const discountPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
            const goodsDayPrice = todayGoodsDay.price;
            if(goodsDayPrice > discountPrice) {
                todayGoodsDay = null;
            } else {
                goodsDiscount = null;
            }
        }
        if(todayGoodsDay) {
            return (
                <Fragment>
                    <div>
                        <label style={{fontSize: 14, paddingTop: 10,  color: '#ff4242' }}>{goods.name}(特价)</label>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>                                
                        <label style={{color: '#FFAC38', textDecorationLine: 'line-through'}}>￥{numeral(goods.price).format('0,0.00')}({goods.unitName})</label>
                        <label style={{color: '#ff4242', marginRight: 8}}>￥{numeral(todayGoodsDay.price).format('0,0.00')}({goods.unitName})</label>
                    </div>
                </Fragment>
            )
        } else if(goodsDiscount) {
            const discountPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
            return (
                <Fragment>
                    <div>
                        <label style={{fontSize: 14, paddingTop: 10,  color: '#ff4242' }}>{goods.name}({goodsDiscount.discountValue}折)</label>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <label style={{color: '#FFAC38', textDecorationLine: 'line-through'}}>￥{numeral(goods.price).format('0,0.00')}({goods.unitName})</label>
                        <label style={{color: '#ff4242', marginRight: 8}}>￥{numeral(discountPrice).format('0,0.00')}({goods.unitName})</label>
                    </div>                    
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div>
                        <label style={{fontSize: 14, paddingTop: 10, }}>{goods.name}</label>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <label style={{color: '#FFAC38'}}>￥{numeral(goods.price).format('0,0.00')}({goods.unitName})</label>
                    </div>
                </Fragment>
            )
        }
    }

    //显示商品下单数量
    renderGoodsNum = (goods) => {
        const { local_cartList } = this.state;
        let num = 0;
        local_cartList.forEach(cart => {
            if(cart.goodsId === goods.id) {
                num += cart.num;
            }
        });
        return num;
    }

    //取消购物车商品
    subGoods = (goods) => {
        const { local_cartList } = this.state;
        const new_local_cartList = local_cartList.filter(cartItem => {
            return cartItem.goodsId == goods.id && cartItem.tableCode == this.tableCode;
        });
        this.goodsId = goods.id;
        if(new_local_cartList.length <= 0) {//已经是0 不需要在减
            return;
        } else {
            if(new_local_cartList.length > 1) {//表示点了几份，只是勾选的商品附属属性不一样
                //弹出一个modal让选择取消哪一份
                this.setState({cancelCartItemModalVisible: true, cancelGoodsId: goods.id});
            } else {//商品也点了几份， 附属属性是一样的，
                //数量--
                const n_cartItem = new_local_cartList[0];
                n_cartItem.num -= 1;
                if(n_cartItem.num > 0) {
                    const n_local_cartList = local_cartList.map(cartItem => {
                        if(cartItem.id == n_cartItem.id) {
                            cartItem.num = n_cartItem.num;
                        }
                        return cartItem;
                    });
                    this.setState({local_cartList: n_local_cartList});
                    window.localStorage.setItem(`local_cartList_${this.merchantId}`, JSON.stringify(n_local_cartList));
                } else {
                    const n_local_cartList = local_cartList.filter(cartItem => {
                        return cartItem.id !== n_cartItem.id;
                    });
                    this.setState({local_cartList: n_local_cartList});
                    window.localStorage.setItem(`local_cartList_${this.merchantId}`, JSON.stringify(n_local_cartList));
                }
            }
        }
    }

    subGoods2 = (cartItemId) => {
        const { local_cartList } = this.state;
        const n_local_cartList = local_cartList.filter(cartItem => {
            return cartItem.id !== cartItemId;
        });
        this.setState({local_cartList: n_local_cartList}); 
        window.localStorage.setItem(`local_cartList_${this.merchantId}`, JSON.stringify(n_local_cartList));
        services.listCurrentSubtract(numeral(this.calTotalPriceUnSubtract(n_local_cartList)).format("0.00")).then((data) => {
            this.setState({currentSubtracts: data});
        })
    }

    //预览图片
    previewImage = (currGoodsDefaultUrl) => {
        var ua = window.navigator.userAgent.toLowerCase();
            //判断是不是微信
        if (ua.match(/MicroMessenger/i) == 'micromessenger' ) {
            wx.previewImage({
                current: `currGoodsDefaultUrl`, // 当前显示图片的http链接
                urls: [currGoodsDefaultUrl] // 需要预览的图片http链接列表
            });
        } else if (ua.match(/AlipayClient/i) == 'alipayclient') { //判断是不是支付宝
            AlipayJSBridge.call('imageViewer', {
                images: [
                    {u: `currGoodsDefaultUrl`, t: ''},
                ],
                init: 0
            });
        }
    }

    renderGoodsItem = (goods) => {
        return (
            <div key={goods.id} style={{display: 'flex',  backgroundColor: '#fff', paddingTop: 8,  marginRight: 8, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', height: 90, 
                elevation: 1 }} >
                <div style={{height: 90, width: 60, marginLeft: 8, marginRight: 8, justifyContent: 'center', alignItems: 'center'}}>
                    <img onClick={() => this.previewImage(`${staticHost}/${goods.defaultImagePath}`)} style={{ width: 60, height: 60, borderRadius: 30 }} src={`${staticHost}/${goods.defaultImagePath}` } />
                </div>
                <div style={{display: 'flex', flex: 1, height: 90, flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                        { this.renderNameAndPrice(goods) }
                        <div>
                            <label style={{color: '#ccc', fontSize: 12}}>累计销量:{goods.salesNum ? goods.salesNum : 0}</label>
                        </div>
                    </div>
                    {
                        goods.inventory == 0 ?
                        <div style={{display: 'flex', height: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 8}}>
                            已售罄
                        </div>
                        :
                        <div style={{display: 'flex', height: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 8}}>
                            {
                                this.renderGoodsNum(goods) > 0 ?
                                <Fragment>
                                    <div>
                                        <img src={removePng} style={{width: 16, height: 16}} onClick={() => this.subGoods(goods)}/>
                                    </div>
                                    <div style={{display: 'flex', marginLeft: 2, marginRight: 2, paddingLeft: 4, paddingRight: 4, borderStyle: 'solid', borderWidth: 1,
                                        width: 30, height: 18, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <label>{this.renderGoodsNum(goods)}</label>
                                    </div>
                                </Fragment>
                                : null
                            }
                            <div>
                                <img src={addPng} style={{width: 16, height: 16}} onClick={() => this.listGoodsExtraByGoodsId(goods)}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }

    renderGoods() {
        const { goodsDataSource } = this.state;
        return (
            <ListView style={{ display: 'flex', flex: 1, backgroundColor: '#F5F5F5', 
                marginLeft: 8, marginTop: 0, height: '100%', overflow: 'auto' }}
                dataSource={goodsDataSource}
                renderRow={this.renderGoodsItem}
                renderSeparator={(sectionID, rowID) => <div key={`${sectionID}-${rowID}`} style={{ height: 4, backgroundColor: '#F5F5F5' }} />}
                initialListSize={100}
                renderBodyComponent={() => <GoodsBody/>}
            >
            </ListView>
        )
    }

    checkGoodsExtraItem = (goodsExtra, extraItem) => {
        const { goodsList } = this.state;
        const currGoods = goodsList.find(goods => goods.id == this.goodsId);
        const goodsExtraVos = currGoods.goodsExtraVos;
        goodsExtra.items.forEach(goodsExtraItem => {
            goodsExtraItem.checked = false;
            if(goodsExtraItem.id == extraItem.id) {
                goodsExtraItem.checked = true;
            }
        });
        goodsExtraVos.map(goodsExtraObj => {
            if(goodsExtraObj.id == goodsExtra.id) {
                return Object.assign({}, ...goodsExtra);
            } else {
                return goodsExtraObj;
            }
        });
        this.setState({goodsList});
    }

    addRemark = (remark) => {
        const generalRemark = this.state.generalRemark.map(remarkItem => {
            if(remarkItem.id == remark.id) {
                remarkItem.checked = !remarkItem.checked;
            }
            return remarkItem;
        });
        this.setState({generalRemark});
    }

    add2CartList = (local_cartList, cartItem) => {
        const cartItemObj = local_cartList.find(item => item.goodsId == cartItem.goodsId);
        //没有点过该商品
        if(!cartItemObj) {
            local_cartList.push(cartItem);
        } else {//检查附属属性是否一致
            if(cartItemObj.extraItems.length == 0 && cartItem.extraItems.length == 0) {//没有附属属性
                cartItemObj.num += 1;
            } else {
                const extraItems = cartItemObj.extraItems;
                let flag = true;
                for(let i = 0; i < cartItem.extraItems.length; i++) {
                    let item = cartItem.extraItems[i];
                    const itemFinderObj = extraItems.find(extraItem => (extraItem.extraCode == item.extraCode &&
                        extraItem.extraItemValue == item.extraItemValue));
                    if(!itemFinderObj) {
                        flag = false;
                        break;
                    }
                }
                if(flag) {
                    cartItemObj.num += 1;
                } else {
                    local_cartList.push(cartItem);
                }
            }
        }
    }

    //添加进购物车
    saveShoppingCart = () => {
        const { goodsList } = this.state;
        const currGoods = goodsList.find(goods => goods.id == this.goodsId);
        const currentGoodsExtraList = currGoods.goodsExtraVos;
        let extraItems = [];
        //组装选择的商品附属信息
        if(currentGoodsExtraList && currentGoodsExtraList.length > 0) {
            for(let j = 0; j < currentGoodsExtraList.length; j++) {
                const extra = currentGoodsExtraList[j];
                var flag = false;
                for(let i = 0; i < extra.items.length; i++) {
                    if(extra.items[i].checked) {
                        flag = true;
                        extraItems.push({'extraCode': extra.extraCode, 'extraItemValue': extra.items[i].itemValue});
                        break;
                    }
                }
                if(!flag) {
                    Modal.alert(
                        '提示',
                        `请选择附属属性[${extra.extraName}]的具体项`,
                        [
                          {text: '确认'},
                        ],
                    )
                    return;
                }
            }
        }
        //组装选择的备注信息
        let remark = "";
        this.state.generalRemark.forEach(remarkItem => {
            if(remarkItem.checked) {
                remark += `${remarkItem.value},`;
            }
        });
        remark += `${this.state.remarkText}`;
        let local_cartList_str = window.localStorage.getItem(`local_cartList_${this.merchantId}`);
        let local_cartList = local_cartList_str ? JSON.parse(local_cartList_str) : [];
        let cartItem = {id: new Date().getTime(), goodsId: this.goodsId, name: currGoods.name, price: currGoods.price, num: 1, uId: null, tableCode: this.tableCode, extraItems, remark};
        this.add2CartList(local_cartList, cartItem);
        window.localStorage.setItem(`local_cartList_${this.merchantId}`, JSON.stringify(local_cartList));
        //提交成功之后不要勾选备注
        const new_generalRemark = this.state.generalRemark.map(remarkItem => {
            remarkItem.checked = false;
            return remarkItem;
        });
        this.setState({local_cartList, extraModalVisible: false, generalRemark: new_generalRemark, remarkText: ''});
    }

    renderAllCartItem = () => {
        const { local_cartList, currentSubtracts } = this.state;
        if(local_cartList.length == 0) {
            return (
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', height: 100, alignItems: 'center'}}>
                    <label>用餐订单空空如也~~</label>
                </div>
            )
        } else {
            return (
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: 100}}>
                    {
                        local_cartList.map(cartItem => {
                            return (
                                this.renderCartItem(cartItem)
                            )                                
                        })
                    }
                    {
                        currentSubtracts && currentSubtracts.length > 0 ?
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 4, justifyContent: 'flex-end', height: 40}}>
                            <label >原价:<label style={{color: '#000', fontSize: 18}}>￥{numeral(this.calTotalPriceUnSubtract(local_cartList)).format('0,0.00')}</label></label>
                        </div>
                        : null
                    }
                    {
                        currentSubtracts.map(subtract => {
                            return (
                                <div key={subtract.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                                    { subtract.type == 3 ? null : <Checkbox checked={true}/>}
                                    {
                                        subtract.constraintType == 2 ? <div style={{paddingLeft: 4, paddingRight: 8}}>每天:{subtract.constraintTimeStart}-{subtract.constraintTimeEnd}</div>
                                        : <div style={{paddingLeft: 4, paddingRight: 8}}>消费满
                                            <span style={{paddingLeft: 2, color: '#ff4242', fontSize: 18}}>
                                                ￥{numeral(subtract.consumePrice).format('0,0.00')}
                                            </span>
                                        </div>
                                    }
                                    {
                                        subtract.type == 3 ?  <div style={{paddingLeft: 4, paddingRight: 8}}>赠送现金券<span style={{fontSize: 18, color: '#ff4242'}}>￥{numeral(subtract.amount2).format('0,0.00')}</span>,下次消费使用.</div> :
                                        subtract.type == 2 ? <div style={{fontSize: 18, color: '#ff4242'}}>{subtract.discount}折</div>
                                        : <div style={{fontSize: 18, color: '#ff4242'}}>-￥{numeral(subtract.amount1).format('0,0.00')}</div>
                                    }
                                </div>
                            )
                        })
                    }
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 4, justifyContent: 'flex-end', height: 40}}>
                        <label >合计:<label style={{color: '#000', fontSize: 18}}>￥{numeral(this.calTotalPrice()).format('0,0.00')}</label></label>
                    </div>
                    <Button onClick={() => {this.submitOrder()}} type={"primary"} style={{fontSize: 15, height: 36, lineHeight: '36px'}}>
                        提交用餐订单
                    </Button>
                </div>
            )
        }
    }


    calTotalPrice = () => {
        const { local_cartList, todayGoodsDays, effectiveGoodsDiscounts, currentSubtracts } = this.state;
        let totalPrice = 0;
        local_cartList.forEach(cartItem => {
            let todayGoodsDay = todayGoodsDays.find(goodsDayItem => goodsDayItem.goodsId === cartItem.goodsId);
            let goodsDiscount = effectiveGoodsDiscounts.find(goodsDiscountItem => goodsDiscountItem.goodsId === cartItem.goodsId);
            //如果一个商品又是特价，又有折扣
            //特价商品价格大于折扣商品价格, 那特价商品就设置成null
            if(todayGoodsDay && goodsDiscount) {
                const discountPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
                const goodsDayPrice = todayGoodsDay.price;
                if(goodsDayPrice > discountPrice) {
                    todayGoodsDay = null;
                } else {
                    goodsDiscount = null;
                }
            }
            if(todayGoodsDay) {
                cartItem.itemPrice = todayGoodsDay.price + (cartItem.extraPrice || 0);
            } else if(goodsDiscount) {
                cartItem.itemPrice = (goodsDiscount.discountValue * 10 /100) * (cartItem.price + (cartItem.extraPrice || 0));
            } else {
                cartItem.itemPrice = cartItem.price + (cartItem.extraPrice || 0);
            }
            cartItem.itemPrice = cartItem.itemPrice * cartItem.num;
            totalPrice += cartItem.itemPrice;
        });
        //减免与折扣折扣
        currentSubtracts.map(subtract => {
            if(subtract.type == 3) {
                // noticeStr += `赠现金券￥${numeral(subtract.amount2).format('0,0')}元。`;
            } else if(subtract.type == 2) {
                // noticeStr += `享${subtract.discount}折优惠。`
                totalPrice = totalPrice * subtract.discount * 0.1;
            } else {
                // noticeStr += `减￥${numeral(subtract.amount1).format('0,0')}元。`
                totalPrice = totalPrice - subtract.amount1;
            }
        })
        return totalPrice;
    }

    calTotalPriceUnSubtract = (local_cartList) => {
        const { todayGoodsDays, effectiveGoodsDiscounts } = this.state;
        let totalPrice = 0;
        local_cartList.forEach(cartItem => {
            let todayGoodsDay = todayGoodsDays.find(goodsDayItem => goodsDayItem.goodsId === cartItem.goodsId);
            let goodsDiscount = effectiveGoodsDiscounts.find(goodsDiscountItem => goodsDiscountItem.goodsId === cartItem.goodsId);
            //如果一个商品又是特价，又有折扣
            //特价商品价格大于折扣商品价格, 那特价商品就设置成null
            if(todayGoodsDay && goodsDiscount) {
                const discountPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
                const goodsDayPrice = todayGoodsDay.price;
                if(goodsDayPrice > discountPrice) {
                    todayGoodsDay = null;
                } else {
                    goodsDiscount = null;
                }
            }
            if(todayGoodsDay) {
                cartItem.itemPrice = todayGoodsDay.price + (cartItem.extraPrice || 0);
            } else if(goodsDiscount) {
                cartItem.itemPrice = (goodsDiscount.discountValue * 10 /100) * (cartItem.price + (cartItem.extraPrice || 0));
            } else {
                cartItem.itemPrice = cartItem.price + (cartItem.extraPrice || 0);
            }
            cartItem.itemPrice = cartItem.itemPrice * cartItem.num;
            totalPrice += cartItem.itemPrice;
        });
        return totalPrice;
    }

    renderCartItem = (cartItem) => {
        const { goodsList, todayGoodsDays, effectiveGoodsDiscounts } = this.state;
        const currGoods = goodsList.find(goods => goods.id == cartItem.goodsId);
        const currentGoodsExtraList = currGoods ? currGoods.goodsExtraVos : [];
        const renderExtraItemName = () => {
            if(currentGoodsExtraList && currentGoodsExtraList.length > 0) {
                calCartExtraPrice(cartItem, currentGoodsExtraList);
                return (
                    <Fragment><label style={{color: '#ccc', fontSize: 12}}>{cartItem.extraItemNames}&nbsp;&nbsp;{cartItem.remark ? `(${cartItem.remark})` : ''}</label></Fragment>
                )
            } else {
                return <label style={{color: '#ccc', fontSize: 12}}>{cartItem.remark ? `(${cartItem.remark})` : ''}</label>;
            }
        }

        const renderCartItemName = () => {
            let todayGoodsDay = todayGoodsDays.find(goodsDayItem => goodsDayItem.goodsId === cartItem.goodsId);
            let goodsDiscount = effectiveGoodsDiscounts.find(goodsDiscountItem => goodsDiscountItem.goodsId === cartItem.goodsId);
            //如果一个商品又是特价，又有折扣
            //特价商品价格大于折扣商品价格, 那特价商品就设置成null
            if(todayGoodsDay && goodsDiscount) {
                const discountPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
                const goodsDayPrice = todayGoodsDay.price;
                if(goodsDayPrice > discountPrice) {
                    todayGoodsDay = null;
                } else {
                    goodsDiscount = null;
                }
            }
            if(todayGoodsDay) {
                return <Fragment><div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}><label>{cartItem.name}</label><label style={{color: '#ff4242'}}>(特价)</label>{renderExtraItemName()}</div>
                    <div style={{display: 'flex', flexDirection: 'row',}}><label style={{marginRight: 8}}>x{cartItem.num}</label><label>￥{numeral((todayGoodsDay.price + (cartItem.extraPrice || 0)) * cartItem.num).format('0,0.00')}</label></div></Fragment>
            } else if(goodsDiscount) {
                return <Fragment><div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}><label >{cartItem.name}</label><label style={{color: '#ff4242'}}>({goodsDiscount.discountValue}折)</label>{renderExtraItemName()}</div>
                    <div style={{display: 'flex', flexDirection: 'row',}}><label style={{marginRight: 8}}>x{cartItem.num}</label><label>￥{numeral((goodsDiscount.discountValue * 10 /100) * (cartItem.price + (cartItem.extraPrice || 0)) * cartItem.num).format('0,0.00')}</label></div></Fragment>
            } else {
                return <Fragment><div style={{display: 'flex', fflexDirection: 'row', alignItems: 'flex-end'}}><label>{cartItem.name}{renderExtraItemName()}{}</label></div>
                    <div style={{display: 'flex', flexDirection: 'row',}}><label style={{marginRight: 8}}>x{cartItem.num}</label><label>￥{numeral((cartItem.price + (cartItem.extraPrice || 0)) * cartItem.num).format('0,0.00')}</label></div></Fragment>
            }
        }
        
        return (
            <div key={cartItem.id} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: 4, justifyContent: 'space-between', minHeight: 32,
                borderBottomColor: '#ccc', borderBottomWidth: 1}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>{renderCartItemName()}</div>
                <div style={{display: 'flex', flexDirection: 'row', width: 60, justifyContent: 'flex-end'}}>
                    <img src={removePng} style={{width: 16, height: 16}} onClick={() => this.subGoods2(cartItem.id)}/>
                </div>
            </div>
       )
    }
    
    //只渲染点减号时候的商品
    renderCartItemByGoodsId = () => {
        const cancelGoodsId = this.state.cancelGoodsId;
        const new_local_cartList = this.state.local_cartList.filter(cartItem => {
            return cartItem.goodsId == cancelGoodsId;
        });
        return new_local_cartList.map(cartItem => {
            return (
                 this.renderCartItem(cartItem)
            )                                
         })
    }

    //显示购物车中的商品
    showCartItem = () => {
        const { local_cartList } = this.state;
        services.listCurrentSubtract(numeral(this.calTotalPriceUnSubtract(local_cartList)).format("0.00")).then((data) => {
            this.setState({cancelCartItemModalVisible: true, cancelGoodsId: null, currentSubtracts: data});
        }).catch(e => {
            this.setState({cancelCartItemModalVisible: true, cancelGoodsId: null, currentSubtracts: []});
        })
    }

    

    submitOrder = () => {
        const { local_cartList, curr_item } = this.state;
        if(this.merchantProperty == 1) {
            Modal.alert('提示', "确认提交用餐订单吗？", [
                {text: '取消'},
                {text: '确认', onPress: () => {
                    //顾客餐桌扫码下单
                    let cart = {orderMethod: 1, cartItem: local_cartList, tableCode: this.tableCode, tableStatus: 2, 
                        dinersNum: curr_item, openid: this.openid, buyerId: this.buyerId};
                    services.submitByKCT(cart).then((data) => {
                        this.setState({cancelCartItemModalVisible: false, local_cartList: []});
                        window.localStorage.removeItem(`local_cartList_${this.merchantId}`);
                        // Modal.alert('提示', '用餐订单提交成功,需要支付成功之后商家才会帮您制作美食哦。', [
                        //     {text: '马上支付'},
                        //     {text: '返回', onPress: () => {window.history.go(-1)}}
                        // ]);
                        //微信支付
                        if(this.openid) {
                            services.payWechat(data.orderNo, this.openid, this.merchantId, () => {
                                window.history.go(-1);
                            });    
                        } else if(this.buyerId) {//支付宝支付
                            services.payAilipay(data.orderNo, this.buyerId, this.merchantId, () => {
                                window.history.go(-1);
                            });    
                        }
                    });
                }},
            ]);
        } else {
            Modal.alert('提示', "确认提交用餐订单吗？", [
                {text: '取消'},
                {text: '确认', onPress: () => {
                    //顾客餐桌扫码下单
                    let cart = {orderMethod: 1, cartItem: local_cartList, tableCode: this.tableCode, tableStatus: 2, 
                        dinersNum: curr_item, openid: this.openid, buyerId: this.buyerId};
                    services.submitOrder(cart).then(() => {
                        this.setState({cancelCartItemModalVisible: false, local_cartList: []});
                        window.localStorage.removeItem(`local_cartList_${this.merchantId}`);
                        Modal.alert('提示', '用餐订单提交成功,已通知商家,等待商家确认。', [
                            {text: '知道了'},
                            {text: '返回', onPress: () => {window.history.go(-1)}}
                        ]);
                    });
                }},
            ]);
        }
    }

    render() {
        const { curr_item, type } = this.state;
        let data = [];
        for(let i = 1; i <= 20; i++) {
            data.push(i);
        }
        if(type == 1) {
            return (
                <Fragment>
                    <WingBlank>
                        <div className={styles.subTitle}>请选择用餐人数</div>
                    </WingBlank>
                    <Grid data={data}
                        columnNum={5}
                        renderItem={dataItem => (
                            <div className={curr_item == dataItem ? `${styles.gridItem} ${styles.currGridItem}` : styles.gridItem}>
                                <div className={curr_item == dataItem ?  `${styles.text} ${styles.currText}` : styles.text}>
                                    <span>{dataItem}</span>
                                </div>
                            </div>
                        )}
                        onClick={this.onGridClick}
                    />
                    <WhiteSpace/>
                    <WingBlank size={"md"}>
                        <Button type={"primary"} onClick={() => this.confirm()}>确认</Button>
                    </WingBlank>
                    <WhiteSpace/>
                </Fragment>
            )
        } else {
            const { height, extraModalVisible, goodsList, goodsLoading, generalRemark, local_cartList = [],
                currGoodsDefaultUrl, noticeStr } = this.state;
            const currGoods = goodsList.find(goods => goods.id == this.goodsId);
            const goodsExtraVos = currGoods ? currGoods.goodsExtraVos : [];
            const brageNum = () => {
                let brageNum = 0;
                local_cartList.forEach(cart => {
                    brageNum += cart.num;
                });
                return brageNum;
            }
            return (
                <Fragment>
                    {
                        noticeStr ?
                        <NoticeBar marqueeProps={{ loop: true, fps: 20, style: { padding: '0 7.5px' } }}>
                            {noticeStr}
                        </NoticeBar>
                        : null
                    }
                    <div style={{display: 'flex', flexDirection: 'column',}}>
                        <div className={styles.container} style={goodsLoading ? {height} : {height: noticeStr ? height - 44 -36 : height - 44}}>
                            {this.renderCategory()}
                            {this.renderGoods()}
                        </div>
                        {
                            goodsLoading ? null
                            : 
                            <div style={{height: 44, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', 
                                paddingRight: 4, paddingLeft: 4, boxShadow: '0px -2px 3px #ccc', zIndex: 99}}>
                                <Button onClick={() => {this.submitOrder()}} type={"primary"} disabled={local_cartList.length == 0} style={{marginTop: 4, width: 120, fontSize: 15, height: 36, lineHeight: '36px'}}>
                                    提交用餐订单
                                </Button>
                                <Button onClick={() => {window.history.go(-1)}} style={{marginTop: 4, width: 60, fontSize: 15, marginLeft: 8, height: 36, lineHeight: '36px'}}>
                                    返回
                                </Button>
                            </div>
                        }
                        {
                            goodsLoading ? null
                            :
                            <div style={{
                                position: 'absolute',
                                left: 4,
                                bottom: 2,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#1296db',
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                margin: 4,
                                zIndex: 101,
                                boxShadow: '0px 2px 4px #ccc',
                                background: "url('../images/cart.png') 50% no-repeat #1296db",
                                backgroundSize: '32px 32px',
                            }} onClick={() => {this.showCartItem()}}>
                            {
                                local_cartList.length > 0 ?
                                <Badge size="small" text={brageNum()}>
                                </Badge>
                                : null
                            }
                            </div>
                        }
                    </div>
                    <Modal 
                        style={{width: width - 32}}
                        animationType={'fade'}
                        visible={extraModalVisible}
                        transparent={true}
                        maskClosable={true}
                        closable={false}
                        onClose={() => {
                            this.setState({extraModalVisible: false});
                        }}
                    >
                        <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center',}}>
                            <div style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4}}>
                                <img src={closePng} style={{width: 16, height: 16}} onClick={() => {this.setState({extraModalVisible: false});}}></img>
                            </div>
                            {
                                goodsExtraVos.map(goodsExtra => {
                                    return (
                                        <Card key={goodsExtra.id} >
                                            <Card.Header title={goodsExtra.extraName} ></Card.Header>
                                            <Card.Body>
                                                <div style={{display: 'flex', marginTop: 4, marginBottom: 4, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                                {
                                                    goodsExtra.items.map(extraItem => {
                                                        return (
                                                            <CheckboxItem onChange={(e) => this.checkGoodsExtraItem(goodsExtra, extraItem)} key={extraItem.id} checked={extraItem.checked}>
                                                                {extraItem.itemName}
                                                            </CheckboxItem>
                                                        )
                                                    })
                                                }
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                            }
                            <Card>
                                <Card.Header title="常用备注" >
                                </Card.Header>
                                <Card.Body>
                                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4, marginTop: 4}}>
                                    {
                                        generalRemark.map(remark => {
                                            return (
                                                <CheckboxItem onChange={(e) => this.addRemark(remark)} key={remark.id}>
                                                    {remark.value}
                                                </CheckboxItem>
                                            )
                                        })
                                    }
                                </div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header title="其他备注" >
                                </Card.Header>
                                <Card.Body>
                                    <TextareaItem
                                        rows={2}
                                        placeholder="输入其他备注信息"
                                        onChange={(text) => {this.setState({remarkText: text})}}
                                    />
                                </Card.Body>
                            </Card>
                            <Button onClick={() => {this.saveShoppingCart()}} type={"primary"} style={{marginTop: 4, width: '100%', fontSize: 15, height: 36, lineHeight: '36px'}}>
                                确定
                            </Button>
                        </div>
                    </Modal>
                    <Modal
                        popup
                        animationType="slide-up"
                        maskClosable={true}
                        visible={this.state.cancelCartItemModalVisible}
                        onClose={() => {
                            this.setState({cancelCartItemModalVisible: false});
                        }}
                    >
                        <div style={{  backgroundColor: '#fff', borderRadius: 10, paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 8, shadowRadius: 4 }}>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <img src={closePng} style={{width: 16, height: 16}} onClick={() => {this.setState({cancelCartItemModalVisible: false});}}></img>
                            </div>
                            {
                                this.state.cancelGoodsId ? this.renderCartItemByGoodsId() : this.renderAllCartItem()
                            }
                        </div>
                    </Modal>

                    <Modal 
                        style={{width: width - 32}}
                        animationType={'fade'}
                        visible={this.state.previewGoodsImageModalVisible}
                        transparent={true}
                        maskClosable={true}
                        closable={false}
                        onClose={() => {
                            this.setState({previewGoodsImageModalVisible: false});
                        }}
                    >
                            <img style={{width: '100%', height: '100%'}} src={currGoodsDefaultUrl } 
                                onClick={() => {this.setState({previewGoodsImageModalVisible: false})}}/>
                    </Modal>
                </Fragment>
            )
        }
    }

}

ReactDOM.render(
    <PlaceOrder />,
    document.getElementById('root')
);