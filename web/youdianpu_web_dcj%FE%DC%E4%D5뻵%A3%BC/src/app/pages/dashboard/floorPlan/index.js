import React, { Component, Fragment } from 'react';
import { Modal, Affix, Radio, message, notification, Collapse, Tag, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { ipcRenderer } from 'electron';
import numeral from 'numeral';

import screenActions from '../../../actions/screen';
import defaultPageActions from '../../../actions/defaultPage';
import floorPlanActions from '../../../actions/floorPlan';
import hisOrderActions from '../../../actions/hisOrder';

import PrintTicket from './printTicket';
import PlaceOrder from './placeOrder';
import ExtraModal from './extraModal';
import OrderDetail from './orderDetail';
import QRCodeModal from './qrcodeModal';
import CashCouponModal from './cashCouponModal';
import MergeTableModal from './mergeTableModal';
import PaymentModal from './paymentModal';
import DinersNumModal from './dinersNumModal';
import RemarkModal from './remarkModal';
import PlaceOrderCopy from './placeOrderCopy';
import MemberPaymentModal from './memberPaymentModal';
import PrintOrderModal from './printOrderModal';
import ChangeTableModal from './changeTableModal';
import OperationModal from './operationModal';
import styles from './index.less';
import { getUid, getToken, getSub } from '../../../utils/authority';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class FloorPlan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,//小票打印modal
            placeOrderModalVisible: false,//下单操作modal
            copyPlaceOrderModalVisible: false,//复制其它桌台下单
            extraModalVisible: false, //商品附属属性modal
            QRCodeModalVisible: false, //桌台二维码
            couponConsumeVisible: false, //记录现金券消费
            mergeTableModalVisible: false,//合并其它桌台收银
            paymentModalVisible: false,//收银
            dinersNumModalVisible: false,//用餐人数modal
            payOrderModalVisible: false,//前台扫码支付订单
            remarkModalVisible: false,//关联收银金额不相等时需要弹出备注信息
            memberPaymentModalVisible: false,//会员消费
            printOrderModalVisible: false,//打印后厨订单明细
            changeTableModalVisible: false,//换台
            operationModalVisible: false,//操作
            floorList: [],
        }
    }

    configureStylesheet = (graph) => {
        let style = new Object();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_IMAGE] = 'static/images/cmschina.png';
        style[mxConstants.STYLE_FONTCOLOR] = '#FFF000';
        this.graph.getStylesheet().putCellStyle('image', style);
    }

    hideSplash = () => {
        const splash = this.refs.splash;
        if (splash != null) {
            try {
                mxEvent.release(splash);
                mxEffects.fadeOut(splash, 100, true);
            }
            catch (e) {
                splash.parentNode.removeChild(splash);
            }
        }
    }

    getFloorXml = (floors) => {
        if (floors && floors.length > 0) {
            let defaultFloorId = this.props.floorPlan.defaultFloorId;
            if (!defaultFloorId) {
                for (var i = 0; i < floors.length; i++) {
                    if (floors[i].status === 1) {
                        defaultFloorId = floors[i].id;
                        break;
                    }
                }
                this.props.floorPlanActions.radioOnChange(defaultFloorId);
            }
            if (defaultFloorId) {
                ipcRenderer.on('getFloorXML-reply', (event, arg) => {       
                    ipcRenderer.removeAllListeners("getFloorXML-reply");
                    var node = mxUtils.parseXml(arg.xmlData).documentElement;
                    var dec = new mxCodec(node.ownerDocument);
                    dec.decode(node, this.editor.graph.getModel());
                    //查询桌台状态(本地)
                    ipcRenderer.send("selectTableStatus");
                });
                ipcRenderer.send('getFloorXML', {floorId: defaultFloorId, token: getToken()});
            }
        } else {
            Modal.info({
                title: '提示',
                content: "您还没有新建任何场地,请到主应用中[基础管理]->[场地管理]新建场地并设计平面图",
                okText: "我知道了",
            });
        }
    }

    componentDidMount() {
        
        mxGraph.prototype.htmlLabels = true;
        mxConstants.DEFAULT_HOTSPOT = 1;
        // Enables guides
        mxGraphHandler.prototype.guidesEnabled = true;
        mxObjectCodec.allowEval = true;

        const node = mxUtils.load('/src/config/workfloweditor.xml').getDocumentElement();
        this.editor = new mxEditor(node);
        mxObjectCodec.allowEval = false;
        this.editor.graph.allowAutoPanning = true;
        // this.editor.graph.setEnabled(false);
        //锁定
        this.editor.graph.setCellsLocked(true);
        //设置一次只能选择一个
        this.editor.graph.getSelectionModel().setSingleSelection(true);
        this.editor.graph.addListener(mxEvent.CLICK, (sender, evt) => {
            const cell = evt.getProperty('cell');
            if(!cell) return;
            const tableCode = cell.getAttribute("tableCode");
            this.tableCode = tableCode;
            this.handleOperationModalVisible(true);
        });
        ipcRenderer.on('initPlaceOrder-reply', (event, arg) => {           
            this.props.floorPlanActions.dispatchInit_local(arg).then(() => {
                const local_cartList = arg[2];
                //购物车内商品已选择好的附属属性,需要查询出价格波动
                const goodsIds = [];
                local_cartList.forEach(item => {
                    if(item.extraItems && item.extraItems.length > 0) {
                        goodsIds.push(item.goodsId);
                    }
                })
                ipcRenderer.on('listExtras-reply', (event, data) => {
                    ipcRenderer.removeAllListeners("listExtras-reply");
                    const goodsExtraMap = {};
                    for(let i = 0; i < goodsIds.length; i++) {
                        goodsExtraMap[goodsIds[i]] = data[i];
                    }
                    this.props.floorPlanActions.dispatch_goodsExtras(goodsExtraMap);
                    this.listTodayGoodsDayDiscount(goodsIds);
                });
                ipcRenderer.send('listExtras', {goodsIds})
            });
        });
        ipcRenderer.on('selectTableStatus-reply', (event, arg) => {
            //修改桌台状态
            const cells = this.editor.graph.getChildCells();
            arg.forEach(item => {
                const cell = cells.find(cellItem => {
                    return cellItem.getAttribute('tableCode') == item.tableCode;
                });
                if(cell && item.status != 1) {
                    this.updateTableCellStyle(cell, item.status);
                }
            });
            this.props.floorPlanActions.dispatch_tableStatus(arg);
        });
        //各种socket客户端修改桌台状态
        ipcRenderer.on("udpateTableStatusMsg", (event, arg) => {
            //修改桌台状态
            const cells = this.editor.graph.getChildCells();
            const cell = cells.find(cellItem => {
                return cellItem.getAttribute('tableCode') == arg.tableCode;
            });
            if(cell) {
                this.updateTableCellStyle(cell, arg.status);
            }
            this.props.floorPlanActions.changeTableStatus({tableCode: arg.tableCode, status: arg.status});
        });
        //场地信息
        ipcRenderer.on('selectFloor-reply', (event, floors) => {
            ipcRenderer.removeAllListeners("selectFloor-reply");
            this.props.screenActions.dispatch_screen(floors);
            this.getFloorXml(floors);
        });
        ipcRenderer.send('selectFloor');
        //[减免、折扣]与现金券是否可以同时享受
        /*
        ipcRenderer.on('selectBasicConfig-reply', (event, arg) => {
            this.props.floorPlanActions.dispatch_ESCT(arg);
        });
        ipcRenderer.send('selectBasicConfig', 'enabled-subtract-coupon-together');
        */
        // ipcRenderer.on("callPaymentFinishedMSG", this.callPaymentFinishedMSGListener);
        //确认订单
        ipcRenderer.on("confirmOrderMsg", (event, arg) => {
            const { orderNo } = arg;
            this.props.floorPlanActions.dispatchConfirmOrder(orderNo);
        });
    }   

    componentWillUnmount() {
        this.editor.destroy();
        this.editor = null;
        ipcRenderer.removeAllListeners("initPlaceOrder-reply");
        ipcRenderer.removeAllListeners("selectTableStatus-reply");
        // ipcRenderer.removeAllListeners("selectBasicConfig-reply");
        ipcRenderer.removeAllListeners("udpateTableStatusMsg");
        ipcRenderer.removeAllListeners("confirmOrderMsg");
        // ipcRenderer.removeListener("callPaymentFinishedMSG", this.callPaymentFinishedMSGListener);
    }

    //桌台状态设置为空闲
    setFree = () => {
        const tableCode = this.tableCode;
        const { allTableStatus } = this.props.floorPlan;
        const tableStatusObj = allTableStatus.find(item => item.tableCode == tableCode);
        if(tableStatusObj && tableStatusObj.status == 4) {
            this.props.floorPlanActions.countByTableCode(tableCode).then(data => {
                if(data == 0) {
                    Modal.confirm({
                        title: '确定将桌台重置为空闲状态吗?',
                        content: "将桌台状态重置为空闲,已下单列表将会被清空.",
                        onOk: () => {
                            ipcRenderer.send('udpateTableStatus', {tableCode: tableCode, status: 1});
                            this.clearShoppingCart(tableCode);
                            this.props.floorPlanActions.changeTableStatus({tableCode: tableCode, status: 1});
                            //this.updateTableCellStyle(cell, 1);//桌台设置为空闲状态
                        },
                    });
                } else {
                    message.error("无法重置状态,该桌台有未完成的订单,请在[用餐订单]界面处理或者当前[订单明细(收银)]处理");
                }
            });
        } else {
            Modal.confirm({
                title: '确定将桌台重置为空闲状态吗?',
                content: "将桌台状态重置为空闲,已下单列表将会被清空.",
                onOk: () => {
                    ipcRenderer.send('udpateTableStatus', {tableCode: tableCode, status: 1});
                    this.clearShoppingCart(tableCode);
                    this.props.floorPlanActions.changeTableStatus({tableCode: tableCode, status: 1});
                    //this.updateTableCellStyle(cell, 1);//桌台设置为空闲状态
                },
            });
        }
    };

    //桌台状态设置为用餐中
    setDinner = () => {
        const tableCode = this.tableCode;      
        ipcRenderer.send('udpateTableStatus', {tableCode: tableCode, status: 4});
        this.props.floorPlanActions.changeTableStatus({tableCode: tableCode, status: 4});
        message.success("设置成功")
    };

    //桌台状态设置为入座点餐中
    setSeat = () => {
        const tableCode = this.tableCode;
        ipcRenderer.send('udpateTableStatus', {tableCode: tableCode, status: 2});
        this.props.floorPlanActions.changeTableStatus({tableCode: tableCode, status: 2});
        //this.updateTableCellStyle(cell, 2);//桌台设置为空闲状态
        message.success("设置成功")
    };

    //打印后厨订单明细
    printOrder = () => {
        const tableCode = this.tableCode;
        this.props.floorPlanActions.listNoCompleteOrderByTableCode(tableCode);
        this.handlePrintOrderModalVisible(true);
    };

    //打印小票
    printTicket = () => {
        this.setState({ modalVisible: true });
    };

    //订单明细(收银)
    viewOrderItem = () => {
        const tableCode = this.tableCode;
        this.props.floorPlanActions.listNoCompleteOrderByTableCode(tableCode);
        this.props.floorPlanActions.handleOrderDetailVisible(true);
    };

    //换台
    changeTable = () => {
        this.handleChangeTableModalVisible(true);
    };

    //下单(复制其它桌台订单)
    hadnleCopyOrder = () => {
        if(this.tableCode == null) {
            message.warning("该桌台还未设置桌台编号,请在场地管理的平面设计中设置桌台编号.")
        } else {
            this.handleCopyPlaceOrderModalVisible(true);
        }
    };

    //下单
    initPlaceOrder = () => {
        if(this.tableCode == null) {
            message.warning("该桌台还未设置桌台编号,请在场地管理的平面设计中设置桌台编号.")
        } else {
            this.setState({ placeOrderModalVisible: true });
            ipcRenderer.send('initPlaceOrder', { tableCode: this.tableCode });
        }
    };

    saveShoppingCard = (goodsId, extraCodes) => {
        const { tableCode } = this;
        // alert('goodsId:' + goodsId);
        // alert('tableId:' + this.tableId);
        // getUid();//商家ID
        ipcRenderer.on('saveShoppingCart-reply', (event, arg) => {
            // console.log(arg);
            this.props.floorPlanActions.dispatchShoppingCart_local(arg, goodsId, extraCodes);
            ipcRenderer.removeAllListeners("saveShoppingCart-reply");
        });
        ipcRenderer.send("saveShoppingCart", { goodsId, num: 1, uId: null, tableCode, extraCodes });
        ipcRenderer.send("udpateTableStatus", {tableCode: this.tableCode, status: 2});
        this.props.floorPlanActions.changeTableStatus({tableCode: this.tableCode, status: 2});
    }

    refreshOrderItemByTableCode = () => {
        const { tableCode } = this;
        this.props.floorPlanActions.listNoCompleteOrderByTableCode(tableCode);
    }

    handleModalVisible = (flag) => {
        this.setState({ modalVisible: !!flag });
    }

    handlePlaceOrderModalVisible = (flag) => {
        this.setState({ placeOrderModalVisible: !!flag });
    }

    handleCopyPlaceOrderModalVisible = (flag) => {
        if(flag) {
            ipcRenderer.on("selectAllTableFloor-reply", (event, arg) => {
                this.props.hisOrderActions.dispatchAllTables(arg);
                ipcRenderer.removeAllListeners("selectAllTableFloor-reply");
            });
            ipcRenderer.send("selectAllTableFloor");
        }
        this.setState({ copyPlaceOrderModalVisible: !!flag });
    }

    handleExtraModalVisible = (flag) => {
        this.setState({ extraModalVisible: !!flag });
    }

    handleQRCodeModalVisible = (flag) => {
        this.setState({ QRCodeModalVisible: !!flag });
    }

    handleCouponModalVisible = (flag) => {
        this.setState({ couponConsumeVisible: !!flag });
    }

    handleMergeTableModalVisible = (flag) => {
        this.setState({ mergeTableModalVisible: !!flag });
    }

    handlePaymentModalVisible = (flag) => {
        this.setState({ paymentModalVisible: !!flag });
    }

    handlePayOrderModalVisible = (flag) => {
        if(!flag) {
            this.handlePaymentModalVisible(true);
            this.props.floorPlanActions.paymentFormResetFields();
        }
        this.setState({ payOrderModalVisible: !!flag });
    }

    handleRemarkModalVisible = (flag) => {
        this.setState({ remarkModalVisible: !!flag});
    }

    handleMemberPaymentModalVisible = (flag) => {
        this.setState({ memberPaymentModalVisible: !!flag });
    }

    handlePrintOrderModalVisible = (flag) => {
        this.setState({ printOrderModalVisible: !!flag });
    }

    handleOperationModalVisible = (flag) => {
        this.setState({ operationModalVisible: !!flag });
    }

    handleChangeTableModalVisible = (flag) => {
        if(flag) {
            ipcRenderer.on("selectAllTableFloor-reply", (event, tables) => {
                ipcRenderer.removeAllListeners("selectAllTableFloor-reply");
                const { allTableStatus } = this.props.floorPlan;
                const floors = [];
                tables.forEach(item => {
                    let floor = floors.find(floorItem => floorItem.id == item.floor_id);
                    if(!floor) {
                        floor = {id: item.floor_id, name: item.floor_name, tables: []};
                        floors.push(floor);
                    }
                    const tableStatusObj = allTableStatus.find(itemA => itemA.tableCode == item.table_code);
                    if(tableStatusObj && tableStatusObj.status == 1) {
                        floor.tables.push({id: item.id, tableCode: item.table_code, tableName: item.table_name, status: item.status});
                    }
                });
                this.setState({floorList: floors, changeTableModalVisible: true});
            });
            ipcRenderer.send("selectAllTableFloor");
        } else {
            this.setState({changeTableModalVisible: false});
        }
    }
    handleDinersNumModalVisible = (flag) => {
        const { local_cartList } = this.props.floorPlan;
        if(local_cartList.length == 0) {
            message.info("还未下单,请先下单在提交订单");
            return;
        }
        this.setState({ dinersNumModalVisible: !!flag });
        this.props.floorPlanActions.resetDinersFormData(this.tableCode);
    }

    onFloorChange = (e) => {
        const defaultFloorId = e.target.value;
        this.props.floorPlanActions.radioOnChange(defaultFloorId);
        ipcRenderer.on('getFloorXML-reply', (event, arg) => {       
            ipcRenderer.removeAllListeners("getFloorXML-reply");
            var node = mxUtils.parseXml(arg.xmlData).documentElement;
            var dec = new mxCodec(node.ownerDocument);
            dec.decode(node, this.editor.graph.getModel());
            //查询桌台状态(本地)
            ipcRenderer.send("selectTableStatus");
        });
        ipcRenderer.send('getFloorXML', {floorId: defaultFloorId, token: getToken()});
    }

    listExtra = (goodsId) => {        
        const { goodsExtraMap } = this.props.floorPlan;
        ipcRenderer.on('listExtra-reply', (event, arg) => {
            ipcRenderer.removeAllListeners("listExtra-reply");
            //存在附属属性
            if(arg && arg.length > 0) {
                this.handleExtraModalVisible(true);
            } else {
                //没有附属属性，直接添加至购物车
                this.saveShoppingCard(goodsId);
            }
            this.props.floorPlanActions.dispatch_goodsExtra(goodsId, arg);
        });
        ipcRenderer.send('listExtra', goodsId);
    }

    //查询当天特价商品 \ 折扣商品
    listTodayGoodsDayDiscount = (goodsIds) => {
        const { isEnabledDiscount, isEnabledDays } = this.props.floorPlan;
        if(isEnabledDiscount == "0" || isEnabledDays == "0") {
            this.props.floorPlanActions.clearGoodsDayDiscount();
            if(goodsIds && goodsIds.length > 0) {
            } else {//所有商品都没有附属属性的时候,需要更新一下购物车里面的原价信息
                this.props.floorPlanActions.addCartOrigPrice();
            }
        }
        const listEffectiveGoodsDiscount = () => {
            ipcRenderer.on('listEffectiveGoodsDiscount-reply', (event, arg) => {
                this.props.floorPlanActions.dispatch_listEffectiveGoodsDiscount(arg);
                ipcRenderer.removeAllListeners("listEffectiveGoodsDiscount-reply");
            });
            ipcRenderer.send('listEffectiveGoodsDiscount');
        }
        const listTodayGoodsDays = () => {
            ipcRenderer.on('listTodayGoodsDays-reply', (event, arg) => {
                this.props.floorPlanActions.dispatch_listTodayGoodsDays(arg);
                ipcRenderer.removeAllListeners("listTodayGoodsDays-reply");
            });
            ipcRenderer.send('listTodayGoodsDays');
        } 
        const listTodayGoodsDaysAndDiscount = () => {
            ipcRenderer.on('listTodayGoodsDaysAndDiscount-reply', (event, arg) => {
                this.props.floorPlanActions.dispatch_listTodayGoodsDaysAndDiscount(arg);
                ipcRenderer.removeAllListeners("listTodayGoodsDaysAndDiscount-reply");
            });
            ipcRenderer.send('listTodayGoodsDaysAndDiscount');
        }
        if(isEnabledDiscount == "1" && isEnabledDays == "1") {
            listTodayGoodsDaysAndDiscount();
        } else if(isEnabledDiscount == "1") {
            listEffectiveGoodsDiscount();
        } else if(isEnabledDays == "1") {
            listTodayGoodsDays();
        }
    }

    updateShoppingCart = (row) => {
        const { local_goodsList, local_cartList } = this.props.floorPlan;
        const carts = local_cartList.filter(cartItem => cartItem.goodsId == row.goodsId);
        let count = row.num;
        carts.forEach(item => {
            if(item.id !== row.id) {
                count += item.num
            }
        });
        const goods = local_goodsList.find(goodsItem => goodsItem.id === row.goodsId);
        //允许每桌台点多少份
        if (goods.limitNum && count > goods.limitNum) {
            message.warn(`${goods.name}每桌最多允许点${goods.limitNum}${goods.unitName}`);
        } else {
            ipcRenderer.send('updateShoppingCart', row);
            this.props.floorPlanActions.updateShoppingCart(row);
        }
    }

    deleteShoppingCart = (id) => {
        ipcRenderer.send('deleteShoppingCart', {id});
        this.props.floorPlanActions.deleteShoppingCart(id);
    }

    clearShoppingCart = (tableCode) => {
        ipcRenderer.send('clearShoppingCart', {tableCode});
        this.props.floorPlanActions.clearShoppingCart(tableCode);
    }

    submitOrder = (dinersNum) => {
        const { local_cartList, allTableStatus } = this.props.floorPlan;
        if(local_cartList.length == 0) {
            message.info("还未下单,请先下单在提交订单");
            return;
        }
        const { currMerchantInfo } = this.props.homePage;
        //下单方式3,桌面端app下单
        //查找桌台状态
        const tableStatusObj = allTableStatus.find(item => item.tableCode == this.tableCode);
        let cart = {orderMethod: 5, cartItem: local_cartList, tableCode: this.tableCode, tableStatus: tableStatusObj.status, dinersNum: dinersNum};

        ipcRenderer.on('submitOrderToServer-reply', (event, arg) => {
            if(arg.success) {
                message.success("用餐订单已成功提交");
                this.setState({ placeOrderModalVisible: false, dinersNumModalVisible: false });
                //提交至本地的一些处理(修改桌台状态, 清除购物车, 减库存)
                ipcRenderer.send('submitOrder', {...cart, createUser: ''});
                ipcRenderer.send('udpateTableStatus', {tableCode: this.tableCode, status: 4});
                //更改cell样式(桌台状态=4)
                // const cell = this.editor.graph.getSelectionCell();
                this.props.floorPlanActions.changeTableStatus({tableCode: this.tableCode, status: 4});
                //this.updateTableCellStyle(cell, 4);//主应用下单，状态设置成4, 等待上菜就餐中
                
                this.printTicketAndOrder({...cart, ...arg.results});
                this.props.floorPlanActions.dispatch_submitOrderSuccess(cart);
            } else {
                if(arg.fetchError) {
                    Modal.confirm({
                        title: '您的网络好像出现了问题,是否先发往后厨打印订单明细？',
                        content: '等您网络好了可以在提交订单',
                        onOk() {
                            // console.log('OK');
                        },
                    })
                } else {
                    message.error(arg.message);
                }
                this.props.floorPlanActions.dispatch_submitOrderFailure(cart);
            }
            ipcRenderer.removeAllListeners("submitOrderToServer-reply");
            
        });
        this.props.floorPlanActions.dispatch_submitOrderPending();
        ipcRenderer.send('submitOrderToServer', cart)
    }

    updateTableCellStyle = (tableCell, status) => {
        status = status || 1;
        const tableLimit = tableCell.getAttribute('tableLimit');
        this.editor.graph.setCellStyles(mxConstants.STYLE_IMAGE, `/stencils/tables/table_${tableLimit}_${status}.png`, [tableCell]);
    }
    
    //用餐人数确认
    dinersFormFieldChange = (values) => {
        this.props.floorPlanActions.onDinersFormFieldChange(this.tableCode, values);
    }

    //从订单详情界面modal打开下单modal
    goPlaceOrder = () => {
        this.setState({placeOrderModalVisible: true});
        ipcRenderer.send('initPlaceOrder', { tableCode: this.tableCode });
        this.props.floorPlanActions.handleOrderDetailVisible(false);
    }
    
    //退单
    cancelOrderItem = (orderNo, orderItemId) => {
        this.props.floorPlanActions.cancelOrderItem(orderNo, orderItemId, this.tableCode).then(() => {
            this.refreshOrderItemByTableCode();
        });
    }

    //关闭订单项
    deleteOrderItem = (orderNo, orderItemId) => {
        this.props.floorPlanActions.deleteOrderItem(orderNo, orderItemId, this.tableCode).then(() => {
            this.refreshOrderItemByTableCode();
        });
    }

    //完成订单
    finishedOrder = () => {
        const { orderList } = this.props.floorPlan;
        const currOrder = orderList.find(item => {
            return item.tableCode == this.tableCode;
        });
        if(!currOrder) {
            message.error('没有需要完成交易的订单');
            return;
        }
        this.props.floorPlanActions.finishedOrder(currOrder.orderNo, this.tableCode).then((tableCodes) => {
            message.success("成功完成交易");
            /* Modal.confirm({
                title: '提示',
                content: `是否发送收拾桌台消息至服务员版手机端APP?`,
                onOk: () => {
                    message.success("收拾桌台消息已成功发送至手机端APP");
                },
                okText: '是',
                cancelText: '否',
            }); */
            const cells = this.editor.graph.getChildCells();
            if(tableCodes.length > 0) {
                tableCodes.forEach(tableCode => {
                    const cell = cells.find(cellItem => {
                        return cellItem.getAttribute('tableCode') == tableCode;
                    });
                    if(cell) {
                        ipcRenderer.send('udpateTableStatus', {tableCode: tableCode, status: 5});
                        this.props.floorPlanActions.changeTableStatus({tableCode: tableCode, status: 5});
                        //this.updateTableCellStyle(cell, 5);//桌台设置为待收拾状态
                    }
                })
            } else {
                const cell = cells.find(cellItem => {
                    return cellItem.getAttribute('tableCode') == this.tableCode;
                });
                if(cell) {
                    ipcRenderer.send('udpateTableStatus', {tableCode: this.tableCode, status: 5});
                    this.props.floorPlanActions.changeTableStatus({tableCode: this.tableCode, status: 5});
                    //this.updateTableCellStyle(cell, 5);//桌台设置为待收拾状态
                }
            }            
        });
    }

    //复制其它桌台订单下单
    copyOrder = (sourceTableCode) => {
        const targetTableCode = this.tableCode;
        if(sourceTableCode == targetTableCode) {
            message.error("不能复制自己");
            return;
        }

        this.props.floorPlanActions.copyOrder(sourceTableCode, targetTableCode).then(() => {
            this.handleCopyPlaceOrderModalVisible(false);
            message.success("复制下单成功");
            ipcRenderer.send('udpateTableStatus', {tableCode: targetTableCode, status: 4});
            this.props.floorPlanActions.changeTableStatus({tableCode: targetTableCode, status: 4});
            
            const { currMerchantInfo } = this.props.homePage;
            const selectOrderDetail = (callback) => {
                this.props.floorPlanActions.selectOrderByTableCode(this.tableCode).then(data => {
                    const cart = {
                        orderNo: data.orderNo,
                        tableCode: data.tableCode,
                        dinersNum: data.dinersNum,
                        orderTime: data.orderTime,
                        cartItem: [],
                    };
                    data.orderItemVos.forEach(orderItem => {
                        let cartItem = {};
                        cartItem.name = orderItem.goodsName;
                        cartItem.price = orderItem.price;
                        cartItem.itemPrice = orderItem.price * parseInt(orderItem.num);
                        cartItem.num = orderItem.num;
                        cartItem.unitName = orderItem.goodsUnitName;
                        if(orderItem.ruleCode == "1") {
                            cartItem.dayOrDiscountName = '特价';
                        } else if(orderItem.ruleCode == "2") {
                            cartItem.dayOrDiscountName = `${orderItem.ruleValue}折`;
                        }
                        cartItem.remark = orderItem.remark;
                        cartItem.extraItemNames = orderItem.extraName;
                        cart.cartItem.push(cartItem);
                    });
                    callback(cart);
                });
            }
            //后厨是否自动打印订单明细信息
            ipcRenderer.on('selectPrintConfigs-reply', (event, arg) => {
                if(arg) {
                    const autoPrintTicket = arg.find(item => item.config_code == 'auto-print-ticket' && item.config_value == "1");
                    const autoPrintOrder = arg.find(item => item.config_code == 'auto-print-order' && item.config_value == "1");
                    if(autoPrintTicket && autoPrintOrder) {
                        //打印小票
                        ipcRenderer.on('printTicket-reply', (event, arg) => {
                            if(arg.success) {
                                //修改订单打印状态
                            } else {
                                // message.error(`下单小票打印失败,${arg.message}`);
                                notification['error']({
                                    message: `下单小票打印失败,${arg.message}`,
                                    duration: null,
                                });
                            }
                            ipcRenderer.removeAllListeners("printTicket-reply");
                        });
                        //后厨打印用餐订单明细
                        ipcRenderer.on('printOrder-reply', (event, arg) => {
                            if(arg.success) {
                                //修改订单打印状态
                                this.props.floorPlanActions.updateOrderItemPrintStatus(this.tableCode);
                                message.success("成功发往后厨打印");
                            } else {
                                // message.error(`后厨用餐订单明细打印失败,${arg.message}`);
                                notification['error']({
                                    message: `后厨打印用餐订单明细失败,${arg.message}`,
                                    duration: null,
                                });
                            }
                            ipcRenderer.removeAllListeners("printOrder-reply");
                        });
                        selectOrderDetail((cart) => {
                            ipcRenderer.send('printTicket', {cart, merchant: currMerchantInfo});
                            ipcRenderer.send('app_printOrder', {cart});
                        });
                    } else if(autoPrintTicket && !autoPrintOrder) {
                        //打印小票
                        ipcRenderer.on('printTicket-reply', (event, arg) => {
                            if(arg.success) {
                                //修改订单打印状态
                            } else {
                                // message.error(`下单小票打印失败,${arg.message}`);
                                notification['error']({
                                    message: `下单小票打印失败,${arg.message}`,
                                    duration: null,
                                });
                            }
                            ipcRenderer.removeAllListeners("printTicket-reply");
                        });
                        selectOrderDetail((cart) => {
                            ipcRenderer.send('printTicket', {cart, merchant: currMerchantInfo});
                        });
                    } else if(!autoPrintTicket && autoPrintOrder) {
                        //后厨打印用餐订单明细
                        ipcRenderer.on('printOrder-reply', (event, arg) => {
                            if(arg.success) {
                                //修改订单打印状态
                                this.props.floorPlanActions.updateOrderItemPrintStatus(this.tableCode);
                                message.success("成功发往后厨打印");
                            } else {
                                // message.error(`后厨用餐订单明细打印失败,${arg.message}`);
                                notification['error']({
                                    message: `后厨打印用餐订单明细失败,${arg.message}`,
                                    duration: null,
                                });
                            }
                            ipcRenderer.removeAllListeners("printOrder-reply");
                        });
                        selectOrderDetail((cart) => {
                            ipcRenderer.send('app_printOrder', {cart});
                        });
                    }
                }
                ipcRenderer.removeAllListeners('selectPrintConfigs-reply');
            });
            ipcRenderer.send('selectPrintConfigs');
        });
    }

    //打印小票
    rePrintTicket = (isRePrint) => {
        const { currMerchantInfo } = this.props.homePage;
        this.props.floorPlanActions.selectOrderByTableCode(this.tableCode).then(data => {
            const cart = {
                orderNo: data.orderNo,
                tableCode: data.tableCode,
                isRePrint,
                dinersNum: data.dinersNum,
                orderTime: data.orderTime,
                cartItem: [],
            };
            data.orderItemVos.forEach(orderItem => {
                let cartItem = {};
                cartItem.name = orderItem.goodsName;
                cartItem.price = orderItem.price;
                cartItem.itemPrice = orderItem.price * parseInt(orderItem.num);
                cartItem.num = orderItem.num;
                cartItem.unitName = orderItem.goodsUnitName;
                if(orderItem.ruleCode == "1") {
                    cartItem.dayOrDiscountName = '特价';
                } else if(orderItem.ruleCode == "2") {
                    cartItem.dayOrDiscountName = `${orderItem.ruleValue}折`;
                }
                cartItem.remark = orderItem.remark;
                cartItem.extraItemNames = orderItem.extraName;
                cart.cartItem.push(cartItem);
            });
            ipcRenderer.on('printTicket-reply', (event, arg) => {
                if(arg.success) {
                    //修改订单打印状态
                } else {
                    message.error(`下单小票打印失败,${arg.message}`);
                }
                ipcRenderer.removeAllListeners("printTicket-reply");
                this.handleModalVisible(false);
            });
            ipcRenderer.send('printTicket', {cart, merchant: currMerchantInfo});
        });
    }

    //打印小票或者后厨订单明细
    printTicketAndOrder = (cart) => {
        const { currMerchantInfo } = this.props.homePage;
        //后厨是否自动打印订单明细信息
        ipcRenderer.on('selectPrintConfigs-reply', (event, arg) => {
            if(arg) {
                const autoPrintTicket = arg.find(item => item.config_code == 'auto-print-ticket' && item.config_value == "1");
                const autoPrintOrder = arg.find(item => item.config_code == 'auto-print-order' && item.config_value == "1");
                if(autoPrintTicket && autoPrintOrder) {
                    //打印小票
                    ipcRenderer.on('printTicket-reply', (event, arg) => {
                        if(arg.success) {
                            //修改订单打印状态
                        } else {
                            // message.error(`下单小票打印失败,${arg.message}`);
                            notification['error']({
                                message: `下单小票打印失败,${arg.message}`,
                                duration: null,
                            });
                        }
                        ipcRenderer.removeAllListeners("printTicket-reply");
                    });
                    //后厨打印用餐订单明细
                    ipcRenderer.on('printOrder-reply', (event, arg) => {
                        if(arg.success) {
                            //修改订单打印状态
                            this.props.floorPlanActions.updateOrderItemPrintStatus(this.tableCode);
                            message.success("成功发往后厨打印");
                        } else {
                            // message.error(`后厨用餐订单明细打印失败,${arg.message}`);
                            notification['error']({
                                message: `后厨打印用餐订单明细失败,${arg.message}`,
                                duration: null,
                            });
                        }
                        ipcRenderer.removeAllListeners("printOrder-reply");
                    });
                    ipcRenderer.send('printTicket', {cart, merchant: currMerchantInfo});
                    ipcRenderer.send('app_printOrder', {cart});
                } else if(autoPrintTicket && !autoPrintOrder) {
                    //打印小票
                    ipcRenderer.on('printTicket-reply', (event, arg) => {
                        if(arg.success) {
                            //修改订单打印状态
                        } else {
                            // message.error(`下单小票打印失败,${arg.message}`);
                            notification['error']({
                                message: `下单小票打印失败,${arg.message}`,
                                duration: null,
                            });
                        }
                        ipcRenderer.removeAllListeners("printTicket-reply");
                    });
                    ipcRenderer.send('printTicket', {cart, merchant: currMerchantInfo});
                } else if(!autoPrintTicket && autoPrintOrder) {
                    //后厨打印用餐订单明细
                    ipcRenderer.on('printOrder-reply', (event, arg) => {
                        if(arg.success) {
                            //修改订单打印状态
                            this.props.floorPlanActions.updateOrderItemPrintStatus(this.tableCode);
                            message.success("成功发往后厨打印");
                        } else {
                            // message.error(`后厨用餐订单明细打印失败,${arg.message}`);
                            notification['error']({
                                message: `后厨打印用餐订单明细失败,${arg.message}`,
                                duration: null,
                            });
                        }
                        ipcRenderer.removeAllListeners("printOrder-reply");
                    });
                    ipcRenderer.send('app_printOrder', {cart});
                }
            }
            ipcRenderer.removeAllListeners('selectPrintConfigs-reply');
        });
        ipcRenderer.send('selectPrintConfigs');
    }

    generateCart = (data) => {
        const cart = {
            orderNo: data.orderNo,
            tableCode: data.tableCode,
            dinersNum: data.dinersNum,
            orderTime: data.orderTime,
            cartItem: [],
        };
        data.orderItemVos.forEach(orderItem => {
            if(orderItem.printStatus == 0) {
                let cartItem = {};
                cartItem.name = orderItem.goodsName;
                cartItem.price = orderItem.price;
                cartItem.itemPrice = orderItem.price * parseInt(orderItem.num);
                cartItem.num = orderItem.num;
                cartItem.unitName = orderItem.goodsUnitName;
                if(orderItem.ruleCode == "1") {
                    cartItem.dayOrDiscountName = '特价';
                } else if(orderItem.ruleCode == "2") {
                    cartItem.dayOrDiscountName = `${orderItem.ruleValue}折`;
                }
                cartItem.remark = orderItem.remark;
                cartItem.extraItemNames = orderItem.extraName;
                cart.cartItem.push(cartItem);
                cart.orderTime = orderItem.orderItemTime;
            }
        });
        return cart;
    }

    //确认全部订单
    confirmOrder = (orderNo) => {
        const { orderList } = this.props.floorPlan;
        const data = orderList[0];
        this.props.floorPlanActions.confirmOrder(orderNo, this.tableCode).then(() => {
            message.success("用餐订单确认成功");
            ipcRenderer.send('udpateTableStatus', {tableCode: this.tableCode, status: 4});
            ipcRenderer.send('confirmOrder', {orderNo, tableCode: this.tableCode, username: getSub().indexOf(':') > -1 ? getSub().split(":")[1] : getSub()});
            this.props.floorPlanActions.changeTableStatus({tableCode: this.tableCode, status: 4});
            this.printTicketAndOrder(this.generateCart(data));
        });
    }

    //确认订单项
    confirmOrderItem = (orderNo, orderItemId) => {
        const { orderList } = this.props.floorPlan;
        const data = orderList[0];
        this.props.floorPlanActions.confirmOrderItem(orderNo, orderItemId, this.tableCode).then((result) => {
            message.success("用餐订单项确认成功");
            if(result == 0) {
                ipcRenderer.send('udpateTableStatus', {tableCode: this.tableCode, status: 4});
                ipcRenderer.send('confirmOrder', {orderNo, tableCode: this.tableCode, username: getSub().indexOf(':') > -1 ? getSub().split(":")[1] : getSub()});
                this.props.floorPlanActions.changeTableStatus({tableCode: this.tableCode, status: 4});
                this.printTicketAndOrder(this.generateCart(data));
            }
        });
    }

    //换台
    changeTableCode = (newTableCode) => {
        ipcRenderer.on('changeTableMsg',  (event, arg) => {
            const updateTableStatus = () => {
                const { allTableStatus } = this.props.floorPlan;
                const tableStatusObj = allTableStatus.find(itemA => itemA.tableCode == this.tableCode);
                ipcRenderer.send('udpateTableStatus', {tableCode: this.tableCode, status: 1});
                ipcRenderer.send('udpateTableStatus', {tableCode: newTableCode, status: tableStatusObj.status});
                this.props.floorPlanActions.changeTableStatus({tableCode: newTableCode, status: tableStatusObj.status}).then(() => {
                    this.props.floorPlanActions.changeTableStatus({tableCode: this.tableCode, status: 1});
                });
                this.handleChangeTableModalVisible(false);
            }
            //表示不是购物车，已提交了订单
            if(!arg.success) {
                this.props.floorPlanActions.changeTableCode(this.tableCode, newTableCode).then(() => {
                    message.success("换台成功");
                    updateTableStatus();
                });
            } else {
                updateTableStatus();
            }
            ipcRenderer.removeAllListeners("changeTableMsg");
        });
        ipcRenderer.send('changeTable', {tableCode: this.tableCode, newTableCode});
    }

    render() {
        const { modalVisible, placeOrderModalVisible, copyPlaceOrderModalVisible, extraModalVisible, QRCodeModalVisible, couponConsumeVisible, 
            mergeTableModalVisible, paymentModalVisible, dinersNumModalVisible, payOrderModalVisible, remarkModalVisible, memberPaymentModalVisible,
            printOrderModalVisible, changeTableModalVisible, operationModalVisible,
        } = this.state;//弹出modal框
        const { screenList } = this.props.screen;//场地信息列表
        const { info } = this.props.defaultPage;//点餐信息
        const { defaultFloorId, graphLeft, local_goodsList, local_cartList, local_goodsCategory, goodsLoading, 
            goodsExtraMap, currentGoodsId, cartLoading, submitOrderLoading, orderDetailVisible, orderListLoading, orderList,
            subtractMap, couponConsumeMap, currCouponConsumes, qrcodeData, payAmount, receivedAmount, syncAlipayResultLoading, syncWxpayResultLoading, saveCouponConsumeLoading,
            deleteCouponConsumeLoading, listOtherTablesLoading, otherTables, selectedOtherTables, gatheringLoading,
            dinersFormData, payOrderLoading, payOrderList, relateFrontOrderLoading, finishedOrderLoading, copyOrderLoading,
            memberInfo, memberBtnIsDisabled, selectMemberInfoLoading, phoneCodeLoading, memberComsumeLoading, 
            countDown, selectOrderLoading, confirmOrderLoading, paymentFormData, changeTableLoading } = this.props.floorPlan;//默认场地id, graph靠左边距, 本地商品信息
        const { categoryList } = this.props.goodsCategory;
        const { handleOrderDetailVisible, receiveOrderItem, subtractOnChange, onReceviedAmountChange, resetMemberInfo,
            updatePrintStatusByOrderItemIds, paymentFormFieldChangeValue } = this.props.floorPlanActions;
        const { initSocketIo, stopSocketIo, sendLogInfo } = this.props.defaultPageActions;
        const { dispatchAllTables } = this.props.hisOrderActions;
        const { floorList } = this.props.hisOrder;
        return (
            <div className={styles.container} ref={(node) => { this.container = node; }} >
                <div id="toolbar" className={styles.toolbar}></div>
                <div id="graph" className={styles.graph} style={{ position: 'absolute', top: 26, right: 0, bottom: 0, left: 0 }}>
                </div>
                <PrintTicket modalVisible={modalVisible} handleModalVisible={this.handleModalVisible} 
                    rePrintTicket={this.rePrintTicket} selectOrderLoading={selectOrderLoading}/>
                <PlaceOrder modalVisible={placeOrderModalVisible}
                    handleModalVisible={this.handlePlaceOrderModalVisible}
                    local_goodsList={local_goodsList}
                    local_cartList={local_cartList}
                    local_goodsCategory={local_goodsCategory}
                    categoryList={categoryList}
                    goodsLoading={goodsLoading}
                    updateShoppingCart={this.updateShoppingCart}
                    listExtra={this.listExtra}
                    tableCode={this.tableCode}
                    deleteShoppingCart={this.deleteShoppingCart}
                    clearShoppingCart={this.clearShoppingCart}
                    cartLoading={cartLoading}
                    submitOrderLoading={submitOrderLoading}
                    handleDinersNumModalVisible={this.handleDinersNumModalVisible}
                />
                <ExtraModal modalVisible={extraModalVisible}
                    goodsExtraMap={goodsExtraMap}
                    currentGoodsId={currentGoodsId}
                    handleModalVisible={this.handleExtraModalVisible}
                    saveShoppingCard={this.saveShoppingCard}
                />
                <Affix target={() => this.container} className={styles.floorButtons} >
                    <RadioGroup onChange={this.onFloorChange} value={defaultFloorId}>
                        {
                            screenList.map(item => {
                                return <RadioButton key={item.id} value={item.id} disabled={item.status === 0}>{item.floorName}</RadioButton>
                            })
                        }
                    </RadioGroup>
                </Affix>
                <div className={styles.statusColor} >
                    <Tag>空闲中</Tag>&nbsp;
                    <Tag color="#D9E7F3">入座下单中</Tag>&nbsp;
                    <Tooltip title={"顾客餐桌扫码点餐,需要商家确认"}><Tag color="#E1CB88">待确定</Tag>&nbsp;</Tooltip>
                    <Tag color="#BCE5B5">用餐中</Tag>&nbsp;
                    <Tooltip title={"顾客就餐完毕,订单完成之后餐桌待打扫"}><Tag color="#E79D9E">打扫中</Tag></Tooltip>
                </div>
                {/* <Affix target={() => this.container} className={styles.logInfo} >
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="WIFI实时点餐" key="1">
                            <LogPanel showTitle={false}
                                info={info}
                                initSocketIo={initSocketIo}
                                stopSocketIo={stopSocketIo}
                                sendLogInfo={sendLogInfo}
                            />
                        </Panel>
                    </Collapse>
                </Affix> */}
                <OrderDetail
                    handleModalVisible={handleOrderDetailVisible}
                    visible={orderDetailVisible}
                    orderList={orderList}
                    loading={orderListLoading}
                    subtractMap={subtractMap}
                    couponConsumeMap={couponConsumeMap}
                    refreshOrderItemByTableCode={this.refreshOrderItemByTableCode}
                    deleteOrderItem={this.deleteOrderItem}
                    cancelOrderItem={this.cancelOrderItem}
                    receiveOrderItem={receiveOrderItem}
                    subtractOnChange={subtractOnChange}
                    payAmount={payAmount}
                    receivedAmount={receivedAmount}
                    syncAlipayResultLoading={syncAlipayResultLoading}
                    syncWxpayResultLoading={syncWxpayResultLoading}
                    syncAlipayResult={this.syncAlipayResult}
                    syncWechatResult={this.syncWechatResult}
                    showCouponModal={this.showCouponModal}
                    handlePaymentModalVisible={this.handlePaymentModalVisible}
                    listOtherTables={this.listOtherTables}
                    onReceviedAmountChange={onReceviedAmountChange}
                    finishedOrder={this.finishedOrder}
                    goPlaceOrder={this.goPlaceOrder}
                    finishedOrderLoading={finishedOrderLoading}
                    handleMemberPaymentModalVisible={this.handleMemberPaymentModalVisible}
                    confirmOrder={this.confirmOrder}
                    confirmOrderItem={this.confirmOrderItem}
                    confirmOrderLoading={confirmOrderLoading}
                >
                </OrderDetail>
                <QRCodeModal modalVisible={QRCodeModalVisible}
                    handleModalVisible={this.handleQRCodeModalVisible}
                    qrcodeData={qrcodeData}
                >
                </QRCodeModal>
                <CashCouponModal visible={couponConsumeVisible} 
                    handleModalVisible={this.handleCouponModalVisible}
                    saveCouponConsumeLoading={saveCouponConsumeLoading}
                    saveCouponConsume={this.saveCouponConsume}
                    currCouponConsumes={currCouponConsumes}
                    deleteCouponConsume={this.deleteCouponConsume}
                    deleteCouponConsumeLoading={deleteCouponConsumeLoading}
                >
                </CashCouponModal>
                <MergeTableModal visible={mergeTableModalVisible}
                    handleModalVisible={this.handleMergeTableModalVisible}
                    loading={listOtherTablesLoading}
                    otherTables={otherTables}
                    selectedValue={selectedOtherTables}
                    onSelect={this.otherTableSelect}
                    onDeselect={this.otherTableDeselect}
                >
                </MergeTableModal>
                <DinersNumModal visible={dinersNumModalVisible}
                    loading={submitOrderLoading}
                    handleModalVisible={this.handleDinersNumModalVisible}
                    submitOrder={this.submitOrder}
                    dinersFormData={dinersFormData}
                    fieldChangeValue={this.dinersFormFieldChange}
                    local_cartList={local_cartList}
                >
                </DinersNumModal>
                <RemarkModal visible={remarkModalVisible}
                    loading={relateFrontOrderLoading}
                    handleModalVisible={this.handleRemarkModalVisible}
                    relateFrontOrder={this.relateFrontOrder}
                >
                </RemarkModal>
                <PlaceOrderCopy visible={copyPlaceOrderModalVisible}
                    handleModalVisible={this.handleCopyPlaceOrderModalVisible}
                    floorList={floorList}
                    dispatchAllTables={dispatchAllTables}
                    copyOrder={this.copyOrder}
                    copyOrderLoading={copyOrderLoading}
                >
                </PlaceOrderCopy>
                <PrintOrderModal visible={printOrderModalVisible}
                    handleModalVisible={this.handlePrintOrderModalVisible}
                    orderList={orderList}
                    loading={orderListLoading}
                    updatePrintStatusByOrderItemIds={updatePrintStatusByOrderItemIds}     
                >
                </PrintOrderModal>
                <ChangeTableModal visible={changeTableModalVisible}
                    handleModalVisible={this.handleChangeTableModalVisible}
                    floorList={this.state.floorList}
                    loading={changeTableLoading}
                    newTableCode={{value: null}}
                    changeTableCode={this.changeTableCode}
                >
                </ChangeTableModal>
                <OperationModal visible={operationModalVisible}
                    handleModalVisible={this.handleOperationModalVisible}
                    setFree={this.setFree}
                    setDinner={this.setDinner}
                    setSeat={this.setSeat}
                    printOrder={this.printOrder}
                    printTicket={this.printTicket}
                    viewOrderItem={this.viewOrderItem}
                    changeTable={this.changeTable}
                    hadnleCopyOrder={this.hadnleCopyOrder}
                    initPlaceOrder={this.initPlaceOrder}
                >

                </OperationModal>
            </div>
        );
    }

}

export default withRouter(connect((state) => {
    return {
        screen: state.screen,
        goods: state.goods,
        defaultPage: state.defaultPage,
        homePage: state.homePage,
        floorPlan: state.floorPlan,
        goodsCategory: state.goodsCategory,
        hisOrder: state.hisOrder,
    }
}, (dispatch) => {
    return {
        screenActions: bindActionCreators(screenActions, dispatch),
        defaultPageActions: bindActionCreators(defaultPageActions, dispatch),
        floorPlanActions: bindActionCreators(floorPlanActions, dispatch),
        hisOrderActions: bindActionCreators(hisOrderActions, dispatch),
    }
})(FloorPlan));