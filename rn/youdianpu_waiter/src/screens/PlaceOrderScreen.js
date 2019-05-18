import React, { Component, Fragment } from 'react';
import {
    View, Text, Image, TouchableOpacity, StyleSheet, FlatList,
    Dimensions, ScrollView, RefreshControl, Modal, TextInput, Alert,
    DeviceEventEmitter,
} from 'react-native';
import { Modal as AntdModal } from 'antd-mobile-rn';
import Button from 'react-native-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconBadge from 'react-native-icon-badge';
import { Toast } from 'antd-mobile-rn';

import placeOrderActions from '../actions/placeOrder';
import Storage from '../utils/storage';
import { getSub } from '../utils/authority';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//计算附属属性影响的价格波动
const calCartExtraPrice = (cartItem, goodsExtraMap) => {
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

const getSyncData = async (key) => {
    let promise = new Promise((resolve, reject) => {
        Storage.load({key}).then(data => {
            resolve(data);
        });
    });
    let result = await promise;
    return result;
}


class PlaceOrderScreen extends Component {

    /*<Image style={{width: 24, height: 24, marginRight: 16}} source={require('../../assets/images/cart.png')}/>*/

    constructor(props) {
        super(props)
        this._flatList = null
        this._sectionList = null
        this.refreshGoodsImage = true;
        this.state = {
            selectedRootCate: 0,
            local_goodsCategory: [],
            local_goodsList: [],
            local_cartList: [],
            local_goodsDefaultImages: {},//商品默认图片
            isEnabledDays: 0,
            isEnabledDiscount: 0,
            extraModalVisible: false,
            previewGoodsImageModalVisible: false,
            currGoodsDefaultImage: null,//预览商品图片
            generalRemark: [{id: 1, value: "不要辣"}, {id: 2, value: "加辣"}, {id: 3, value: "少盐"}, {id: 4, value: "少油"}, {id: 5, value: "少味精"}],
            remarkText: '',
            cancelCartItemModalVisible: false,//删除购物车项
            cancelGoodsId: null,//删除购物车项的商品id
            dinersNumModalVisible: false,//用餐人数
            dinersNum: null,//用餐人数
        }
    }

    componentDidMount() {
        const { tableCode, isAppend = false } = this.props.navigation.state.params;
        this.tableCode = tableCode;
        this.isAppend = isAppend;
        if(global.socket) {
            global.socket.on('queryGoodsDefaultImageMsg', ({ goodsId, base64 }) => {
                this.setState({ local_goodsDefaultImages: { ...this.state.local_goodsDefaultImages, [goodsId]: base64 } });
            });
            global.socket.on('initPlaceOrderMsg', async (datas) => {
                const local_goodsCategory = datas[0];
                const local_goodsList = datas[1];
                const local_cartList = datas[2];
                let isEnabledDays = 0, isEnabledDiscount = 0;
                datas[3].forEach(itemConfig => {
                    if (itemConfig.config_code === 'enabled-goods-day') {
                        isEnabledDays = itemConfig.config_value;
                    } else {
                        isEnabledDiscount = itemConfig.config_value;
                    }
                });
                this.setState({ local_goodsCategory, local_goodsList, local_cartList, isEnabledDays, isEnabledDiscount });
                // console.log('local_goodsCategory', local_goodsCategory);
                // console.log('local_goodsList', local_goodsList);
                // console.log('local_cartList', local_cartList);
                // console.log('isEnabledDays', isEnabledDays);
                // console.log('isEnabledDiscount', isEnabledDiscount);
                const token = await getSyncData('Authorization');
                if(this.refreshGoodsImage) {
                    local_goodsList.forEach(goods => {
                        global.socket.emit("queryGoodsDefaultImage", { goodsId: goods.id, token});
                    });
                }
            });
            global.socket.on('saveShoppingCartMsg', data => {
                this.setState({local_cartList: data});
            });
            //点击的商品列表+号，下单
            global.socket.on('listExtraMsg', ({goodsId, data}) => {
                this.props.placeOrderActions.dispatch_goodsExtra(goodsId, data);
                this.setState({extraModalVisible: true});
            });
            //点击购物车可能需要查询里面商品的附属属性
            global.socket.on('listExtrasMsg', ({goodsIds, data}) => {
                const goodsExtraMap = {};
                for(let i = 0; i < goodsIds.length; i++) {
                    goodsExtraMap[goodsIds[i]] = data[i];
                }
                this.props.placeOrderActions.dispatch_goodsExtras(goodsExtraMap);
            });
            global.socket.on('printOrderMsg', data => {
                Toast.hide();
                if(data.success) {
                    //更新一下打印状态
                    //修改订单打印状态
                    // this.props.placeOrderActions.updateOrderItemPrintStatus(data.tableCode);
                    Toast.success("成功发往后厨打印");
                } else {
                    // Toast.fail(`后厨打印用餐订单明细失败,${data.message}`);
                    AntdModal.alert('错误提示', `后厨打印用餐订单明细失败,${data.message}`, [
                        {text: '知道了'},
                    ]);
                }
            });
            global.socket.on('printTicketMsg', data => {
                if(data.success) {
                    Toast.success("成功在前台打印小票");
                } else {
                    // Toast.fail(`下单小票打印失败,${data.message}`);
                    AntdModal.alert('错误提示', `下单小票打印失败,${data.message}`, [
                        {text: '知道了'},
                    ]);
                }
            });
            global.socket.on('submitOrderMsg', cart => {
                Toast.loading("用餐订单提交中...", 0);
                this.props.placeOrderActions.submitOrder(cart).then((results) => {
                    this.setState({local_cartList: []});
                    Toast.hide();
                    Toast.success("用餐订单提交成功", 1.5);
                    Toast.loading("发往前台打印小票与发往后厨打印...", 0);
                    global.socket.emit('printSubmitOrder', {...cart, ...results});
                }).then(() => {
                    DeviceEventEmitter.emit("tableOrderRefresh");
                }).catch(e => {
                    Toast.hide();
                    Toast.fail(e.message, 2);
                });
            })
        }
        this._onRefresh(true);
    }

    _onRefresh = (flag) => {
        // this.setState({loading: true});
        this.refreshGoodsImage = !!flag;
        if(global.socket) {
            global.socket.emit("initPlaceOrder", this.tableCode);
        } else {
            Toast.info("请稍后,正在重连服务...");
        }
        this.props.placeOrderActions.listTodayGoodsDaysAndDiscount();//查询折扣与特价商品
    }

    componentWillUnmount() {
        if(global.socket) {
            global.socket.removeAllListeners("queryGoodsDefaultImageMsg");
            global.socket.removeAllListeners("initPlaceOrderMsg");
            global.socket.removeAllListeners("saveShoppingCartMsg");
            global.socket.removeAllListeners("listExtraMsg");
            global.socket.removeAllListeners("listExtrasMsg");
            global.socket.removeAllListeners("printOrderMsg");
            global.socket.removeAllListeners("printTicketMsg");
            global.socket.removeAllListeners("submitOrderMsg");
        }
    }

    _renderItem = item => {
        const { local_goodsCategory } = this.state;
        if (!item) return null;
        let index = item.index
        let title = item.item.title
        return (
            <TouchableOpacity
                key={item.key}
                style={[{ alignItems: 'center', justifyContent: 'center', width: 100, height: 44 }, this.state.selectedRootCate === index ? { backgroundColor: '#F5F5F5', borderLeftWidth: 3, borderLeftColor: '#ff4242' } : { backgroundColor: 'white' }]}
                onPress={() => {
                    // setTimeout(() => {
                    (local_goodsCategory.length - index) * 45 > height - 65 ? this._flatList.scrollToOffset({ animated: true, offset: index * 45 }) : null
                    // this._sectionList.scrollToLocation({ itemIndex: 0, sectionIndex: 0, animated: true, viewOffset: PixelRatio.get() * 16 })
                    // }, 100)
                    this.setState({ selectedRootCate: index })
                }}
            >
                <Text style={this.state.selectedRootCate === index ? { fontSize: 13, color: '#333' } : { fontSize: 13 }}>{title}</Text>
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => `${item.key}`;

    renderRootCate() {
        let data = [];
        const { local_goodsCategory } = this.state;
        local_goodsCategory.forEach((goodsCategory) => {
            data.push({ key: goodsCategory.id, title: goodsCategory.category_name });
        })
        return (
            <View style={{ backgroundColor: '#F5F5F5' }}>
                <FlatList
                    ref={flatList => this._flatList = flatList}
                    data={data}
                    ListHeaderComponent={() => (<View />)}
                    ListFooterComponent={() => (<View />)}
                    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#F5F5F5' }} />}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={20}
                    keyExtractor={this._keyExtractor}
                    showsVerticalScrollIndicator={false}
                >
                </FlatList>
            </View>
        )
    }

    /* sectionComp(item) {
        return (
            <View style={{ backgroundColor: '#F5F5F5', justifyContent: 'center' }}>
                <Text style={{ color: 'gray', marginBottom: 8 }}>{item.section.key}</Text>
            </View>
        )
    } 

    renderCell(item, sectionIndex, index) {
        return (
            <TouchableOpacity
                key={index}
                style={{ height: 110, width: (width - 140) / 3, backgroundColor: 'white', marginBottom: 8, marginRight: 10, alignItems: 'center' }}
                onPress={() => alert(`点击了第${sectionIndex}组中的第${index}个商品`)}
            >
                <Image style={{ width: 60, height: 70, marginVertical: 10 }} source={{ uri: item.itemImg }} />
                <Text style={{ color: '#ccc', fontSize: 13 }}>{item.title}</Text>
            </TouchableOpacity>
        )
    } */

    /* renderItem(item) {
        let sectionIndex = item.section.data.sectionId
        let data = item.section.data
        return item.index === 0 ?
            <View key={item.index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.map((cell, index) => this.renderCell(cell, sectionIndex, index))}
            </View> : null
    } */

    listGoodsExtraByGoodsId = (goods) => {
        if(goods.inventory <= 0) {
            Alert.alert(
                '提示',
                `该商品已售罄`,
                [
                  {text: '确认'},
                ],
                { cancelable: false }
            )
            return;
        }
        const goodsId = goods.id;
        this.goodsId = goodsId;
        const { todayGoodsDays, effectiveGoodsDiscounts, goodsExtraMap } = this.props.placeOrder;
        const { local_cartList } = this.state;
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
                Alert.alert(
                    '提示',
                    `该特价商品每单只允许点${todayGoodsDay.limitNum}${goods.unitName}`,
                    [
                      {text: '确认'},
                    ],
                    { cancelable: false }
                )
                return;
            }
        }
        if(global.socket) {
            //商品id，异常返回数据之后做什么操作
            if(!goodsExtraMap[goodsId]) {
                global.socket.emit('listExtra', {goodsId});
            } else {
                this.setState({extraModalVisible: true});
            }
        }
    }

    renderNameAndPrice = (goods) => {
        const { todayGoodsDays, effectiveGoodsDiscounts } = this.props.placeOrder;
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
                    <View>
                        <Text style={{fontSize: 14, paddingTop: 10,  color: '#ff4242' }}>{goods.name}(特价)</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>                                
                        <Text style={{color: '#FFAC38', textDecorationLine: 'line-through'}}>￥{numeral(goods.price).format('0,0.00')}({goods.unitName})</Text>
                        <Text style={{color: '#ff4242', marginRight: 8}}>￥{numeral(todayGoodsDay.price).format('0,0.00')}({goods.unitName})</Text>
                    </View>
                </Fragment>
            )
        } else if(goodsDiscount) {
            const discountPrice = (goodsDiscount.discountValue * 10 /100) * goods.price;
            return (
                <Fragment>
                    <View>
                        <Text style={{fontSize: 14, paddingTop: 10,  color: '#ff4242' }}>{goods.name}({goodsDiscount.discountValue}折)</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: '#FFAC38', textDecorationLine: 'line-through'}}>￥{numeral(goods.price).format('0,0.00')}({goods.unitName})</Text>
                        <Text style={{color: '#ff4242', marginRight: 8}}>￥{numeral(discountPrice).format('0,0.00')}({goods.unitName})</Text>
                    </View>                    
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <View>
                        <Text style={{fontSize: 14, paddingTop: 10, }}>{goods.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: '#FFAC38'}}>￥{numeral(goods.price).format('0,0.00')}({goods.unitName})</Text>
                    </View>
                </Fragment>
            )
        }
    }

    //预览图片
    previewImage = (base64) => {
        this.setState({currGoodsDefaultImage: base64, previewGoodsImageModalVisible: true});
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
        const { goodsExtraMap } = this.props.placeOrder;
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
                if(goodsExtraMap[goods.id] && goodsExtraMap[goods.id].length > 0) {
                    this.setState({cancelCartItemModalVisible: true, cancelGoodsId: goods.id});
                } else {
                    this.props.placeOrderActions.listGoodsExtraByGoodsId(goods.id).then((data) => {
                        this.setState({cancelCartItemModalVisible: true, cancelGoodsId: goods.id});
                    });
                }
            } else {//商品也点了几份， 附属属性是一样的，
                //数量--
                const n_cartItem = new_local_cartList[0];
                n_cartItem.num -= 1;
                if(n_cartItem.num > 0) {
                    if(global.socket) {
                        global.socket.emit("updateShoppingCart", {id: n_cartItem.id, num: n_cartItem.num});
                    }
                    const n_local_cartList = local_cartList.map(cartItem => {
                        if(cartItem.id == n_cartItem.id) {
                            cartItem.num = n_cartItem.num;
                        }
                        return cartItem;
                    });
                    this.setState({local_cartList: n_local_cartList});
                } else {
                    if(global.socket) {
                        global.socket.emit("deleteShoppingCart", {id: n_cartItem.id});
                    }
                    const n_local_cartList = local_cartList.filter(cartItem => {
                        return cartItem.id !== n_cartItem.id;
                    });
                    this.setState({local_cartList: n_local_cartList});
                }
            }
        }
    }

    subGoods2 = (cartItemId) => {
        const { local_cartList } = this.state;
        if(global.socket) {
            global.socket.emit("deleteShoppingCart", {id: cartItemId});
        }
        const n_local_cartList = local_cartList.filter(cartItem => {
            return cartItem.id !== cartItemId;
        });
        this.setState({local_cartList: n_local_cartList});
    }

    //显示购物车中的商品
    showCartItem = () => {
        const { local_cartList } = this.state;
        const { goodsExtraMap } = this.props.placeOrder;
        const goodsIds = [];
        local_cartList.forEach(cartItem => {
            const found = goodsIds.find(id => id === cartItem.goodsId);
            if(!goodsExtraMap[cartItem.goodsId] && !found) {
                goodsIds.push(cartItem.goodsId);
            }
        });
        if(goodsIds.length === 0) {
            this.setState({cancelCartItemModalVisible: true, cancelGoodsId: null});
        } else {
            // this.props.placeOrderActions.listGoodsExtraByGoodsIds(goodsIds).then(() => {
            //     this.setState({cancelCartItemModalVisible: true, cancelGoodsId: null});
            // });
            if(global.socket) {
                //商品id，异常返回数据之后做什么操作
                global.socket.emit('listExtras', {goodsIds});
            }
        }        
    }

    

    renderGoodsItem = (goods) => {
        const { local_goodsDefaultImages } = this.state;
        return (
            <View key={goods.id} style={{ backgroundColor: '#fff', marginBottom: 8, marginRight: 8, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', height: 100, elevation: 1 }} >
                <View style={{height: 100, width: 60, marginHorizontal: 8, justifyContent: 'center', alignItems: 'center'}}>
                    {local_goodsDefaultImages[goods.id] ?
                        <TouchableOpacity onPress={() => this.previewImage(local_goodsDefaultImages[goods.id])}>
                            <Image roundAsCircle={true} style={{ width: 60, height: 60, borderRadius: 30 }} source={{ uri: local_goodsDefaultImages[goods.id] }} />
                        </TouchableOpacity>
                        : <Image roundAsCircle={true} style={{ width: 60, height: 60, borderRadius: 30 }} source={require('../../assets/images/defaultGoods.png')} />
                    }
                </View>
                <View style={{flex: 1, height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <View style={{flex: 1}}>
                        {this.renderNameAndPrice(goods)}
                        <View>
                            <Text style={{color: '#ccc', fontSize: 12}}>库存:{goods.inventory}</Text>
                        </View>
                    </View>
                    {
                        goods.inventory == 0 ?
                        <View style={{height: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4, marginRight: 8}}>
                            <Text>库存不足</Text>
                        </View>
                        :
                        <View style={{height: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4, marginRight: 8}}>
                            {
                                this.renderGoodsNum(goods) > 0 ?
                                <Fragment>
                                    <TouchableOpacity onPress={() => this.subGoods(goods)}>
                                        <Ionicons name="md-remove-circle-outline" size={24} ></Ionicons>
                                    </TouchableOpacity>
                                    <View style={{marginHorizontal: 2, paddingHorizontal: 4, borderStyle: 'solid', borderColor: '#ccc', borderWidth: 1,
                                        width: 30, height: 20, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{this.renderGoodsNum(goods)}</Text>
                                    </View>
                                </Fragment>
                                : null
                            }
                            <TouchableOpacity onPress={() => this.listGoodsExtraByGoodsId(goods)}>
                                <Ionicons name="md-add-circle-outline" size={24}></Ionicons>
                            </TouchableOpacity>
                        </View>
                    }
                    
                </View>
            </View>
        )
    }

    renderItemCate() {
        /* let tempArr = CateData.data[this.state.selectedRootCate].secondCateItems.map((item, index) => {
            let tempObj = {}
            tempObj.key = item.secondCateName
            tempObj.data = item.items
            tempObj.data.sectionId = index
            return tempObj
        }); */
        let tempArr = [];
        const { local_goodsCategory, local_goodsList, selectedRootCate } = this.state;
        if (local_goodsCategory && local_goodsCategory.length > 0) {
            let defaultGoodsCategoryId = local_goodsCategory[selectedRootCate].id;
            local_goodsList.forEach(goods => {
                if (goods.category == defaultGoodsCategoryId) {
                    tempArr.push(goods);
                }
            });
        }
        const { loading } = this.props.placeOrder;
        return (

            <View style={{ flex: 1, backgroundColor: '#F5F5F5', marginLeft: 8, marginTop: 8 }}>
                {/* <SectionList
                        ref={(ref) => this._sectionList = ref}
                        renderSectionHeader={this.sectionComp}
                        renderItem={(data) => this.renderItem(data)}
                        sections={tempArr}
                        ItemSeparatorComponent={() => <View />}
                        ListHeaderComponent={() => <View />}
                        ListFooterComponent={() => <View />}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `key${index}${item}`}
                    /> */}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this._onRefresh}
                            tintColor="#ffffff"
                            title="数据加载中..."
                            titleColor="#ffffff"
                            colors={['#ffffff']}
                            progressBackgroundColor="#1296db"
                        />
                    }
                    style={{ flex: 1 }}
                >
                    {
                        tempArr.map(goods => {
                            return this.renderGoodsItem(goods);
                        })
                    }
                </ScrollView>
            </View>
        )
    }

    renderCategory() {
        return (
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#F5F5F5' }}>
                {this.renderRootCate()}
                {this.renderItemCate()}
            </View>
        )
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

    checkGoodsExtraItem = (goodsExtra, extraItem) => {
        // const { goodsExtraMap } = this.props.placeOrder;
        // const currentGoodsExtraList = goodsExtraMap[goodsExtra.goodsId];
        // const currentGoodsExtra = currentGoodsExtraList.find(goodsExtraItem => goodsExtraItem.extraId == extraItem.extraId);
        this.props.placeOrderActions.dispatch_checkedGoodsExtraItem(goodsExtra, extraItem);
    }

    //添加进购物车
    saveShoppingCart = () => {
        const { goodsExtraMap } = this.props.placeOrder;        
        const currentGoodsExtraList = goodsExtraMap[this.goodsId];
        let extraCodes = null;
        //组装选择的商品附属信息
        if(currentGoodsExtraList && currentGoodsExtraList.length > 0) {
            extraCodes = {};
            for(let j = 0; j < currentGoodsExtraList.length; j++) {
                const extra = currentGoodsExtraList[j];
                var flag = false;
                for(let i = 0; i < extra.items.length; i++) {
                    if(extra.items[i].checked) {
                        flag = true;
                        extraCodes[extra.extraCode] = extra.items[i].itemValue
                        break;
                    }
                }
                if(!flag) {
                    Alert.alert(
                        '提示',
                        `请选择附属属性[${extra.extraName}]的具体项`,
                        [
                          {text: '确认'},
                        ],
                        { cancelable: false }
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
        if(global.socket) {
            global.socket.emit("saveShoppingCart", { goodsId: this.goodsId, num: 1, uId: null, tableCode: this.tableCode, extraCodes, remark});
        } else {
            Toast.info("未连接店内wifi点餐服务", 1);
        }
        const new_generalRemark = this.state.generalRemark.map(remarkItem => {
            remarkItem.checked = false;
            return remarkItem;
        });
        this.setState({extraModalVisible: false, generalRemark: new_generalRemark, remarkText: ''});
    }

    renderCartItem = (cartItem) => {
        const { goodsExtraMap, todayGoodsDays, effectiveGoodsDiscounts } = this.props.placeOrder;
        const renderExtraItemName = () => {
            const extraItems = cartItem.extraItems;
            if(goodsExtraMap[cartItem.goodsId]) {
                calCartExtraPrice(cartItem, goodsExtraMap);
                return (
                    <Fragment><Text style={{color: '#ccc', fontSize: 12}}>{cartItem.extraItemNames}</Text></Fragment>
                )
            } else {
                return null;
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
                return <Fragment><View style={{flexDirection: 'row', alignItems: 'flex-end'}}><Text >{cartItem.name}</Text><Text style={{color: '#ff4242'}}>(特价)</Text>{renderExtraItemName()}</View>
                    <View style={{flexDirection: 'row',}}><Text style={{marginRight: 8}}>x{cartItem.num}</Text><Text>￥{numeral((todayGoodsDay.price + (cartItem.extraPrice || 0)) * cartItem.num).format('0,0.00')}</Text></View></Fragment>
            } else if(goodsDiscount) {
                return <Fragment><View style={{flexDirection: 'row', alignItems: 'flex-end'}}><Text >{cartItem.name}</Text><Text style={{color: '#ff4242'}}>({goodsDiscount.discountValue}折)</Text>{renderExtraItemName()}</View>
                    <View style={{flexDirection: 'row',}}><Text style={{marginRight: 8}}>x{cartItem.num}</Text><Text>￥{numeral((goodsDiscount.discountValue * 10 /100) * (cartItem.price + (cartItem.extraPrice || 0)) * cartItem.num).format('0,0.00')}</Text></View></Fragment>
            } else {
                return <Fragment><View style={{flexDirection: 'row', alignItems: 'flex-end'}}><Text>{cartItem.name}{renderExtraItemName()}{}</Text></View>
                    <View style={{flexDirection: 'row',}}><Text style={{marginRight: 8}}>x{cartItem.num}</Text><Text>￥{numeral((cartItem.price + (cartItem.extraPrice || 0)) * cartItem.num).format('0,0.00')}</Text></View></Fragment>
            }

        }
        
        return (
            <View key={cartItem.id} style={{flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 4, justifyContent: 'space-between', minHeight: 32,
                borderBottomColor: '#ccc', borderBottomWidth: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>{renderCartItemName()}</View>
                <View style={{flexDirection: 'row', width: 60, justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={() => {this.subGoods2(cartItem.id)}}>
                        <Ionicons name="md-remove-circle-outline" size={24} style={{color: '#1296db'}}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
       )
    }

    calTotalPrice = () => {
        const { local_cartList } = this.state;
        const { todayGoodsDays, effectiveGoodsDiscounts } = this.props.placeOrder;
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
        })
        
        return totalPrice;
    }

    confirmDinersNum = () => {
        //加菜就不需要弹出确认用餐人数输入界面
        if(this.isAppend) {
            this.setState({cancelCartItemModalVisible: false});
            this.submitOrder();
        } else {
            this.setState({cancelCartItemModalVisible: false, dinersNumModalVisible: true});
        }
    }

    submitOrder = () => {
        const { local_cartList, dinersNum = 1} = this.state;
        let cart = {orderMethod: 2, cartItem: local_cartList, tableCode: this.tableCode, tableStatus: 2, dinersNum};
        if(global.socket) {
            this.setState({dinersNumModalVisible: false});
            getSub().then(username => {
                global.socket.emit("submitOrder", {...cart, createUser: username.indexOf(":") > -1 ? username.split(":")[1] : username});
            });
        }
    }

    //点购物车的时候 渲染所有商品
    renderAllCartItem = () => {
        const { local_cartList } = this.state;
        if(local_cartList.length == 0) {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'center', height: 100, alignItems: 'center'}}>
                    <Text>用餐订单空空如也~~</Text>
                </View>
            )
        } else {
            return (
                <View style={{flexDirection: 'column', justifyContent: 'flex-start', minHeight: 100}}>
                    {
                        this.state.local_cartList.map(cartItem => {
                            return (
                                this.renderCartItem(cartItem)
                            )                                
                        })
                    }
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 4, justifyContent: 'flex-end', height: 40}}>
                        <Text >总价:<Text style={{color: '#000', fontSize: 18}}>￥{numeral(this.calTotalPrice()).format('0,0.00')}</Text></Text>
                    </View>
                    <Button
                        onPress={() => {this.confirmDinersNum()}}
                        containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={{ fontSize: 16, color: '#fff', marginLeft: 8, marginRight: 8 }}
                    >
                        提交用餐订单
                    </Button>
                </View>
            )
        }
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

    render() {
        const { goodsExtraMap } = this.props.placeOrder;
        const { local_cartList, currGoodsDefaultImage, generalRemark } = this.state;
        const brageNum = () => {
            let brageNum = 0;
            local_cartList.forEach(cart => {
                brageNum += cart.num;
            });
            return brageNum;
        }
        return (
            <View style={styles.container}>
                {this.renderCategory()}
                <View style={{ position: 'absolute', bottom: 4, left: 8, }}>
                    <IconBadge
                        MainElement={
                            <TouchableOpacity onPress={() => {this.showCartItem()}}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#1296db',
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    margin: 4,
                                    elevation: 2,
                                }} >
                                    <Image style={{ width: 24, height: 24, }} source={require('../../assets/images/cart.png')} />
                                </View>
                            </TouchableOpacity>
                        }
                        BadgeElement={
                            <View style={{elevation: 3,}}><Text style={{ color: '#FFFFFF',}}>{brageNum()}</Text></View>
                        }
                        IconBadgeStyle={
                            {
                                width: 20,
                                height: 20,
                                elevation: 2,
                                backgroundColor: '#ff4242',
                            }
                        }
                        Hidden={local_cartList.length === 0}
                    />
                </View>

                <Modal 
                    animationType={'fade'}
                    visible={this.state.extraModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({extraModalVisible: false});
                    }}
                >
                    <View style={[{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                        <View style={{  backgroundColor: '#fff', width: width - 50, borderRadius: 10, paddingHorizontal: 8, paddingTop: 4, paddingBottom: 16, shadowRadius: 4 }}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TouchableOpacity onPress={() => {this.setState({extraModalVisible: false});}}>
                                    <Text style={{fontSize: 16}} >
                                        <Ionicons name="md-close-circle-outline" size={24}></Ionicons>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {
                                goodsExtraMap[this.goodsId] && goodsExtraMap[this.goodsId].map(goodsExtra => {
                                    return (
                                        <View key={goodsExtra.id} >
                                            <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1, borderStyle: 'solid', marginBottom: 8}}>
                                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{goodsExtra.extraName}</Text>
                                            </View>
                                            <View style={{marginVertical: 4, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                                            {
                                                goodsExtra.items.map(extraItem => {
                                                    if(extraItem.checked) {
                                                        return (
                                                            <TouchableOpacity onPress={() => this.checkGoodsExtraItem(goodsExtra, extraItem)} key={extraItem.id}
                                                                style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                                            >
                                                                <Ionicons name="md-checkbox-outline" style={{fontSize: 24}}></Ionicons><Text>{extraItem.itemName}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    } else {
                                                        return (
                                                            <TouchableOpacity onPress={() => this.checkGoodsExtraItem(goodsExtra, extraItem)} key={extraItem.id}
                                                                style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                                            >
                                                                <Ionicons name="md-square-outline" style={{fontSize: 24}}></Ionicons><Text>{extraItem.itemName}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                    
                                                })
                                            }
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1, borderStyle: 'solid', marginVertical: 8}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>常用备注</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginVertical: 4}}>
                                {
                                    generalRemark.map(remark => {
                                        return (
                                            <TouchableOpacity onPress={() => this.addRemark(remark)} key={remark.id}>
                                                <Text style={remark.checked ? {backgroundColor: '#1296db', marginHorizontal: 4}
                                                : {backgroundColor: '#ccc', marginHorizontal: 4}}>{remark.value}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1, borderStyle: 'solid', marginVertical: 8}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>其他备注</Text>
                            </View>
                            <View style={{marginBottom: 8}}>
                                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, textAlignVertical: 'top'}}
                                    multiline={true} onChangeText={(text) => this.setState({remarkText: text})} value={this.state.remarkText}
                                    numberOfLines={4} underlineColorAndroid={'transparent'} maxLength={200}
                                >
                                </TextInput>
                            </View>
                            <Button
                                onPress={() => {this.saveShoppingCart()}}
                                containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                                disabledContainerStyle={{ backgroundColor: 'grey' }}
                                style={{ fontSize: 16, color: '#fff', marginLeft: 8, marginRight: 8 }}
                            >
                                确定
                            </Button>
                        </View>
                    </View>
                </Modal>

                <Modal 
                    animationType={'fade'}
                    visible={this.state.previewGoodsImageModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({previewGoodsImageModalVisible: false});
                    }}
                >
                    <View style={[{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                        <TouchableOpacity onPress={() => {this.setState({previewGoodsImageModalVisible: false})}} >
                            <Image style={{
                                    width: width,
                                    height: 500,
                                    resizeMode: "contain"
                                }} source={{ uri: currGoodsDefaultImage }} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                
                <Modal 
                    animationType={'fade'}
                    visible={this.state.dinersNumModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({dinersNumModalVisible: false});
                    }}
                >
                    <View style={[{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                        <View style={{  backgroundColor: '#fff', width: width - 50, borderRadius: 10, paddingHorizontal: 8, paddingTop: 4, paddingBottom: 16, shadowRadius: 4 }}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TouchableOpacity onPress={() => {this.setState({dinersNumModalVisible: false});}}>
                                    <Text style={{fontSize: 16}} >
                                        <Ionicons name="md-close-circle-outline" size={24}></Ionicons>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginVertical: 8, flexDirection: 'row', justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>请确认用餐人数</Text>
                            </View>
                            <View style={{ marginVertical: 8}}>
                                <TextInput
                                    autoFocus={true}
                                    underlineColorAndroid={'transparent'}
                                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                    onChangeText={(text) => {
                                        const newText = text.replace(/[^\d]+/, '');
                                        //可以打印看看是否过滤掉了非数字
                                        this.setState({dinersNum: newText})
                                    }}
                                    value={this.state.dinersNum}
                                    //为了方便测试时输入字母，属性（keyboardType）不设置，实际使用时加上
                                    keyboardType='numeric'
                                />
                            </View>
                            <Button
                                onPress={() => {this.submitOrder()}}
                                containerStyle={{ padding: 10, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1296db' }}
                                disabledContainerStyle={{ backgroundColor: 'grey' }}
                                style={{ fontSize: 16, color: '#fff', marginLeft: 8, marginRight: 8 }}
                                disabled={!this.state.dinersNum}
                            >
                                确定提交
                            </Button>
                        </View>
                    </View>
                </Modal>

                <AntdModal
                    popup
                    animationType="slide-up"
                    maskClosable={true}
                    visible={this.state.cancelCartItemModalVisible}
                    onClose={() => {
                        this.setState({cancelCartItemModalVisible: false});
                    }}
                >
                    <View style={{  backgroundColor: '#fff', width: width, borderRadius: 10, paddingHorizontal: 8, paddingTop: 4, paddingBottom: 16, shadowRadius: 4 }}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={() => {this.setState({cancelCartItemModalVisible: false});}}>
                                <Text style={{fontSize: 16}} >
                                    <Ionicons name="md-close-circle-outline" size={24}></Ionicons>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.cancelGoodsId ? this.renderCartItemByGoodsId() : this.renderAllCartItem()
                        }
                    </View>
                </AntdModal>
            </View>
        )
    }
}

export default connect((state) => {
    return {
        placeOrder: state.placeOrder
    }
}, (dispatch) => {
    return { placeOrderActions: bindActionCreators(placeOrderActions, dispatch) }
})(PlaceOrderScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    },
    loadingStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});