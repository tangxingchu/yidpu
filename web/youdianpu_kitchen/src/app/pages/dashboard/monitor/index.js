import React, { Component, Fragment } from 'react';
import { Card, Row, Col, message, Button, notification, Popconfirm, Spin } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';
import QueueAnim from 'rc-queue-anim';
import randomColor from 'randomcolor';

import basicConfigActions from '../../../actions/basicConfig';
import monitorActions from '../../../actions/monitor';
import styles from './index.less';
import Ellipsis from '../../../components/Ellipsis';
import { getToken } from '../../../utils/authority';

class MonitorPage extends Component {

    constructor(props) {
        super(props);
        this.colors = {};
    }

    componentDidMount() {
        //连接出现错误
        ipcRenderer.on("connect_error", (event, arg) => {
            message.error("连接出错,请检查店内WIFI点餐服务是否已开启.")
        });
        //连接超时
        ipcRenderer.on("connect_timeout", (event, arg) => {
            message.error("连接超时, 请检查本机与店内WIFI点餐的IP是否相通.")
        });
        //连接成功
        ipcRenderer.on("connect", (event, arg) => {
            notification.success({
                message: '提示',
                description: '连接店内WIFI点餐服务成功.',
                duration: null,
                placement: 'bottomRight',
            });
            //链接成功查询订单状态
            ipcRenderer.send("queryPlaceOrder", { token: getToken() });
        });
        //连接断开
        ipcRenderer.on("disconnect", (event, arg) => {
            notification.error({
                message: '错误',
                description: '连接店内WIFI点餐服务已断开,点餐服务已关闭.',
                duration: null,
                placement: 'bottomRight',
            });
        });
        //初始化socket客户端
        this.props.basicConfigActions.selectByCode("server-ip").then(data => {
            ipcRenderer.send("initSocketClient", data.configValue);
        });
        this.props.monitorActions.dispathQueryPending();
        ipcRenderer.on('queryPlaceOrderMsg', (event, arg) => {
            if (arg.success) {
                this.props.monitorActions.dispathQuerySuccess(arg.message);
            } else {
                message.error(arg.message);
                this.props.monitorActions.dispathQueryFailure();
            }
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners("queryPlaceOrderMsg");
        ipcRenderer.removeAllListeners("connect_error");
        ipcRenderer.removeAllListeners("connect_timeout");
        ipcRenderer.removeAllListeners("connect");
        ipcRenderer.removeAllListeners("disconnect");
    }

    onClick = () => {
        this.setState({
            show: !this.state.show,
        });
    }

    add = () => {
        const data = this.state.data;
        data.push(<Card title={"桌台编号D05"} key={"A07"}
        >
        </Card>);
        this.setState({ data });
    }

    renderOrder = (orderList) => {
        return orderList.map(order => {
            return (
                <Card title={`台号:${order.tableCode}`} key={order.id}>
                    {this.renderItem(order.orderItemVos)}
                </Card>
            )
        })
    }
    renderItem = (orderItems) => {
        return orderItems.map(orderItem => {
            if (!this.colors[orderItem.goodsId]) {
                this.colors[orderItem.goodsId] = randomColor();
            }
            return (
                <div key={orderItem.id} className={styles.orderItem}
                    style={{ color: this.colors[orderItem.goodsId], border: `1px solid ${this.colors[orderItem.goodsId]}` }}>
                    <div className={styles.left}>
                        <div>{orderItem.goodsName}</div>
                        <div className={styles.extraItem}>{orderItem.extraName}</div>
                    </div>
                    <div className={styles.priceItem}>
                        <div className={styles.num}>{orderItem.num}{orderItem.goodsUnitName}</div>
                    </div>
                    <div style={{ marginLeft: 8, fontSize: 12 }}>
                        <Popconfirm okText="确定" cancelText="取消" title={"确定退单吗?"}>
                            <a>炒菜</a>
                        </Popconfirm>
                        <Popconfirm okText="确定" cancelText="取消" title={"确定退单吗?"}>
                            <a>上菜</a>
                        </Popconfirm>
                    </div>
                </div>
            )
        });
    }

    //按商品分类
    renderOrderByGoods = (item) => {
        return (
            <Row gutter={16}>
                <Col xl={6} lg={12} md={12} sm={24} xs={24} >
                    <Card hoverable className={styles.card} actions={[<a>炒菜</a>, <a>上桌</a>]}>
                        <Card.Meta
                            avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                            title={<a href="#">{item.title}</a>}
                            description={
                                <Ellipsis className={styles.item} lines={3}>
                                    {item.description}
                                </Ellipsis>
                            }
                        />
                    </Card>
                </Col>
                <Col xl={6} lg={12} md={12} sm={24} xs={24} >
                <Card hoverable className={styles.card} actions={[<a>操作一</a>, <a>操作二</a>]}>
                    <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a href="#">{item.title}</a>}
                        description={
                            <Ellipsis className={styles.item} lines={3}>
                                {item.description}
                            </Ellipsis>
                        }
                    />
                </Card>
                </Col>
                <Col xl={6} lg={12} md={12} sm={24} xs={24} >
                <Card hoverable className={styles.card} actions={[<a>操作一</a>]}>
                    <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a href="#">{item.title}</a>}
                        description={
                            <Ellipsis className={styles.item} lines={3}>
                                {item.description}
                            </Ellipsis>
                        }
                    />
                </Card>
                </Col>
                <Col xl={6} lg={12} md={12} sm={24} xs={24} >
                <Card hoverable className={styles.card} actions={[<a>操作一</a>, <a>操作二</a>]}>
                    <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a href="#">{item.title}</a>}
                        description={
                            <Ellipsis className={styles.item} lines={3}>
                                {item.description}
                            </Ellipsis>
                        }
                    />
                </Card>
                </Col>
            </Row>
        )
    }

    render() {
        const { orderList, loading } = this.props.monitor;
        return (
            <Spin spinning={loading}>
                {/* <p className="buttons">
                    <Button type="primary" onClick={this.onClick}>切换</Button>
                    <Button type="primary" onClick={this.add}>添加</Button>
                </p> */}


                <div className={styles.cardList}>
                    <QueueAnim className={styles.queueAnim} animConfig={[
                        { opacity: [1, 0], translateY: [0, 50] },
                        { opacity: [1, 0], translateY: [0, -50] }
                    ]}>
                        {
                            this.renderOrder(orderList)
                            // this.renderOrderByGoods({id: 1, title: 'title', description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"})
                        }
                    </QueueAnim>
                </div>
            </Spin>
        );
    }

}

export default connect((state) => {
    return {
        monitor: state.monitor,
    }
}, (dispatch) => {
    return {
        basicConfigActions: bindActionCreators(basicConfigActions, dispatch),
        monitorActions: bindActionCreators(monitorActions, dispatch),
    }
})(MonitorPage);