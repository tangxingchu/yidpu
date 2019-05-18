import React, { Component, Fragment } from 'react';
import { Row, Col, Modal, Card, Button, Input, Spin, Popconfirm, Tooltip } from 'antd';

import ShoppingCart from './shoppingCart';
import GoodsTab from './goodsTab';
import styles from './index.less';

const { Search } = Input;

export default class PlaceOrder extends Component {

    constructor(props) {
        super(props);
    }

    handleSearch = (value) => {
        // this.listGoods(value);
    }

    render() {
        const { modalVisible, handleModalVisible, local_goodsList, local_cartList, local_goodsCategory, goodsLoading,
            submitOrderLoading, listExtra, tableCode, saveShoppingCard, updateShoppingCart, deleteShoppingCart,
            clearShoppingCart, cartLoading, handleDinersNumModalVisible } = this.props;
        const extraContent = (
            <Search className={styles.extraContentSearch} style={{ marginBottom: 4, }} placeholder="输入商品名称或拼音代码" value={name} onChange={this.onNameChange} onSearch={(value) => { this.onNameSearch(value) }} />
        );
        const extraContent_r = (
            <Fragment>
                {/* <Tooltip title="仅限在下单过程中的换台,如果已下完单生成了用餐订单请右击桌台选择换台">
                    <Button style={{marginRight: 8}}>换台</Button>
                </Tooltip> */}
                <Popconfirm title={"确定清空下单列表吗?"} cancelText={"取消"} okText={"确定"} onConfirm={() => clearShoppingCart(tableCode)}>
                    <Button type={"danger"}>清空</Button>
                </Popconfirm>
            </Fragment>
        );
        return (
            <Modal
                className={styles.placeOrderModal}
                title={"下单操作"}
                visible={modalVisible}
                width={1200}
                maskClosable={false}
                onCancel={() => handleModalVisible()}
                footer={[
                    <Button key="back" onClick={() => handleModalVisible()}>关闭</Button>,
                    <Tooltip key="commitAndPrint" title={"如果启用了后厨系统,用餐订单将会直接显示在后厨系统上,打印用餐订单确保已连接后厨网络打印机"}>
                        <Button type="primary" loading={submitOrderLoading} onClick={() => handleDinersNumModalVisible(true)}>
                            确认并下单
                        </Button>
                    </Tooltip>,
                ]}
            >
                <div className={styles.standardList}>
                    <Row gutter={24}>
                        <Col xl={10}>
                            <Spin spinning={goodsLoading}>
                                <Card
                                    className={styles.listCard}
                                    bordered={false}
                                    title={extraContent}
                                >
                                    <GoodsTab local_goodsCategory={local_goodsCategory}
                                        local_goodsList={local_goodsList}
                                        listExtra={listExtra}
                                        saveShoppingCard={saveShoppingCard}
                                    />
                                </Card>
                            </Spin>
                        </Col>
                        <Col xl={14}>
                            <Card
                                className={styles.listCard}
                                bordered={false}
                                title={`已下单列表(桌台${tableCode})`}
                                extra={extraContent_r}
                            >
                                <ShoppingCart
                                    deleteShoppingCart={deleteShoppingCart}
                                    updateShoppingCart={updateShoppingCart}
                                    cartLoading={cartLoading}
                                    dataSource={local_cartList}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }

}